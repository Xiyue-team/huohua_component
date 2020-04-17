/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { Color3, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Vector2 } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as meta from '../sub_static/meta.json';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';


export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    r = 10; //圆半径
    hexGreen = '#9BF23B';
    hexBlue = '#00AAFF';
    hexRed = '#FF0000';
    hexPink = '#FF5A5A';
    hexWhite = '#ffffff';
    hexPurple = '#B769FB';

    colorGreen: Color3;
    colorBlue: Color3;
    colorRed: Color3;
    colorPink: Color3;
    colorWhite: Color3;
    colorPurple: Color3;

    tip: Mesh; //动点
    Circle: LinesMesh; //圆
    LineH: LinesMesh;
    LineA: LinesMesh;
    LineB: LinesMesh;

    tipA: Mesh;
    tipB: Mesh;
    tipP: Mesh; //P
    textA: GUI.TextBlock;
    textB: GUI.TextBlock;
    tipDot: GUI.Image;
    LinePB: LinesMesh;
    LinePO: LinesMesh;
    LineAngle: LinesMesh;
    LineOHP: LinesMesh;

    //公式标签
    imagePB: GUI.Image;
    imgPB: Mesh;
    imagePO: GUI.Image;
    imgPO: Mesh;
    O: Mesh;
    LinePleft: LinesMesh;
    LinePright: LinesMesh;
    LineHeight: LinesMesh;
    
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
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorWhite = Color3.FromHexString(this.hexWhite);
        this.colorPurple = Color3.FromHexString(this.hexPurple);
        this.colorPink = Color3.FromHexString(this.hexPink);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tip = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tip.isVisible = false;
        this.O = new Mesh('O');
        this.O.position = new Vector3(0, 0, 0);
        this.tipA = new Mesh('label');
        this.tipB = new Mesh('label');
        this.tipP = new Mesh('label');
        this.imgPB = new Mesh('label');
        this.imgPO = new Mesh('label');
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

        const options = {
            height: '20px', width: '20px', color: this.hexWhite,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageOption = { height: '50px', width: '80px', color: '#FFFFFF', linkOffsetX: '60px', linkOffsetY: '0px' };
        const ImageOption2 = { height: '50px', width: '80px', color: '#FFFFFF', linkOffsetX: '-60px', linkOffsetY: '0px' };
        let linkx = 0, linky = 10;
        if (this.isMob) {
            ImageOption.height = ImageOption2.height = '100px';
            ImageOption.width = ImageOption2.width = '160px';
            options.height = options.width = '40px';
            options.fontSize = '40px';
            linkx = 0, linky = 30;
            if (!(window as any)['env'].browserInfo.isSmallDevice) {
                ImageLabelOption.height = ImageLabelOption.width = '80px';
            }
        }

        this.tipDot = LabelUtils.CreateImageLabel(advancedTexture, this.tip, `${dot}`, ImageLabelOption);
        this.imagePB = LabelUtils.CreateImageLabelLeft(advancedTexture, this.imgPB, meta.leftg, ImageOption);
        this.imagePO = LabelUtils.CreateImageLabelLeft(advancedTexture, this.imgPO, meta.rightred, ImageOption2);

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.O, 'O', linkx, linky, options);
        options.color = this.hexPurple;
        this.textA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'a', linkx, linky, options);
        options.color = this.hexBlue;
        this.textB = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'b', linkx, linky, options);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: BABYLON.Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 20);
        this.camera.position.y = 7;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);

        this.LineH = LinesBuild.CreateDashedLines([new Vector3(this.r, 0, 0), new Vector3(-this.r, 0, 0)],
            this.colorWhite, this.edgesWidth, scene, 20);
        this.Circle = FormulaLineUtils.CreateDashedUpdateCircle(this.r, 361, this.colorWhite, this.Circle, this.edgesWidth, scene);
        this.LineHeight = LinesBuild.CreateLines([new Vector3(0.5, 0, 0), new Vector3(0.5, 0.5, 0), new Vector3(0, 0.5, 0)],
            this.colorRed, this.edgesWidth, scene);

        this.LineA = LinesBuild.CreateUpdateLines([this.tip.position, new Vector3(-this.r, 0, 0)],
            this.colorPurple, this.edgesWidth, this.LineA, scene);
        this.LineB = LinesBuild.CreateUpdateLines([this.tip.position, new Vector3(this.r, 0, 0)],
            this.colorBlue, this.edgesWidth, this.LineB, scene);
        this.LinePB = LinesBuild.CreateUpdateLines([this.tip.position, this.tipP.position],
            this.colorGreen, this.edgesWidth, this.LinePB, scene);
        this.LinePO = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.tipP.position],
            this.colorPink, this.edgesWidth, this.LinePO, scene);
        this.LineAngle = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.tipP.position, Vector3.Zero()],
            this.colorRed, this.edgesWidth, this.LineAngle, scene);
        this.LinePleft = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([new Vector3(-this.r, 0, 0), this.tipP.position], 20),
            this.colorWhite, this.edgesWidth, this.LinePleft, scene);
        this.LinePright = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([new Vector3(this.r, 0, 0), this.tipP.position], 20),
            this.colorWhite, this.edgesWidth, this.LinePright, scene);
        this.LineOHP = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([Vector3.Zero(), new Vector3(this.r, 1, 0), Vector3.Zero()], 10),
            this.colorWhite, this.edgesWidth, this.LineOHP, scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    getCirclePoint(x: number, r: number): Vector3 {
        const y = Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2));
        return new Vector3(x, y, 0);
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        if (this.viewModel.buttonActived === 1) {
            this.tipP.position = this.getCirclePoint(this.tip.position.x, this.r);
            this.LineHeight.position = this.tip.position.scale(1);
            const AP = BeelineUtils.GetLineSlopeAndConstant(this.tipP.position, Vector3.Zero());
            const k_c = -1 / AP.x; //AB边高的斜率
            const b_c = this.tip.position.y - k_c * this.tip.position.x; //常数
            const h = BeelineUtils.GetLineFocusPoint(AP, new Vector2(k_c, b_c));
            this.updateMeshVertData(this.LineOHP, Vector3Utils.ToMoreVector3ToArray([Vector3.Zero(), h, this.tip.position], 10));
            const p = Vector3.Normalize(this.tipP.position).scale(0.4);
            const hp = Vector3.Normalize(this.tip.position.subtract(h)).scale(0.4);
            this.updateMeshVertData(this.LineAngle, Vector3Utils.ToArray([h.add(p), h.add(p).add(hp), h.add(hp)]));
            this.updateMeshVertData(this.LinePO, Vector3Utils.ToArray([h, this.tipP.position]));
        } else if (this.viewModel.buttonActived === 2) {
            this.tipP.position = this.getCirclePoint(this.tip.position.x, this.r);
            this.LineHeight.position = this.tip.position.scale(1);
            this.updateMeshVertData(this.LinePO, Vector3Utils.ToArray([new Vector3(0, 0, 0), this.tipP.position]));
        } else if (this.viewModel.buttonActived === 3) {
            this.tipP.position = new Vector3(0, this.r, 0);
            this.LineHeight.position = Vector3.Zero();
            this.updateMeshVertData(this.LinePO, Vector3Utils.ToArray([new Vector3(0, 0, 0), this.tipP.position]));
        }

        this.updateMeshVertData(this.LineA, Vector3Utils.ToArray([new Vector3(-this.r, 0, 0), this.tip.position]));
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([new Vector3(this.r, 0, 0), this.tip.position]));
        this.updateMeshVertData(this.LinePB, Vector3Utils.ToArray([this.tip.position, this.tipP.position]));
        this.updateMeshVertData(this.LinePleft, Vector3Utils.ToMoreVector3ToArray([new Vector3(-this.r, 0, 0), this.tipP.position], 20));
        this.updateMeshVertData(this.LinePright, Vector3Utils.ToMoreVector3ToArray([new Vector3(this.r, 0, 0), this.tipP.position], 20));
        this.imagePB.parent.linkOffsetX = this.tip.position.x > 0 ? '60px' : '-60px';
        this.imagePO.parent.linkOffsetX = this.tip.position.x > 0 ? '-60px' : '60px';
        this.tipA.position = new Vector3(-this.r, 0, 0).add(this.tip.position).scale(0.5);
        this.tipB.position = new Vector3(this.r, 0, 0).add(this.tip.position).scale(0.5);
        this.imgPB.position = this.tipP.position.add(this.tip.position).scale(0.5);
        this.imgPO.position = this.tipP.position.scale(0.5);
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint.x = startingPoint.x > -this.r + 0.3 ?
                startingPoint.x < this.r - 0.3 ? startingPoint.x : this.r - 0.3 : -this.r + 0.3;
            currentMesh.position.x = Math.abs(startingPoint.x) < 0.3 ? 0 : startingPoint.x;
            this.updateLineData();
        }
    }
    /**
     * '结论'按钮
     */
    ButtonEvent(): void {
        this.setGUIVisible([this.tipDot, this.textA, this.textB, this.imagePB, this.imagePO], false);
        this.setMeshVisible([this.LineA, this.LineB, this.LinePB, this.LinePO,
        this.LinePleft, this.LinePright, this.LineHeight, this.LineOHP, this.LineAngle], false);

        if (this.viewModel.buttonActived === 1) {
            this.setGUIVisible([this.tipDot, this.textA, this.textB, this.imagePB, this.imagePO], true);
            this.setMeshVisible([this.LineA, this.LineB, this.LinePB, this.LinePO, this.LineHeight, this.LineOHP, this.LineAngle], true);
            this.imagePB.source = meta.leftg;
            this.imagePO.source = meta.moreleftred;
        } else if (this.viewModel.buttonActived === 2) {
            this.setGUIVisible([this.tipDot, this.textA, this.textB, this.imagePB, this.imagePO], true);
            this.setMeshVisible([this.LineA, this.LineB, this.LinePB, this.LinePO, this.LinePleft, this.LinePright, this.LineHeight], true);
            this.imagePB.source = meta.leftg;
            this.imagePO.source = meta.rightred;
        } else if (this.viewModel.buttonActived === 3) {
            this.setGUIVisible([this.tipDot, this.textA, this.textB, this.imagePB, this.imagePO], true);
            this.setMeshVisible([this.LineA, this.LineB, this.LinePB, this.LinePO, this.LineHeight], true);
            this.imagePB.source = meta.morerightg;
            this.imagePO.source = meta.rightred;
        }
        this.updateLineData();
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.viewModel.buttonActived = 0;
        this.tip.position = new Vector3(3, 0, 0);
        this.ButtonEvent();
    }
}
