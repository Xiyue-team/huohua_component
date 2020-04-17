

import {SimpleKonvaTemplate2} from '../../../../../src/konva/template/SimpleKonvaTemplate2';
import * as Konva from 'konva';

import {DmConfig} from './DmConfig';
import {DmDragEvent} from './DmDragEvent';

import * as bigMap from '../sub_static/bigMap.png';
import * as leftOne from '../sub_static/leftOne.png';
import * as leftTwo from '../sub_static/leftTwo.png';
import * as leftThree from '../sub_static/leftThree.png';

import * as rightOne from '../sub_static/rightOne.png';
import * as rightTwo from '../sub_static/rightTwo.png';
import * as rightThree from '../sub_static/rightThree.png';
import * as whiteFrame from '../sub_static/whiteFrame.png';
import * as tipsFrame from '../sub_static/tipsFrame.png';

import * as leftWhiteFrame1 from '../sub_static/leftWhiteFrame1.png';
import * as leftWhiteFrame2 from '../sub_static/leftWhiteFrame2.png';
import * as leftWhiteFrame3 from '../sub_static/leftWhiteFrame3.png';
import * as leftWhiteFrame4 from '../sub_static/leftWhiteFrame4.png';
import * as leftWhiteFrame5 from '../sub_static/leftWhiteFrame5.png';
import * as leftWhiteFrame6 from '../sub_static/leftWhiteFrame6.png';
import * as leftWhite from '../sub_static/leftWhite.png';
import * as line from '../sub_static/line.png';
import * as labelPointBig from '../sub_static/labelPointBig.png';

import * as bigLandscapeMap1 from '../sub_static/bigLandscapeMap/bigLandscapeMap1.png';
import * as bigLandscapeMap2 from '../sub_static/bigLandscapeMap/bigLandscapeMap2.png';
import * as bigLandscapeMap3 from '../sub_static/bigLandscapeMap/bigLandscapeMap3.png';
import * as bigLandscapeMap4 from '../sub_static/bigLandscapeMap/bigLandscapeMap4.png';
import * as bigLandscapeMap5 from '../sub_static/bigLandscapeMap/bigLandscapeMap5.png';
import * as bigLandscapeMap6 from '../sub_static/bigLandscapeMap/bigLandscapeMap6.png';

import * as textImage1 from '../sub_static/text/textImage1.png';
import * as textImage2 from '../sub_static/text/textImage2.png';
import * as textImage3 from '../sub_static/text/textImage3.png';
import * as textImage4 from '../sub_static/text/textImage4.png';
import * as textImage5 from '../sub_static/text/textImage5.png';
import * as textImage6 from '../sub_static/text/textImage6.png';



export class DmCanvas extends SimpleKonvaTemplate2 {
    config: DmConfig;

    // 拖动事件
    dmDrag: DmDragEvent;

    // 小图标
    labelPointImage: any = [];

    // 可拖拽的风景图
    landscapeMap: any = [];

    landscapeMap2: any = [];

    // 左侧大风景图
    bigLandscapeMap: any = [];

    leftWhiteFrame: any = [];

    leftTipsFrame: any = [];

    lineImage: any = [];

    // 文字描述
    textImage: any = [];

    // 放大动画
    scaleAnimation: any = [];

    constructor() {
        super('box');
        this.config = new DmConfig();
        this.dmDrag = new DmDragEvent(this);
        this.initImage();
    }

    async initImage() {
        await this.initStaticImage();
        await this.initLeftWhiteFrame();
        await this.initLefTipsFrame();
        await this.initLandscapeMap();
        await this.initLandscapeMap2();
        await this.initLine();
        await this.initbigLandscapeMap();
        await this.initTextImage();
        await this.boundDragEvent();
    }

