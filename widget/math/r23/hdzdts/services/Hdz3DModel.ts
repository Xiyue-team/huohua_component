import * as THREE from 'three';
import { DoubleSide, PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as point2 from '../sub_static/point2.png';
import * as r1Img from '../sub_static/r1.png';
import * as r2Img from '../sub_static/r2.png';
import * as r3Img from '../sub_static/r3.png';
import * as l1Img from '../sub_static/l1.png';
import * as l2Img from '../sub_static/l2.png';
import * as l3Img from '../sub_static/l3.png';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { Line } from '../../../../../src/three/component/Line';
import { ArcHelper } from './ArcHelper';
import { Linear, TweenMax } from 'gsap';

export class Hdz3DModel extends ThreeBase {

  public sliderControlerLine: any;
  private controls: any;
  private line: any;
  public rotatePoint: any;
  private circleHelper: any;
  public rotateLine: any;
  public circleLine: any = [];
  public otherLines: any = [];
  public stationaryLine: any = [];
  public arcLine: any = [];
  public images: any = [];
  public animateLine: any = [];
  public animatePoint: any = [];
  public animation: any = [];
  public lineAnimation: any = [];
  public arcLineAnimation: any = [];
  public curveLines: any = [];

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
    this.line = new Line();
    this.drawCircleLine();
    this.bindEvent();
    this.setMove();
    this.createArcLine();
    this.createOtherLines();
    this.createStationaryLine();
    this.createAnimateLine();
    this.createSomeArcLines();
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
    this.camera.position.set(0,  0,  270);
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
    (this.renderer as WebGLRenderer).setClearColor('#2D2D2D', 1 );
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

  //绘制圆形线
  drawCircleLine() {
      this.circleLine[0] = this.drawCircle(50);
      this.circleLine[1] = this.drawCircle(70);
      this.circleLine[2] = this.drawCircle(90);
      for (let i = 0; i < this.circleLine.length; i++) {
          this.scene.add(this.circleLine[i]);
      }
      this.circleLine[1].visible = false;
      this.circleLine[2].visible = false;
  }

  //加载旋转直线
  bindEvent() {
    //拖拽点
    const redPoint = ThreeUtil.createPoint(2, '#FF8233', 0, 0, 1);
    const dragPoint = ThreeUtil.createImg(16, 16, point2, 48, 0, 0);
    dragPoint.add(redPoint);
    (dragPoint.material as any).opacity = 0.36;
    const dragPointRange = ThreeUtil.createImg(200, 200, point2, 0, 0, 0);
    this.rotatePoint = ThreeUtil.createPoint(1, '#FF5A5A', 0, 0, 0);
    const rPoint = ThreeUtil.createPoint(1, '#FF5A5A', 0, 0, 1);
    this.rotatePoint.add(rPoint);
    this.rotateLine = this.createLine(0, 48);
    dragPointRange.add(dragPoint);
    dragPointRange.position.z = -0.1;
    (dragPointRange.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.rotatePoint.position.z = 10;
    dragPointRange.add(dragPoint);
    this.rotateLine.add(dragPointRange);
    this.rotatePoint.add(this.rotateLine);
    this.sliderControlerLine = new SliderControlLine(this.rotateLine, dragPointRange, this.rotatePoint, dragPoint);
    this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
    this.rotatePoint.rotation.z = (1 - Math.PI / 6);
    this.scene.add(this.rotatePoint);
  }

  //创建另几条直线
  createOtherLines() {
      this.otherLines[0] = this.createLine(48, 66.5);
      this.otherLines[1] = this.createLine(68.2, 85.8);

      this.images[0] = ThreeUtil.createImg(5, 12, r1Img, 25, 10, -1);
      this.images[0].rotation.z = -(1 - Math.PI / 6);
      this.rotateLine.add(this.images[0]);

      this.images[1] = ThreeUtil.createImg(5, 12, r2Img, 58, 10, -1);
      this.images[1].rotation.z = -(1 - Math.PI / 6);
      this.otherLines[0].add(this.images[1]);

      this.images[2] = ThreeUtil.createImg(5, 12, r3Img, 78, 10, -1);
      this.images[2].rotation.z = -(1 - Math.PI / 6);
      this.otherLines[1].add(this.images[2]);

      this.otherLines[0].visible = false;
      this.otherLines[1].visible = false;

      this.rotateLine.add(this.otherLines[0]);
      this.rotateLine.add(this.otherLines[1]);
  }

  createLine(x1: number, x2: number) {
     const line = this.line.createLine({
         startPoint: new THREE.Vector3(x1, 0, 0),
         endPoint: new THREE.Vector3( x2, 0, 0),
         lineWidth: 1000,
         lineWidthScale: 1 / 500,
         color: '#FFD621'
     });
     return line;
  }

  //设置move事件的操作
  setMove() {

    this.sliderControlerLine.sliderPointMouseDownCallback = () => {
      (window as any).viewHandler.viewModel.$data.oneRadianColor = false;
      (window as any).viewHandler.viewModel.$data.twoRadianColor = false;
      (window as any).viewHandler.viewModel.$data.threeRadianColor = false;
      (window as any).viewHandler.viewModel.$data.fourRadianColor = false;
    };

    this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
        if ((window as any).viewHandler.viewModel.$data.clickFlag) {

          this.images[0].rotation.z = -this.sliderControlerLine.angle;
          this.images[1].rotation.z = -this.sliderControlerLine.angle;
          this.images[2].rotation.z = -this.sliderControlerLine.angle;

          this.changeArcLine(false, false, false, false);

        } else {

          if ((window as any).viewHandler.viewModel.$data.meaningFulFlag) {
            this.images[0].rotation.z = -this.sliderControlerLine.angle;
            this.images[1].rotation.z = -this.sliderControlerLine.angle;
            this.images[2].rotation.z = -this.sliderControlerLine.angle;

          } else {

            this.images[0].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));
            this.images[1].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));
            this.images[2].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));
          }
        }

      (window as any).viewHandler.viewModel.$data.meaningColor = false;
      this.stopAllAnimation();
    };

    this.sliderControlerLine.sliderPointTouchStartCallback = () => {
      (window as any).viewHandler.viewModel.$data.oneRadianColor = false;
      (window as any).viewHandler.viewModel.$data.twoRadianColor = false;
      (window as any).viewHandler.viewModel.$data.threeRadianColor = false;
      (window as any).viewHandler.viewModel.$data.fourRadianColor = false;
    };

    this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
      if ((window as any).viewHandler.viewModel.$data.clickFlag) {

        this.images[0].rotation.z = -this.sliderControlerLine.angle;
        this.images[1].rotation.z = -this.sliderControlerLine.angle;
        this.images[2].rotation.z = -this.sliderControlerLine.angle;

        this.changeArcLine(false, false, false, false);

      } else {

        if ((window as any).viewHandler.viewModel.$data.meaningFulFlag) {

          this.images[0].rotation.z = -this.sliderControlerLine.angle;
          this.images[1].rotation.z = -this.sliderControlerLine.angle;
          this.images[2].rotation.z = -this.sliderControlerLine.angle;

        } else {

          this.images[0].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));
          this.images[1].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));
          this.images[2].rotation.z = -(this.sliderControlerLine.angle + (1 - Math.PI / 6));

        }
      }
      (window as any).viewHandler.viewModel.$data.meaningColor = false;
      this.stopAllAnimation();
    };
  }

  //绘制弧线
  drawCircle(radius: number) {
      const circleLine = this.circleHelper.addEllipseLine(radius, '#18A2FF', 3, 2, 0, Math.PI * 2, false);
      return circleLine;
  }

  //创建另一侧静止黄线
  createStationaryLine() {
      const rotCenterO = ThreeUtil.createNewRomanText('O', -5, -2, 0, '#fff', 0.2);
      this.scene.add(rotCenterO);
      this.stationaryLine[0] = this.createLine(0, 49.5);
      this.stationaryLine[1] = this.createLine(51, 69.5);
      this.stationaryLine[2] = this.createLine(71, 89.2);

      //l1图片
      this.images[3] = ThreeUtil.createImg(5.3, 12, l1Img, 56, 30, -1);
      this.images[3].rotation.z = Math.PI / 6;
      this.stationaryLine[0].add(this.images[3]);

      //l2图片
      this.images[4] = ThreeUtil.createImg(5.3, 12, l2Img, 74, 41, -1);
      this.images[4].rotation.z = Math.PI / 6;
      this.stationaryLine[1].add(this.images[4]);

      //l3图片
      this.images[5] = ThreeUtil.createImg(5.3, 12, l3Img, 89, 50, -1);
      this.images[5].rotation.z = Math.PI / 6;
      this.stationaryLine[2].add(this.images[5]);

      this.stationaryLine[0].rotation.z = -Math.PI / 6;
      this.stationaryLine[0].add(this.stationaryLine[1]);
      this.stationaryLine[0].add(this.stationaryLine[2]);
      this.stationaryLine[1].visible = false;
      this.stationaryLine[2].visible = false;
      this.scene.add(this.stationaryLine[0]);
  }

  //绘制弧线
  createArcLine() {
      this.arcLine[0] = this.circleHelper.addEllipseLine(50, '#FFD621', 3, 2, -Math.PI / 6, (1 - Math.PI / 6), false);
      (this.arcLine[0].geometry as any).setDrawRange( 0, 1 );
      this.scene.add(this.arcLine[0]);
      this.arcLine[1] = this.circleHelper.addEllipseLine(70, '#FFD621', 3, 2, -Math.PI / 6, (1 - Math.PI / 6), false);
      this.scene.add(this.arcLine[1]);
      (this.arcLine[1].geometry as any).setDrawRange( 0, 1 );
      this.arcLine[2] = this.circleHelper.addEllipseLine(90, '#FFD621', 3, 2, -Math.PI / 6, (1 - Math.PI / 6), false);
      this.scene.add(this.arcLine[2]);
      (this.arcLine[2].geometry as any).setDrawRange( 0, 1 );
  }

  //创建直线转弧线动画
  createAnimateLine() {
      this.animateLine[0] = this.createLine(0, 49.5);
      this.animatePoint[0] = ThreeUtil.createPoint(1, '#fff', 43, -24.8, 0);
      this.animatePoint[0].rotation.z = Math.PI * 5 / 6;
      this.animatePoint[0].add(this.animateLine[0]);
      this.scene.add(this.animatePoint[0]);

      this.animateLine[1] = this.createLine(0, 69.5);
      this.animatePoint[1] = ThreeUtil.createPoint(1, '#fff', 60.5, -35, 0);
      this.animatePoint[1].rotation.z = Math.PI * 5 / 6;
      this.animatePoint[1].add(this.animateLine[1]);
      this.scene.add(this.animatePoint[1]);

      this.animateLine[2] = this.createLine(0, 89.2);
      this.animatePoint[2] = ThreeUtil.createPoint(1, '#fff', 77.5, -45, 0);
      this.animatePoint[2].rotation.z = Math.PI * 5 / 6;
      this.animatePoint[2].add(this.animateLine[2]);
      this.scene.add(this.animatePoint[2]);

      this.animatePoint[0].visible = true;
      this.animatePoint[1].visible = false;
      this.animatePoint[2].visible = false;

      //初始化动画
      this.lineAnimation[0] = this.solidLineDisAnimation(this.animateLine[0]);
      this.arcLineAnimation[0] = this.showArcLineAnimation(this.arcLine[0]);
      this.animation[0] = this.createAnimation(this.animatePoint[0], () => {
        this.arcLineAnimation[0].play();
        this.lineAnimation[0].play();
      });

      this.lineAnimation[1] = this.solidLineDisAnimation(this.animateLine[1]);
      this.arcLineAnimation[1] = this.showArcLineAnimation(this.arcLine[1]);
      this.animation[1] = this.createAnimation(this.animatePoint[1], () => {
        this.arcLineAnimation[1].play();
        this.lineAnimation[1].play();
      });

      this.lineAnimation[2] = this.solidLineDisAnimation(this.animateLine[2]);
      this.arcLineAnimation[2] = this.showArcLineAnimation(this.arcLine[2]);
      this.animation[2] = this.createAnimation(this.animatePoint[2], () => {
        this.arcLineAnimation[2].play();
        this.lineAnimation[2].play();
      });
  }

  //直线旋转动画
  createAnimation(obj: any, callback: any) {
      const tween = {
          angle: Math.PI * 5 / 6
      };
      const animation = TweenMax.to(tween, 1, {
        angle: Math.PI / 3,
        onUpdate: () => {
          obj.rotation.z = tween.angle;
        },
        onComplete: () => {
          animation.pause();
          animation.progress(0);
          callback();
        },
        paused: true,
        ease:  Linear.ease,
        repeat: 0 //执行次数 -1 等于infinite
      });
      return animation;
  }

  //直线消失动画
  solidLineDisAnimation(solidLine: any) {
      const tween = {
        visible: true
      };
      const animation = TweenMax.to(tween, 2, {
        visible: false,
        onUpdate: () => {
          solidLine.visible = tween.visible;
        },
        onComplete: () => {
          animation.pause();
          animation.progress(0);
        },
        paused: true,
        ease:  Linear.ease,
        repeat: 0 //执行次数 -1 等于infinite
      });
      return animation;
  }

  //弧线慢慢出现
  showArcLineAnimation(arcLine: any) {
    const tween = {
      pos: 0,
    };

    const animation = TweenMax.to(tween, 2, {
      pos: (arcLine.geometry as any).attributes.position.count * 3 - 1,
      onUpdate: () => {
        // 绘制弧线
        (arcLine.geometry as any).setDrawRange( 0, tween.pos );
      },
      onComplete: () => {
        animation.pause();
        animation.progress(0);
        (window as any).viewHandler.viewModel.$data.meaningColor = false;
      },
      paused: true,
      ease:  Linear.easeIn,
    });
    return animation;
  }

  //绘制任意弧度弧线
  drawArcLine(num: number) {
      const arcGeometry = new THREE.CircleBufferGeometry(10, 32, -Math.PI / 6, num * Math.PI / 180);
      const arcMaterial = new THREE.MeshBasicMaterial({
        color: '#C06831',
        transparent: true,
        opacity: 1,
        side: DoubleSide
      });
      const arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
      return arcLine;
  }

  //初始化几个弧度弧线
  createSomeArcLines() {
      this.curveLines[0] = this.drawArcLine(57.3);
      const curveAngleText1 = ThreeUtil.createNumber('57.3°', 25, 3, 0, '#fff', 0.25);
      this.curveLines[0].add(curveAngleText1);
      this.scene.add(this.curveLines[0]);

      this.curveLines[1] = this.drawArcLine(114.6);
      const curveAngleText2 = ThreeUtil.createNumber('114.6°', 22, 10, 0, '#fff', 0.25);
      this.curveLines[1].add(curveAngleText2);
      this.scene.add(this.curveLines[1]);

      this.curveLines[2] = this.drawArcLine(171.9);
      const curveAngleText3 = ThreeUtil.createNumber('171.9°', 20, 15, 0, '#fff', 0.25);
      this.curveLines[2].add(curveAngleText3);
      this.scene.add(this.curveLines[2]);

      this.curveLines[3] = this.drawArcLine(229.2);
      const curveAngleText4 = ThreeUtil.createNumber('229.2°', 12, 18, 0, '#fff', 0.25);
      this.curveLines[3].add(curveAngleText4);
      this.scene.add(this.curveLines[3]);

      for (let i = 0; i < 4; i++) {
          this.curveLines[i].visible = false;
      }
  }

  //切换按钮时显示对应的弧度值及弧
  changeArcLine(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {
      this.curveLines[0].visible = flag1;
      this.curveLines[1].visible = flag2;
      this.curveLines[2].visible = flag3;
      this.curveLines[3].visible = flag4;
  }

  //停止动画
  stopAllAnimation() {
    for (let i = 0; i < 3; i++) {
      this.animation[i].pause();
      this.animation[i].progress(0);
      this.arcLineAnimation[i].pause();
      this.arcLineAnimation[i].progress(0);
    }
  }

  resize(width: number, height: number) {
      (this.camera as PerspectiveCamera).aspect = width / height;
      (this.camera as PerspectiveCamera).updateProjectionMatrix();
      this.renderer.setSize(width, height);
  }

  reset() {

      this.sliderControlerLine.angle = 0;
      this.rotatePoint.rotation.z = (1 - Math.PI / 6);
      this.circleLine[1].visible = false;
      this.circleLine[2].visible = false;
      this.otherLines[0].visible = false;
      this.otherLines[1].visible = false;
      this.stationaryLine[1].visible = false;
      this.stationaryLine[2].visible = false;
      this.images[0].rotation.z = -(1 - Math.PI / 6);
      this.images[1].rotation.z = -(1 - Math.PI / 6);
      this.images[2].rotation.z = -(1 - Math.PI / 6);
      this.curveLines[0].visible = false;
      this.curveLines[1].visible = false;
      this.curveLines[2].visible = false;
      this.curveLines[3].visible = false;
      this.animatePoint[0].visible = false;
      this.animatePoint[1].visible = false;
      this.animatePoint[2].visible = false;
      this.stopAllAnimation();
  }

}
