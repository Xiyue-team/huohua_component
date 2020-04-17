import Vue from 'vue';
import {
    Vector3, HemisphericLight,
    Mesh, Scene, AbstractMesh, Engine, ArcRotateCamera,
    SceneLoader, VideoTexture, Color3, StandardMaterial, MeshBuilder, Camera, Texture
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';

import { ViewModel } from '../ViewModel';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { D3Control } from '../../../../babylon/util/3DControl';

import * as huaituzi from '../sub_static/huaituzi.glb';

import * as black from '../sub_static/black.png';
import * as tran from '../sub_static/tran.png';
import * as white from '../sub_static/white.png';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends Base3DScene {

    option = {
        tran: tran,
        white: white,
        black: black,
        modelBtnArry: [],
        changeToWhiteCall: () => {
            this.viewModel.color = '#222222';
            this.bgMat.emissiveTexture = null;
            this.bgMat.emissiveColor = Color3.FromHexString('#e4e4e4');
        },
        changeToBlackCall: () => {
            this.bgMat.emissiveTexture = null;
            this.viewModel.color = '#e4e4e4';
            this.bgMat.emissiveColor = Color3.FromHexString('#222222');
        },
        showCamera: () => {
            this.viewModel.color = '#e4e4e4';
            this.bgMat.emissiveTexture = this.videoTexture;
            this.bgMat.emissiveColor = Color3.FromHexString('#222222');
        },
        noCameraCall: () => { this.getNoUserMediaCameraCall(); },
        getUserMediaCameraCall: (v: string) => { this.getUserMediaCameraCall(v); }
    };

    dD3Control: D3Control;
    viewModel: ViewModel;
    camera: ArcRotateCamera;
    bg: Mesh; //背景面片
    bgMat: StandardMaterial; //背景材质
    videoTexture: VideoTexture;  //摄像图片

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        if (this.engine.getRenderHeight() > this.engine.getRenderWidth()) {
            this.camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;
        } else {
            this.camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
        }
    }
    /**
     * 创建场景
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        scene.createDefaultLight();

        const HemisphericLight1 = new HemisphericLight('HLight', new Vector3(0, -1, 0), scene);
        HemisphericLight1.intensity = 0.3;

        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        this.camera.upperRadiusLimit = 8;
        this.camera.lowerRadiusLimit = 4;
        this.camera.minZ = 0.1;
        this.camera.panningSensibility = 0;
        this.camera.wheelDeltaPercentage = 0.01;
        this.camera.pinchDeltaPercentage = 0.01;
        this.camera.inertia = 0.1;
        this.camera.attachControl(this.canvas, true);
        this.camera.position = new Vector3(0, 0, -5);
        scene.activeCameras.push(this.camera);


        this.dD3Control = new D3Control(this.option);
        SceneLoader.ImportMesh('', huaituzi.replace('huaituzi.glb', ''), 'huaituzi.glb', scene, (v) => { this.importMeshSuccess(v); });
        this.reset();
        return scene;
    }


    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
        }
    }

    getUserMediaCameraCall(v: string) {
        const constraints = { minWidth: 512, maxWidth: 2048, minHeight: 512, maxHeight: 2048, deviceId: v };
        VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.videoTexture.video.play();
            const options = { width: 150 / this.videoTexture.getSize().height * this.videoTexture.getSize().width, height: 150 };
            this.bg = this.createPlan(this.videoTexture, new Vector3(0, 0, 50), options, this.scene);
            this.bg.isPickable = false;
            this.bg.rotation.z = Math.PI;
            this.bg.scaling.x = -1;
            this.bg.setParent(this.camera);
        }, constraints);
    }

    getNoUserMediaCameraCall() {
        const options = { width: 150 / window.screen.height * window.screen.width, height: 150 };
        this.bg = this.createPlan(null, new Vector3(0, 0, 50), options, this.scene);
        this.bg.isPickable = false;
        this.bg.rotation.z = Math.PI;
        this.bg.scaling.x = -1;
        this.bg.setParent(this.camera);
    }

    createPlan(diffuseTexture: Texture, position: Vector3,
        options: { width?: number; height?: number; }, scene: Scene): Mesh {
        this.bgMat = new StandardMaterial('videoMat', scene);
        this.bgMat.diffuseColor = new Color3(0, 0, 0);
        this.bgMat.useAlphaFromDiffuseTexture = true;
        this.bgMat.specularColor = new Color3(0, 0, 0);
        this.bgMat.emissiveTexture = diffuseTexture;
        this.bgMat.backFaceCulling = false;
        this.bgMat.emissiveColor = Color3.FromHexString('#222222');
        const plan = MeshBuilder.CreatePlane('plan', options, scene);
        plan.material = this.bgMat;
        plan.position = position;
        return plan;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {

    }
}
