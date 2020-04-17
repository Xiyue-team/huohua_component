

import {SimpleKonvaTemplate4} from '../../../../../src/konva/template/SimpleKonvaTemplate4';
import * as Konva from 'konva';

import {WcConfig} from './WcConfig';
import {WcDragEvent} from './WcDragEvent';

import * as backgroundImage from '../sub_static/backgroundImage.png';

import * as yellowColumnImage from '../sub_static/yellowColumnImage.png';
import * as blueColumnImage from '../sub_static/blueColumnImage.png';
import * as redColumnImage from '../sub_static/redColumnImage.png';
import * as cloudBottomImage from '../sub_static/cloudBottomImage.png';
import * as cloudMiddleImage from '../sub_static/cloudMiddleImage.png';
import * as cloudTopImage from '../sub_static/cloudTopImage.png';
import * as whiteFrameImage from '../sub_static/whiteFrameImage.png';

import * as hpa996Image from '../sub_static/hpa996Image.png';
import * as hpa1004Image from '../sub_static/hpa1004Image.png';
import * as hpa1016Image from '../sub_static/hpa1016Image.png';
import * as hpa1024Image from '../sub_static/hpa1024Image.png';

import * as maskImage from '../sub_static/maskImage.png';
import * as buttonImage from '../sub_static/buttonImage.png';

import { Linear, TweenMax } from 'gsap';

export class WcCanvas extends SimpleKonvaTemplate4 {
    config: WcConfig;

    // 拖动事件
    dmDrag: WcDragEvent;

    // 实线
    solidLine1: Konva.Line;
    solidLine2: Konva.Line;

    group1 = new Konva.Group();
    group2 = new Konva.Group();
    group3 = new Konva.Group();

    // 云层
    cloudBottom1: Konva.Image;
    cloudBottom2: Konva.Image;

    cloudMiddle1: Konva.Image;
    cloudMiddle2: Konva.Image;

    cloudTop1: Konva.Image;
    cloudTop2: Konva.Image;

    // 白底框
    whiteFrame: any = [];

    // 右侧可拖动图标
    hpaFrame: any = [];

    // 云层动画
    cloudTopAnimation: any;

    // 作图动画
    mappingAnimation: any;

    // 上方线
    dashLine1: Konva.Line;
    dashLine2: Konva.Line;

    // 下方线
    dashSpline1: Konva.Line;
    dashSpline2: Konva.Line;

    buttonImage: any = [];

    // 冷却
    textLengque: any;

    // 受热
    textShowre: any;

    constructor() {
      super('box');
      this.config = new WcConfig();
      this.dmDrag = new WcDragEvent(this);
      this.init();
    }

    async init() {
      await this.addStaticImage();
      await this.addStage1();
      await this.addStage2();
      await this.addSolidLine();
      await this.addDashLine();
      await this.addStage3();
      await this.addButtonImage();

      await this.cloudAnimation();
      this.drawLineAnimation();
      await this.dragEvent();

      this.group1.visible(true);
      this.group2.visible(false);
      this.group3.visible(false);

      this.staticLayer.draw();
    }

    async addStaticImage() {
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      background.width(this.config.backgroundImage.width);
      background.height(this.config.backgroundImage.height);
      this.staticLayer.add(background);
      this.stage.add(this.staticLayer);
    }

    // 添加实线
    async addSolidLine() {
      this.solidLine1 = new Konva.Line(this.config.solidLine1 as any);
      this.staticLayer.add(this.solidLine1);

      this.solidLine2 = new Konva.Line(this.config.solidLine2 as any);
      this.staticLayer.add(this.solidLine2);
      this.stage.add(this.staticLayer);
    }

    async addStage1() {
      // 黄色柱子
      const yellowColumn1 = await this.loadImage((yellowColumnImage as any), this.config.yellowColumnImage as any);
      this.group1.add(yellowColumn1);

      const yellowColumn2 = await this.loadImage((yellowColumnImage as any), this.config.yellowColumnImage2 as any);
      this.group1.add(yellowColumn2);

      this.staticLayer.add(this.group1);
      this.stage.add(this.staticLayer);
    }

