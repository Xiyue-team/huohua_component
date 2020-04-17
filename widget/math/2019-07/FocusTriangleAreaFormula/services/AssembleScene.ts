/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, AbstractMesh, Material, Scene, Engine } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

import * as f from '../sub_static/label/f.png';
import * as f1 from '../sub_static/label/f1.png';
import * as f2 from '../sub_static/label/f2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    Ellipse: LinesMesh; //线段椭圆
    Hyperbola: LinesMesh; //线段双曲线
    Parabola: LinesMesh; //线段抛物线

    PF1F2: LinesMesh; //线段PF1F2

    tipP: Mesh; //P点
    tiptextP: GUI.TextBlock;
    tipImageP: GUI.Image;
    tipImageP2: GUI.Image;
    tipP2: Mesh; //B点
    tiptextP2: GUI.TextBlock;

    tipsin: Mesh; //角度
    ang = 45;
    mode = 0;
    a = 5;
    b = 4;
    F1: Mesh; //F1
    F2: Mesh; //F2
    ImageF1: GUI.Image; //dot点图片
    ImageF2: GUI.Image; //dot点图片

    textF1: GUI.Image; //F1点图片
    textF2: GUI.Image; //F2点图片
    textsin: GUI.TextBlock;
    circle: Mesh; //角度圆盘
    lightmaterial: Material;


    colorHexStringB = '#9BF23B';
    colorHexStringYellow = '#e2be22';
    colorHexStringRed = '#F05467';
    colorHexStringBlue = '#6ECFFF';
    colorB: Color3;
    colorYellow: Color3;
    colorRed: Color3;
    colorBlue: Color3;

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
        this.colorYellow = Color3.FromHexString(this.colorHexStringYellow);
        this.colorB = Color3.FromHexString(this.colorHexStringB);
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.tipP2 = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.tipP.isVisible = this.tipP2.isVisible = false;
        this.tipsin = new Mesh('tisin');
        this.F1 = new Mesh('F1');
        this.F1.position = new Vector3(-3, 0, 0);
        this.F2 = new Mesh('F2');
        this.F2.position = new Vector3(3, 0, 0);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
        this.initMesh(scene);
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '30px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOptions = {
            height: '24px', width: '24px', color: '#FFFFFF',
            linkOffsetX: '0px', linkOffsetY: '30px'
        };
        const textsinoptions2 = {
            height: 30, width: 30, color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        let linkOffsetX = 30;
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
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            ImageLabelOptions.height = ImageLabelOptions.width = '48px';
            ImageLabelOptions.linkOffsetY = '60px';
            options.height = options.width = '60px';
            options.fontSize = '48px';
            textsinoptions2.height = textsinoptions2.width = 60;
            textsinoptions2.fontSize = '48px';
            linkOffsetX = 60;
            options1.fontSize = options2.fontSize = '36px';
        }
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 7, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);

        this.tipImageP = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
        this.tipImageP2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipP2, `${dot}`, ImageLabelOption);
        this.ImageF1 = LabelUtils.CreateImageLabel(advancedTexture, this.F1, `${dot2}`, ImageLabelOption);
        this.ImageF2 = LabelUtils.CreateImageLabel(advancedTexture, this.F2, `${dot2}`, ImageLabelOption);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', linkOffsetX, 0, options);
        this.tiptextP2 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP2, 'B', linkOffsetX, 0, options);
        this.textF1 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.F1, `${f1}`, ImageLabelOptions);
        this.textF2 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.F2, `${f2}`, ImageLabelOptions);
        this.textsin = LabelUtils.CreateLabel(advancedTexture, this.tipsin, 'θ', textsinoptions2);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 13);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        this.Ellipse = FormulaLineUtils.CreateEllipse(this.a, this.b, this.colorBlue, this.edgesWidth, scene);
        this.Hyperbola = FormulaLineUtils.CreateHyperbola(2, Math.sqrt(5), this.colorBlue, this.edgesWidth, 0, 10, scene);
        this.Parabola = FormulaLineUtils.CreateParabola(-2, 2, 6, this.colorBlue, this.edgesWidth, 0, 10, scene);

        this.PF1F2 = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero()],
            this.colorRed, this.edgesWidth, this.PF1F2, scene);

        this.lightmaterial = MaterialLab.CreateLightMaterial(this.colorYellow, scene);
        this.lightmaterial.freeze();

        this.circle = FormulaLineUtils.CreateDisc(1, 45, this.lightmaterial, scene);
        this.circle.position = this.tipP.position;
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh !== this.tipP) {
                currentMesh.position = startingPoint;
            }
            this.updateLineData(startingPoint, currentMesh);
        }
    }
    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (currentMesh) {
            const a = Vector3.Dot(new Vector3(1, 0, 0), startingPoint.scale(1).normalize());
            this.ang = startingPoint.y > 0 ? Math.acos(a) * 180 / Math.PI : 360 - Math.acos(a) * 180 / Math.PI;
        }

        if (this.mode === 1) {
            if (this.ang > 180 && this.ang < 185) {
                this.ang = 185;
            } else if (this.ang > 175 && this.ang <= 180) {
                this.ang = 175;
            } else if (this.ang >= 0 && this.ang < 5) {
                this.ang = 5;
            } else if (this.ang > 355) {
                this.ang = 355;
            }
            this.tipP.position = FormulasUtils.GetEllipsePoint(this.a, this.b, this.ang);
            this.updateMeshVertData(this.PF1F2,
                Vector3Utils.ToArray([this.tipP.position, this.F1.position, this.F2.position, this.tipP.position]));
        } else if (this.mode === 2) {
            if (startingPoint) {
                this.tipP.position = startingPoint;
            }
            let postipX = this.tipP.position.x;
            postipX = postipX >= 2 || postipX <= -2 ? postipX : postipX > 0 ? 2.01 : -2.01;
            this.tipP.position.x = postipX < -8 ? -8 : postipX > 8 ? 8 : postipX;
            const pos = FormulasUtils.GetHyperbolaPointX(2, Math.sqrt(5), this.tipP.position.x);
            this.tipP.position.y = this.tipP.position.y >= 0 ? pos.y : -pos.y;

            this.updateMeshVertData(this.PF1F2,
                Vector3Utils.ToArray([this.tipP.position, this.F1.position, this.F2.position, this.tipP.position]));
        } else if (this.mode === 3) {
            if (startingPoint) {
                startingPoint.x = startingPoint.x > 8 ? 8 : startingPoint.x;
                if (currentMesh === this.tipP) {
                    this.tipP.position = startingPoint;
                    this.tipP2.position = this.setPos(this.tipP);
                } else {
                    this.tipP2.position = startingPoint;
                    this.tipP.position = this.setPos(this.tipP2);
                }
            }
            this.updateMeshVertData(this.PF1F2,
                Vector3Utils.ToArray([this.tipP.position, Vector3.Zero(), this.tipP2.position, this.tipP.position]));
        }
        this.updateAngle();
    }

    setPos(tip: Mesh): Vector3 {
        tip.position.x = tip.position.x > 0.001 ? tip.position.x : 0.001;
        const pos = FormulasUtils.GetParabolaPointX(tip.position.x, 6);
        tip.position.y = tip.position.y >= 0 ? pos.y : -pos.y;

        const k = (this.F2.position.y - tip.position.y) / (this.F2.position.x - tip.position.x);
        const b = tip.position.y - k * tip.position.x;
        const p = 6;

        const tempy = Math.sqrt((2 * p / k) * (2 * p / k) - 8 * p * b / k);
        let y = (2 * p / k - tempy) / 2;

        if (Math.abs(y - tip.position.y) < 0.1) {
            y = (2 * p / k + tempy) / 2;
        }
        const x = (y - b) / k;
        return new Vector3(x, y, 0);
    }

    /**
     * 更新𝜃角度信息
     */
    updateAngle(): void {
        const F1Ang = Vector3.Dot(new Vector3(1, 0, 0),
            this.tipP.position.subtract(this.F1.position).scale(1).normalize());
        const F1Angle =
            this.tipP.position.subtract(this.F1.position).y > 0 ? Math.acos(F1Ang) * 180 / Math.PI : 360 - Math.acos(F1Ang) * 180 / Math.PI;
        const F2Ang = Vector3.Dot(new Vector3(1, 0, 0),
            this.tipP.position.subtract(this.F2.position).scale(1).normalize());
        const F2Angle = this.tipP.position.subtract(this.F2.position).y > 0 ?
            Math.acos(F2Ang) * 180 / Math.PI : 360 - Math.acos(F2Ang) * 180 / Math.PI;
        if (this.mode === 1 || this.mode === 2) {
            this.circle.dispose();
            this.circle = FormulaLineUtils.CreateDisc(1, Math.abs(F2Angle - F1Angle), this.lightmaterial, this.scene);
            this.circle.position = this.tipP.position;
            if (this.tipP.position.y > 0) {
                this.circle.rotation.z = (F1Angle / 180 + 1) * Math.PI;
            } else {
                this.circle.rotation.z = (F2Angle / 180 + 1) * Math.PI;
            }
            this.tipsin.position = this.tipP.position.subtract(this.tipP.position.scale(1).normalize().scale(1.5));
        } else {
            this.circle.dispose();
            let a = F2Angle;
            if (F2Angle > 180) {
                a = F2Angle - 180;
            }
            this.circle = FormulaLineUtils.CreateDisc(1, a, this.lightmaterial, this.scene);
            this.circle.position = this.F2.position;
            this.tipsin.position = this.circle.position.add(FormulasUtils.GetCirclePoint(1.8, a / 2));
        }
    }

    ButtonEventFormula(index: number) {
        if (index === 1) {
            this.ButtonEventEllipse();
        } else if (index === 2) {
            this.ButtonEventHyperbola();
        } else if (index === 3) {
            this.ButtonEventParabola();
        }
        if (index !== 0) {
            this.tipP.isPickable = this.tipP2.isPickable = true;
        }
    }

    /**
     * '椭圆'按钮
     */
    ButtonEventEllipse(): void {
        this.ang = 45;
        this.textF2.source = `${f2}`;
        this.tiptextP.text = 'P';
        this.setGUIVisible([this.ImageF1], true);
        this.setGUIVisible([this.tipImageP2, this.tiptextP2], false);
        this.tipP2.position.x = 1000;
        this.commonSet();
        this.mode = 1;
        this.setMeshVisible([this.Ellipse], true);
        this.setMeshVisible([this.Parabola, this.Hyperbola], false);
        this.updateLineData(null, null);
    }

    /**
     * '双曲线'按钮
     */
    ButtonEventHyperbola(): void {
        this.ang = 45;
        this.tipP.position = FormulasUtils.GetEllipsePoint(this.a, this.b, this.ang);
        this.textF2.source = `${f2}`;
        this.tiptextP.text = 'P';
        this.tipP2.position.x = 1000;
        this.commonSet();
        this.mode = 2;
        this.setGUIVisible([this.ImageF1], true);
        this.setGUIVisible([this.tipImageP2, this.tiptextP2], false);
        this.setMeshVisible([this.Hyperbola], true);
        this.setMeshVisible([this.Parabola, this.Ellipse], false);
        this.updateLineData(null, null);
    }

    /**
     * '抛物线'按钮
     */
    ButtonEventParabola(): void {
        this.ang = 45;
        this.tipP.position = FormulasUtils.GetEllipsePoint(this.a, this.b, this.ang);
        this.textF2.source = `${f}`;
        this.tiptextP.text = 'A';
        this.commonSet();
        this.mode = 3;
        this.setGUIVisible([this.tipImageP2, this.tiptextP2], true);
        this.setGUIVisible([this.textF1, this.ImageF1], false);
        this.setMeshVisible([this.Parabola], true);
        this.setMeshVisible([this.Hyperbola, this.Ellipse], false);
        this.updateLineData(this.tipP.position, this.tipP);
    }

    /**
     * 统一设置属性
     */
    commonSet(): void {
        this.setGUIVisible([this.tipImageP, this.tiptextP, this.textF1, this.textF2, this.textsin, this.ImageF2], true);
        this.setMeshVisible([this.PF1F2, this.circle], true);
        this.viewModel.buttonActived = false;
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.ang = 45;
        this.viewModel.buttonActived = false;
        this.setGUIVisible([this.tipImageP, this.tipImageP2, this.ImageF1, this.ImageF2,
        this.tiptextP, this.tiptextP2, this.textF1, this.textF2, this.textsin], false);
        this.updateLineData(null, null);
        this.setMeshVisible([this.PF1F2, this.circle, this.Ellipse, this.Hyperbola, this.Parabola], false);
        this.tipP.isPickable = this.tipP2.isPickable = false;
    }
}
