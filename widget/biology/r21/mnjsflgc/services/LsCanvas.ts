import { ScaleValue, SimpleKonvaTemplate } from './SimpleKonvaTemplate';
import * as Konva from 'konva';

import {LsConfig} from './LsConfig';
import {LsDragEvent} from './LsDragEvent';

import * as backgroundImage from '../sub_static/backgroundImage.png';
import * as textBackgroundImage from '../sub_static/textBackground.png';
import * as rightBackgroundImage from '../sub_static/rightBackgroundImage.png';
import * as rightBackgroundNoText from '../sub_static/rightBackgroundNoText.png';
import * as rotatePointImage from '../sub_static/rotatePoint.png';
import * as smallCells1 from '../sub_static/smallCells1.png';
import * as smallCells2 from '../sub_static/smallCells2.png';
import * as smallCells3 from '../sub_static/smallCells3.png';
import * as smallCells4 from '../sub_static/smallCells4.png';
import * as smallCells5 from '../sub_static/smallCells5.png';
import * as smallCells6 from '../sub_static/smallCells6.png';
import * as smallCells8 from '../sub_static/smallCells8.png';
import * as smallCells9 from '../sub_static/smallCells9.png';
import * as smallCells10 from '../sub_static/smallCells10.png';

import * as bigCells1 from '../sub_static/bigCells1.png';
import * as bigCells2 from '../sub_static/bigCells2.png';
import * as bigCells3 from '../sub_static/bigCells3.png';

import * as blueChromosomeImage1 from '../sub_static/blueChromosomeImage1.png';
import * as blueChromosomeImage2 from '../sub_static/blueChromosomeImage2.png';
import * as blueChromosomeImage3 from '../sub_static/blueChromosomeImage3.png';
import * as blueChromosomeImage4 from '../sub_static/blueChromosomeImage4.png';
import * as redChromosomeImage1 from '../sub_static/redChromosomeImage1.png';
import * as redChromosomeImage2 from '../sub_static/redChromosomeImage2.png';
import * as redChromosomeImage3 from '../sub_static/redChromosomeImage3.png';
import * as redChromosomeImage4 from '../sub_static/redChromosomeImage4.png';

export class LsCanvas extends SimpleKonvaTemplate {

    config: LsConfig;
    // 拖动事件
    dmDrag: LsDragEvent;

    // 左侧细胞
    smallCells: any = [];

    // 右侧细胞
    bigCells: any = [];

    timer1: any;
    timer2: any;
    timeControl = false;

    // 蓝色染色体
    blueChromosome1: any = [];
    blueChromosome2: any = [];
    blueChromosome3: any = [];
    blueChromosome4: any = [];

    //创建组
    blueGroup1: Konva.Group[] = [];
    blueGroup2: Konva.Group[] = [];
    blueGroup3: Konva.Group[] = [];
    blueGroup4: Konva.Group[] = [];

    redGroup1: Konva.Group[] = [];
    redGroup2: Konva.Group[] = [];
    redGroup3: Konva.Group[] = [];
    redGroup4: Konva.Group[] = [];

    // 红色染色体
    redChromosome1: any = [];
    redChromosome2: any = [];
    redChromosome3: any = [];
    redChromosome4: any = [];

    // 拖动点
    blueRotatePoint1: any = [];
    blueRotatePoint2: any = [];
    blueRotatePoint3: any = [];
    blueRotatePoint4: any = [];

    redRotatePoint1: any = [];
    redRotatePoint2: any = [];
    redRotatePoint3: any = [];
    redRotatePoint4: any = [];
    scaleValue = new ScaleValue();

    //右侧背景
    rightBackground: any;
    blankRightBackground: any;

    width = window.innerWidth;
    height = window.innerHeight;

    private text: Konva.Text;

    constructor() {
      super('box');
      this.config = new LsConfig();
      this.dmDrag = new LsDragEvent(this);
      this.init();
    }

    async init() {
      this.initGroup();
      await this.addStaticImage();
      await this.addSmallCells();
      await this.addBigCells();
      await this.addBlueChromosome();
      await this.addRedChromosome();
      await this.addRotatePointImage();
      this.bindEvent();
      this.allOfCellFromLeft();
      this.createText();
      this.staticLayer.draw();
    }

    // 加载背景图
    async addStaticImage() {
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.staticLayer.add(background);

      const textBground = await this.loadImage((textBackgroundImage as any), this.config.textBackgroundImage as any);
      this.staticLayer.add(textBground);

      this.rightBackground = await this.loadImage((rightBackgroundImage as any), this.config.rightBackgroundImage as any);
      this.staticLayer.add(this.rightBackground);

      this.blankRightBackground = await this.loadImage((rightBackgroundNoText as any), this.config.rightBackgroundNoText as any);
      this.staticLayer.add(this.blankRightBackground);
      this.blankRightBackground.visible(false);
    }

