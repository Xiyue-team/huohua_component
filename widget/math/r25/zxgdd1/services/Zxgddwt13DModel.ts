import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { MathConst } from '../../../../../src/config/MathConst';

export class Zxgddwt13DModel extends ThreeBase {

  private controls: any;
  private line: any;
  public rotatePoint: any = [];
  public pPoint: any = [];

  public group1 = new THREE.Group();
  public group2 = new THREE.Group();
  public group3 = new THREE.Group();

  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
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
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.init();

  }

  init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.initControl();
    this.line = new Line();
    this.initAxis();
    this.initRotateLineOne();
    this.initRotateLineTwo();
    this.initRotateLineThree();

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
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 300);
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
    (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1);

    this.renderer.setSize(this.width, this.height);
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

  initAxis() {
      const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']} as any);
      this.scene.add(axis);
  }

  //解法一
  initRotateLineOne() {
    const lText = ThreeUtil.createNewRomanText('l', -110, 0, 0, MathConst.lineColor_Blue, 0.15);
    const rotLine = this.createLine(-100, 100, MathConst.lineColor_Blue);
    this.rotatePoint[0] = ThreeUtil.createPoint(0.1, MathConst.lineColor_Blue, 30, 10, 1);
    this.rotatePoint[0].add(rotLine);
    this.rotatePoint[0].add(lText);
    this.rotatePoint[0].rotation.z = Math.atan(-(2 * (-0.7) + 1) / ((-0.7) + 1));
    this.group1.add(this.rotatePoint[0]);

    this.pPoint[0] = ThreeUtil.createPoint(2, '#FF8715', 30, 10, 1);
    const pText = ThreeUtil.createNewRomanText('P', -5, 10, 0, '#000000', 0.15);
    const coordText = ThreeUtil.createNormalText('(3,1)', 15, 3, 0, '#FF8715', 0.15);
    this.pPoint[0].add(pText);
    this.pPoint[0].add(coordText);
    this.pPoint[0].visible = false;
    this.group1.add(this.pPoint[0]);
    this.scene.add(this.group1);
  }

//解法二
  initRotateLineTwo() {
    const lText = ThreeUtil.createNewRomanText('l', -110, 0, 0, MathConst.lineColor_Blue, 0.15);
    const rotLine = this.createLine(-100, 100, MathConst.lineColor_Blue);
    this.rotatePoint[1] = ThreeUtil.createPoint(0.1, MathConst.lineColor_Blue, 90, -40, 1);
    this.rotatePoint[1].add(rotLine);
    this.rotatePoint[1].add(lText);
    this.rotatePoint[1].rotation.z = Math.atan(-((-0.1) - 1) / (2 * (-0.1) - 1));
    this.group2.add(this.rotatePoint[1]);

    this.pPoint[1] = ThreeUtil.createPoint(2, '#FF8715', 90, -40, 1);
    const coordText = ThreeUtil.createNormalText('(9,-4)', 15, 3, 0, '#FF8715', 0.15);
    this.pPoint[1].add(coordText);
    this.pPoint[1].visible = false;
    this.group2.add(this.pPoint[1]);
    this.group2.visible = false;
    this.scene.add(this.group2);
  }

  //解法三
  initRotateLineThree() {
    const rotLine = this.createLine(-100, 100, MathConst.lineColor_Blue);
    this.rotatePoint[2] = ThreeUtil.createPoint(0.1, MathConst.lineColor_Blue, -10, 20, 1);
    this.rotatePoint[2].add(rotLine);
    this.rotatePoint[2].rotation.z = Math.atan(-((-0.1) + 3) / (1 - 2 * (-0.1)));
    this.group3.add(this.rotatePoint[2]);

    this.pPoint[2] = ThreeUtil.createPoint(2, '#FF8715', -10, 20, 1);
    const pText = ThreeUtil.createNewRomanText('A', 5, 10, 0, '#000000', 0.15);
    const coordText = ThreeUtil.createNormalText('(-1,2)', -15, 3, 0, '#FF8715', 0.15);
    this.pPoint[2].add(pText);
    this.pPoint[2].add(coordText);
    this.pPoint[2].visible = false;
    this.group3.add(this.pPoint[2]);
    this.group3.visible = false;
    this.scene.add(this.group3);
  }

  //创建直线
  createLine(x1: number, x2: number, color: string) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, 0, 0),
      endPoint: new THREE.Vector3( x2, 0, 0),
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      color: color
    });
    return line;
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

}
