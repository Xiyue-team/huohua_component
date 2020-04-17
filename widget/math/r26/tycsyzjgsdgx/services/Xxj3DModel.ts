import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as point from '../sub_static/point.png';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { CurveLine } from '../../../../../src/three/component/CurveLine';
import { MathHelper } from '../../../../../src/util/MathHelper';

export class Xxj3DModel extends ThreeBase {

  private controls: any;
  private helper = new MathHelper();
  private ellipse: any;
  private line: any;
  private a = 40;
  private b = 30;
  private c = Math.sqrt((Math.pow(this.a, 2) - Math.pow(this.b, 2)));
  private leftFocusPoint: any;
  private rightFocusPoint: any;
  private orangeColor = '#FFA72D';
  private movePointA: any;
  private movePointP: any;
  private linePF1: any;
  private linePF2: any;
  private topDashCircle: any = [];
  private bottomDashCircle: any = [];
  private dragPointPControls: any;
  private dragPointAControls: any;
  private group = new THREE.Group();
  private verticalGroup: any = [];
  private rightTextTop = document.getElementsByClassName('rightTextTop')[0];
  private rightTextBottom = document.getElementsByClassName('rightTextBottom')[0];
  private twoRightAnglesFlag = false;
  private threeRightAnglesFlag = false;
  private flag = false;
  private distance: number;

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
    this.initEllipse();
    this.initDragMovePoints();
    this.initDefaultLines();
    this.drawDefaultRightAngles();

    this.bindDragEventForPointA();
    this.bindDragEventForPointP();

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
    (this.renderer as WebGLRenderer).setClearColor('#F5F5F5', 1);

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

  //创建坐标轴
  initAxis() {
    const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']} as any);
    this.scene.add(axis);
  }


  //绘制椭圆
  initEllipse() {
    this.ellipse = this.drawEllipse(this.a, this.b);
    this.scene.add(this.ellipse);

    this.leftFocusPoint = ThreeUtil.createPoint(1, this.orangeColor, -this.c, 0, 1);
    this.scene.add(this.leftFocusPoint);

    this.rightFocusPoint = ThreeUtil.createPoint(1, this.orangeColor, this.c, 0, 1);
    this.scene.add(this.rightFocusPoint);

    //绘制F1， F2
    const f1Text = ThreeUtil.createNewRomanText('F', 0, -5, 0, this.orangeColor, 0.15);
    const oneText = ThreeUtil.createNormalText('₁', 20, -5, 0, this.orangeColor, 1);
    f1Text.add(oneText);
    this.leftFocusPoint.add(f1Text);

    const f2Text = ThreeUtil.createNewRomanText('F', 0, -5, 0, this.orangeColor, 0.15);
    const twoText = ThreeUtil.createNormalText('₂', 20, -5, 0, this.orangeColor, 1);
    f2Text.add(twoText);
    this.rightFocusPoint.add(f2Text);

    const bText = ThreeUtil.createNewRomanText('B', -3, this.b + 8, 0, '#ED2CE8', 0.15);
    this.scene.add(bText);
  }

  //添加拖动点A，P
  initDragMovePoints() {
      this.movePointA = ThreeUtil.createImg(14, 14, point, 40, 0, 1);
      const textA = ThreeUtil.createNewRomanText('A', 5, 10, 0, '#ED2CE8', 0.15);
      this.movePointA.add(textA);
      this.scene.add(this.movePointA);

      this.movePointP = ThreeUtil.createImg(14, 14, point, 29, Math.sqrt((Math.pow(this.b, 2)
        - (Math.pow(this.b, 2) / Math.pow(this.a, 2)) * Math.pow(29, 2))), 1);
      const textP = ThreeUtil.createNewRomanText('P', 5, 10, 0, this.orangeColor, 0.15);
      this.movePointP.add(textP);
      this.scene.add(this.movePointP);
  }

