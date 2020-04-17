/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import {
    Color3, LinesMesh, Mesh, Scene, Vector3, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Vector } from '../../../../babylon/Math/Vector/Vector';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';

import * as dot from '../sub_static/dot.png';

import * as z1 from '../sub_static/z1.png';
import * as z2 from '../sub_static/z2.png';

import * as z1addz2 from '../sub_static/z1addz2.png';
import * as z1subtractz2 from '../sub_static/z1subtractz2.png';
import * as z1z2 from '../sub_static/z1z2.png';
import * as z1_z2 from '../sub_static/z1_z2.png';
import * as angle from '../sub_static/angle.png';
import * as angle1 from '../sub_static/angle1.png';
import * as angle2 from '../sub_static/angle2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    vectorZ1: Vector; //向量Z1
    angleZ1: LinesMesh;
    dotZ1: Mesh;
    imageZ1: GUI.Image;
    textZ1: GUI.TextBlock;

    vectorZ2: Vector; //向量Z2
    angleZ2: LinesMesh;
    dotZ2: Mesh;
    imageZ2: GUI.Image;
    textZ2: GUI.TextBlock;

    vectorZ1Z2: Vector; //向量Z1Z2运算
    angleZ: LinesMesh;
    dotZ: Mesh;
    imageZ: GUI.Image;

    mode = 0;
    coordinateSystem: Coordinate2DSystem; //坐标系
    line: LinesMesh;

    hexGreen = '#A2FB4C';
    hexBlue = '#37D2FF';
    hexPurple = '#caa3ff';
    hexYellow = '#FFD500';
    colorYellow: Color3;
    colorPurple: Color3;
    colorGreen: Color3;
    colorBlue: Color3;
    pos: Vector3[] = [new Vector3(1, 0, 0), new Vector3(1, 1, 0), new Vector3(1, -1, 0)
        , new Vector3(0, 1, 0), new Vector3(0, -1, 0)
        , new Vector3(-1, 0, 0), new Vector3(-1, 1, 0), new Vector3(-1, -1, 0)];
    offsetx = 2;
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
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.colorPurple = Color3.FromHexString(this.hexPurple);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
        this.dotZ = new Mesh('dotZ');
        this.dotZ1 = new Mesh('dotA1');
        this.dotZ2 = new Mesh('dotA2');
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOptionA = { linkOffsetX: '110px', linkOffsetY: '0px', height: '25px', width: '175px', color: '#FFFFFF' };
        const OptionZ1Z2 = { linkOffsetX: '-50px', linkOffsetY: '0px', height: '58px', width: '58px', color: '#FFFFFF' };
        const options1 = {
            height: 70, width: 70, color: '#FFFFFF',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const option2 = { color: '#FFFFFF', fontSize: '18px', fontFamily: '', fontStyle: '' };
        let paddingLeft = '30px';

        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            options1.fontSize = options2.fontSize = option2.fontSize = '36px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            ImageLabelOptionA.width = '350px';
            ImageLabelOptionA.height = '50px';
            ImageLabelOptionA.linkOffsetX = '220px';
            paddingLeft = '60px';
        }
        this.textZ1 = FastCreater.TextBlock('(2,4)', option2);
        this.textZ1.paddingLeft = paddingLeft;
        this.textZ2 = FastCreater.TextBlock('(2,3)', option2);
        this.textZ2.paddingLeft = paddingLeft;

        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 15, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);

        const matBlue = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        const matGreen = MaterialLab.CreateLightMaterial(this.colorGreen, scene);

        this.vectorZ1 = new Vector('tipE1', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(4, 3, 0), this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOption)
            .initImageText(`${z1}`, ImageLabelOptionA, [this.textZ1]);

        this.vectorZ2 = new Vector('tipE2', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(1, 2, 0), this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOption)
            .initImageText(`${z2}`, ImageLabelOptionA, [this.textZ2]);
        this.vectorZ1Z2 = new Vector('tipE2', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(-3, 3, 0), this.colorGreen, matGreen)
            .initImageText(`${z1addz2}`, OptionZ1Z2, []);
        this.line = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([new Vector3(0, 1, 0), new Vector3(5, 0, 0), new Vector3(1, 0, 0)], 10),
            this.colorBlue, this.edgesWidth, this.line, scene);
        this.angleZ = LinesBuild.CreateUpdateLines(FormulasUtils.GetArcUpdateVertices(1, 0, 45),
            this.colorGreen, this.edgesWidth, this.angleZ, scene);
        this.angleZ1 = LinesBuild.CreateUpdateLines(FormulasUtils.GetArcUpdateVertices(1.5, 0, 45),
            this.colorYellow, this.edgesWidth, this.angleZ1, scene);
        this.angleZ2 = LinesBuild.CreateUpdateLines(FormulasUtils.GetArcUpdateVertices(2, 0, 45),
            this.colorPurple, this.edgesWidth, this.angleZ2, scene);
        this.imageZ = LabelUtils.CreateImageLabel(advancedTexture, this.dotZ, `${angle}`, ImageLabelOption);
        this.imageZ1 = LabelUtils.CreateImageLabel(advancedTexture, this.dotZ1, `${angle1}`, ImageLabelOption);
        this.imageZ2 = LabelUtils.CreateImageLabel(advancedTexture, this.dotZ2, `${angle2}`, ImageLabelOption);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 25);
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
        startingPoint = startingPoint.length() > 15 ? Vector3.Normalize(startingPoint).scale(15) : startingPoint;
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint = new Vector3(Math.floor(startingPoint.x), Math.floor(startingPoint.y), 0);
            if (this.mode === 4 && startingPoint.length() < 1) {
                let tempPos = Vector3.One();
                for (let i = 0; i < this.pos.length; i++) {
                    const element = this.pos[i];
                    const dis = Vector3.Distance(startingPoint, element);
                    if (dis < Vector3.Distance(tempPos, element)) {
                        tempPos = element;
                    }
                }
                startingPoint = tempPos;
            }

            this.vectorZ1.updateData(currentMesh, startingPoint);
            this.vectorZ2.updateData(currentMesh, startingPoint);
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const v1 = this.vectorZ1.getArrowPos();
        const v2 = this.vectorZ2.getArrowPos();
        this.textZ1.text = `(${v1.x},${v1.y})`;
        this.textZ2.text = `(${v2.x},${v2.y})`;
        if (v1.y >= 0) {
            this.viewModel.formula1 = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v1.x}+${v1.y}i`;
        } else {
            this.viewModel.formula1 = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v1.x}-${Math.abs(v1.y)}i`;
        }
        if (v2.y >= 0) {
            this.viewModel.formula2 = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v2.x}+${v2.y}i`;
        } else {
            this.viewModel.formula2 = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v2.x}-${Math.abs(v2.y)}i`;
        }
        if (this.mode === 1) {
            this.updateMeshVertData(this.line, Vector3Utils.ToMoreVector3ToArray(
                [v1, v1.add(v2), v2], 10));
            this.vectorZ1Z2.setPos(Vector3.Zero()).setArrowPos(v1.add(v2))
                .setVisible(true).setArrowImageVisible(true).changeArrowImage(`${z1addz2}`).updateRotation();
        } else if (this.mode === 2) {
            this.vectorZ1Z2.setPos(v2).setArrowPos(v1.subtract(v2))
                .setVisible(true).setArrowImageVisible(true).changeArrowImage(`${z1subtractz2}`).updateRotation();
        } else if (this.mode === 3) {
            this.vectorZ1Z2.setPos(Vector3.Zero()).setVisible(true).setArrowImageVisible(true).changeArrowImage(`${z1z2}`)
                .setArrowPos(new Vector3(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x, 0)).updateRotation();
            this.updateAngle(true);
        } else if (this.mode === 4) {
            this.vectorZ1Z2.setPos(Vector3.Zero()).setVisible(true).setArrowImageVisible(true).changeArrowImage(`${z1_z2}`)
                .setArrowPos(new Vector3((v1.x * v2.x + v1.y * v2.y) / (Math.pow(v2.x, 2) + Math.pow(v2.y, 2)),
                    (v1.y * v2.x - v1.x * v2.y) / (Math.pow(v2.x, 2) + Math.pow(v2.y, 2)), 0)).updateRotation();
            this.updateAngle(false);
        }

    }
    updateAngle(boolAdd: boolean) {
        let ang1 = Vector3Utils.GetAngle(this.vectorZ1.getArrowPos(), new Vector3(1, 0, 0));
        ang1 = this.vectorZ1.getArrowPos().y >= 0 ? ang1 : -ang1;
        this.dotZ1.position = FormulasUtils.GetCirclePoint(2.5, ang1 / 2);
        let ang2 = Vector3Utils.GetAngle(this.vectorZ2.getArrowPos(), new Vector3(1, 0, 0));
        ang2 = this.vectorZ2.getArrowPos().y >= 0 ? ang2 : -ang2;
        this.dotZ2.position = FormulasUtils.GetCirclePoint(3, ang2 / 2);
        const ang = boolAdd ? ang1 + ang2 : ang1 - ang2;
        this.dotZ.position = FormulasUtils.GetCirclePoint(2, ang / 2);
        this.updateMeshVertData(this.angleZ, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, 0, ang)));
        this.updateMeshVertData(this.angleZ1, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1.5, 0, ang1)));
        this.updateMeshVertData(this.angleZ2, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(2, 0, ang2)));
    }

    /**
     * '证明'按钮
     */
    ButtonEvent(index: number) {
        this.mode = index;
        this.setGUIVisible([this.imageZ, this.imageZ1, this.imageZ2], false);
        this.setMeshVisible([this.angleZ, this.angleZ1, this.angleZ2, this.line], false);
        if (this.mode === 1) {
            this.line.isVisible = true;
        } else if (this.mode === 3 || this.mode === 4) {
            this.setMeshVisible([this.angleZ, this.angleZ1, this.angleZ2], true);
            this.setGUIVisible([this.imageZ, this.imageZ1, this.imageZ2], true);
            if (this.mode === 4) {
                this.vectorZ1.setArrowPos(Vector3.Distance(this.vectorZ1.getArrowPos(), Vector3.Zero()) < 0.5 ? 
                new Vector3(4, 3, 0) : this.vectorZ1.getArrowPos()).updateRotation();
                this.vectorZ2.setArrowPos(Vector3.Distance(this.vectorZ2.getArrowPos(), Vector3.Zero()) < 0.5 ? 
                new Vector3(1, 2, 0) : this.vectorZ2.getArrowPos()).updateRotation();
            }
        }
        this.updateLineData();
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        // this.formatterV = 15;
        // this.formatter(15);
        this.vectorZ1Z2.setVisible(false).setArrowImageVisible(false).updateRotation();
        this.vectorZ1.notCheck().notArrowCheck().setPos(Vector3.Zero()).setArrowPos(new Vector3(4, 3, 0)).updateRotation();
        this.vectorZ2.notCheck().notArrowCheck().setPos(Vector3.Zero()).setArrowPos(new Vector3(1, 2, 0)).updateRotation();
        this.ButtonEvent(0);
    }
}
