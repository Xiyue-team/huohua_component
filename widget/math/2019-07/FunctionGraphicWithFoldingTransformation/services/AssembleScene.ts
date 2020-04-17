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
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Color } from '../../../../babylon/Math/Color';
import { LinesUtils } from './LinesUtils';

import * as fx1 from '../sub_static/yf1x1.png';
import * as fx2 from '../sub_static/y1f1.png';

import * as ylnx from '../sub_static/expression/ylnx.png';
import * as ylnx1 from '../sub_static/expression/ylnx1.png';
import * as yx from '../sub_static/expression/yx.png';
import * as yx1 from '../sub_static/expression/yx1.png';
import * as yx2 from '../sub_static/expression/yx2.png';
import * as yx21 from '../sub_static/expression/yx21.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    selectedLineIndex = 0;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    mode = 0;

    tempAngle = new Vector3(0, 0, 0);
    //y=x
    LineStraight: LinesMesh;
    LineStraightXVary: LinesMesh;
    LineStraightYVary: LinesMesh;
    LineStraightXYVaryed: LinesMesh;
    //y=1/x
    LineX: LinesMesh;
    LineXVaryX: LinesMesh;
    LineXVaryY: LinesMesh;
    LineXVaryX2ed: LinesMesh;
    LineXVaryY2ed: LinesMesh;
    LineXVaryed: LinesMesh;
    //y=x2
    LineX2: LinesMesh;
    LineX2VaryX: LinesMesh;
    LineX2VaryY: LinesMesh;
    LineX2VaryX2ed: LinesMesh;
    LineX2VaryY2ed: LinesMesh;
    //y=lnx
    LineLnX: LinesMesh;
    LineLnXVaryX: LinesMesh;
    LineLnXVaryY: LinesMesh;
    LineLnXVaryYed: LinesMesh;
    LineLnXVaryXed: LinesMesh;

    Image: GUI.Image; //变换后公式图片
    TipImage: Mesh; //变换后公式定位点
    root: TransformNode;
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
        const ImageLabelOptions = {
            height: '58px', width: '136px', color: Color.StringWhite,
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
            ImageLabelOptions.height = '116px';
            ImageLabelOptions.width = '272px';
            ImageLabelOptions.linkOffsetX = '46px';
            ImageLabelOptions.linkOffsetY = '-36px';
            options1.fontSize = options2.fontSize = '36px';
        }

        this.Image = LabelUtils.CreateImageLabelLeft(advancedTexture, this.TipImage, `${yx}`, ImageLabelOptions);
        this.Image.isVisible = false;
        // 创建坐标系
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisLabel(options2).createAxisOLabel(options1)
            .createNumberLabel();

        this.root = new TransformNode('root');

        this.LineStraight = LinesBuild.CreateLines([new Vector3(-8, -8, 0), new Vector3(8, 8, 0)], Color.Blue, this.edgesWidth, scene);
        this.LineX = FormulaLineUtils.GetDivideLine(1, 10, Color.Blue, this.edgesWidth, scene);
        this.LineX2 = LinesUtils.GetX2Line(-10, 10, Color.Blue, this.edgesWidth, scene);
        this.LineLnX = FormulaLineUtils.GetLnXLine(0.1, 10, Color.Blue, this.edgesWidth, scene);

        this.LineStraightXVary = LinesBuild.CreateDashedLines([new Vector3(-8, -8, 0), Vector3.Zero()], Color.Red, this.edgesWidth, scene);
        this.LineStraightYVary = LinesBuild.CreateDashedLines([new Vector3(8, 8, 0), Vector3.Zero()], Color.Red, this.edgesWidth, scene);
        this.LineStraightXYVaryed = LinesBuild.CreateLines([new Vector3(-8, 8, 0), Vector3.Zero(), new Vector3(8, 8, 0)],
            Color.Red, this.edgesWidth, scene);

        this.LineXVaryX = FormulaLineUtils.GetDivideDashedPartLine(-1, -10, Color.Red, this.edgesWidth, scene);
        this.LineXVaryY = FormulaLineUtils.GetDivideDashedPartLine(1, 10, Color.Red, this.edgesWidth, scene);
        this.LineXVaryed = FormulaLineUtils.GetDividePartLine(1, 10, Color.Red, this.edgesWidth, scene);
        this.LineXVaryX2ed = FormulaLineUtils.GetDividePartLine(-1, -10, Color.Red, this.edgesWidth, scene);
        this.LineXVaryY2ed = FormulaLineUtils.GetDividePartLine(1, 10, Color.Red, this.edgesWidth, scene);

        this.LineX2VaryX = LinesUtils.GetX2DashedLine(-1, 2, Color.Red, this.edgesWidth, scene);
        this.LineX2VaryY = LinesUtils.GetX2DashedLine(0, 10, Color.Red, this.edgesWidth, scene, 90);
        this.LineX2VaryX2ed = LinesUtils.GetX2LineX(-10, 10, Color.Red, this.edgesWidth, scene);
        this.LineX2VaryY2ed = LinesUtils.GetX2LineY(-10, 10, Color.Red, this.edgesWidth, scene);

        this.LineLnXVaryX = FormulaLineUtils.GetLnXDashedLine(0.1, 1, Color.Red, this.edgesWidth, scene, 20);
        this.LineLnXVaryY = FormulaLineUtils.GetLnXDashedLine(0.1, 10, Color.Red, this.edgesWidth, scene, 90);

        this.LineLnXVaryXed = FormulaLineUtils.GetLnXLineX(0.1, 10, Color.Red, this.edgesWidth, scene);
        this.LineLnXVaryYed = FormulaLineUtils.GetLnXLine(0.1, 10, Color.Red, this.edgesWidth, scene);

        this.TipImage.setParent(this.root);
        this.LineStraightXVary.setParent(this.root);
        this.LineStraightYVary.setParent(this.root);
        this.LineXVaryX.setParent(this.root);
        this.LineXVaryY.setParent(this.root);
        this.LineXVaryX2ed.setParent(this.root);
        this.LineXVaryY2ed.setParent(this.root);

        this.LineX2VaryX.setParent(this.root);
        this.LineX2VaryY.setParent(this.root);

        this.LineLnXVaryX.setParent(this.root);
        this.LineLnXVaryY.setParent(this.root);

        this.LineLnXVaryYed.setParent(this.root);
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
            this.viewModel.analysisButtonActived = false;
            this.Analysis();
            this.selectedLineIndex = index;
            this.viewModel.buttonActived = 0;
            this.ButtonEvented = false;
            this.LineStraight.isVisible = index === 1;
            this.LineX.isVisible = index === 2;
            this.LineX2.isVisible = index === 3;
            this.LineLnX.isVisible = index === 4;

            this.setMeshVisible([this.LineStraightXYVaryed,
            this.LineXVaryed, this.LineXVaryX2ed, this.LineXVaryY2ed,
            this.LineLnXVaryX, this.LineLnXVaryY, this.LineLnXVaryYed, this.LineLnXVaryXed,
            this.LineX2VaryX, this.LineX2VaryY, this.LineX2VaryX2ed, this.LineX2VaryY2ed,
            this.LineStraightXVary, this.LineStraightYVary,
            this.LineXVaryX, this.LineXVaryY], false);
        }
    }

    /**
     * '证明'按钮
     */
    Folding(index: number) {
        this.viewModel.boolOpen = false;
        this.root.rotation = Vector3.Zero();
        this.mode = index;
        this.viewModel.analysisButtonActived = false;
        this.Analysis();
        if (this.mode === 1) {
            this.tempAngle = new Vector3(Math.PI, 0, 0);
            if (this.selectedLineIndex === 1) {
                this.LineStraightXVary.isVisible = true;
                this.LineStraightYVary.isVisible = false;
            } else if (this.selectedLineIndex === 2) {
                this.LineXVaryX.isVisible = true;
                this.LineXVaryY.isVisible = false;
            } else if (this.selectedLineIndex === 3) {
                this.LineX2VaryX.isVisible = true;
                this.LineX2VaryY2ed.isVisible =
                    this.LineX2VaryY.isVisible = false;
            } else if (this.selectedLineIndex === 4) {
                this.LineLnXVaryX.isVisible = true;
                this.LineLnXVaryYed.isVisible =
                    this.LineLnXVaryY.isVisible = false;
            }
        } else if (this.mode === 2) {
            this.tempAngle = new Vector3(0, Math.PI, 0);
            if (this.selectedLineIndex === 1) {
                this.LineStraightXVary.isVisible = false;
                this.LineStraightYVary.isVisible = true;
            } else if (this.selectedLineIndex === 2) {
                this.LineXVaryX.isVisible = false;
                this.LineXVaryY.isVisible = true;
            } else if (this.selectedLineIndex === 3) {
                this.LineX2VaryX2ed.isVisible =
                    this.LineX2VaryX.isVisible = false;
                this.LineX2VaryY.isVisible = true;
            } else if (this.selectedLineIndex === 4) {
                this.LineLnXVaryXed.isVisible =
                    this.LineLnXVaryX.isVisible = false;
                this.LineLnXVaryY.isVisible = true;
            }
        }

        if (this.mode !== 0) {
            this.ButtonEvented = true;
            this.setMeshVisible([this.LineStraightXYVaryed, this.LineXVaryed, this.LineXVaryX2ed, this.LineXVaryY2ed], false);
        }
    }

    /**
     * '解析式'按钮
     */
    Analysis() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.analysisButtonActived) {
            if (this.mode === 1) {
                this.Image.isVisible = true;
                // this.viewModel.picmsg = fx1;
                if (this.selectedLineIndex === 1) {
                    this.Image.source = `${yx}`;
                    this.TipImage.position = new Vector3(-11, -5, 0);
                } else if (this.selectedLineIndex === 2) {
                    this.Image.source = `${yx1}`;
                    this.TipImage.position = new Vector3(-11, -5, 0);
                } else if (this.selectedLineIndex === 3) {
                    this.Image.source = `${yx21}`;
                    this.TipImage.position = new Vector3(-11, -5, 0);
                } else if (this.selectedLineIndex === 4) {
                    this.Image.source = `${ylnx1}`;
                    this.TipImage.position = new Vector3(-2, -2, 0);
                }
            } else if (this.mode === 2) {
                this.Image.isVisible = true;
                // this.viewModel.picmsg = fx2;
                if (this.selectedLineIndex === 1) {
                    this.Image.source = `${yx}`;
                    this.TipImage.position = new Vector3(11, 5, 0);
                } else if (this.selectedLineIndex === 2) {
                    this.Image.source = `${yx1}`;
                    this.TipImage.position = new Vector3(11, 5, 0);
                } else if (this.selectedLineIndex === 3) {
                    this.Image.source = `${yx2}`;
                    this.TipImage.position = new Vector3(11, 5, 0);
                } else if (this.selectedLineIndex === 4) {
                    this.Image.source = `${ylnx}`;
                    this.TipImage.position = new Vector3(8, 3, 0);
                }
            } else {
                this.viewModel.analysisButtonActived = false;
            }
        } else {
            this.Image.isVisible = false;
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
                        this.LineStraightXYVaryed.isVisible = this.selectedLineIndex === 1;
                        this.LineXVaryed.isVisible = this.selectedLineIndex === 2;
                        this.LineXVaryX2ed.isVisible = this.selectedLineIndex === 2 ? this.mode === 1 : false;
                        this.LineXVaryY2ed.isVisible = this.selectedLineIndex === 2 ? this.mode === 2 : false;
                        this.LineX2VaryX2ed.isVisible = this.selectedLineIndex === 3 ? this.mode === 1 : false;
                        this.LineX2VaryY2ed.isVisible = this.selectedLineIndex === 3 ? this.mode === 2 : false;
                        this.LineLnXVaryXed.isVisible = this.selectedLineIndex === 4 ? this.mode === 1 : false;
                        this.LineLnXVaryYed.isVisible = this.selectedLineIndex === 4 ? this.mode === 2 : false;
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
        this.Analysis();
        this.setMeshVisible([this.LineStraightXYVaryed, this.LineStraightXVary, this.LineStraightYVary], false);
    }
}