  //绘制初始线段
  initDefaultLines() {
      this.linePF1 = this.createLine(-this.c, 0, 29, Math.sqrt((Math.pow(this.b, 2)
        - (Math.pow(this.b, 2) / Math.pow(this.a, 2)) * Math.pow(29, 2))), this.orangeColor);
      this.linePF2 = this.createLine(this.c, 0, 29, Math.sqrt((Math.pow(this.b, 2)
        - (Math.pow(this.b, 2) / Math.pow(this.a, 2)) * Math.pow(29, 2))), this.orangeColor);
      this.scene.add(this.linePF1);
      this.scene.add(this.linePF2);

      //绘制圆形虚线
      const curveHelper = new CurveLine();
      const leftTopDashCirclePointArray: THREE.Vector2[] = [];
      const centerTopDashCirclePointArray: THREE.Vector2[] = [];
      const rightTopDashCirclePointArray: THREE.Vector2[] = [];

      for (let i = 0; i < 20; i += 0.5) {
        leftTopDashCirclePointArray.push(new THREE.Vector2(-Math.sqrt((Math.pow(this.b, 2) - Math.pow(i, 2))), i));
      }

      for (let i = -23; i <= 20; i += 0.5) {
        centerTopDashCirclePointArray.push(new THREE.Vector2(i, Math.sqrt((Math.pow(this.b, 2) - Math.pow(i, 2)))));
      }

      for (let i = 0; i <= 20; i += 0.5) {
        rightTopDashCirclePointArray.push(new THREE.Vector2(Math.sqrt((Math.pow(this.b, 2) - Math.pow(i, 2))), i));
      }

      this.topDashCircle[0] = curveHelper.createCurveLine({pointList: leftTopDashCirclePointArray,
        color: '#00D7D5', lineWidth: 1, style: 1,  dashArray: 0.25});
      this.group.add(this.topDashCircle[0]);

      this.topDashCircle[1] = curveHelper.createCurveLine({pointList: centerTopDashCirclePointArray,
        color: '#00D7D5', lineWidth: 1, style: 1,  dashArray: 0.1});
      this.group.add(this.topDashCircle[1]);

      this.topDashCircle[2] = curveHelper.createCurveLine({pointList: rightTopDashCirclePointArray,
        color: '#00D7D5', lineWidth: 1, style: 1,  dashArray: 0.25});
      this.group.add(this.topDashCircle[2]);

      this.bottomDashCircle[0] = this.topDashCircle[0].clone();
      this.bottomDashCircle[0].rotation.z = Math.PI;
      this.group.add(this.bottomDashCircle[0]);

      this.bottomDashCircle[1] = this.topDashCircle[1].clone();
      this.bottomDashCircle[1].rotation.z = Math.PI;
      this.group.add(this.bottomDashCircle[1]);

      this.bottomDashCircle[2] = this.topDashCircle[2].clone();
      this.bottomDashCircle[2].rotation.z = Math.PI;
      this.group.add(this.bottomDashCircle[2]);
      this.group.visible = false;
      this.scene.add(this.group);
  }

  //绘制默认直角
  drawDefaultRightAngles() {

      //当b=c时，绘制的两个直角
      this.verticalGroup[0] = this.helper.drawVerticalLines(new THREE.Vector3(-30, 0, 0), new THREE.Vector3(30, 0, 0),
        new THREE.Vector3(0, 30, 0), 5, this.orangeColor, 'rightTop');

      this.verticalGroup[1] = this.helper.drawVerticalLines(new THREE.Vector3(-30, 0, 0), new THREE.Vector3(30, 0, 0),
        new THREE.Vector3(0, -30, 0), 5, this.orangeColor, 'rightTop');

      this.verticalGroup[0].visible = false;
      this.verticalGroup[1].visible = false;

      this.scene.add(this.verticalGroup[0]);
      this.scene.add(this.verticalGroup[1]);
  }

