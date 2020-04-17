import {YzddxConfig} from './YzddxConfig';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import { ImageEvent } from './ImageEvent';

import buttonImage from '../sub_static/buttonImage.png';
import explainImage from '../sub_static/explainImage.png';

export default class YzddxCanvas {
    config: YzddxConfig;
    imageEvent: ImageEvent;

    myCanvas: fabric.Canvas;

    // 三个颜色矩形
    blueRect: fabric.Rect;
    yellowRect: fabric.Rect;
    greenRect: fabric.Rect;

    // 左右拖动按钮
    leftButton: any;
    rightButton: any;

    // 说明按钮和文字图片
    explainButton: any;
    explainImage: any;

    // 文字
    bText: any;
    aText2: any;
    bText2: any;
    aText: any;

    b2Text: any;
    ab2Text: any;
    babText1: any;
    babText2: any;

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

      await this.initRect();
      await this.initText();
      await this.initExplainImage();
      await this.initButton();

      await this.initButtonDragEvent();
    }

    initRect() {
      this.blueRect = new fabric.Rect(this.config.blueRect);
      this.myCanvas.add(this.blueRect);

      this.yellowRect = new fabric.Rect(this.config.yellowRect);
      this.myCanvas.add(this.yellowRect);

      this.greenRect = new fabric.Rect(this.config.greenRect);
      this.myCanvas.add(this.greenRect);
    }

    initText() {
      this.aText = new fabric.Text('a', this.config.aText as any);
      this.myCanvas.add(this.aText);

      this.bText = new fabric.Text('b', this.config.bText as any);
      this.myCanvas.add(this.bText);

      this.aText2 = new fabric.Text('a', this.config.aText2 as any);
      this.myCanvas.add(this.aText2);

      this.bText2 = new fabric.Text('b', this.config.bText2 as any);
      this.myCanvas.add(this.bText2);

      this.b2Text = new fabric.Text('b²', this.config.b2Text as any);
      this.myCanvas.add(this.b2Text);

      this.ab2Text = new fabric.Text('(a - b)²', this.config.ab2Text as any);
      this.myCanvas.add(this.ab2Text);

      this.babText1 = new fabric.Text('b(a - b)', this.config.babText1 as any);
      this.myCanvas.add(this.babText1);

      this.babText2 = new fabric.Text('b(a - b)', this.config.babText2 as any);
      this.myCanvas.add(this.babText2);
    }

    async initExplainImage() {
      this.explainImage = await FabricUtil.loadImage(explainImage as any, this.config.explainImage);
      this.myCanvas.add(this.explainImage);
    }

    async initButton() {
      // 拖动按钮
      this.leftButton = await FabricUtil.loadImage(buttonImage as any, this.config.leftButton);
      this.myCanvas.add(this.leftButton);

      this.rightButton = await FabricUtil.loadImage(buttonImage as any, this.config.rightButton);
      this.myCanvas.add(this.rightButton);

      // 点击按钮
      this.explainButton = await FabricUtil.createButton(this.config.explainButton);
      this.explainButton.selectable = false;
      this.myCanvas.add(this.explainButton);
    }

    initButtonDragEvent() {

      this.leftButton.on('moving', (e: any) => {
          // 限制点的拖动范围
          this.leftButton.set('left', this.config.width * 0.5 - this.blueRect.get('width') * 0.5);
          if (this.leftButton.get('top') <= this.config.height * 0.5 - this.blueRect.get('height') * 0.5) {
            this.leftButton.set('top', this.config.height * 0.5 - this.blueRect.get('height') * 0.5);
          } else if (this.leftButton.get('top') >= this.config.height * 0.5 + this.blueRect.get('height') * 0.5) {
            this.leftButton.set('top', this.config.height * 0.5 + this.blueRect.get('height') * 0.5);
          }

          // 限制黄色矩形的宽度不能超过蓝色矩形
          if (this.leftButton.get('top') - (this.config.height * 0.5 - this.blueRect.get('height') * 0.5) > this.blueRect.get('width')) {
            this.leftButton.set('top', this.config.height * 0.5 - this.blueRect.get('height') * 0.5 + this.blueRect.get('width'));
          }


          this.updateYellowRect();

          this.updateText();
      });

      this.rightButton.on('moving', (e: any) => {
        // 限制点的拖动范围
        if (this.rightButton.get('top') <= this.config.height * 0.5 + this.config.blueRect.height * 0.5 * 0.76) {
          this.rightButton.set('top', this.config.height * 0.5 + this.config.blueRect.height * 0.5 * 0.76);
        } else if (this.rightButton.get('top') >= this.config.height * 0.5 + this.config.blueRect.height * 0.5 * 1.53) {
          this.rightButton.set('top', this.config.height * 0.5 + this.config.blueRect.height * 0.5 * 1.53);
        }

        if (this.rightButton.get('left') <= this.config.width * 0.5 + this.config.blueRect.width * 0.5 * 0.76) {
          this.rightButton.set('left', this.config.width * 0.5 + this.config.blueRect.width * 0.5 * 0.76);
        } else if (this.rightButton.get('left') >= this.config.width * 0.5 + this.config.blueRect.width * 0.5 * 1.53) {
          this.rightButton.set('left', this.config.width * 0.5 + this.config.blueRect.width * 0.5 * 1.53);
        }

        // 限制按钮的拖动轨迹为直线
        this.rightButton.set('top', this.config.height * 0.5 -
          (this.config.height * 0.5 - this.config.rightButton.top) /
          (this.config.rightButton.left - this.config.width * 0.5) *
          (this.rightButton.get('left') - this.config.width * 0.5));


        // 重复执行防止快速拖动不跟手
        this.updateBlueRect();
        this.updateBlueRect();

        this.updateYellowRect();

        this.updateText();
      });

      this.rightButton.on('modified', () => {
        this.updateBlueRect();
        this.updateText();
      });

      this.imageEvent.buttonClickEvent(this.explainButton, this.explainImage, () => { this.showText(); });
    }

    // 更新黄色正方形大小  及 对应的 绿色正方形的变换
    updateYellowRect() {
      this.yellowRect.set('width', this.leftButton.get('top') - (this.blueRect.get('top') - this.blueRect.get('height') * 0.5));
      this.yellowRect.set('height', this.leftButton.get('top') - (this.blueRect.get('top') - this.blueRect.get('height') * 0.5));

      this.yellowRect.set('left', this.config.width * 0.5 - this.blueRect.get('width') * 0.5 + this.yellowRect.get('width') * 0.5);
      this.yellowRect.set('top', this.config.height * 0.5 - this.blueRect.get('height') * 0.5 + this.yellowRect.get('height') * 0.5);

      this.greenRect.set('width', this.blueRect.get('width') - this.yellowRect.get('width'));
      this.greenRect.set('height', this.blueRect.get('height') - this.yellowRect.get('height'));

      this.greenRect.set('left', this.config.width * 0.5 + this.blueRect.get('width') * 0.5 - this.greenRect.get('width') * 0.5);
      this.greenRect.set('top', this.config.height * 0.5 + this.blueRect.get('height') * 0.5 - this.greenRect.get('height') * 0.5);

      this.showText();
    }

    // 显示文字
    showText() {
      if (this.explainButton.getObjects()[0].get('fill') !== '#ffffff') {
        if (this.yellowRect.get('width') >= this.blueRect.get('width') - 1) {
          this.ab2Text.set('visible', false);
          this.b2Text.set('visible', true);
          this.babText1.set('visible', false);
          this.babText2.set('visible', false);
        } else if (this.greenRect.get('width') >= this.blueRect.get('width') - 1) {
          this.b2Text.set('visible', false);
          this.ab2Text.set('visible', true);
          this.babText1.set('visible', false);
          this.babText2.set('visible', false);
        } else {
          this.ab2Text.set('visible', true);
          this.b2Text.set('visible', true);
          this.babText1.set('visible', true);
          this.babText2.set('visible', true);
        }
      } else {
        this.ab2Text.set('visible', false);
        this.b2Text.set('visible', false);
        this.babText1.set('visible', false);
        this.babText2.set('visible', false);
      }
    }


    updateBlueRect() {
      // 根据按钮改变蓝色矩形的宽高
      this.blueRect.set('width', this.rightButton.get('left') - (this.blueRect.get('left') - this.blueRect.get('width') * 0.5));
      this.blueRect.set('height', this.rightButton.get('top') - (this.blueRect.get('top') - this.blueRect.get('height') * 0.5));

      // 限制黄色矩形的宽高不能超过蓝色矩形
      if (this.yellowRect.get('width') > this.blueRect.get('width')) {
        this.yellowRect.set('width', this.blueRect.get('width'));
        this.yellowRect.set('height', this.blueRect.get('width'));
      }

      if (this.yellowRect.get('height') > this.blueRect.get('height')) {
        this.yellowRect.set('width', this.blueRect.get('height'));
        this.yellowRect.set('height', this.blueRect.get('height'));
      }

      // 改变绿色矩形的宽高 = 蓝色宽高 - 黄色宽高
      this.greenRect.set('width', this.blueRect.get('width') - this.yellowRect.get('width'));
      this.greenRect.set('height', this.blueRect.get('height') - this.yellowRect.get('height'));

      // 更新黄色矩形的位置
      this.yellowRect.set('left', this.config.width * 0.5 - this.blueRect.get('width') * 0.5 + this.yellowRect.get('width') * 0.5);
      this.yellowRect.set('top', this.config.height * 0.5 - this.blueRect.get('height') * 0.5 + this.yellowRect.get('height') * 0.5);

      // 更新绿色矩形的位置
      this.greenRect.set('left', this.config.width * 0.5 + this.blueRect.get('width') * 0.5 - this.greenRect.get('width') * 0.5);
      this.greenRect.set('top', this.config.height * 0.5 + this.blueRect.get('height') * 0.5 - this.greenRect.get('height') * 0.5);

      // 更新左侧按钮的位置
      this.leftButton.set('left', this.config.width * 0.5 - this.blueRect.get('width') * 0.5).setCoords();
      this.leftButton.set('top', this.config.height * 0.5 - this.blueRect.get('height') * 0.5 + this.yellowRect.get('height')).setCoords();
    }

    updateText() {
      this.aText.set('left', this.blueRect.get('left'));
      this.aText.set('top', this.blueRect.get('top') - this.blueRect.get('height') * 0.5 - 12 * this.config.scale - 3);

      this.bText.set('left', this.blueRect.get('left') - this.blueRect.get('width') * 0.5 - 12 * this.config.scale);
      this.bText.set('top', this.blueRect.get('top') - this.blueRect.get('height') * 0.5 + this.yellowRect.get('height') * 0.5);

      this.aText2.set('left', this.blueRect.get('left') + this.blueRect.get('width') * 0.5 + 12 * this.config.scale);
      this.aText2.set('top', this.blueRect.get('top'));

      this.bText2.set('top', this.blueRect.get('top') + this.blueRect.get('height') * 0.5 + 12 * this.config.scale + 3);
      this.bText2.set('left', this.blueRect.get('left') - this.blueRect.get('width') * 0.5 + this.yellowRect.get('width') * 0.5);


      this.b2Text.set('left', this.yellowRect.get('left'));
      this.b2Text.set('top', this.yellowRect.get('top'));

      this.ab2Text.set('left', this.greenRect.get('left'));
      this.ab2Text.set('top', this.greenRect.get('top'));

      this.babText1.set('left', this.greenRect.get('left'));
      this.babText1.set('top', this.yellowRect.get('top'));

      this.babText2.set('left', this.yellowRect.get('left'));
      this.babText2.set('top', this.greenRect.get('top'));
    }

    // 重置
    reset() {
      this.resetElement(this.rightButton, this.config.rightButton);
      this.resetElement(this.leftButton, this.config.leftButton);

      this.resetRect(this.blueRect, this.config.blueRect);
      this.resetRect(this.yellowRect, this.config.yellowRect);
      this.resetRect(this.greenRect, this.config.greenRect);

      this.imageEvent.showClickButton(false, this.explainButton);
      this.explainImage.set('visible', false);

      this.updateText();

      this.b2Text.set('visible', false);
      this.ab2Text.set('visible', false);
      this.babText1.set('visible', false);
      this.babText2.set('visible', false);

      this.myCanvas.renderAll();
    }

    resetElement(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resetRect(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
      element.set('width', config.width);
      element.set('height', config.height);
    }
}

