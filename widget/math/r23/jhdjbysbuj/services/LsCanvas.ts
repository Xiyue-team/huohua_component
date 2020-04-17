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

    // 圆线条
    ellipseLine1: Konva.Ellipse;

    textA: Konva.Text;

    textU: Konva.Text;
    textCuA: Konva.Group;

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
      const rectBorder = new Konva.Rect(this.config.rectBorder as any);
      this.animationLayer.add(rectBorder);

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

      // 文字A
      this.textA = new Konva.Text(this.config.textA as any);
      this.staticLayer.add(this.textA);

      // 圆A的线
      this.ellipseLine1 = new Konva.Ellipse(this.config.oval4 as any);
      this.staticLayer.add(this.ellipseLine1);
    }

    initText() {
      this.textU = new Konva.Text(this.config.textU as any);
      this.staticLayer.add(this.textU);

      this.textCuA = new Konva.Group();
      const textCA = new Konva.Text(this.config.textCA as any);
      this.textCuA.add(textCA);

      const textu = new Konva.Text(this.config.textu as any);
      this.textCuA.add(textu);
      this.textCuA.visible(false);
      this.staticLayer.add(this.textCuA);
    }

    initDragEvent() {
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
      this.ellipse1.x(this.ellipseLine1.x());
      this.ellipse1.y(this.ellipseLine1.y());

      this.textA.x(this.ellipseLine1.x() - this.config.textA.fontSize / 2);
      this.textA.y(this.ellipseLine1.y() - this.config.textA.fontSize / 2);
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

      // 限制圆只能在rect里面放大
      this.ellipseLine1DragEvent();

      // 改变文字
      if (scale === 0) {
        this.textA.text('A = Φ');
        (this.textCuA as any).children[0].text('C   A = U');
        if (this.rect.opacity() === 1) {
          this.textA.fill('#000000');
        } else {
          this.textA.fill('#ffffff');
        }
      } else {
        this.textA.text('A');
        this.textA.fill('#ffffff');
        (this.textCuA as any).children[0].text('C   A');
      }

      this.staticLayer.draw();
    }

    // 显示重叠色
    showOverlappingColors(value: boolean) {

      if (value) {
        this.rect.fill('#FFD621');
        this.textU.fill('#000000');
        this.rect.opacity(1);
        this.textCuA.visible(true);
        if (this.ellipseLine1.radiusY() === 0) {
          this.textA.fill('#000000');
        }
      } else {
        this.rect.fill('#ffffff');
        this.textU.fill('#ffffff');
        this.rect.opacity(0.1);
        this.textCuA.visible(false);
        if (this.ellipseLine1.radiusY() === 0) {
          this.textA.fill('#ffffff');
        }
      }

      this.animationLayer.draw();
      this.staticLayer.draw();
    }

    // 重置
    async reset() {

      // 重置圆的位置
      this.resetImage(this.ellipse1, this.config.oval);
      this.resetImage(this.ellipseLine1, this.config.oval4);
      this.resetImage(this.textA, this.config.textA);

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.x(config.x);
      image.y(config.y);
    }
}

