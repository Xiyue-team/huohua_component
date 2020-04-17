import * as THREE from 'three';
import {
  WebGLRenderer
} from 'three';
import {
  ThreeBase
} from '../../../../../src/three/template/ThreeBase';
import {
  PerspectiveCamera
} from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import {
  BrowserInfo
} from '../../../../../src/model/BrowserInfo';
import {
  BrowserUtil
} from '../../../../../src/util/BrowserUtil';
import {
  SliderControlLine
} from './SliderControlLine';

import {
  AxisUtil
} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as point1Img from '../sub_static/UI/point1.png';
import * as point2Img from '../sub_static/UI/point2.png';
import * as A from '../sub_static/UI/a.png';
import * as B from '../sub_static/UI/b.png';
const OrbitControls = require('three-orbitcontrols');
let thiz: any = null;
OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private ow: any;
  private Dis: any;
  private controls: any;
  //4个控制点，0：左圆心，1：左圆半径 2：右圆心， 3：右圆半径
  private ctrlPoint = common.createImg([-12, 20, 0], 10, 10, point1Img);
  private ctrlPoint1 = common.createImg([-30, 0, 0], 10, 10, point1Img);
  private ctrlPoint2 = common.createImg([25, 8, 0], 10, 10, point2Img);
  private ctrlPoint3 = common.createImg([30, 0, 0], 10, 10, point2Img);
  private A = common.createImg([-11, 2, 0], 6, 6, A);
  private B = common.createImg([10, 0, 0], 6, 6, B);

  private circle = common.createStrokeCircle(16, { color: '#C3A6FF' });
  private circle2 = common.createStrokeCircle(23, { color: '#6ECFFF' });

  private circleGroup = new THREE.Group();
  private circleGroup2 = new THREE.Group();
  private circleGroupPos = { x: 10, y: 10 };
  private circleGroupPos2 = { x: 70, y: 10 };
  private radius = 3;
  private radius2 = 3;
  private lineForDis = common.drawUnitLine({
    color: '#FFD621',
    isDash: true
  });

  // private lineForRadius = common.drawUnitLine({
  //     color: '#0199FF',
  //
  // });
  // private lineForRadius2 = common.drawUnitLine({
  //     color: '#FF4747',
  //     isDash: true,
  // });

  private r2 = common.createText('d', [14,10,0], { color: '#FFD621' });
  // 保存半径直线的圆上点坐标  方便两圆相切时候划切线
  private radiusPos: any;
  private radius2Pos: any;
  private count = 0;
  private numR = 0;
  //创建直线的三角面箭头
  private triangleArr = common.drawTriangle({ color: '#FF5A5A' });
  //创建向量箭头的直线
  private line_arrow = common.drawUnitLine({
    color: '#9BF23B',
    isDash: true
  });
  private line_arrow2 = common.drawUnitLine({
    color: '#9BF23B',
    isDash: true
  });
  private jiaodian: any;
  private orbit: any;
  private render = () => {
    requestAnimationFrame(this.render);
    if (this.count !== 0) {
      this.count = ++this.count % 3;
      return;
    } else {
      this.count = ++this.count % 3;
    }
    this.renderer.render(this.scene, this.camera);
    (this.renderer as WebGLRenderer).sortObjects = false;
  };

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
    this.ow = (window as any).viewHandler.viewModel.$data;
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.createAxis();
    this.initElement(this.controls);
    this.initEvt();

    this.tbctrl();

    this.changePosByVue({ x: -1.2, y: 2 });
    this.changePosByVue2({ x: 2.5, y: 0.8 });
    // this.preload();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
    this.moveScene();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2C2C2C);
    this.scene.position.x = -80;
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(-80, 0, 0));
    this.camera.position.set(0, 0, 270);
  }

  //初始化摄像机位置
  resetCamera() {
    this.controls.reset();
  }

  //创建一个坐标系
  createAxis() {
    this.scene.add(AxisUtil.createAxis({
      isTicks: true,
      AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''],
      axisColor: '#6F6F6F',
      fontColor: '#6F6F6F'
    } as any));
  }

  // 初始化场景元素
  initElement(controls: any) {
    // 距离连线和两个半径的连线
    this.scene.add(this.lineForDis);
    this.ctrlPoint.name = 'CENTER';
    this.ctrlPoint1.name = 'RADIUS';
    this.circleGroup.add(this.circle, this.A);
    // this.circle.scale.set(3, 3, 3);
    this.scene.add(this.circleGroup, this.ctrlPoint);

    this.ctrlPoint2.name = 'CENTER2';
    this.ctrlPoint3.name = 'RADIUS2';
    this.circleGroup2.add(this.circle2, this.B);
    // this.circle2.scale.set(3, 3, 3);
    this.scene.add(this.circleGroup2, this.ctrlPoint2);
    //把动态的直线添加到场景
    this.scene.add(this.line_arrow, this.line_arrow2);
    // 公切线
    // this.scene.add(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
    this.scene.add(this.r2);
    
  }

  // 初始化拖动点
  initEvt() {
    new SliderControlLine([this.ctrlPoint1, this.ctrlPoint3, this.ctrlPoint, this.ctrlPoint2]).initEvent(this.camera,
      this.renderer);
    // new SliderControlLine(this.ctrlPoint1).initEvent(this.camera);
    // new SliderControlLine(this.ctrlPoint2).initEvent(this.camera);
    // new SliderControlLine(this.ctrlPoint3).initEvent(this.camera);
  }

  // 获取拖动点坐标
  static downHandle(name: string) {

  }

  static moveHandle(pos: any, name: string): void {
    let { x, y } = pos;
    if (name === 'CENTER') {
      // x = Math.round(x / 10) * 10;
      // y = Math.round(y / 10) * 10;
      x = x < 50 ? x < -50 ? -50 : x : 50;
      y = y < 50 ? y < -50 ? -50 : y : 50;
      thiz.ctrlPoint.position.set(x, y, 1);
      (window as any).viewHandler.viewModel.$data.a = -x / 10;
      // console.log((window as any).viewHandler.viewModel.$data.a);
      (window as any).viewHandler.viewModel.$data.b = -y / 10;
      // if ((window as any).viewHandler.viewModel.$refs.spin1) {
      //   (window as any).viewHandler.viewModel.$refs.spin1.reset();
      //   (window as any).viewHandler.viewModel.$refs.spin2.reset();
      // }
    } else if (name === 'RADIUS') {
      // 半径按整数拖动
      let dis: any = Math.hypot(x, y);
      dis = (dis / 10).toFixed(1);
      dis = dis > 9 ? 9 : dis;
      thiz.radius = dis;
      thiz.changeRadius(dis, pos, 0);
      (window as any).viewHandler.viewModel.$data.r = dis;
      if ((window as any).viewHandler.viewModel.$refs.spin3) {
        (window as any).viewHandler.viewModel.$refs.spin3.reset();
      }
    } else if (name === 'CENTER2') {
      // x = Math.round(x / 10) * 10;
      // y = Math.round(y / 10) * 10;
      x = x < 50 ? x < -50 ? -50 : x : 50;
      y = y < 50 ? y < -50 ? -50 : y : 50;
      thiz.ctrlPoint2.position.set(x, y, 1);
      (window as any).viewHandler.viewModel.$data.a2 = -x / 10;
      (window as any).viewHandler.viewModel.$data.b2 = -y / 10;
      if ((window as any).viewHandler.viewModel.$refs.spin4) {
        (window as any).viewHandler.viewModel.$refs.spin4.reset();
        (window as any).viewHandler.viewModel.$refs.spin5.reset();
      }
    } else if (name === 'RADIUS2') {
      let dis: any = Math.hypot(x, y);
      dis = (dis / 10).toFixed(1);
      dis = dis > 9 ? 9 : dis;
      thiz.radius2 = dis;
      thiz.changeRadius(dis, pos, 2);
      (window as any).viewHandler.viewModel.$data.r2 = dis;
      if ((window as any).viewHandler.viewModel.$refs.spin6) {
        (window as any).viewHandler.viewModel.$refs.spin6.reset();
      }
    }

  }

  // 改变左圆位置
  changePosByVue(pos: any) {
    this.circleGroupPos = { x: pos.x * 10, y: pos.y * 10 };
    this.circleGroup.position.set(pos.x * 10, pos.y * 10, 0);
    this.ctrlPoint.position.set(pos.x * 10, pos.y * 10, 0);
    this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
  }

  // 改变右圆位置
  changePosByVue2(pos: any) {
    this.circleGroupPos2 = { x: pos.x * 10, y: pos.y * 10 };
    this.circleGroup2.position.set(pos.x * 10, pos.y * 10, 0);
    this.ctrlPoint2.position.set(pos.x * 10, pos.y * 10, 0);
    this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
  }

  // 改变半径
  changeRadius(radius: number, pos ?: any, num ?: number) {
    const circle = num ? this.circle2 : this.circle;
    // if (radius === circle.scale.x && !pos) { return false; }
    const ctrlPoint = num ? this.ctrlPoint3 : this.ctrlPoint1;
    // const circleGroupPos = num ? this.circleGroupPos2 : this.circleGroupPos;
    // const x = pos ? pos.x : ctrlPoint.position.x;
    // const y = pos ? pos.y : ctrlPoint.position.y;
    // const rad = Math.atan2(y, x);
    // let angle = rad * 180 / Math.PI;
    // angle = angle < 0 ? (360 + angle) : angle;
    // const radiusPosX = radius * 10 * Math.cos(angle / 180 * Math.PI);
    // const radiusPosY = radius * 10 * Math.sin(angle / 180 * Math.PI);
    // ctrlPoint.position.set(radiusPosX, radiusPosY, 0);
    this.numR = (radius * 10);
    circle.visible = true;
    if (num === 0) {
      circle.scale.set(this.numR / 16, this.numR / 16, 1);
    }
    if (num === 2) {
      circle.scale.set(this.numR / 23, this.numR / 23, 1);
    }
    this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    thiz.calcRelationNew();
  }
  
  //两圆之间的连线
  drawLineForDisAndRadius(posC: any, posC2: any, radius: number, radius2: number) {
    const { x, y } = posC;
    const { x: x2, y: y2 } = posC2;

    // 圆心直线
    if (x === x2 && y === y2) {
      this.lineForDis.visible = false;
    } else {
      this.lineForDis.visible = true;
      this.lineForDis = common.scaleLine([x, y, 1], [x2, y2, 1], this.lineForDis);
    }

    let dis: any = Math.hypot(x - x2, y - y2);
    dis = (dis / 10).toFixed(1);
    this.ow.dis = dis;
    //画两个半径直线
    // if (radius) {
    //   this.radiusPos = this.drawLineForRadius(posC, posC2, radius, this.lineForRadius);
    //   this.r1.position.set((this.radiusPos.x + x) / 2 + 3, (this.radiusPos.y + y) / 2 + 5, 1);
    //   this.r1.visible = true;
    // } else {
    //   this.r1.visible = this.lineForRadius.visible = false;
    // }
    if (radius2) {
      this.radius2Pos = this.drawLineForRadius(posC2, posC, radius2);

      // this.r2.position.set((this.radius2Pos.x + x2) / 2 + 1, (this.radius2Pos.y + y2) / 2 - 2, 1);
      this.r2.position.set((posC.x + posC2.x) / 2, ((posC.y + posC2.y) / 2)-2 , 1);
      this.r2.visible = true;
    } else {
      this.r2.visible = false;
    }






    this.drawTangentLine(posC, posC2, radius, radius2, dis);
  }

  drawLineForRadius(posC: any, posC2: any, radius: number) {
    const { x, y } = posC;
    const { x: x2, y: y2 } = posC2;
    let dis: any = Math.hypot(x - x2, y - y2);
    dis = (dis / 10).toFixed(1);
    // line.visible = true;
    const factor = radius / dis;
    const corssPointPos = {} as any;
    corssPointPos.x = (x2 - x) * factor + x;
    corssPointPos.y = (y2 - y) * factor + y;
    // line = common.scaleLine([x, y, 1], [corssPointPos.x, corssPointPos.y, 1], line);
    return corssPointPos;

  }

  // 画公切线的思路，算出内外公切线交点坐标https://donghaoren.org/blog/2009/circle-common-tangents
  // 根据点与圆的切线关系画出切线

  drawTangentLine(posC: any, posC2: any, radius: number, radius2: number, dis: number) {

    const k = (posC2.y - posC.y) / (posC2.x - posC.x);
    const rad = Math.atan(k);
    // 内公切线
    if (dis === (radius + radius2) || dis === Math.abs(radius - radius2)) {

      // this.tangentLineIn2.visible = false;
      // this.tangentLineIn1.scale.set(200, 1, 1);
      // const radiusPos = radius > radius2 ? this.radiusPos : this.radius2Pos;
      // this.tangentLineIn1.position.set(radiusPos.x, radiusPos.y, 0);
      // this.tangentLineIn1.rotation.z = Math.PI / 2 + rad;
    } else {
      // this.tangentLineIn2.visible = true;
      // const corssInPoint = {} as any;
      // corssInPoint.x = (radius * posC2.x + radius2 * posC.x) / (radius + radius2);
      // corssInPoint.y = (radius * posC2.y + radius2 * posC.y) / (radius + radius2);
      // const [contactP, contactP1] = this.calcTangencyPoint(posC, corssInPoint, radius);
      // this.tangentLineIn1 = common.scaleLine([contactP.x + posC.x, contactP.y + posC.y, 0], [corssInPoint.x,
      //     corssInPoint.y, 0
      // ], this.tangentLineIn1, 20);
      // this.tangentLineIn2 = common.scaleLine([contactP1.x + posC.x, contactP1.y + posC.y, 0], [corssInPoint.x,
      //     corssInPoint.y, 0
      // ], this.tangentLineIn2, 20);
    }

    // 外公切线
    if (dis === Math.abs(radius - radius2)) {
      // this.tangentLineOut1.visible = this.tangentLineOut2.visible = false;
    } else {
      // this.tangentLineOut1.visible = this.tangentLineOut2.visible = true;
      if (radius === radius2) {
        // this.tangentLineOut1.scale.set(300, 1, 1);
        // this.tangentLineOut2.scale.set(300, 1, 1);
        // // // 算倾斜角
        // this.tangentLineOut1.rotation.z = this.tangentLineOut2.rotation.z = rad;
        // const offsetX = radius * 10 * Math.sin(rad);
        // const offsetY = radius * 10 * Math.cos(rad);
        // this.tangentLineOut1.position.x = (posC.x + posC2.x) / 2 - offsetX;
        // this.tangentLineOut1.position.y = (posC.y + posC2.y) / 2 + offsetY;
        // this.tangentLineOut2.position.x = (posC.x + posC2.x) / 2 + offsetX;
        // this.tangentLineOut2.position.y = (posC.y + posC2.y) / 2 - offsetY;
      } else {
        // const corssOutPoint = {} as any;
        // corssOutPoint.x = (radius * posC2.x - radius2 * posC.x) / (radius - radius2);
        // corssOutPoint.y = (radius * posC2.y - radius2 * posC.y) / (radius - radius2);
        // const [contactP3, contactP4] = this.calcTangencyPoint(posC, corssOutPoint, radius);
        // this.tangentLineOut1 = common.scaleLine([contactP3.x + posC.x, contactP3.y + posC.y, 0], [corssOutPoint
        //     .x, corssOutPoint.y, 0
        // ], this.tangentLineOut1, 20);
        // this.tangentLineOut2 = common.scaleLine([contactP4.x + posC.x, contactP4.y + posC.y, 0], [corssOutPoint
        //     .x,
        //     corssOutPoint.y, 0
        // ], this.tangentLineOut2, 20);
      }
    }
    this.calcRelationNew();
  }

  calcRelation(posC: any, posC2: any, radius: number, radius2: number, dis: number) {

    if (radius === radius2 && posC.x === posC2.x && posC.y === posC2.y) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '同心圆';
      (window as any).viewHandler.viewModel.$data.count = '无数个';
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = '无数个';
    } else if (dis < Math.abs(radius - radius2)) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '内含';
      (window as any).viewHandler.viewModel.$data.count = 0;
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = 0;
    } else if (dis === Math.abs(radius - radius2)) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '内切';
      (window as any).viewHandler.viewModel.$data.count = 1;
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = 1;
    } else if (dis > Math.abs(radius - radius2) && dis < Math.abs(radius + radius2)) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '相交';
      (window as any).viewHandler.viewModel.$data.count = 2;
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = 2;
    } else if (dis === Math.abs(radius + radius2)) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '外切';
      (window as any).viewHandler.viewModel.$data.count = 1;
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = 3;
    } else if (dis > Math.abs(radius + radius2)) {
      // (window as any).viewHandler.viewModel.$data.titleBox = '外离';
      (window as any).viewHandler.viewModel.$data.count = 0;
      // (window as any).viewHandler.viewModel.$data.dis = dis;
      (window as any).viewHandler.viewModel.$data.lineCount = 4;
    }

    if (posC.x === posC2.x && posC.y === posC2.y) {
      // this.textD.visible = false;
    } else {
      // this.textD.visible = true;
      // this.textD.position.set((posC.x + posC2.x) / 2, (posC.y + posC2.y) / 2, 1);
    }
  }

  // 判断圆与圆的位置关系
  calcRelationNew() {
    const r1 = this.ow.value1;
    const r2 = this.ow.value2;
    if (this.ow.dis > r1 + r2) {
      this.ow.titleBox = this.ow.titleBoxArr[4];
      this.line_arrow.visible = this.line_arrow2.visible = false;
    }
    if (this.ow.dis == r1 + r2) {
      this.ow.titleBox = this.ow.titleBoxArr[3];
      this.line_arrow.visible = this.line_arrow2.visible = false;
    }
    if (this.ow.dis < r1 + r2) {
      this.ow.titleBox = this.ow.titleBoxArr[2];
      this.line_arrow.visible = this.line_arrow2.visible = true;
      this.connectOuterAni();
    }
    if (this.ow.dis == Math.abs(r1 - r2)) {
      this.ow.titleBox = this.ow.titleBoxArr[1];
      this.line_arrow.visible = this.line_arrow2.visible = false;
    }
    if (this.ow.dis < Math.abs(r1 - r2)) {
      this.ow.titleBox = this.ow.titleBoxArr[0];
      this.line_arrow.visible = this.line_arrow2.visible = false;
    }

  }

  //画动态直线的方法
  connectOuterAni() {
    // 圆1的坐标为（x1，y1）,半径为r1
    const x1 = thiz.ctrlPoint.position.x;
    const y1 = thiz.ctrlPoint.position.y;
    const r1 = this.ow.value1 * 10;
    // 圆2的坐标为（x2，y2）,半径为r2
    const x2 = thiz.ctrlPoint2.position.x;
    const y2 = thiz.ctrlPoint2.position.y;
    const r2 = this.ow.value2 * 10;
    const d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    // 方式4
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(r1 * r1 - a * a);
    const x0 = x1 + (a / d) * (x2 - x1);
    const y0 = y1 + (a / d) * (y2 - y1);
    const xc = x0 - (h/d)*(y2-y1);
    const yc = y0 + (h/d)*(x2-x1);

    this.line_arrow = common.scaleLine(thiz.ctrlPoint.position, [xc, yc, 1], this.line_arrow, 2);
    this.line_arrow2 = common.scaleLine(thiz.ctrlPoint2.position, [xc, yc, 1], this.line_arrow2, 1.8);
    Promise.all([
      common.lineAni([thiz.ctrlPoint.position.x, this.ctrlPoint.position.y, 1], [xc, yc, 1], thiz.line_arrow),
      common.lineAni([thiz.ctrlPoint2.position.x, this.ctrlPoint2.position.y, 1], [xc, yc, 1], thiz.line_arrow2),
    ]).then(() => {
    });

  }


  // 计算点到圆的切线
  calcTangencyPoint(posC: any, corssPos: any, radius: number) {
    const { x: cx, y: cy } = posC;
    const { x: px, y: py } = corssPos;
    const nx = px - cx;
    const ny = py - cy;
    const scaleT = radius * 10 / Math.sqrt(nx * nx + ny * ny);
    const corssPointPos = {} as any;
    corssPointPos.x = nx * scaleT;
    corssPointPos.y = ny * scaleT;
    const rad = Math.acos(scaleT);
    const contactP = {} as any;
    contactP.x = corssPointPos.x * Math.cos(rad) - corssPointPos.y * Math.sin(rad);
    contactP.y = corssPointPos.x * Math.sin(rad) + corssPointPos.y * Math.cos(rad);
    const contactP1 = {} as any;
    contactP1.x = corssPointPos.x * Math.cos(-rad) - corssPointPos.y * Math.sin(-rad);
    contactP1.y = corssPointPos.x * Math.sin(-rad) + corssPointPos.y * Math.cos(-rad);
    return [
      contactP,
      contactP1
    ];

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
    this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
    this.orbit.saveState ();
    this.orbit.enableRotate = false;
    this.orbit.enableZoom = false;
    this.orbit.enableDamping = true;
    this.orbit.enableZoom = false;
    this.orbit.minDistance = 1;
    this.orbit.minDistance = 250;
    this.orbit.maxDistance = 500;
    this.orbit.enablePan = false;
  }

  /**
   * 初始化光源
   */
  initLight(): void {
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   *  重置模型位置
   */
  resetModelPosition() : void {
    this.circleGroupPos = { x: 10, y: 10 };
    this.circleGroupPos2 = { x: 70, y: 10 };
    this.ctrlPoint2.position.set(25, 8, 0);
    this.ctrlPoint.position.set(-12, 20, 0);
    this.circleGroup.position.set(-12, 20, 0);
    this.circleGroup2.position.set(25, 8, 0);
    this.changePosByVue({ x: -1.2, y: 2 });
    this.changePosByVue2({ x: 2.5, y: 0.8 });
    // this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    this.ow.value1 = 1.6;
    this.ow.value2 = 2.3;
    this.ow.dis = 3.9;
    this.ow.have = true;
    this.ow.isChecked = false;
    document.getElementById('textImg2').style.opacity = '0';
  }

  // 在ipad里面把整个场景往右移动一点
   moveScene() :void{
         const W1 = window.innerWidth;
         if( W1 === 1024){
            this.scene.position.x = -60; 
         }    
   }
}
