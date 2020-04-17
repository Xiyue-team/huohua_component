import {Linear, TweenMax} from 'gsap';
import * as THREE from 'three';
export class AnimationHelper {
    //创建动画
    static createAnimation(x: number, x1: number, y: number, y1: number, obj: THREE.Mesh, time: number, delay: number) {
        const tween = {
            x: x,
            y: y,
            opacity: 1,
        };

        const animation = TweenMax.to(tween, time, {
            x: x1,
            y: y1,
            opacity: 0,
            onUpdate: () => {
                obj.position.set(tween.x, tween.y, 1);
                (obj as any).material.opacity = tween.opacity;
            },
            onComplete: () => {

            },
            paused: true,
            ease:  Linear.easeNone, //线性动画
            delay: delay, //延迟两秒执行
            repeat: -1 //执行次数 -1 等于infinite
        });

        return animation;
    }

    static createPointAnimation(x: number, x1: number, y: number, y1: number,
                                obj: THREE.Mesh, time: number, rect: THREE.Mesh, line: any, text: any) {
        const tween = {
            x: x,
            y: y,
        };

        const animation = TweenMax.to(tween, time, {
            x: x1,
            y: y1,
            onUpdate: () => {
                line.geometry.vertices[0] = new THREE.Vector3(tween.x, -29.4, 0);
                line.geometry.vertices[1] = new THREE.Vector3(tween.x, tween.y, 0);
                line.geometry.verticesNeedUpdate = true;
                obj.position.set(tween.x, tween.y, 1);
                if ((window as any).viewHandler.viewModel.$data.isActive2 === true) {
                    rect.position.set(10 + tween.x + 29.4, 0, -0.05);
                }
                //控制虚线动态绘制


                text.position.set(tween.x + 5, (-29.4 + tween.y) / 2 + 5, 0);
            },
            onComplete: () => {

            },
            paused: true,
            ease:  Linear.easeNone, //线性动画
        });

        return animation;
    }

    //动态绘制线的动画
    static createDashLineAnimation(x: number, x1: number, y: number, y1: number, time: number, line: any) {
        const tween = {
            x: x,
            y: y,
        };

        const animation = TweenMax.to(tween, time, {
            x: x1,
            y: y1,
            onUpdate: () => {
                line.geometry.vertices[0] = new THREE.Vector3(tween.x, -29.4, 0);
                line.geometry.vertices[1] = new THREE.Vector3(tween.x, tween.y, 0);
                line.geometry.verticesNeedUpdate = true;
            },
            onComplete: () => {

            },
            paused: true,
            ease:  Linear.easeNone, //线性动画
        });
        return animation;
    }
    //暂停动画
    static pauseAnimate(animation: any) {
        animation.pause();
    }
}
