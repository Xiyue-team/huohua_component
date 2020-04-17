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
import * as point from '../sub_static/point.png';

export class Jtzh33DModel extends ThreeBase {

  browserInfo: BrowserInfo;

  sliderControlLine: SliderControlLine;
  public orbit: any;
  private tp: any;

  private li = common.drawUnitLine({ width: 1.2, isDash: false, color: '#000000' });
  private line = common.scaleLine([-40, 100, 2], [40, -60, 2], this.li);

  private PointA: any = common.createImg([-25, 70, 5], 22, 22, point);
  private PointP: any = common.createImg([0, 20, 5], 22, 22, point);
  private PointB: any = common.createImg([25, -30, 5], 22, 22, point);
  private PointO: any = common.createImg([-60, -10, 5], 20, 20, point);
  private A = common.createText('A', [-19, 73, 3]);
  private P = common.createText('P', [6, 23, 3]);
  private B = common.createText('B', [31, -27, 3]);
  private O = common.createText('O', [-53, -8, 3]);

  private line1 = common.drawUnitLine({ width: 1.2, isDash: false, color: '#0199FF' });
  private line2 = common.drawUnitLine({ width: 1.2, isDash: false, color: '#FF0000' });
  private linePA = common.scaleLine([0, 20, 3], [-25, 70, 3], this.line1);
  private lineBP = common.scaleLine([25, -30, 3], [0, 20, 3], this.line2);
  private line3 = common.drawUnitLine({ width: 1.2, isDash: false, color: '#000000' });
  private line4 = common.drawUnitLine({ width: 1.2, isDash: true, color: '#1FBA9E' });
  private line5 = common.drawUnitLine({ width: 1.2, isDash: false, color: '#000000' });
  private line6 = common.drawUnitLine({ width: 1.2, isDash: false, color: '#000000' });
  private lineOA = common.scaleLine([-60, -10, 3], [-25, 70, 3], this.line3);
  private lineOP = common.scaleLine([-60, -10, 3], [0, 20, 3], this.line5);
  private lineBO = common.scaleLine([25, -30, 3], [-60, -10, 3], this.line4);
  private lineOB = common.scaleLine([-60, -10, 3], [25, -30, 3], this.line6);

  isMove: any = true;
  isSecond: any = true;
  private triangleGroup = new THREE.Group();
  private triangleArr = [common.drawTriangle1({ color: '#000000' }), common.drawTriangle1({ color: '#000000' }),
    common.drawTriangle1({ color: '#1FBA9E' })];
  private thrzy = common.drawTriangle1({ color: '#1FBA9E' });
  private fourzy = common.drawTriangle1({ color: '#000000' });

  ax: any;
  px: any;
  py: any;
  by: any;
  pazb: any;
  bpzb: any;

  private render = () => { requestAnimationFrame(this.render); this.renderer.render(this.scene, this.camera); };

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
    this.initElement();
    this.initEvt();
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
    this.PointA.name = 'PointA';
    this.PointP.name = 'PointP';
    this.PointB.name = 'PointB';
    this.PointO.name = 'PointO';
    //主线上两个箭头的显示方法
    if (this.PointA.position.y > this.PointP.position.y) {  //拖动A点改变
      this.pazb = common.drawTriangle('#0199FF', 0.15 * Math.PI, this.PointA.position.x + 1, this.PointA.position.y, 3);
    } else if (this.PointA.position.y <= this.PointP.position.y) {
      this.pazb = common.drawTriangle('#0199FF', -0.85 * Math.PI, this.PointA.position.x - 1, this.PointA.position.y, 3);
    }
    if (this.PointB.position.y < this.PointP.position.y) {  //拖动P点改变
      this.bpzb = common.drawTriangle('#FF0000', 0.15 * Math.PI, this.PointP.position.x + 1, this.PointP.position.y, 3);
    } else if (this.PointB.position.y >= this.PointP.position.y) {
      this.bpzb = common.drawTriangle('#FF0000', -0.85 * Math.PI, this.PointP.position.x - 1, this.PointP.position.y, 3);
    }

