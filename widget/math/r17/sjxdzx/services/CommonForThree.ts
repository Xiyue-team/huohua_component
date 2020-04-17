import * as THREE from 'three';

import { DashLine } from './DashLine';
import { SpriteText2D } from 'three-text2d';
import { resolve } from 'url';
import * as console from 'console';
import { setTimeout, clearTimeout } from 'timers';
export default class CommonForThree {
    private static dashLine = new DashLine();
    // 为性能优化，画标准线段进行缩放
    static drawUnitLine({
        width = 1,
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
        depthTest = true
    } = {}) {
        const line = this.dashLine.addLine(pointArr, color, width * 1000, isDash);
        line.material.depthTest = depthTest;
        line.material.depthWrite = depthTest;
        return line;
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
        depthTest = true
    } = {}) {
        const CircleM = new THREE.MeshBasicMaterial({
            color,
            transparent: false,
            opacity,
            depthTest
        });
        const CircleG = new THREE.CircleGeometry(radius, segments, start, end);
        const Circle = new THREE.Mesh(CircleG, CircleM);
        if (isLay) {
            Circle.rotation.x = -Math.PI / 2;
        }
        Circle.position.set(position[0], position[1], position[2]);
        return Circle;
    }
    //画椭圆
    static drawEllipseCurve(xRadius: number, yRadius: number, {
        color = '#000',
        aX = 0,
        aY = 0,
        aStartAngle = 0,
        aEndAngle = 2.0 * Math.PI,
        aClockwise = true,
        opacity = 1,
        depthTest = true,
    } = {}) {
        const ellipse = new THREE.EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, 0);
        const material = new THREE.LineBasicMaterial({
            color,
            opacity,
            transparent: true,
            depthTest,
        });
        const ellipsePath = new THREE.CurvePath();
        ellipsePath.add(ellipse);
        const ellipseGeometry = ellipsePath.createPointsGeometry(100);
        // ellipseGeometry.computeTangents();
        const line = new THREE.Line(ellipseGeometry, material);
        return line;
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
    // 画直角
    static drawRightAngle(length: number, { color = '#000', width = 1 } = {}) {
        const line = CommonForThree.drawDashOrLine([
            { x: 0, y: length, z: 0 },
            { x: length, y: length, z: 0 },
            { x: length, y: 0, z: 0 }
        ], { width, color });
        return line;
    }
    // 画三角形
    static drawTriangle({ color = '#000' } = {}) {
        const shape = new THREE.Shape();
        shape.moveTo(0.5, 0);
        shape.lineTo(-3, 1);
        shape.lineTo(-3, -1);
        shape.lineTo(0.5, 0);
        const trianle = new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        }))
        trianle.position.z = -1;
        return trianle;
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
        const line = CommonForThree.drawDashOrLine(vertices, { color });
        group.add(line);
        return group;
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
    static createText(text: string, position: Array < number > = [0, 0, 0], { color = '#000', isItalic = true } = {}) {
        const str = isItalic ? 'italic' : '';
        const textStyle = { font: `${str} 40px "Times New Roman"`, fillStyle: color, antialias: true };
        const textMesh = new SpriteText2D(text, textStyle);
        textMesh.scale.set(0.15, 0.15, 0.15);
        textMesh.position.set(position[0], position[1], position[2]);
        textMesh.material.depthTest = false;
        return textMesh;
    }
    // 画角度对称扇形
    static drawSector(startPos: Array < number > , orginPos: Array < number > , endPos: Array < number > , {
        color = '#000'
    } = {}) {
        const group = new THREE.Group();
        // 偏移到原点
        const offsetOrginPos = [0, 0, 0]
        const offsetStartPos = [0, 0, 0];
        offsetStartPos[0] = startPos[0] - orginPos[0];
        offsetStartPos[1] = startPos[1] - orginPos[1];
        const offsetendPos = {} as any;
        offsetendPos[0] = endPos[0] - orginPos[0];
        offsetendPos[1] = endPos[1] - orginPos[1];
        // 获取需要画扇形五个关键点的坐标
        const startAngle = CommonForThree.getLineAngle([0, 0, 0], offsetStartPos);
        const endAngle = CommonForThree.getLineAngle([0, 0, 0], offsetendPos);
        const quarterAngle = (endAngle - startAngle) / 4;
        const sectorStartPos = CommonForThree.getCirclePos(startAngle);
        const sectorEndPos = CommonForThree.getCirclePos(endAngle);
        const sectorCenterPos = CommonForThree.getCirclePos(startAngle + quarterAngle * 2);
        const sectorBezierPos1 = CommonForThree.getCirclePos(startAngle + quarterAngle, 13);
        const sectorBezierPos2 = CommonForThree.getCirclePos(startAngle + quarterAngle * 3, 13);
        group.add(CommonForThree.sectorShape(sectorStartPos, sectorBezierPos1, sectorCenterPos, sectorBezierPos2, sectorEndPos, color))
        group.position.set(orginPos[0], orginPos[1], 0);
        return group;

    }
    static getVecPos(startPos: Array < number > , endPos: Array < number > , xishu: Array < number > = [1]) {
        const dis = Math.hypot(endPos[0] - startPos[0], endPos[1] - startPos[1]);
        let resArr = [] as any;
        xishu.forEach(num => {
            const vecPos = [0, 0, 0];
            vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
            vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
            resArr.push(vecPos);
        })

        return resArr;
    }
    static getLineAngle(startPos: Array < number > , endPos: Array < number > , onlyRad ? : boolean) {
        let angle = 0;
        const rad = Math.atan2(endPos[1] - startPos[1], endPos[0] - startPos[0]);
        if (onlyRad) return rad;
        angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        return angle;
    }
    static sectorShape(pos1: Array < number > , pos2: Array < number > , pos3: Array < number > , pos4: Array < number > , pos5: Array < number > , color ? : String = '#0f0') {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(pos1[0], pos1[1]);
        shape.quadraticCurveTo(pos2[0], pos2[1], pos3[0], pos3[1]);
        shape.quadraticCurveTo(pos4[0], pos4[1], pos5[0], pos5[1]);
        shape.lineTo(0, 0);
        const setor = new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            depthTest: true,
        }))
        setor.position.z = -2;
        return setor;
    }
    static getCirclePos(radius: number, len ? : number = 10) {
        const pos = [0, 0, 0];
        pos[0] = len * Math.cos(radius * Math.PI / 180);
        pos[1] = len * Math.sin(radius * Math.PI / 180);
        return pos;
    }

  static zhongDian(point1: any, point2: any) {
    const x1 = (point1[0] + point2[0]) / 2;
    const y1 = (point1[1] + point2[1]) / 2;
    const z1 = (point1[2] + point2[2]) / 2;


    const one = [x1, y1, z1];
    return {pos: one};
  }
    /**
     * @param {起始点位置}
     * @param {终点位置}
     * @param {需要缩放的线段}
     */
    static lineAni(startPos: Array < number > , endPos: Array < number > , line: THREE.Mesh, arrow ?: THREE.Mesh) {
        return new Promise((resolve, reject) => {
            const dis = Math.hypot(endPos[0] - startPos[0], endPos[1] - startPos[1]); //平方和开根号
            let num = 0.01;
            let timer1: any = null;
            if (arrow) {
                const rad = Math.atan2(startPos[1] - endPos[1], startPos[0] - endPos[0]);

                arrow.rotation.z = rad + Math.PI;
            }

            function ani() {
                const vecPos = [0, 0, 0];
                vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
                vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
                line = CommonForThree.scaleLine(startPos, vecPos, line);

                arrow && arrow.position.set(...vecPos);
                num += 0.02;
                if (num > 1) {
                    line = CommonForThree.scaleLine(startPos, endPos, line);
                    arrow && arrow.position.set(...vecPos);
                    cancelAnimationFrame(timer1);

                    resolve(line);
                    return;
                }
                timer1 = requestAnimationFrame(ani);
            }
            ani();
        });
    }

    //线平移动画
    static linePushAlin(point1: any, point2: any, point3: any, point4: any, line1: any,
         line2: any, startPos: any, startPos1: any, endPos: any, Arrow1 ?: THREE.Mesh, Arrow2 ?: THREE.Mesh) {
        return new Promise((resolve, reject) => {
        const x1 = (point1[0] + point2[0]) / 2;
        const y1 = (point1[1] + point2[1]) / 2;
        const x2 = (point1[0] + point4[0]) / 2;
        const y2 = (point1[1] + point4[1]) / 2;

        const midPoint1: any = [];
        midPoint1.push(x1, y1, 0);

        const midPoint2: any = [];
        midPoint2.push(x2, y2, 0);

        let num = 0.01;
        let timer: any = null;
        
        function ani() {
            const vecPos = [0, 0, 0];
            vecPos[0] = line1.position.x + (midPoint1[0] - line1.position.x) * num;
            vecPos[1] = line1.position.y + (midPoint1[1] - line1.position.y) * num;
            line1.position.set(vecPos[0], vecPos[1], 0);

            const vecPos1 = [0, 0, 0];
            vecPos1[0] = line2.position.x + (midPoint2[0] - line2.position.x) * num;
            vecPos1[1] = line2.position.y + (midPoint2[1] - line2.position.y) * num;
            line2.position.set(vecPos1[0], vecPos1[1], 0);

            const vecPos2 = [0, 0, 0];
            vecPos2[0] = startPos.x + (endPos[0] - startPos.x) * num;
            vecPos2[1] = startPos.y + (endPos[1] - startPos.y) * num;
            Arrow1.position.set(vecPos2[0], vecPos2[1], 0);
            

            const vecPos3 = [0, 0, 0];
            vecPos3[0] = startPos1.x + (endPos[0] - startPos1.x) * num;
            vecPos3[1] = startPos1.y + (endPos[1] - startPos1.y) * num;
            Arrow2.position.set(vecPos3[0], vecPos3[1], 0);
            
            num += 0.002;

            if (num > 0.15) {
                line1.position.set(midPoint1[0], midPoint1[1], midPoint1[2]);
                line2.position.set(midPoint2[0], midPoint2[1], midPoint2[2]);

                Arrow1.position.set(endPos[0], endPos[1], 0);
                Arrow2.position.set(endPos[0], endPos[1], 0);
                cancelAnimationFrame(timer);

                const Arr = [];
                Arr.push(line1, line2, Arrow1, Arrow2);
                resolve(Arr);
                return;
            }
            timer = requestAnimationFrame(ani);
        }
        ani();
    });
    }

    //箭头动画
    static arrowAni (startPos: any, endPos: any, Arrow: any) {
        return new Promise((resolve, reject) => {
            
            let num = 0.01;
            let timer: any = null;
            function ani () {
                const vecPos = [0, 0, 0];
                
                vecPos[0] = startPos.x + (endPos[0] - startPos.x) * num;
                vecPos[1] = startPos.y + (endPos[1] - startPos.y) * num;
                Arrow.position.set(vecPos[0], vecPos[1], 0);

                num += 0.002;
                if (num > 1) {
                    Arrow.position.set(endPos[0], endPos[1], 0);
                    cancelAnimationFrame(timer);
                    
                    resolve(Arrow);
                    return;
                }
                timer = requestAnimationFrame(ani);
            }
            ani();
        });
    }
    //计算点关于直线对称
    static pointLine(linePoint1: any, linePoint2: any, point: any) {
        const AX = (linePoint2[1] - linePoint1[1]) * point[0];
        const BY = -(linePoint2[0] - linePoint1[0]) * point[1];
        const C = ((linePoint1[1] - linePoint2[1]) * linePoint1[0] + (linePoint2[0] - linePoint1[0]) * linePoint1[1]);
        const A2 = (linePoint2[1] - linePoint1[1]) * (linePoint2[1] - linePoint1[1]);
        const B2 = (linePoint2[0] - linePoint1[0]) * (linePoint2[0] - linePoint1[0]);

        const X = point[0] - 2 * (linePoint2[1] - linePoint1[1]) * ((AX + BY + C) / (A2 + B2));
        const Y = point[1] + 2 * (linePoint2[0] - linePoint1[0]) * ((AX + BY + C) / (A2 + B2));

        const Arr = [];
        Arr.push(X, Y, 0);

        return Arr;
    }

    //平行四边形
    static pxsbx(point1: any, point2: any, point3: any) {
        const X = point2[0] + point3[0] - point1[0];
        const Y = point2[1] + point3[1] - point1[1];
        const one = [];
        one.push(X, Y, 0);

        const X1 = point1[0] + point3[0] - point2[0];
        const Y1 = point1[1] + point3[1] - point2[1];
        const one1 = [];
        one1.push(X1, Y1, 0);

        const X2 = point1[0] + point2[0] - point3[0];
        const Y2 = point1[1] + point2[1] - point3[1];
        const one2 = [];
        one2.push(X2, Y2, 0);


        return one2;
    }
    // 计算点到直线垂足坐标
    static perpendicularPoint(linePoint1: any, linePoint2: any, point: any) {
        const rad = Math.atan2(linePoint1[1] - linePoint2[1], linePoint1[0] - linePoint2[0]);
        let corssPointPos = [0, 0, -1];
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

          mesh.rotation.z = obj.rad +  Math.PI / 2;
        } else if (num === 5) {

          mesh.rotation.z = obj.rad -  Math.PI / 2;
        }
    }
    static basicTriangleInfo(a: any, b: any, c: any) {
        const disA = Math.hypot(b[0] - c[0], b[1] - c[1]);
        const disB = Math.hypot(a[0] - c[0], a[1] - c[1]);
        const disC = Math.hypot(b[0] - a[0], b[1] - a[1]);
        let res = {} as any;
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
        res.a.angle = Math.round(res.a.rad * 180 / Math.PI);
        res.b.angle = Math.round(res.b.rad * 180 / Math.PI);
        res.c.angle = Math.round(res.c.rad * 180 / Math.PI);
        const arr = [res.a.angle, res.b.angle, res.c.angle];
        arr.sort((a, b) => {
            return a - b;
        });
        res.info = (arr[0] === arr[1] && arr[1] === arr[2]) ? '等边三角形' : arr[2] === 90 ? '直角三角形' : arr[2] > 90 ? '钝角三角形' : '锐角三角形';
        return res;
    }

    //输出三个角的度数
    static exportDeg (x0: number, y0: number, x: number, y: number, x1: number, y1: number) {
    //x0，y0为拖动点的x轴,y轴坐标
    //x，x1分别为定点x轴坐标
    //y, y1分别为定点y轴坐标
 
      const hudu = Math.atan2(y0 - y, x0 - x);
      const B = hudu * 180 / Math.PI;

      const hudu1 = Math.atan2(y0 - y1, x0 - x1);
      const C = 180 - hudu1 * 180 / Math.PI;
      
      const A = 180 - B - C;
      const hudu2 = ((180 - B - C ) * Math.PI) / 180;
      
      const Arr = [];
      Arr.push(hudu2, hudu, hudu1, A, B, C);

      return Arr;
  }

  static twoLineIcon({ color = '#000' } = {}) {
    const group = new THREE.Group();
    const line1 = CommonForThree.drawUnitLine({ color });
    const line2 = line1.clone();
    line1.position.y = 0.5;
    line2.position.y = -0.5;
    group.add(line1, line2);
    return group;
}
}
