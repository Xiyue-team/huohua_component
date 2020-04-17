/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import { Vector3, Color3, Mesh, LinesMesh, TransformNode, Engine, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Color } from '../../../../babylon/Math/Color';

import * as ffx from '../sub_static/ffx.png';
import * as fx from '../sub_static/fx.png';
import * as fxf from '../sub_static/fxf.png';
import * as _f_x from '../sub_static/-f-x.png';

import * as y2x from '../sub_static/expression/y2x.png';
import * as y2x45 from '../sub_static/expression/y2x45.png';
import * as y2xxy from '../sub_static/expression/y2xxy.png';
import * as yexxyy from '../sub_static/expression/yexxyy.png';

import * as x_1x from '../sub_static/expression/x_1x.png';
import * as x1x from '../sub_static/expression/x1x.png';

import * as yexx from '../sub_static/expression/yexx.png';
import * as yexy from '../sub_static/expression/yexy.png';
import * as yexxy from '../sub_static/expression/yexxy.png';

import * as yx from '../sub_static/expression/yx.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    selectedLineIndex = 0;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    mode = 0;
    tempAngle = new Vector3(0, 0, 0);
    LineSymmetry: LinesMesh; //对称轴线段
    //y=x
    LineStraightVary: LinesMesh;
    LineStraightVaryed: LinesMesh;
    LineStraight: LinesMesh;
    //y=1/x
    LineX: LinesMesh;
    LineXVary: LinesMesh[];
    LineXVaryed: LinesMesh;
    //y=ex
    LineExp: LinesMesh;
    LineExpVary: LinesMesh;
    LineExpVaryed: LinesMesh;

    Image: GUI.Image;
    symmetryImage: GUI.Image; //对称轴公式图片
    TipImage: Mesh;
    root: TransformNode;
    rootForXY: TransformNode;
    ButtonEvented = false;

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
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 18);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.TipImage = new Mesh('');
        const tipSymmetry = new Mesh('');
        const ImageLabelOptions = {
            height: '74px', width: '224px', color: Color.StringWhite,
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob) {
            ImageLabelOptions.height = '74px';
            ImageLabelOptions.width = '224px';
            ImageLabelOptions.linkOffsetX = '46px';
            ImageLabelOptions.linkOffsetY = '-36px';
            options1.fontSize = options2.fontSize = '36px';
        }

        this.Image = LabelUtils.CreateImageLabelLeft(advancedTexture, this.TipImage, `${y2x}`, ImageLabelOptions);
        this.Image.isVisible = false;

        this.symmetryImage = LabelUtils.CreateImageLabelLeft(advancedTexture, tipSymmetry, `${yx}`, ImageLabelOptions);
        tipSymmetry.position = new Vector3(10, 5, 0);
        this.symmetryImage.isVisible = false;
        // 创建坐标系
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisLabel(options2).createAxisOLabel(options1)
            .createNumberLabel();
        this.root = new TransformNode('root');
        this.rootForXY = new TransformNode('rootForXY');
        this.LineSymmetry = LinesBuild.CreateDashedLines([new Vector3(-10, -10, 0),
        new Vector3(10, 10, 0)], Color.Green, this.edgesWidth, scene);

        this.LineStraight = LinesBuild.CreateLines([new Vector3(-4, -8, 0), new Vector3(4, 8, 0)], Color.Blue, this.edgesWidth, scene);
        this.LineStraightVary = LinesBuild.CreateDashedLines([new Vector3(-4, -8, 0), new Vector3(4, 8, 0)],
            Color.Red, this.edgesWidth, scene);
        this.LineStraightVaryed = LinesBuild.CreateLines([new Vector3(-4, -8, 0), new Vector3(4, 8, 0)], Color.Red, this.edgesWidth, scene);

        this.LineX = FormulaLineUtils.GetDivideLine(1, 10, Color.Blue, this.edgesWidth, scene);
        this.LineXVary = FormulaLineUtils.GetDivideDashedLine(1, 10, Color.Red, this.edgesWidth, scene);
        this.LineXVaryed = FormulaLineUtils.GetDivideLine(1, 10, Color.Red, this.edgesWidth, scene);

        this.LineExp = FormulaLineUtils.GetExpLine(-10, 10, Color.Blue, this.edgesWidth, scene);
        this.LineExpVary = FormulaLineUtils.GetExpDashedLine(-10, 10, Color.Red, this.edgesWidth, scene);
        this.LineExpVaryed = FormulaLineUtils.GetExpLine(-10, 10, Color.Red, this.edgesWidth, scene);

        this.TipImage.setParent(this.root);
        this.LineStraightVary.setParent(this.root);
        this.LineXVary[0].setParent(this.root);
        this.LineXVary[1].setParent(this.root);
        this.LineExpVary.setParent(this.root);
        this.LineStraightVaryed.setParent(this.root);
        this.LineXVaryed.setParent(this.root);
        this.LineExpVaryed.setParent(this.root);
        this.setMeshVisible([this.LineStraightVaryed, this.LineXVaryed, this.LineExpVaryed, this.LineStraightVary,
        this.LineXVary[0], this.LineXVary[1], this.LineExpVary, this.LineSymmetry], false);
        this.reset();
        return scene;
    }

    /**
     * 选择表达式
     * @param index
     */
    selectedLine(index: number) {
        if (this.selectedLineIndex !== index) {
            this.mode = 0;
            this.selectedLineIndex = index;
            this.viewModel.buttonSymmetricalActived = 0;
            this.viewModel.buttonAnalysisActived = false;
            this.Analysis();
            this.ButtonEvented = false;
            this.LineStraight.isVisible = index === 1;
            this.LineX.isVisible = index === 2;
            this.LineExp.isVisible = index === 3;
            this.setMeshVisible([this.LineStraightVary, this.LineXVary[0], this.LineXVary[1],
            this.LineExpVary, this.LineSymmetry, this.LineStraightVaryed, this.LineXVaryed, this.LineExpVaryed], false);
        }
    }

    /**
     * '证明'按钮
     */
    Symmetrical(index: number) {
        this.viewModel.boolOpen = false;
        this.rootForXY.rotation = new Vector3(0, 0, 0);
        this.root.setParent(null);
        this.root.rotation = Vector3.Zero();
        this.LineStraightVary.rotation = Vector3.Zero();
        this.LineXVary[0].rotation = Vector3.Zero();
        this.LineXVary[1].rotation = Vector3.Zero();
        this.LineExpVary.rotation = Vector3.Zero();
        this.LineStraightVaryed.rotation = Vector3.Zero();
        this.LineXVaryed.rotation = Vector3.Zero();
        this.LineExpVaryed.rotation = Vector3.Zero();
        this.TipImage.setParent(this.root);
        this.mode = index;
        this.LineSymmetry.isVisible = false;
        if (this.mode === 1) {
            this.tempAngle = new Vector3(Math.PI, 0, 0);
        } else if (this.mode === 2) {
            this.tempAngle = new Vector3(0, Math.PI, 0);
        } else if (this.mode === 3) {
            this.LineStraightVary.setParent(null);
            this.LineXVary[0].setParent(null);
            this.LineXVary[1].setParent(null);
            this.LineExpVary.setParent(null);
            this.LineStraightVaryed.setParent(null);
            this.LineXVaryed.setParent(null);
            this.LineExpVaryed.setParent(null);
            this.TipImage.setParent(null);
            this.rootForXY.rotation = new Vector3(0, 0, -Math.PI / 4);
            this.root.setParent(this.rootForXY);
            this.root.rotation = Vector3.Zero();

            this.LineStraightVary.setParent(this.root);
            this.LineXVary[0].setParent(this.root);
            this.LineXVary[1].setParent(this.root);
            this.LineExpVary.setParent(this.root);
            this.LineStraightVaryed.setParent(this.root);
            this.LineXVaryed.setParent(this.root);
            this.LineExpVaryed.setParent(this.root);
            this.tempAngle = new Vector3(0, Math.PI, 0);
            this.LineSymmetry.isVisible = true;
        } else if (this.mode === 4) {
            this.tempAngle = new Vector3(0, 0, Math.PI);
        }
        if (this.mode !== 0) {
            this.viewModel.buttonAnalysisActived = false;
            this.Analysis();

            this.ButtonEvented = true;
            this.LineStraightVary.isVisible = this.selectedLineIndex === 1;
            this.LineXVary[0].isVisible = this.LineXVary[1].isVisible = this.selectedLineIndex === 2;
            this.LineExpVary.isVisible = this.selectedLineIndex === 3;
            this.setMeshVisible([this.LineStraightVaryed, this.LineXVaryed, this.LineExpVaryed], false);
        }
    }

    /**
     * '解析式'按钮
     */
    Analysis() {
        this.viewModel.boolOpen = false;
        this.symmetryImage.isVisible = false;
        if (this.viewModel.buttonAnalysisActived) {
            if (this.mode !== 0) {
                this.Image.isVisible = true;
                if (this.mode === 1) {
                    this.setTipImage(`${y2xxy}`, new Vector3(-8, -8, 0),
                        `${x_1x}`, new Vector3(-8, -8, 0),
                        `${yexx}`, new Vector3(-8, -8, 0));
                    this.viewModel.picmsg = fx;
                } else if (this.mode === 2) {
                    this.setTipImage(`${y2xxy}`, new Vector3(8, 8, 0),
                        `${x_1x}`, new Vector3(8, 8, 0),
                        `${yexxyy}`, new Vector3(8, 8, 0));
                    this.viewModel.picmsg = ffx;
                } else if (this.mode === 3) {
                    this.setTipImage(`${y2x45}`, new Vector3(9, 3, 0),
                        `${x1x}`, new Vector3(8, 2, 0),
                        `${yexy}`, new Vector3(9, 3, 0));
                    this.symmetryImage.isVisible = true;
                    this.viewModel.picmsg = fxf;
                } else if (this.mode === 4) {
                    this.setTipImage(`${y2x}`, new Vector3(8, 8, 0),
                        `${x1x}`, new Vector3(8, 8, 0),
                        `${yexxy}`, new Vector3(8, 8, 0));
                    this.viewModel.picmsg = _f_x;
                }
            } else {
                this.viewModel.buttonAnalysisActived = false;
            }
        } else {
            this.Image.isVisible = false;
        }
    }

    setTipImage(func1: string, pos1: Vector3, func2: string, pos2: Vector3, func3: string, pos3: Vector3) {
        if (this.selectedLineIndex === 1) {
            this.Image.source = func1;
            this.TipImage.position = pos1;
        } else if (this.selectedLineIndex === 2) {
            this.Image.source = func2;
            this.TipImage.position = pos2;
        } else if (this.selectedLineIndex === 3) {
            this.Image.source = func3;
            this.TipImage.position = pos3;
        }
    }

    /** BeforeRender循环 */
    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            if (this.ButtonEvented) {
                if (this.root.rotation !== this.tempAngle) {
                    if (Vector3.Distance(this.root.rotation, this.tempAngle) > 0.005) {
                        this.root.rotation = this.root.rotation.add(this.tempAngle.scale(0.02));
                    } else {
                        this.root.rotation = this.tempAngle;
                        this.ButtonEvented = false;
                        this.LineStraightVaryed.isVisible = this.selectedLineIndex === 1;
                        this.LineXVaryed.isVisible = this.selectedLineIndex === 2;
                        this.LineExpVaryed.isVisible = this.selectedLineIndex === 3;
                    }
                }
            }
        });
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.selectedLineIndex = 0;
        this.selectedLine(1);
        this.Symmetrical(0);
    }
}
