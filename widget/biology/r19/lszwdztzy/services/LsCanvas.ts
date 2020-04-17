

import {SimpleKonvaTemplate4} from '../../../../../src/konva/template/SimpleKonvaTemplate4';
import * as Konva from 'konva';

import {LsConfig} from './LsConfig';
import {LsDragEvent} from './LsDragEvent';

import * as backgroundImage from '../sub_static/backgroundImage.png';
import * as mesa from '../sub_static/mesa.png';
import * as sun from '../sub_static/sun.png';

import * as greenPlantsIcon from '../sub_static/greenPlantsIcon.png';
import * as yellowPlantsIcon from '../sub_static/yellowPlantsIcon.png';
import * as plasticBagIcon from '../sub_static/plasticBagIcon.png';
import * as ropeIcon from '../sub_static/ropeIcon.png';
import * as dashFrame from '../sub_static/dashFrame.png';
import * as greenPlants from '../sub_static/greenPlants.png';
import * as yellowPlants from '../sub_static/yellowPlants.png';
import * as plasticBagOpening from '../sub_static/plasticBagOpening.png';
import * as plasticBagSealUp from '../sub_static/plasticBagSealUp.png';
import * as rope from '../sub_static/rope.png';
import * as waterDrops from '../sub_static/waterDrops.png';
import * as whiteMist from '../sub_static/whiteMist.png';



export class LsCanvas extends SimpleKonvaTemplate4 {
    config: LsConfig;

    // 拖动事件
    dmDrag: LsDragEvent;

    greenPlantsIconImage: Konva.Image;
    yellowPlantsIconImage: Konva.Image;
    plasticBagIconImage: Konva.Image;
    ropeIconImage: Konva.Image;

    // 绿色植物
    greenPlantsImage: Konva.Image;
    // 黄色植物
    yellowPlantsImage: Konva.Image;
    // 开口的塑料袋
    plasticBagOpening: any = [];
    // 密封的塑料袋
    plasticBagSealUpImage: any = [];
    // 绳子
    ropeImage: any = [];
    // 白雾
    whiteMistImage: any = [];
    // 水珠
    waterDropsImage: any = [];

    // 左侧文字
    textLeft: Konva.Text;
    // 右侧文字
    textRight: Konva.Text;

    // 左侧按钮动画
    phenomenonAnimationLeft: any;
    // 右侧按钮动画
    phenomenonAnimationRight: any;

    // 虚线矩形框
    rectLeft: Konva.Image;
    rectRight: Konva.Image;

    // 绳子拖拽目标区域
    ropeRect: any = [];

    // 提示文字
    tipsTop: Konva.Text;
    tipsBottom: Konva.Text;

    constructor() {
      super('box');
      this.config = new LsConfig();
      this.dmDrag = new LsDragEvent(this);
      this.init();
    }

    async init() {
      await this.addStaticImage();
      await this.addSmallIcon();
      await this.addRect();
      await this.addBigImage();
      await this.addRopeRect();
      await this.addMistAndWaterDrops();
      await this.addText();
      this.dragEvent();
      this.addAnimation();

      this.staticLayer.draw();
    }

    // 加载背景图
    async addStaticImage() {
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.staticLayer.add(background);

      const mesaImage = await this.loadImage((mesa as any), this.config.mesaImage as any);
      this.staticLayer.add(mesaImage);

      const sunImage = await this.loadImage((sun as any), this.config.sunImage as any);
      this.staticLayer.add(sunImage);

      this.stage.add(this.staticLayer);
    }

    // 添加图标
    async addSmallIcon() {
      // 绿色植物
      this.greenPlantsIconImage = await this.loadImage((greenPlantsIcon as any), this.config.greenPlantsIcon as any);
      this.staticLayer.add(this.greenPlantsIconImage);

      // 黄色植物
      this.yellowPlantsIconImage = await this.loadImage((yellowPlantsIcon as any), this.config.yellowPlantsIcon as any);
      this.staticLayer.add(this.yellowPlantsIconImage);

      // 塑料袋
      this.plasticBagIconImage = await this.loadImage((plasticBagIcon as any), this.config.plasticBagIconImage as any);
      this.staticLayer.add(this.plasticBagIconImage);

      // 绳子
      this.ropeIconImage = await this.loadImage((ropeIcon as any), this.config.ropeIconImage as any);
      this.staticLayer.add(this.ropeIconImage);
    }

