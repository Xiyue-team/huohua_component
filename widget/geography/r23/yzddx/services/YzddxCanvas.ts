import {YzddxConfig} from './YzddxConfig';
import ball from '../sub_static/ball.png';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';

import plateauImage1 from '../sub_static/plateauImage/plateauImage1.png';
import plateauImage2 from '../sub_static/plateauImage/plateauImage2.png';
import plateauImage3 from '../sub_static/plateauImage/plateauImage3.png';
import plateauImage4 from '../sub_static/plateauImage/plateauImage4.png';
import plateauImage5 from '../sub_static/plateauImage/plateauImage5.png';
import plateauImage6 from '../sub_static/plateauImage/plateauImage6.png';
import plateauImage7 from '../sub_static/plateauImage/plateauImage7.png';

import hillyArea1 from '../sub_static/hillyAreaImage/hillyArea1.png';
import hillyArea2 from '../sub_static/hillyAreaImage/hillyArea2.png';
import hillyArea3 from '../sub_static/hillyAreaImage/hillyArea3.png';
import hillyArea4 from '../sub_static/hillyAreaImage/hillyArea4.png';
import hillyArea5 from '../sub_static/hillyAreaImage/hillyArea5.png';
import hillyArea6 from '../sub_static/hillyAreaImage/hillyArea6.png';

import plainImage1 from '../sub_static/plainImage/plainImage1.png';
import plainImage2 from '../sub_static/plainImage/plainImage2.png';
import plainImage3 from '../sub_static/plainImage/plainImage3.png';
import plainImage4 from '../sub_static/plainImage/plainImage4.png';
import plainImage5 from '../sub_static/plainImage/plainImage5.png';
import plainImage6 from '../sub_static/plainImage/plainImage6.png';

import plateauCardImage1 from '../sub_static/plateauCardImage/plateauCardImage1.png';
import plateauCardImage2 from '../sub_static/plateauCardImage/plateauCardImage2.png';
import plateauCardImage3 from '../sub_static/plateauCardImage/plateauCardImage3.png';
import plateauCardImage4 from '../sub_static/plateauCardImage/plateauCardImage4.png';
import plateauCardImage5 from '../sub_static/plateauCardImage/plateauCardImage5.png';
import plateauCardImage6 from '../sub_static/plateauCardImage/plateauCardImage6.png';
import plateauCardImage7 from '../sub_static/plateauCardImage/plateauCardImage7.png';

import hillyAreaCradImage1 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage1.png';
import hillyAreaCradImage2 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage2.png';
import hillyAreaCradImage3 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage3.png';
import hillyAreaCradImage4 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage4.png';
import hillyAreaCradImage5 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage5.png';
import hillyAreaCradImage6 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage6.png';

import plainCardImage1 from '../sub_static/plainCardImage/plainCardImage1.png';
import plainCardImage2 from '../sub_static/plainCardImage/plainCardImage2.png';
import plainCardImage3 from '../sub_static/plainCardImage/plainCardImage3.png';
import plainCardImage4 from '../sub_static/plainCardImage/plainCardImage4.png';
import plainCardImage5 from '../sub_static/plainCardImage/plainCardImage5.png';
import plainCardImage6 from '../sub_static/plainCardImage/plainCardImage6.png';

import { ImageEvent } from './ImageEvent';

export default class YzddxCanvas {
    config: YzddxConfig;
    imageEvent: ImageEvent;

    myCanvas: fabric.Canvas;
    zoom = 1;
    diff = 0;
    prev = 0;

    // 高原
    plateauImage: any = [];
    // 山地
    hillyArea: any = [];
    // 平原
    plainImage: any = [];

    // 显示高原按钮
    showPlateauButton: any;

    // 显示山地按钮
    showHillyAreaButton: any;

    // 显示平原按钮
    showPlainButton: any;

    // 高原按钮
    plateauButton: any = [];
    // 山地按钮
    hillyAreaButton: any = [];
    // 平原按钮
    plainButton: any = [];

    // 高原卡片
    plateauCardImage: any = [];

    // 山地卡片
    hillyAreaCradImage: any = [];

    // 平原卡片
    plainCardImage: any = [];

    constructor() {
      this.config = new YzddxConfig();
      this.imageEvent = new ImageEvent();

      this.init();
    }

