// import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

import * as Konva from 'konva';
import {IntersectionConfig} from './IntersectionConfig';
import backgroundImage from '../sub_static/backgroundImage.png';
import xaImage from '../sub_static/xaImage.png';
import xbImage from '../sub_static/xbImage.png';

import xaFormula from '../sub_static/xaFormula.png';
import xbFormula from '../sub_static/xbFormula.png';


export class IntersectionCanvas extends SimpleKonvaTemplate {
    config: IntersectionConfig;

    // 限制圆的拖动范围
    rect: Konva.Rect;

    // 填充圆
    ellipse1: Konva.Ellipse;
    ellipse2: Konva.Ellipse;

    // 重叠部分颜色
    overlappingColors: Konva.Ellipse;

    textA: Konva.Text;
    textB: Konva.Text;

    textAB: Konva.Group;

    // 数轴
    numberAxis: Konva.Group;

    // 蓝色矩形及边框
    blueRect: Konva.Rect;
    blueRectFrame: Konva.Line;

    // 黄色矩形 及 边框
    yellowRect: Konva.Rect;
    yellowRectFrame: Konva.Line;

    // 拖动按钮
    blueButton: Konva.Group;
    yellowButton: Konva.Group;

    // 重叠处的矩形
    overlappingRect: Konva.Rect;

    //文字xa xb
    xaText: Konva.Image;
    xbText: Konva.Image;

    // xa xb 的值
    xaValueNumber: Konva.Text;
    xbValueNumber: Konva.Text;

    xaValue: Konva.Group;
    xbValue: Konva.Group;


    constructor() {
      super('box');
      this.config = new IntersectionConfig();
      this.init();
    }

    async init() {
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.animationLayer.add(background);
      this.rect = new Konva.Rect(this.config.rect as any);
      this.animationLayer.add(this.rect);

      this.initEllipse();
      this.initText();
      this.initDragEvent();

      this.initNumberAxis();
      this.initDragButton();
      await this.initXABText();
      this.initDragButtonEvent();

      this.showNumberAxis(false);

      this.animationLayer.draw();
      this.staticLayer.moveToTop();
      this.staticLayer.draw();
    }

    // 添加圆 及拖动事件
    initEllipse() {
      // 圆A
      this.ellipse1 = new Konva.Ellipse(this.config.oval as any);
      this.staticLayer.add(this.ellipse1);

      // 圆B
      this.ellipse2 = new Konva.Ellipse(this.config.oval2 as any);
      this.staticLayer.add(this.ellipse2);

      // 重叠色
      this.overlappingColors = new Konva.Ellipse(this.config.oval3 as any);
      this.animationLayer.add(this.overlappingColors);

      // 文字A
      this.textA = new Konva.Text(this.config.textA as any);
      this.staticLayer.add(this.textA);
      // 文字B
      this.textB = new Konva.Text(this.config.textB as any);
      this.staticLayer.add(this.textB);

      this.textA.x(this.ellipse1.x() - this.config.textA.fontSize / 2);
      this.textA.y(this.ellipse1.y() - this.config.textA.fontSize / 2);

      this.textB.x(this.ellipse2.x() - this.config.textB.fontSize / 2);
      this.textB.y(this.ellipse2.y() - this.config.textB.fontSize / 2);
    }

    // 添加A并B文字
    initText() {
      // 文字A
      this.textAB = new Konva.Group();
      this.textAB.visible(false);
      const textab = new Konva.Text(this.config.textAB as any);
      this.textAB.add(textab);
      const textU = new Konva.Text(this.config.textU as any);
      this.textAB.add(textU);

      this.staticLayer.add(this.textAB);
    }

    initDragEvent() {
      // 拖动圆B
      this.ellipse2.on('dragmove', (e: any) => {
        this.ellipse2DragEvent();
        this.updateText();
        this.staticLayer.draw();
        this.animationLayer.draw();
      });

      // 拖动圆A
      this.ellipse1.on('dragmove', (e: any) => {
        this.ellipse1DragEvent();
        this.updateText();
        this.staticLayer.draw();
      });
    }


