import {LsCanvas} from './LsCanvas';

import * as Konva from 'konva';
import {LsConfig} from './LsConfig';
import { Linear, TweenMax } from 'gsap';

export class LsDragEvent {

  private dmCanvas: LsCanvas;
  private dmConfig: LsConfig;

  constructor(dmCanvas: LsCanvas) {
        this.dmCanvas = dmCanvas;
        this.dmConfig = new LsConfig();
    }

  // 植物绑定拖动事件
  plantsDragMove(image: Konva.Image, frame1: Konva.Image, frame2: Konva.Image, config: any, image2: Konva.Image, imageIcon: Konva.Image) {
    // image：  拖动对象
    // frame1： 目标地点1
    // frame2： 目标地点2
    // config： 拖动对象的config
    // image2： 互斥对象
    // imageIcon: 小图标

    image.on('dragstart', (e: any) => {
      image.moveToTop();
      // 改变中心点坐标为图片中心
      image.offset({
        x: image.width() / 2,
        y: image.height() / 2
      });
      image.opacity(1);
      const shape = e.target;
      shape.setAttrs({
        scale: {
          x: frame1.width() / image.width(),
          y: frame1.height() / image.height()
        }
      });

      // 显示虚线框
      this.dmCanvas.rectLeft.visible(true);
      this.dmCanvas.rectRight.visible(true);

      // 隐藏提示
      this.dmCanvas.tipsTop.visible(false);

      this.dmCanvas.staticLayer.draw();
    });

    image.on('dragend', (e: any) => {
      if (image.x() === frame1.x()) {
        return;
      }
      // 还原中心点坐标为左上角
      image.offset({
        x: 0,
        y: 0
      });

      const targetRect = e.target.getClientRect();

      if (this.haveIntersection(frame1.getClientRect(), targetRect) && image2.x() !== frame1.x()) {
        // 拖拽正确 拖到左侧框
        this.plantsDraggableTrue(image, frame1, imageIcon);
        console.log('进入1');
      } else if (this.haveIntersection(frame2.getClientRect(), targetRect) && image2.x() !== frame2.x() ) {
        // 拖拽正确 拖到右侧框
        this.plantsDraggableTrue(image, frame2, imageIcon);
        console.log('进入2', this.haveIntersection(frame2.getClientRect(), targetRect));
      } else {
        // 拖拽错误
        this.draggableFalse(image, config, e);
      }

      // 隐藏虚线框
      this.dmCanvas.rectLeft.visible(false);
      this.dmCanvas.rectRight.visible(false);

      this.dmCanvas.staticLayer.draw();
    });

    image.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    image.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
  }

  // 植物拖动正确
  plantsDraggableTrue(image: Konva.Image, frame: Konva.Image, imageIcon: Konva.Image) {
    // 拖拽正确 拖到左侧框
    image.draggable(false);
    image.x(frame.x());
    image.y(frame.y());
    this.dmCanvas.plasticBagIconImage.opacity(1);
    // 出现第一个可拖动的塑料袋
    if (this.dmCanvas.plasticBagOpening[1].x() !== this.dmCanvas.plasticBagSealUpImage[0].x()
      && this.dmCanvas.plasticBagOpening[1].x() !== this.dmCanvas.plasticBagSealUpImage[1].x()) {
      this.dmCanvas.plasticBagOpening[1].visible(true);
    }

    imageIcon.opacity(0.4);
  }