    async init() {
      (document.getElementById('storyCanvas') as any).width = window.innerWidth;
      (document.getElementById('storyCanvas') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('storyCanvas');
      this.myCanvas.selection = false;

      await this.initBackground();

      await this.initPlateauImage();
      await this.initHillyArea();
      await this.initPlainImage();

      await this.initThreeButton();

      await this.initPlateauButton();
      await this.initHillyAreaButton();
      await this.initPlainButton();

      await this.initPlateauCardImage();
      await this.initHillyAreaCradImage();
      await this.initPlainCardImage();

      this.myCanvas.add(this.imageEvent.tipsText1);
      this.myCanvas.add(this.imageEvent.tipsText2);

      // 添加遮挡板
      this.myCanvas.add(this.imageEvent.transparentRect);

      await this.clickShowButtonEvent();
      await this.buttonDragEvent();
      await this.clickShowCardEvent();
    }

    // 背景地球
    async initBackground() {
      const earth = await FabricUtil.loadImage(ball as any, this.config.earth);
      this.myCanvas.add(earth);
    }

    // 加载地球上高原文字
    async initPlateauImage() {
      this.plateauImage[0] = await FabricUtil.loadImage(plateauImage1 as any, this.config.plateauImage1);
      this.myCanvas.add(this.plateauImage[0]);

      this.plateauImage[1] = await FabricUtil.loadImage(plateauImage2 as any, this.config.plateauImage2);
      this.myCanvas.add(this.plateauImage[1]);

      this.plateauImage[2] = await FabricUtil.loadImage(plateauImage3 as any, this.config.plateauImage3);
      this.myCanvas.add(this.plateauImage[2]);

      this.plateauImage[3] = await FabricUtil.loadImage(plateauImage4 as any, this.config.plateauImage4);
      this.myCanvas.add(this.plateauImage[3]);

      this.plateauImage[4] = await FabricUtil.loadImage(plateauImage5 as any, this.config.plateauImage5);
      this.myCanvas.add(this.plateauImage[4]);

      this.plateauImage[5] = await FabricUtil.loadImage(plateauImage6 as any, this.config.plateauImage6);
      this.myCanvas.add(this.plateauImage[5]);

      this.plateauImage[6] = await FabricUtil.loadImage(plateauImage7 as any, this.config.plateauImage7);
      this.myCanvas.add(this.plateauImage[6]);
    }

    // 加载地球上的山地文字
    async initHillyArea() {
      this.hillyArea[0] = await FabricUtil.loadImage(hillyArea1 as any, this.config.hillyArea1);
      this.myCanvas.add(this.hillyArea[0]);

      this.hillyArea[1] = await FabricUtil.loadImage(hillyArea2 as any, this.config.hillyArea2);
      this.myCanvas.add(this.hillyArea[1]);

      this.hillyArea[2] = await FabricUtil.loadImage(hillyArea3 as any, this.config.hillyArea3);
      this.myCanvas.add(this.hillyArea[2]);

      this.hillyArea[3] = await FabricUtil.loadImage(hillyArea4 as any, this.config.hillyArea4);
      this.myCanvas.add(this.hillyArea[3]);

      this.hillyArea[4] = await FabricUtil.loadImage(hillyArea5 as any, this.config.hillyArea5);
      this.myCanvas.add(this.hillyArea[4]);

      this.hillyArea[5] = await FabricUtil.loadImage(hillyArea6 as any, this.config.hillyArea6);
      this.myCanvas.add(this.hillyArea[5]);
    }

    // 加载地球上的平原文字
    async initPlainImage() {
      this.plainImage[0] = await FabricUtil.loadImage(plainImage1 as any, this.config.plainImage1);
      this.myCanvas.add(this.plainImage[0]);

      this.plainImage[1] = await FabricUtil.loadImage(plainImage2 as any, this.config.plainImage2);
      this.myCanvas.add(this.plainImage[1]);

      this.plainImage[2] = await FabricUtil.loadImage(plainImage3 as any, this.config.plainImage3);
      this.myCanvas.add(this.plainImage[2]);

      this.plainImage[3] = await FabricUtil.loadImage(plainImage4 as any, this.config.plainImage4);
      this.myCanvas.add(this.plainImage[3]);

      this.plainImage[4] = await FabricUtil.loadImage(plainImage5 as any, this.config.plainImage5);
      this.myCanvas.add(this.plainImage[4]);

      this.plainImage[5] = await FabricUtil.loadImage(plainImage6 as any, this.config.plainImage6);
      this.myCanvas.add(this.plainImage[5]);
    }

    // 添加三个显示按钮 高原 山地 平原
    async initThreeButton() {

      this.showPlateauButton = await this.createButton(this.config.showPlateauButton);
      this.showPlateauButton.selectable = false;
      this.myCanvas.add(this.showPlateauButton);

      this.showHillyAreaButton = await this.createButton(this.config.showHillyAreaButton);
      this.showHillyAreaButton.selectable = false;
      this.myCanvas.add(this.showHillyAreaButton);

      this.showPlainButton = await this.createButton(this.config.showPlainButton);
      this.showPlainButton.selectable = false;
      this.myCanvas.add(this.showPlainButton);

    }

    // 高原拖动按钮
    async initPlateauButton() {
      this.plateauButton[0] = await this.createButton(this.config.plateauButton[0]);
      this.myCanvas.add(this.plateauButton[0]);

      this.plateauButton[1] = await this.createButton(this.config.plateauButton[1]);
      this.myCanvas.add(this.plateauButton[1]);

      this.plateauButton[2] = await this.createButton(this.config.plateauButton[2]);
      this.myCanvas.add(this.plateauButton[2]);

      this.plateauButton[3] = await this.createButton(this.config.plateauButton[3]);
      this.myCanvas.add(this.plateauButton[3]);

      this.plateauButton[4] = await this.createButton(this.config.plateauButton[4]);
      this.myCanvas.add(this.plateauButton[4]);

      this.plateauButton[5] = await this.createButton(this.config.plateauButton[5]);
      this.myCanvas.add(this.plateauButton[5]);

      this.plateauButton[6] = await this.createButton(this.config.plateauButton[6]);
      this.myCanvas.add(this.plateauButton[6]);
    }

    // 山地按钮
    async initHillyAreaButton() {
      this.hillyAreaButton[0] = await this.createButton(this.config.hillyAreaButton[0]);
      this.myCanvas.add(this.hillyAreaButton[0]);

      this.hillyAreaButton[1] = await this.createButton(this.config.hillyAreaButton[1]);
      this.myCanvas.add(this.hillyAreaButton[1]);

      this.hillyAreaButton[2] = await this.createButton(this.config.hillyAreaButton[2]);
      this.myCanvas.add(this.hillyAreaButton[2]);

      this.hillyAreaButton[3] = await this.createButton(this.config.hillyAreaButton[3]);
      this.myCanvas.add(this.hillyAreaButton[3]);

      this.hillyAreaButton[4] = await this.createButton(this.config.hillyAreaButton[4]);
      this.myCanvas.add(this.hillyAreaButton[4]);

      this.hillyAreaButton[5] = await this.createButton(this.config.hillyAreaButton[5]);
      this.myCanvas.add(this.hillyAreaButton[5]);
    }

    // 平原按钮
    async initPlainButton() {
      this.plainButton[0] = await this.createButton(this.config.plainButton[0]);
      this.myCanvas.add(this.plainButton[0]);

      this.plainButton[1] = await this.createButton(this.config.plainButton[1]);
      this.myCanvas.add(this.plainButton[1]);

      this.plainButton[2] = await this.createButton(this.config.plainButton[2]);
      this.myCanvas.add(this.plainButton[2]);

      this.plainButton[3] = await this.createButton(this.config.plainButton[3]);
      this.myCanvas.add(this.plainButton[3]);

      this.plainButton[4] = await this.createButton(this.config.plainButton[4]);
      this.myCanvas.add(this.plainButton[4]);

      this.plainButton[5] = await this.createButton(this.config.plainButton[5]);
      this.myCanvas.add(this.plainButton[5]);


    }

    createButton (rectConfig: any) {

      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: rectConfig.width,
        height: rectConfig.height,
        fill: rectConfig.fill,
        hasBorders: false,
        hasControls: false,
        rx: !rectConfig.rx ? 6 : rectConfig.rx
      });

