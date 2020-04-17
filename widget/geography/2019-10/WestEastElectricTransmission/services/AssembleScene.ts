import Vue from 'vue';
import {
    Vector3, Texture, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, Animation, AnimationEvent, LinesMesh, Color3
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Label } from './Label';
import { LabelSystem } from './LabelSystem';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';


import bg from '../sub_static/image/bg.png';
import front from '../sub_static/image/front.png';

export class AssembleScene extends OrthoGraphicScene {
    edgesWidth = 8;
    viewModel: ViewModel;
    bgTex40: Texture; //背景图
    frontTex: Texture; //前景图

    bgMat: StandardMaterial; //背景材质
    tipA: Mesh;
    tipB: Mesh;
    lineA: LinesMesh; //线条A
    lineB: LinesMesh; //线条B
    frontM: Mesh; //前景图模型
    frontMessage = new Label().frontMessage;
    btngs: Array<Array<LabelSystem>> = []; //标签
    titles = [];
    frameRate = 25; //帧
    animaPosA: Animation;  //位移动画A
    animaPosB: Animation;  //位移动画B
    startPosA = new Vector3(0, 0, 0);  //起始点A
    startPosB = new Vector3(0, 0, 0);  //起始点B
    endPos = new Vector3(0, 0, 0);  //终点
    animaing = false; //动画是否结束

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize(600, 500);
    }

    initValue(advancedTex: GUI.AdvancedDynamicTexture, scene: Scene): void {
        const ImageLabelOption = { height: '20px', width: '20px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }

        for (let i = 0; i < this.frontMessage.length; i++) {
            const btng = [];
            const tip = new Mesh('a');
            tip.position = this.frontMessage[i].textpos;
            const txt = LabelUtils.CreateLabel(advancedTex, tip, this.frontMessage[i].text,
                { height: 30, width: 200, color: '#222222', fontSize: '24px', fontFamily: '', fontStyle: '' });
            txt.isVisible = false;
            for (let j = 0; j < this.frontMessage[i].location.length; j++) {
                const ele = this.frontMessage[i].location[j];
                const btn = new LabelSystem(ele.text, advancedTex, scene).init(ele.img)
                    .createLabel(ele.offsetX, ele.offsetY).setPos(ele.pos).setLabelVisible(false);
                btng.push(btn);
            }
            this.btngs.push(btng);
            this.titles.push(txt);
        }
        this.tipA = new Mesh('a');
        this.tipB = new Mesh('b');
        this.lineA = LinesBuild.CreateUpdateLines([this.startPosA, Vector3.Zero()],
            Color3.FromHexString('#F7B500'), this.edgesWidth, this.lineA, scene);
        this.lineB = LinesBuild.CreateUpdateLines([this.startPosB, Vector3.Zero()],
            Color3.FromHexString('#F7B500'), this.edgesWidth, this.lineB, scene);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.TargetCamera(scene, 600, 500);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);

        const option = { width: 1130, height: 910 };
        this.bgTex40 = new Texture(bg, scene);
        this.bgTex40.hasAlpha = true;
        this.bgMat = PlanUtils.CreateMaterial('bgMat', this.bgTex40, scene);
        const bgPlan = PlanUtils.CreatePlan(this.bgMat, new Vector3(0, 0, 1), option, scene);
        bgPlan.alphaIndex = 0;

        this.frontTex = PlanUtils.CreateTexture(front, 1 / 3, 1, 0, 0, scene);
        this.frontTex.hasAlpha = true;
        this.frontM = MeshBuilder.CreatePlane('tpA', { width: 210, height: 210 }, scene);
        this.frontM.material = PlanUtils.CreateMaterial('frontMat', this.frontTex, scene);
        scene.registerBeforeRender(() => {
            if (this.animaing) {
                this.updateMeshVertData(this.lineB, Vector3Utils.ToArray([this.startPosB, this.tipB.position]));
                this.updateMeshVertData(this.lineA, Vector3Utils.ToArray([this.startPosA, this.tipA.position]));
            }
        });
        this.reset();
        return scene;
    }

    selectModeEvent(index: number) {
        this.setMeshVisible([this.lineA, this.lineB], index >= 0);
        if (this.animaPosA) {
            this.scene.stopAllAnimations();
        }
        this.setMeshVisible([this.frontM], false);
        if (index >= 0) {
            this.startPosA = this.frontMessage[index].fromPos;
            this.startPosB = this.frontMessage[index].fromPos2;
            this.endPos = this.frontMessage[index].endPos;
            this.animaPosA = new Animation('posA', 'position', this.frameRate,
                Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
            this.animaPosA.setKeys([{ frame: 0, value: this.startPosA }, { frame: 100, value: this.endPos }]);
            this.animaPosB = new Animation('posB', 'position', this.frameRate,
                Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
            this.animaPosB.setKeys([{ frame: 0, value: this.startPosB }, { frame: 100, value: this.endPos }]);
            this.frontTex.uOffset = this.frontMessage[index].uOffset;
            this.frontM.position = this.frontMessage[index].pos;
            for (let i = 0; i < this.titles.length; i++) {
                this.titles[i].isVisible = index === i;
                if (i === index) {
                    for (let j = 0; j < this.btngs[i].length; j++) {
                        this.animaPosA.addEvent(new AnimationEvent(this.frontMessage[i].location[j].frame,
                            (frame) => { this.btngs[i][j].setLabelVisible(true); }, true));
                    }
                } else {
                    for (let j = 0; j < this.btngs[i].length; j++) {
                        this.btngs[i][j].setLabelVisible(index === i);
                    }
                }
            }
            this.animaing = true;
            this.scene.beginDirectAnimation(this.tipA, [this.animaPosA], 0, 100, false, 1, () => {
                this.setMeshVisible([this.frontM], true);
                this.animaing = false;
            });
            this.scene.beginDirectAnimation(this.tipB, [this.animaPosB], 0, 100, false, 1);
        } else {
            for (let i = 0; i < this.titles.length; i++) {
                this.titles[i].isVisible = false;
                for (let j = 0; j < this.btngs[i].length; j++) {
                    this.btngs[i][j].setLabelVisible(false);
                }
            }
            this.animaing = false;
            this.setMeshVisible([this.frontM], false);
        }
    }

    reset() {
        this.selectModeEvent(-1);
    }
}
