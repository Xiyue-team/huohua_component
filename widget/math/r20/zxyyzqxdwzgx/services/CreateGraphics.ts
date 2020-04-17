import * as THREE from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Line} from '../../../../../src/three/component/Line';
import * as gongshi1 from '../sub_static/gongshi1.png';
import * as gongshi2 from '../sub_static/gongshi2.png';
export class CreateGraphics {
    // 创建圆
    //计算出圆上点
    //将点传入管道
    //绘制圆
    drawCircle() {
        const circleX = [];
        const circleY = [];
        const points = [];
        const scale = 10;
        const circle = new THREE.Group();
        let i: number;
        let j: number;
        for (i = -3; i <= 3; i += 0.05) {
            circleY.push(i);
            circleX.push(Math.sqrt(9 - Math.pow( i , 2)));
        }
        for (j = 0; j < circleY.length; j++) {
            points.push(new THREE.Vector3(circleX[j] * scale, circleY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(points, 0.5, points.length * 2, '#000000');
        const curve1 = curve.clone();
        curve1.rotateZ(Math.PI);
        circle.add(curve);
        circle.add(curve1);
        return circle;
    }

    //创建椭圆
    //计算出椭圆上的点
    //将点传入管道
    //绘制椭圆
    drawEllipse() {
        const hyperbolaX = [];
        const hyperbolaY = [];
        const points = [];
        const ellipse = new THREE.Group();
        const scale = 10;
        let i: number;
        let j: number;
        for (i = -6; i <= 6; i += 0.01) {
            hyperbolaX.push(i);
            hyperbolaY.push(Math.sqrt(11 - (11 * Math.pow(i, 2) / 36)));
        }

        for (j = 0; j < hyperbolaX.length; j++) {
            points.push(new THREE.Vector3(hyperbolaX[j] * scale, hyperbolaY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(points, 0.5, points.length * 2, '#000000');
        const curve1 = curve.clone();
        curve1.rotateZ(Math.PI);
        ellipse.add(curve);
        ellipse.add(curve1);
        return ellipse;
    }

    //创建抛物线
    //计算出抛物线上的点
    //将点传入管道
    //绘制抛物线
    drawParabola() {
        const parabolaY = [];
        const parabolaX = [];
        const point = [];
        const point1 = [];
        const scale = 10;
        let i: number;
        let j: number;
        for (i = 14; i >= 0; i -= 0.25) {
            parabolaY.push(i);
            parabolaX.push((Math.pow(i, 2)) / 12);
        }

        for (j = 0; j < parabolaX.length; j++) {
            point.push(new THREE.Vector3(parabolaX[j] * scale, parabolaY[j] * scale, -0.5));
            point1.push(new THREE.Vector3(parabolaX[j] * scale, -parabolaY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(point, 0.5, point.length, '#000000');
        const curve1 = ThreeUtil.createTube(point1, 0.5, point.length, '#000000');
        const group = new THREE.Group();
        group.add(curve);
        group.add(curve1);
        return group;
    }

    //创建双曲线
    //计算双曲线上的点
    //将点传入管道
    //绘制双曲线
    drawHyperbola() {
        const hyperbolaX = [];
        const hyperbolaY = [];
        const points = [];
        const group = new THREE.Group();
        const scale = 10;
        let i: number;
        let j: number;
        const a = 9;
        const b = 16;
        for (i = -3; i >= -10; i -= 0.01) {
            hyperbolaX.push(i);
            hyperbolaY.push(Math.sqrt((b * Math.pow(i, 2) / a) - b));
        }

        for (j = 0; j < hyperbolaX.length; j++) {
            points.push(new THREE.Vector3(hyperbolaX[j] * scale, hyperbolaY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(points, 0.5, points.length * 2, '#000000');
        const curve1 = curve.clone();
        curve.rotateX(Math.PI);
        group.add(curve);
        group.add(curve1);
        const group1 = group.clone();
        group1.rotateZ(Math.PI);
        const group2 = new THREE.Group();
        group2.add(group, group1);
        return group2;
    }

    //创建渐近线虚线的方法
    drawAsymptote() {
        const createLineHelper = new Line();
        const startPoint = new THREE.Vector3(150, 0, 0);
        const endPoint = new THREE.Vector3(-150, 0, 0);
        const isIos = (window as any)['env'].browserInfo.os === 'iOS';
        const lineWidth = isIos ? 3 : 1500;
        const dashSize = isIos ? 5 : 1.5;
        const color = '#0199FF';
        const depthTest = false;
        const image1 = ThreeUtil.createImg(17.4, 13.8, gongshi1, 120, 20);
        const image2 = ThreeUtil.createImg(22.2, 13.8, gongshi2, -120, 20);
        const asymptoteObj1 = createLineHelper.createLine(
            {startPoint: startPoint, endPoint: endPoint, lineWidth: lineWidth, color: color,
                depthTest: depthTest, dashLine: true, dashSize: dashSize, gapSize: 2.5});
        const asymptoteObj2 = createLineHelper.createLine(
            {startPoint: startPoint, endPoint: endPoint, lineWidth: lineWidth, color: color,
                depthTest: depthTest, dashLine: true, dashSize: dashSize, gapSize: 2.5});
        const angle = Math.atan(4 / 3);
        const asymptote1 = new THREE.Group();
        asymptote1.add(asymptoteObj1);
        asymptote1.rotateZ(angle);
        const asymptote2 = new THREE.Group();
        asymptote2.add(asymptoteObj2);
        asymptote2.rotateZ(-angle);
        image1.rotation.z = -angle;
        image2.rotation.z = angle;
        asymptote1.add(image1);
        asymptote2.add(image2);
        const asymptote = {
            dashLine1: asymptote1,
            dashLine2: asymptote2,
        };
        return asymptote;
    }
}

