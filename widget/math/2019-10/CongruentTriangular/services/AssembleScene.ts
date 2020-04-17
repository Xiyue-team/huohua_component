/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/9/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Engine, Color4, Matrix, StandardMaterial, Animation, AnimationEvent
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexBlue = '#6ECFFF';
    hexGreen = '#7ED321';
    hexPure = '#BD10E0';
    hexYellow = '#F5A623';
    colorGreen: Color3;
    colorBlue: Color3;
    colorPure: Color3;
    colorYellow: Color3;

    tipC: Mesh; //模型C
    tipB: Mesh; //模型B
    tipA: Mesh; //模型A
    lineAB: LinesMesh; //线AB
    lineAC: LinesMesh; //线AC
    lineBC: LinesMesh; //线BC

    tipCC: Mesh; //模型C2
    tipBB: Mesh; //模型B2
    tipAA: Mesh; //模型A2

    tiplA: Mesh; //模型A
    tiplB: Mesh; //模型B
    tiplC: Mesh; //模型C

    tiplA2: Mesh; //模型A2
    tiplB2: Mesh; //模型B2
    tiplC2: Mesh; //模型C2

    lineAB2: LinesMesh; //线AB2
    lineAC2: LinesMesh; //线AC2
    lineBC2: LinesMesh; //线BC2

    groupHand: GUI.Control;
    group: Mesh; //组
    animaRotate: Animation;  //旋转动画
    frameRate = 25; //帧

    labelA: GUI.Control;
    labelB: GUI.Control;
    labelC: GUI.Control;

    LineAngleA: AbstractMesh; //角A
    LineAngleB: AbstractMesh; //角B
    LineAngleC: AbstractMesh; //角C
    LineAngleA2: AbstractMesh; //角A2
    LineAngleB2: AbstractMesh; //角B2
    LineAngleC2: AbstractMesh; //角C2
    matA: StandardMaterial;
    matB: StandardMaterial;
    matC: StandardMaterial;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.offset = 9;
        this.init();
    }

    resize() {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorPure = Color3.FromHexString(this.hexPure);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipA = new Mesh('AA');
        this.tipB = new Mesh('AA');
        this.tipC = new Mesh('AA');

        if (this.isMob) {
            this.group = Mesh.CreateSphere('tipC', 8, 4, scene);
        } else {
            this.group = Mesh.CreateSphere('tipC', 8, 2, scene);
        }
        this.tipAA = new Mesh('AA');
        this.tipBB = new Mesh('BB');
        this.tipCC = new Mesh('CC');
        this.tiplA = new Mesh('AA');
        this.tiplB = new Mesh('BB');
        this.tiplC = new Mesh('CC');
        this.tiplA2 = new Mesh('AA');
        this.tiplB2 = new Mesh('BB');
        this.tiplC2 = new Mesh('CC');
        this.tipA.position = new Vector3(-7, -3, 0);
        this.tipB.position = new Vector3(7, -2, 0);
        this.tipC.position = new Vector3(-2, 6, 0);
        this.tipAA.setParent(this.group);
        this.tipBB.setParent(this.group);
        this.tipCC.setParent(this.group);
        this.tiplA2.setParent(this.group);
        this.tiplB2.setParent(this.group);
        this.tiplC2.setParent(this.group);
        this.setMeshVisible([this.group, this.tipA, this.tipB, this.tipC], false);
        this.matA = MaterialLab.CreateLightMaterial(this.colorGreen, scene);
        this.matB = MaterialLab.CreateLightMaterial(this.colorYellow, scene);
        this.matC = MaterialLab.CreateLightMaterial(this.colorPure, scene);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageOption = { height: '60px', width: '60px', color: '#FFFFFF' };
        const options = {
            height: 30, width: 30, color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageOption.height = ImageOption.width = '120px';
            options.width = options.height = 60;
            options.fontSize = '48px';
        }

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, dot2, ImageLabelOption);
        this.groupHand = LabelUtils.CreateDot(advancedTexture, this.group, dot, ImageOption);

        LabelUtils.CreateLabel(advancedTexture, this.tiplA, 'A', options);
        LabelUtils.CreateLabel(advancedTexture, this.tiplB, 'B', options);
        LabelUtils.CreateLabel(advancedTexture, this.tiplC, 'C', options);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipAA, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipBB, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipCC, dot2, ImageLabelOption);
        this.labelA = LabelUtils.CreateLabel(advancedTexture, this.tiplA2, `A'`, options);
        this.labelB = LabelUtils.CreateLabel(advancedTexture, this.tiplB2, `B'`, options);
        this.labelC = LabelUtils.CreateLabel(advancedTexture, this.tiplC2, `C'`, options);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 18);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position;
        this.lineAB = LinesBuild.CreateUpdateLines([posA, posB], this.colorBlue, this.edgesWidth, this.lineAB, scene);
        this.lineAC = LinesBuild.CreateUpdateLines([posA, posC], this.colorBlue, this.edgesWidth, this.lineAC, scene);
        this.lineBC = LinesBuild.CreateUpdateLines([posB, posC], this.colorBlue, this.edgesWidth, this.lineBC, scene);
        this.lineAB2 = LinesBuild.CreateUpdateLines([posA, posB], this.colorBlue, this.edgesWidth, this.lineAB2, scene);
        this.lineAC2 = LinesBuild.CreateUpdateLines([posA, posC], this.colorBlue, this.edgesWidth, this.lineAC2, scene);
        this.lineBC2 = LinesBuild.CreateUpdateLines([posB, posC], this.colorBlue, this.edgesWidth, this.lineBC2, scene);
        const axisA = posB.subtract(posA);
        const axisB = posB.subtract(posC);
        const axisC = posA.subtract(posC);

        this.LineAngleA = this.showAngleSector(posA, axisC.scale(-1), axisA, 1, scene);
        this.LineAngleB = this.showAngleSector(posB, axisA.scale(-1), axisB.scale(-1), 1, scene);
        this.LineAngleC = this.showAngleSector(posC, axisB, axisC, 1, scene);
        this.LineAngleA2 = this.showAngleSector(posA, axisC.scale(-1), axisA, 1, scene);
        this.LineAngleB2 = this.showAngleSector(posB, axisA.scale(-1), axisB.scale(-1), 1, scene);
        this.LineAngleC2 = this.showAngleSector(posC, axisB, axisC, 1, scene);
        this.LineAngleA.material = this.LineAngleA2.material = this.matA;
        this.LineAngleB.material = this.LineAngleB2.material = this.matB;
        this.LineAngleC.material = this.LineAngleC2.material = this.matC;
        this.LineAngleA2.setParent(this.group);
        this.LineAngleB2.setParent(this.group);
        this.LineAngleC2.setParent(this.group);
        this.lineAB2.setParent(this.group);
        this.lineAC2.setParent(this.group);
        this.lineBC2.setParent(this.group);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position;
        this.tipAA.position = posA;
        this.tipBB.position = posB;
        this.tipCC.position = posC;

        this.updateMeshVertData(this.lineAB, Vector3Utils.ToArray([posA, posB]));
        this.updateMeshVertData(this.lineAC, Vector3Utils.ToArray([posA, posC]));
        this.updateMeshVertData(this.lineBC, Vector3Utils.ToArray([posB, posC]));
        this.updateMeshVertData(this.lineAB2, Vector3Utils.ToArray([posA, posB]));
        this.updateMeshVertData(this.lineAC2, Vector3Utils.ToArray([posA, posC]));
        this.updateMeshVertData(this.lineBC2, Vector3Utils.ToArray([posB, posC]));

        if (this.group.rotation.z !== 0 && this.group.rotation.z !== 2 * Math.PI ||
            this.group.rotation.y !== 0 || Vector3.Distance(this.group.position, Vector3.Zero()) > 0.001) {
            this.setGUIVisible([this.labelA, this.labelB, this.labelC], true);
        } else {
            this.setGUIVisible([this.labelA, this.labelB, this.labelC], false);
        }
        this.updateLabelPos();
    }

    /**
      * 更新ABC标签位置
      */
    updateLabelPos() {
        let offset = 1;
        if (this.isMob && (window as any)['env'].browserInfo.isSmallDevice) {
            offset = 1.2;
        }
        const posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
        const posInsidea = Vector3.Normalize(this.tipA.position.subtract(posInside));
        const posInsideb = Vector3.Normalize(this.tipB.position.subtract(posInside));
        const posInsidec = Vector3.Normalize(this.tipC.position.subtract(posInsideb));
        this.tiplA.position = this.tipA.position.add(posInsidea.scale(offset));
        this.tiplB.position = this.tipB.position.add(posInsideb.scale(offset));
        this.tiplC.position = this.tipC.position.add(posInsidec.scale(offset));
        this.tiplA2.position = this.tipA.position.add(posInsidea.scale(offset));
        this.tiplB2.position = this.tipB.position.add(posInsideb.scale(offset));
        this.tiplC2.position = this.tipC.position.add(posInsidec.scale(offset));
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            currentMesh.position = startingPoint;
            this.updateLineData();
        }
    }

    /**
     * 角度滑条回调
     * @param angle 
     */
    formatter(angle: number) {
        this.group.rotation.z = angle / 180 * Math.PI;
        this.updateLineData();
    }

    selectEvent(index: number) {
        this.groupHand.isVisible = this.group.isPickable = index === 0;
    }

    rotateEvent(isT: boolean) {
        if (isT) {
            this.scene.stopAllAnimations();
            this.group.rotation.y = this.viewModel.selectActived === 2 ? -Math.PI : 0;
        }
    }

    foldEvent(isT: boolean) {
        this.groupHand.isVisible = this.group.isPickable = false;
        this.scene.stopAllAnimations();
        this.viewModel.panRotateDisabled = true;
        if (isT) {
            this.createAnimation(this.group.rotation.y, -Math.PI);
            this.scene.beginDirectAnimation(this.group, [this.animaRotate], 0, 72, false, 1,
                () => { this.viewModel.panRotateDisabled = false; });
        } else {
            this.createAnimation(this.group.rotation.y, 0);
            this.scene.beginDirectAnimation(this.group, [this.animaRotate], 0, 72, false, 1,
                () => { this.viewModel.panRotateDisabled = false; });
        }
    }

    /**
     * 创建动画
     * @param fromPos 
     * @param toPos
     * @param fromRotate 
     * @param toRotate 
     */
    createAnimation(fromRotate: number, toRotate: number) {
        this.animaRotate = new Animation('rotation', 'rotation.y', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaRotate.setKeys([{ frame: 0, value: fromRotate }, { frame: 72, value: toRotate }]);
        this.animaRotate.addEvent(new AnimationEvent(1, (frame) => { this.updateLineData(); }, true));
    }
    /**
     * 显示边
     * @param edgeActived 
     */
    edgeEvent(edgeActived: boolean) {
        this.setLineColor(this.lineAB, edgeActived ? this.colorPure : this.colorBlue);
        this.setLineColor(this.lineAB2, edgeActived ? this.colorPure : this.colorBlue);
        this.setLineColor(this.lineAC, edgeActived ? this.colorYellow : this.colorBlue);
        this.setLineColor(this.lineAC2, edgeActived ? this.colorYellow : this.colorBlue);
        this.setLineColor(this.lineBC, edgeActived ? this.colorGreen : this.colorBlue);
        this.setLineColor(this.lineBC2, edgeActived ? this.colorGreen : this.colorBlue);
    }

    /**
     * 设置颜色
     * @param line 
     * @param color 
     */
    setLineColor(line: LinesMesh, color: Color3) {
        line.color = color;
        line.edgesColor = Color4.FromColor3(color, 1);
        line.enableEdgesRendering();
    }

    /**
     * 显示角
     */
    angleEvent() {
        this.setMeshVisible([this.LineAngleA, this.LineAngleA2,
        this.LineAngleB, this.LineAngleB2,
        this.LineAngleC, this.LineAngleC2], this.viewModel.angleActived);
    }

    /**
     * 创建角
     * @param origin 
     * @param vector1 
     * @param vector2 
     * @param radius 
     * @param scene 
     */
    showAngleSector(origin: Vector3, vector1: Vector3, vector2: Vector3, radius: number, scene: Scene) {
        radius = radius || 1;
        const cross = Vector3.Cross(vector1, vector2);
        const dotv = Vector3.Dot(vector1, vector2);
        const angle = Math.acos(dotv / (vector1.length() * vector2.length()));
        const points = [];
        const minNb = 4;
        const factor = 2;
        let nbPoints = Math.floor(radius * angle * factor);
        nbPoints = (nbPoints < minNb) ? minNb : nbPoints;

        const firstPoint = ((Vector3.Normalize(vector1)).scale(radius));
        const lastPoint = ((Vector3.Normalize(vector2)).scale(radius));
        let matrix: Matrix;
        const ang = angle / nbPoints;
        let rotated: Vector3;
        for (let i = 0; i < nbPoints; i++) {
            matrix = Matrix.RotationAxis(cross, ang * i);
            rotated = Vector3.TransformCoordinates(firstPoint, matrix);
            points.push(rotated.add(origin));
        }
        points.push(lastPoint.add(origin));

        const pointO = [];
        for (let j = 0; j < points.length; j++) {
            pointO.push(origin);
        }
        return Mesh.CreateRibbon('sector', [points, pointO], null, null, 0, scene, false, Mesh.DOUBLESIDE);
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.group.rotation.z = 0;
        this.group.position = Vector3.Zero();
        this.groupHand.isVisible = this.group.isPickable = false;
        if (this.scene) {
            this.scene.stopAllAnimations();
        }
        this.group.rotation.y = 0;
        this.edgeEvent(false);
        this.angleEvent();
        this.updateLineData();
    }
}
