

import {SimpleKonvaTemplate3} from '../../../../../src/konva/template/SimpleKonvaTemplate3';
import * as Konva from 'konva';

import {ZwConfig} from './ZwConfig';

import * as bgColorImage from '../sub_static/smallIcons/bgColorImage.png';
import * as smallSunImage from '../sub_static/smallIcons/smallSunImage.png';
import * as smallCatheterImage from '../sub_static/smallIcons/catheterImage.png';
import * as smallScaldedBladesImage from '../sub_static/smallIcons/scaldedBladesImage.png';
import * as smallSqueezeBottleImage from '../sub_static/smallIcons/squeezeBottleImage.png';
import * as smallFreshBladesImage from '../sub_static/smallIcons/freshBladesImage.png';
import * as smallLimeWaterImage from '../sub_static/smallIcons/limeWaterImage.png';
import * as smallCleanWaterImage from '../sub_static/smallIcons/cleanWaterImage.png';

import * as sunImage from '../sub_static/bigIcons/sunImage.png';
import * as catheterImage from '../sub_static/bigIcons/catheterImage.png';
import * as scaldedBladesImage from '../sub_static/bigIcons/scaldedBladesImage.png';
import * as squeezeBottleImage from '../sub_static/bigIcons/squeezeBottleImage.png';
import * as freshBladesImage from '../sub_static/bigIcons/freshBladesImage.png';
import * as limeWaterImage from '../sub_static/bigIcons/limeWaterImage.png';
import * as cleanWaterImage from '../sub_static/bigIcons/cleanWaterImage.png';


export class ZwCanvas extends SimpleKonvaTemplate3 {
    config: ZwConfig;

    // 太阳图片
    sun: any = [];
    // 导管
    catheter: any = [];
    // 烫过的叶子
    scaldedBlades: any = [];
    // 挤压瓶
    squeezeBottle: any = [];
    // 新鲜的叶子
    freshBlades: any = [];
    // 澄清石灰水
    limeWater: any = [];
    // 清水
    cleanWater: any = [];

    // 右侧小图标
    smallSun: Konva.Image;
    smallCatheter: Konva.Image;
    smallScaldedBlades: Konva.Image;
    smallSqueezeBottle: Konva.Image;
    smallFreshBlades: Konva.Image;
    smallLimeWater: Konva.Image;
    smallCleanWater: Konva.Image;

    // 回收图片方形区域
    rect: Konva.Rect;

    constructor() {
        super('box');
        this.config = new ZwConfig();
        this.initImage();
    }

    async initImage() {
        await this.initSmallIcons();
        await this.initSmallIconsText();
        await this.initFreshBlades();
        await this.initScaldedBlades();
        await this.initSqueezeBottle();
        await this.initCatheterImage();
        await this.initLimeWater();
        await this.initCleanWater();
        await this.initSunImage();
        await this.stage.add(this.staticLayer);
        await this.initEvent();
    }

    // 静止的小图标
    async initSmallIcons() {
      // 加载背景
      const bgImage = await this.loadImage((bgColorImage as any), this.config.bgColorImage as any);
      this.staticLayer.add(bgImage);

      // 小太阳
      this.smallSun = await this.loadImage((smallSunImage as any), this.config.smallSunImage as any);
      this.staticLayer.add(this.smallSun);

      // 导管
      this.smallCatheter = await this.loadImage((smallCatheterImage as any), this.config.smallCatheterImage as any);
      this.staticLayer.add(this.smallCatheter);

      // 烫过的叶片
      this.smallScaldedBlades = await this.loadImage((smallScaldedBladesImage as any), this.config.smallScaldedBladesImage as any);
      this.staticLayer.add(this.smallScaldedBlades);

      // 挤压瓶
      this.smallSqueezeBottle = await this.loadImage((smallSqueezeBottleImage as any), this.config.smallSqueezeBottleImage as any);
      this.staticLayer.add(this.smallSqueezeBottle);

      // 新鲜的叶子
      this.smallFreshBlades = await this.loadImage((smallFreshBladesImage as any), this.config.smallFreshBladesImage as any);
      this.staticLayer.add(this.smallFreshBlades);

      // 澄清石灰水
      this.smallLimeWater = await this.loadImage((smallLimeWaterImage as any), this.config.smallLimeWaterImage as any);
      this.staticLayer.add(this.smallLimeWater);

      // 清水
      this.smallCleanWater = await this.loadImage((smallCleanWaterImage as any), this.config.smallCleanWaterImage as any);
      this.staticLayer.add(this.smallCleanWater);

      // 右侧小图标区域
      this.rect = new Konva.Rect(this.config.rect as any);
      this.staticLayer.add(this.rect);
    }

