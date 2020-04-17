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
import * as pAOneImg from '../sub_static/pAOne.png';
import * as qAOneImg from '../sub_static/qAOne.png';
import * as pATwoImg from '../sub_static/pAImg.png';
import * as pBTwoImg from '../sub_static/pBImg.png';
import * as defaultFormulaImg from '../sub_static/defaultFormula.png';
import * as pAThreeImg from '../sub_static/pATwo.png';
import * as pBThreeImg from '../sub_static/pBTwo.png';

export class Zxgddwt23DModel extends ThreeBase {

  private controls: any;
  private line: any;
  public rotatePoint: any = [];
  public pointOne: any = [];
  public pointTwo: any = [];
  public pointThree: any = [];
  public linePq: any;
  public lineAb: any;
  private orangeColor = '#FF8715';
  private pinkColor = '#F62EBB';
  public dashLineOnePA: any;
  public dashLineOneQA: any;
  public dashLineTwoPA: any;
  public dashLineTwoQA: any;
  public dashLineThreePA: any;
  public dashLineThreeQA: any;
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
    this.createSegementsAndTexts();
    this.createDashLines();

    this.initRotateLineTwo();
    this.createDahsLinesAndTexts();

    this.initRotateLineThree();
    this.createPointsAndDashLines();

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
    this.rotatePoint[0] = this.createRotateLine(0, -10, Math.atan(-1 / 1.8));
    this.group1.add(this.rotatePoint[0]);
    this.scene.add(this.group1);
  }

  /**
   *
   * @param {string} color1 点的颜色
   * @param {number} x1     点的位置
   * @param {number} y1     点的位置
   * @param {string} text1  文字1
   * @param {number} x2     文字1位置
   * @param {number} y2     文字1位置
   * @param {string} text2  文字2
   * @param {number} x3     文字2位置
   * @param {number} y3     文字2位置
   * @param {string} color2 文字颜色
   * @returns {Mesh}
   */
  createPoint(color1: string, x1: number, y1: number, text1: string, x2: number, y2: number,
              text2: string, x3: number, y3: number, color2: string) {
    const obj = ThreeUtil.createPoint(2, color1, x1, y1, 1);
    const text = ThreeUtil.createNewRomanText(text1, x2, y2, 0, color2, 0.15);
    const coordText = ThreeUtil.createNormalText(text2, x3, y3, 0, color2, 0.15);
    obj.add(text);
    obj.add(coordText);
    return obj;
  }

  //创建PQ线段及坐标文字
  createSegementsAndTexts() {
    this.pointOne[0] = this.createPoint(this.orangeColor, 0, -10, 'A', 10, 3, '(0,-1)', 23, 3, this.orangeColor);
    this.group1.add(this.pointOne[0]);
    this.pointOne[1] = this.createPoint(this.orangeColor, -10, 10, 'P', -30, 3, '(-1,1)', -17, 3, this.orangeColor);
    this.pointOne[1].visible = false;
    this.group1.add(this.pointOne[1]);
    this.pointOne[2] = this.createPoint(this.orangeColor, 20, 20, 'Q', 10, 3, '(2,2)', 23, 3, this.orangeColor);
    this.pointOne[2].visible = false;
    this.group1.add(this.pointOne[2]);
    this.linePq = this.createLine(-10, 10, 20, 20, this.orangeColor, false);
    this.linePq.visible = false;
    this.group1.add(this.linePq);
  }

  //创建PA，QA两条虚线
  createDashLines() {
      this.dashLineOnePA = this.createLine(-100, 0, 100, 0, this.pinkColor, true);
      this.dashLineOnePA.position.set(-5, 0, 0);
      //计算P、A两点组成直线斜率
      const slopePA = (-10 - 10) / (0 + 10);
      this.dashLineOnePA.rotation.z = Math.atan(slopePA);

      const pAImg = ThreeUtil.createImg(94 * 0.4, 22 * 0.4, pAOneImg, -110, -10);
      if (Math.atan(slopePA) < 0) {
        pAImg.rotation.z = Math.atan(-slopePA);
      } else {
        pAImg.rotation.z = -Math.atan(slopePA);
      }
      this.dashLineOnePA.add(pAImg);
      this.dashLineOnePA.visible = false;
      this.group1.add(this.dashLineOnePA);

      this.dashLineOneQA = this.createLine(-100, 0, 100, 0, this.pinkColor, true);
      this.dashLineOneQA.position.set(6.6, 0, 0);
      //计算Q、A两点组成直线斜率
      const slopeQA = (-10 - 20) / (0 - 20);
      this.dashLineOneQA.rotation.z = Math.atan(slopeQA);

      const qAImg = ThreeUtil.createImg(102 * 0.4, 22 * 0.4, qAOneImg, -110, -10);
      if (Math.atan(slopeQA) < 0) {
        qAImg.rotation.z = Math.atan(-slopeQA);
      } else {
        qAImg.rotation.z = -Math.atan(slopeQA);
      }
      this.dashLineOneQA.add(qAImg);
      this.dashLineOneQA.visible = false;
      this.group1.add(this.dashLineOneQA);
  }

  //解法二
  initRotateLineTwo() {
    this.rotatePoint[1] = this.createRotateLine(0, -17.3, (Math.PI / 4 + Math.PI));
    this.group2.add(this.rotatePoint[1]);
    this.pointTwo[0] = this.createPoint(this.orangeColor, 0, -17.3, 'P', 7, 3, '(0,-1.73)', 25, 3, this.orangeColor);
    this.group2.add(this.pointTwo[0]);
    this.group2.visible = false;
    this.scene.add(this.group2);

    //创建直线 2x + 3y - 6 = 0
    const defaultLine = this.createLine(-100, 0, 120, 0, MathConst.lineColor_Blue, false);
    const defaultRotPoint = ThreeUtil.createPoint(0.1, MathConst.lineColor_Blue, 0, 20, 1);
    defaultRotPoint.add(defaultLine);
    defaultRotPoint.rotation.z = Math.atan(-2 / 3);
    const defalutImg = ThreeUtil.createImg(118 * 0.4, 28 * 0.4, defaultFormulaImg, -110, 10);
    defalutImg.rotation.z = Math.atan(2 / 3);
    defaultLine.add(defalutImg);
    this.group2.add(defaultRotPoint);
  }

  //创建B点 A点，PB虚线，PA虚线
  createDahsLinesAndTexts() {
    this.pointTwo[1] = this.createPoint(this.orangeColor, 0, 20, 'B', 10, 3, '(0,2)', 23, 3, this.orangeColor);
    this.pointTwo[1].visible = false;
    this.group2.add(this.pointTwo[1]);
    this.pointTwo[2] = this.createPoint('#2FE69A', 30, 0, 'A', 10, 10, '(3,0)', 23, 10, '#2FE69A');
    this.pointTwo[2].visible = false;
    this.group2.add(this.pointTwo[2]);

    //虚线PA,PB
    this.dashLineTwoPA = this.createLine(-100, 0, 100, 0, this.pinkColor, true);
    this.dashLineTwoPA.rotation.z = Math.PI / 2;
    const pBImg = ThreeUtil.createImg(52 * 0.4, 22 * 0.4, pBTwoImg, 100, -15);
    pBImg.rotation.z = -Math.PI / 2;
    this.dashLineTwoPA.add(pBImg);
    this.dashLineTwoPA.visible = false;
    this.group2.add(this.dashLineTwoPA);

    this.dashLineTwoQA = this.createLine(-100, 0, 100, 0, this.pinkColor, true);
    this.dashLineTwoQA.position.set(30, 0, 0);
    //计算Q、A两点组成直线斜率
    const slopeQA = (0 + 17.3) / (30 - 0);
    this.dashLineTwoQA.rotation.z = Math.atan(slopeQA);
    const pAImg = ThreeUtil.createImg(150 * 0.4, 28 * 0.4, pATwoImg, -110, -15);
    if (Math.atan(slopeQA) < 0) {
      pAImg.rotation.z = Math.atan(-slopeQA);
    } else {
      pAImg.rotation.z = -Math.atan(slopeQA);
    }
    this.dashLineTwoQA.add(pAImg);
    this.dashLineTwoQA.visible = false;
    this.group2.add(this.dashLineTwoQA);
  }

  //解法三
  initRotateLineThree() {
    this.rotatePoint[2] = this.createRotateLine(20, 10, (Math.atan(1) + Math.PI));
    this.group3.add(this.rotatePoint[2]);
    this.pointThree[0] = this.createPoint(this.orangeColor, 20, 10, 'P', 10, 3, '(2,1)', 23, 3, this.orangeColor);
    this.group3.add(this.pointThree[0]);
    this.group3.visible = false;
    this.scene.add(this.group3);
  }

  //创建A，B点，AB线段及虚线PA,PB
  createPointsAndDashLines() {
    this.pointThree[1] = this.createPoint(this.orangeColor, -20, -10, 'B', -23, -7, '(-2,-1)', -10, -7, this.orangeColor);
    this.pointThree[1].visible = false;
    this.group3.add(this.pointThree[1]);
    this.pointThree[2] = this.createPoint(this.orangeColor, 10, 30, 'A', 10, 10, '(1,3)', 23, 10, this.orangeColor);
    this.pointThree[2].visible = false;
    this.group3.add(this.pointThree[2]);

    //线段AB
    this.lineAb = this.createLine(-20, -10, 10, 30, this.orangeColor, false);
    this.lineAb.visible = false;
    this.group3.add(this.lineAb);

    //虚线PA,PB
    const slopePA = (30 - 10) / (10 - 20);
    this.dashLineThreePA = this.createLine(-50, 0, 150, 0, this.pinkColor, true);
    this.dashLineThreePA.position.set(0, 50, 0);
    this.dashLineThreePA.rotation.z = Math.atan(slopePA);

    const pAImg = ThreeUtil.createImg(114 * 0.4, 28 * 0.4, pAThreeImg, -60, -15);
    if (Math.atan(slopePA) < 0) {
      pAImg.rotation.z = Math.atan(-slopePA);
    } else {
      pAImg.rotation.z = -Math.atan(slopePA);
    }
    this.dashLineThreePA.add(pAImg);
    this.dashLineThreePA.visible = false;
    this.group3.add(this.dashLineThreePA);

    this.dashLineThreeQA = this.createLine(-100, 0, 100, 0, this.pinkColor, true);
    //计算P、B两点组成直线斜率
    const slopePB = (-1 - 1) / (-2 - 2);
    this.dashLineThreeQA.rotation.z = Math.atan(slopePB);
    const pBImg = ThreeUtil.createImg(84 * 0.4, 28 * 0.4, pBThreeImg, -110, -15);
    if (Math.atan(slopePB) < 0) {
      pBImg.rotation.z = Math.atan(-slopePB);
    } else {
      pBImg.rotation.z = -Math.atan(slopePB);
    }
    this.dashLineThreeQA.add(pBImg);
    this.dashLineThreeQA.visible = false;
    this.group3.add(this.dashLineThreeQA);
  }

  //创建旋转直线
  createRotateLine(x: number, y: number, angle: number) {
    const lText = ThreeUtil.createNewRomanText('l', -110, 0, 0, MathConst.lineColor_Blue, 0.15);
    const rotLine = this.createLine(-100, 0, 100, 0, MathConst.lineColor_Blue, false);
    const obj = ThreeUtil.createPoint(0.1, MathConst.lineColor_Blue, x, y, 1);
    obj.add(lText);
    obj.add(rotLine);
    obj.rotation.z = angle;
    return obj;
  }

  //创建直线
  createLine(x1: number, y1: number, x2: number, y2: number, color: string, flag: boolean) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, y1, 0),
      endPoint: new THREE.Vector3( x2, y2, 0),
      dashLine: flag,
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      dashSize: 2,
      gapSize: 3,
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
