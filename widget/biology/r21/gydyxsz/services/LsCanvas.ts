

import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import * as Konva from 'konva';

import {LsConfig} from './LsConfig';
import {LsDragEvent} from './LsDragEvent';

import * as backgroundImage from '../sub_static/backgroundImage.png';
import * as smallEllipseImage from '../sub_static/smallEllipseImage.png';
import * as largeEllipseImage from '../sub_static/largeEllipseImage.png';
import * as rightBackgroundImage from '../sub_static/rightBackgroundImage.png';
import * as redX1 from '../sub_static/redX1.png';
import * as redX2 from '../sub_static/redX2.png';
import * as red2 from '../sub_static/red2.png';
import * as red3 from '../sub_static/red3.png';
import * as red4 from '../sub_static/red4.png';
import * as blueX from '../sub_static/blueX.png';
import * as blueY from '../sub_static/blueY.png';
import * as blue2 from '../sub_static/blue2.png';
import * as blue3 from '../sub_static/blue3.png';
import * as blue4 from '../sub_static/blue4.png';

import * as woman from '../sub_static/woman.png';
import * as man from '../sub_static/man.png';

export class LsCanvas extends SimpleKonvaTemplate {
    config: LsConfig;
    // 拖动事件
    dmDrag: LsDragEvent;

    // 精子和卵子的图片
    spermImage: Konva.Image;
    ovumImage: Konva.Image;

    // 受精卵图片
    fertilizedOvunImage: Konva.Image;

    // 红色染色体
    redX1Image: any = [];
    redX2Image: any = [];
    red2Image: any = [];
    red3Image: any = [];
    red4Image: any = [];

    // 蓝色染色体
    blueXImage: any = [];
    blueYImage: any = [];
    blue2Image: any = [];
    blue3Image: any = [];
    blue4Image: any = [];


    constructor() {
      super('box');
      this.config = new LsConfig();
      this.dmDrag = new LsDragEvent(this);
      this.init();
    }

    async init() {
      await this.addStaticImage();
      await this.addSmallEllipse();
      await this.addFertilizedOvunImage();
      await this.addRedChromosome();
      await this.addBlueChromosome();
      // this.stage.add(this.staticLayer);
      await this.addText();
      this.staticLayer.draw();
    }

    // 加载背景图
    async addStaticImage() {
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.staticLayer.add(background);

      const rightBackground = await this.loadImage((rightBackgroundImage as any), this.config.rightBackgroundImage as any);
      this.staticLayer.add(rightBackground);
    }

    // 加载精子和卵子的图片
    async addSmallEllipse() {
      this.spermImage = await this.loadImage((smallEllipseImage as any), this.config.spermImage as any);
      this.staticLayer.add(this.spermImage);

      this.ovumImage = await this.loadImage((smallEllipseImage as any), this.config.ovumImage as any);
      this.staticLayer.add(this.ovumImage);
    }

    // 加载受精卵图片
    async addFertilizedOvunImage() {
      this.fertilizedOvunImage = await this.loadImage((largeEllipseImage as any), this.config.fertilizedOvunImage as any);
      this.staticLayer.add(this.fertilizedOvunImage);
    }

    // 加载红色染色体
    async addRedChromosome() {
      await this.createChromosome(this.redX1Image, redX1, this.config.redX1);
      await this.createChromosome(this.redX2Image, redX2, this.config.redX2);
      await this.createChromosome(this.red2Image, red2, this.config.red2);
      await this.createChromosome(this.red3Image, red3, this.config.red3);
      await this.createChromosome(this.red4Image, red4, this.config.red4);
      for (let i = 0; i < 49; i++) {
        this.bindEventToImage(this.redX1Image[i], this.redX1Image[i + 1]);
        this.bindEventToImage(this.redX2Image[i], this.redX2Image[i + 1]);
        this.bindEventToImage(this.red2Image[i], this.red2Image[i + 1]);
        this.bindEventToImage(this.red3Image[i], this.red3Image[i + 1]);
        this.bindEventToImage(this.red4Image[i], this.red4Image[i + 1]);
      }

    }

    // 加载红色染色体
    async addBlueChromosome() {
      await this.createChromosome(this.blueXImage, blueX, this.config.blueX);
      await this.createChromosome(this.blueYImage, blueY, this.config.blueY);
      await this.createChromosome(this.blue2Image, blue2, this.config.blue2);
      await this.createChromosome(this.blue3Image, blue3, this.config.blue3);
      await this.createChromosome(this.blue4Image, blue4, this.config.blue4);

      for (let i = 0; i < 49; i++) {
        this.bindEventToImage(this.blueXImage[i], this.blueXImage[i + 1]);
        this.bindEventToImage(this.blueYImage[i], this.blueYImage[i + 1]);
        this.bindEventToImage(this.blue2Image[i], this.blue2Image[i + 1]);
        this.bindEventToImage(this.blue3Image[i], this.blue3Image[i + 1]);
        this.bindEventToImage(this.blue4Image[i], this.blue4Image[i + 1]);
      }
    }

    // 文字
    async addText() {
      const womanImage = await this.loadImage((woman as any), this.config.woman as any);
      this.staticLayer.add(womanImage);

      const text1 = new Konva.Text(this.config.text1 as any);
      this.staticLayer.add(text1);

      const manImage = await this.loadImage((man as any), this.config.man as any);
      this.staticLayer.add(manImage);

      const text2 = new Konva.Text(this.config.text2 as any);
      this.staticLayer.add(text2);

      const text3 = new Konva.Text(this.config.text3 as any);
      this.staticLayer.add(text3);

      const text4 = new Konva.Text(this.config.text4 as any);
      this.staticLayer.add(text4);

      const text5 = new Konva.Text(this.config.text5 as any);
      this.staticLayer.add(text5);

      const text6 = new Konva.Text(this.config.text6 as any);
      this.staticLayer.add(text6);
    }

    // 创建染色体
    async createChromosome(chromosome: any, image: any, config: any) {
      chromosome[0] = await this.loadImage((image as any), config as any);
      this.staticLayer.add(chromosome[0]);
      chromosome[0].cache();

      for (let i = 1; i < 50; i++) {
        chromosome[i] = await chromosome[0].clone(config as any);
        chromosome[i].visible(false);
        this.staticLayer.add(chromosome[i]);
      }
    }

    //给染色体绑定事件解决图片毛边的问题
    bindEventToImage(obj1: Konva.Image, obj2: Konva.Image) {
      obj1.on('dragstart touchstart', () => {
        obj2.visible(true);
        this.staticLayer.batchDraw();
      });
    }

    // 重置
    async reset() {
      this.resetImage(this.redX1Image, this.config.redX1);
      this.resetImage(this.redX2Image, this.config.redX2);
      this.resetImage(this.red2Image, this.config.red2);
      this.resetImage(this.red3Image, this.config.red3);
      this.resetImage(this.red4Image, this.config.red4);

      this.resetImage(this.blueXImage, this.config.blueX);
      this.resetImage(this.blueYImage, this.config.blueY);
      this.resetImage(this.blue2Image, this.config.blue2);
      this.resetImage(this.blue3Image, this.config.blue3);
      this.resetImage(this.blue4Image, this.config.blue4);

      this.staticLayer.draw();
    }

    // 重置分子式的位置
    resetImage(image: any, config: any) {
      for (let i = 0; i < 50; i++) {
        image[i].x(config.x);
        image[i].y(config.y);
      }
    }
}

