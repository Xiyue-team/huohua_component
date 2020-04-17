import {Linear, TweenMax} from 'gsap';
import * as THREE from 'three';
export class AnimationHelper {
    static createAnimation1(x: number, x1: number, obj: any, time: number) {
        const tween = {
            x: x,
        };
        const animation = TweenMax.to(tween, time, {
            x: x1,
            opacity: 0,
            onUpdate: () => {
                obj.position.set(tween.x, 0, 0);
            },
            onComplete: () => {

            },
            paused: true,
            ease:  Linear.easeNone, //线性动画
        });
        return animation;
    }

    static createAnimation2(opacity: number, opacity1: number, obj: any, time: number) {
        const tween = {
            opacity: opacity,
        };
        const animation = TweenMax.to(tween, time, {
            opacity: opacity1,
            onUpdate: () => {
                obj.material.opacity = tween.opacity;
            },
            onComplete: () => {

            },
            paused: true,
            ease:  Linear.easeNone, //线性动画
        });
        return animation;
    }
}
