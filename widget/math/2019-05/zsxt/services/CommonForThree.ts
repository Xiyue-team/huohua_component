import * as THREE from 'three';

import { DashLine } from './DashLine';
import { SpriteText2D } from 'three-text2d';
export default class CommonForThree {
    private static dashLine = new DashLine();
    // 为性能优化，画标准线段进行缩放
    static drawUnitLine({
        width = 1,
        color = '#000',
        isDash = false,
    } = {}) {
        if (!isDash) {
            const geometry = new THREE.PlaneBufferGeometry(2, width, 1);
            const material = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide,
        
            });
            const plane = new THREE.Mesh(geometry, material);
            return plane;
        } else {
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
    /**
   * @param {起始点位置}
   * @param {终点位置}
   * @param {需要缩放的线段}
   */
  static lineAni(startPos: Array<number>, endPos: Array<number>, line: THREE.Mesh) {
    return new Promise((resolve, reject) => {
      const dis = Math.hypot(endPos[0] - startPos[0], endPos[1] - startPos[1]);
      let num = 0.01;
      let timer: any = null;

      function ani() {
        const vecPos = [0, 0, 0];
        vecPos[0] = startPos[0] + (endPos[0] - startPos[0]) * num;
        vecPos[1] = startPos[1] + (endPos[1] - startPos[1]) * num;
        line = CommonForThree.scaleLine(startPos, vecPos, line);
        num += 0.01;
        if (num > 1) {
          line = CommonForThree.scaleLine(startPos, endPos, line);
          cancelAnimationFrame(timer);

          resolve(line);
          return;
        }
        timer = requestAnimationFrame(ani);
      }
      ani();
    });
  }
    // 画线
    static drawDashOrLine(pointArr: any, {
        width = 1,
        color = '#000',
        isDash = false,
    } = {}) {
        const line = this.dashLine.addLine(pointArr, color, width * 1000, isDash);
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
            transparent: true,
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
    static drawEllipseCurve (xRadius: number, yRadius: number, {
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
            depthTest: false
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
    static drawAngle(startAngle: number, endAngle: number, { color = '#000', opacity = 1, size = 10, zIndex = 0,
        isAngle = true } = {}) {
        const group = new THREE.Group();
        const startRad = startAngle / 180 * Math.PI;
        const endRad = isAngle ? endAngle / 180 * Math.PI : endAngle;
        const angle = CommonForThree.drawCircle(size, { color, opacity, start: startRad, end: endRad });
        angle.position.z = zIndex;
        group.add(angle);
        return group;
    }
    static createText(text: string, position: Array<number> = [0, 0, 0], { color = '#000', isItalic = false,
     font = 'fdf' } = {}) {
        const str = isItalic ? 'italic' : '';
        const textStyle = { font: `${str} 40px ${font}`, fillStyle: color, antialias: true };
        const textMesh = new SpriteText2D(text, textStyle);
        textMesh.scale.set(0.15, 0.15, 0.15);
        textMesh.position.set(position[0], position[1], position[2]);
        textMesh.material.depthTest = false;
        return textMesh;
    }
}
