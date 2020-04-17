/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, Vector2, LinesMesh, Mesh, AbstractMesh, Engine, Scene } from '@babylonjs/core/Legacy/legacy';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    colorHexStringRed = '#F05467';
    colorHexStringBlack = '#020202';
    colorHexStringOrange = '#F5BB46';
    colorRed: Color3;
    colorBlack: Color3;
    colorOrange: Color3;

    tipHalfSize = 0.75;
    //点A B C P
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

    posP = new Vector3(0, 0, 0);
    tipP: Mesh;
    tiptextP: GUI.TextBlock;
    //线条ABC AC直角 AB直角 BC直角 PA PB PC  AC高 AB高 BC高
    LineABC: LinesMesh;
    LineGAC: LinesMesh;
    LineGAB: LinesMesh;
    LineGBC: LinesMesh;

    LinePA: LinesMesh;
    LinePB: LinesMesh;
    LinePC: LinesMesh;

    LineHPA: LinesMesh;
    LineHPB: LinesMesh;
    LineHPC: LinesMesh;

    ImageO: GUI.Image; //P点提示
    Gheight = -0.5;
    posInside: Vector3; //三角形内心坐标
    IsMoved = true;
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

    /**
     * 初始化颜色 
     */
    initColor() {
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlack = Color3.FromHexString(this.colorHexStringBlack);
        this.colorOrange = Color3.FromHexString(this.colorHexStringOrange);
    }

    /**
     * 初始化网格
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
        this.setMeshVisible([this.tipP, this.tipA, this.tipB, this.tipC], false);
        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
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
            height: 30, width: 30, color: this.colorHexStringBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: '30px', width: '30px', color: this.colorHexStringBlack,
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

        this.tiptextA = LabelUtils.CreateLabel(advancedTexture, this.tipAA, 'A', options);
        this.tiptextB = LabelUtils.CreateLabel(advancedTexture, this.tipBB, 'B', options);
        this.tiptextC = LabelUtils.CreateLabel(advancedTexture, this.tipCC, 'C', options);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'O', 40, 0, options2);

        LabelUtils.CreateDot(advancedTexture, this.tipA, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipB, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipC, dot, ImageLabelOption);
        this.ImageO = LabelUtils.CreateDot(advancedTexture, this.tipP, dot, ImageLabelOption);

        this.LineABC = LinesBuild.CreateUpdateLines([this.posA, this.posB, this.posC, this.posA],
            this.colorBlack, this.edgesWidth, this.LineABC, scene);
        this.LineGAC = LinesBuild.CreateUpdateLines([this.posA, Vector3.Zero(), this.posC],
            this.colorOrange, this.edgesWidth, this.LineGAC, scene);
        this.LineGAB = LinesBuild.CreateUpdateLines([this.posA, Vector3.Zero(), this.posB],
            this.colorOrange, this.edgesWidth, this.LineGAB, scene);
        this.LineGBC = LinesBuild.CreateUpdateLines([this.posB, Vector3.Zero(), this.posC],
            this.colorOrange, this.edgesWidth, this.LineGBC, scene);
        this.setMeshVisible([this.LineGAC, this.LineGBC], false);
        this.LinePA = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorBlack, this.edgesWidth, this.LinePA, scene);
        this.LinePB = LinesBuild.CreateUpdateLines([this.posA, this.posB], this.colorBlack, this.edgesWidth, this.LinePB, scene);
        this.LinePC = LinesBuild.CreateUpdateLines([this.posB, this.posC], this.colorBlack, this.edgesWidth, this.LinePC, scene);

        this.LineHPA = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([this.posA, this.posB], 20),
            this.colorRed, this.edgesWidth, this.LineHPA, scene);
        this.LineHPB = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([this.posA, this.posB], 20),
            this.colorRed, this.edgesWidth, this.LineHPB, scene);
        this.LineHPC = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([this.posA, this.posB], 20),
            this.colorRed, this.edgesWidth, this.LineHPC, scene);
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
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        const posA = this.tipA.position;
        const posB = this.tipB.position;
        const posC = this.tipC.position;
        this.updateLabelPos();
        const ca = Vector3.Normalize(posC.subtract(posA));
        const ba = Vector3.Normalize(posB.subtract(posA));
        const bc = Vector3.Normalize(posB.subtract(posC));

        const dotab = posA.add(posB).scale(0.5);
        const dotac = posA.add(posC).scale(0.5);
        const dotbc = posC.add(posB).scale(0.5);
        const v = BeelineUtils.GetLineSlopeAndConstant(posB, posA);
        const v1 = BeelineUtils.GetLineSlopeAndConstant(posC, posA);
        const pb = BeelineUtils.GetVerticalLine(v, dotab);
        const pc = BeelineUtils.GetVerticalLine(v1, dotac);
        this.posP = BeelineUtils.GetLineFocusPoint(pc, pb);
        const Pab = Vector3.Normalize(dotab.subtract(this.posP));
        const Pac = Vector3.Normalize(dotac.subtract(this.posP));
        const Pbc = Vector3.Normalize(dotbc.subtract(this.posP));

        if (this.IsMoved === false) {
            this.tipP.position = this.posP; //设置为垂心
        } else {
            if (currentMesh === this.tipP) {
                if (pb.x > -1 && pb.x < 1) {
                    this.tipP.position.x = startingPoint.x;
                    this.tipP.position.y = pb.x * this.tipP.position.x + pb.y;
                } else {
                    this.tipP.position.y = startingPoint.y;
                    if (pb.x === Infinity) {
                        this.tipP.position.x = pb.y;
                    } else {
                        this.tipP.position.x = (this.tipP.position.y - pb.y) / pb.x;
                    }
                }
            } else {
                const da = dotab.subtract(this.posP).scale(1).normalize();
                const dis = Vector3.Distance(this.posP, dotab);
                this.tipP.position = dotab.subtract(da.scale(dis > 5 ? 5 : dis));
            }
        }

        const posP = this.tipP.position;
        this.updateMeshVertData(this.LineGAC, Vector3Utils.ToArray([dotac.add(Pac.scale(this.Gheight)),
        dotac.add(Pac.scale(this.Gheight)).add(ca.scale(this.Gheight)), dotac.add(ca.scale(this.Gheight))]));

        this.updateMeshVertData(this.LineGAB, Vector3Utils.ToArray([dotab.add(Pab.scale(this.Gheight)),
        dotab.add(Pab.scale(this.Gheight)).add(ba.scale(this.Gheight)), dotab.add(ba.scale(this.Gheight))]));

        this.updateMeshVertData(this.LineGBC, Vector3Utils.ToArray([dotbc.add(Pbc.scale(this.Gheight)),
        dotbc.add(Pbc.scale(this.Gheight)).add(bc.scale(this.Gheight)), dotbc.add(bc.scale(this.Gheight))]));

        this.updateMeshVertData(this.LineABC, Vector3Utils.ToArray([posA, posB, posC, posA]));
        //-------------更新三边高直角--------------
        this.updateMeshVertData(this.LinePA, Vector3Utils.ToArray([posP, posA]));
        this.updateMeshVertData(this.LinePB, Vector3Utils.ToArray([posP, posB]));
        this.updateMeshVertData(this.LinePC, Vector3Utils.ToArray([posC, posP]));

        this.updateMeshVertData(this.LineHPA, Vector3Utils.ToMoreVector3ToArray(TriangleUtils.getVecBtw(posP, dotab, 15), 20));
        this.updateMeshVertData(this.LineHPB, Vector3Utils.ToMoreVector3ToArray(TriangleUtils.getVecBtw(posP, dotac, 15), 20));
        this.updateMeshVertData(this.LineHPC, Vector3Utils.ToMoreVector3ToArray(TriangleUtils.getVecBtw(posP, dotbc, 15), 20));
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
     * 答案步骤
     * @param i 
     */
    Answer(i: number) {
        if (i === 1) {
            this.IsMoved = true;
            this.setMeshVisible([this.LineGAC, this.LineGBC, this.LinePC, this.LineHPB, this.LineHPC], false);
            this.ImageO.source = `${dot}`;
            this.ImageO.hoverCursor = 'pointer';
            this.ImageO.isPointerBlocker = true;
        } else if (i === 2) {
            this.IsMoved = false;
            this.updateLineData(null, null);
            this.setMeshVisible([this.LineGAC, this.LineGBC, this.LinePC, this.LineHPB, this.LineHPC], true);
            this.ImageO.source = `${dot2}`;
            this.ImageO.hoverCursor = '';
            this.ImageO.isPointerBlocker = false;
        }
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.viewModel.buttonActived = false;
        this.Answer(1);
        this.updateLineData(null, null);
    }
}