    // 加载静止图片
    async initStaticImage() {
        // 地图
        const bigMapImage = await this.loadImage((bigMap as any), this.config.bigMapConfig as any);
        this.staticLayer.add(bigMapImage);

        // 提示框
        const tipsFrameImage = await this.loadImage((tipsFrame as any), this.config.tipsFrameConfig as any);
        this.staticLayer.add(tipsFrameImage);

        const whiteFrameImageLeft0 = await this.loadImage((whiteFrame as any), this.config.leftOneConfig as any);
        whiteFrameImageLeft0.visible(false);
        this.staticLayer.add(whiteFrameImageLeft0);
        whiteFrameImageLeft0.cache();

        // 左1
        const whiteFrameImageLeft1 = whiteFrameImageLeft0.clone(this.config.leftOneConfig as any);
        whiteFrameImageLeft1.draggable(false);
        whiteFrameImageLeft1.visible(true);
        this.staticLayer.add(whiteFrameImageLeft1);


        // 左2
        const whiteFrameImageLeft2 = whiteFrameImageLeft0.clone(this.config.leftTwoConfig as any);
        whiteFrameImageLeft2.draggable(false);
        whiteFrameImageLeft2.visible(true);
        this.staticLayer.add(whiteFrameImageLeft2);

        // 左3
        const whiteFrameImageLeft3 = whiteFrameImageLeft0.clone(this.config.leftThreeConfig as any);
        whiteFrameImageLeft3.draggable(false);
        whiteFrameImageLeft3.visible(true);
        this.staticLayer.add(whiteFrameImageLeft3);

        // 右1
        const whiteFrameImageRight1 = whiteFrameImageLeft0.clone(this.config.rightOneConfig as any);
        whiteFrameImageRight1.draggable(false);
        whiteFrameImageRight1.visible(true);
        this.staticLayer.add(whiteFrameImageRight1);

        // 右2
        const whiteFrameImageRight2 = whiteFrameImageLeft0.clone(this.config.rightTwoConfig as any);
        whiteFrameImageRight2.draggable(false);
        whiteFrameImageRight2.visible(true);
        this.staticLayer.add(whiteFrameImageRight2);

        // 右3
        const whiteFrameImageRight3 = whiteFrameImageLeft0.clone(this.config.rightThreeConfig as any);
        whiteFrameImageRight3.draggable(false);
        whiteFrameImageRight3.visible(true);
        this.staticLayer.add(whiteFrameImageRight3);

        this.labelPointImage[0] = await this.loadImage((labelPointBig as any), this.config.labelPointBig1Config as any);
        this.staticLayer.add(this.labelPointImage[0]);

        this.labelPointImage[1] = this.labelPointImage[0].clone(this.config.labelPointBig2Config as any);
        this.staticLayer.add(this.labelPointImage[1]);

        this.labelPointImage[2] = this.labelPointImage[0].clone(this.config.labelPointBig3Config as any);
        this.staticLayer.add(this.labelPointImage[2]);

        this.labelPointImage[3] = this.labelPointImage[0].clone(this.config.labelPointBig4Config as any);
        this.staticLayer.add(this.labelPointImage[3]);

        this.labelPointImage[4] = this.labelPointImage[0].clone(this.config.labelPointBig5Config as any);
        this.staticLayer.add(this.labelPointImage[4]);

        this.labelPointImage[5] = this.labelPointImage[0].clone(this.config.labelPointBig6Config as any);
        this.staticLayer.add(this.labelPointImage[5]);

        this.stage.add(this.staticLayer);
    }

    // 加载白底透明框
    async initLeftWhiteFrame() {
        // 左侧透明框1
        this.leftWhiteFrame[0] = await this.loadImage((leftWhiteFrame1 as any), this.config.leftWhiteFrame1Config as any);
        this.staticLayer.add(this.leftWhiteFrame[0]);

        // 左侧透明框2
        this.leftWhiteFrame[1] = await this.loadImage((leftWhiteFrame2 as any), this.config.leftWhiteFrame2Config as any);
        this.staticLayer.add(this.leftWhiteFrame[1]);

        // 左侧透明框3
        this.leftWhiteFrame[2] = await this.loadImage((leftWhiteFrame3 as any), this.config.leftWhiteFrame3Config as any);
        this.staticLayer.add(this.leftWhiteFrame[2]);

        // 左侧透明框4
        this.leftWhiteFrame[3] = await this.loadImage((leftWhiteFrame5 as any), this.config.leftWhiteFrame4Config as any);
        this.staticLayer.add(this.leftWhiteFrame[3]);

        // 左侧透明框5
        this.leftWhiteFrame[4] = await this.loadImage((leftWhiteFrame5 as any), this.config.leftWhiteFrame5Config as any);
        this.staticLayer.add(this.leftWhiteFrame[4]);

        // 左侧透明框6
        this.leftWhiteFrame[5] = await this.loadImage((leftWhiteFrame6 as any), this.config.leftWhiteFrame6Config as any);
        this.staticLayer.add(this.leftWhiteFrame[5]);
    }