    // 添加植物虚线框
    async addRect() {
      this.rectLeft = await this.loadImage((dashFrame as any), this.config.rectLeft as any);
      this.staticLayer.add(this.rectLeft);

      this.rectRight = await this.loadImage((dashFrame as any), this.config.rectRight as any);
      this.staticLayer.add(this.rectRight);

      // 设置按钮的位置
      const buttonLeft = document.getElementById('buttonLeft');
      buttonLeft.style.left = this.config.rectLeft.x + (this.config.rectLeft.width - 106) / 2 + 'px';
      buttonLeft.style.top = this.config.textLeft.y + 'px';

      const buttonRight = document.getElementById('buttonRight');
      buttonRight.style.left = this.config.rectRight.x + (this.config.rectRight.width - 106) / 2 + 'px';
      buttonRight.style.top = this.config.textLeft.y + 'px';
    }

    // 添加大图片
    async addBigImage() {
      // 添加绿色植物大图片
      this.greenPlantsImage = await this.loadImage((greenPlants as any), this.config.greenPlantsIcon as any);
      this.greenPlantsImage.draggable(true);
      this.greenPlantsImage.opacity(0);
      this.staticLayer.add(this.greenPlantsImage);

      // 添加黄色植物大图片
      this.yellowPlantsImage = await this.loadImage((yellowPlants as any), this.config.yellowPlantsIcon as any);
      this.yellowPlantsImage.draggable(true);
      this.yellowPlantsImage.opacity(0);
      this.staticLayer.add(this.yellowPlantsImage);

      // 添加开口塑料袋大图片
      this.plasticBagOpening[0] = await this.loadImage((plasticBagOpening as any), this.config.plasticBagIconImage as any);
      this.plasticBagOpening[0].draggable(true);
      this.plasticBagOpening[0].visible(false);
      this.plasticBagOpening[0].opacity(0);
      this.staticLayer.add(this.plasticBagOpening[0]);

      this.plasticBagOpening[1] = await this.loadImage((plasticBagOpening as any), this.config.plasticBagIconImage as any);
      this.plasticBagOpening[1].draggable(true);
      this.plasticBagOpening[1].visible(false);
      this.plasticBagOpening[1].opacity(0);
      this.staticLayer.add(this.plasticBagOpening[1]);

      // 添加密封塑料袋大图片
      this.plasticBagSealUpImage[0] = await this.loadImage((plasticBagSealUp as any), this.config.plasticBagSealUpImage0 as any);
      this.staticLayer.add(this.plasticBagSealUpImage[0]);

      this.plasticBagSealUpImage[1] = await this.loadImage((plasticBagSealUp as any), this.config.plasticBagSealUpImage1 as any);
      this.staticLayer.add(this.plasticBagSealUpImage[1]);

      // 添加绳子大图片
      this.ropeImage[0] = await this.loadImage((rope as any), this.config.ropeIconImage as any);
      this.ropeImage[0].draggable(true);
      this.ropeImage[0].visible(false);
      this.ropeImage[0].opacity(0);
      this.staticLayer.add(this.ropeImage[0]);

      this.ropeImage[1] = await this.loadImage((rope as any), this.config.ropeIconImage as any);
      this.ropeImage[1].draggable(true);
      this.ropeImage[1].visible(false);
      this.ropeImage[1].opacity(0);
      this.staticLayer.add(this.ropeImage[1]);
    }

    // 添加绳子拖拽的目标区域
    addRopeRect() {
      this.ropeRect[0] = new Konva.Rect(this.config.ropeRect0 as any);
      this.staticLayer.add(this.ropeRect[0]);

      this.ropeRect[1] = new Konva.Rect(this.config.ropeRect1 as any);
      this.staticLayer.add(this.ropeRect[1]);
    }

    // 添加白雾和水珠
    async addMistAndWaterDrops() {
      // 添加白雾
      this.whiteMistImage[0] = await this.loadImage((whiteMist as any), this.config.whiteMistImage0 as any);
      this.staticLayer.add(this.whiteMistImage[0]);

      this.whiteMistImage[1] = await this.loadImage((whiteMist as any), this.config.whiteMistImage1 as any);
      this.staticLayer.add(this.whiteMistImage[1]);

      // 添加水珠
      this.waterDropsImage[0] = await this.loadImage((waterDrops as any), this.config.waterDropsImage0 as any);
      this.staticLayer.add(this.waterDropsImage[0]);

      this.waterDropsImage[1] = await this.loadImage((waterDrops as any), this.config.waterDropsImage1 as any);
      this.staticLayer.add(this.waterDropsImage[1]);
    }

    // 添加文字
    addText() {
      // 文字 15分钟后
      this.textLeft = new Konva.Text(this.config.textLeft as any);
      this.staticLayer.add(this.textLeft);

      // 文字 15分钟后
      this.textRight = new Konva.Text(this.config.textRight as any);
      this.staticLayer.add(this.textRight);

      // 台面上提示文字
      this.tipsTop = new Konva.Text(this.config.tipsTop as any);
      this.staticLayer.add(this.tipsTop);

      // 台面下提示文字
      this.tipsBottom = new Konva.Text(this.config.tipsBottom as any);
      this.staticLayer.add(this.tipsBottom);
    }

