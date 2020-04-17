/**
 * 这个类用于绘制圆形线
 */

import {BrowserUtil} from '../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../src/model/BrowserInfo';
import * as THREE from 'three';
const MeshLine = require( 'three.meshline' ).MeshLine;
const MeshLineMaterial = require( 'three.meshline' ).MeshLineMaterial;

export class CircleLine {

    // 添加圆形线的方法
    constructor() {

    }

    createCircleLine(circleLineOption: CircleLineOption) {

      circleLineOption.aX = !circleLineOption.aX ?  0 : circleLineOption.aX;
      circleLineOption.aY = !circleLineOption.aY ?  0 : circleLineOption.aY;
      circleLineOption.xRadius = !circleLineOption.xRadius ?  10 : circleLineOption.xRadius;
      circleLineOption.yRadius = !circleLineOption.yRadius ?  10 : circleLineOption.yRadius;
      circleLineOption.aStartAngle = !circleLineOption.aStartAngle ?  0 : circleLineOption.aStartAngle;
      circleLineOption.aEndAngle = !circleLineOption.aEndAngle ?  Math.PI * 2 : circleLineOption.aEndAngle;
      circleLineOption.aClockwise = !circleLineOption.aClockwise ?  false : circleLineOption.aClockwise;
      circleLineOption.color = !circleLineOption.color ?  '#000000' : circleLineOption.color;
      circleLineOption.lineWidth = !circleLineOption.lineWidth ?  3 : circleLineOption.lineWidth;
      circleLineOption.style = !circleLineOption.style ?  1 : circleLineOption.style;
      circleLineOption.isIpad = circleLineOption.isIpad ? true : false;

        let lineMesh = null;

        if (circleLineOption.isIpad) {
            lineMesh = this.createEllipseLine(circleLineOption.aX, circleLineOption.aY, circleLineOption.xRadius, circleLineOption.yRadius,
              circleLineOption.aStartAngle, circleLineOption.aEndAngle, circleLineOption.aClockwise, circleLineOption.color,
              circleLineOption.lineWidth, circleLineOption.style);
        } else {
            lineMesh = this.createLine(circleLineOption.aX, circleLineOption.aY, circleLineOption.xRadius, circleLineOption.yRadius,
              circleLineOption.aStartAngle, circleLineOption.aEndAngle, circleLineOption.aClockwise, circleLineOption.color,
              circleLineOption.lineWidth, circleLineOption.style);
        }

        return lineMesh;
    }

    // 生产圆形线
    private createEllipseLine(aX: number, aY: number, xRadius: number, yRadius: number, aStartAngle: number,
                              aEndAngle: number, aClockwise: boolean, color: string, lineWidth: number, style: number) {
        const curve = new THREE.EllipseCurve(
          aX,  aY,            // ax, aY
          xRadius, yRadius,           // xRadius, yRadius
          aStartAngle,  aEndAngle,  // aStartAngle, aEndAngle
          aClockwise,            // aClockwise
          0                 // aRotation
        );

        const geometryLine = new THREE.Geometry().setFromPoints( curve.getPoints( 50 ) );
        let lineMesh = null;

        if (!color) {
            color = '#000';
        }

        if (style === 1) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.5,
                dashSize: 5,
                gapSize: 3,
                linewidth: lineWidth * 800,
                depthTest: false
            }));
            lineMesh.computeLineDistances();

        } else if ( style === 2) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: lineWidth * 800}));
        }
        return lineMesh;
    }

    private createLine(aX: number, aY: number, xRadius: number, yRadius: number, aStartAngle: number,
                       aEndAngle: number, aClockwise: boolean, color: string, lineWidth: number, style: number) {

        const curve = new THREE.EllipseCurve(
          aX,  aY,            // ax, aY
          xRadius, yRadius,           // xRadius, yRadius
          aStartAngle,  aEndAngle,  // aStartAngle, aEndAngle
          aClockwise,            // aClockwise
          0                 // aRotation
        );

        const geometry = new THREE.Geometry().setFromPoints( curve.getPoints( 270 ) );

        const g = new MeshLine();
        g.setGeometry( geometry );

        const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

        let mesh = null;
        if (style === 1) {
            const material = new MeshLineMaterial( {
                useMap: false,
                color: new THREE.Color( color ),
                opacity: 1,
                dashArray: 0.02,
                dashOffset: 0,
                dashRatio: 0.5,
                resolution: resolution,
                lineWidth: lineWidth,
                near: 1,
                far: 100,
                depthWrite: false,
                depthTest: false,
                alphaTest: false ? .5 : 0,
                side: THREE.DoubleSide,
                transparent: true,
            });
            mesh = new THREE.Mesh( g.geometry, material );
        } else if ( style === 2) {
            const material = new MeshLineMaterial( {
                useMap: false,
                color: new THREE.Color( color ),
                opacity: 1,
                dashArray: 0.05,
                dashOffset: 0,
                dashRatio: 0.4,
                resolution: resolution,
                lineWidth: lineWidth,
                near: 1,
                far: 100,
                depthWrite: false,
                depthTest: !false,
                alphaTest: false ? .5 : 0,
                side: THREE.DoubleSide,
                transparent: false,
            });
            mesh = new THREE.Mesh( g.geometry, material );
        }

        return mesh;
    }
}

/**
 *  aX  圆心点X轴坐标
 *  aY  圆心点Y轴坐标
 *  xRadius x轴半径
 *  yRadius Y轴半径
 *  aStartAngle 开始角度  弧度值
 *  aEndAngle 结束角度    弧度值
 *  aClockwise 是否顺时针绘制
 *  color 颜色
 *  lineWidth 线宽
 *  style 1 或者 2 虚线或实线
 */
class CircleLineOption {
  aX?: number;
  aY?: number;
  xRadius?: number;
  yRadius?: number;
  aStartAngle?: number;
  aEndAngle?: number;
  aClockwise?: boolean;
  aRotation?: 0;
  color?: string;
  lineWidth?: number;
  style?: number;
  isIpad?: boolean;
}