    //加载旋转点图片
    async addRotatePointImage() {
      this.blueRotatePoint1[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint0 as any);
      this.blueRotatePoint1[0].visible(false);
      this.blueGroup1[0].add(this.blueRotatePoint1[0]);
      for (let i = 1; i < 50; i++) {
          this.blueRotatePoint1[i] = this.blueRotatePoint1[0].clone();
          this.blueGroup1[i].add(this.blueRotatePoint1[i]);
          this.blueGroup1[i].visible(false);
      }

      this.blueRotatePoint2[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint1 as any);
      this.blueRotatePoint2[0].visible(false);
      this.blueGroup2[0].add(this.blueRotatePoint2[0]);
      for (let i = 1; i < 50; i++) {
        this.blueRotatePoint2[i] = this.blueRotatePoint2[0].clone();
        this.blueGroup2[i].add(this.blueRotatePoint2[i]);
        this.blueGroup2[i].visible(false);
      }

      this.blueRotatePoint3[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint2 as any);
      this.blueRotatePoint3[0].visible(false);
      this.blueGroup3[0].add(this.blueRotatePoint3[0]);
      for (let i = 1; i < 50; i++) {
        this.blueRotatePoint3[i] = this.blueRotatePoint3[0].clone();
        this.blueGroup3[i].add(this.blueRotatePoint3[i]);
        this.blueGroup3[i].visible(false);
      }

      this.blueRotatePoint4[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint3 as any);
      this.blueRotatePoint4[0].visible(false);
      this.blueGroup4[0].add(this.blueRotatePoint4[0]);
      for (let i = 1; i < 50; i++) {
        this.blueRotatePoint4[i] = this.blueRotatePoint4[0].clone();
        this.blueGroup4[i].add(this.blueRotatePoint4[i]);
        this.blueGroup4[i].visible(false);
      }

      this.redRotatePoint1[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint4 as any);
      this.redRotatePoint1[0].visible(false);
      this.redGroup1[0].add(this.redRotatePoint1[0]);
      for (let i = 1; i < 50; i++) {
        this.redRotatePoint1[i] = this.redRotatePoint1[0].clone();
        this.redGroup1[i].add(this.redRotatePoint1[i]);
        this.redGroup1[i].visible(false);
      }

      this.redRotatePoint2[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint5 as any);
      this.redRotatePoint2[0].visible(false);
      this.redGroup2[0].add(this.redRotatePoint2[0]);
      for (let i = 1; i < 50; i++) {
        this.redRotatePoint2[i] = this.redRotatePoint2[0].clone();
        this.redGroup2[i].add(this.redRotatePoint2[i]);
        this.redGroup2[i].visible(false);
      }

      this.redRotatePoint3[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint6 as any);
      this.redRotatePoint3[0].visible(false);
      this.redGroup3[0].add(this.redRotatePoint3[0]);
      for (let i = 1; i < 50; i++) {
        this.redRotatePoint3[i] = this.redRotatePoint3[0].clone();
        this.redGroup3[i].add(this.redRotatePoint3[i]);
        this.redGroup3[i].visible(false);
      }

      this.redRotatePoint4[0] = await this.loadImage((rotatePointImage as any), this.config.dragPoint7 as any);
      this.redRotatePoint4[0].visible(false);
      this.redGroup4[0].add(this.redRotatePoint4[0]);
      for (let i = 1; i < 50; i++) {
        this.redRotatePoint4[i] = this.redRotatePoint4[0].clone();
        this.redGroup4[i].add(this.redRotatePoint4[i]);
        this.redGroup4[i].visible(false);
      }
    }

