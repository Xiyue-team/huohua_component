/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Mesh, AbstractMesh, LinesMesh, Vector3, Color3, Scene, Engine } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { Utils } from './Utils';
import * as dot from '../sub_static/dot.png';
import * as angle from '../sub_static/label.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 10;
    edgesWidth = 6;
    coordinateSystem: Coordinate2DSystem; //坐标系
    tipP: Mesh;
    angleP: Mesh;

    Line: LinesMesh;
    LineChange: LinesMesh;
    CircleChange: LinesMesh;
    CircleP: LinesMesh;
    CirclePH: LinesMesh;
    CirclePR = 1.5;
    CircleTextP: GUI.TextBlock;  //角度B值
    offsetR = 1;
    CircleAngleP = 45;
    hexBlue = '#61B0D8';
    hexGreen = '#8BC052';
    colorBlue: Color3;
    e = 0;
    endAngle = 45;
    tempAngle = 45;
    isDrag = false;
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
     * 初始化数值
     * @param engine 
     */
    initValue(scene: Scene) {
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.4, scene);
        this.tipP.isVisible = false;
        this.angleP = new Mesh('tiP');
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

        this.initValue(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const options = { color: '#ffffff', fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: '' };
        const options2 = {
            height: '30px', width: '30px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        let linkOffsetX = 40;

        const ImageLabelOptions = {
            height: '25px', width: '88px', color: '#FFFFFF',
            linkOffsetX: '44px', linkOffsetY: '0px'
        };

        // 创建坐标系
        const optionss2 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const optionss3 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        let paddingLeft = '40px';
        if (this.isMob) {
            paddingLeft = '80px';
            ImageLabelOptions.height = '50px';
            ImageLabelOptions.width = '176px';
            ImageLabelOptions.linkOffsetX = '88px';
            linkOffsetX = 80;
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options2.width = options2.height = '60px';
            options.fontSize = options2.fontSize = '48px';
            optionss2.fontSize = optionss3.fontSize = '36px';
        }
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 10, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(optionss2)
            .createAxisLabel(optionss3);

        FormulaLineUtils.CreateCircle(this.r, 360, this.colorBlue, this.edgesWidth, scene);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', linkOffsetX, 0, options2);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipP, dot, ImageLabelOption);
        this.CircleP = FormulaLineUtils.CreateUpdateCircle(this.CirclePR, this.CircleAngleP,
            this.colorBlue, this.edgesWidth, this.CircleP, scene);
        this.CirclePH = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero(), Vector3.Zero()],
            this.colorBlue, this.edgesWidth, this.CirclePH, scene);
        this.CircleChange = Utils.CreateUpdateCircle(this.CirclePR, this.CircleAngleP,
            Color3.FromHexString(this.hexGreen), this.edgesWidth, this.CircleChange, scene);
        this.Line = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorBlue, this.edgesWidth, this.Line, scene);
        this.LineChange = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            this.colorBlue, this.edgesWidth, this.LineChange, scene);
        this.CircleTextP = FastCreater.TextBlock('2', options);
        this.CircleTextP.paddingLeft = paddingLeft;
        this.CircleTextP.textWrapping = GUI.TextWrapping.Clip;
        LabelUtils.CreateImageTextLabel(advancedTexture, this.angleP, angle, ImageLabelOptions, [this.CircleTextP]);
        scene.registerBeforeRender(() => {
            if (this.tempAngle !== this.endAngle && !this.isDrag) {
                if (this.tempAngle > this.endAngle) {
                    this.tempAngle -= 9;
                } else {
                    this.tempAngle += 9;
                }
                if (Math.abs(this.tempAngle - this.endAngle) < 9) {
                    this.tempAngle = this.endAngle;
                }
                this.updateMeshVertData(this.CircleChange,
                    Vector3Utils.ToArray(Utils.GetArcUpdateVertices(this.CirclePR + 1, this.CircleAngleP, this.tempAngle)));
            }
        });
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            const a = Vector3.Dot(new Vector3(1, 0, 0), Vector3.Normalize(startingPoint));
            const xV: number = startingPoint.y > 0 ? Math.acos(a) * 180 / Math.PI : 360 - Math.acos(a) * 180 / Math.PI;
            this.CircleAngleP = xV.toFixed(0) === '360' ? 0 : xV;
            this.updateLineData();
        }
    }
    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        this.updateMeshVertData(this.CircleChange, Vector3Utils.ToArray(Utils.GetArcUpdateVertices(this.CirclePR + 1, 0, 0)));
        this.isDrag = true;
    }
    onPointerUp(evt: any, pickmesh: AbstractMesh, scene: Scene): void { this.isDrag = false; }
    onPointerOut(startingPoint: Vector3) { this.isDrag = false; }
    /**
     * 更新线条
     */
    updateLineData(): void {
        this.tipP.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleP);
        this.updateMeshVertData(this.Line,
            Vector3Utils.ToArray([Vector3.Zero(), FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleP)]));
        this.updateMeshVertData(this.CircleP,
            Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.CirclePR, this.CircleAngleP)));
        this.angleP.position = FormulasUtils.GetCirclePoint(this.CirclePR + this.offsetR, this.CircleAngleP / 2);
        if (this.CircleAngleP.toFixed(0) === '90') {
            this.updateMeshVertData(this.CirclePH,
                Vector3Utils.ToArray([new Vector3(0.5, 0, 0), new Vector3(0.5, 0.5, 0), new Vector3(0, 0.5, 0)]));
            this.CirclePH.isVisible = true;
            this.CircleP.isVisible = false;
        } else if (this.CircleAngleP.toFixed(0) === '270') {
            this.updateMeshVertData(this.CirclePH,
                Vector3Utils.ToArray([new Vector3(0.5, 0, 0), new Vector3(0.5, -0.5, 0), new Vector3(0, -0.5, 0)]));
            this.CirclePH.isVisible = true;
            this.CircleP.isVisible = false;
        } else {
            this.CircleP.isVisible = true;
            this.CirclePH.isVisible = false;
        }
        this.CircleTextP.text = `${this.CircleAngleP.toFixed(0)}°`;
        this.formatter(this.e);
    }

    formatter(e: number) {
        if (e === 0) {
            this.CircleChange.isVisible = false;
        } else {
            this.CircleChange.isVisible = true;
        }
        this.e = e;
        this.endAngle = e * 360 + this.CircleAngleP;
        this.tempAngle = this.CircleAngleP;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.isDrag = false;
        this.endAngle = 45;
        this.tempAngle = 45;
        this.CircleAngleP = 45;
        this.e = 0;
        this.viewModel.buttonActived = false;
        this.updateLineData();
    }
}
