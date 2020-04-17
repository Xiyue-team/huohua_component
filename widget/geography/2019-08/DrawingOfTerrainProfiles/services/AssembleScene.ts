/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/9/29 21:10
 */
import Vue from 'vue';
import {
    Color3, Mesh, Vector3, Engine, HemisphericLight,
    Scene, MeshBuilder, LinesMesh, AbstractMesh, Texture, StandardMaterial, Vector2, DefaultRenderingPipeline, ShaderMaterial
} from '@babylonjs/core/Legacy/legacy';
import { Image, AdvancedDynamicTexture } from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Utils } from './Utils';
import { Dot } from './Dot';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';

import * as Oval from '../sub_static/image/Oval.png';
import * as dot from '../sub_static/image/dot.png';
import * as dotDown from '../sub_static/image/dotDown.png';
import * as dotMove from '../sub_static/image/dotMove.png';
import * as mapTex from '../sub_static/image/map.png';
import * as system from '../sub_static/image/system.png';
import * as line from '../sub_static/image/line.png';
import * as point from '../sub_static/point.json';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    edgesWidth = 6;

    tipA: Mesh; //拖拽点A
    tipB: Mesh; //拖拽点B
    tipP: Mesh; //拖拽点P
    dotA: Image;
    dotB: Image;
    dotP: Image;

    dots: Dot[] = [];

    lineLink: LinesMesh; //山轮廓线
    lineAB: LinesMesh; //点AB连线
    bgMat: StandardMaterial;
    systemMat: StandardMaterial; //坐标系材质
    lineMat: ShaderMaterial; //坐标系材质
    systemPlan: Mesh;
    bgPlan: Mesh;
    linePlan: Mesh;
    ribbonMat: StandardMaterial; //山形材质
    bCurve: Vector3[] = [];
    angline: Mesh; //山形
    drawLine = false;
    lineIndex = 0;
    // defaultPipeline: DefaultRenderingPipeline;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 窗口尺寸重置
     */
    resize() {
        super.resize();
        this.changeCameraSize(90, 80);
    }

    initGUI(advancedTexture: AdvancedDynamicTexture, scene: Scene) {
        this.tipA = new Mesh('tipA');
        this.tipB = new Mesh('tipB');
        this.tipP = Mesh.CreateSphere('tipP', 8, this.isMob ? 10 : 5, scene);

        this.tipB.position = new Vector3(75.2796, 5, -10);
        this.tipA.position = new Vector3(-65.6096, 5, -10);
        const option = { height: '80px', width: '80px', color: '#FFFFFF' };
        this.dotA = LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, option);
        this.dotB = LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, option);
        if (this.isMob && (window.screen.height > 499 || window.screen.width > 699)) {
            option.height = option.width = '160px';
        }
        this.dotP = LabelUtils.CreateDot(advancedTexture, this.tipP, dotDown, option);
        this.dotP.isVisible = false;
        this.setMeshVisible([this.tipP], false);
        this.lineAB = LinesBuild.CreateLines([this.tipA.position, this.tipB.position], Color3.Black(), this.edgesWidth, scene);
        this.lineAB.isVisible = false;
    }

    initPlan(scene: Scene) {
        this.ribbonMat = Utils.CreateLightMaterial(Color3.FromHexString('#d2e8b1'), scene);
        const bgTex = new Texture(mapTex, scene);
        bgTex.hasAlpha = true;
        this.bgMat = PlanUtils.CreateMaterial('bgMat', bgTex, scene);
        const systemTex = new Texture(system, scene);
        systemTex.hasAlpha = true;
        this.systemMat = PlanUtils.CreateMaterial('frontMat', systemTex, scene);

        const lineTex = new Texture(line, scene);
        lineTex.hasAlpha = true;
        this.lineMat = Utils.CreateMaterial(line, scene);

        const option = { width: 152, height: 63 };
        this.bgPlan = PlanUtils.CreatePlan(this.bgMat, new Vector3(0, 0, 0.5), option, scene);
        this.bgPlan.alphaIndex = 0;
        this.bgPlan.isPickable = false;

        this.systemPlan = PlanUtils.CreatePlan(this.systemMat, new Vector3(0, -60, 0.5), { width: 180, height: 46 }, scene);
        this.systemPlan.alphaIndex = 0;
        this.systemPlan.isPickable = false;

        this.linePlan = PlanUtils.CreatePlan(this.lineMat, new Vector3(0, -25, 0), { width: 152, height: 113 }, scene);
        this.linePlan.alphaIndex = 0;
        this.linePlan.isPickable = false;
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        const canvas = engine.getRenderingCanvas();
        scene.clearColor.set(1, 0.9882352941176471, 0.9215686274509803, 1);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.TargetCamera(scene, 90, 80);
        this.camera.position = new Vector3(10, -20, -20);
        this.initPlan(scene);

        const plan = MeshBuilder.CreatePlane('plan', { width: 300, height: 300 }, scene);
        plan.isVisible = false;

        this.createDots(advancedTexture);
        this.initGUI(advancedTexture, scene);
        this.addPointerEventListener(plan, canvas, scene);
        this.reset();

        scene.registerBeforeRender(() => {
            if (this.drawLine) {
                if (this.lineLink) {
                    this.lineLink.dispose();
                }
                if (this.lineIndex < this.bCurve.length - 4) {
                    this.lineIndex += 4;
                    const vec = [];
                    for (let i = 3; i < this.lineIndex; i += 4) {
                        vec.push(this.bCurve[i - 3], this.bCurve[i - 2], this.bCurve[i - 1], this.bCurve[i]);
                    }
                    this.lineLink = Utils.CreateLines(vec, Color3.Black(), this.edgesWidth, this.scene, 'DLineX2');
                } else {
                    this.drawLine = false;
                    this.lineMat.setFloat('isDull', 1);
                    this.angline.isVisible = true;
                    this.lineIndex = 0;
                    this.lineLink = Utils.CreateLines(this.bCurve, Color3.Black(), this.edgesWidth, this.scene, 'DLineX2');
                }
            }
        });
        return scene;
    }

    createDots(advancedTex: AdvancedDynamicTexture) {
        const vs = JSON.parse(JSON.stringify(point));
        const v = vs.point;
        this.bCurve = vs.curve;
        for (let i = 0; i < v.length; i++) {
            this.dots.push(
                new Dot(v[i].name, Oval, advancedTex, this.scene).initValue(Color3.Black(), new Vector3(v[i].x, v[i].y, 0)));
        }
        const po = [];
        for (let j = 0; j < this.bCurve.length; j++) {
            po.push([new Vector3(this.bCurve[j].x, this.bCurve[j].y, 0), new Vector3(this.bCurve[j].x, -81, 0)]);
        }
        this.angline = Mesh.CreateRibbon('ribbon', po, false, false, 0, this.scene, true, Mesh.DOUBLESIDE);
        this.angline.material = this.ribbonMat;
        this.angline.alphaIndex = 4;
    }

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh === this.tipP) {
            this.dotP.source = dotMove;
        }
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (this.viewModel.sectionActived && this.tipP.isPickable) {
            startingPoint.y = startingPoint.y > this.tipA.position.y ? this.tipA.position.y :
                startingPoint.y < -81 ? -81 : startingPoint.y;
            currentMesh.position.y = startingPoint.y;
            const v = Vector3.Distance(this.tipP.position, this.tipA.position);
            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].updateArrow(v);
            }
            this.lineMat.setVector2('pos', new Vector2(5, currentMesh.position.y));
            if (Math.abs(this.tipP.position.y + 81) < 0.0001) {
                this.viewModel.connectDisabled = false;
                this.tipP.isPickable = false;
                this.viewModel.gray = true;
                this.viewModel.msgShow = false;
                this.dotP.isVisible = false;
            }
        }
    }

    section() {
        this.setGUIVisible([this.dotA, this.dotB], false);
        this.setMeshVisible([this.systemPlan, this.lineAB], true);
        this.viewModel.perpendicularDisabled = false;
        this.viewModel.gray = true;
    }

    perpendicular() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].setLabelVisible(true);
        }
        this.dotP.source = dotDown;
        this.dotP.isVisible = true;
        this.tipP.isPickable = true;
        this.tipP.position = this.tipA.position.clone();
        this.viewModel.gray = false;
        this.viewModel.msgShow = true;
    }

    connect() {
        this.drawLine = true;
        this.viewModel.gray = false;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipB.position = new Vector3(75.2796, 5, -10);
        this.tipA.position = new Vector3(-65.6096, 5, -10);
        this.drawLine = false;
        this.lineIndex = 0;
        this.dotP.isVisible = false;
        this.setGUIVisible([this.dotA, this.dotB], true);
        this.setMeshVisible([this.systemPlan, this.lineAB, this.angline], false);
        if (this.lineLink) { this.lineLink.dispose(); }
        this.tipP.isPickable = false;
        this.viewModel.gray = false;
        this.lineMat.setFloat('isDull', 0);
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].reset();
        }
        this.lineMat.setVector2('pos', new Vector2(5, 5));
    }

}

