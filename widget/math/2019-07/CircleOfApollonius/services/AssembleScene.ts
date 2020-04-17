/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, Vector2, LinesMesh, Mesh, TransformNode, Scene, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    colorHexBlue = '#6ECFFF';
    colorHexRed = '#F05467';
    colorHexWhite = '#ffffff';
    colorBlue: Color3;
    colorRed: Color3;
    colorWhite: Color3;
    tipHalfSize = 0.75; //手势边界
    //点A B P
    tipA: Mesh;
    tipP: Mesh;
    tipB: Mesh;
    dotA: GUI.Image;
    dotP: GUI.Image;
    dotB: GUI.Image;
    LineAP: LinesMesh;
    LineBP: LinesMesh;
    LineCircle: LinesMesh; //圆线条
    CircleDot: TransformNode; //圆心
    CircleR = 1; //圆半径

    draw = false; //是否绘制
    angle = 0; //角度增量
    //AP BP AB 距离
    DistanceBP: number;
    DistanceAP: number;
    DistanceAB: number;
    angleP: number; //P点在当前圆的角度

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
        this.registerBeforeRender();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /**
   * 初始化颜色
   */
    initColor(): void {
        this.colorBlue = Color3.FromHexString(this.colorHexBlue);
        this.colorRed = Color3.FromHexString(this.colorHexRed);
        this.colorWhite = Color3.FromHexString(this.colorHexWhite);
    }

    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene): void {
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.setMeshVisible([this.tipP, this.tipA, this.tipB], false);
        this.CircleDot = new TransformNode('tiA');
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const options = {
            height: '30px', width: '30px', color: this.colorHexWhite,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        let linkOffsetX = 30;

        if (this.isMob) {
            options.height = options.width = '60px';
            options.fontSize = '48px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            linkOffsetX = 60;
        }
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', linkOffsetX, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', linkOffsetX, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', linkOffsetX, 0, options);
        this.dotB = LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);
        this.dotA = LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        this.dotP = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, dot, ImageLabelOption);
        this.dotA.hoverCursor = 'pointer';
        this.dotA.isPointerBlocker = true;
        this.dotB.hoverCursor = 'pointer';
        this.dotB.isPointerBlocker = true;
        this.dotP.hoverCursor = 'pointer';
        this.dotP.isPointerBlocker = true;

        this.LineCircle = FormulaLineUtils.CreateDashedUpdateCircle(this.CircleR, 360,
            this.colorRed, this.LineCircle, this.edgesWidth, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.tipA.position, this.tipP.position],
            this.colorBlue, this.edgesWidth, this.LineAP, scene);
        this.LineBP = LinesBuild.CreateUpdateLines([this.tipB.position, this.tipP.position],
            this.colorBlue, this.edgesWidth, this.LineBP, scene);
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
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipP.position, this.tipA.position]));
        this.updateMeshVertData(this.LineBP, Vector3Utils.ToArray([this.tipP.position, this.tipB.position]));
        this.DistanceBP = Vector3.Distance(this.tipP.position, this.tipB.position);
        this.DistanceAP = Vector3.Distance(this.tipP.position, this.tipA.position);
        this.viewModel.numtext = `${(this.DistanceAP / this.DistanceBP).toFixed(2)}`;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint.x = startingPoint.x > this.orthoX - this.offset - 2 ? this.orthoX - this.offset - 2 : startingPoint.x;
            // currentMesh.position = startingPoint;
            if (currentMesh === this.tipA) {
                currentMesh.position = this.posAdsorption(this.tipB.position, this.tipP.position, startingPoint, currentMesh.position);
                currentMesh.position = this.isEqualLength() ?
                    currentMesh.position.add(Vector3.Normalize(this.tipB.position.subtract(this.tipP.position)).scale(0.5))
                    : currentMesh.position;
            } else if (currentMesh === this.tipB) {
                currentMesh.position = this.posAdsorption(this.tipP.position, this.tipA.position, startingPoint, currentMesh.position);
                currentMesh.position = this.isEqualLength() ?
                    currentMesh.position.add(Vector3.Normalize(this.tipP.position.subtract(this.tipA.position)).scale(0.5))
                    : currentMesh.position;
            } else if (currentMesh === this.tipP) {
                currentMesh.position = this.posAdsorption(this.tipB.position, this.tipA.position, startingPoint, currentMesh.position);
                currentMesh.position = this.isEqualLength() ?
                    currentMesh.position.add(Vector3.Normalize(this.tipB.position.subtract(this.tipA.position)).scale(0.5))
                    : currentMesh.position;
            }

            this.LineCircle.isVisible = false;
            this.draw = false;
            this.viewModel.buttonActived2 = false;
            this.angle = 0;
            this.updateLineData();
        }
    }

    isEqualLength(): boolean {
        return Math.abs(Vector3.Distance(this.tipP.position, this.tipA.position) -
            Vector3.Distance(this.tipP.position, this.tipB.position)) < 0.1;
    }

    posAdsorption(pos1: Vector3, pos2: Vector3, startingPoint: Vector3, current: Vector3): Vector3 {
        if (Vector3.Distance(startingPoint, pos2) < 0.3) {
            startingPoint = current;
        }
        if (Vector3.Distance(pos1, startingPoint) < 0.3) {
            startingPoint = current;
        }
        const AB = BeelineUtils.GetLineSlopeAndConstant(pos1, pos2);
        const k_ab = AB.x === Infinity ? 0 : AB.x === 0 ? Infinity : -1 / AB.x; //AB边高的斜率
        const Bab = k_ab === 0 ? startingPoint.y : k_ab === Infinity ?
            startingPoint.x : startingPoint.y - k_ab * startingPoint.x; //常数
        const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, new Vector2(k_ab, Bab));
        if (Vector3.Distance(startingPoint, posAB_CP) < 0.2) {
            startingPoint = posAB_CP;
        }
        return startingPoint;
    }

    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            if (this.draw === true) {
                if (this.angle < 360) {
                    this.angle += 3;
                    this.tipP.position = FormulasUtils.GetCirclePoint(this.CircleR, this.angleP + this.angle).add(this.CircleDot.position);
                    const vecs = FormulasUtils.GetArcUpdateVertices(this.CircleR, this.angleP, this.angleP + this.angle);
                    this.updateMeshVertData(this.LineCircle, Vector3Utils.ToArray(vecs, this.CircleDot.position));
                    this.updateLineData();
                } else {
                    this.draw = false;
                    this.angle = 0;
                }
            }
        });
    }

    /**
    * '构建'按钮
    */
    ButtonEvent2(tr: boolean): void {
        if (this.draw === false && tr) {
            this.viewModel.buttonActived2 = !this.viewModel.buttonActived2;
            if (this.viewModel.buttonActived2) {
                this.GetCircleDot();
            }
        }
        if (!this.viewModel.buttonActived2) {
            this.LineCircle.isVisible = false;
            this.draw = false;
            this.viewModel.look = false;
            this.ButtonLook();
        }
    }

    ButtonLook() {
        if (this.viewModel.look) {
            const l = Math.sqrt(Math.pow(this.CircleDot.position.x, 2) + Math.pow(this.CircleDot.position.y, 2));
            this.orthoY = (this.CircleR) * 2 + l > 18 ? (this.CircleR) * 2 + l : 18;
            this.dotA.hoverCursor = '';
            this.dotA.isPointerBlocker = false;
            this.dotB.hoverCursor = '';
            this.dotB.isPointerBlocker = false;
            this.dotP.hoverCursor = '';
            this.dotP.isPointerBlocker = false;
        } else {
            this.orthoY = 18;
            this.dotA.hoverCursor = 'pointer';
            this.dotA.isPointerBlocker = true;
            this.dotB.hoverCursor = 'pointer';
            this.dotB.isPointerBlocker = true;
            this.dotP.hoverCursor = 'pointer';
            this.dotP.isPointerBlocker = true;
        }
        this.setMeshPickable([this.tipA, this.tipB, this.tipP], !this.viewModel.look);
        this.setImageSrc([this.dotA, this.dotB, this.dotP], this.viewModel.look ? dot2 : dot);
        this.changeCameraSize();
    }

    setImageSrc(line: GUI.Image[], data: string) {
        for (let i = 0; i < line.length; i++) {
            line[i].source = data;
        }
    }

    /**
     * 获取圆心位置
     */
    GetCircleDot() {
        this.LineCircle.isVisible = true;
        const ba = this.tipB.position.add(this.tipA.position.scale(-1));
        this.DistanceBP = Vector3.Distance(this.tipP.position, this.tipB.position);
        this.DistanceAP = Vector3.Distance(this.tipP.position, this.tipA.position);
        this.DistanceAB = Vector3.Distance(this.tipB.position, this.tipA.position);
        const AC = this.DistanceAP * this.DistanceAB / (this.DistanceAP + this.DistanceBP);
        const BD = this.DistanceBP * this.DistanceAB / (this.DistanceAP - this.DistanceBP);
        const CD = this.DistanceAB + BD - AC;
        const CirclePoint = AC + CD / 2;
        this.CircleDot.position = this.tipA.position.add(ba.normalize().scale(CirclePoint));
        this.CircleR = Vector3.Distance(this.CircleDot.position, this.tipP.position);
        const vec = this.tipP.position.subtract(this.CircleDot.position).scale(1).normalize();
        const pos = FormulasUtils.GetAngleFromPoint(vec);
        this.angleP = vec.y > 0 ? pos.y : 360 - pos.y;
        this.angle = 0;
        this.draw = true;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipA.position = new Vector3(-3, 0.5, 0);
        this.tipB.position = new Vector3(2, 0, 0);
        this.tipP.position = new Vector3(3, 3, 0);
        this.angle = 0;
        this.ButtonEvent2(false);
        this.updateLineData();
    }
}
