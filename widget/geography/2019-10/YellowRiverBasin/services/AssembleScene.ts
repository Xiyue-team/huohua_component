import Vue from 'vue';
import {
    Vector3, Texture, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, Curve3, TransformNode,
    Animation, AnimationEvent
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { SrcUtils } from '../SrcUtils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import curve from '../sub_static/curve.json';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    src: SrcUtils;
    bgTex40: Texture; //背景图片
    bgMat: StandardMaterial; //背景材质
    tipTex: Texture; //定位标记图片
    tip: Mesh; //定位面片
    dot: Mesh;
    animaNode: TransformNode;
    animaRotate: Animation;  //动画
    frameRate = 25; //帧
    bCurve: any[] = [];

    riverPlan: Mesh; //河流流域面片
    fristCreateProvince = true;
    fristCreateLocation = true;
    fristCreateRiver = true;
    pathPlan: Mesh; //河流路径面片

    constructor(vm: Vue) {
        super();
        this.skipFrameCount = 16;
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize(900, 420);
    }

    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.animaNode = new TransformNode('anima');
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }
        for (let i = 0; i < this.src.btns.length; i++) {
            const tip = new Mesh('AA');
            tip.position = this.src.btns[i].pos;
            this.src.btns[i].btn = LabelUtils.CreateDot(advancedTexture, tip, this.src.btns[i].img, ImageLabelOption);
            this.src.btns[i].btn.onPointerClickObservable.add(() => {
                this.buttonEvent(i);
            });
        }
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        this.src = new SrcUtils();
        const scene = new Scene(engine);
        scene.clearCachedVertexData();
        scene.clearColor.set(0.9647058823529412, 0.9725490196078431, 0.9921568627450981, 1);
        this.TargetCamera(scene, 900, 420);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);

        const option = { width: 1800, height: 840 };
        this.bgTex40 = new Texture(this.src.bg, scene);
        this.bgTex40.hasAlpha = true;
        this.bgMat = PlanUtils.CreateMaterial('bgMat', this.bgTex40, scene);
        const bgPlan = PlanUtils.CreatePlan(this.bgMat, new Vector3(0, 0, 1), option, scene);
        bgPlan.alphaIndex = 0;

        const riverTex = new Texture(this.src.river, this.scene);
        riverTex.hasAlpha = true;
        const bgMat = PlanUtils.CreateMaterial('bgMat', riverTex, this.scene);
        this.riverPlan = bgPlan.clone();
        this.riverPlan.material = bgMat;
        this.riverPlan.isVisible = false;

        const pathTex = new Texture(this.src.path, this.scene);
        pathTex.hasAlpha = true;
        const pathMat = PlanUtils.CreateMaterial('bgMat', pathTex, this.scene);
        this.pathPlan = bgPlan.clone();
        this.pathPlan.material = pathMat;
        this.pathPlan.isVisible = false;
        this.pathPlan.renderingGroupId = 2;

        this.tipTex = PlanUtils.CreateTexture(this.src.tip, 1, 1, 0, 0, scene);
        this.tipTex.hasAlpha = true;
        this.tip = MeshBuilder.CreatePlane('tipA', { width: 40, height: 80 }, scene);
        this.tip.material = PlanUtils.CreateMaterial('tipMat', this.tipTex, scene);
        this.tip.renderingGroupId = 3;
        this.tip.isVisible = false;

        this.bCurve = JSON.parse(JSON.stringify(curve));
        this.reset();
        return scene;
    }

    /**
     * 创建省份面片
     */
    createProvince() {
        const tip = MeshBuilder.CreatePlane('ti', { width: 1800, height: 840 }, this.scene);
        for (let i = 0; i < this.src.frontList.length; i++) {
            const element = this.src.frontList[i];
            element.texf = new Texture(element.frontf, this.scene);
            element.texf.hasAlpha = true;
            element.texb = new Texture(element.frontb, this.scene);
            element.texb.hasAlpha = true;
            element.mat = PlanUtils.CreateMaterial('tipMat', element.texf, this.scene);
            element.mesh = tip.clone();
            element.mesh.material = element.mat;
            element.mesh.isVisible = false;
            element.mesh.isPickable = false;
        }
        tip.dispose();
    }

    disposeProvince() {
        for (let i = 0; i < this.src.frontList.length; i++) {
            const element = this.src.frontList[i];
            if (element.texf !== null) {
                element.texf.dispose();
                element.texb.dispose();
                element.mat.dispose();
                element.mesh.dispose();
                element.texf = null;
                element.texb = null;
                element.mat = null;
                element.mesh = null;
            }
        }
        if (this.scene) {
            this.scene.cleanCachedTextureBuffer();
        }
    }

    /**
     * 创建地点面片
     */
    createLocation() {
        if (this.fristCreateLocation) {
            const tipText = MeshBuilder.CreatePlane('tipA', { width: 700, height: 465 }, this.scene);
            for (let i = 0; i < this.src.loList.length; i++) {
                const element = this.src.loList[i];
                const tex = new Texture(element.tex, this.scene);
                tex.hasAlpha = true;
                const mat = PlanUtils.CreateMaterial('tipMat', tex, this.scene);
                element.mesh = tipText.clone();
                element.mesh.material = mat;
                element.mesh.isPickable = false;
                element.mesh.position = element.pos;
            }
            tipText.dispose();
            this.fristCreateLocation = false;
        }
    }

    /**
     * 创建河流路径面片
     */
    createRiverLine() {
        if (this.fristCreateRiver) {
            const tip = MeshBuilder.CreatePlane('ti', { width: 1800, height: 840 }, this.scene);
            for (let i = 0; i < this.src.lineList.length; i++) {
                const element = this.src.lineList[i];
                element.texf = new Texture(element.frontf, this.scene);
                element.texf.hasAlpha = true;
                const mat = PlanUtils.CreateMaterial('tipMat', element.texf, this.scene);
                element.mesh = tip.clone();
                element.mesh.material = mat;
                element.mesh.isVisible = false;
                element.mesh.isPickable = false;
            }
            tip.dispose();
            this.fristCreateRiver = false;
        }
    }

    selectModeEvent(index: number) {
        this.viewModel.value = 0;
        this.tip.position = this.bCurve[0];
        this.tip.isVisible = index === 0 || index === 2;
        if (this.riverPlan) {
            this.riverPlan.isVisible = index === 0;
        }
        if (this.pathPlan) {
            this.pathPlan.isVisible = index === 0;
        }
        this.disposeProvince();
        if (index === 0) {
            this.createProvince();
        } else if (index === 1) {
            this.createLocation();
            this.createAnimation(0, -Math.PI);
            this.scene.beginDirectAnimation(this.animaNode, [this.animaRotate], 0, 72, false, 1);
        } else if (index === 2) {
            this.createRiverLine();
        } else if (index === 3) {

        }
        if (index !== 1) {
            if (this.animaRotate) {
                this.scene.stopAllAnimations();
            }
            for (let j = 0; j < this.src.loList.length; j++) {
                if (this.src.loList[j].mesh !== null) {
                    this.src.loList[j].mesh.isVisible = false;
                }
            }
        }

        for (let n = 0; n < this.src.lineList.length; n++) {
            if (this.src.lineList[n].mesh !== null) {
                this.src.lineList[n].mesh.isVisible = false;
            }
        }

        for (let n = 0; n < this.src.frontList.length; n++) {
            if (this.src.frontList[n].mesh !== null) {
                this.src.frontList[n].mesh.isVisible = false;
            }
        }

        for (let n = 0; n < this.src.btns.length; n++) {
            if (index === 3) {
                this.src.btns[n].btn.isVisible = n < 4;
            } else {
                this.src.btns[n].btn.isVisible = false;
            }
        }
    }

    /**
     * 创建动画
     * @param fromRotate
     * @param toRotate
     */
    createAnimation(fromRotate: number, toRotate: number) {
        this.animaRotate = new Animation('position', 'position.y', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaRotate.setKeys([{ frame: 0, value: fromRotate }, { frame: 72, value: toRotate }]);
        for (let i = 0; i < this.src.loList.length; i++) {
            this.src.loList[i].mesh.isVisible = false;
            this.animaRotate.addEvent(new AnimationEvent(this.src.loList[i].frame,
                (frame) => {
                    this.src.loList[i].mesh.isVisible = true;
                }, true));
        }
    }
    /**
     * 滑动条回调
     * @param i
     */
    formatter(i: number) {
        this.tip.position = this.bCurve[Math.floor(i / 50 * 422)];
        if (this.viewModel.selectMode === 0) {//省份
            for (let index = 0; index < this.src.frontList.length; index++) {
                const element = this.src.frontList[index];
                element.mesh.material.diffuseTexture = i > element.change ? element.texb : element.texf;
                element.mesh.isVisible = i > element.show;
            }
        } else if (this.viewModel.selectMode === 2) {
            for (let index = 0; index < this.src.btns.length; index++) {
                this.src.btns[index].btn.isVisible = index > 3 && i > this.src.btns[index].active;
            }
            for (let j = 0; j < this.src.lineList.length; j++) {
                this.src.lineList[j].mesh.isVisible = i > this.src.lineList[j].show;
            }
        }
    }

    buttonEvent(type: number) {
        this.viewModel.buttonActived = type;
        if (type !== -1) {
            this.viewModel.item = this.viewModel.showList[type];
        } else {
            this.viewModel.item = null;
        }
    }

    reset() {
        this.selectModeEvent(-1);
    }
}
