/**
 * 帮助类
 */
import * as THREE from 'three';
import { Line } from '../../../../../src/three/component/Line';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class SjxHelper {
  // 辅助线
  lineHelper = new Line();

  constructor() {

  }

  //绘制直线的方法
  drawLine(start: any, end: any, lineWidth: number, color: string, dashLine?: boolean): any {
    const line = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(start.x, start.y, start.z),
      endPoint: new THREE.Vector3(end.x, end.y, end.z),
      lineWidth: lineWidth,
      color: color,
      lineWidthScale: 1,
      depthTest: false,
      dashLine: dashLine,
      gapSize: 3.5,
      dashSize: 1.5
    });
    return line;
  }

  //绘制角度弧线
  drawArcLine(startAngle: number, endAngle: number, clockwise?: boolean, width?: number ) {
    const curve = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      width, width,           // xRadius, yRadius
      startAngle,  endAngle,  // aStartAngle, aEndAngle
      clockwise,            // aClockwise
      0                 // aRotation
    );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : '#000000'} );
    const ellipse = new THREE.Line( geometry, material );

    return ellipse;
  }

  drawTube(startAngle: number, endAngle: number, clockwise: boolean, radius: number, width: number, color: string) {
    const curve = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      radius, radius,           // xRadius, yRadius
      startAngle,  endAngle,  // aStartAngle, aEndAngle
      clockwise,            // aClockwise
      0                 // aRotation
    );

    const path = new THREE.Path( curve.getPoints( 1000 ) );
    const geometry = path.createPointsGeometry( 1000 );
    const tube = ThreeUtil.createTube(geometry.vertices as any, width, geometry.vertices.length, color);
    return tube;
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

