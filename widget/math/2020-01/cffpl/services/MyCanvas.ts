import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import sliderImage from '../sub_static/img/sliderImage.png';


export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;
    // 缩放系数
    scale = 1;

    // 白色和淡绿色矩形
    whiteRect: fabric.Rect;
    greenRect: fabric.Rect;

    // 四个小边框矩形
    // 左侧蓝色矩形
    leftBlueRect: fabric.Rect;

    // 右侧蓝色矩形
    rightBlueRect: fabric.Rect;

    // 黄色矩形
    yellowRect: fabric.Rect;

    // 紫色矩形
    violetRect: fabric.Rect;

    // 三个滑块按钮
    sliderButton: Array<fabric.Image>;

    // 矩形边上的四个数字
    rectNumberText: Array<fabric.Text>;

    // 公式文字
    formulaText: fabric.Group;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addRect();
      await this.addText();
      await this.addFormulaText();
      await this.addSliderButton();
      await this.addDragEvent();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = window.innerWidth;
      (document.getElementById('cardImageCanvas1') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '',
      });

      this.myCanvas.selection = false;
    }

    // 添加矩形 和 边框
    addRect() {
      this.whiteRect = new fabric.Rect(this.config.whiteRect);
      this.myCanvas.add(this.whiteRect);

      this.greenRect = new fabric.Rect(this.config.greenRect);
      this.myCanvas.add(this.greenRect);

      this.leftBlueRect = new fabric.Rect(this.config.leftBlueRect);
      this.myCanvas.add(this.leftBlueRect);

      this.rightBlueRect = new fabric.Rect(this.config.rightBlueRect);
      this.myCanvas.add(this.rightBlueRect);

      this.yellowRect = new fabric.Rect(this.config.yellowRect);
      this.myCanvas.add(this.yellowRect);

      this.violetRect = new fabric.Rect(this.config.violetRect);
      this.myCanvas.add(this.violetRect);
    }

    // 添加滑块
    async addSliderButton() {
      this.sliderButton = [];

      for (let i = 0; i < this.config.sliderButtonLT.length; i++) {
        this.sliderButton[i] = await this.createSliderButton(this.config.sliderButtonLT[i].left, this.config.sliderButtonLT[i].top);
        this.myCanvas.add(this.sliderButton[i]);
      }
    }

    // 添加文字
    addText() {
      this.rectNumberText = [];

      for (let i = 0; i < this.config.rectNumberText.length; i++) {
        this.rectNumberText[i] = new fabric.Text('10', this.config.rectNumberText[i]);
        this.myCanvas.add(this.rectNumberText[i]);
      }

    }

    // 添加底部公式文字
    addFormulaText() {
      const formulaTextArray = [];
      for (let i = 0; i < this.config.text.length; i++) {
        if (i === 0) {
          formulaTextArray[i] = this.createText(this.config.text[i].text, 0, this.config.text[i].color, this.config.text[i].originX);
        } else {
          const left = formulaTextArray[i - 1].left + formulaTextArray[i - 1].width * 0.5 + 12;
          formulaTextArray[i] = this.createText(this.config.text[i].text, left,
            this.config.text[i].color, this.config.text[i].originX);
        }
      }

      this.formulaText = new fabric.Group(formulaTextArray, this.config.formulaText);
      this.myCanvas.add(this.formulaText);
    }

    createText(textcontent: string, left: number, color: string, originX?: string) {
      const text = new fabric.Text(textcontent, {
        left: left,
        top: 0,
        fontSize: 24,
        fill: color,
        originX: !originX ?  'left' : originX
      });

      return text;
    }

    addDragEvent() {
      this.sliderButton[0].on('moving', (e: any) => {
        // 限制拖动范围
        this.sliderButton[0].set('left', this.sliderButton[1].get('left')).setCoords();

        if (this.sliderButton[0].get('top') > 136 + 377 * 0.9) {
          this.sliderButton[0].set('top', 136 + 377 * 0.9).setCoords();
        }

        if (this.sliderButton[0].get('top') < 136) {
          this.sliderButton[0].set('top', 136).setCoords();
        }

        this.sliderButton1DragEvent();
      });

      this.sliderButton[1].on('moving', (e: any) => {
        // 限制拖动范围
        this.sliderButton[1].set('top', 136 + 377).setCoords();

        const minLeft = this.config.whiteRect.left;
        if (this.sliderButton[1].get('left') < minLeft) {
          this.sliderButton[1].set('left', minLeft).setCoords();
        }

        const maxLeft = this.config.whiteRect.left + this.config.whiteRect.width * 0.9;
        if (this.sliderButton[1].get('left') > maxLeft) {
          this.sliderButton[1].set('left', maxLeft).setCoords();
        }

        this.sliderButton2DragEvent();
      });

      this.sliderButton[2].on('moving', (e: any) => {
        // 限制拖动范围
        this.sliderButton[2].set('top', 136 + 377).setCoords();

        const minLeft = this.config.whiteRect.left + this.config.whiteRect.width + this.config.greenRect.width * 0.1;
        if (this.sliderButton[2].get('left') < minLeft) {
          this.sliderButton[2].set('left', minLeft).setCoords();
        }

        const maxLeft = this.config.whiteRect.left + this.config.whiteRect.width + this.config.greenRect.width;
        if (this.sliderButton[2].get('left') > maxLeft) {
          this.sliderButton[2].set('left', maxLeft).setCoords();
        }

        this.sliderButton3DragEvent();
      });


      // 绑定松手事件 用于做吸附
      this.sliderButton[0].on('mouseup', (e: any) => {
        const length = this.whiteRect.get('height') / this.config.whiteRect.height * 10;
        let rectNumberText = length;
        if (length - Math.floor(length) > 0.5) {
          rectNumberText = Math.floor(length) + 1;
        } else {
          rectNumberText = Math.floor(length);
        }

        const top = this.config.whiteRect.top + this.config.whiteRect.height
          - this.config.whiteRect.height / 10 * rectNumberText;

        this.sliderButton[0].set('top', top).setCoords();

        this.sliderButton1DragEvent();
      });

      this.sliderButton[1].on('mouseup', (e: any) => {
        const length = this.whiteRect.get('width') / this.config.whiteRect.width * 10;
        let rectNumberText = length;
        if (length - Math.floor(length) > 0.5) {
          rectNumberText = Math.floor(length) + 1;
        } else {
          rectNumberText = Math.floor(length);
        }

        const left = this.config.whiteRect.left + this.config.whiteRect.width / 10 * (10 - rectNumberText);

        this.sliderButton[1].set('left', left).setCoords();

        this.sliderButton2DragEvent();
      });

      this.sliderButton[2].on('mouseup', (e: any) => {
        const length = this.greenRect.get('width') / this.config.greenRect.width * 10;
        let rectNumberText = length;
        if (length - Math.floor(length) > 0.5) {
          rectNumberText = Math.floor(length) + 1;
        } else {
          rectNumberText = Math.floor(length);
        }

        const left = this.config.greenRect.left + this.config.greenRect.width / 10 * (rectNumberText);

        this.sliderButton[2].set('left', left).setCoords();

        this.sliderButton3DragEvent();
      });
    }

    // 左上角滑块拖动触发的事件
    sliderButton1DragEvent() {
      this.whiteRect.set('top', this.sliderButton[0].get('top'));
      this.leftBlueRect.set('top', this.sliderButton[0].get('top'));

      this.whiteRect.set('height', this.sliderButton[1].get('top') - this.sliderButton[0].get('top'));
      this.leftBlueRect.set('height', this.whiteRect.get('height'));

      this.greenRect.set('top', this.sliderButton[0].get('top'));
      this.rightBlueRect.set('top', this.sliderButton[0].get('top'));

      this.greenRect.set('height', this.sliderButton[1].get('top') - this.sliderButton[0].get('top'));
      this.rightBlueRect.set('height', this.whiteRect.get('height'));

      this.rectNumberText[0].set('top', this.sliderButton[0].get('top') + this.whiteRect.get('height') * 0.5);
      this.rectNumberText[1].set('top', this.sliderButton[0].get('top') + this.whiteRect.get('height') * 0.5);

      const length = this.whiteRect.get('height') / this.config.whiteRect.height * 10;
      let rectNumberText = length;
      if (length - Math.floor(length) > 0.5) {
        rectNumberText = Math.floor(length) + 1;
      } else {
        rectNumberText = Math.floor(length);
      }

      this.rectNumberText[0].set('text', rectNumberText.toString());
      this.rectNumberText[1].set('text', rectNumberText.toString());

      (this.formulaText as any)._objects[5].set('text', this.rectNumberText[0].text);
      (this.formulaText as any)._objects[9].set('text', this.rectNumberText[0].text);
      (this.formulaText as any)._objects[13].set('text', this.rectNumberText[0].text);
    }

    // 左下角滑块拖动触发的事件
    sliderButton2DragEvent() {
      this.leftBlueRect.set('left', this.sliderButton[1].get('left'));
      this.sliderButton[0].set('left', this.sliderButton[1].get('left')).setCoords();

      this.whiteRect.set('left', this.sliderButton[1].get('left'));
      this.whiteRect.set('width', this.config.whiteRect.left + this.config.whiteRect.width - this.sliderButton[1].get('left'));

      this.yellowRect.set('left', this.sliderButton[1].get('left'));
      this.yellowRect.set('width', this.config.whiteRect.left + this.config.whiteRect.width - this.sliderButton[1].get('left'));

      this.rectNumberText[0].set('left', this.sliderButton[1].get('left') - 22);
      this.rectNumberText[2].set('left', this.sliderButton[1].get('left') + this.whiteRect.get('width') * 0.5);

      const length = this.whiteRect.get('width') / this.config.whiteRect.width * 10;
      let rectNumberText = length;
      if (length - Math.floor(length) > 0.5) {
        rectNumberText = Math.floor(length) + 1;
      } else {
        rectNumberText = Math.floor(length);
      }

      this.rectNumberText[2].set('text', rectNumberText.toString());
      (this.formulaText as any)._objects[1].set('text', this.rectNumberText[2].text);
      (this.formulaText as any)._objects[7].set('text', this.rectNumberText[2].text);
    }

    // 右下角滑块拖动触发的事件
    sliderButton3DragEvent() {
      this.rightBlueRect.set('left', this.sliderButton[2].get('left'));

      this.greenRect.set('width', this.sliderButton[2].get('left') - this.config.greenRect.left);
      this.greenRect.set('left', this.sliderButton[2].get('left') - this.greenRect.width);

      this.violetRect.set('width', this.sliderButton[2].get('left') - this.config.greenRect.left);
      this.violetRect.set('left', this.sliderButton[2].get('left') - this.greenRect.width);

      this.rectNumberText[1].set('left', this.sliderButton[2].get('left') + 22);
      this.rectNumberText[3].set('left', this.sliderButton[2].get('left') - this.greenRect.get('width') * 0.5);

      const length = this.greenRect.get('width') / this.config.greenRect.width * 10;
      let rectNumberText = length;
      if (length - Math.floor(length) > 0.5) {
        rectNumberText = Math.floor(length) + 1;
      } else {
        rectNumberText = Math.floor(length);
      }

      this.rectNumberText[3].set('text', rectNumberText.toString());
      (this.formulaText as any)._objects[3].set('text', this.rectNumberText[3].text);
      (this.formulaText as any)._objects[11].set('text', this.rectNumberText[3].text);
    }

    async createSliderButton(left: number, top: number) {
      const button = await FabricUtil.loadImage(sliderImage, this.config.sliderButton);
      button.set('left', left);
      button.set('top', top);

      return button;
    }

    // 重置
    reset() {
      for (let i = 0; i < this.config.sliderButtonLT.length; i++) {
        this.resetElement(this.sliderButton[i], this.config.sliderButtonLT[i]);
      }

      this.sliderButton1DragEvent();
      this.sliderButton2DragEvent();
      this.sliderButton3DragEvent();

      this.myCanvas.renderAll();
    }

    resetElement(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

      this.myCanvas.setWidth(1200 * this.scale);
      this.myCanvas.setHeight(675 * this.scale);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }
}