  //A点拖动事件
  bindDragEventForPointA() {
    this.dragPointAControls = new dragcontrols([this.movePointA], this.camera, this.renderer.domElement);
    this.dragPointAControls.addEventListener('drag', () => {
      this.group.visible = true;
      //限定A点拖动轨迹
      this.movePointA.position.x = this.movePointA.position.x <= 100 ? this.movePointA.position.x : 100;
      this.movePointA.position.x = this.movePointA.position.x > 30 ? this.movePointA.position.x : 31;
      this.movePointA.position.y = 0;

      this.deleteLine(this.ellipse);
      this.ellipse = this.drawEllipse(this.movePointA.position.x, this.b);
      this.scene.add(this.ellipse);

      //焦点吸附
      this.c = Math.sqrt((Math.pow(this.movePointA.position.x, 2) - Math.pow(this.b, 2)));
      if (this.c <= 32 && this.c >= 28) {
          this.c = 30;

      }
      this.leftFocusPoint.position.x = -this.c;
      this.rightFocusPoint.position.x = this.c;

      //拖动A点时P点位置
      if (this.movePointA.position.x <= Math.abs(this.movePointP.position.x)) {

        this.movePointP.position.x = this.movePointP.position.x >= 0 ? Math.sqrt((Math.pow(this.movePointA.position.x, 2)
          - (Math.pow(this.movePointA.position.x, 2) * Math.pow(this.movePointP.position.y, 2) / Math.pow(this.b, 2)))) :
          -Math.sqrt((Math.pow(this.movePointA.position.x, 2)
            - (Math.pow(this.movePointA.position.x, 2) * Math.pow(this.movePointP.position.y, 2) / Math.pow(this.b, 2))));

      } else {

        if (this.movePointP.position.y >= 0) {
          this.movePointP.position.set(this.movePointP.position.x, Math.sqrt((Math.pow(this.b, 2)
            - (Math.pow(this.b, 2) * Math.pow(this.movePointP.position.x, 2) / Math.pow(this.movePointA.position.x, 2)))), 1);

        } else if (this.movePointP.position.y < 0) {

          this.movePointP.position.set(this.movePointP.position.x, -Math.sqrt((Math.pow(this.b, 2)
            - (Math.pow(this.b, 2) * Math.pow(this.movePointP.position.x, 2) / Math.pow(this.movePointA.position.x, 2)))), 1);
        }
      }

      //判断PA两点距离
      this.distance = Math.sqrt(Math.pow((this.movePointA.position.x - this.movePointP.position.x), 2) +
        Math.pow((this.movePointA.position.y - this.movePointP.position.y), 2));

      if (this.distance <= 10) {
        this.dragPointAControls.activate();
        this.dragPointPControls.deactivate();
      } else {
        this.dragPointPControls.activate();
      }

      this.deleteLine(this.linePF1);
      this.linePF1 = this.createLine(-this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);
      this.deleteLine(this.linePF2);
      this.linePF2 = this.createLine(this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);

      this.scene.add(this.linePF1);
      this.scene.add(this.linePF2);

      const angle = this.isRightAngleOrNot(-this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.c, 0);
      if ((angle * 180 / Math.PI).toFixed(0) === '90') {
          this.flag = true;
      } else {
          this.flag = false;
      }

      //修改右侧文字
      if (this.b > this.c) {
          this.rightTextTop.innerHTML = '0';
          this.rightTextBottom.innerHTML = 'b > c';
          this.twoRightAnglesFlag = false;
          this.threeRightAnglesFlag = false;
          this.deleteRightAngles(this.verticalGroup[2]);
          return ;
      }
      if (Math.abs(this.b - this.c) <= 0.4) {
          this.rightTextTop.innerHTML = '2';
          this.rightTextBottom.innerHTML = 'b = c';
          this.twoRightAnglesFlag = true;
          this.threeRightAnglesFlag = false;
          this.deleteRightAngles(this.verticalGroup[2]);
        return ;
      }
          this.rightTextTop.innerHTML = '4';
          this.rightTextBottom.innerHTML = 'b < c';
          this.twoRightAnglesFlag = false;
          this.threeRightAnglesFlag = true;
          if (this.flag === false) {
            this.deleteRightAngles(this.verticalGroup[2]);
          } else {
            this.deleteRightAngles(this.verticalGroup[2]);
            this.verticalGroup[2] = this.helper.drawVerticalLines(new THREE.Vector3(-this.c, 0, 0), new THREE.Vector3(this.c, 0, 0),
              new THREE.Vector3(this.movePointP.position.x, this.movePointP.position.y, 0), 5, this.orangeColor, 'rightTop');
            this.scene.add(this.verticalGroup[2]);
          }
      //当b=c时
      this.showTwoRightAnglesOrNot();
    });
  }

  //P点拖动事件
  bindDragEventForPointP() {
    this.dragPointPControls = new dragcontrols([this.movePointP], this.camera, this.renderer.domElement);
    this.dragPointPControls.addEventListener('drag', () => {
      this.group.visible = true;
      //限定P点拖动轨迹
      this.movePointP.position.x = this.movePointP.position.x <= this.movePointA.position.x
        ? this.movePointP.position.x : this.movePointA.position.x;
      this.movePointP.position.x = this.movePointP.position.x >= -this.movePointA.position.x
        ? this.movePointP.position.x : -this.movePointA.position.x;

      if (this.movePointP.position.y >= 0) {
        this.movePointP.position.y = Math.sqrt((Math.pow(this.b, 2)
          - (Math.pow(this.b, 2) / Math.pow(this.movePointA.position.x, 2)) * Math.pow(this.movePointP.position.x, 2)));
      } else {
        this.movePointP.position.y = -Math.sqrt((Math.pow(this.b, 2)
          - (Math.pow(this.b, 2) / Math.pow(this.movePointA.position.x, 2)) * Math.pow(this.movePointP.position.x, 2)));
      }

      //判断PA两点距离
      this.distance = Math.sqrt(Math.pow((this.movePointA.position.x - this.movePointP.position.x), 2) +
        Math.pow((this.movePointA.position.y - this.movePointP.position.y), 2));

      if (this.distance <= 10) {
          this.dragPointPControls.activate();
          this.dragPointAControls.deactivate();
      } else {
          this.dragPointAControls.activate();
      }

      this.deleteLine(this.linePF1);
      this.linePF1 = this.createLine(-this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);
      this.deleteLine(this.linePF2);
      this.linePF2 = this.createLine(this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);
      this.scene.add(this.linePF1);
      this.scene.add(this.linePF2);

      const angle = this.isRightAngleOrNot(-this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.c, 0);
      //当b=c时
      this.showTwoRightAnglesOrNot();

      //当b<c时
      if (this.threeRightAnglesFlag) {
        if ((angle * 180 / Math.PI).toFixed(0) === '90') {

          this.flag = true;
          this.deleteRightAngles(this.verticalGroup[2]);
          this.verticalGroup[2] = this.helper.drawVerticalLines(new THREE.Vector3(-this.c, 0, 0), new THREE.Vector3(this.c, 0, 0),
            new THREE.Vector3(this.movePointP.position.x, this.movePointP.position.y, 0), 5, this.orangeColor, 'rightTop');
          this.scene.add(this.verticalGroup[2]);

        } else {

          this.flag = false;
          this.deleteRightAngles(this.verticalGroup[2]);
        }
      }
    });
  }