    async addStage2() {
      // 蓝色柱子
      const blueColumn = await this.loadImage((blueColumnImage as any), this.config.blueColumnImage as any);
      this.group2.add(blueColumn);

      // 红色柱子
      const redColumn = await this.loadImage((redColumnImage as any), this.config.redColumnImage as any);
      this.group2.add(redColumn);

      this.cloudBottom1 = await this.loadImage((cloudBottomImage as any), this.config.blueColumnImage as any);
      this.group2.add(this.cloudBottom1);

      this.cloudBottom2 = await this.loadImage((cloudBottomImage as any), this.config.redColumnImage as any);
      this.group2.add(this.cloudBottom2);

      this.cloudMiddle1 = await this.loadImage((cloudMiddleImage as any), this.config.cloudMiddleImage1 as any);
      this.group2.add(this.cloudMiddle1);

      this.cloudMiddle2 = await this.loadImage((cloudMiddleImage as any), this.config.cloudMiddleImage2 as any);
      this.group2.add(this.cloudMiddle2);

      this.cloudTop1 = await this.loadImage((cloudTopImage as any), this.config.cloudTopImage1 as any);
      this.group2.add(this.cloudTop1);

      this.cloudTop2 = await this.loadImage((cloudTopImage as any), this.config.cloudTopImage2 as any);
      this.group2.add(this.cloudTop2);
      this.staticLayer.add(this.group2);

      const mask = await this.loadImage((maskImage as any), this.config.backgroundImage as any);
      this.staticLayer.add(mask);

      // 文字 高空
      const textGaoKong = new Konva.Text(this.config.textGaoKong as any);
      this.staticLayer.add(textGaoKong);

      // 文字 高空
      const textDiMian = new Konva.Text(this.config.textDiMian as any);
      this.staticLayer.add(textDiMian);

      // 文字 1000hpa
      const text1000hpa = new Konva.Text(this.config.text1000hpa as any);
      this.staticLayer.add(text1000hpa);

      // 文字 1020hpa
      const text1020hpa = new Konva.Text(this.config.text1020hpa as any);
      this.staticLayer.add(text1020hpa);

      // 文字 冷却
      this.textLengque = new Konva.Text(this.config.textLengque as any);
      this.staticLayer.add(this.textLengque);

      // 文字 受热
      this.textShowre = new Konva.Text(this.config.textShowre as any);
      this.staticLayer.add(this.textShowre);

      this.stage.add(this.staticLayer);
    }

    async addStage3() {
      // 白底框
      // 上左
      this.whiteFrame[0] = await this.loadImage((whiteFrameImage as any), this.config.whiteFrameImage0 as any);
      this.group3.add(this.whiteFrame[0]);
      // 上右
      this.whiteFrame[1] = await this.loadImage((whiteFrameImage as any), this.config.whiteFrameImage1 as any);
      this.group3.add(this.whiteFrame[1]);
      // 下左
      this.whiteFrame[2] = await this.loadImage((whiteFrameImage as any), this.config.whiteFrameImage2 as any);
      this.group3.add(this.whiteFrame[2]);
      // 下右
      this.whiteFrame[3] = await this.loadImage((whiteFrameImage as any), this.config.whiteFrameImage3 as any);
      this.group3.add(this.whiteFrame[3]);

      // 文字 A
      const textA = new Konva.Text(this.config.textA as any);
      this.group3.add(textA);
      // 文字 B
      const textB = new Konva.Text(this.config.textB as any);
      this.group3.add(textB);
      // 文字 C
      const textC = new Konva.Text(this.config.textC as any);
      this.group3.add(textC);
      // 文字 D
      const textD = new Konva.Text(this.config.textD as any);
      this.group3.add(textD);

      // 右侧可拖hpa
      // 996hpa
      this.hpaFrame[0] = await this.loadImage((hpa996Image as any), this.config.hpa996Image as any);
      this.group3.add(this.hpaFrame[0]);
      // 1004
      this.hpaFrame[1] = await this.loadImage((hpa1004Image as any), this.config.hpa1004Image as any);
      this.group3.add(this.hpaFrame[1]);
      // 1016
      this.hpaFrame[2] = await this.loadImage((hpa1016Image as any), this.config.hpa1016Image as any);
      this.group3.add(this.hpaFrame[2]);
      // 1024
      this.hpaFrame[3] = await this.loadImage((hpa1024Image as any), this.config.hpa1024Image as any);
      this.group3.add(this.hpaFrame[3]);


      this.staticLayer.add(this.group3);
      this.stage.add(this.staticLayer);
    }

    // 添加虚线
    async addDashLine() {
      // 虚线
      this.dashLine1 = new Konva.Line(this.config.dashLine1 as any);
      this.staticLayer.add(this.dashLine1);

      this.dashLine2 = new Konva.Line(this.config.dashLine2 as any);
      this.staticLayer.add(this.dashLine2);

      // 虚曲线
      this.dashSpline1 = new Konva.Line(this.config.dashSpline1 as any);
      this.staticLayer.add(this.dashSpline1);

      this.dashSpline2 = new Konva.Line(this.config.dashSpline2 as any);
      this.staticLayer.add(this.dashSpline2);

      this.dashSpline1.visible(false);
      this.dashSpline2.visible(false);

      this.stage.add(this.staticLayer);
    }

