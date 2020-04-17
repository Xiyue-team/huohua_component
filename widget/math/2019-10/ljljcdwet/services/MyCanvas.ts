import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';

import image1 from '../sub_static/image1.png';
import image2 from '../sub_static/image2.png';
import image3 from '../sub_static/image3.png';
import { FabricUtil } from './Util';

export class MyCanvas {
    config: MyConfig;
    myCanvas1: fabric.Canvas;
    myCanvas2: fabric.Canvas;
    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    // 矩形
    rect: fabric.Rect;

    // 填充圆
    circle1: fabric.Circle;
    circle2: fabric.Circle;

    // 重叠部分颜色
    overlappingColors: fabric.Circle;

    // 圆线条
    circleLine1: fabric.Circle;
    circleLine2: fabric.Circle;

    // 文字
    textA: fabric.Text;
    textB: fabric.Text;
    textU: fabric.Text;

    // 三个公式图
    formulaImage: Array<fabric.Image>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.initRect();
      await this.initCircle();
      await this.initFormulaImage();
      await this.initDragEvent();
      await this.scalecircle1(60 / 100);

      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = 726;
      (document.getElementById('cardImageCanvas1') as any).height = 525;
      this.myCanvas1 = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '#2d2d2d',
      });

      (document.getElementById('cardImageCanvas2') as any).width = 726;
      (document.getElementById('cardImageCanvas2') as any).height = 525;
      this.myCanvas2 = new fabric.Canvas('cardImageCanvas2', {});

      this.myCanvas1.selection = false;
      this.myCanvas2.selection = false;
    }

    // 添加矩形
    initRect() {
      // 圆的拖动范围
      this.rect = new fabric.Rect(this.config.rect as any);
      this.myCanvas1.add(this.rect);
    }

    // 添加圆
    initCircle() {
      // 重叠色
      this.overlappingColors = new fabric.Circle(this.config.overlappingColors as any);
      this.myCanvas1.add(this.overlappingColors);

      // 圆A
      this.circle1 = new fabric.Circle(this.config.circle1);
      this.myCanvas2.add(this.circle1);

      // 圆B
      this.circle2 = new fabric.Circle(this.config.circle2);
      this.myCanvas2.add(this.circle2);

      // 文字A
      this.textA = new fabric.Text(this.config.textA.text, this.config.textA as any);
      this.myCanvas2.add(this.textA);
      // 文字B
      this.textB = new fabric.Text(this.config.textB.text, this.config.textB as any);
      this.myCanvas2.add(this.textB);

      this.textU = new fabric.Text(this.config.textU.text, this.config.textU as any);
      this.myCanvas2.add(this.textU);


      // 圆A的线
      this.circleLine1 = new fabric.Circle(this.config.circleLine1 as any);
      this.myCanvas2.add(this.circleLine1);

      // 圆B的线
      this.circleLine2 = new fabric.Circle(this.config.circleLine2 as any);
      this.myCanvas2.add(this.circleLine2);
    }

    // 添加公式图
    async initFormulaImage() {
      this.formulaImage = [];
      this.formulaImage[0] = await FabricUtil.loadImage(image3, this.config.formulaImage1 as any);
      this.myCanvas1.add(this.formulaImage[0]);

      this.formulaImage[1] = await FabricUtil.loadImage(image2, this.config.formulaImage2 as any);
      this.myCanvas1.add(this.formulaImage[1]);

      this.formulaImage[2] = await FabricUtil.loadImage(image1, this.config.formulaImage3 as any);
      this.myCanvas1.add(this.formulaImage[2]);
    }

    // 绑定事件
    initDragEvent() {
      // 拖动圆B
      this.circleLine2.on('moving', (e: any) => {
        this.circleLine2DragEvent();
        this.myCanvas1.renderAll();
        this.myCanvas2.renderAll();
      });

      // 拖动圆A
      this.circleLine1.on('moving', (e: any) => {
        this.circleLine1DragEvent();
        this.myCanvas2.renderAll();
      });

      this.circleLine1.on('modified', (e: any) => {
        this.myCanvas2.discardActiveObject();
      });

      this.circleLine2.on('modified', (e: any) => {
        this.myCanvas2.discardActiveObject();
      });
    }

    // circleLine1拖动后触发的事件
    circleLine1DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitCircleDrag(this.circleLine1, this.rect);

      // 改变实际圆A位置
      this.circle1.set('left', this.circleLine1.get('left'));
      this.circle1.set('top', this.circleLine1.get('top'));

      this.textA.set('left', this.circleLine1.get('left'));
      this.textA.set('top', this.circleLine1.get('top'));
    }

    // circleLine2拖动后触发的事件
    circleLine2DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitCircleDrag(this.circleLine2, this.rect);

      // 改变实际圆B位置
      this.circle2.set('left', this.circleLine2.get('left')).setCoords();
      this.circle2.set('top', this.circleLine2.get('top')).setCoords();

      // 改变重叠色位置
      this.overlappingColors.set('left', this.circleLine2.get('left')).setCoords();
      this.overlappingColors.set('top', this.circleLine2.get('top')).setCoords();

      this.textB.set('left', this.circleLine2.get('left')).setCoords();
      this.textB.set('top', this.circleLine2.get('top')).setCoords();
    }

    // 限制圆拖动范围
    limitCircleDrag(circle: fabric.Circle, rect: fabric.Rect) {
      circle.get('left') < rect.get('left') + circle.get('radius') + 1
        ? circle.set('left', rect.get('left') + circle.get('radius') + 1)
        : circle.get('left');
      circle.get('left') > rect.get('left') + rect.get('width') - circle.get('radius')
        ? circle.set('left', rect.get('left') + rect.get('width') - circle.get('radius')).setCoords()
        : circle.get('left');

      circle.get('top') < rect.get('top') + circle.get('radius') + 1
        ? circle.set('top', rect.get('top') + circle.get('radius') + 1)
        : circle.get('top');

      circle.get('top') > rect.get('top') + rect.get('height') - circle.get('radius')
        ? circle.set('top', rect.get('top') + rect.get('height') - circle.get('radius')).setCoords()
        : circle.get('top');
    }

    // 显示重叠色
    showOverlappingColors(value: boolean) {
      if (value) {
        this.circle2.set('globalCompositeOperation', 'xor');
      } else {
        this.circle2.set('globalCompositeOperation', '');
      }
    }

    // 圆A 和 圆B 变黄色 及 文字变黑色
    changeColourAB (value: boolean) {
      if (value) {
        this.circle2.set('fill', '#FFD621');
        this.circle1.set('fill', '#FFD621');

        this.textA.set('fill', '#000000');
        this.textB.set('fill', '#000000');

      } else {
        this.circle2.set('fill', '#404040');
        this.circle1.set('fill', '#404040');

        this.textA.set('fill', '#ffffff');
        this.textB.set('fill', '#ffffff');
      }
    }

    // 改变重叠色的颜色
    changeColourOverlappingColors(value: boolean) {
      if (value) {
        this.overlappingColors.set('fill', '#404040');
      } else {
        this.overlappingColors.set('fill', '#FFD621');
      }
    }

    // rect和文字U变色
    changeColourRect(value: boolean) {
      if (value) {
        this.textU.set('fill', '#000000');
        this.rect.set('fill', '#FFD621');
        this.rect.set('opacity', 1);
      } else {
        this.textU.set('fill', '#ffffff');
        this.rect.set('fill', '#ffffff');
        this.rect.set('opacity', 0.1);
      }
    }

    // 还原AB的初始状态
    resetABState () {
      const top = this.rect.get('top') + this.rect.get('height') * 0.5;

      // 还原初始状态
      this.changeColourOverlappingColors(false);
      this.changeColourRect(false);
      this.changeColourAB(false);
      this.showOverlappingColors(false);

      // 如果B隐藏的 还原B的位置
      if (!this.circleLine2.get('visible')) {
        this.circleLine2.set('visible', true);
        this.circle2.set('visible', true);
        this.overlappingColors.set('visible', true);
        this.textB.set('visible', true);

        // 还原圆A的位置
        this.circleLine1.set('left', this.config.circleLine1.left).setCoords();
        this.circleLine1.set('top', top).setCoords();

        // 还原圆B的位置
        this.circleLine2.set('left', this.config.circleLine2.left).setCoords();
        this.circleLine2.set('top', top).setCoords();
      }

      // 如果A隐藏的  还原A的位置
      if (!this.circleLine1.get('visible')) {
        this.circleLine1.set('visible', true);
        this.circle1.set('visible', true);
        this.overlappingColors.set('visible', true);
        this.textA.set('visible', true);
        // 还原圆A的位置
        this.circleLine1.set('left', this.config.circleLine1.left).setCoords();
        this.circleLine1.set('top', top).setCoords();

        // 还原圆B的位置
        this.circleLine2.set('left', this.config.circleLine2.left).setCoords();
        this.circleLine2.set('top', top).setCoords();
      }

      this.circleLine1DragEvent();
      this.circleLine2DragEvent();

      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
    }

    // 按钮1点击
    buttonClickEvent1(value: boolean) {
      this.resetABState();

      this.showOverlappingColors(value);
      this.changeColourAB(value);

      this.hideFormulaImage();
      this.formulaImage[1].set('visible', value);

      this.myCanvas2.discardActiveObject();
      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
    }

    // 按钮2点击
    buttonClickEvent2(value: boolean) {
      this.resetABState();

      this.hideFormulaImage();
      this.formulaImage[0].set('visible', value);

      this.showOverlappingColors(value);
      this.myCanvas2.discardActiveObject();
      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
    }

    // 按钮3点击
    buttonClickEvent3(value: boolean) {
      this.resetABState();

      this.hideFormulaImage();
      this.formulaImage[2].set('visible', value);

      if (value) {
        this.circleLine2.set('visible', false);
        this.circle2.set('visible', false);
        this.overlappingColors.set('visible', false);
        this.textB.set('visible', false);
        // 移动圆A到中心
        this.circleLine1.set('left', this.rect.get('left') + this.rect.get('width') * 0.5).setCoords();
        this.circleLine1.set('top', this.rect.get('top') + this.rect.get('height') * 0.5).setCoords();
      } else {

        this.circleLine2.set('visible', true);
        this.circle2.set('visible', true);
        this.overlappingColors.set('visible', true);
        this.textB.set('visible', true);

        // 还原圆A的位置
        this.circleLine1.set('left', this.config.circleLine1.left).setCoords();
        this.circleLine1.set('top', this.config.circleLine1.top).setCoords();
        // 还原圆B的位置
        this.circleLine2.set('left', this.config.circleLine2.left).setCoords();
        this.circleLine2.set('top', this.config.circleLine2.top).setCoords();
      }

      this.changeColourRect(value);

      this.circleLine1DragEvent();
      this.circleLine2DragEvent();
      this.myCanvas2.discardActiveObject();
      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
    }

    // 放大圆A
    scalecircle1(scale: number) {
      this.circle1.set('radius', this.config.circle1.radius * scale);

      this.circleLine1.set('radius', this.config.circle1.radius * scale).setCoords();

      // 改变层级 小圆在上面
      if (this.circleLine1.get('radius') < this.circleLine2.get('radius')) {
        this.circleLine1.moveTo(99);
        this.circleLine2.moveTo(-1);
      } else {
        this.circleLine1.moveTo(-1);
        this.circleLine2.moveTo(99);
      }

      // 限制圆只能在rect里面放大
      this.circleLine1DragEvent();

      // 改变文字
      if (scale === 0) {
        this.textA.set('text', 'A = Φ');
        this.circleLine1.set('selectable', false);
        this.circleLine1.moveTo(-1);
        this.circleLine2.moveTo(99);
      } else {
        this.textA.set('text', 'A');
        this.circleLine1.set('selectable', true);
      }

      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
      this.myCanvas2.discardActiveObject();
    }

    // 放大圆B
    scalecircle2(scale: number) {
      // 放大圆
      this.circle2.set('radius', this.config.circle2.radius * scale);

      this.overlappingColors.set('radius', this.config.circle2.radius * scale);

      this.circleLine2.set('radius', this.config.circle2.radius * scale).setCoords();

      // 改变层级 小圆在上面
      if (this.circleLine1.get('radius') < this.circleLine2.get('radius')) {
        this.circleLine1.moveTo(99);
        this.circleLine2.moveTo(-1);
      } else {
        this.circleLine1.moveTo(-1);
        this.circleLine2.moveTo(99);
      }

      // 限制圆只能在rect里面放大
      this.circleLine2DragEvent();

      // 改变文字
      if (scale === 0) {
        this.textB.set('text', 'B = Φ');
        this.circleLine2.set('selectable', false);
        this.circleLine1.moveTo(99);
        this.circleLine2.moveTo(-1);
      } else {
        this.textB.set('text', 'B');
        this.circleLine2.set('selectable', true);
      }

      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
      this.myCanvas2.discardActiveObject();
    }

    hideFormulaImage() {
      this.formulaImage[0].set('visible', false);
      this.formulaImage[1].set('visible', false);
      this.formulaImage[2].set('visible', false);
    }

    // 重置
    reset() {
      this.resetImage(this.circleLine1, this.config.circleLine1);
      this.resetImage(this.circleLine2, this.config.circleLine2);
      this.resetImage(this.textA, this.config.textA);
      this.resetImage(this.textB, this.config.textB);
      this.resetImage(this.textU, this.config.textU);
      this.resetImage(this.formulaImage[0], this.config.formulaImage1);
      this.resetImage(this.formulaImage[1], this.config.formulaImage2);
      this.resetImage(this.formulaImage[2], this.config.formulaImage3);

      this.resetABState();

      this.hideFormulaImage();

      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
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

      this.myCanvas1.setWidth(726 * this.scale);
      this.myCanvas1.setHeight(525 * this.scale);

      this.myCanvas2.setWidth(726 * this.scale);
      this.myCanvas2.setHeight(525 * this.scale);



      let buttonAreaWidth = 260;
      if (width <= 1100 && width >= 800) {
        buttonAreaWidth = 200;
      } else if (width <= 800) {
        buttonAreaWidth = 150;
      } else {
        buttonAreaWidth = 260;
      }
      const left = (width - buttonAreaWidth) * 0.5 - (724 * this.scale * 0.5) + 'px';
      const container = document.getElementById('box1').children[0];
      (container as any).style.top = '52%';
      (container as any).style.left = left;
      (container as any).style.transform = 'translate(0, -50%)';

      const container2 = document.getElementById('box2').children[0];
      (container2 as any).style.top = '52%';
      (container2 as any).style.left = left;
      (container2 as any).style.transform = 'translate(0, -50%)';

      this.myCanvas1.setZoom(this.scale);
      this.myCanvas2.setZoom(this.scale);

      this.myCanvas1.renderAll();
      this.myCanvas2.renderAll();
    }
}

