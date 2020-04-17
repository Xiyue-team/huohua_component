import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { InitialImgConfig } from './InitialImgConfig';
import { HLightImgConfig } from './HLightImgConfig';
import { ComparedImgConfig } from './ComparedImgConfig';

import * as initialFormulaOne_A from '../sub_static/initialFormulaOne_A.png';
import * as initialFormulaTwo_A from '../sub_static/initialFormulaTwo_A.png';
import * as initialFormulaThree_A from '../sub_static/initialFormulaThree_A.png';
import * as initialFormulaFour_A from '../sub_static/initialFormulaFour_A.png';
import * as initialFormulaFive_A from '../sub_static/initialFormulaFive_A.png';
import * as initialFormulaSix_A from '../sub_static/initialFormulaSix_A.png';

import * as initialFormulaOne_B from '../sub_static/initialFormulaOne_B.png';
import * as initialFormulaTwo_B from '../sub_static/initialFormulaTwo_B.png';
import * as initialFormulaThree_B from '../sub_static/initialFormulaThree_B.png';
import * as initialFormulaFour_B from '../sub_static/initialFormulaFour_B.png';
import * as initialFormulaFive_B from '../sub_static/initialFormulaFive_B.png';
import * as initialFormulaSix_B from '../sub_static/initialFormulaSix_B.png';

import * as hLightFormulaOne_A from '../sub_static/hLightFormulaOne_A.png';
import * as hLightFormulaTwo_A from '../sub_static/hLightFormulaTwo_A.png';
import * as hLightFormulaThree_A from '../sub_static/hLightFormulaThree_A.png';
import * as hLightFormulaFour_A from '../sub_static/hLightFormulaFour_A.png';
import * as hLightFormulaFive_A from '../sub_static/hLightFormulaFive_A.png';
import * as hLightFormulaSix_A from '../sub_static/hLightFormulaSix_A.png';

import * as hLightFormulaOne_B from '../sub_static/hLightFormulaOne_B.png';
import * as hLightFormulaTwo_B from '../sub_static/hLightFormulaTwo_B.png';
import * as hLightFormulaThree_B from '../sub_static/hLightFormulaThree_B.png';
import * as hLightFormulaFour_B from '../sub_static/hLightFormulaFour_B.png';
import * as hLightFormulaFive_B from '../sub_static/hLightFormulaFive_B.png';
import * as hLightFormulaSix_B from '../sub_static/hLightFormulaSix_B.png';

import * as leftFormulaOne from '../sub_static/leftFormulaOne.png';
import * as leftFormulaTwo from '../sub_static/leftFormulaTwo.png';
import * as leftFormulaThree from '../sub_static/leftFormulaThree.png';
import * as leftFormulaFour from '../sub_static/leftFormulaFour.png';
import * as leftFormulaFive from '../sub_static/leftFormulaFive.png';
import * as leftFormulaSix from '../sub_static/leftFormulaSix.png';

import * as rightFormulaOne from '../sub_static/rightFormulaOne.png';
import * as rightFormulaTwo from '../sub_static/rightFormulaTwo.png';
import * as rightFormulaThree from '../sub_static/rightFormulaThree.png';
import * as rightFormulaFour from '../sub_static/rightFormulaFour.png';
import * as rightFormulaFive from '../sub_static/rightFormulaFive.png';
import * as rightFormulaSix from '../sub_static/rightFormulaSix.png';

export class TshsCanvas extends SimpleKonvaTemplate {

  initialFormula_AImg: Konva.Image[] = [];
  initialFormula_BImg: Konva.Image[] = [];

  hLightFormula_AImg: Konva.Image[] = [];
  hLightFormula_BImg: Konva.Image[] = [];

  leftFormula: Konva.Image[] = [];
  rightFormula: Konva.Image[] = [];

  initialGroup1: Konva.Group;
  initialGroup2: Konva.Group;
  initialGroup3: Konva.Group;
  initialGroup4: Konva.Group;
  initialGroup5: Konva.Group;
  initialGroup6: Konva.Group;

  config: any;
  hLightConfig: any;
  comparedConfig: any;

  width = window.innerWidth;
  height = window.innerHeight;

  leftGrayPlane: any;

