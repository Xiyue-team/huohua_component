/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/11/6 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Engine
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexGreen = '#7ED321';
    hexBlue = '#179DF5';
    colorGreen: Color3;
    colorBlue: Color3;

    tipC: Mesh; //点A
    tipB: Mesh; //点B
    tipA: Mesh; //点C
    LineCAB: LinesMesh; //线CAB
    LineCB: LinesMesh; //线CB

    CircleC: LinesMesh;

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
     * 初始化颜色
     */
    initColor() {
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipB = new Mesh('B');
        if (this.isMob) {
            this.tipC = Mesh.CreateSphere('tipC', 8, 3, scene);
        } else {
            this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        }

        this.tipA = new Mesh('A');
        this.tipC.isVisible = false;
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '30px', color: this.hexBlue,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        let linkOffsetX = 30;
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = options.width = '45px';
            options.fontSize = '40px';
            linkOffsetX = 55;
        }

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot2, ImageLabelOption);
        const dotImage = LabelUtils.CreateImageLabel(advancedTexture, this.tipC, dot, ImageLabelOption);
        dotImage.hoverCursor = 'pointer';
        dotImage.isPointerBlocker = true;
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', linkOffsetX, linkOffsetX, options);
        options.color = this.hexGreen;
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', linkOffsetX, linkOffsetX, options);
        LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipC, 'C', linkOffsetX, 0, options);
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
        this.CircleC = FormulaLineUtils.CreateDashedUpdateCircle(10, 361,
            this.colorBlue.subtract(new Color3(0.2, 0.2, 0.2)), this.CircleC, this.edgesWidth, scene);
        this.CircleC.isVisible = false;

        const zeroP = Vector3.Zero();
        this.LineCAB = LinesBuild.CreateUpdateLines([zeroP, zeroP, zeroP], this.colorBlue, this.edgesWidth, this.LineCAB, scene);
        this.LineCB = LinesBuild.CreateUpdateLines([zeroP, zeroP], this.colorGreen, this.edgesWidth, this.LineCB, scene);
        const v = FormulasUtils.GetCircleUpdateVertices(10, 360);

        this.addPointerEventListener(canvas, scene);
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
            startingPoint.y = Math.abs(startingPoint.y) < 0.5 ? 0 : startingPoint.y;
            if (this.viewModel.buttonActived) {
                currentMesh.position = Vector3.Normalize(startingPoint).scale(currentMesh.position.length());
            } else {
                currentMesh.position = Vector3.Distance(this.tipA.position, startingPoint) > 16 ?
                    Vector3.Normalize(startingPoint).scale(16) : startingPoint;
            }
            this.updateLineData();
        }
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position;
        const ABAddAC = posC.length() + posB.length();
        const ABDifAC = posB.length() - posC.length();
        const BC = Vector3.Distance(posB, posC);
        this.viewModel.setText(ABAddAC > BC ? '>' : '=', Math.abs(ABDifAC) < BC ? '<' : '=');
        this.updateMeshVertData(this.LineCAB, Vector3Utils.ToArray([posC, posA, posB]));
        this.updateMeshVertData(this.LineCB, Vector3Utils.ToArray([posC, posB]));
    }
    buttonEvent(v: boolean) {
        const vet = FormulasUtils.GetCircleUpdateVertices(this.tipC.position.length(), 360);
        this.updateMeshVertData(this.CircleC, Vector3Utils.ToArray(vet));
        this.CircleC.isVisible = v;
    }
    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipA.position = new Vector3(0, 0, 0);
        this.tipB.position = new Vector3(13, 0, 0);
        this.tipC.position = new Vector3(-6.89, 6.18, 0);
        this.updateLineData();
        this.buttonEvent(false);
    }
}
