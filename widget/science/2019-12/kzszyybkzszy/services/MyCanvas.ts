import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
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
    attractive: Array<fabric.Image>;

    // 胎生动物
    unattractive: Array<fabric.Image>;

    // 两组虚线框
    attractiveDashFrame: Array<fabric.Rect>;
    unattractiveDashFrame: Array<fabric.Rect>;

    attractiveFrameGroup: Array<fabric.Rect>;
    unattractiveFrameGroup: Array<fabric.Rect>;

    // 虚线框是否填充
    attractiveDashFrameDrop: Array<boolean>;
    unattractiveFrameGroupDrop: Array<boolean>;

    // 获取是否填充到正确位置信息
    drapFrame1: Array<boolean>;
    drapFrame2: Array<boolean>;

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
      await this.addattractive();
      await this.addunattractive();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = 880;
      (document.getElementById('cardImageCanvas1') as any).height = 600;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '',
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
      this.attractiveDashFrame = [];
      this.unattractiveDashFrame = [];

      this.attractiveFrameGroup = [];
      this.unattractiveFrameGroup = [];

      this.attractiveDashFrameDrop = [];
      this.unattractiveFrameGroupDrop = [];

      this.leftDiscolorationFrame = [];
      this.rightDiscolorationFrame = [];

      for (let i = 0; i < this.config.attractiveDashFrame.length; i ++) {
        this.attractiveDashFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.attractiveDashFrame[i].left + 174 * 0.5,
          top: this.config.attractiveDashFrame[i].top + 174 * 0.5,
          hoverCursor: 'default',
        }, this.config.dashFrame));

        this.rightDiscolorationFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.attractiveDashFrame[i].left + 174 * 0.5 + 1,
          top: this.config.attractiveDashFrame[i].top + 174 * 0.5 + 1,
          hoverCursor: 'default',
        }, this.config.discolorationFrame));

        this.unattractiveDashFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.unattractiveDashFrame[i].left + 174 * 0.5,
          top: this.config.unattractiveDashFrame[i].top + 174 * 0.5,
          hoverCursor: 'default',
        }, this.config.dashFrame));

        this.leftDiscolorationFrame[i] = new fabric.Rect(
          Object.assign({
          left: this.config.unattractiveDashFrame[i].left + 174 * 0.5 + 1,
          top: this.config.unattractiveDashFrame[i].top + 174 * 0.5 + 1,
          hoverCursor: 'default',
        }, this.config.discolorationFrame));

        this.attractiveFrameGroup.push(this.attractiveDashFrame[i]);
        this.unattractiveFrameGroup.push(this.unattractiveDashFrame[i]);

        this.myCanvas.add(this.attractiveDashFrame[i]);
        this.myCanvas.add(this.rightDiscolorationFrame[i]);

        this.myCanvas.add(this.unattractiveDashFrame[i]);
        this.myCanvas.add(this.leftDiscolorationFrame[i]);

        this.attractiveDashFrameDrop[i] = false;
        this.unattractiveFrameGroupDrop[i] = false;
      }

      const tipText1 = new fabric.Text(window.env.browserInfo.lang.tipText[0], this.config.tipText1 as any);
      this.myCanvas.add(tipText1);

      const tipText2 = new fabric.Text(window.env.browserInfo.lang.tipText[1], this.config.tipText2 as any);
      this.myCanvas.add(tipText2);
    }

    // 显示隐藏虚线框
    showDashFrame(isShow: boolean) {
      for (let i = 0; i < this.config.attractiveDashFrame.length; i ++) {

        if (!this.attractiveDashFrameDrop[i]) {
          this.attractiveFrameGroup[i].set('visible', isShow);
        } else {
          this.attractiveFrameGroup[i].set('visible', false);
        }

        if (!this.unattractiveFrameGroupDrop[i]) {
          this.unattractiveFrameGroup[i].set('visible', isShow);
        } else {
          this.unattractiveFrameGroup[i].set('visible', false);
        }


      }
    }

    // 添加可再生图片
    async addattractive() {
      this.attractive = [];
      this.drapFrame1 = [];
      this.drapFrame2 = [];

      this.attractive[0] = await FabricUtil.loadImage(image1, this.config.attractive[0]);
      this.myCanvas.add(this.attractive[0]);

      this.attractive[1] = await FabricUtil.loadImage(image2, this.config.attractive[1]);
      this.myCanvas.add(this.attractive[1]);

      this.attractive[2] = await FabricUtil.loadImage(image3, this.config.attractive[2]);
      this.myCanvas.add(this.attractive[2]);

      await this.imageDragEvent(this.attractive[0], this.config.attractive[0], this.unattractiveDashFrame,
        this.attractiveDashFrame, this.unattractiveFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.attractiveDashFrameDrop);

      await this.imageDragEvent(this.attractive[1], this.config.attractive[1], this.unattractiveDashFrame,
        this.attractiveDashFrame, this.unattractiveFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.attractiveDashFrameDrop);

      await this.imageDragEvent(this.attractive[2], this.config.attractive[2], this.unattractiveDashFrame,
        this.attractiveDashFrame, this.unattractiveFrameGroupDrop, this.leftDiscolorationFrame, this.rightDiscolorationFrame,
        this.attractiveDashFrameDrop);
    }

    // 添加不可再生图片
    async addunattractive() {
      this.unattractive = [];

      this.unattractive[0] = await FabricUtil.loadImage(image4, this.config.unattractive[0]);
      this.myCanvas.add(this.unattractive[0]);

      this.unattractive[1] = await FabricUtil.loadImage(image5, this.config.unattractive[1]);
      this.myCanvas.add(this.unattractive[1]);

      this.unattractive[2] = await FabricUtil.loadImage(image6, this.config.unattractive[2]);
      this.myCanvas.add(this.unattractive[2]);

      await this.imageDragEvent(this.unattractive[0], this.config.unattractive[0], this.attractiveDashFrame,
        this.unattractiveDashFrame, this.attractiveDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.unattractiveFrameGroupDrop);

      await this.imageDragEvent(this.unattractive[1], this.config.unattractive[1], this.attractiveDashFrame,
        this.unattractiveDashFrame, this.attractiveDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.unattractiveFrameGroupDrop);

      await this.imageDragEvent(this.unattractive[2], this.config.unattractive[2], this.attractiveDashFrame,
        this.unattractiveDashFrame, this.attractiveDashFrameDrop, this.rightDiscolorationFrame, this.leftDiscolorationFrame,
        this.unattractiveFrameGroupDrop);
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

      });

      element.on('moving', (e: any) => {
        this.limitElement(element);
        this.showDashFrame(true);
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

        },
        onUpdate: () => {
          element.set('scaleX', tween.scale).setCoords();
          element.set('scaleY', tween.scale).setCoords();
          this.myCanvas.renderAll();
        },

        onComplete: () => {
        },
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
        ease: Linear.easeNone
      });
    }

    limitElement(element: fabric.Image) {
      if (element.top < 174 * 0.5 * this.config.imgScale) {
        element.set('top', 174 * 0.5 * this.config.imgScale).setCoords();
      }

      if (element.left < 174 * 0.5 * this.config.imgScale) {
        element.set('left', 174 * 0.5 * this.config.imgScale).setCoords();
      }

      const left = this.rect.width - element.width * element.scaleX + 174 * 0.5 * this.config.imgScale;
      if (element.left > left) {
        element.set('left', left).setCoords();
      }

      const top = this.rect.height - element.height * element.scaleY + 174 * 0.5 * this.config.imgScale;
      if (element.top > top) {
        element.set('top', top).setCoords();
      }
    }

    // 重置
    reset() {
      for (let i = 0; i < this.attractive.length; i++) {
        this.resetImage(this.attractive[i], this.config.attractive[i]);

      }

      for (let i = 0; i < this.unattractive.length; i++) {
        this.resetImage(this.unattractive[i], this.config.unattractive[i]);
      }


      for (let i = 0; i < 8; i++) {
        this.attractiveDashFrameDrop[i] = false;
        this.unattractiveFrameGroupDrop[i] = false;
      }

      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: fabric.Image, config: any) {
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

      this.myCanvas.setWidth(880 * this.scale);
      this.myCanvas.setHeight(560 * this.scale);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -45%)';

      this.myCanvas.setZoom(this.scale);

      this.myCanvas.renderAll();
    }
}