      const text = new fabric.Text(rectConfig.text, {
        left: rectConfig.width * 0.5 - rectConfig.fontSize * rectConfig.textNum * 0.5,
        top: rectConfig.height * 0.5 - rectConfig.fontSize * 0.5,
        fill: !rectConfig.textFill ? '#333333' : rectConfig.textFill,
        fontSize: rectConfig.fontSize
      });

      const button = new fabric.Group([rect, text], {
        left: rectConfig.left,
        top: rectConfig.top,
        hasBorders: false,
        hasControls: false,
        visible: !rectConfig.visible ? false : rectConfig.visible
      });

      return button;
    }

    // 高原卡片
    async initPlateauCardImage() {
      this.plateauCardImage[0] = await FabricUtil.loadImage(plateauCardImage1 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[0]);

      this.plateauCardImage[1] = await FabricUtil.loadImage(plateauCardImage2 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[1]);

      this.plateauCardImage[2] = await FabricUtil.loadImage(plateauCardImage3 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[2]);

      this.plateauCardImage[3] = await FabricUtil.loadImage(plateauCardImage4 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[3]);

      this.plateauCardImage[4] = await FabricUtil.loadImage(plateauCardImage5 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[4]);

      this.plateauCardImage[5] = await FabricUtil.loadImage(plateauCardImage6 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[5]);

      this.plateauCardImage[6] = await FabricUtil.loadImage(plateauCardImage7 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plateauCardImage[6]);
    }

    // 山地卡片
    async initHillyAreaCradImage() {
      this.hillyAreaCradImage[0] = await FabricUtil.loadImage(hillyAreaCradImage1 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[0]);

      this.hillyAreaCradImage[1] = await FabricUtil.loadImage(hillyAreaCradImage2 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[1]);

      this.hillyAreaCradImage[2] = await FabricUtil.loadImage(hillyAreaCradImage3 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[2]);

      this.hillyAreaCradImage[3] = await FabricUtil.loadImage(hillyAreaCradImage4 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[3]);

      this.hillyAreaCradImage[4] = await FabricUtil.loadImage(hillyAreaCradImage5 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[4]);

      this.hillyAreaCradImage[5] = await FabricUtil.loadImage(hillyAreaCradImage6 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.hillyAreaCradImage[5]);
    }

    // 平原卡片
    async initPlainCardImage() {
      this.plainCardImage[0] = await FabricUtil.loadImage(plainCardImage1 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[0]);

      this.plainCardImage[1] = await FabricUtil.loadImage(plainCardImage2 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[1]);

      this.plainCardImage[2] = await FabricUtil.loadImage(plainCardImage3 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[2]);

      this.plainCardImage[3] = await FabricUtil.loadImage(plainCardImage4 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[3]);

      this.plainCardImage[4] = await FabricUtil.loadImage(plainCardImage5 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[4]);

      this.plainCardImage[5] = await FabricUtil.loadImage(plainCardImage6 as any, this.config.plateauCardImage);
      this.myCanvas.add(this.plainCardImage[5]);
    }



    // 绑定点击显示拖动按钮事件
    clickShowButtonEvent() {

      this.imageEvent.clickShowButtonEvent(
        this.showPlateauButton, this.plateauButton, this.plateauImage,
        this.showHillyAreaButton, this.hillyAreaButton,
        this.showPlainButton, this.plainButton);

      this.imageEvent.clickShowButtonEvent(
        this.showHillyAreaButton, this.hillyAreaButton, this.hillyArea,
        this.showPlateauButton, this.plateauButton,
        this.showPlainButton , this.plainButton);

      this.imageEvent.clickShowButtonEvent(
        this.showPlainButton, this.plainButton, this.plainImage,
        this.showHillyAreaButton, this.hillyAreaButton,
        this.showPlateauButton, this.plateauButton);

    }

    // 绑定拖动事件
    buttonDragEvent() {

      for (let i = 0; i < 7; i++) {
        this.imageEvent.imageDragEvent(this.plateauButton[i], this.plateauImage[i], this.config.plateauButton[i]);
      }

      for (let i = 0; i < 6; i++) {
        this.imageEvent.imageDragEvent(this.hillyAreaButton[i], this.hillyArea[i], this.config.hillyAreaButton[i]);
        this.imageEvent.imageDragEvent(this.plainButton[i], this.plainImage[i], this.config.plainButton[i]);
      }

    }

    // 绑定点击显示卡片事件
    clickShowCardEvent() {
      for (let i = 0; i < 7; i++) {
        this.imageEvent.clickShowCardEvent(this.plateauImage[i], this.plateauCardImage[i]);
      }

      for (let i = 0; i < 6; i++) {
        this.imageEvent.clickShowCardEvent(this.hillyArea[i], this.hillyAreaCradImage[i]);
        this.imageEvent.clickShowCardEvent(this.plainImage[i], this.plainCardImage[i]);
      }

      this.imageEvent.hideCardEvent(this.plateauCardImage, this.hillyAreaCradImage, this.plainCardImage);
    }


    // 重置
    async reset() {

      // 隐藏 高原文字 按钮 卡片
      for (let i = 0; i < 7; i++) {
        this.plateauImage[i].set('visible', false);
        this.plateauButton[i].set('visible', false);
        this.plateauCardImage[i].set('visible', false);
      }

      // 隐藏山地和平原 文字 按钮 卡片
      for (let i = 0; i < 6; i++) {
        this.hillyArea[i].set('visible', false);
        this.plainImage[i].set('visible', false);

        this.hillyAreaButton[i].set('visible', false);
        this.plainButton[i].set('visible', false);

        this.hillyAreaCradImage[i].set('visible', false);
        this.plainCardImage[i].set('visible', false);
      }

      // 隐藏遮挡板
      this.imageEvent.transparentRect.set('visible', false);

      // 还原按钮样式
      this.showPlateauButton.getObjects()[0].set('fill', '#3d3d3d');
      this.showHillyAreaButton.getObjects()[0].set('fill', '#3d3d3d');
      this.showPlainButton.getObjects()[0].set('fill', '#3d3d3d');

      // 隐藏提示文字
      this.imageEvent.tipsText1.set('visible', false);
      this.imageEvent.tipsText2.set('visible', false);

      this.imageEvent.tipsTextNumber1 = 0;
      this.imageEvent.tipsTextNumber2 = 0;

      this.myCanvas.renderAll();
    }
}

