/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import {
    Color3, LinesMesh, Mesh, Scene, Vector3, Material, Engine, Color4, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';

import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Color } from '../../../../babylon/Math/Color';
import { MeshsBuild } from './MeshsBuild';

import * as dot from '../sub_static/dot.png';
import * as a from '../sub_static/a.png';
import * as pi2a from '../sub_static/pi2a.png';
import * as pia from '../sub_static/pia.png';
import * as pra from '../sub_static/pra.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 10; //虚拟半径
    edgesWidth = 6; //线宽
    mode = 0;
    temp = new Vector3(0, 0, 0); //当前位置
    tempAngle = 0; //当前角度
    stepAngle = 0; //角度增量
    tipB: Mesh;
    angleB: Mesh; //角度文本定位点
    coordinateSystem: Coordinate2DSystem; //坐标系
    LineA: LinesMesh; //变换后线段
    LineB: LinesMesh;
    LineSymmetry: LinesMesh; //对称轴

    CircleBR = 2; //圆弧半径

    TextSymmetry: GUI.TextBlock; //对称轴文本
    TextA: GUI.Image; //变换后文本切图

    CircleAngleA = 135; //变换后角度
    CircleAngleB = 45; //原角度

    colorHexStringA = '#6ECFFFFF';
    colorHexStringB = '#44CFFF';
    colorHexStringSymmetry = '#FF4953';

    colorA: Color3;
    colorB: Color3;
    colorSymmetry: Color3;

    tipSymmetry: Mesh; //对称轴文本定位点
    tipA: Mesh;
    tipO: Mesh; //原点模型，用于原点对称
    circle: Mesh; //角度圆弧
    lighmat: Material;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
        if (Engine.isSupported()) {
            this.registerBeforeRender();
        }
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }
    
    /**
     * 初始化颜色
     */
    initColor() {
        this.colorA = Color3.FromHexString(this.colorHexStringA);
        this.colorB = Color3.FromHexString(this.colorHexStringB);
        this.colorSymmetry = Color3.FromHexString(this.colorHexStringSymmetry);
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.4, scene);
        this.angleB = Mesh.CreateSphere('tiB', 8, 0.5, scene);
        this.tipO = Mesh.CreateSphere('tipO', 8, 0.5, scene);
        this.tipB.isVisible = false;

        this.tipO.material = MaterialLab.CreateLightMaterial(this.colorSymmetry, scene);
        this.tipSymmetry = new Mesh('Symmetry');
        this.tipA = new Mesh('a');

        this.lighmat = MaterialLab.CreateLightMaterial(Color.Yellow, scene);
        this.circle = MeshsBuild.CreateCircle(1, 45, this.lighmat, scene);
    }
    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();

        const options = {
            height: '80px', width: '80px', color: this.colorHexStringSymmetry,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        const ImageLabelOptions = {
            height: '36px', width: '45px', color: Color.StringWhite,
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        // 创建坐标系
        const options2 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options3 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob) {
            ImageLabelOptions.height = '72px';
            ImageLabelOptions.width = '90px';
            ImageLabelOptions.linkOffsetX = '46px';
            ImageLabelOptions.linkOffsetY = '-36px';
            options2.fontSize = options3.fontSize = '36px';
            ImageLabelOption.height = ImageLabelOption.width = '80px';
            options.height = options.width = '160px';
            options.fontSize = '48px';
        }
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(1, 10, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisOLabel(options2)
            .createAxisLabel(options3);

        this.initMesh(scene);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        this.TextSymmetry = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipSymmetry, '', '40px', '30px', options);
        this.TextA = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipA, `${a}`, ImageLabelOptions);
        this.TextA.isVisible = this.angleB.isVisible = false;
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

        this.LineA = LinesBuild.CreateUpdateLines([Vector3.Zero(), FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleA)],
            this.colorA, this.edgesWidth, this.LineA, scene);
        this.LineB = LinesBuild.CreateUpdateLines([Vector3.Zero(), FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleB)],
            this.colorB, this.edgesWidth, this.LineB, scene);
        this.LineSymmetry = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            this.colorSymmetry, this.edgesWidth, this.LineSymmetry, scene);

        this.LineA.isVisible = this.LineSymmetry.isVisible = false;

        const options = {
            height: 30, width: 70, color: Color.StringWhite,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        LabelUtils.CreateLabel(advancedTexture, this.angleB, 'α', options);
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
            currentMesh.position = startingPoint.scale(1).normalize().scale(this.r);
            const ang = Vector3.Dot(new Vector3(1, 0, 0), currentMesh.position.scale(1).normalize());
            let xV: number;
            if (currentMesh.position.y > 0) {
                xV = Math.acos(ang) * 180 / Math.PI;
            } else {
                xV = 360 - Math.acos(ang) * 180 / Math.PI;
            }

            if (currentMesh === this.tipB) {
                this.CircleAngleB = xV;
                this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([Vector3.Zero(),
                FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleB)]));
                this.angleB.position = FormulasUtils.GetCirclePoint(this.CircleBR, xV / 2);
                this.circle.dispose();
                this.circle = MeshsBuild.CreateCircle(1, xV, this.lighmat, this.scene);
                this.circle.position.z = -0.1;
                if (this.mode === 1) {
                    this.CircleAngleA = 360 - this.CircleAngleB;
                } else if (this.mode === 2) {
                    this.CircleAngleA = 180 - this.CircleAngleB;
                } else if (this.mode === 3) {
                    this.CircleAngleA = 180 + this.CircleAngleB;
                } else if (this.mode === 4) {
                    this.CircleAngleA = 90 - this.CircleAngleB;
                }
                const posA = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleA);
                this.temp = this.tipA.position = posA;
                this.updateMeshVertData(this.LineA,
                    Vector3Utils.ToArray([Vector3.Zero(), FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleA)]));
            }
        }
    }
    /**
     * '证明'按钮
     */
    ButtonEvent(index: number) {
        this.viewModel.buttonActived1 = this.viewModel.buttonActived2 =
            this.viewModel.buttonActived3 = this.viewModel.buttonActived4 = false;
        this.mode = index;
        this.tipO.isVisible = false;
        this.TextA.isVisible = false;
        let pos1: Vector3, pos2: Vector3;
        if (this.mode === 1) {
            this.viewModel.buttonActived1 = true;
            this.setLineAColor('#FD7200', 360 - this.CircleAngleB, 'y = 0', `${a}`);
            pos1 = new Vector3(-this.r, 0, 0);
            pos2 = new Vector3(this.r, 0, 0);
        } else if (this.mode === 2) {
            this.setLineAColor('#CBA1FF', 180 - this.CircleAngleB, 'x = 0', `${pra}`);
            this.viewModel.buttonActived2 = true;
            pos1 = new Vector3(0, -this.r, 0);
            pos2 = new Vector3(0, this.r, 0);
        } else if (this.mode === 3) {
            this.setLineAColor('#7CFC00', 180 + this.CircleAngleB, '(0,0)', `${pia}`);
            this.viewModel.buttonActived3 = true;
            pos1 = new Vector3(0, 0, 0);
            pos2 = new Vector3(0, 0, 0);
            this.tipO.isVisible = true;
        } else if (this.mode === 4) {
            this.setLineAColor('#FF7200', 90 - this.CircleAngleB, 'y = x', `${pi2a}`);
            this.viewModel.buttonActived4 = true;
            pos1 = new Vector3(-this.r, -this.r, 0);
            pos2 = new Vector3(this.r, this.r, 0);
        }
        if (this.mode !== 0) {
            this.tipA.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleB);
            this.tempAngle = this.CircleAngleB;
            if (this.CircleAngleB < this.CircleAngleA) {
                this.stepAngle = 4;
            } else {
                this.stepAngle = -4;
            }
            this.temp = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleA);
            this.tipSymmetry.position = pos2;
            this.updateMeshVertData(this.LineSymmetry, Vector3Utils.ToArray([pos1, pos2]));
            this.LineA.isVisible = this.LineSymmetry.isVisible = true;
            this.TextA.isVisible = true;
        }
    }

    /** BeforeRender循环 */
    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            if (this.temp !== this.tipA.position) {
                if (Vector3.Distance(this.tipA.position, this.temp) > 0.5) {
                    if (this.mode === 3) {
                        this.tempAngle += this.stepAngle;
                        this.tipA.position = FormulasUtils.GetCirclePoint(this.r, this.tempAngle);
                    } else {
                        this.tipA.position = this.tipA.position.add(
                            this.temp.subtract(this.tipA.position).normalize().scale(0.5));
                    }
                } else {
                    this.tipA.position = this.temp;
                }
                this.updateMeshVertData(this.LineA, Vector3Utils.ToArray([Vector3.Zero(),
                this.tipA.position.add(this.tipA.position.scale(1).normalize().scale(2))]));
            }
        });
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.ButtonEvent(0);
        this.CircleAngleB = 60;
        this.tipB.position = FormulasUtils.GetCirclePoint(this.r, this.CircleAngleB);
        this.LineA.isVisible = this.LineSymmetry.isVisible = false;
        this.setLineAColor('#ff0000', 360, '', `${a}`);
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray([Vector3.Zero(),
        FormulasUtils.GetCirclePoint(this.r + 2, this.CircleAngleB)]));
        this.angleB.position = FormulasUtils.GetCirclePoint(this.CircleBR, this.CircleAngleB / 2);
        this.circle.dispose();
        this.circle = MeshsBuild.CreateCircle(1, this.CircleAngleB, this.lighmat, this.scene);
        this.circle.position.z = -0.1;
    }

    /**
     * 设置线条颜色
     * @param color
     * @param CircleAngleA
     * @param TextSymmetry
     * @param TextA
     */
    setLineAColor(color: string, CircleAngleA: number, TextSymmetry: string, TextA: string) {
        this.LineA.color = Color3.FromHexString(color);
        this.LineA.edgesColor = Color4.FromHexString(color + 'FF');
        this.CircleAngleA = CircleAngleA;
        this.TextSymmetry.text = TextSymmetry;
        this.TextA.source = TextA;
    }
}
