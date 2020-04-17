import * as THREE from 'three';

import { DashLine } from './DashLine';
import { SpriteText2D } from 'three-text2d';
import CreateText from './CreateText';
export default class CommonForThree {
    private static dashLine = new DashLine();
    // 为性能优化，画标准线段进行缩放
    static drawUnitLine({
        width = 1.2,
        color = '#000',
        isDash = false,
    } = {}) {
        return CommonForThree.drawDashOrLine([
            { x: -1, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
        ], {
                width,
                color,
                isDash
            });
    }
    // 缩放线段
    static scaleLine(startPos: any, endPos: any, line: THREE.Mesh, proportion: number = 1, ismake?: number) {
        const [x, y, z] = startPos;
        const [x1, y1, z1] = endPos;
        //  获取线段长度
        const len = Math.hypot(x1 - x, y1 - y, z1 - z);
        // 获得中点坐标
        const centerPos = [(x + x1) / 2, (y + y1) / 2, (z + z1) / 2];
        //  获取弧度
        const radZ = Math.atan2(y - y1, x - x1);
        const radY = Math.atan2(z - z1, x - x1); 
        line.scale.set(len / 2 * proportion, 1, 1);
        line.position.set(centerPos[0], centerPos[1], centerPos[2]);
        if (ismake === 1) {
            line.rotation.x = Math.atan2(z - z1, y - y1);
        }
        line.rotation.z = radZ;
        line.rotation.y = radY;
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
        (line.material as any).depthTest = depthTest;
        (line.material as any).depthWrite = depthTest;
        return line;
    }
    //画虚线
    static drawDresh(startPos: any, endPos: any, {color = '#000'} = {}) {
        const G = new THREE.Geometry();
        G.vertices.push(new THREE.Vector3(startPos[0], startPos[1], startPos[2]));
        G.vertices.push(new THREE.Vector3(endPos[0], endPos[1], endPos[2]));

        const line = new THREE.Line(G, new THREE.LineDashedMaterial({
            color,
            dashSize: 10,
            gapSize: 10
        }));
        line.computeLineDistances();
        return line;
    }
    //画实线
    static drawLine(startPos: any, endPos: any, {color = '#000'} = {}) {
        const G = new THREE.Geometry();
        G.vertices.push(new THREE.Vector3(startPos[0], startPos[1], startPos[2]));
        G.vertices.push(new THREE.Vector3(endPos[0], endPos[1], endPos[2]));
        return new THREE.Line(G, new THREE.LineBasicMaterial({
            color,
            depthTest: false
        }));
    }
    // 画圆
    static drawCircle(radius: number, {
        color = '#000',
        start = 0,
        end = Math.PI * 2,
        opacity = 1,
        segments = 36,
        isLay = false,
        position = [0, 0, 0],
        depthTest = false
    } = {}) {
        const CircleM = new THREE.MeshBasicMaterial({
            color,
            transparent: false,
            opacity,
            depthTest,
            side: THREE.DoubleSide,
        });
        const CircleG = new THREE.CircleGeometry(radius, segments, start, end);
        const Circle = new THREE.Mesh(CircleG, CircleM);
        if (isLay) {
            Circle.rotation.x = -Math.PI / 2;
        }
        Circle.position.set(position[0], position[1], position[2]);
        return Circle;
    }
    //画球
    static drawSphere(radiue: number, {
        color = '#F0E68C',
        s = 20,
        p = 10,
        opacity = 1,
        position = [0, 0, 0],
        depthTest = false
    } = {}) {
        const geometry = new THREE.SphereGeometry(radiue, s, p);
        const material = new THREE.MeshBasicMaterial({
            color,
            transparent: false,
            opacity,
            depthTest,
            side: THREE.DoubleSide,
        });
        const Sphere = new THREE.Mesh(geometry, material); 
        Sphere.position.set(position[0], position[1], position[2]);
        return Sphere;
    }
    // 画三角形
    static drawTriangle({ color = '#000' } = {}) {
        const shape = new THREE.Shape();
        shape.moveTo(0.5, 0);
        shape.lineTo(-3, 1);
        shape.lineTo(-3, -1);
        shape.lineTo(0.5, 0);
        return new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        }));
    }
    // 图片贴图
    static createImg(vertices: any, w: number, h: number, src: any) {
        const PlaneG = new THREE.PlaneGeometry(w, h);
        const PlaneM = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            overdraw: 0.2,
            depthTest: false,
            side: THREE.DoubleSide
        });
        const Plane = new THREE.Mesh(PlaneG, PlaneM);
        Plane.position.set(vertices[0], vertices[1], vertices[2]);
        return Plane;
    }
    // 画直角
    static drawRightAngle(length: number, { color = '#000', width = 1 } = {}) {
        return CommonForThree.drawDashOrLine([
            { x: 0, y: length, z: 0 },
            { x: length, y: length, z: 0 },
            { x: length, y: 0, z: 0 }
        ], { width, color });
    }
    // 画圆线
    static createStrokeCircle(radius: number, { color = '#000' } = {}) {
        const group = new THREE.Group();
        let x, y;
        const vertices = [];
        for (let i = 0; i < 361; i += 6) {
            x = radius * Math.cos(i / 180 * Math.PI);
            y = radius * Math.sin(i / 180 * Math.PI);
            vertices.push({ x, y, z: 0 });
        }
        const line = CommonForThree.drawDashOrLine(vertices, { color: color, width: 1, isDash: false});
        group.add(line);
        return group;
    }
    //中点坐标公式
    static midPos(startPos: any, endPos: any) {
        const disX = startPos[0] + endPos[0];
        const disY = startPos[1] + endPos[1];

        const midPos = [0, 0, 0];
        midPos[0] = disX / 2;
        midPos[1] = disY / 2;

        return midPos;
    }
    // 画角度 
    static drawAngle(startAngle: number, endAngle: number, {
        color = '#000',
        opacity = 1,
        size = 10,
        zIndex = 0,
        isAngle = true
    } = {}) {
        const group = new THREE.Group();
        const startRad = startAngle / 180 * Math.PI;
        const endRad = isAngle ? endAngle / 180 * Math.PI : endAngle;
        const angle = CommonForThree.drawCircle(size, { color, opacity, start: startRad, end: endRad });
        angle.position.z = zIndex;
        group.add(angle);
        return group;
    }
    //文字
    static createText(text: string, position: Array<number> = [0, 0, 0], { color = '#000', isItalic = false } = {}) {
        const str = isItalic ? 'italic' : '';
        const textStyle = { font: `${str} 40px "Times New Roman"`, fillStyle: color, antialias: true };
        const textMesh = new SpriteText2D(text, textStyle);
        textMesh.scale.set(0.3, 0.3, 0.3);
        textMesh.position.set(position[0], position[1], position[2]);
        textMesh.material.depthTest = false;
        return textMesh;
    }
    // 下标文字的特殊处理
    static createText1(text: string, position: Array<number> = [0, 0, 0], name: any, { color = '#000'} = {}) {
        const textStyle = { color };
        const textMesh = new CreateText().drawText(text, textStyle);
        textMesh.position.set(position[0], position[1], position[2]);
        textMesh.material.depthTest = false;
        textMesh.name = name;
        return textMesh;
    }
    // 画角度对称扇形
    static drawSector(startPos: Array<number>, orginPos: Array<number>, endPos: Array<number>, {
        color = '#000'
    } = {}) {
        const group = new THREE.Group();
        // 偏移到原点
        const offsetStartPos = [0, 0, 0];
        offsetStartPos[0] = startPos[0] - orginPos[0];
        offsetStartPos[1] = startPos[1] - orginPos[1];
        const offsetendPos = {} as any;
        offsetendPos[0] = endPos[0] - orginPos[0];
        offsetendPos[1] = endPos[1] - orginPos[1];
        // 获取需要画扇形五个关键点的坐标
        let startAngle = CommonForThree.getLineAngle([0, 0, 0], offsetStartPos);
        const endAngle = CommonForThree.getLineAngle([0, 0, 0], offsetendPos);
        if (endAngle > 180 && startAngle === 0) {
            startAngle = 360;
        }
        const quarterAngle = (endAngle - startAngle) / 4;
        const sectorStartPos = CommonForThree.getCirclePos(startAngle);
        const sectorEndPos = CommonForThree.getCirclePos(endAngle);
        const sectorCenterPos = CommonForThree.getCirclePos(startAngle + quarterAngle * 2);
        const sectorBezierPos1 = CommonForThree.getCirclePos(startAngle + quarterAngle, 11);
        const sectorBezierPos2 = CommonForThree.getCirclePos(startAngle + quarterAngle * 3, 11);
        group.add(CommonForThree.sectorShape(sectorStartPos, sectorBezierPos1, sectorCenterPos, sectorBezierPos2, sectorEndPos, color));
        group.position.set(orginPos[0], orginPos[1], 0);
        return group;

    }
    static getVecPos(startPos: Array<number>, endPos: Array<number>, xishu: Array<number> = [1]) {
        const resArr = [] as any;
        xishu.forEach(num => {
            const vecPos = [0, 0, 0];
            vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
            vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
            resArr.push(vecPos);
        });

        return resArr;
    }
    static getLineAngle(startPos: Array<number>, endPos: Array<number>, onlyRad?: boolean) {
        let angle: number;
        const rad = Math.atan2(endPos[1] - startPos[1], endPos[0] - startPos[0]);
        if (onlyRad) { return rad; }
        angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        return angle;
    }

    static sectorShape(pos1: Array<number>, pos2: Array<number>,
        pos3: Array<number>, pos4: Array<number>, pos5: Array<number>, color = '#0f0') {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(pos1[0], pos1[1]);
        shape.quadraticCurveTo(pos2[0], pos2[1], pos3[0], pos3[1]);
        shape.quadraticCurveTo(pos4[0], pos4[1], pos5[0], pos5[1]);
        shape.lineTo(0, 0);
        const G = new THREE.ShapeGeometry(shape, 10);
        const M = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        });
        const setor = new THREE.Mesh(G, M);
        G.dispose();
        M.dispose();

        setor.position.z = -2;
        return setor;
    }
    static getCirclePos(radius: number, len = 8) {
        const pos = [0, 0, 0];
        pos[0] = len * Math.cos(radius * Math.PI / 180);
        pos[1] = len * Math.sin(radius * Math.PI / 180);
        return pos;
    }

  /**
   * @param startPos
   * @param endPos
   * @param line
   * @param numb
   */
    static lineAni(startPos: Array<number>, endPos: Array<number>, line: THREE.Mesh, numb: number) {
        return new Promise((resolve, reject) => {
            let num = 0.01;
            let timer: any = null;
            function ani() {
                const vecPos = [0, 0, 0];
                if (numb === 1) {
                    vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
                    vecPos[1] = startPos[1];
                    vecPos[2] = startPos[2];
                } else if (numb === 2) {
                    vecPos[0] = startPos[0];
                    vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
                    vecPos[2] = startPos[2];
                } else if (numb === 3) {
                    vecPos[0] = startPos[0];
                    vecPos[1] = startPos[1];
                    vecPos[2] = startPos[2] + (endPos[2] - startPos[2]) * num;
                }
                line = CommonForThree.scaleLine(startPos, vecPos, line);
                num += 0.01;
                if (num > 1) {
                    line = CommonForThree.scaleLine(startPos, endPos, line);
                    cancelAnimationFrame(timer);

                    resolve(line);
                    reject(line);
                    return;
                }
                timer = requestAnimationFrame(ani);
            }
            ani();
        });
    }
    // 计算点到直线垂足坐标
    static perpendicularPoint(linePoint1: any, linePoint2: any, point: any) {
        const rad = Math.atan2(linePoint1[1] - linePoint2[1], linePoint1[0] - linePoint2[0]);
        const corssPointPos = [0, 0, -1];
        if (rad * 180 / Math.PI !== 90) {
            const k = Math.tan(rad);
            if (k === 0) {
                corssPointPos[0] = point[0];
                corssPointPos[1] = linePoint1[1];
            } else {
                const b = linePoint1[1] - linePoint1[0] * k;
                const k1 = -1 / k;
                const b1 = point[1] - point[0] * k1;
                corssPointPos[0] = (b1 - b) / (k - k1);
                corssPointPos[1] = k * corssPointPos[0] + b;
            }

        } else {
            corssPointPos[0] = linePoint1[0];
            corssPointPos[1] = point[1];
        }
        return { rad, pos: corssPointPos };
    }
    static setPerpendicularPosAndRotate(obj: any, mesh: any, num: number) {
        mesh.position.set(...obj.pos);
        if (num === 1) {
            mesh.rotation.z = obj.rad;
        } else if (num === 2) {

            mesh.rotation.z = obj.rad;
        } else if (num === 3) {

            mesh.rotation.z = obj.rad + Math.PI;
        } else if (num === 4) {

            mesh.rotation.z = obj.rad + Math.PI / 2;
        } else if (num === 5) {

            mesh.rotation.z = obj.rad - Math.PI / 2;
        }
    }
    static basicTriangleInfo(a: any, b: any, c: any) {
        const disA = Math.hypot(b[0] - c[0], b[1] - c[1]);
        const disB = Math.hypot(a[0] - c[0], a[1] - c[1]);
        const disC = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const res = {} as any;
        res.a = {} as any;
        res.b = {} as any;
        res.c = {} as any;
        res.a.length = disA;
        res.b.length = disB;
        res.c.length = disC;
        res.a.pos = a;
        res.b.pos = b;
        res.c.pos = c;
        res.a.rad = Math.acos((disB * disB + disC * disC - disA * disA) / 2 / disB / disC);
        res.b.rad = Math.acos((disA * disA + disC * disC - disB * disB) / 2 / disA / disC);
        res.c.rad = Math.acos((disB * disB + disA * disA - disC * disC) / 2 / disB / disA);
        res.a.angle = res.a.rad * 180 / Math.PI;
        res.b.angle = res.b.rad * 180 / Math.PI;
        res.c.angle = res.c.rad * 180 / Math.PI;
        const arr = [Math.round(res.a.angle), Math.round(res.b.angle), Math.round(res.c.angle)];
        arr.sort(() => {
            return a - b;
        });
        res.info = (arr[0] === arr[1] && arr[1] === arr[2]) ? '等边三角形' : arr[2] === 90 ? '直角三角形' : arr[2] > 90 ? '钝角三角形' : '锐角三角形';
        return res;
    }
    static twoLineIcon({ color = '#000' } = {}) {
        const group = new THREE.Group();
        const line1 = CommonForThree.drawUnitLine({ color, width: 1 });
        const line2 = line1.clone();
        line1.position.y = 0.5;
        line2.position.y = -0.5;
        group.add(line1, line2);
        return group;
    }
}
