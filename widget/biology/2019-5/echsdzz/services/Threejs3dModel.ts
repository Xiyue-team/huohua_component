import * as THREE from 'three';
import { Mesh, PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { CurveLine } from '../../../../../src/three/component/CurveLine';
import { Line } from '../../../../../src/three/component/Line';

const OrbitControls = require('three-orbitControls');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

  private controls: any;

  private dashLine: any;


  private functionLine1: any;
  private functionLine2: any;
  private axisLine: any;

  private group: THREE.Group;
  private dashLine1: any;
  private dashLine2: any;
  private dashLine3: any;
  private dashLine4: any;

  private auxiliaryLine1: any;
  private auxiliaryLine3: any;
  private rotateAnimation: any[] = [];

  private aText: any;
  private a1Text: any;
  private coordinate: any;

  private selectValue = 1;
  private point: THREE.Mesh;
  private otherPoint: THREE.Mesh;

  private pointX: any;
  private otherPointX: any;

  private param: number;
  private minValue: number;
  private maxValue: number;
  private axisValue: number;

  private offset1: number;
  private offset2: number;

  private dragControl1: any;
  private dragControl2: any;

  private ax1: any;
  private n: any


  private render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

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
    console.log('init Simple3DModel constructor');
    this.init();

  }
  init() {
    this.param = -1 * 4;
    this.axisValue = 1;
    this.minValue = -4;
    this.maxValue = 6;
    this.offset1 = 1;
    this.offset2 = 1;
    this.dashLine = new Line();
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    this.createAxis();
    this.createFunctionLine();
    this.createPoint();
    this.drawDashLine();
    this.render();


  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2d2d2d);
  }


  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 50);
  }


  //重置摄像机位置
  resetCamera() {
    this.controls.reset();
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxAzimuthAngle = 0;
    this.controls.minAzimuthAngle = 0;
  }


  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  //创建函数线
  createFunctionLine() {
    this.group = new THREE.Group();
    const color = '#18A2FF';
    const dashColor = '#FFD621';
    const curveHelper = new CurveLine();
    const linePoint: THREE.Vector2[] = [];
    const linePoint1: THREE.Vector2[] = [];
    const dashLine1: THREE.Vector2[] = [];

    //对称轴取点
    for (let i = -50; i <= 50; i += 0.01) {
      linePoint.push(new THREE.Vector2(1 * 0.4, i * 0.4));
    }

    //曲线函数取点
    for (let i = this.minValue; i <= this.maxValue; i += 0.01) {
      const formula = 2 * Math.pow(i, 2) + (this.param * i) + 1;
      linePoint1.push(new THREE.Vector2(i * 0.4, formula * 0.4));
    }

    this.functionLine2 = curveHelper.createCurveLine({ pointList: linePoint1, color: color, lineWidth: 0.2, style: 2 });
    this.axisLine = curveHelper.createCurveLine({ pointList: linePoint, color: dashColor, lineWidth: 0.2, style: 2 });
    console.log(this.axisLine.position.z, this.camera.position.z)

    // this.scene.add(this.functionLine2, this.axisLine);
  }

  //创建拖动点并绑定拖动事件
  createPoint() {
    const radius = (window as any)['env'].browserInfo.isSmallDevice ? 1.5 : 1.5;

    this.point = ThreeUtil.createPoint(radius, '#ffffff', 2,
      (2 * Math.pow(5, 2) + (this.param * 5) + 1) * 0.4,
      0.0001);
    const point1 = ThreeUtil.createPoint(0.6, '#ffffff', 0, 0, 0.36);
    const smallPoint = ThreeUtil.createPoint(0.3, '#FF5A5A', 0, 0, 1);

    this.otherPoint = ThreeUtil.createPoint(radius, '#ffffff', -1,
      (2 * Math.pow((-1 / 4 * 10), 2) + (this.param * (-1 / 4 * 10)) + 1) * 0.4,
      0.0001);
    const otherPoint1 = ThreeUtil.createPoint(0.6, '#ffffff', 0, 0, 0.36);
    const smallOtherPoint = ThreeUtil.createPoint(0.3, '#9BF23B', 0, 0, 1);

    point1.add(smallPoint);
    this.point.add(point1);
    this.point.position.z = 1;
    this.pointX = this.point.position.x;
    this.otherPointX = this.otherPoint.position.x;

    otherPoint1.add(smallOtherPoint);
    this.otherPoint.add(otherPoint1);

    this.initPointControl();
    this.scene.add(this.point);
    this.scene.add(this.otherPoint);
  }

  initPointControl() {
    this.dragControl1 = new dragcontrols([this.point], this.camera, this.renderer.domElement);
    this.dragControl1.addEventListener('dragstart', (event: any) => {
      this.controls.enabled = false;
      this.offset1 = (window as any).viewHandler.viewModel.sliderNum2;
    });

    this.dragControl1.addEventListener('drag', (event: any) => {
      let positionX = this.point.position.x / 0.4;

      if (positionX > this.maxValue) {
        this.point.position.x = (this.maxValue * 0.4);
        positionX = this.maxValue;
      } else if (positionX < this.minValue) {
        this.point.position.x = (this.minValue * 0.4);
        positionX = this.minValue;
      }
      this.pointX = this.point.position.x;
      this.point.position.y = (2 * Math.pow(positionX, 2) + (this.param * positionX) + 1) * 0.4;

      this.removeAuxiliary();
      this.drawDashLine();
    });
    this.dragControl1.addEventListener('dragend', (event: any) => { this.controls.enabled = true; });

    this.dragControl2 = new dragcontrols([this.otherPoint], this.camera, this.renderer.domElement);
    this.dragControl2.addEventListener('dragstart', (event: any) => {
      this.controls.enabled = false;
      this.offset2 = (window as any).viewHandler.viewModel.sliderNum2;
    });

    this.dragControl2.addEventListener('drag', (event: any) => {
      let positionX = this.otherPoint.position.x / 0.4;

      if (positionX > this.maxValue) {
        this.otherPoint.position.x = (this.maxValue * 0.4);
        positionX = this.maxValue;
      } else if (positionX < this.minValue) {
        this.otherPoint.position.x = (this.minValue * 0.4);
        positionX = this.minValue;
      }
      this.otherPointX = this.otherPoint.position.x;
      this.otherPoint.position.y = (2 * Math.pow(positionX, 2) + (this.param * positionX) + 1) * 0.4;
      this.removeAuxiliary();
      this.drawDashLine();
    });
    this.dragControl2.addEventListener('dragend', (event: any) => { this.controls.enabled = true; });
  }

  //绘制辅助虚线
  drawDashLine() {
    const color = '#ffffff';
    this.auxiliaryLine1 = this.dashLine.createLine({
      startPoint: new THREE.Vector3(this.point.position.x, this.point.position.y, 0),
      endPoint: new THREE.Vector3(this.point.position.x, 0, 0),
      color: color,
      dashLine: true,
      lineWidth: 200
    });
    this.n = this.point.position.x
    console.log(this.auxiliaryLine1.position.x)
    this.auxiliaryLine3 = this.dashLine.createLine({
      startPoint: new THREE.Vector3(this.otherPoint.position.x, this.otherPoint.position.y, 0),
      endPoint: new THREE.Vector3(this.otherPoint.position.x, 0, 0),
      color: color,
      dashLine: true,
      lineWidth: 200
    });

    const text1 = ThreeUtil.createNewRomanText('x₂', this.point.position.x, 0, 0, '#ffffff', 0.03);
    const text2 = ThreeUtil.createNewRomanText('x₁', this.otherPoint.position.x, 0, 0, '#ffffff', 0.03);
    this.auxiliaryLine1.add(text1);
    this.auxiliaryLine3.add(text2);


    this.scene.add(this.auxiliaryLine1);
    this.scene.add(this.auxiliaryLine3);
  }

  //删除线的方法
  removeLine(obj: THREE.Mesh) {
    this.scene.remove(obj);
    obj.geometry.dispose();
    (obj.material as any).dispose();
  }

  //删除所有辅助线的方法
  removeAuxiliary() {
    this.removeLine(this.auxiliaryLine1);
    this.removeLine(this.auxiliaryLine3);
  }

  //删除函数线和坐标轴
  removeFunctionLine() {
    this.removeLine(this.functionLine2);
    this.removeLine(this.axisLine);
  }

  //创建坐标轴
  createAxis() {
    this.ax1 = AxisUtil.createAxis({
      width: 40,
      height: 40,
      isTicks: false,
      axisColor: '#ffffff',
      fontColor: '#ffffff',
      axisOpacity: 0.32
    } as any)
    this.controls.addEventListener('change', () => {
      this.ax1.position.z = this.camera.position.z - 50
      this.auxiliaryLine1.position.x = (50 / this.camera.position.z) * this.n - this.n
      this.auxiliaryLine1.position.z = this.camera.position.z - 50
      console.log((50 / this.camera.position.z) * this.n)
    })
    this.scene.add(this.ax1
    );
  }

  reset() {

  }

  changePointPosition(value: number) {
    const pointPosX = this.pointX + (value - 1) * 0.4;
    const pointPosY = (2 * Math.pow((pointPosX / 0.4), 2) + (this.param * (pointPosX / 0.4)) + 1) * 0.4;
    this.point.position.set(pointPosX, pointPosY, 0);
    this.removeAuxiliary();
    this.drawDashLine();
  }

  changAxisLinePosition(value: number) {

    this.minValue = -4 + (value - 1);
    this.maxValue = 6 + (value - 1);
    this.param = -(window as any).viewHandler.viewModel.sliderNum2 * 4;

    this.removeFunctionLine();
    this.createFunctionLine();
    this.axisLine.position.set((value - 1) * 0.4, 0, 0);

    const pointPosX = this.pointX + (value - this.offset1) * 0.4;
    const otherPointPosX = this.otherPointX + (value - this.offset2) * 0.4;

    const pointPosY = (2 * Math.pow((pointPosX / 0.4), 2) + (this.param * (pointPosX / 0.4)) + 1) * 0.4;
    const otherPointPosY = (2 * Math.pow((otherPointPosX / 0.4), 2) + (this.param * (otherPointPosX / 0.4)) + 1) * 0.4;

    this.point.position.set(pointPosX, pointPosY, 0);
    this.otherPoint.position.set(otherPointPosX, otherPointPosY, 0);

    this.removeAuxiliary();
    this.drawDashLine();

  }

  setDragControlEnabled(enable: boolean) {
    this.dragControl1.enabled = enable;
    this.dragControl2.enabled = enable;
  }

  setPointColor(enable: boolean) {
    if (enable) {

    } else {

    }
    console.log(this.point);
  }



}




