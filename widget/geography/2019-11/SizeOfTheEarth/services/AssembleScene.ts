import Vue from 'vue';
import {
    Vector3, HemisphericLight,
    Mesh, Scene, AbstractMesh, Engine, ArcRotateCamera,
    SceneLoader, VideoTexture, Texture, Color3, StandardMaterial, MeshBuilder, Camera, Animation,
    DefaultRenderingPipeline, ShaderMaterial
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { D3Control } from './3DControl';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Utils } from './Utils';

import * as earth from '../sub_static/earth.babylon';
import * as black from '../sub_static/black.png';
import * as tran from '../sub_static/tran.png';
/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends Base3DScene {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;

    option = {
        tran: tran,
        black: black,
        changeToBlackCall: () => {
            this.bgMat.emissiveTexture = null;
            this.viewModel.color = '#e4e4e4';
        },
        showCamera: () => {
            this.viewModel.color = '#e4e4e4';
            this.bgMat.emissiveTexture = this.videoTexture;
        },
        noCameraCall: () => { this.getNoUserMediaCameraCall(); },
        getUserMediaCameraCall: (v: string) => { this.getUserMediaCameraCall(v); }
    };

    dD3Control: D3Control;
    viewModel: ViewModel;
    camera: ArcRotateCamera;
    bg: Mesh;  //背景图
    earthMat: StandardMaterial;
    surfaceMat: StandardMaterial;
    bgMat: StandardMaterial; //背景图材质
    eMat: ShaderMaterial;
    videoTexture: VideoTexture; //摄像机图像

    equatorial: AbstractMesh;
    quface: AbstractMesh;
    halfLine: AbstractMesh;
    polySurface4: AbstractMesh;

    animaRot: Animation;
    frameRate = 60;
    advancedTexture: AdvancedDynamicTexture;

    labelEqu: TextBlock;
    labelAxi: TextBlock;
    labelhalf: TextBlock;
    labelEquL: TextBlock;
    labelSurface: TextBlock;
    options = {
        height: 30, width: 240, color: '#FFC000',
        fontSize: '18px', fontFamily: '', fontStyle: ''
    };

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
        scene.createDefaultLight();
        if (this.isMob) {
            this.options = {
                height: 30, width: 480, color: '#FFC000',
                fontSize: '24px', fontFamily: '', fontStyle: ''
            };
        }
        this.earthMat = Utils.CreateRedHeartMaterial(scene);
        this.earthMat.alpha = 0.3;
        this.surfaceMat = Utils.CreateSurfaceMat(scene);
        this.surfaceMat.alpha = 0.3;
        const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0, -1, 0), scene);
        hemisphericLight.intensity = 0.3;
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        this.camera.upperRadiusLimit = 60;
        this.camera.lowerRadiusLimit = 30;
        this.camera.panningSensibility = 0;
        this.camera.inertia = 0.5;
        this.camera.position = new Vector3(0, 0, -50);
        this.camera.attachControl(this.canvas, true);
        scene.activeCameras.push(this.camera);
        this.dD3Control = new D3Control(this.option);
        SceneLoader.ImportMesh('', earth.replace('earth.babylon', ''), 'earth.babylon', scene, (v) => { this.importMeshSuccess(v); });
        const defaultPipeline = new DefaultRenderingPipeline('default', true, scene, [this.camera]);
        defaultPipeline.samples = 8;
        defaultPipeline.imageProcessingEnabled = false;
        this.eMat = Utils.CreateMat(scene);
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'labelEqu') {
                this.labelEqu = LabelUtils.CreateLabel(this.advancedTexture, meshes[i], this.text[2], this.options);
            } else if (meshes[i].name === 'labelhalf') {
                this.labelhalf = LabelUtils.CreateLabel(this.advancedTexture, meshes[i], this.text[1], this.options);
            } else if (meshes[i].name === 'labelAxi') {
                this.labelAxi = LabelUtils.CreateLabel(this.advancedTexture, meshes[i], this.text[0], this.options);
            } else if (meshes[i].name === 'labelSurface') {
                this.labelSurface = LabelUtils.CreateLabel(this.advancedTexture, meshes[i], this.text[4], this.options);
            } else if (meshes[i].name === 'labelPerimeter') {
                this.labelEquL = LabelUtils.CreateLabel(this.advancedTexture, meshes[i], this.text[3], this.options);
            } else if (meshes[i].name === 'halfLine') {
                this.halfLine = meshes[i];
                this.halfLine.isVisible = false;
            } else if (meshes[i].name === 'equatorial') {
                this.equatorial = meshes[i];
            } else if (meshes[i].name === 'polySurface1') {
                meshes[i].material = this.earthMat;
            } else if (meshes[i].name === 'polySurface4') {
                this.polySurface4 = meshes[i];
                this.polySurface4.material = this.surfaceMat;
            } else if (meshes[i].name === 'quface') {
                meshes[i].material = this.earthMat;
                this.quface = meshes[i];
                this.quface.isVisible = false;
            } else if (meshes[i].name === 'pTorus1') {
                meshes[i].material = this.eMat;
                meshes[i].rotation.y = Math.PI;
            }
            meshes[i].rotationQuaternion = null;
        }
        this.eMat.setFloat('pi', Math.PI / 2);
        this.scene.registerBeforeRender(() => {
            this.eMat.setFloat('rotation', -this.equatorial.rotation.y);
        });
        this.reset();
    }

    getNoUserMediaCameraCall() {
        const options = { width: 160 / window.screen.height * window.screen.width, height: 160 };
        this.bg = this.createPlan( new Vector3(0, 0, 50), options, this.scene);
        this.bg.isPickable = false;
        this.bg.scaling.x = -1;
        this.bg.setParent(this.camera);
        this.bg.rotation.z = Math.PI;
        this.camera.position = new Vector3(-5, 5, -40);
    }

    getUserMediaCameraCall(v: string) {
        const constraints = { minWidth: 512, maxWidth: 2048, minHeight: 512, maxHeight: 2048, deviceId: v };
        VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.videoTexture.video.play();
            const options = { width: 150 / this.videoTexture.getSize().height * this.videoTexture.getSize().width, height: 150 };
            this.bg = this.createPlan( new Vector3(0, 0, 50), options, this.scene);
            this.bgMat.emissiveTexture = this.videoTexture;
            this.bg.isPickable = false;
            this.bg.scaling.x = -1;
            this.bg.setParent(this.camera);
            this.bg.rotation.z = Math.PI;
            this.camera.position = new Vector3(-5, 5, -40);
        }, constraints);
    }

    createPlan( position: Vector3, options: { width?: number; height?: number; }, scene: Scene): Mesh {
        this.bgMat = new StandardMaterial('videoMat', scene);
        this.bgMat.diffuseColor = new Color3(0, 0, 0);
        this.bgMat.useAlphaFromDiffuseTexture = true;
        this.bgMat.specularColor = new Color3(0, 0, 0);
        this.bgMat.emissiveTexture = null;
        this.bgMat.backFaceCulling = false;
        this.bgMat.emissiveColor = Color3.FromHexString('#222222');
        const plan = MeshBuilder.CreatePlane('plan', options, scene);
        plan.material = this.bgMat;
        plan.position = position;
        return plan;
    }

    surfaceEvent(ist: boolean) {
        this.earthMat.diffuseColor = ist ? Color3.FromHexString('#007f85') : Color3.FromHexString('#005d62');
        this.setMeshVisible([this.polySurface4], !ist);
        this.setMeshVisible([this.quface, this.halfLine], ist);
        this.labelSurface.isVisible = ist;
    }

    perimeterEvent(ist: boolean) {
        this.scene.stopAllAnimations();
        if (ist) {
            this.createAnimation(0, -Math.PI * 2);
            this.scene.beginDirectAnimation(this.equatorial, [this.animaRot], 0, 180, false, 1, () => {
                this.labelEquL.isVisible = true;
            });
        } else {
            this.labelEquL.isVisible = false;
            this.equatorial.rotation.y = 0;
        }
    }

    /**
     * 创建动画
     * @param fromTargetPos
     * @param toTargetPos
     */
    createAnimation(fromTargetPos: number, toTargetPos: number) {
        this.animaRot = new Animation('rotation_y', 'rotation.y', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaRot.setKeys([{ frame: 0, value: fromTargetPos }, { frame: 180, value: toTargetPos }]);
    }

    reset(): void {
        this.camera.detachControl(this.canvas);
        this.camera.position = new Vector3(0, 5, -40);
        this.camera.attachControl(this.canvas, true);
        this.perimeterEvent(false);
        this.surfaceEvent(false);
    }
}