    // 加载提示文字
    async initLefTipsFrame() {
        // 左侧提示框
        this.leftTipsFrame[0] = await this.loadImage((leftWhite as any), this.config.leftTipsFrame1Config as any);
        this.staticLayer.add(this.leftTipsFrame[0]);

        this.leftTipsFrame[1] = this.leftTipsFrame[0].clone(this.config.leftTipsFrame2Config as any);
        this.staticLayer.add(this.leftTipsFrame[1]);

        this.leftTipsFrame[2] = this.leftTipsFrame[0].clone(this.config.leftTipsFrame3Config as any);
        this.staticLayer.add(this.leftTipsFrame[2]);

        this.leftTipsFrame[3] = this.leftTipsFrame[0].clone(this.config.leftTipsFrame4Config as any);
        this.staticLayer.add(this.leftTipsFrame[3]);

        this.leftTipsFrame[4] = this.leftTipsFrame[0].clone(this.config.leftTipsFrame5Config as any);
        this.staticLayer.add(this.leftTipsFrame[4]);

        this.leftTipsFrame[5] = this.leftTipsFrame[0].clone(this.config.leftTipsFrame6Config as any);
        this.staticLayer.add(this.leftTipsFrame[5]);
    }

    // 加载右侧风景图
    async initLandscapeMap2() {
        // 左1
        this.landscapeMap2[0] = await this.loadImage((leftOne as any), this.config.leftTipsFrame1Config as any);
        this.landscapeMap2[0].visible(false);
        this.staticLayer.add(this.landscapeMap2[0]);

        // 右1
        this.landscapeMap2[3] = await this.loadImage((rightOne as any), this.config.leftTipsFrame2Config as any);
        this.landscapeMap2[3].visible(false);
        this.staticLayer.add(this.landscapeMap2[3]);

        // 左2
        this.landscapeMap2[1] = await this.loadImage((leftTwo as any), this.config.leftTipsFrame3Config as any);
        this.landscapeMap2[1].visible(false);
        this.staticLayer.add(this.landscapeMap2[1]);

        // 右2
        this.landscapeMap2[4] = await this.loadImage((rightTwo as any), this.config.leftTipsFrame4Config as any);
        this.landscapeMap2[4].visible(false);
        this.staticLayer.add(this.landscapeMap2[4]);

        // 左3
        this.landscapeMap2[2] = await this.loadImage((leftThree as any), this.config.leftTipsFrame5Config as any);
        this.landscapeMap2[2].visible(false);
        this.staticLayer.add(this.landscapeMap2[2]);

        // 右3
        this.landscapeMap2[5] = await this.loadImage((rightThree as any), this.config.leftTipsFrame6Config as any);
        this.landscapeMap2[5].visible(false);
        this.staticLayer.add(this.landscapeMap2[5]);
        this.stage.add(this.staticLayer);
    }

    // 加载右侧风景图
    async initLandscapeMap() {
    // 左1
    this.landscapeMap[0] = await this.loadImage((leftOne as any), this.config.leftOneConfig as any);
    this.staticLayer.add(this.landscapeMap[0]);

    // 左2
    this.landscapeMap[1] = await this.loadImage((leftTwo as any), this.config.leftTwoConfig as any);
    this.staticLayer.add(this.landscapeMap[1]);

    // 左3
    this.landscapeMap[2] = await this.loadImage((leftThree as any), this.config.leftThreeConfig as any);
    this.staticLayer.add(this.landscapeMap[2]);

    // 右1
    this.landscapeMap[3] = await this.loadImage((rightOne as any), this.config.rightOneConfig as any);
    this.staticLayer.add(this.landscapeMap[3]);

    // 右2
    this.landscapeMap[4] = await this.loadImage((rightTwo as any), this.config.rightTwoConfig as any);
    this.staticLayer.add(this.landscapeMap[4]);

    // 右3
    this.landscapeMap[5] = await this.loadImage((rightThree as any), this.config.rightThreeConfig as any);
    this.staticLayer.add(this.landscapeMap[5]);
    this.stage.add(this.staticLayer);
  }