    // 文字
    async initSmallIconsText() {
      const title = new Konva.Text(this.config.titleText as any);
      this.staticLayer.add(title);

      const smallSunText = new Konva.Text(this.config.smallSunText as any);
      this.staticLayer.add(smallSunText);

      const catheterText = new Konva.Text(this.config.catheterText as any);
      this.staticLayer.add(catheterText);

      const scaldedBladesText = new Konva.Text(this.config.scaldedBladesText as any);
      this.staticLayer.add(scaldedBladesText);

      const squeezeBottleText = new Konva.Text(this.config.squeezeBottleText as any);
      this.staticLayer.add(squeezeBottleText);

      const freshBladesText = new Konva.Text(this.config.freshBladesText as any);
      this.staticLayer.add(freshBladesText);

      const limeWaterText = new Konva.Text(this.config.limeWaterText as any);
      this.staticLayer.add(limeWaterText);

      const cleanWaterText = new Konva.Text(this.config.cleanWaterText as any);
      this.staticLayer.add(cleanWaterText);
    }

    // 太阳
    async initSunImage() {
      this.sun[0] = await this.loadImage((sunImage as any), this.config.sunImage as any);
      this.staticLayer.add(this.sun[0]);

      this.sun[1] = await this.loadImage((sunImage as any), this.config.sunImage as any);
      this.staticLayer.add(this.sun[1]);

      this.sun[2] = await this.loadImage((sunImage as any), this.config.sunImage as any);
      this.staticLayer.add(this.sun[2]);
    }

    // 导管
    async initCatheterImage() {
      this.catheter[0] = await this.loadImage((catheterImage as any), this.config.catheterImage as any);
      this.staticLayer.add(this.catheter[0]);

      this.catheter[1] = await this.loadImage((catheterImage as any), this.config.catheterImage as any);
      this.staticLayer.add(this.catheter[1]);

      this.catheter[2] = await this.loadImage((catheterImage as any), this.config.catheterImage as any);
      this.staticLayer.add(this.catheter[2]);
    }

    // 烫过的叶子
    async initScaldedBlades() {
      this.scaldedBlades[0] = await this.loadImage((scaldedBladesImage as any), this.config.scaldedBladesImage as any);
      this.staticLayer.add(this.scaldedBlades[0]);

      this.scaldedBlades[1] = await this.loadImage((scaldedBladesImage as any), this.config.scaldedBladesImage as any);
      this.staticLayer.add(this.scaldedBlades[1]);

      this.scaldedBlades[2] = await this.loadImage((scaldedBladesImage as any), this.config.scaldedBladesImage as any);
      this.staticLayer.add(this.scaldedBlades[2]);
    }

    // 挤压瓶
    async initSqueezeBottle() {
      this.squeezeBottle[0] = await this.loadImage((squeezeBottleImage as any), this.config.squeezeBottleImage as any);
      this.staticLayer.add(this.squeezeBottle[0]);

      this.squeezeBottle[1] = await this.loadImage((squeezeBottleImage as any), this.config.squeezeBottleImage as any);
      this.staticLayer.add(this.squeezeBottle[1]);

      this.squeezeBottle[2] = await this.loadImage((squeezeBottleImage as any), this.config.squeezeBottleImage as any);
      this.staticLayer.add(this.squeezeBottle[2]);
    }

    // 新鲜的叶子
    async initFreshBlades() {
      this.freshBlades[0] = await this.loadImage((freshBladesImage as any), this.config.freshBladesImage as any);
      this.staticLayer.add(this.freshBlades[0]);

      this.freshBlades[1] = await this.loadImage((freshBladesImage as any), this.config.freshBladesImage as any);
      this.staticLayer.add(this.freshBlades[1]);

      this.freshBlades[2] = await this.loadImage((freshBladesImage as any), this.config.freshBladesImage as any);
      this.staticLayer.add(this.freshBlades[2]);
    }

    // 澄清石灰水
    async initLimeWater() {
      this.limeWater[0] = await this.loadImage((limeWaterImage as any), this.config.limeWaterImage as any);
      // this.limeWater[0].visible(false);
      this.staticLayer.add(this.limeWater[0]);

      this.limeWater[1] = await this.loadImage((limeWaterImage as any), this.config.limeWaterImage as any);
      // this.limeWater[1].visible(false);
      this.staticLayer.add(this.limeWater[1]);

      this.limeWater[2] = await this.loadImage((limeWaterImage as any), this.config.limeWaterImage as any);
      this.staticLayer.add(this.limeWater[2]);
    }

