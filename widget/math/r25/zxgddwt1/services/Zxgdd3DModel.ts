import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import * as point from '../sub_static/point.png';
import * as verticalImg from '../sub_static/verticalLine.png';
import * as angleTextImg from '../sub_static/angleText.png';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { MathConst } from '../../../../../src/config/MathConst';

export class Zxgdd3DModel extends ThreeBase {

  private controls: any;
  private rotatePointM: any;
  private rotateLineM: any;
  private rotatePointL: any;
  private rotateLineL: any;
  private dragPointRangeM: any;
  private dragPointRangeL: any;
  private sliderControlerLineM: any;
  private sliderControlerLineL: any;
  private line: any;
  public bigPointP: any;

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
    this.line = new Line();
    this.initAxis();
    this.initRotateLineM();
    this.initRotateLineL();
    this.setMoveEvents();

    this.resetSliderctrl('right');
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

  //加载旋转直线m
  initRotateLineM () {
    const width1 = document.getElementById('pinmu').clientWidth;
    const width2 = document.getElementById('box').clientWidth;
    //拖拽点
    const dragPoint = ThreeUtil.createImg(16, 16, point, 0, 0, 0);
    this.dragPointRangeM = ThreeUtil.createImg(100, 100, point, 80, 0, 0);
    const mText = ThreeUtil.createNewRomanText('m', 5, 15, 0, MathConst.lineColor_Blue, 0.15);
    dragPoint.add(mText);
    this.rotatePointM = ThreeUtil.createPoint(1, MathConst.lineColor_Blue, 0, 0, 0);
    const rPoint = ThreeUtil.createPoint(1, MathConst.lineColor_Blue, 0, 0, 1);
    this.rotatePointM.add(rPoint);
    this.rotateLineM = this.createLine(-100, 80);
    this.dragPointRangeM.add(dragPoint);
    this.dragPointRangeM.position.z = -0.1;
    (this.dragPointRangeM.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.rotatePointM.position.z = 10;
    this.dragPointRangeM.add(dragPoint);
    this.rotateLineM.add(this.dragPointRangeM);
    this.rotatePointM.add(this.rotateLineM);
    this.sliderControlerLineM = new SliderControlLine(this.rotateLineM, this.dragPointRangeM, this.rotatePointM, dragPoint);
    this.sliderControlerLineM.initEvent(this.camera, this.renderer, this.controls, -((width2 - width1) / 2));
    this.rotatePointM.position.set(10, 30, 1);
    const bText = ThreeUtil.createNewRomanText('B', 15, 35, 0, MathConst.lineColor_Blue, 0.15);
    this.scene.add(bText);
    this.rotatePointM.rotation.z = Math.PI * 3 / 4;
    this.scene.add(this.rotatePointM);
    dragPoint.addEventListener('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });

    dragPoint.addEventListener('mouseout', () => {
      document.body.style.cursor = 'auto';
    });
  }

  //加载旋转直线l
  initRotateLineL () {
    const width1 = document.getElementById('pinmu').clientWidth;
    const width2 = document.getElementById('box').clientWidth;
    //拖拽点
    const dragPoint = ThreeUtil.createImg(16, 16, point, 0, 0, 0);
    this.dragPointRangeL = ThreeUtil.createImg(100, 100, point, 80, 0, 0);
    const lText = ThreeUtil.createNewRomanText('l', 5, -5, 0, MathConst.lineColor_Blue, 0.15);
    dragPoint.add(lText);
    this.rotatePointL = ThreeUtil.createPoint(1, MathConst.lineColor_Blue, 0, 0, 0);
    const rPoint = ThreeUtil.createPoint(1, MathConst.lineColor_Blue, 0, 0, 1);
    this.rotatePointL.add(rPoint);
    this.rotateLineL = this.createLine(-100, 80);
    this.dragPointRangeL.add(dragPoint);
    this.dragPointRangeL.position.z = -0.1;
    (this.dragPointRangeL.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.rotatePointL.position.z = 10;
    this.dragPointRangeL.add(dragPoint);
    this.rotateLineL.add(this.dragPointRangeL);
    this.rotatePointL.add(this.rotateLineL);
    this.sliderControlerLineL = new SliderControlLine(this.rotateLineL, this.dragPointRangeL, this.rotatePointL, dragPoint);
    this.sliderControlerLineL.initEvent(this.camera, this.renderer, this.controls, -((width2 - width1) / 2));
    this.rotatePointL.position.set(0, 0, 1);
    this.rotatePointL.rotation.z = Math.PI / 4;
    const aText = ThreeUtil.createNewRomanText('A', -5, 8, 0, MathConst.lineColor_Blue, 0.15);
    this.scene.add(aText);
    this.scene.add(this.rotatePointL);
    dragPoint.addEventListener('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });

    dragPoint.addEventListener('mouseout', () => {
      document.body.style.cursor = 'auto';
    });
  }

  //旋转点回调事件
  setMoveEvents() {
    const slopeM = 135;
    const slopeL = 45;
    const slopeMK = -1;
    const slopeLK = 1;
    const pPoint = ThreeUtil.createPoint(1, '#FF7C00', 20, 20, 1);
    this.bigPointP = ThreeUtil.createPoint(2, '#FF7C00', 0, 0, 1);
    this.bigPointP.visible = false;
    const pText = ThreeUtil.createNewRomanText('P', -8, 0, 0, '#FF7C00', 0.15);
    const verticalLine = ThreeUtil.createImg(5, 5, verticalImg, 2.5, 2.5, -1);
    const angleText = ThreeUtil.createImg(18.9, 7.7, angleTextImg, 17, 17, 0);
    pPoint.add(pText);
    pPoint.add(verticalLine);
    pPoint.add(angleText);
    pPoint.add(this.bigPointP);
    angleText.rotation.z = - Math.PI * 3 / 4;
    pPoint.rotation.z = Math.PI * 3 / 4;
    this.scene.add(pPoint);

    this.sliderControlerLineM.sliderPointMouseMoveCallback = () => {
      this.rotateLineL.rotation.z = this.sliderControlerLineM.angle;
      this.resetAngleLine(135, slopeM, slopeMK, slopeL, slopeLK, pPoint, angleText, this.bigPointP);
    };

    this.sliderControlerLineM.sliderPointTouchMoveCallback = () => {
      this.rotateLineL.rotation.z = this.sliderControlerLineM.angle;
      this.resetAngleLine(135, slopeM, slopeMK, slopeL, slopeLK, pPoint, angleText, this.bigPointP);
    };

    this.sliderControlerLineL.sliderPointMouseMoveCallback = () => {
      this.rotateLineM.rotation.z = this.sliderControlerLineL.angle;
      this.resetAngleLine(135, slopeM, slopeMK, slopeL, slopeLK, pPoint, angleText, this.bigPointP);
    };

    this.sliderControlerLineL.sliderPointTouchMoveCallback = () => {
      this.rotateLineM.rotation.z = this.sliderControlerLineL.angle;
      this.resetAngleLine(135, slopeM, slopeMK, slopeL, slopeLK, pPoint, angleText, this.bigPointP);
    };
  }

  //重置直角符号位置
  resetAngleLine(angleNum: number, slopeAngle1: number, slopeK1: number, slopeAngle2: number,
                 slopeK2: number, pointMesh: any, angelText: any, bigPointMesh: any) {
    //直线m的倾斜角为:
    if ((this.sliderControlerLineM.angle * 180 / Math.PI + this.sliderControlerLineL.angle * 180 / Math.PI + angleNum) % 180 < 0) {
      slopeAngle1 = (this.sliderControlerLineM.angle * 180 / Math.PI +
        this.sliderControlerLineL.angle * 180 / Math.PI + angleNum) % 180 + 180;
    } else {
      slopeAngle1 = (this.sliderControlerLineM.angle * 180 / Math.PI + this.sliderControlerLineL.angle * 180 / Math.PI + angleNum) % 180;
    }
    slopeK1 = Math.tan(slopeAngle1 * Math.PI / 180);
    //此时直线l的斜率为:
    slopeK2 = - 1 / slopeK1;
    //直线m的方程为 y - 30 = slopeMK * (x - 10)  直线l的方程为 y = slopeLK * x
    //此时两直线交点为:
    const interSectionPX = (30 - 10 * slopeK1) / (slopeK2 - slopeK1);
    const interSectionPY = interSectionPX * slopeK2;
    pointMesh.position.set(interSectionPX, interSectionPY, 0);
    pointMesh.rotation.z = (this.sliderControlerLineM.angle + Math.PI * 3 / 4 + this.sliderControlerLineL.angle);
    angelText.rotation.z = -(this.sliderControlerLineM.angle + Math.PI * 3 / 4 + this.sliderControlerLineL.angle);

    //PB两点间距离
    const pBDistance = Math.sqrt((Math.pow((interSectionPX - 10), 2) + Math.pow((interSectionPY - 30), 2)));
    //PA两点间距离
    const pADistance = Math.sqrt((Math.pow((interSectionPX), 2) + Math.pow((interSectionPY), 2)));

    //(-10, 20)   (20, 10)
    if ((window as any).viewHandler.viewModel.$data.ctrl) {
      if ((Math.abs(pBDistance - Math.sqrt(5) * 10) <= 0.9 && Math.abs(pADistance - Math.sqrt(5) * 10) >= 0.9)) {
        bigPointMesh.visible = true;
        this.sliderControlerLineM.imgControl = false;
        this.sliderControlerLineL.imgControl = false;
      } else {
        bigPointMesh.visible = false;
      }
    }
  }

  //创建直线
  createLine(x1: number, x2: number) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, 0, 0),
      endPoint: new THREE.Vector3( x2, 0, 0),
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      color: MathConst.lineColor_Blue
    });
    return line;
  }

  //动态设置属性
  resetSliderctrl( val: string) {
    if (val === 'left') {
      this.sliderControlerLineM.setCtrl(false);
      this.sliderControlerLineL.setCtrl(false);
    } else {
      this.sliderControlerLineM.setCtrl(true);
      this.sliderControlerLineL.setCtrl(true);
    }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

}
