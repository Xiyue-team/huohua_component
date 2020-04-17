/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, LinesMesh, Mesh, TransformNode, Scene, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';

import * as e1 from '../sub_static/e1.png';
import * as e2 from '../sub_static/e2.png';
import * as dot from '../sub_static/dot.png';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';
import {AngleUtils} from '../../../../babylon/Math/AngleUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    colorHexStringRed = '#F05467';
    colorHexStringBlack = '#020202';
    colorHexStringBlue = '#0091FF';

    colorRed: Color3;
    colorBlack: Color3;
    colorBlue: Color3;

    //点A B C P D
    posA = new Vector3(-1, -4, 0);
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

    tipD: Mesh;
    tiptextD: GUI.TextBlock;

    posP = new Vector3(0, 0, 0);
    tipP: Mesh;
    tiptextP: GUI.TextBlock;

    //线条ABC E1E2 E1PE2 AD AP
    LineABC: LinesMesh;
    LineE1E2: LinesMesh;
    LineEP12: LinesMesh;
    LineAD: LinesMesh;
    LineAP: LinesMesh;

    textE1: GUI.Image;
    textE2: GUI.Image;
    tipE1: Mesh;
    tipE2: Mesh;
    // 箭头AP AB AC AD E1 E2
    arrowAD: TransformNode;
    arrowAP: TransformNode;
    arrowAB: TransformNode;
    arrowAC: TransformNode;
    arrowE1: TransformNode;
    arrowE2: TransformNode;
    // 箭头AP AD Mesh
    arrowD: Mesh;
    arrowP: Mesh;
    
    imageP: GUI.Image; //P点提示
    normalizeLength = 4;
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

    /**
     * 初始化颜色 
     */
    initColor() {
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlack = Color3.FromHexString(this.colorHexStringBlack);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
    }
    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipAA = new Mesh('a');
        this.tipCC = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipE1 = new Mesh('a');
        this.tipE2 = new Mesh('a');
        this.tipD = new Mesh('a');
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);

        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);

        this.setMeshVisible([this.tipP, this.tipA, this.tipB, this.tipC], false);
        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;

        this.arrowAD = new TransformNode('arrow');
        this.arrowAP = new TransformNode('arrow');
        this.arrowAB = new TransformNode('arrow');
        this.arrowAC = new TransformNode('arrow');
        this.arrowE1 = new TransformNode('arrow');
        this.arrowE2 = new TransformNode('arrow');

        const lightmaterial = MaterialLab.CreateLightMaterial(this.colorBlack, scene);
        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        this.arrowD = Mesh.CreateCylinder('arrowA', 0.5, 0, 0.5, 4, 1, scene);
        this.arrowD.rotation = new Vector3(0, 0, -Math.PI / 2);
        this.arrowD.position = new Vector3(-0.2, 0, 0);
        this.arrowD.material = lightmaterial;
        this.arrowD.isPickable = false;

        this.arrowD.clone('ab', this.arrowAB);
        this.arrowD.clone('ab', this.arrowAC);
        const arrowE1 = this.arrowD.clone('ab', this.arrowE1);
        const arrowE2 = this.arrowD.clone('ab', this.arrowE2);
        this.arrowP = this.arrowD.clone('ab', this.arrowAP);
        arrowE1.material = arrowE2.material = this.arrowP.material = this.arrowD.material = lightmaterialA;
        this.arrowD.setParent(this.arrowAD);
        this.arrowD.isVisible = false;
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
        this.textE1 = LabelUtils.CreateImageLabel(advancedTexture, this.tipE1, `${e1}`, ImageLabelOptions);
        this.textE2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipE2, `${e2}`, ImageLabelOptions);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 40, 0, options2);
        this.tiptextD = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipD, 'D', 40, 0, options2);

        this.LineABC = LinesBuild.CreateUpdateLines([this.posA, this.posB, this.posC, this.posA],
            this.colorBlack, this.edgesWidth, this.LineABC, scene);
        this.LineE1E2 = LinesBuild.CreateUpdateLines([this.posA, this.posC, this.posB],
            this.colorRed, this.edgesWidth, this.LineE1E2, scene);
        this.LineEP12 = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([this.posA, this.posB, this.posB], 10),
            this.colorRed, this.edgesWidth, this.LineEP12, scene);
        this.LineAD = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorRed, this.edgesWidth, this.LineAD, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorRed, this.edgesWidth, this.LineAP, scene);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);
        this.imageP = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
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
        this.tipAA.position = this.tipA.position.add(posInsidea);
        this.tipBB.position = this.tipB.position.add(posInsideb);
        this.tipCC.position = this.tipC.position.add(posInsidec);
    }
    
    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        this.updateLabelPos();
        const ca = this.tipC.position.subtract(this.tipA.position).scale(1).normalize();
        const ba = this.tipB.position.subtract(this.tipA.position).scale(1).normalize();

        const dotab = this.tipA.position.add(ba.scale(this.normalizeLength));
        const dotac = this.tipA.position.add(ca.scale(this.normalizeLength));

        const hdotab = this.tipA.position.add(ba.scale(this.normalizeLength / 2));
        const hdotac = this.tipA.position.add(ca.scale(this.normalizeLength / 2));

        const posInsidee1 = hdotab.subtract(this.posInside).scale(1).normalize();
        const posInsidee2 = hdotac.subtract(this.posInside).scale(1).normalize();
        this.tipE1.position = hdotab.add(posInsidee1);
        this.tipE2.position = hdotac.add(posInsidee2);

        this.tipD.position = dotab.add(ca.scale(this.normalizeLength));
        const da = this.tipA.position.subtract(this.tipD.position).scale(1).normalize();
        this.arrowAD.position = this.tipD.position;
        this.arrowAD.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipA.position, this.tipD.position));
        const v = BeelineUtils.GetLineSlopeAndConstant(this.tipD.position, this.tipA.position);
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

        const vectorB = AngleUtils.GetVectorRadian(this.tipA.position, this.tipB.position),
            vectorC = AngleUtils.GetVectorRadian(this.tipA.position, this.tipC.position);
        this.arrowAB.position = this.tipB.position;
        this.arrowAB.rotation = new Vector3(0, 0, vectorB);

        this.arrowAC.position = this.tipC.position;
        this.arrowAC.rotation = new Vector3(0, 0, vectorC);

        this.arrowE1.position = dotab;
        this.arrowE1.rotation = new Vector3(0, 0, vectorB);

        this.arrowE2.position = dotac;
        this.arrowE2.rotation = new Vector3(0, 0, vectorC);

        this.updateVerticesData(dotac, dotab);
    }

    /**
     * 更新线条实体
     */
    updateVerticesData(dotac: Vector3, dotab: Vector3) {
        this.updateMeshVertData(this.LineABC,
            Vector3Utils.ToArray([this.tipA.position, this.tipB.position, this.tipC.position, this.tipA.position]));
        this.updateMeshVertData(this.LineE1E2, Vector3Utils.ToArray([dotac, this.tipA.position, dotab]));
        this.updateMeshVertData(this.LineEP12, Vector3Utils.ToMoreVector3ToArray([dotac, this.tipD.position, dotab], 10));
        this.updateMeshVertData(this.LineAD, Vector3Utils.ToArray([this.tipA.position, this.tipD.position]));
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipA.position, this.tipP.position]));
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
            this.setGUIVisible([this.tiptextD, this.tiptextP, this.imageP], false);
            this.setMeshVisible([this.arrowD, this.arrowP, this.LineEP12, this.LineAD, this.LineAP], false);
        } else if (i === 2) {
            this.setGUIVisible([this.tiptextD, this.tiptextP, this.imageP], true);
            this.setMeshVisible([this.arrowD, this.arrowP, this.LineEP12, this.LineAD, this.LineAP], true);
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
