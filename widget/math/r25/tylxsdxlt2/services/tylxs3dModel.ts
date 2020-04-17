import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { MathConst } from '../../../../../src/config/MathConst';
import { Line } from '../../../../../src/three/component/Line';
import * as point from './../sub_static/point.png';


export class Tylxs3dModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private controls: any;
    private ellipse: any;
    private focus: number;
    private dashLineGroup: THREE.Group;
    private lineGroup: THREE.Group;
    private lineHelper = new Line();
    private dragPoint: THREE.Mesh;
    private rightAngleLine1: any;
    private rightAngleLine2: any;
    private line1: any;
    private line2: any;
    private dom = document.getElementsByClassName('angle')[0];

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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        this.getEllipsefocus();
        this.createEllipse();
        this.createLine();
        this.createDashLine();
        this.createDragPoint();
        this.createText();
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
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
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
    createAxis() {

        this.scene.add(AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
        } as any));
    }

    //绘制椭圆
    createEllipse() {
      const curve = new THREE.EllipseCurve(
        0,  0,
        30, 20,
        0,   2 * Math.PI,
        true,
        0
      );
      const path = new THREE.Path( curve.getPoints(3000));
      const geometry = path.createPointsGeometry(3000);
      this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, MathConst.lineColor_red);
      this.scene.add(this.ellipse);
    }

    //计算椭圆焦点位置
    getEllipsefocus() {
        const a = 30;
        const b = 20;
        this.focus = Math.sqrt((Math.pow(a, 2) - Math.pow(b, 2)));
    }

    //创建虚线
    createDashLine() {
        this.dashLineGroup = new THREE.Group();
        const dashLine1 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 20, 0),
          endPoint: new THREE.Vector3(this.focus, 0, 0),
          color: '#000000',
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
          dashLine: true
        });

        const dashLine2 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 20, 0),
          endPoint: new THREE.Vector3(-this.focus, 0, 0),
          color: '#000000',
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
          dashLine: true
        });
        this.dashLineGroup.add(dashLine1, dashLine2);
        this.scene.add(this.dashLineGroup);
    }

    //创建直线
    createLine() {
        const a = 30;
        const b = 20;
        this.lineGroup = new THREE.Group();
         this.line1 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(13.4,
            Math.sqrt((Math.pow(b, 2) - (Math.pow(b, 2) /
              Math.pow(a, 2)) * Math.pow(13.4, 2))) , 0),
          endPoint: new THREE.Vector3(this.focus, 0, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });


        this.line2 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(13.4,
            Math.sqrt((Math.pow(b, 2) - (Math.pow(b, 2) /
              Math.pow(a, 2)) * Math.pow(13.4, 2))) , 0),
          endPoint: new THREE.Vector3(-this.focus, 0, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });
        this.lineGroup.add(this.line1, this.line2);
        this.scene.add(this.lineGroup);
    }

    //创建一个拖动点
    createDragPoint() {
        const a = 30;
        const b = 20;
        this.dragPoint = ThreeUtil.createImg(10, 10, point, 13.4,
          Math.sqrt((Math.pow(b, 2) - (Math.pow(b, 2) /
            Math.pow(a, 2)) * Math.pow(13.4, 2))), 0);
        this.bindDragEvent([this.dragPoint], () => {}, () => {
          //限定P点拖动轨迹
          this.dragPoint.position.x = this.dragPoint.position.x < a ? this.dragPoint.position.x : a;
          this.dragPoint.position.x = this.dragPoint.position.x > -a ? this.dragPoint.position.x : -a;
          if (this.dragPoint.position.y > 0) {
            this.dragPoint.position.y = Math.sqrt((Math.pow(b, 2) - (Math.pow(b, 2) /
              Math.pow(a, 2)) * Math.pow(this.dragPoint.position.x, 2)));
          } else if (this.dragPoint.position.y < 0) {
            this.dragPoint.position.y = -Math.sqrt((Math.pow(b, 2) - (Math.pow(b, 2) /
              Math.pow(a, 2)) * Math.pow(this.dragPoint.position.x, 2)));
          }
          this.reDrawLine();
          this.angleJudgment();
        });
        this.addVerticalLine();
        this.scene.add(this.dragPoint);
    }

    //计算角度 判断是否是直角
    angleJudgment() {

      const angle = ThreeUtil.getAngle({x: this.dragPoint.position.x, y: this.dragPoint.position.y}, -this.focus, 0,
      this.focus, 0);
      (this.dom as HTMLElement).innerText = (angle * 180 / Math.PI).toFixed(0) + '°';
      if (parseFloat((angle * 180 / Math.PI).toFixed(0)) === 90) {
          this.addVerticalLine();
      } else {
        if (this.rightAngleLine1) {
          this.deleteSegment(this.rightAngleLine1);
        }
        if (this.rightAngleLine2) {
          this.deleteSegment(this.rightAngleLine2);
        }
      }
    }

  //绘制直角符号
  addVerticalLine() {
    const slopeMF1 = (this.dragPoint.position.y - 0) /
      (this.dragPoint.position.x + this.focus);
    //直线MF1的方程 y = k1 * ( x + c );
    //去MF1线上近M点一点Q
    const qX = this.dragPoint.position.x - (5 / Math.sqrt((Math.pow(slopeMF1, 2) + 1)));
    const qY = this.dragPoint.position.y - ((5 * slopeMF1) / Math.sqrt((Math.pow(slopeMF1, 2) + 1)));

    //MF2的斜率
    const slopeMF2 = (this.dragPoint.position.y - 0) /
      (this.dragPoint.position.x - this.focus);
    //直线MF2的方程 y = k2 * ( x - c );
    //去MF1线上近M点一点N
    const nX = this.dragPoint.position.x + (5 / Math.sqrt((Math.pow(slopeMF2, 2) + 1)));
    const nY = this.dragPoint.position.y + ((5 * slopeMF2) / Math.sqrt((Math.pow(slopeMF2, 2) + 1)));

    //则过Q点做直线与MF2平行,该直线的直线方程为 y - qY = k2 * (x - qX)
    //则过N点做直线与MF1平行,该直线的直线方程为 y - nY = k1 * (x - nX)
    //该两直线交点为：O 则：
    const oX = (slopeMF1 * nX + qY - nY - slopeMF2 * qX) / (slopeMF1 - slopeMF2);
    const oY = slopeMF2 * (oX - qX) + qY;

    if (this.rightAngleLine1) {
      this.deleteSegment(this.rightAngleLine1);
    }
    this.rightAngleLine1 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(qX, qY, 0),
      endPoint: new THREE.Vector3(oX, oY, 0),
      color: '#0091FF',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 0.001
    });

    if (this.rightAngleLine2) {
      this.deleteSegment(this.rightAngleLine2);
    }
    this.rightAngleLine2 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(nX, nY, 0),
      endPoint: new THREE.Vector3(oX, oY, 0),
      color: '#0091FF',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 0.001
    });

    this.scene.add(this.rightAngleLine1);
    this.scene.add(this.rightAngleLine2);
  }

  //创建文字
  createText() {
      const color = '#000000';
      const scale = 0.15;
      const m  = ThreeUtil.createNewRomanText('M', -5, 28, 0, color, scale);
      const f1 = ThreeUtil.createNewRomanText('F', -this.focus,  -2.5, 0, color, scale);
      const index1 = ThreeUtil.createNormalText('₁', 20, -10, 0, color, 0.8);
      const f2 = ThreeUtil.createNewRomanText('F', this.focus,  -2.5, 0, color, scale);
      const index2 = ThreeUtil.createNormalText('₂', 20, -10, 0, color, 0.8);
      const p  = ThreeUtil.createNewRomanText('P', 5, 8, 0, color, scale);
      f1.add(index1);
      f2.add(index2);
      this.dragPoint.add(p);
      this.dashLineGroup.add(m);
      this.lineGroup.add(f1, f2);

  }

  //删除直角符号
  deleteSegment(obj: any) {
    if (obj) {
      obj.geometry.dispose();
      obj.material.dispose();
      this.scene.remove(obj);
    }
  }

    //控制虚线显示隐藏
    isShowDashLine(isShow: boolean) {
        this.dashLineGroup.visible = isShow;
    }

    //删除线的方法
    removeLine(line: any, father: THREE.Group) {
      father.remove(line);
      line.material.dispose();
      line.geometry.dispose();
    }

    //重新绘制线的方法
    reDrawLine() {
      if (this.line1 || this.line2) {
        this.removeLine(this.line1, this.lineGroup);
        this.removeLine(this.line2, this.lineGroup);
        this.line1 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(this.focus, 0, 0),
          endPoint: new THREE.Vector3(this.dragPoint.position.x, this.dragPoint.position.y, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });
        this.line2 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(-this.focus, 0, 0),
          endPoint: new THREE.Vector3(this.dragPoint.position.x, this.dragPoint.position.y, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });
        this.lineGroup.add(this.line1, this.line2);
      }

    }

    //绑定事件
    bindDragEvent(mesh: THREE.Mesh[], dragStartCallback?: any, dragCallback?: any, dragEndCallback?: any) {
        dragStartCallback = dragStartCallback ? dragStartCallback : () => {};
        dragCallback = dragCallback ? dragCallback : () => {};
        dragEndCallback = dragEndCallback ? dragEndCallback : () => {};
        const dargControls = new dragcontrols(mesh, this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  () => {
          this.controls.enabled = false;
          dragStartCallback();
        } );
        dargControls.addEventListener( 'drag', () => {
          dragCallback();
        } );
        dargControls.addEventListener( 'dragend', () => {
          this.controls.enabled = true;
          dragEndCallback();
        } );
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


}
