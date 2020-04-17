import * as THREE from 'three';

import { DashLine } from './DashLine';
import { SpriteText2D } from 'three-text2d';
export default class CommonForThree {
    private static dashLine = new DashLine();
    // 为性能优化，画标准线段进行缩放
    static drawUnitLine({
        width = 1.2,
        color = '#000',
        isDash = false,
    } = {}) {
        const line = CommonForThree.drawDashOrLine([
            { x: -1, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
        ], {
                width,
                color,
                isDash
            });
        return line;
    }
    // 缩放线段
    static scaleLine(startPos: any, endPos: any, line: THREE.Mesh, proportion: number = 1) {
        const [x, y, z] = startPos;
        const [x1, y1, z1] = endPos;
        //  获取线段长度
        const len = Math.hypot(x1 - x, y1 - y, z1 - z);
        // 获得中点坐标
        const centerPos = [(x + x1) / 2, (y + y1) / 2, (z + z1) / 2];
        //  获取弧度
        const rad = Math.atan2(y - y1, x - x1);
        line.scale.set(len / 2 * proportion, 1, 1);
        line.position.set(centerPos[0], centerPos[1], centerPos[2]);
        line.rotation.z = rad;
        return line;
    }
    // 画线
    static drawDashOrLine(pointArr: any, {
        width = 1.2,
        color = '#000',
        isDash = false,
        depthTest = true,
    } = {}) {
        const line = this.dashLine.addLine(pointArr, color, width * 1000, isDash);
        line.material.depthTest = depthTest;
        line.material.depthWrite = depthTest;
        return line;
    }
    // 画三角形
    static drawTriangle(color: any, rotations: any, x: any, y: any, z: any) {
        const shape = new THREE.Shape();
        shape.moveTo(-1, 3);
        shape.lineTo(-2.5, 0);
        shape.lineTo(0.5, 0);
        shape.lineTo(-1, 3);
        const trianle = new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        }));
        trianle.rotation.z = rotations;
        trianle.position.set(x, y, z);
        return trianle;
    }

    static drawTriangle1({ color = '#000' } = {}) {
        const shape = new THREE.Shape();
        shape.moveTo(0.1, 0);
        shape.lineTo(-3, 1.5);
        shape.lineTo(-3, -1.5);
        shape.lineTo(0.1, 0);
        const trianle = new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        }));
        return trianle;
    }
    // 图片贴图
    static createImg(vertices: any, w: number, h: number, src: any) {
        const PlaneG = new THREE.PlaneGeometry(w, h);
        const PlaneM = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            overdraw: 0.2,
            depthTest: true
        });
        const Plane = new THREE.Mesh(PlaneG, PlaneM);
        Plane.position.set(vertices[0], vertices[1], vertices[2]);
        return Plane;
    }
    //文字
    static createText(text: string, position: Array<number> = [0, 0, 0], { color = '#000', isItalic = true } = {}) {
        const str = isItalic ? 'italic' : '';
        const textStyle = { font: `${str} 40px "Times New Roman"`, fillStyle: color, antialias: true };
        const textMesh = new SpriteText2D(text, textStyle);
        textMesh.scale.set(0.15, 0.15, 0.15);
        textMesh.position.set(position[0], position[1], position[2]);
        textMesh.material.depthTest = false;
        return textMesh;
    }
     // * @param {起始点位置}
     // * @param {终点位置}
     // * @param {需要缩放的线段}
    static lineAni(startPos: Array<number>, endPos: Array<number>, line: THREE.Mesh, arrow ?: THREE.Mesh) {
        return new Promise((resolve) => {
            let num = 0.01;
            let timer: any = null;
                const rad = Math.atan2(startPos[1] - endPos[1], startPos[0] - endPos[0]);
                arrow.rotation.z = rad + Math.PI;
            function ani() {
                const vecPos = [0, 0, 0];
                vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
                vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
                arrow.position.set(startPos[0] + (endPos[0] - startPos[0]) * num, startPos[1] + (endPos[1] - startPos[1]) * num, 3);
                line = CommonForThree.scaleLine(startPos, vecPos, line);
                num += 0.02;
                if (num > 1) {
                    line = CommonForThree.scaleLine(startPos, endPos, line);
                    arrow.position.set(startPos[0] + (endPos[0] - startPos[0]) * num, startPos[1] + (endPos[1] - startPos[1]) * num, 3);
                    cancelAnimationFrame(timer);
                    resolve(line);
                    return;
                }
                timer = requestAnimationFrame(ani);
            }
            ani();
        });
    }
}