    //添加左侧细胞小图
    async addSmallCells() {
      this.smallCells[0] = await this.loadImage((smallCells1 as any), this.config.smallCells1 as any);
      this.staticLayer.add(this.smallCells[0]);

      this.smallCells[1] = await this.loadImage((smallCells2 as any), this.config.smallCells2 as any);
      this.staticLayer.add(this.smallCells[1]);

      this.smallCells[2] = await this.loadImage((smallCells3 as any), this.config.smallCells3 as any);
      this.staticLayer.add(this.smallCells[2]);

      this.smallCells[3] = await this.loadImage((smallCells4 as any), this.config.smallCells4 as any);
      this.staticLayer.add(this.smallCells[3]);

      this.smallCells[4] = await this.loadImage((smallCells5 as any), this.config.smallCells5 as any);
      this.staticLayer.add(this.smallCells[4]);

      this.smallCells[5] = [];
      this.smallCells[5][0] = await this.loadImage((smallCells6 as any), this.config.smallCells6 as any);
      this.staticLayer.add(this.smallCells[5][0]);

      this.smallCells[5][1] = await this.loadImage((smallCells6 as any), this.config.smallCells6_2 as any);
      this.staticLayer.add(this.smallCells[5][1]);

      this.smallCells[6] = [];
      this.smallCells[6][0] = await this.loadImage((smallCells6 as any), this.config.smallCells7_1 as any);
      this.staticLayer.add(this.smallCells[6][0]);

      this.smallCells[6][1] = await this.loadImage((smallCells6 as any), this.config.smallCells7_2 as any);
      this.staticLayer.add(this.smallCells[6][1]);

      this.smallCells[7] = [];
      this.smallCells[7][0] = await this.loadImage((smallCells8 as any), this.config.smallCells8_1 as any);
      this.staticLayer.add(this.smallCells[7][0]);

      this.smallCells[7][1] = await this.loadImage((smallCells8 as any), this.config.smallCells8_2 as any);
      this.staticLayer.add(this.smallCells[7][1]);

      this.smallCells[8] = [];
      this.smallCells[8][0] = await this.loadImage((smallCells9 as any), this.config.smallCells9_1 as any);
      this.staticLayer.add(this.smallCells[8][0]);

      this.smallCells[8][1] = await this.loadImage((smallCells9 as any), this.config.smallCells9_2 as any);
      this.staticLayer.add(this.smallCells[8][1]);

      this.smallCells[9] = [];
      this.smallCells[9][0] = await this.loadImage((smallCells10 as any), this.config.smallCells10_1 as any);
      this.staticLayer.add(this.smallCells[9][0]);

      this.smallCells[9][1] = await this.loadImage((smallCells10 as any), this.config.smallCells10_2 as any);
      this.staticLayer.add(this.smallCells[9][1]);
    }

    //添加右侧细胞大图片
    async addBigCells() {
      this.bigCells[0] = await this.loadImage((bigCells1 as any), this.config.bigCells1 as any);
      this.staticLayer.add(this.bigCells[0]);

      this.bigCells[1] = await this.loadImage((bigCells2 as any), this.config.bigCells2 as any);
      this.staticLayer.add(this.bigCells[1]);

      this.bigCells[2] = await this.loadImage((bigCells3 as any), this.config.bigCells3 as any);
      this.staticLayer.add(this.bigCells[2]);

      this.bigCells[3] = new Konva.Group();
      this.bigCells[3].add(await this.loadImage((bigCells1 as any), this.config.bigCells4 as any));
      this.bigCells[3].add(await this.loadImage((bigCells1 as any), this.config.bigCells5 as any));
      this.staticLayer.add(this.bigCells[3]);

      for (let i = 0; i < 4; i++) {
          this.bigCells[i].visible(false);
      }
    }

    //添加蓝色染色体图片
    async addBlueChromosome() {
      await this.createChromosome(this.blueChromosome1, blueChromosomeImage1, this.config.blueChromosomeImage1, this.blueGroup1);
      await this.createChromosome(this.blueChromosome2, blueChromosomeImage2, this.config.blueChromosomeImage2, this.blueGroup2);
      await this.createChromosome(this.blueChromosome3, blueChromosomeImage3, this.config.blueChromosomeImage3, this.blueGroup3);
      await this.createChromosome(this.blueChromosome4, blueChromosomeImage4, this.config.blueChromosomeImage4, this.blueGroup4);
    }

    //添加红色染色体图片
    async addRedChromosome() {
      await this.createChromosome(this.redChromosome1, redChromosomeImage1, this.config.redChromosomeImage1, this.redGroup1);
      await this.createChromosome(this.redChromosome2, redChromosomeImage2, this.config.redChromosomeImage2, this.redGroup2);
      await this.createChromosome(this.redChromosome3, redChromosomeImage3, this.config.redChromosomeImage3, this.redGroup3);
      await this.createChromosome(this.redChromosome4, redChromosomeImage4, this.config.redChromosomeImage4, this.redGroup4);
    }

    //初始化组
    initGroup() {
        for (let i = 0; i < 50; i++) {
          this.blueGroup1[i] = new Konva.Group();
          this.blueGroup2[i] = new Konva.Group();
          this.blueGroup3[i] = new Konva.Group();
          this.blueGroup4[i] = new Konva.Group();
          this.redGroup1[i] = new Konva.Group();
          this.redGroup2[i] = new Konva.Group();
          this.redGroup3[i] = new Konva.Group();
          this.redGroup4[i] = new Konva.Group();
        }
    }

