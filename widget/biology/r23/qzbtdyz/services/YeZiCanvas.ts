import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import * as Konva from 'konva';
import {YeZiConfig} from './YeZiConfig';
import backgroundImage from '../sub_static/backgroundImage.png';
import titleImage from '../sub_static/titleImage.png';

import smallFoliageImage1_1 from '../sub_static/initialInterface/smallFoliageImage1_1.png';
import smallFoliageImage1_2 from '../sub_static/initialInterface/smallFoliageImage1_2.png';
import smallFoliageImage1_3 from '../sub_static/initialInterface/smallFoliageImage1_3.png';
import smallFoliageImage1_4 from '../sub_static/initialInterface/smallFoliageImage1_4.png';
import smallFoliageImage2_1 from '../sub_static/initialInterface/smallFoliageImage2_1.png';
import smallFoliageImage2_2 from '../sub_static/initialInterface/smallFoliageImage2_2.png';
import smallFoliageImage2_3 from '../sub_static/initialInterface/smallFoliageImage2_3.png';
import smallFoliageImage2_4 from '../sub_static/initialInterface/smallFoliageImage2_4.png';
import smallFoliageImage3_1 from '../sub_static/initialInterface/smallFoliageImage3_1.png';
import smallFoliageImage3_2 from '../sub_static/initialInterface/smallFoliageImage3_2.png';
import smallFoliageImage3_3 from '../sub_static/initialInterface/smallFoliageImage3_3.png';
import smallFoliageImage3_4 from '../sub_static/initialInterface/smallFoliageImage3_4.png';
import { YeEvent } from './YeEvent';

import foliageBackgroundImage1_1 from '../sub_static/foliageBackground/foliageBackgroundImage1_1.png';
import foliageBackgroundImage1_2 from '../sub_static/foliageBackground/foliageBackgroundImage1_2.png';
import foliageBackgroundImage1_3 from '../sub_static/foliageBackground/foliageBackgroundImage1_3.png';
import foliageBackgroundImage1_4 from '../sub_static/foliageBackground/foliageBackgroundImage1_4.png';
import foliageBackgroundImage2_1 from '../sub_static/foliageBackground/foliageBackgroundImage2_1.png';
import foliageBackgroundImage2_2 from '../sub_static/foliageBackground/foliageBackgroundImage2_2.png';
import foliageBackgroundImage2_3 from '../sub_static/foliageBackground/foliageBackgroundImage2_3.png';
import foliageBackgroundImage2_4 from '../sub_static/foliageBackground/foliageBackgroundImage2_4.png';
import foliageBackgroundImage3_1 from '../sub_static/foliageBackground/foliageBackgroundImage3_1.png';
import foliageBackgroundImage3_2 from '../sub_static/foliageBackground/foliageBackgroundImage3_2.png';
import foliageBackgroundImage3_3 from '../sub_static/foliageBackground/foliageBackgroundImage3_3.png';
import foliageBackgroundImage3_4 from '../sub_static/foliageBackground/foliageBackgroundImage3_4.png';

import foliageTitleImage1 from '../sub_static/foliageTitle/foliageTitleImage1.png';
import foliageTitleImage2 from '../sub_static/foliageTitle/foliageTitleImage2.png';
import foliageTitleImage3 from '../sub_static/foliageTitle/foliageTitleImage3.png';
import foliageTitleImage4 from '../sub_static/foliageTitle/foliageTitleImage4.png';
import foliageTitleImage5 from '../sub_static/foliageTitle/foliageTitleImage5.png';
import foliageTitleImage6 from '../sub_static/foliageTitle/foliageTitleImage6.png';
import foliageTitleImage7 from '../sub_static/foliageTitle/foliageTitleImage7.png';
import foliageTitleImage8 from '../sub_static/foliageTitle/foliageTitleImage8.png';
import foliageTitleImage9 from '../sub_static/foliageTitle/foliageTitleImage9.png';
import foliageTitleImage10 from '../sub_static/foliageTitle/foliageTitleImage10.png';
import foliageTitleImage11 from '../sub_static/foliageTitle/foliageTitleImage11.png';
import foliageTitleImage12 from '../sub_static/foliageTitle/foliageTitleImage12.png';

import { ViewController } from '../../../../../src/core/ViewController';


export class YeZiCanvas extends SimpleKonvaTemplate {
    config: YeZiConfig;
    yeEvent: YeEvent;

    background: any;
    title: any;

    // 初始界面小树叶
    smallFoliageImage: any = [];

    // 树叶背景
    foliageBackgroundImage: any = [];

    foliageTitleImage: any = [];

    // 小树叶放大动画
    smallFoliageImageAnimation: any = [];
    // 小树叶及树叶背景和标题返回初始层动画
    reverseFoliageImageAnimation: any = [];

    constructor() {
      super('box');
      this.config = new YeZiConfig();
      this.yeEvent = new YeEvent(this.stage);
      this.init();
    }

