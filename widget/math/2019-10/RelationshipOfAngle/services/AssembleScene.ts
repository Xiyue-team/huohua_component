/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, AbstractMesh, LinesMesh, Mesh, Scene, Engine, TransformNode
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexRed = '#D0021B';
    hexGreen = '#7ED321';
    hexOrange = '#F5A623';
    hexBlue = '#179DF5';
    colorGreen: Color3;
    colorBlue: Color3;
    colorOrange: Color3;
    colorRed: Color3;

    tipC: Mesh; //模型C
    tipB: Mesh; //模型B
    tipA: Mesh; //模型A
    tipP: Mesh; //模型P

    tipAngle1: Mesh; //标签角1定位
    tipAngle2: Mesh; //标签角2定位
    tipAngles1: Mesh; //标签对顶角1定位
    tipAngles2: Mesh; //标签对顶角2定位
    Linetriangular: LinesMesh; //模型B
    Arc1: LinesMesh; //弧1
    Arcs1: LinesMesh; //对顶弧1
    group: Mesh; //组
    tempG: TransformNode; //组偏移

    tipCC: Mesh; //模型C
    tipBB: Mesh; //模型B
    tipAA: Mesh; //模型A
    Linetriangular2: LinesMesh; //模型B
    Arc2: LinesMesh; //弧2
    Arcs2: LinesMesh; //对顶弧2
    group2: Mesh; //组2
    tempG2: TransformNode; //组偏移

    labelA: GUI.TextBlock; //角度标签A
    labelA2: GUI.TextBlock; //角度标签A2
    labelsA: GUI.TextBlock; //角度对顶标签A
    labelsA2: GUI.TextBlock; //角度对顶标签A2
    rectangleA: GUI.Rectangle;
    rectanglesA2: GUI.Rectangle;
    RightAngle1: LinesMesh; //直角1
    RightAngle2: LinesMesh; //直角2
    RightAngle: LinesMesh; //直角

    rectangleAngle: LinesMesh; //直角框
    dotControl: GUI.Control; //控制点UI
    dotControl2: GUI.Control; //控制点UI2
    switchAngle = 1;  //角度切换
    offsetX = 60; //UI偏移

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.offset = 8;
        this.init();
    }

    resize() {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipAngle1 = new Mesh('AA');
        this.tipAngle2 = new Mesh('AA');
        this.tipAngles1 = new Mesh('AA');
        this.tipAngles2 = new Mesh('AA');

        this.tipA = new Mesh('AA');
        this.tipB = new Mesh('AA');
        this.tipC = new Mesh('AA');
        this.tipP = new Mesh('AA');
        if (this.isMob) {
            this.group = Mesh.CreateSphere('tipC', 8, 3, scene);
            this.group2 = Mesh.CreateSphere('tipC', 8, 3, scene);
        } else {
            this.group = Mesh.CreateSphere('tipC', 8, 1.5, scene);
            this.group2 = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        }
        this.tempG = new TransformNode('g');
        this.tipA.setParent(this.tempG);
        this.tipB.setParent(this.tempG);
        this.tipC.setParent(this.tempG);
        this.tipAngle1.setParent(this.tempG);
        this.tipAngles1.setParent(this.tempG);
        this.tempG.setParent(this.group);
        this.tipAA = new Mesh('AA');
        this.tipBB = new Mesh('BB');
        this.tipCC = new Mesh('CC');


        this.tempG2 = new TransformNode('g');
        this.tipAA.setParent(this.tempG2);
        this.tipBB.setParent(this.tempG2);
        this.tipCC.setParent(this.tempG2);
        this.tipAngle2.setParent(this.tempG2);
        this.tipAngles2.setParent(this.tempG2);
        this.tempG2.setParent(this.group2);
        this.setMeshVisible([this.group, this.group2], false);
        this.rectangleA = new GUI.Rectangle('a');
        this.rectanglesA2 = new GUI.Rectangle('a2');
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorOrange = Color3.FromHexString(this.hexOrange);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.initMesh(scene);

        const dotOption = { height: '45px', width: '45px', color: '#FFFFFF' };
        const options = {
            height: '30px', width: '120px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: '', fontStyle: ''
        };
        if (this.isMob) {
            dotOption.height = dotOption.width = '60px';
            options.height = '60px';
            options.width = '240px';
            options.fontSize = '40px';
            if (window.screen.height < 499 || window.screen.width < 699) {
                options.fontSize = '30px';
            }

            this.offsetX = 90;
        }
        this.labelA = this.createLabelWithOffset(advancedTexture, this.tipAngle1, this.rectangleA, 'O', this.offsetX, 0, options);
        this.labelA2 = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipAngle2, 'O', this.offsetX, 0, options);
        this.labelsA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipAngles1, 'O', this.offsetX, 0, options);
        this.labelsA2 = this.createLabelWithOffset(advancedTexture, this.tipAngles2, this.rectanglesA2, 'O', -this.offsetX, 0, options);
        this.labelsA2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.labelA.textHorizontalAlignment = this.labelA2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.dotControl = LabelUtils.CreateDot(advancedTexture, this.group, dot, dotOption);
        this.dotControl2 = LabelUtils.CreateDot(advancedTexture, this.group2, dot, dotOption);
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
        const pos = Vector3.Zero();
        this.Linetriangular = LinesBuild.CreateUpdateLines([pos, pos, pos], this.colorBlue, this.edgesWidth, this.Linetriangular, scene);
        this.Linetriangular.setParent(this.tempG);
        this.Linetriangular2 = LinesBuild.CreateUpdateLines([pos, pos, pos], this.colorBlue, this.edgesWidth, this.Linetriangular2, scene);
        this.Linetriangular2.setParent(this.tempG2);
        const points = FormulasUtils.GetArcUpdateVertices(2, 0, 45);
        this.Arc1 = LinesBuild.CreateUpdateLines(points, this.colorGreen, this.edgesWidth, this.Arc1, scene);
        this.Arc2 = LinesBuild.CreateUpdateLines(points, this.colorOrange, this.edgesWidth, this.Arc2, scene);
        this.Arcs1 = LinesBuild.CreateUpdateLines(points, this.colorGreen, this.edgesWidth, this.Arcs1, scene);
        this.Arcs2 = LinesBuild.CreateUpdateLines(points, this.colorOrange, this.edgesWidth, this.Arcs2, scene);
        const RightAnglePoints = [new Vector3(0, 1, 0), new Vector3(1, 1, 0), new Vector3(1, 0, 0)];
        this.RightAngle1 = LinesBuild.CreateUpdateLines([pos, pos, pos], this.colorRed, this.edgesWidth, this.RightAngle1, scene);
        this.RightAngle2 = LinesBuild.CreateUpdateLines(RightAnglePoints, this.colorRed, this.edgesWidth, this.RightAngle2, scene);
        this.RightAngle = LinesBuild.CreateUpdateLines(RightAnglePoints, this.colorRed, this.edgesWidth, this.RightAngle, scene);
        this.rectangleAngle = LinesBuild.CreateLines([new Vector3(-1, 1, 0), new Vector3(1, 1, 0),
        new Vector3(1, -1, 0), new Vector3(-1, -1, 0), new Vector3(-1, 1, 0)], this.colorRed, this.edgesWidth, scene);
        this.RightAngle1.setParent(this.tempG);
        this.RightAngle2.setParent(this.tempG2);
        this.RightAngle.setParent(this.tempG2);
        this.rectangleAngle.setParent(this.tempG2);
        this.Arc1.setParent(this.tempG);
        this.Arc2.setParent(this.tempG2);
        this.Arcs1.setParent(this.tempG);
        this.Arcs2.setParent(this.tempG2);
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
            let ang = 0;
            let dis = 0;
            if (currentMesh === this.group) {
                ang = Vector3.Dot(Vector3.Normalize(this.tipP.position),
                    Vector3.Normalize(startingPoint.clone().subtract(this.group2.position)));
                dis = Vector3.Distance(startingPoint, this.group2.position);
                if (ang > 0.98) {
                    currentMesh.position = this.group2.position.clone().add(Vector3.Normalize(this.tipP.position.clone()).scale(dis));
                } else if (ang < -0.98) {
                    currentMesh.position = this.group2.position.clone().subtract(Vector3.Normalize(this.tipP.position.clone()).scale(dis));
                } else {
                    currentMesh.position = startingPoint;
                }
            } else {
                ang = Vector3.Dot(Vector3.Normalize(this.tipP.position),
                    Vector3.Normalize(startingPoint.clone().subtract(this.group.position)));
                dis = Vector3.Distance(startingPoint, this.group.position);
                if (ang > 0.98) {
                    currentMesh.position = this.group.position.clone().add(Vector3.Normalize(this.tipP.position.clone()).scale(dis));
                } else if (ang < -0.98) {
                    currentMesh.position = this.group.position.clone().subtract(Vector3.Normalize(this.tipP.position.clone()).scale(dis));
                } else {
                    currentMesh.position = startingPoint;
                }
            }
            const diss = Vector3.Distance(this.group.position, this.group2.position);
            if (diss < 0.5) {
                currentMesh.position = currentMesh === this.group ? this.group2.position : this.group.position;
                this.viewModel.setText(this.viewModel.buttonActived === 1 ? 1 : this.viewModel.buttonActived === 2 ? 3 : 4);
            } else {
                this.viewModel.setText(this.viewModel.buttonActived === 1 ? 0 : this.viewModel.buttonActived === 2 ? 2 : 4);
            }
            this.updateLineData();
        }
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position, posP = this.tipP.position;
        this.tipAA.position = posA;
        this.tipBB.position = posB;
        this.tipCC.position = posC;

        this.tipAngle1.position = Vector3.Normalize(posB.add(posP)).scale(3);
        this.tipAngle2.position = Vector3.Normalize(posC.add(posP)).scale(3);
        this.tipAngles1.position = Vector3.Normalize(posB.add(posP)).scale(-3);
        this.tipAngles2.position = Vector3.Normalize(posC.add(posP)).scale(-3);
        const ang2 = Vector3Utils.GetAngle(posP, new Vector3(1, 0, 0));
        this.updateMeshVertData(this.Arc1, Vector3Utils.ToArray(
            FormulasUtils.GetArcUpdateVertices(1.5, this.switchAngle === 1 ? 90 : 180, ang2)));
        this.updateMeshVertData(this.Arc2, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1.5, 0, ang2)));
        if (this.switchAngle === 3) {
            this.updateMeshVertData(this.Linetriangular, Vector3Utils.ToArray([posP, posA, posP.scale(-1)]));
            this.updateMeshVertData(this.Linetriangular2, Vector3Utils.ToArray([posC, posA, posC.scale(-1)]));
            this.updateMeshVertData(this.Arcs1, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1.5, 360, 180 + ang2)));
            this.updateMeshVertData(this.Arcs2, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1.5, 180, 180 + ang2)));
        } else {
            this.updateMeshVertData(this.Linetriangular, Vector3Utils.ToArray([posB, posA, posP]));
            this.updateMeshVertData(this.Linetriangular2, Vector3Utils.ToArray([posP, posA, posC]));
            if (this.switchAngle === 1) {
                this.updateMeshVertData(this.RightAngle1, Vector3Utils.ToArray(
                    [new Vector3(0, 1, 0), new Vector3(1, 1, 0), new Vector3(1, 0, 0)]));
            } else if (this.switchAngle === 2) {
                this.updateMeshVertData(this.RightAngle1, Vector3Utils.ToArray(
                    [new Vector3(0, 1, 0), new Vector3(-1, 1, 0), new Vector3(-1, 0, 0)]));
            }
        }
        const angle2 = Number(ang2.toFixed(1));
        this.labelA.text = `∠ 1=${Number((this.switchAngle === 1 ? 90 - angle2 : 180 - angle2).toFixed(1))}°`;
        this.labelA2.text = `∠ 2=${angle2}°`;

        this.labelsA.text = `∠ 1'=${Number((this.switchAngle === 1 ? 90 - angle2 : 180 - angle2).toFixed(1))}°`;
        this.labelsA2.text = `∠ 2'=${angle2}°`;

        if (this.switchAngle === 1) {
            this.RightAngle.isVisible = Vector3.Distance(this.group.position, this.group2.position) === 0;
        } else {
            this.RightAngle.isVisible = false;
        }
        if (this.switchAngle === 3) {
            this.rectangleAngle.isVisible = this.viewModel.sliderNumber === 90;
        } else {
            this.rectangleAngle.isVisible = false;
        }
    }
    /**
     * 旋转滑动条回调
     * @param angle 
     */
    formatterRotation(angle: number) {
        this.tipP.position = FormulasUtils.GetCirclePoint(13, angle);
        if (this.switchAngle === 1) {
            this.setMeshVisible([this.Arc1, this.Arc2], angle !== 0 && angle !== 90);
            this.RightAngle2.isVisible = angle === 90;
            this.RightAngle1.isVisible = angle === 0;
        } else if (this.switchAngle === 2) {
            this.setMeshVisible([this.Arc1, this.Arc2], angle !== 0 && angle !== 180);
            this.setMeshVisible([this.RightAngle1, this.RightAngle2], angle === 90);
            this.setMeshVisible([this.Arc1, this.Arc2], angle !== 90);
        } else if (this.switchAngle === 3) {
            this.setMeshVisible([this.Arc1, this.Arc2, this.Arcs1, this.Arcs2], angle !== 0 && angle !== 90 && angle !== 180);
            this.setGUIVisible([this.labelA, this.labelA2, this.labelsA, this.labelsA2], angle !== 0 && angle !== 180);
        }
        this.updateLineData();
    }
    /**
     * 角类型切换回调
     * @param i 
     */
    ButtonEvent(i: number) {
        this.switchAngle = i;
        this.viewModel.sliderOption.max = i === 1 ? 90 : 180;
        this.viewModel.sliderNumber = i === 1 ? 50 : 110;
        this.setMeshVisible([this.Arc1, this.Arc2], true);
        this.setGUIVisible([this.labelA, this.labelA2], true);
        if (i === 3) {
            this.setGUIVisible([this.dotControl, this.dotControl2], false);
            this.setGUIVisible([this.labelsA, this.labelsA2], true);
            this.setMeshVisible([this.Arcs1, this.Arcs2], true);
            this.setMeshPickable([this.group, this.group2], false);
            this.tipB.position = new Vector3(-13, 0, 0);
            this.group.position = this.group2.position = new Vector3(0, 0, 0);
            this.tempG.position = new Vector3(0, 0, 0);
            this.tempG2.position = new Vector3(0, 0, 0);
            this.viewModel.setText(4);
            this.labelA.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            this.rectangleA.linkOffsetX = -this.offsetX;
            this.setMeshVisible([this.RightAngle2, this.RightAngle1], false);
        } else {

            this.group2.position = new Vector3(3, -5, 0);
            this.setGUIVisible([this.dotControl, this.dotControl2], true);
            this.setGUIVisible([this.labelsA, this.labelsA2], false);
            this.setMeshVisible([this.Arcs1, this.Arcs2], false);
            this.setMeshPickable([this.group, this.group2], true);
            if (i === 1) {
                this.group.position = new Vector3(-10, -2, 0);
                this.tempG.position = new Vector3(0, 0, 0);
                this.tempG2.position = new Vector3(0, 0, 0);
                this.tipB.position = new Vector3(0, 13, 0);
                this.viewModel.setText(0);
                this.labelA.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                this.rectangleA.linkOffsetX = this.offsetX;
            } else if (i === 2) {
                this.group.position = new Vector3(0, -3, 0);
                this.tempG.position = new Vector3(0, 0, 0);
                this.tempG2.position = new Vector3(0, 0, 0);
                this.tipB.position = new Vector3(-13, 0, 0);
                this.viewModel.setText(2);
                this.labelA.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                this.rectangleA.linkOffsetX = -this.offsetX;
            }
        }
        this.formatterRotation(this.viewModel.sliderNumber);
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tipA.position = new Vector3(0, 0, 0);
        this.tipB.position = new Vector3(0, 13, 0);
        this.tipC.position = new Vector3(13, 0, 0);
        this.tipP.position = new Vector3(13, 0, 0);
        this.ButtonEvent(1);
    }
    /**
     * 创建标签
     * @param advancedTexture 
     * @param mesh 
     * @param label 
     * @param text 
     * @param linkOffsetX 
     * @param linkOffsetY 
     * @param options 
     */
    createLabelWithOffset(advancedTexture: GUI.AdvancedDynamicTexture, mesh: AbstractMesh, label: GUI.Rectangle, text: string,
        linkOffsetX: string | number, linkOffsetY: string | number,
        options: {
            height: string | number;
            width: string | number;
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle: string
        }): GUI.TextBlock {
        label.height = options.height;
        label.alpha = 1;
        label.width = options.width;
        label.thickness = 0;
        label.linkOffsetX = linkOffsetX;
        label.linkOffsetY = linkOffsetY;
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);
        const text1 = FastCreater.TextBlock(text, {
            color: options.color,
            fontSize: options.fontSize,
            fontFamily: options.fontFamily,
            fontStyle: options.fontStyle
        },
            GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_CENTER);
        label.addControl(text1);
        return text1;
    }
}