    // 添加拖动按钮
    async addButtonImage() {
      this.buttonImage[0] = await this.loadImage((buttonImage as any), this.config.buttonImage1 as any);
      this.staticLayer.add(this.buttonImage[0]);

      this.buttonImage[1] = await this.loadImage((buttonImage as any), this.config.buttonImage2 as any);
      this.staticLayer.add(this.buttonImage[1]);

      this.buttonImage[2] = await this.loadImage((buttonImage as any), this.config.buttonImage3 as any);
      this.staticLayer.add(this.buttonImage[2]);

      this.buttonImage[3] = await this.loadImage((buttonImage as any), this.config.buttonImage4 as any);
      this.staticLayer.add(this.buttonImage[3]);

      this.buttonImageEvent();
    }

    // 绑定拖动事件
    buttonImageEvent() {
      this.buttonImageDragEvent(this.buttonImage[0], this.config.buttonImage1.x, this.config.buttonImage1.y,
        this.config.height * 0.424 - this.config.buttonImage1.height / 2);
      this.buttonImageDragEvent(this.buttonImage[1], this.config.buttonImage2.x,
        this.config.height * 0.30 - this.config.buttonImage2.height / 2, this.config.buttonImage2.y);
      this.buttonImageDragEvent(this.buttonImage[2], this.config.buttonImage3.x,
        this.config.height * 0.612 - this.config.buttonImage3.height / 2, this.config.buttonImage3.y);
      this.buttonImageDragEvent(this.buttonImage[3], this.config.buttonImage4.x, this.config.buttonImage4.y,
        this.config.height * 0.734 - this.config.buttonImage4.height / 2);
    }

    // 拖动按钮拖动事件
    /**
     * @param {Konva.Image} image  图片对象
     * @param {number} imageX  图片的x坐标
     * @param {number} min   图片y最小值
     * @param {number} max   图片y最大值
     */
    buttonImageDragEvent(image: Konva.Image, imageX: number,  min: number, max: number) {
      image.on('dragstart', () => {
        this.dashSpline1.visible(true);
        this.dashSpline2.visible(true);
        this.solidLine1.visible(false);
        this.solidLine2.visible(false);
      });

      image.on('dragend', () => {
        // 更新作图动画
        this.drawLineAnimation();
      });

      image.on('dragmove', () => {
        image.x(imageX);
        if (image.y() < min) {
          image.y(min);
        }
        if (image.y() > max) {
          image.y(max);
        }

        // 更新线
        this.dashSpline1.points([this.config.width * 0.234, this.config.height * 0.363,
          (this.config.width * (0.766 - 0.234)) / 4 + this.config.width * 0.234,
          this.buttonImage[0].y() + this.config.buttonImage1.height / 2,
          (this.config.width * (0.766 - 0.234)) / 4 * 3 + this.config.width * 0.234,
          this.buttonImage[1].y() + this.config.buttonImage2.height / 2,
          this.config.width * 0.766, this.config.height * 0.363]);
        this.dashSpline2.points([this.config.width * 0.234, this.config.height * 0.673,
          (this.config.width * (0.766 - 0.234)) / 4 + this.config.width * 0.234,
          this.buttonImage[2].y() + this.config.buttonImage3.height / 2,
          (this.config.width * (0.766 - 0.234)) / 4 * 3 + this.config.width * 0.234,
          this.buttonImage[3].y() + this.config.buttonImage4.height / 2,
          this.config.width * 0.766, this.config.height * 0.673]);

        this.staticLayer.draw();
      });

    }

    // 温差动画
    cloudAnimation() {
      const tween = {
        cloudTop1Y: this.config.cloudTopImage1.y,
        cloudTop2Y: this.config.cloudTopImage2.y,
      };

      this.cloudTopAnimation = TweenMax.to(tween, 4, {
        cloudTop1Y: this.config.cloudTopImage2.y,
        cloudTop2Y: this.config.cloudTopImage1.y,
        onStart: () => {
          this.group1.visible(false);
          this.group2.visible(true);
          this.textLengque.visible(true);
          this.textShowre.visible(true);
          this.staticLayer.draw();
        },
        onUpdate: () => {
          this.cloudTop1.y(tween.cloudTop1Y);
          this.cloudTop2.y(tween.cloudTop2Y);
          this.staticLayer.draw();
        },
        onComplete: () => {
          this.group3.visible(true);
          this.staticLayer.draw();
        },
        ease:  Linear.easeOut,
        paused: true
      });
    }

