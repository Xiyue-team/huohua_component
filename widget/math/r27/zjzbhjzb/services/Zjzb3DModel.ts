import * as THREE from 'three';
import { Mesh, PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as point from '../sub_static/point.png';
import * as coorOne from '../sub_static/coorOne.png';
import * as coorTwo from '../sub_static/coorTwo.png';
import * as rightAngle from '../sub_static/rightAngle.png';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { SpriteText2D } from 'three-text2d';
import { ArcHelper } from './ArcHelper';

export class Zjzb3DModel extends ThreeBase {
  private controls: any;
  private arcHelper: ArcHelper;
  private line: any;
  public axis: THREE.Group;
  public polarCoord: Mesh;
  private movePointP: Mesh;
  public greenDashLine: Mesh;
  public orangeDashLine: Mesh;
  public solidLine: Mesh;
  private greenColor = '#50E3C2';
  private orangeColor = '#ED7916';
  private blueColor = '#6ECFFF';
  private redColor = '#FF5A5A';
  public textPOne: Mesh;
  public textPTwo: Mesh;
  public ρText: SpriteText2D;
  public arcLine: any;
  public aText: any;
  public xText: any;
  public yText: any;
  public oText: any;
  public rightAngleImg: any;

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
    this.initDragPoint();
    this.initDragEvent();

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
    //直角坐标轴
    this.axis = AxisUtil.createAxis({ isTicks: false, AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''],
      axisColor: '#fff', axisOpacity: 0.32, fontColor: '#fff'} as any);

    this.rightAngleImg = ThreeUtil.createImg(34 * 0.5, 34 * 0.5, rightAngle);
    this.rightAngleImg.visible = false;
    this.scene.add(this.axis, this.rightAngleImg);

    //极坐标轴
    this.polarCoord = ThreeUtil.createLine(105, 0.5, '#fff', 0.32);
    this.polarCoord.position.set(52.5, 0, 0);
    const axisArrow = ThreeUtil.createTriangle(-2, 0, 0, 8, 2, 0, '#fff', 0.32);
    axisArrow.position.set(52, 0, 1);
    axisArrow.rotation.z = -Math.PI / 2;
    this.polarCoord.add(axisArrow);
    this.oText = ThreeUtil.createNewRomanText('O', -55.8, 0.3, 0, '#fff', 0.125);
    this.polarCoord.add(this.oText);
    this.polarCoord.visible = false;
    this.scene.add(this.polarCoord);
  }

  /*添加拖动点P和辅助线*/
  initDragPoint() {
    this.movePointP = ThreeUtil.createImg(84 * 0.1, 84 * 0.1, point, 50, 50, 1);
    this.greenDashLine = this.createLine(0, 50, 50, 50, this.greenColor, true, 4);
    this.orangeDashLine = this.createLine(50, 0, 50, 50, this.orangeColor, true, 4);
    this.textPOne = ThreeUtil.createImg(306 * 0.1, 72 * 0.1, coorOne, 10, 10);
    this.textPTwo = ThreeUtil.createImg(294 * 0.1, 72 * 0.1, coorTwo, 10, 10);
    this.textPTwo.visible = false;
    this.movePointP.add(this.textPOne, this.textPTwo);
    this.solidLine = this.createLine(0, 0, 50, 50, this.blueColor, false, 4);
    this.solidLine.visible = false;
    this.ρText = ThreeUtil.createNewRomanText('ρ', 25, 35, 0, this.blueColor, 0.15);
    this.ρText.visible = false;
    this.arcLine = this.createArcLine(Math.PI / 4, false);
    this.arcLine.visible = false;
    this.xText = ThreeUtil.createNewRomanText('x', 25, 0, 0, this.greenColor, 0.15);
    this.yText = ThreeUtil.createNewRomanText('y', 55, 25, 0, this.orangeColor, 0.15);
    this.xText.visible = false;
    this.yText.visible = false;
    this.aText = ThreeUtil.createNewRomanText('θ', 15, 10, 0, this.redColor, 0.15);
    this.aText.visible = false;
    this.scene.add(this.movePointP, this.solidLine, this.ρText, this.xText, this.yText, this.aText);
  }

  /*初始化P点拖动事件*/
  initDragEvent() {
    const dragPointAControls = new dragcontrols([this.movePointP], this.camera, this.renderer.domElement);
    dragPointAControls.addEventListener('drag', () => {

      //限定P点拖拽范围
      this.movePointP.position.x = this.movePointP.position.x <= 100 ? this.movePointP.position.x : 100;
      this.movePointP.position.x = this.movePointP.position.x >= -100 ? this.movePointP.position.x : -100;
      this.movePointP.position.y = this.movePointP.position.y <= 100 ? this.movePointP.position.y : 100;
      this.movePointP.position.y = this.movePointP.position.y >= -100 ? this.movePointP.position.y : -100;

      this.deleteLine(this.greenDashLine);
      this.greenDashLine = this.createLine(0, this.movePointP.position.y, this.movePointP.position.x, this.movePointP.position.y,
        this.greenColor, true, 4);

      this.deleteLine(this.orangeDashLine);
      this.orangeDashLine = this.createLine(this.movePointP.position.x, 0, this.movePointP.position.x, this.movePointP.position.y,
        this.orangeColor, true, 4);

      this.deleteLine(this.solidLine);
      this.solidLine = this.createLine(0, 0, this.movePointP.position.x, this.movePointP.position.y,
        this.blueColor, false, 4);

      this.ρText.position.set(this.movePointP.position.x / 2, this.movePointP.position.y / 2 + 10, 0);
      this.xText.position.set(this.movePointP.position.x / 2, 0, 0);
      this.yText.position.set(this.movePointP.position.x + 5, this.movePointP.position.y / 2, 0);

      this.deleteLine(this.arcLine);
      if (this.movePointP.position.y >= 0) {
        const endAngle = Math.atan(this.movePointP.position.y / this.movePointP.position.x) >= 0 ?
          Math.atan(this.movePointP.position.y / this.movePointP.position.x) :
          Math.atan(this.movePointP.position.y / this.movePointP.position.x) + Math.PI;
        this.arcLine = this.createArcLine(endAngle, false);
      } else {
        const endAngle = Math.atan(this.movePointP.position.y / this.movePointP.position.x) < 0 ?
          Math.atan(this.movePointP.position.y / this.movePointP.position.x) :
          Math.atan(this.movePointP.position.y / this.movePointP.position.x) - Math.PI;
        this.arcLine = this.createArcLine(endAngle, true);
      }

      if ((window as any).viewHandler.viewModel.$data.count % 2 !== 0) {
        this.solidLine.visible = true;
        this.ρText.visible = true;
        this.greenDashLine.visible = (window as any).viewHandler.viewModel.$data.relationShipColor ? true : false;
        this.orangeDashLine.visible = (window as any).viewHandler.viewModel.$data.relationShipColor ? true : false;
        this.arcLine.visible = true;

        if (this.movePointP.position.x <= 0.3 && this.movePointP.position.x >= -0.3) {
          this.arcLine.visible = false;
          this.rightAngleImg.visible = true;
          this.rightAngleImg.rotation.z = this.movePointP.position.y >= 0 ? -Math.PI / 2 : -Math.PI;
        } else {
          this.arcLine.visible = true;
          this.rightAngleImg.visible = false;
        }

      } else {

        this.solidLine.visible = false;
        this.ρText.visible = false;
        this.greenDashLine.visible = true;
        this.orangeDashLine.visible = true;
        this.arcLine.visible = false;
      }

      if (window.env.browserInfo.isIpad) {
        this.aText.position.set((this.arcLine.geometry as any).vertices[25].x * 1.5,
          (this.arcLine.geometry as any).vertices[25].y * 2, 0);
      } else {
        this.aText.position.set((this.arcLine.geometry as any).attributes.position.array[213] * 1.5,
          (this.arcLine.geometry as any).attributes.position.array[214] * 2, 0);
      }
    });
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
    const arc = this.arcHelper.addEllipseLine(10, this.redColor, 3, 1,
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
    this.movePointP.position.set(50, 50, 0);
    if (this.greenDashLine) {
      this.deleteLine(this.greenDashLine);
    }
    if (this.orangeDashLine) {
      this.deleteLine(this.orangeDashLine);
    }
    if (this.solidLine) {
      this.deleteLine(this.solidLine);
    }
    if (this.arcLine) {
      this.deleteLine(this.arcLine);
    }
    this.greenDashLine = this.createLine(0, 50, 50, 50, this.greenColor, true, 4);
    this.orangeDashLine = this.createLine(50, 0, 50, 50, this.orangeColor, true, 4);
    this.solidLine = this.createLine(0, 0, 50, 50, this.blueColor, false, 4);
    this.arcLine = this.createArcLine(Math.PI / 4, false);
    this.ρText.position.set(25, 35, 0);
    this.aText.position.set(15, 10, 0);
    this.xText.position.set(25, 0, 0);
    this.yText.position.set(55, 25, 0);
    this.textPOne.visible = true;
    this.textPTwo.visible = false;
    this.solidLine.visible = false;
    this.arcLine.visible = false;
    this.ρText.visible = false;
    this.aText.visible = false;
    this.xText.visible = false;
    this.yText.visible = false;
    this.axis.visible = true;
    this.polarCoord.visible = false;
    this.oText.visible = false;
    this.rightAngleImg.visible = false;
  }
}