    // 为大图片绑定事件
    dragEvent() {
      this.dmDrag.plantsDragMove(this.greenPlantsImage, this.rectLeft, this.rectRight,
        this.config.greenPlantsIcon, this.yellowPlantsImage, this.greenPlantsIconImage);
      this.dmDrag.plantsDragMove(this.yellowPlantsImage, this.rectLeft, this.rectRight,
        this.config.yellowPlantsIcon, this.greenPlantsImage, this.yellowPlantsIconImage);

      this.dmDrag.plasticBagDragMove(this.plasticBagOpening[0], this.plasticBagSealUpImage[0], this.plasticBagSealUpImage[1],
        this.config.plasticBagIconImage, this.plasticBagOpening[1]);
      this.dmDrag.plasticBagDragMove(this.plasticBagOpening[1], this.plasticBagSealUpImage[0], this.plasticBagSealUpImage[1],
        this.config.plasticBagIconImage, this.plasticBagOpening[0]);

      this.dmDrag.ropeDragMove(this.ropeImage[0], this.ropeRect[0], this.ropeRect[1], this.config.ropeIconImage,
        this.ropeImage[1], this.plasticBagSealUpImage);
      this.dmDrag.ropeDragMove(this.ropeImage[1], this.ropeRect[0], this.ropeRect[1], this.config.ropeIconImage,
        this.ropeImage[0], this.plasticBagSealUpImage);
    }

    // 添加按钮动画
    addAnimation() {
      this.phenomenonAnimationLeft = this.dmDrag.addAnimation(this.whiteMistImage[0], this.waterDropsImage[0]);
      this.phenomenonAnimationRight = this.dmDrag.addAnimation(this.whiteMistImage[1], this.waterDropsImage[1]);
    }

    // 开始左侧动画
    startLeftAnimation() {
      // 显示文字
      this.textLeft.visible(true);

      // 隐藏按钮
      (window as any).viewHandler.viewModel.$data.showButtonLeft = false;

      this.staticLayer.draw();
      if (this.plasticBagSealUpImage[0].visible() === true && this.greenPlantsImage.x() === this.rectLeft.x()) {
        this.phenomenonAnimationLeft.play();
      }
    }

    // 开始右侧动画
    startRightAnimation() {
      // 显示文字
      this.textRight.visible(true);

      // 隐藏按钮
      (window as any).viewHandler.viewModel.$data.showButtonRight = false;

      this.staticLayer.draw();
      if (this.plasticBagSealUpImage[1].visible() === true && this.greenPlantsImage.x() === this.rectRight.x()) {
        this.phenomenonAnimationRight.play();
      }
    }

    // 重置
    async reset() {
      // 重置大图片位置和宽高
      this.resetImage(this.greenPlantsImage, this.config.greenPlantsIcon);
      this.resetImage(this.yellowPlantsImage, this.config.yellowPlantsIcon);

      this.resetImage(this.plasticBagOpening[0], this.config.plasticBagIconImage);
      this.resetImage(this.plasticBagOpening[1], this.config.plasticBagIconImage);

      this.resetImage(this.ropeImage[0], this.config.ropeIconImage);
      this.resetImage(this.ropeImage[1], this.config.ropeIconImage);

      // 重置图片可拖动状态
      this.greenPlantsIconImage.opacity(1);
      this.yellowPlantsIconImage.opacity(1);
      this.plasticBagIconImage.opacity(0.4);
      this.ropeIconImage.opacity(0.4);

      // 隐藏密封塑料袋
      this.plasticBagSealUpImage[0].visible(false);
      this.plasticBagSealUpImage[1].visible(false);

      // 隐藏按钮
      (window as any).viewHandler.viewModel.$data.showButtonLeft = false;
      (window as any).viewHandler.viewModel.$data.showButtonRight = false;

      // 隐藏文字
      this.textLeft.visible(false);
      this.textRight.visible(false);

      // 重置动画
      this.phenomenonAnimationLeft.progress(0);
      this.phenomenonAnimationLeft.pause();

      this.phenomenonAnimationRight.progress(0);
      this.phenomenonAnimationRight.pause();

      // 初始化提示文字状态
      this.tipsTop.visible(true);
      this.tipsBottom.visible(false);

      this.staticLayer.draw();
    }

    // 重置分子式的位置
    resetImage(image: Konva.Image, config: any) {
        image.x(config.x);
        image.y(config.y);
        image.scale({
          x: 1,
          y: 1
        });
        image.opacity(0);
        image.draggable(true);
    }
}