  // 塑料袋绑定拖动事件
  plasticBagDragMove(image: Konva.Image, frame1: Konva.Image, frame2: Konva.Image, config: any, image2: Konva.Image) {
    // image：  拖动对象
    // frame1： 目标地点1
    // frame2： 目标地点2
    // config： 拖动对象的config
    // image2： 互斥对象

    image.on('dragstart', (e: any) => {
      image.moveToTop();
      // 改变中心点坐标为图片中心
      image.offset({
        x: image.width() / 2,
        y: image.height() / 2
      });
      image.opacity(1);
      const shape = e.target;
      shape.setAttrs({
        scale: {
          x: frame1.width() / image.width(),
          y: frame1.height() / image.height()
        }
      });

      this.dmCanvas.staticLayer.draw();
    });

    image.on('dragend', (e: any) => {
      if (image.x() === frame1.x() || image.x() === frame2.x()) {
        return;
      }
      // 还原中心点坐标为左上角
      image.offset({
        x: 0,
        y: 0
      });

      const targetRect = e.target.getClientRect();
      const frame1Boolean = this.haveIntersection(frame1.getClientRect(), targetRect);
      const image2XBoolean1 = image2.x() !== frame1.x();
      const greenPlantsImageX1 = this.dmCanvas.greenPlantsImage.x() === this.dmCanvas.rectLeft.x();
      const yellowPlantsImageX1 = this.dmCanvas.yellowPlantsImage.x() === this.dmCanvas.rectLeft.x();

      const frame2Boolean = this.haveIntersection(frame2.getClientRect(), targetRect);
      const image2XBoolean2 = image2.x() !== frame2.x();
      const greenPlantsImageX2 = this.dmCanvas.greenPlantsImage.x() === this.dmCanvas.rectRight.x();
      const yellowPlantsImageX2 = this.dmCanvas.yellowPlantsImage.x() === this.dmCanvas.rectRight.x();

      if (frame1Boolean && image2XBoolean1 && (greenPlantsImageX1 || yellowPlantsImageX1)) {
        // 拖拽正确 拖到左侧框
        this.plasticBagDraggableTrue(image, frame1, image2, frame2);
      } else if (frame2Boolean && image2XBoolean2 && (greenPlantsImageX2 || yellowPlantsImageX2)) {
        // 拖拽正确 拖到右侧框
        this.plasticBagDraggableTrue(image, frame2, image2, frame1);
      } else {
        // 拖拽错误
        this.draggableFalse(image, config, e);
      }

      this.dmCanvas.staticLayer.draw();
    });

    image.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    image.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
  }

  // 塑料袋拖动正确
  plasticBagDraggableTrue(image: Konva.Image, frame: Konva.Image, image2: Konva.Image, frame2: Konva.Image) {
    // 设置图片不可再拖动 和坐标
    image.draggable(false);
    image.x(frame.x());
    image.y(frame.y());
    if (image2.x() !== frame2.x() && image2.x() !== frame.x()) {
      // 判断图片2 是否已经拖动完 拖完不显示
      image2.visible(true);
    }
    // 设置绳子图标为可拖动
    this.dmCanvas.ropeIconImage.opacity(1);
    // 出现第一个可拖动的绳子
    if (this.dmCanvas.ropeImage[1].x() !== this.dmCanvas.ropeRect[0].x()
      && this.dmCanvas.ropeImage[1].x() !== this.dmCanvas.ropeRect[1].x()) {
      this.dmCanvas.ropeImage[1].visible(true);
    }

    // 拖完两个塑料袋后  设置塑料袋图标为不可拖动状态
    if (image2.x() === frame2.x() || image2.x() === frame.width()) {
      this.dmCanvas.plasticBagIconImage.opacity(0.4);
    }
  }

  // 绳子绑定拖动事件
  ropeDragMove(image: Konva.Image, frame1: Konva.Image, frame2: Konva.Image, config: any, image2: Konva.Image, image3: Array<Konva.Image>) {
    // image：  拖动对象
    // frame1： 目标地点1
    // frame2： 目标地点2
    // config： 拖动对象的config
    // image2： 互斥对象
    // image3： 显示的密封塑料袋
    // showButton: 显示按钮

    image.on('dragstart', (e: any) => {
      image.moveToTop();
      // 改变中心点坐标为图片中心
      image.offset({
        x: image.width() / 2,
        y: image.height() / 2
      });
      image.opacity(1);
      const shape = e.target;
      shape.setAttrs({
        scale: {
          x: frame1.width() / image.width(),
          y: frame1.height() / image.height()
        }
      });

      this.dmCanvas.staticLayer.draw();
    });

    image.on('dragend', (e: any) => {
      if (image.x() === frame1.x() || image.x() === frame2.x()) {
        return;
      }
      // 还原中心点坐标为左上角
      image.offset({
        x: 0,
        y: 0
      });

      const targetRect = e.target.getClientRect();

      const frame1GetClientRect = this.haveIntersection(frame1.getClientRect(), targetRect);
      const image2X1 = image2.x() !== frame1.x();
      const plasticBagOpening0 = this.dmCanvas.plasticBagOpening[0].x() === this.dmCanvas.plasticBagSealUpImage[0].x();
      const plasticBagOpening1 = this.dmCanvas.plasticBagOpening[1].x() === this.dmCanvas.plasticBagSealUpImage[0].x();

      const frame2GetClientRect = this.haveIntersection(frame2.getClientRect(), targetRect);
      const image2X2 = image2.x() !== frame2.x();
      const plasticBagOpening2 = this.dmCanvas.plasticBagOpening[0].x() === this.dmCanvas.plasticBagSealUpImage[1].x();
      const plasticBagOpening3 = this.dmCanvas.plasticBagOpening[1].x() === this.dmCanvas.plasticBagSealUpImage[1].x();

      if (frame1GetClientRect && image2X1 && (plasticBagOpening0 || plasticBagOpening1)) {
        // 拖拽正确 拖到左侧框
        this.ropeDraggableTrue(image, frame1, image2, image3[0], frame2);
      } else if (frame2GetClientRect && image2X2 && (plasticBagOpening2 || plasticBagOpening3)) {
        // 拖拽正确 拖到右侧框
        this.ropeDraggableTrue(image, frame2, image2, image3[1], frame1);
      } else {
        // 拖拽错误
        this.draggableFalse(image, config, e);
      }

      this.dmCanvas.staticLayer.draw();
    });

    image.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    image.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
  }

