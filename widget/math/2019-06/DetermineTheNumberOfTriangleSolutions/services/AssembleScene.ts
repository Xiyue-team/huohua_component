/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector2, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Engine  
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import {BeelineUtils} from '../../../../babylon/Math/BeelineUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    colorHexStringGreen = '#92E438';
    colorHexStringBlue = '#6ECFFF';
    colorHexStringRed = '#FF5A5A';
    colorHexStringWhite = '#ffffff';
    colorGreen: Color3;
    colorBlue: Color3;
    colorRed: Color3;
    colorWhite: Color3;

    tipHalfSize = 1; //手势边界
    posC: Vector3;  //C 位置
    tipC: Mesh; //模型C

    posB: Vector3;  //B 位置
    tipB: Mesh; //模型B

    angleA: Mesh; //角度定位点

    tipAC: Mesh;
    LineAC: LinesMesh;
    tipBC: Mesh;
    LineBC: LinesMesh;
    li2: LinesMesh;
    LineAngleD: LinesMesh;
    LineCD: LinesMesh;
    CircleA: LinesMesh;
    CircleC: LinesMesh;
    CircleAR = 1;
    CircleTextA: GUI.TextBlock; //角度文本
    tipD: Mesh; //垂足 D
    tipB1: Mesh; //相交点2
    LineCB1: LinesMesh;

    offsetR = 1.5;
    CircleAngleA = 65;  //角度A值
    DistanceBC: number;  //BC距离
    DistanceBD: number;
    DistanceCD: number;

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
        this.colorGreen = Color3.FromHexString(this.colorHexStringGreen);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorWhite = Color3.FromHexString(this.colorHexStringWhite);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.angleA = new Mesh('label');
        this.tipAC = new Mesh('label');
        this.tipBC = new Mesh('label');
        this.tipD = new Mesh('label');
        this.tipB1 = new Mesh('label');

        this.posB = new Vector3(7, 3.5, 0);
        this.posC = new Vector3(3, 6.5, 0);
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
        this.tipB.isVisible = this.tipC.isVisible = this.angleA.isVisible = false;
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const a = Vector3.Dot(new Vector3(1, 0, 0), Vector3.Normalize(this.posC));
        this.CircleAngleA = Math.acos(a) * 180 / Math.PI;
        this.CircleA = FormulaLineUtils.CreateUpdateCircle(this.CircleAR, this.CircleAngleA,
            this.colorWhite, this.edgesWidth, this.CircleA, scene);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '30px', color: this.colorHexStringWhite,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const optionsA = {
            height: '20px', width: '20px',
            color: this.colorHexStringWhite, fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const optionsCircle = {
            height: 60, width: 130, color: this.colorHexStringWhite,
            fontSize: '24px', fontFamily: '', fontStyle: ''
        };
        let linkOffsetX = 30;
        let linkx = 20, linky = 10;
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = options.width = '60px';
            options.fontSize = '40px';
            linkOffsetX = 60;
            optionsA.height = '40px';
            optionsA.width = '40px';
            optionsA.fontSize = '40px';
            optionsCircle.fontSize = '32px';
            linkx = 30, linky = 20;
        }


        this.CircleTextA = LabelUtils.CreateLabel(advancedTexture, this.angleA, '', optionsCircle); //创建场景A标签
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', linkOffsetX, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipC, 'C', linkOffsetX, 0, options);

        const O = new Mesh('O');
        O.position = new Vector3(0, 0.1, 0);

        LabelUtils.CreateLabelWithOffset(advancedTexture, O, 'A', linkx, linky, optionsA);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipD, 'D', linkx, linky, optionsA); //创建场景D标签
        optionsA.color = this.colorHexStringBlue;
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipAC, 'b', linkx, 0, optionsA); //创建场景b标签
        optionsA.color = this.colorHexStringGreen;
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipBC, 'a', linkx, 0, optionsA); //创建场景a标签
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

        LinesBuild.CreateLines([Vector3.Zero(), new Vector3(15, 0, 0)],
            this.colorBlue, this.edgesWidth, scene);

        this.li2 = LinesBuild.CreateDashedLines([Vector3.Zero(), new Vector3(-15, 0, 0)],
            this.colorBlue, this.edgesWidth, scene, 50);
        this.li2.isVisible = false;
        this.LineAC = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posC],
            this.colorBlue, this.edgesWidth, this.LineAC, scene);

        this.LineBC = LinesBuild.CreateUpdateLines([this.posB, this.posC], this.colorGreen, this.edgesWidth, this.LineBC, scene);

        const point2 = Vector3Utils.ToMoreVector3([this.posB, this.posC], 20);
        this.LineCB1 = LinesBuild.CreateUpdateDashedLines(point2, this.colorGreen, this.edgesWidth, this.LineCB1, scene);
        this.LineCB1.disableEdgesRendering();

        const point = Vector3Utils.ToMoreVector3([new Vector3(this.posC.x, 0, 0), this.posC], 20);
        this.LineCD = LinesBuild.CreateUpdateDashedLines(point, this.colorRed, this.edgesWidth, this.LineCD, scene);
        this.LineCD.enableEdgesRendering();
        const r = Vector3.Distance(this.posC, this.tipB.position);
        this.CircleC = FormulaLineUtils.CreateDashedUpdateCircle(r, 361, this.colorGreen, this.CircleC, this.edgesWidth, scene);

        this.tipAC.position = this.posC.scale(0.5);
        this.tipBC.position = this.posC.add(this.posC.add(this.posB.scale(-1)).scale(-0.5));
        this.tipD.position = new Vector3(this.posC.x, 0, 0);
        this.angleA.position = FormulasUtils.GetCirclePoint(this.CircleAR + this.offsetR, this.CircleAngleA / 2);

        this.LineAngleD = LinesBuild.CreateUpdateLines(
            [this.tipD.position.add(new Vector3(0, 0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, 0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, 0, 0))],
            this.colorRed, this.edgesWidth, this.LineAngleD, scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 更新点B
     * @param startingPoint 
     * @param currentMesh 
     */
    updateDataTipB(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        currentMesh.position = startingPoint;
        this.posAdsorption(currentMesh, this.tipC.position, Vector3.Zero());
        this.DistanceBD = Vector3.Distance(this.tipB.position, this.tipD.position);
        if (this.DistanceBD < 0.5) {
            this.tipB.position = this.tipD.position.scale(1);
        } else if (this.tipB.position.y < 0.5 && this.tipB.position.y > -0.5) {
            this.tipB.position.y = 0;
        }
    }

    /**
     * 更新点C
     * @param startingPoint 
     * @param currentMesh 
     */
    updateDataTipC(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        currentMesh.position = startingPoint;
        this.posAdsorption(currentMesh, this.tipB.position, Vector3.Zero());
        if (this.tipC.position.x < 0.5 && this.tipC.position.x > -0.5) {
            this.tipC.position.x = 0;
            this.CircleA.isVisible = false;
        } else if (this.tipC.position.y < 0.5 && this.tipC.position.y > -0.5) {
            this.tipC.position.y = this.tipC.position.y > 0 ? 0.5 : -0.5;
            this.CircleA.isVisible = true;
        } else {
            this.CircleA.isVisible = true;
        }
        const a = Vector3.Dot(new Vector3(1, 0, 0), Vector3.Normalize(currentMesh.position));
        const xV = Math.acos(a) * 180 / Math.PI;
        this.CircleAngleA = xV;
        this.updateMeshVertData(this.LineAC, Vector3Utils.ToArray([this.tipC.position, new Vector3(0, 0, 0)]));

        const ACR = Vector3.Distance(this.tipC.position, Vector3.Zero());
        const r = this.CircleAR < ACR ? this.CircleAR : ACR;
        this.tipD.position.x = this.tipC.position.x;
        let LineAngleD = [];

        if (currentMesh.position.y > 0) {
            this.updateMeshVertData(this.CircleA, Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(r, xV)));
            this.angleA.position = FormulasUtils.GetCirclePoint(this.CircleAR + this.offsetR, xV / 2);
            LineAngleD = [this.tipD.position.add(new Vector3(0, 0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, 0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, 0, 0))];
        } else {
            this.updateMeshVertData(this.CircleA, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(r, 360 - xV, 360)));
            this.angleA.position = FormulasUtils.GetCirclePoint(this.CircleAR + this.offsetR, 360 - xV / 2);
            LineAngleD = [this.tipD.position.add(new Vector3(0, -0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, -0.5, 0)),
            this.tipD.position.add(new Vector3(0.5, 0, 0))];
        }

        this.CircleTextA.text = `${this.CircleAngleA.toFixed(0)}°`;
        const point = Vector3Utils.ToMoreVector3([new Vector3(this.tipC.position.x, 0, 0), this.tipC.position], 20);
        this.updateMeshVertData(this.LineCD, Vector3Utils.ToArray(point));
        this.updateMeshVertData(this.LineAngleD, Vector3Utils.ToArray(LineAngleD));
        this.tipAC.position = this.tipC.position.scale(0.5);
    }

    posAdsorption(currentMesh: AbstractMesh, pos1: Vector3, pos2: Vector3) {
        if (Vector3.Distance(currentMesh.position, pos2) < 0.4) {
            currentMesh.position = currentMesh.position.add( 
                currentMesh.position.subtract(pos2).scale(1).normalize().scale(0.5));
        }
        if (Vector3.Distance(pos1, currentMesh.position) < 0.4) {
            currentMesh.position = currentMesh.position.add(
                currentMesh.position.subtract(pos1).scale(1).normalize().scale(0.5));
        }
        const AB = BeelineUtils.GetLineSlopeAndConstant(pos1, pos2);
        const k_ab = -1 / AB.x; //AB边高的斜率
        const Bab = currentMesh.position.y - k_ab * currentMesh.position.x; //常数
        const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, new Vector2(k_ab, Bab));
        if (Vector3.Distance(currentMesh.position, posAB_CP) < 0.2) {
            currentMesh.position = posAB_CP;
        }
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        this.tipBC.position = this.tipC.position.add(
            this.tipC.position.add(this.tipB.position.scale(-1)).scale(-0.5)
        );
        this.DistanceBC = Vector3.Distance(this.tipC.position, this.tipB.position);
        this.DistanceCD = Vector3.Distance(this.tipC.position, this.tipD.position);
        const DistanceAC = Vector3.Distance(this.tipC.position, new Vector3(0, 0, 0));
        if ((this.DistanceBC >= this.DistanceCD) && this.tipB.position.y === 0 && this.CircleAngleA <= 90
            && this.DistanceBC <= DistanceAC) {
            const length = Math.sqrt(this.DistanceBC * this.DistanceBC - this.DistanceCD * this.DistanceCD);
            const tempPos = this.tipD.position.add(new Vector3(-length, 0, 0));
            if (Vector3.Distance(this.tipB.position, tempPos) < 0.01) {
                this.tipB1.position = this.tipD.position.add(new Vector3(length, 0, 0));
            } else {
                this.tipB1.position = tempPos;
            }
            const point = Vector3Utils.ToMoreVector3([this.tipC.position, this.tipB1.position], 20);
            this.updateMeshVertData(this.LineCB1, Vector3Utils.ToArray(point));
        } else {
            this.LineCB1.disableEdgesRendering();
        }

        if (this.DistanceBC > DistanceAC) {
            this.li2.isVisible = true;
            this.li2.enableEdgesRendering();
        } else {
            this.li2.isVisible = false;
        }
        this.updateMeshVertData(this.CircleC,
            Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.DistanceBC, 360), this.tipC.position));
        this.updateMeshVertData(this.LineBC, Vector3Utils.ToArray([this.tipC.position, this.tipB.position]));
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh === this.tipC) {
                this.updateDataTipC(startingPoint, currentMesh);
            } else if (currentMesh === this.tipB) {
                this.updateDataTipB(startingPoint, currentMesh);
            }
            this.updateLineData();
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.viewModel.buttonActived = false;
        this.updateDataTipB(this.posB, this.tipB);
        this.updateDataTipC(this.posC, this.tipC);
        this.updateLineData();
    }
}
