/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, Vector2, Engine, AbstractMesh, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexRed = '#F05467';
    hexBlack = '#020202';
    hexOrange = '#F5BB46';
    colorRed: Color3;
    colorBlack: Color3;
    colorOrange: Color3;

    // 点A B C P信息
    posA = new Vector3(0, -4, 0);
    tipAA: Mesh;
    tipA: Mesh;
    tiptextA: GUI.TextBlock;

    posC = new Vector3(3, 4, 0);
    tipC: Mesh;
    tiptextC: GUI.TextBlock;
    tipCC: Mesh;

    posB = new Vector3(-2, 3, 0);
    tipBB: Mesh;
    tipB: Mesh;
    tiptextB: GUI.TextBlock;

    posP = new Vector3(0, 0, 0);
    tipP: Mesh;
    tiptextP: GUI.TextBlock;

    IsMoved = true; //是否可以移动p

    LineABC: LinesMesh; //线段ABC
    LineAPC: LinesMesh; //线段APC
    //PA PB PC高
    LineHPA: LinesMesh;
    LineHPB: LinesMesh;
    LineHPC: LinesMesh;
    //AC AB BC高的直角
    LineGAC: LinesMesh;
    LineGAB: LinesMesh;
    LineGBC: LinesMesh;

    LineGoHPA: LinesMesh;
    LineGoHPB: LinesMesh;
    LineGoHPC: LinesMesh;

    // 直角定位点  AB_CP AC_BP BC_AP
    posAB_CP = new Vector3(0, 0, 0);
    posAC_BP = new Vector3(0, 0, 0);
    posBC_AP = new Vector3(0, 0, 0);
    gHeight = 0.5;
    ImageO: GUI.Image;
    posInside: Vector3; //三角形内心坐标
    length = 15;

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
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlack = Color3.FromHexString(this.hexBlack);
        this.colorOrange = Color3.FromHexString(this.hexOrange);
    }

    /**
     * 初始化网格数据
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipAA = new Mesh('a');
        this.tipCC = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.setMeshVisible([this.tipA, this.tipB, this.tipC, this.tipP], false);
        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
        this.tipP.position = this.posP;
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
            height: 30, width: 30, color: this.hexBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: '30px', width: '30px', color: this.hexBlack,
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
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 40, 0, options2);

        this.LineABC = LinesBuild.CreateUpdateLines([this.posA, this.posB, this.posC, this.posA],
            this.colorBlack, this.edgesWidth, this.LineABC, scene);

        this.LineGAC = LinesBuild.CreateUpdateLines([this.posA, Vector3.Zero(), this.posC],
            this.colorOrange, this.edgesWidth, this.LineGAC, scene);
        this.LineGAB = LinesBuild.CreateUpdateLines([this.posA, Vector3.Zero(), this.posB],
            this.colorOrange, this.edgesWidth, this.LineGAB, scene);
        this.LineGBC = LinesBuild.CreateUpdateLines([this.posB, Vector3.Zero(), this.posC],
            this.colorOrange, this.edgesWidth, this.LineGBC, scene);

        this.LineAPC = LinesBuild.CreateUpdateLines([this.posB, this.posB, this.posC],
            this.colorBlack, this.edgesWidth, this.LineAPC, scene);

        this.LineHPA = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorRed, this.edgesWidth, this.LineHPA, scene);
        this.LineHPB = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorRed, this.edgesWidth, this.LineHPB, scene);
        this.LineHPC = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorRed, this.edgesWidth, this.LineHPC, scene);

        this.LineGoHPA = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorBlack, this.edgesWidth, this.LineGoHPA, scene);
        this.LineGoHPB = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorBlack, this.edgesWidth, this.LineGoHPB, scene);
        this.LineGoHPC = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.posA, this.posB], 20), this.colorBlack, this.edgesWidth, this.LineGoHPC, scene);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);
        this.ImageO = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
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
        const v = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipA.position);
        const v1 = BeelineUtils.GetLineSlopeAndConstant(this.tipA.position, this.tipC.position);
        const v2 = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipC.position);

        const pc = BeelineUtils.GetVerticalLine(v, this.tipC.position);
        const pb = BeelineUtils.GetVerticalLine(v1, this.tipB.position);
        const pa = BeelineUtils.GetVerticalLine(v2, this.tipA.position);

        this.posP = BeelineUtils.GetLineFocusPoint(pc, pb);
        this.posAB_CP = BeelineUtils.GetLineFocusPoint(v, pc);
        this.posAC_BP = BeelineUtils.GetLineFocusPoint(v1, pb);
        this.posBC_AP = BeelineUtils.GetLineFocusPoint(v2, pa);

        if (this.IsMoved === false) {
            this.tipP.position = this.posP; //设置为垂心
        } else {
            if (currentMesh === this.tipP) {
                if (pb.x === 0) {
                    this.tipP.position.x = startingPoint.x;
                    this.tipP.position.y = pb.x * this.tipP.position.x + pb.y;
                } else if (pb.x === Infinity || pb.x === -Infinity) {
                    this.tipP.position.y = startingPoint.y;
                    this.tipP.position.x = pb.y;
                } else {
                    this.tipP.position.x = startingPoint.x;
                    this.tipP.position.y = pb.x * this.tipP.position.x + pb.y;
                }
            } else {
                this.tipP.position = this.posAC_BP.add(this.tipB.position).scale(0.5);
            }
        }
        this.updateVerticesData();
    }

    /**
     * 更新线条实体
     */
    updateVerticesData() {
        const Pa = this.posBC_AP.add(this.posP.scale(-1)).scale(1).normalize();
        const Pb = this.posAC_BP.add(this.posP.scale(-1)).scale(1).normalize();
        const Pc = this.posAB_CP.add(this.posP.scale(-1)).scale(1).normalize();

        const ab = this.posAB_CP.add(this.tipB.position.scale(-1)).scale(1).normalize();
        const bc = this.posBC_AP.add(this.tipC.position.scale(-1)).scale(1).normalize();
        const ac = this.posAC_BP.add(this.tipA.position.scale(-1)).scale(1).normalize();
        //-------------更新三边--------------
        this.updateMeshVertData(this.LineABC,
            Vector3Utils.ToArray([this.tipA.position, this.tipB.position, this.tipC.position, this.tipA.position]));
        //-------------更新三边高直角--------------

        this.updateMeshVertData(this.LineGAC, Vector3Utils.ToArray(
            [this.posAC_BP.add(ac.scale(-this.gHeight)),
            this.posAC_BP.add(ac.scale(-this.gHeight)).add(Pb.scale(-this.gHeight)),
            this.posAC_BP.add(Pb.scale(-this.gHeight))]));

        this.updateMeshVertData(this.LineGAB, Vector3Utils.ToArray(
            [this.posAB_CP.add(ab.scale(-this.gHeight)),
            this.posAB_CP.add(ab.scale(-this.gHeight)).add(Pc.scale(-this.gHeight)),
            this.posAB_CP.add(Pc.scale(-this.gHeight))]));

        this.updateMeshVertData(this.LineGBC, Vector3Utils.ToArray(
            [this.posBC_AP.add(bc.scale(-this.gHeight)),
            this.posBC_AP.add(bc.scale(-this.gHeight)).add(Pa.scale(-this.gHeight)),
            this.posBC_AP.add(Pa.scale(-this.gHeight))]));

        //--------------更新PA\PC-------------
        this.updateMeshVertData(this.LineAPC, Vector3Utils.ToArray(
            [this.tipC.position, this.tipP.position, this.tipA.position]));
        //-------------更新三边的高--------------
        const vec_pa = TriangleUtils.getVecOut(this.tipA.position, this.posP, this.posBC_AP, 5);
        this.updateMeshVertData(this.LineHPA, Vector3Utils.ToMoreVector3ToArray(vec_pa, 20));
        const vec_pb = TriangleUtils.getVecOut(this.tipB.position, this.tipP.position, this.posAC_BP, 5);
        this.updateMeshVertData(this.LineHPB, Vector3Utils.ToMoreVector3ToArray(vec_pb, 20));
        const vec_pc = TriangleUtils.getVecOut(this.tipC.position, this.posP, this.posAB_CP, 5);
        this.updateMeshVertData(this.LineHPC, Vector3Utils.ToMoreVector3ToArray(vec_pc, 20));

        const vec_Gopa = TriangleUtils.getVecOut(this.tipB.position, this.tipC.position, this.posBC_AP, 0);
        this.updateMeshVertData(this.LineGoHPA, Vector3Utils.ToMoreVector3ToArray(vec_Gopa, 20));
        const vec_Gopb = TriangleUtils.getVecOut(this.tipA.position, this.tipC.position, this.posAC_BP, 0);
        this.updateMeshVertData(this.LineGoHPB, Vector3Utils.ToMoreVector3ToArray(vec_Gopb, 20));
        const vec_Gopc = TriangleUtils.getVecOut(this.tipA.position, this.tipB.position, this.posAB_CP, 0);
        this.updateMeshVertData(this.LineGoHPC, Vector3Utils.ToMoreVector3ToArray(vec_Gopc, 20));
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



    /**
     * 解析步骤
     * @param i 
     */
    Answer(i: number) {
        if (i === 1) {
            this.IsMoved = true;
            this.setMeshVisible([this.LineGAB, this.LineGBC, this.LineHPA, this.LineHPC, this.LineGoHPA, this.LineGoHPC], false);
            this.LineAPC.isVisible = true;
            this.ImageO.source = dot;
        } else if (i === 2) {
            this.IsMoved = false;
            this.updateLineData(null, null);
            this.setMeshVisible([this.LineGAB, this.LineGBC, this.LineHPA, this.LineHPC, this.LineGoHPA, this.LineGoHPC], true);
            this.LineAPC.isVisible = false;
            this.ImageO.source = dot2;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.viewModel.buttonActived = false;
        this.Answer(1);
        this.updateLineData(null, null);
    }
}