    // 判断并集是否是其中一个圆，如果是重写文字
    updateText() {
      const distance = this.getDistance(this.ellipse1, this.ellipse2);
      if (this.ellipse1.radiusY() < this.ellipse2.radiusY() && this.ellipse1.radiusY() !== 0) {
        if (distance + this.ellipse1.radiusY() < this.ellipse2.radiusY()) {
          (this.textAB as any).children[0].text('A    B = A');
        } else {
          (this.textAB as any).children[0].text('A    B');
        }
      } else if (this.ellipse1.radiusY() > this.ellipse2.radiusY() && this.ellipse2.radiusY() !== 0) {
        if (distance + this.ellipse2.radiusY() < this.ellipse1.radiusY()) {
          (this.textAB as any).children[0].text('A    B = A');
        } else {
          (this.textAB as any).children[0].text('A    B');
        }
      } else if (this.ellipse1.radiusY() === 0 || this.ellipse2.radiusY() === 0) {
        (this.textAB as any).children[0].text('A    B = Φ');
      }
   }

    // 获取两点间距离
    getDistance(ellipse1: Konva.Ellipse, ellipse2: Konva.Ellipse) {
      const  distance = Math.sqrt(Math.pow((ellipse1.x() - ellipse2.x()), 2) + Math.pow((ellipse1.y() - ellipse2.y()), 2));
      return distance;
    }

