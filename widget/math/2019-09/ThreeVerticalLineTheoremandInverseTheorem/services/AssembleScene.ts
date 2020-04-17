/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/20 10:10
 */
import Vue from 'vue';
import {
    Vector3, Color3, Mesh, LinesMesh, Ray, MeshBuilder, Color4, Scene, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { PointerHandler, PointerEvent } from './PointerEvent';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base3DScene implements PointerHandler {

    viewModel: ViewModel;
    edgesWidth = 10;
    hexBlue = '#AFD981';
    hexOrange = '#ED7916';
    hexPurple = '#B499ED';

    colorBlue: Color3;
    colorOrange: Color3;
    colorPurple: Color3;

    tipP: Mesh;
    tiptextP: GUI.TextBlock;
    tipA: Mesh;
    tiptextA: GUI.TextBlock;
    tipO: Mesh;
    tipAlpha: Mesh;
    tipHand: Mesh;
    dotP: GUI.Control; //p控制柄
    dotHand: GUI.Control; //旋转柄

    LineOP: LinesMesh;
    LineOP1: LinesMesh;
    LineOP2: LinesMesh;
    LineAP: LinesMesh;
    LineOA: LinesMesh;
    LineAOL: LinesMesh;
    LinePOL: LinesMesh;
    LinePAO: LinesMesh;
    LineL: LinesMesh;

    IsMoved = true;
    planXZ: Mesh; //平面
    sphere: Mesh; //球碰撞器
    pos: Array<Vector3> = []; //线顶点数据
    animaTimer: any = null; //计时器
    analytic = 1;
    screenW = 0;
    screenH = 0;
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 初始化颜色 
     */
    initColor() {
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorOrange = Color3.FromHexString(this.hexOrange);
        this.colorPurple = Color3.FromHexString(this.hexPurple);
    }

    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipA = new Mesh('A');
        this.tipO = new Mesh('O');
        this.tipHand = Mesh.CreateSphere('vipHand', 8, 1.5, scene);
        this.tipAlpha = new Mesh('Alpha');
        this.tipAlpha.position = new Vector3(-15, 0, -10);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.setMeshVisible([this.tipP, this.tipHand], false);
        this.tipA.position = this.tipP.position = new Vector3(5, 5, 0);
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
            height: '30px', width: '30px', color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        this.tiptextP = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', 30, 0, options);
        this.tiptextA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', 30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipO, 'O', 30, 0, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipAlpha, 'α', 30, 0, options);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        this.dotP = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);
        this.dotHand = LabelUtils.CreateImageLabel(advancedTexture, this.tipHand, `${dot}`, ImageLabelOption);
        this.LineOP = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.tipP.position],
            this.colorOrange, this.edgesWidth, this.LineOP, scene);
        this.LineOP1 = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), this.tipP.position], 20),
            this.colorOrange, this.edgesWidth, this.LineOP1, scene);
        this.LineOP2 = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.tipP.position],
            this.colorOrange, this.edgesWidth, this.LineOP2, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.tipA.position, this.tipP.position],
            this.colorOrange, this.edgesWidth, this.LineAP, scene);
        this.LineOA = LinesBuild.CreateUpdateLines([this.tipA.position, Vector3.Zero()],
            this.colorOrange, this.edgesWidth, this.LineOA, scene);
        this.LineAOL = this.CreateUpdateLines([new Vector3(0.5, 0, 0), new Vector3(0.5, 0, 0.5), new Vector3(0, 0, 0.5)],
            this.colorPurple, this.edgesWidth, this.LineAOL, scene);
        this.LinePOL = this.CreateUpdateLines(
            [Vector3.Normalize(this.tipP.position).scale(0.5),
            Vector3.Normalize(this.tipP.position).scale(0.5).add(new Vector3(0, 0, 0.5)),
            new Vector3(0, 0, 0.5)],
            this.colorPurple, this.edgesWidth, this.LinePOL, scene);

        this.LinePAO = this.CreateUpdateLines([new Vector3(0, 0, 0.5), new Vector3(0, 0, 0.5), new Vector3(0, 0, 0.5)],
            this.colorOrange, this.edgesWidth, this.LinePAO, scene);

        this.LineL = this.CreateUpdateLines([new Vector3(0, 0, 4), new Vector3(0, 0, -4)],
            this.colorPurple, this.edgesWidth, this.LineL, scene, 'vip1');
        this.LineL.position.x = 6;
        this.tipHand.position = new Vector3(6, 0, -4);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.LineL, 'l', 15, 0, options);

    }

    CreateUpdateLines(vertices: Vector3[], color: Color3, edgesWidth: number, Lines: LinesMesh,
        scene: Scene, name = 'lines'): LinesMesh {
        Lines = MeshBuilder.CreateLines(name, { points: vertices, updatable: true, instance: Lines }, scene);
        Lines.color = color;
        Lines.enableEdgesRendering();
        Lines.edgesColor = Color4.FromColor3(color, 1);
        Lines.edgesWidth = edgesWidth;
        return Lines;
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.camera = this.createArcRotateCamera4Math(scene);
        this.initValue(scene);

        const planMaterialXZ = MaterialLab.CreateLightMaterial(this.colorBlue, scene, 0.6);
        planMaterialXZ.backFaceCulling = false;
        this.planXZ = Mesh.CreateGround('plan', 30, 20, 2);
        this.planXZ.material = planMaterialXZ;
        this.sphere = Mesh.CreateSphere('plan', 32, 12, scene);
        this.sphere.isVisible = false;
        new PointerEvent().addPointerEventListener('tip', this.sphere, this.planXZ, canvas, this, this.camera, scene);
        new PointerEvent().addPointerEventListener('vip', this.planXZ, this.sphere, canvas, this, this.camera, scene);
        scene.registerBeforeRender(() => {
            if (window.innerHeight !== this.screenH || window.innerWidth !== this.screenW) {
                this.screenH = window.innerHeight;
                this.screenW = window.innerWidth;
                this.resize();
            }
            this.rayCasts();
            this.animationPlay();
        });
        this.reset();
        return scene;
    }


    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh, plan: Mesh): void {
        if (plan === this.sphere) {
            startingPoint.y = startingPoint.y < 0 ? 0 : startingPoint.y;
            currentMesh.position = startingPoint;
            this.updateLineData();
        } else if (plan === this.planXZ) {
            if (currentMesh === this.LineL) {
                const dif = startingPoint.subtract(currentMesh.position).scale(1);
                currentMesh.position = startingPoint;
                this.tipHand.position = this.tipHand.position.add(dif);
            } else {
                const dif1 = this.LineL.position.add(Vector3.Normalize(startingPoint.subtract(this.LineL.position)).scale(4));
                currentMesh.position = dif1;
                const dif = Vector3.Normalize(this.tipHand.position.subtract(this.LineL.position));
                let ang = Vector3Utils.GetAngleArc(new Vector3(0, 0, 1), dif);
                ang = dif.x > 0 ? ang : Math.PI * 2 - ang;
                this.LineL.rotation.y = ang;
            }
        }
    }

    /**
     * 投影
     */
    rayCasts() {
        let pos = this.tipP.position.scale(-1);
        if (this.pos.length > 0) {
            for (let i = 0; i < this.pos.length; i++) {
                const tpos = this.rayCast(this.pos[i]);
                if (tpos !== null) {
                    pos = tpos;
                }
            }
        }
        this.updateMeshVertData(this.LineOP2, Vector3Utils.ToArray([this.tipP.position.scale(-1), pos]));
    }

    /**
 * 投影
 */
    rayCast(vec: Vector3): Vector3 {
        const direction = Vector3.Normalize(this.camera.position.subtract(vec));
        const length = 100;
        const ray = new Ray(vec, direction, length);
        const hit = this.scene.pickWithRay(ray);
        if (hit.pickedMesh) {
            return vec;
        }
        return null;
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        this.pos = [];
        this.tipA.position = new Vector3(this.tipP.position.x, 0, this.tipP.position.z);
        this.pos = Vector3Utils.ToMoreVector3([Vector3.Zero(), this.tipP.position.scale(-1)], 20);
        this.updateMeshVertData(this.LineOP, Vector3Utils.ToArray([Vector3.Zero(), this.tipP.position]));
        this.updateMeshVertData(this.LineOP1, Vector3Utils.ToArray(this.pos));
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipA.position, this.tipP.position]));
        this.updateMeshVertData(this.LineOA, Vector3Utils.ToArray([this.tipA.position, Vector3.Zero()]));
        const dis = Vector3.Distance(this.tipA.position, this.tipP.position);
        const notipa = Vector3.Normalize(this.tipA.position).scale(dis > 0.5 ? 0.5 : dis);
        const noap = Vector3.Normalize(this.tipP.position.subtract(this.tipA.position)).scale(dis > 0.5 ? 0.5 : dis);
        this.updateMeshVertData(this.LinePAO, Vector3Utils.ToArray([this.tipA.position.subtract(notipa),
        this.tipA.position.subtract(notipa).add(noap),
        this.tipA.position.add(noap)]));
    }

    /**
     * 答案步骤
     * @param i
     * @param step
     */
    Answer(i: number, step: number) {
        this.LineL.isPickable = this.tipP.isPickable = this.tipHand.isPickable = true;
        this.setGUIVisible([this.dotP, this.dotHand], true);
        this.setMeshVisible([this.LinePOL, this.LineAOL], false);
        if (this.animaTimer != null) {
            clearTimeout(this.animaTimer);
        }
        if (step === 1) {
            this.IsMoved = false;
            this.setMeshVisible([this.LineOA, this.LineAP, this.LinePAO], false);
            this.updatePos();
            this.tiptextA.isVisible = false;
        } else if (step === 2) {
            this.setMeshVisible([this.LineOA, this.LineAP, this.LinePAO], true);
            this.updatePos();
            this.tiptextA.isVisible = true;
            this.IsMoved = false;
        } else if (step === 3) {
            this.setMeshVisible([this.LineOA, this.LineAP, this.LinePAO], true);
            this.updatePos();
            this.tiptextA.isVisible = true;
            this.IsMoved = true;
            this.setGUIVisible([this.dotP, this.dotHand], false);
            this.LineL.isPickable = this.tipP.isPickable = this.tipHand.isPickable = false;
        }
        this.analytic = i;
        this.updateLineData();
    }

    updatePos() {
        this.tipP.position = new Vector3(5, 5, 0);
        this.LineL.rotation.y = 0;
        this.LineL.position = new Vector3(6, 0, 0);
        this.tipHand.position = new Vector3(6, 0, -4);
    }

    /**
 * 播放动画
 */
    animationPlay() {
        if (this.IsMoved) {
            if (this.LineL.position.length() !== 0) {
                this.LineL.position = this.LineL.position.subtract(this.LineL.position.scale(0.2));
                if (this.LineL.position.length() < 0.01) {
                    this.LineL.position = Vector3.Zero();
                    this.IsMoved = false;
                    if (this.analytic === 1) {
                        this.LineAOL.isVisible = true;
                        this.animaTimer = setTimeout(() => { this.LinePOL.isVisible = true; }, 500);
                    } else if (this.analytic === 2) {
                        this.LinePOL.isVisible = true;
                        this.animaTimer = setTimeout(() => { this.LineAOL.isVisible = true; }, 500);
                    }
                }
            }
        }
    }
    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1, 1);
    }
}