    // 加载连接红色线
    async initLine() {
        this.lineImage[0] = await this.loadImage((line as any), this.config.line1Config as any);
        this.staticLayer.add(this.lineImage[0]);

        this.lineImage[1] = this.lineImage[0].clone(this.config.line2Config as any);
        this.staticLayer.add(this.lineImage[1]);

        this.lineImage[2] = this.lineImage[0].clone(this.config.line3Config as any);
        this.staticLayer.add(this.lineImage[2]);

        this.lineImage[3] = this.lineImage[0].clone(this.config.line4Config as any);
        this.staticLayer.add(this.lineImage[3]);

        this.lineImage[4] = this.lineImage[0].clone(this.config.line5Config as any);
        this.staticLayer.add(this.lineImage[4]);

        this.lineImage[5] = this.lineImage[0].clone(this.config.line6Config as any);
        this.staticLayer.add(this.lineImage[5]);

        this.stage.add(this.staticLayer);
    }

    // 加载右侧风景图
    async initbigLandscapeMap() {
        // 左1
        this.bigLandscapeMap[0] = await this.loadImage((bigLandscapeMap1 as any), this.config.leftTipsFrame1Config as any);
        this.bigLandscapeMap[0].visible(true);
        this.bigLandscapeMap[0].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[0]);

