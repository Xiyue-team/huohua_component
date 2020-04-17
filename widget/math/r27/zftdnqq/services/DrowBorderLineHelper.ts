/**
 * 这个类用于传入点来画实线和虚线结合的边框
 */

import * as THREE from 'three';

export class DrowBorderLineHelper {

    // 此方法同时画实线和虚线
    createLine(pointArray: any, color: any) {

        let line1;
        let line2;

        let line3;
        let line4;

        let line5;
        let line6;

        const obj1 = new THREE.Object3D();
        const obj2 = new THREE.Object3D();
        const lineArray = [];

        for (let i = 0; i < 3; i++) {
          line1 = this.createLineMesh([pointArray[i], pointArray[i + 1]], color, 1);
          obj1.add(line1);
          line2 = this.createLineMesh([pointArray[i], pointArray[i + 1]], color, 2);
          obj2.add(line2);

          line3 = this.createLineMesh([pointArray[i + 4], pointArray[i + 5]], color, 1);
          obj1.add(line3);
          line4 = this.createLineMesh([pointArray[i + 4], pointArray[i + 5]], color, 2);
          obj2.add(line4);

          line5 = this.createLineMesh([pointArray[i], pointArray[i + 4]], color, 1);
          obj1.add(line5);
          line6 = this.createLineMesh([pointArray[i], pointArray[i + 4]], color, 2);
          obj2.add(line6);
        }

        line1 = this.createLineMesh([pointArray[0], pointArray[3]], color, 1);
        obj1.add(line1);
        line2 = this.createLineMesh([pointArray[0], pointArray[3]], color, 2);
        obj2.add(line2);

        line3 = this.createLineMesh([pointArray[4], pointArray[7]], color, 1);
        obj1.add(line3);
        line4 = this.createLineMesh([pointArray[4], pointArray[7]], color, 2);
        obj2.add(line4);

        line5 = this.createLineMesh([pointArray[3], pointArray[7]], color, 1);
        obj1.add(line5);
        line6 = this.createLineMesh([pointArray[3], pointArray[7]], color, 2);
        obj2.add(line6);

        lineArray.push(obj1);
        lineArray.push(obj2);

        return lineArray;
    }

    // 生成线
    private createLineMesh(vertices: any, color: any, style: number) {
        let lineMesh = null;
        const geometryLine = new THREE.Geometry();

        if (!color) {
            color = '#000';
        }

        if (style === 1) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();

        } else if ( style === 2) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }

    createDashLine(lineWidth: number, lineHeight: number, color: string) {
      const material = new THREE.MeshBasicMaterial( {color: color, depthTest: false, transparent: true} );
      const mesh = new THREE.Object3D();
      for (let i = -lineWidth / 2; i < lineWidth / 2; i += 10) {
        const geometry = new THREE.CylinderGeometry( lineHeight, lineHeight, 5, 32 );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.y = i + 5;
        mesh.add(cylinder);
      }


      return mesh;
    }
}

