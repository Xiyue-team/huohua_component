import * as THREE from 'three';
import { Mesh, PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import * as point from '../sub_static/point.png';
import * as rText from '../sub_static/rText.png';
import * as qText from '../sub_static/qText.png';
import * as rightAngleImg from '../sub_static/rightAngle.png';
import { MathHelper } from '../../../../../src/util/MathHelper';
import { Linear, TweenMax } from 'gsap';
import { CurveLine } from './CurveLine';

export class Jxjhbs3DModel extends ThreeBase {

  private controls: any;
  private line: any;
  private helper = new MathHelper();
  private dashCircle: any;
  private blackColor = '#000000';
  private redColor = '#FF0000';
  private blueColor = '#0091FF';
  private movePointA: Mesh;
  private movePointB: Mesh;
  private segmentPA: Mesh;
  private segmentPB: Mesh;
  public segmentAB: Mesh;
  public segmentPQ: Mesh;
  private dashLineQA: Mesh;
  private dashLineQB: Mesh;
  public dashLineOA: Mesh;
  public dashLineOR: Mesh;
  public group = new THREE.Group();
  private rightAnglesImg: Mesh;
  public innerRightAngleImg: Mesh;
  private qPoint: Mesh;
  public rPoint: Mesh;
  private qText: Mesh;
  private dashSize = 4;
  public movePointArray: any = [];
  public count = 0;
  public animation: any;

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
    this.helper = new MathHelper();
    this.initAxis();
    this.initDefaultLine();
    this.initDragPoints();
    this.initDragEventForPointA();
    this.initDragEventForPointB();
    this.initVerticalLines();
    this.initDefaultDashLines();
    this.initDashCircleLine();
    this.drawEllipseAnimation();
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

  //加载初始圆形线
  initDefaultLine() {
      const circle = this.createCircleLine(60);
      this.scene.add(circle);
  }

  //添加P点(40, 0) A点(12,aY) B点(-43,bY)
  initDragPoints() {
      const pPoint = ThreeUtil.createPoint(1.5, this.redColor, 40, 0, 1);
      const textP = ThreeUtil.createNewRomanText('P', 2, -3, 0, this.blackColor, 0.15);
      const coordText = ThreeUtil.createNormalText('(4, 0)', 0, -12, 0, this.blackColor, 0.15);
      pPoint.add(textP);
      pPoint.add(coordText);
      this.scene.add(pPoint);

      this.movePointA = ThreeUtil.createImg(14, 14, point, 12, Math.sqrt(Math.pow(60, 2) - Math.pow(12, 2)), 1);
      const textA = ThreeUtil.createNewRomanText('A', 6, 10, 0, this.blackColor, 0.15);
      this.movePointA.add(textA);
      this.scene.add(this.movePointA);
      (this.movePointA as any).on('mouseover', () => {
        document.body.style.cursor = 'pointer';
      });
      (this.movePointA as any).on('mouseout', () => {
        document.body.style.cursor = 'auto';
      });

      this.movePointB = ThreeUtil.createImg(14, 14, point, -43, -Math.sqrt(Math.pow(60, 2) - Math.pow(-43, 2)), 1);
      const textB = ThreeUtil.createNewRomanText('B', -8, -6, 0, this.blackColor, 0.15);
      this.movePointB.add(textB);
      this.scene.add(this.movePointB);
      (this.movePointB as any).on('mouseover', () => {
        document.body.style.cursor = 'pointer';
      });
      (this.movePointB as any).on('mouseout', () => {
        document.body.style.cursor = 'auto';
      });

      //初始线段PA, PB
      this.segmentPA = this.createLine(12, this.movePointA.position.y, 40, 0, this.blackColor, false, this.dashSize);
      this.segmentPB = this.createLine(-43, this.movePointB.position.y, 40, 0, this.blackColor, false, this.dashSize);
      this.segmentAB = this.createLine(12, this.movePointA.position.y, -43, this.movePointB.position.y,
        this.blueColor, false, this.dashSize);

      //虚线R点、OA及OR
      this.dashLineOA = this.createLine(12, this.movePointA.position.y, 0, 0, this.redColor, true, this.dashSize);
      this.rPoint = ThreeUtil.createPoint(1.5, this.redColor, (12 - 43) / 2, (this.movePointA.position.y +
        this.movePointB.position.y) / 2, 1);

      const rTextImg = ThreeUtil.createImg(69 * 0.4, 19 * 0.4, rText, 10, 10, 0);
      this.rPoint.add(rTextImg);
      this.scene.add(this.rPoint);
      this.dashLineOR = this.createLine(0, 0, (12 - 43) / 2, (this.movePointA.position.y +
        this.movePointB.position.y) / 2, this.redColor, true, 10);

      this.segmentAB.visible = false;
      this.dashLineOA.visible = false;
      this.rPoint.visible = false;
      this.dashLineOR.visible = false;
  }

  //A点绑定拖动事件
  initDragEventForPointA() {
    const dragPointAControls = new dragcontrols([this.movePointA], this.camera, this.renderer.domElement);
    dragPointAControls.addEventListener('drag', () => {
      //限定A点拖动轨迹
      this.movePointA.position.x = this.movePointA.position.x <= 60 ? this.movePointA.position.x : 60;
      this.movePointA.position.x = this.movePointA.position.x >= -60 ? this.movePointA.position.x : -60;
      this.movePointA.position.y = this.movePointA.position.y >= 0 ? Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointA.position.x, 2))
        : -Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointA.position.x, 2));

      this.deleteLine(this.segmentPA);
      this.segmentPA = this.createLine(this.movePointA.position.x, this.movePointA.position.y,
        40, 0, this.blackColor, false, this.dashSize);

      //改变B点位置
      const slopePA = (this.movePointA.position.y - 0) / (this.movePointA.position.x - 40);
      let slopePAAngle = Math.atan(slopePA) * 180 / Math.PI;
      slopePAAngle = slopePAAngle >= 0 ? slopePAAngle : (slopePAAngle + 180);
      switch (Number.parseInt(slopePAAngle.toFixed(0))) {
        case 0:
          //此时PB直线方程为x=40
          this.movePointB.position.x = 40;
          this.movePointB.position.y = this.movePointA.position.x < 40 ? -Math.sqrt(Math.pow(60, 2) - Math.pow(40, 2))
            : Math.sqrt(Math.pow(60, 2) - Math.pow(40, 2));

          //直角符号位置
          this.rightAnglesImg.rotation.z = this.movePointB.position.y >= 0 ? Math.atan(slopePA) - Math.PI / 2
            : Math.atan(slopePA) + Math.PI / 2;
          break;
        case 90:
          this.movePointB.position.y = 0;
          this.movePointB.position.x = this.movePointA.position.y > 0 ? -60 : 60;
          break;
        default:
          this.movePointB.position.x = this.movePointA.position.y < 0 ? MathHelper.getFunctionResult((1 + (1 / Math.pow(slopePA, 2))),
            -80 / Math.pow(slopePA, 2), (Math.pow(40, 2) / Math.pow(slopePA, 2)) - Math.pow(60, 2)).x1 :
            MathHelper.getFunctionResult((1 + (1 / Math.pow(slopePA, 2))), -80 / Math.pow(slopePA, 2),
              (Math.pow(40, 2) / Math.pow(slopePA, 2)) - Math.pow(60, 2)).x2;

          this.movePointB.position.y = this.movePointA.position.x <= 40 ? -Math.sqrt(Math.pow(60, 2)
            - Math.pow(this.movePointB.position.x, 2)) : Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointB.position.x, 2));

          //直角符号位置
          this.rightAnglesImg.rotation.z = this.movePointB.position.y >= 0 ? Math.atan(slopePA) - Math.PI / 2
            : Math.atan(slopePA) + Math.PI / 2;
          break;
      }

      //重绘PB
      this.deleteLine(this.segmentPB);
      this.segmentPB = this.createLine(this.movePointB.position.x, this.movePointB.position.y,
        40, 0, this.blackColor, false, this.dashSize);

      //重绘
      this.reDrawLines();
    });

    dragPointAControls.addEventListener('dragend', () => {
      if ((window as any).viewHandler.viewModel.$data.ctrl3) {
        return ;
      }
      if ((window as any).viewHandler.viewModel.$data.drawColor === false) {
        const dashCirclePoint = ThreeUtil.createPoint(1, '#000000', this.qPoint.position.x, this.qPoint.position.y, 1);
        this.movePointArray.push(dashCirclePoint);
        this.scene.add(this.movePointArray[this.count]);
        this.count++;
      }

      //重绘直线AB,PQ,虚线OR,OA
      this.deleteLine(this.dashLineOR);
      this.dashLineOR = this.createLine(0, 0, this.rPoint.position.x, this.rPoint.position.y, this.redColor, true, 7);

      switch (true) {
        case !(window as any).viewHandler.viewModel.$data.ctrl1:
          this.dashLineOR.visible = false;
          break;
        case !(window as any).viewHandler.viewModel.$data.ctrl2:
          this.dashLineOR.visible = true;
          break;
        case !(window as any).viewHandler.viewModel.$data.ctrl3:
          this.dashLineOR.visible = true;
          break;
      }
    });
  }

  //B点绑定拖动事件
  initDragEventForPointB() {
    const dragPointAControls = new dragcontrols([this.movePointB], this.camera, this.renderer.domElement);
    dragPointAControls.addEventListener('drag', () => {
      //限定A点拖动轨迹
      this.movePointB.position.x = this.movePointB.position.x <= 60 ? this.movePointB.position.x : 60;
      this.movePointB.position.x = this.movePointB.position.x >= -60 ? this.movePointB.position.x : -60;

      this.movePointB.position.y = this.movePointB.position.y >= 0 ? Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointB.position.x, 2))
        : -Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointB.position.x, 2));

      this.deleteLine(this.segmentPB);
      this.segmentPB = this.createLine(this.movePointB.position.x, this.movePointB.position.y, 40, 0,
        this.blackColor, false, this.dashSize);

      //改变A点位置
      const slopePB = (this.movePointB.position.y - 0) / (this.movePointB.position.x - 40);
      let slopePBAngle = Math.atan(slopePB) * 180 / Math.PI;

      slopePBAngle = slopePBAngle >= 0 ? slopePBAngle : (slopePBAngle + 180);
      switch (Number.parseInt(slopePBAngle.toFixed(0))) {
        case 0:
          //此时PA直线方程为x=40
          this.movePointA.position.x = 40;
          this.movePointA.position.y = this.movePointB.position.x >= 40 ? -Math.sqrt(Math.pow(60, 2) - Math.pow(40, 2))
            : Math.sqrt(Math.pow(60, 2) - Math.pow(40, 2));

          //直角符号位置
          this.rightAnglesImg.rotation.z = this.movePointA.position.y >= 0 ? Math.atan(slopePB) : Math.atan(slopePB) + Math.PI;
          break;
        case 90:
          this.movePointA.position.y = 0;
          this.movePointA.position.x = this.movePointB.position.y >= 0 ? 60 : -60;
          break;
        default:
          this.movePointA.position.x = this.movePointB.position.y >= 0 ? MathHelper.getFunctionResult((1 + (1 / Math.pow(slopePB, 2))),
            -80 / Math.pow(slopePB, 2), (Math.pow(40, 2) / Math.pow(slopePB, 2)) - Math.pow(60, 2)).x1 :
            MathHelper.getFunctionResult((1 + (1 / Math.pow(slopePB, 2))), -80 / Math.pow(slopePB, 2),
            (Math.pow(40, 2) / Math.pow(slopePB, 2)) - Math.pow(60, 2)).x2;

          this.movePointA.position.y = this.movePointB.position.x > 40 ? -Math.sqrt(Math.pow(60, 2)
            - Math.pow(this.movePointA.position.x, 2)) : Math.sqrt(Math.pow(60, 2) - Math.pow(this.movePointA.position.x, 2));

          //直角符号位置
          this.rightAnglesImg.rotation.z = this.movePointA.position.y >= 0 ? Math.atan(slopePB) : Math.atan(slopePB) + Math.PI;
          break;
      }

      //重绘PA
      this.deleteLine(this.segmentPA);
      this.segmentPA = this.createLine(this.movePointA.position.x, this.movePointA.position.y,
        40, 0, this.blackColor, false, this.dashSize);

      //重绘
      this.reDrawLines();
    });

    dragPointAControls.addEventListener('dragend', () => {
      if ((window as any).viewHandler.viewModel.$data.ctrl3) {
          return ;
      }
      if ((window as any).viewHandler.viewModel.$data.drawColor === false) {
        const dashCirclePoint = ThreeUtil.createPoint(1, '#000000', this.qPoint.position.x, this.qPoint.position.y, 1);
        this.movePointArray.push(dashCirclePoint);
        this.scene.add(this.movePointArray[this.count]);
        this.count++;
      }

      //重绘直线AB,PQ,虚线OR,OA
      this.deleteLine(this.dashLineOR);
      this.dashLineOR = this.createLine(0, 0, this.rPoint.position.x, this.rPoint.position.y, this.redColor, true, 7);

      switch (true) {
        case !(window as any).viewHandler.viewModel.$data.ctrl1:
          this.dashLineOR.visible = false;
          break;
        case !(window as any).viewHandler.viewModel.$data.ctrl2:
          this.dashLineOR.visible = true;
          break;
        case !(window as any).viewHandler.viewModel.$data.ctrl3:
          this.dashLineOR.visible = true;
          break;
      }
    });
  }

  //绘制初始直角符号
  initVerticalLines() {
        this.rightAnglesImg = ThreeUtil.createImg(34 * 0.4, 34 * 0.4, rightAngleImg, 40, 0, 0);
        this.rightAnglesImg.rotation.z = Math.atan((this.movePointB.position.y - 0) / (this.movePointB.position.x - 40));
        this.scene.add(this.rightAnglesImg);

        this.innerRightAngleImg = ThreeUtil.createImg(34 * 0.4, 34 * 0.4, rightAngleImg, this.rPoint.position.x, this.rPoint.position.y, 0);
        this.innerRightAngleImg.rotation.z = Math.atan((this.rPoint.position.y - 0) / (this.rPoint.position.x - 0)) - Math.PI / 2;
        this.innerRightAngleImg.visible = false;
        this.scene.add(this.innerRightAngleImg);
  }

  //绘制初始虚线QA，QB
  initDefaultDashLines() {
      this.qPoint = this.getInterSectionPoint(-43, this.movePointB.position.y, 12, this.movePointA.position.y);

      this.qText = ThreeUtil.createImg(82 * 0.4, 22 * 0.4, qText, this.qPoint.position.x - 15, this.qPoint.position.y + 5, 0);
      this.scene.add(this.qText);

      //虚线QA
      this.dashLineQA = this.createLine(this.qPoint.position.x, this.qPoint.position.y, 12,
        this.movePointA.position.y, this.redColor, true, this.dashSize);

      //虚线QB
      this.dashLineQB = this.createLine(this.qPoint.position.x, this.qPoint.position.y, -43,
        this.movePointB.position.y, this.redColor, true, this.dashSize);

      //直线PQ
      this.segmentPQ = this.createLine(40, 0, this.qPoint.position.x, this.qPoint.position.y, this.blueColor, false, this.dashSize);
      this.segmentPQ.visible = false;
  }

  //绘制默认虚线圆
  initDashCircleLine() {
    const radius = Math.sqrt(Math.pow(this.qPoint.position.x, 2) + Math.pow(this.qPoint.position.y, 2)) + 1.8;
    const curveHelper = new CurveLine();
    const curve = new THREE.EllipseCurve(
      0,  0,
      radius, radius,
      Math.PI * 16 / 17,   2 * Math.PI + Math.PI * 16 / 17,
      true,
      0
    );
    const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(200));
    this.dashCircle = curveHelper.createCurveLine({pointList: geometry.vertices,
        color: '#9B9B9B', lineWidth: 1, style: 1,  dashArray: 0.03});
    (this.dashCircle.geometry as any).setDrawRange( 0, 1);
    this.scene.add(this.dashCircle);
  }

  //绘制动画
  drawEllipseAnimation() {
    const tween = {
      pos: 0
    };

    this.animation = TweenMax.to(tween, 5, {
      pos: (this.dashCircle.geometry as any).attributes.position.array.length,
      onUpdate: () => {
        // 绘制虚线圆
        (this.dashCircle.geometry as any).setDrawRange( 0, tween.pos);
      },
      onComplete: () => {
        this.removePoint(this.movePointArray, this.count, this.scene);
      },
      paused: true,
      ease:  Linear.easeIn,
    });
  }

  //绘制圆形线
  createCircleLine(radius: number) {
      const curve = new THREE.EllipseCurve(
        0,  0,
        radius, radius,
        0,   2 * Math.PI,
        true,
        0
      );
      const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(500));
      const circle = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, this.blackColor);
      return circle;
  }

  //创建直线
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

  //获取QA，QB直线交点Q
  getInterSectionPoint(bX: number, bY: number, aX: number, aY: number) {
    //求出矩形中心点坐标R(x, y)
    const rX = (aX + bX) / 2;
    const rY = (aY + bY) / 2;
    const interSectionX = 2 * rX - 40;
    const interSectionY = 2 * rY - 0;
    const interSectionPoint = ThreeUtil.createPoint(1.5, this.redColor, interSectionX, interSectionY, 1);
    interSectionPoint.position.z = 1;
    this.scene.add(interSectionPoint);
    return interSectionPoint;
  }

  //删除线段
  deleteLine(obj: any) {
    if (obj) {
      obj.geometry.dispose();
      obj.material.dispose();
      this.scene.remove(obj);
    }
  }

  // 清除绘制点
  removePoint(array: any, count: number, scene: any) {
    for (let i = 0; i < array.length; i++) {
      (array[i] as any).geometry.dispose();
      (array[i] as any).material.dispose();
      scene.remove((array[i] as any));
    }
  }

  //删除重绘直线
  reDrawLines() {
    //重绘Q点，QA及QB
    this.deleteLine(this.qPoint);
    this.qPoint = this.getInterSectionPoint(this.movePointB.position.x, this.movePointB.position.y,
      this.movePointA.position.x, this.movePointA.position.y);

    this.qText.position.set(this.qPoint.position.x - 15, this.qPoint.position.y + 5, 0);

    this.deleteLine(this.dashLineQA);
    //虚线QA
    this.dashLineQA = this.createLine(this.qPoint.position.x, this.qPoint.position.y, this.movePointA.position.x,
      this.movePointA.position.y, this.redColor, true, this.dashSize);

    this.deleteLine(this.dashLineQB);
    //虚线QB
    this.dashLineQB = this.createLine(this.qPoint.position.x, this.qPoint.position.y, this.movePointB.position.x,
      this.movePointB.position.y, this.redColor, true, this.dashSize);

    //重绘直线AB,PQ,虚线OR,OA
    this.deleteLine(this.dashLineOR);
    this.dashLineOR = this.createLine(0, 0, this.rPoint.position.x, this.rPoint.position.y, this.redColor, true, 7);

    this.deleteLine(this.dashLineOA);
    this.dashLineOA = this.createLine(0, 0, this.movePointA.position.x, this.movePointA.position.y, this.redColor, true, this.dashSize);

    this.deleteLine(this.segmentAB);
    this.segmentAB = this.createLine(this.movePointA.position.x, this.movePointA.position.y,
      this.movePointB.position.x, this.movePointB.position.y, this.blueColor, false, this.dashSize);

    this.deleteLine(this.segmentPQ);
    this.segmentPQ = this.createLine(40, 0, this.qPoint.position.x, this.qPoint.position.y, this.blueColor, false, this.dashSize);

    this.rPoint.position.set((40 + this.qPoint.position.x) / 2, (0 + this.qPoint.position.y) / 2, 0);
    //重设内部直角符号
    this.innerRightAngleImg.position.set(this.rPoint.position.x, this.rPoint.position.y, 0);
    this.innerRightAngleImg.rotation.z = this.rPoint.position.x >= 0
      ? Math.atan((this.rPoint.position.y - 0) / (this.rPoint.position.x - 0)) + Math.PI / 2
      : Math.atan((this.rPoint.position.y - 0) / (this.rPoint.position.x - 0)) - Math.PI / 2;

    switch (true) {
      case !(window as any).viewHandler.viewModel.$data.ctrl1:
        this.dashLineOR.visible = false;
        this.dashLineOA.visible = false;
        this.segmentAB.visible = false;
        this.segmentPQ.visible = false;
        this.innerRightAngleImg.visible = false;
        break;
      case !(window as any).viewHandler.viewModel.$data.ctrl2:
        this.dashLineOR.visible = true;
        this.dashLineOA.visible = true;
        this.segmentAB.visible = true;
        this.innerRightAngleImg.visible = true;
        this.segmentPQ.visible = false;
        break;
      case !(window as any).viewHandler.viewModel.$data.ctrl3:
        this.dashLineOR.visible = true;
        this.dashLineOA.visible = true;
        this.segmentAB.visible = true;
        this.innerRightAngleImg.visible = true;
        this.segmentPQ.visible = true;
        break;
    }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
