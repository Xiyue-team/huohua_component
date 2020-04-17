/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, LinesMesh, Mesh, Scene, ArcRotateCamera, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import $ from 'jquery-ts';

import { ViewModel } from '../ViewModel';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as M from '../sub_static/M.png';
import * as M0 from '../sub_static/M0.png';
import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    colorHexStringGreen = '#92E438';
    colorHexStringBlue = '#6ECFFF';
    colorHexStringRed = '#FF5A5A';
    colorHexStringOrange = '#E2BE22';

    colorGreen: Color3;
    colorBlue: Color3;
    colorRed: Color3;
    colorOrange: Color3;

    tip = $('#tip'); //提示框
    tipHalfSize = 0.75; //手势边界
    tipC: Mesh; //圆心
    tipM0: Mesh; //圆心定位点

    tipB: Mesh; //B定位点
    li2: LinesMesh;
    li1: LinesMesh; //正轴虚线
    tipBC: Mesh; //r定位点
    LineBC: LinesMesh; //半径线段

    LineBX: LinesMesh; //B点垂线
    LineAngle: LinesMesh; //B点垂足
    CircleC: LinesMesh; //圆
    AngleC: LinesMesh; //角度线
    HalfAngle: Mesh; //角度定位点
    offsetR = 0.8;
    CircleAngle = 45;
    imageM: GUI.Image; //M点图片
    r = 7;
    NormalizeSystemBorder = 12;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorGreen = Color3.FromHexString(this.colorHexStringGreen);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorOrange = Color3.FromHexString(this.colorHexStringOrange);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipM0 = new Mesh('tiM0', scene);
        this.tipM0.position = new Vector3(0, -1.5, 0);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipC.isVisible = false;
        this.tipBC = new Mesh('label');
        this.HalfAngle = new Mesh('label');
        this.tipB = Mesh.CreateSphere('tipB', 8, 0.2, scene);
        this.tipB.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngle);
        this.li1 = LinesBuild.CreateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), new Vector3(6, 0, 0)], 20),
            Color3.White(), this.edgesWidth, scene);
        this.li2 = LinesBuild.CreateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), new Vector3(-6, 0, 0)], 20),
            Color3.White(), this.edgesWidth, scene);

        this.tipB.setParent(this.tipC);
        this.tipM0.setParent(this.tipC);
        this.li1.setParent(this.tipC);
        this.li2.setParent(this.tipC);
        this.tipB.isVisible = false;
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.camera = this.createArcRotateCamera4Math(scene);
        (this.camera as ArcRotateCamera).lowerRadiusLimit = 30;
        (this.camera as ArcRotateCamera).upperRadiusLimit = 50;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        // 创建坐标系
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        if (this.isMob) {
            options1.fontSize = options2.fontSize = '36px';
        }
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2)
            .createNumberLabel();
        this.initValue(scene);

        LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipM0, `${M0}`,
            { linkOffsetX: '64px', linkOffsetY: '-12px', height: '24px', width: '128px', color: '#FFFFFF' });

        this.imageM = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipB, `${M}`,
            { linkOffsetX: '48px', linkOffsetY: '-12px', height: '24px', width: '96px', color: '#FFFFFF' });

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipBC, 'r', '60px', 0, {
            height: '40px', width: '120px', color: this.colorHexStringGreen,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        });

        const HalfAngleoptions = {
            height: 30, width: 70, color: this.colorHexStringOrange,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        LabelUtils.CreateLabel(advancedTexture, this.HalfAngle, 'α', HalfAngleoptions);

        const ImageLabelOption = { height: '36px', width: '36px', color: '#FFFFFF' };
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);

        this.LineBC = LinesBuild.CreateUpdateLines([this.tipB.position, Vector3.Zero()],
            this.colorGreen, this.edgesWidth, this.LineBC, scene);
        this.LineBX = LinesBuild.CreateUpdateDashedLines(
            [this.tipB.position.add(new Vector3(0, 4, 0)), this.tipB.position.add(new Vector3(0, -4, 0))],
            Color3.White(), this.edgesWidth, this.LineBX, scene);
        this.LineBX.isVisible = false;
        this.CircleC = FormulaLineUtils.CreateUpdateCircle(this.r, 360,
            this.colorBlue, this.edgesWidth, this.CircleC, scene);
        this.AngleC = FormulaLineUtils.CreateUpdateCircle(this.offsetR, this.CircleAngle,
            this.colorOrange, this.edgesWidth, this.AngleC, scene);

        this.LineAngle = LinesBuild.CreateUpdateLines([new Vector3(0, 0.5, 0), new Vector3(0.5, 0.5, 0), new Vector3(0.5, 0, 0)],
            this.colorOrange, this.edgesWidth, this.LineAngle, scene);

        this.tipBC.position = this.tipB.position.scale(0.5);
        this.HalfAngle.position = FormulasUtils.GetCirclePoint(this.offsetR + 1, this.CircleAngle / 2);
        this.HalfAngle.setParent(this.tipC);
        this.CircleC.setParent(this.tipC);
        this.AngleC.setParent(this.tipC);
        this.LineBC.setParent(this.tipC);
        this.tipBC.setParent(this.tipC);
        this.LineBX.setParent(this.tipC);
        this.LineAngle.setParent(this.tipC);

        this.LineAngle.isVisible = false;

        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    formatter(e: number) {
        this.CircleAngle = e;
        this.updateLineData();
    }

    formatter2(e: number) {
        this.r = e;
        this.updateLineData();
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        this.tipB.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngle);
        this.tipBC.position = this.tipB.position.scale(0.5)
            .add(new Vector3(-this.tipB.position.y / this.tipB.position.x, 1, 0).normalize().scale(1));

        this.HalfAngle.position = FormulasUtils.GetCirclePoint(this.offsetR + 1, this.CircleAngle / 2);
        this.updateMeshVertData(this.CircleC, Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.r, 360)));
        this.updateMeshVertData(this.AngleC,
            Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.offsetR, this.CircleAngle)));
        this.updateMeshVertData(this.LineBC, Vector3Utils.ToArray([this.tipB.position, Vector3.Zero()]));

        let pos1: Vector3, pos2: Vector3;
        let LineAngleD = [];
        if (this.tipB.position.y > 0) {
            pos1 = this.tipB.position.add(new Vector3(0, 2, 0));
            pos2 = new Vector3(this.tipB.position.x, -2, 0);
            LineAngleD = [new Vector3(this.tipB.position.x, 0.5, 0),
            new Vector3(this.tipB.position.x + 0.5, 0.5, 0),
            new Vector3(this.tipB.position.x + 0.5, 0, 0)];
        } else {
            pos1 = this.tipB.position.add(new Vector3(0, -2, 0));
            pos2 = new Vector3(this.tipB.position.x, 2, 0);
            LineAngleD = [new Vector3(this.tipB.position.x, -0.5, 0),
            new Vector3(this.tipB.position.x + 0.5, -0.5, 0),
            new Vector3(this.tipB.position.x + 0.5, 0, 0)];
        }

        if (this.tipB.position.x > 0) {
            this.li2.isVisible = false;
        } else {
            this.li2.isVisible = true;
            this.li2.enableEdgesRendering();
        }

        this.updateMeshVertData(this.LineBX, Vector3Utils.ToMoreVector3ToArray([pos1, pos2], 20));
        this.updateMeshVertData(this.LineAngle, Vector3Utils.ToArray(LineAngleD));
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            currentMesh.position = startingPoint;
            this.updateLineData();
        }
    }
    /**
     * '结论'按钮
     */
    ButtonEvent(): void {
        if (this.viewModel.buttonActived) {
            this.tip.show();
            this.imageM.isVisible = true;
            this.setMeshVisible([this.LineBX, this.LineAngle, this.CircleC], true);
        } else {
            this.tip.hide();
            this.imageM.isVisible = false;
            this.setMeshVisible([this.LineBX, this.LineAngle, this.CircleC], false);
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.camera.position = new Vector3(0, 0, -35);
        this.tipC.position = new Vector3(3, 6.5, 0);
        this.viewModel.buttonActived = false;
        this.viewModel.sliderNumber = 60;
        this.viewModel.sliderNumber2 = 3;
        this.ButtonEvent();
        this.updateLineData();
    }
}