    //绑定组拖动事件
    bindEvent() {
      for (let i = 0; i < 49; i++) {
        this.bindDragEvent(this.blueGroup1[i], this.blueGroup1[i + 1], this.blueRotatePoint1[i], this.blueChromosome1[i]);
        this.bindDragEvent(this.blueGroup2[i], this.blueGroup2[i + 1], this.blueRotatePoint2[i], this.blueChromosome2[i]);
        this.bindDragEvent(this.blueGroup3[i], this.blueGroup3[i + 1], this.blueRotatePoint3[i], this.blueChromosome3[i]);
        this.bindDragEvent(this.blueGroup4[i], this.blueGroup4[i + 1], this.blueRotatePoint4[i], this.blueChromosome4[i]);

        this.bindDragEvent(this.redGroup1[i], this.redGroup1[i + 1], this.redRotatePoint1[i], this.redChromosome1[i]);
        this.bindDragEvent(this.redGroup2[i], this.redGroup2[i + 1], this.redRotatePoint2[i], this.redChromosome2[i]);
        this.bindDragEvent(this.redGroup3[i], this.redGroup3[i + 1], this.redRotatePoint3[i], this.redChromosome3[i]);
        this.bindDragEvent(this.redGroup4[i], this.redGroup4[i + 1], this.redRotatePoint4[i], this.redChromosome4[i]);
      }
    }

    bindDragEvent(obj: Konva.Group, obj1: Konva.Group, rotatePoint: Konva.Image, ranseti: Konva.Image) {
      obj.on('dragstart', () => {
        obj1.visible(true);
      });
      obj.on('dragend', () => {
        rotatePoint.visible(true);
       this.timer1 = setTimeout(() => {

         if (this.timeControl) {
           this.timeControl = false;
           clearTimeout(this.timer2);
         }
          rotatePoint.visible(false);
          this.staticLayer.draw();
        }, 3000);
      });
      obj.on('mousedown touchstart', () => {
        rotatePoint.visible(true);
        if (this.timer2) {
          clearTimeout(this.timer2);
        }
        this.timer2 = setTimeout(() => {
          if (!this.timeControl) {
            this.timeControl = true;
            clearTimeout(this.timer1);
          }
          rotatePoint.visible(false);
          this.staticLayer.draw();
        }, 3000);
      });

      rotatePoint.on('mousedown touchstart', () => {
        ranseti.rotate(-30);
      });

    }

    //左侧细胞绑定事件
    allOfCellFromLeft() {
        //减数一
        this.bindEventForLeftCell(this.smallCells[1], this.bigCells[0], true, '前期 I');
        this.bindEventForLeftCell(this.smallCells[2], this.bigCells[0], true, '中期 I');
        this.bindEventForLeftCell(this.smallCells[3], this.bigCells[1], true, '后期 I');
        this.bindEventForLeftCell(this.smallCells[4], this.bigCells[2], true, '末期 I');

        //减数二
        this.bindEventForLeftCell(this.smallCells[5][0], this.bigCells[0], true, '前期 II');
        this.bindEventForLeftCell(this.smallCells[5][1], this.bigCells[0], true, '前期 II');
        this.bindEventForLeftCell(this.smallCells[6][0], this.bigCells[0], true, '中期 II');
        this.bindEventForLeftCell(this.smallCells[6][1], this.bigCells[0], true, '中期 II');
        this.bindEventForLeftCell(this.smallCells[7][0], this.bigCells[1], true, '后期 II');
        this.bindEventForLeftCell(this.smallCells[7][1], this.bigCells[1], true, '后期 II');
        this.bindEventForLeftCell(this.smallCells[8][0], this.bigCells[2], true, '末期 II');
        this.bindEventForLeftCell(this.smallCells[8][1], this.bigCells[2], true, '末期 II');
        this.bindEventForLeftCell(this.smallCells[9][0], this.bigCells[3], true, '精细胞');
        this.bindEventForLeftCell(this.smallCells[9][1], this.bigCells[3], true, '精细胞');
    }