    // 清水
    async initCleanWater() {
      this.cleanWater[0] = await this.loadImage((cleanWaterImage as any), this.config.cleanWaterImage as any);
      this.staticLayer.add(this.cleanWater[0]);

      this.cleanWater[1] = await this.loadImage((cleanWaterImage as any), this.config.cleanWaterImage as any);
      this.staticLayer.add(this.cleanWater[1]);

      this.cleanWater[2] = await this.loadImage((cleanWaterImage as any), this.config.cleanWaterImage as any);
      this.staticLayer.add(this.cleanWater[2]);
    }

    // 初始化事件
    initEvent() {
      this.draggableEvent(this.sun[0], this.config.sunImage2, this.config.sunImage, true, this.sun, this.smallSun);
      this.draggableEvent(this.sun[1], this.config.sunImage2, this.config.sunImage, true, this.sun, this.smallSun);
      this.draggableEvent(this.sun[2], this.config.sunImage2, this.config.sunImage, true, this.sun, this.smallSun);

      this.draggableEvent(this.catheter[0], this.config.catheterImage2, this.config.catheterImage, true, this.catheter, this.smallCatheter);
      this.draggableEvent(this.catheter[1], this.config.catheterImage2, this.config.catheterImage, true, this.catheter, this.smallCatheter);
      this.draggableEvent(this.catheter[2], this.config.catheterImage2, this.config.catheterImage, true, this.catheter, this.smallCatheter);

      this.draggableEvent(this.scaldedBlades[0], this.config.scaldedBladesImage2, this.config.scaldedBladesImage, false, this.scaldedBlades,
        this.smallScaldedBlades);
      this.draggableEvent(this.scaldedBlades[1], this.config.scaldedBladesImage2, this.config.scaldedBladesImage, false, this.scaldedBlades,
        this.smallScaldedBlades);
      this.draggableEvent(this.scaldedBlades[2], this.config.scaldedBladesImage2, this.config.scaldedBladesImage, false, this.scaldedBlades,
        this.smallScaldedBlades);

      this.draggableEvent(this.squeezeBottle[0], this.config.squeezeBottleImage2, this.config.squeezeBottleImage, false, this.squeezeBottle,
        this.smallSqueezeBottle);
      this.draggableEvent(this.squeezeBottle[1], this.config.squeezeBottleImage2, this.config.squeezeBottleImage, false, this.squeezeBottle,
        this.smallSqueezeBottle);
      this.draggableEvent(this.squeezeBottle[2], this.config.squeezeBottleImage2, this.config.squeezeBottleImage, false, this.squeezeBottle,
        this.smallSqueezeBottle);

      this.draggableEvent(this.freshBlades[0], this.config.freshBladesImage2, this.config.freshBladesImage, false, this.freshBlades,
        this.smallFreshBlades);
      this.draggableEvent(this.freshBlades[1], this.config.freshBladesImage2, this.config.freshBladesImage, false, this.freshBlades,
        this.smallFreshBlades);
      this.draggableEvent(this.freshBlades[2], this.config.freshBladesImage2, this.config.freshBladesImage, false, this.freshBlades,
        this.smallFreshBlades);

      this.draggableEvent(this.limeWater[0], this.config.limeWaterImage2, this.config.limeWaterImage, true, this.limeWater,
        this.smallLimeWater);
      this.draggableEvent(this.limeWater[1], this.config.limeWaterImage2, this.config.limeWaterImage, true, this.limeWater,
        this.smallLimeWater);
      this.draggableEvent(this.limeWater[2], this.config.limeWaterImage2, this.config.limeWaterImage, true, this.limeWater,
        this.smallLimeWater);

      this.draggableEvent(this.cleanWater[0], this.config.cleanWaterImage2, this.config.cleanWaterImage, true, this.cleanWater,
        this.smallCleanWater);
      this.draggableEvent(this.cleanWater[1], this.config.cleanWaterImage2, this.config.cleanWaterImage, true, this.cleanWater,
        this.smallCleanWater);
      this.draggableEvent(this.cleanWater[2], this.config.cleanWaterImage2, this.config.cleanWaterImage, true, this.cleanWater,
        this.smallCleanWater);
    }