    // ellipse1拖动后触发的事件
    ellipse1DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitEllipseDrag(this.ellipse1, this.rect);
      this.textA.x(this.ellipse1.x() - this.config.textA.fontSize / 2);
      this.textA.y(this.ellipse1.y() - this.config.textA.fontSize / 2);
    }

    // ellipse2拖动后触发的事件
    ellipse2DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitEllipseDrag(this.ellipse2, this.rect);

      // 改变重叠色位置
      this.overlappingColors.x(this.ellipse2.x());
      this.overlappingColors.y(this.ellipse2.y());

      this.textB.x(this.ellipse2.x() - this.config.textB.fontSize / 2);
      this.textB.y(this.ellipse2.y() - this.config.textB.fontSize / 2);
    }

    // 限制圆拖动范围
    limitEllipseDrag(ellipse: Konva.Ellipse, rect: Konva.Rect) {
      ellipse.x() < rect.x() + ellipse.radiusX()
        ? ellipse.x(rect.x() + ellipse.radiusX())
        : ellipse.x();
      ellipse.x() > rect.x() + rect.width() - ellipse.radiusX()
        ? ellipse.x(rect.x() + rect.width() - ellipse.radiusX())
        : ellipse.x();

      ellipse.y() < rect.y() + ellipse.radiusY()
        ? ellipse.y(rect.y() + ellipse.radiusY())
        : ellipse.y();

      ellipse.y() > rect.y() + rect.height() - ellipse.radiusY()
        ? ellipse.y(rect.y() + rect.height() - ellipse.radiusY())
        : ellipse.y();
    }

    // 显示重叠色
    showOverlappingColors(value: boolean) {
      if (value) {
        this.ellipse2.globalCompositeOperation( 'xor');
        this.textAB.visible(true);
      } else {
        this.ellipse2.globalCompositeOperation( '');
        this.textAB.visible(false);
      }
      this.staticLayer.draw();
    }

    // 显示隐藏韦恩图
    showWayneChart(isShow: boolean) {
      this.ellipse1.setAttr('visible', isShow);
      this.ellipse2.setAttr('visible', isShow);

      // 重叠部分颜色
      this.overlappingColors.setAttr('visible', isShow);

      this.textA.setAttr('visible', isShow);
      this.textB.setAttr('visible', isShow);

      this.textAB.setAttr('visible', isShow);

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 初始化数轴
    initNumberAxis() {
      // 添加蓝色矩形和边框
      this.blueRect = new Konva.Rect(this.config.blueRect as any);
      this.staticLayer.add(this.blueRect);

      this.blueRectFrame = new Konva.Line(this.config.blueRectFrame as any);
      this.staticLayer.add(this.blueRectFrame);

      // 添加黄色矩形和边框
      this.yellowRect = new Konva.Rect(this.config.yellowRect as any);
      this.staticLayer.add(this.yellowRect);

      this.yellowRectFrame = new Konva.Line(this.config.yellowRectFrame as any);
      this.staticLayer.add(this.yellowRectFrame);

      this.overlappingRect = new Konva.Rect(this.config.overlappingRect as any);
      this.animationLayer.add(this.overlappingRect);

      // 添加数轴
      this.numberAxis = new Konva.Group();

      const numberAxis = new Konva.Arrow(this.config.numberAxis as any);
      const zero = new Konva.Ellipse(this.config.zero as any);
      const textO = new Konva.Text(this.config.textO as any);
      this.numberAxis.add(numberAxis);
      this.numberAxis.add(zero);
      this.numberAxis.add(textO);

      this.staticLayer.add(this.numberAxis);
    }

    // 添加拖动的按钮
    initDragButton() {
      this.blueButton = new Konva.Group(this.config.blueButtonGroup as any);

      const blueButtonWhitePoint = new Konva.Ellipse(this.config.blueButtonWhitePoint as any);
      this.blueButton.add(blueButtonWhitePoint.clone());

      const blueButton = new Konva.Ellipse(this.config.blueButton as any);
      this.blueButton.add(blueButton.clone());

      this.staticLayer.add(this.blueButton);

      this.yellowButton = new Konva.Group(this.config.yellowButtonGroup as any);
      this.yellowButton.add(blueButtonWhitePoint.clone());
      this.yellowButton.add(blueButton.clone());
      this.staticLayer.add(this.yellowButton);
    }

    // 添加xa xb 及公式文字
    async initXABText() {
      // 按钮文字xa xb
      this.xaText = await this.loadImage((xaImage as any), this.config.xaText as any);
      this.staticLayer.add(this.xaText);

      this.xbText = await this.loadImage((xbImage as any), this.config.xbText as any);
      this.staticLayer.add(this.xbText);

      this.xaValue = new Konva.Group();
      this.xbValue = new Konva.Group();

      // 公式
      const xaFormulaImage = await this.loadImage((xaFormula as any), this.config.xaFormula as any);
      this.xaValue.add(xaFormulaImage);

      const xbFormulaImage = await this.loadImage((xbFormula as any), this.config.xbFormula as any);
      this.xbValue.add(xbFormulaImage);

      // 值xa xb
      const xaValue = await this.loadImage((xaImage as any), this.config.xaValue as any);
      this.xaValue.add(xaValue);

      const xbValue = await this.loadImage((xbImage as any), this.config.xbValue as any);
      this.xbValue.add(xbValue);

      // 等号
      const textEqualSign1 = new Konva.Text(this.config.textEqualSign1 as any);
      this.xaValue.add(textEqualSign1);

      const textEqualSign2 = new Konva.Text(this.config.textEqualSign2 as any);
      this.xbValue.add(textEqualSign2);

      this.staticLayer.add(this.xaValue);
      this.staticLayer.add(this.xbValue);

      // xa xb 数值
      this.xaValueNumber = new Konva.Text(this.config.xaValueNumber as any);
      this.staticLayer.add(this.xaValueNumber);

      this.xbValueNumber = new Konva.Text(this.config.xbValueNumber as any);
      this.staticLayer.add(this.xbValueNumber);
    }

    initDragButtonEvent() {
      // 拖动blueButton
      this.blueButton.on('dragmove', (e: any) => {
        // 限制按钮的拖动范围
        if (this.blueButton.getAttr('x') <= this.yellowButton.getAttr('x') + this.config.blueButton.radiusX * 2 ) {
          this.blueButton.setAttr('x', this.yellowButton.getAttr('x') + this.config.blueButton.radiusX * 2 );
        } else if (this.blueButton.getAttr('x') >= this.config.yellowRect.x + this.config.yellowRect.width) {
          this.blueButton.setAttr('x', this.config.yellowRect.x + this.config.yellowRect.width);
        }

        this.updateBlueRect(this.blueButton.getAttr('x'));
      });

      // 拖动yellowButton
      this.yellowButton.on('dragmove', (e: any) => {
        // 限制按钮的拖动范围
        if (this.yellowButton.getAttr('x') >=  this.blueButton.getAttr('x') - this.config.blueButton.radiusX * 2) {
          this.yellowButton.setAttr('x', this.blueButton.getAttr('x') - this.config.blueButton.radiusX * 2);
        } else if (this.yellowButton.getAttr('x') <= this.config.blueRect.x) {
          this.yellowButton.setAttr('x', this.config.blueRect.x);
        }

        this.updateYellowRect(this.yellowButton.getAttr('x'));
      });
    }

    //更新蓝色矩形
    updateBlueRect(x: number) {
      this.blueRect.setAttr('width', x - this.blueRect.getAttr('x'));

      this.blueRectFrame.setAttr('points',
        [ this.config.width * 0.15, this.config.height * 0.412,
              x, this.config.height * 0.412,
              x, this.config.height * 0.590]);

      // 更新xb位置
      this.xbText.setAttr('x', x - this.config.blueButton.radiusX);

      const xb = (this.blueButton.x() - this.config.width * 0.15)
        / ((this.config.width * 0.817 - this.config.width * 0.15) / 20) - 10;
      this.xbValueNumber.setAttr('text', xb.toFixed(2));

      this.staticLayer.draw();
    }

    // 更新黄色矩形
    updateYellowRect(x: number) {
      this.yellowRect.setAttr('x', x);
      this.yellowRect.setAttr('width', this.config.yellowRect.x + this.config.yellowRect.width - x);
      this.overlappingRect.setAttr('x', x);
      this.overlappingRect.setAttr('width', this.config.yellowRect.x + this.config.yellowRect.width - x);

      this.yellowRectFrame.setAttr('points',
        [ this.config.width * 0.817 - 22, this.config.height * 0.487,
              x, this.config.height * 0.487,
              x, this.config.height * 0.590]);

      // 更新xa位置
      this.xaText.setAttr('x', x - this.config.blueButton.radiusX);
      const xa = (this.yellowButton.x() - this.config.width * 0.15)
        / ((this.config.width * 0.817 - this.config.width * 0.15) / 20) - 10;

      this.xaValueNumber.setAttr('text', xa.toFixed(2));

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 显示隐藏数轴
    showNumberAxis(isShow: boolean) {
      // 数轴
      this.numberAxis.setAttr('visible', isShow);

      // 蓝色矩形及边框
      this.blueRect.setAttr('visible', isShow);
      this.blueRectFrame.setAttr('visible', isShow);

      // 黄色矩形 及 边框
      this.yellowRect.setAttr('visible', isShow);
      this.yellowRectFrame.setAttr('visible', isShow);

      // 拖动按钮
      this.blueButton.setAttr('visible', isShow);
      this.yellowButton.setAttr('visible', isShow);

      // 重叠处的矩形
      this.overlappingRect.setAttr('visible', isShow);

      //文字xa xb
      this.xaText.setAttr('visible', isShow);
      this.xbText.setAttr('visible', isShow);

      // xa xb 的值
      this.xaValueNumber.setAttr('visible', isShow);
      this.xbValueNumber.setAttr('visible', isShow);

      this.xaValue.setAttr('visible', isShow);
      this.xbValue.setAttr('visible', isShow);

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置
    async reset() {
      this.resetImage(this.ellipse1, this.config.oval);
      this.resetImage(this.ellipse2, this.config.oval2);
      this.resetImage(this.overlappingColors, this.config.oval3);
      this.resetImage(this.textA, this.config.textA);
      this.resetImage(this.textB, this.config.textB);

      this.resetImage(this.blueButton, this.config.blueButtonGroup);
      this.resetImage(this.yellowButton, this.config.yellowButtonGroup);

      this.updateBlueRect(this.blueButton.getAttr('x'));
      this.updateYellowRect(this.yellowButton.getAttr('x'));

      this.xaValueNumber.setAttr('text', -3);
      this.xbValueNumber.setAttr('text', 3);
      (this.textAB as any).children[0].text('A    B');

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.setAttr('x', config.x);
      image.setAttr('y', config.y);
    }
}

