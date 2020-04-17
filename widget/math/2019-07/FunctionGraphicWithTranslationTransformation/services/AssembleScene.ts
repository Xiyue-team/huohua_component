/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import { Vector3, Color3, Mesh, LinesMesh, Scene, Engine, TransformNode } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Color } from '../../../../babylon/Math/Color';

import * as fx from '../sub_static/fx.png';
import * as fxy from '../sub_static/fxy.png';
import * as fy from '../sub_static/fy.png';

import * as a1 from '../sub_static/a1.png';
import * as a2 from '../sub_static/a2.png';
import * as a3 from '../sub_static/a3.png';
import * as a4 from '../sub_static/a4.png';
import * as a5 from '../sub_static/a5.png';
import * as a22 from '../sub_static/a22.png';
import * as a32 from '../sub_static/a32.png';
import * as a42 from '../sub_static/a42.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    selectedLineIndex = 0;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系
    mode = 0;

    //y=x
    LineStraightVary: LinesMesh;
    LineStraight: LinesMesh;
    //y=1/x
    LineX: LinesMesh;
    LineXVary: LinesMesh;
    //y=x2
    LineX2: LinesMesh;
    LineX2Vary: LinesMesh;
    //y=lnx
    LineLnX: LinesMesh;
    LineLnXVary: LinesMesh;
    //y=ex
    LineExp: LinesMesh;
    LineExpVary: LinesMesh;

    text1: GUI.TextBlock;
    text2: GUI.TextBlock;
    text3: GUI.TextBlock;
    Image: GUI.Image;
    TipImage: Mesh;
    root: TransformNode;
    valueOne: number; //滑动条X轴平移值
    valueTwo: number; //滑动条y轴平移值

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
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
        this.createTargetCamera4Math(scene, 22);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.TipImage = new Mesh('');
        const ImageLabelOptions = {
            height: '64px', width: '310px', color: '#FFFFFF',
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const option2 = { color: '#FF5A5A', fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'bold italic' };
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        if (this.isMob) {
            options1.fontSize = options2.fontSize = '36px';
        }

        this.text1 = FastCreater.TextBlock('2', option2);
        this.text1.paddingLeft = '108px';
        this.text1.paddingTop = '0px';
        this.text1.textWrapping = GUI.TextWrapping.Clip;

        this.text2 = FastCreater.TextBlock('1', option2, GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_TOP);
        this.text2.paddingLeft = '85px';
        this.text2.paddingTop = '0px';
        this.text2.textWrapping = GUI.TextWrapping.Clip;

        this.text3 = FastCreater.TextBlock('1', option2, GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_TOP);
        this.text3.paddingLeft = '85px';
        this.text3.paddingTop = '0px';
        this.text3.textWrapping = GUI.TextWrapping.Clip;

        this.Image = LabelUtils.CreateImageTextLabel(advancedTexture, this.TipImage, a1, ImageLabelOptions,
            [this.text1, this.text2, this.text3]);
        // 创建坐标系
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisLabel(options2).createAxisOLabel(options1).createNumberLabel();
        this.root = new TransformNode('root');
        this.TipImage.position = new Vector3(3, -3, 0);
        this.TipImage.setParent(this.root);
        this.LineStraight = LinesBuild.CreateLines([new Vector3(-8, -8, 0), new Vector3(8, 8, 0)], Color.Blue, this.edgesWidth, scene);
        this.LineStraightVary = LinesBuild.CreateLines([new Vector3(-8, -8, 0), new Vector3(8, 8, 0)], Color.Red, this.edgesWidth, scene);

        this.LineX = FormulaLineUtils.GetDivideLine(1, 10, Color.Blue, this.edgesWidth, scene);
        this.LineXVary = FormulaLineUtils.GetDivideLine(1, 10, Color.Red, this.edgesWidth, scene);

        this.LineX2 = FormulaLineUtils.GetX2Line(-10, 10, Color.Blue, this.edgesWidth, scene);
        this.LineX2Vary = FormulaLineUtils.GetX2Line(-10, 10, Color.Red, this.edgesWidth, scene);

        this.LineLnX = FormulaLineUtils.GetLnXLine(0.1, 10, Color.Blue, this.edgesWidth, scene);
        this.LineLnXVary = FormulaLineUtils.GetLnXLine(0.1, 10, Color.Red, this.edgesWidth, scene);

        this.LineExp = FormulaLineUtils.GetExpLine(-10, 10, Color.Blue, this.edgesWidth, scene);
        this.LineExpVary = FormulaLineUtils.GetExpLine(-10, 10, Color.Red, this.edgesWidth, scene);

        this.LineStraightVary.setParent(this.root);
        this.LineXVary.setParent(this.root);
        this.LineExpVary.setParent(this.root);
        this.LineX2Vary.setParent(this.root);
        this.LineLnXVary.setParent(this.root);

        this.selectedLine(1);
        this.viewModel.buttonActived1 = false;
        this.ButtonEvent2();
        return scene;
    }

    /**
     * 选择表达式
     * @param index
     */
    selectedLine(index: number) {
        if (this.selectedLineIndex !== index) {
            this.viewModel.buttonActivedX = this.viewModel.buttonActivedY = false;
            this.ButtonEventX();
            this.ButtonEventY();
            this.selectedLineIndex = index;
            this.setMeshVisible([this.LineX2, this.LineStraight, this.LineX, this.LineLnX, this.LineExp], false);
            this.setMeshVisible([this.LineX2Vary, this.LineStraightVary, this.LineXVary, this.LineLnXVary, this.LineExpVary], false);
            this.viewModel.buttonActived1 = false;
            this.ButtonEvent2();
            this.LineStraight.isVisible = index === 1;
            this.LineX.isVisible = index === 2;
            this.LineX2.isVisible = index === 3;
            this.LineLnX.isVisible = index === 4;
            this.LineExp.isVisible = index === 5;
        }
    }

    /**
     * '左右平移'按钮
     */
    ButtonEventX() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActivedX) {
            this.LineStraightVary.isVisible = this.selectedLineIndex === 1;
            this.LineXVary.isVisible = this.selectedLineIndex === 2;
            this.LineX2Vary.isVisible = this.selectedLineIndex === 3;
            this.LineLnXVary.isVisible = this.selectedLineIndex === 4;
            this.LineExpVary.isVisible = this.selectedLineIndex === 5;
        } else {
            this.viewModel.sliderNumber = 0;
            this.formatter(0);
        }
        this.ButtonEvent2();
    }

    /**
     * '上下平移'按钮
     */
    ButtonEventY() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActivedY) {
            this.LineStraightVary.isVisible = this.selectedLineIndex === 1;
            this.LineXVary.isVisible = this.selectedLineIndex === 2;
            this.LineX2Vary.isVisible = this.selectedLineIndex === 3;
            this.LineLnXVary.isVisible = this.selectedLineIndex === 4;
            this.LineExpVary.isVisible = this.selectedLineIndex === 5;
        } else {
            this.viewModel.sliderNumber2 = 0;
            this.formatter2(0);
        }
        this.ButtonEvent2();
    }

    /**
     * '左右平移'滑动条返回值
     */
    formatter(e: number) {
        this.root.position.x = -e;
        this.valueOne = e;
        if (this.viewModel.buttonActived1) {
            this.changeText();
        }
    }

    /**
     * '上下平移'滑动条返回值
     */
    formatter2(e: number) {
        this.root.position.y = e;
        this.valueTwo = e;
        if (this.viewModel.buttonActived1) {
            this.changeText();
        }
    }

    changeText() {
        this.text2.isVisible = false;
        this.text3.fontSize = '24px';
        this.text1.text = this.valueTwo < 0 ? `- ${Math.abs(this.valueTwo)}` : this.valueTwo === 0 ? '' : `+ ${Math.abs(this.valueTwo)}`;
        if (this.valueOne === 0) {
            this.text1.paddingLeft = '108px';
            this.text3.isVisible = false;
            if (this.selectedLineIndex === 1) {
                this.Image.source = a1;
                const txt = this.valueOne + this.valueTwo;
                this.text1.text = txt < 0 ? `- ${Math.abs(txt)}` : txt === 0 ? '' : `+ ${Math.abs(txt)}`;
            } else if (this.selectedLineIndex === 2) {
                this.Image.source = a2;
                this.text2.paddingLeft = '85px';
                this.text2.isVisible = true;
            } else if (this.selectedLineIndex === 3) {
                this.Image.source = a3;
            } else if (this.selectedLineIndex === 4) {
                this.Image.source = a4;
            } else if (this.selectedLineIndex === 5) {
                this.Image.source = a5;
            }
        } else {
            this.text3.isVisible = true;
            this.text3.text = this.valueOne < 0 ?
                `- ${Math.abs(this.valueOne)}` : this.valueOne === 0 ? '' : `+ ${Math.abs(this.valueOne)}`;
            if (this.selectedLineIndex === 1) {
                this.Image.source = a1;
                this.text1.paddingLeft = '108px';
                const txt = this.valueOne + this.valueTwo;
                this.text1.text = txt < 0 ? `- ${Math.abs(txt)}` : txt === 0 ? '' : `+ ${Math.abs(txt)}`;
                this.text3.isVisible = false;
            } else if (this.selectedLineIndex === 2) {
                this.Image.source = a22;
                this.text2.paddingLeft = '105px';
                this.text2.isVisible = true;
                this.text1.paddingLeft = '165px';
                this.text3.paddingTop = '32px';
                this.text3.paddingLeft = '105px';
            } else if (this.selectedLineIndex === 3) {
                this.Image.source = a32;
                this.text1.paddingLeft = '153px';
                this.text3.paddingTop = '20px';
                this.text3.paddingLeft = this.valueOne < -9 ? '90px' : this.valueOne > 9 ? '85px' : '95px';
            } else if (this.selectedLineIndex === 4) {
                this.Image.source = a42;
                this.text1.paddingLeft = '168px';
                this.text3.paddingTop = '20px';
                this.text3.paddingLeft = this.valueOne < -9 || this.valueOne > 9 ? '112px' : '120px';
            } else if (this.selectedLineIndex === 5) {
                this.Image.source = a5;
                this.text1.paddingLeft = '135px';
                this.text3.fontSize = '16px';
                this.text3.paddingTop = '15px';
                this.text3.paddingLeft = '105px';
            }
        }
    }

    /**
     * '解析式'按钮
     */
    ButtonEvent2() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActived1 && (this.viewModel.buttonActivedX || this.viewModel.buttonActivedY)) {
            this.text1.isVisible = this.Image.isVisible = true;
            if (this.viewModel.buttonActivedX && !this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fx;
            } else if (!this.viewModel.buttonActivedX && this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fy;
            } else if (this.viewModel.buttonActivedX && this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fxy;
            }
            this.changeText();
        } else {
            this.viewModel.buttonActived1 = false;
            this.text1.isVisible = this.text2.isVisible = this.text3.isVisible = this.Image.isVisible = false;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.selectedLineIndex = 0;
        this.selectedLine(1);
    }
}
