import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Linear, TweenMax } from 'gsap';
import * as THREE from 'three';

export class Helper {
  //创建箭头方法
  createArrow( arrowSize: number, color: string, opacity?: number) {
    opacity = opacity ? opacity : 1;
    const arrow = ThreeUtil.createTriangle(0,  arrowSize, 0,
      -arrowSize, 2 * arrowSize, 0, color, opacity);
    return arrow;
  }

  //创建线的方法
  createLine(length: number, width: number, color: string, opacity?: number) {
   const line = ThreeUtil.createLine(length, width, color, opacity);
   return line;
  }

  //创建单调性箭头移动的动画
  createArrowMoveAnimation(obj: THREE.Mesh[], x: number, x1: number, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      y: x,
    };

    const animation = TweenMax.to(tween, 1, {
      y: x1,
      onUpdate: () => {
        for (let i = 0; i < obj.length; i++) {
          const k = Math.pow((1 / Math.cos(Math.atan(tween.y))), 2);
          obj[i].rotation.z =  Math.atan(k);
          obj[i].position.set(Math.atan(tween.y) + ((-3 + i) * Math.PI), tween.y, 0);
        }
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
    });
    return animation;
  }

  //创建奇偶性旋转动画
  createRotateAniamtion(obj: any[], callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      angle: 0,
    };

    const animation = TweenMax.to(tween, 1.5, {
      angle: -Math.PI,
      onUpdate: () => {
        for (let i = 0; i < obj.length; i++) {
          obj[i].rotation.z = tween.angle;
        }
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
    });
    return animation;
  }

  //创建周期性的虚线移动动画
  createPeriodicMoveAnimation(obj: any, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      position: 0,
    };

    const animation = TweenMax.to(tween, 1.5, {
      position: Math.PI,
      onUpdate: () => {
        obj.position.x = tween.position;
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
    });
    return animation;
  }
}
