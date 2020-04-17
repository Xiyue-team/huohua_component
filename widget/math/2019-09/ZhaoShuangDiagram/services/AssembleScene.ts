/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
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
import * as labela from '../sub_static/a.png';
import * as labelb from '../sub_static/b.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexRed = '#EB9DB0';
    hexBlue = '#A6F1FF';
    hexYellow = '#E4FF8C';
    colorRed: Color3;
    colorBlue: Color3;
    colorYellow: Color3;

    //点A
    tipA: Mesh;

    //四边形内部线条
    LineA1: LinesMesh;
    LineA2: LinesMesh;
    LineA3: LinesMesh;
    LineA4: LinesMesh;
    LineAngle: LinesMesh;
    //根号A B 标签
    imgA: Mesh;
    imgB: Mesh;
    //四边形
    ribbonOut: Mesh;
    ribbonIn: Mesh;
    offset = 3;
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
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.imgA = new Mesh('a');
        this.imgB = new Mesh('b');
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipA.position = new Vector3(-7.25, -6.55, 0);
        this.tipA.isVisible = false;
        const mata1 = MaterialLab.CreateLightMaterial(this.colorRed, scene);
        const mata2 = MaterialLab.CreateLightMaterial(this.colorBlue, scene);

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
        const poz = Vector3.Zero();
        this.LineA1 = LinesBuild.CreateUpdateLines([poz, poz], Color3.White(), this.edgesWidth, this.LineA1, scene);
        this.LineA2 = LinesBuild.CreateUpdateLines([poz, poz], Color3.White(), this.edgesWidth, this.LineA2, scene);
        this.LineA3 = LinesBuild.CreateUpdateLines([poz, poz], Color3.White(), this.edgesWidth, this.LineA3, scene);
        this.LineA4 = LinesBuild.CreateUpdateLines([poz, poz], Color3.White(), this.edgesWidth, this.LineA4, scene);
        this.LineAngle = LinesBuild.CreateUpdateLines([poz, poz, poz], this.colorYellow, this.edgesWidth, this.LineAngle, scene);
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
            height: '30px', width: '70px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageOption = { height: '40px', width: '40px', color: '#FFFFFF', linkOffsetX: '20px', linkOffsetY: '0px' };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            ImageOption.height = ImageOption.width = '80px';
            options.fontSize = '48px';
        }

        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', 30, 30, options);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabelLeft(advancedTexture, this.imgA, `${labela}`, ImageOption);
        LabelUtils.CreateImageLabelLeft(advancedTexture, this.imgB, `${labelb}`, ImageOption);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 15);
        this.camera.position.y = -5;
        this.initValue(scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            startingPoint.y = startingPoint.y > 3 - this.offset ? startingPoint.y = 3 - this.offset :
                startingPoint.y < -8 ? -8 : startingPoint.y;
            startingPoint.x = startingPoint.x > - this.offset ? startingPoint.x = - this.offset :
                startingPoint.x < -12 ? -12 : startingPoint.x;
            if (Math.abs(-startingPoint.x - 3 + startingPoint.y) < 0.2) {
                startingPoint.x = startingPoint.y - 3;
            }
            currentMesh.position = startingPoint;
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const pos = this.tipA.position;
        const a = -pos.x;
        const b = 3 - pos.y;

        const lefttop = new Vector3(pos.x, pos.y, 0);
        const righttop = new Vector3(0, 3, 0);
        const leftbottom = new Vector3(b - a, pos.y - a, 0);
        const rightbottom = new Vector3(b, pos.y - a + b, 0);
        this.ribbonOut = MeshBuilder.CreateRibbon('ribbon',
            { pathArray: [[lefttop, righttop], [leftbottom, rightbottom]], instance: this.ribbonOut });

        const ilefttop = new Vector3(b - a, pos.y, 0);
        const irighttop = new Vector3(0, pos.y, 0);
        const ileftbottom = new Vector3(b - a, b - a + pos.y, 0);
        const irightbottom = new Vector3(0, b - a + pos.y, 0);

        this.ribbonIn = MeshBuilder.CreateRibbon('ribbon', {
            pathArray: [[ilefttop, irighttop], [ileftbottom, irightbottom]], instance: this.ribbonIn
        });
        this.imgA.position = lefttop.add(irighttop).scale(0.5).subtract(new Vector3(0, 0.8, 0));
        this.imgB.position = righttop.add(irighttop).scale(0.5).add(new Vector3(0.5, 0, 0));
        this.updateMeshVertData(this.LineAngle, Vector3Utils.ToArray([lefttop, irighttop, righttop]));
        if (this.tipA.position.y > b - a + pos.y) {
            this.updateMeshVertData(this.LineA1, Vector3Utils.ToArray([lefttop, irighttop]));
            this.updateMeshVertData(this.LineA2, Vector3Utils.ToArray([righttop, irightbottom]));
            this.updateMeshVertData(this.LineA3, Vector3Utils.ToArray([leftbottom, ilefttop]));
            this.updateMeshVertData(this.LineA4, Vector3Utils.ToArray([rightbottom, ileftbottom]));
        } else {
            this.updateMeshVertData(this.LineA1, Vector3Utils.ToArray([lefttop, ilefttop]));
            this.updateMeshVertData(this.LineA2, Vector3Utils.ToArray([righttop, irighttop]));
            this.updateMeshVertData(this.LineA3, Vector3Utils.ToArray([leftbottom, ileftbottom]));
            this.updateMeshVertData(this.LineA4, Vector3Utils.ToArray([rightbottom, irightbottom]));
        }
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.updateLineData();
    }
}
