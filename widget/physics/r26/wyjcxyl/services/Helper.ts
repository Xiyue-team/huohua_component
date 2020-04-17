import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as THREE from 'three';
import { Line } from '../../../../../src/three/component/Line';
export class Helper {
  lineHelper = new Line();
  /*创建点*/
  createPoint (color: string): THREE.Mesh {
    const r = 1;
    const pointWhite = ThreeUtil.createPoint(r, '#FFFFFF', 0, 0, 1);
    const pointPurple = ThreeUtil.createPoint(r * 0.75, color, 0, 0, 1);
    pointWhite.add(pointPurple);
    return pointWhite;
  }

  /*创建箭头*/
  createArrow() {
    const dashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 1 : 0;
    const gapSize  = (window as any)['env'].browserInfo.os === 'iOS' ? 0.0001 : 1;
    const arrow = new THREE.Group();
    const color = '#E32BFF';
    const line1 = this.lineHelper.createLine( {
      startPoint: new THREE.Vector3( 0, 0, 0),
      endPoint: new THREE.Vector3(-1, -0.7, 0),
      color: color,
      dashLine: true,
      dashSize: dashSize,
      gapSize: gapSize,
      lineWidth: 300,
      lineWidthScale: 0.002,
      depthTest: true
    });
    
    const line2 = this.lineHelper.createLine( {
      startPoint: new THREE.Vector3( 0, 0, 0),
      endPoint: new THREE.Vector3(-1, 0.7, 0),
      color: color,
      dashLine: true,
      dashSize: dashSize,
      gapSize: gapSize,
      lineWidth: 300,
      lineWidthScale: 0.002,
      depthTest: true
    });
    arrow.add(line1, line2);
    return arrow;
  }

  /*已知两点坐标求斜率*/
  getSlope( x1: number, y1: number, x2: number, y2: number) {
    let slope: number;
    if (x1 === x2) {
      return null;
    }
    slope = (y2 - y1) / (x2 - x1);
    return slope;
  }

  /*通过两直线斜率计算出两直线焦点*/
  /**
   * @param {number} k1 下方光线的斜率
   * @param {number} k2 上方光线的斜率
   * @param {number} y1 下方直线上的一点的纵坐标
   * @param {number} y2 上方直线上的一点的纵坐标
   * @param {number} x1 下方直线上的一点的横坐标
   * @param {number} x2 上方直线上的一点的横坐标
   */
  getFocus( k1: number, k2: number, y1: number, y2: number, x1: number, x2: number) {
    const x = ((k1 * x1) + y2 - y1 - (k2 * x2)) / (k1 - k2);
    const y = (k2 * (x - x2)) + y2;
    return {x: x, y: y};
  }

  /*创建线的方法*/
  createLineHelper(startPoint: THREE.Vector3, endPoint: THREE.Vector3, dashSize: number, gapSize: number) {
    const line = this.lineHelper.createLine({
      startPoint: startPoint,
      endPoint: endPoint,
      lineWidth: 300,
      lineWidthScale: 0.003,
      color: '#E32BFF',
      dashLine: true,
      dashSize: dashSize,
      gapSize:  gapSize,
      depthTest: true,
    });
    return line;
  }

  /*删除光线的方法*/
  removeLine(father: THREE.Group, lightLine: any) {
    if (lightLine) {
      father.remove(lightLine);
      lightLine.geometry.dispose();
      lightLine.material.dispose();
    }
  }
}
