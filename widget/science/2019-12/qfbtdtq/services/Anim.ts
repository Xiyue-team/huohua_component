import { Linear, TweenMax } from 'gsap';
import { fabric } from 'fabric';
import {MyConfig} from './MyConfig';

export class Anim {

  myCanvas: fabric.Canvas;
  config: MyConfig;

  constructor(canvas: fabric.Canvas, config: MyConfig) {

    this.myCanvas = canvas;
    this.config = config;
  }

  // 碰撞之后的反应
  collisionEvent(element: fabric.Image, rect: fabric.Rect) {
    element.set('left', rect.left).setCoords();
    element.set('top', rect.top).setCoords();
    const tween = {
      scale: this.config.imgScale * 0.5
    };
    TweenMax.to(tween, 0.2, {
      scale: 0.5,
      onStart: () => {
      },
      onUpdate: () => {
        element.set('scaleX', tween.scale).setCoords();
        element.set('scaleY', tween.scale).setCoords();
        this.myCanvas.renderAll();
      },

      onComplete: () => {
      },
      ease: Linear.easeNone
    });
  }

  // 碰撞错误的反应
  collisionFalseEvent(element: fabric.Image, config: any, rightRect: fabric.Rect) {
    const tween = {
      left: element.get('left'),
      top: element.get('top'),
      scale: element.get('scaleX')
    };
    TweenMax.to(tween, 0.3, {
      left: rightRect.get('left') +  config.left + 232 * 0.5 * this.config.imgScale,
      top: rightRect.get('top') + config.top + 200 * 0.5 * this.config.imgScale,
      scale: this.config.imgScale * 0.5,
      onStart: () => {
      },
      onUpdate: () => {
        element.set('left', tween.left).setCoords();
        element.set('top', tween.top).setCoords();

        element.set('scaleX', tween.scale).setCoords();
        element.set('scaleY', tween.scale).setCoords();
        this.myCanvas.renderAll();
      },

      onComplete: () => {
        element.set('selectable', true).setCoords();
      },
      // paused: true,
      ease: Linear.easeNone
    });
  }

  // 查看答案触发的动画
  clickAnimFalse(errorTips: fabric.Group, falseImage: fabric.Image, trueImage: fabric.Image) {
    const tween = {
      scale: 1,
      width: errorTips.width,
      width2: falseImage.width,
    };
    const anim1 = TweenMax.to(tween, 1, {
      scale: 0.1,
      width: 0,
      width2: 0,
      onUpdate: () => {
        const rect = new fabric.Rect({
          width: tween.width,
          height: errorTips.height,
          fill: ''
        });

        errorTips.set('clipTo', (ctx: any) => {
          rect._render(ctx);
        });

        const rect2 = new fabric.Rect({
          width: tween.width2,
          height: falseImage.height,
          fill: ''
        });

        falseImage.set('clipTo', (ctx: any) => {
          rect2._render(ctx);
        });

        this.myCanvas.renderAll();
      },
      onComplete: () => {
        anim2.play();
        errorTips.set('visible', false);
        falseImage.set('visible', false);
        trueImage.set('visible', true);
      },
      ease: Linear.easeNone
    });

    const tween2 = {
      width: 0,
    };
    const anim2 = TweenMax.to(tween2, 1, {
      width: trueImage.width,
      onUpdate: () => {
        const rect = new fabric.Rect({
          width: tween2.width,
          height: trueImage.height,
          fill: '#000000'
        });

        trueImage.set('clipTo', (ctx: any) => {
          rect._render(ctx);
        });

        this.myCanvas.renderAll();
      },
      onComplete: () => {

      },
      paused: true,
      ease: Linear.easeNone
    });

    return [anim1, anim2];
  }

}
