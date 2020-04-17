import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as secondNeedleImg from '../sub_static/secondNeedle.png';
import * as iclockImg from '../sub_static/iclock.png';
import * as point2 from '../sub_static/point2.png';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { ArcHelper } from './ArcHelper';
export class Gz3DModel extends ThreeBase {

  public sliderControlerLine: any;
  private controls: any;
  private secondNeedle: any;
  public whiteArc: any;
  public yellowArc: any;
  private circleHelper: any;
  public clockwiseArrow: any;
  public aClockwiseArrow: any;
  public clockwiseText: any;
  public aClockwiseText: any;
  public rotatePoint: any;
  public rotatePoint1: any;
  public direction = '';
  public angleText: any;
  public smallClockwiseText: any;
  public smallAclockwiseText: any;
  public rotCenterText: any;
  public shadowLine: any;
  startAngle = 0;
  startAngle1 = 0;
  endAngle = 0;
  endAngle1 = 0;

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
    this.circleHelper = new ArcHelper();
    this.initImage();
    this.bindEvent();
    this.setMove();
    this.createArrow();
    this.createText();
    this.createShadowLine();
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
    this.camera.position.set(0,  0,  350);
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
    (this.renderer as WebGLRenderer).setClearColor('#041434', 1 );

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

  //加载背景挂钟图片
  initImage() {
      const iclockImage = ThreeUtil.createImg(462 / 2, 462 / 2, iclockImg);
      this.scene.add(iclockImage);
  }

  //加载旋转秒针
  bindEvent() {
    const dragPoint = ThreeUtil.createPlane(8, 115,  '#000000', 0.00001);
    const dragPointRange = ThreeUtil.createImg(200, 200, point2, 0, 0, 0);
    this.rotatePoint = ThreeUtil.createPoint(1.6, '#FFDB3B',  0, 0, 0);
    this.rotatePoint1 = ThreeUtil.createPoint(1.6, '#FFDB3B',  0, 0, 1);
    this.rotatePoint1.visible = false;
    this.secondNeedle = ThreeUtil.createImg(8, 115, secondNeedleImg, 0, 47.5, 0);
    dragPointRange.add(dragPoint);
    dragPointRange.position.z = -0.1;
    (dragPointRange.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.rotatePoint.position.z = 10;
    dragPointRange.add(dragPoint);
    this.secondNeedle.add(dragPointRange);
    this.rotatePoint.add(this.secondNeedle);
    this.sliderControlerLine = new SliderControlLine(this.secondNeedle, dragPointRange, this.rotatePoint, dragPoint);
    this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
    this.scene.add(this.rotatePoint, this.rotatePoint1);
  }

//设置move事件的操作
  setMove() {
    this.sliderControlerLine.sliderPointMouseDownCallback = () => {
        this.shadowLine.rotation.z = this.startAngle;
    };

    this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
        this.rotateNeedleCode();
    };

    this.sliderControlerLine.sliderPointMouseUpCallback = () => {
      this.startAngle = this.endAngle;
        this.startAngle1 = this.endAngle1;
    };

    this.sliderControlerLine.sliderPointTouchStartCallback = () => {
      this.shadowLine.rotation.z = this.startAngle;
    };

    this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
        this.rotateNeedleCode();
    };

    this.sliderControlerLine.sliderPointTouchEndCallback = () => {
      this.startAngle = this.endAngle;
      this.startAngle1 = this.endAngle1;
    };
  }

