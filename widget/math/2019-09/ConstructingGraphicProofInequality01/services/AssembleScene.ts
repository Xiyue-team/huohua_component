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
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as a from '../sub_static/a.png';
import * as b from '../sub_static/b.png';
import * as c from '../sub_static/c.png';
import * as p from '../sub_static/p.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    //定位点 A B C P
    tipA: Mesh;
    tipB: Mesh;
    tipC: Mesh;
    tipP: Mesh;

    tiptextP: GUI.Control;
    tipPImage: GUI.Control;
    tipD: GUI.Control;
    //线条 PA PB PC  PO AC BO
    LineBox: LinesMesh;
    LinePA: LinesMesh;
    LinePB: LinesMesh;
    LinePC: LinesMesh;
    LinePO: LinesMesh;
    LineAC: LinesMesh;
    LineBO: LinesMesh;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.offset = 0;
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
        this.tipA = new Mesh('tipA');
        this.tipA.position = new Vector3(-0.2, 1, 0);
        this.tipB = new Mesh('tipB');
        this.tipB.position = new Vector3(1.2, 1, 0);
        this.tipC = new Mesh('tipC');
        this.tipC.position = new Vector3(1.2, -0.1, 0);
        this.tipP = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipP.position = new Vector3(0.5, 0.5, 0.5);
        this.tipP.isVisible = false;
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabel = { height: '20px', width: '60px', color: '#FFFFFF' };
        const ImageLabelP = { linkOffsetX: '35px', linkOffsetY: '0px', height: '20px', width: '60px', color: '#FFFFFF' };
        const options1 = {
            height: 70, width: 70, color: '#000000',
            fontSize: '20px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#000000',
            fontSize: '20px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options1.fontSize = options2.fontSize = '40px';
        }

        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 1, Color3.FromHexString('#000000'), this.edgesWidth, 0.5, 0.1, 0.05, 0.1)
            .createAxisOLabel(options1)
            .createAxisLabel(options2);

        const poz = Vector3.Zero();
        this.LineBox = LinesBuild.CreateDashedLines([poz, new Vector3(0, 1, 0),
            new Vector3(1, 1, 0), new Vector3(1, 0, 0), poz], Color3.FromHexString('#70D50F'), this.edgesWidth, scene, 40);

        this.LinePA = LinesBuild.CreateUpdateLines([poz, poz], Color3.FromHexString('#9270DD'), this.edgesWidth, this.LinePA, scene);
        this.LinePB = LinesBuild.CreateUpdateLines([poz, poz], Color3.FromHexString('#FFB100'), this.edgesWidth, this.LinePB, scene);
        this.LinePC = LinesBuild.CreateUpdateLines([poz, poz], Color3.FromHexString('#FF7000'), this.edgesWidth, this.LinePC, scene);
        this.LinePO = LinesBuild.CreateUpdateLines([poz, poz], Color3.FromHexString('#0091FF'), this.edgesWidth, this.LinePO, scene);

        this.LineAC = LinesBuild.CreateDashedLines([new Vector3(1, 0, 0), new Vector3(0, 1, 0)],
            Color3.FromHexString('#ff4a51'), this.edgesWidth, scene);
        this.LineBO = LinesBuild.CreateDashedLines([poz, new Vector3(1, 1, 0)],
            Color3.FromHexString('#ff4a51'), this.edgesWidth, scene);

        this.tipPImage = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${a}`, ImageLabel);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${b}`, ImageLabel);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${c}`, ImageLabel);

        const tipO = new Mesh('tipA');
        tipO.position = new Vector3(0.6, 0.5, 0);
        this.tipD = LabelUtils.CreateLabel(advancedTexture, tipO, 'D', options1);
        this.tipD.isVisible = false;
        this.tiptextP = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipP, `${p}`, ImageLabelP);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 2);
        this.initValue(scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint.x = startingPoint.x < 0 ? 0 : startingPoint.x > 1 ? 1 : startingPoint.x;
            startingPoint.y = startingPoint.y < 0 ? 0 : startingPoint.y > 1 ? 1 : startingPoint.y;
            currentMesh.position = startingPoint;
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        this.updateMeshVertData(this.LinePA, Vector3Utils.ToArray([this.tipP.position, new Vector3(0, 1, 0)]));
        this.updateMeshVertData(this.LinePB, Vector3Utils.ToArray([this.tipP.position, new Vector3(1, 1, 0)]));
        this.updateMeshVertData(this.LinePC, Vector3Utils.ToArray([this.tipP.position, new Vector3(1, 0, 0)]));
        this.updateMeshVertData(this.LinePO, Vector3Utils.ToArray([this.tipP.position, new Vector3(0, 0, 0)]));
    }

    Answer(i: number) {
        if (i === 1) {
            this.setMeshVisible([this.LinePA, this.LinePB, this.LinePC, this.LinePO, this.LineAC, this.LineBO], false);
            this.setGUIVisible([this.tiptextP, this.tipPImage, this.tipD], false);
        } else if (i === 2) {
            this.setMeshVisible([this.LinePA, this.LinePB, this.LinePC, this.LinePO], true);
            this.setMeshVisible([this.LineAC, this.LineBO], false);
            this.setGUIVisible([this.tiptextP, this.tipPImage], true);
            this.tipD.isVisible = false;
        } else if (i === 3) {
            this.setMeshVisible([this.LinePA, this.LinePB, this.LinePC, this.LinePO, this.LineAC, this.LineBO], true);
            this.tipD.isVisible = true;
        }
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
        this.updateLineData();
    }
}
