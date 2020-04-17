import { fabric } from 'fabric';
import { Linear, TweenMax } from 'gsap';

export class Helper {
  static loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
    return new Promise<fabric.Image>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const imgObj = new fabric.Image(img, imageConfig);
        resolve(imgObj);
      };
      img.src = src ;
    });
  }

  //移动位置的动画
  static moveAnimation(obj: fabric.Image, x: number, y: number, x1: number, y1: number, canvas: fabric.Canvas) {
    const tween = {
      x: x1,
      y: y1
    };

    const animation = TweenMax.to(tween, 1.5, {
      x: x,
      y: y,
      onUpdate: () => {
        obj.set('left', tween.x).setCoords();
        obj.set('top', tween.y).setCoords();
        canvas.renderAll();

      },
      onComplete: () => {
      },
      paused: true,
      ease:  Linear.easeNone, //线性动画
    });

    return animation;
  }

}
