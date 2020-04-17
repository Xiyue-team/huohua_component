/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Mesh, LinesMesh, Color3, Vector3, TransformNode, AbstractMesh, Scene, Engine } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { NormalizeSystem } from './NormalizeSystem';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as pi from '../sub_static/label/pi.png';
import * as pif from '../sub_static/label/pif.png';
import * as pihalf from '../sub_static/label/pihalf.png';
import * as pihalff from '../sub_static/label/pihalff.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 1;
    edgesWidth = 6;
    tipP: Mesh;
    LineB: LinesMesh;
    LineBf: LinesMesh;
    LineA: LinesMesh;
    angle = 0;
    hexOrange = '#ED7916';
    hexGreen = '#50E3C2';
    hexGray = '#979797';
    hexBlue = '#6ECFFF';
    colorOrange: Color3;
    colorGreen: Color3;
    colorGray: Color3;
    colorBlue: Color3;

    func3: LinesMesh;
    func1: LinesMesh;
    func2: LinesMesh;
    HalfPi: LinesMesh;
    OneHalfPi: LinesMesh;

    root: TransformNode;
    tempAngle: number;
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
        this.changeCameraSize();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorOrange = Color3.FromHexString(this.hexOrange);
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorGray = Color3.FromHexString(this.hexGray);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        if (this.isMob && (window as any)['env'].browserInfo.isSmallDevice) {
            this.tipP = Mesh.CreateSphere('tipP', 8, 1.2, scene);
        } else {
            this.tipP = Mesh.CreateSphere('tipP', 8, 0.6, scene);
        }
        this.tipP.isVisible = false;
        this.root = new TransformNode('root');
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene) {
        this.initColor();
        this.initMesh(scene);
    }

    createSystemLabel(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        const halfPI = new Mesh('O');
        halfPI.position = new Vector3(Math.PI / 2, 0.1, 0);
        halfPI.setParent(this.root);

        const PI = halfPI.clone('', this.root);
        PI.position = new Vector3(Math.PI, 0.1, 0);
        const PIf = halfPI.clone('', this.root);
        PIf.position = new Vector3(Math.PI * 2, 0.1, 0);
        const halfPIf = halfPI.clone('', this.root);
        halfPIf.position = new Vector3(Math.PI * 3 / 2, 0.1, 0);

        this.HalfPi.setParent(this.root);
        this.OneHalfPi.setParent(this.root);
        this.HalfPi.position = new Vector3(Math.PI / 2, 0.1, 0);
        this.OneHalfPi.position = new Vector3(Math.PI * 3 / 2, 0.1, 0);
        const LabelA = new Mesh('LabelA');
        LabelA.position = new Vector3(this.r + 0.6, 0.1, 0);

        const ImageLabelOptions = {
            height: '55px', width: '55px', color: '#FFFFFF',
            linkOffsetX: '0px', linkOffsetY: '35px'
        };
        const options = {
            height: '30px', width: '30px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const linkOffsetX = 40;

        LabelUtils.CreateLabelWithOffset(advancedTexture, LabelA, 'A', 15, 20, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipP, 'P', linkOffsetX, 0, options);
        const dop = LabelUtils.CreateImageLabel(advancedTexture, this.tipP, dot, ImageLabelOption);
        dop.hoverCursor = 'pointer';
        dop.isPointerBlocker = true;
        LabelUtils.CreateImageLabelLeft(advancedTexture, halfPI, pihalf, ImageLabelOptions);
        LabelUtils.CreateImageLabelLeft(advancedTexture, PI, pi, ImageLabelOptions);
        LabelUtils.CreateImageLabelLeft(advancedTexture, PIf, pif, ImageLabelOptions);
        LabelUtils.CreateImageLabelLeft(advancedTexture, halfPIf, pihalff, ImageLabelOptions);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 8);
        this.camera.position.x = 4;

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        NormalizeSystem.CreateNormalizeSystem3('#6f6f6f', this.edgesWidth, scene);
        const r = NormalizeSystem.CreateNormalizeSystem5('#6f6f6f', '#ffffff', this.edgesWidth,
            advancedTexture, scene, '18px', 'Times New Roman', 'italic');
        this.initValue(scene);
        // 创建坐标系
        FormulaLineUtils.CreateCircle(this.r, 360, this.colorOrange, this.edgesWidth, scene);
        r.setParent(this.root);
        this.HalfPi = LinesBuild.CreateDashedLines([new Vector3(0, 10, 0), new Vector3(0, -10, 0)],
            this.colorGray, this.edgesWidth, scene, 60);
        this.OneHalfPi = LinesBuild.CreateDashedLines([new Vector3(0, 10, 0), new Vector3(0, -10, 0)],
            this.colorGray, this.edgesWidth, scene, 60);

        this.createSystemLabel(advancedTexture, scene);
        this.LineB = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.One()], this.colorOrange, this.edgesWidth, this.LineB, scene);
        this.LineBf = LinesBuild.createDashLines([Vector3.Zero(), Vector3.One()], this.colorOrange, this.edgesWidth, scene, 20, 20);
        this.LineA = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.One()], this.colorGreen, this.edgesWidth, this.LineA, scene);

        this.func1 = LinesBuild.CreateUpdateLines(FormulasUtils.GetTanVerts(0, this.angle, this.r),
            this.colorGreen, this.edgesWidth, this.func1, scene);
        this.func1.setParent(this.root);
        this.func2 = LinesBuild.CreateUpdateLines(FormulasUtils.GetTanVerts(0, this.angle, this.r),
            this.colorGreen, this.edgesWidth, this.func2, scene);
        this.func2.setParent(this.root);
        this.func3 = LinesBuild.CreateUpdateLines(FormulasUtils.GetTanVerts(0, this.angle, this.r),
            this.colorGreen, this.edgesWidth, this.func3, scene);
        this.func3.setParent(this.root);
        this.root.position.x = 5;
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 更新线条
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        let ang = Math.atan2(startingPoint.y, startingPoint.x) * 180 / Math.PI;
        ang = ang < 0 ? ang + 360 : ang;
        let stepV = ang - this.tempAngle;
        stepV = stepV > 270 ? stepV - 360 : stepV < -270 ? stepV + 360 : stepV;
        if (stepV > 20 || stepV < -20) {

        } else {
            this.angle += stepV;
            this.tempAngle = ang;
        }
        currentMesh.position = FormulasUtils.GetCirclePoint(this.r, this.angle > 360 || this.angle < 0 ? 0 : this.angle);
        this.updateLineData();
    }

    onPointerUp(evt: any, pickmesh: AbstractMesh, scene: Scene): void {
        this.angle = this.angle > 360 ? 360 : this.angle < 0 ? 0 : this.angle;
        this.tempAngle = this.angle;
    }

    updateLineData(): void {
        const posP = this.tipP.position;
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([Vector3.Zero(), posP.add(Vector3.Normalize(posP))]));
        const k = posP.x === 0 ? Infinity : posP.y / posP.x;
        let y = k === Infinity ? posP.y > 0 ? 100000 : -100000 : this.r * k;
        y = y > 100000 ? 100000 : y < -100000 ? -100000 : y;
        this.updateMeshVertData(this.LineA, Vector3Utils.ToArray([new Vector3(this.r, 0, 0), new Vector3(this.r, y, 0)]));
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([Vector3.Zero(), posP.x < 0 ?
            posP.add(Vector3.Normalize(posP)) : new Vector3(this.r, y, 0)]));
        this.LineBf.dispose();
        const nb2 = Math.floor(new Vector3(this.r, y, 0).length());
        this.LineBf = LinesBuild.createDashLines([new Vector3(this.r, y, 0), Vector3.Zero()],
            this.colorOrange, this.edgesWidth, this.scene, nb2 > 5 ? nb2 : 5, nb2);
        this.LineBf.isVisible = posP.x < 0;
        this.creatLine(this.angle);
    }
    /**
     *
     * @param angl
     * @param ang
     */
    creatLine(ang: number) {
        this.updateMeshVertData(this.func1, Vector3Utils.ToArray(FormulasUtils.GetTanVerts(0, ang >= 90 ? 89 : ang, this.r)));
        this.updateMeshVertData(this.func2, Vector3Utils.ToArray(FormulasUtils.GetTanVerts(91, ang >= 270 ? 269 : ang, this.r)));
        this.updateMeshVertData(this.func3, Vector3Utils.ToArray(FormulasUtils.GetTanVerts(271, ang >= 360 ? 360 : ang, this.r)));
        this.func1.isVisible = ang > 0;
        this.HalfPi.isVisible = this.func2.isVisible = ang > 90;
        this.OneHalfPi.isVisible = this.func3.isVisible = ang > 270;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tempAngle = this.angle = 0;
        this.tipP.position = FormulasUtils.GetCirclePoint(this.r, this.angle);
        this.setMeshVisible([this.func3, this.func2, this.HalfPi, this.OneHalfPi, this.LineBf], false);
        this.updateLineData();
    }
}
