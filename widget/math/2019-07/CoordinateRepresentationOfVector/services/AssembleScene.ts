/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, TransformNode, Scene, AbstractMesh, Engine } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import $ from 'jquery-ts';

import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';

import * as dot from '../sub_static/dot.png';

import * as a from '../sub_static/a.png';
import * as i from '../sub_static/i.png';
import * as j from '../sub_static/j.png';
import * as xi from '../sub_static/xi.png';
import * as yj from '../sub_static/yj.png';
import * as A1 from '../sub_static/A1.png';
import * as A2 from '../sub_static/A2.png';


export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系

    VRoot: Mesh; //向量根
    VArrow: Mesh; //向量箭头
    tipA: Mesh;
    imageA: GUI.Image;

    posA = new Vector3(3, 3, 0);
    ArrowHalfPos: Mesh; //向量标签定位
    tip = $('#tip');
    LineA: LinesMesh; //向量
    LineAx: LinesMesh; //分向量x
    LineAy: LinesMesh; //分向量y
    LineRoot2Arrow: LinesMesh; //可移动向量
    Aaxi: TransformNode; //坐标轴向量箭头
    Baxi: TransformNode; //坐标轴向量根

    posYMesh: Mesh; //定位点x轴
    posXMesh: Mesh; //定位点y轴
    posyt: GUI.Image; //y轴向量贴图
    posxt: GUI.Image; //x轴向量贴图

    line: LinesMesh;
    arrowUp: Mesh; //分向量箭头y
    arrowX: Mesh; //分向量箭头x

    yt: GUI.Image; //j单位向量贴图
    xt: GUI.Image; //i单位向量贴图

    colorHexStringB = '#6F6F6F';
    colorHexStringDashedLines = '#349EEF';
    colorHexStringRed = '#F05467';

    colorB: Color3;
    colorDashedLines: Color3;
    colorRed: Color3;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 窗口尺寸重置
     */
    resize() {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorDashedLines = Color3.FromHexString(this.colorHexStringDashedLines);
        this.colorB = Color3.FromHexString(this.colorHexStringB);
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipA = Mesh.CreateSphere('tiA', 8, 1.4, scene);
        this.tipA.isVisible = false;
        this.ArrowHalfPos = new Mesh('ArrowHalfPos');
        this.VArrow = Mesh.CreateSphere('tipVArrow', 8, 1.4, scene);
        this.VRoot = Mesh.CreateSphere('tipVRoot', 8, 1.4, scene);
        this.VArrow.isVisible = this.VRoot.isVisible = false;
    }

    /**
     * 初始化图片标签
     * @param advancedTexture
     * @param scene
     */
    initImageLabel(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOptionA = { linkOffsetX: '57px', linkOffsetY: '-14px', height: '28px', width: '114px', color: '#FFFFFF' };
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 10, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);
        this.imageA = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipA, `${A1}`, ImageLabelOptionA);

        LabelUtils.CreateImageLabel(advancedTexture, this.VArrow, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.VRoot, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.ArrowHalfPos, `${a}`, ImageLabelOption);
        const Y = new Mesh('Y');
        Y.position = new Vector3(-1, 0.5, 0);
        this.yt = LabelUtils.CreateImageLabel(advancedTexture, Y, `${j}`, ImageLabelOption);
        const X = new Mesh('X');
        X.position = new Vector3(0.5, -1.1, 0);
        this.xt = LabelUtils.CreateImageLabel(advancedTexture, X, `${i}`, ImageLabelOption);
        this.posYMesh = new Mesh('X');
        this.posXMesh = new Mesh('X');
        this.posyt = LabelUtils.CreateImageLabel(advancedTexture, this.posYMesh, `${yj}`, ImageLabelOption);
        this.posxt = LabelUtils.CreateImageLabel(advancedTexture, this.posXMesh, `${xi}`, ImageLabelOption);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
        this.initMesh(scene);
        this.initImageLabel(advancedTexture, scene);

        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorB, scene);
        lightmaterialA.freeze();
        const lightmaterialRed = MaterialLab.CreateLightMaterial(this.colorRed, scene);
        lightmaterialRed.freeze();

        this.LineA = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posA], this.colorB, this.edgesWidth, this.LineA, scene);
        this.LineAx = LinesBuild.CreateUpdateDashedLines([this.posA, new Vector3(this.posA.x, 0, 0)],
            this.colorDashedLines, this.edgesWidth, this.LineAx, scene);
        this.LineAy = LinesBuild.CreateUpdateDashedLines([this.posA, new Vector3(0, this.posA.y, 0)],
            this.colorDashedLines, this.edgesWidth, this.LineAy, scene);

        this.VArrow.setParent(this.VRoot);
        this.VArrow.position = this.posA;
        this.LineRoot2Arrow = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.VArrow.position],
            this.colorB, this.edgesWidth, this.LineRoot2Arrow, scene);
        this.LineRoot2Arrow.setParent(this.VRoot);
        this.VRoot.position = new Vector3(-9, 3, 0);
        this.line = LinesBuild.CreateLines([new Vector3(0, 1, 0), Vector3.Zero(), new Vector3(1, 0, 0)],
            this.colorRed, this.edgesWidth, scene);

        const arrow = Mesh.CreateCylinder('y', 0.6, 0, 0.6, 4, 1, scene);
        arrow.position = new Vector3(-0.2, 0, 0);
        arrow.rotation = new Vector3(0, 0, -Math.PI / 2);
        arrow.isPickable = false;
        arrow.material = lightmaterialA;
        this.Aaxi = new TransformNode('a');
        this.Baxi = new TransformNode('b');
        arrow.clone('a', this.Aaxi);
        // 单位向量箭头
        this.arrowUp = arrow.clone('up');
        this.arrowUp.position = new Vector3(0, 1, 0);
        this.arrowUp.rotation = Vector3.Zero();
        this.arrowX = arrow.clone('x');
        this.arrowX.position.x = 1;
        this.arrowX.material = this.arrowUp.material = lightmaterialRed;

        arrow.setParent(this.Baxi);
        this.ArrowHalfPos.setParent(this.VRoot);
        this.Aaxi.setParent(this.VRoot);
        this.Aaxi.position = this.VArrow.position;
        this.Aaxi.rotation = new Vector3(0, 0, Math.PI / 4);
        this.Baxi.position = this.tipA.position;
        this.Baxi.rotation = new Vector3(0, 0, Math.PI / 4);
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
        // 创建坐标系
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh === this.VRoot) {
                currentMesh.position = startingPoint;
            } else if (currentMesh === this.VArrow) {
                const pos = startingPoint.add(this.VRoot.position.scale(-1));
                pos.x = pos.x > 11 ? 11 : pos.x < -11 ? -11 : pos.x;
                pos.y = pos.y > 11 ? 11 : pos.y < -11 ? -11 : pos.y;
                currentMesh.position = pos;
            }
            this.updateLineData();
        }
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        const dota = Vector3.Dot(new Vector3(1, 0, 0), this.VArrow.position.scale(1).normalize());
        let xV: number;
        if (this.VArrow.position.y > 0) {
            xV = Math.acos(dota) * 180 / Math.PI;
        } else {
            xV = 360 - Math.acos(dota) * 180 / Math.PI;
        }
        const dis = Vector3.Distance(Vector3.Zero(), this.VArrow.position);
        this.posA = FormulasUtils.GetCirclePoint(dis, xV);
        this.tipA.position = this.posA;
        this.updateMeshVertData(this.LineA, Vector3Utils.ToArray([Vector3.Zero(), this.posA]));
        this.updateMeshVertData(this.LineAx,
            Vector3Utils.ToMoreVector3ToArray([new Vector3(this.posA.x, 0, 0), this.posA], 20));
        this.updateMeshVertData(this.LineAy,
            Vector3Utils.ToMoreVector3ToArray([new Vector3(0, this.posA.y, 0), this.posA], 20));
        this.updateMeshVertData(this.LineRoot2Arrow, Vector3Utils.ToArray([Vector3.Zero(), this.VArrow.position]));

        this.Baxi.position = this.posA;
        this.Baxi.rotation = new Vector3(0, 0, Math.PI * xV / 180);
        this.Aaxi.position = this.VArrow.position;
        this.Aaxi.rotation = new Vector3(0, 0, Math.PI * xV / 180);

        this.ArrowHalfPos.position = this.VArrow.position.scale(0.5)
            .add(new Vector3(-this.VArrow.position.y / this.VArrow.position.x, 1, 0).normalize().scale(1));
        this.posYMesh.position = new Vector3(-1, this.posA.y / 2, 0);
        this.posXMesh.position = new Vector3(this.posA.x / 2, -1, 0);
    }

    /**
     * '辅助线'按钮
     */
    ButtonEvent() {
        if (this.viewModel.buttonActived) {
            this.setGUIVisible([this.yt, this.xt], true);
            this.setMeshVisible([this.LineAx, this.LineAy, this.line, this.arrowX, this.arrowUp], true);
        } else {
            this.setGUIVisible([this.yt, this.xt], false);
            this.setMeshVisible([this.LineAx, this.LineAy, this.line, this.arrowX, this.arrowUp], false);
        }
    }

    /**
     * '坐标表示'按钮
     */
    ButtonEvent2() {
        if (this.viewModel.buttonActived2) {
            this.tip.show();
            this.imageA.source = `${A2}`;
            this.posyt.isVisible = this.posxt.isVisible = true;
        } else {
            this.tip.hide();
            this.imageA.source = `${A1}`;
            this.posyt.isVisible = this.posxt.isVisible = false;
        }
    }

    /**
     * 重置按钮
     */
    reset(): void {
        this.posA = new Vector3(3, 3, 0);
        this.VArrow.position = this.posA;
        this.VRoot.position = new Vector3(-9, 3, 0);
        this.viewModel.buttonActived = false;
        this.viewModel.buttonActived2 = false;
        this.posYMesh.position = new Vector3(-0.6, this.posA.y / 2, 0);
        this.posXMesh.position = new Vector3(this.posA.x / 2, -0.6, 0);
        this.ButtonEvent();
        this.ButtonEvent2();

        this.tipA.position = this.posA;
        this.Baxi.position = this.tipA.position;
        this.Baxi.rotation = new Vector3(0, 0, Math.PI / 4);
        this.Aaxi.position = this.VArrow.position;
        this.ArrowHalfPos.position = this.VArrow.position.scale(0.5);
        this.Aaxi.rotation = new Vector3(0, 0, Math.PI / 4);
        this.LineAx.isVisible = false;
        this.LineAy.isVisible = false;
        this.updateLineData();
    }
}
