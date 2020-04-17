/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/10/1 21:10
 */
import Vue from 'vue';
import {
    Vector3, Color3, LinesMesh, Scene, Engine, StandardMaterial, Mesh, AbstractMesh, Color4, TransformNode, Animation
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    edgesWidth = 8; //线宽

    hexGreen = '#18A2FF';
    hexGray = '#9B9B9B';
    hexBlue = '#18A2FF';
    hexBlueS = '#0076FF';
    hexYellow = '#FFD622';
    hexOrange = '#F5A623';
    colorGreen: Color3;
    colorGray: Color3;
    colorBlue: Color3;
    colorBlueS: Color3;
    colorYellow: Color3;
    colorOrange: Color3;

    matGreen: StandardMaterial;
    matYellow: StandardMaterial;
    matBlue: StandardMaterial;

    tip: Mesh; //移动点
    meshA: Mesh;
    meshB: Mesh;
    meshTran: Mesh;
    dotControl: GUI.Control; //移动标签

    //标注点
    tipVb: Mesh;
    tipHb: Mesh;
    tipVb2: Mesh;
    tipVab: Mesh;
    tipHa: Mesh;
    tipVa: Mesh;
    tipHab: Mesh;

    //标注线条
    lineHb: LinesMesh;
    lineVab: LinesMesh;
    lineHa: LinesMesh;
    lineVa: LinesMesh;
    lineVag: LinesMesh;
    lineHab: LinesMesh;

    //短线条
    shortV1: LinesMesh;
    shortV2: LinesMesh;
    shortV3: LinesMesh;
    shortV4: LinesMesh;
    shortV5: LinesMesh;
    shortV6: LinesMesh;
    shortH1: LinesMesh;
    shortH2: LinesMesh;
    shortH3: LinesMesh;
    shortH4: LinesMesh;
    shortH5: LinesMesh;
    shortH6: LinesMesh;
    shortH7: LinesMesh;

    border = 20; //正方形边界
    aPoints = [new Vector3(0, this.border, 0), new Vector3(this.border, this.border, 0),
    new Vector3(0, 0, 0), new Vector3(this.border, 0, 0)];
    group: TransformNode; //动画组
    area = 0;
    animaPos: Animation; //位置动画
    animaRotate: Animation;  //旋转动画
    frameRate = 25; //帧
    labelVb2: GUI.TextBlock;
    labelVa: GUI.TextBlock;
    labelHa: GUI.TextBlock;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize(22, 22);
    }

    /**
     * 初始化颜色
     */
    initColor(scene: Scene) {
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorGray = Color3.FromHexString(this.hexGray);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorBlueS = Color3.FromHexString(this.hexBlueS);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.colorOrange = Color3.FromHexString(this.hexOrange);

        this.matGreen = MaterialLab.CreateLightMaterial(this.colorGreen, scene);
        this.matBlue = MaterialLab.CreateLightMaterial(new Color3(0.2, 0.2, 0.2), scene);
        this.matYellow = MaterialLab.CreateLightMaterial(new Color3(0.2, 0.2, 0.2), scene);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        if (this.isMob) {
            this.tip = Mesh.CreateSphere('tipC', 8, 3.7, scene);
        } else {
            this.tip = Mesh.CreateSphere('tipC', 8, 2.5, scene);
        }
        this.tip.position = this.getPoint(5, this.border);
        this.setMeshVisible([this.tip], false);
        this.group = new TransformNode('g');
        this.tipVb = new Mesh('l');
        this.tipVb2 = new Mesh('l');
        this.tipHb = new Mesh('l');
        this.tipVab = new Mesh('l');
        this.tipHa = new Mesh('l');
        this.tipVa = new Mesh('l');
        this.tipHab = new Mesh('l');
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor(scene);
        this.initMesh(scene);
        const options = {
            height: 30, width: 60, color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob && window.screen.height > 599) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.width = 120;
            options.height = 60;
            options.fontSize = '48px';
        }
        this.dotControl = LabelUtils.CreateDot(advancedTexture, this.tip, dot, ImageLabelOption);
        LabelUtils.CreateLabel(advancedTexture, this.tipVb, 'b', options);
        this.labelVb2 = LabelUtils.CreateLabel(advancedTexture, this.tipVb2, 'b', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipHb, 'b', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipVab, 'a-b', options);
        this.labelHa = LabelUtils.CreateLabel(advancedTexture, this.tipHa, 'a', options);
        this.labelVa = LabelUtils.CreateLabel(advancedTexture, this.tipVa, 'a', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipHab, 'a-b', options);

        this.shortV1 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortV2 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortV3 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortV4 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortV5 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortV6 = LinesBuild.CreateLines([new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH1 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH2 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH3 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH4 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH5 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH6 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.shortH7 = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(-0.5, 0, 0)], this.colorGray, this.edgesWidth, scene);
        this.lineVab = LinesBuild.CreateLines([new Vector3(-0.5, this.border, 0), new Vector3(-0.5, 0, 0)],
            this.colorGray, this.edgesWidth, scene);
        this.lineHb = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorGray, this.edgesWidth, this.lineHb, scene);
        this.lineHa = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorGray, this.edgesWidth, this.lineHa, scene);
        this.lineHab = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorGray, this.edgesWidth, this.lineHab, scene);
        this.lineVa = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorGray, this.edgesWidth, this.lineVa, scene);
        this.lineVag = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorGray, this.edgesWidth, this.lineVag, scene);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.TargetCamera(scene, 22, 22);
        this.camera.position = new Vector3(this.border / 2 + 8, this.border / 2, -5);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        const meshAPoints = [[this.aPoints[0], this.aPoints[1]], [this.aPoints[2], this.aPoints[3]]];
        this.meshA = Mesh.CreateRibbon('ribbon', meshAPoints, false, false, 0, this.scene, true, Mesh.DOUBLESIDE, this.meshA);
        this.meshA.material = this.matBlue;
        this.meshA.edgesWidth = this.edgesWidth;
        this.meshB = Mesh.CreateRibbon('ribbon', meshAPoints, false, false, 0, this.scene, true, Mesh.DOUBLESIDE, this.meshB);
        this.meshB.edgesWidth = this.edgesWidth;
        this.meshB.material = this.matYellow;
        this.meshTran = Mesh.CreateRibbon('ribbon', meshAPoints, false, false, 0, this.scene, true, Mesh.DOUBLESIDE, this.meshTran);
        this.meshTran.edgesWidth = this.edgesWidth;
        this.meshTran.isVisible = false;
        this.setMeshPickable([this.meshA, this.meshB, this.meshTran], false);
        const pickinfoMesh = Mesh.CreatePlane('plan', 160, scene);
        pickinfoMesh.isVisible = false;
        this.addPointerEventListener(pickinfoMesh, canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        startingPoint.x = startingPoint.x < 0 ? 0 : startingPoint.x > this.border ? this.border : startingPoint.x;
        currentMesh.position = this.getPoint(startingPoint.x, this.border);
        this.updateAreaB();
        this.updateLabel();
    }

    /**
     * 更新A正方形
     */
    updateAreaA() {
        const meshAPoints = [[new Vector3(this.aPoints[0].x, this.tip.position.y, 0),
        new Vector3(this.aPoints[1].x, this.tip.position.y, 0)],
        [this.aPoints[2], this.aPoints[3]]];
        this.meshA = Mesh.CreateRibbon(null, meshAPoints, null, null, null, null, null, null, this.meshA);
        this.setMeshColor(this.meshA, this.matBlue, this.colorBlueS, this.area === 2 || this.area === 0);
    }

    /**
     * 更新B正方形
     */
    updateAreaB() {
        const meshBPoints = [[new Vector3(0, this.tip.position.y, 0), new Vector3(this.tip.position.x, this.tip.position.y, 0)],
        [new Vector3(0, this.border, 0), new Vector3(this.tip.position.x, this.border, 0)]];
        this.meshB = Mesh.CreateRibbon(null, meshBPoints, null, null, null, null, null, null, this.meshB);
        this.setMeshColor(this.meshB, this.matYellow, this.colorOrange, this.area === 3 || this.area === 0);
    }

    /**
     * 更新变化图形
     */
    updateAreaTran() {
        const meshtPoints = [[new Vector3(this.tip.position.x, this.tip.position.y, 0),
        new Vector3(this.aPoints[1].x, this.tip.position.y, 0)],
        [new Vector3(this.tip.position.x, this.border, 0), this.aPoints[1]]];
        this.meshTran = Mesh.CreateRibbon(null, meshtPoints, null, null, null, null, null, null, this.meshTran);
        this.setMeshColor(this.meshTran, this.matBlue, this.colorBlueS, this.area === 2 || this.area === 0);
    }
    /**
     * 更新标签
     */
    updateLabel() {
        const posP = this.tip.position;
        let offset = 2.5;
        if (this.isMob) {
            offset = 2.5;
        }
        this.tipVb.position = new Vector3(-offset, this.border - posP.x / 2, 0);
        this.tipVb2.position = new Vector3(this.border + offset, this.border - posP.x / 2, 0);
        this.tipHb.position = new Vector3(posP.x / 2, this.border + offset, 0);
        this.tipVab.position = new Vector3(-offset, (this.border - posP.x) / 2, 0);
        this.tipHa.position = new Vector3(this.border / 2, -offset, 0);
        this.tipVa.position = new Vector3(this.border + offset, this.border / 2, 0);
        this.tipHab.position = new Vector3(posP.x + (this.border - posP.x) / 2, this.border + offset, 0);

        this.shortH1.position = new Vector3(-0.5, this.border, 0);
        this.shortH2.position = new Vector3(-0.5, posP.y, 0);
        this.shortH3.position = new Vector3(-0.5, 0, 0);

        this.shortH4.position = new Vector3(this.border + 0.5, this.border, 0);
        this.shortH5.position = new Vector3(this.border + 0.5, posP.y, 0);
        this.shortH6.position = new Vector3(this.border + 0.5, posP.y, 0);

        this.shortH7.position = new Vector3(this.border + 0.5, 0, 0);

        this.shortV1.position = new Vector3(0, this.border + 0.5, 0);
        this.shortV2.position = new Vector3(posP.x, this.border + 0.5, 0);
        this.shortV3.position = new Vector3(posP.x, this.border + 0.5, 0);
        this.shortV4.position = new Vector3(this.border, this.border + 0.5, 0);

        this.shortV5.position = new Vector3(0, -0.5, 0);
        this.shortV6.position = new Vector3(this.border, -0.5, 0);
        this.updateMeshVertData(this.lineVa,
            Vector3Utils.ToArray([new Vector3(this.border + 0.5, posP.y, 0), new Vector3(this.border + 0.5, 0, 0)]));
        this.updateMeshVertData(this.lineVag,
            Vector3Utils.ToArray([new Vector3(this.border + 0.5, this.border, 0), new Vector3(this.border + 0.5, posP.y, 0)]));
        this.updateMeshVertData(this.lineHa,
            Vector3Utils.ToArray([new Vector3(this.border, -0.5, 0), new Vector3(0, -0.5, 0)]));
        this.updateMeshVertData(this.lineHb,
            Vector3Utils.ToArray([new Vector3(posP.x, this.border + 0.5, 0), new Vector3(0, this.border + 0.5, 0)]));
        this.updateMeshVertData(this.lineHab,
            Vector3Utils.ToArray([new Vector3(posP.x, this.border + 0.5, 0), new Vector3(this.border, this.border + 0.5, 0)]));
    }

    /**
    * 获取点
    */
    getPoint(x: number, b: number): Vector3 {
        return new Vector3(x, -x + b, 0);
    }

    /**
    * 说明 按钮
    */
    descriptionEvent(isTrue: boolean) {
        if (this.tip.position.x !== 0 && this.tip.position.x !== this.border) {
            this.labelVa.text = 'a';
            this.labelHa.text = 'a';
            this.tip.isPickable = !isTrue;
            this.dotControl.isVisible = !isTrue;
            this.meshTran.isVisible = isTrue;
            this.setMeshVisible([this.shortH5, this.shortH6], isTrue);
            this.labelVb2.isVisible = isTrue;
            this.labelVa.isVisible = true;
            if (isTrue) {
                this.updateAreaA();
                this.updateAreaTran();
                this.group.position = new Vector3(this.aPoints[1].x, this.tip.position.y, 0);
                this.meshTran.setParent(this.group);
                this.lineVag.setParent(this.group);
                this.lineHab.setParent(this.group);
                this.shortH4.setParent(this.group);
                this.shortH5.setParent(this.group);
                this.shortV3.setParent(this.group);
                this.shortV4.setParent(this.group);
                this.tipVb2.setParent(this.group);
                this.tipHab.setParent(this.group);
                this.tipVa.position = new Vector3(this.border + 1.5, this.tip.position.y / 2, 0);
                this.labelVa.text = 'a-b';
                this.createAnimation(this.tip.position.y, 0, 0, -Math.PI / 2);
                this.scene.beginDirectAnimation(this.group, [this.animaRotate], 0, 48, false, 1, () => {
                    this.labelVa.isVisible = false;
                    this.setMeshVisible([this.shortH6, this.shortH7, this.lineVa], false);
                    this.scene.beginDirectAnimation(this.group, [this.animaPos], 0, 36, false, 1, () => {
                        this.animationFinish();
                    });
                });
            } else {
                if (this.animaPos || this.animaRotate) {
                    this.scene.stopAllAnimations();
                }
                this.setMeshVisible([this.shortH7, this.lineVa], true);
                this.setMeshVisible([this.shortV6], true);
                this.tipVa.position = new Vector3(this.border + 1.5, this.border / 2, 0);
                this.tipHa.position = new Vector3(this.border / 2, -1.5, 0);
                this.group.position.y = this.tip.position.y;
                this.group.rotation.z = 0;
                this.meshTran.setParent(null);
                this.lineVag.setParent(null);
                this.lineHab.setParent(null);
                this.shortH4.setParent(null);
                this.shortH5.setParent(null);
                this.shortV3.setParent(null);
                this.shortV4.setParent(null);
                this.tipVb2.setParent(null);
                this.tipHab.setParent(null);
                this.group.position = Vector3.Zero();
                const meshAPoints = [[this.aPoints[0], this.aPoints[1]], [this.aPoints[2], this.aPoints[3]]];
                this.meshA = Mesh.CreateRibbon(null, meshAPoints, null, null, null, null, null, null, this.meshA);
                this.setMeshColor(this.meshA, this.matBlue, this.colorBlueS, this.area === 2 || this.area === 0);
            }
        } else {
            this.tip.isPickable = !isTrue;
            this.dotControl.isVisible = !isTrue;
        }
    }

    /**
     * 动画回调
     */
    animationFinish() {
        this.meshTran.isVisible = false;
        this.labelHa.text = 'a+b';
        const meshAPoints = [[new Vector3(this.aPoints[0].x, this.tip.position.y, 0),
        new Vector3(this.aPoints[1].x + this.border - this.tip.position.y, this.tip.position.y, 0)],
        [this.aPoints[2], new Vector3(this.aPoints[1].x + this.border - this.tip.position.y, 0, 0)]];
        this.meshA = Mesh.CreateRibbon(null, meshAPoints, null, null, null, null, null, null, this.meshA);
        this.setMeshColor(this.meshA, this.matBlue, this.colorBlueS, this.area === 2 || this.area === 0);
        this.tipHa.position.x = (this.border + this.tip.position.x) / 2;
        this.setMeshVisible([this.shortH5, this.shortV6], false);
        this.labelVb2.isVisible = false;
    }

    /**
     * 创建动画
     * @param fromPos 
     * @param toPos
     * @param fromRotate 
     * @param toRotate 
     */
    createAnimation(fromPos: number, toPos: number, fromRotate: number, toRotate: number) {
        this.animaPos = new Animation('position', 'position.y', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaPos.setKeys([{ frame: 0, value: fromPos }, { frame: 36, value: toPos }]);

        this.animaRotate = new Animation('rotation', 'rotation.z', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaRotate.setKeys([{ frame: 0, value: fromRotate }, { frame: 48, value: toRotate }]);
    }

    inductionEvent(index: number) {
        this.area = index;
        this.setMeshColor(this.meshA, this.matBlue, this.colorBlueS, index === 2 || index === 0);
        this.setMeshColor(this.meshB, this.matYellow, this.colorOrange, index === 3 || index === 0);
        if (this.meshTran) {
            this.setMeshColor(this.meshTran, this.matBlue, this.colorBlueS, this.area === 2 || this.area === 0);
        }
    }
    /**
     * 设置模型颜色
     * @param mesh 
     * @param mat 
     * @param color 
     * @param isT 
     */
    setMeshColor(mesh: Mesh, mat: StandardMaterial, color: Color3, isT: boolean) {
        if (isT) {
            mesh.material = mat;
            mesh.edgesColor = Color4.FromColor3(color, 1);
        } else {
            mesh.material = this.matGreen;
            mesh.edgesColor = Color4.FromColor3(this.colorGray, 1);
        }
        mesh.enableEdgesRendering();
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.descriptionEvent(false);
        this.tip.position = this.getPoint(5, this.border);
        this.updateAreaB();
        this.updateLabel();
        this.inductionEvent(0);

        this.labelVa.isVisible = true;
    }
}