    //点击左侧图片，右侧显示对应图片
    bindEventForLeftCell(image1: Konva.Image, image2: Konva.Image, flag: boolean, text: string) {
        image1.on('mousedown touchstart', () => {
            for (let i = 0; i < 4; i++) {
              this.bigCells[i].visible(false);
            }
            image2.visible(flag);
            this.rightBackground.visible(false);
            this.blankRightBackground.visible(true);
            this.text.text(text);
            this.text.moveToTop();
            for (let i = 0; i < 50; i++) {
              this.blueGroup1[i].draggable(true);
              this.blueGroup2[i].draggable(true);
              this.blueGroup3[i].draggable(true);
              this.blueGroup4[i].draggable(true);
              this.redGroup1[i].draggable(true);
              this.redGroup2[i].draggable(true);
              this.redGroup3[i].draggable(true);
              this.redGroup4[i].draggable(true);
            }

            this.resetImage(this.blueGroup1, this.blueChromosome1, this.blueRotatePoint1);
            this.resetImage(this.blueGroup2, this.blueChromosome2, this.blueRotatePoint2);
            this.resetImage(this.blueGroup3, this.blueChromosome3, this.blueRotatePoint3);
            this.resetImage(this.blueGroup4, this.blueChromosome4, this.blueRotatePoint4);

            this.resetImage(this.redGroup1, this.redChromosome1, this.redRotatePoint1);
            this.resetImage(this.redGroup2, this.redChromosome2, this.redRotatePoint2);
            this.resetImage(this.redGroup3, this.redChromosome3, this.redRotatePoint3);
            this.resetImage(this.redGroup4, this.redChromosome4, this.redRotatePoint4);

            this.staticLayer.draw();
        });
    }

    //创建文字
    createText() {
      this.text = this.textHelp('');
      this.staticLayer.add(this.text);
    }

    //为各端适配文字位置
    getXValue() {
      let value: number;
      if ((window as any)['env'].browserInfo.isPc) {
        value = this.width * 0.73 - (this.width - 1024 * this.scaleValue.scale) / 2;
      } else if ((window as any)['env'].browserInfo.isSmallDevice) {
        value = this.width * 0.715 - (this.width - 1024 * this.scaleValue.scale) / 2;
      } else {
        value = this.width * 0.73 - (this.width - 1024 * this.scaleValue.scale) / 2;
      }
        return value;
    }

    textHelp(text: string) {
      const word = new Konva.Text({
        x: this.getXValue(),
        y: this.height * 0.545 - (this.height - 576 * this.scaleValue.scale) / 2,
        text: text,
        fontSize: (window as any)['env'].browserInfo.isSmallDevice ? 16 : 20,
        fontFamily: 'Microsoft YaHei',
        fill: '#000'
      });
      return word;
    }

    // 创建染色体
    async createChromosome(chromosome: any, image: any, config: any, group: Konva.Group[]) {
      chromosome[0] = await this.loadImage((image as any), config as any);
      group[0].add(chromosome[0]);
      this.staticLayer.add(group[0]);
      chromosome[0].cache();
      for (let i = 1; i < 50; i++) {
        chromosome[i] = await chromosome[0].clone(config as any);
        group[i].add(chromosome[i]);
        this.staticLayer.add(group[i]);
      }
    }

    // 重置
    reset() {

      this.resetImage(this.blueGroup1, this.blueChromosome1, this.blueRotatePoint1);
      this.resetImage(this.blueGroup2, this.blueChromosome2, this.blueRotatePoint2);
      this.resetImage(this.blueGroup3, this.blueChromosome3, this.blueRotatePoint3);
      this.resetImage(this.blueGroup4, this.blueChromosome4, this.blueRotatePoint4);

      this.resetImage(this.redGroup1, this.redChromosome1, this.redRotatePoint1);
      this.resetImage(this.redGroup2, this.redChromosome2, this.redRotatePoint2);
      this.resetImage(this.redGroup3, this.redChromosome3, this.redRotatePoint3);
      this.resetImage(this.redGroup4, this.redChromosome4, this.redRotatePoint4);

      for (let i = 0; i < 4; i++) {
        this.bigCells[i].visible(false);
      }

      for (let i = 0; i < 50; i++) {
          this.blueGroup1[i].draggable(false);
          this.blueGroup2[i].draggable(false);
          this.blueGroup3[i].draggable(false);
          this.blueGroup4[i].draggable(false);
          this.redGroup1[i].draggable(false);
          this.redGroup2[i].draggable(false);
          this.redGroup3[i].draggable(false);
          this.redGroup4[i].draggable(false);
      }
      this.text.text('');
      this.rightBackground.visible(true);
      this.blankRightBackground.visible(false);
      this.staticLayer.draw();
    }

    // 重置染色体的位置
    resetImage(group: any, group2: any, group3: any) {
      for (let i = 0; i < 50; i++) {
        group[i].x(0);
        group[i].y(0);
        group[i].visible(false);
        group2[i].rotation(0);
        group3[i].visible(false);
      }
      group[0].visible(true);
      group[1].visible(true);

      this.timeControl = false;
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
    }
}

