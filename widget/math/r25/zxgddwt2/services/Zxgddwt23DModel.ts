import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
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

export class Zxgddwt23DModel extends ThreeBase {

  private controls: any;
  private line: any;
  private circle: any;
  private orangeColor = '#FF8715';
  private movePoint: any;
  private tangentLines: any = [];
  public verticalLine: any;
  private squarePlane: any;
  public segmentOM: any;
  public group = new THREE.Group();
  public bigPointM: any;
  public textM: any;
  public textA: any;
  public distance: any;

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
    this.initDefaultLine();
    this.bindDragEvent();
    this.verticalLine = this.createVerticalLine(11);
    this.verticalLine.visible = false;
    this.createSquare();

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
      //初始圆
      this.circle = this.createCircleLine(11, 11);
      this.scene.add(this.circle);

      //圆心O
      const pointO = ThreeUtil.createPoint(1, this.orangeColor, 10, 0, 1);
      const textO = ThreeUtil.createNewRomanText('O', 5, 6, 0, this.orangeColor, 0.15);
      pointO.add(textO);
      this.scene.add(pointO);

      //M点
      const pointM = ThreeUtil.createPoint(1, this.orangeColor, 20, -10, 1);
      pointM.position.z = 1;
      this.textM = ThreeUtil.createNewRomanText('M', 5, -2, 0, this.orangeColor, 0.15);
      const coordText = ThreeUtil.createNormalText('(2,-1)', 22, -2, 0, this.orangeColor, 0.15);
      pointM.add(this.textM);
      pointM.add(coordText);
      this.scene.add(pointM);

      this.bigPointM = ThreeUtil.createPoint(2, this.orangeColor, 20, -10, 1);
      this.bigPointM.position.z = 1;
      this.bigPointM.visible = false;
      this.scene.add(this.bigPointM);

      //线段OM
      this.segmentOM = this.createLine(10, 0, 20, -10, this.orangeColor);
      this.segmentOM.visible = false;
      this.scene.add(this.segmentOM);

      this.tangentLines[0] = this.createTangentLineOne(11);
      this.tangentLines[1] = this.createTangentLineTwo(11);
      this.scene.add(this.tangentLines[0]);
      this.scene.add(this.tangentLines[1]);

