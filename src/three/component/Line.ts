import * as THREE from 'three';
import {BrowserInfo} from '../../model/BrowserInfo';
const OBJLoader = require('three-obj-loader');

const MeshLine = require( 'three.meshline' ).MeshLine;
const MeshLineMaterial = require( 'three.meshline' ).MeshLineMaterial;

OBJLoader(THREE);
export class Line {
    /*
        这个类主要是做一个兼容判定
        判断是Ipad时用three自带的虚线
        不是Ipad时用我们给的虚线meshLIne
    */


    private browserInfo: BrowserInfo;

    constructor() {
        this.browserInfo = (window as any)['env'].browserInfo;
    }

    createLine(lineOption: LineOption) {

        lineOption.color = !lineOption.color ?  '#000000' : lineOption.color;
        lineOption.lineWidth = !lineOption.lineWidth ?  1 : lineOption.lineWidth;
        lineOption.depthTest = !lineOption.depthTest ?  false : lineOption.depthTest;
        lineOption.gapSize = !lineOption.gapSize ?  5 : lineOption.gapSize;
        lineOption.dashLine = !lineOption.dashLine ?  false : lineOption.dashLine;
        lineOption.lineWidthScale = !lineOption.lineWidthScale ? 1 : lineOption.lineWidthScale;
      // lineOption.dashSize = !lineOption.dashSize ?  5 : lineOption.dashSize;
        if ( lineOption.dashSize === 0) {
            lineOption.dashSize = 0;
        } else if (!lineOption.dashSize) {
            lineOption.dashSize = 5;
        } else {
            lineOption.dashSize = lineOption.dashSize;
        }
        let line;
        if (window.env.browserInfo.os === 'iOS') {
            line = this.threeLine(
                lineOption.startPoint,
                lineOption.endPoint,
                lineOption.color,
                lineOption.lineWidth * lineOption.lineWidthScale,
                lineOption.depthTest,
                lineOption.dashSize,
                lineOption.gapSize,
                lineOption.dashLine,
            );
        } else {
            line = this.meshLine(
                lineOption.startPoint,
                lineOption.endPoint,
                lineOption.color,
                lineOption.lineWidth,
                lineOption.depthTest,
                lineOption.dashSize,
                lineOption.gapSize,
                lineOption.dashLine
            );
        }

        return line;
    }

    createOpacityLine(startPoint: THREE.Vector3, endPoint: THREE.Vector3, color: string, lineWidth: number, opacity: number) {
      const geometry = new THREE.Geometry();
      geometry.vertices = [startPoint, endPoint];
      let line: any;
      if (window.env.browserInfo.os === 'iOS') {
        const material = new THREE.LineBasicMaterial({
          color: color,
          linewidth: lineWidth,
          transparent: true,
          opacity: opacity
        });

        line = new THREE.LineSegments(geometry, material);
      } else {
        const g = new MeshLine();
        g.setGeometry( geometry );

        const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

        const material = new MeshLineMaterial( {
          useMap: false,
          color: new THREE.Color( color ),
          opacity: opacity,
          dashArray: 0,
          dashOffset: 0,
          dashRatio: 0,
          resolution: resolution,
          lineWidth: lineWidth / 1000,
          near: 1,
          far: 100,
          side: THREE.DoubleSide,
          transparent: true,
        });

        line = new THREE.Mesh( g.geometry, material );
      }
      return line;
    }

    // three自带的线条
    private threeLine(startPoint: any, endPoint: any, color: any, lineWidth: number, depthTest: boolean,
          dashSize: number, gapSize: number, dashLine: boolean ) {
        const geometry = new THREE.Geometry();
        geometry.vertices = [startPoint, endPoint];

        const material = new THREE.LineDashedMaterial({
            color: color,
            dashSize: dashSize,
            gapSize: gapSize,
            linewidth: lineWidth,
            depthTest: depthTest
        });

        const lineMesh = new THREE.LineSegments(geometry, material);

        if (dashLine) {
            lineMesh.computeLineDistances();
        }

        return lineMesh;
    }

    // MeshLine的线条
    private meshLine(startPoint: any, endPoint: any, color: any, lineWidth: number, depthTest: boolean,
          dashSize: number, gapSize: number, dashLine: boolean ) {

        const geometry = new THREE.Geometry();
        geometry.vertices.push(startPoint);
        geometry.vertices.push(endPoint);

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
            depthWrite: depthTest,
            depthTest: depthTest,
            alphaTest: !depthTest ? .5 : 0,
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
    startPoint: THREE.Vector3;
    endPoint: THREE.Vector3;
    color?: any;
    lineWidth?: number;
    dashLine?: boolean;
    dashSize?: number;
    gapSize?: number;
    depthTest ?= false;
    lineWidthScale ?: number;
}

