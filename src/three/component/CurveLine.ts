/**
 * 这个类用于各种函数线
 * 通过传入点的数组
*/

import * as THREE from 'three';
const MeshLine = require( 'three.meshline' ).MeshLine;
const MeshLineMaterial = require( 'three.meshline' ).MeshLineMaterial;

export class CurveLine {

    // 添加圆形线的方法
    constructor() {

    }

    createCurveLine(circleLineOption: CircleLineOption) {
      circleLineOption.pointList = !circleLineOption.pointList ?  [] : circleLineOption.pointList;
      circleLineOption.color = !circleLineOption.color ?  '#000000' : circleLineOption.color;
      circleLineOption.lineWidth = !circleLineOption.lineWidth ?  3 : circleLineOption.lineWidth;
      circleLineOption.style = !circleLineOption.style ?  1 : circleLineOption.style;
      circleLineOption.dashArray = !circleLineOption.dashArray ? 0.1 : circleLineOption.dashArray;
      circleLineOption.dashRatio = !circleLineOption.dashRatio ? 0.5 : circleLineOption.dashRatio;

        let lineMesh = null;

        // if ((window as any)['env'].browserInfo.isIpad) {
        //     lineMesh = this.createThreeLine(circleLineOption.pointList, circleLineOption.color,
        //       circleLineOption.lineWidth, circleLineOption.style);
        // } else {
            lineMesh = this.createMeshLine(circleLineOption.pointList, circleLineOption.color,
              circleLineOption.lineWidth, circleLineOption.style, circleLineOption.dashArray, circleLineOption.dashRatio);
        // }

        return lineMesh;
    }

    // 生产圆形线
    private createThreeLine(pointList: Array<THREE.Vector2>, color: string, lineWidth: number, style: number) {
        const geometryLine = new THREE.Geometry().setFromPoints( pointList );
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: lineWidth * 1}));
        }
        return lineMesh;
    }

    private createMeshLine(pointList: Array<THREE.Vector2>, color: string,
                           lineWidth: number, style: number, dashArray: number, dashRatio: number) {
        const geometry = new THREE.Geometry().setFromPoints( pointList );

        const g = new MeshLine();
        g.setGeometry( geometry );

        const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

        let mesh = null;
        if (style === 1) {
            const material = new MeshLineMaterial( {
                useMap: false,
                color: new THREE.Color( color ),
                opacity: 1,
                dashArray: dashArray,
                dashOffset: 0,
                dashRatio: dashRatio,
                sizeAttenuation: true,
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
 *  pointList: 点的数组
 *  color 颜色
 *  lineWidth 线宽
 *  style 1 或者 2 虚线或实线
 */
class CircleLineOption {
  pointList?: Array<THREE.Vector2>;
  color?: string;
  lineWidth?: number;
  style?: number;
  dashArray?: number;
  dashRatio?: number;

}
