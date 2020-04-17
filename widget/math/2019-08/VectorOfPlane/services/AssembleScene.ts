/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, Scene, AbstractMesh, Engine, Vector2 } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { Vector, VectorMoveHandler } from '../../../../babylon/Math/Vector/Vector';
import { NormalizeVector } from '../../../../babylon/Math/Vector/NormalizeVector';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

import * as dot from '../sub_static/dot.png';
import * as a from '../sub_static/image/a.png';
import * as ar from '../sub_static/image/ar.png';
import * as e1 from '../sub_static/image/e1.png';
import * as e2 from '../sub_static/image/e2.png';
import * as i from '../sub_static/image/i.png';
import * as j from '../sub_static/image/j.png';
import * as r1e1 from '../sub_static/image/r1e1.png';
import * as r2e2 from '../sub_static/image/r2e2.png';
import * as r3e1 from '../sub_static/image/r3e1.png';
import * as r4e2 from '../sub_static/image/r4e2.png';
import * as xi from '../sub_static/image/xi.png';
import * as yj from '../sub_static/image/yj.png';


export class AssembleScene extends Base2DScene implements VectorMoveHandler {

    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    normalizeVector: NormalizeVector; //单位向量
    vectorA: Vector; //向量A
    vectorAPos = new Vector3(0, 0, 0);
    vectorAArrowPos = new Vector3(9, 5, 0);

    vectorE1: Vector; //向量e1
    vectorE1Pos = new Vector3(-6, 2, 0);
    vectorE1ArrowPos = new Vector3(6, 8, 0);

    vectorE2: Vector; //向量e2
    vectorE2Pos = new Vector3(-2, -4, 0);
    vectorE2ArrowPos = new Vector3(6, -8, 0);

    vectorRE1: Vector; //向量e1投影
    vectorRE2: Vector; //向量e2投影
    lineV = false;
    line: LinesMesh; //辅助线
    line2: LinesMesh;
    colorHexStringB = '#6F6F6F';
    colorHexStringDashedLines = '#349EEF';
    colorHexStringRed = '#FF6160';
    colorHexStringBlue = '#6ECFFF';