    async init() {
      await this.initBackGround();
      await this.initFoliageBackgroundImage();
      await this.initFoliageTitleImage();
      await this.initSmallFoliageImage();
      await this.addWhiteBackground();

      this.initClickEvent();

      this.staticLayer.draw();
      this.animationLayer.draw();
      ViewController.getInstance().hideLoading();
    }

    // 背景
    async initBackGround() {
      this.background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.staticLayer.add(this.background);

      this.title = await this.loadImage((titleImage as any), this.config.titleImage as any);
      this.staticLayer.add(this.title);
    }

    // 背景树叶
    async initFoliageBackgroundImage () {
      this.foliageBackgroundImage[0] = await this.loadImage((foliageBackgroundImage1_1 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[0]);

      this.foliageBackgroundImage[1] = await this.loadImage((foliageBackgroundImage1_2 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[1]);

      this.foliageBackgroundImage[2] = await this.loadImage((foliageBackgroundImage1_3 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[2]);

      this.foliageBackgroundImage[3] = await this.loadImage((foliageBackgroundImage1_4 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[3]);

      this.foliageBackgroundImage[4] = await this.loadImage((foliageBackgroundImage2_1 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[4]);

      this.foliageBackgroundImage[5] = await this.loadImage((foliageBackgroundImage2_2 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[5]);

      this.foliageBackgroundImage[6] = await this.loadImage((foliageBackgroundImage2_3 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[6]);

      this.foliageBackgroundImage[7] = await this.loadImage((foliageBackgroundImage2_4 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[7]);

      this.foliageBackgroundImage[8] = await this.loadImage((foliageBackgroundImage3_1 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[8]);

      this.foliageBackgroundImage[9] = await this.loadImage((foliageBackgroundImage3_2 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[9]);

      this.foliageBackgroundImage[10] = await this.loadImage((foliageBackgroundImage3_3 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[10]);

      this.foliageBackgroundImage[11] = await this.loadImage((foliageBackgroundImage3_4 as any), this.config.foliageBackgroundImage as any);
      this.staticLayer.add(this.foliageBackgroundImage[11]);
    }

    async initFoliageTitleImage() {
      this.foliageTitleImage[0] = await this.loadImage((foliageTitleImage1 as any), this.config.foliageTitleImage1 as any);
      this.staticLayer.add(this.foliageTitleImage[0]);

      this.foliageTitleImage[1] = await this.loadImage((foliageTitleImage2 as any), this.config.foliageTitleImage2 as any);
      this.staticLayer.add(this.foliageTitleImage[1]);

      this.foliageTitleImage[2] = await this.loadImage((foliageTitleImage3 as any), this.config.foliageTitleImage3 as any);
      this.staticLayer.add(this.foliageTitleImage[2]);

      this.foliageTitleImage[3] = await this.loadImage((foliageTitleImage4 as any), this.config.foliageTitleImage4 as any);
      this.staticLayer.add(this.foliageTitleImage[3]);

      this.foliageTitleImage[4] = await this.loadImage((foliageTitleImage5 as any), this.config.foliageTitleImage5 as any);
      this.staticLayer.add(this.foliageTitleImage[4]);

      this.foliageTitleImage[5] = await this.loadImage((foliageTitleImage6 as any), this.config.foliageTitleImage6 as any);
      this.staticLayer.add(this.foliageTitleImage[5]);

      this.foliageTitleImage[6] = await this.loadImage((foliageTitleImage7 as any), this.config.foliageTitleImage7 as any);
      this.staticLayer.add(this.foliageTitleImage[6]);

      this.foliageTitleImage[7] = await this.loadImage((foliageTitleImage8 as any), this.config.foliageTitleImage8 as any);
      this.staticLayer.add(this.foliageTitleImage[7]);

      this.foliageTitleImage[8] = await this.loadImage((foliageTitleImage9 as any), this.config.foliageTitleImage9 as any);
      this.staticLayer.add(this.foliageTitleImage[8]);

      this.foliageTitleImage[9] = await this.loadImage((foliageTitleImage10 as any), this.config.foliageTitleImage10 as any);
      this.staticLayer.add(this.foliageTitleImage[9]);

      this.foliageTitleImage[10] = await this.loadImage((foliageTitleImage11 as any), this.config.foliageTitleImage11 as any);
      this.staticLayer.add(this.foliageTitleImage[10]);

      this.foliageTitleImage[11] = await this.loadImage((foliageTitleImage12 as any), this.config.foliageTitleImage12 as any);
      this.staticLayer.add(this.foliageTitleImage[11]);
    }

    // 初始界面小树叶
    async initSmallFoliageImage() {
      // 加载第一排的叶子 从左到右加载
      this.smallFoliageImage[0] = await this.loadImage((smallFoliageImage1_1 as any), this.config.smallFoliageImage[0] as any);
      this.staticLayer.add(this.smallFoliageImage[0]);

      this.smallFoliageImage[1] = await this.loadImage((smallFoliageImage1_2 as any), this.config.smallFoliageImage[1] as any);
      this.staticLayer.add(this.smallFoliageImage[1]);

      this.smallFoliageImage[2] = await this.loadImage((smallFoliageImage1_3 as any), this.config.smallFoliageImage[2] as any);
      this.staticLayer.add(this.smallFoliageImage[2]);

      this.smallFoliageImage[3] = await this.loadImage((smallFoliageImage1_4 as any), this.config.smallFoliageImage[3] as any);
      this.staticLayer.add(this.smallFoliageImage[3]);

      // 加载第二排的叶子 从左到右加载
      this.smallFoliageImage[4] = await this.loadImage((smallFoliageImage2_1 as any), this.config.smallFoliageImage[4] as any);
      this.staticLayer.add(this.smallFoliageImage[4]);

      this.smallFoliageImage[5] = await this.loadImage((smallFoliageImage2_2 as any), this.config.smallFoliageImage[5] as any);
      this.staticLayer.add(this.smallFoliageImage[5]);

      this.smallFoliageImage[6] = await this.loadImage((smallFoliageImage2_3 as any), this.config.smallFoliageImage[6] as any);
      this.staticLayer.add(this.smallFoliageImage[6]);

      this.smallFoliageImage[7] = await this.loadImage((smallFoliageImage2_4 as any), this.config.smallFoliageImage[7] as any);
      this.staticLayer.add(this.smallFoliageImage[7]);

      // 加载第三排的叶子 从左到右加载
      this.smallFoliageImage[8] = await this.loadImage((smallFoliageImage3_1 as any), this.config.smallFoliageImage[8] as any);
      this.staticLayer.add(this.smallFoliageImage[8]);

      this.smallFoliageImage[9] = await this.loadImage((smallFoliageImage3_2 as any), this.config.smallFoliageImage[9] as any);
      this.staticLayer.add(this.smallFoliageImage[9]);

      this.smallFoliageImage[10] = await this.loadImage((smallFoliageImage3_3 as any), this.config.smallFoliageImage[10] as any);
      this.staticLayer.add(this.smallFoliageImage[10]);

      this.smallFoliageImage[11] = await this.loadImage((smallFoliageImage3_4 as any), this.config.smallFoliageImage[11] as any);
      this.staticLayer.add(this.smallFoliageImage[11]);
    }

    // 添加白底背景 用于遮挡动画开始其他树叶图片
    addWhiteBackground() {
      const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.stage.width(),
        height: this.stage.height(),
        fill: '#ffffff',
      });

      this.animationLayer.opacity(0);
      this.animationLayer.visible(false);

      this.animationLayer.add(rect);

    }

    // 添加初始界面树叶图片被点击及树叶背景被点击事件
    initClickEvent() {
      for (let i = 0; i < 12; i++) {
        // 放大动画
        this.smallFoliageImageAnimation[i] = this.yeEvent.createAnimation(this.smallFoliageImage[i],
          this.config.bigFoliageImage[i], this.foliageBackgroundImage[i], this.foliageTitleImage[i]);

        // 回放动画
        this.reverseFoliageImageAnimation[i] = this.yeEvent.createAnimation2(this.smallFoliageImage[i],
          this.foliageBackgroundImage[i], this.foliageTitleImage[i], this.smallFoliageImageAnimation[i]);

        // 小树叶被点击事件
        this.yeEvent.smallFoliageImageClickEvent(this.smallFoliageImage[i], this.smallFoliageImageAnimation[i],
          this.reverseFoliageImageAnimation[i]);

        // 树叶背景被点击事件
        this.yeEvent.bigFoliageImageClickEvent(this.foliageBackgroundImage[i], this.smallFoliageImageAnimation[i],
          this.reverseFoliageImageAnimation[i]);
      }
    }

    // 重置
    reset() {
      // 重置动画
      for (let i = 0; i < 12; i++) {
        this.smallFoliageImageAnimation[i].progress(0);
        this.smallFoliageImageAnimation[i].pause();

        this.reverseFoliageImageAnimation[i].progress(0);
        this.reverseFoliageImageAnimation[i].pause();
      }


      // 移动放大层的图片到初始状态层 并重置为初始状态
      if (this.scaleImageLayer.getChildren().length !== 0) {
        this.scaleImageLayer.getChildren()[1].setAttr('shadowOpacity', 0.08);
        this.scaleImageLayer.getChildren()[2].setAttr('visible', false);
        this.scaleImageLayer.getChildren()[0].setAttr('visible', false);
        this.scaleImageLayer.getChildren()[2].moveTo(this.staticLayer);
        this.scaleImageLayer.getChildren()[1].moveTo(this.staticLayer);
        this.scaleImageLayer.getChildren()[0].moveTo(this.staticLayer);
      }

      // 隐藏遮挡板
      this.animationLayer.visible(false);

      this.yeEvent.animend = false;
      this.yeEvent.smallFoliageIsEnd = false;

      this.stage.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.x(config.x);
      image.y(config.y);
    }
}



