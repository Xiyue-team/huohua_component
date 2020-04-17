/**
 * 这个类用于传入点来画实线和虚线
 */

import * as THREE from 'three';

export class SpreadAnimationHelper {

    // 此方法同时画实线和虚线
    createLine(pointArray: any, color: any) {

        let line2;
        let line3;

        const obj1 = new THREE.Object3D();
        const obj2 = new THREE.Object3D();
        const lineArray = [];

        for (let i = 0; i < pointArray.length; i++) {
            if (i === pointArray.length - 1) {
                line2 = this.createLineMesh([pointArray[i], pointArray[0]], color, 2);
                obj1.add(line2);
                line3 = this.createLineMesh([pointArray[i], pointArray[0]], color, 3);
                obj2.add(line3);
            } else {
                line2 = this.createLineMesh([pointArray[i], pointArray[i + 1]], color, 2);
                obj1.add(line2);
                line3 = this.createLineMesh([pointArray[i], pointArray[i + 1]], color, 3);
                obj2.add(line3);
            }

        }

        lineArray.push(obj1);
        lineArray.push(obj2);

        return lineArray;
    }

    // 生成线
    createLineMesh(vertices: any, color: any, style: number) {
        let lineMesh = null;
        const geometryLine = new THREE.Geometry();

        if (!color) {
            color = '#000';
        }

        if (style === 2) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();

        } else if ( style === 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
}