  // 绳子拖动正确
  ropeDraggableTrue(image: Konva.Image, frame: Konva.Image, image2: Konva.Image, image3: Konva.Image, frame2: Konva.Image) {
    // 隐藏绳子
    image.draggable(false);
    image.visible(false);
    image.x(frame.x());
    image.y(frame.y());

    // 显示另一个绳子可拖动
    if (image2.x() !== frame2.x() && image2.x() !== frame.x()) {
      image2.visible(true);
    }

    // 显示密封塑料袋
    image3.visible(true);
    image3.moveToTop();
    if (this.dmCanvas.plasticBagOpening[0].x() === image3.x()) {
      // 隐藏开口塑料袋
      this.dmCanvas.plasticBagOpening[0].visible(false);
    } else if (this.dmCanvas.plasticBagOpening[1].x() === image3.x()) {
      // 隐藏开口塑料袋
      this.dmCanvas.plasticBagOpening[1].visible(false);
    }

    // 设置绳子图标为不可拖动
    if (image2.x() === frame.x() || image2.x() === frame2.x()) {
      this.dmCanvas.ropeIconImage.opacity(0.4);
    }

    if (this.dmCanvas.plasticBagSealUpImage[0] === image3) {
      // 显示按钮
      (window as any).viewHandler.viewModel.$data.showButtonLeft = true;
    } else if (this.dmCanvas.plasticBagSealUpImage[1] === image3) {
      // 显示按钮
      (window as any).viewHandler.viewModel.$data.showButtonRight = true;
    }

    // 显示提示文字  (修改了需求暂时不需要这个文字了，防止以后需要暂时留着代码)
    this.dmCanvas.tipsBottom.visible(false);
  }

  // 拖动错误
  draggableFalse(image: Konva.Image, config: any, evt: any) {
    // image: 拖动对象
    // config: 拖动对象的配置文件
    // 事件
    image.x(config.x);
    image.y(config.y);
    image.opacity(0);
    const shape = evt.target;
    shape.setAttrs({
      scale: {
        x: 1,
        y: 1
      }
    });
  }

  // 判断是否碰撞
  haveIntersection(r1: any, r2: any) {

      console.log(r2.x > r1.x + r1.width * 0.9, r2.x + r2.width * 0.9 < r1.x, r2.y > r1.y + r1.height * 0.9, r2.y + r2.height * 0.9 < r1.y);
      return !(
          r2.x > r1.x + r1.width * 0.9 ||
          r2.x < r1.x ||
          r2.y > r1.y + r1.height * 0.9 ||
          r2.y + r2.height * 0.9 < r1.y
      );
  }

  addAnimation(image1: Konva.Image, image2: Konva.Image) {
    const tween = {
      opacity: 0
    };

    return TweenMax.to(tween, 3, {
      opacity: 1,
      onStart: () => {
        image1.moveToTop();
        image2.moveToTop();
        image1.visible(true);
        image2.visible(true);
      },
      onUpdate: () => {
        image1.opacity(tween.opacity);
        image2.opacity(tween.opacity);
        this.dmCanvas.staticLayer.draw();
      },
      onComplete: () => {

      },
      paused: true,
      ease:  Linear.easeIn,
    });
  }
}

