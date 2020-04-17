import * as THREE from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);

import * as fRPoint from '../sub_static/fRPoint.png';
import * as fLPoint from '../sub_static/fLPoint.png';
import * as fTPoint from '../sub_static/fTPoint.png';
import * as fBPoint from '../sub_static/fBPoint.png';
import * as m2Point from '../sub_static/m2Point.png';
import * as nPoint from '../sub_static/nPoint.png';
import * as pen from '../sub_static/pen.png';
import * as xRightLine from '../sub_static/xLine.png';
import * as xLeftLine from '../sub_static/leftP.png';
import * as yTopLine from '../sub_static/topP.png';
import * as yBottomLine from '../sub_static/bottomP.png';

import * as rFormula from '../sub_static/rightFormula.png';
import * as lFormula from '../sub_static/leftFormula.png';
import * as tFormula from '../sub_static/topFormula.png';
import * as bFormula from '../sub_static/bottomFormula.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { LineHelper } from './LineHelper';

export class Pwxdy3dModel extends ThreeBase {

    colorLine = new Line();
    color = '#000';
    textN: any;
    solidLine: any = [];
    rightParabola: any;
    leftParabola: any;
    topParabola: any;
    bottomParabola: any;

    supLine: any = [];

    mArea: any;

    obj1 = new THREE.Group();
    obj2 = new THREE.Group();
    obj3 = new THREE.Group();
    obj4 = new THREE.Group();
    plane: any;
    count = 0;
    timer: any;

    //松开鼠标画点集合
    movePointArray: any = [];
    lineHelper = new LineHelper();

    dragControls: any;

    constructor(scene?: any , camrea?: any, renderer?: any) {
        super();
        this.scene = scene;
        this.camera = camrea;
        this.renderer = renderer;

        this.createRightParabola();
        this.addDragPoint();
        this.drawFourSupLines();

        this.bindEvent();
        this.drawSupLine(29, Math.sqrt(120 * 29));

        this.createLeftParabola();
        this.createTopParabola();
        this.createBottomParabola();
        this.initPlane();
    }

    //绘制右侧抛物线
    createRightParabola() {
        const curvePointArray: any = [];
        for (let i = -110; i <= 110; i++) {
            const x = Math.pow(i, 2) / 120;
            curvePointArray.push(new THREE.Vector3(x, i, -2));
        }
        this.rightParabola = ThreeUtil.createTube(curvePointArray, 0.3, 500, this.color);
        const rightFormula = ThreeUtil.createImg(54, 10.2, rFormula, 100, 80, -2);
        this.obj1.add(rightFormula);
        this.obj1.add(this.rightParabola);
    }

    //x轴正半轴添加拖动点图片及文字
    addDragPoint() {
        //焦点F1，F2
        this.addTwoFocusPoints(30, 0, 10, -10, 32.4, 17.4, fRPoint, this.obj1);

        //添加其他三种情况下的焦点
        this.addTwoFocusPoints(-30, 0, 0, -10, 30.6, 17.4, fLPoint, this.obj2);
        this.addTwoFocusPoints(0, 30, 20, 0, 30.6, 17.4, fTPoint, this.obj3);
        this.addTwoFocusPoints(0, -30, 20, 0, 32.4, 17.4, fBPoint, this.obj4);

        //拖动点M
        const pointM = ThreeUtil.createImg(21, 21, pen);
        const textM = ThreeUtil.createImg(8.8, 8.8, m2Point);
        textM.position.set(5, 15, 0);
        //增大拖动点识别区域
        this.mArea = ThreeUtil.createPoint(15, '#fff', 29, Math.sqrt(120 * 29), 0.001);
        this.mArea.add(pointM);
        this.mArea.add(textM);
        this.obj1.add(this.mArea);
        this.textN = ThreeUtil.createImg(7.7, 7.7, nPoint, -40, 58, 0);
        this.obj1.add(this.textN);
    }

    //添加两个焦点
    addTwoFocusPoints(x1: number, y1: number, x2: number, y2: number, width: number, height: number, img: any, objScene: any) {
        const f1Point = ThreeUtil.createPoint(1, '#0199FF', 0, 0, 1);
        const f2Point = f1Point.clone();
        f2Point.position.set(x1, y1, 0);
        const ftext = ThreeUtil.createImg(width, height, img, x2, y2, 0);
        f2Point.add(ftext);
        objScene.add(f1Point);
        objScene.add(f2Point);
    }

    //左侧抛物线
    createLeftParabola() {
      this.leftParabola = this.rightParabola.clone();
      this.leftParabola.rotateY(Math.PI);
      const leftFormula = ThreeUtil.createImg(52.2, 10.2, lFormula, -100, 80, 0);
      this.obj2.add(leftFormula);
      this.obj2.add(this.leftParabola);
    }

