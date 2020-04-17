/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/9/10 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, MeshBuilder, LinesMesh, Mesh, AbstractMesh, Engine, Scene, StandardMaterial
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';

import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    a = 4;
    b = 3;
    r = 0.5;
    offset = 0.1;
    hexBlue = '#18A2FF';
    hexOrange = '#EE7C31';
    hexRed = '#FF0000';
    colorBlue: Color3;
    colorOrange: Color3;
    colorRed: Color3;

    matOrange: StandardMaterial; //橙色材质
    matWhite: StandardMaterial; //白色材质
    tipA: Mesh; //A运动点
    tipB: Mesh; //B移动点

    dotA: GUI.Control; //a提示
    dotB: GUI.Control; //b提示

    //斜杠
    tipH1: Mesh;
    tipH2: Mesh;
    dotH1: GUI.Control;
    dotH2: GUI.Control;

    texta1: Mesh; //a定位点
    texta2: Mesh; //a2定位点
    txta2: GUI.Control; //a文本
    textb1: Mesh; //b定位点
    textb2: Mesh; //b2定位点
    txtb2: GUI.Control;

    textaplusb: Mesh; //a+b定位点
    textamultb: Mesh; //a-b定位点
    //直角信息
    LineAng1: LinesMesh;
    LineAng2: LinesMesh;
    //α β角度信息
    LineAngA1: LinesMesh;
    textA1: GUI.Control;
    tipAngleA1: Mesh;

    LineAngA2: LinesMesh;
    textA2: GUI.Control;
    tipAngleA2: Mesh;

    LineAngB: LinesMesh;
    textB: GUI.Control;
    tipAngleB: Mesh;

    ribbonOut: Mesh; //外四边形
    ribbonIn: Mesh; //内四边形

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
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipA = Mesh.CreateSphere('tipA', 8, 1, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.1, scene);
        this.setMeshVisible([this.tipA, this.tipB], false);
        this.tipH1 = new Mesh('a');
        this.tipH2 = new Mesh('a');

        this.tipAngleA1 = new Mesh('a');
        this.tipAngleA2 = new Mesh('a');
        this.tipAngleB = new Mesh('b');

        this.texta1 = new Mesh('a');
        this.texta2 = new Mesh('a');
        this.textb1 = new Mesh('b');
        this.textb2 = new Mesh('b');
        this.textaplusb = new Mesh('textaplusb');
        this.textamultb = new Mesh('textamultb');

        const mata1 = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        this.matWhite = MaterialLab.CreateLightMaterial(Color3.White(), scene);
        this.matOrange = MaterialLab.CreateLightMaterial(this.colorOrange, scene);

        this.ribbonOut = Mesh.CreateRibbon('ribbon',
            [[new Vector3(-4, 0, 0.1), new Vector3(0, 3, 0.1)], [new Vector3(-1, -4, 0.1), new Vector3(4, -1, 0.1)]],
            false, false, 0, scene, true, Mesh.DOUBLESIDE, this.ribbonOut);
        this.ribbonOut.isPickable = false;
        this.ribbonOut.material = mata1;

        this.ribbonIn = Mesh.CreateRibbon('ribbon',
            [[new Vector3(-1, 0, 0.05), new Vector3(0, 0, 0.05)], [new Vector3(-1, -1, 0.05), new Vector3(0, -1, 0.05)]],
            false, false, 0, scene, true, Mesh.DOUBLESIDE, this.ribbonIn);
        this.ribbonIn.isPickable = false;
        this.ribbonIn.material = this.matWhite;

        this.LineAng1 = LinesBuild.CreateLines(
            [new Vector3(0.25, 0, 0), new Vector3(0.25, 0.25, 0), new Vector3(0, 0.25, 0)], this.colorRed, this.edgesWidth, scene);
        this.LineAng2 = LinesBuild.CreateLines(
            [new Vector3(-0.25, 0, 0), new Vector3(-0.25, -0.25, 0), new Vector3(0, -0.25, 0)], this.colorRed, this.edgesWidth, scene);
        const ang = FormulasUtils.GetArcUpdateVertices(this.r, 0, 60);
        this.LineAngA1 = LinesBuild.CreateUpdateLines(ang, Color3.Black(), this.edgesWidth, this.LineAngA1, scene);
        this.LineAngA2 = LinesBuild.CreateUpdateLines(ang, Color3.Black(), this.edgesWidth, this.LineAngA2, scene);
        this.LineAngB = LinesBuild.CreateUpdateLines(ang, Color3.Black(), this.edgesWidth, this.LineAngB, scene);
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorOrange = Color3.FromHexString(this.hexOrange);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '60px', width: '90px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 50, width: 60, color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = '80px';
            options2.fontSize = options.fontSize = '48px';
        }

        this.dotA = LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        this.dotB = LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);

        LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.texta1, 'a', -30, 0, options);
        LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.textb1, 'b', 0, 30, options);

        this.txta2 = LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.texta2, 'a', 0, 30, options);
        this.txtb2 = LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.textb2, 'b', 30, 0, options);

        this.textA1 = LabelUtils.CreateLabel(advancedTexture, this.tipAngleA1, 'α', options2);
        this.textA2 = LabelUtils.CreateLabel(advancedTexture, this.tipAngleA2, 'α', options2);
        this.textB = LabelUtils.CreateLabel(advancedTexture, this.tipAngleB, 'β', options2);

        LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.textamultb, 'a-b', 40, 0, options);
        LabelUtils.CreateLabelCENTERWithOffset(advancedTexture, this.textaplusb, 'a+b', 0, -30, options);
        options2.color = '#ffffff';
        options2.fontSize = '36px';
        this.dotH1 = LabelUtils.CreateLabel(advancedTexture, this.tipH1, '//', options2);
        this.dotH2 = LabelUtils.CreateLabel(advancedTexture, this.tipH2, `\\\\`, options2);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 6);
        this.initValue(scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            this.updateLineData(startingPoint, currentMesh);
        }
    }

    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (currentMesh === this.tipA) {
            const k = this.a / this.b;
            const movek = this.a / (this.a + this.b);
            let current = 0;
            const diff = startingPoint.subtract(currentMesh.position);
            if (diff.x < diff.y) {
                current = (startingPoint.x < -4 ? -4 : startingPoint.x > -2 ? -2 : startingPoint.x) * movek;
            } else {
                current = startingPoint.y / movek < -4 ? -4 * movek : startingPoint.y / movek > -2 ? -2 * movek : startingPoint.y;
            }
            this.a = Math.abs(current * 2);
            this.b = this.a / k;
        } else if (currentMesh === this.tipB) {
            const aplusb = this.a + this.b;
            currentMesh.position.x = startingPoint.x < -aplusb / 2 + this.offset ? - aplusb / 2 + this.offset :
                startingPoint.x > -this.offset ? -this.offset : startingPoint.x;
            this.b = Math.abs(- aplusb / 2 - currentMesh.position.x);
            this.a = aplusb - this.b;
            currentMesh.position.y = -this.a / 2;
        }
        this.tipA.position = new Vector3(-(this.a + this.b) / 2, -this.a / 2, 0);
        this.tipB.position = new Vector3(-(this.a + this.b) / 2 + this.b, -this.a / 2, 0);

        this.texta1.position = new Vector3(-(this.a + this.b) / 2, 0, 0);
        this.textb1.position = new Vector3(-(this.a + this.b) / 2 + this.b / 2, -this.a / 2, 0);

        this.texta2.position = new Vector3((this.a + this.b) / 2 - this.a / 2, -this.a / 2, 0);
        this.textb2.position = new Vector3((this.a + this.b) / 2, -this.a / 2 + this.b / 2, 0);

        this.textamultb.position = new Vector3((this.a + this.b) / 2, this.a / 2 - (this.a - this.b) / 2, 0);
        this.textaplusb.position = new Vector3(0, this.a / 2, 0);
        this.LineAng1.position = new Vector3(-(this.a + this.b) / 2, -this.a / 2, 0);
        this.LineAng2.position = new Vector3((this.a + this.b) / 2, this.a / 2, 0);

        const lefttop = new Vector3(-(this.a + this.b) / 2, this.a / 2, 0.1);
        const leftbottom = new Vector3(-(this.a + this.b) / 2, -this.a / 2, 0.1);
        const righttop = new Vector3((this.a + this.b) / 2, this.a / 2, 0.1);
        const rightbottom = new Vector3((this.a + this.b) / 2, -this.a / 2, 0.1);
        const movedot = new Vector3(-(this.a + this.b) / 2 + this.b, -this.a / 2, 0.1);
        const movedot2 = new Vector3((this.a + this.b) / 2, -this.a / 2 + this.b, 0.1);
        this.ribbonOut = MeshBuilder.CreateRibbon('ribbon',
            { pathArray: [[lefttop, righttop], [leftbottom, rightbottom]], instance: this.ribbonOut });

        if (this.viewModel.step === 1) {
            this.ribbonIn = MeshBuilder.CreateRibbon('ribbon',
                { pathArray: [[lefttop, movedot2], [movedot, rightbottom]], instance: this.ribbonIn });
        } else {
            this.ribbonIn = MeshBuilder.CreateRibbon('ribbon',
                { pathArray: [[lefttop, movedot2], [movedot, movedot]], instance: this.ribbonIn });
        }

        this.tipH1.position = lefttop.add(movedot).scale(0.5);
        this.tipH2.position = movedot2.add(movedot).scale(0.5);

        const a1ang = Vector3Utils.GetAngle(movedot.subtract(lefttop), new Vector3(0, -1, 0));
        const a2ang = Vector3Utils.GetAngle(movedot2.subtract(movedot), new Vector3(1, 0, 0));
        const bang = Vector3Utils.GetAngle(movedot2.subtract(lefttop), new Vector3(1, 0, 0));
        this.updateMeshVertData(this.LineAngA1,
            Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(this.r, 270, 270 + a1ang)));
        this.tipAngleA1.position = FormulasUtils.GetCirclePoint(this.r + 0.2, 270 + a1ang / 2).add(lefttop);
        this.LineAngA1.position = lefttop;
        this.updateMeshVertData(this.LineAngB,
            Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(this.r, 360 - bang, 360)));
        this.tipAngleB.position = FormulasUtils.GetCirclePoint(this.r + 0.2, 360 - bang / 2).add(lefttop);
        this.LineAngB.position = lefttop;
        if (this.viewModel.step === 2) {
            this.updateMeshVertData(this.LineAngA2, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(this.r, 0, a2ang)));
            this.tipAngleA2.position = FormulasUtils.GetCirclePoint(this.r + 0.2, a2ang / 2).add(movedot);
            this.LineAngA2.position = movedot;
        }
    }

    Answer(i: number) {
        if (i === 1) {
            this.a = 4;
            this.b = 3;
            this.ribbonIn.material = this.matWhite;
            this.setGUIVisible([this.txta2, this.txtb2, this.dotA, this.dotB, this.dotH1, this.dotH2, this.textA2], false);
            this.setMeshVisible([this.LineAngA2], false);
            this.tipA.isPickable = this.tipB.isPickable = false;
        } else if (i === 2) {
            this.ribbonIn.material = this.matOrange;
            this.setGUIVisible([this.txta2, this.txtb2, this.dotA, this.dotB, this.dotH1, this.dotH2, this.textA2], true);
            this.setMeshVisible([this.LineAngA2], true);
            this.tipA.isPickable = this.tipB.isPickable = true;
        }
        this.updateLineData(null, null);
    }
    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
    }
}
