import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import * as dian from '../sub_static/point.png';
import * as pen from '../sub_static/pen.png';
import * as M from '../sub_static/M.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { PointConfig } from '../../sqxddedy/services/SqxConfig';
import { Line } from '../../../../../src/three/component/Line';
import commonForThree from './CommonForThree';
import { TweenMax } from 'gsap';
import { Helper } from './Helper';
export class Sqx3DModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private controls: any;
  //拖动笔的图片
  private pen: any;
  private pen1: any;
  //M点图片
  private M: any;
  private M1: any;

  private slider1: any;
  private slider2: any;
  //左右两侧半轴拖动留下的点
  private slider3: any;
  private slider4: any;
  //F1和F2的拖动事件
  private dargControls1: any;
  private dargControls2: any;
  //左右两侧pen，pen1的拖动事件
  private dargControls3: any;
  private dargControls4: any;
  private lineHelper = new Line();
  //法线
  private normalline: any;
  //右侧的连接线
  private rightRedLine: any;
  private rightBlueLine: any;
  private leftRedLine: any;
  private leftBlueLine: any;
  //判断焦点是否移动给的参照点
  private endPoint = 50;
  //拼接公式，和焦点坐标
  private neatLineText1: any;
  private neatLineText2: any;
  private neatLineText3: any;
  private neatLineText4: any;
  private neatLineText5: any;
  private neatLineText6: any;
  private neatLineText7: any;
  private neatLineText8: any;
  private neatLineText9: any;
  private neatLineText10: any;
  private neatLineText11: any;
  private neatLineText12: any;
  private neatLineText13: any;
  private neatLineText14: any;
  private neatLineText15: any;
  private neatLineText16: any;
  private neatLineText17: any;
  private neatLineText18: any;
  private neatLineText19: any;
  //动画的起始点
  private startPoint: any;
  private startPoint1: any;
  //加入场景的点组
  private pointGroup: THREE.Mesh[] = [];
  //拼接公式，和焦点坐标的组
  private group = new THREE.Group;
  //将点加入组的变量
  private count = 0;
  //pen，pen1的动画
  animationPen: any;
  animationPen1: any;
  //遮挡函数线的白板
  private plan: any;
  private plan1: any;
  //白板的动画
  private animationplan: any;
  private animationplan1: any;
  //创建14条函数线
  private splineObjectLeft4: any;
  private splineObjectRight4: any;
  private splineObjectLeft5: any;
  private splineObjectRight5: any;
  private splineObjectLeft6: any;
  private splineObjectRight6: any;
  private splineObjectLeft7: any;
  private splineObjectRight7: any;
  private splineObjectLeft8: any;
  private splineObjectRight8: any;
  private splineObjectLeft9: any;
  private splineObjectRight9: any;
  private splineObjectLeft10: any;
  private splineObjectRight10: any;

  //控制点的创建
  private pointCtrl = false;

  private render = () => {
    requestAnimationFrame( this.render );
    this.renderer.render( this.scene,  this.camera );
  }
  /**
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
    this.createAxis();
   //创建连接的直线及法线
    this.createLine();
    //法线及焦点的公式
    this.createformula();
    //x正负轴pen pen1的拖动及创建
    this.createFunctionFormula();
    this.createFocus();
    this.functionLine();
    this.animationPlay();


    this.render();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
  }
  /**
   * 创建焦点坐标
   * 焦点坐标的拖动事件
   */
  createFocus() {
    this.createslider1();
    this.createslider2();
  }
  /**
   *笔和白板的播放动画
   */
  animationPlay() {
    this.animationPan();
    this.animationPan1();
    this.animationPlan();
    this.animationPlan1();
  }
  /**
   * 创建14条函数线加入场景中，
   * 名字后的数字对应以焦点对应
   */

  functionLine() {
    this.createFunctionLeftLine4();
     this.createFunctionRightLine4();
    this.createFunctionLeftLine5();
    this.createFunctionRightLine5();
    this.createFunctionLeftLine6();
    this.createFunctionRightLine6();
    this.createFunctionLeftLine7();
     this.createFunctionRightLine7();
     this.createFunctionLeftLine8();
     this.createFunctionRightLine8();
     this.createFunctionLeftLine9();
     this.createFunctionRightLine9();
     this.createFunctionLeftLine10();
     this.createFunctionRightLine10();
    this.displayLine();
  }
  /**
   * 初始化场景
   */
  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xFFFFFF );
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
      this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
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
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = true;
    this.controls.noPan = true;
    this.controls.noRotate = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }
  /**
   * 初始化光源
   */
  initLight(): void {

  }
  /**
   * 创建一个坐标系
   * 创建两块遮挡函数线的白板
   */
  createAxis() {
    const axis = (AxisUtil.createAxis({
      isTicks: true,
      AxisXNumArray: ['1' , '' , '', '', '5', '',  '', '', '', '10']
    } as any));
    axis.position.z = 5;
    this.scene.add(axis);
    const geometry = new THREE.PlaneGeometry( 120, 210, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    this.plan = new THREE.Mesh( geometry, material );
    this.plan1 = new THREE.Mesh( geometry, material );
    this.plan.position.x = 60;
    this.plan.position.z = 2;
    this.plan1.position.x = - 60;


    this.plan1.position.z = 2;
    this.scene.add( this.plan );
    this.scene.add( this.plan1 );

  }
  /**
   * 创建焦点F2在X轴正半轴拖动，限制焦点在坐标轴上拖动的位置，并在拖动焦点的过程中重新绘制连接的直线。
   * 把两侧焦点绑定在一起。当焦点移动时，pen，pen1和点M、M1回到初始位置，并影藏负半轴连接的直线。
   *
   */
  createslider1() {
    //创建焦点F2
    this.slider1 = ThreeUtil.createImg(10, 10, dian, 50, 0);
    const slider1 = ThreeUtil.createPoint(2, PointConfig.blueColor, 0, 0, 1);
    this.slider1.add(slider1);
    this.scene.add(this.slider1);
    this.slider1.position.z = 5;
    this.slider1.position.x = 50;
    //拖动事件
    this.dargControls1 = new dragcontrols([this.slider1], this.camera, this.renderer.domElement);
    this.dargControls1.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });
    // 在X正半轴上拖动
    this.dargControls1.addEventListener('drag', () => {
      //限制焦点F2取整拖拽范围是4--10
      if (this.slider1.position.x > 100) {
        this.slider1.position.x = 100;
        this.slider1.visible = true;
      } else if (this.slider1.position.x < 40) {
        this.slider1.position.x = 40;
        this.slider1.visible = true;
      }
      this.slider1.position.y = 0;
      this.slider1.position.x = Math.round(this.slider1.position.x / 10) * 10;
      this.slider2.position.x = -this.slider1.position.x;
      this.dragEvt();
    });
    this.dargControls1.addEventListener('dragend', () => {
      this.controls.enabled = true;
    });
  }

  /**
   * 创建焦点F1在X轴负半轴拖动，限制焦点在坐标轴上拖动的位置，并在拖动焦点的过程中重新绘制连接的直线。
   * 把两侧焦点绑定在一起。当焦点移动时，pen，pen1和点M、M1回到初始位置，并影藏负半轴连接的直线。
   */
  createslider2() {
    this.slider2 = ThreeUtil.createImg(10, 10, dian, -50, 0);
    const slider2 = ThreeUtil.createPoint(2, PointConfig.blueColor, 0, 0, 1);
    this.slider2.add(slider2);
    this.scene.add(this.slider2);
    this.slider2.position.z = 5;
    this.slider2.position.x = -50;
    //开始拖动
    this.dargControls2 = new dragcontrols([this.slider2], this.camera, this.renderer.domElement);
    this.dargControls2.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });
    // 在X轴上拖动  并给焦点一个范围，取整 并绑定两个焦点
    this.dargControls2.addEventListener('drag', () => {

      if (this.slider2.position.x < -100) {
        this.slider2.position.x = -100;
        this.slider2.visible = true;
      } else if (this.slider2.position.x > -40) {
        this.slider2.position.x = -40;
        this.slider2.visible = true;
      }
      this.slider2.position.y = 0;
      this.slider2.position.x = Math.round(this.slider2.position.x / 10) * 10;
      this.slider1.position.x = -this.slider2.position.x;
      this.dragEvt();
    });
    this.dargControls2.addEventListener('dragend', () => {
      this.controls.enabled = true;
      // this.dragendEvt();
    });
  }
  /**
   * 当焦点拖动的时，pen与pen1回到初始位置且pen自动隐藏
   * 所有连接的直线删除并重绘
   * M M1 回到初始位置
   * 在焦点变化时。pen对应方程位置发生改变
   */
  private dragEvt = () => {
    //当焦点拖动的pen，pen1回到初始位置
    this.pen1.material.opacity = 0.3;
    this.pen.material.opacity = 1;
    this.removeLine(this.rightRedLine);
    this.removeLine(this.rightBlueLine);
    this.pointCtrl = false;
    this.pen1.position.x = -30;
    this.pen1.position.y = 0;
    this.pen.position.y = 50;
    this.pen.position.x = 30 / Math.sqrt(Math.pow(this.slider1.position.x, 2) - 900) *
      Math.sqrt(Math.pow(this.slider1.position.x, 2) - 900 + Math.pow(this.pen.position.y, 2));
    this.M.position.x = this.pen.position.x + 23;
    this.M.position.y = this.pen.position.y + 10;
    this.M1.position.x =  this.pen1.position.x - 23;
    this.M1.position.y =  this.pen1.position.y + 10;
    this.leftBlueLine.visible = false;
    this.reRightRedLine();
    this.reRightBlueLine();

    //判断焦点是否移动
    if ( this.slider1.position.x === this.endPoint) {
      return;
    } else {
      this.stopLine();
      this.reRightRedLine();
      this.reRightBlueLine();
      this.reLeftRedLine();
      this.reLeftBlueLine();

      //判断焦点是否移动，当焦点移动时 笔要在对应的方程轨迹上 并删除点
      this.removeLine(this.leftRedLine);
      this.removeLine(this.leftBlueLine);
      this.reRightRedLine();
      this.reRightBlueLine();
      this.displayLine();

      this.removeLine(this.leftRedLine);
      this.removeLine(this.leftBlueLine);
      this.removeSlider(this.pointGroup);
    }
    this.slider1.position.x = Math.round(this.slider1.position.x / 10) * 10;
    this.slider2.position.x = -this.slider1.position.x;
    //准线随着焦点拖动
    this.normalline.position.x = (900 / this.slider1.position.x);
    //准线方程及焦点坐标 跟随焦点改变
    this.renewFormula();
    this.displayLine();
    (window as any).viewHandler.viewModel.$data.disable = false;
  }

  /**
   * 创建两侧拖动的pen，pen1；点M M1；
   * 用方程限定笔拖动的轨迹和拖动的范围；
   * 当笔的图片拖动时M，M1跟随笔拖动；
   * 在拖动的过程重绘连接的直线；
   * 当拖动一侧笔图片时，另外一侧设置为隐藏；
   * 适配连接的直线
   */
  createFunctionFormula() {
    //x正半轴拖动的笔
    this.pen = ThreeUtil.createImg(15, 15, pen, 50, 160 / 3);
    this.pen.position.z = 3;
    this.scene.add(this.pen);
    //创建点M的图片
    this.M = ThreeUtil.createImg(32, 8, M, 73, 63);
    this.M.position.z = 3;
    this.scene.add(this.M);
    this.M1 = ThreeUtil.createImg(32, 8, M, -48, 13);
    this.M1.position.z = 3;
    this.scene.add(this.M1);
    // 笔的拖动事件
    this.dargControls3 = new dragcontrols([this.pen], this.camera, this.renderer.domElement);
    this.dargControls3.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });

    this.dargControls3.addEventListener('drag', () => {
      this.dragRightEvt();
    });

    this.dargControls3.addEventListener('dragend', () => {
      this.controls.enabled = true;
      this.dragEndRightEvt();
    });

    //创建x负半轴的拖动笔
    this.pen1 = ThreeUtil.createImg(15, 15, pen, -30, 0);
    this.pen1.material.opacity = 0.3;
    this.pen1.position.z = 3;
    this.scene.add(this.pen1);
    // 笔的拖动事件
    this.dargControls4 = new dragcontrols([this.pen1], this.camera, this.renderer.domElement);
    this.dargControls4.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });
    // 笔的拖动事件
    this.dargControls4.addEventListener('drag', () => {
      //给笔在y轴上的拖动距离
      this.dragLeftEvt();
    });

    this.dargControls4.addEventListener('dragend', () => {
      this.controls.enabled = true;
     this.dragEndLeftEvt();
    });
  }

  /**
   * 将pen在x负半轴留下的点加入点组中，便于删除
   */
  private dragEndLeftEvt = () => {
    if ( this.pointCtrl ) {
      return;
    }
    this.slider4 = ThreeUtil.createPoint(1, PointConfig.blackPoint, 0, 0, 1);
    this.slider4.position.x = this.pen1.position.x;
    this.slider4.position.y = this.pen1.position.y;
    this.pointGroup.push(this.slider4);
    this.scene.add(this.pointGroup[this.count]);
    this.pointGroup[this.count].position.z = 3;
    this.count++;
  }
  /**
   *   将pen1在x正半轴留下的点加入点组中，便于删除
   */
  private dragEndRightEvt = () => {
    if ( this.pointCtrl ) {
      return;
    }
    this.slider3 = ThreeUtil.createPoint(1, PointConfig.blackPoint, 0, 0, 1);
    this.slider3.position.x = this.pen.position.x;
    this.slider3.position.y = this.pen.position.y;
    this.pointGroup.push(this.slider3);
    this.scene.add(this.pointGroup[this.count]);
    this.pointGroup[this.count].position.z = 3;
    this.count++;
  }
  /**
   * 当pen1 拖动时  pen设为隐藏
   * 设定pen1的移动范围及拖动轨迹
   * 当笔移动时，连接的直线自动重绘
   *
   */
  private dragLeftEvt = () => {
    this.pen.material.opacity = 0.3;
    this.pen1.material.opacity = 1;
    if (this.pen1.position.y >= 95) {
      this.pen1.position.y = 95;
      this.pen1.visible = true;
    } else if (this.pen1.position.y <= -95) {
      this.pen1.position.y = - 95;
      this.pen1.visible = true;
    }

    //确定左半轴笔的拖动轨迹
    this.pen1.position.x = - Math.sqrt( 920 * (1 + (Math.pow(this.pen1.position.y, 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider2.position.x, 2) - 920), 2))));
    //方程跟着笔移动，并删除并重新绘制连接的直线
    this.M1.position.x = this.pen1.position.x - 18;
    this.M1.position.y = this.pen1.position.y + 10;

    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.leftRedLine);
      this.leftRedLine = this.drawLine({ x: this.slider1.position.x, y: this.slider1.position.y, z: 1 },
        { x: this.pen1.position.x, y: this.pen1.position.y, z: 1 }, 2, '#FF4747');
      this.scene.add(this.leftRedLine);
      this.reLeftBlueLine();
    } else {
      this.removeLine(this.leftRedLine);
      this.leftRedLine = this.drawLine({ x: this.slider1.position.x, y: this.slider1.position.y, z: 1 },
        { x: this.pen1.position.x, y: this.pen1.position.y, z: 1 }, 650, '#FF4747');
      this.scene.add(this.leftRedLine);
      this.reLeftBlueLine();
    }
    //当左边的笔拖动后  右边的线隐藏
    this.rightRedLine.visible = false;
    this.rightBlueLine.visible = false;
  }
  /**
   * 当pen 拖动时  pen1设为隐藏
   * 设定pen的移动范围及拖动轨迹
   * 当笔移动时，连接的直线自动重绘
   *
   */
  private dragRightEvt = () => {
    this.pen1.material.opacity = 0.3;
    this.pen.material.opacity = 1;
    if (this.pen.position.y >= 95) {
      this.pen.position.y = 95;
      this.pen.visible = true;
    } else if (this.pen.position.y <= -95) {
      this.pen.position.y = - 95;
      this.pen.visible = true;
    }
    //确定拖动笔的轨迹，并从新画连接的直线
    this.pen.position.x = Math.sqrt(920 * (1 + (Math.pow(this.pen.position.y, 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))));
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({ x: this.slider1.position.x, y: this.slider1.position.y, z: 1 },
        { x: this.pen.position.x, y: this.pen.position.y, z: 1 }, 2, '#FF4747');
      this.scene.add(this.rightRedLine);
      this.reRightBlueLine();
    } else {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({ x: this.slider1.position.x, y: this.slider1.position.y, z: 1 },
        { x: this.pen.position.x, y: this.pen.position.y, z: 1 }, 650, '#FF4747');
      this.scene.add(this.rightRedLine);
      this.reRightBlueLine();
    }
    // 图片M跟着笔动
    this.M.position.x = this.pen.position.x + 23;
    this.M.position.y = this.pen.position.y + 10;
    this.leftRedLine.visible = false;
    this.leftBlueLine.visible = false;
  }
  /**
   * 创建法线、四条连接的直线，并进行屏幕适配。
   * 初始时显示正半轴的两条连接的直线。
   */
  createLine() {
    const line = new Line();
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.normalline = line.createLine({
        startPoint: new THREE.Vector3(0, 100, 1),
        endPoint: new THREE.Vector3(0, -100, 1),
        dashLine: true,
        lineWidth: 2,
        gapSize: 2,
        dashSize: 2
      });
      this.rightRedLine = line.createLine({
        startPoint: new THREE.Vector3(50, 0, 1),
        endPoint: new THREE.Vector3(50, 160 / 3, 1),
        lineWidth: 2,
        color: '#FF4747'
      });
      //准线连接拖动笔pen的蓝线
      this.rightBlueLine = line.createLine({
        startPoint: new THREE.Vector3(18, 160 / 3, 1),
        endPoint: new THREE.Vector3(50, 160 / 3, 1),
        lineWidth: 2,
        color: '#0199FF'
      });
      //焦点连接拖动笔pen1的红线
      this.leftRedLine = line.createLine({
        startPoint: new THREE.Vector3(50, 0, 2),
        endPoint: new THREE.Vector3(-30, 0, 2),
        lineWidth: 2,
        color: '#FF4747'
      });
      //准线连接拖动笔pen的蓝线
      this.leftBlueLine = line.createLine({
        startPoint: new THREE.Vector3(18, 0, 1),
        endPoint: new THREE.Vector3(-30, 0, 1),
        lineWidth: 2,
        color: '#0199FF'
      });
    } else {
      this.normalline = line.createLine({
        startPoint: new THREE.Vector3(0, 100, 1),
        endPoint: new THREE.Vector3(0, -100, 1),
        dashLine: true,
        lineWidth: 650,
        gapSize: 5,
        dashSize: 0.8
      });
      this.rightRedLine = line.createLine({
        startPoint: new THREE.Vector3(50, 0, 1),
        endPoint: new THREE.Vector3(50, 160 / 3, 1),
        lineWidth: 650,
        color: '#FF4747'
      });
      this.rightBlueLine = line.createLine({
        startPoint: new THREE.Vector3(18, 160 / 3, 1),
        endPoint: new THREE.Vector3(50, 160 / 3, 1),
        lineWidth: 650,
        color: '#0199FF'
      });
      // 焦点连接拖动笔pen1的红线
      this.leftRedLine = line.createLine({
        startPoint: new THREE.Vector3(50, 0, 2),
        endPoint: new THREE.Vector3(-30, 0, 2),
        lineWidth: 650,
        color: '#FF4747'
      });
      // 准线连接拖动笔pen的蓝线
      this.leftBlueLine = line.createLine({
        startPoint: new THREE.Vector3(18, 0, 1),
        endPoint: new THREE.Vector3(-30, 0, 1),
        lineWidth: 650,
        color: '#0199FF'
      });
    }
    this.normalline.position.x = 18;
    this.scene.add(this.normalline);
    this.scene.add(this.rightRedLine);
    this.scene.add(this.rightBlueLine);
    this.leftRedLine.visible = false;
    this.leftBlueLine.visible = false;
  }
  /**
   * 删除加入组中点的方法
   */
  /**
   * 拼接法线的方程式。两侧焦点的F坐标值。
   */
  createformula() {
    //创建准线公式
    this.neatLineText1 = commonForThree.createText(`x`);
    this.neatLineText2 = commonForThree.createText(`=`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText3 = commonForThree.createText(`9`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText4 = commonForThree.createText(`—`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText5 = commonForThree.createText(`5`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText1.position.set(22, -65, 0);
    this.neatLineText2.position.set(27, -66, 0);
    this.neatLineText3.position.set(34, -62, 0);
    this.neatLineText4.position.set(34, -65, 0);
    this.neatLineText5.position.set(34, -69, 0);
    //创建F2公式
    this.neatLineText6 = ThreeUtil.createNewRomanText('F', 70, 45, 0, '#000', 0.12);
    this.neatLineText18 = commonForThree.createText(`₂`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText7 = commonForThree.createText(`(`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText8 = commonForThree.createText(`5`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText9 = commonForThree.createText(`,`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText10 = commonForThree.createText(`0`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText11 = commonForThree.createText(`)`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText6.position.set(43, -7, 0);
    this.neatLineText18.position.set(45, -7, 0);
    this.neatLineText7.position.set(47, -7, 0);
    this.neatLineText8.position.set(52, -7, 0);
    this.neatLineText9.position.set(57, -7, 0);
    this.neatLineText10.position.set(60, -7, 0);
    this.neatLineText11.position.set(64, -7, 0);
    //创建F1公式
    this.neatLineText12 = ThreeUtil.createNewRomanText('F', 70, 45, 0, '#000', 0.12);
    this.neatLineText19 = commonForThree.createText(`₁`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText13 = commonForThree.createText(`(`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText14 = commonForThree.createText(`-5`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText15 = commonForThree.createText(`,`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText16 = commonForThree.createText(`0`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText17 = commonForThree.createText(`)`, [70, 45, 0], { 'color': '#000', 'isItalic': false, fontSize: 40 });
    this.neatLineText12.position.set(-60, -7, 0);
    this.neatLineText19.position.set(-58, -7, 0);
    this.neatLineText13.position.set(-56, -7, 0);
    this.neatLineText14.position.set(-51, -7, 0);
    this.neatLineText15.position.set(-46, -7, 0);
    this.neatLineText16.position.set(-43, -7, 0);
    this.neatLineText17.position.set(-40, -7, 0);

    this.group.add(this.neatLineText1);
    this.group.add(this.neatLineText2);
    this.group.add(this.neatLineText3);
    this.group.add(this.neatLineText4);
    this.group.add(this.neatLineText5);
    this.group.add(this.neatLineText6);
    this.group.add(this.neatLineText7);
    this.group.add(this.neatLineText8);
    this.group.add(this.neatLineText9);
    this.group.add(this.neatLineText10);
    this.group.add(this.neatLineText11);
    this.group.add(this.neatLineText18);
    this.group.add(this.neatLineText12);
    this.group.add(this.neatLineText13);
    this.group.add(this.neatLineText14);
    this.group.add(this.neatLineText15);
    this.group.add(this.neatLineText16);
    this.group.add(this.neatLineText17);
    this.group.add(this.neatLineText19);
    this.scene.add(this.group);
  }

  removeSlider(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      (arr[i] as any).geometry.dispose();
      (arr[i] as any).material.dispose();
      this.scene.remove((arr[i] as any));
    }
    this.pointGroup = [];
    this.count = 0;
  }
  /**
   * 删除连接直线的方法
   */
  removeLine(line: any) {
    line.geometry.dispose();
    line.material.dispose();
    this.scene.remove(line);
  }
  /**
   * 重新绘制直线的方法
   */
  drawLine(start: any, end: any, lineWidth: number, color: string): any {
    const line = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(start.x, start.y, start.z),
      endPoint: new THREE.Vector3(end.x, end.y, end.z),
      lineWidth: lineWidth,
      color: color
    });
    return line;
  }
  /**
   * 右侧笔的动画，动画结束时将留下的点组删除
   * 在动画执行中限制pen，M 的的轨迹
   * 动画执行从坐标轴的10到-10
   * 当动画执行时，一起执行两条来连接直线的动画
   * 右边动画执行结束，将正半轴的连接直线隐藏
   * 将pen1的坐标位置回复初始位置并隐藏
   * 且重绘两条连接的直线；
   * 同步执行白板的动画并且动画结束后自动执行左侧pen1的动画
   * 并将pen1设为显示
   */
  animationPan() {
    // 删除笔拖动留下的点组
    this.removeSlider(this.pointGroup);
    const tween = {
      y: 95,
    };
    this.startPoint = new THREE.Vector3( (Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))))), 100, 0);
    let endPoint = new THREE.Vector3((Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))))), 100, 0);
    this.animationPen = TweenMax.to(tween, 3, {
      y: -95,
      onUpdate: () => {
        this.pen.position.y = tween.y;
        this.pen.position.x =  (Math.sqrt(920 * (1 + (Math.pow( tween.y , 2) /
          Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2)))));
        endPoint = new THREE.Vector3((Math.sqrt(920 * (1 + (Math.pow( tween.y , 2) /
          Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))))), tween.y, 0);
        this.startPoint = endPoint;
        if ((window as any).viewHandler.viewModel.$data.isIOS) {
          this.removeLine(this.rightRedLine);
          this.rightRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
            {x: this.pen.position.x, y: this.pen.position.y, z: 1}, 2, '#FF4747');
          this.scene.add(this.rightRedLine);
          this.reRightBlueLine();
        } else {
          this.removeLine(this.rightRedLine);
          this.rightRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
            {x: this.pen.position.x, y: this.pen.position.y, z: 1}, 650, '#FF4747');
          this.scene.add(this.rightRedLine);
          this.reRightBlueLine();
        }
        this.M.position.x = this.pen.position.x + 23;
        this.M.position.y = this.pen.position.y + 10;
        this.leftRedLine.visible = false;
        this.leftBlueLine.visible = false;
        this.pen1.position.x = - 30;
        this.pen1.position.y = 0;
        this.pen1.material.opacity = 0.3;
      },
      onComplete: () => {
        this.rightRedLine.visible = false;
        this.rightBlueLine.visible = false;
        this.animationPen1.play();
        this.animationplan1.play();
        this.pen1.material.opacity = 1;
        this.pointCtrl = true;
      },
      paused: true
    });
  }
  /**
   * 当右侧笔的动画结束后。左侧动画自动执行
   * 左侧白板动画同步执行；
   * 在动画执行中限制pen1，M1 的的轨迹
   * 动画执行从坐标轴的10到-10
   * 当动画执行时，一起执行两条来连接直线的动画
   * 且重绘两条连接的直线；
   * 显示负半轴两条连接的直线
   */
  animationPan1() {
    const tween = {
      y: 95,
    };
    this.startPoint1 = new THREE.Vector3(-(Math.sqrt(920 * (1 + (Math.pow( 100 , 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider2.position.x, 2) - 920), 2))))), 100, 0);
    let endPoint = new THREE.Vector3(-(Math.sqrt(920 * (1 + (Math.pow( 100 , 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider2.position.x, 2) - 920), 2))))), 100, 0);
    this.animationPen1 = TweenMax.to(tween, 3, {
      y: -95,
      onUpdate: () => {
        this.pen1.position.y = tween.y;
        this.pen1.position.x = -(Math.sqrt(920 * (1 + (Math.pow( tween.y , 2) /
          Math.pow (Math.sqrt(Math.pow(this.slider2.position.x, 2) - 920), 2)))));
        endPoint = new THREE.Vector3(-(Math.sqrt(920 * (1 + (Math.pow( tween.y , 2) /
          Math.pow (Math.sqrt(Math.pow(this.slider2.position.x, 2) - 920), 2))))), tween.y, 0);
        this.startPoint1 = endPoint;
        if ((window as any).viewHandler.viewModel.$data.isIOS) {
          this.removeLine(this.leftRedLine);
          this.leftRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
            {x: this.pen1.position.x, y: this.pen1.position.y, z: 1}, 2, '#FF4747');
          this.scene.add(this.leftRedLine);
          this.reLeftBlueLine();
        } else {
          this.removeLine(this.leftRedLine);
          this.leftRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
            {x: this.pen1.position.x, y: this.pen1.position.y, z: 1}, 650, '#FF4747');
          this.scene.add(this.leftRedLine);
          this.reLeftBlueLine();
        }
        this.M1.position.x =  this.pen1.position.x - 23;
        this.M1.position.y =  this.pen1.position.y + 10;
      },
      onComplete: () => {
        this.removeSlider(this.pointGroup);
        this.pointCtrl = true;
      },
      paused: true
    });
  }
  /**
   * 白板动画从y值为0开始执行至y值等于-200结束
   */
  animationPlan() {
    const tween = {
      y: 5,
    };
    this.animationplan = TweenMax.to(tween, 3, {
      y: -200,
      onUpdate: () => {
        this.plan.position.y = tween.y;
      },
      paused: true
    });
  }
  /**
   * 白板动画从y值为0开始执行至y值等于-200结束
   */
  animationPlan1() {
    const tween = {
      y: 5,
    };
    this.animationplan1 = TweenMax.to(tween, 3, {
      y: -200,
      onUpdate: () => {
        this.plan1.position.y = tween.y;
      },
      paused: true
    });

  }
  /**
   * 动画播放，并判断当时焦点的位置
   * 根据焦点的位置 显示对应的直线
   */
  play() {
    this.animationPen.play();
    this.animationplan.play();
    if ( this.slider1.position.x === 40) {
      this.splineObjectLeft4.visible = true;
      this.splineObjectRight4.visible = true;
    } else if (this.slider1.position.x === 50) {
      this.splineObjectLeft5.visible = true;
      this.splineObjectRight5.visible = true;
    } else if (this.slider1.position.x === 60) {
      this.splineObjectLeft6.visible = true;
      this.splineObjectRight6.visible = true;
    } else if (this.slider1.position.x === 70) {
      this.splineObjectLeft7.visible = true;
      this.splineObjectRight7.visible = true;
    } else if (this.slider1.position.x === 80) {
      this.splineObjectLeft8.visible = true;
      this.splineObjectRight8.visible = true;
    } else if (this.slider1.position.x === 90) {
      this.splineObjectLeft9.visible = true;
      this.splineObjectRight9.visible = true;
    } else if (this.slider1.position.x === 100) {
      this.splineObjectLeft10.visible = true;
      this.splineObjectRight10.visible = true;
    }
    this.startPoint = new THREE.Vector3((Math.sqrt(920 * (1 + (Math.pow( 100 , 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))))), 100, 0);
    this.startPoint1 = new THREE.Vector3( - (Math.sqrt(920 * (1 + (Math.pow( 100 , 2) /
      Math.pow (Math.sqrt(Math.pow(this.slider1.position.x, 2) - 920), 2))))), 100, 0);
  }
  /**
   * 将所有的直线设为隐藏
   */
  displayLine() {
    this.splineObjectLeft4.visible = false;
    this.splineObjectRight4.visible = false;
    this.splineObjectLeft5.visible = false;
    this.splineObjectRight5.visible = false;
    this.splineObjectLeft6.visible = false;
    this.splineObjectRight6.visible = false;
    this.splineObjectLeft7.visible = false;
    this.splineObjectRight7.visible = false;
    this.splineObjectLeft8.visible = false;
    this.splineObjectRight8.visible = false;
    this.splineObjectLeft9.visible = false;
    this.splineObjectRight9.visible = false;
    this.splineObjectLeft10.visible = false;
    this.splineObjectRight10.visible = false;
  }
  /**
   * 结束动画的方法
   */
  stopLine() {
    this.animationPen.progress(0);
    this.animationPen.pause();
    this.animationplan.progress(0);
    this.animationplan.pause();
    this.animationPen1.progress(0);
    this.animationPen1.pause();
    this.animationplan1.progress(0);
    this.animationplan1.pause();
  }
  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  /**
   * 重绘以pen为起点连接焦点的红线
   * 并适配IOS系统
   */
  reRightRedLine() {
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({ x: this.pen.position.x, y: this.pen.position.y, z: 1 },
        { x: this.slider1.position.x, y: this.slider1.position.y, z: 1 }, 2, '#FF4747');
      this.scene.add(this.rightRedLine);
    } else {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({ x: this.pen.position.x, y: this.pen.position.y, z: 1 },
        { x: this.slider1.position.x, y: this.slider1.position.y, z: 1 }, 650, '#FF4747');
      this.scene.add(this.rightRedLine);
    }
  }
  /**
   * 重绘以法线为起点连接pen的蓝线
   * 并适配IOS系统
   */
  reRightBlueLine() {
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.rightBlueLine);
      this.rightBlueLine = this.drawLine({ x: this.normalline.position.x, y: this.pen.position.y, z: 1 },
        { x: this.pen.position.x, y: this.pen.position.y, z: 1 }, 2, '#0199FF');
      this.scene.add(this.rightBlueLine);
    } else {
      this.removeLine(this.rightBlueLine);
      this.rightBlueLine = this.drawLine({ x: this.normalline.position.x, y: this.pen.position.y, z: 1 },
        { x: this.pen.position.x, y: this.pen.position.y, z: 1 }, 650, '#0199FF');
      this.scene.add(this.rightBlueLine);
    }
  }
  /**
   * 重绘以pen1为起点连接焦点的红线
   * 并适配IOS系统
   */
  reLeftRedLine() {
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.leftRedLine);
      this.leftRedLine = this.drawLine({ x: this.pen1.position.x, y: this.pen1.position.y, z: 1 },
        { x: this.slider1.position.x, y: this.slider1.position.y, z: 1 }, 2, '#FF4747');
      this.scene.add(this.leftRedLine);
    } else {
      this.removeLine(this.leftRedLine);
      this.leftRedLine = this.drawLine({ x: this.pen1.position.x, y: this.pen1.position.y, z: 1 },
        { x: this.slider1.position.x, y: this.slider1.position.y, z: 1 }, 650, '#FF4747');
      this.scene.add(this.leftRedLine);
    }
  }
  /**
   * 重绘以法线为起点连接pen1的蓝线
   * 并适配IOS系统
   */
  reLeftBlueLine() {
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.leftBlueLine);
      this.leftBlueLine = this.drawLine({ x: this.normalline.position.x, y: this.pen1.position.y, z: 1 },
        { x: this.pen1.position.x, y: this.pen1.position.y, z: 1 }, 2, '#0199FF');
      this.scene.add(this.leftBlueLine);
    } else {
      this.removeLine(this.leftBlueLine);
      this.leftBlueLine = this.drawLine({ x: this.normalline.position.x, y: this.pen1.position.y, z: 1 },
        { x: this.pen1.position.x, y: this.pen1.position.y, z: 1 }, 650, '#0199FF');
      this.scene.add(this.leftBlueLine);
    }
  }
  /**
   * 以后名字后的数字为焦点位置创建的函数线
   * 左右两侧共14条函数线
   */
  createFunctionLeftLine4() {
    this.splineObjectLeft4 = Helper.createFunline(Helper.createFunctionPoint4());
    this.scene.add(this.splineObjectLeft4);
    this.splineObjectLeft4.visible = false;
  }
  createFunctionRightLine4() {
    this.splineObjectRight4 = Helper.createFunline(Helper.createFunctionPoint04());
    this.scene.add( this.splineObjectRight4);
    this.splineObjectRight4.visible = false;
  }
  createFunctionLeftLine5() {
    this.splineObjectLeft5 = Helper.createFunline(Helper.createFunctionPoint5());
    this.scene.add(this.splineObjectLeft5);
    this.splineObjectLeft5.visible = false;
  }
  createFunctionRightLine5() {
    this.splineObjectRight5 = Helper.createFunline(Helper.createFunctionPoint05());
    this.scene.add(this.splineObjectRight5);
    this.splineObjectRight5.visible = false;
  }
  createFunctionLeftLine6() {
    this.splineObjectLeft6 = Helper.createFunline(Helper.createFunctionPoint6());
    this.scene.add( this.splineObjectLeft6);
    this.splineObjectLeft6.visible = false;
  }
  createFunctionRightLine6() {
    this.splineObjectRight6 = Helper.createFunline(Helper.createFunctionPoint06());
    this.scene.add(this.splineObjectRight6);
    this.splineObjectRight6.visible = false;
  }
  createFunctionLeftLine7() {
    this.splineObjectLeft7 = Helper.createFunline(Helper.createFunctionPoint7());
    this.scene.add(this.splineObjectLeft7);
    this.splineObjectLeft7.visible = false;
  }
  createFunctionRightLine7() {
    this.splineObjectRight7 = Helper.createFunline(Helper.createFunctionPoint07());
    this.scene.add(this.splineObjectRight7);
    this.splineObjectRight7.visible = false;
  }
  createFunctionLeftLine8() {
    this.splineObjectLeft8 = Helper.createFunline(Helper.createFunctionPoint8());
    this.scene.add(this.splineObjectLeft8);
    this.splineObjectLeft8.visible = false;
  }
  createFunctionRightLine8() {
    this.splineObjectRight8 = Helper.createFunline(Helper.createFunctionPoint08());
    this.scene.add(this.splineObjectRight8);
    this.splineObjectRight8.visible = false;
  }
  createFunctionLeftLine9() {
    this.splineObjectLeft9 = Helper.createFunline(Helper.createFunctionPoint9());
    this.scene.add(this.splineObjectLeft9);
    this.splineObjectLeft9.visible = false;
  }
  createFunctionRightLine9() {
    this.splineObjectRight9 = Helper.createFunline(Helper.createFunctionPoint09());
    this.scene.add( this.splineObjectRight9);
    this.splineObjectRight9.visible = false;
  }
  createFunctionLeftLine10() {
    this.splineObjectLeft10 = Helper.createFunline(Helper.createFunctionPoint10());
    this.scene.add( this.splineObjectLeft10);
    this.splineObjectLeft10.visible = false;
  }
  createFunctionRightLine10() {
    this.splineObjectRight10 = Helper.createFunline(Helper.createFunctionPoint010());
    this.scene.add( this.splineObjectRight10);
    this.splineObjectRight10.visible = false;
  }
  /**
   * 法线，两侧焦点位置公式
   *
   */
  renewFormula() {
    this.neatLineText8.text = this.slider1.position.x / 10;
    this.neatLineText14.text = this.slider2.position.x / 10;
    this.neatLineText1.position.x = this.normalline.position.x + 4;
    this.neatLineText2.position.x = this.normalline.position.x + 9;
    this.neatLineText3.position.x = this.normalline.position.x + 16;
    this.neatLineText4.position.x = this.normalline.position.x + 16;
    this.neatLineText5.position.x = this.normalline.position.x + 16;
    this.neatLineText5.text = this.slider1.position.x / 10;
    this.neatLineText6.position.x = this.slider1.position.x - 7;
    this.neatLineText18.position.x = this.slider1.position.x - 5;
    this.neatLineText7.position.x = this.slider1.position.x - 3;
    this.neatLineText8.position.x = this.slider1.position.x + 2;
    this.neatLineText9.position.x = this.slider1.position.x + 7;
    this.neatLineText10.position.x = this.slider1.position.x + 10;
    this.neatLineText11.position.x = this.slider1.position.x + 14;
    this.neatLineText8.text = this.slider1.position.x / 10;
    this.neatLineText12.position.x = this.slider2.position.x - 10;
    this.neatLineText19.position.x = this.slider2.position.x - 8;
    this.neatLineText13.position.x = this.slider2.position.x - 6;
    this.neatLineText14.position.x = this.slider2.position.x - 1;
    this.neatLineText15.position.x = this.slider2.position.x + 4;
    this.neatLineText16.position.x = this.slider2.position.x + 7;
    this.neatLineText17.position.x = this.slider2.position.x + 10;
  }
  /**
   * 重置方法
   * 结束动画并将坐标轴左边半侧的动画隐藏；
   * pen1回到初始位置并隐藏；
   * pen回到初始位置；
   * 两个焦点回到初始位置；
   */
  reset() {
    //暂停动画
    this.stopLine();
    //隐藏直线
    this.displayLine();
    this.slider1.position.x = 50;
    this.slider2.position.x = -50;
    this.pen.position.x = 50;
    this.pen.position.y = 160 / 3;
    this.pen1.position.x = - 30;
    this.pen1.position.y = 0;
    this.pen1.material.opacity = 0.1;
    // 图片M跟着笔动
    this.M.position.x = this.pen.position.x + 23;
    this.M.position.y = this.pen.position.y + 10;

    this.M1.position.x =  this.pen1.position.x - 23;
    this.M1.position.y =  this.pen1.position.y + 10;
    this.normalline.position.x = 900 / this.slider1.position.x;
    //屏幕适配
    if ((window as any).viewHandler.viewModel.$data.isIOS) {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
        {x: this.pen.position.x, y: this.pen.position.y, z: 1}, 2, '#FF4747');
      this.scene.add(this.rightRedLine);
      this.removeLine(this.rightBlueLine);
      this.rightBlueLine = this.drawLine({x: this.pen.position.x, y: this.pen.position.y, z: 1},
        {x: this.normalline.position.x, y: this.pen.position.y , z: 1}, 2, '#0199FF');
      this.scene.add(this.rightBlueLine);
    } else {
      this.removeLine(this.rightRedLine);
      this.rightRedLine = this.drawLine({x: this.slider1.position.x, y: this.slider1.position.y , z: 1},
        {x: this.pen.position.x, y: this.pen.position.y, z: 1}, 650, '#FF4747');
      this.scene.add(this.rightRedLine);
      this.removeLine(this.rightBlueLine);
      this.rightBlueLine = this.drawLine({x: this.pen.position.x, y: this.pen.position.y, z: 1},
        {x: this.normalline.position.x, y: this.pen.position.y , z: 1}, 650, '#0199FF');
      this.scene.add(this.rightBlueLine);
    }
    this.leftRedLine.visible = false;
    this.leftBlueLine.visible = false;
    this.removeSlider(this.pointGroup);
    //  准线公式 和准线一起动
    this.renewFormula();
    this.splineObjectLeft5.visible = false;
    this.splineObjectRight5.visible = false;
    this.pointCtrl = false;
    (window as any).viewHandler.viewModel.$data.disable = false;

  }
}
