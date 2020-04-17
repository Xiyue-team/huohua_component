/**
 * 帮助类
 */
import * as THREE from 'three';
import { Line } from '../../../../../src/three/component/Line';

export class JpfxdxzHelper {
  // 辅助线
  lineHelper = new Line();

  constructor() {

  }

  //绘制直线的方法
  drawLine(start: any, end: any, lineWidth: number, color: string): any {
    const line = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(start.x, start.y, start.z),
      endPoint: new THREE.Vector3(end.x, end.y, end.z),
      lineWidth: lineWidth,
      color: color,
      lineWidthScale: 1,
      depthTest: false
    });
    return line;
  }

  // 删除线的方法
  removeLine(line: any, scene: any) {
    line.geometry.dispose();
    line.material.dispose();
    scene.remove(line);
  }

  // 清除绘制点
  removePoint(array: any, count: number, scnen: any) {
    for (let i = 0; i < array.length; i++) {
      (array[i] as any).geometry.dispose();
      (array[i] as any).material.dispose();
      scnen.remove((array[i] as any));
    }
    array = [];
    count = 0;
  }

}

