import { Linear, TweenMax } from 'gsap';

export class Helper {

  /*创建动画的方法*/
  createMoveAnimation(dom: any, x: number, x1: number, onCompleteCallBack?: any) {
    onCompleteCallBack = onCompleteCallBack ? onCompleteCallBack : () => {};
    const tween = {
      x: x
    };

    const animation = TweenMax.to(tween, 0.5, {
      x: x1,
      onUpdate: () => {
        dom.style.left = tween.x + 'px';
      },
      onComplete: () => {
        onCompleteCallBack();
      },
      paused: true,
      ease:  Linear.easeNone, //线性动画
    });
    return animation;
  }

  /*创建渐隐的动画*/
  createShowAnimation(dom: any[], onCompleteCallBack?: any) {
    onCompleteCallBack = onCompleteCallBack ? onCompleteCallBack : () => {};
    const tween = {
      opacity: 0
    };

    const animation = TweenMax.to(tween, 0.4, {
      opacity: 1,
      onUpdate: () => {
        for (let i = 0; i < dom.length; i++) {
          dom[i].style.opacity = tween.opacity;
          dom[i].style.display = 'block';
        }
      },
      onComplete: () => {
        onCompleteCallBack();
      },
      paused: true,
      ease:  Linear.easeNone, //线性动画
    });
    return animation;
  }

}
