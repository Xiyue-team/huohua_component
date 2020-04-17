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

  //碰撞检测算法 计算两球体是否碰撞
  /**
   *
   * @param circleA {x: number, y:number, radius: number}
   * @param circleB {x: number, y:number, radius: number}
   */
  static impactChecking(circleA: any, circleB: any): boolean {
   return Math.sqrt(Math.pow(circleA.x - circleB.x, 2) +
      Math.pow(circleA.y - circleB.y, 2))
    < circleA.radius + circleB.radius;
  }

  //移动位置的动画
  static moveAnimation(obj: fabric.Image, x: number, y: number, canvas: fabric.Canvas) {
    const tween = {
      x: obj.get('left'),
      y: obj.get('top')
    };

    const animation = TweenMax.to(tween, 0.3, {
      x: x,
      y: y,
      onUpdate: () => {
          obj.set('left', tween.x).setCoords();
          obj.set('top', tween.y).setCoords();

          canvas.renderAll();
      },
      onComplete: () => {
      },
      paused: false,
      ease:  Linear.easeNone, //线性动画
    });
  }

  static enlargeAnimation(obj: fabric.Image) {
    const tween = {
      scaleX: 0.33,
      scaleY: 0.33
    };

    const animation = TweenMax.to(tween, 0.2, {
      scaleX: 0.4,
      scaleY: 0.4,
      onUpdate: () => {
        obj.set('scaleX', tween.scaleX);
        obj.set('scaleY', tween.scaleY);
      },
      onComplete: () => {
      },
      paused: false,
      ease:  Linear.easeNone, //线性动画
    });

  }

  static imageReset(obj: fabric.Image, x: number, y: number) {
    obj.set('selectable', true);
    obj.set('left', x).setCoords();
    obj.set('top', y).setCoords();
    obj.set('scaleX', 0.33);
    obj.set('scaleY', 0.33);
    obj.set('hoverCursor', 'pointer');
  }

  static textReset(obj: fabric.Text, x: number, y: number) {
    obj.set('left', x);
    obj.set('top', y);
  }
}
