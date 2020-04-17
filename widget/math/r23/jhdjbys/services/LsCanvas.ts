import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import * as Konva from 'konva';
import {LsConfig} from './LsConfig';
import backgroundImage from '../sub_static/backgroundImage.png';

export class LsCanvas extends SimpleKonvaTemplate {
    config: LsConfig;

    // 限制圆的拖动范围
    rect: Konva.Rect;

    // 填充圆
    ellipse1: Konva.Ellipse;
    ellipse2: Konva.Ellipse;

    // 重叠部分颜色
    overlappingColors: Konva.Ellipse;

    // 圆线条
    ellipseLine1: Konva.Ellipse;
    ellipseLine2: Konva.Ellipse;

    textA: Konva.Text;
    textB: Konva.Text;

    textU: Konva.Text;

    constructor() {
      super('box');
      this.config = new LsConfig();
      this.init();
    }

    async init() {
      // 背景
      const background = await this.loadImage((backgroundImage as any), this.config.backgroundImage as any);
      this.animationLayer.add(background);
      // 圆的拖动范围
      this.rect = new Konva.Rect(this.config.rect as any);
      this.animationLayer.add(this.rect);

      this.initEllipse();
      this.initText();
      this.initDragEvent();
      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // 添加圆 及拖动事件
    initEllipse() {
      // 圆A
      this.ellipse1 = new Konva.Ellipse(this.config.ellipse1 as any);
      this.staticLayer.add(this.ellipse1);

      // 圆B
      this.ellipse2 = new Konva.Ellipse(this.config.ellipse2 as any);
      this.staticLayer.add(this.ellipse2);

      // 重叠色
      this.overlappingColors = new Konva.Ellipse(this.config.overlappingColors as any);
      this.animationLayer.add(this.overlappingColors);

      // 文字A
      this.textA = new Konva.Text(this.config.textA as any);
      this.staticLayer.add(this.textA);
      // 文字B
      this.textB = new Konva.Text(this.config.textB as any);
      this.staticLayer.add(this.textB);

      // 圆A的线
      this.ellipseLine1 = new Konva.Ellipse(this.config.ellipseLine1 as any);
      this.staticLayer.add(this.ellipseLine1);

      // 圆B的线
      this.ellipseLine2 = new Konva.Ellipse(this.config.ellipseLine2 as any);
      this.staticLayer.add(this.ellipseLine2);

      this.textA.setAttr('x', this.ellipseLine1.x() - this.config.textA.fontSize / 2);
      this.textA.setAttr('y', this.ellipseLine1.y() - this.config.textA.fontSize / 2);

      this.textB.setAttr('x', this.ellipseLine2.x() - this.config.textB.fontSize / 2);
      this.textB.setAttr('y', this.ellipseLine2.y() - this.config.textB.fontSize / 2);
    }

    initText() {
      this.textU = new Konva.Text(this.config.textU as any);
      this.staticLayer.add(this.textU);
    }

    initDragEvent() {
      // 拖动圆B
      this.ellipseLine2.on('dragmove', (e: any) => {
        this.ellipseLine2DragEvent();
        this.staticLayer.draw();
        this.animationLayer.draw();
      });

      // 拖动圆A
      this.ellipseLine1.on('dragmove', (e: any) => {
        this.ellipseLine1DragEvent();
        this.staticLayer.draw();
      });
    }

    // ellipseLine1拖动后触发的事件
    ellipseLine1DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitEllipseDrag(this.ellipseLine1, this.rect);

      // 改变实际圆A位置
      this.ellipse1.setAttr('x', this.ellipseLine1.x());
      this.ellipse1.setAttr('y', this.ellipseLine1.y());

      this.textA.setAttr('x', this.ellipseLine1.x() - this.config.textA.fontSize / 2);
      this.textA.setAttr('y', this.ellipseLine1.y() - this.config.textA.fontSize / 2);
    }

