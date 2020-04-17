import * as THREE from 'three';
import { Line } from '../three/component/Line';

export class MathHelper {

    private line = new Line();

    /**
     * 计算倾斜角的方法
     * @param {number} initAngle    初始角
     * @param {number} rotateAngle  旋转总角度
     * @returns {number}            返回值为弧度值
     */
   static getTiltAngle(initAngle: number, rotateAngle: number) {
        let tiltAngle = (initAngle + rotateAngle) % Math.PI;
        if (tiltAngle < 0) {
            tiltAngle = Math.PI + tiltAngle;
        }
        return tiltAngle;
    }

    /**
     * 计算斜率的方法
     * @param {number} tiltAngle 倾斜角
     * @returns {number}         返回斜率
     */
    static getSlope(tiltAngle: number) {
       const slope = Math.tan(tiltAngle);
       return slope;
    }

    /**
     * 获取直线的截距的方法
     * @param {number} slope  直线的斜率
     * @param {number} x      传入直线上任意一点的X坐标
     * @param {number} y      传入直线上任意一点的Y坐标
     * @returns {number}      返回该直线的截距
     */
    static getIntercept(slope: number, x: number, y: number) {
        const intercept = -slope * x + y;
        return intercept;
    }

    //判断一元二次方程的根并返回方程的解
    /**
     * 传入一元二次方程的a b c
     * ax^2 + bx + c = 0
     * @param {number} a
     * @param {number} b
     * @param {number} c
     */
    static getFunctionResult(a: number, b: number, c: number) {
        const result = {
            x1: 0,
            x2: 0
        };
        let delta: number;
        delta = Math.pow(b, 2) - (4 * a * c);
        if (delta > 0) {
            //Δ大于0方程有两个不相等的实数根
            result.x1 = - b / (2 * a) + Math.sqrt(delta) / (2 * a);
            result.x2 = - b / (2 * a) - Math.sqrt(delta) / (2 * a);
        } else if (delta === 0) {
            //Δ等于0方程有两个相等的实数根
            result.x1 = -b / ( 2 * a);
            result.x2 = -b / ( 2 * a);
        } else {
            //Δ小于0方程没有实数根
            result.x1 = null;
            result.x2 = null;
        }
        return result;
    }