  constructor() {
      super('3dContainer');
      this.config = new InitialImgConfig();
      this.hLightConfig = new HLightImgConfig();
      this.comparedConfig = new ComparedImgConfig();

      this.initialGroup1 = new Konva.Group();
      this.initialGroup2 = new Konva.Group();
      this.initialGroup3 = new Konva.Group();
      this.initialGroup4 = new Konva.Group();
      this.initialGroup5 = new Konva.Group();
      this.initialGroup6 = new Konva.Group();

      this.drawText();
      this.drawGrayPlane();
      this.initImage();
      this.initHLightImage();
      this.initComparedImage();
      this.bindEvent();
  }

  //绘制文字
  drawText() {
    let fontSize;
    if ((window as any)['env'].browserInfo.isSmallDevice) {
        fontSize = 16;
    } else {
        fontSize = 24;
    }
    const simpleText = new Konva.Text({
      x: this.stage.getWidth() * 0.078,
      y: this.stage.getHeight() * 0.179,
      text: '原函数',
      fontSize: fontSize,
      fontFamily: 'STSongti-SC-Regular',
      fill: '#000'
    });
    this.staticLayer.add(simpleText);
    this.stage.add(this.staticLayer);
  }

  //绘制左边灰色框
  drawGrayPlane() {
      this.leftGrayPlane = new Konva.Rect({
          x: 0,
          y: 0,
          width: this.width / 2,
          height: this.height,
          fill: '#F5F5F5'
      });
      this.leftGrayPlane.visible(false);
      this.staticLayer.add(this.leftGrayPlane);
  }

  //加载初始图片
  async initImage() {
      //初始函数
      this.initialFormula_AImg[0] = await this.loadImage((initialFormulaOne_A as any), this.config.initialFormulaOne_AImg as any);
      this.initialGroup1.add(this.initialFormula_AImg[0]);
      this.staticLayer.add(this.initialGroup1);

      this.initialFormula_AImg[1] = await this.loadImage((initialFormulaTwo_A as any), this.config.initialFormulaTwo_AImg as any);
      this.initialGroup2.add(this.initialFormula_AImg[1]);
      this.staticLayer.add(this.initialGroup2);

      this.initialFormula_AImg[2] = await this.loadImage((initialFormulaThree_A as any), this.config.initialFormulaThree_AImg as any);
      this.initialGroup3.add(this.initialFormula_AImg[2]);
      this.staticLayer.add(this.initialGroup3);

      this.initialFormula_AImg[3] = await this.loadImage((initialFormulaFour_A as any), this.config.initialFormulaFour_AImg as any);
      this.initialGroup4.add(this.initialFormula_AImg[3]);
      this.staticLayer.add(this.initialGroup4);

      this.initialFormula_AImg[4] = await this.loadImage((initialFormulaFive_A as any), this.config.initialFormulaFive_AImg as any);
      this.initialGroup5.add(this.initialFormula_AImg[4]);
      this.staticLayer.add(this.initialGroup5);

      this.initialFormula_AImg[5] = await this.loadImage((initialFormulaSix_A as any), this.config.initialFormulaSix_AImg as any);
      this.initialGroup6.add(this.initialFormula_AImg[5]);
      this.staticLayer.add(this.initialGroup6);

      //求导函数
      this.initialFormula_BImg[0] = await this.loadImage((initialFormulaOne_B as any), this.config.initialFormulaOne_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[0]);

      this.initialFormula_BImg[1] = await this.loadImage((initialFormulaTwo_B as any), this.config.initialFormulaTwo_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[1]);

      this.initialFormula_BImg[2] = await this.loadImage((initialFormulaThree_B as any), this.config.initialFormulaThree_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[2]);

      this.initialFormula_BImg[3] = await this.loadImage((initialFormulaFour_B as any), this.config.initialFormulaFour_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[3]);

      this.initialFormula_BImg[4] = await this.loadImage((initialFormulaFive_B as any), this.config.initialFormulaFive_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[4]);

      this.initialFormula_BImg[5] = await this.loadImage((initialFormulaSix_B as any), this.config.initialFormulaSix_BImg as any);
      this.staticLayer.add(this.initialFormula_BImg[5]);

      this.staticLayer.draw();
  }