    //上侧抛物线
    createTopParabola() {
      this.topParabola = this.rightParabola.clone();
      this.topParabola.rotateZ(Math.PI / 2);
      const topFormula = ThreeUtil.createImg(48.6, 10.2, tFormula, 130, 80, 0);
      this.obj3.add(topFormula);
      this.obj3.add(this.topParabola);
    }

    //下侧抛物线
    createBottomParabola() {
      this.bottomParabola = this.rightParabola.clone();
      this.bottomParabola.rotateZ(-Math.PI / 2);
      const bottomFormula = ThreeUtil.createImg(54, 10.8, bFormula, -100, -110, 0);
      this.obj4.add(bottomFormula);
      this.obj4.add(this.bottomParabola);
    }

    //绘制四条辅助准线
    drawFourSupLines() {
        //右侧抛物线
        this.supLine[0] = this.lineHelper.drawSupportLine(-30, -120, -30, 120, -50, -65, 29.6, 21.6, xRightLine, this.obj1, false);
        //左侧抛物线
        this.supLine[1] = this.lineHelper.drawSupportLine(30, -120, 30, 120, 50, -65, 25.6, 22.4, xLeftLine, this.obj2, false);
        //上侧抛物线
        this.supLine[2] = this.lineHelper.drawSupportLine(-120, -30, 120, -30, 40, -40, 26.4, 22.4, yTopLine, this.obj3, false);
        //下侧抛物线
        this.supLine[3] = this.lineHelper.drawSupportLine(-120, 30, 120, 30, 40, 40, 26.4, 22.4, yBottomLine, this.obj4, false);
    }

    bindEvent() {
      //左焦点F1
      this.dragControls = new dragcontrols([this.mArea], this.camera, this.renderer.domElement);
      this.dragControls.addEventListener('dragstart', () => {
      });

      this.dragControls.addEventListener('drag', () => {
           //限定M点拖动轨迹
          this.mArea.position.x = Math.pow(this.mArea.position.y, 2) / 120;
          //N点位置
          this.textN.position.set(-40, this.mArea.position.y + 5, 0);
          //删除重绘辅助线
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y);
      });

      this.dragControls.addEventListener('dragend', () => {
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
        endPoint: new THREE.Vector3(-30, y, 0),
        color: '#0199FF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      //直角符号
      const line1 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(-25, y, 0),
        endPoint: new THREE.Vector3(-25, y + 5, 0),
        color: '#FFAE28',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      const line2 = this.colorLine.createLine({
        startPoint: new THREE.Vector3(-25, y + 5, 0),
        endPoint: new THREE.Vector3(-30, y + 5, 0),
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
        endPoint: new THREE.Vector3(30, 0, 0),
        color: '#0199FF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.obj1.add(this.solidLine[0]);
      this.obj1.add(this.solidLine[1]);
    }

    // 初始画遮挡面 用于遮住抛物线一点点显示 做出抛物线一点点绘制出来的假象
    initPlane() {
        const geometry = new THREE.PlaneGeometry( 200, 220, 32 );
        const material = new THREE.MeshBasicMaterial( {color: '#fff', side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.position.z = -1;
        this.plane.position.x = 100;
        this.obj1.add(this.plane);
    }

    //M点绘制动画
    drawEllipseAnimation() {

      this.mArea.position.y = 110;
      this.mArea.position.x = Math.pow(110, 2) / 120;
      this.timer = setInterval(() => {
            this.dragControls.deactivate();
            (window as any).viewHandler.viewModel.$data.disableButtonDraw = true;
            (window as any).viewHandler.viewModel.$data.disableButtonShow = true;
            (window as any).viewHandler.viewModel.$data.disableButtonSelect = true;
            this.plane.position.y -= 1;
            this.mArea.position.y -= 1;
            this.mArea.position.x = Math.pow(this.mArea.position.y, 2) / 120;
            //N点位置
            this.textN.position.set(-40, this.mArea.position.y + 5, 0);

            //删除重绘辅助线
            this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
            this.drawSupLine(this.mArea.position.x, this.mArea.position.y);

            if (this.mArea.position.y <= -110) {
                clearInterval(this.timer);
                (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
                (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
                (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
                this.dragControls.activate();
                //动画结束，删除绘制的点
                this.lineHelper.removePoint(this.movePointArray, this.count, this.obj1);
            }
      }, 20);
    }

    reset() {
          this.obj1.visible = false;
          this.obj2.visible = false;
          this.obj3.visible = false;
          this.obj4.visible = false;
          this.lineHelper.removePoint(this.movePointArray, this.count, this.obj1);
          clearInterval(this.timer);
          this.mArea.position.set(29, Math.sqrt(120 * 29), 0);
          this.textN.position.set(-40, 58, 0);
          this.plane.position.set(100, 0, -1);
          this.lineHelper.deleteAndRedraw(this.obj1, this.solidLine[0], this.solidLine[1]);
          this.drawSupLine(this.mArea.position.x, this.mArea.position.y);
          (window as any).viewHandler.viewModel.$data.showExhibition = 2;
          this.dragControls.activate();
    }
}




