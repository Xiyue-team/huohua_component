import {Power2, TweenMax } from 'gsap';
import * as THREE from 'three';

export class AnimationHelper {
  static createAnimation(rotation: THREE.Mesh, startAngle: number, endAngle: number, delay: number) {
    const tween = {
      angle: startAngle
    };

    const animation = TweenMax.to(tween, 2, {
      angle: endAngle,
      onUpdate: () => {
        rotation.rotation.z = tween.angle;
      },
      onComplete: () => {
      },
      paused: true,
      ease:  Power2.easeInOut, //线性动画
      yoyo: true,
      delay: delay, //延迟N秒执行
      repeat: -1 //执行次数 -1 等于infinite
    });
    return animation;
  }
}
