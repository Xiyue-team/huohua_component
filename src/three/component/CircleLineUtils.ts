/**
 * 这个类用于传入顶点来画3d棱锥模型
 */

import {BrowserUtil} from '../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../src/model/BrowserInfo';
import * as THREE from 'three';
import {TimelineLite, Power0, TweenMax} from 'gsap';

const OBJLoader = require('three-obj-loader');

const MeshLine = require( 'three.meshline' ).MeshLine;
const MeshLineMaterial = require( 'three.meshline' ).MeshLineMaterial;

OBJLoader(THREE);
export class CircleLineUtils {
    browserInfo: BrowserInfo;

    constructor() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    // 添加圆形线的方法

    addEllipseLine(radius: any, color: any, style: number, lineWidth: number, angle: number) {
        let lineMesh = null;

        if (this.browserInfo.isIpad) {
            lineMesh = this.createEllipseLine(radius, color, style, lineWidth , angle);
        } else {
            lineMesh = this.createLine(radius, color, style, lineWidth, angle);
        }

        return lineMesh;
    }

    // 生产圆形线
    createEllipseLine(radius: any, color: any, style: number, lineWidth: number, angle: number) {
        const curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            radius, radius,           // xRadius, yRadius
            0,  angle,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const geometryLine = new THREE.Geometry().setFromPoints( curve.getPoints( 50 ) );
        let lineMesh = null;

        if (!color) {
            color = '#000';
        }

        if (style === 2) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.5,
                dashSize: 5,
                gapSize: 3,
                linewidth: lineWidth,
                depthTest: false
            }));
            lineMesh.computeLineDistances();

        } else if ( style === 3) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: lineWidth}));
        }
        return lineMesh;
    }

    createLine(radius: any, color: any, style: number, lineWidth: number, angle: number) {

        const curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            radius, radius,           // xRadius, yRadius
            0,  angle,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const geometry = new THREE.Geometry().setFromPoints( curve.getPoints( 70 ) );

        const g = new MeshLine();
        g.setGeometry( geometry );

        const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

        let mesh = null;
        if (style === 2) {
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
        } else if ( style === 3) {
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
