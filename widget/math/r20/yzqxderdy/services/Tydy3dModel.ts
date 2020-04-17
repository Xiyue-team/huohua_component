import * as THREE from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);

import * as mPoint from '../sub_static/mPoint.png';
import * as nPoint from '../sub_static/nPoint.png';
import * as pen from '../sub_static/pen.png';
import * as xDashLine from '../sub_static/xDashLine.png';
import * as yDashLine from '../sub_static/yDashLine.png';
import * as f1PointImg from '../sub_static/f1Point.png';
import * as f2PointImg from '../sub_static/f2Point.png';
import * as f1yPointImg from '../sub_static/f1yPoint.png';
import * as f2yPointImg from '../sub_static/f2yPoint.png';

import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { Linear, TweenMax } from 'gsap';
import { LineHelper } from './LineHelper';

export class Tydy3dModel extends ThreeBase {

    colorLine = new Line();
    color = '#000';
    textN: any;
    solidLine: any = [];
    ellipse: any;
    mArea: any;
    obj1 = new THREE.Group();
    obj2 = new THREE.Group();
    animation: any;
    leftEllipse: any;
    rightEllipse: any;
    count = 0;
    a = 60;
    c = 50;
    b = Math.sqrt(Math.pow(this.a, 2) - Math.pow(this.c, 2));

    //松开鼠标画点集合
    movePointArray: any = [];
    lineHelper = new LineHelper();

