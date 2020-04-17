import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
import backImage from '../sub_static/img/backImage.png';

import { Linear, TweenMax } from 'gsap';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;
    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;
    rect: fabric.Rect;

    // 图片路径
    imageSrc: Array<string>;

    // 卡片数组
    cardArray: Array<fabric.Group>;
    cardSort = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // 声明一个变量用于接收上一次点击的数据
    lastClickIndex: number = null;

    // 防止重复点击
    clickEnd: Array<boolean>;

    // 统计反对的组数
    clickTrue = 0;

    constructor() {
      this.config = new MyConfig();
      this.addImageSrc();
      this.init();
    }

    addImageSrc() {
      this.imageSrc = [
        image1, image2, image3, image4, image5, image6,
        image6, image5, image4, image3, image2, image1
      ];
    }

    async init() {
      await this.initCanvas();
      await this.addRect();
      await this.addCard();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = 921;
      (document.getElementById('cardImageCanvas1') as any).height = 396;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '#586369',
      });

      this.myCanvas.selection = false;
    }

    async addRect() {
      this.rect = await new fabric.Rect(this.config.rect);
      this.myCanvas.add(this.rect);
    }

    // 生成随机数用于随机排序
    randomSort(a: any, b: any) {
      return Math.random() > 0.5 ? -1 : 1;
    }

    async addCard() {
      this.cardArray = [];
      this.clickEnd = [];
      this.cardSort.sort(this.randomSort);
      for (let i = 0; i < 12; i++) {
        this.cardArray[i] = await this.createCard(this.imageSrc[i], this.config.cardConfig[this.cardSort[i]]);
        this.myCanvas.add(this.cardArray[i]);

        this.clickEnd[i] = false;

        await this.clickEvent(this.cardArray[i], i);
      }

    }

    clickEvent(element: fabric.Group, i: number) {
      element.on('mousedown', (e: any) => {
        // 防止重复点击
        if (this.clickEnd[i]) {
          return;
        }
        this.clickEnd[i] = true;

        if (this.lastClickIndex === null) {

          this.lastClickIndex = i;
          console.log('赋值', this.lastClickIndex, i);

          this.clickAnim(element, 12, i);

        } else {
          this.clickAnim(element, this.lastClickIndex, i);
          this.lastClickIndex = null;
        }
      });
    }

    // 创建一张纸卡片
    async createCard(frontImage: string, config: any) {

      const front = await FabricUtil.loadImage(frontImage, Object.assign({
        visible: true,

      }, this.config.cardImage));
      const back = await FabricUtil.loadImage(backImage, Object.assign({
        visible: false,
      }, this.config.cardImage));

      const card = new fabric.Group([front, back], Object.assign({
        selectable: false,
        centeredRotation: true,
      }, config));

      return card;
    }

    // 点击动画
    clickAnim(element: fabric.Group, lastIndex: number, newIndex: number) {
      const tween = {
        scale: 1,
        width: element.width,
      };
      TweenMax.to(tween, 0.2, {
        scale: 0.1,
        width: 0,
        onUpdate: () => {
          (element as any).set('clipTo', (ctx: any) => {
            const rect = new fabric.Rect({
              width: tween.width,
              height: element.height,
              fill: '#000000'
            });
            rect._render(ctx);
          });
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          (element as any)._objects[1].set('visible', false);
          (element as any)._objects[0].set('visible', true);
          anim2.play();
        },
        // paused: true,
        ease: Linear.easeNone
      });

      const tween2 = {
        width: 0,
      };
      const anim2 = TweenMax.to(tween2, 0.2, {
        width: element.width,
        onUpdate: () => {
          (element as any).set('clipTo', (ctx: any) => {
            const rect = new fabric.Rect({
              width: tween2.width,
              height: element.height,
              fill: '#000000'
            });
            rect._render(ctx);
          });
          this.myCanvas.renderAll();
        },
        onComplete: () => {

          if (lastIndex === 12) {
            return;
          }

          if (lastIndex + newIndex === 11) {
              // 正确
              this.clickAnimTrue(element, lastIndex, newIndex);
          } else {
              // 错误
              this.clickAnimFalse(element, lastIndex, newIndex);
          }

          this.myCanvas.renderAll();
        },
        paused: true,
        ease: Linear.easeNone
      });
    }

    // 点击错误执行的动画
    clickAnimFalse(element: fabric.Group, lastIndex: number, newIndex: number) {
      const tween = {
        scale: 1,
        width: element.width,
      };
      TweenMax.to(tween, 0.2, {
        scale: 0.1,
        width: 0,
        onUpdate: () => {
          const rect = new fabric.Rect({
            width: tween.width,
            height: element.height,
            fill: '#000000'
          });
          (this.cardArray[lastIndex] as any).set('clipTo', (ctx: any) => {
            rect._render(ctx);
          });
          (this.cardArray[newIndex] as any).set('clipTo', (ctx: any) => {
            rect._render(ctx);
          });
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          (this.cardArray[lastIndex] as any)._objects[1].set('visible', true);
          (this.cardArray[lastIndex] as any)._objects[0].set('visible', false);
          (this.cardArray[newIndex] as any)._objects[1].set('visible', true);
          (this.cardArray[newIndex] as any)._objects[0].set('visible', false);
          anim2.play();
        },
        ease: Linear.easeNone
      });

      const tween2 = {
        width: 0,
      };
      const anim2 = TweenMax.to(tween2, 0.2, {
        width: element.width,
        onUpdate: () => {
          const rect = new fabric.Rect({
            width: tween2.width,
            height: element.height,
            fill: '#000000'
          });

          (this.cardArray[lastIndex] as any).set('clipTo', (ctx: any) => {
            rect._render(ctx);
          });
          (this.cardArray[newIndex] as any).set('clipTo', (ctx: any) => {
            rect._render(ctx);
          });
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          this.clickEnd[lastIndex] = false;
          this.clickEnd[newIndex] = false;
        },
        paused: true,
        ease: Linear.easeNone
      });
    }

    // 点击正确执行的动画
    clickAnimTrue(element: fabric.Group, lastIndex: number, newIndex: number) {
      const tween = {
        opacity: 1,
      };
      TweenMax.to(tween, 0.2, {
        opacity: 0,
        onUpdate: () => {
          (this.cardArray[lastIndex] as any).set('opacity', tween.opacity);
          (this.cardArray[newIndex] as any).set('opacity', tween.opacity);
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          (this.cardArray[lastIndex] as any).set('visible', false);
          (this.cardArray[newIndex] as any).set('visible', false);

          (this.cardArray[lastIndex] as any).set('opacity', 1);
          (this.cardArray[newIndex] as any).set('opacity', 1);

          this.clickTrue += 1;

          console.log(this.clickTrue);
          if (this.clickTrue >= 6) {
            (window as any).viewHandler.viewModel.$data.isShowEndPage = true;
            (window as any).viewHandler.viewModel.clearIntervalTimeConsumingTimer();
          }

          this.myCanvas.renderAll();
        },
        ease: Linear.easeNone
      });
    }

    // 倒计时结束 翻面
    countDownEnd() {
      for (let i = 0; i < this.cardArray.length; i++) {
        (this.cardArray[i] as any)._objects[1].set('visible', true);
        (this.cardArray[i] as any)._objects[0].set('visible', false);
      }

      this.myCanvas.renderAll();
    }

    // 重置
    reset() {
      this.cardSort.sort(this.randomSort);
      for (let i = 0; i < 12; i++) {
        this.cardArray[i].set('visible', true);
        (this.cardArray[i] as any)._objects[1].set('visible', false);
        (this.cardArray[i] as any)._objects[0].set('visible', true);

        this.cardArray[i].set('left', this.config.cardConfig[this.cardSort[i]].left).setCoords();
        this.cardArray[i].set('top', this.config.cardConfig[this.cardSort[i]].top).setCoords();
        this.clickEnd[i] = false;
      }
      this.clickTrue = 0;
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

      this.myCanvas.setWidth(921 * this.scale);
      this.myCanvas.setHeight(396 * this.scale);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      this.myCanvas.setZoom(this.scale);

      this.myCanvas.renderAll();
    }
}

