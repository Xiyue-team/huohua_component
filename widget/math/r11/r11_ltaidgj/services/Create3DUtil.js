/**
 * 这个类用于传入顶点来画3d棱锥模型
 */
import * as THREE from 'three';
export class Create3DUtil {
    constructor() {
        this.vertices = [];
        this.faces = [];
    }
    addPoint(pointArray, height) {
        const pyramidPoint = [];
        for (let i = 0; i < pointArray.length * 2; i += 2) {
            pyramidPoint[i] = new THREE.Vector3(pointArray[i / 2][0] * 100, -200 / 2 - 0.5, -pointArray[i / 2][1] * 100);
            pyramidPoint[i + 1] = new THREE.Vector3(pointArray[i / 2][0] * 50, height - 100, -pointArray[i / 2][1] * 50);
        }
        pyramidPoint[pointArray.length * 2] = new THREE.Vector3(0, -200 / 2, 0);
        return pyramidPoint;
    }
    addPyramid(pointArray, height) {
        const geometry = new THREE.Geometry();
        this.vertices = [];
        this.faces = [];
        this.vertices = this.addPoint(pointArray, height);
        geometry.vertices = this.vertices;
        let k = 0;
        for (let i = 0; i < this.vertices.length - 1 + (pointArray.length) * 2; i++) {
            if (i < this.vertices.length - 1) {
                // 画侧面
                if (i === (this.vertices.length - 3)) {
                    this.faces[i] = new THREE.Face3(1, i, i + 1);
                }
                else if (i === (this.vertices.length - 2)) {
                    this.faces[i] = new THREE.Face3(0, 1, i - 1);
                }
                else {
                    this.faces[i] = new THREE.Face3(i, i + 1, i + 2);
                }
            }
            else {
                // 画上下底面
                if (i < this.vertices.length - 1 + pointArray.length) {
                    if (i === this.vertices.length - 1 + pointArray.length - 1) {
                        this.faces[i] = new THREE.Face3(pointArray.length * 2, k, 0);
                    }
                    else {
                        this.faces[i] = new THREE.Face3(pointArray.length * 2, k, k + 2);
                    }
                    k += 2;
                }
                else {
                }
            }
        }
        geometry.faces = this.faces;
        // 生成法向量
        geometry.computeFaceNormals();
        return geometry;
    }
    addLine(pointArray, height) {
        const vertices = this.addPoint(pointArray, height);
        const obj = new THREE.Object3D();
        for (let i = 0; i < pointArray.length * 2 - 1; i += 2) {
            if (i === (pointArray.length * 2 - 2)) {
                obj.add(this.createLine(vertices[i], vertices[i + 1], '#4A90E2'));
                obj.add(this.createLine(vertices[i], vertices[0], '#4A90E2'));
                obj.add(this.createLine(vertices[i + 1], vertices[1], '#4A90E2'));
            }
            else {
                obj.add(this.createLine(vertices[i], vertices[i + 1], '#4A90E2'));
                obj.add(this.createLine(vertices[i], vertices[i + 2], '#4A90E2'));
                obj.add(this.createLine(vertices[i + 1], vertices[i + 3], '#4A90E2'));
            }
        }
        return obj;
    }
    // 此方法提供根据给出的两个点画一条线
    createLine(startPoint, endPoint, color) {
        const geometryLine = new THREE.Geometry();
        geometryLine.vertices = [startPoint, endPoint];
        const dottedLine = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            dashSize: 5,
            gapSize: 5,
            linewidth: 2,
        }));
        return dottedLine;
    }
    // 添加画边框用的点
    addVertices(pointArray, height, name) {
        const pyramidPoint = [];
        if (name === '棱锥') {
            for (let i = 0; i < pointArray.length * 2; i += 2) {
                pyramidPoint[i] = new THREE.Vector3(pointArray[i / 2][0] * 100.1, -200 / 2 - 0.5, -pointArray[i / 2][1] * 100.1);
                pyramidPoint[i + 1] = new THREE.Vector3(pointArray[i / 2][0] * 0, height - 99.8, -pointArray[i / 2][1] * 0);
            }
        }
        else if (name === '棱台') {
            for (let i = 0; i < pointArray.length * 2; i += 2) {
                pyramidPoint[i] = new THREE.Vector3(pointArray[i / 2][0] * 100.1, -200 / 2 - 0.5, -pointArray[i / 2][1] * 100.1);
                pyramidPoint[i + 1] = new THREE.Vector3(pointArray[i / 2][0] * 50.1, height - 99.8, -pointArray[i / 2][1] * 50.1);
            }
        }
        else if (name === '棱柱') {
            for (let i = 0; i < pointArray.length * 2; i += 2) {
                pyramidPoint[i] = new THREE.Vector3(pointArray[i / 2][0] * 100.1, -200 / 2 - 0.5, -pointArray[i / 2][1] * 100.1);
                pyramidPoint[i + 1] = new THREE.Vector3(pointArray[i / 2][0] * 100.1, height - 99.8, -pointArray[i / 2][1] * 100.1);
            }
        }
        pyramidPoint[pointArray.length * 2] = new THREE.Vector3(0, -200 / 2, 0);
        return pyramidPoint;
    }
    // 此方法同时画实线和虚线
    createLine2(pointArray, height, name) {
        let line;
        let line2;
        let line3;
        let vertices;
        vertices = this.addVertices(pointArray, height, name);
        const obj1 = new THREE.Object3D();
        const obj2 = new THREE.Object3D();
        const lineArray = [];
        for (let i = 0; i < pointArray.length * 2 - 1; i += 2) {
            if (i === (pointArray.length * 2 - 2)) {
                line = this.createLineMesh([vertices[i], vertices[i + 1]], '#4A90E2', 3);
                obj1.add(line);
                line = this.createLineMesh([vertices[i], vertices[i + 1]], '#4A90E2', 2);
                obj2.add(line);
                line2 = this.createLineMesh([vertices[i], vertices[0]], '#4A90E2', 3);
                obj1.add(line2);
                line2 = this.createLineMesh([vertices[i], vertices[0]], '#4A90E2', 2);
                obj2.add(line2);
                line3 = this.createLineMesh([vertices[i + 1], vertices[1]], '#4A90E2', 3);
                obj1.add(line3);
                line3 = this.createLineMesh([vertices[i + 1], vertices[1]], '#4A90E2', 2);
                obj2.add(line3);
            }
            else {
                line = this.createLineMesh([vertices[i], vertices[i + 1]], '#4A90E2', 3);
                obj1.add(line);
                line = this.createLineMesh([vertices[i], vertices[i + 1]], '#4A90E2', 2);
                obj2.add(line);
                line2 = this.createLineMesh([vertices[i], vertices[i + 2]], '#4A90E2', 3);
                obj1.add(line2);
                line2 = this.createLineMesh([vertices[i], vertices[i + 2]], '#4A90E2', 2);
                obj2.add(line2);
                line3 = this.createLineMesh([vertices[i + 1], vertices[i + 3]], '#4A90E2', 3);
                obj1.add(line3);
                line3 = this.createLineMesh([vertices[i + 1], vertices[i + 3]], '#4A90E2', 2);
                obj2.add(line3);
            }
        }
        lineArray.push(obj1);
        lineArray.push(obj2);
        return lineArray;
    }
    // 生成线
    createLineMesh(vertices, color, style) {
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
                dashSize: 10,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();
        }
        else if (style === 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
        }
        return lineMesh;
    }
    // 同时画实线圆 和 虚线圆
    createLine3(topRadius, bottomRadius, color, topHeight, bottomHeight) {
        let line1;
        let line2;
        let line3;
        let line4;
        const lineArray = [];
        const obj1 = new THREE.Object3D();
        const obj2 = new THREE.Object3D();
        line1 = this.createEllipseLine(topRadius + 0.5, color, 3);
        obj1.add(line1);
        line2 = this.createEllipseLine(topRadius + 0.5, color, 2);
        obj2.add(line2);
        line1.rotation.x = Math.PI / 2;
        line1.rotation.x = Math.PI / 2;
        line1.position.y = topHeight;
        line1.position.y = topHeight;
        line2.rotation.x = Math.PI / 2;
        line2.rotation.x = Math.PI / 2;
        line2.position.y = topHeight;
        line2.position.y = topHeight;
        line3 = this.createEllipseLine(bottomRadius + 0.5, color, 3);
        obj1.add(line3);
        line4 = this.createEllipseLine(bottomRadius + 0.5, color, 2);
        obj2.add(line4);
        line3.rotation.x = Math.PI / 2;
        line3.rotation.x = Math.PI / 2;
        line3.position.y = bottomHeight;
        line3.position.y = bottomHeight;
        line4.rotation.x = Math.PI / 2;
        line4.rotation.x = Math.PI / 2;
        line4.position.y = bottomHeight;
        line4.position.y = bottomHeight;
        lineArray.push(obj1);
        lineArray.push(obj2);
        return lineArray;
    }
    // 生产圆形线
    createEllipseLine(radius, color, style) {
        const curve = new THREE.EllipseCurve(0, 0, // ax, aY
        radius, radius, // xRadius, yRadius
        0, 2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
        );
        const geometryLine = new THREE.Geometry().setFromPoints(curve.getPoints(50));
        let lineMesh = null;
        if (!color) {
            color = '#000';
        }
        if (style === 2) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();
        }
        else if (style === 3) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
        }
        return lineMesh;
    }
}
//# sourceMappingURL=Create3DUtil.js.map