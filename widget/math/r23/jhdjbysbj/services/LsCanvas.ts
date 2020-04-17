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

    textAB: Konva.Group;

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

      // 圆A的线
      this.ellipseLine1 = new Konva.Ellipse(this.config.oval4 as any);
      this.staticLayer.add(this.ellipseLine1);

      // 圆B的线
      this.ellipseLine2 = new Konva.Ellipse(this.config.oval5 as any);
      this.staticLayer.add(this.ellipseLine2);
    }

    // 添加A并B文字
    initText() {
      // 文字A
      this.textAB = new Konva.Group();
      this.textAB.visible(false);
      const textab = new Konva.Text(this.config.textAB as any);
      this.textAB.add(textab);

      if ((window as any)['env'].browserInfo.isPc) {
        this.config.textU.x = window.innerWidth * 0.412;
      }

      const textU = new Konva.Text(this.config.textU as any);
      this.textAB.add(textU);


      this.staticLayer.add(this.textAB);
    }

    initDragEvent() {
      // 拖动圆B
      this.ellipseLine2.on('dragmove', (e: any) => {
        this.ellipseLine2DragEvent();
        this.staticLayer.draw();
        this.animationLayer.draw();

        this.updateText();
      });

      // 拖动圆A
      this.ellipseLine1.on('dragmove', (e: any) => {
        this.ellipseLine1DragEvent();
        this.staticLayer.draw();

        this.updateText();
      });
    }

    // 判断并集是否是其中一个圆，如果是重写文字
    updateText() {
      const distance = this.getDistance(this.ellipseLine1, this.ellipseLine2);
      if (this.ellipseLine1.radiusY() < this.ellipseLine2.radiusY() && this.ellipseLine1.radiusY() !== 0) {
        if (distance + this.ellipseLine1.radiusY() < this.ellipseLine2.radiusY()) {
          (this.textAB as any).children[0].text('A    B = B');
        } else {
          (this.textAB as any).children[0].text('A    B');
        }
      } else if (this.ellipseLine1.radiusY() > this.ellipseLine2.radiusY() && this.ellipseLine2.radiusY() !== 0) {
        if (distance + this.ellipseLine2.radiusY() < this.ellipseLine1.radiusY()) {
          (this.textAB as any).children[0].text('A    B = A');
        } else {
          (this.textAB as any).children[0].text('A    B');
        }
      } else if (this.ellipseLine1.radiusY() === 0 && this.ellipseLine2.radiusY() === 0) {
        (this.textAB as any).children[0].text('A    B = Φ');
      } else if (this.ellipseLine1.radiusY() === 0) {
        (this.textAB as any).children[0].text('A    B = B');
      } else if (this.ellipseLine2.radiusY() === 0) {
        (this.textAB as any).children[0].text('A    B = A');
      }

    }

    // 获取两点间距离
    getDistance(ellipse1: Konva.Ellipse, ellipse2: Konva.Ellipse) {
      const  distance = Math.sqrt(Math.pow((ellipse1.x() - ellipse2.x()), 2) + Math.pow((ellipse1.y() - ellipse2.y()), 2));
      return distance;
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
      this.ellipse1.radiusX(this.config.oval.radiusX * scale);
      this.ellipse1.radiusY(this.config.oval.radiusY * scale);

      this.ellipseLine1.radiusX(this.config.oval.radiusX * scale);
      this.ellipseLine1.radiusY(this.config.oval.radiusY * scale);

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
        // (this.textAB as any).children[0].text('A    B = B');
      } else {
        this.textA.text('A');
        // (this.textAB as any).children[0].text('A    B');
      }

      // 重写文字A并B
      this.updateText();

      this.staticLayer.draw();
    }

    // 放大圆B
    scaleEllipse2(scale: number) {
      // 放大圆
      this.ellipse2.radiusX(this.config.oval2.radiusX * scale);
      this.ellipse2.radiusY(this.config.oval2.radiusY * scale);

      this.overlappingColors.radiusX(this.config.oval2.radiusX * scale);
      this.overlappingColors.radiusY(this.config.oval2.radiusY * scale);

      this.ellipseLine2.radiusX(this.config.oval2.radiusX * scale);
      this.ellipseLine2.radiusY(this.config.oval2.radiusY * scale);

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
        // (this.textAB as any).children[0].text('A    B = A');
      } else {
        this.textB.text('B');
        // (this.textAB as any).children[0].text('A    B');
      }

      // 重写文字A并B
      this.updateText();

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 显示重叠色
    showOverlappingColors(value: boolean) {
      if (value) {
        this.ellipse2.globalCompositeOperation( 'xor');
        this.ellipse2.fill('#FFD621');
        this.ellipse1.fill('#FFD621');
        this.textA.fill('#000000');
        this.textB.fill('#000000');
        this.textAB.visible(true);
      } else {
        this.ellipse2.globalCompositeOperation( '');
        this.ellipse2.fill('#2d2d2d');
        this.ellipse1.fill('#2d2d2d');
        this.textA.fill('#ffffff');
        this.textB.fill('#ffffff');
        this.textAB.visible(false);
      }

      this.staticLayer.draw();
    }

    // 重置
    async reset() {

      this.resetImage(this.ellipse1, this.config.oval);
      this.resetImage(this.ellipse2, this.config.oval2);
      this.resetImage(this.overlappingColors, this.config.oval3);
      this.resetImage(this.ellipseLine1, this.config.oval4);
      this.resetImage(this.ellipseLine2, this.config.oval5);
      this.resetImage(this.textA, this.config.textA);
      this.resetImage(this.textB, this.config.textB);

      (this.textAB as any).children[0].text('A    B');

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.x(config.x);
      image.y(config.y);
    }
}

