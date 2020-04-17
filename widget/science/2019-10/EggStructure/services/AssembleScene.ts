import Vue from 'vue';
import {
    Vector3, PBRMaterial, HemisphericLight,
    Mesh, Scene, CubeTexture, AbstractMesh, Engine, ArcRotateCamera,
    SceneLoader, VideoTexture, Texture, Color3, StandardMaterial, MeshBuilder, Camera, GlowLayer, Quaternion
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';

import { ViewModel } from '../ViewModel';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { MaterialUtils } from './MaterialUtils';
import { D3Control } from '../../../../babylon/util/3DControl';

import * as egg from '../sub_static/egg.glb';
import * as environment from '../sub_static/image/environment.env';
import * as bump from '../sub_static/egg_bump_NRM.png';
import * as black from '../sub_static/black.png';
import * as tran from '../sub_static/tran.png';
import * as white from '../sub_static/white.png';
import * as outUVyolk from '../sub_static/outUVyolk.png';
import * as yolk from '../sub_static/yolk.png';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends Base3DScene {
    lang = window.env.browserInfo.lang;
    btntext = this.lang.btntext;

    option = {
        tran: tran,
        white: white,
        black: black,
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
    hdrTexture: CubeTexture; //环境贴图
    tip: Mesh;
    bg: Mesh;  //背景图
    bgMat: StandardMaterial; //背景图材质
    videoTexture: VideoTexture; //摄像机图像
    eggShell1Mat: PBRMaterial; //蛋壳材质
    eggShell2Mat: PBRMaterial; //蛋壳材质2
    eggShellMembraneMat: PBRMaterial; //蛋壳膜
    eggMembraneMat: PBRMaterial; //蛋壳膜
    eggWhiteMat: PBRMaterial; //蛋白
    eggWhiteOuterMat: PBRMaterial; //蛋白
    eggYolkMat: PBRMaterial; //蛋黄
    eggAirMat: PBRMaterial; //气室
    eggBlastodermMat: PBRMaterial;
    eggShell1Alpha = 1;
    eggShellMembraneAlpha = 1;
    eggWhiteAlpha = 0.63;
    eggYolkAlpha = 1;
    glowLayer: GlowLayer;
    meshes: AbstractMesh[] = [];

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
        scene.clearColor.set(0, 0, 0, 0);
        this.hdrTexture = CubeTexture.CreateFromPrefilteredData(environment, scene);
        scene.createDefaultLight();
        scene.createDefaultSkybox(this.hdrTexture, true, 1000, 0.3);
        const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0, -1, 0), scene);
        hemisphericLight.intensity = 0.3;
        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        this.camera.upperRadiusLimit = 50;
        this.camera.lowerRadiusLimit = 20;
        this.camera.panningSensibility = 0;
        this.camera.upperBetaLimit = Math.PI * 7 / 16;
        this.camera.lowerBetaLimit = Math.PI / 4;
        this.camera.inertia = 0.5;
        this.camera.position = new Vector3(0, 0, -30);
        this.camera.attachControl(this.canvas, true);

        scene.activeCameras.push(this.camera);
        this.tip = new Mesh('a');
        this.glowLayer = new GlowLayer('glow', scene, { mainTextureSamples: 4 });
        this.glowLayer.addIncludedOnlyMesh(this.tip);
        this.dD3Control = new D3Control(this.option);
        SceneLoader.ImportMesh('', egg.replace('egg.glb', ''), 'egg.glb', scene, (v) => { this.importMeshSuccess(v); });
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        this.eggShell1Mat = MaterialUtils.CreateShellMat(bump, this.hdrTexture, this.scene);
        this.eggShell2Mat = MaterialUtils.CreateShell2Mat(this.hdrTexture, this.scene);
        this.eggShellMembraneMat = MaterialUtils.CreateShellMembraneMat(this.hdrTexture, this.scene);
        this.eggMembraneMat = MaterialUtils.CreateMembraneMat(this.hdrTexture, this.scene);
        this.eggWhiteMat = MaterialUtils.CreateWhiteMat(this.hdrTexture, this.scene);
        this.eggWhiteOuterMat = MaterialUtils.CreateWhiteMat(this.hdrTexture, this.scene);
        this.eggYolkMat = MaterialUtils.CreateYolkMat(yolk, this.hdrTexture, this.scene);
        this.eggBlastodermMat = MaterialUtils.CreateBlastodermMat(outUVyolk, this.hdrTexture, this.scene);
        this.eggAirMat = MaterialUtils.CreateAirMat(this.hdrTexture, this.scene);
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'Chalazae') {
                meshes[i].material = this.eggWhiteMat;
                meshes[i].isVisible = false;
            } else if (meshes[i].name === 'eggShell1') {
                meshes[i].material = this.eggShell1Mat;
            } else if (meshes[i].name === 'eggShell2') {
                meshes[i].material = this.eggShell2Mat;
            } else if (meshes[i].name === 'eggShellMembrane1') {
                meshes[i].material = this.eggShellMembraneMat;
            } else if (meshes[i].name === 'eggShellMembrane2') {
                meshes[i].material = this.eggShellMembraneMat;
            } else if (meshes[i].name === 'Membrane') {
                meshes[i].material = this.eggMembraneMat;
            } else if (meshes[i].name === 'eggwhite') {
                meshes[i].material = this.eggWhiteMat;
            } else if (meshes[i].name === 'whiteTwo') {
                meshes[i].material = this.eggWhiteOuterMat;
                meshes[i].isVisible = false;
                this.eggWhiteOuterMat.alpha = 0;
            } else if (meshes[i].name === 'yolk') {
                meshes[i].material = this.eggYolkMat;
            } else if (meshes[i].name === 'Blastoderm') {
                meshes[i].material = this.eggBlastodermMat;
            } else if (meshes[i].name === 'air') {
                meshes[i].material = this.eggAirMat;
            }

            meshes[i].scaling = Vector3.One();
            meshes[i].rotationQuaternion = Quaternion.Identity();
        }
        this.meshes = meshes;
    }

    getNoUserMediaCameraCall() {
        const options = { width: 150 / window.screen.height * window.screen.width, height: 150 };
        this.bg = this.createPlan(null, new Vector3(0, 0, 50), options, this.scene);
        this.bg.isPickable = false;
        this.bg.scaling.x = -1;
        this.bg.setParent(this.camera);
        this.bg.rotation.z = Math.PI;
        this.camera.position = new Vector3(-5, 5, -30);
    }

    getUserMediaCameraCall(v: string) {
        const constraints = { minWidth: 512, maxWidth: 2048, minHeight: 512, maxHeight: 2048, deviceId: v };
        VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.videoTexture.video.play();
            const options = { width: 150 / this.videoTexture.getSize().height * this.videoTexture.getSize().width, height: 150 };
            this.bg = this.createPlan(this.videoTexture, new Vector3(0, 0, 50), options, this.scene);
            this.bg.isPickable = false;
            this.bg.scaling.x = -1;
            this.bg.setParent(this.camera);
            this.bg.rotation.z = Math.PI;
            this.camera.position = new Vector3(-5, 5, -30);
        }, constraints);
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

    check(i: number): void {
        this.eggShell1Mat.alpha = 0.09;
        this.eggShell2Mat.alpha = 0.09;
        this.eggShellMembraneMat.alpha = 0.09;
        this.eggMembraneMat.alpha = 0.09;
        this.eggWhiteMat.alpha = 0.09;
        this.eggWhiteOuterMat.alpha = 0;
        this.eggYolkMat.alpha = 0.09;
        this.eggAirMat.alpha = 0;
        this.eggBlastodermMat.alpha = 0.09;
        this.glowLayer.removeIncludedOnlyMesh(this.scene.getMeshByID('air') as Mesh);
        for (let index = 0; index < this.meshes.length; index++) {
            const element = this.meshes[index];
            element.isVisible = i !== 2;
        }
        this.scene.getMeshByName('whiteTwo').isVisible = false;
        if (i === 0) {
            this.eggShell1Mat.alpha = this.eggShell1Alpha;
            this.eggShell2Mat.alpha = this.eggShell1Alpha;
        } else if (i === 1) {
            this.eggShellMembraneMat.alpha = 0.03;
            this.eggMembraneMat.alpha = 0.03;
            this.eggYolkMat.alpha = this.eggYolkAlpha;
        } else if (i === 2) {
            this.scene.getMeshByName('whiteTwo').isVisible = true;
            this.eggWhiteOuterMat.alpha = this.eggWhiteAlpha; // 0.02;
        } else if (i === 3) {
            this.eggShellMembraneMat.alpha = 0.03;
            this.eggMembraneMat.alpha = 0.03;
            this.eggBlastodermMat.alpha = this.eggYolkAlpha;
        } else if (i === 4) {
            this.eggMembraneMat.alpha = 1;
            this.eggShellMembraneMat.alpha = 0;
            this.eggWhiteMat.alpha = 0;
        } else if (i === 5) {
            this.eggShell1Mat.alpha = 0.09;
            this.eggShell2Mat.alpha = 0.09;
            this.eggShellMembraneMat.alpha = 0.02;
            this.eggMembraneMat.alpha = 0.02;
            this.eggWhiteMat.alpha = 0.02;
            this.eggYolkMat.alpha = 0.02;
            this.eggBlastodermMat.alpha = 0.02;
            this.glowLayer.addIncludedOnlyMesh(this.scene.getMeshByID('air') as Mesh);
            this.eggAirMat.alpha = 0.4;
        }
    }

    reset(): void {
        this.eggShell1Mat.alpha = this.eggShell1Alpha;
        this.eggShell2Mat.alpha = this.eggShell1Alpha;
        this.eggYolkMat.alpha = this.eggYolkAlpha;
        this.eggBlastodermMat.alpha = this.eggYolkAlpha;
        this.eggShellMembraneMat.alpha = this.eggShellMembraneAlpha;
        this.eggAirMat.alpha = 0;
        this.eggMembraneMat.alpha = 1;
        this.eggWhiteOuterMat.alpha = 0;
        this.eggWhiteMat.alpha = this.eggWhiteAlpha;
        this.glowLayer.removeIncludedOnlyMesh(this.scene.getMeshByID('air') as Mesh);
        this.camera.detachControl(this.canvas);
        this.camera.position = new Vector3(-5, 5, -30);
        this.camera.upperBetaLimit = Math.PI * 7 / 16;
        this.camera.attachControl(this.canvas, true);
        for (let index = 0; index < this.meshes.length; index++) {
            const element = this.meshes[index];
            element.isVisible = element.name !== 'whiteTwo';
        }
    }
}
