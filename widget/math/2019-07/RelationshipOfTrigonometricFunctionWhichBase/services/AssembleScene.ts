/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/30 10:10
 */
import Vue from 'vue';
import { Mesh, LinesMesh, AbstractMesh, Vector3, Color3, Engine, Color4, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 6; //半径
    offsetR = 3; //半径偏移
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    CircleAngleP = 45; //角度
    HexWhite = '#ffffff';
    HexCsc = '#21D2BD';
    HexCos = '#E817FF';
    HexSec = '#00B718';
    HexSin = '#E81111';
    HexTan = '#1089FF';
    HexCot = '#FF7607';


    tipP: Mesh;
    tipO: Mesh;
    tipQ: Mesh;
    tipM: Mesh;
    tipN: Mesh;

    tipCsc: Mesh;
    tipCos: Mesh;
    tipSec: Mesh;
    tipSin: Mesh;
    tipTan: Mesh;
    tipCot: Mesh;

    textCsc: GUI.TextBlock;
    textCos: GUI.TextBlock;
    textSec: GUI.TextBlock;
    textSin: GUI.TextBlock;
    textTan: GUI.TextBlock;
    textCot: GUI.TextBlock;

    LineOP: LinesMesh;
    LineQP: LinesMesh;
    LineNP: LinesMesh;
    LineMP: LinesMesh;
    LineOQ: LinesMesh;
    LineOM: LinesMesh;
    LineON: LinesMesh;
    opCos: any;
    opSin: any;
    opTan: any;
    opSec: any;
    opCsc: any;
    opCot: any;
    tipAngle: Mesh;
    circle: LinesMesh;

    options = [];

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize(): void {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.tipQ = new Mesh('Q');
        this.tipM = new Mesh('M');
        this.tipN = new Mesh('N');
        this.tipO = new Mesh('O');

        this.tipCsc = new Mesh('Csc');
        this.tipCos = new Mesh('Cos');
        this.tipSec = new Mesh('Sec');
        this.tipSin = new Mesh('Sin');
        this.tipTan = new Mesh('Tan');
        this.tipCot = new Mesh('Cot');
        this.tipAngle = new Mesh('Angle');

        const options = {
            height: '70px', width: '70px', color: this.HexWhite,
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options3 = {
            height: 70, width: 70, color: this.HexWhite,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: ''
        };
        // 创建坐标系
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '44px', width: '44px', color: this.HexWhite };
        if (this.isMob) {
            options.fontSize = options1.fontSize = options2.fontSize = '36px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipQ, 'Q', 0, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipM, 'M', 30, 20, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipN, 'N', 30, 20, options);

        this.textCsc = LabelUtils.CreateLabel(advancedTexture, this.tipCsc, 'csc α', options3);
        this.textCsc.color = this.HexCsc;
        this.textCos = LabelUtils.CreateLabel(advancedTexture, this.tipCos, 'cos α', options3);
        this.textCos.color = this.HexCos;
        this.textSec = LabelUtils.CreateLabel(advancedTexture, this.tipSec, 'sec α', options3);
        this.textSec.color = this.HexSec;
        this.textSin = LabelUtils.CreateLabel(advancedTexture, this.tipSin, 'sin α', options3);
        this.textSin.color = this.HexSin;
        this.textTan = LabelUtils.CreateLabel(advancedTexture, this.tipTan, 'tan α', options3);
        this.textTan.color = this.HexTan;
        this.textCot = LabelUtils.CreateLabel(advancedTexture, this.tipCot, 'cot α', options3);
        this.textCot.color = this.HexCot;
        LabelUtils.CreateLabel(advancedTexture, this.tipAngle, 'α', options3);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.4, scene);
        this.tipP.isVisible = false;

        LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 60, 0, options);
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);
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
        this.camera.position.x = 0;

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);

        FormulaLineUtils.CreateCircle(this.r, 360, new Color3(1, 1, 1), this.edgesWidth, scene);
        this.circle = LinesBuild.CreateUpdateLines(FormulasUtils.GetArcUpdateVertices(1, 0, 45),
            Color3.White(), this.edgesWidth, this.circle, scene);

        this.LineOP = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineOP, scene);

        this.LineQP = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineQP, scene);

        this.LineNP = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineNP, scene);

        this.LineMP = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineMP, scene);

        this.LineOQ = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineOQ, scene);

        this.LineON = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth + 2, this.LineON, scene);

        this.LineOM = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            Color3.White(), this.edgesWidth, this.LineOM, scene, 'OM');
        this.opCos = { line: this.LineOM, color: this.HexCos, textBlock: this.textCos };
        this.opSin = { line: this.LineMP, color: this.HexSin, textBlock: this.textSin };
        this.opTan = { line: this.LineNP, color: this.HexTan, textBlock: this.textTan };
        this.opSec = { line: this.LineON, color: this.HexSec, textBlock: this.textSec };
        this.opCsc = { line: this.LineOQ, color: this.HexCsc, textBlock: this.textCsc };
        this.opCot = { line: this.LineQP, color: this.HexCot, textBlock: this.textCot };
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param canvas 
     * @param scene 
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            this.updateLineData(startingPoint, currentMesh);
        }
    }
    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (startingPoint !== null && currentMesh !== null) {
            currentMesh.position = startingPoint.scale(1).normalize().scale(this.r);
            const a = Vector3.Dot(new Vector3(1, 0, 0), currentMesh.position.scale(1).normalize());
            const xV: number = currentMesh.position.y > 0 ? Math.acos(a) * 180 / Math.PI : 360 - Math.acos(a) * 180 / Math.PI;
            this.CircleAngleP = xV;
        }
        this.updatePosition();
        this.updateMeshVertData(this.circle, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, 0, this.CircleAngleP)));
        this.tipAngle.position = FormulasUtils.GetCirclePoint(2, this.CircleAngleP / 2);
        const pos = this.tipP.position;
        this.updateMeshVertData(this.LineOP, Vector3Utils.ToArray([Vector3.Zero(), pos.add(Vector3.Normalize(pos).scale(3))]));
        this.updateMeshVertData(this.LineQP, Vector3Utils.ToArray([this.tipQ.position, pos]));
        this.updateMeshVertData(this.LineNP, Vector3Utils.ToArray([this.tipN.position, pos]));
        this.updateMeshVertData(this.LineMP, Vector3Utils.ToArray([this.tipM.position, pos]));
        this.updateMeshVertData(this.LineOQ, Vector3Utils.ToArray([this.tipO.position, this.tipQ.position]));
        this.updateMeshVertData(this.LineOM, Vector3Utils.ToArray([this.tipO.position, this.tipM.position]));
        this.updateMeshVertData(this.LineON, Vector3Utils.ToArray([this.tipO.position, this.tipN.position]));
    }

    /**
     * 更新顶点位置
     */
    updatePosition() {
        const arc = this.CircleAngleP * Math.PI / 180;
        this.tipQ.position = new Vector3(0, 1 / Math.sin(arc), 0).scale(this.r);
        this.tipM.position = new Vector3(Math.cos(arc), 0, 0).scale(this.r);
        this.tipN.position = new Vector3(1 / Math.cos(arc), 0, 0).scale(this.r);
        this.tipCsc.position = this.tipQ.position.scale(0.5).add(new Vector3(-1, 0, 0));
        this.tipCos.position = this.tipM.position.scale(0.5).add(new Vector3(0, -1, 0));
        this.tipSec.position = this.tipM.position.add(
            this.tipN.position.subtract(this.tipM.position).scale(0.5)).add(new Vector3(0, -1, 0));
        this.tipSin.position = this.tipM.position.add(
            this.tipP.position.subtract(this.tipM.position).scale(0.5)).add(new Vector3(-1, 0, 0));
        this.tipTan.position = this.tipN.position.add(
            this.tipP.position.subtract(this.tipN.position).scale(0.5)).add(new Vector3(1.5, 0, 0));
        this.tipCot.position = this.tipQ.position.add(
            this.tipP.position.subtract(this.tipQ.position).scale(0.5)).add(new Vector3(1.5, 0, 0));
    }

    /**
     * 改变标签状态，及线条颜色
     * @param line 
     * @param color 
     * @param textBlock 
     * @param isVisible 
     */
    changeLineColor(line: LinesMesh, color: string, textBlock: GUI.TextBlock, isVisible: boolean) {
        textBlock.isVisible = isVisible;
        line.color = Color3.FromHexString(color);
        line.edgesColor = Color4.FromColor3(line.color);
        if (line.name === 'OM') {
            line.isVisible = isVisible;
        }
    }
    /**
     * 改变标签状态
     * @param tip 
     * @param options 
     * @param isShow 
     */
    changeLine(options: { line: LinesMesh, color: string, textBlock: GUI.TextBlock }[], isShow: boolean) {
        if (isShow) {
            for (let i = 0; i < options.length; i++) {
                this.changeLineColor(options[i].line, options[i].color, options[i].textBlock, isShow);
            }
        } else {
            for (let i = 0; i < options.length; i++) {
                this.changeLineColor(options[i].line, this.HexWhite, options[i].textBlock, isShow);
            }
        }
    }

    ButtonEvent() {
        this.changeLine([this.opCos, this.opSin, this.opTan, this.opSec, this.opCsc, this.opCot], false);
        this.options = [];
        if (this.viewModel.buttonActived1) {
            if (this.options.indexOf(this.opCos) === -1) {
                this.options.push(this.opCos);
            }
            if (this.options.indexOf(this.opSin) === -1) {
                this.options.push(this.opSin);
            }
        }
        if (this.viewModel.buttonActived2) {
            if (this.options.indexOf(this.opTan) === -1) {
                this.options.push(this.opTan);
            }
            if (this.options.indexOf(this.opSec) === -1) {
                this.options.push(this.opSec);
            }
        }
        if (this.viewModel.buttonActived3) {
            if (this.options.indexOf(this.opCsc) === -1) {
                this.options.push(this.opCsc);
            }
            if (this.options.indexOf(this.opCot) === -1) {
                this.options.push(this.opCot);
            }
        }
        if (this.viewModel.buttonActived4) {
            if (this.options.indexOf(this.opCos) === -1) {
                this.options.push(this.opCos);
            }
            if (this.options.indexOf(this.opSec) === -1) {
                this.options.push(this.opSec);
            }
        }
        if (this.viewModel.buttonActived5) {
            if (this.options.indexOf(this.opCsc) === -1) {
                this.options.push(this.opCsc);
            }
            if (this.options.indexOf(this.opSin) === -1) {
                this.options.push(this.opSin);
            }
        }
        if (this.viewModel.buttonActived6) {
            if (this.options.indexOf(this.opTan) === -1) {
                this.options.push(this.opTan);
            }
            if (this.options.indexOf(this.opSin) === -1) {
                this.options.push(this.opSin);
            }
            if (this.options.indexOf(this.opCos) === -1) {
                this.options.push(this.opCos);
            }
        }
        if (this.options.length > 0) {
            this.changeLine(this.options, true);
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.CircleAngleP = 45;
        this.tipP.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleP);
        this.updateLineData(null, null);
        this.ButtonEvent();
    }
}
