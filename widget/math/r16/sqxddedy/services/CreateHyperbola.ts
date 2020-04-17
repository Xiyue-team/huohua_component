import * as THREE from 'three';
const OBJLoader = require('three-obj-loader');

const MeshLine = require( 'three.meshline' ).MeshLine;
const MeshLineMaterial = require( 'three.meshline' ).MeshLineMaterial;

OBJLoader(THREE);
export class CreateHyperbola {
  /*
      这个类主要是做一个兼容判定
      判断是Ipad时用three自带的虚线
      不是Ipad时用我们给的虚线meshLIne
  */

  constructor() {
  }
  createLine(lineOption: LineOption) {

    lineOption.color = !lineOption.color ?  '#000000' : lineOption.color;
    lineOption.lineWidth = !lineOption.lineWidth ?  1 : lineOption.lineWidth;
    lineOption.depthTest = !lineOption.depthTest ?  false : lineOption.depthTest;
    lineOption.dashSize = !lineOption.dashSize ?  5 : lineOption.dashSize;
    lineOption.gapSize = !lineOption.gapSize ?  5 : lineOption.gapSize;
    lineOption.dashLine = !lineOption.dashLine ?  false : lineOption.dashLine;
    lineOption.lineWidthScale = !lineOption.lineWidthScale ? 1 : lineOption.lineWidthScale;

    let line;
    if ((window as any).env.browserInfo.os === 'ios') {
      line = this.threeLine(
        lineOption.geometry,
        lineOption.color,
        lineOption.lineWidth * lineOption.lineWidthScale,
      );
    } else {
      line = this.meshLine(
        lineOption.geometry,
        lineOption.color,
        lineOption.lineWidth,
        lineOption.dashSize,
        lineOption.gapSize,
        lineOption.dashLine
      );
    }

    return line;
  }

  // three自带的线条
  private threeLine(geometry: any, color: any, lineWidth: number) {
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: lineWidth,
    });
    const lineMesh = new THREE.Line(geometry, material);

    return lineMesh;
  }

  // MeshLine的线条
  private meshLine(geometry: any, color: any, lineWidth: number,
                   dashSize: number, gapSize: number, dashLine: boolean ) {

    const g = new MeshLine();
    g.setGeometry( geometry );

    const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

    const material = new MeshLineMaterial( {
      useMap: false,
      color: new THREE.Color( color ),
      opacity: 1,
      dashArray: dashSize / 100,
      dashOffset: 0,
      dashRatio: gapSize / 10,
      resolution: resolution,
      lineWidth: lineWidth / 1000,
      near: 1,
      far: 100,
      depthWrite: false,
      depthTest: true,
      alphaTest: false ? .5 : 0,
      side: THREE.DoubleSide,
      transparent: dashLine,
    });

    const mesh = new THREE.Mesh( g.geometry, material );

    return mesh;
  }
}

/**
 * startPoint: 线条的起点
 * endPoint: 线条的终点
 * color: 线条的颜色（默认为黑）
 * lineWidth; 线宽
 * dashLine; 是否为虚线（true为虚线， false为实现 默认为false）
 * dashSize：虚线时每段线条的长度
 * gapSize：虚线时每段线条的间距
 * depthTest：是否深度测试（默认为false）
 */
class LineOption {
  geometry: any;
  color?: any;
  lineWidth?: number;
  dashLine?: boolean;
  dashSize?: number;
  gapSize?: number;
  depthTest?: boolean;
  lineWidthScale ?: number;
}

