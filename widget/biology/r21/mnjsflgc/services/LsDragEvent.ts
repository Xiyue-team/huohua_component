import {LsCanvas} from './LsCanvas';

import * as Konva from 'konva';
import {LsConfig} from './LsConfig';
import { Linear, TweenMax } from 'gsap';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class LsDragEvent {

  private dmCanvas: LsCanvas;
  private dmConfig: LsConfig;

  constructor(dmCanvas: LsCanvas) {
        this.dmCanvas = dmCanvas;
        this.dmConfig = new LsConfig();
    }

  // 绑定拖动事件
  chromosomeDragMove(image: Konva.Image, frame1: Konva.Image, frame2: Konva.Image, frame3: Konva.Image, config: any) {
    // image：  拖动对象
    // frame1： 目标地点1
    // frame2： 目标地点2
    // frame3：  目标地点3
    // config： 拖动对象的config


    image.on('dragstart', (e: any) => {
      this.dmCanvas.staticLayer.draw();
    });

    image.on('dragend', (e: any) => {
      const targetRect = e.target.getClientRect();

      if (this.hitBox(frame1.getClientRect(), targetRect)) {
        console.log('进入2');
      } else {
        console.log('出去2');

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

  // 拖动错误
  draggableFalse(image: Konva.Image, config: any) {
    // image: 拖动对象
    // config: 拖动对象的配置文件
    // 事件
    image.x(config.x);
    image.y(config.y);
    // image.opacity(0);
  }

  // 判断是否碰撞
  hitBox( source: any, target: any ) {
    /* 源物体和目标物体都包含 x, y 以及 width, height */
    return !(
      ( ( source.y + source.height ) < ( target.y ) ) ||
      ( source.y > ( target.y + target.height ) ) ||
      ( ( source.x + source.width ) < target.x ) ||
      ( source.x > ( target.x + target.width ) )
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


  // 绑定拖动旋转事件
  rotateImage(image: any) {
    let lastPointX: number;
    let lastPointY: number;
    let currentPointX: number;
    let currentPointY: number;

    image.on('mousedown touchstart', () => {
      lastPointX = this.getMousePos().x;
      lastPointY = this.getMousePos().y;
    });

    // image.on('mouseup touchstart', () => {
    //   lastPointX = this.getMousePos().x;
    //   lastPointY = this.getMousePos().y;
    // });
    const controlPoint = {
      x: image.x() + 0.5 * image.width(),
      y: image.y() + 0.5 * image.height(),
    };

    image.on('dragmove touchmove', (e: any) => {

      currentPointX = this.getMousePos().y;
      currentPointY = this.getMousePos().y;

      // 获取旋转角度
      const angle = ThreeUtil.getAngle(controlPoint, lastPointX, lastPointY, currentPointX, currentPointY);

      image.rotate( 10 );

      lastPointX = currentPointX;
      lastPointY = currentPointY;

      this.dmCanvas.staticLayer.draw();
    });
  }




  //获取鼠标当前坐标
  getMousePos() {
    const mousePos = this.dmCanvas.stage.getPointerPosition();
    return {
      x: mousePos.x,
      y: mousePos.y
    };
  }
}

