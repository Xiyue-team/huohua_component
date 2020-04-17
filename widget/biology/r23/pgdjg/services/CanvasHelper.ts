import * as Konva from 'konva';
import { PgdjgConfig } from './PgdjgConfig';
import { Linear, TweenMax } from 'gsap';

export class CanvasHelper {
  config = new PgdjgConfig();
  //创建可拖动文字对象
    rectHelper( textConfig: any, groupConfig: any) {
    const group = new Konva.Group(Object.assign(this.config.rectGroup, groupConfig));
    const rect = new Konva.Rect(this.config.rectConfig);
    const text = new Konva.Text(Object.assign(this.config.textConfig, textConfig));
    group.add(rect, text);
    return group;
  }

  //创建文字提示对象
  createText(textConfig: any) {
      const text = new Konva.Text(textConfig);
      return text;
  }

  //创建点对象
  pointHelper(axis: any) {
    const point = new Konva.Circle(Object.assign(this.config.circleConfig, axis));
    return point;
  }
  //创建线对象
  lineHelper(points: any) {
    const line = new Konva.Line(Object.assign(this.config.lineConfig, points));
    return line;
  }

  //创建圆缩放动画对象
  createScaleAnimation(obj: Konva.Circle, layer: Konva.Layer, scaleOption: any, callback?: any) {
      callback = callback ? callback : () => {};
    const tween = {
      x: scaleOption.x,
      y: scaleOption.y,
    };

    const animation = TweenMax.to(tween, scaleOption.time, {
      x: scaleOption.x1,
      y: scaleOption.y1,
      onUpdate: () => {
        obj.scale({x: tween.x, y: tween.y});
        layer.draw();
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeNone, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    return animation;
  }

  //创建线动画对象
  createLineAnimation(obj: Konva.Line, layer: Konva.Layer, option: any, time: number, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      x: option.endPointX,
      y: option.endPointY,
    };

    const animation = TweenMax.to(tween, time, {
      x: option.endPointX1,
      y: option.endPointY1,
      onUpdate: () => {
        obj.points([option.startPointX, option.startPointY, tween.x, tween.y]);
        layer.draw();
      },
      onComplete: () => {
        callback();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    return animation;
  }

  //创建文字标签移动的动画对象
  createTextLabelAnimation(obj: Konva.Group, layer: Konva.Layer, option: any, callback?: any) {
    callback = callback ? callback : () => {};
    const tween = {
      x: option.x,
      y: option.y,
    };

    const animation = TweenMax.to(tween, option.time, {
      x: option.x1,
      y: option.y1,
      onUpdate: () => {
        obj.x(tween.x);
        obj.y(tween.y);
        layer.draw();
      },
      onComplete: () => {
        callback();
      },
      paused: false,
      ease:  Linear.easeIn, //先慢后快
      repeat: 0 //执行次数 -1 等于infinite
    });
    return animation;
  }

  //绑定事件
  bindingEvent(obj: any, event: string, callback: any) {
      obj.on(event, callback);
  }

  //矩形与矩形碰撞检测算法
  rectImpactChecking(rect1: any, rect2: any) {
    let isImp = true;
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.h + rect1.y > rect2.y) {
      isImp = false;
    }
    // console.log(isImp);
    return isImp;
  }

  //圆与矩形碰撞检测算法
  /**
   *
   * @param rect  {x,y,w,h} 矩形左上角坐标 矩形宽高
   * @param circle {x,y,r} 圆心坐标 圆半径
   * @param style  1碰撞 2不碰撞
   * @returns {boolean}
   */
  impactChecking(rect: any, circle: any , style: number) {
      const closestPoint = {
        x: 0,
        y: 0
      };
      let distance: number;
      if (circle.x < rect.x) {
        closestPoint.x = rect.x;
      } else if (circle.x > rect.x + rect.w) {
        closestPoint.x = rect.x + rect.w;
      } else {
        closestPoint.x = circle.x;
      }

      if (circle.y < rect.y) {
        closestPoint.y = rect.y;
      } else if (circle.y > rect.y + rect.h) {
        closestPoint.y = rect.y + rect.h;
      } else {
        closestPoint.y = circle.y;
      }

      distance = Math.sqrt(Math.pow(closestPoint.x - circle.x, 2) + Math.pow(closestPoint.y - circle.y, 2));
      if (style === 1) {
        if (distance < circle.r) {
          return true;  //发生碰撞
        } else {
          return false;  //未发生碰撞
        }
      } else {
        if (distance > circle.r) {
          return true;   //未发生碰撞
        } else {
          return false;  //发生碰撞
        }
      }

  }

  isCollision(rectOption: any, bigCircleOption: any, smallCircleOption: any, rect1Option?: any) {
    let isCollision: boolean;
    let isCollision1: boolean;
    let isCollision2: boolean;
    let isCollision3: boolean;

    isCollision1 = this.impactChecking(rectOption, bigCircleOption, 1);

    isCollision2 = this.impactChecking(rectOption, smallCircleOption, 2);

    isCollision3 = rect1Option ? this.rectImpactChecking(rectOption, rect1Option) : true;

    isCollision = isCollision1 && isCollision2 && isCollision3;
    console.log(isCollision);
    return isCollision;
  }

  animationReset(obj: any) {
    obj.pause();
    obj.progress(0);
  }

  textReset(obj: Konva.Group, layer: Konva.Layer, option: any) {
    obj.x(option.x);
    obj.y(option.y);
    layer.draw();
  }

  circleReset(obj: Konva.Circle, layer: Konva.Layer, option: any) {
    obj.scale({x: option.x, y: option.y});
    layer.draw();
  }

  lineReset(obj: Konva.Line, layer: Konva.Layer, option: any) {
    obj.points(option.points);
    layer.draw();
  }

}
