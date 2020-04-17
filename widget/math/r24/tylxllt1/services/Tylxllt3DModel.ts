import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { ArcHelper } from './ArcHelper';
import { Line } from '../../../../../src/three/component/Line';
import * as point from '../sub_static/point.png';

export class Tylxllt3DModel extends ThreeBase {

  private controls: any;
  ellipse: any;
  line: any;
  arcHelper: any;
  a = 46;
  b = 35;
  c = Math.sqrt(Math.pow(this.a, 2) - Math.pow(this.b, 2));
  dragPointM: any;
  lineMF1: any;
  lineMF2: any;
  lineQO: any;
  lineNO: any;

  private render = () => {
    requestAnimationFrame( this.render );
    this.renderer.render( this.scene, this.camera );
  }

  /**
   *
   * @param {Element} domElement   渲染element
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov     = !fov    ? this.fov       : fov;
    this.near    = !near   ? this.near      : near;
    this.far     = !far    ? this.far       : fov;
    this.width   = !width  ? window.innerWidth     : width;
    this.height  = !height ? window.innerHeight    : height;
    this.domElement = domElement;
    this.init();

  }
  init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.initControl();
    this.arcHelper = new ArcHelper();
    this.line = new Line();
    this.initAxis();
    this.initEllipse();
    this.initCircleLine();
    this.addDragPointM();
    this.bindDragEvent();
    this.addVerticalLine();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
  }

  /**
   *
   * 初始化场景
   */
  initScene(): void {
    this.scene = new THREE.Scene();
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near    = 0.1;
    const far     = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0,  0,  0));
    this.camera.position.set(0,  0,  300);
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if ( this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1 );
    this.renderer.setSize(this.width , this.height);
    this.domElement.appendChild(this.renderer.domElement);

  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }

  /**
   * 初始化光源
   */
  initLight(): void {

  }

  //创建坐标轴
  initAxis() {
      const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']} as any);
      this.scene.add(axis);
  }

  //绘制椭圆
  initEllipse() {
      const curve = new THREE.EllipseCurve(
        0,  0,
        this.a, this.b,
        0,   2 * Math.PI,
        true,
        0
      );
      const path = new THREE.Path( curve.getPoints(3000));
      const geometry = path.createPointsGeometry(3000);
      this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, '#FF6666');
      this.scene.add(this.ellipse);

      //绘制F1， F2
      const f1Text = ThreeUtil.createNewRomanText('F', -this.c - 5, 10, 0, '#000', 0.15);
      const oneText = ThreeUtil.createNormalText('₁', 20, -5, 0, '#000', 1);
      f1Text.add(oneText);
      this.scene.add(f1Text);

      const f2Text = ThreeUtil.createNewRomanText('F', this.c + 5, 10, 0, '#000', 0.15);
      const twoText = ThreeUtil.createNormalText('₂', 20, -5, 0, '#000', 1);
      f2Text.add(twoText);
      this.scene.add(f2Text);
  }

  //绘制虚线圆
  initCircleLine() {
      const circle = this.arcHelper.addEllipseLine(this.c, '#000', 2, 1, 0, Math.PI * 2, false);
      this.scene.add(circle);
  }

  //添加拖动点M
  addDragPointM() {
      this.dragPointM = ThreeUtil.createImg(14, 14, point);
      const textM = ThreeUtil.createNewRomanText('M', 10, 5, 0, '#000', 0.15);
      this.dragPointM.add(textM);
      this.dragPointM.position.set(25, Math.sqrt((Math.pow(this.c, 2) - Math.pow(25, 2))), 1);
      this.scene.add(this.dragPointM);
      this.lineMF1 = this.addSegment(-this.c, this.dragPointM);
      this.lineMF2 = this.addSegment(this.c, this.dragPointM);
      this.scene.add(this.lineMF1);
      this.scene.add(this.lineMF2);
  }

  //添加拖动时间并限制范围
  bindDragEvent() {
    const dragControls = new dragcontrols([this.dragPointM], this.camera, this.renderer.domElement);
    dragControls.addEventListener('drag', () => {
      //限定M点拖动轨迹
      this.dragPointM.position.x = this.dragPointM.position.x <= this.c ? this.dragPointM.position.x : this.c;
      this.dragPointM.position.x = this.dragPointM.position.x >= -this.c ? this.dragPointM.position.x : -this.c;
      if (this.dragPointM.position.y >= 0) {
          this.dragPointM.position.y = Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.dragPointM.position.x, 2)));
      } else {
          this.dragPointM.position.y = -Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.dragPointM.position.x, 2)));
      }
      this.deleteSegment(this.lineMF1);
      this.deleteSegment(this.lineMF2);
      this.lineMF1 = this.addSegment(-this.c, this.dragPointM);
      this.lineMF2 = this.addSegment(this.c, this.dragPointM);
      this.scene.add(this.lineMF1);
      this.scene.add(this.lineMF2);
      this.addVerticalLine();
    });
  }

  //绘制MF1、MF2线段
  addSegment(num: number, movePoint: any) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(num, 0, 0),
      endPoint: new THREE.Vector3(movePoint.position.x, movePoint.position.y, movePoint.position.z),
      color: '#0091FF',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });
    return line;
  }

  //绘制直角符号
  addVerticalLine() {
      if (this.dragPointM.position.x === -this.c || this.dragPointM.position.x === this.c) {
          this.deleteSegment(this.lineQO);
          this.deleteSegment(this.lineNO);
          return ;
      } else {
        //MF1的斜率
        const slopeMF1 = (this.dragPointM.position.y - 0) /
          (this.dragPointM.position.x + this.c);
        //直线MF1的方程 y = k1 * ( x + c );
        //去MF1线上近M点一点Q
        const qX = this.dragPointM.position.x - (5 / Math.sqrt((Math.pow(slopeMF1, 2) + 1)));
        const qY = this.dragPointM.position.y - ((5 * slopeMF1) / Math.sqrt((Math.pow(slopeMF1, 2) + 1)));

        //MF2的斜率
        const slopeMF2 = (this.dragPointM.position.y - 0) /
          (this.dragPointM.position.x - this.c);
        //直线MF2的方程 y = k2 * ( x - c );
        //去MF1线上近M点一点N
        const nX = this.dragPointM.position.x + (5 / Math.sqrt((Math.pow(slopeMF2, 2) + 1)));
        const nY = this.dragPointM.position.y + ((5 * slopeMF2) / Math.sqrt((Math.pow(slopeMF2, 2) + 1)));

        //则过Q点做直线与MF2平行,该直线的直线方程为 y - qY = k2 * (x - qX)
        //则过N点做直线与MF1平行,该直线的直线方程为 y - nY = k1 * (x - nX)
        //该两直线交点为：O 则：
        const oX = (slopeMF1 * nX + qY - nY - slopeMF2 * qX) / (slopeMF1 - slopeMF2);
        const oY = slopeMF2 * (oX - qX) + qY;

        if (this.lineQO) {
            this.deleteSegment(this.lineQO);
        }
        this.lineQO = this.line.createLine({
          startPoint: new THREE.Vector3(qX, qY, 0),
          endPoint: new THREE.Vector3(oX, oY, 0),
          color: '#0091FF',
          dashLine: false,
          lineWidth: 1000,
          lineWidthScale: 1 / 500
        });

        if (this.lineNO) {
          this.deleteSegment(this.lineNO);
        }
        this.lineNO = this.line.createLine({
          startPoint: new THREE.Vector3(nX, nY, 0),
          endPoint: new THREE.Vector3(oX, oY, 0),
          color: '#0091FF',
          dashLine: false,
          lineWidth: 1000,
          lineWidthScale: 1 / 500
        });

        this.scene.add(this.lineQO);
        this.scene.add(this.lineNO);
      }
  }

  //删除线段
  deleteSegment(obj: any) {
    if (obj) {
      obj.geometry.dispose();
      obj.material.dispose();
      this.scene.remove(obj);
    }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

}
