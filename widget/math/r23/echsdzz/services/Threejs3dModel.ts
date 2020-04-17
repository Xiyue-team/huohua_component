import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { CurveLine } from '../../../../../src/three/component/CurveLine';
import { Line } from '../../../../../src/three/component/Line';
import { BrowserUtil } from "../../../../../src/util/BrowserUtil";

const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private dashLine: any;

    private functionLine1: any;
    private functionLine2: any;
    private axisLine1: any;
    private axisLine2: any;

    private auxiliaryLine1: any;
    private auxiliaryLine2: any;
    private auxiliaryLine3: any;
    private auxiliaryLine4: any;

    private redPoint: THREE.Mesh;
    private greenPoint: THREE.Mesh;
    private unEablePoint1: THREE.Mesh;
    private unEablePoint2: THREE.Mesh;

    private param: number;
    private minValue: number;
    private maxValue: number;
    private dragControl: any;
    private distance = 3;
    private dashLineNum = 5;

    private render = () => {
        requestAnimationFrame( this.render );
        this.controls.update();
        this.renderer.render( this.scene,  this.camera );
    }
    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }
    init() {
      this.param = -4;
      this.minValue = -6;
      this.maxValue = 11;
      this.dashLine = new Line();
      this.initScene();
      this.initCamera();
      this.initWebGLRenderer();
      this.initControl();
      this.createAxis();
      this.createFunctionLine();
      this.createFunctionLine2();
      this.createDragPoint();
      this.createUneablePoint();
      this.render();
      this.functionLine2.visible = false;
      this.axisLine2.visible = false;

      if (BrowserUtil.getBrowserInfo().os === 'iOS') {
        this.dashLineNum = 0.5;
      }
      this.drawDashLine();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2d2d2d );
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  38);
    }
    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
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

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }
    //创建函数线1
    createFunctionLine() {
      const color = '#18A2FF';
      const dashColor = '#FFD621';
      const curveHelper = new CurveLine();
      const linePoint: THREE.Vector2[] = [];
      const linePoint1: THREE.Vector2[] = [];
      //对称轴取点
      for (let i = -50; i <= 50; i += 0.01) {
        linePoint.push( new THREE.Vector2(2.5 * 0.3 , i * 0.3));
      }
      //曲线函数取点
      for (let i = -6; i <= 11; i += 0.01) {
        const formula = 0.8 * Math.pow( i, 2) + (this.param * i) + 1;
        linePoint1.push( new THREE.Vector2(i * 0.3 , formula * 0.3));
      }
      //按钮1对应的函数
      this.functionLine1  = curveHelper.createCurveLine({pointList: linePoint1, color: color, lineWidth: 0.2, style: 2});
      //按钮1对应的对称轴
      this.axisLine1      = curveHelper.createCurveLine({pointList: linePoint, color: dashColor, lineWidth: 0.2, style: 2});

      this.functionLine1.add(this.createFuntionText('#18A2FF'));
      this.scene.add(this.functionLine1, this.axisLine1);
    }
    //创建函数线2
    createFunctionLine2() {
      const color = '#18A2FF';
      const dashColor = '#FFD621';
      const curveHelper = new CurveLine();
      const linePoint: THREE.Vector2[] = [];
      const linePoint1: THREE.Vector2[] = [];
      //对称轴取点
      for (let i = -50; i <= 50; i += 0.01) {
        linePoint.push( new THREE.Vector2(2.5 * 0.3 , i * 0.3));
      }
      //曲线函数取点
      for (let i = this.minValue; i <= this.maxValue; i += 0.01) {
        const formula = 0.8 * Math.pow( i, 2) + (this.param * i) + 1;
        linePoint1.push( new THREE.Vector2(i * 0.3 , formula * 0.3));
      }
      //按钮2对应的函数
      this.functionLine2  = curveHelper.createCurveLine({pointList: linePoint1, color: color, lineWidth: 0.2, style: 2});
      //按钮2对应的对称轴
      this.axisLine2      = curveHelper.createCurveLine({pointList: linePoint, color: dashColor, lineWidth: 0.2, style: 2});
      this.functionLine2.add(this.createFuntionText('#FFD621'));
      this.scene.add(this.functionLine2, this.axisLine2);
    }
    //创建拖动点并绑定拖动事件
    createDragPoint() {
      const radius = (window as any)['env'].browserInfo.isSmallDevice ? 3 : 1.5;

      this.redPoint = ThreeUtil.createPoint(radius, '#ffffff', 1.5 * 0.3,
        (0.8 * Math.pow( 1.5, 2) + (this.param * 1.5)  + 1) * 0.3,
        0.0001);
      const point1 = ThreeUtil.createPoint(0.6, '#ffffff', 0, 0, 0.36);
      const smallPoint = ThreeUtil.createPoint(0.3, '#FF5A5A', 0, 0, 1);

      this.greenPoint = ThreeUtil.createPoint(radius, '#ffffff', -1.5 * 0.3,
        (0.8 * Math.pow( -1.5, 2) + (this.param * -1.5)  + 1) * 0.3,
        0.0001);
      const otherPoint1 = ThreeUtil.createPoint(0.6, '#ffffff', 0, 0, 0.36);
      const smallOtherPoint = ThreeUtil.createPoint(0.3, '#9BF23B', 0, 0, 1);

      point1.add(smallPoint);
      this.redPoint.add(point1);
      otherPoint1.add(smallOtherPoint);
      this.greenPoint.add(otherPoint1);

      this.initPointControl();
      this.scene.add(this.redPoint);
      this.scene.add(this.greenPoint);
    }
    //创建不可拖动点
    createUneablePoint() {
      this.unEablePoint1 = ThreeUtil.createPoint(0.3, '#ffffff', (-1.5 * 0.3),
        (0.8 * Math.pow( -1.5, 2) + (this.param * -1.5)  + 1) * 0.3,
        1);

      this.unEablePoint2 = ThreeUtil.createPoint(0.3, '#ffffff', 1.5 * 0.3,
        (0.8 * Math.pow( 1.5, 2) + (this.param * 1.5)  + 1) * 0.3,
        1);

      this.unEablePoint1.visible = false;
      this.unEablePoint2.visible = false;
      this.scene.add(this.unEablePoint1);
      this.scene.add(this.unEablePoint2);
    }
    //初始化拖动事件
    initPointControl() {
      this.dragControl = new dragcontrols([this.greenPoint], this.camera, this.renderer.domElement);
      this.dragControl.addEventListener( 'dragstart',  () => {
        this.controls.enabled = false;
      });
      //绿色圆点拖动事件
      this.dragControl.addEventListener( 'drag', () => {
        this.checkRedRange();
      });
      this.dragControl.addEventListener( 'dragend', () => {
        this.controls.enabled = true;
      });
    }
    //确定红色点范围
    checkRedRange() {
      const greenPointX = this.greenPoint.position.x / 0.3;
      if (greenPointX > 11) {
        this.greenPoint.position.x = (11 * 0.3);
      } else if (greenPointX < -6) {
        this.greenPoint.position.x = (-6 * 0.3);
      }
      if ((this.greenPoint.position.x + (this.distance * 0.3)) > (11 * 0.3) ) {
        this.greenPoint.position.x = (11 - this.distance) * 0.3;
      }

      this.redPoint.position.x = this.greenPoint.position.x + this.distance * 0.3;
      this.redPoint.position.y = (0.8 * Math.pow( (this.redPoint.position.x / 0.3), 2) +
        (-4 * (this.redPoint.position.x / 0.3)) + 1) * 0.3;

      this.greenPoint.position.y = (0.8 * Math.pow( this.greenPoint.position.x / 0.3, 2) +
        (-4 * this.greenPoint.position.x / 0.3) + 1) * 0.3;

      this.removeAuxiliary();
      this.removeAuxiliary2();
      this.drawDashLine();
    }
    //绘制按钮一情况下辅助虚线
    drawDashLine() {
      const color = '#ffffff';
      this.auxiliaryLine1 = this.dashLine.createLine({
        startPoint: new THREE.Vector3( this.redPoint.position.x, this.redPoint.position.y, 0),
        endPoint: new THREE.Vector3(this.redPoint.position.x, 0, 0),
        color: color,
        dashLine: true,
        lineWidth: 200,
        dashSize: this.dashLineNum,
        gapSize: this.dashLineNum,
        lineWidthScale: 0.005
      });

      this.auxiliaryLine3 = this.dashLine.createLine({
        startPoint: new THREE.Vector3( this.greenPoint.position.x, this.greenPoint.position.y, 0),
        endPoint: new THREE.Vector3(this.greenPoint.position.x, 0, 0),
        color: color,
        dashLine: true,
        lineWidth: 200,
        dashSize: this.dashLineNum,
        gapSize: this.dashLineNum,
        lineWidthScale: 0.005
      });

      const text1 = ThreeUtil.createNewRomanText('x', this.redPoint.position.x, 0, 0, '#ffffff', 0.025);
      const text2 = ThreeUtil.createNewRomanText('x', this.greenPoint.position.x, 0, 0, '#ffffff', 0.025);
      const text3 = ThreeUtil.createNormalText('₂', this.redPoint.position.x + 0.3, -0.25, 0, '#ffffff', 0.018);
      const text4 = ThreeUtil.createNormalText('₁', this.greenPoint.position.x + 0.3, -0.25, 0, '#ffffff', 0.018);

      this.auxiliaryLine1.add(text1);
      this.auxiliaryLine3.add(text2);
      this.auxiliaryLine1.add(text3);
      this.auxiliaryLine3.add(text4);

      this.scene.add(this.auxiliaryLine1);
      this.scene.add(this.auxiliaryLine3);
    }
    //绘制按钮二情况下辅助虚线
    drawDashLine2() {
      const color = '#ffffff';

      this.auxiliaryLine2 = this.dashLine.createLine({
        startPoint: new THREE.Vector3( this.unEablePoint1.position.x, this.unEablePoint1.position.y, 0),
        endPoint: new THREE.Vector3(this.unEablePoint1.position.x, 0, 0),
        color: color,
        dashLine: true,
        lineWidth: 200,
        dashSize: this.dashLineNum,
        gapSize: this.dashLineNum,
        lineWidthScale: 0.005
      });

      this.auxiliaryLine4 = this.dashLine.createLine({
        startPoint: new THREE.Vector3( this.unEablePoint2.position.x, this.unEablePoint2.position.y, 0),
        endPoint: new THREE.Vector3(this.unEablePoint2.position.x, 0, 0),
        color: color,
        dashLine: true,
        lineWidth: 200,
        dashSize: this.dashLineNum,
        gapSize: this.dashLineNum,
        lineWidthScale: 0.005
      });

      const text1 = ThreeUtil.createNewRomanText('x', this.unEablePoint2.position.x, 0, 0, '#ffffff', 0.025);
      const text2 = ThreeUtil.createNewRomanText('x', this.unEablePoint1.position.x, 0, 0, '#ffffff', 0.025);
      const text3 = ThreeUtil.createNormalText('₂', this.unEablePoint2.position.x + 0.3, -0.25, 0, '#ffffff', 0.018);
      const text4 = ThreeUtil.createNormalText('₁', this.unEablePoint1.position.x + 0.3, -0.25, 0, '#ffffff', 0.018);
      this.auxiliaryLine2.add(text1);
      this.auxiliaryLine4.add(text2);
      this.auxiliaryLine2.add(text3);
      this.auxiliaryLine4.add(text4);
      this.scene.add(this.auxiliaryLine2);
      this.scene.add(this.auxiliaryLine4);
  }
    //删除线的方法
    removeLine(obj: THREE.Mesh) {
        this.scene.remove(obj);
        obj.geometry.dispose();
        (obj.material as any).dispose();
    }
    //删除按钮一情况下所有辅助线的方法
    removeAuxiliary() {
        this.removeLine(this.auxiliaryLine1);
        this.removeLine(this.auxiliaryLine3);
    }
    //删除按钮二情况下所有辅助线的方法
    removeAuxiliary2() {
      if (this.auxiliaryLine2 && this.auxiliaryLine4) {
        this.removeLine(this.auxiliaryLine2);
        this.removeLine(this.auxiliaryLine4);
      }

    }
    //删除函数线和坐标轴
    removeFunctionLine() {
      this.removeLine(this.functionLine2);
      this.removeLine(this.axisLine2);
    }
    //创建坐标轴
    createAxis() {
      const axis = AxisUtil.createAxis({
        width: 30,
        height: 30,
        isTicks: false,
        axisColor: '#ffffff',
        fontColor: '#707070',
        axisOpacity: 0.32,
        OTextXOffSet: 0.5,
        OTextYOffSet: 0.5,
      } as any);
      (axis.children[4] as any).fillStyle = '#ffffff';
      this.scene.add(axis);
    }

    reset() {
    }
    //按钮一时动态修改函数点的间距
    changePointPosition(value: number) {
      this.distance = value;
      this.checkRedRange();
    }
    //按钮二时动态修改对称轴
    changAxisLinePosition(value: number) {
      this.minValue = -6 + (value - 2.5);
      this.maxValue = 11  + (value - 2.5);
      this.param = -(window as any).viewHandler.viewModel.sliderNum2 * 1.6;

      let sign = '';
      if (this.param > 0) {
        sign = '+';
      }
      let bString = sign + Math.round(this.param * 10) / 10;
      if (this.param === 0) {
        bString = ' ';
      }

      this.removeFunctionLine();
      this.createFunctionLine2();
      this.axisLine2.position.set( (value - 2.5) * 0.3, 0, 0);

      this.unEablePoint1.position.set(-1.5 * 0.3,
        (0.8 * Math.pow( -1.5, 2) + (this.param * -1.5)  + 1) * 0.3, 0);
      this.unEablePoint2.position.set(1.5 * 0.3,
        (0.8 * Math.pow( 1.5, 2) + (this.param * 1.5)  + 1) * 0.3, 0);
      this.removeAuxiliary2();
      this.drawDashLine2();
      const functionY = (0.8 * Math.pow( this.maxValue, 2) + (this.param * this.maxValue) + 1) * 0.3;
      this.functionLine2.children[0].position.set((this.axisLine2.position.x + 5), functionY, 0);
      this.functionLine2.children[0].children[7].text = bString;

      if (this.param === 0) {
        this.functionLine2.children[0].children[8].text = ' ';
        this.functionLine2.children[0].children[9].position.set(205, -6, 0);
      } else {
        this.functionLine2.children[0].children[8].text = 'x';
        if ( (Math.round(this.param * 10) / 10) % 1 === 0) {
          this.functionLine2.children[0].children[7].position.set(205, -5, 0);
          this.functionLine2.children[0].children[8].position.set(235, 2, 0);
          this.functionLine2.children[0].children[9].position.set(270, -6, 0);
        } else {
          this.functionLine2.children[0].children[7].position.set(230, -5, 0);
          this.functionLine2.children[0].children[8].position.set(275, 2, 0);
          this.functionLine2.children[0].children[9].position.set(315, -6, 0);
        }
      }
    }
    //重置按钮一的函数图像
    resetButtonFunction1() {
      this.distance = 3;
      this.greenPoint.position.set(-1.5 * 0.3,
        (0.8 * Math.pow( -1.5, 2) + (-4 * -1.5)  + 1) * 0.3, 0);
      this.redPoint.position.set(1.5 * 0.3,
        (0.8 * Math.pow( 1.5, 2) + (-4 * 1.5)  + 1) * 0.3, 0);
      this.drawDashLine();
    }
    //重置按钮二的函数图像
    resetButtonFunction2() {
      this.minValue = -6;
      this.maxValue = 11;
      this.unEablePoint1.position.set(-1.5 * 0.3,
        (0.8 * Math.pow( -1.5, 2) + (this.param * -1.5)  + 1) * 0.3, 0);
      this.unEablePoint2.position.set(1.5 * 0.3,
        (0.8 * Math.pow( 1.5, 2) + (this.param * 1.5)  + 1) * 0.3, 0);
      this.drawDashLine2();
    }
    //修改切换不同按钮状态下数值
    changeButtonFunction(enable: boolean) {
      //按钮一对应的函数
      this.functionLine1.visible = enable;
      this.axisLine1.visible = enable;
      this.redPoint.visible = enable;
      this.greenPoint.visible = enable;
      this.removeAuxiliary();
      //按钮二对应的函数
      this.functionLine2.visible = !enable;
      this.axisLine2.visible = !enable;
      this.unEablePoint1.visible = !enable;
      this.unEablePoint2.visible = !enable;
      this.removeAuxiliary2();
    }
    //创建函数方程式
    createFuntionText(color: string) {
      const text1 = ThreeUtil.createNormalText('(', 25, 0, 0, '#18A2FF', 1);
      const text2 = ThreeUtil.createNewRomanText('x', 45, 2, 0, '#18A2FF', 1);
      const text3 = ThreeUtil.createNormalText(')', 60, 0, 0, '#18A2FF', 1);
      const text4     = ThreeUtil.createNormalText('=0.8', 110, -5, 0, '#18A2FF', 0.75);
      const text5 = ThreeUtil.createNewRomanText('x', 160, 2, 0, '#18A2FF', 1);
      const text6 = ThreeUtil.createNormalText('²', 180, 0, 0, '#18A2FF', 1);
      const text7 = ThreeUtil.createNormalText('-4', 205, -5, 0, color, 0.8);
      const text8 =  ThreeUtil.createNewRomanText('x', 235, 2, 0, '#18A2FF', 1);
      const text9 = ThreeUtil.createNormalText('+1', 270, -6, 0, '#18A2FF', 0.8);
      const testY = (0.8 * Math.pow( this.maxValue, 2) + (this.param * this.maxValue) + 1) * 0.3;

      const functionString = ThreeUtil.createNewRomanText('f ', (this.axisLine1.position.x + 5), testY, 0, '#18A2FF', 0.025);
      functionString.add(text1);
      functionString.add(text2);
      functionString.add(text3);
      functionString.add(text4);
      functionString.add(text5);
      functionString.add(text6);
      functionString.add(text7);
      functionString.add(text8);
      functionString.add(text9);

      return functionString;
    }
}