        // 右1
        this.bigLandscapeMap[3] = await this.loadImage((bigLandscapeMap2 as any), this.config.leftTipsFrame2Config as any);
        this.bigLandscapeMap[3].visible(true);
        this.bigLandscapeMap[3].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[3]);

        // 左2
        this.bigLandscapeMap[1] = await this.loadImage((bigLandscapeMap3 as any), this.config.leftTipsFrame3Config as any);
        this.bigLandscapeMap[1].visible(true);
        this.bigLandscapeMap[1].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[1]);

        // 右2
        this.bigLandscapeMap[4] = await this.loadImage((bigLandscapeMap4 as any), this.config.leftTipsFrame4Config as any);
        this.bigLandscapeMap[4].visible(true);
        this.bigLandscapeMap[4].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[4]);

        // 左3
        this.bigLandscapeMap[2] = await this.loadImage((bigLandscapeMap5 as any), this.config.leftTipsFrame5Config as any);
        this.bigLandscapeMap[2].visible(true);
        this.bigLandscapeMap[2].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[2]);

        // 右3
        this.bigLandscapeMap[5] = await this.loadImage((bigLandscapeMap6 as any), this.config.leftTipsFrame6Config as any);
        this.bigLandscapeMap[5].visible(true);
        this.bigLandscapeMap[5].opacity(0);
        this.staticLayer.add(this.bigLandscapeMap[5]);
        this.stage.add(this.staticLayer);
    }

    async initTextImage() {
      this.textImage[0] = await this.loadImage((textImage1 as any), this.config.textImage1 as any);
      this.staticLayer.add(this.textImage[0]);

      this.textImage[1] = await this.loadImage((textImage2 as any), this.config.textImage2 as any);
      this.staticLayer.add(this.textImage[1]);

      this.textImage[2] = await this.loadImage((textImage3 as any), this.config.textImage3 as any);
      this.staticLayer.add(this.textImage[2]);

      this.textImage[3] = await this.loadImage((textImage4 as any), this.config.textImage4 as any);
      this.staticLayer.add(this.textImage[3]);

      this.textImage[4] = await this.loadImage((textImage5 as any), this.config.textImage5 as any);
      this.staticLayer.add(this.textImage[4]);

      this.textImage[5] = await this.loadImage((textImage6 as any), this.config.textImage6 as any);
      this.staticLayer.add(this.textImage[5]);

      this.stage.add(this.staticLayer);
    }

    // 给风景图绑定事件
    boundDragEvent() {
        this.scaleAnimation[0] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[0], this.config.bigMapConfig,
            this.landscapeMap2[0], this.config.leftTipsFrame1Config, this.landscapeMap[0]);
        this.scaleAnimation[1] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[1], this.config.bigMapConfig,
            this.landscapeMap2[1], this.config.leftTipsFrame3Config, this.landscapeMap[1]);
        this.scaleAnimation[2] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[2], this.config.bigMapConfig,
            this.landscapeMap2[2], this.config.leftTipsFrame5Config, this.landscapeMap[2]);
        this.scaleAnimation[3] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[3], this.config.bigMapConfig,
            this.landscapeMap2[3], this.config.leftTipsFrame2Config, this.landscapeMap[3]);
        this.scaleAnimation[4] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[4], this.config.bigMapConfig,
            this.landscapeMap2[4], this.config.leftTipsFrame4Config, this.landscapeMap[4]);
        this.scaleAnimation[5] = this.dmDrag.clickScaleImage(this.bigLandscapeMap[5], this.config.bigMapConfig,
            this.landscapeMap2[5], this.config.leftTipsFrame6Config, this.landscapeMap[5]);

        this.dmDrag.dragMove(this.landscapeMap[0], this.leftTipsFrame[0], this.config.leftOneConfig,
          this.lineImage[0], this.bigLandscapeMap[0], this.landscapeMap2[0]);

        this.dmDrag.dragMove(this.landscapeMap[1], this.leftTipsFrame[2], this.config.leftTwoConfig,
          this.lineImage[2], this.bigLandscapeMap[1], this.landscapeMap2[1]);

        this.dmDrag.dragMove(this.landscapeMap[2], this.leftTipsFrame[4], this.config.leftThreeConfig,
          this.lineImage[4], this.bigLandscapeMap[2], this.landscapeMap2[2]);

        this.dmDrag.dragMove(this.landscapeMap[3], this.leftTipsFrame[1], this.config.rightOneConfig,
          this.lineImage[1], this.bigLandscapeMap[3], this.landscapeMap2[3]);

        this.dmDrag.dragMove(this.landscapeMap[4], this.leftTipsFrame[3], this.config.rightTwoConfig,
          this.lineImage[3], this.bigLandscapeMap[4], this.landscapeMap2[4]);

        this.dmDrag.dragMove(this.landscapeMap[5], this.leftTipsFrame[5], this.config.rightThreeConfig,
          this.lineImage[5], this.bigLandscapeMap[5], this.landscapeMap2[5]);

        this.dmDrag.dragOutPage();

        this.dmDrag.showTextImage(this.labelPointImage[0], this.textImage[0], 0);
        this.dmDrag.showTextImage(this.labelPointImage[1], this.textImage[1], 1);
        this.dmDrag.showTextImage(this.labelPointImage[2], this.textImage[2], 2);
        this.dmDrag.showTextImage(this.labelPointImage[3], this.textImage[3], 3);
        this.dmDrag.showTextImage(this.labelPointImage[4], this.textImage[4], 4);
        this.dmDrag.showTextImage(this.labelPointImage[5], this.textImage[5], 5);


    }

    // 重置
    async reset() {

        await this.resetAnimation();

        // 重置风景图位置属性
        await this.resetImage(this.landscapeMap[0], this.config.leftOneConfig);
        await this.resetImage(this.landscapeMap[1], this.config.leftTwoConfig);
        await this.resetImage(this.landscapeMap[2], this.config.leftThreeConfig);
        await this.resetImage(this.landscapeMap[3], this.config.rightOneConfig);
        await this.resetImage(this.landscapeMap[4], this.config.rightTwoConfig);
        await this.resetImage(this.landscapeMap[5], this.config.rightThreeConfig);

        // 隐藏连接线
        for (let i = 0; i < this.lineImage.length; i++) {
            this.lineImage[i].visible(false);
        }

        // 显示右侧风景图，隐藏左侧风景图
        for (let i = 0; i < this.landscapeMap2.length; i++) {
            this.landscapeMap[i].visible(true);
            this.landscapeMap2[i].visible(false);
        }


        // 隐藏文字描述
        this.dmDrag.showTextImageNumber = null;
        this.dmDrag.hideTextImage();

        this.staticLayer.draw();
    }

    resetAnimation() {
        // 重置动画
        for (let i = 0; i < this.scaleAnimation.length; i++) {
            this.scaleAnimation[i].progress(0);
            this.scaleAnimation[i].pause();
        }
        this.dmDrag.isStart = false;

        console.log(1);
    }

    reverseAnimation() {
      // 返回动画
      for (let i = 0; i < this.scaleAnimation.length; i++) {
        this.scaleAnimation[i].reverse();
      }
    }

    // 重置分子式的位置
    resetImage(image: Konva.Image, config: any) {
        image.x(config.x);
        image.y(config.y);
        image.draggable(true);
    }

}

