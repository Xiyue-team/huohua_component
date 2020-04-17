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
import { LineHelper } from './LineHelper';

export class Sqxdy3dModel extends ThreeBase {

    colorLine = new Line();
    color = '#000';
    textN: any;
    rightTextM: any;
    leftTextM: any;
    solidLine: any = [];
    rightHyperbola: any;
    leftHyperbola: any;

    supLine: any = [];

    mArea: any;
    leftMArea: any;

    obj1 = new THREE.Group();
    obj2 = new THREE.Group();

    rightPlane: any;
    leftPlane: any;
    leftCount = 0;
    rightCount = 0;
    rightTimer: any;
    leftTimer: any;

    //松开鼠标画点集合
    leftMovePointArray: any = [];
    rightMovePointArray: any = [];
    lineHelper = new LineHelper();

    dragControls: any;
    dragControls2: any;

    constructor(scene?: any , camrea?: any, renderer?: any) {
        super();
        this.scene = scene;
        this.camera = camrea;
        this.renderer = renderer;

        this.createRightHyperbola();
        this.addDragPoint();
        this.drawFourSupLines();

        this.bindEvent();
        this.drawSupLine(Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(58, 2)), 58, 5);
        this.createLeftHyperbola();
        this.createHyperbolaOnYAxis();
        this.initPlane();
    }

    //绘制右侧双曲线
    createRightHyperbola() {
        const curvePointArray: any = [];
        for (let i = -110; i <= 110; i++) {
            const x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(i, 2));
            curvePointArray.push(new THREE.Vector3(x, i, -2));
        }
        this.rightHyperbola = ThreeUtil.createTube(curvePointArray, 0.3, 500, this.color);
        this.obj1.add(this.rightHyperbola);
    }

    //左侧双曲线
    createLeftHyperbola() {
        const curvePointArray: any = [];
        for (let i = -110; i <= 110; i++) {
          const x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(i, 2));
          curvePointArray.push(new THREE.Vector3(x, i, -2));
        }
        this.leftHyperbola = ThreeUtil.createTube(curvePointArray, 0.3, 500, this.color);
        this.obj1.add(this.leftHyperbola);
    }

    //y轴上双曲线
    createHyperbolaOnYAxis() {
        const topHyperbola = this.rightHyperbola.clone();
        topHyperbola.rotateZ(Math.PI / 2);
        const bottomHyperbola = this.rightHyperbola.clone();
        bottomHyperbola.rotateZ(-Math.PI / 2);
        this.obj2.add(topHyperbola);
        this.obj2.add(bottomHyperbola);
    }

    //x轴正半轴添加拖动点图片及文字
    addDragPoint() {
        //x轴上焦点
        this.lineHelper.addTwoFocusPoints(-50, 0, 50, 0, 0, -10, 31.2, 11.2, f1PointImg, f2PointImg, this.obj1);
        //y轴上焦点
        this.lineHelper.addTwoFocusPoints(0, 50, 0, -50, 20, 0, 33.6, 12, f1yPointImg, f2yPointImg, this.obj2);

        //拖动点M
        const pointM = ThreeUtil.createImg(21, 21, pen);
        this.rightTextM = ThreeUtil.createImg(32, 10.4, mPoint);
        this.rightTextM.position.set(5, 15, 0);
        //增大拖动点识别区域
        this.mArea = ThreeUtil.createPoint(15, '#fff', Math.sqrt(Math.pow(30, 2) +
          (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(58, 2)), 58, 0.001);

        this.mArea.add(pointM);

        this.leftMArea = this.mArea.clone();
        this.leftMArea.position.set(-30, 0, 0);
        this.leftTextM = this.rightTextM.clone();
        this.leftTextM.position.set(-20, 15, 0);
        this.leftMArea.add(this.leftTextM);
        this.leftTextM.visible = false;

        this.mArea.add(this.rightTextM);
        this.obj1.add(this.mArea);
        this.obj1.add(this.leftMArea);
        this.textN = ThreeUtil.createImg(7.7, 7.7, nPoint, 8, 63, 0);
        this.obj1.add(this.textN);
    }

    //绘制两条辅助准线
    drawFourSupLines() {
        //x轴准线
        this.supLine[0] = this.lineHelper.drawSupportLine(18, -120, 18, 120, 40, -80, 32, 22, xDashLine, this.obj1, true);
        //y轴准线
        this.supLine[1] = this.lineHelper.drawSupportLine(-100, 18, 100, 18, 120, 18, 32, 23, yDashLine, this.obj2, true);
    }

    bindEvent() {
      //左拖动点M
      this.dragControls = new dragcontrols([this.mArea], this.camera, this.renderer.domElement);
      this.dragControls.addEventListener('drag', () => {

           //限定M点拖动轨迹
          this.mArea.position.x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2))
            * Math.pow(this.mArea.position.y, 2));

          //N点位置
          this.textN.position.set(8, this.mArea.position.y + 5, 0);

          //删除重绘辅助线
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y, 5);
      });

      this.dragControls.addEventListener('dragend', () => {
           //鼠标松开画点
          if (!(window as any).viewHandler.viewModel.$data.drawColor) {
            const point = this.lineHelper.drawPoint(this.mArea.position.x, this.mArea.position.y, 1, '#0199FF');
            this.rightMovePointArray.push(point);
            this.obj1.add(this.rightMovePointArray[this.rightCount]);
            this.rightCount++;
          }
      });

        //右拖动点M
        this.dragControls2 = new dragcontrols([this.leftMArea], this.camera, this.renderer.domElement);
        this.dragControls2.addEventListener('drag', () => {

          //限定M点拖动轨迹
          this.leftMArea.position.x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2))
            * Math.pow(this.leftMArea.position.y, 2));

          //N点位置
          this.textN.position.set(8, this.leftMArea.position.y + 5, 0);

          //删除重绘辅助线
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.leftMArea.position.x, this.leftMArea.position.y, -5);
        });

        this.dragControls2.addEventListener('dragend', () => {
          //鼠标松开画点
          if (!(window as any).viewHandler.viewModel.$data.drawColor) {
            const point = this.lineHelper.drawPoint(this.leftMArea.position.x, this.leftMArea.position.y, 1, '#0199FF');
            this.leftMovePointArray.push(point);
            this.obj1.add(this.leftMovePointArray[this.leftCount]);
            this.leftCount++;
          }
        });
    }

    //绘制辅助线
    drawSupLine(x: number, y: number, length: number) {
      //蓝线
      this.solidLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(x, y, 0),
        endPoint: new THREE.Vector3(18, y, 0),
        color: '#0199FF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      //直角符号
      const line1 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(18 + length, y, 0),
        endPoint: new THREE.Vector3(18 + length, y + 5, 0),
        color: '#FFAE28',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      const line2 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(18, y + 5, 0),
        endPoint: new THREE.Vector3(18 + length, y + 5, 0),
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
        color: '#EC5D57',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.obj1.add(this.solidLine[0]);
      this.obj1.add(this.solidLine[1]);
    }

    // 初始画遮挡面 用于遮住抛物线一点点显示 做出抛物线一点点绘制出来的假象
    initPlane() {
        const geometry = new THREE.PlaneGeometry( 160, 220, 32 );
        const material = new THREE.MeshBasicMaterial( {color: '#fff', side: THREE.DoubleSide} );
        this.rightPlane = new THREE.Mesh( geometry, material );
        this.rightPlane.position.z = -1;
        this.rightPlane.position.x = 80;
        this.leftPlane = this.rightPlane.clone();
        this.leftPlane.position.x = -80;
        this.obj1.add(this.rightPlane);
        this.obj1.add(this.leftPlane);
    }

    //右侧M点绘制动画
    drawEllipseAnimation() {
        this.mArea.position.y = 110;
        this.rightTimer = setInterval(() => {
          this.dragControls.deactivate();
          this.dragControls2.deactivate();
          (window as any).viewHandler.viewModel.$data.disableButtonDraw = true;
          (window as any).viewHandler.viewModel.$data.disableButtonShow = true;
          (window as any).viewHandler.viewModel.$data.disableButtonSelect = true;
              this.rightPlane.position.y -= 1;
              this.mArea.position.y -= 1;
              this.mArea.position.x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2))
                * Math.pow(this.mArea.position.y, 2));
              //N点位置
              this.textN.position.set(8, this.mArea.position.y + 5, 0);

              //删除重绘辅助线
              this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
              this.drawSupLine(this.mArea.position.x, this.mArea.position.y, 5);

              if (this.mArea.position.y <= -110) {
                  clearInterval(this.rightTimer);
                  this.rightTextM.visible = false;
                  this.leftTextM.visible = true;
                  this.leftHyperbolaAnimation();
                  //动画结束，删除绘制的点
                this.lineHelper.removePoint(this.rightMovePointArray, this.rightCount, this.obj1);
              }
        }, 20);
    }

    //左侧M点绘制动画
    leftHyperbolaAnimation() {
          this.leftMArea.position.y = 110;
          this.leftTimer = setInterval(() => {

            this.dragControls2.deactivate();
            (window as any).viewHandler.viewModel.$data.disableButtonDraw = true;
            (window as any).viewHandler.viewModel.$data.disableButtonShow = true;
            (window as any).viewHandler.viewModel.$data.disableButtonSelect = true;
            this.leftPlane.position.y -= 1;
            this.leftMArea.position.y -= 1;
            this.leftMArea.position.x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2))
              * Math.pow(this.leftMArea.position.y, 2));
            //N点位置
            this.textN.position.set(28, this.leftMArea.position.y + 5, 0);

            //删除重绘辅助线
            this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
            this.drawSupLine(this.leftMArea.position.x, this.leftMArea.position.y, -5);

            if (this.leftMArea.position.y <= -110) {
              clearInterval(this.leftTimer);
              (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
              (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
              (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
              this.dragControls.activate();
              this.dragControls2.activate();
              //动画结束，删除绘制的点
              this.lineHelper.removePoint(this.leftMovePointArray, this.leftCount, this.obj1);
            }
          }, 20);
      }

    reset() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.lineHelper.removePoint(this.leftMovePointArray, this.leftCount, this.obj1);
        this.lineHelper.removePoint(this.rightMovePointArray, this.rightCount, this.obj1);
        clearInterval(this.rightTimer);
        clearInterval(this.leftTimer);
        this.mArea.position.set(Math.sqrt(Math.pow(30, 2) +
          (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(58, 2)), 58, 0);
        this.leftMArea.position.set(-30, 0, 0);
        this.textN.position.set(8, 63, 0);
        this.rightPlane.position.set(80, 0, -1);
        this.leftPlane.position.set(-80, 0, -1);
        this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
        this.drawSupLine(this.mArea.position.x, this.mArea.position.y, 5);
        this.dragControls.activate();
        this.dragControls2.activate();
    }
}




