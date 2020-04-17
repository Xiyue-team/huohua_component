/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/8/25 10:10
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
import { FastCreater } from '../../../../babylon/GUI/FastCreater';

import * as labelimg from '../sub_static/label.png';
import * as dot from '../sub_static/dot.png';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';
import { AngleUtils } from '../../../../babylon/Math/AngleUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //edges width

    colorHexStringBlue = '#6ECFFF'; // Hex String Blue
    colorHexStringRed = '#F05467'; // Hex String Red
    colorHexStringYellow = '#FFD621'; // Hex String Yellow 
    colorBlue: Color3; // Blue
    colorRed: Color3; // Red
    colorYellow: Color3; // Yellow

    tipO: Mesh; // point O Mesh
    tiptextO: GUI.TextBlock; // point O TextBlock

    posA = new Vector3(8, 1, 0); // point A position
    tipA: Mesh; // point A Mesh
    tiptextA: GUI.TextBlock; // point A TextBlock

    posB = new Vector3(1, 7, 0); // point B position
    tipB: Mesh; // point B Mesh
    tiptextB: GUI.TextBlock; // point B TextBlock

    posP = new Vector3(4.7715583243904085, 3.767235721951078, 0); // point P position
    tipP: Mesh; // point P Mesh
    tiptextP: GUI.TextBlock; // point P TextBlock

    LineAOB: LinesMesh; // Line AOB
    LineA2OB2Dashed: LinesMesh; // DashedLine A'OB'

    LineEP12: LinesMesh; // Line AOB
    LineOP: LinesMesh; // Line OP
    textB1: GUI.TextBlock; // point B' TextBlock
    textA1: GUI.TextBlock; // point A' TextBlock

    arrowOP: TransformNode; // Node of Arrow OP
    arrowOB: TransformNode; // Node of Arrow OB
    arrowOA: TransformNode; // Node of Arrow OA

    arrowP: Mesh; // Mesh of Arrow P
    imageP: GUI.Image;

    arrowA1: Mesh;
    arrowB1: Mesh;

    posABLeft: Vector3; //vector for line AB left border
    posABRight: Vector3; //vector for line AB right border
    LineAB: LinesMesh;

    // KAB: number; // dot of line AB
    // Pb: number; // b of line AB

    TipImage: Mesh;
    text1: GUI.TextBlock; //label of function
    text2: GUI.TextBlock; //label of function
    Image: GUI.Image; //bg of label

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
    }
    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipO = new Mesh('a');
        this.arrowA1 = new Mesh('a');
        this.arrowB1 = new Mesh('a');
        this.tipA = Mesh.CreateSphere('tipC', 8, 1.7, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.7, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.7, scene);
        this.setMeshVisible([this.tipP, this.tipA, this.tipB], false);
        this.tipB.position = this.posB;
        this.tipA.position = this.posA;
        this.tipP.position = this.posP;

        this.TipImage = new Mesh('a');
        this.TipImage.position = new Vector3(2, -14, 0);
        this.arrowOP = new TransformNode('arrow');
        this.arrowOB = new TransformNode('arrow');
        this.arrowOA = new TransformNode('arrow');

        const lightmaterial = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        const arrowD = Mesh.CreateCylinder('arrowA', 0.5, 0, 0.5, 4, 1, scene);
        arrowD.rotation = new Vector3(0, 0, -Math.PI / 2);
        arrowD.position = new Vector3(-0.2, 0, 0);
        arrowD.material = lightmaterial;
        arrowD.isPickable = false;

        arrowD.clone('ab', this.arrowOB);
        arrowD.clone('ab', this.arrowOA);
        this.arrowP = arrowD.clone('ab', this.arrowOP);
        this.arrowP.material = lightmaterialA;
        arrowD.isVisible = false;
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
            height: '40px', width: '40px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };

        const ImageLabelOptions = {
            height: '112px', width: '121px', color: '#ffffff',
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const option2 = { color: '#FFFFFF', fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: '' };
        let paddingLeft = '68px';
        let paddingVERTICAL = '20px';

        let offsetX = 40;
        let offsetY = 0;
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            options.height = options.width = '80px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.fontSize = '48px';
            ImageLabelOptions.width = '243px';
            ImageLabelOptions.height = '225px';
            ImageLabelOptions.linkOffsetX = '46px';
            ImageLabelOptions.linkOffsetY = '-36px';
            option2.fontSize = '36px';
            paddingLeft = '136px';
            paddingVERTICAL = '40px';
            offsetX = 80;
            offsetY = 0;
        }
        this.tiptextO = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipO, 'O', offsetX, offsetY, options);
        this.tiptextB = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', offsetX, offsetY, options);
        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', offsetX, offsetY, options);
        this.tiptextA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', offsetX, offsetY, options);
        this.textA1 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.arrowA1, `A'`, offsetX, offsetY, options);
        this.textB1 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.arrowB1, `B'`, offsetX, offsetY, options); //B’

        this.LineAOB = LinesBuild.CreateUpdateLines([this.posA, Vector3.Zero(), this.posB],
            this.colorBlue, this.edgesWidth, this.LineAOB, scene);

        this.LineA2OB2Dashed = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), this.posB, this.posB], 20),
            this.colorBlue, this.edgesWidth, this.LineA2OB2Dashed, scene, 40);

        this.LineEP12 = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), this.posB, this.posB], 20),
            this.colorYellow, this.edgesWidth, this.LineEP12, scene, 40);

        this.LineAB = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), this.posB], 20),
            this.colorBlue, this.edgesWidth, this.LineAB, scene);
        this.LineOP = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posA], this.colorRed, this.edgesWidth, this.LineOP, scene);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        this.imageP = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, dot, ImageLabelOption);

        this.text1 = FastCreater.TextBlock('2', option2, GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_TOP);
        this.text2 = FastCreater.TextBlock('2', option2, GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_BOTTOM);
        this.text1.paddingLeft = this.text2.paddingLeft = paddingLeft;
        this.text1.paddingTop = paddingVERTICAL;
        this.text2.paddingBottom = paddingVERTICAL;
        this.Image = LabelUtils.CreateImageTextLabel(advancedTexture, this.TipImage, labelimg,
            ImageLabelOptions, [this.text1, this.text2]);
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

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        startingPoint.x = startingPoint.x > this.orthoX - this.offset - 2 ? this.orthoX - this.offset - 2 : startingPoint.x;
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint = startingPoint.length() < 1 ? currentMesh.position :
                startingPoint.length() > 15 ? currentMesh.position : startingPoint;
            if (currentMesh === this.tipP) {
                const AB = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, this.tipA.position);
                const p_c = BeelineUtils.GetVerticalLine(AB, this.tipP.position);
                const posAB_CP = BeelineUtils.GetLineFocusPoint(AB, p_c);
                currentMesh.position = Vector3.Distance(startingPoint, posAB_CP) < 0.6 ? posAB_CP : startingPoint;
            } else if (currentMesh === this.tipB) {
                const canMove =
                    1 - Math.abs(Vector3.Dot(Vector3.Normalize(startingPoint), Vector3.Normalize(this.tipA.position))) < 0.001;
                currentMesh.position = canMove ? currentMesh.position : startingPoint;
            } else if (currentMesh === this.tipA) {
                const canMove =
                    1 - Math.abs(Vector3.Dot(Vector3.Normalize(startingPoint), Vector3.Normalize(this.tipB.position))) < 0.001;
                currentMesh.position = canMove ? currentMesh.position : startingPoint;
            }
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const OB = BeelineUtils.GetLineSlopeAndConstant(this.tipB.position, Vector3.Zero());
        const OA = BeelineUtils.GetLineSlopeAndConstant(Vector3.Zero(), this.tipA.position);

        const POB = OB.x === Infinity ? this.tipP.position.x : this.tipP.position.y - this.tipP.position.x * OB.x;
        const POA = OA.x === Infinity ? this.tipP.position.x : this.tipP.position.y - this.tipP.position.x * OA.x;

        this.arrowA1.position = BeelineUtils.GetLineFocusPoint(new Vector2(OA.x, 0), new Vector2(OB.x, POB));
        this.arrowB1.position = BeelineUtils.GetLineFocusPoint(new Vector2(OB.x, 0), new Vector2(OA.x, POA));

        const vectorB = AngleUtils.GetVectorRadian(Vector3.Zero(), this.tipB.position),
            vectorP = AngleUtils.GetVectorRadian(Vector3.Zero(), this.tipP.position),
            vectorA = AngleUtils.GetVectorRadian(Vector3.Zero(), this.tipA.position);

        this.arrowOP.position = this.tipP.position;
        this.arrowOP.rotation = new Vector3(0, 0, vectorP);
        this.arrowOB.position = this.tipB.position;
        this.arrowOB.rotation = new Vector3(0, 0, vectorB);
        this.arrowOA.position = this.tipA.position;
        this.arrowOA.rotation = new Vector3(0, 0, vectorA);

        const abVec = Vector3.Normalize(this.tipA.position.subtract(this.tipB.position));
        this.posABLeft = this.tipA.position.add(abVec.scale(2)).scale(1);
        this.posABRight = this.tipB.position.subtract(abVec.scale(2)).scale(1);

        let x = this.arrowA1.position.length() / this.tipA.position.length();
        let y = this.arrowB1.position.length() / this.tipB.position.length();
        x = Vector3.Dot(this.arrowA1.position, this.tipA.position) < 0 ? -x : x;
        y = Vector3.Dot(this.arrowB1.position, this.tipB.position) < 0 ? -y : y;
        this.text1.text = `${x.toFixed(1)}`;
        this.text2.text = `${y.toFixed(1)}`;
        this.updateVerticesData();
    }

    /**
     * 更新线条实体
     */
    updateVerticesData() {
        this.updateMeshVertData(this.LineAOB, Vector3Utils.ToArray([this.tipA.position, Vector3.Zero(), this.tipB.position]));
        this.updateMeshVertData(this.LineEP12,
            Vector3Utils.ToMoreVector3ToArray([this.arrowA1.position, this.tipP.position, this.arrowB1.position], 20));
        this.updateMeshVertData(this.LineOP, Vector3Utils.ToArray([Vector3.Zero(), this.tipP.position]));
        this.updateMeshVertData(this.LineA2OB2Dashed,
            Vector3Utils.ToMoreVector3ToArray([this.arrowB1.position, Vector3.Zero(), this.arrowA1.position], 20));
        this.updateMeshVertData(this.LineAB, Vector3Utils.ToMoreVector3ToArray([this.posABLeft, this.posABRight], 20));
    }

    /**
    * '证明'按钮
    */
    ButtonEvent2(): void {
        if (this.viewModel.buttonActived2) {
            this.setGUIVisible([this.textA1, this.textB1], true);
            this.setMeshVisible([this.LineA2OB2Dashed, this.LineEP12], true);
        } else {
            this.setGUIVisible([this.textA1, this.textB1], false);
            this.setMeshVisible([this.LineA2OB2Dashed, this.LineEP12], false);
        }
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
        this.setGUIVisible([this.tiptextP, this.imageP], true);
        this.setMeshVisible([this.arrowP, this.LineOP], true);
        this.updateLineData();
    }
}
