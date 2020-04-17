/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, TransformNode, Scene, Engine, AbstractMesh, Vector2 } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as dot from '../sub_static/dot.png';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';
import { AngleUtils } from '../../../../babylon/Math/AngleUtils';


import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    colorHexStringRed = '#F05467';
    colorHexStringBlack = '#020202';

    colorRed: Color3;
    colorBlack: Color3;

    //点A B C P D
    posA = new Vector3(0, -4, 0);
    tipAA: Mesh;
    tipA: Mesh;
    tiptextA: GUI.TextBlock;

    posC = new Vector3(3, 4, 0);
    tipC: Mesh;
    tiptextC: GUI.TextBlock;
    tipCC: Mesh;

    posB = new Vector3(-2, 4, 0);
    tipBB: Mesh;
    tipB: Mesh;
    tiptextB: GUI.TextBlock;

    tipP: Mesh;
    tiptextP: GUI.TextBlock;

    tipD: Mesh;
    tiptextD: GUI.TextBlock;
    posD = new Vector3(0, 2, 0);
    //线条BAC BC AD AP BDC
    LineBAC: LinesMesh;
    LineBC: LinesMesh;
    LineAD: LinesMesh;
    LineAP: LinesMesh;
    LineBDC: LinesMesh;

    // 箭头AP AB AC AD
    arrowAP: TransformNode;
    arrowAB: TransformNode;
    arrowAC: TransformNode;
    arrowAD: TransformNode;

    IsMoved = true;
    posInside: Vector3; //三角形内心坐标
    length = 12;
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    initColor() {
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlack = Color3.FromHexString(this.colorHexStringBlack);
    }

    initMesh(scene: Scene) {
        this.tipAA = new Mesh('a');
        this.tipCC = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipD = new Mesh('d');

        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.setMeshVisible([this.tipA, this.tipB, this.tipC, this.tipP], false);

        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
        this.arrowAP = new TransformNode('arrow');
        this.arrowAB = new TransformNode('arrow');
        this.arrowAC = new TransformNode('arrow');
        this.arrowAD = new TransformNode('arrow');
    }


    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initColor();
        this.initMesh(scene);

        const options = {
            height: 30, width: 30, color: this.colorHexStringBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: '30px', width: '30px', color: this.colorHexStringBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options2.width = options2.height = '60px';
            options.width = options.height = 60;
            options.fontSize = options2.fontSize = '48px';
        }
        this.tiptextA = LabelUtils.CreateLabel(advancedTexture, this.tipAA, 'A', options);
        this.tiptextB = LabelUtils.CreateLabel(advancedTexture, this.tipBB, 'B', options);
        this.tiptextC = LabelUtils.CreateLabel(advancedTexture, this.tipCC, 'C', options);
        this.tiptextD = LabelUtils.CreateLabel(advancedTexture, this.tipD, 'D', options);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 40, 0, options2);

        const lightmaterial = MaterialLab.CreateLightMaterial(this.colorBlack, scene);
        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        const arrow = Mesh.CreateCylinder('arrowA', 0.5, 0, 0.5, 4, 1, scene);
        arrow.rotation = new Vector3(0, 0, -Math.PI / 2);
        arrow.material = lightmaterialA;
        arrow.isPickable = false;
        arrow.position = new Vector3(-0.2, 0, 0);

        const arrowAB = arrow.clone('ab', this.arrowAB);
        arrowAB.material = lightmaterial;
        const arrowAC = arrow.clone('ab', this.arrowAC);
        arrowAC.material = lightmaterial;
        const arrowAD = arrow.clone('ab', this.arrowAD);
        arrowAD.material = lightmaterial;
        arrow.setParent(this.arrowAP);

        this.LineBAC = LinesBuild.CreateUpdateLines([this.posB, this.posA, this.posC],
            this.colorBlack, this.edgesWidth, this.LineBAC, scene);
        this.LineAD = LinesBuild.CreateUpdateLines([this.posA, this.posD], this.colorBlack, this.edgesWidth, this.LineAD, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.posA, this.posD], this.colorRed, this.edgesWidth, this.LineAP, scene);
        const LineBCPos = Vector3Utils.ToMoreVector3([this.posB, this.posC], 20);
        this.LineBC = LinesBuild.CreateUpdateDashedLines(LineBCPos, this.colorRed, this.edgesWidth, this.LineBC, scene);
        this.LineBC.isVisible = false;
        const LineBDCPos = Vector3Utils.ToMoreVector3([this.posC, this.posD, this.posB], 10);
        this.LineBDC = LinesBuild.CreateUpdateDashedLines(LineBDCPos, this.colorRed, this.edgesWidth, this.LineBDC, scene);

        LabelUtils.CreateDot(advancedTexture, this.tipA, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipB, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipC, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipP, dot, ImageLabelOption);
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
        this.initValue(scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        startingPoint.x = startingPoint.x < -this.orthoX + this.offset + 2 ? -this.orthoX + this.offset + 2 : startingPoint.x;
        startingPoint.y = startingPoint.y > this.orthoY - this.offset - 2 ? this.orthoY - this.offset - 2 : startingPoint.y;

        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh !== this.tipP) {
                const posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
                startingPoint = startingPoint.subtract(posInside).length() < 2 ? currentMesh.position : startingPoint;
            }

            if (currentMesh === this.tipC) {
                const AB = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipA.position);
                const p_c = BeelineUtils.GetVerticalLine(AB, this.tipC.position);
                const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, p_c);
                currentMesh.position = Vector3.Distance(startingPoint, posAB_CP) < 0.6 ? currentMesh.position : startingPoint;
            } else if (currentMesh === this.tipB) {
                const AC = BeelineUtils.GetLineSlopeAndConstant(this.tipC.position, this.tipA.position);
                const p_b = BeelineUtils.GetVerticalLine(AC, this.tipB.position);
                const posAC_BP = BeelineUtils.GetLineFocusPoint(AC, p_b);
                currentMesh.position = Vector3.Distance(startingPoint, posAC_BP) < 0.6 ? currentMesh.position : startingPoint;
            } else if (currentMesh === this.tipA) {
                const BC = BeelineUtils.GetLineSlopeAndConstant(this.tipC.position, this.tipB.position);
                const p_a = BeelineUtils.GetVerticalLine(BC, this.tipA.position);
                const posBC_AP = BeelineUtils.GetLineFocusPoint(BC, p_a);
                currentMesh.position = Vector3.Distance(startingPoint, posBC_AP) < 0.6 ? currentMesh.position : startingPoint;
            }
            this.updateLineData(startingPoint, currentMesh);
        }
    }

    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        this.updateLabelPos();

        const ca = this.tipC.position.subtract(this.tipA.position);
        this.posD = this.tipB.position.add(ca);
        const da = this.tipA.position.subtract(this.posD).scale(1).normalize();
        this.tipD.position = this.posD.subtract(da);
        const v = BeelineUtils.GetLineSlopeAndConstant(this.posD, this.tipA.position);

        if (currentMesh !== null) {
            if (currentMesh === this.tipP) {
                if (Math.abs(da.x) > Math.abs(da.y)) {
                    this.tipP.position.x = startingPoint.x;
                    this.tipP.position.y = v.x * this.tipP.position.x + v.y;
                } else {
                    this.tipP.position.y = startingPoint.y;
                    if (v.x === Infinity) {
                        this.tipP.position.x = v.y;
                    } else {
                        this.tipP.position.x = (this.tipP.position.y - v.y) / v.x;
                    }
                }
            } else {
                const dis = Vector3.Distance(this.tipP.position, this.tipA.position);
                this.tipP.position = this.tipA.position.subtract(da.scale(dis > 20 ? 20 : dis));
            }
        } else {
            if (v.x === Infinity) {
                this.tipP.position.x = v.y;
            } else {
                this.tipP.position.y = v.x * this.tipP.position.x + v.y;
            }
        }

        this.arrowAP.position = this.tipP.position;
        this.arrowAP.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.tipP.position));

        this.arrowAB.position = this.tipB.position;
        this.arrowAB.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.tipB.position));

        this.arrowAC.position = this.tipC.position;
        this.arrowAC.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.tipC.position));

        this.arrowAD.position = this.posD;
        this.arrowAD.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.posD));
        this.updateVerticesData();
    }

    /**
     * 更新线条实体
     */
    updateVerticesData() {
        this.updateMeshVertData(this.LineBAC, Vector3Utils.ToArray([this.tipB.position, this.tipA.position, this.tipC.position]));
        this.updateMeshVertData(this.LineAD, Vector3Utils.ToArray([this.tipA.position, this.posD]));
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipA.position, this.tipP.position]));
        this.updateMeshVertData(this.LineBC, Vector3Utils.ToMoreVector3ToArray([this.tipB.position, this.tipC.position], 20));
        this.updateMeshVertData(this.LineBDC, Vector3Utils.ToMoreVector3ToArray([this.tipB.position, this.posD, this.tipC.position], 10));
    }

    /**
      * 更新ABC标签位置
      */
    updateLabelPos() {
        this.posInside = TriangleUtils.GetInsidePos(this.tipA.position, this.tipB.position, this.tipC.position);
        const posInsidea = this.tipA.position.subtract(this.posInside).scale(1).normalize();
        const posInsideb = this.tipB.position.subtract(this.posInside).scale(1).normalize();
        const posInsidec = this.tipC.position.subtract(this.posInside).scale(1).normalize();
        this.tipAA.position = this.tipA.position.add(posInsidea);
        this.tipBB.position = this.tipB.position.add(posInsideb);
        this.tipCC.position = this.tipC.position.add(posInsidec);
    }

    Answer(i: number) {
        if (i === 1) {
            this.IsMoved = true;
            this.LineBC.isVisible = false;
        } else if (i === 2) {
            this.IsMoved = false;
            this.updateLineData(null, null);
            this.LineBC.isVisible = true;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipP.position.x = 0.5;
        this.updateLineData(null, null);
    }
}