      this.textA = ThreeUtil.createNewRomanText('A', 25, 0, 0, this.orangeColor, 0.15);
      this.textA.visible = false;
      this.scene.add(this.textA);
  }

  //绘制圆形线
  createCircleLine(radiusX: number, radiusY: number) {
      const curve = new THREE.EllipseCurve(
        10,  0,
        radiusX, radiusY,
        0,   2 * Math.PI,
        true,
        0
      );
      const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(500));
      const circle = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, '#00AAFF');
      return circle;
  }

  //添加拖动时间并限制范围
  bindDragEvent() {
    this.movePoint = ThreeUtil.createImg(14, 14, point, 5, Math.sqrt(96));
    this.scene.add(this.movePoint);
    const dragControls = new dragcontrols([this.movePoint], this.camera, this.renderer.domElement);

    dragControls.addEventListener('drag', () => {
      this.movePoint.position.x = this.movePoint.position.x >= 3.57 ? this.movePoint.position.x : 3.57;
      this.movePoint.position.x = this.movePoint.position.x <= 8.55 ? this.movePoint.position.x : 8.55;
      this.movePoint.position.y = (-Math.sqrt(96) / 5) * (this.movePoint.position.x - 10);

      //拖动点到圆心O的距离
      this.distance = Math.sqrt((Math.pow(this.movePoint.position.x - 10, 2)) + Math.pow(this.movePoint.position.y, 2));

      //半径最大时圆方程为: Math.pow((x - 10), 2) + Math.pow(y, 2) = Math.pow((10 * Math.sqrt(2)), 2);
      if (this.distance < Math.sqrt(2) * 10) {
          this.bigPointM.visible = false;
          this.deleteCircle(this.tangentLines[0]);
          this.deleteCircle(this.tangentLines[1]);
          this.tangentLines[0].visible = true;
          this.tangentLines[0] = this.createTangentLineOne(this.distance);
          this.tangentLines[1] = this.createTangentLineTwo(this.distance);
          this.scene.add(this.tangentLines[0]);
          this.scene.add(this.tangentLines[1]);

          this.deleteCircle(this.circle);
          this.circle = this.createCircleLine(this.distance, this.distance);
          this.scene.add(this.circle);

          if (this.verticalLine) {
            this.deleteCircle(this.verticalLine);
            this.verticalLine = this.createVerticalLine(this.distance);
            if ((window as any).viewHandler.viewModel.$data.ctrl2) {
              this.verticalLine.visible = false;
            } else {
              this.verticalLine.visible = true;
            }
          }

          const a = 100 - Math.pow(this.distance, 2);
          const b = 200;
          const c = 100 - Math.pow(this.distance, 2);
          const m = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

          //此时垂线的斜率为 -1 / m， 方程为 y = (-1 / m)(x - 10)
          //此时垂线与直线f的交点为:
          let xNum: number;
          let yNum: number;
          if (this.distance === 10) {
              xNum = 20;
              yNum = 0;
          } else {
              xNum = (20 * m + 10 + 10 / m) * (m / (Math.pow(m, 2) + 1));
              yNum = m * (xNum - 20) - 10;
          }
          this.textA.position.set(xNum + 5, yNum, 0);
          this.group.position.set(xNum, yNum, 1);

          if (yNum <= 0) {
            this.group.rotation.z = -Math.asin((Math.abs(yNum) / this.distance));
          } else {
            this.group.rotation.z = Math.asin((Math.abs(yNum) / this.distance));
          }

          if ((window as any).viewHandler.viewModel.$data.ctrl2 === false) {
            this.textA.visible = true;
            this.textM.text = 'M';
          }

        } else {

          if ((window as any).viewHandler.viewModel.$data.ctrl2 === false) {
              this.textA.visible = false;
              this.textM.text = 'A,M';
              this.bigPointM.visible = true;
          }

          this.deleteCircle(this.tangentLines[0]);
          this.deleteCircle(this.tangentLines[1]);
          this.tangentLines[0] = this.createTangentLineOne(Math.sqrt(1.999) * 10);
          this.tangentLines[1] = this.createTangentLineTwo(Math.sqrt(1.999) * 10);
          this.scene.add(this.tangentLines[0]);
          this.scene.add(this.tangentLines[1]);

          this.deleteCircle(this.circle);
          this.circle = this.createCircleLine(Math.sqrt(2) * 10, Math.sqrt(2) * 10);
          this.scene.add(this.circle);

          if (this.verticalLine) {
            this.deleteCircle(this.verticalLine);
            this.verticalLine = this.createVerticalLine(Math.sqrt(1.999) * 10);
            this.verticalLine.visible = false;
          }

          const a = 100 - Math.pow(Math.sqrt(1.999) * 10, 2);
          const b = 200;
          const c = 100 - Math.pow(Math.sqrt(1.999) * 10, 2);
          const m = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

          //此时垂线的斜率为 -1 / m， 方程为 y = (-1 / m)(x - 10)
          //此时垂线与直线f的交点为:
          const xNum = (20 * m + 10 + 10 / m) * (m / (Math.pow(m, 2) + 1));
          const yNum = m * (xNum - 20) - 10;
          this.group.position.set(xNum, yNum, 1);
          this.group.rotation.z = -(Math.PI / 4 - 0.1);

          this.tangentLines[0].visible = false;
        }
    });
  }

  //创建切线
  createTangentLineOne(radius: number) {
      let tangentLine: any;
      if (radius === 10) {
          tangentLine = this.createLine(-100, -10, 100, -10, '#00AAFF');
      } else {
          const tangentLinePoints: any = [];
          const a = 100 - Math.pow(radius, 2);
          const b = 200;
          const c = 100 - Math.pow(radius, 2);
          const m = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
          //直线方程为 y = m(x - 20) -10;
          for (let i = -100; i <= 100; i++) {
            const y = m * (i - 20) - 10;
            tangentLinePoints.push(new THREE.Vector3(i, y, 0));
          }
          tangentLine = ThreeUtil.createTube(tangentLinePoints, 0.4, 50, '#00AAFF');
      }
      return tangentLine;
  }

  createTangentLineTwo(radius: number) {
    let tangentLine: any;
    if (radius === 10) {
      tangentLine = this.createLine(20, -150, 20, 150, '#00AAFF');
    } else {
      const tangentLinePoints: any = [];
      const a = 100 - Math.pow(radius, 2);
      const b = 200;
      const c = 100 - Math.pow(radius, 2);
      const m = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
      //直线方程为 y = m(x - 20) -10;
      for (let i = -100; i <= 100; i++) {
        const y = m * (i - 20) - 10;
        tangentLinePoints.push(new THREE.Vector3(i, y, 0));
      }
      tangentLine = ThreeUtil.createTube(tangentLinePoints, 0.4, 50, '#00AAFF');
    }
    return tangentLine;
  }

  //OA垂直于直线f
  createVerticalLine(radius: number) {
    let line: any;
    if (radius === 10) {
      line = this.createLine(10, 0, 20, 0, this.orangeColor);
    } else {
      const a = 100 - Math.pow(radius, 2);
      const b = 200;
      const c = 100 - Math.pow(radius, 2);
      const m = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
      //此时垂线的斜率为 -1 / m， 方程为 y = (-1 / m)(x - 10)
      //此时垂线与直线f的交点为:
      const xNum = (20 * m + 10 + 10 / m) * (m / (Math.pow(m, 2) + 1));
      const yNum = m * (xNum - 20) - 10;
      line = this.createLine(10, 0, xNum, yNum, this.orangeColor);
    }
    this.scene.add(line);
    return line;
  }

  //创建一个小方块
  createSquare() {
      const a = 100 - Math.pow(11, 2);
      const b = 200;
      const c = 100 - Math.pow(11, 2);
      const m = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
      //此时垂线的斜率为 -1 / m， 方程为 y = (-1 / m)(x - 10)
      //此时垂线与直线f的交点为:
      const xNum = (20 * m + 10 + 10 / m) * (m / (Math.pow(m, 2) + 1));
      const yNum = m * (xNum - 20) - 10;
      this.squarePlane = ThreeUtil.createPlane(4, 4, '#FEC100', 1);
      this.group.position.set(xNum, yNum, 1);
      this.group.add(this.squarePlane);
      this.squarePlane.position.set(-2, -2, 0);
      this.group.rotation.z = -Math.asin((Math.abs(yNum) / 11));
      this.group.visible = false;
      this.scene.add(this.group);
  }

  //创建直线
  createLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    const line = this.line.createLine({
      startPoint: new THREE.Vector3(x1, y1, 0),
      endPoint: new THREE.Vector3( x2, y2, 0),
      lineWidth: 1000,
      lineWidthScale: 1 / 500,
      color: color
    });
    return line;
  }

  //删除线段
  deleteCircle(obj: any) {
    if (obj) {
      obj.geometry.dispose();
      obj.material.dispose();
      this.scene.remove(obj);
    }
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
