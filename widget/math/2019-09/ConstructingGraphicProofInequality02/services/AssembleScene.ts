/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, AbstractMesh, Engine, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    offset = 0.5;
    hexRed = '#ff0000';
    hexGreen = '#78d117';
    colorRed: Color3;
    colorGreen: Color3;
    //动点abc
    tipA: Mesh;
    tipB: Mesh;
    tipC: Mesh;
    tipA2: Mesh;
    tipB2: Mesh;
    //标签abc
    texta1: Mesh;
    texta2: Mesh;
    textb1: Mesh;
    textb2: Mesh;
    textc1: Mesh;
    textc2: Mesh;

    LineBox: LinesMesh;
    LineHB: LinesMesh;
    LineHC: LinesMesh;
    LineVB: LinesMesh;
    LineVC: LinesMesh;

    Line1: LinesMesh;
    Line2: LinesMesh;

    rb = 0;
    rc = 0;

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
        this.tipA = Mesh.CreateSphere('tipA', 8, 0.8, scene);
        this.tipA.position = new Vector3(-3.5, 3.5, 0);
        this.tipB = Mesh.CreateSphere('tipB', 8, 0.8, scene);
        this.tipB.position = new Vector3(-3.5, 1, 0);
        this.tipC = Mesh.CreateSphere('tipC', 8, 0.8, scene);
        this.tipC.position = new Vector3(-3.5, -1, 0);
        this.setMeshVisible([this.tipA, this.tipB, this.tipC], false);
        this.tipA2 = new Mesh('a2');
        this.tipB2 = new Mesh('b2');

        this.texta1 = new Mesh('a1');
        this.texta2 = new Mesh('a2');
        this.textb1 = new Mesh('b1');
        this.textb2 = new Mesh('b2');
        this.textc1 = new Mesh('c1');
        this.textc2 = new Mesh('c2');
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '30px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = options.width = '60px';
            options.fontSize = '48px';
        }

        const poz = Vector3.Zero();
        const poo = Vector3.One();
        this.LineBox = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.tipA.position, new Vector3(0, 1, 0),
            new Vector3(1, 1, 0), new Vector3(1, 0, 0), poz], 20), Color3.Black(), this.edgesWidth, this.LineBox, scene, 160);

        this.LineHB = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([poz, poo], 20),
            Color3.Black(), this.edgesWidth, this.LineHB, scene);
        this.LineHC = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([poz, poo], 20),
            Color3.Black(), this.edgesWidth, this.LineHC, scene);
        this.LineVB = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([poz, poo], 20),
            Color3.Black(), this.edgesWidth, this.LineVB, scene);
        this.LineVC = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([poz, poo], 20),
            Color3.Black(), this.edgesWidth, this.LineVC, scene);

        this.Line1 = LinesBuild.CreateUpdateLines([poz, poo], this.colorRed, this.edgesWidth, this.Line1, scene);
        this.Line2 = LinesBuild.CreateUpdateLines([poz, poo, poz, poo], this.colorGreen, this.edgesWidth, this.Line2, scene);

        const dotImage1 = LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        const dotImage2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);
        const dotImage3 = LabelUtils.CreateImageLabel(advancedTexture, this.tipC, dot, ImageLabelOption);

        dotImage1.hoverCursor = 'pointer';
        dotImage1.isPointerBlocker = true;

        dotImage2.hoverCursor = 'pointer';
        dotImage2.isPointerBlocker = true;

        dotImage3.hoverCursor = 'pointer';
        dotImage3.isPointerBlocker = true;

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA2, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB2, dot2, ImageLabelOption);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipC, 'C', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.texta1, 'a', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textb1, 'b', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textc1, 'c', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.texta2, 'a', 25, -30, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textb2, 'b', 25, -30, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textc2, 'c', 25, -30, options);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 7);
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
            currentMesh.position = Math.abs(startingPoint.x) > startingPoint.y ?
                Math.abs(startingPoint.x) > 4 ? new Vector3(-4, 4, 0) :
                    new Vector3(startingPoint.x, -startingPoint.x, 0) :
                Math.abs(startingPoint.y) > 4 ? new Vector3(-4, 4, 0) :
                    new Vector3(-startingPoint.y, startingPoint.y, 0);

            currentMesh.position = currentMesh.position.y < 2.5 ? new Vector3(-2.5, 2.5, 0) : currentMesh.position;
            this.tipB.position.x = this.tipC.position.x = this.tipA.position.x;
            this.tipB.position.y = this.tipA.position.y / this.rb;
            this.tipC.position.y = this.tipA.position.y / this.rc;
        } else if (currentMesh === this.tipB) {
            if (Math.abs(Math.abs(startingPoint.y) - this.tipA.position.y / 3) < 0.1) {
                startingPoint.y = startingPoint.y > 0 ? this.tipA.position.y / 3 : -this.tipA.position.y / 3;
            }
            currentMesh.position.y = startingPoint.y > this.tipA.position.y - this.offset ? this.tipA.position.y - this.offset :
                startingPoint.y < this.tipC.position.y + this.offset ? this.tipC.position.y + this.offset : startingPoint.y;

            this.rb = this.tipA.position.y / this.tipB.position.y;
        } else if (currentMesh === this.tipC) {
            if (Math.abs(Math.abs(startingPoint.y) - this.tipA.position.y / 3) < 0.1) {
                startingPoint.y = startingPoint.y > 0 ? this.tipA.position.y / 3 : -this.tipA.position.y / 3;
            }
            startingPoint.y = startingPoint.y > this.tipB.position.y - this.offset ? this.tipB.position.y - this.offset :
                startingPoint.y < -this.tipA.position.y + this.offset ? -this.tipA.position.y + this.offset : startingPoint.y;

            currentMesh.position.y = startingPoint.y;
            this.rc = this.tipA.position.y / this.tipC.position.y;
        }
        const pos = this.tipA.position;
        const posB = this.tipB.position;
        const posC = this.tipC.position;
        const dis = Vector3.Distance(posB, posC);
        this.updateMeshVertData(this.LineBox,
            Vector3Utils.ToMoreVector3ToArray([pos, new Vector3(pos.x, pos.x, 0),
                new Vector3(pos.y, pos.x, 0), new Vector3(pos.y, pos.y, 0), pos], 20));
        this.updateMeshVertData(this.LineHB, Vector3Utils.ToMoreVector3ToArray([posB, new Vector3(-posB.x, posB.y, 0)], 20));
        this.updateMeshVertData(this.LineHC, Vector3Utils.ToMoreVector3ToArray([posC, new Vector3(-posC.x, posC.y, 0)], 20));

        this.updateMeshVertData(this.LineVB,
            Vector3Utils.ToMoreVector3ToArray([new Vector3(pos.x + dis, posB.x, 0), new Vector3(pos.x + dis, -posB.x, 0)], 20));
        this.updateMeshVertData(this.LineVC,
            Vector3Utils.ToMoreVector3ToArray([new Vector3(-posC.y, posC.x, 0), new Vector3(-posC.y, -posC.x, 0)], 20));

        this.updateMeshVertData(this.Line1, Vector3Utils.ToArray([new Vector3(pos.x, pos.x, 0), new Vector3(pos.y, pos.y, 0)]));
        this.updateMeshVertData(this.Line2,
            Vector3Utils.ToArray([new Vector3(pos.x, pos.x, 0),
            new Vector3(pos.x + dis, posC.y, 0), new Vector3(-posC.y, posB.y, 0),
            new Vector3(pos.y, pos.y, 0)]));
        this.tipA2.position = new Vector3(pos.x + dis, -posB.x, 0);
        this.tipB2.position = new Vector3(-posC.y, -posC.x, 0);
        this.texta1.position = pos.add(posB).scale(0.5);
        this.textb1.position = posB.add(posC).scale(0.5);
        this.textc1.position = posC.add(new Vector3(pos.x, pos.x, 0)).scale(0.5);

        this.texta2.position = new Vector3(pos.x + dis + Vector3.Distance(posB, pos) / 2, -this.textb1.position.x, 0);
        this.textb2.position = new Vector3(pos.x + dis / 2, -posB.x, 0);
        this.textc2.position = new Vector3(-this.textc1.position.y, -this.textc1.position.x, 0);
    }

    Answer(i: number) {
        if (i === 1) {
            this.setMeshVisible([this.Line1, this.Line2], false);
        } else if (i === 2) {
            this.setMeshVisible([this.Line1, this.Line2], true);
        }
    }
    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
        this.rb = this.tipA.position.y / this.tipB.position.y;
        this.rc = this.tipA.position.y / this.tipC.position.y;
        this.updateLineData(null, null);
    }
}
