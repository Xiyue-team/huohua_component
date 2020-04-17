import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class Helper {
  //创建箭头
  createArrow( arrowSize: number, color: string, opacity?: number) {
    opacity = opacity ? opacity : 1;
    const arrow = ThreeUtil.createTriangle(0,  arrowSize, 0,
      -arrowSize, 2 * arrowSize, 0, color, opacity);
    return arrow;
  }

  //获得旋转角度的方法
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

  getArcPosition (center: any, x1: number, y1: number, x2: number, y2: number) {
    const angle = ThreeUtil.getAngle(center, x1, y1, x2, y2);
    let aX: number;
    let aY: number;
    let bX: number;
    let bY: number;
    let x: number;
    let y: number;
    const length = 50;
    if (x2 > -150) {
      if (y1 > -99.5) {
          aX = center.x + length * Math.cos(angle);
          aY = center.y + length * Math.sin(angle);
      } else {
          aX = center.x + length * Math.cos(angle);
          aY = center.y - length * Math.sin(angle);
      }
      bX = center.x + length;
      bY = center.y;
    } else {
      if (y1 > -99.5) {
          aX = center.x - length * Math.cos(angle);
          aY = center.y + length * Math.sin(angle);
      } else {
          aX = center.x - length * Math.cos(angle);
          aY = center.y - length * Math.sin(angle);
      }
      bX = center.x - length;
      bY = center.y;
    }

    x = (aX + bX) / 2;
    y = (aY + bY) / 2;

    return {x: x, y: y};

  }
}