    constructor(scene?: any , camrea?: any, renderer?: any) {
        super();
        this.scene = scene;
        this.camera = camrea;
        this.renderer = renderer;

        this.createEllipse();
        this.addDragPoint();
        this.addDragPointOnYAxis();

        this.drawSupportLine();
        this.bindEvent();
        this.drawSupLine(51, Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
          Math.pow(this.a, 2)) * Math.pow(51, 2))));

        this.drawEllipseAnimation();
        this.createEllipseOnYAxis();
    }

    //绘制椭圆
    createEllipse() {
        const curve = new THREE.EllipseCurve(
          0,  0,
          this.a, this.b,
          Math.PI / 6,   Math.PI / 6 - 2 * Math.PI,
          true,
          0
        );
        const path = new THREE.Path( curve.getPoints( 3000 ) );
        const geometry = path.createPointsGeometry( 3000 );
        this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.2, geometry.vertices.length, this.color);
        (this.ellipse.geometry as any).setDrawRange( 0, 1 );
        this.obj1.add(this.ellipse);
    }

    //y轴上的椭圆
    createEllipseOnYAxis() {
        const curvePointArray: any = [];
        for (let i = -60; i <= 60; i += 0.5) {
          const x = Math.pow(this.b, 2) - Math.pow(this.b, 2) * Math.pow(i, 2) / Math.pow(this.a, 2);
          curvePointArray.push(new THREE.Vector3(Math.sqrt(x), i, 0));
        }
        this.rightEllipse = ThreeUtil.createTube(curvePointArray, 0.2, 500, this.color);
        this.leftEllipse = this.rightEllipse.clone();
        this.leftEllipse.rotateY(Math.PI);
        this.obj2.add(this.rightEllipse);
        this.obj2.add(this.leftEllipse);
        this.obj2.visible = false;
    }

    //添加拖动点图片及文字
    addDragPoint() {
        //焦点F1，F2
        const f1Point = ThreeUtil.createPoint(1, '#0199FF', -50, 0, 1);
        const f2Point = f1Point.clone();
        f2Point.position.x = 50;

        const f1Text = ThreeUtil.createImg(31.2, 11.2, f1PointImg, 0, -10);
        const f2Text = ThreeUtil.createImg(31.2, 11.2, f2PointImg, 0, -10);

        f1Point.add(f1Text);
        f2Point.add(f2Text);

        this.obj1.add(f1Point);
        this.obj1.add(f2Point);

        //拖动点M
        const pointM = ThreeUtil.createImg(21, 21, pen);
        const textM = ThreeUtil.createImg(32, 10.4, mPoint);
        textM.position.set(5, 15, 0);
        //增大拖动点识别区域
        this.mArea = ThreeUtil.createPoint(15, '#fff', 51, Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
          Math.pow(this.a, 2)) * Math.pow(51, 2))), 0.001);
        this.mArea.add(pointM);
        this.mArea.add(textM);
        this.obj1.add(this.mArea);
        this.textN = ThreeUtil.createImg(7.7, 7.7, nPoint, 82, 20, 0);
        this.obj1.add(this.textN);
    }

    //y轴添加文字
    addDragPointOnYAxis() {
      //焦点F1，F2
      const f1Point = ThreeUtil.createPoint(1, '#0199FF', 0, -50, 1);
      const f2Point = f1Point.clone();
      f2Point.position.y = 50;
      const f1yText = ThreeUtil.createImg(33.6, 12, f1yPointImg, 20, 0);
      const f2yText = ThreeUtil.createImg(33.6, 12, f2yPointImg, 20, 0);

      f1Point.add(f1yText);
      f2Point.add(f2yText);

      this.obj2.add(f1Point);
      this.obj2.add(f2Point);
  }

    //绘制辅助虚线
    drawSupportLine() {
        const supLine = this.colorLine.createLine({
          startPoint: new THREE.Vector3(72, 100, 0),
          endPoint: new THREE.Vector3(72, -100, 0),
          color: this.color,
          dashLine: true,
          gapSize: 3,
          dashSize: 2,
          lineWidth: 500,
          lineWidthScale: 1 / 500
        });

        const xDashImg = ThreeUtil.createImg(32, 22, xDashLine, 95, -65);
        supLine.add(xDashImg);
        this.obj1.add(supLine);

        const supLineOnYAxis = this.colorLine.createLine({
          startPoint: new THREE.Vector3(-100, 72, 0),
          endPoint: new THREE.Vector3(100, 72, 0),
          color: this.color,
          dashLine: true,
          gapSize: 3,
          dashSize: 2,
          lineWidth: 500,
          lineWidthScale: 1 / 500
        });

        const yDashImg = ThreeUtil.createImg(32, 23, yDashLine, 120, 72);
        supLineOnYAxis.add(yDashImg);
        this.obj2.add(supLineOnYAxis);
    }

    bindEvent() {
      //左焦点F1
      const dragControls = new dragcontrols([this.mArea], this.camera, this.renderer.domElement);
      dragControls.addEventListener('drag', () => {

          //限定M点拖动轨迹
          this.mArea.position.x = this.mArea.position.x <= 60 ? this.mArea.position.x : 60;
          this.mArea.position.x = this.mArea.position.x >= -60 ? this.mArea.position.x : -60;
          if (this.mArea.position.y >= 0) {
              this.mArea.position.y = Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
                Math.pow(this.a, 2)) * Math.pow(this.mArea.position.x, 2)));
          } else {
              this.mArea.position.y = -Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
                Math.pow(this.a, 2)) * Math.pow(this.mArea.position.x, 2)));
          }

          //N点位置
          this.textN.position.set(82, this.mArea.position.y + 5, 0);

          //删除重绘辅助线
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y);
      });

      dragControls.addEventListener('dragend', () => {
           //鼠标松开画点
           if (!(window as any).viewHandler.viewModel.$data.drawColor) {
               const point = this.lineHelper.drawPoint(this.mArea.position.x, this.mArea.position.y, 1, '#0199FF');
               this.movePointArray.push(point);
               this.obj1.add(this.movePointArray[this.count]);
               this.count++;
           }
      });
    }

    //绘制辅助线
    drawSupLine(x: number, y: number) {
      //蓝线
      this.solidLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(x, y, 0),
        endPoint: new THREE.Vector3(72, y, 0),
        color: '#0199FF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      //直角符号
      const line1 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(67, y, 0),
        endPoint: new THREE.Vector3(67, y + 5, 0),
        color: '#FFAE28',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      const line2 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(67, y + 5, 0),
        endPoint: new THREE.Vector3(72, y + 5, 0),
        color: '#FFAE28',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });
      this.solidLine[0].add(line1);
      this.solidLine[0].add(line2);

      //红线
      this.solidLine[1] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(x, y, 0),
        endPoint: new THREE.Vector3(50, 0, 0),
        color: '#FF4747',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.obj1.add(this.solidLine[0]);
      this.obj1.add(this.solidLine[1]);
    }

    //M点绘制动画
    drawEllipseAnimation() {
        const tween = {
          pos: 0
        };

      this.animation = TweenMax.to(tween, 5, {
        pos: (this.ellipse.geometry as any).attributes.position.count - 1,
        onUpdate: () => {
          // 绘制椭圆
          (this.ellipse.geometry as any).setDrawRange( 0, tween.pos );

          // 移动m点
          this.mArea.position.x = (this.ellipse.geometry as any).attributes.position.array[Math.floor(tween.pos) * 3];
          this.mArea.position.y = (this.ellipse.geometry as any).attributes.position.array[Math.floor(tween.pos) * 3 + 1];

          //N点位置
          this.textN.position.set(82, this.mArea.position.y + 5, 0);

          //删除重绘辅助线
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y);
          (window as any).viewHandler.viewModel.$data.disableButtonDraw = true;
          (window as any).viewHandler.viewModel.$data.disableButtonShow = true;
          (window as any).viewHandler.viewModel.$data.disableButtonSelect = true;
        },
        onComplete: () => {
            //动画结束，删除绘制的点
            this.lineHelper.removePoint(this.movePointArray, this.count, this.obj1);
            (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
            (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
            (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
        },
        paused: true,
        ease:  Linear.easeIn,
      });
    }

    reset() {
          this.obj1.visible = false;
          this.obj2.visible = false;
          this.animation.pause();
          this.animation.progress(0);
          this.lineHelper.removePoint(this.movePointArray, this.count, this.obj1);
          this.mArea.position.set(51, Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
            Math.pow(this.a, 2)) * Math.pow(51, 2))), 0);
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y);
    }
}




