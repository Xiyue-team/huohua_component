import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Linear, TweenMax } from 'gsap';
import * as THREE from 'three';
export class Helper {
  private r = (window as any)['env'].browserInfo.isSmallDevice ? 8 : 4;
  private r1 = (window as any)['env'].browserInfo.isSmallDevice ? 3 : 1.5;

  //创建拖动点的方法
  createDragPoint () {
    const point = ThreeUtil.createPoint(this.r, '#ffffff', 0, 0, 0.36);
    const smallPoint = ThreeUtil.createPoint(this.r1, '#ffffff', 0, 0, 1);
    point.add(smallPoint);
    return point;
  }

  //获取旋转角度的方法
  getRotateAngle (x1: number, y1: number, x2: number, y2: number) {
    let angle: number;
    const angleToRadian = Math.PI / 180;
    if (x1 === x2) {
      if (y1 > y2) {
        angle = 270 * angleToRadian;
      } else {
        angle = 90 * angleToRadian;
      }
    } else {
      if (x1 < x2) {
        angle = Math.atan((y2 - y1) / (x2 - x1));
      } else {
        angle = Math.PI + Math.atan((y2 - y1) / (x2 - x1));
      }
    }
    return angle;
  }

  //创建箭头的方法
  createArrow( arrowSize: number, color: string) {
    const arrow = ThreeUtil.createTriangle(0,  arrowSize, 0,
      -arrowSize, 2 * arrowSize, 0, color);
    return arrow;
  }

  //创建高亮显示动画
  createHighLightAnimation(obj: THREE.Mesh, opacity1: number, opacity2: number, callback?: any, delay?: number) {
    delay = delay ? delay : 0;
    callback = callback ? callback : () => {};
    const tween = {
      opacity: opacity1
    };

    const animation = TweenMax.to(tween, 0.2, {
      opacity: opacity2,
      onUpdate: () => {
        (obj.material as any).opacity = tween.opacity;
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeNone, //线性动画
      delay: delay, //延迟N秒执行
    });
    return animation;
  }

  //创建向量移动的动画
  createMoveAnimation(obj: THREE.Mesh, y1: any, y2: any, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      y: y1,
    };

    const animation = TweenMax.to(tween, 1, {
      y: y2,
      onUpdate: () => {
        obj.position.y = tween.y;
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
    });
    return animation;
  }

  //传入两点坐标获取倾斜角的方法
  getTiltAngle(x1: number, y1: number, x2: number, y2: number): any {
    let slope: number;
    let tiltAngle: number;
    if (x1 === x2) {
      slope = undefined;
    } else {
      slope = (y2 - y1) / (x2 - x1);
    }
    if (slope === undefined) {
      tiltAngle = Math.PI / 2;
    } else {
      tiltAngle = Math.atan(slope);
    }
    return tiltAngle;
  }

  //计算斜率
  getSlope(x1: number, y1: number, x2: number, y2: number) {
    let slope: number;
    if (x1 === x2) {
      slope = undefined;
    } else {
      slope = (y2 - y1) / (x2 - x1);
    }
    return slope;
  }

}