  //当b=c时，拖动A或者P时判断是否出现直角符号
  showTwoRightAnglesOrNot() {
    if (this.twoRightAnglesFlag && this.movePointP.position.y.toFixed(0) === '30' && this.movePointP.position.x.toFixed(0) === '0') {
      this.verticalGroup[0].visible = true;
      this.verticalGroup[1].visible = false;
    } else if (this.twoRightAnglesFlag && this.movePointP.position.y.toFixed(0) === '-30' &&
      this.movePointP.position.x.toFixed(0) === '0') {
      this.verticalGroup[0].visible = false;
      this.verticalGroup[1].visible = true;
    } else {
      this.verticalGroup[0].visible = false;
      this.verticalGroup[1].visible = false;
    }
  }

  //判断是否为直角
  isRightAngleOrNot(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
      const fF_Dist = (x3 - x1);
      const pF1_Dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
      const pF2_Dist = Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2));
      let i = (Math.pow(pF1_Dist, 2) + Math.pow(pF2_Dist, 2) - Math.pow(fF_Dist, 2)) / (2 * pF1_Dist * pF2_Dist);
      if (i <= -1) {
        i = -1;
      }
      if (i >= 1) {
        i = 1;
      }
      const angle = Math.acos(i);
      return angle;
  }

  //创建直线
  createLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, y1, 1),
      endPoint: new THREE.Vector3( x2, y2, 1),
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      color: color
    });
    return line;
  }

  //绘制椭圆
  drawEllipse(a: number, b: number) {
    const curve = new THREE.EllipseCurve(
      0,  0,
      a, b,
      0,   2 * Math.PI,
      true,
      0
    );
    const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(100));
    const ellipse = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, '#000000');
    return ellipse;
  }

  //删除椭圆
  deleteLine(ellipseObj: any) {
      if (ellipseObj) {
          ellipseObj.geometry.dispose();
          ellipseObj.material.dispose();
          this.scene.remove(ellipseObj);
      }
  }

  //删除直角符号
  deleteRightAngles(rightAnglesObj: any) {
    if (rightAnglesObj) {
      for (let i = 0; i < rightAnglesObj.children.length; i++) {
        (rightAnglesObj.children[i] as any).geometry.dispose();
        (rightAnglesObj.children[i] as any).material.dispose();
      }
      this.scene.remove(rightAnglesObj);
    }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    this.group.visible = false;
    this.movePointA.position.set(40, 0, 1);
    this.movePointP.position.set(29, Math.sqrt((Math.pow(this.b, 2)
      - (Math.pow(this.b, 2) / Math.pow(this.a, 2)) * Math.pow(29, 2))), 1);
    this.c = Math.sqrt((Math.pow(this.a, 2) - Math.pow(this.b, 2)));
    this.leftFocusPoint.position.x = -this.c;
    this.rightFocusPoint.position.x = this.c;

    this.deleteLine(this.linePF1);
    this.linePF1 = this.createLine(-this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);
    this.deleteLine(this.linePF2);
    this.linePF2 = this.createLine(this.c, 0, this.movePointP.position.x, this.movePointP.position.y, this.orangeColor);
    this.scene.add(this.linePF1);
    this.scene.add(this.linePF2);

    this.deleteLine(this.ellipse);
    this.ellipse = this.drawEllipse(this.movePointA.position.x, this.b);
    this.scene.add(this.ellipse);

    this.rightTextTop.innerHTML = '0';
    this.rightTextBottom.innerHTML = 'b > c';

    this.twoRightAnglesFlag = false;
    this.threeRightAnglesFlag = false;

    this.verticalGroup[0].visible = false;
    this.verticalGroup[1].visible = false;
    this.verticalGroup[2].visible = false;
    this.flag = false;
  }
}
