import * as THREE from 'three';
import { Mesh, PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as point from '../sub_static/point.png';
import * as rightAngleImg from '../sub_static/rightAngle.png';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { ArcHelper } from './ArcHelper';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { MathConst } from '../../../../../src/config/MathConst';
import { SpriteText2D } from 'three-text2d';

export class Zxqxj3DModel extends ThreeBase {
  private controls: any;
  private arcHelper: ArcHelper;
  private line: Line;
  public axis: THREE.Group;
  private blueColor = '#6ECFFF';
  private dragPointRange: Mesh;
  private rotatePoint: Mesh;
  private sliderControlerLine: SliderControlLine;
  private rotateLine: any;
  private arcLine: any;
  private rightAngle: Mesh;
  public thetaText: SpriteText2D;
  private angleText: SpriteText2D;
  public kText: SpriteText2D;
  private slopeText: SpriteText2D;

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
    this.arcHelper = new ArcHelper();
    this.initAxis();
    this.initRotateLine();
    this.initArcLine();
    this.setMove();

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
    this.camera.position.set(0, 0, 270);
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
    (this.renderer as WebGLRenderer).setClearColor('#2C2C2C', 1);
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

  /*创建坐标轴*/
  initAxis() {
    this.axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
      axisColor: '#fff', axisOpacity: 0.32, fontColor: '#fff'} as any);
    this.scene.add(this.axis);
  }

  /*创建可拖拽旋转直线*/
  initRotateLine() {
    //拖拽点
    const dragPoint = ThreeUtil.createImg(16, 16, point, 0, 0, 0);
    this.dragPointRange = ThreeUtil.createImg(100, 100, point, 90, 0, 0);
    const lText = ThreeUtil.createNewRomanText('l', 5, -5, 0, this.blueColor, 0.15);
    dragPoint.add(lText);
    this.rotatePoint = ThreeUtil.createPoint(1, MathConst.lineColor_Blue, 0, 0, 0);
    this.rotateLine = this.createLine(-90, 0, 90, 0, this.blueColor, false, 4);
    this.dragPointRange.add(dragPoint);
    this.dragPointRange.position.z = -0.1;
    (this.dragPointRange.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.dragPointRange.position.z = 2;
    this.dragPointRange.add(dragPoint);
    this.rotateLine.add(this.dragPointRange);
    this.rotatePoint.add(this.rotateLine);
    this.sliderControlerLine = new SliderControlLine(this.rotateLine, this.dragPointRange, this.rotatePoint, dragPoint);
    this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
    this.rotatePoint.position.set(0, 0, 1);
    this.rotatePoint.rotation.z = Math.PI / 4;
    this.sliderControlerLine.angle = Math.PI / 4;
    this.scene.add(this.rotatePoint);
    dragPoint.addEventListener('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });

    dragPoint.addEventListener('mouseout', () => {
      document.body.style.cursor = 'auto';
    });
  }

  /*绘制初始角度弧线*/
  initArcLine() {
    this.arcLine = this.createArcLine(Math.PI / 4, false);
    this.thetaText = ThreeUtil.createNewRomanText('θ', 15, 15, 0, '#fff', 0.15);
    this.angleText = ThreeUtil.createNormalText('=45°', 90, 5, 0, '#fff', 1);
    this.thetaText.add(this.angleText);

    this.kText = ThreeUtil.createNewRomanText('k', 15, 15, 0, '#fff', 0.15);
    this.slopeText = ThreeUtil.createNormalText('=1', 45, -1, 0, '#fff', 0.9);
    this.kText.add(this.slopeText);
    this.kText.visible = false;

    this.rightAngle = ThreeUtil.createImg(30 * 0.5, 30 * 0.5, rightAngleImg);
    this.rightAngle.rotation.z = -Math.PI / 2;
    this.rightAngle.visible = false;

    this.scene.add(this.thetaText, this.kText, this.rightAngle);
  }

  /*设置move事件的操作*/
  setMove() {
    let endAngle = 45;
    this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
      this.deleteLine(this.arcLine);
      endAngle = this.sliderControlerLine.angle >= 0 ? (this.sliderControlerLine.angle <= Math.PI ?
        this.sliderControlerLine.angle : this.sliderControlerLine.angle - Math.PI) :
        this.sliderControlerLine.angle >= -Math.PI ? this.sliderControlerLine.angle + Math.PI :
          ((this.sliderControlerLine.angle < -Math.PI && this.sliderControlerLine.angle > -Math.PI * 2) ?
            this.sliderControlerLine.angle + Math.PI * 2 : 0.01);

      this.angleText.text = '=' + (endAngle * 180 / Math.PI).toFixed(0) + '°';

      if ((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '90' ||
          (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '270' ||
          (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '-90' ||
          (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '-270') {
            this.rightAngle.visible = true;
            this.slopeText.text = '=' + window.env.browserInfo.lang.unExistTitle;
            this.slopeText.position.x = 100;
            this.angleText.text = '=90°';
            return ;
      }

      this.rightAngle.visible = false;
      this.arcLine = this.createArcLine(endAngle, false);
      this.slopeText.text = '=' + Math.tan(endAngle).toFixed(2);
      this.slopeText.position.x = 95;
      if (this.slopeText.text === '=-0.00' || this.slopeText.text === '=0.00') {
        this.slopeText.text = '= 0';
        this.slopeText.position.x = 60;
      }
      this.angleText.position.x = Number.parseFloat((endAngle * 180 / Math.PI).toFixed(0)) >= 100 ?
        ((endAngle * 180 / Math.PI).toFixed(0) === '180' ? 77 : 102) :
        (Number.parseFloat((endAngle * 180 / Math.PI).toFixed(0)) < 10 ? 77 : 90);

      if ((endAngle * 180 / Math.PI).toFixed(0) === '180') {
        this.angleText.text = '=0°';
        this.deleteLine(this.arcLine);
      }
    };

    this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
      this.deleteLine(this.arcLine);
      endAngle = this.sliderControlerLine.angle >= 0 ? (this.sliderControlerLine.angle <= Math.PI ?
        this.sliderControlerLine.angle : this.sliderControlerLine.angle - Math.PI) :
        this.sliderControlerLine.angle >= -Math.PI ? this.sliderControlerLine.angle + Math.PI :
          ((this.sliderControlerLine.angle < -Math.PI && this.sliderControlerLine.angle > -Math.PI * 2) ?
            this.sliderControlerLine.angle + Math.PI * 2 : 0.001);

      this.angleText.text = '=' + (endAngle * 180 / Math.PI).toFixed(0) + '°';

      if ((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '90' ||
        (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '270' ||
        (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '-90' ||
        (this.sliderControlerLine.angle * 180 / Math.PI).toFixed(0) === '-270') {
        this.rightAngle.visible = true;
        this.slopeText.text = '=' + window.env.browserInfo.lang.unExistTitle;
        this.slopeText.position.x = 100;
        this.angleText.text = '=90°';
        return ;
      }

      this.rightAngle.visible = false;
      this.arcLine = this.createArcLine(endAngle, false);
      this.slopeText.text = '=' + Math.tan(endAngle).toFixed(2);
      this.slopeText.position.x = 95;
      if (this.slopeText.text === '=-0.00' || this.slopeText.text === '=0.00') {
        this.slopeText.text = '= 0';
        this.slopeText.position.x = 60;
      }

      this.angleText.position.x = Number.parseFloat((endAngle * 180 / Math.PI).toFixed(0)) >= 100 ?
        ((endAngle * 180 / Math.PI).toFixed(0) === '180' ? 77 : 102) :
        (Number.parseFloat((endAngle * 180 / Math.PI).toFixed(0)) < 10 ? 77 : 90);

      if ((endAngle * 180 / Math.PI).toFixed(0) === '180') {
        this.angleText.text = '=0°';
        this.deleteLine(this.arcLine);
      }
    };
  }

  /*创建直线*/
  createLine(x1: number, y1: number, x2: number, y2: number, color: string, isDash: boolean, dashSize: number) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, y1, 1),
      endPoint: new THREE.Vector3( x2, y2, 1),
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      dashLine: isDash,
      dashSize: dashSize,
      gapSize: 3,
      color: color
    });
    this.scene.add(line);
    return line;
  }

  /*绘制角度弧线*/
  createArcLine(endAngle: number, isAclocWise: boolean) {
    const arc = this.arcHelper.addEllipseLine(10, this.blueColor, 3, 1,
      0, endAngle, isAclocWise);
    this.scene.add(arc);
    return arc;
  }

  /*删除线*/
  deleteLine(lineObj: any) {
      if (lineObj) {
        lineObj.geometry.dispose();
        lineObj.material.dispose();
        this.scene.remove(lineObj);
      }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    this.deleteLine(this.arcLine);
    this.angleText.text = '=45°';
    this.angleText.position.set(90, 5, 0);
    this.slopeText.text = '=1';
    this.slopeText.position.set(45, 0, 0);
    this.kText.visible = false;
    this.thetaText.visible = true;
    this.rightAngle.visible = false;
    this.sliderControlerLine.angle = Math.PI / 4;
    this.rotatePoint.rotation.z = Math.PI / 4;
    this.arcLine = this.createArcLine(Math.PI / 4, false);
  }
}
