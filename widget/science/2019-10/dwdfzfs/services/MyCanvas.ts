import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
import image7 from '../sub_static/img/image7.png';
import image8 from '../sub_static/img/image8.png';
import mesaImage from '../sub_static/img/mesa.png';

import { Linear, TweenMax } from 'gsap';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;
    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    rect: fabric.Rect;

    // 两个蓝底框
    blueRect1: fabric.Rect;
    blueRect2: fabric.Rect;

    // 卵生动物
    ovipara: Array<fabric.Image>;

    // 胎生动物
    vivipara: Array<fabric.Image>;

    // 两组虚线框
    oviparaDashFrame: Array<fabric.Rect>;
    viviparaDashFrame: Array<fabric.Rect>;

    oviparaFrameGroup: Array<fabric.Rect>;
    viviparaFrameGroup: Array<fabric.Rect>;

    // 虚线框是否填充
    oviparaDashFrameDrop: Array<boolean>;
    viviparaFrameGroupDrop: Array<boolean>;

    // 获取是否填充到正确位置信息
    drapFrame1: any = [];
    drapFrame2: any = [];

    // 变色框
    leftDiscolorationFrame: Array<fabric.Rect>;
    rightDiscolorationFrame: Array<fabric.Rect>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addRect();
      await this.addDashFrame();
      await this.addOvipara();
      await this.addVivipara();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = 946;
      (document.getElementById('cardImageCanvas1') as any).height = 600;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '#ADEBD9',
      });

      this.myCanvas.selection = false;
    }

    async addRect() {
      this.rect = await new fabric.Rect(this.config.rect);
      this.myCanvas.add(this.rect);

      this.blueRect1 = await new fabric.Rect(this.config.blueRect1);
      this.myCanvas.add(this.blueRect1);

      this.blueRect2 = await new fabric.Rect(this.config.blueRect2);
      this.myCanvas.add(this.blueRect2);

      const mesa = await FabricUtil.loadImage(mesaImage, this.config.mesa);
      this.myCanvas.add(mesa);
    }

    // 添加虚线框和提示框
    addDashFrame() {
      this.oviparaDashFrame = [];
      this.viviparaDashFrame = [];

      this.oviparaFrameGroup = [];
      this.viviparaFrameGroup = [];

      this.oviparaDashFrameDrop = [];
      this.viviparaFrameGroupDrop = [];

      this.leftDiscolorationFrame = [];
      this.rightDiscolorationFrame = [];

      for (let i = 0; i < this.config.oviparaDashFrame.length; i ++) {
        this.oviparaDashFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.oviparaDashFrame[i].left + 111 * 0.5,
          top: this.config.oviparaDashFrame[i].top + 111 * 0.5,
        }, this.config.dashFrame));

        this.rightDiscolorationFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.oviparaDashFrame[i].left + 111 * 0.5 + 1,
          top: this.config.oviparaDashFrame[i].top + 111 * 0.5 + 1,
        }, this.config.discolorationFrame));

        this.viviparaDashFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.viviparaDashFrame[i].left + 111 * 0.5,
          top: this.config.viviparaDashFrame[i].top + 111 * 0.5,
        }, this.config.dashFrame));

        this.leftDiscolorationFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.viviparaDashFrame[i].left + 111 * 0.5 + 1,
          top: this.config.viviparaDashFrame[i].top + 111 * 0.5 + 1,
        }, this.config.discolorationFrame));

        this.oviparaFrameGroup.push(this.oviparaDashFrame[i]);
        this.viviparaFrameGroup.push(this.viviparaDashFrame[i]);

        this.myCanvas.add(this.oviparaDashFrame[i]);
        this.myCanvas.add(this.rightDiscolorationFrame[i]);

        this.myCanvas.add(this.viviparaDashFrame[i]);
        this.myCanvas.add(this.leftDiscolorationFrame[i]);

        this.oviparaDashFrameDrop[i] = false;
        this.viviparaFrameGroupDrop[i] = false;
      }

      const tipText1 = new fabric.Text(window.env.browserInfo.lang.tipText[0], this.config.tipText1 as any);
      this.myCanvas.add(tipText1);

      const tipText2 = new fabric.Text(window.env.browserInfo.lang.tipText[1], this.config.tipText2 as any);
      this.myCanvas.add(tipText2);
    }

    // 显示隐藏虚线框
    showDashFrame(isShow: boolean) {
      for (let i = 0; i < this.config.oviparaDashFrame.length; i ++) {

        if (!this.oviparaDashFrameDrop[i]) {
          this.oviparaFrameGroup[i].set('visible', isShow);
        } else {
          this.oviparaFrameGroup[i].set('visible', false);
        }

        if (!this.viviparaFrameGroupDrop[i]) {
          this.viviparaFrameGroup[i].set('visible', isShow);
        } else {
          this.viviparaFrameGroup[i].set('visible', false);
        }


      }
    }

    // 添加卵生动物图片
    async addOvipara() {
      this.ovipara = [];

      this.ovipara[0] = await FabricUtil.loadImage(image1, this.config.ovipara[0]);
      this.myCanvas.add(this.ovipara[0]);

      this.ovipara[1] = await FabricUtil.loadImage(image3, this.config.ovipara[1]);
      this.myCanvas.add(this.ovipara[1]);

      this.ovipara[2] = await FabricUtil.loadImage(image5, this.config.ovipara[2]);
      this.myCanvas.add(this.ovipara[2]);

      this.ovipara[3] = await FabricUtil.loadImage(image7, this.config.ovipara[3]);
      this.myCanvas.add(this.ovipara[3]);

      this.ovipara[4] = await FabricUtil.loadImage(image8, this.config.ovipara[4]);
      this.myCanvas.add(this.ovipara[4]);

      await this.imageDragEvent(this.ovipara[0], this.config.ovipara[0], this.oviparaDashFrame,
        this.viviparaDashFrame, this.oviparaDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.viviparaFrameGroupDrop);

      await this.imageDragEvent(this.ovipara[1], this.config.ovipara[1], this.oviparaDashFrame,
        this.viviparaDashFrame, this.oviparaDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.viviparaFrameGroupDrop);

      await this.imageDragEvent(this.ovipara[2], this.config.ovipara[2], this.oviparaDashFrame,
        this.viviparaDashFrame, this.oviparaDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.viviparaFrameGroupDrop);

      await this.imageDragEvent(this.ovipara[3], this.config.ovipara[3], this.oviparaDashFrame,
        this.viviparaDashFrame, this.oviparaDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.viviparaFrameGroupDrop);

      await this.imageDragEvent(this.ovipara[4], this.config.ovipara[4], this.oviparaDashFrame,
        this.viviparaDashFrame, this.oviparaDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.viviparaFrameGroupDrop);
    }

    // 添加胎生动物图片
    async addVivipara() {
      this.vivipara = [];

      this.vivipara[0] = await FabricUtil.loadImage(image2, this.config.vivipara[0]);
      this.myCanvas.add(this.vivipara[0]);

      this.vivipara[1] = await FabricUtil.loadImage(image4, this.config.vivipara[1]);
      this.myCanvas.add(this.vivipara[1]);

      this.vivipara[2] = await FabricUtil.loadImage(image6, this.config.vivipara[2]);
      this.myCanvas.add(this.vivipara[2]);



      await this.imageDragEvent(this.vivipara[0], this.config.vivipara[0], this.viviparaDashFrame,
        this.oviparaDashFrame, this.viviparaFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.oviparaDashFrameDrop);

      await this.imageDragEvent(this.vivipara[1], this.config.vivipara[1], this.viviparaDashFrame,
        this.oviparaDashFrame, this.viviparaFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.oviparaDashFrameDrop);

      await this.imageDragEvent(this.vivipara[2], this.config.vivipara[2], this.viviparaDashFrame,
        this.oviparaDashFrame, this.viviparaFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.oviparaDashFrameDrop);

    }

    // 绑定drag事件
    /**
     *
     * @param {Image} element 拖动对象
     * @param config  对象的配置文件
     * @param {Array<Rect>} dashFrameTrue 正确的框
     * @param {Array<Rect>} dashFrameFalse  错误的框
     * @param {Array<boolean>} dashFrameDrop  正确框的填充判断
     * @param {Array<boolean>} discolorationFrameTrue  正确框提示
     * @param {Array<boolean>} discolorationFrameFalse  错误框的提示
     */
    imageDragEvent(
      element: fabric.Image, config: any, dashFrameTrue: Array<fabric.Rect>,
      dashFrameFalse: Array<fabric.Rect>, dashFrameDrop: Array<boolean>,
      discolorationFrameTrue: Array<fabric.Rect>, discolorationFrameFalse: Array<fabric.Rect>,
      dashFrameDropFalse: Array<boolean>
    ) {
      element.on('mousedown', (e: any) => {
        if (!element.get('selectable')) {
          return;
        }
        this.showDashFrame(true);
      });

      element.on('moving', (e: any) => {
        this.limitElement(element);

      });

      element.on({'modified': (e: any) => {
        for (let i = 0; i < dashFrameTrue.length; i++) {
          this.drapFrame1[i] = e.target.intersectsWithObject(dashFrameTrue[i]) && !dashFrameDrop[i];
          if (this.drapFrame1[i]) {
            element.set('selectable', false);
            this.collisionEvent(element, dashFrameTrue[i]);
            dashFrameDrop[i] = true;

            // 显示正确的提示
            discolorationFrameTrue[i].set('visible', true);
            discolorationFrameTrue[i].set('stroke', '#bcf17c');

            // 500毫秒后关闭提示
            setTimeout(() => {
              discolorationFrameTrue[i].set('visible', false);
              this.myCanvas.renderAll();
            }, 500);

          }
        }

        for (let i = 0; i < dashFrameFalse.length; i++) {
          this.drapFrame2[i] = e.target.intersectsWithObject(dashFrameFalse[i]) && !dashFrameDropFalse[i];
          if (this.drapFrame2[i]) {
            element.set('selectable', false);
            this.collisionEvent(element, dashFrameFalse[i]);

            // 显示错误的提示
            discolorationFrameFalse[i].set('visible', true);
            discolorationFrameFalse[i].set('stroke', '#ffa0ac');

            // 500毫秒后关闭提示返回原位
            setTimeout(() => {
              this.collisionFalseEvent(element, config);

              discolorationFrameFalse[i].set('visible', false);
              this.myCanvas.renderAll();
            }, 500);
          }
        }

        if (
          !this.drapFrame1[0] && !this.drapFrame1[1] && !this.drapFrame1[2] && !this.drapFrame1[3] &&
          !this.drapFrame1[4] && !this.drapFrame1[5] && !this.drapFrame1[6] && !this.drapFrame1[7] &&
          !this.drapFrame2[0] && !this.drapFrame2[1] && !this.drapFrame2[2] && !this.drapFrame2[3] &&
          !this.drapFrame2[4] && !this.drapFrame2[5] && !this.drapFrame2[6] && !this.drapFrame2[7]
        ) {
          this.collisionFalseEvent(element, config);
        }

        this.myCanvas.discardActiveObject();
          this.showDashFrame(false);
      }});
    }

    // 碰撞之后的反应
    collisionEvent(element: fabric.Image, rect: fabric.Rect) {
      element.set('left', rect.left + rect.get('strokeWidth') * 0.5).setCoords();
      element.set('top', rect.top + rect.get('strokeWidth') * 0.5).setCoords();
      const tween = {
        scale: this.config.imgScale * 0.5
      };
      TweenMax.to(tween, 0.2, {
        scale: 0.5,
        onStart: () => {
          console.log('开始动画');
        },
        onUpdate: () => {
          element.set('scaleX', tween.scale).setCoords();
          element.set('scaleY', tween.scale).setCoords();
          this.myCanvas.renderAll();
        },

        onComplete: () => {
        },
        // paused: true,
        ease: Linear.easeNone
      });
    }

    // 碰撞错误的反应
    collisionFalseEvent(element: fabric.Image, config: any) {
      const tween = {
        left: element.get('left'),
        top: element.get('top'),
        scale: element.get('scaleX')
      };
      TweenMax.to(tween, 0.3, {
        left: config.left,
        top: config.top,
        scale: this.config.imgScale * 0.5,
        onStart: () => {
          console.log('开始动画');
        },
        onUpdate: () => {
          element.set('left', tween.left).setCoords();
          element.set('top', tween.top).setCoords();

          element.set('scaleX', tween.scale).setCoords();
          element.set('scaleY', tween.scale).setCoords();
          this.myCanvas.renderAll();
        },

        onComplete: () => {
          element.set('selectable', true).setCoords();
        },
        // paused: true,
        ease: Linear.easeNone
      });
    }

    limitElement(element: fabric.Image) {
      if (element.top < 0) {
        element.set('top', 0).setCoords();
      }

      if (element.left < 111 * 0.5 * this.config.imgScale) {
        element.set('left', 111 * 0.5 * this.config.imgScale).setCoords();
      }

      const left = this.rect.width - element.width * element.scaleX + 111 * 0.5 * this.config.imgScale;
      if (element.left > left) {
        element.set('left', left).setCoords();
      }

      const top = this.rect.height - element.height * element.scaleY + 111 * 0.5 * this.config.imgScale;
      if (element.top > top) {
        element.set('top', top).setCoords();
      }
    }

    // 重置
    reset() {
      for (let i = 0; i < this.ovipara.length; i++) {
        this.resetImage(this.ovipara[i], this.config.ovipara[i]);

      }

      for (let i = 0; i < this.vivipara.length; i++) {
        this.resetImage(this.vivipara[i], this.config.vivipara[i]);
      }


      for (let i = 0; i < 8; i++) {
        this.oviparaDashFrameDrop[i] = false;
        this.viviparaFrameGroupDrop[i] = false;
      }

      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();

      element.set('selectable', true);

      element.set('scaleX', config.scaleX).setCoords();
      element.set('scaleY', config.scaleY).setCoords();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

      this.myCanvas.setWidth(946 * this.scale);
      this.myCanvas.setHeight(560 * this.scale);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      this.myCanvas.setZoom(this.scale);

      this.myCanvas.renderAll();
    }
}

