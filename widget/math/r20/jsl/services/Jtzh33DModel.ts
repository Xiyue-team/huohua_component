import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');

OBJLoader(THREE);
let thiz: any = null;
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import common from './CommonForThree';
import { SliderControlLine } from './SliderControlLine';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import * as F1 from '../sub_static/01.png';
import * as F2 from '../sub_static/02.png';
import * as point from '../sub_static/point.png';
import * as thirdpf from '../sub_static/pf.png';
import * as xiel from '../sub_static/xiel.png';

export class Jtzh33DModel extends ThreeBase {

  browserInfo: BrowserInfo;

  sliderControlLine: SliderControlLine;
  public orbit: any;
  //B点和A点
  private PPoint: any = common.createImg([24, 10.5, 2], 16, 16, point);
  private B = common.createText('B', [24, 22, 2]);
  private PPoint1: any = common.createImg([-13, 17.5, 2], 16, 16, point);
  private A = common.createText('A', [-13, 29, 2]);
  //坐标轴F1和F2点
  private F1 = common.createImg([-20, -6, 2], 6, 8.4, F1);
  private F2 = common.createImg([20, -6, 2], 6, 8.4, F2);
  private circleF1 = common.drawCircle(1, { position: [-20, 0, 2], color: '#0199FF' });
  private circleF2 = common.drawCircle(1, { position: [20, 0, 2], color: '#0199FF' });
  //P点
  private P = common.createText('P', [8, 15, 2]);
  private EllipseCurve: any;
  private ellipsePointArr: any = [];
  px: any;
  py: any;
  //右下脚公式
  private thirdpf = common.createImg([80, -100, 2], 81, 36, thirdpf);
  private xiel = common.createImg([78, -101, 2], 62, 16, xiel);
  isThird: boolean;

  //创建线
  private line1 = common.drawUnitLine({ width: 1, isDash: false, color: '#0199FF' });
  private line2 = common.drawUnitLine({ width: 1, isDash: false, color: '#0199FF' });
  private line3 = common.drawUnitLine({ width: 1, isDash: false, color: '#0199FF' });
  private line4 = common.drawUnitLine({ width: 1, isDash: false, color: '#0199FF' });
  private lineAF1 = common.scaleLine([-13, 17.5, 2], [-20, 0, 2], this.line1);
  private lineBF2 = common.scaleLine([24, 10.5, 2], [20, 0, 2], this.line2);
  private lineAF2 = common.scaleLine([-13, 17.5, 2], [20, 0, 2], this.line3);
  private lineBF1 = common.scaleLine([24, 10.5, 2], [-20, 0, 2], this.line4);
  private tp: any;
  private render = () => { requestAnimationFrame(this.render); this.renderer.render(this.scene, this.camera); };

