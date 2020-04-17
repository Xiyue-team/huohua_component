/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import { Color3, Vector3, LinesMesh, Mesh, Scene, Engine, AbstractMesh } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { Base2DScene } from './Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/image/dot.png';
import * as dot2 from '../sub_static/image/dot2.png';
import * as dot3 from '../sub_static/image/dot3.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系

    hexGreen = '#92E438';
    hexBlue = '#6ECFFF';
    hexRed = '#FF5A5A';

    colorGreen: Color3;
    colorBlue: Color3;
    colorRed: Color3;

    tipLeftX: Mesh; //左控制点
    tipLeft: Mesh;
    leftImage: GUI.Image;
    lineLeft: LinesMesh;

    tipCenter: Mesh; //平分点
    lineCenter: LinesMesh;

    tipRightX: Mesh; //右控制点
    tipRight: Mesh;
    rightImage: GUI.Image;
    lineRight: LinesMesh;
    v = 0; //最终近似值
    lock = 0;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    changeTipPos(leftX: number, rightX: number) {
        this.tipLeft.position = this.getPoint(leftX);
        this.tipRight.position = this.getPoint(rightX);
        this.tipLeftX.position = new Vector3(leftX, 0, 0);
        this.tipRightX.position = new Vector3(rightX, 0, 0);
    }
    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.colorGreen = Color3.FromHexString(this.hexGreen);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.tipLeft = new Mesh('Left');
        this.tipRight = new Mesh('Right');
        this.tipCenter = new Mesh('Center');
        this.tipLeftX = Mesh.CreateSphere('tipLeftX', 8, 1.5, scene);
        this.tipRightX = Mesh.CreateSphere('tipRightX', 8, 1.5, scene);
        this.tipLeftX.isVisible = this.tipRightX.isVisible = false;
        this.tipLeftX.scaling.z = this.tipRightX.scaling.z = 0.001;
        this.changeTipPos(-1, 4);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 10);
        this.camera.position = new Vector3(1.441, 0, -30);

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        // 创建坐标系
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob) {
            options1.fontSize = options2.fontSize = '36px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }

        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(5, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth, 1, 0.6, 0.3, 0.4)
            .createAxisOLabel(options1)
            .createAxisLabel(options2)
            .createNumberLabel();

        this.initValue(scene);
        this.leftImage = LabelUtils.CreateImageLabel(advancedTexture, this.tipLeftX, dot, ImageLabelOption);
        this.rightImage = LabelUtils.CreateImageLabel(advancedTexture, this.tipRightX, dot, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipLeft, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipRight, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipCenter, dot3, ImageLabelOption);

        LinesBuild.CreateLines(this.getpoints(), this.colorBlue, this.edgesWidth, scene);
        this.lineLeft = LinesBuild.createDashLines(
            Vector3Utils.ToMoreVector3([this.tipLeft.position, this.tipLeftX.position], 20),
            this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.lineLeft.alwaysSelectAsActiveMesh = true;

        this.lineRight = LinesBuild.createDashLines(
            Vector3Utils.ToMoreVector3([this.tipRight.position, this.tipRightX.position], 20),
            this.colorGreen, this.edgesWidth, scene, 20, 20);
        this.lineRight.alwaysSelectAsActiveMesh = true;

        this.lineCenter = LinesBuild.createDashLines(
            Vector3Utils.ToMoreVector3([this.tipRight.position, this.tipRightX.position], 10),
            this.colorRed, this.edgesWidth, scene, 20, 20);
        this.lineCenter.alwaysSelectAsActiveMesh = true;

        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    getpoints(): Vector3[] {
        const vertices = [];
        for (let i = -50; i < 50; i++) {
            vertices.push(this.getPoint(i / 10));
        }
        return vertices;
    }

    getPoint(x: number): Vector3 {
        const y = Math.pow(2, x) + 3 * x - 7;
        return new Vector3(x, y, 0);
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        this.tipLeft.position = this.getPoint(this.tipLeftX.position.x);
        this.tipRight.position = this.getPoint(this.tipRightX.position.x);
        this.tipCenter.position = this.getPoint((this.tipLeftX.position.x + this.tipRightX.position.x) / 2);

        const nbl = Math.floor(Vector3.Distance(this.tipLeftX.position, this.tipLeft.position));
        this.lineLeft.dispose();
        this.lineLeft = LinesBuild.createDashLines([this.tipLeftX.position, this.tipLeft.position],
            this.colorGreen, this.edgesWidth, this.scene, nbl > 5 ? nbl : 5, nbl);
        this.lineLeft.alwaysSelectAsActiveMesh = true;

        const nbr = Math.floor(Vector3.Distance(this.tipRightX.position, this.tipRight.position));
        this.lineRight.dispose();
        this.lineRight = LinesBuild.createDashLines([this.tipRightX.position, this.tipRight.position],
            this.colorGreen, this.edgesWidth, this.scene, nbr > 5 ? nbr : 5, nbr);
        this.lineRight.alwaysSelectAsActiveMesh = true;

        const nb = Math.floor(Vector3.Distance(this.tipCenter.position, new Vector3(this.tipCenter.position.x, 0, 0)));
        this.lineCenter.dispose();
        this.lineCenter = LinesBuild.createDashLines([new Vector3(this.tipCenter.position.x, 0, 0), this.tipCenter.position],
            this.colorRed, this.edgesWidth, this.scene, nb > 5 ? nb : 5, nb);
        this.lineCenter.alwaysSelectAsActiveMesh = true;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            if (currentMesh === this.tipLeftX) {
                currentMesh.position.x = startingPoint.x < 1.4 ? startingPoint.x : 1.4;
            } else if (currentMesh === this.tipRightX) {
                currentMesh.position.x = startingPoint.x > 1.5 ? startingPoint.x : 1.5;
            }
            this.updateLineData();
            this.changeMsg();
        }
    }
    /**
     * '结论'按钮
     */
    ButtonEvent(index: number): void {
        if (index !== 0) {
            this.tipLeftX.isPickable = this.tipRightX.isPickable = false;
            this.rightImage.source = dot2;
            this.leftImage.source = dot2;
        } else {
            this.tipLeftX.isPickable = this.tipRightX.isPickable = true;
            this.rightImage.source = dot;
            this.leftImage.source = dot;
        }
        this.viewModel.leftshow = this.viewModel.rightshow = false;

        if (index === 1) {
            if ((this.tipCenter.position.y > 0 && this.tipLeft.position.y > 0) ||
                (this.tipCenter.position.y <= 0 && this.tipLeft.position.y <= 0)) {
                this.viewModel.leftshow = true;
            } else {
                if (this.viewModel.msglis.length > 0) {
                    if (this.lock !== 0) {
                        this.tipRightX.position.x = this.tipCenter.position.x;
                        this.updateLineData();
                        this.pushMsg();
                    } else {
                        this.lock = 1;
                        this.ButtonEvent(index);
                    }
                }
            }
        } else if (index === 2) {
            if ((this.tipCenter.position.y > 0 && this.tipRight.position.y > 0) ||
                (this.tipCenter.position.y <= 0 && this.tipRight.position.y <= 0)) {
                this.viewModel.rightshow = true;
            } else {
                if (this.viewModel.msglis.length > 0) {
                    if (this.lock !== 0) {
                        this.tipLeftX.position.x = this.tipCenter.position.x;
                        this.updateLineData();
                        this.pushMsg();
                    } else {
                        this.lock = 1;
                        this.ButtonEvent(index);
                    }
                } else {

                }
            }
        }
    }

    pushMsg() {
        const msgitem = { ab: 'string', halfab: 'string', fafb: 'string', fhalfab: 'string', length: 'string' };
        msgitem.ab = `(${this.tipLeftX.position.x.toFixed(3)},${this.tipRightX.position.x.toFixed(3)})`;
        msgitem.halfab = this.tipCenter.position.x.toFixed(3);
        if (this.tipLeft.position.y <= -10 || this.tipRight.position.y >= 10) {
            msgitem.fafb = `${this.tipLeft.position.y.toFixed(2)},${this.tipRight.position.y.toFixed(2)}`;
        } else {
            msgitem.fafb = `${this.tipLeft.position.y.toFixed(3)},${this.tipRight.position.y.toFixed(3)}`;
        }
        msgitem.fhalfab = this.tipCenter.position.y.toFixed(3);
        const v = Math.abs(this.tipLeftX.position.x - this.tipRightX.position.x);
        msgitem.length = v.toFixed(3);
        if (v < 0.1) {
            if (this.v === 0) {
                this.viewModel.msgPush(msgitem);
                this.v = v;
            }
            this.viewModel.showTip(v.toFixed(3), this.tipCenter.position.x.toFixed(3));
        } else {
            this.viewModel.msgPush(msgitem);
        }
    }

    changeMsg() {
        this.viewModel.msglis[this.viewModel.msglis.length - 1].ab =
            `(${this.tipLeftX.position.x.toFixed(3)},${this.tipRightX.position.x.toFixed(3)})`;
        this.viewModel.msglis[this.viewModel.msglis.length - 1].halfab = this.tipCenter.position.x.toFixed(3);
        if (this.tipLeft.position.y <= -10 || this.tipRight.position.y >= 10) {
            this.viewModel.msglis[this.viewModel.msglis.length - 1].fafb =
                `${this.tipLeft.position.y.toFixed(2)},${this.tipRight.position.y.toFixed(2)}`;
        } else {
            this.viewModel.msglis[this.viewModel.msglis.length - 1].fafb =
                `${this.tipLeft.position.y.toFixed(3)},${this.tipRight.position.y.toFixed(3)}`;
        }
        this.viewModel.msglis[this.viewModel.msglis.length - 1].fhalfab = this.tipCenter.position.y.toFixed(3);
        const v = Math.abs(this.tipLeftX.position.x - this.tipRightX.position.x);
        this.viewModel.msglis[this.viewModel.msglis.length - 1].length = v.toFixed(3);
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.lock = 0;
        this.v = 0;
        this.changeTipPos(0.5, 2.5);
        this.camera.position = new Vector3(1.441, 0, -30);
        this.viewModel.buttonActived = 0;
        this.ButtonEvent(0);
        this.updateLineData();
        this.formatterV = -12;
        this.formatter(this.formatterV);
        this.pushMsg();
    }
}
