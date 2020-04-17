import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import * as THREE from 'three';
import {BrowserInfo} from "../../../../../src/model/BrowserInfo";
import {BrowserUtil} from "../../../../../src/util/BrowserUtil";
import {Line} from '../../../../../src/three/component/Line';

const OBJLoader = require('three-obj-loader');

// const MeshLine = require('three.meshline').MeshLine;
// const MeshLineMaterial = require('three.meshline').MeshLineMaterial;

OBJLoader(THREE);

export class TemplateHelper {
    browserInfo: BrowserInfo;

    constructor() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    createDragPoint() {
        const point = ThreeUtil.createPoint(5, '#ffffff', 0, 0, 0.36);
        const smallPoint = ThreeUtil.createPoint(1.5, '#0199ff', 0, 0, 1);
        point.add(smallPoint);
        return point;
    }

    //判断三点是否共线
    //通过三角形面积来判断是否三点共线
    //传入三角形三个顶点 a,b,c 返回一个boolean值
    isCollinear(a: THREE.Mesh, b: THREE.Mesh, c: THREE.Mesh): boolean {
        let s1 = (a.position.x - c.position.x) * (b.position.y - c.position.y);
        let s2 = (b.position.x - c.position.x) * (a.position.y - c.position.y);
        let minue = s1 - s2;
        if ((minue > -100 && minue <= 0) || (minue >= 0 && minue < 100)) {
            return true;
        } else {
            return false;
        }
    }

    //传入两点坐标获取倾斜角的方法
    getStartAngle(x1: number, y1: number, x2: number, y2: number): any {
        let slope: number;
        let tiltAngle: number;
        if (x1 === x2) {
            slope = undefined;
        } else {
            slope = (y2 - y1) / (x2 - x1);
        }

        if (slope === undefined) {
            tiltAngle = Math.PI / 2;
        } else {
            tiltAngle = Math.atan(slope);
        }
        return tiltAngle;
    }

    // 已知两点坐标求斜率
    getSlope(x1: number, y1: number, x2: number, y2: number) {
        let slope: number;
        if (x1 === x2) {
            return null;
        }
        slope = (y2 - y1) / (x2 - x1);
        return slope;
    }

    // 已知三点求角度(O(x1, y1), A(x2, y2), B(x3, y3) 求角A的角度）
    getAngle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        let lengthOA = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        let lengthOB = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
        let lengthAB = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
        let cosO = (Math.pow(lengthOA, 2) + Math.pow(lengthOB, 2) - Math.pow(lengthAB, 2)) / (2 * lengthOA * lengthOB);
        let angleO = Math.round(Math.acos(cosO) * 180 / Math.PI);
        return angleO;
    }

    // 判断点在线段哪一册(A(x1, y1), B(x2, y2), O(x0, y0))
    judgeDirection(x1: number, y1: number, x2: number, y2: number, x0: number, y0: number) {
        let formula = (x2 - x1) * (y0 - y1) - (y2 - y1) * (x0 - x1);
        if (formula > 0) {
            return 'right';
        } else {
            return 'left';
        }
    }

    // 已知两点求线段长度
    getLineLength(x1: number, y1: number, x2: number, y2: number) {
        let length = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        return length;
    }

    // 传入三点画直角 A(x1, y1), B(x2, y2), c(x3, y3)
    drawVerticalAngle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string) {
        const group = new THREE.Group();
        let line = new Line();
        let line1 = line.createLine({
                startPoint: new THREE.Vector3(x3, y3, 1),
                endPoint: new THREE.Vector3(x1, y1, 1),
                lineWidth: 1000,
                lineWidthScale: 1 / 500,
                color: color
            }
        );
        let line2 = line.createLine({
                startPoint: new THREE.Vector3(x3, y3, 1),
                endPoint: new THREE.Vector3(x2, y2, 1),
                lineWidth: 1000,
                lineWidthScale: 1 / 500,
                color: color
            }
        );

        group.add(line1, line2);
        return group
    }


    /**
     * 求圆和直线之间的交点
     * 直线方程：y = kx + b
     * 圆的方程：(x - m)² + (x - n)² = r²
     * x1, y1 = 线坐标1, x2, y2 = 线坐标2, m, n = 圆坐标, r = 半径
     */
    getInsertPointBetweenCircleAndLine(x1: number, y1: number, x2: number, y2: number, m: number, n: number, r: number) {
        // console.log(x1, y1, x2, y2, m, n, r)
        let kbArr = this.binaryEquationGetKB(x1, y1, x2, y2)
        let k = kbArr[0]
        let b = kbArr[1]

        let aX = 1 + k * k
        let bX = 2 * k * (b - n) - 2 * m
        let cX = m * m + (b - n) * (b - n) - r * r

        let insertPoints: any = []
        let xArr = this.quadEquationGetX(aX, bX, cX)
        xArr.forEach(x => {
            let y = k * x + b
            insertPoints.push({ x: x, y: y })
        })
        return insertPoints
    }
    /**
     * 求二元一次方程的系数
     * y1 = k * x1 + b => k = (y1 - b) / x1
     * y2 = k * x2 + b => y2 = ((y1 - b) / x1) * x2 + b
     */
    private binaryEquationGetKB(x1: number, y1: number, x2: number, y2: number) {
        let k = (y1 - y2) / (x1 - x2)
        let b = (x1 * y2 - x2 * y1) / (x1 - x2)
        return [k, b]
    }

    /**
     * 一元二次方程求根
     * ax² + bx + c = 0
     */
    public quadEquationGetX(a: number, b: number, c: number) {
        let xArr = []
        let result = Math.pow(b, 2) - 4 * a * c
        if (result > 0) {
            xArr.push((-b + Math.sqrt(result)) / (2 * a))
            xArr.push((-b - Math.sqrt(result)) / (2 * a))
        } else if (result == 0) {
            xArr.push(-b / (2 * a))
        }
        return xArr
    }


}
