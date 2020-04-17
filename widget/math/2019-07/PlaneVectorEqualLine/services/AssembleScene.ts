/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/5 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector2, Vector3, LinesMesh, Mesh,
    TransformNode, Scene, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';
import { AngleUtils } from '../../../../babylon/Math/AngleUtils';
import { TriangleUtils } from '../../../../babylon/Math/utils/TriangleUtils';

import * as dot from '../sub_static/dot.png';
import prove1 from '../sub_static/prove1.png';
import prove2 from '../sub_static/prove2.png';
import prove3 from '../sub_static/prove3.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //edges width

    colorHexStringBlue = '#6ECFFF'; // Hex String Blue
    colorHexStringRed = '#F05467'; // Hex String Red
    colorHexStringYellow = '#FFD621'; // Hex String Yellow 
    colorHexStringGreen = '#9BF23B'; // Hex String Green
    colorBlue: Color3; // Blue
    colorRed: Color3; // Red
    colorYellow: Color3; // Yellow
    colorGreen: Color3; // Green

    posO = new Vector3(0, 0, 0); // point O position
    tipO: Mesh; // point O Mesh
    tiptextO: GUI.TextBlock; // point O TextBlock

    posA = new Vector3(3, 4, 0); // point A position
    tipA: Mesh; // point A Mesh
    tiptextA: GUI.TextBlock; // point A TextBlock

    posB = new Vector3(-2, 3, 0); // point B position
    tipB: Mesh; // point B Mesh
    tiptextB: GUI.TextBlock; // point B TextBlock

    posC = new Vector3(0, 0, 0); // point C position
    tipC: Mesh; // point C Mesh
    tiptextC: GUI.TextBlock; // point C TextBlock

    posP = new Vector3(1, 6, 0); // point P position
    tipP: Mesh; // point P Mesh
    tiptextP: GUI.TextBlock; // point P TextBlock

    LineAOB: LinesMesh; // Line AOB
    LineA2OB2: LinesMesh; // Line A'OB'
    LineA2OB2Dashed: LinesMesh; // DashedLine A'OB'
    LineA2OB2Dashed2: LinesMesh; // DashedLine A'OB'
    LineEP12: LinesMesh; // Line AOB
    LineEP122: LinesMesh; // Line AOB
    LineOD: LinesMesh; // Line OD
    LineOP: LinesMesh; // Line OP
    LineOPDashed: LinesMesh; // Line OP
    LineABC: LinesMesh; // Line ABC
    LineAPB: LinesMesh; // Line APB
    LineAPBDashed: LinesMesh; // DashedLine APB

    DashedA: LinesMesh; // DashedLine APB
    DashedB: LinesMesh; // DashedLine APB

    textB1: GUI.TextBlock; // point B' TextBlock
    textA1: GUI.TextBlock; // point A' TextBlock

    arrowOD: TransformNode; // Node of Arrow OD
    arrowOP: TransformNode; // Node of Arrow OP
    arrowOB: TransformNode; // Node of Arrow OB
    arrowOA: TransformNode; // Node of Arrow OA

    TipImage: Mesh;
    arrowB1: Mesh; // Mesh of Arrow B'
    arrowA1: Mesh; // Mesh of Arrow A'
    arrowD: Mesh; // Mesh of Arrow D
    arrowP: Mesh; // Mesh of Arrow P
    imageP: GUI.Image;

    posPOA: Vector3;
    posPOB: Vector3;

    posABCLeft: Vector3; //vector for line AB left border
    posABCRight: Vector3; //vector for line AB right border
    posAPBLeft: Vector3; //vector for line A'B' left border
    posAPBRight: Vector3; //vector for line A'B' right border

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /** 
     * 窗口尺寸重置 
     */
    resize(): void {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化颜色 
     */
    initColor() {
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
        this.colorYellow = Color3.FromHexString(this.colorHexStringYellow);
        this.colorGreen = Color3.FromHexString(this.colorHexStringGreen);
    }

    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipO = new Mesh('a');
        this.tipA = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipC = new Mesh('c');
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.setMeshVisible([this.tipP, this.tipA, this.tipB], false);
        this.tipO.position = this.posO;
        this.tipB.position = this.posB;
        this.tipA.position = this.posA;
        this.tipP.position = this.posP;

        this.TipImage = new Mesh('a');
        this.TipImage.position = new Vector3(2, -14, 0);
        this.arrowOD = new TransformNode('arrow');
        this.arrowOP = new TransformNode('arrow');
        this.arrowOB = new TransformNode('arrow');
        this.arrowOA = new TransformNode('arrow');
        this.arrowB1 = new Mesh('arrow');
        this.arrowA1 = new Mesh('arrow');

        const lightmaterial = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        this.arrowD = Mesh.CreateCylinder('arrowA', 0.5, 0, 0.5, 4, 1, scene);
        this.arrowD.rotation = new Vector3(0, 0, -Math.PI / 2);
        this.arrowD.position = new Vector3(-0.2, 0, 0);
        this.arrowD.material = lightmaterial;
        this.arrowD.isPickable = false;

        this.arrowD.clone('ab', this.arrowOB);
        this.arrowD.clone('ab', this.arrowOA);
        const arrowE1 = this.arrowD.clone('ab', this.arrowB1);
        const arrowE2 = this.arrowD.clone('ab', this.arrowA1);
        this.arrowP = this.arrowD.clone('ab', this.arrowOP);
        arrowE1.material = arrowE2.material = lightmaterial;
        this.arrowP.material = this.arrowD.material = lightmaterialA;
        this.arrowD.setParent(this.arrowOD);
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
            height: '30px', width: '70px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };

        const ImageLabelOptions = {
            height: '64px', width: '273.5px', color: '#ffffff',
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const option2 = { color: '#FFFFFF', fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: '' };
        if (this.isMob) {
            ImageLabelOptions.width = '547px';
            ImageLabelOptions.height = '128px';
            ImageLabelOptions.linkOffsetX = '46px';
            ImageLabelOptions.linkOffsetY = '-36px';
            option2.fontSize = '36px';
        }
        this.tiptextO = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipO, 'O', 20, 20, options);
        this.tiptextB = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', 20, 20, options);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 20, 20, options);
        this.tiptextA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', 20, 20, options);
        this.tiptextC = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipC, 'C', 20, 20, options);
        this.textA1 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.arrowA1, `A'`, 20, 20, options);
        this.textB1 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.arrowB1, `B'`, 20, 20, options); //B’

        this.LineAOB = LinesBuild.CreateUpdateLines([this.posA, this.posO, this.posB],
            this.colorBlue, this.edgesWidth, this.LineAOB, scene);
        this.LineABC = LinesBuild.CreateUpdateLines([this.posA, this.posB], this.colorBlue, this.edgesWidth, this.LineABC, scene);
        this.LineAPB = LinesBuild.CreateUpdateLines([this.posA, this.posB], this.colorGreen, this.edgesWidth, this.LineAPB, scene);
        this.LineAPBDashed = LinesBuild.createDashLines([this.posO, this.posB], this.colorYellow, this.edgesWidth, this.scene, 20, 20);

        this.LineA2OB2 = LinesBuild.CreateUpdateLines([this.posO, this.posA, this.posB],
            this.colorBlue, this.edgesWidth, this.LineA2OB2, scene);
        this.LineA2OB2Dashed = LinesBuild.createDashLines([this.posB, this.posB], this.colorBlue, this.edgesWidth, scene, 20, 20);
        this.LineA2OB2Dashed2 = LinesBuild.createDashLines([this.posB, this.posB], this.colorBlue, this.edgesWidth, scene, 20, 20);
        this.DashedA = LinesBuild.createDashLines([this.posB, this.posB], this.colorBlue, this.edgesWidth, scene, 20, 20);
        this.DashedB = LinesBuild.createDashLines([this.posB, this.posB], this.colorBlue, this.edgesWidth, scene, 20, 20);

        this.LineEP12 = LinesBuild.createDashLines([this.posB, this.posB], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.LineEP122 = LinesBuild.createDashLines([this.posB, this.posB], this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.LineOD = LinesBuild.CreateUpdateLines([this.posO, this.posA], this.colorRed, this.edgesWidth, this.LineOD, scene);
        this.LineOP = LinesBuild.CreateUpdateLines([this.posO, this.posA], this.colorRed, this.edgesWidth, this.LineOP, scene);
        this.LineOPDashed = LinesBuild.createDashLines([this.posO, this.posA], this.colorRed, this.edgesWidth, scene, 20, 20);
        LabelUtils.CreateDot(advancedTexture, this.tipB, dot, ImageLabelOption);
        LabelUtils.CreateDot(advancedTexture, this.tipA, dot, ImageLabelOption);
        this.imageP = LabelUtils.CreateDot(advancedTexture, this.tipP, dot, ImageLabelOption);
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

    getCanMove(posAB_CP2: Vector3): boolean {
        return posAB_CP2.x > -this.orthoX + this.offset && posAB_CP2.x < this.orthoX - this.offset &&
            posAB_CP2.y > -this.orthoY + this.offset && posAB_CP2.y < this.orthoY - this.offset;
    }
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh === this.tipP) {
                if (this.viewModel.lock) {
                    const AB2 = BeelineUtils.GetLineSlopeAndConstant(this.arrowA1.position, this.arrowB1.position);
                    const kab2 = AB2.x === Infinity ? 0 : AB2.x === 0 ? Infinity : -1 / AB2.x; //AB2边高的斜率
                    const Bab2 = kab2 === 0 ? startingPoint.y : kab2 === Infinity ?
                        startingPoint.x : startingPoint.y - kab2 * startingPoint.x; //常数
                    const posAB_CP2 = BeelineUtils.GetLineFocusPoint(AB2, new Vector2(kab2, Bab2));
                    currentMesh.position = this.getCanMove(posAB_CP2) ? posAB_CP2 : currentMesh.position;
                } else {
                    const AB = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipA.position);
                    const kab = AB.x === Infinity ? 0 : AB.x === 0 ? Infinity : -1 / AB.x; //AB边高的斜率
                    const Bab = kab === 0 ? startingPoint.y : kab === Infinity ?
                        startingPoint.x : startingPoint.y - kab * startingPoint.x; //常数
                    const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, new Vector2(kab, Bab));
                    if (Vector3.Distance(startingPoint, posAB_CP) < 0.3) {
                        currentMesh.position = posAB_CP;
                    } else if (Vector3.Distance(startingPoint, Vector3.Zero()) < 0.3) {
                        currentMesh.position = Vector3.Zero();
                    } else {
                        currentMesh.position = startingPoint;
                    }
                }
            } else {
                currentMesh.position = startingPoint;
            }
            if (currentMesh === this.tipA || currentMesh === this.tipB) {
                const AB = BeelineUtils.GetLineSlopeAndConstant(Vector3.Zero(), this.tipA.position);
                const k_ab = AB.x === Infinity ? 0 : AB.x === 0 ? Infinity : -1 / AB.x; //AB边高的斜率
                const Bab = k_ab === 0 ? this.tipB.position.y : k_ab === Infinity ?
                    this.tipB.position.x : this.tipB.position.y - k_ab * this.tipB.position.x; //常数
                const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, new Vector2(k_ab, Bab));
                if (Vector3.Distance(this.tipB.position, posAB_CP) < 0.5) {
                    currentMesh.position = currentMesh.position.add(
                        Vector3.Normalize(this.tipB.position.subtract(posAB_CP)).scale(0.8));
                }
            }
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const AB = BeelineUtils.GetLineSlopeAndConstant(this.tipA.position, this.tipB.position);
        const Pb = AB.x === 0 ? this.tipP.position.y : AB.x === Infinity ?
            this.tipP.position.x : this.tipP.position.y - AB.x * this.tipP.position.x; //常数
        const KOB = BeelineUtils.GetLineSlopeAndConstant(this.tipO.position, this.tipB.position).x;
        const POB = KOB === 0 ? this.tipP.position.y : KOB === Infinity ?
            this.tipP.position.x : this.tipP.position.y - KOB * this.tipP.position.x; //常数

        const KOA = BeelineUtils.GetLineSlopeAndConstant(this.tipO.position, this.tipA.position).x;
        const POA = KOA === 0 ? this.tipP.position.y : KOA === Infinity ?
            this.tipP.position.x : this.tipP.position.y - KOA * this.tipP.position.x; //常数

        const KOP = BeelineUtils.GetLineSlopeAndConstant(this.tipO.position, this.tipP.position).x;
        this.posPOA = BeelineUtils.GetLineFocusPoint(new Vector2(KOA, 0), new Vector2(KOB, POB));
        this.posPOB = BeelineUtils.GetLineFocusPoint(new Vector2(KOB, 0), new Vector2(KOA, POA));

        this.arrowB1.position = BeelineUtils.GetLineFocusPoint(new Vector2(KOB, 0), new Vector2(AB.x, Pb));
        this.arrowA1.position = BeelineUtils.GetLineFocusPoint(new Vector2(KOA, 0), new Vector2(AB.x, Pb));
        this.tipC.position = this.tipP.position.length() < 0.00001 ?
            this.tipA.position.add(this.tipB.position).scale(0.5)
            : BeelineUtils.GetLineFocusPoint(new Vector2(KOP, 0), AB);

        this.arrowOD.position = this.tipC.position;
        this.arrowOD.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipO.position, this.tipC.position));

        this.arrowOP.position = this.tipP.position;
        this.arrowOP.rotation = new Vector3(0, 0, AngleUtils.GetVectorRadian(this.tipO.position, this.tipP.position));

        const vectorB = AngleUtils.GetVectorRadian(this.tipO.position, this.tipB.position),
            vectorA = AngleUtils.GetVectorRadian(this.tipO.position, this.tipA.position),
            vectorB1 = AngleUtils.GetVectorRadian(this.tipO.position, this.arrowB1.position),
            vectorA1 = AngleUtils.GetVectorRadian(this.tipO.position, this.arrowA1.position);

        this.arrowOB.position = this.tipB.position;
        this.arrowOB.rotation = new Vector3(0, 0, vectorB);
        this.arrowOA.position = this.tipA.position;
        this.arrowOA.rotation = new Vector3(0, 0, vectorA);
        this.arrowB1.rotation = new Vector3(0, 0, vectorB1);
        this.arrowA1.rotation = new Vector3(0, 0, vectorA1);

        if (Vector3.Distance(this.tipP.position, Vector3.Zero()) < 0.0001) {
            this.posAPBLeft = this.tipP.position.add(Vector3.Normalize(this.tipA.position.subtract(this.tipB.position)).scale(2));
            this.posAPBRight = this.tipP.position.add(Vector3.Normalize(this.tipB.position.subtract(this.tipA.position)).scale(2));
        } else {
            this.posAPBLeft = this.arrowA1.position.add(Vector3.Normalize(this.arrowA1.position.subtract(this.arrowB1.position)).scale(2));
            this.posAPBRight = this.arrowB1.position.add(Vector3.Normalize(this.arrowB1.position.subtract(this.arrowA1.position)).scale(2));
        }
        this.posABCLeft = this.tipA.position.add(Vector3.Normalize(this.tipA.position.subtract(this.tipB.position)).scale(2));
        this.posABCRight = this.tipB.position.add(Vector3.Normalize(this.tipB.position.subtract(this.tipA.position)).scale(2));

        const OP = Vector3.Distance(Vector3.Zero(), this.tipP.position);
        const OC = Vector3.Distance(Vector3.Zero(), this.tipC.position);
        let vStr = OC === 0 ? '0' : Math.abs(OP / OC) >= 10 ? `${(OP / OC).toFixed(1)}` : `${(OP / OC).toFixed(2)}`;
        if (vStr.indexOf('NaN') !== -1 || vStr.indexOf('0.00') !== -1) {
            vStr = '0';
        } else {
        }
        if (Vector3.Dot(this.tipC.position, this.tipP.position) > 0) {
            this.viewModel.numtext = vStr;
            this.setMeshVisible([this.LineA2OB2, this.LineOP, this.LineAPB], true);
            this.setMeshVisible([this.LineA2OB2Dashed, this.LineA2OB2Dashed2, this.LineOPDashed, this.LineAPBDashed], false);
            this.viewModel.pictip = prove1;
            if (vStr === '0') {
                this.textA1.isVisible = this.textB1.isVisible = false;
                this.viewModel.pictip = prove2;
            } else {
                this.textA1.isVisible = this.textB1.isVisible = true;
                this.viewModel.pictip = prove1;
            }
        } else {
            if (vStr === '0') {
                this.textA1.isVisible = this.textB1.isVisible = false;
                this.viewModel.numtext = vStr;
                this.viewModel.pictip = prove2;
            } else {
                this.textA1.isVisible = this.textB1.isVisible = true;
                this.viewModel.numtext = '-' + vStr;
                this.viewModel.pictip = prove3;
            }
            this.setMeshVisible([this.LineA2OB2, this.LineOP, this.LineAPB], false);
            this.setMeshVisible([this.LineA2OB2Dashed, this.LineA2OB2Dashed2, this.LineOPDashed, this.LineAPBDashed], true);
        }
        this.updateVerticesData();
    }

    /**
     * 更新线条实体
     */
    updateVerticesData() {
        const posA = this.tipA.position, posB = this.tipB.position, posA1 = this.arrowA1.position,
            posB1 = this.arrowB1.position, posP = this.tipP.position;
        this.updateMeshVertData(this.LineAOB, Vector3Utils.ToArray([posA, this.posO, posB]));
        this.updateMeshVertData(this.LineA2OB2, Vector3Utils.ToArray([posB1, this.posO, posA1]));

        if (this.LineA2OB2Dashed.isVisible) {
            const nb = Math.floor(Vector3.Distance(this.posO, posA1));
            this.LineA2OB2Dashed.dispose();
            this.LineA2OB2Dashed = LinesBuild.createDashLines([this.posO, posA1],
                this.colorBlue, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);

            const nb2 = Math.floor(Vector3.Distance(this.posO, posB1));
            this.LineA2OB2Dashed2.dispose();
            this.LineA2OB2Dashed2 = LinesBuild.createDashLines([this.posO, posB1],
                this.colorBlue, this.edgesWidth, this.scene, nb2 > 5 ? nb2 : 5, nb2);
        }

        if (this.LineEP12.isVisible) {
            const nb = Math.floor(Vector3.Distance(this.posPOA, posP));
            this.LineEP12.dispose();
            this.LineEP12 = LinesBuild.createDashLines([this.posPOA, posP],
                this.colorGreen, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);

            const nb2 = Math.floor(Vector3.Distance(this.posPOB, posP));
            this.LineEP122.dispose();
            this.LineEP122 = LinesBuild.createDashLines([this.posPOB, posP],
                this.colorGreen, this.edgesWidth, this.scene, nb2 > 5 ? nb2 : 5, nb2);

            const disb = Vector3.Distance(this.posPOB, posB1);
            const disb2 = Vector3.Distance(this.posPOB, posB);
            const vecB = disb > disb2 ? posB : posB1;

            let showB = false;
            if (Vector3.Dot(posB, posB1) > 0) {
                    showB = true;
            } else {
                if (vecB === posB) {
                    if (!(this.posPOB.length() < posB1.length() && Vector3.Dot(this.posPOB, posB1) > 0)) {
                        showB = true;
                    }
                } else {
                    if (this.posPOB.length() > posB1.length()) {
                        showB = true;
                    }
                }
            }
            if (showB) {
                if (this.DashedB) {
                    this.DashedB.dispose();
                }
                const disBB = Vector3.Distance(this.posPOB, vecB);
                this.DashedB = LinesBuild.createDashLines([vecB, this.posPOB.add(Vector3.Normalize(this.posPOB).scale(2))],
                    this.colorBlue, this.edgesWidth, this.scene, disBB > 5 ? disBB : 5, disBB);
            } else {
                if (this.DashedB) {
                    this.DashedB.dispose();
                }
            }


            const disa = Vector3.Distance(this.posPOA, posA1);
            const disa2 = Vector3.Distance(this.posPOA, posA);
            const vecA = disa > disa2 ? posA : posA1;

            let showA = false;
            if (Vector3.Dot(posA, posA1) > 0) {
                    showA = true;
            } else {
                if (vecA === posA) {
                    if (!(this.posPOA.length() < posA1.length() && Vector3.Dot(this.posPOA, posA1) > 0)) {
                        showA = true;
                    }
                } else {
                    if (this.posPOA.length() > posA1.length()) {
                        showA = true;
                    }
                }
            }
            if (showA) {
                if (this.DashedA) {
                    this.DashedA.dispose();
                }
                const disAA = Vector3.Distance(this.posPOA, vecA);
                this.DashedA = LinesBuild.createDashLines([vecA, this.posPOA.add(Vector3.Normalize(this.posPOA).scale(2))],
                    this.colorBlue, this.edgesWidth, this.scene, disAA > 5 ? disAA : 5, disAA);
            } else {
                if (this.DashedA) {
                    this.DashedA.dispose();
                }
            }

        } else {
            if (this.DashedB) {
                this.DashedB.dispose();
            }
            if (this.DashedA) {
                this.DashedA.dispose();
            }
        }

        this.updateMeshVertData(this.LineOD, Vector3Utils.ToArray([this.posO, this.tipC.position]));
        this.updateMeshVertData(this.LineOP, Vector3Utils.ToArray([this.tipO.position, posP]));

        if (this.LineOPDashed.isVisible) {
            const nb = Math.floor(Vector3.Distance(this.posO, posP));
            this.LineOPDashed.dispose();
            this.LineOPDashed = LinesBuild.createDashLines([this.posO, posP],
                this.colorRed, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);
        }
        const vec_pa = TriangleUtils.getVecOut(this.posAPBLeft, this.posAPBRight, posP, 5);
        this.updateMeshVertData(this.LineAPB, Vector3Utils.ToArray(vec_pa));
        if (this.LineAPBDashed.isVisible) {
            const nb = Math.floor(Vector3.Distance(vec_pa[0], vec_pa[1]));
            this.LineAPBDashed.dispose();
            this.LineAPBDashed = LinesBuild.createDashLines(vec_pa,
                this.colorYellow, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);
        }
        const vec_pc = TriangleUtils.getVecOut(this.posABCLeft, this.posABCRight, this.tipC.position, 5);
        this.updateMeshVertData(this.LineABC, Vector3Utils.ToArray(vec_pc));
    }

    /**
    * '证明'按钮
    */
    ButtonEvent2(): void {
        this.LineEP12.isVisible = this.LineEP122.isVisible = this.viewModel.buttonActived2;
        if (this.LineEP12.isVisible) {
            const nb = Math.floor(Vector3.Distance(this.posPOA, this.tipP.position));
            this.LineEP12.dispose();
            this.LineEP12 = LinesBuild.createDashLines([this.posPOA, this.tipP.position],
                this.colorGreen, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);

            const nb2 = Math.floor(Vector3.Distance(this.posPOB, this.tipP.position));
            this.LineEP122.dispose();
            this.LineEP122 = LinesBuild.createDashLines([this.posPOB, this.tipP.position],
                this.colorGreen, this.edgesWidth, this.scene, nb2 > 5 ? nb2 : 5, nb2);
        }
        this.updateLineData();
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipA.position = this.posA.scale(1);
        this.tipB.position = this.posB.scale(1);
        this.tipP.position = this.posP.scale(1);
        this.viewModel.buttonActived1 = false;
        this.viewModel.buttonActived2 = false;
        this.ButtonEvent2();
        this.setGUIVisible([this.tiptextC, this.tiptextP, this.imageP], true);
        this.setMeshVisible([this.arrowD, this.arrowP, this.LineOD, this.LineOP], true);
        this.updateLineData();
    }
}
