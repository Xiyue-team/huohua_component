import * as THREE from 'three';
import { WebGLRenderer, Group } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { SliderControlLine } from './SliderControlLine';

import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/point.png';
import * as leftL1 from '../sub_static/1.png';
import * as rightL2 from '../sub_static/2.png';
import * as ParabolaZhunXianBiaoShi from '../sub_static/3.png';
import * as ParabolaZhunXianBiaoShiY from '../sub_static/4.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

import * as tuotuan1 from '../sub_static/5.png';
import * as tuoyuan2 from '../sub_static/6.png';
import * as shuangquxian1 from '../sub_static/7.png';
import * as shuangquxian2 from '../sub_static/8.png';
import * as puwuixan2 from '../sub_static/9.png';
import * as puwuixan1 from '../sub_static/10.png';
import * as puwuixan3 from '../sub_static/11.png';
import * as P from '../sub_static/12.png';

let thiz: any = null;
OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private controls: any;
  private sliderControlLine: SliderControlLine;

  private Point = common.createImg([20, 27.5, 2], 24, 24, pointImg);
  //P
  private P = common.createImg([18, 40.5, 2], 15, 6, P);
  private EllipseCurve: any;
  private ellipsePointArr: any = [];

  //准线样式
  private line_0 = common.drawUnitLine({ color: '#EC5D57' });
  private line_1 = common.drawUnitLine({ color: '#EC5D57' });
  private color1 = common.drawUnitLine({ color: '#992CC8' });
  private ParabolaLine = common.drawUnitLine({ color: '#EC5D57' });
  private ParabolaLineY = common.drawUnitLine({ color: '#EC5D57' });
  //准线
  private zhunnXianLeft = common.scaleLine([-62.5, 75, 2], [-62.5, -75, 2], this.line_0);
  private zhunXianRight = common.scaleLine([62.5, 75, 2], [62.5, -75, 2], this.line_1);
  private L1 = common.createImg([-62.5, -80, 2], 38, 22, leftL1);
  private L2 = common.createImg([62.5, -80, 2], 38, 22, rightL2);
  //P'
  private Q = common.createText('Q', [67.5, 27.5, 2]);

  //椭圆3条辅助线
  private line_2 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_3 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_4 = common.drawUnitLine({ width: 0.8, color: '#0199FF', isDash: true });

  private line_5 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_6 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_7 = common.drawUnitLine({ width: 0.8, color: '#0199FF', isDash: true });

  private line_8 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_9 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_10 = common.drawUnitLine({ width: 0.8, color: '#0199FF', isDash: true });

  private line_11 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_12 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_13 = common.drawUnitLine({ width: 0.8, color: '#0199FF', isDash: true });

  private line_14 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_15 = common.drawUnitLine({ width: 0.8, color: '#0199FF' });
  private line_16 = common.drawUnitLine({ width: 0.8, color: '#0199FF', isDash: true });
  //虚线
  private line2 = common.scaleLine([20, 27.5, 2], [40, 0, 2], this.line_2);
  private line3 = common.scaleLine([20, 27.5, 2], [-40, 0, 2], this.line_3);
  private line4 = common.scaleLine([20, 27.5, 2], [62.5, 27.5, 2], this.line_4);

  private line5 = common.scaleLine([50, 37.7, 2], [Math.sqrt(4100), 0, 2], this.line_5);
  private line6 = common.scaleLine([50, 37.7, 2], [-Math.sqrt(4100), 0, 2], this.line_6);
  private line7 = common.scaleLine([50, 37.7, 2], [((40 * 40) / Math.sqrt(4100)), 37.7, 2], this.line_7);

  private line8 = common.scaleLine([30, 52, 2], [22.5, 0, 2], this.line_8);
  private line9 = common.scaleLine([20, 27.5, 2], [-40, 0, 2], this.line_9);
  private line10 = common.scaleLine([30, 52, 2], [-22.5, 52, 2], this.line_10);

  private line11 = common.scaleLine([Math.sqrt(2025), 22.5, 2], [0, 22.5, 2], this.line_11);
  private line12 = common.scaleLine([20, 27.5, 2], [-40, 0, 2], this.line_12);
  private line13 = common.scaleLine([Math.sqrt(2025), 22.5, 2], [Math.sqrt(2025), -22.5, 2], this.line_13);

  private line14 = common.scaleLine([60, Math.sqrt(5400), 2], 
  [((1 / 90) * (45 * 45) * (45 * 45)) / 5400, -(45 * 45) / Math.sqrt(5400), 2], this.color1);
  private line15 = common.scaleLine([20, 27.5, 2], [-40, 0, 2], this.line_15);
  private line16 = common.scaleLine([60, Math.sqrt(5400), 2], [60, 0, 2], this.line_16);
  //直角
  private zhijiao = common.drawRightAngle(3, { color: '#0199FF', width: 0.8 });
  private zhijiaoleft = common.drawRightAngle(3, { color: '#0199FF', width: 0.8 });

  //F1、F2
  private F1 = common.createText1('F1', [-35, -5, 2], { color: '#0199FF' });
  private F2 = common.createText1('F2', [45, -5, 2], { color: '#0199FF' });
  private F1Cicle = common.drawCircle(1, { color: '#0199FF', position: [-40, 0, 2] });
  private F2Cicle = common.drawCircle(1, { color: '#0199FF', position: [40, 0, 2] });
  private FGroup = new THREE.Group();

  private count = 0;

  private hudu: any;

  //双曲线
  private curvePointArrayOnXAxis: any = [];
  private curvePointArrayOnXAxis1: any = [];
  private curvePointArrayOnXAxis2: any = [];
  private curvePointArrayOnXAxis3: any = [];
  private leftEllipse: any;
  private rightEllipse: any;
  private obj1 = new THREE.Group();
  private color = '#000';

  //双曲线焦点坐标
  private pos = new THREE.Group();
  //双曲线准线
  private zhunPos = new THREE.Group();
  //双曲线拖动点
  //双曲线三条辅助线
  private EllipseFuZhuXian = new THREE.Group();
  //双曲线左直角
  private EllipseRightZhiJiao = common.drawRightAngle(3, { color: '#0199FF', width: 0.8 });

  //抛物线 焦点在X轴
  private Parabola: any;
  //抛物线拖动点
  //准线
  private ParabolaZhunXian = common.scaleLine([-22.5, 95, 2], [-22.5, -95, 2], this.ParabolaLine);
  //焦点F
  private F = common.createText('F', [22.5, 0, 2], { color: '#0199FF' });
  //准线标识
  private ParabolaZhunXianBiaoShi = common.createImg([-50, -96, 2], 38, 22, ParabolaZhunXianBiaoShi);

  //准线
  private ParabolaZhunXianY = common.scaleLine([-95, -22.5, 2], [95, -22.5, 2], this.ParabolaLineY);
  private ParabolaZhunXianBiaoShiY = common.createImg([90, -40, 2], 38, 22, ParabolaZhunXianBiaoShiY);
  private focaZhiJiao = common.drawRightAngle(3, { color: '#0199FF', width: 0.8 });

  //焦半径
  private zifu = common.createText('θ', [22.5, 0, 0], { color: '#F9E16A' });
  private angleA: any;
  private angle: any;

  private op: any;
  private render = () => {
    requestAnimationFrame(this.render);

    if (this.count !== 0) {
      this.count = ++this.count % 3;
      return;
    } else {
      this.count = ++this.count % 3;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * @param {domElement} domElement
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
    number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.init();
  }

  init() {
    thiz = this;
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.tbctrl();
    this.createAxis();
    this.initEvt();
    this.initElement();
    this.initModel();
    this.initEllipseArr();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xFFFFFF);
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 270);
  }

  //初始化摄像机位置
  resetCamera() {
    this.controls.reset();
  }

  //创建一个坐标系
  createAxis() {
    const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
    this.scene.add(Ax);
  }

  // 初始化场景元素
  initElement() {
    this.clearScene();
    this.op = (window as any).viewHandler.viewModel.$data;
    // 计算弧度
    this.hudu = Math.atan2(42.5, 0);
    this.angle = Math.atan(Math.sqrt(5400) / 37.5) * 180 / Math.PI;
    this.zhijiao.rotateZ(this.hudu);
    this.EllipseRightZhiJiao.rotateY(Math.PI);
    this.focaZhiJiao.rotateX(Math.PI);
  }

  // 初始化拖动点
  initEvt() {
    this.sliderControlLine = new SliderControlLine(
      [this.Point]).initEvent(this.camera, this.renderer);
  }

  //点击按钮事件
  clickAnniu(num: number) {
    if (num === 1) {
      this.createEllispseOne();
    } else if (num === 2) {
      this.createEllipseOnXAxis(40, 50);
    } else if (num === 3) {
      this.createParabolaX();
    } else if (num === 4) {
      this.createParabolaY();
    } else if (num === 5) {
      this.createJb();
    }
  }
  initEllipseArr () {
    for (let i = -60; i < 301; i += 4) {
        const x = 50 * Math.cos(Math.PI * i / 180);
        const y = 30 * Math.sin(Math.PI * i / 180);
        this.ellipsePointArr.push({ x, y, z: 0 });
    }
}

  //绘制椭圆
  createEllispseOne() {
    this.clearScene();
    this.EllipseCurve = common.drawDashOrLine(this.ellipsePointArr);
    this.op.isShow = true;
    this.op.imgShuoMing = `${tuotuan1}`;
    this.Point.position.set(20, 27.5, 2);
    this.P.position.set(18, 40.5, 2);
    this.line2 = common.scaleLine([20, 27.5, 2], [40, 0, 2], this.line_2);
    this.line3 = common.scaleLine([20, 27.5, 2], [-40, 0, 2], this.line_3);
    this.line4 = common.scaleLine([20, 27.5, 2], [62.5, 27.5, 2], this.line_4);
    this.zhijiao.position.set(62.5, 27.5, 2);
    this.F1.position.set(-35, -5, 2);
    this.F2.position.set(45, -5, 2);
    this.F1Cicle.position.set(-40, 0, 2);
    this.F2Cicle.position.set(40, 0, 2);
    this.zhunnXianLeft.position.set(-62.5, 0, 2);
    this.zhunXianRight.position.set(62.5, 0, 2);
    this.L1.position.set(-62.5, -80, 2);
    this.L2.position.set(62.5, -80, 2);
    this.Q.position.set(67.5, 27.5, 2);
    this.FGroup.add(this.F1, this.F2, this.F1Cicle, this.F2Cicle);
    this.scene.add(this.FGroup, this.line2, this.line3, this.line4, this.zhijiao);
    this.scene.add(this.zhunnXianLeft, this.zhunXianRight, this.L1, this.L2, this.EllipseCurve, this.Point, this.P, this.Q);
  }

  //绘制x轴上的双曲线
  createEllipseOnXAxis(a: number, b: number) {
    this.clearScene();
    this.op.isShow = true;
    this.op.imgShuoMing = `${shuangquxian1}`;
    this.Point.position.set(50, 37.7, 2);
    this.P.position.set(65, 37.7, 2);
    this.scene.add(this.Point, this.P);
    for (let i = -70; i <= 70; i += 0.01) {
      const x = Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
      this.curvePointArrayOnXAxis.push(new THREE.Vector3(x, i, 0));
    }
    this.rightEllipse = ThreeUtil.createTube(this.curvePointArrayOnXAxis, 0.5, 500, this.color);
    this.leftEllipse = this.rightEllipse.clone();
    this.leftEllipse.rotateY(Math.PI);
    this.obj1.add(this.rightEllipse, this.leftEllipse);
    this.scene.add(this.obj1);

    //焦点
    this.F1.position.set(-Math.sqrt(4100) + 3, -5, 2);
    this.F2.position.set(Math.sqrt(4100) + 3, -5, 2);
    this.F1Cicle.position.set(-Math.sqrt(4100), 0, 2);
    this.F2Cicle.position.set(Math.sqrt(4100), 0, 2);
    this.pos.add(this.F1, this.F2, this.F1Cicle, this.F2Cicle);
    this.scene.add(this.pos);

    //准线
    this.zhunnXianLeft.position.set(-((40 * 40) / Math.sqrt(4100)), 0, 2);
    this.zhunXianRight.position.set(((40 * 40) / Math.sqrt(4100)), 0, 2);
    this.zhunPos.add(this.zhunnXianLeft, this.zhunXianRight);
    this.L1.position.set(-((40 * 40) / Math.sqrt(4100)), -80, 2);
    this.L2.position.set(((40 * 40) / Math.sqrt(4100)), -80, 2);
    this.scene.add(this.zhunPos, this.L1, this.L2);

    //3条辅助线
    this.line5 = common.scaleLine([50, 37.7, 2], [Math.sqrt(4100), 0, 2], this.line_5);
    this.line6 = common.scaleLine([50, 37.7, 2], [-Math.sqrt(4100), 0, 2], this.line_6);
    this.line7 = common.scaleLine([50, 37.7, 2], [((40 * 40) / Math.sqrt(4100)), 37.7, 2], this.line_7);
    this.scene.add(this.line5, this.line6, this.line7);
    //直角
    this.zhijiaoleft.position.set(((40 * 40) / Math.sqrt(4100)), 37.7, 2);
    this.Q.position.set(((40 * 40) / Math.sqrt(4100)) - 5, 37.7 + 5, 2);
    this.scene.add(this.zhijiaoleft, this.Q);
  }

  //绘制抛物线 焦点再x轴
  createParabolaX() {
    this.clearScene();
    this.op.isShow = true;
    this.op.imgShuoMing = `${puwuixan1}`;
    for (let i = -90; i <= 90; i += 0.01) {
      const x = (i * i) / 90;
      this.curvePointArrayOnXAxis1.push(new THREE.Vector3(x, i, 0));
    }
    this.Parabola = ThreeUtil.createTube(this.curvePointArrayOnXAxis1, 0.5, 500, this.color);
    this.scene.add(this.Parabola);

    this.Point.position.set(30, 52, 2);
    this.P.position.set(45, 52, 2);
    this.zhijiaoleft.position.set(-22.5, 52, 2);
    this.F1Cicle.position.set(22.5, 0, 2);
    this.F.position.set(22.5, 0, 2);
    this.Q.position.set(-28.5, 58, 2);
    this.line8 = common.scaleLine([30, 52, 2], [22.5, 0, 2], this.line_8);
    this.line10 = common.scaleLine([30, 52, 2], [-22.5, 52, 2], this.line_10);
    this.scene.add(this.Point, this.ParabolaZhunXian, this.line8, this.line10, this.zhijiaoleft, this.F, this.F1Cicle, this.Q);
    this.scene.add(this.ParabolaZhunXianBiaoShi, this.P);
  }

  //绘制抛物线 焦点再y轴
  createParabolaY() {
    this.clearScene();
    this.op.isShow = true;
    this.op.imgShuoMing = `${puwuixan2}`;
    for (let i = -90; i <= 90; i += 0.01) {
      const y = (i * i) / 90;
      this.curvePointArrayOnXAxis2.push(new THREE.Vector3(i, y, 0));
    }
    this.Parabola = ThreeUtil.createTube(this.curvePointArrayOnXAxis2, 0.5, 500, this.color);
    this.scene.add(this.Parabola);

    this.Point.position.set(Math.sqrt(2025), 22.5, 2);
    this.P.position.set(Math.sqrt(2025) + 15, 22.5, 2);
    this.F.position.set(-5, 25, 2);
    this.F1Cicle.position.set(0, 22.5, 2);
    this.zhijiaoleft.position.set(Math.sqrt(2025), -22.5, 2);
    this.Q.position.set(Math.sqrt(2025), -25.5, 2);
    this.scene.add(this.Point, this.ParabolaZhunXianY, this.F, this.F1Cicle, this.zhijiaoleft, this.Q);
    this.line11 = common.scaleLine([Math.sqrt(2025), 22.5, 2], [0, 22.5, 2], this.line_11);
    this.line13 = common.scaleLine([Math.sqrt(2025), 22.5, 2], [Math.sqrt(2025), -22.5, 2], this.line_13);
    this.scene.add(this.line11, this.line13);
    this.scene.add(this.ParabolaZhunXianBiaoShiY, this.P);
  }

  //焦半径
  createJb() {
    this.clearScene();
    this.op.isShow = true;
    this.op.imgShuoMing = `${puwuixan3}`;
    for (let i = -90; i <= 90; i += 0.01) {
      const x = (i * i) / 90;
      this.curvePointArrayOnXAxis3.push(new THREE.Vector3(x, i, 0));
    }
    this.Parabola = ThreeUtil.createTube(this.curvePointArrayOnXAxis3, 0.5, 500, this.color);
    this.scene.add(this.Parabola);

    this.angleA = common.drawAngle(0, this.angle, { color: '#F9E16A', size: 20, zIndex: -2 });
    this.angleA.position.set(22.5, 0, 0);
    this.Point.position.set(60, Math.sqrt(5400), 2);
    this.P.position.set(60 + 15, Math.sqrt(5400), 2);
    this.Q.position.set(60, 0, 2);
    this.F.position.set(22.5, 0, 2);
    this.F1Cicle.position.set(22.5, 0, 2);
    this.zhijiaoleft.position.set(60, 0, 2);
    this.zifu.position.set(20, 8, 0);
    this.line14 = common.scaleLine([60, Math.sqrt(5400), 2], 
    [((1 / 90) * (45 * 45) * (45 * 45)) / 5400, -(45 * 45) / Math.sqrt(5400), 2], this.color1);
    this.line16 = common.scaleLine([60, Math.sqrt(5400), 2], [60, 0, 2], this.line_16);
    this.scene.add(this.Point, this.line14, 
        this.line16, this.zhijiaoleft, this.Q, this.F1Cicle, this.F, this.angleA, this.zifu, this.P);
  }

  //清空场景
  clearScene() {
    this.curvePointArrayOnXAxis = [];
    this.curvePointArrayOnXAxis1 = [];
    this.curvePointArrayOnXAxis2 = [];
    this.curvePointArrayOnXAxis3 = []; //清除点
    this.scene.remove(this.Point, this.focaZhiJiao, this.angleA, this.zifu);
    this.scene.remove(this.line2, this.line3, this.line4, this.line5, this.line6, this.line7, this.line8, this.line9);
    this.scene.remove(this.line10, this.line11, this.line12, this.line13, this.line14, this.line15, this.line16);
    this.scene.remove(this.Point, this.P, this.EllipseCurve, this.zhunnXianLeft, this.zhunXianRight);
    this.scene.remove(this.L1, this.L2, this.Q);
    this.scene.remove(this.zhijiao, this.zhijiaoleft, this.FGroup);
    this.scene.remove(this.leftEllipse, this.rightEllipse, this.obj1, this.pos, this.zhunPos, this.Point);
    this.scene.remove(this.EllipseFuZhuXian, this.EllipseRightZhiJiao);
    this.scene.remove(this.Parabola, this.Point, this.F, this.ParabolaZhunXian, this.ParabolaZhunXianBiaoShi, this.F1Cicle);
    this.scene.remove(this.Point, this.ParabolaZhunXianY, this.ParabolaZhunXianBiaoShiY);
  }

  // 获取拖动点坐标
  // tslint:disable-next-line:member-ordering
  static downHandle(name: string) {

  }

  //移动动点位置
  // tslint:disable-next-line:member-ordering
  static moveHandle(pos: any, obj: any): void {
    const { x, y } = pos;
    thiz.Point = obj;
    if (thiz.op.isBule1) { //椭圆拖动
      const a = 50;
      const c = 40;
      const b = Math.sqrt(a * a - (c * c));
      
      const rat = b / a;
      const angleRadius = Math.atan2(y / rat, x);
      const px = a * Math.cos(angleRadius);
      const py = a * Math.sin(angleRadius) * rat;

      thiz.Point.position.set(px, py, 2);
      thiz.line2 = common.scaleLine([px, py, 2], [40, 0, 2], thiz.line_2);
      thiz.line3 = common.scaleLine([px, py, 2], [-40, 0, 2], thiz.line_3);
      thiz.P.position.set(px - 2, py + 13, 2);
      if (x > 0) {
        thiz.commTy(px, py, 62.5, 67.5, tuotuan1, thiz.zhijiaoleft, thiz.zhijiao);
      }
      if (x < 0) {
        thiz.commTy(px, py, -62.5, -67.5, tuoyuan2, thiz.zhijiao, thiz.zhijiaoleft);
      }
    }
    if (thiz.op.isBule2) {
      const a = 40;
      const b = 50;
      if (x > 0) {
        thiz.op.imgShuoMing = shuangquxian1;
        thiz.scene.remove(thiz.EllipseRightZhiJiao);
        thiz.scene.add(thiz.zhijiaoleft);
        const EllipseX = Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(y, 2));
        const EllipseY = y;
        thiz.Point.position.set(EllipseX, EllipseY, 2);
        thiz.P.position.set(EllipseX + 15, EllipseY, 2);
        thiz.line5 = common.scaleLine([EllipseX, EllipseY, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
        thiz.line6 = common.scaleLine([EllipseX, EllipseY, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
        thiz.line7 = common.scaleLine([EllipseX, EllipseY, 2], [((40 * 40) / Math.sqrt(4100)), EllipseY, 2], thiz.line_7);
        thiz.zhijiao.position.set(-((40 * 40) / Math.sqrt(4100)), EllipseY, 2);
        thiz.zhijiaoleft.position.set(((40 * 40) / Math.sqrt(4100)), EllipseY, 2);
        thiz.Q.position.set(((40 * 40) / Math.sqrt(4100)) - 5, EllipseY + 5, 2);
        if (y >= 70) {
          thiz.Point.position.set(68.8, 70, 2);
          thiz.P.position.set(68.8 + 15, 70, 2);
          thiz.line5 = common.scaleLine([68.8, 70, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
          thiz.line6 = common.scaleLine([68.8, 70, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
          thiz.line7 = common.scaleLine([68.8, 70, 2], [((40 * 40) / Math.sqrt(4100)), 70, 2], thiz.line_7);
          thiz.zhijiaoleft.position.set(((40 * 40) / Math.sqrt(4100)), 70, 2);
          thiz.Q.position.set(((40 * 40) / Math.sqrt(4100)) - 5, 75, 2);
        }
        if (y <= -70) {
          thiz.Point.position.set(68.8, -70, 2);
          thiz.P.position.set(68.8 + 15, -70, 2);
          thiz.line5 = common.scaleLine([68.8, -70, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
          thiz.line6 = common.scaleLine([68.8, -70, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
          thiz.line7 = common.scaleLine([68.8, -70, 2], [((40 * 40) / Math.sqrt(4100)), -70, 2], thiz.line_7);
          thiz.zhijiaoleft.position.set(((40 * 40) / Math.sqrt(4100)), -70, 2);
          thiz.Q.position.set(((40 * 40) / Math.sqrt(4100)) - 5, -65, 2);
        }

      } else if (x < 0) {
        thiz.op.imgShuoMing = shuangquxian2;
        thiz.scene.remove(thiz.zhijiaoleft);
        const EllipseX = -Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(y, 2));
        const EllipseY = y;
        thiz.Point.position.set(EllipseX, EllipseY, 2);
        thiz.P.position.set(EllipseX - 15, EllipseY, 2);
        thiz.line5 = common.scaleLine([EllipseX, EllipseY, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
        thiz.line6 = common.scaleLine([EllipseX, EllipseY, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
        thiz.line7 = common.scaleLine([EllipseX, EllipseY, 2], [-((40 * 40) / Math.sqrt(4100)), EllipseY, 2], thiz.line_7);
        thiz.EllipseRightZhiJiao.position.set(-((40 * 40) / Math.sqrt(4100)), EllipseY, 2);
        thiz.Q.position.set(-((40 * 40) / Math.sqrt(4100)) + 5, EllipseY + 5, 2);
        thiz.scene.add(thiz.EllipseRightZhiJiao);
        if (y >= 70) {
          thiz.Point.position.set(-68.8, 70, 2);
          thiz.P.position.set(-68.8 - 15, 70, 2);
          thiz.line5 = common.scaleLine([-68.8, 70, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
          thiz.line6 = common.scaleLine([-68.8, 70, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
          thiz.line7 = common.scaleLine([-68.8, 70, 2], [-((40 * 40) / Math.sqrt(4100)), 70, 2], thiz.line_7);
          thiz.EllipseRightZhiJiao.position.set(-((40 * 40) / Math.sqrt(4100)), 70, 2);
          thiz.Q.position.set(-((40 * 40) / Math.sqrt(4100)) + 5, 75, 2);
        }
        if (y <= -70) {
          thiz.Point.position.set(-68.8, -70, 2);
          thiz.P.position.set(-68.8 - 15, -70, 2);
          thiz.line5 = common.scaleLine([-68.8, -70, 2], [Math.sqrt(4100), 0, 2], thiz.line_5);
          thiz.line6 = common.scaleLine([-68.8, -70, 2], [-Math.sqrt(4100), 0, 2], thiz.line_6);
          thiz.line7 = common.scaleLine([-68.8, -70, 2], [-((40 * 40) / Math.sqrt(4100)), -70, 2], thiz.line_7);
          thiz.EllipseRightZhiJiao.position.set(-((40 * 40) / Math.sqrt(4100)), -70, 2);
          thiz.Q.position.set(-((40 * 40) / Math.sqrt(4100)) + 5, -65, 2);
        }
      }
    }
    if (thiz.op.isBule3) {
      const ParabolaX = (y * y) / 90;
      const ParabolaY = y;
      thiz.Point.position.set(ParabolaX, ParabolaY, 2);
      thiz.P.position.set(ParabolaX + 15, ParabolaY, 2);
      thiz.line8 = common.scaleLine([ParabolaX, ParabolaY, 2], [22.5, 0, 2], thiz.line_8);
      thiz.line10 = common.scaleLine([ParabolaX, ParabolaY, 2], [-22.5, ParabolaY, 2], thiz.line_10);
      thiz.zhijiaoleft.position.set(-22.5, ParabolaY, 2);
      thiz.Q.position.set(-28.5, ParabolaY + 6, 2);
      if (y >= 90) {
        thiz.Point.position.set(90, 90, 2);
        thiz.P.position.set(90 + 15, 90, 2);
        thiz.line8 = common.scaleLine([90, 90, 2], [22.5, 0, 2], thiz.line_8);
        thiz.line10 = common.scaleLine([90, 90, 2], [-22.5, 90, 2], thiz.line_10);
        thiz.zhijiaoleft.position.set(-22.5, 90, 2);
        thiz.Q.position.set(-28.5, 96, 2);
      }
      if (y <= -90) {
        thiz.Point.position.set(90, -90, 2);
        thiz.P.position.set(90 + 15, -90, 2);
        thiz.line8 = common.scaleLine([90, -90, 2], [22.5, 0, 2], thiz.line_8);
        thiz.line10 = common.scaleLine([90, -90, 2], [-22.5, -90, 2], thiz.line_10);
        thiz.zhijiaoleft.position.set(-22.5, -90, 2);
        thiz.Q.position.set(-28.5, -84, 2);
      }
    }
    if (thiz.op.addListen) {
      const ParabolaX = x;
      const ParabolaY = (x * x) / 90;

      thiz.Point.position.set(ParabolaX, ParabolaY, 2);
      thiz.P.position.set(ParabolaX + 15, ParabolaY, 2);
      thiz.zhijiaoleft.position.set(ParabolaX, -22.5, 2);
      thiz.Q.position.set(ParabolaX, -25.5, 2);
      thiz.line11 = common.scaleLine([ParabolaX, ParabolaY, 2], [0, 22.5, 2], thiz.line_11);
      thiz.line13 = common.scaleLine([ParabolaX, ParabolaY, 2], [ParabolaX, -22.5, 2], thiz.line_13);

      if (x >= 90) {
        thiz.Point.position.set(90, 90, 2);
        thiz.P.position.set(90 + 15, 90, 2);
        thiz.zhijiaoleft.position.set(90, -22.5, 2);
        thiz.Q.position.set(90, -25.5, 2);
        thiz.line11 = common.scaleLine([90, 90, 2], [0, 22.5, 2], thiz.line_11);
        thiz.line13 = common.scaleLine([90, 90, 2], [90, -22.5, 2], thiz.line_13);
      }
      if (x <= -90) {
        thiz.Point.position.set(-90, 90, 2);
        thiz.P.position.set(-90 + 15, 90, 2);
        thiz.zhijiaoleft.position.set(-90, -22.5, 2);
        thiz.Q.position.set(-90, -25.5, 2);
        thiz.line11 = common.scaleLine([-90, 90, 2], [0, 22.5, 2], thiz.line_11);
        thiz.line13 = common.scaleLine([-90, 90, 2], [-90, -22.5, 2], thiz.line_13);
      }
    }
    if (thiz.op.addListen1) {
      const ParabolaX = (y * y) / 90;
      const ParabolaY = y;
      thiz.Point.position.set(ParabolaX, ParabolaY, 2);
      thiz.P.position.set(ParabolaX + 15, ParabolaY, 2);
      thiz.Q.position.set(ParabolaX, 0, 2);
      thiz.line14 = common.scaleLine([ParabolaX, ParabolaY, 2], 
        [((1 / 90) * (45 * 45) * (45 * 45)) / (ParabolaY * ParabolaY), -(45 * 45) / ParabolaY, 2], thiz.color1);
      thiz.line16 = common.scaleLine([ParabolaX, ParabolaY, 2], [ParabolaX, 0, 2], thiz.line_16);

      let rad = Math.atan(ParabolaY / (ParabolaX - 22.5));
      let angle = rad * 180 / Math.PI;
      angle = angle < 0 ? (180 + angle) : angle;
      thiz.drawAngle(angle);
      if (y > 0) {
        thiz.scene.remove(thiz.focaZhiJiao);
        thiz.scene.add(thiz.zhijiaoleft);
        thiz.zhijiaoleft.position.set(ParabolaX, 0, 2);
      }
      if (y < 0) {
        thiz.scene.remove(thiz.zhijiaoleft);
        thiz.scene.add(thiz.focaZhiJiao);
        thiz.focaZhiJiao.position.set(ParabolaX, 0, 2);
        angle = angle;
        thiz.drawAngle(angle);
      }
      if (y >= 90) {
        thiz.Point.position.set(90, 90, 2);
        thiz.P.position.set(90 + 15, 90, 2);
        thiz.zhijiaoleft.position.set(90, 0, 2);
        thiz.Q.position.set(90, 0, 2);
        thiz.line14 = common.scaleLine([90, 90, 2], [((1 / 90) * (45 * 45) * (45 * 45)) / (90 * 90), -(45 * 45) / 90, 2], thiz.color1);
        thiz.line16 = common.scaleLine([90, 90, 2], [90, 0, 2], thiz.line_16);
        rad = Math.atan(90 / (90 - 22.5));
        angle = rad * 180 / Math.PI;
        thiz.drawAngle(angle);
      } else if (y <= -90) {
        thiz.Point.position.set(90, -90, 2);
        thiz.P.position.set(90 + 15, -90, 2);
        thiz.focaZhiJiao.position.set(90, 0, 2);
        thiz.Q.position.set(90, 0, 2);
        thiz.line14 = common.scaleLine([90, -90, 2], [((1 / 90) * (45 * 45) * (45 * 45)) / (90 * 90), -(45 * 45) / (-90), 2], thiz.color1);
        thiz.line16 = common.scaleLine([90, -90, 2], [90, 0, 2], thiz.line_16);
        rad = Math.atan(90 / (90 - 22.5));
        angle = rad * 180 / Math.PI;
        thiz.drawAngle(180 - angle);
      }
    }
  }

  //优化
  //椭圆
  commTy(num: number, numb: number, numbe: number, num1: number, tupian: string, zhijiao1: any, zhijiao2: any) {
    this.op.imgShuoMing = `${tupian}`;
    this.scene.remove(zhijiao1);
    this.scene.add(zhijiao2);
    this.line4 = common.scaleLine([num, numb, 2], [numbe, numb, 2], thiz.line_4);
    zhijiao2.position.set(numbe, numb, 2);
    this.Q.position.set(num1, numb, 2);
  }

  // 画角度
  drawAngle(angle: number) {
    this.scene.remove(this.angleA);
    this.angleA = common.drawAngle(0, angle, { color: '#F9E16A', size: 20, zIndex: -2 });
    this.angleA.position.set(22.5, 0, 0);
    this.scene.add(this.angleA);
  }

  initModel() {
    const planeGeometry = new THREE.PlaneGeometry(200, 800);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(215, 0, 5);
    this.scene.add(plane);
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   * 使用该控制器需要在render中调用update方法
   */
  tbctrl() {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = true;
    this.controls.noPan = true;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }

  /**
   * 初始化光源
   */
  initLight(): void {
    const ambientLight = new THREE.AmbientLight('#FFF');

    this.scene.add(ambientLight);
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    this.clearScene();
    this.op.isShow = false;
    this.op.imgShuoMing = '';
  }

}