  /**
   * @param {Element} domElement   渲染element
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
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
    this.initControl();
    this.render();
    this.createAxis();
    this.initElement();
    this.initEvt();
    this.initEllipseArr();
    this.initModel();
    this.tp = (window as any).viewHandler.viewModel.$data;
  }

  //初始化场景
  initScene(): void {
    this.scene = new THREE.Scene();
  }

  //初始化镜头
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 270);
  }

  //初始化渲染器
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  //初始化控制器
  initControl(): void {
    this.orbit = new TrackballControls(this.camera, this.renderer.domElement);
    this.orbit.rotateSpeed = 3;
    this.orbit.zoomSpeed = 1.2;
    this.orbit.panSpeed = 0.8;
    this.orbit.noZoom = true;
    this.orbit.noPan = true;
    this.orbit.noRotate = true;
    this.orbit.staticMoving = true;
    this.orbit.dynamicDampingFactor = 0.3;
  }

  //初始化光源
  initLight(): void {
    this.lights = [];
    this.lights.push(new THREE.AmbientLight(0xffffff, 0.6));
    this.camera.add(this.lights[0]);
    const directionalLight4 = new THREE.HemisphereLight('#ffffff', '#ffffff', 0.3);
    directionalLight4.color.setHSL(.6, 1, .6);
    directionalLight4.groundColor.setHSL(.095, 1, .75);
    directionalLight4.position.set(0, 0, 0);
    this.camera.add(directionalLight4);

    const dirLight = new THREE.DirectionalLight('#ffffff', 0.2);
    dirLight.position.set(100, 0, 100);
    this.camera.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight('#ffffff', 0.05);
    dirLight2.position.set(-100, 0, -100);
    this.camera.add(dirLight2);
  }

  //初始界面
  initElement() {
    this.PPoint.name = 'right';
    this.PPoint1.name = 'left';
    this.scene.add(this.F1, this.F2, this.circleF1, this.circleF2);
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  //画圆
  initModel() {
    this.EllipseCurve = common.drawDashOrLine(this.ellipsePointArr);
    this.scene.add(this.EllipseCurve);
  }

  //切换回初始界面
  remove() {
    this.scene.remove(this.PPoint, this.B, this.PPoint1, this.A, this.lineAF1,
      this.lineBF2, this.lineAF2, this.lineBF1, this.P, this.thirdpf, this.xiel, thiz.xielv, thiz.PF2, thiz.PF1);
     thiz.sliderControlLine.enabled = false;
  }

  //切换至第二步
  second() {
    this.isThird = false;
    this.scene.add(this.PPoint, this.B, this.PPoint1, this.A, this.lineAF1, this.lineBF2, this.xiel);
    this.scene.remove(this.lineAF2, this.lineBF1, this.P, this.thirdpf, thiz.PF2, thiz.PF1);
    thiz.sliderControlLine.enabled = true;
  }

  //切换至第三步
  third() {
    this.isThird = true;
    this.scene.add(this.PPoint, this.B, this.PPoint1, this.A, this.lineAF1, this.lineBF2, this.lineAF2, this.lineBF1, this.P, this.thirdpf);
    this.scene.remove(this.xiel, thiz.xielv);
    thiz.sliderControlLine.enabled = true;
  }

  //创建坐标系
  createAxis() {
    const Ax = AxisUtil.createAxis({
      isTicks: true,
      AxisXNumArray: ['', '', '', '', '', '', '', '', '', '']
    } as any);
    this.scene.add(Ax);
  }

  // 初始化拖动点
  initEvt() {
    this.sliderControlLine = new SliderControlLine(
      [this.PPoint, this.PPoint1]).initEvent(this.camera, this.renderer);
  }

  //椭圆轨迹
  initEllipseArr() {
    for (let i = -60; i < 301; i += 4) {
      const x = 20 * Math.sqrt(2) * Math.cos(Math.PI * i / 180);
      const y = 20 * Math.sin(Math.PI * i / 180);
      this.ellipsePointArr.push({ x, y, z: 0 });
    }
  }

  // 获取拖动点坐标
  // tslint:disable-next-line:member-ordering
  static downHandle() {
  }

  //移动动点位置
  // tslint:disable-next-line:member-ordering
  static moveHandle(pos: any, name: string): void {
    const { x, y } = pos;
    const a = 20 * Math.sqrt(2);
    const b = 20;
    const rat = b / a;
    const angleRadius = Math.atan2(y / rat, x);
    //B点固定在椭圆上拖动
    thiz.px = a * Math.cos(angleRadius);
    thiz.py = a * Math.sin(angleRadius) * rat;
    //A点固定在椭圆上拖动
    thiz.px1 = a * Math.cos(angleRadius);
    thiz.py1 = a * Math.sin(angleRadius) * rat;
    //B点拖动
    if (name === 'right') {
      //保证点只在X轴上方
      if (thiz.py > 0) {
        //bf2 斜率
        const kb = thiz.py / (thiz.px - 20);
        //B点坐标
        thiz.B.position.set(thiz.px, thiz.py + 12, 0);
        thiz.PPoint.position.set(thiz.px, thiz.py, 0);
        //BF2与AF1保持平行
        if (thiz.px < 20) {
          thiz.px1 = ((-20 * (Math.sqrt((2 * kb * kb) + 2))) - 40 * kb * kb) / (2 * kb * kb + 1);
        } else if (thiz.px >= 20) {
          thiz.px1 = ((20 * (Math.sqrt((2 * kb * kb) + 2))) - 40 * kb * kb) / (2 * kb * kb + 1);
        }
        thiz.py1 = kb * thiz.px1 + 20 * kb;
        //af1 斜率 A点坐标
        const ka = thiz.py1 / (thiz.px1 + 20);
        thiz.PPoint1.position.set(thiz.px1, thiz.py1, 0);
        thiz.A.position.set(thiz.px1, thiz.py1 + 12, 0);
        thiz.lineAF1 = common.scaleLine([thiz.px1, thiz.py1, 0], [-20, 0, 2], thiz.line1);
        thiz.lineAF2 = common.scaleLine([thiz.px1, thiz.py1, 0], [20, 0, 2], thiz.line3);
        thiz.addBF22(thiz.px, thiz.py);
        thiz.addBF11(thiz.px, thiz.py);
        //P点移动方法
        thiz.movep();
        //右下角斜率显示
        thiz.scene.remove(thiz.xielv);
        thiz.xielv = common.createText(`${ka.toFixed(2)}`, [90, -98, 2]);
        //判断时第几步显示对应的内容
        if (thiz.isThird === true) {
          thiz.scene.remove(thiz.xielv);
          thiz.scene.add(thiz.PF2, thiz.PF1);
        } else {
          thiz.scene.add(thiz.xielv);
        }
      } else if (thiz.px < 0 && thiz.py <= 0) {  //保持点只会在X轴上方,当拖动点到X轴上时，各个线、点的位置
        thiz.keep1();
      } else if (thiz.px > 0 && thiz.py <= 0) {
        thiz.keep2();
      }
    }
    //A点拖动
    if (name === 'left') {
      if (thiz.py1 > 0) {
        const ka = thiz.py1 / (thiz.px1 + 20);
        thiz.A.position.set(thiz.px1, thiz.py1 + 12, 0);
        thiz.PPoint1.position.set(thiz.px1, thiz.py1, 0);
        if (thiz.px1 < -20) {
          thiz.px = (-(20 * (Math.sqrt((2 * ka * ka) + 2))) + 40 * ka * ka) / (2 * ka * ka + 1);
        } else if (thiz.px1 >= -20) {
          thiz.px = ((20 * (Math.sqrt((2 * ka * ka) + 2))) + 40 * ka * ka) / (2 * ka * ka + 1);
        }
        thiz.py = ka * thiz.px - 20 * ka;
        thiz.lineBF2 = common.scaleLine([thiz.px, thiz.py, 0], [20, 0, 2], thiz.line2);
        thiz.lineBF1 = common.scaleLine([thiz.px, thiz.py, 0], [-20, 0, 2], thiz.line4);
        thiz.PPoint.position.set(thiz.px, thiz.py, 2);
        thiz.B.position.set(thiz.px, thiz.py + 12, 2);
        thiz.addAF11(thiz.px1, thiz.py1);
        thiz.addAF22(thiz.px1, thiz.py1);
        thiz.movep();
        thiz.scene.remove(thiz.xielv);
        thiz.xielv = common.createText(`${ka.toFixed(2)}`, [90, -98, 2]);
        if (thiz.isThird === true) {
          thiz.scene.remove(thiz.xielv);
          thiz.scene.add(thiz.PF2, thiz.PF1);
        } else {
          thiz.scene.add(thiz.xielv);
        }
      } else if (thiz.px1 < 0 && thiz.py1 <= 0) {  //保持点只会在X轴上方,当拖动点到X轴上时，各个线、点的位置
        thiz.keep1();
      } else if (thiz.px1 > 0 && thiz.py1 <= 0) {
        thiz.keep2();
      }
    }
  }

  //保持点在X轴上方
  keep1() {
    thiz.PPoint1.position.set(-20 * Math.sqrt(2), 0, 0);
    thiz.A.position.set(-20 * Math.sqrt(2), 10, 0);
    thiz.lineAF1 = common.scaleLine([-20 * Math.sqrt(2), 0, 2], [-20, 0, 2], thiz.line1);
    thiz.lineAF2 = common.scaleLine([-20 * Math.sqrt(2), 0, 2], [20, 0, 2], thiz.line3);
    thiz.PPoint.position.set(-20 * Math.sqrt(2), 0, 0);
    thiz.B.position.set(-20 * Math.sqrt(2), 10, 0);
    thiz.lineBF2 = common.scaleLine([-20 * Math.sqrt(2), 0, 2], [20, 0, 2], thiz.line2);
    thiz.lineBF1 = common.scaleLine([-20 * Math.sqrt(2), 0, 2], [-20, 0, 2], thiz.line4);
  }

  keep2() {
    thiz.PPoint1.position.set(20 * Math.sqrt(2), 0, 0);
    thiz.A.position.set(20 * Math.sqrt(2), 10, 0);
    thiz.lineAF1 = common.scaleLine([20 * Math.sqrt(2), 0, 2], [-20, 0, 2], thiz.line1);
    thiz.lineAF2 = common.scaleLine([20 * Math.sqrt(2), 0, 2], [20, 0, 2], thiz.line3);
    thiz.PPoint.position.set(20 * Math.sqrt(2), 0, 0);
    thiz.B.position.set(20 * Math.sqrt(2), 10, 0);
    thiz.lineBF2 = common.scaleLine([20 * Math.sqrt(2), 0, 2], [20, 0, 2], thiz.line2);
    thiz.lineBF1 = common.scaleLine([20 * Math.sqrt(2), 0, 2], [-20, 0, 2], thiz.line4);
  }
  //P点运动
  movep() {
    //BF1 AF2斜率
    const k = thiz.py / (thiz.px + 20);
    const k1 = thiz.py1 / (thiz.px1 - 20);
    //P点坐标
    const xp = 20 * (k1 + k) / (k1 - k);
    const yp = 40 * k * k1 / (k1 - k);
    this.P.position.set(xp, yp + 9, 2);
    const pf1 = Math.sqrt(xp * xp + 40 * xp + 400 + yp * yp) / 20;
    const pf2 = Math.sqrt(xp * xp - 40 * xp + 400 + yp * yp) / 20;
    thiz.scene.remove(thiz.PF1, thiz.PF2);
    thiz.PF1 = common.createText(`${pf1.toFixed(2)}`, [75, -86, 2]);
    thiz.PF2 = common.createText(`${pf2.toFixed(2)}`, [75, -108, 2]);
  }

  addAF11(x: number, y: number) {
    this.lineAF1 = common.scaleLine([x, y, 0], [-20, 0, 2], this.line1);
  }

  addBF22(x: number, y: number) {
    this.lineBF2 = common.scaleLine([x, y, 0], [20, 0, 2], this.line2);
  }

  addAF22(x: number, y: number) {
    this.lineAF2 = common.scaleLine([x, y, 0], [20, 0, 2], this.line3);
  }

  addBF11(x: number, y: number) {
    this.lineBF1 = common.scaleLine([x, y, 0], [-20, 0, 2], this.line4);
  }
}