  //加载高亮图片
  async initHLightImage() {
    //初始高亮函数
    this.hLightFormula_AImg[0] = await this.loadImage((hLightFormulaOne_A as any), this.hLightConfig.hLightFormulaOne_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[0]);

    this.hLightFormula_AImg[1] = await this.loadImage((hLightFormulaTwo_A as any), this.hLightConfig.hLightFormulaTwo_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[1]);

    this.hLightFormula_AImg[2] = await this.loadImage((hLightFormulaThree_A as any), this.hLightConfig.hLightFormulaThree_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[2]);

    this.hLightFormula_AImg[3] = await this.loadImage((hLightFormulaFour_A as any), this.hLightConfig.hLightFormulaFour_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[3]);

    this.hLightFormula_AImg[4] = await this.loadImage((hLightFormulaFive_A as any), this.hLightConfig.hLightFormulaFive_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[4]);

    this.hLightFormula_AImg[5] = await this.loadImage((hLightFormulaSix_A as any), this.hLightConfig.hLightFormulaSix_AImg as any);
    this.staticLayer.add(this.hLightFormula_AImg[5]);

    //求导高亮函数
    this.hLightFormula_BImg[0] = await this.loadImage((hLightFormulaOne_B as any), this.hLightConfig.hLightFormulaOne_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[0]);

    this.hLightFormula_BImg[1] = await this.loadImage((hLightFormulaTwo_B as any), this.hLightConfig.hLightFormulaTwo_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[1]);

    this.hLightFormula_BImg[2] = await this.loadImage((hLightFormulaThree_B as any), this.hLightConfig.hLightFormulaThree_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[2]);

    this.hLightFormula_BImg[3] = await this.loadImage((hLightFormulaFour_B as any), this.hLightConfig.hLightFormulaFour_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[3]);

    this.hLightFormula_BImg[4] = await this.loadImage((hLightFormulaFive_B as any), this.hLightConfig.hLightFormulaFive_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[4]);

    this.hLightFormula_BImg[5] = await this.loadImage((hLightFormulaSix_B as any), this.hLightConfig.hLightFormulaSix_BImg as any);
    this.staticLayer.add(this.hLightFormula_BImg[5]);

    this.staticLayer.draw();
  }

  //加载对比函数图像
  async initComparedImage() {
    //左侧对比图像
    this.leftFormula[0] = await this.loadImage((leftFormulaOne as any), this.comparedConfig.leftFourmulaOne as any);
    this.staticLayer.add(this.leftFormula[0]);

    this.leftFormula[1] = await this.loadImage((leftFormulaTwo as any), this.comparedConfig.leftFourmulaTwo as any);
    this.staticLayer.add(this.leftFormula[1]);

    this.leftFormula[2] = await this.loadImage((leftFormulaThree as any), this.comparedConfig.leftFourmulaThree as any);
    this.staticLayer.add(this.leftFormula[2]);

    this.leftFormula[3] = await this.loadImage((leftFormulaFour as any), this.comparedConfig.leftFourmulaFour as any);
    this.staticLayer.add(this.leftFormula[3]);

    this.leftFormula[4] = await this.loadImage((leftFormulaFive as any), this.comparedConfig.leftFourmulaFive as any);
    this.staticLayer.add(this.leftFormula[4]);

    this.leftFormula[5] = await this.loadImage((leftFormulaSix as any), this.comparedConfig.leftFourmulaSix as any);
    this.staticLayer.add(this.leftFormula[5]);

    // //右侧对比图像
    this.rightFormula[0] = await this.loadImage((rightFormulaOne as any), this.comparedConfig.rightFourmulaOne as any);
    this.staticLayer.add(this.rightFormula[0]);

    this.rightFormula[1] = await this.loadImage((rightFormulaTwo as any), this.comparedConfig.rightFourmulaTwo as any);
    this.staticLayer.add(this.rightFormula[1]);

    this.rightFormula[2] = await this.loadImage((rightFormulaThree as any), this.comparedConfig.rightFourmulaThree as any);
    this.staticLayer.add(this.rightFormula[2]);

    this.rightFormula[3] = await this.loadImage((rightFormulaFour as any), this.comparedConfig.rightFourmulaFour as any);
    this.staticLayer.add(this.rightFormula[3]);

    this.rightFormula[4] = await this.loadImage((rightFormulaFive as any), this.comparedConfig.rightFourmulaFive as any);
    this.staticLayer.add(this.rightFormula[4]);

    this.rightFormula[5] = await this.loadImage((rightFormulaSix as any), this.comparedConfig.rightFourmulaSix as any);
    this.staticLayer.add(this.rightFormula[5]);

    this.staticLayer.draw();
  }

