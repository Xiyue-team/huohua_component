/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/9/10 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, TransformNode, LinesMesh, Mesh, AbstractMesh, Engine, Scene, Vector2
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';

import * as dot from '../sub_static/dot.png';
import * as S1 from '../sub_static/s1.png';
import * as S2 from '../sub_static/s2.png';
import * as S3 from '../sub_static/s3.png';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';
import { AngleUtils } from '../../../../babylon/Math/AngleUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexRed = '#FF5A5A';
    hexBlue = '#19A1FF';
    colorRed: Color3;
    colorBlue: Color3;

    //点A B C P D
    posA = new Vector3(2, 8, 0);
    tipAA: Mesh;
    tipA: Mesh;

    posC = new Vector3(-8, -6, 0);
    tipC: Mesh;
    tipCC: Mesh;

    posB = new Vector3(8, -6, 0);
    tipBB: Mesh;
    tipB: Mesh;
    tipP: Mesh;
    tipDD: Mesh;
    tipD: Mesh;
    tipH: Mesh;

    //面积定位点
    tipS1: Mesh;
    tipS2: Mesh;
    tipS3: Mesh;
    //线条ABC AP BPC PD
    LineABC: LinesMesh;
    LineAP: LinesMesh;
    LineBPC: LinesMesh;
    LinePD: LinesMesh;
    LinePH: LinesMesh;
    Lineh: LinesMesh;
    LineAngh: LinesMesh;

    posInside: Vector3; //三角形内心坐标
    length = 12;

    //箭头
    arrowAD: TransformNode;
    arrow: Mesh;

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
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipAA = new Mesh('a');
        this.tipCC = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipDD = new Mesh('a');
        this.tipD = new Mesh('a');
        this.tipH = new Mesh('h');

        this.tipS1 = new Mesh('a');
        this.tipS2 = new Mesh('a');
        this.tipS3 = new Mesh('h');

        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);

        this.setMeshVisible([this.tipP, this.tipA, this.tipB, this.tipC], false);
        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
        this.arrowAD = new TransformNode('arrow');
        const matA = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        this.arrow = Mesh.CreateCylinder('arrowA', 0.5, 0, 0.5, 4, 1, scene);
        this.arrow.rotation = new Vector3(0, 0, -Math.PI / 2);
        this.arrow.position = new Vector3(-0.2, 0, 0);
        this.arrow.material = matA;
        this.arrow.isPickable = false;
        this.arrow.setParent(this.arrowAD);
        this.arrow.isVisible = false;
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);

        const options = {
            height: 30, width: 30, color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: '30px', width: '30px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOptions = { height: '24px', width: '24px', color: '#FFFFFF' };
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            ImageLabelOptions.height = ImageLabelOptions.width = '48px';
            options2.width = options2.height = '60px';
            options.width = options.height = 60;
            options.fontSize = options2.fontSize = '48px';
        }

        LabelUtils.CreateLabel(advancedTexture, this.tipAA, 'A', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipBB, 'B', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipCC, 'C', options);
        LabelUtils.CreateLabel(advancedTexture, this.tipDD, 'D', options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipH, 'h', 30, 30, options2);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 40, 0, options2);

        this.LineABC = LinesBuild.CreateUpdateLines([this.posA, this.posB, this.posC, this.posA],
            Color3.Black(), this.edgesWidth, this.LineABC, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorBlue, this.edgesWidth, this.LineAP, scene);
        this.LinePD = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posC], 20), this.colorRed, this.edgesWidth, this.LinePD, scene);
        this.LinePH = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posC], 20), this.colorRed, this.edgesWidth, this.LinePH, scene);
        this.Lineh = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorRed, this.edgesWidth, this.Lineh, scene);
        this.LineAngh = LinesBuild.CreateUpdateLines([this.posA, this.posB, this.posC],
            this.colorRed, this.edgesWidth, this.LineAngh, scene);

        this.LineBPC = LinesBuild.CreateUpdateLines([this.posA, this.posC, this.posC],
            this.colorBlue, this.edgesWidth, this.LineBPC, scene);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipS1, `${S1}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipS2, `${S2}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipS3, `${S3}`, ImageLabelOption);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 18);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 更新ABC标签位置
     */
    updateLabelPos() {
        this.posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
        const posInsidea = this.tipA.position.subtract(this.posInside).scale(1).normalize();
        const posInsideb = this.tipB.position.subtract(this.posInside).scale(1).normalize();
        const posInsidec = this.tipC.position.subtract(this.posInside).scale(1).normalize();
        const posInsided = this.tipD.position.subtract(this.posInside).scale(1).normalize();
        this.tipAA.position = this.tipA.position.add(posInsidea);
        this.tipBB.position = this.tipB.position.add(posInsideb);
        this.tipCC.position = this.tipC.position.add(posInsidec);
        this.tipDD.position = this.tipD.position.add(posInsided);
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        startingPoint.y = startingPoint.y > this.orthoY - this.offset - 1.5 ? this.orthoY - this.offset - 1.5 : startingPoint.y;

        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            startingPoint.x = startingPoint.x < -this.orthoX + this.offset + 0.5 ? -this.orthoX + this.offset + 0.5 : startingPoint.x;
            startingPoint.y = startingPoint.y > this.orthoY - this.offset - 1 ? this.orthoY - this.offset - 1 : startingPoint.y;
        } else if ((window as any)['env'].browserInfo.isSmallDevice) {
            startingPoint.x = startingPoint.x < -this.orthoX + this.offset + 3 ? -this.orthoX + this.offset + 3 : startingPoint.x;
            startingPoint.y = startingPoint.y > this.orthoY - this.offset - 5 ? this.orthoY - this.offset - 5 : startingPoint.y;
        } 
        this.posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
        const posInsidea = this.tipA.position.subtract(this.posInside).scale(1).normalize();
        const posInsideb = this.tipB.position.subtract(this.posInside).scale(1).normalize();
        const posInsidec = this.tipC.position.subtract(this.posInside).scale(1).normalize();

        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh !== this.tipP) {
                let isCanSet = false;
                if (currentMesh === this.tipA) {
                    isCanSet = TriangleUtils.IsInTriangle(startingPoint.subtract(posInsidea),
                        this.tipB.position.subtract(posInsideb), this.tipC.position.subtract(posInsidec), this.tipP.position);
                } else if (currentMesh === this.tipB) {
                    isCanSet = TriangleUtils.IsInTriangle(this.tipA.position.subtract(posInsidea),
                        startingPoint.subtract(posInsideb), this.tipC.position.subtract(posInsidec), this.tipP.position);
                } else if (currentMesh === this.tipC) {
                    isCanSet = TriangleUtils.IsInTriangle(this.tipA.position.subtract(posInsidea),
                        this.tipB.position.subtract(posInsideb), startingPoint.subtract(posInsidec), this.tipP.position);
                }

                const posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
                currentMesh.position = isCanSet ?
                    startingPoint.subtract(posInside).length() < 3 ? currentMesh.position : startingPoint : currentMesh.position;
                const AB = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipA.position);
                const kab = -1 / AB.x; //AB边高的斜率
                const Bab = this.tipC.position.y - kab * this.tipC.position.x; //常数
                const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, new Vector2(kab, Bab));
                if (Vector3.Distance(this.tipC.position, posAB_CP) < 0.8) {
                    currentMesh.position = currentMesh.position.add(Vector3.Normalize(this.tipC.position.subtract(posAB_CP)).scale(0.8));
                }
            } else {
                const isCanSet = TriangleUtils.IsInTriangle(this.tipA.position.subtract(posInsidea),
                    this.tipB.position.subtract(posInsideb), this.tipC.position.subtract(posInsidec), startingPoint);
                currentMesh.position = isCanSet ? startingPoint : currentMesh.position;
            }
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const AP = BeelineUtils.GetLineSlopeAndConstant(this.tipP.position, this.tipA.position);
        const BC = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipC.position);
        const p_c = BeelineUtils.GetVerticalLine(AP, this.tipC.position);
        const h = BeelineUtils.GetLineFocusPoint(AP, p_c);
        const posAD_BC = BeelineUtils.GetLineFocusPoint(AP, BC);
        this.tipD.position = posAD_BC;
        this.arrowAD.position = this.tipD.position;
        this.arrowAD.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.tipD.position));
        this.updateLabelPos();
        this.updateMeshVertData(this.Lineh, Vector3Utils.ToArray([this.tipC.position, h]));
        this.tipH.position = h.add(this.tipC.position).scale(0.5);
        const ah = Vector3.Normalize(this.tipA.position.subtract(h)).scale(0.3);
        const ch = Vector3.Normalize(this.tipC.position.subtract(h)).scale(0.3);
        this.updateMeshVertData(this.LineAngh, Vector3Utils.ToArray([h.add(ah), h.add(ah).add(ch), h.add(ch)]));
        let vets = [this.tipP.position, this.tipD.position];
        const dotV = Vector3.Dot(this.tipD.position.subtract(this.tipA.position), h.subtract(this.tipA.position));
        if (dotV < 0) {
            this.updateMeshVertData(this.LinePH, Vector3Utils.ToMoreVector3ToArray([this.tipA.position, h], 20));
            this.LinePH.isVisible = true;
        } else {
            vets = Vector3.Distance(this.tipA.position, this.tipD.position) > Vector3.Distance(this.tipA.position, h) ?
                [this.tipP.position, this.tipD.position] : [this.tipP.position, h];
            this.LinePH.isVisible = false;
        }
        this.updateMeshVertData(this.LinePD, Vector3Utils.ToMoreVector3ToArray(vets, 20));
        this.updateMeshVertData(this.LineABC, Vector3Utils.ToArray(
            [this.tipA.position, this.tipB.position, this.tipC.position, this.tipA.position]));
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipA.position, this.tipP.position]));
        this.updateMeshVertData(this.LineBPC, Vector3Utils.ToArray([this.tipB.position, this.tipP.position, this.tipC.position]));

        this.tipS1.position = TriangleUtils.GetInsidePos(this.tipC.position, this.tipB.position, this.tipP.position);
        this.tipS2.position = TriangleUtils.GetInsidePos(this.tipC.position, this.tipA.position, this.tipP.position);
        this.tipS3.position = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipP.position);
    }

    /**
     * 答案步骤
     * @param i
     */
    Answer(i: number) {
        if (i === 1) {
            this.arrow.isVisible = false;
        } else if (i === 2) {
            this.arrow.isVisible = true;
        } else if (i === 3) {
            this.arrow.isVisible = true;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.Answer(1);
        this.updateLineData();
    }
}