    // ellipseLine2拖动后触发的事件
    ellipseLine2DragEvent() {
      // 限制圆只能在rect内拖动
      this.limitEllipseDrag(this.ellipseLine2, this.rect);

      // 改变实际圆B位置
      this.ellipse2.setAttr('x', this.ellipseLine2.x());
      this.ellipse2.setAttr('y', this.ellipseLine2.y());

      // 改变重叠色位置
      this.overlappingColors.setAttr('x', this.ellipseLine2.x());
      this.overlappingColors.setAttr('y', this.ellipseLine2.y());

      this.textB.setAttr('x', this.ellipseLine2.x() - this.config.textB.fontSize / 2);
      this.textB.setAttr('y', this.ellipseLine2.y() - this.config.textB.fontSize / 2);
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

    // 放大圆A
    scaleEllipse1(scale: number) {
      this.ellipse1.radiusX(this.config.ellipse1.radiusX * scale);
      this.ellipse1.radiusY(this.config.ellipse1.radiusY * scale);

      this.ellipseLine1.radiusX(this.config.ellipse1.radiusX * scale);
      this.ellipseLine1.radiusY(this.config.ellipse1.radiusY * scale);

      // 改变层级 小圆在上面
      if (this.ellipseLine1.radiusX() > this.ellipseLine2.radiusX()) {
        this.ellipseLine2.moveToTop();
      } else {
        this.ellipseLine1.moveToTop();
      }

      // 限制圆只能在rect里面放大
      this.ellipseLine1DragEvent();

      // 改变文字
      if (scale === 0) {
        this.textA.text('A = Φ');
      } else {
        this.textA.text('A');
      }

      this.staticLayer.draw();
    }

    // 放大圆B
    scaleEllipse2(scale: number) {
      // 放大圆
      this.ellipse2.radiusX(this.config.ellipse2.radiusX * scale);
      this.ellipse2.radiusY(this.config.ellipse2.radiusY * scale);

      this.overlappingColors.radiusX(this.config.ellipse2.radiusX * scale);
      this.overlappingColors.radiusY(this.config.ellipse2.radiusY * scale);

      this.ellipseLine2.radiusX(this.config.ellipse2.radiusX * scale);
      this.ellipseLine2.radiusY(this.config.ellipse2.radiusY * scale);

      // 改变层级 小圆在上面
      if (this.ellipseLine1.radiusX() < this.ellipseLine2.radiusX()) {
        this.ellipseLine1.moveToTop();
      } else {
        this.ellipseLine2.moveToTop();
      }

      // 限制圆只能在rect里面放大
      this.ellipseLine2DragEvent();

      // 改变文字
      if (scale === 0) {
        this.textB.text('B = Φ');
      } else {
        this.textB.text('B');
      }

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 左1按钮点击
    buttonClickEvent1(value: boolean) {
      this.resetABState();

      this.showOverlappingColors(value);
      this.changeColourAB(value);

      this.staticLayer.draw();
    }

    // 左2按钮点击
    buttonClickEvent2(value: boolean) {
      this.resetABState();

      if (value) {
        this.ellipseLine2.visible(false);
        this.ellipse2.visible(false);
        this.overlappingColors.visible(false);
        this.textB.visible(false);
        // 移动圆A到中心
        this.ellipseLine1.x(this.rect.x() + this.rect.width() / 2);
        this.ellipseLine1.y(this.rect.y() + this.rect.height() / 2);
      } else {
        this.ellipseLine2.visible(true);
        this.ellipse2.visible(true);
        this.overlappingColors.visible(true);
        this.textB.visible(true);
        // 还原圆A的位置
        this.ellipseLine1.x(this.config.ellipseLine1.x);
        this.ellipseLine1.y(this.config.ellipseLine1.y);
        // 还原圆B的位置
        this.ellipseLine2.x(this.config.ellipseLine2.x);
        this.ellipseLine2.y(this.config.ellipseLine2.y);
      }

      this.changeColourRect(value);

      this.ellipseLine1DragEvent();
      this.ellipseLine2DragEvent();
      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // 左3按钮点击
    buttonClickEvent3(value: boolean) {
      this.resetABState();

      this.showOverlappingColors(value);
      this.changeColourAB(value);
      this.changeColourRect(value);

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 左4按钮点击
    buttonClickEvent4(value: boolean) {
      this.resetABState();

      this.changeColourRect(value);

      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // 右1按钮点击
    buttonClickEvent5(value: boolean) {
      this.resetABState();

      this.showOverlappingColors(value);
      this.staticLayer.draw();
    }

    // 右2按钮点击
    buttonClickEvent6(value: boolean) {
      this.resetABState();

      if (value) {
        this.ellipseLine1.visible(false);
        this.ellipse1.visible(false);
        this.overlappingColors.visible(false);
        this.textA.visible(false);
        // 移动圆A到中心
        this.ellipseLine2.x(this.rect.x() + this.rect.width() / 2);
        this.ellipseLine2.y(this.rect.y() + this.rect.height() / 2);
      } else {
        this.ellipseLine1.visible(true);
        this.ellipse1.visible(true);
        this.overlappingColors.visible(true);
        this.textA.visible(true);
        // 还原圆A的位置
        this.ellipseLine1.x(this.config.ellipseLine1.x);
        this.ellipseLine1.y(this.config.ellipseLine1.y);
        // 还原圆B的位置
        this.ellipseLine2.x(this.config.ellipseLine2.x);
        this.ellipseLine2.y(this.config.ellipseLine2.y);
      }

      this.changeColourRect(value);

      this.ellipseLine1DragEvent();
      this.ellipseLine2DragEvent();
      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // 右3按钮点击
    buttonClickEvent7() {
      this.resetABState();
    }

    // 右4按钮点击
    buttonClickEvent8(value: boolean) {
      this.resetABState();

      this.changeColourRect(value);
      this.changeColourAB(value);
      this.showOverlappingColors(value);
      this.changeColourOverlappingColors(value);

      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // rect和文字U变色
    changeColourRect(value: boolean) {
      if (value) {
        this.textU.fill('#000000');
        this.rect.fill('#FFD621');
        this.rect.opacity(1);
      } else {
        this.textU.fill('#ffffff');
        this.rect.fill('#ffffff');
        this.rect.opacity(0.1);
      }
    }

    // 显示重叠色
    showOverlappingColors(value: boolean) {
      if (value) {
        this.ellipse2.globalCompositeOperation( 'xor');
      } else {
        this.ellipse2.globalCompositeOperation( '');
      }
    }

    // 圆A 和 圆B 变黄色 及 文字变黑色
    changeColourAB (value: boolean) {
      if (value) {
        this.ellipse2.fill('#FFD621');
        this.ellipse1.fill('#FFD621');
        this.textA.fill('#000000');
        this.textB.fill('#000000');
      } else {
        this.ellipse2.fill('#404040');
        this.ellipse1.fill('#404040');
        this.textA.fill('#ffffff');
        this.textB.fill('#ffffff');
      }
    }

    // 改变重叠色的颜色
    changeColourOverlappingColors(value: boolean) {
      if (value) {
        this.overlappingColors.fill('#404040');
      } else {
        this.overlappingColors.fill('#FFD621');
      }
    }

    // 还原AB的初始状态
    resetABState () {
      // 还原初始状态
      this.changeColourOverlappingColors(false);
      this.changeColourRect(false);
      this.changeColourAB(false);
      this.showOverlappingColors(false);

      // 如果B隐藏的 还原B的位置
      if (!this.ellipseLine2.visible()) {
        this.ellipseLine2.visible(true);
        this.ellipse2.visible(true);
        this.overlappingColors.visible(true);
        this.textB.visible(true);
        // 还原圆A的位置
        this.ellipseLine1.x(this.config.ellipseLine1.x);
        this.ellipseLine1.y(this.config.ellipseLine1.y);
        // 还原圆B的位置
        this.ellipseLine2.x(this.config.ellipseLine2.x);
        this.ellipseLine2.y(this.config.ellipseLine2.y);
      }

      // 如果A隐藏的  还原A的位置
      if (!this.ellipseLine1.visible()) {
        this.ellipseLine1.visible(true);
        this.ellipse1.visible(true);
        this.overlappingColors.visible(true);
        this.textA.visible(true);
        // 还原圆A的位置
        this.ellipseLine1.x(this.config.ellipseLine1.x);
        this.ellipseLine1.y(this.config.ellipseLine1.y);
        // 还原圆B的位置
        this.ellipseLine2.x(this.config.ellipseLine2.x);
        this.ellipseLine2.y(this.config.ellipseLine2.y);
      }

      this.ellipseLine1DragEvent();
      this.ellipseLine2DragEvent();

      this.animationLayer.draw();
      this.staticLayer.draw();
    }


    // 重置
    reset() {
      this.resetImage(this.ellipseLine1, this.config.ellipseLine1);
      this.resetImage(this.ellipseLine2, this.config.ellipseLine2);
      this.resetImage(this.textA, this.config.textA);
      this.resetImage(this.textB, this.config.textB);

      this.resetABState();

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.setAttr('x', config.x);
      image.setAttr('y', config.y);
    }
}

