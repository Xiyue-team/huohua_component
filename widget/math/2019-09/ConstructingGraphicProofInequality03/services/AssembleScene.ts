/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/9/10 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, MeshBuilder, LinesMesh, Mesh, AbstractMesh, Engine, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
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
    hexRed = '#EE7C31';
    hexBlue = '#2A79AF';
    hexGreen = '#72C813';
    colorRed: Color3;
    colorBlue: Color3;
    colorGreen: Color3;

    tipA: Mesh;
    tipB: Mesh;
    tipB2: Mesh;
    textB: GUI.Control;

    texta1: Mesh;
    texta2: Mesh;
    textb1: Mesh;
    textb2: Mesh;

    textx: Mesh;
    texty: Mesh;

    rb = 0;
    //线条ABC AC直角 AB直角 BC直角 PA PB PC  AC高 AB高 BC高
    LineBox: LinesMesh;
    Line1: LinesMesh;
    Line2: LinesMesh;
    Line3: LinesMesh;
    Line4: LinesMesh;
    ribbonOut: Mesh;
    ribbonIn: Mesh;

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
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipA.position = new Vector3(-3.5, 3.5, 0);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipB.position = new Vector3(-3.5, 1, 0);
        this.tipB2 = new Mesh('2');
        this.setMeshVisible([this.tipA, this.tipB], false);

        this.texta1 = new Mesh('a1');
        this.texta2 = new Mesh('a2');
        this.textb1 = new Mesh('b1');
        this.textb2 = new Mesh('b2');
        this.textx = new Mesh('1');
        this.texty = new Mesh('2');
        const mata1 = MaterialLab.CreateLightMaterial(this.colorGreen, scene);
        const mata2 = MaterialLab.CreateLightMaterial(this.colorRed, scene);

        this.ribbonOut = Mesh.CreateRibbon('ribbon',
            [[new Vector3(-4, 0, 0.1), new Vector3(0, 3, 0.1)], [new Vector3(-1, -4, 0.1), new Vector3(4, -1, 0.1)]],
            false, false, 0, scene, true, Mesh.DOUBLESIDE, this.ribbonOut);
        this.ribbonOut.isPickable = false;
        this.ribbonOut.material = mata1;

        this.ribbonIn = Mesh.CreateRibbon('ribbon',
            [[new Vector3(-1, 0, 0.05), new Vector3(0, 0, 0.05)], [new Vector3(-1, -1, 0.05), new Vector3(0, -1, 0.05)]],
            false, false, 0, scene, true, Mesh.DOUBLESIDE, this.ribbonIn);
        this.ribbonIn.isPickable = false;
        this.ribbonIn.material = mata2;
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '30px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const optionnos = {
            height: '30px', width: '30px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: ''
        };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = options.width = '60px';
            options.fontSize = optionnos.fontSize = '48px';
        }

        const poz = Vector3.Zero();
        const poo = Vector3.One();
        this.LineBox = LinesBuild.CreateUpdateDashedLines(
            Vector3Utils.ToMoreVector3([this.tipA.position, new Vector3(0, 1, 0),
            new Vector3(1, 1, 0), new Vector3(1, 0, 0), poz], 20), Color3.Black(), this.edgesWidth, this.LineBox, scene, 160);

        this.Line1 = LinesBuild.CreateUpdateLines([poz, poo], this.colorBlue, this.edgesWidth, this.Line1, scene);
        this.Line2 = LinesBuild.CreateUpdateLines([poz, poo], this.colorBlue, this.edgesWidth, this.Line2, scene);
        this.Line3 = LinesBuild.CreateUpdateLines([poz, poo], this.colorBlue, this.edgesWidth, this.Line3, scene);
        this.Line4 = LinesBuild.CreateUpdateLines([poz, poo], this.colorBlue, this.edgesWidth, this.Line4, scene);

        const dotImage1 = LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        const dotImage2 = LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);
        dotImage1.hoverCursor = 'pointer';
        dotImage1.isPointerBlocker = true;
        dotImage2.hoverCursor = 'pointer';
        dotImage2.isPointerBlocker = true;
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB2, dot2, ImageLabelOption);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', -30, 0, options);

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.texta1, 'a', -30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textb1, 'b', -30, 0, options);

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.texta2, 'b', 25, -30, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textb2, 'a', 25, -30, options);

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.textx, '1', 30, 0, optionnos);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.texty, '1', 0, 30, optionnos);
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
            currentMesh.position = Math.abs(startingPoint.x) > startingPoint.y ?
                Math.abs(startingPoint.x) > 4 ? new Vector3(-4, 4, 0) :
                    new Vector3(startingPoint.x, -startingPoint.x, 0) :
                Math.abs(startingPoint.y) > 4 ? new Vector3(-4, 4, 0) :
                    new Vector3(-startingPoint.y, startingPoint.y, 0);

            currentMesh.position = currentMesh.position.y < 3 ? new Vector3(-3, 3, 0) : currentMesh.position;
            this.tipB.position.x = this.tipA.position.x;
            this.tipB.position.y = this.tipA.position.y / this.rb;
        } else if (currentMesh === this.tipB) {
            if (Math.abs(startingPoint.y) < 0.1) {
                startingPoint.y = 0;
            }
            currentMesh.position.y = startingPoint.y > this.tipA.position.y - this.offset ? this.tipA.position.y - this.offset :
                startingPoint.y < -this.tipA.position.y + this.offset ? -this.tipA.position.y + this.offset : startingPoint.y;

            this.rb = this.tipA.position.y / this.tipB.position.y;
        }
        const pos = this.tipA.position;
        const posB = this.tipB.position;
        this.updateMeshVertData(this.LineBox, Vector3Utils.ToMoreVector3ToArray(
            [pos, new Vector3(pos.x, pos.x, 0), new Vector3(pos.y, pos.x, 0), new Vector3(pos.y, pos.y, 0), pos], 20));

        this.texta1.position = pos.add(posB).scale(0.5);
        this.textb1.position = posB.add(new Vector3(pos.x, pos.x, 0)).scale(0.5);

        this.texta2.position = pos.add(new Vector3(posB.y, -posB.x, 0)).scale(0.5);
        this.textb2.position = new Vector3(posB.y, -posB.x, 0).add(new Vector3(-pos.x, pos.y, 0)).scale(0.5);
        this.tipB2.position = new Vector3(posB.y, -posB.x, 0.1);
        this.textx.position = new Vector3(pos.y, 0, 0);
        this.texty.position = new Vector3(0, pos.x, 0);

        this.ribbonOut = MeshBuilder.CreateRibbon('ribbon', {
            pathArray: [[new Vector3(posB.x, posB.y, 0.1), new Vector3(posB.y, -posB.x, 0.1)],
            [new Vector3(-posB.y, posB.x, 0.1), new Vector3(-posB.x, -posB.y, 0.1)]],
            instance: this.ribbonOut
        });

        this.ribbonIn = MeshBuilder.CreateRibbon('ribbon', {
            pathArray: [[new Vector3(-posB.y, posB.y, 0.05), new Vector3(posB.y, posB.y, 0.05)],
            [new Vector3(-posB.y, -posB.y, 0.05), new Vector3(posB.y, -posB.y, 0.05)]],
            instance: this.ribbonIn
        });
        if (this.tipB.position.y > 0) {
            this.updateMeshVertData(this.Line1, Vector3Utils.ToArray([posB, new Vector3(posB.y, posB.y, 0)]));
            this.updateMeshVertData(this.Line2, Vector3Utils.ToArray([new Vector3(posB.y, -posB.x, 0), new Vector3(posB.y, -posB.y, 0)]));
            this.updateMeshVertData(this.Line3, Vector3Utils.ToArray([new Vector3(-posB.x, -posB.y, 0), new Vector3(-posB.y, -posB.y, 0)]));
            this.updateMeshVertData(this.Line4, Vector3Utils.ToArray([new Vector3(-posB.y, posB.x, 0), new Vector3(-posB.y, posB.y, 0)]));

        } else {
            this.updateMeshVertData(this.Line1, Vector3Utils.ToArray([posB, new Vector3(-posB.y, posB.y, 0)]));
            this.updateMeshVertData(this.Line2, Vector3Utils.ToArray([new Vector3(posB.y, -posB.x, 0), new Vector3(posB.y, posB.y, 0)]));
            this.updateMeshVertData(this.Line3, Vector3Utils.ToArray([new Vector3(-posB.x, -posB.y, 0), new Vector3(posB.y, -posB.y, 0)]));
            this.updateMeshVertData(this.Line4, Vector3Utils.ToArray([new Vector3(-posB.y, posB.x, 0), new Vector3(-posB.y, -posB.y, 0)]));
        }
    }

    Answer(i: number) {
        if (i === 1) {
            this.setMeshVisible([this.ribbonIn, this.ribbonOut, this.Line1, this.Line2, this.Line3, this.Line4], false);
        } else if (i === 2) {
            this.setMeshVisible([this.ribbonIn, this.ribbonOut, this.Line1, this.Line2, this.Line3, this.Line4], true);
        }
    }
    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
        this.rb = this.tipA.position.y / this.tipB.position.y;
        this.updateLineData(null, null);
    }
}
