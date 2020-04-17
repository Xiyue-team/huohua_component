/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import { Vector3, Color3, Mesh, LinesMesh, Engine, Scene } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { Fraction } from './Fraction';
import { FormulaLineUtils } from './FormulaLineUtils';
import { FormulasUtils } from './FormulasUtils';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { Color } from '../../../../babylon/Math/Color';

import * as fy from '../sub_static/fy.png';
import * as fx from '../sub_static/fx.png';
import * as fxy from '../sub_static/fxy.png';

import * as y_x from '../sub_static/y_x.png';
import * as y_x100 from '../sub_static/y_x100.png';
import * as y_xint from '../sub_static/y_xint.png';

import * as yx2 from '../sub_static/yx2.png';
import * as yx2w from '../sub_static/yx2w.png';
import * as yx2a from '../sub_static/yx2a.png';
import * as yx2wa from '../sub_static/yx2wa.png';

import * as yx from '../sub_static/yx.png';
import * as yx100 from '../sub_static/yx100.png';
import * as yisx from '../sub_static/yisx.png';
import * as yxint from '../sub_static/yxint.png';
import * as yxint100 from '../sub_static/yxint100.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    selectedLineIndex = 0;
    edgesWidth = 6; //线宽
    coordinateSystem: Coordinate2DSystem; //坐标系

    LineStraightVary: LinesMesh; //变换直线
    LineStraight: LinesMesh; //原直线

    LineX: LinesMesh;  //原1/x线
    LineXVary: LinesMesh; //变换1/x线
    LineXVary2: LinesMesh; //变换1/x线
    LineX2: LinesMesh;  //原x2线
    LineX2Vary: LinesMesh; //变换x2线

    text1: GUI.TextBlock; //公式文本1
    text2: GUI.TextBlock; //公式文本2
    Image: GUI.Image; //公式图片
    TipImage: Mesh; //公式定位点

    valueOne = 0; //滑动条X轴缩放值
    valueTwo = 0; //滑动条Y轴缩放值

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /** 
     * 窗口尺寸重置 
     */
    resize() {
        this.changeCameraSize();
        super.resize();
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
        this.TipImage = new Mesh('TipImage');
        this.TipImage.position = new Vector3(5, 8, 0);
        const options2 = {
            height: 70, width: 70, color: '#6f6f6f',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const ImageLabelOptions = {
            height: '54px', width: '160px', color: Color.StringWhite,
            linkOffsetX: '23px', linkOffsetY: '-18px'
        };
        const options1 = {
            height: 70, width: 70, color: '#ffffff',
            fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const option2 = { color: '#FF5A5A', fontSize: '24px', fontFamily: '', fontStyle: 'bold' };

        this.text1 = FastCreater.TextBlock('2', option2,
            GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_TOP);
        this.text2 = FastCreater.TextBlock('3', option2,
            GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, GUI.Control.VERTICAL_ALIGNMENT_TOP);
        this.Image = LabelUtils.CreateImageTextLabel(advancedTexture, this.TipImage, yx, ImageLabelOptions, [this.text1, this.text2]);
        if (this.isMob) {
            options1.fontSize = options2.fontSize = '36px';
        }

        // 创建坐标系
        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(10, 1, Color3.FromHexString('#6f6f6f'), this.edgesWidth)
            .createAxisLabel(options2).createAxisOLabel(options1)
            .createNumberLabel();

        this.LineStraight = FormulaLineUtils.GetXLine(10, 1, 1, Color.Blue, this.edgesWidth, this.LineStraight, scene);
        this.LineStraightVary = FormulaLineUtils.GetXLine(10, 1, 1, Color.Red, this.edgesWidth, this.LineStraightVary, scene);

        this.LineX = FormulaLineUtils.GetDivideUpdateLine(0.01, 18, 1, 1, Color.Blue, this.edgesWidth, this.LineX, scene);
        this.LineXVary = FormulaLineUtils.GetDivideUpdateL(0.01, 18, 1, 1, Color.Red, this.edgesWidth, this.LineXVary, scene);
        this.LineXVary2 = FormulaLineUtils.GetDivideUpdateL(-0.01, -18, 1, 1, Color.Red, this.edgesWidth, this.LineXVary2, scene);
        this.LineX2 = FormulaLineUtils.GetX2Line(12, 1, 1, Color.Blue, this.edgesWidth, this.LineX2, scene);
        this.LineX2Vary = FormulaLineUtils.GetX2Line(12, 1, 1, Color.Red, this.edgesWidth, this.LineX2Vary, scene);
        this.selectedLine(1);
        return scene;
    }

    /**
     * 选择表达式
     * @param index 
     */
    selectedLine(index: number) {
        if (this.selectedLineIndex !== index) {
            this.selectedLineIndex = index;
            this.viewModel.sliderNumber = this.viewModel.sliderNumber2 = 10;
            this.viewModel.buttonActivedX = this.viewModel.buttonActivedY = false;
            this.ButtonEventX();
            this.ButtonEventY();
            this.setMeshVisible([this.LineX2, this.LineStraight, this.LineX], false);
            this.setMeshVisible([this.LineX2Vary, this.LineStraightVary, this.LineXVary, this.LineXVary2], false);
            this.viewModel.buttonActived1 = false;
            this.ButtonEvent2();
            this.LineStraight.isVisible = index === 1;
            this.LineX.isVisible = index === 2;
            this.LineX2.isVisible = index === 3;
        }
    }

    /**
     * '横坐标伸缩'按钮
     */
    ButtonEventX() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActivedX) {
            this.LineStraightVary.isVisible = this.selectedLineIndex === 1;
            this.LineXVary.isVisible = this.LineXVary2.isVisible = this.selectedLineIndex === 2;
            this.LineX2Vary.isVisible = this.selectedLineIndex === 3;
        } else {
            this.viewModel.sliderNumber = 10;
        }
        this.ButtonEvent2();
    }
    /**
     * '纵坐标伸缩'按钮
     */
    ButtonEventY() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActivedY) {
            this.LineStraightVary.isVisible = this.selectedLineIndex === 1;
            this.LineXVary.isVisible = this.LineXVary2.isVisible = this.selectedLineIndex === 2;
            this.LineX2Vary.isVisible = this.selectedLineIndex === 3;
        } else {
            this.viewModel.sliderNumber2 = 10;
        }
        this.ButtonEvent2();
    }

    /**
     * 更新公式文本
     */
    changeText(e: number) {
        this.valueOne = this.viewModel.sliderNumber > 10 ?
            Math.floor(this.viewModel.sliderNumber / 10) : this.viewModel.sliderNumber / 10;
        this.valueTwo = this.viewModel.sliderNumber2 > 10 ?
            Math.floor(this.viewModel.sliderNumber2 / 10) : this.viewModel.sliderNumber2 / 10;

        if (this.selectedLineIndex === 1) {
            this.changeTextX();
        } else if (this.selectedLineIndex === 2) {
            this.changeText1_X();
        } else if (this.selectedLineIndex === 3) {
            this.changeTextX2();
        }
    }


    changeTextX() {
        const oneV = this.valueOne * 10;
        const twoV = this.valueTwo * 10;
        const v = new Fraction().appointment(oneV, twoV);
        if (v.x === v.y) {
            this.text1.text = ``;
            this.text2.text = ``;
            this.Image.source = `${yisx}`;
        } else {
            this.text1.paddingLeft = '65px';
            this.text2.paddingLeft = '65px';
            this.text2.paddingTop = '25px';
            this.text1.paddingTop = '0px';
            if (v.y % v.x === 0) {
                this.text1.text = ``;
                this.text2.paddingTop = '15px';
                this.text2.text = `${v.y}`;
                this.text2.paddingLeft = v.y < 10 ? '80px' : '65px';
                if (v.y === 100) {
                    this.Image.source = yxint100;
                } else {
                    this.Image.source = yxint;
                }
            } else {
                this.text1.text = `${v.y}`;
                this.text2.text = `${v.x}`;
                if (v.x === 100) {
                    this.Image.source = yx100;
                    this.text1.paddingLeft = v.y < 10 ? '75px' : '70px';
                } else {
                    this.Image.source = yx;
                    this.text2.paddingLeft = v.x < 10 ? '65px' : '60px';
                }
            }
        }
        this.updateMeshVertData(this.LineStraightVary, Vector3Utils.ToArray(FormulasUtils.GetXVertices(10, this.valueOne, this.valueTwo)));
    }

    changeText1_X() {
        const oneV = this.valueOne * 10;
        const twoV = this.valueTwo * 10;
        const v = new Fraction().appointment(oneV, twoV);
        this.text1.paddingLeft = '85px';
        this.text2.paddingLeft = '65px';
        this.text1.paddingTop = '0px';
        this.text2.paddingTop = '25px';
        if (v.y % v.x === 0) {
            this.text1.text = `${v.y}`;
            this.text1.paddingLeft = v.y < 10 ? '90px' : '85px';
            this.text2.text = '';
            this.Image.source = y_xint;
        } else {
            this.text2.text = `${v.x}`;
            if (v.x < 10) {
                this.text2.paddingLeft = '78px';
            }
            this.text1.text = `${v.y}`;
            if (v.x === 100) {
                this.text1.paddingLeft = v.y < 10 ? '90px' : '85px';
                this.Image.source = y_x100;
            } else {
                this.Image.source = y_x;
            }

        }
        const vertices = FormulasUtils.GetDivideXVertices(-0.01, -18, this.valueOne, this.valueTwo);
        const vertices2 = FormulasUtils.GetDivideXVertices(0.01, 18, this.valueOne, this.valueTwo);
        this.updateMeshVertData(this.LineXVary, Vector3Utils.ToArray(vertices));
        this.updateMeshVertData(this.LineXVary2, Vector3Utils.ToArray(vertices2));
    }

    changeTextX2() {
        this.text1.paddingLeft = '85px';
        this.text2.paddingLeft = '62px';
        this.text2.paddingTop = '15px';
        this.text1.paddingTop = '0px';
        if (this.valueTwo === 1 && this.valueOne === 1) {
            this.text1.text = ``;
            this.text2.text = ``;
            this.Image.source = yx2;
        } else if (this.valueOne === 1) {
            this.text1.text = ``;
            this.text2.text = `${this.valueTwo}`;
            this.Image.source = yx2w;
            if (this.valueTwo < 10 && this.valueTwo > 0.9) {
                this.text2.paddingLeft = '80px';
            } else if (this.valueTwo < 0.9) {
                this.text2.paddingLeft = '62px';
            } else {
                this.text2.paddingLeft = '65px';
            }
        } else if (this.valueTwo === 1) {
            this.text1.text = ``;
            this.text2.text = `${this.valueOne}`;
            this.text2.paddingTop = '25px';
            if (this.valueOne < 10 && this.valueOne > 0.9) {
                this.text2.paddingLeft = '75px';
            } else {
                this.text2.paddingLeft = '70px';
            }
            this.Image.source = yx2a;
        } else {
            this.text1.paddingTop = '25px';
            this.text1.text = `${this.valueOne}`;
            this.text1.paddingLeft = this.valueOne < 10 && this.valueOne > 0.9 ? '108px' : '102px';
            this.text2.paddingLeft = this.valueTwo < 10 && this.valueTwo > 0.9 ? '75px' : '60px';
            this.text2.text = `${this.valueTwo}`;
            this.Image.source = yx2wa;
        }
        this.updateMeshVertData(this.LineX2Vary,
            Vector3Utils.ToArray(FormulasUtils.GetX2Vertices(12, this.valueOne, this.valueTwo)));
    }
    /**
     * '解析式'按钮
     */
    ButtonEvent2() {
        this.viewModel.boolOpen = false;
        if (this.viewModel.buttonActived1 && (this.viewModel.buttonActivedX || this.viewModel.buttonActivedY)) {
            this.setGUIVisible([this.text1, this.text2, this.Image], true);
            if (this.viewModel.buttonActivedX && !this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fx;
            } else if (!this.viewModel.buttonActivedX && this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fy;
            } else if (this.viewModel.buttonActivedX && this.viewModel.buttonActivedY) {
                this.viewModel.picmsg = fxy;
            }

            if (this.selectedLineIndex === 1) {
                this.Image.source = yx;
            } else if (this.selectedLineIndex === 2) {
                this.Image.source = y_x;
            } else if (this.selectedLineIndex === 3) {
                this.Image.source = yx2;
            }
            this.changeText(0);
        } else {
            this.viewModel.buttonActived1 = false;
            this.setGUIVisible([this.text1, this.text2, this.Image], false);
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
