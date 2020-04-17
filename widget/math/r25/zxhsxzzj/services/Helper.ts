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
  createArrowMoveAnimation(obj: THREE.Mesh[], x: number, x1: number, style: number, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      x: x,
      x1: 3.5 * Math.PI
    };

    const updateCallback = style === 1 ? () => {
      for (let i = 0; i < obj.length; i++) {
        obj[i].position.set(tween.x + (2 * Math.PI * i), Math.sin(tween.x + (2 * Math.PI * i)) , 0);
        obj[i].rotation.z = Math.atan(Math.cos(tween.x));
      }
    } : () => {
      for (let i = 0; i < obj.length - 1; i++) {
        obj[i].position.set(tween.x + (2 * Math.PI * i), Math.sin(tween.x + (2 * Math.PI * i)) , 0);
        obj[i].rotation.z = Math.atan(Math.cos(tween.x));
      }
      obj[obj.length - 1].position.set(tween.x1, Math.sin(tween.x1), 0);
      obj[obj.length - 1].rotation.z = Math.atan(Math.cos(tween.x1));
    };

    const animation = TweenMax.to(tween, 1, {
      x: x1,
      x1: 3.9 * Math.PI,
      onUpdate: () => {
        updateCallback();
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
  createRotateAniamtion(obj: THREE.Mesh, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      angle: 0,
    };

    const animation = TweenMax.to(tween, 1.5, {
      angle: -Math.PI,
      onUpdate: () => {
        obj.rotation.z = tween.angle;
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
      position: Math.PI * 2,
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
