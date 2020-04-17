import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as THREE from 'three';

const OBJLoader = require('three-obj-loader');

const MeshLine = require('three.meshline').MeshLine;
const MeshLineMaterial = require('three.meshline').MeshLineMaterial;

OBJLoader(THREE);

export class CircleLineUtils {
    browserInfo: BrowserInfo;

    constructor() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    // 添加圆形线的方法
    addEllipseLine(radius: any, color: any, lineWidth: number, angle: number) {
        let lineMesh = null;

        if (this.browserInfo.isIpad) {
            lineMesh = this.createEllipseLine(radius, color, lineWidth * 1000, angle);
        } else {
            lineMesh = this.createLine(radius, color, lineWidth, angle);
        }

        return lineMesh;
    }

    // 生产圆形线
    createEllipseLine(radius: any, color: any, lineWidth: number, angle: number) {
        const curve = new THREE.EllipseCurve(
            0, 0,
            radius, radius,
            0, angle,
            false,
            0
        );

        const geometryLine = new THREE.Geometry().setFromPoints(curve.getPoints(100));

        if (!color) {
            color = '#000';
        }

        const lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
            color: color,
            linewidth: lineWidth / 500
        }));

        return lineMesh;
    }

    createLine(radius: any, color: any, lineWidth: number, angle: number) {

        const curve = new THREE.EllipseCurve(
            0, 0,
            radius, radius,
            0, angle,
            false,
            0
        );

        const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(100));

        const g = new MeshLine();
        g.setGeometry(geometry);

        const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

        const material = new MeshLineMaterial({
            useMap: false,
            color: new THREE.Color(color),
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
        const mesh = new THREE.Mesh(g.geometry, material);

        return mesh;
    }
}
