import Vue from 'vue';
import {
    Vector3, HemisphericLight, DirectionalLight, Mesh, Scene,
    AbstractMesh, Engine, ArcRotateCamera, SceneLoader, Camera, MeshBuilder
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';

import $ from 'jquery-ts';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { PointerEventScene } from './PointerEventScene';
import { MaterialUtils } from './MaterialUtils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as boxfb from '../sub_static/box.glb';
import * as dot from '../sub_static/dot.png';
/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends PointerEventScene {
    viewModel: ViewModel;
    camera: ArcRotateCamera;
    box: Mesh;
    //正方体 正面 反面 颜色层
    boxf: AbstractMesh;
    boxb: AbstractMesh;
    boxm: AbstractMesh;

    //可移动点
    tipA: Mesh;
    tipB: Mesh;
    tipC: Mesh;
    //截面构成点
    tipAA: Vector3;
    tipBB: Vector3;
    tipCC: Vector3;

    ribbon: Mesh; //截面
    path: Vector3[][] = []; //路径
    orthoX: number;
    orthoY: number;
    Container = $('#Container3d');
    distance = 0;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    changeCamera(orthoY: number) {
        this.orthoY = orthoY;
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.width() / this.Container.height();
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
    }
    /**
     * 创建场景
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const ImageLabelOptions = { height: '24px', width: '24px', color: '#FFFFFF' };
        if (this.isMob) {
            ImageLabelOptions.height = ImageLabelOptions.width = '48px';
        }
        this.camera = this.createArcRotateCamera(scene);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.changeCamera(12);
        const HemisphericLight1 = new HemisphericLight('HLight', new Vector3(0, 1, 0), scene);
        HemisphericLight1.intensity = 0.3;
        const dLight = new DirectionalLight('DLight', new Vector3(0, 0.6, 0.4), scene);
        dLight.intensity = 0.6;
        this.importBabylonMesh(boxfb.replace('box.glb', ''), `box.glb`, scene);
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.setMeshVisible([this.tipA, this.tipB, this.tipC], false);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOptions);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOptions);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOptions);

        const mata = MaterialUtils.CreateMaterial(scene);
        this.ribbon = Mesh.CreateRibbon('ribbon',
            [[new Vector3(4, -4, -1), new Vector3(4, -4, -1)], [new Vector3(-4, 4, 4), new Vector3(4, 4, 4)]],
            false, false, 0, scene, true, Mesh.DOUBLESIDE, this.ribbon);
        this.ribbon.isPickable = false;
        this.ribbon.material = mata;
        this.ribbon.alphaIndex = -1;
        this.box = MeshBuilder.CreateBox('box', { size: 8, width: 8, height: 8, depth: 8 }, scene);
        this.box.isVisible = false;
        this.addPointerEventListener(this.box, canvas, scene);
        return scene;
    }
    /**
     * 导入模型
     * @param rootUrl 
     * @param sceneFilename 
     * @param scene 
     */
    importBabylonMesh(rootUrl: string, sceneFilename: string | File, scene: Scene) {
        const thiz = this;
        SceneLoader.ImportMesh('', rootUrl, sceneFilename, scene, function (meshes) {
            for (let i = 0; i < meshes.length; i++) {
                meshes[i].scaling = new Vector3(1, 1, 1).scale(1.005);
                meshes[i].isVisible = true;
                meshes[i].isPickable = false;
                if (meshes[i].name === 'boxf') {
                    thiz.boxf = meshes[i];
                } else if (meshes[i].name === 'boxb') {
                    thiz.boxb = meshes[i];
                } else if (meshes[i].name === 'boxm') {
                    thiz.boxm = meshes[i];
                }
            }
            thiz.importMeshSuccess(scene);
        });
    }

    importMeshSuccess(scene: Scene) {
        this.reset();
        scene.registerBeforeRender(() => {
            const dis = Vector3.Distance(this.camera.position, Vector3.Zero());
            if (Math.abs(dis - this.distance) > 0.1) {
                this.distance = dis;
                this.changeCamera(dis);
            }
        });
    }

    /**
     * 创建相机
     * @param scene
     */
    createArcRotateCamera(scene: Scene): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 20;
        scene.activeCameras.push(camera);
        return camera;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (Math.abs(Math.abs(startingPoint.x) - 4) < 0.01) {
                if (Math.abs(startingPoint.y) > Math.abs(startingPoint.z)) {
                    startingPoint.y = startingPoint.y > 0 ? 4 : -4;
                } else {
                    startingPoint.z = startingPoint.z > 0 ? 4 : -4;
                }
            } else if (Math.abs(Math.abs(startingPoint.y) - 4) < 0.01) {
                if (Math.abs(startingPoint.x) > Math.abs(startingPoint.z)) {
                    startingPoint.x = startingPoint.x > 0 ? 4 : -4;
                } else {
                    startingPoint.z = startingPoint.z > 0 ? 4 : -4;
                }
            } else if (Math.abs(Math.abs(startingPoint.z) - 4) < 0.01) {
                if (Math.abs(startingPoint.y) > Math.abs(startingPoint.x)) {
                    startingPoint.y = startingPoint.y > 0 ? 4 : -4;
                } else {
                    startingPoint.x = startingPoint.x > 0 ? 4 : -4;
                }
            }
            currentMesh.position = startingPoint;
            this.updateMesh();
        }
    }

    /**
     * 更新ABC标签位置
     */
    updateLabelPos() {
        const posInsidea = this.tipB.position.subtract(this.tipA.position).add(this.tipC.position.subtract(this.tipA.position));
        const posInsideb = this.tipA.position.subtract(this.tipB.position).add(this.tipC.position.subtract(this.tipB.position));
        const posInsidec = this.tipA.position.subtract(this.tipC.position).add(this.tipB.position.subtract(this.tipC.position));
        this.tipAA = this.tipA.position.subtract(posInsidea.scale(100));
        this.tipBB = this.tipB.position.subtract(posInsideb.scale(100));
        this.tipCC = this.tipC.position.subtract(posInsidec.scale(100));
    }

    updateMesh() {
        this.updateLabelPos();
        this.path = [];
        if (this.distanceAxi(this.tipA.position.x, this.tipB.position.x, this.tipC.position.x)) {
            this.path.push([new Vector3(this.tipA.position.x, 4, 4), new Vector3(this.tipA.position.x, 4, -4)]);
            this.path.push([new Vector3(this.tipA.position.x, -4, 4), new Vector3(this.tipA.position.x, -4, -4)]);
        } else if (this.distanceAxi(this.tipA.position.y, this.tipB.position.y, this.tipC.position.y)) {
            this.path.push([new Vector3(4, this.tipA.position.y, 4), new Vector3(4, this.tipA.position.y, -4)]);
            this.path.push([new Vector3(-4, this.tipA.position.y, 4), new Vector3(-4, this.tipA.position.y, -4)]);
        } else if (this.distanceAxi(this.tipA.position.z, this.tipB.position.z, this.tipC.position.z)) {
            this.path.push([new Vector3(4, 4, this.tipA.position.z), new Vector3(4, -4, this.tipA.position.z)]);
            this.path.push([new Vector3(-4, 4, this.tipA.position.z), new Vector3(-4, -4, this.tipA.position.z)]);
        } else {
            this.path.push([this.tipAA, this.tipAA]);
            this.path.push([this.tipBB, this.tipCC]);
        }
        this.ribbon = MeshBuilder.CreateRibbon('null', { pathArray: this.path, instance: this.ribbon });
    }

    /**
     * 计算点是否同axi
     * @param pos1
     * @param pos2
     * @param pos3
     */
    distanceAxi(pos1: number, pos2: number, pos3: number): boolean {
        return Math.abs(Math.abs(pos1 + pos2 + pos3) - 12) < 0.03;
    }

    /**
     * '显示隐藏正方体'按钮
     */
    check(isVisible: boolean): void {
        this.boxm.isVisible = this.boxf.isVisible = this.boxb.isVisible = isVisible;
        this.tipA.isPickable = this.tipB.isPickable = this.tipC.isPickable = isVisible;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipA.position = new Vector3(4, 4, 2);
        this.tipB.position = new Vector3(-4, 4, 2);
        this.tipC.position = new Vector3(4, -4, 2);

        this.camera.detachControl(this.canvas);
        this.camera.attachControl(this.canvas, true);
        this.camera.position = new Vector3(5, 7, -10);
        this.check(true);
        this.updateMesh();
        this.viewModel.buttonActived = false;
    }
}
