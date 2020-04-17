import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const pep = require('../../libs/pep.min.js');
import {BrowserUtil} from '../../util/BrowserUtil';

export class BabylonBase {
    public canvas: HTMLCanvasElement;
    public scene: BABYLON.Scene;
    public engine: BABYLON.Engine;
    public light: BABYLON.Light;
    public camera: BABYLON.Camera;
    public model: any;
    public isAttach = true;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
        this.engine = new BABYLON.Engine(this.canvas, true, null, false);

        if (BrowserUtil.getBrowserInfo().isIpad || BrowserUtil.getBrowserInfo().isHuohuaPlayer || BrowserUtil.getBrowserInfo().isIphone) {
            this.canvas.setAttribute('touch-action', 'none');
        } else {
            this.canvas.removeAttribute('touch-action');
        }
    }

    initScene() {
        const scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(255, 255, 255, 1);

        scene.autoClear = false;
        scene.autoClearDepthAndStencil = false;

        return scene;
    }

    //初始化旋转摄像机
    initRotateCamera(position: BABYLON.Vector3, scene: BABYLON.Scene, upperLimit: number, lowerLimit: number) {
        const camera = new BABYLON.ArcRotateCamera('rotateCamera', Math.PI, Math.PI / 8, 1, position, scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true, false);
        camera.panningSensibility = 0; // 禁止pan

        //旋转摄像机,控制缩放大小
        camera.lowerRadiusLimit = lowerLimit;
        camera.upperRadiusLimit = upperLimit;
        camera.angularSensibilityX = 1500;
        camera.angularSensibilityY = 1500;
        camera.wheelPrecision = 15;
        camera.pinchPrecision = 10;

        this.camera = camera;
        return camera;
    }

    //初始化自由相机
    initFreeCamera(position: BABYLON.Vector3, scene: BABYLON.Scene, nearLimit: number, farLimit: number) {
        const camera = new BABYLON.FreeCamera('freeCamera', position, scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        const cameraPosition = camera.position;

        scene.onPointerObservable.add((evt) => {
            const event = <WheelEvent>evt.event;
            cameraPosition.z -= event.wheelDelta * 0.009 * (cameraPosition.z * 0.1);

            if (cameraPosition.z < nearLimit) {
                cameraPosition.z = nearLimit;
            } else if (cameraPosition.z > farLimit) {
                cameraPosition.z = farLimit;
            }

        }, BABYLON.PointerEventTypes._POINTERWHEEL);

        return camera;
    }


    initLight(position: BABYLON.Vector3, scene: BABYLON.Scene) {
        const baseLight = new BABYLON.HemisphericLight('skyLight', position, scene);
        return baseLight;
    }

    //加载模型
    importModel(modelUrl: string) {
        return new Promise<any>((resolve) => {
            const assetsManager = new BABYLON.AssetsManager(this.scene);
            const meshTask = assetsManager.addMeshTask('babylon_Model', '', '', 'data:' + JSON.stringify(modelUrl));

            meshTask.onSuccess = (task: any) => {
                task.loadedMeshes[0].convertToUnIndexedMesh();
                task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
                task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);

                resolve(task.loadedMeshes[0]);
            };
            assetsManager.onFinish = () => {
                this.loopRender();
            };

            this.engine.loadingUIBackgroundColor = 'white'; //过渡背景为白色
            assetsManager.load();
        });

    }

    loopRender() {
        setTimeout(() => {
            this.engine.beginFrame();
            this.scene.render();
            this.engine.endFrame();
            this.loopRender();
        }, 1000 / 30);

    }

    resize() {
        this.engine.resize();
    }


}
