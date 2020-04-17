/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Mesh, TransformNode, AbstractMesh, Engine, LinesMesh, Vector3, Color3, Scene
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import $ from 'jquery-ts';

import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { CoordinateSystem } from './CoordinateSystem';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 10;
    edgesWidth = 6;
    tipAA: Mesh;
    tipA: Mesh;
    labelA: GUI.StackPanel;
    tiptextA: GUI.TextBlock;

    tipBB: Mesh;
    tipB: Mesh;
    labelB: GUI.StackPanel;
    tiptextB: GUI.TextBlock;

    angleA: Mesh;
    angleB: Mesh;

    tip = $('#tip');
    LineA: LinesMesh;
    LineB: LinesMesh;
    CircleA: LinesMesh;
    CircleB: LinesMesh;
    CircleAR = 1;
    CircleBR = 1.5;
    CircleTextA: GUI.TextBlock;  //角度A值
    CircleTextB: GUI.TextBlock;  //角度B值
    offsetR = 0.7;

    CircleAngleA = 135;
    CircleAngleB = 45;
    Aaxi: TransformNode;
    Baxi: TransformNode;

    colorHexStringA = '#6ECFFF';
    colorHexStringB = '#9BF23B';

    colorA: Color3;
    colorB: Color3;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化数值
     * @param engine 
     */
    initValue(scene: Scene) {
        this.colorA = Color3.FromHexString(this.colorHexStringA);
        this.colorB = Color3.FromHexString(this.colorHexStringB);

        this.tipA = Mesh.CreateSphere('tipA', 8, 1.4, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.4, scene);
        this.tipAA = Mesh.CreateSphere('tiA', 8, 0.4, scene);
        this.tipBB = Mesh.CreateSphere('tiB', 8, 0.4, scene);
        this.angleA = new Mesh('tiB');
        this.angleB = new Mesh('tiB');
        const option2 = { color: this.colorHexStringA, fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'normal' };
        this.labelA = FastCreater.StackPanel('labelA', '340px', '60px', false);
        this.labelA.linkOffsetX = '190px';
        this.tiptextA = FastCreater.TextBlock('( cosα,sinα )', option2);

        this.labelB = FastCreater.StackPanel('labelB', '340px', '60px', false);
        this.labelB.linkOffsetX = '190px';
        option2.color = this.colorHexStringB;
        this.tiptextB = FastCreater.TextBlock('( cosβ,sinβ )', option2);
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
        this.camera.position.x = 11;

        this.initValue(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        // 创建坐标系
        CoordinateSystem.CreateNormalizeSystem('#6f6f6f', '#ffffff',
            this.edgesWidth, advancedTexture, scene, '18px', 'Times New Roman', 'italic');
        FormulaLineUtils.CreateCircle(this.r, 360, new Color3(1, 1, 1), this.edgesWidth, scene);

        this.CircleA = FormulaLineUtils.CreateUpdateCircle(this.CircleAR, this.CircleAngleA,
            this.colorA, this.edgesWidth, this.CircleA, scene);
        this.CircleB = FormulaLineUtils.CreateUpdateCircle(this.CircleBR, this.CircleAngleB,
            this.colorB, this.edgesWidth, this.CircleB, scene);

        this.LineA = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorA, this.edgesWidth, this.LineA, scene);
        this.LineB = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], this.colorB, this.edgesWidth, this.LineB, scene);

        const lightmaterialA = MaterialLab.CreateLightMaterial(this.colorA, scene);
        const lightmaterialA2 = MaterialLab.CreateLightMaterial(this.colorA, scene, 0.3);
        const lightmaterialB = MaterialLab.CreateLightMaterial(this.colorB, scene);
        const lightmaterialB2 = MaterialLab.CreateLightMaterial(this.colorB, scene, 0.3);

        const option2 = { color: this.colorHexStringA, fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic' };

        const tiptextA = FastCreater.TextBlock('A', option2);
        option2.color = this.colorHexStringB;
        const tiptextB = FastCreater.TextBlock('B', option2);

        LabelUtils.CreateLabelWithMeshAndTexts(advancedTexture, lightmaterialA, this.tipAA, this.tipA, null, Vector3.Zero(),
            this.labelA, [tiptextA, this.tiptextA], null, lightmaterialA2);
        LabelUtils.CreateLabelWithMeshAndTexts(advancedTexture, lightmaterialB, this.tipBB, this.tipB, null, Vector3.Zero(),
            this.labelB, [tiptextB, this.tiptextB], null, lightmaterialB2); //创建场景B标签

        const arrow = Mesh.CreateCylinder('arrowA', 1, 0, 1, 4, 1, scene);
        arrow.position = new Vector3(this.r - 0.5, 0, 0);
        arrow.rotation = new Vector3(0, 0, -Math.PI / 2);
        arrow.material = lightmaterialA;
        arrow.isPickable = false;

        const arrowb = arrow.clone('arrowB');
        arrowb.material = lightmaterialB;
        this.Aaxi = new TransformNode('a');
        arrow.setParent(this.Aaxi);
        this.Baxi = new TransformNode('b');
        arrowb.setParent(this.Baxi);

        const options = {
            height: 30, width: 70, color: this.colorHexStringA,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        this.CircleTextA = LabelUtils.CreateLabel(advancedTexture, this.angleA, 'α', options);
        options.color = this.colorHexStringB;
        this.CircleTextB = LabelUtils.CreateLabel(advancedTexture, this.angleB, 'β', options);

        this.addPointerEventListener(canvas, scene);
        this.tiptextA.width = this.tiptextB.width = '200px';
        tiptextA.width = tiptextB.width = '30px';
        this.tiptextA.height = this.tiptextB.height = '30px';
        tiptextA.height = tiptextB.height = '30px';
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            this.updateLineData(startingPoint, currentMesh);
        }
    }
    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (currentMesh != null) {
            const a = Vector3.Dot(new Vector3(1, 0, 0), startingPoint.scale(1).normalize());
            const xV: number = startingPoint.y > 0 ? Math.acos(a) * 180 / Math.PI : 360 - Math.acos(a) * 180 / Math.PI;
            if (currentMesh === this.tipA) {
                this.CircleAngleA = xV;
            } else if (currentMesh === this.tipB) {
                this.CircleAngleB = xV;
            }
        }
        this.tipA.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleA);
        this.updateMeshVertData(this.LineA, Vector3Utils.ToArray([Vector3.Zero(), this.tipA.position]));
        this.updateMeshVertData(this.CircleA,
            Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.CircleAR, this.CircleAngleA)));
        this.angleA.position = FormulasUtils.GetCirclePoint(this.CircleAR + this.offsetR, this.CircleAngleA / 2);
        this.Aaxi.rotation = new Vector3(0, 0, Math.PI * this.CircleAngleA / 180);

        this.tipB.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleB);
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([Vector3.Zero(), this.tipB.position]));
        this.updateMeshVertData(this.CircleB,
            Vector3Utils.ToArray(FormulasUtils.GetCircleUpdateVertices(this.CircleBR, this.CircleAngleB)));
        this.angleB.position = FormulasUtils.GetCirclePoint(this.CircleBR + this.offsetR, this.CircleAngleB / 2);
        this.Baxi.rotation = new Vector3(0, 0, Math.PI * this.CircleAngleB / 180);
    }
    /**
     * '证明'按钮
     */
    ButtonEvent() {
        if (this.viewModel.buttonActived) {
            this.tip.show();
            this.tiptextA.isVisible = this.tiptextB.isVisible = true;
        } else {
            this.tip.hide();
            this.tiptextA.isVisible = this.tiptextB.isVisible = false;
        }
    }
    /**
     * 重置按钮按下
     */
    reset(): void {
        this.CircleAngleA = 135;
        this.CircleAngleB = 45;
        this.viewModel.buttonActived = false;
        this.ButtonEvent();
        this.updateLineData(null, null);
    }
}