    // 作图动画
    drawLineAnimation() {
      const tween = {
        dashSpline1Y1: this.buttonImage[0].y() + this.config.buttonImage1.height / 2,
        dashSpline1Y2: this.buttonImage[1].y() + this.config.buttonImage2.height / 2,

        dashSpline2Y1: this.buttonImage[2].y() + this.config.buttonImage3.height / 2,
        dashSpline2Y2: this.buttonImage[3].y() + this.config.buttonImage4.height / 2,
      };

      this.mappingAnimation = TweenMax.to(tween, 3, {
        dashSpline1Y1: this.config.height * 0.424,
        dashSpline1Y2: this.config.height * 0.30,
        dashSpline2Y1: this.config.height * 0.612,
        dashSpline2Y2: this.config.height * 0.734,
        onStart: () => {
          this.dashSpline1.visible(true);
          this.dashSpline2.visible(true);
          this.solidLine1.visible(false);
          this.solidLine2.visible(false);
          this.staticLayer.draw();
        },
        onUpdate: () => {
          this.dashSpline1.points([this.config.width * 0.234, this.config.height * 0.363,
            (this.config.width * (0.766 - 0.234)) / 4 + this.config.width * 0.234, tween.dashSpline1Y1,
            (this.config.width * (0.766 - 0.234)) / 4 * 3 + this.config.width * 0.234, tween.dashSpline1Y2,
            this.config.width * 0.766, this.config.height * 0.363]);
          this.dashSpline2.points([this.config.width * 0.234, this.config.height * 0.673,
            (this.config.width * (0.766 - 0.234)) / 4 + this.config.width * 0.234, tween.dashSpline2Y1,
            (this.config.width * (0.766 - 0.234)) / 4 * 3 + this.config.width * 0.234, tween.dashSpline2Y2,
            this.config.width * 0.766, this.config.height * 0.673]);

          // 更新拖动按钮位置
          this.buttonImage[0].y(tween.dashSpline1Y1 - this.buttonImage[0].height() / 2);
          this.buttonImage[1].y(tween.dashSpline1Y2 - this.buttonImage[1].height() / 2);
          this.buttonImage[2].y(tween.dashSpline2Y1 - this.buttonImage[2].height() / 2);
          this.buttonImage[3].y(tween.dashSpline2Y2 - this.buttonImage[3].height() / 2);

          this.staticLayer.draw();
        },
        onComplete: () => {

          this.staticLayer.draw();
        },
        ease:  Linear.easeOut,
        paused: true
      });
    }

    // 右侧文字拖动事件
    dragEvent() {
      this.dmDrag.dragMove(this.hpaFrame[0], this.whiteFrame[0], this.config.hpa996Image);
      this.dmDrag.dragMove(this.hpaFrame[1], this.whiteFrame[1], this.config.hpa1004Image);
      this.dmDrag.dragMove(this.hpaFrame[2], this.whiteFrame[3], this.config.hpa1016Image);
      this.dmDrag.dragMove(this.hpaFrame[3], this.whiteFrame[2], this.config.hpa1024Image);
    }

    // 重置动画
    resetAnimation() {
      this.cloudTopAnimation.progress(0);
      this.cloudTopAnimation.pause();

      this.mappingAnimation.progress(0);
      this.mappingAnimation.pause();

      this.dashSpline1.visible(false);
      this.dashSpline2.visible(false);
    }

    // 重置
    async reset() {

      // 显示场景1
      this.group1.visible(true);
      this.group2.visible(false);
      this.group3.visible(false);

      // 重置动画
      this.resetAnimation();

      // 重置hpa 位置
      this.resetImage(this.hpaFrame[0], this.config.hpa996Image);
      this.resetImage(this.hpaFrame[1], this.config.hpa1004Image);
      this.resetImage(this.hpaFrame[2], this.config.hpa1016Image);
      this.resetImage(this.hpaFrame[3], this.config.hpa1024Image);

      // 归0计数器
      this.dmDrag.dragValue = 0;

      this.textLengque.visible(false);
      this.textShowre.visible(false);

      // 实线
      this.solidLine1.visible(true);
      this.solidLine2.visible(true);

      // 重置拖动按钮位置
      this.buttonImage[0].y(this.config.buttonImage1.y);
      this.buttonImage[1].y(this.config.buttonImage2.y);
      this.buttonImage[2].y(this.config.buttonImage3.y);
      this.buttonImage[3].y(this.config.buttonImage4.y);

      // 更新作图动画
      this.drawLineAnimation();

      this.staticLayer.draw();
    }

    // 重置分子式的位置
    resetImage(image: Konva.Image, config: any) {
        image.x(config.x);
        image.y(config.y);
        image.draggable(true);
    }

}

