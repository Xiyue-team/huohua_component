/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/11/19 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Engine, Axis, StandardMaterial
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from './Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 8; //线宽

    hexGreen = '#22CEA8';
    hexBlue = '#6ECFFF';
    hexYellow = '#FED525';
    hexPure = '#C3A6FF';
    hexRed = '#FF5B5A';
    colorGreen: Color3;
    colorBlue: Color3;
    colorYellow: Color3;
    colorPure: Color3;
    colorRed: Color3;
    matBlue: StandardMaterial;
    matRed: StandardMaterial;

    tipA1: Mesh; //模型A1
    tipB1: Mesh; //模型B1
    tipC1: Mesh; //模型C1
    dotA1: Mesh; //模型A定位
    dotB1: Mesh; //模型B定位
    dotC1: Mesh; //模型C定位
    lineA1: LinesMesh; //三角形边
    lineB1: LinesMesh;
    lineC1: LinesMesh;
    triangle1: LinesMesh; //三角形

    tipA2: Mesh; //模型A2
    tipB2: Mesh; //模型B2
    tipC2: Mesh; //模型C2
    dotA2: Mesh; //模型A2定位
    dotB2: Mesh; //模型B2定位
    dotC2: Mesh; //模型C2定位
    lineA2: LinesMesh; //三角形边
    lineB2: LinesMesh;
    lineC2: LinesMesh;
    triangle2: LinesMesh; //三角形

    angleA: LinesMesh;
    angleB: LinesMesh;
    angleC: LinesMesh;
    labelA: GUI.Control;
    labelB: GUI.Control;
    labelC: GUI.Control;
    triangleControl: GUI.Control[] = []; //三角形UI

    tipArcA: Mesh; //模型A
    tipArcB: Mesh; //模型B
    tipArcA2: Mesh; //模型A2
    tipArcB2: Mesh; //模型B2
    dotArcA: Mesh; //模型A定位
    dotArcB: Mesh; //模型B定位
    dotArcA2: Mesh; //模型A定位
    dotArcB2: Mesh; //模型B定位

    labelArcA: GUI.Control;
    labelArcB: GUI.Control;
    arcControl: GUI.Control[] = []; //圆弧UI
    lineArc1: LinesMesh; //圆弧边
    lineArc2: LinesMesh; //圆弧边

    lineArcA: LinesMesh;
    lineArcB: LinesMesh;
    lineArcA2: LinesMesh;
    lineArcB2: LinesMesh;
    angleArcA: LinesMesh;
    angleArcB: LinesMesh;
    Arc: Vector3[] = [];

    groupHand: GUI.Control; //组
    group: Mesh; //模型B
    angle = 0;

    length = 7;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
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
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.colorPure = Color3.FromHexString(this.hexPure);
        this.colorRed = Color3.FromHexString(this.hexRed);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipA1 = new Mesh('AA');
        this.tipB1 = new Mesh('AA');
        this.tipC1 = new Mesh('AA');
        this.tipA2 = new Mesh('AA');
        this.tipB2 = new Mesh('BB');
        this.tipC2 = new Mesh('CC');

        this.dotA1 = new Mesh('AA');
        this.dotB1 = new Mesh('AA');
        this.dotC1 = new Mesh('AA');
        this.dotA2 = new Mesh('AA');
        this.dotB2 = new Mesh('BB');
        this.dotC2 = new Mesh('CC');
        this.tipArcA = new Mesh('AA');
        this.tipArcB = new Mesh('AA');
        this.tipArcA2 = new Mesh('AA');
        this.tipArcB2 = new Mesh('AA');

        this.dotArcA = new Mesh('AA');
        this.dotArcB = new Mesh('AA');
        this.dotArcA2 = new Mesh('AA');
        this.dotArcB2 = new Mesh('AA');
        if (this.isMob && window.screen.height < 449) {
            this.group = Mesh.CreateSphere('tipG', 8, 4, scene);
        } else if (this.isMob && window.screen.height > 449) {
            this.group = Mesh.CreateSphere('tipG', 8, 3, scene);
        } else {
            this.group = Mesh.CreateSphere('tipG', 8, 1.5, scene);
        }
        this.setMeshVisible([this.group], false);
        this.matBlue = MaterialLab.CreateLightMaterial(this.colorBlue, scene, 1);
        this.matRed = MaterialLab.CreateLightMaterial(this.colorRed, scene, 1);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const ImageLabelOption1 = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: 30, width: 30, color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob) {
            ImageLabelOption1.height = ImageLabelOption1.width = '80px';
            options.height = options.width = 60;
            options.fontSize = '40px';
        }
        this.groupHand = LabelUtils.CreateDot(advancedTexture, this.group, dot, ImageLabelOption1);

        const l1 = LabelUtils.CreateImageLabel(advancedTexture, this.tipA1, dot2, ImageLabelOption);
        const l2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipB1, dot2, ImageLabelOption);
        const l3 = LabelUtils.CreateImageLabel(advancedTexture, this.tipC1, dot2, ImageLabelOption);
        const l4 = LabelUtils.CreateLabel(advancedTexture, this.dotA1, 'A', options);
        const l5 = LabelUtils.CreateLabel(advancedTexture, this.dotB1, 'B', options);
        const l6 = LabelUtils.CreateLabel(advancedTexture, this.dotC1, 'C', options);
        const l7 = LabelUtils.CreateImageLabel(advancedTexture, this.tipA2, dot2, ImageLabelOption);
        const l8 = LabelUtils.CreateImageLabel(advancedTexture, this.tipB2, dot2, ImageLabelOption);
        const l9 = LabelUtils.CreateImageLabel(advancedTexture, this.tipC2, dot2, ImageLabelOption);
        this.labelA = LabelUtils.CreateLabel(advancedTexture, this.dotA2, `A'`, options);
        this.labelB = LabelUtils.CreateLabel(advancedTexture, this.dotB2, `B'`, options);
        this.labelC = LabelUtils.CreateLabel(advancedTexture, this.dotC2, `C'`, options);
        this.triangleControl.push(l1, l2, l3, l4, l5, l6, l7, l8, l9);
        const t1 = LabelUtils.CreateImageLabel(advancedTexture, this.tipArcA, dot2, ImageLabelOption);
        const t2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipArcB, dot2, ImageLabelOption);
        const t3 = LabelUtils.CreateLabel(advancedTexture, this.dotArcA, 'A', options);
        const t4 = LabelUtils.CreateLabel(advancedTexture, this.dotArcB, 'B', options);
        const t5 = LabelUtils.CreateImageLabel(advancedTexture, this.tipArcA2, dot2, ImageLabelOption);
        const t6 = LabelUtils.CreateImageLabel(advancedTexture, this.tipArcB2, dot2, ImageLabelOption);
        this.arcControl.push(t1, t2, t3, t4, t5, t6);
        this.labelArcA = LabelUtils.CreateLabel(advancedTexture, this.dotArcA2, `A'`, options);
        this.labelArcB = LabelUtils.CreateLabel(advancedTexture, this.dotArcB2, `B'`, options);
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
        const pos = Vector3.Zero();
        this.triangle1 = LinesBuild.CreateUpdateLines([pos, pos, pos, pos], this.colorBlue, this.edgesWidth, this.triangle1, scene);
        this.triangle2 = LinesBuild.CreateUpdateLines([pos, pos, pos, pos], this.colorBlue, this.edgesWidth, this.triangle2, scene);
        this.triangle2.renderingGroupId = 2;
        this.lineA1 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorYellow, this.edgesWidth, scene, 20, 20);
        this.lineB1 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.lineC1 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorPure, this.edgesWidth, scene, 20, 20);

        this.lineA2 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorYellow, this.edgesWidth, scene, 20, 20);
        this.lineB2 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.lineC2 = LinesBuild.createDashLines([pos, new Vector3(5, 0, 0)], this.colorPure, this.edgesWidth, scene, 20, 20);
        const poses = FormulasUtils.GetArcUpdateVertices(1, 0, 120);
        this.angleA = LinesBuild.CreateUpdateLines(poses, this.colorYellow, this.edgesWidth, this.angleA, scene);
        this.angleB = LinesBuild.CreateUpdateLines(poses, this.colorGreen, this.edgesWidth, this.angleB, scene);
        this.angleC = LinesBuild.CreateUpdateLines(poses, this.colorPure, this.edgesWidth, this.angleC, scene);
        this.Arc = FormulasUtils.GetArcUpdateVertices(10, 60, 120);
        this.Arc.push(this.Arc[0]);
        for (let i = 0; i < this.Arc.length; i++) {
            this.Arc[i] = this.Arc[i].clone().subtract(new Vector3(0, 9, 0));
        }
        this.lineArc1 = LinesBuild.CreateUpdateLines(this.Arc, this.colorBlue, this.edgesWidth, this.lineArc1, scene);
        this.lineArc2 = LinesBuild.CreateUpdateLines(this.Arc, this.colorBlue, this.edgesWidth, this.lineArc2, scene);
        this.lineArc2.renderingGroupId = 2;
        this.lineArcA = LinesBuild.createDashLines([pos, pos], this.colorYellow, this.edgesWidth, scene, 20, 20);
        this.lineArcB = LinesBuild.createDashLines([pos, pos], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.lineArcA2 = LinesBuild.createDashLines([pos, pos], this.colorYellow, this.edgesWidth, scene, 20, 20);
        this.lineArcB2 = LinesBuild.createDashLines([pos, pos], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.angleArcA = LinesBuild.CreateUpdateLines(poses, this.colorYellow, this.edgesWidth, this.angleArcA, scene);
        this.angleArcB = LinesBuild.CreateUpdateLines(poses, this.colorGreen, this.edgesWidth, this.angleArcB, scene);
        const posA = new Vector3(-5, -0.5, 0), posB = new Vector3(4, 0, 0), posC = new Vector3(-1, 3, 0);
        this.tipA1.position = posA;
        this.tipB1.position = posB;
        this.tipC1.position = posC;

        this.tipArcB.position = this.Arc[0];
        this.tipArcA.position = this.Arc[this.Arc.length - 2];
        const dir = Vector3.Normalize(this.tipArcA.position.subtract(this.tipArcB.position));
        this.dotArcA.position = this.tipArcA.position.add(dir);
        this.dotArcB.position = this.tipArcB.position.subtract(dir);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param point
     * @param currentMesh
     */
    onPointerMove(point: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            point = point.length() < this.length ? point : Vector3.Normalize(point).scale(this.length);

            if (this.viewModel.buttonActived === 1) {
                if (Vector3.Distance(point, this.tipA1.position) < 0.5) {
                    point = this.tipA1.position.clone();
                } else if (Vector3.Distance(point, this.tipB1.position) < 0.5) {
                    point = this.tipB1.position.clone();
                } else if (Vector3.Distance(point, this.tipC1.position) < 0.5) {
                    point = this.tipC1.position.clone();
                }
            } else {
                if (Vector3.Distance(point, this.tipArcA.position) < 0.5) {
                    point = this.tipArcA.position.clone();
                } else if (Vector3.Distance(point, this.tipArcB.position) < 0.5) {
                    point = this.tipArcB.position.clone();
                }
            }
            currentMesh.position = point;
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        if (this.viewModel.buttonActived === 1) {
            this.updateTriangularLineData();
        } else {
            this.updateArcLineData();
        }
    }

    updateArcLineData(): void {
        const posA = this.tipArcA.position, posB = this.tipArcB.position, posGroup = this.group.position;
        this.tipArcA2.position = Vector3Utils.rotateAroundPivot(posA, posGroup, Axis.Z, this.angle / 180 * Math.PI);
        this.tipArcB2.position = Vector3Utils.rotateAroundPivot(posB, posGroup, Axis.Z, this.angle / 180 * Math.PI);
        const dir = Vector3.Normalize(this.tipArcA2.position.subtract(this.tipArcB2.position));
        this.dotArcA2.position = this.tipArcA2.position.add(dir);
        this.dotArcB2.position = this.tipArcB2.position.subtract(dir);
        const arc = [];
        for (let i = 0; i < this.Arc.length; i++) {
            arc.push(Vector3Utils.rotateAroundPivot(this.Arc[i], posGroup, Axis.Z, this.angle / 180 * Math.PI));
        }
        if (this.viewModel.point) {
            this.lineArcA.dispose();
            this.lineArcB.dispose();
            this.lineArcA2.dispose();
            this.lineArcB2.dispose();
            const nbA = Math.floor(Vector3.Distance(posA, posGroup)) * 2;
            const nbB = Math.floor(Vector3.Distance(posB, posGroup)) * 2;
            this.lineArcA = LinesBuild.createDashLines([posGroup, posA],
                this.colorYellow, this.edgesWidth, this.scene, nbA > 20 ? nbA : 20, nbA);
            this.lineArcB = LinesBuild.createDashLines([posGroup, posB],
                this.colorGreen, this.edgesWidth, this.scene, nbB > 20 ? nbB : 20, nbB);
            this.lineArcA2 = LinesBuild.createDashLines([posGroup, this.tipArcA2.position],
                this.colorYellow, this.edgesWidth, this.scene, nbA > 20 ? nbA : 20, nbA);
            this.lineArcB2 = LinesBuild.createDashLines([posGroup, this.tipArcB2.position],
                this.colorGreen, this.edgesWidth, this.scene, nbB > 20 ? nbB : 20, nbB);
        }

        if (this.viewModel.angle) {
            let pA = Vector3Utils.GetAngle(posA.subtract(posGroup), new Vector3(1, 0, 0));
            pA = posA.subtract(posGroup).y >= 0 ? pA : 360 - pA;
            let pB = Vector3Utils.GetAngle(posB.subtract(posGroup), new Vector3(1, 0, 0));
            pB = posB.subtract(posGroup).y >= 0 ? pB : 360 - pB;
            const pa = Vector3.Distance(posGroup, posA);
            const pb = Vector3.Distance(posGroup, posB);

            this.updateMeshVertData(this.angleArcA, Vector3Utils.ToArray(
                FormulasUtils.GetArcUpdateVerticesWithOffset(pa > 1 || pa < 0.4 ? 1 : pa, pA, pA + this.angle, posGroup)));
            this.updateMeshVertData(this.angleArcB, Vector3Utils.ToArray(
                FormulasUtils.GetArcUpdateVerticesWithOffset(pb > 0.8 || pb < 0.4 ? 0.8 : pb, pB, pB + this.angle, posGroup)));

            this.setMeshVisible([this.angleArcA], pa > 0.4);
            this.setMeshVisible([this.angleArcB], pb > 0.4);
        }

        this.updateMeshVertData(this.lineArc2, Vector3Utils.ToArray(arc));
    }

    updateTriangularLineData(): void {
        const posA = this.tipA1.position, posB = this.tipB1.position, posC = this.tipC1.position, posGroup = this.group.position;
        const posAA = Vector3Utils.rotateAroundPivot(posA, posGroup, Axis.Z, this.angle / 180 * Math.PI);
        const posBB = Vector3Utils.rotateAroundPivot(posB, posGroup, Axis.Z, this.angle / 180 * Math.PI);
        const posCC = Vector3Utils.rotateAroundPivot(posC, posGroup, Axis.Z, this.angle / 180 * Math.PI);
        this.tipA2.position = posAA;
        this.tipB2.position = posBB;
        this.tipC2.position = posCC;
        if (this.viewModel.point) {
            this.lineA1.dispose();
            this.lineB1.dispose();
            this.lineC1.dispose();
            this.lineA2.dispose();
            this.lineB2.dispose();
            this.lineC2.dispose();
            const nbA = Math.floor(Vector3.Distance(posA, posGroup));
            const nbB = Math.floor(Vector3.Distance(posB, posGroup));
            const nbC = Math.floor(Vector3.Distance(posC, posGroup));
            this.lineA1 = LinesBuild.createDashLines([posGroup, posA],
                this.colorYellow, this.edgesWidth, this.scene, nbA > 20 ? nbA : 20, nbA);
            this.lineB1 = LinesBuild.createDashLines([posGroup, posB],
                this.colorGreen, this.edgesWidth, this.scene, nbB > 20 ? nbB : 20, nbB);
            this.lineC1 = LinesBuild.createDashLines([posGroup, posC],
                this.colorPure, this.edgesWidth, this.scene, nbC > 20 ? nbC : 20, nbC);

            this.lineA2 = LinesBuild.createDashLines([posGroup, this.tipA2.position],
                this.colorYellow, this.edgesWidth, this.scene, nbA > 20 ? nbA : 20, nbA);
            this.lineB2 = LinesBuild.createDashLines([posGroup, this.tipB2.position],
                this.colorGreen, this.edgesWidth, this.scene, nbB > 20 ? nbB : 20, nbB);
            this.lineC2 = LinesBuild.createDashLines([posGroup, this.tipC2.position],
                this.colorPure, this.edgesWidth, this.scene, nbC > 20 ? nbC : 20, nbC);
        }

        if (this.viewModel.angle) {
            let pA = Vector3Utils.GetAngle(posA.subtract(posGroup), new Vector3(1, 0, 0));
            pA = posA.subtract(posGroup).y >= 0 ? pA : 360 - pA;
            let pB = Vector3Utils.GetAngle(posB.subtract(posGroup), new Vector3(1, 0, 0));
            pB = posB.subtract(posGroup).y >= 0 ? pB : 360 - pB;
            let pC = Vector3Utils.GetAngle(posC.subtract(posGroup), new Vector3(1, 0, 0));
            pC = posC.subtract(posGroup).y >= 0 ? pC : 360 - pC;

            const pa = Vector3.Distance(posGroup, posA);
            const pb = Vector3.Distance(posGroup, posB);
            const pc = Vector3.Distance(posGroup, posC);
            this.updateMeshVertData(this.angleA, Vector3Utils.ToArray(
                FormulasUtils.GetArcUpdateVerticesWithOffset(pa > 1 || pa < 0.4 ? 1 : pa, pA, pA + this.angle, posGroup)));
            this.updateMeshVertData(this.angleB, Vector3Utils.ToArray(
                FormulasUtils.GetArcUpdateVerticesWithOffset(pb > 0.8 || pb < 0.4 ? 0.8 : pb, pB, pB + this.angle, posGroup)));
            this.updateMeshVertData(this.angleC, Vector3Utils.ToArray(
                FormulasUtils.GetArcUpdateVerticesWithOffset(pc > 1.2 || pc < 0.4 ? 1.2 : pc, pC, pC + this.angle, posGroup)));
            this.setMeshVisible([this.angleA], pa > 0.4);
            this.setMeshVisible([this.angleB], pb > 0.4);
            this.setMeshVisible([this.angleC], pc > 0.4);
        }
        this.updateMeshVertData(this.triangle1, Vector3Utils.ToArray([posA, posB, posC, posA]));
        this.updateMeshVertData(this.triangle2, Vector3Utils.ToArray([posAA, posBB, posCC, posAA]));
        this.updateLabelPos();
    }

    /**
      * 更新ABC标签位置
    */
    updateLabelPos() {
        let offset = 1;
        if (this.isMob && window.screen.height < 449) {
            offset = 1.5;
        }

        const posInside = TriangleUtils.GetInsidePos(this.tipA1.position, this.tipB1.position, this.tipC1.position);
        const posInsidea = Vector3.Normalize(this.tipA1.position.subtract(posInside));
        const posInsideb = Vector3.Normalize(this.tipB1.position.subtract(posInside));
        const posInsidec = Vector3.Normalize(this.tipC1.position.subtract(posInside));
        this.dotA1.position = this.tipA1.position.add(posInsidea.scale(offset));
        this.dotB1.position = this.tipB1.position.add(posInsideb.scale(offset));
        this.dotC1.position = this.tipC1.position.add(posInsidec.scale(offset));
        const posInside2 = TriangleUtils.GetInsidePos(this.tipA2.position, this.tipB2.position, this.tipC2.position);
        const posInsidea2 = Vector3.Normalize(this.tipA2.position.subtract(posInside2));
        const posInsideb2 = Vector3.Normalize(this.tipB2.position.subtract(posInside2));
        const posInsidec2 = Vector3.Normalize(this.tipC2.position.subtract(posInside2));
        this.dotA2.position = this.tipA2.position.add(posInsidea2.scale(offset));
        this.dotB2.position = this.tipB2.position.add(posInsideb2.scale(offset));
        this.dotC2.position = this.tipC2.position.add(posInsidec2.scale(offset));
    }

    formatter(angle: number) {
        this.angle = angle;
        this.setGUIVisible([this.labelA, this.labelB, this.labelC], angle !== 0 && angle !== 360 && this.viewModel.buttonActived === 1);
        this.setGUIVisible([this.labelArcA, this.labelArcB], angle !== 0 && angle !== 360 && this.viewModel.buttonActived === 2);
        this.updateLineData();
    }

    selectGraphic(i: number) {
        this.formatterV = 0;
        this.formatterFov(this.formatterV);
        this.viewModel.angle = false;
        this.viewModel.point = false;
        this.viewModel.buttonActived = i;
        this.viewModel.sliderNumber = 0;
        this.group.position = new Vector3(0, -1, 0);
        this.setMeshVisible([this.triangle1, this.triangle2], this.viewModel.buttonActived === 1);
        this.setMeshVisible([this.lineArc1, this.lineArc2], this.viewModel.buttonActived === 2);
        this.setGUIVisible(this.triangleControl, this.viewModel.buttonActived === 1);
        this.setGUIVisible(this.arcControl, this.viewModel.buttonActived === 2);
        this.formatter(0);
        this.pointEvent();
    }

    pointEvent() {
        this.setMeshVisible([this.lineA1, this.lineB1, this.lineC1, this.lineA2, this.lineB2, this.lineC2],
            this.viewModel.point && this.viewModel.buttonActived === 1);
        this.setMeshVisible([this.lineArcA, this.lineArcB, this.lineArcA2, this.lineArcB2],
            this.viewModel.point && this.viewModel.buttonActived === 2);
        this.formatter(this.angle);
        if (this.viewModel.point === false) {
            this.viewModel.angle = false;
            this.angleEvent();
        }
    }

    angleEvent() {
        this.setMeshVisible([this.angleA, this.angleB, this.angleC], this.viewModel.angle && this.viewModel.buttonActived === 1);
        this.setMeshVisible([this.angleArcA, this.angleArcB], this.viewModel.angle && this.viewModel.buttonActived === 2);
        this.formatter(this.angle);
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.selectGraphic(1);
    }
}