  //点击初始图片
  bindEvent() {

    this.initialGroup1.on('mousedown touchstart', () => {
        this.judgeFinishOrNot();
        this.initialFormula_AImg[0].visible(false);
        this.hLightFormula_AImg[0].visible(true);
        this.staticLayer.draw();
        (window as any).viewHandler.viewModel.resetDervationButton();
        this.showOrHideButton(true, false, false, false, false, false);
    });

    this.initialGroup2.on('mousedown touchstart', () => {
      this.judgeFinishOrNot();
      this.initialFormula_AImg[1].visible(false);
      this.hLightFormula_AImg[1].visible(true);
      this.staticLayer.draw();
      (window as any).viewHandler.viewModel.resetDervationButton();
      this.showOrHideButton(false, true, false, false, false, false);
    });

    this.initialGroup3.on('mousedown touchstart', () => {
      this.judgeFinishOrNot();
      this.initialFormula_AImg[2].visible(false);
      this.hLightFormula_AImg[2].visible(true);
      this.staticLayer.draw();
      (window as any).viewHandler.viewModel.resetDervationButton();
      this.showOrHideButton(false, false, true, false, false, false);
    });

    this.initialGroup4.on('mousedown touchstart', () => {
      this.judgeFinishOrNot();
      this.initialFormula_AImg[3].visible(false);
      this.hLightFormula_AImg[3].visible(true);
      this.staticLayer.draw();
      (window as any).viewHandler.viewModel.resetDervationButton();
      this.showOrHideButton(false, false, false, true, false, false);
    });

    this.initialGroup5.on('mousedown touchstart', () => {
      this.judgeFinishOrNot();
      this.initialFormula_AImg[4].visible(false);
      this.hLightFormula_AImg[4].visible(true);
      this.staticLayer.draw();
      (window as any).viewHandler.viewModel.resetDervationButton();
      this.showOrHideButton(false, false, false, false, true, false);
    });

    this.initialGroup6.on('mousedown touchstart', () => {
      this.judgeFinishOrNot();
      this.initialFormula_AImg[5].visible(false);
      this.hLightFormula_AImg[5].visible(true);
      this.staticLayer.draw();
      (window as any).viewHandler.viewModel.resetDervationButton();
      this.showOrHideButton(false, false, false, false, false, true);
    });

  }

  //切换求导按钮
  showOrHideButton(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean, flag5: boolean, flag6: boolean) {
      (window as any).viewHandler.viewModel.$data.derivationOne = flag1;
      (window as any).viewHandler.viewModel.$data.derivationTwo = flag2;
      (window as any).viewHandler.viewModel.$data.derivationThree = flag3;
      (window as any).viewHandler.viewModel.$data.derivationFour = flag4;
      (window as any).viewHandler.viewModel.$data.derivationFive = flag5;
      (window as any).viewHandler.viewModel.$data.derivationSix = flag6;
  }

  //整体显示或隐藏图像
  showOrHideAllFormula(flag: boolean) {
      for (let i = 0; i < 6; i++) {
          this.initialFormula_AImg[i].visible(flag);
          this.initialFormula_BImg[i].visible(flag);
          this.hLightFormula_AImg[i].visible(flag);
          this.hLightFormula_BImg[i].visible(flag);
      }
      this.staticLayer.batchDraw();
  }

  //显示初始图像
  showAllInitialFormula(flag: boolean) {
    for (let i = 0; i < 6; i++) {
      this.initialFormula_AImg[i].visible(flag);
    }
    this.staticLayer.batchDraw();
  }

  //显示或隐藏高亮图像
  showOrHideInitialFormula(flag: boolean) {
    for (let i = 0; i < 6; i++) {
      this.hLightFormula_AImg[i].visible(flag);
      this.hLightFormula_BImg[i].visible(flag);
    }
    this.staticLayer.batchDraw();
  }

  //判断流程是否走完
  judgeFinishOrNot() {
      this.showOrHideInitialFormula(false);
      this.showAllInitialFormula(true);
      (window as any).viewHandler.viewModel.hideAllButton();
  }

  //隐藏所有对比函数图像
  hideAllComparedFormula(flag: boolean) {
      for (let i = 0; i < 6; i++) {
        this.leftFormula[i].visible(flag);
        this.rightFormula[i].visible(flag);
      }
      this.leftGrayPlane.visible(false);
      this.staticLayer.batchDraw();
  }

  //重置
  reset() {
      this.showOrHideAllFormula(false);
      this.showAllInitialFormula(true);
      this.hideAllComparedFormula(false);
  }

}
