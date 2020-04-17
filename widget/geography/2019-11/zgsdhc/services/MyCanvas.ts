import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import cardImage1 from '../sub_static/img/cardImage1.png';
import cardImage2 from '../sub_static/img/cardImage2.png';
import cardImage3 from '../sub_static/img/cardImage3.png';
import cardImage4 from '../sub_static/img/cardImage4.png';

import crossImage from '../sub_static/img/crossImage.png';

import { Linear, TweenMax } from 'gsap';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;
    myCanvas2: fabric.Canvas;
    lang = window.env.browserInfo.lang;
    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    button: any = [];
    clickEnd: any = [];

    cardImageSrc: any = [];

    card: any = [];

    mask: fabric.Rect;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      this.addImageSrc();
      await this.initCanvas();
      await this.addFishImage();
      await this.addButton();
      await this.addMask();
      await this.addCard();
      await this.clickEvent();
      this.resize();
    }

    addImageSrc() {
      this.cardImageSrc = [ cardImage1, cardImage2, cardImage3, cardImage4];
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = 1024;
      (document.getElementById('cardImageCanvas1') as any).height = 576;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '',
      });

      this.myCanvas.selection = false;

      (document.getElementById('cardImageCanvas2') as any).width = window.innerWidth;
      (document.getElementById('cardImageCanvas2') as any).height = window.innerHeight;
      this.myCanvas2 = new fabric.Canvas('cardImageCanvas2', {
        backgroundColor: '',
      });
      this.myCanvas2.selection = false;
    }

    // 添加底图上的鱼
    async addFishImage() {
      const fish1 = await FabricUtil.loadImage(image1, this.config.fishImage[0]);
      this.myCanvas.add(fish1);

      const fish2 = await FabricUtil.loadImage(image2, this.config.fishImage[1]);
      this.myCanvas.add(fish2);

      const fish3 = await FabricUtil.loadImage(image3, this.config.fishImage[2]);
      this.myCanvas.add(fish3);

      const fish4 = await FabricUtil.loadImage(image4, this.config.fishImage[3]);
      this.myCanvas.add(fish4);
    }

    addButton() {

      for (let i = 0; i < this.config.button.length; i++) {
        this.button[i] = this.createButton(this.lang.buttonText[i], this.lang.buttonWidth[i], this.config.button[i]);
        this.myCanvas.add(this.button[i]);
        this.clickEnd[i] = false;
      }

    }

    // 创建按钮
    createButton(textString: string, buttonWidth: number, config: any) {
      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#ffffff',
        width: buttonWidth,
        height: 38,
        strokeWidth: 1,
        stroke: '#EBEBEB',
        rx: 19,
        ry: 19,
        hasControls: true
      });

      const text = new fabric.Text(textString, {
        fontSize: 14,
        originX: 'center',
        left: rect.width / 2,
        top: 12
      });

      const button = new fabric.Group([ rect, text ], config);

      return button;
    }

    // 点击
    changeButtonColor(button: fabric.Group) {
      if ((button as any)._objects[0].get('fill') === '#ffffff') {
        (button as any)._objects[0].set('fill', '#0291FF');
      } else {
        (button as any)._objects[0].set('fill', '#ffffff');
      }
      this.myCanvas.renderAll();
    }

    addMask() {
      this.mask = new fabric.Rect({
        width: window.screen.width * 4,
        height: window.screen.height * 3,
        left: -10,
        top: -10,
        fill: '#000000',
        opacity: 0.55,
        selectable: false,
        hoverCursor: 'default'
      });

      this.myCanvas2.add(this.mask);
    }

    async addCard() {
      for (let i = 0; i < this.config.button.length; i++) {
        this.card[i] = await this.createCard(
          this.cardImageSrc[i],
          this.lang.cardText[i].textTitle1,
          this.lang.cardText[i].textTitle2,
          this.lang.cardText[i].textContent,
          this.lang.textTitle2Left[i],
          {
            left: 208,
            top: 130,
            selectable: false,
            subTargetCheck: true,
            opacity: 0,
            visible: false,
            hoverCursor: 'default'
          });

        this.myCanvas2.add(this.card[i]);
      }
    }

    async createCard(imageSrc: string, textTitle1: string, textTitle2: string, textContent: string, textTitle2Left: any, config: any) {
      const whiteRect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '',
        width: 561 + 18 + 28,
        height: 315,
        visible: false,
        hasControls: true,
        hoverCursor: 'default'
      });

      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#FFFFFF',
        opacity: 0.85,
        width: 561,
        height: 315,
        rx: 12,
        ry: 12,
        hoverCursor: 'default'
      });

      const image = await FabricUtil.loadImage(imageSrc, {
        left: 18,
        top: 18,
        width: 223 * 2,
        height: 279 * 2,
        scaleX: 0.5,
        scaleY: 0.5,
        hoverCursor: 'default'
      });

      const text1 = new fabric.Text(textTitle1, {
        fontSize: 44,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 18 + 223 + 20,
        top: 34,
        hoverCursor: 'default'
      });

      const text2 = new fabric.Text(textTitle2, {
        fontSize: 22,
        scaleX: 0.5,
        scaleY: 0.5,
        left: textTitle2Left,
        top: 34 + 10,
        hoverCursor: 'default'
      });

      const text3 = new fabric.Text(textContent, {
        fontSize: 28,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 18 + 223 + 20,
        top: 88,
        hoverCursor: 'default'
      });

      const line = new fabric.Rect({
        left: 561,
        top: 40,
        fill: '#ffffff',
        width: 18,
        height: 1,
        hasControls: true,
        hoverCursor: 'default'
      });

      const cross = await FabricUtil.loadImage(crossImage, {
        left: 561 + 18,
        top: 27,
        width: 30 * 2,
        height: 30 * 2,
        scaleX: 0.5,
        scaleY: 0.5,
        hoverCursor: 'pointer'
      });

      const button = new fabric.Group([whiteRect, rect, image, text1, text2, text3, line, cross], config);

      return button;
    }

    clickEvent() {
      for (let i = 0; i < this.config.button.length; i++) {
        this.button[i].on('mousedown', () => {
          // 防止重复点击
          if (this.clickEnd[i]) {
            return;
          }
          this.clickEnd[i] = true;
          this.changeButtonColor(this.button[i]);
          this.clickAnim(this.card[i]);
        });

        (this.card[i] as any)._objects[7].on('mousedown', () => {
          // 防止重复点击
          if (!this.clickEnd[i]) {
            return;
          }
          this.clickEnd[i] = false;
          this.changeButtonColor(this.button[i]);
          this.reverseAnim(this.card[i]);
        });
      }
    }

    // 点击动画
    clickAnim(card: fabric.Group) {
      const tween = {
        opacity: 0.1,
        opacity2: 0,
      };
      TweenMax.to(tween, 0.5, {
        opacity: 1,
        opacity2: 0.1,
        onStart: () => {
          card.set('visible', true);
          (window as any).viewHandler.viewModel.$data.isShowBox2 = true;
        },
        onUpdate: () => {
          card.set('opacity', tween.opacity);
          this.myCanvas2.renderAll();
        },
        onComplete: () => {

        },
        // paused: true,
        ease: Linear.easeNone
      });
    }

    reverseAnim(card: fabric.Group) {
      const tween = {
        opacity: 1,
      };
      TweenMax.to(tween, 0.5, {
        opacity: 0,
        onStart: () => {
        },
        onUpdate: () => {
          card.set('opacity', tween.opacity);
          this.myCanvas2.renderAll();
        },
        onComplete: () => {
          card.set('visible', false);
          this.myCanvas2.renderAll();
          (window as any).viewHandler.viewModel.$data.isShowBox2 = false;
        },
        // paused: true,
        ease: Linear.easeNone
      });
    }

    // 重置
    reset() {

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
      let width = window.innerWidth;
      let height = window.innerHeight;

      if (width < height) {
        width = window.innerHeight;
        height = window.innerWidth;
      }

      this.scale = width / height > 16 / 9 ? height / 576 : width / 1024;

      this.myCanvas.setWidth(1024 * this.scale);
      this.myCanvas.setHeight(576 * this.scale);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();

      this.myCanvas2.setWidth(window.innerWidth + 2);
      this.myCanvas2.setHeight(window.innerHeight);

      this.myCanvas2.setZoom(this.scale);

      const top = (height - 315 * this.scale) / 2;
      const left = (width - (561 + 18 + 28) * this.scale) / 2;
      for (let i = 0; i < this.card.length; i++) {
        this.card[i].set('top', top / this.scale).setCoords();
        this.card[i].set('left', left / this.scale).setCoords();
      }

      this.myCanvas2.renderAll();
    }
}