  /**
   * 两圆心坐标和两圆半径(仅两圆相交)
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} r1
   * @param {number} r2
   * @returns {any}
   */
  static getIntersectionPoints(x1: number, y1: number, x2: number, y2: number, r1: number, r2: number) {
    const result: any = [];
    const L = Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
    const k1 = (y2 - y1) / (x2 - x1);
    const k2 = -1 / k1;
    const distAE = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(L, 2)) / (2 * L);
    const x0 = x1 + (distAE / L) * (x2 - x1);
    const y0 = y1 + (distAE / L) * (y2 - y1);
    const distCE = Math.sqrt((Math.pow(r1, 2) - Math.pow(distAE, 2)));
    const xc = x0 - distCE / Math.sqrt(1 + Math.pow(k2, 2));
    const yc = y0 + k2 * (xc - x0);
    const xd = x0 + distCE / Math.sqrt(1 + Math.pow(k2, 2));
    const yd = y0 + k2 * (xd - x0);
    result.push({x: xc, y: yc});
    result.push({x: xd, y: yd});
    return result;
  }

    /**
     * 返回Δ的值
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @returns {number}
     */
    static getDeltaNumber(a: number, b: number, c: number) {
        return Math.pow(b, 2) - (4 * a * c);
    }

  /**
   * 判断三点是否共线的方法 返回boolean值 true为共线 false为不共线
   * @param {number} ax 三点坐标
   * @param {number} ay
   * @param {number} bx
   * @param {number} by
   * @param {number} cx
   * @param {number} cy
   * @returns {boolean}
   */
    static isCollinear(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
      if (((ax - cx) * (by - cy))
        === ((bx - cx) * ( ay - cy))) {
        return true;
      } else {
        return false;
      }
    }

  /**
   * 已知一直线上两点，和点外一点 求垂足的方法
   * @param {number} x0   直线外一点的坐标
   * @param {number} y0
   *
   * @param {number} x1   直线上的两点坐标
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
    static getFoot( x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) {
      const k = ( (x0 - x1) * (x2 - x1) + (y0 - y1) * (y2 - y1) )  / ( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) ) ;
      const x = x1 + k * (x2 - x1);
      const y = y1 + k * (y2 - y1);
      return {x: x, y: y};
    }

  //已知三个点坐标M(Mx, My, 0)，N(Nx, Ny, 0)以及两直线的交点O(Ox,Oy, 0),M点位于直线l1上,N点位于直线l2上，画出构成直线l1,l2互相垂直时的垂直符号
  /**
   *
   * @param {Vector3} pointM  l1直线上一点M
   * @param {Vector3} pointN  l2直线上一点N
   * @param {Vector3} pointO  l1与l2交点O
   * @param {number} n        直角大小n
   * @param {string} color    直角符号颜色
   * @param {string} direction 直角符号位置
   * @returns {Group}
   */
  drawVerticalLines(pointM: THREE.Vector3, pointN: THREE.Vector3, pointO: THREE.Vector3, n: number, color: string, direction: string) {
    const intersectionPointR = {
      x: 0,
      y: 0
    };
    const group = new THREE.Group();

    //直线l1的斜率
    //直线l1方程为 y - pointM.y = slopeMO(x - pointM.x);
    const slopeMO = (pointO.y - pointM.y) / (pointO.x - pointM.x);

    //直线l2的斜率
    //直线l2方程为 y - pointN.y = slopeNO(x - pointN.x);
    const slopeNO = (pointO.y - pointN.y) / (pointO.x - pointN.x);
    let pXParam = (n / Math.sqrt((Math.pow(slopeMO, 2) + 1)));
    let pYParam = ((slopeMO * n) / Math.sqrt((Math.pow(slopeMO, 2) + 1)));
    let qXParam = (n / Math.sqrt((Math.pow(slopeNO, 2) + 1)));
    let qYParam = ((slopeNO * n) / Math.sqrt((Math.pow(slopeNO, 2) + 1)));

    //从交点位置向两直线上取等长的距离n, 求出此时两直线上的两个点P,Q坐标, P在直线l1上，Q在直线l2上
    switch (direction) {
      case 'leftTop':
        pXParam = -pXParam;
        pYParam = -pYParam;
        qXParam = -qXParam;
        qYParam = -qYParam;
        break;
      case 'rightTop':
        pXParam = -pXParam;
        pYParam = -pYParam;
        break;
      case 'leftBottom':
        qXParam = -qXParam;
        qYParam = -qYParam;
        break;
      case 'rightBottom':

        break;
    }
    const pX = pointO.x + pXParam;
    const pY = pointO.y + pYParam;
    const qX = pointO.x + qXParam;
    const qY = pointO.y + qYParam;

    //过P点作直线l3平行于直线l2，则此时l3的方程为: y - Py = slopeNO * (x - Px);
    //过Q点作直线l4平行于直线l1，则此时l4的方程为: y - Qy = slopeMO * (x - Qx);
    //则交点为：
    intersectionPointR.x = (slopeMO * qX - qY + pY - slopeNO * pX) / (slopeMO - slopeNO);
    intersectionPointR.y = slopeNO * (intersectionPointR.x - pX) + pY;

    const linePR = this.line.createLine({
      startPoint: new THREE.Vector3(pX, pY, 0),
      endPoint: new THREE.Vector3(intersectionPointR.x, intersectionPointR.y, 0),
      color: color,
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    const lineQR = this.line.createLine({
      startPoint: new THREE.Vector3(qX, qY, 0),
      endPoint: new THREE.Vector3(intersectionPointR.x, intersectionPointR.y, 0),
      color: color,
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    group.add(linePR);
    group.add(lineQR);
    return group;
  }
}
