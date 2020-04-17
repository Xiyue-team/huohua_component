import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';

import earImage from '../sub_static/img/earImage.png';

import { FabricUtil } from './Util';
import { TweenMax } from 'gsap';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;

    // 缩放系数
    scale = 1;

    // 两个蒙板
    // 用于遮住外耳
    mask1: fabric.Rect;
    // 用于遮住内耳
    mask2: fabric.Rect;

    maskAnimation: any;

    tipsText: Array<fabric.Text>;
    tipsLine: Array<fabric.Rect>;
    tipsPoint: Array<fabric.Circle>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addImage();
      await this.addMask();
      await this.addText();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas') as any).width = 1200;
      (document.getElementById('cardImageCanvas') as any).height = 675;
      this.myCanvas = new fabric.Canvas('cardImageCanvas', {
        backgroundColor: '#ffffff',
      });

      this.myCanvas.selection = false;
    }

    // 添加底图
    async addImage() {
      const ear = await FabricUtil.loadImage(earImage, {
        width: 1186,
        height: 878,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 265,
        top:  119,
        selectable: false,
      });
      this.myCanvas.add(ear);
    }

    // 添加蒙板
    addMask() {
      this.mask1 = new fabric.Rect(this.config.mask1);
      this.myCanvas.add(this.mask1 );

      this.mask2 = new fabric.Rect(this.config.mask2);
      this.myCanvas.add(this.mask2 );
    }

    // 添加提示文字以及指向线
    addText() {
      this.tipsText = [];
      this.tipsLine = [];
      this.tipsPoint = [];
      const lang = window.env.browserInfo.lang;
      for (let i = 0; i < lang.tipText.length; i++) {
        this.tipsText[i] = new fabric.Text(lang.tipText[i], this.config.tipsText[i]);
        this.tipsLine[i] = new fabric.Rect(this.config.tipsLine[i]);
        this.tipsPoint[i] = new fabric.Circle(this.config.tipsPoint[i]);

        this.tipsText[i].set('visible', false);
        this.tipsLine[i].set('visible', false);
        this.tipsPoint[i].set('visible', false);

        this.myCanvas.add(this.tipsText[i]);
        this.myCanvas.add(this.tipsLine[i]);
        this.myCanvas.add(this.tipsPoint[i]);
      }
    }

    // 隐藏提示文字
    hideTipsText() {
      for (let i = 0; i < this.tipsText.length; i++) {
        this.tipsText[i].set('visible', false);
        this.tipsLine[i].set('visible', false);
        this.tipsPoint[i].set('visible', false);
      }
    }

    // 显示提示文字
    showTipsText(ear: number) {
      this.hideTipsText();

      if (ear === 1) {
        for (let i = 0; i < 2; i++) {
          this.tipsText[i].set('visible', true);
          this.tipsLine[i].set('visible', true);
          this.tipsPoint[i].set('visible', true);
        }
      }

      if (ear === 2) {
        for (let i = 2; i < 4; i++) {
          this.tipsText[i].set('visible', true);
          this.tipsLine[i].set('visible', true);
          this.tipsPoint[i].set('visible', true);
        }
      }

      if (ear === 3) {
        for (let i = 4; i < 5; i++) {
          this.tipsText[i].set('visible', true);
          this.tipsLine[i].set('visible', true);
          this.tipsPoint[i].set('visible', true);
        }
      }
    }


    // 点击外耳
    clickExternalEar() {
      this.hideTipsText();
      this.maskMoveAnimation(265 + 246, 265 + 399 + 92.5, 1);
    }

    // 点击中耳
    clickMiddleEar() {
      this.hideTipsText();
      this.maskMoveAnimation(260, 265 + 399, 2);
    }

    // 点击内耳
    clickInnerEar() {
      this.hideTipsText();
      this.maskMoveAnimation(260, 265 + 399 - 203 + 44.5, 3);
    }

    maskMoveAnimation (mask1Target: number, mask2Target: number, ear: number) {
      if (this.maskAnimation) {
        this.maskAnimation.pause();
      }

      const tween = {
        mask1Left: this.mask1.get('left'),
        mask2Left: this.mask2.get('left'),
      };

      this.maskAnimation = TweenMax.to(tween, 1, {
        mask1Left: mask1Target,
        mask2Left: mask2Target,
        onUpdate: () => {
          this.mask1.set('left', tween.mask1Left).setCoords(),
          this.mask2.set('left', tween.mask2Left).setCoords(),
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          this.showTipsText(ear);
          this.myCanvas.renderAll();
        }
      });
    }

    // 重置
    reset() {
      if (this.maskAnimation) {
        this.maskAnimation.pause();
      }

      for (let i = 0; i < this.tipsText.length; i++) {
        this.tipsText[i].set('visible', false);
        this.tipsLine[i].set('visible', false);
        this.tipsPoint[i].set('visible', false);
      }

      this.resetImage(this.mask1, this.config.mask1);
      this.resetImage(this.mask2, this.config.mask2);

      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

      this.myCanvas.setWidth(1200 * this.scale);
      this.myCanvas.setHeight(675 * this.scale);
      
      const container = document.getElementById('box').children[0];
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';
      
      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }
}