    // 拖动事件
    draggableEvent(image: Konva.Image, config: any, config2: any, moveBoolean?: boolean,
                   imageArray?: Array<Konva.Image>, image2?: Konva.Image) {
      /*
        image: 图片对象
        config: 真实图片大小配置文件
        config2：图片初始位置大小
        moveBoolean： 是否允许拖动时移动到中心
        imageArray： 图片对象所在数组
        image2： 图片对应的图标
       */


      // 是否移动初始位置
      let dragBoolean = false;

      let startDrag = false;

      moveBoolean = !moveBoolean ?  false : moveBoolean;
      // 鼠标按下 判断图片是否可以移动到中心 只有第一次会移动到中心
      image.on('mousedown touchstart', (e: any) => {
        startDrag = true;

        if (image.x() >= config2.x && moveBoolean) {
          // 图片位置=config位置且允许移动初始位置
          dragBoolean = true;
        }

        this.staticLayer.draw();
      });

      // 拖动图片中
      image.on('dragmove touchmove', (e: any) => {
        if (!startDrag) {
          return;
        }

        // 改变宽高为大宽高
        image.width(config.width);
        image.height(config.height);

        if (dragBoolean) {
          // 移动位置
          image.x(image.x() - config.width * 0.45);
          image.y(image.y() - config.height / 2);
        }

        // 设置图标的透明度用于示意是否可拖动
        if (imageArray[0].opacity() > 0 && imageArray[1].opacity() > 0 && imageArray[2].opacity() > 0) {
          if (!!image2) {
            image2.opacity(0.5);
          }
        } else {
          image2.opacity(1);
        }
        this.staticLayer.draw();

        // 改变透明度
        image.opacity(0.5);

        e.cancelBubble = true;
      });

      // 结束拖动
      image.on('mouseup touchend', (e: any) => {
        startDrag = false;

        if (image.x() >= config2.x) {
          return;
        }
        if (image.x() < config2.x) {
          // 停止拖动图片透明度变为1
          image.opacity(1);
        }
        dragBoolean = false;

        // 回收图片
        if ((image.x() + image.width()) >  this.rect.x()) {
          this.resetImage2(image, config2);
          image2.opacity(1);
        }

        this.staticLayer.draw();
      });

      // 改变鼠标样式
      image.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      image.on('mouseout', () => {
        document.body.style.cursor = 'default';
      });

      // 用于防止被遮挡后无法触发事件
      document.addEventListener('mouseup', () => {
        this.dragEnd(image, config2, dragBoolean, image2);
      });

      document.addEventListener('touchend', () => {
        this.dragEnd(image, config2, dragBoolean, image2);
      });
    }

    // 拖动结束执行
    dragEnd(image: Konva.Image, config2: any, dragBoolean: boolean, image2: Konva.Image) {
      if (image.x() < config2.x) {
        // 停止拖动图片透明度变为1
        image.opacity(1);
      }
      dragBoolean = false;

      // 回收图片
      if ((image.x() + image.width()) >  this.rect.x()) {
        this.resetImage2(image, config2);
        image2.opacity(1);
      }

      this.staticLayer.draw();
    }

    // 重置
    reset() {
      this.resetImage(this.sun, this.config.sunImage);
      this.resetImage(this.catheter, this.config.catheterImage);
      this.resetImage(this.scaldedBlades, this.config.scaldedBladesImage);
      this.resetImage(this.squeezeBottle, this.config.squeezeBottleImage);
      this.resetImage(this.freshBlades, this.config.freshBladesImage);
      this.resetImage(this.limeWater, this.config.limeWaterImage);
      this.resetImage(this.cleanWater, this.config.cleanWaterImage);

      this.smallSun.opacity(1);
      this.smallCatheter.opacity(1);
      this.smallScaldedBlades.opacity(1);
      this.smallSqueezeBottle.opacity(1);
      this.smallFreshBlades.opacity(1);
      this.smallLimeWater.opacity(1);
      this.smallCleanWater.opacity(1);

      this.staticLayer.draw();
    }

    // 重置图片的位置
    resetImage(image: Array<Konva.Image>, config: any) {
      for (let i = 0; i < image.length; i++) {
        image[i].x(config.x);
        image[i].y(config.y);
        image[i].width(config.width);
        image[i].height(config.height);
        image[i].opacity(config.opacity);
      }
    }

    // 重置单个图片位置
    resetImage2(image: Konva.Image, config: any) {
      image.x(config.x);
      image.y(config.y);
      image.width(config.width);
      image.height(config.height);
      image.opacity(config.opacity);
    }
}