    colorB: Color3;
    colorDashedLines: Color3;
    colorRed: Color3;
    colorBlue: Color3;
    hasFinished = 0;
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
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
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
        const OptionA = { linkOffsetX: '90px', linkOffsetY: '-30px', height: '55px', width: '165px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            options1.fontSize = options2.fontSize = '36px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            ImageLabelOptionA.width = '228px';
            ImageLabelOptionA.height = '56px';
            ImageLabelOptionA.linkOffsetX = '114px';
            ImageLabelOptionA.linkOffsetY = '-28px';
        }
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 10, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);
        this.coordinateSystem.setVisible(false);

        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorB, scene);
        const materialRed = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        const tempMesh = Mesh.CreateSphere('tipVRoot', 8, 1.8, scene);

        this.vectorE1 = new Vector('tipE1', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorE1Pos, this.vectorE1ArrowPos, this.colorB, lightmaterialA)
            .initDotLabel(`${dot}`, ImageLabelOption)
            .initImageLabel(`${e1}`, ImageLabelOption);

        this.vectorE2 = new Vector('tipE2', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorE2Pos, this.vectorE2ArrowPos, this.colorB, lightmaterialA)
            .initDotLabel(`${dot}`, ImageLabelOption)
            .initImageLabel(`${e2}`, ImageLabelOption);

        this.vectorRE1 = new Vector('ti1', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorE1Pos, this.vectorE1ArrowPos, this.colorRed, materialRed)
            .initImageLabel(`${r1e1}`, ImageLabelOption);

        this.vectorRE2 = new Vector('ti2', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorE2Pos, this.vectorE2ArrowPos, this.colorRed, materialRed)
            .initImageLabel(`${r2e2}`, ImageLabelOption);

        this.vectorA = new Vector('tipA', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorAPos, this.vectorAArrowPos, this.colorRed, materialRed)
            .initDotLabel(`${dot}`, ImageLabelOption)
            .initImageLabel(`${ar}`, ImageLabelOption).initImageText(`${a}`, OptionA, []);

        const lightmaterialBlue = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        this.normalizeVector = new NormalizeVector('normalizeVector', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.colorBlue, lightmaterialBlue).
            initImageLabel(`${i}`, `${j}`, ImageLabelOption);
        this.normalizeVector.setVisible(false);
        tempMesh.dispose();
        this.line = LinesBuild.createDashLines([new Vector3(0, 1, 0), new Vector3(5, 0, 0)],
            this.colorRed, this.edgesWidth, scene, 20, 20);
        this.line2 = LinesBuild.createDashLines([new Vector3(5, 0, 0), new Vector3(1, 0, 0)],
            this.colorRed, this.edgesWidth, scene, 20, 20);
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
            if (currentMesh === this.vectorE1.getArrow()) {
                this.vectorE1.updateDataWithAngle(currentMesh, startingPoint, this.vectorE2.getArrowPos(),
                    this.orthoX, this.orthoY, this.offset, 1, 11.5);
            } else if (currentMesh === this.vectorE2.getArrow()) {
                this.vectorE2.updateDataWithAngle(currentMesh, startingPoint, this.vectorE1.getArrowPos(),
                    this.orthoX, this.orthoY, this.offset, 1, 11.5);
            } else {
                this.vectorE1.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset, 1, 11.5);
                this.vectorE2.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset, 1, 11.5);
            }
            this.vectorA.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset, 1, 11.5);
            this.updateVector();
        }
    }

    updateVector() {
        const OE1 = BeelineUtils.GetLineSlopeAndConstant(Vector3.Zero(), this.vectorE1.getArrowPos());
        const OE2 = BeelineUtils.GetLineSlopeAndConstant(Vector3.Zero(), this.vectorE2.getArrowPos());
        const be1 = OE1.x === 0 ? this.vectorA.getArrowPos().y : OE1.x === Infinity ?
            this.vectorA.getArrowPos().x : this.vectorA.getArrowPos().y - OE1.x * this.vectorA.getArrowPos().x; //常数
        const be2 = OE2.x === 0 ? this.vectorA.getArrowPos().y : OE2.x === Infinity ?
            this.vectorA.getArrowPos().x : this.vectorA.getArrowPos().y - OE2.x * this.vectorA.getArrowPos().x; //常数

        const re2 = BeelineUtils.GetLineFocusPoint(OE2, new Vector2(OE1.x, be1));
        const re1 = BeelineUtils.GetLineFocusPoint(OE1, new Vector2(OE2.x, be2));
        this.vectorRE1.setPos(Vector3.Zero()).setArrowPos(re1).updateRotation();
        this.vectorRE2.setPos(Vector3.Zero()).setArrowPos(re2).updateRotation();
        if (this.lineV === true) {
            const nb = Math.floor(Vector3.Distance(re1, this.vectorA.getArrowPos()));
            this.line.dispose();
            this.line = LinesBuild.createDashLines([this.vectorA.getArrowPos(), re1],
                this.colorRed, this.edgesWidth, this.scene, nb > 20 ? nb : 20, nb);
            const nb2 = Math.floor(Vector3.Distance(re2, this.vectorA.getArrowPos()));
            this.line2.dispose();
            this.line2 = LinesBuild.createDashLines([this.vectorA.getArrowPos(), re2],
                this.colorRed, this.edgesWidth, this.scene, nb2 > 20 ? nb2 : 20, nb2);
        }
    }

    moveEnd(v: Vector): void {
        if (v === this.vectorE1 || v === this.vectorE2 || v === this.vectorA) {
            this.hasFinished++;
        }
        const finish = this.viewModel.buttonActived === 1 ? 3 : 5;
        if (this.hasFinished === finish) {
            this.vectorA.setArrowPickAble(true).setArrowLabelVisible(true);
            if (this.viewModel.buttonActived === 1) {
                this.vectorE1.setArrowPickAble(true).setArrowLabelVisible(true);
                this.vectorE2.setArrowPickAble(true).setArrowLabelVisible(true);
            }
            this.vectorRE1.setVisible(true).setLabelVisible(true);
            this.vectorRE2.setVisible(true).setLabelVisible(true);
            this.lineV = true;
            this.line.isVisible = this.line2.isVisible = true;
            this.updateVector();
            this.hasFinished = 0;
        }
    }
    /**
     * '辅助线'按钮
     */
    ButtonEvent(index: number) {
        this.vectorA.notCheck().setCheck(Vector3.Zero()).setPickAble(false)
            .setRootLabelVisible(false).setArrowImageVisible(false).setArrowLabelVisible(false);
        this.vectorE1.notCheck().notArrowCheck().setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);
        this.vectorE2.notCheck().notArrowCheck().setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);
        this.vectorRE1.setVisible(false).setLabelVisible(false);
        this.vectorRE2.setVisible(false).setLabelVisible(false);
        this.lineV = false;
        this.line.isVisible = this.line2.isVisible = false;
        if (index === 1) {
            this.vectorE1.setCheck(Vector3.Zero());
            this.vectorE2.setCheck(Vector3.Zero());
            this.vectorRE1.changeLabelUrl(r1e1).updateRotation();
            this.vectorRE2.changeLabelUrl(r2e2).updateRotation();
        } else if (index === 2) {
            this.vectorE1.setCheck(Vector3.Zero()).setArrowCheck(0);
            this.vectorE2.setCheck(Vector3.Zero()).setArrowCheck(90);
            this.vectorRE1.changeLabelUrl(r4e2).updateRotation();
            this.vectorRE2.changeLabelUrl(r3e1).updateRotation();
        } else if (index === 3) {
            this.vectorE1.setCheck(Vector3.Zero()).setArrowCheck(0);
            this.vectorE2.setCheck(Vector3.Zero()).setArrowCheck(90);
            this.vectorRE1.changeLabelUrl(xi).updateRotation();
            this.vectorRE2.changeLabelUrl(yj).updateRotation();
        }
        this.coordinateSystem.setVisible(index === 3);
        this.normalizeVector.setVisible(index === 3);
        this.hasFinished = 0;
    }

    /**
     * 重置按钮
     */
    reset(): void {
        this.vectorRE1.setVisible(false).setLabelVisible(false);
        this.vectorRE2.setVisible(false).setLabelVisible(false);
        this.lineV = false;
        this.line.isVisible = this.line2.isVisible = false;
        this.vectorA.notCheck().setPos(this.vectorAPos).setArrowPos(this.vectorAArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).setArrowImageVisible(false).updateRotation();
        this.vectorE1.notCheck().notArrowCheck().setPos(this.vectorE1Pos).setArrowPos(this.vectorE1ArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
        this.vectorE2.notCheck().notArrowCheck().setPos(this.vectorE2Pos).setArrowPos(this.vectorE2ArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
        this.coordinateSystem.setVisible(false);
        this.normalizeVector.setVisible(false);
        this.hasFinished = 0;
    }

}