//创建箭头
  createArrow() {
    //顺时针箭头
    this.clockwiseArrow = ThreeUtil.createTriangle(-3, 69, 5, 64.5, -3, 60, '#FFDB3B');
    this.secondNeedle.add(this.clockwiseArrow);

    //逆时针箭头
    this.aClockwiseArrow = ThreeUtil.createTriangle(3, 69, -5, 64.5, 3, 60, '#FFDB3B');
    this.secondNeedle.add(this.aClockwiseArrow);

    //旋转中心O点
    this.rotCenterText = ThreeUtil.createNewRomanText('O', -10, 10, 0, '#FFDB3B', 0.2);
    this.scene.add(this.rotCenterText);

    this.clockwiseArrow.visible = false;
    this.aClockwiseArrow.visible = false;
    this.rotCenterText.visible = false;
  }

  //创建文字
  createText() {
    //顺时针文字(单文字)
    this.clockwiseText = ThreeUtil.createNormalText('顺时针', -200, 0, 0, '#FFDB3B', 0.5);
    this.scene.add(this.clockwiseText);

    //逆时针(单文字)
    this.aClockwiseText = ThreeUtil.createNormalText('逆时针', -200, 0, 0, '#FFDB3B', 0.5);
    this.scene.add(this.aClockwiseText);

    this.clockwiseText.visible = false;
    this.aClockwiseText.visible = false;

    //顺逆时针小字
    this.smallClockwiseText = ThreeUtil.createNormalText('顺时针', -200, -30, 0, '#FFDB3B', 0.2);
    this.scene.add(this.smallClockwiseText);

    this.smallAclockwiseText = ThreeUtil.createNormalText('逆时针', -200, -30, 0, '#FFDB3B', 0.2);
    this.scene.add(this.smallAclockwiseText);

    this.smallClockwiseText.visible = false;
    this.smallAclockwiseText.visible = false;
  }

  //创建可改变字
  createAngleText(angle: number) {
    const angText = (Math.round(Math.abs(angle) * 180 / Math.PI)).toString();
    const angleText = ThreeUtil.createNormalText(angText + '°', -190, 10, 0, '#FFDB3B', 0.8);
    angleText.visible = false;
    return angleText;
  }

  //绘制留影直线
  createShadowLine() {
      const needle = ThreeUtil.createImg(8, 115, secondNeedleImg, 0, 47.5, 0);
      (needle.material as any).opacity = 0.2;
      this.shadowLine = ThreeUtil.createPoint(0.001, '#fff', 0, 0, 0);
      this.shadowLine.add(needle);
      this.shadowLine.visible = false;
      this.scene.add(this.shadowLine);
  }

    //删除绘制的对象
    deleteObject(obj1: any, scene: any) {
        if (obj1) {
          obj1.geometry.dispose();
          obj1.material.dispose();
          scene.remove(obj1);
        }
    }

    //旋转公用代码
    rotateNeedleCode() {
      this.endAngle = this.sliderControlerLine.angle;
      this.endAngle1 = this.sliderControlerLine.totalAngle;

      this.deleteObject(this.whiteArc, this.scene);
      this.deleteObject(this.yellowArc, this.scene);
      this.deleteObject(this.angleText, this.scene);

      if (this.sliderControlerLine.isClockwise) {
        if (Math.abs(this.endAngle1 - this.startAngle1) > Math.PI * 2) {
          this.startAngle1 = this.startAngle1 + Math.PI * 2;
        }
      } else {
        if (Math.abs(this.endAngle1 - this.startAngle1) > Math.PI * 2) {
          this.startAngle1 = this.startAngle1 - Math.PI * 2;
        }
      }
      //逆时针
      if (this.startAngle1 < this.endAngle1) {
        this.direction = 'aClockwise';
        this.angleText = this.createAngleText(Math.abs(this.endAngle1 - this.startAngle1));

        this.whiteArc = this.circleHelper.addEllipseLine(101, '#ffffff', 3, 9,
          this.startAngle + Math.PI / 2, this.endAngle + Math.PI / 2, false);

        this.yellowArc = this.circleHelper.addEllipseLine(115, '#FFDB3B', 3, 4,
          this.startAngle + Math.PI / 2, this.endAngle + Math.PI / 2, false);

        this.judgeClickOrder(true, false, false, true);

      } else {

        //顺时针
        this.direction = 'clockwise';
        this.angleText = this.createAngleText(Math.abs(this.endAngle1 - this.startAngle1));

        this.whiteArc = this.circleHelper.addEllipseLine(101, '#ffffff', 3, 9,
          this.startAngle + Math.PI / 2, this.endAngle + Math.PI / 2, true);

        this.yellowArc = this.circleHelper.addEllipseLine(115, '#FFDB3B', 3, 4,
          this.startAngle + Math.PI / 2, this.endAngle + Math.PI / 2, true);

        this.judgeClickOrder(false, true, true, false);

      }
      this.scene.add(this.whiteArc);
      this.scene.add(this.yellowArc);
      this.scene.add(this.angleText);
    }

    //判断按钮点击先后顺序问题
    judgeClickOrder(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {
        if ((window as any).viewHandler.viewModel.$data.flagTwo) {
          this.smallAclockwiseText.visible = false;
          this.smallClockwiseText.visible = false;
          this.aClockwiseText.visible = flag1;
          this.clockwiseText.visible = flag2;
          if ((window as any).viewHandler.viewModel.$data.flagThree) {
            this.smallAclockwiseText.visible = flag1;
            this.smallClockwiseText.visible = flag2;
            this.whiteArc.visible = true;
            this.angleText.visible = true;
            this.aClockwiseText.visible = false;
            this.clockwiseText.visible = false;
          }
          this.yellowArc.visible = true;
          this.clockwiseArrow.visible = flag3;
          this.aClockwiseArrow.visible = flag4;
        }
        if ((window as any).viewHandler.viewModel.$data.flagThree) {
          this.aClockwiseText.visible = false;
          this.clockwiseText.visible = false;
          this.whiteArc.visible = true;
          this.angleText.visible = true;
          if ((window as any).viewHandler.viewModel.$data.flagTwo) {
            this.smallAclockwiseText.visible = flag1;
            this.smallClockwiseText.visible = flag2;
          } else {
            this.smallAclockwiseText.visible = false;
            this.smallClockwiseText.visible = false;
          }
        }
    }

  resize(width: number, height: number) {
      (this.camera as PerspectiveCamera).aspect = width / height;
      (this.camera as PerspectiveCamera).updateProjectionMatrix();
      this.renderer.setSize(width, height);
  }

  reset() {
      this.rotatePoint.rotation.z = 0;
      this.sliderControlerLine.angle = 0;
      this.sliderControlerLine.totalAngle = 0;
      this.shadowLine.rotation.z = 0;
      if (this.yellowArc) {
          this.deleteObject(this.yellowArc, this.scene);
      }
      if (this.whiteArc) {
        this.deleteObject(this.whiteArc, this.scene);
      }
      this.clockwiseArrow.visible = false;
      this.aClockwiseArrow.visible = false;

      this.rotatePoint1.visible = false;
      this.rotCenterText.visible = false;

      this.clockwiseText.visible = false;
      this.aClockwiseText.visible = false;
      if (this.angleText) {
        this.deleteObject(this.angleText, this.scene);
      }
      this.smallClockwiseText.visible = false;
      this.smallAclockwiseText.visible = false;
      this.shadowLine.visible = false;

      this.startAngle = 0;
      this.startAngle1 = 0;
      this.endAngle = 0;
      this.endAngle1 = 0;
      this.direction = '';
  }
}