    this.scene.add(this.line, this.PointA, this.PointP, this.PointB, this.A, this.P,
      this.B, this.linePA, this.lineBP, this.bpzb, this.pazb);
    this.thrzy.position.set(this.PointB.position.x, this.PointB.position.y, 3);
    this.thrzy.rotation.z = this.calcTriangleRotate([this.PointO.position.x, this.PointO.position.y, 3],
      [this.PointB.position.x, this.PointB.position.y, 3]);
    this.fourzy.position.set(this.PointB.position.x, this.PointB.position.y, 3);
    this.fourzy.rotation.z = this.calcTriangleRotate([this.PointO.position.x, this.PointO.position.y, 3],
      [this.PointB.position.x, this.PointB.position.y, 3]);
    this.xuanz();
    this.triangleGroup.add(...this.triangleArr);
  }

  xuanz() {
    this.triangleArr[0].position.set(this.PointA.position.x, this.PointA.position.y, 3);
    this.triangleArr[1].position.set(this.PointP.position.x, this.PointP.position.y, 3);
    this.triangleArr[2].position.set(this.PointO.position.x, this.PointO.position.y, 3);
    this.triangleArr[0].rotation.z = this.calcTriangleRotate([this.PointO.position.x, this.PointO.position.y, 3],
      [this.PointA.position.x, this.PointA.position.y, 3]);
    this.triangleArr[1].rotation.z = this.calcTriangleRotate([this.PointO.position.x, this.PointO.position.y, 3],
      [this.PointP.position.x, this.PointP.position.y, 3]);
    this.triangleArr[2].rotation.z = this.calcTriangleRotate([this.PointB.position.x, this.PointB.position.y, 3],
      [this.PointO.position.x, this.PointO.position.y, 3]);
  }

  // 计算向量箭头角度
  calcTriangleRotate(startPos: any, endPos: any) {
    const rad = Math.atan2(startPos[1] - endPos[1], startPos[0] - endPos[0]);
    return rad + Math.PI;
  }

  first() {
    this.PointA.visible = true;
    this.PointP.visible = true;
    this.PointB.visible = true;
    this.scene.remove(this.PointO, this.O, this.lineOA, this.lineOP, this.lineBO, this.triangleGroup, this.lineOB, this.thrzy, this.fourzy);
    this.isMove = true;
  }

  second() {
    this.PointA.visible = false;
    this.PointP.visible = false;
    this.PointB.visible = false;
    this.isSecond = true;
    this.line5.material.color = new THREE.Color('#000000');
    (this.triangleArr[1].material as any).color = new THREE.Color('#000000');
    this.triangleArr[2].visible = true;
    (this.triangleArr[2].material as any).color = new THREE.Color('#1FBA9E');
    this.scene.add(this.PointO, this.O, this.lineOA, this.lineOP, this.lineBO, this.triangleGroup);
    this.scene.remove(this.lineOB, this.thrzy, this.fourzy);
    //自动画线是否开启
    if (this.isMove === true) {
      this.animationO();
      this.isMove = false;
    } else {
      return;
    }
  }

  third() {
    this.PointA.visible = false;
    this.PointP.visible = false;
    this.PointB.visible = false;
    this.isMove = true;
    this.isSecond = false;
    this.line5.material.color = new THREE.Color('#1FBA9E');
    (this.triangleArr[1].material as any).color = new THREE.Color('#1FBA9E');
    this.triangleArr[2].visible = false;
    this.scene.add(this.lineBO, this.PointO, this.O, this.lineOA, this.lineOP, this.triangleGroup, this.thrzy);
    this.scene.remove(this.lineOB, this.fourzy);
  }

  four() {
    this.PointA.visible = false;
    this.PointP.visible = false;
    this.PointB.visible = false;
    this.isMove = true;
    this.isSecond = false;
    this.line5.material.color = new THREE.Color('#000000');
    (this.triangleArr[1].material as any).color = new THREE.Color('#000000');
    this.triangleArr[2].visible = false;
    this.scene.add(this.lineOB, this.PointO, this.O, this.lineOA, this.lineOP, this.triangleGroup, this.fourzy);
    this.scene.remove(this.lineBO, this.thrzy);
  }

  //初始化拖动点
  initEvt() {
    this.sliderControlLine = new SliderControlLine(
      [this.PointA, this.PointP, this.PointB, this.PointO]).initEvent(this.camera, this.renderer);
  }
  // 获取拖动点坐标
  // tslint:disable-next-line:member-ordering
  static downHandle() {
  }
  //移动动点位置
  // tslint:disable-next-line:member-ordering
  static moveHandle(pos: any, name: string): void {
    const { x, y } = pos;
    thiz.ox = x;
    thiz.oy = y;
    //A,P,B拖动范围
    if (x >= -40 && x <= 40) {
      thiz.ax = x;
      thiz.ay = 20 - 2 * x;
      thiz.px = x;
      thiz.py = 20 - 2 * x;
      thiz.bx = x;
      thiz.by = 20 - 2 * x;
    }
    //拖动对应点时 坐标以及字位置实时改变
    if (name === 'PointA') {  //拖动A点
      thiz.PointA.position.set(thiz.ax, thiz.ay, 5);
      thiz.A.position.set(thiz.ax + 6, thiz.ay + 3, 2);
      //拖动点时线段、箭头都要时时发生改变
      thiz.linePA = common.scaleLine([thiz.PointP.position.x, thiz.PointP.position.y, 3],
        [thiz.PointA.position.x, thiz.PointA.position.y, 3], thiz.line1);
      thiz.lineOA = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointA.position.x, thiz.PointA.position.y, 3], thiz.line3);
      thiz.triangleArr[0].position.set(thiz.PointA.position.x, thiz.PointA.position.y, 3);
      thiz.triangleArr[0].rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointA.position.x, thiz.PointA.position.y, 3]);
      thiz.scene.remove(thiz.pazb);  //A点箭头发生位移
      if (thiz.PointA.position.y > thiz.PointP.position.y) {
        thiz.pazb = common.drawTriangle('#0199FF', 0.15 * Math.PI, thiz.PointA.position.x + 1, thiz.PointA.position.y, 3);
      } else if (thiz.PointA.position.y <= thiz.PointP.position.y) {
        thiz.pazb = common.drawTriangle('#0199FF', -0.85 * Math.PI, thiz.PointA.position.x - 1, thiz.PointA.position.y, 3);
      }
      thiz.scene.add(thiz.pazb);
    }
    if (name === 'PointP') {  //拖动P点
      thiz.PointP.position.set(thiz.px, thiz.py, 5);
      thiz.P.position.set(thiz.px + 6, thiz.py + 3, 2);
      //拖动点时线段、箭头都要时时发生改变
      thiz.linePA = common.scaleLine([thiz.PointP.position.x, thiz.PointP.position.y, 3],
        [thiz.PointA.position.x, thiz.PointA.position.y, 3], thiz.line1);
      thiz.lineBP = common.scaleLine([thiz.PointB.position.x, thiz.PointB.position.y, 3],
        [thiz.PointP.position.x, thiz.PointP.position.y, 3], thiz.line2);
      thiz.lineOP = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointP.position.x, thiz.PointP.position.y, 3], thiz.line5);
      thiz.triangleArr[1].position.set(thiz.PointP.position.x, thiz.PointP.position.y, 3);
      thiz.triangleArr[1].rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointP.position.x, thiz.PointP.position.y, 3]);
      thiz.scene.remove(thiz.bpzb);  //P点箭头发生位移
      if (thiz.PointB.position.y < thiz.PointP.position.y) {  //拖动P点改变
        thiz.bpzb = common.drawTriangle('#FF0000', 0.15 * Math.PI, thiz.PointP.position.x + 1, thiz.PointP.position.y, 3);
      } else if (thiz.PointB.position.y >= thiz.PointP.position.y) {
        thiz.bpzb = common.drawTriangle('#FF0000', -0.85 * Math.PI, thiz.PointP.position.x - 1, thiz.PointP.position.y, 3);
      }
      thiz.scene.add(thiz.bpzb);
    }
    if (name === 'PointB') {  //拖动B点
      thiz.PointB.position.set(thiz.bx, thiz.by, 5);
      thiz.B.position.set(thiz.bx + 6, thiz.by + 3, 2);
      //拖动点时线段、箭头都要时时发生改变
      thiz.lineBP = common.scaleLine([thiz.PointB.position.x, thiz.PointB.position.y, 3],
        [thiz.PointP.position.x, thiz.PointP.position.y, 3], thiz.line2);
      thiz.lineOB = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3], thiz.line6);
      thiz.lineBO = common.scaleLine([thiz.PointB.position.x, thiz.PointB.position.y, 3],
        [thiz.PointO.position.x, thiz.PointO.position.y, 3], thiz.line4);
      thiz.thrzy.position.set(thiz.PointB.position.x, thiz.PointB.position.y, 3);
      thiz.fourzy.position.set(thiz.PointB.position.x, thiz.PointB.position.y, 3);
      thiz.thrzy.rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3]);
      thiz.fourzy.rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3]);
      thiz.scene.remove(thiz.bpzb);  //P点箭头发生位移
      if (thiz.PointB.position.y < thiz.PointP.position.y) {  //拖动P点改变
        thiz.bpzb = common.drawTriangle('#FF0000', 0.15 * Math.PI, thiz.PointP.position.x + 1, thiz.PointP.position.y, 3);
      } else if (thiz.PointB.position.y >= thiz.PointP.position.y) {
        thiz.bpzb = common.drawTriangle('#FF0000', -0.85 * Math.PI, thiz.PointP.position.x - 1, thiz.PointP.position.y, 3);
      }
      thiz.scene.add(thiz.bpzb);
    }
    if (name === 'PointO') {  //拖动O点
      thiz.PointO.position.set(thiz.ox, thiz.oy, 5);
      thiz.O.position.set(thiz.ox + 6, thiz.oy + 3, 3);
      //需求：O点不能在直线上
      const bili = ((thiz.PointO.position.y - thiz.PointB.position.y) / (thiz.PointO.position.x - thiz.PointB.position.x));
      if (bili <= -2) {
        thiz.PointO.position.y += 3;
      } else if (bili > -2) {
        thiz.PointO.position.y -= 3;
      }
      //拖动点时线段、箭头都要时时发生改变
      thiz.lineOA = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointA.position.x, thiz.PointA.position.y, 3], thiz.line3);
      thiz.lineOP = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointP.position.x, thiz.PointP.position.y, 3], thiz.line5);
      thiz.lineOB = common.scaleLine([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3], thiz.line6);
      thiz.lineBO = common.scaleLine([thiz.PointB.position.x, thiz.PointB.position.y, 3],
        [thiz.PointO.position.x, thiz.PointO.position.y, 3], thiz.line4);
      thiz.xuanz();
      thiz.thrzy.rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3]);
      thiz.fourzy.rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
        [thiz.PointB.position.x, thiz.PointB.position.y, 3]);
      if (thiz.isSecond === false) {
        thiz.triangleArr[2].position.set(thiz.PointB.position.x, thiz.PointB.position.y, 3);
        thiz.triangleArr[2].rotation.z = thiz.calcTriangleRotate([thiz.PointO.position.x, thiz.PointO.position.y, 3],
          [thiz.PointB.position.x, thiz.PointB.position.y, 3]);
      } else if (thiz.isSecond === true) {
        thiz.triangleArr[2].position.set(thiz.PointO.position.x, thiz.PointO.position.y, 3);
        thiz.triangleArr[2].rotation.z = thiz.calcTriangleRotate([thiz.PointB.position.x, thiz.PointB.position.y, 3],
          [thiz.PointO.position.x, thiz.PointO.position.y, 3]);
      }
    }
  }
  //线段动态连接方法
  animationO() {
      Promise.all([
        common.lineAni([this.PointO.position.x, this.PointO.position.y, 3],
          [this.PointA.position.x, this.PointA.position.y, 3], this.lineOA, this.triangleArr[0]),
        common.lineAni([this.PointO.position.x, this.PointO.position.y, 3],
          [this.PointP.position.x, this.PointP.position.y, 3], this.lineOP, this.triangleArr[1]),
        common.lineAni([this.PointB.position.x, this.PointB.position.y, 3],
          [this.PointO.position.x, this.PointO.position.y, 3], this.lineBO, this.triangleArr[2]),
      ]).then(() => {
      });
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
