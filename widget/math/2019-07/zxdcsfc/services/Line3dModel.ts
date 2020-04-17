import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OrbitControls = require('three-orbitcontrols');
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { SliderControlLine } from './SliderControlLine';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
import * as pointMoTextImg from '../sub_static/UI/2.png';
import * as pointMTextImg from '../sub_static/UI/3.png';

let thiz: any = null;
OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
  private ow: any;
  private orbit: any;
  private sliderControlLine: SliderControlLine;
  //添加移动的直线
  private line = common.drawUnitLine({ width: 0.6, color: '#10A3FF', isDash: false });
  private completeLine = common.scaleLine([-200, -381.04, 0], [240, 381.04, 0], this.line);
  //定义一个组放直线和点
  private lineGroup = new THREE.Group();
  // 添加移动直线上的点Mo
  private ctrlLinePoint = common.createImg([40, 34.64, 0], 10, 10, pointImg);
  //定义点M0文字图片
  private ctrlTextMo = common.createImg([63, 28, 0], 41, 8, pointMoTextImg);
  // 添加移动直线上的点M
  private ctrlLinePoint2 = common.createImg([52.5, 56.29, 0], 10, 10, pointImg);
  private ctrlTextM = common.createImg([75, 53, 0], 33.67, 8, pointMTextImg);
  // 定义直角
  private rightAngle = common.drawRightAngle(3, { color: '#A0E758' });
  // 定义辅助线
  private subline1 = common.drawUnitLine({
    color: '#979797',
    isDash: true
  });
  private subline2 = common.drawUnitLine({
    color: '#979797',
    isDash: true
  });
  // 定义辅助线组
  private sublineGroup = new THREE.Group();
  private pointMoPos = { x: 40, y: 34.64 };
  private pointMPos = { x: 52.5, y: 56.29 };
  //创建直线的三角面箭头
  private triangleArr = common.drawTriangle({ color: '#FF5A5A' });
  //创建向量箭头的直线
  private line_arrow = common.drawUnitLine({
    color: '#FF5A5A',
    isDash: false
  });
  //创建一个组用来放向量箭头、虚线、直角等等
  private bigGroup = new THREE.Group();
  private triangleGroup = new THREE.Group();
  private Line_arrow: any;
  private Ax: any;
  angle: number;
  private angleB: any;
  private count = 0;
  private controls: any;
  private pointA : any;
  private pointB : any;
  private  coverMesh : any;
  browserInfo: BrowserInfo;
  private render = () => {
    requestAnimationFrame(this.render);
    if (this.count !== 0) {
      this.count = ++this.count % 3;
      return;
    } else {
      this.count = ++this.count % 3;
    }
    this.renderer.render(this.scene, this.camera);
  };

  /**
   *
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
    this.init();
  }

  init(): void {
    thiz = this;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.createAxis();
    this.render();
    this.ow = (window as any).viewHandler.viewModel.$data;
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.tbctrl();
    this.initEvt();
    this.initial();
    this.drawAngle(60);
    this.initModel();
    this.initElement(this.controls);
    console.warn = function() {
    };
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#282828');
    this.scene.position.x = -60;
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
  resetCamera(): void {
    this.controls.reset();
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
    (this.renderer as WebGLRenderer).sortObjects = false;
  }

  /**
   * 初始化控制器
   * 使用该控制器需要在render中调用update方法
   */
  tbctrl() {
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.saveState();
    this.orbit.enableRotate = false;
    this.orbit.enableZoom = true;
    this.orbit.enableDamping = true;
    this.orbit.enableZoom = true;
    this.orbit.minDistance = 270;
    this.orbit.maxDistance = 1500;
    this.orbit.enablePan = false;
  }

  // 初始化场景内元素
  initElement(controls: any) {
    this.ctrlLinePoint.name = 'NAME_POINT';
    this.ctrlLinePoint2.name = 'NAME_POINT2';
    // 带颜色的线条添加到场景中去
    this.scene.add(this.completeLine);
    //直线上的移动点Mo,M添加到场景中去
    this.scene.add(this.ctrlLinePoint);
    //把Mo文字添加到场景
    this.scene.add(this.ctrlTextMo);
    //把M点及文字添加到场景
    this.scene.add(this.ctrlLinePoint2, this.ctrlTextM);
    //把辅助线组添加到场景中去
    this.sublineGroup.add(this.rightAngle, this.subline1, this.subline2);
    this.scene.add(this.sublineGroup);
    //把箭头和线添加到场景
    this.triangleGroup.add(this.line_arrow, this.triangleArr);
    this.scene.add(this.triangleGroup);
    // this.scene.position.set(-60, 0, 0);
  }

  //创建一个坐标系
  createAxis() {
    this.Ax = AxisUtil.createAxis({
      isTicks: true,
      axisColor: '#808080',
      fontColor: '#808080',
      AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
      AxisYNumArray: ['1', '', '', '', '5','', '', '', '', '10'],
    } as any);
    this.Ax.position.z = -0.05;
    this.Ax.position.y = 0;
    this.scene.add(this.Ax);
  }

  // 初始化点击的圆
  initEvt() {
    this.sliderControlLine = new SliderControlLine(
      [this.ctrlLinePoint, this.ctrlLinePoint2]).initEvent(this.camera, this.renderer);
  }

  // 初始化的时候让元素的隐藏状态及坐标位置
  initial() {
    this.subline1.visible = this.subline2.visible = this.rightAngle.visible = false;
    this.triangleGroup.visible = false;
    this.ctrlLinePoint2.visible = this.ctrlTextM.visible = false;
    this.line_arrow.visible = this.triangleArr.visible = false;
    this.completeLine.position.set(20, 0, 0);

  }

  // 获取拖动点坐标（鼠标按下的瞬间）
  static downHandle(name: string) {
  }

  //移动动点位置（按下不松鼠标后移动）
  static moveHandle(pos: any, name: string): void {
    // if (pos) {
    //   // pos.x = pos.x < 75? pos.x < -75 ? -75 : pos.x : 75;
    //   // pos.y = pos.y < 90 ? pos.y < -90 ? -90 : pos.y : 90;
    // }
    if (name === 'NAME_POINT') {
      if (thiz.ow.value == 0) {
        thiz.stopDrag(1);
        return;
      }
      pos.x = pos.x < 50 ? pos.x < -50 ? -50 : pos.x : 50;
      pos.y = pos.y < 50 ? pos.y < -50 ? -50 : pos.y : 50;
      const deg = (thiz.ow.value) * (Math.PI / 180);
      const { x, y } = pos;
      const zx = (Math.tan(deg) * x - y) / Math.tan(deg);
      thiz.ctrlLinePoint.position.set(x, Math.tan(deg) * (x - zx), 0);
      if (zx >= -80 && zx <= 80) {
        thiz.completeLine.position.set(zx, 0, 0);
        thiz.angleB.position.set(zx, 0, 0);
      } else {
        if (zx > 0) {
          thiz.completeLine.position.set(80, 0, 0);
          thiz.angleB.position.set(80, 0, 0);
          thiz.ctrlLinePoint.position.set(x, Math.tan(deg) * (x - 80), 0);
        }
        if (zx < 0) {
          thiz.completeLine.position.set(-80, 0, 0);
          thiz.angleB.position.set(-80, 0, 0);
          thiz.ctrlLinePoint.position.set(x, Math.tan(deg) * (x + 80), 0);
        }
      }
      thiz.ctrlTextMo.position.set(thiz.ctrlLinePoint.position.x + 23, thiz.ctrlLinePoint.position.y - 6.64, 0);
      //M点的位置
      const Mx = thiz.ctrlLinePoint.position.x + (thiz.ow.length3) * Math.cos(deg);
      const My = thiz.ctrlLinePoint.position.y + (thiz.ow.length3) * Math.sin(deg);
      thiz.ctrlLinePoint2.position.set(Mx, My, 0);
      thiz.ctrlTextM.position.set(thiz.ctrlLinePoint2.position.x + 22.5, thiz.ctrlLinePoint2.position.y - 3.29, 0);
      if (thiz.ow.ishave) {
        thiz.subline1.position.set((thiz.ctrlLinePoint.position.x + Mx) / 2, thiz.ctrlLinePoint.position.y, 0);
        thiz.subline2.position.set(Mx, (thiz.ctrlLinePoint.position.y + My) / 2, 0);
        thiz.rightAngle.position.set(Mx, thiz.ctrlLinePoint.position.y, 0);
        thiz.line_arrow.position.set((thiz.ctrlLinePoint.position.x + Mx) / 2, (thiz.ctrlLinePoint.position.y + My) / 2, 0);
        thiz.triangleArr.position.set(Mx, My, 0);
      }
    }
    if (name === 'NAME_POINT2') {
      if (thiz.ow.value == 0) {
        thiz.stopDrag(2);
        return;
      }
      const { x, y } = pos;
      const deg = (thiz.ow.value) * (Math.PI / 180);
      const x0 = thiz.ctrlLinePoint.position.x;
      const y0 = thiz.ctrlLinePoint.position.y;

      if (x >= -100 && x <= 100 && y >= -100 && y <= 100) {
        const yz = Math.tan(deg) * x - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(x, yz, 0);
        thiz.ctrlTextM.position.set(x + 22.5, yz - 3.29, 1);
      } else if (x > 100) {
        const yz = Math.tan(deg) * 100 - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(100, yz, 0);
        thiz.ctrlTextM.position.set(100 + 22.5, yz - 3.29, 1);
      } else if (x < -100) {
        const yz = Math.tan(deg) * (-100) - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(-100, yz, 0);
        thiz.ctrlTextM.position.set(-100 + 22.5, yz - 3.29, 1);
      } else if (y > 100) {
        const xz = (100 - y0 + Math.tan(deg) * x0) / Math.tan(deg);
        thiz.ctrlLinePoint2.position.set(xz, 100, 0);
        thiz.ctrlTextM.position.set(xz + 22.5, 100 - 3.29, 1);
      } else if (y < -100) {
        const xz = (-100 - y0 + Math.tan(deg) * x0) / Math.tan(deg);
        thiz.ctrlLinePoint2.position.set(xz, -100, 0);
        thiz.ctrlTextM.position.set(xz + 22.5, -100 - 3.29, 1);
      }
      thiz.drawSubline();
      thiz.connectOuterAni();
    }
  }

  //鼠标按下(松开结束)
  static MouseUp(pos: any, name: any) {
    if (name === 'NAME_POINT') {
      if (thiz.ow.value == 0) {
        return;
      }
      const { x, y } = pos;
      const deg = (thiz.ow.value) * (Math.PI / 180);
      // const x0 = (Math.tan(deg) * x - y) / Math.tan(deg);
      // thiz.completeLine.position.set(x0, 0, 0);
      thiz.ow.length = y / Math.sin(deg);
    }
    if (name === 'NAME_POINT2') {
      if (thiz.ow.value == 0) {
        return;
      }
      const { x, y } = pos;
      const deg = (thiz.ow.value) * (Math.PI / 180);
      const x0 = thiz.ctrlLinePoint.position.x;
      const y0 = thiz.ctrlLinePoint.position.y;
      if (x >= -100 && x <= 100 && y >= -100 && y <= 100) {
        const yz = Math.tan(deg) * x - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(x, yz, 0);
        thiz.ctrlTextM.position.set(x + 22.5, yz - 3.29, 1);
      } else if (x > 100) {
        const yz = Math.tan(deg) * 100 - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(100, yz, 0);
        thiz.ctrlTextM.position.set(100 + 22.5, yz - 3.29, 1);
      } else if (x < -100) {
        const yz = Math.tan(deg) * (-100) - Math.tan(deg) * x0 + y0;
        thiz.ctrlLinePoint2.position.set(-100, yz, 0);
        thiz.ctrlTextM.position.set(-100 + 22.5, yz - 3.29, 1);
      } else if (y > 100) {
        const xz = (100 - y0 + Math.tan(deg) * x0) / Math.tan(deg);
        thiz.ctrlLinePoint2.position.set(xz, 100, 0);
        thiz.ctrlTextM.position.set(xz + 22.5, 100 - 3.29, 1);
      } else if (y < -100) {
        const xz = (-100 - y0 + Math.tan(deg) * x0) / Math.tan(deg);
        thiz.ctrlLinePoint2.position.set(xz, -100, 0);
        thiz.ctrlTextM.position.set(xz + 22.5, -100 - 3.29, 1);
      }

      thiz.ow.length2 = thiz.ctrlLinePoint2.position.y / Math.sin(deg);
      thiz.ow.length3 = thiz.ctrlLinePoint2.position.y / Math.sin(deg) - thiz.ow.length;
      thiz.drawSubline();
      thiz.connectOuterAni();
    }
  }

  //画线且进行缩放函数
  drawLine(pos: any, num: number) {
    if (num === 1) {
    }
    if (num === 2) {
    }
  }

  //设置挡住的区域
  initModel() {
    const geometry = new THREE.RingBufferGeometry(this.width, 160, 4, 1, 3.925);
    const material = new THREE.MeshBasicMaterial({ color: '#282828', side: THREE.DoubleSide, transparent: true });
    this.coverMesh = new THREE.Mesh(geometry, material);
    this.coverMesh.position.set(6, 5, 2);
    this.orbit.addEventListener( 'change',()=>{
      this.coverMesh.position.set(6, 5, this.camera.position.z-268);
    });
    this.scene.add(this.coverMesh);
  }


  // 画角度标识函数
  drawAngle(angle: number) {
    this.scene.remove(this.angleB);
    this.angleB = common.drawAngle(0, angle >= 180 ? angle - 180 : angle,
      { color: '#FC5C5B', size: 5, zIndex: -1, text: 'a' });
    this.angleB.position.set(20, 0, 0);
    this.scene.add(this.angleB);
  }

  //拖动滑动条事件函数
  changeSlope(val: any) {
    const { x: x1, y: y1 } = this.completeLine.position;
    thiz.drawAngle(val);
    thiz.angleB.position.set(x1, 0, 0);
    const rad = val * (Math.PI / 180);
    thiz.completeLine.rotation.z = rad;
    const x = (thiz.ow.length) * Math.cos(rad) + x1;
    const y = (thiz.ow.length) * Math.sin(rad);
    thiz.ctrlLinePoint.position.set(x, y, 0);
    thiz.ctrlTextMo.position.set(thiz.ctrlLinePoint.position.x + 23, thiz.ctrlLinePoint.position.y - 6.64, 0);

    const x0 = x + (thiz.ow.length3) * Math.cos(rad);
    const y0 = y + (thiz.ow.length3) * Math.sin(rad);
    if (x0 <= 80) {
      thiz.ctrlLinePoint2.position.set(x0, y0, 0);
      thiz.ctrlTextM.position.set(thiz.ctrlLinePoint2.position.x + 22.5, thiz.ctrlLinePoint2.position.y - 3.29, 0);
    } else if (x0 > 80 && x0 < 118.5) {
      thiz.ctrlLinePoint2.position.set(x0, y0, 0);
      thiz.ctrlTextM.position.set(thiz.ctrlLinePoint2.position.x + 22.5, thiz.ctrlLinePoint2.position.y - 3.29, 1);
    } else {
      thiz.ctrlLinePoint2.position.set(x0, y0, 1);
      thiz.ctrlTextM.position.set(thiz.ctrlLinePoint2.position.x + 22.5, thiz.ctrlLinePoint2.position.y - 3.29, 1);
    }

    //处理线把扇形角度遮住（最后把线添加到场景）
    // this.scene.add(this.completeLine);
    //改变角度旋转的时候触发画虚线的函数
    thiz.drawSubline();
    //改变角度旋转的时候触发画向量箭头的函数
    thiz.connectOuterAni();
    if (val === 0) {
      this.pointA = this.ctrlLinePoint.position.x;
      this.pointB = this.ctrlLinePoint2.position.x;
      console.log( this.pointA, this.pointB);
    }
  }

  // 点击按钮事件函数
  clickButton() {
    if (this.ow.ishave) {
      this.subline1.visible = this.subline2.visible = this.rightAngle.visible = true;
      this.ctrlLinePoint2.visible = this.ctrlTextM.visible = true;
      this.line_arrow.visible = this.triangleArr.visible = true;
      this.drawSubline(); //画辅助虚线
      this.connectOuterAni(); //画动态向量箭头
    } else {
      this.subline1.visible = this.subline2.visible = this.rightAngle.visible = false;
      this.ctrlLinePoint2.visible = this.ctrlTextM.visible = false;
      this.line_arrow.visible = this.triangleArr.visible = false;
    }

  }

  //画虚线的函数
  drawSubline() {
    if (this.ow.value === 90 || this.ow.value === 0) {
      this.subline1.visible = this.subline2.visible = this.rightAngle.visible = false;
      return;
    } else {
      if (this.ow.ishave) {
        this.subline1.visible = this.subline2.visible = this.rightAngle.visible = true;
        const x0 = this.ctrlLinePoint.position.x;
        const y0 = this.ctrlLinePoint.position.y;
        const x = this.ctrlLinePoint2.position.x;
        const y = this.ctrlLinePoint2.position.y;
        // console.log(x,y);
        if (x > x0 && y > y0) {
          this.subline1 = common.scaleLine([this.ctrlLinePoint.position.x - 5, this.ctrlLinePoint.position.y, 0],
            [x + 5, y0, 0], this.subline1);
          this.subline2 = common.scaleLine([this.ctrlLinePoint2.position.x, this.ctrlLinePoint2.position.y + 5, 0],
            [x, y0 - 5, 0], this.subline2);
          this.rightAngle.position.set(x, y0, 0);
          this.rightAngle.rotation.z = Math.PI / 2;
        }
        if (x > x0 && y < y0) {
          this.subline1 = common.scaleLine([this.ctrlLinePoint.position.x - 5, this.ctrlLinePoint.position.y, 0],
            [x + 5, y0, 0], this.subline1);
          this.subline2 = common.scaleLine([this.ctrlLinePoint2.position.x, this.ctrlLinePoint2.position.y - 5, 0],
            [x, y0 + 5, 0], this.subline2);
          this.rightAngle.position.set(x, y0, 0);
          this.rightAngle.rotation.z = Math.PI;
        }
        if (x < x0 && y < y0) {
          this.subline1 = common.scaleLine([this.ctrlLinePoint.position.x + 5, this.ctrlLinePoint.position.y, 0],
            [x - 5, y0, 0], this.subline1);
          this.subline2 = common.scaleLine([this.ctrlLinePoint2.position.x, this.ctrlLinePoint2.position.y - 5, 0],
            [x, y0 + 5, 0], this.subline2);
          this.rightAngle.position.set(x, y0, 0);
          this.rightAngle.rotation.z = -Math.PI / 2;
        }
        if (x < x0 && y > y0) {
          this.subline1 = common.scaleLine([this.ctrlLinePoint.position.x + 5, this.ctrlLinePoint.position.y, 0],
            [x - 5, y0, 0], this.subline1);
          this.subline2 = common.scaleLine([this.ctrlLinePoint2.position.x, this.ctrlLinePoint2.position.y + 5, 0],
            [x, y0 - 5, 0], this.subline2);
          this.rightAngle.position.set(x, y0, 0);
          this.rightAngle.rotation.z = Math.PI * 2;
        }
      }
    }
  }

  //画箭头的方法
  connectOuterAni() {
    if (this.ow.ishave) {
      this.triangleGroup.visible = true;
      this.line_arrow = common.scaleLine(this.ctrlLinePoint.position, this.ctrlLinePoint2.position, this.line_arrow);
      Promise.all([
        common.lineAni([thiz.ctrlLinePoint.position.x, thiz.ctrlLinePoint.position.y, 1],
          [thiz.ctrlLinePoint2.position.x, thiz.ctrlLinePoint2.position.y, 1], thiz.line_arrow, this.triangleArr)
      ]).then(() => {
      });
    } else {
      this.triangleGroup.visible = false;
    }
  }


  //禁止拖动
  stopDrag(num: any) {
    if (num === 1) {
      this.ctrlLinePoint.position.set(this.pointA, 0, 1);
    }
    if (num === 2) {
      this.ctrlLinePoint2.position.set(this.pointB, 0, 1);
    }
  }


  resize(width: number, height: number): void {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  //重置事件
  reset(): void {
    thiz.ow.value = 60;
    thiz.ow.length = 40;
    thiz.ow.length2 = 65;
    thiz.ow.length3 = 25;
    thiz.ow.have = true;
    thiz.ow.ishave = false;
    this.angleB.position.set(20, 0, 0);
    this.ctrlLinePoint.position.set(40, 34.64, 0);
    this.ctrlTextMo.position.set(63, 28, 0);
    this.ctrlLinePoint2.position.set(52.5, 56.29, 0);
    this.ctrlTextM.position.set(75, 53, 0);
    this.completeLine.position.set(20, 0, 0);
    this.initial();
    // this.createAxis();
    // this.initCamera();
    this.coverMesh.position.set(6, 5, 2);
    this.camera.position.set(0, 0, 270);

  }
}




