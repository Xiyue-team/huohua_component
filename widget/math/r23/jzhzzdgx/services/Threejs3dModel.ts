import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';
import { Helper } from './Helper';
import { Line } from '../../../../../src/three/component/Line';
import { MathConst } from '../../../../../src/config/MathConst';
import { MathHelper } from '../../../../../src/util/MathHelper';
import { CurveLine } from './CurveLine';
import { CreateText } from './createText';
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
const _lodash = require('lodash');
import frame1 from '../sub_static/frame1.png';
import frame2 from '../sub_static/frame2.png';

export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private axisGroup = new THREE.Group();
    private helper = new Helper();

    // 白色点
    whitePoint: any = [];

    // 蓝色线
    blueLine: any;

    curveLine = new CurveLine();
    line = new Line();

    // 黄色拖动点
    yellowPoint: any = [];

    // 白色虚线
    topWhiteLine: any;
    bottomWhiteLine: any;

    // 黄色线
    yellowLine1: any;
    yellowLine2: any;

    // 红色虚线
    redLine: any = [];

    // 白色点拖动估计
    limitWhitePointX: any = [];

    createText = new CreateText();

    // 说明文字
    explainText1: any;
    explainText2: any;

    // 极大值极小值
    maximumValue: any;
    minimumValue: any;

    // 最大值最小值
    maxValue: any = [];
    minValue: any = [];

    width = window.innerWidth;

    staticText1: any;
    staticText2: any;

    isShowExplainText1 = false;
    isShowExplainText2 = false;

    frameImage1: any;
    frameImage2: any;

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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initWhitePoint();
        this.initBlueLine();
        this.initWhiteLine();
        this.initYellowLine();
        this.initRedLine();
        this.initText();
        this.initExplainText();
        this.initWhitePointDragEvent();
        this.initYellowPointDragEvent();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2d2d2d );
        this.scene.position.x = -50;
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  300);
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

    //创建坐标系
    createAxis() {
      const axis = AxisUtil.createAxis(({
        isTicks: false,
        axisColor: '#ffffff',
        axisOpacity: 0.32,
        fontColor: '#6f6f6f',
        AxisXNumArray: ['1', '2', '3', '4', '5'],
        XtickDistance: 20,
        YtickDistance: 20
      } as any));
      this.axisGroup.add(axis);
      // this.axisGroup.position.y = - 10;
      this.scene.add(this.axisGroup);
    }

    // 添加白色点
    initWhitePoint() {
      this.yellowPoint[0] = this.helper.createDragPoint(-125, 0, '#FFD621');
      this.scene.add(this.yellowPoint[0]);

      this.yellowPoint[1] = this.helper.createDragPoint(164.5, 0, '#FFD621');
      this.scene.add(this.yellowPoint[1]);

      this.whitePoint[0] = this.helper.createDragPoint(-125, -91);
      this.whitePoint[0].name = 'a';
      this.scene.add(this.whitePoint[0]);

      this.whitePoint[1] = this.helper.createDragPoint(-62.5, 66);
      this.whitePoint[1].name = 'x1';
      this.scene.add(this.whitePoint[1]);

      this.whitePoint[2] = this.helper.createDragPoint(-15.9, -37.7);
      this.whitePoint[2].name = 'x2';
      this.scene.add(this.whitePoint[2]);

      this.whitePoint[3] = this.helper.createDragPoint(6, 18.8);
      this.whitePoint[3].name = 'x3';
      this.scene.add(this.whitePoint[3]);

      this.whitePoint[4] = this.helper.createDragPoint(42.5, -91);
      this.whitePoint[4].name = 'x4';
      this.scene.add(this.whitePoint[4]);

      this.whitePoint[5] = this.helper.createDragPoint(93.5, 141);
      this.whitePoint[5].name = 'x5';
      this.scene.add(this.whitePoint[5]);

      this.whitePoint[6] = this.helper.createDragPoint(164.5, -38);
      this.whitePoint[6].name = 'b';
      this.scene.add(this.whitePoint[6]);

      this.limitWhitePointX[0] = this.yellowPoint[0].position.x;
      this.limitWhitePointX[1] = this.whitePoint[1].position.x;
      this.limitWhitePointX[2] = this.whitePoint[2].position.x;
      this.limitWhitePointX[3] = this.whitePoint[3].position.x;
      this.limitWhitePointX[4] = this.whitePoint[4].position.x;
      this.limitWhitePointX[5] = this.whitePoint[5].position.x;
      this.limitWhitePointX[6] = this.yellowPoint[1].position.x;
    }

    // 添加蓝色线
    initBlueLine() {
      const Curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( this.whitePoint[0].position.x, this.whitePoint[0].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[1].position.x, this.whitePoint[1].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[2].position.x, this.whitePoint[2].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[3].position.x, this.whitePoint[3].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[4].position.x, this.whitePoint[4].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[5].position.x, this.whitePoint[5].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[6].position.x, this.whitePoint[6].position.y, -1 ),
      ] );
      const points = Curve.getPoints( 100 );
      this.blueLine = this.curveLine.createCurveLine({
        pointList: points,
        color: '#0199ff',
        style: 2,
        lineWidth: 1
      });
      this.scene.add(this.blueLine);
    }

    // 添加白色线
    initWhiteLine() {
      this.topWhiteLine = this.line.createLine({
        startPoint: new THREE.Vector3(-120, 0, 0),
        endPoint: new THREE.Vector3(120, 0, 0),
        lineWidth: 1000,
        color: '#ffffff',
        dashLine: true,
        lineWidthScale: 0.002,
      });
      this.topWhiteLine.position.y = this.whitePoint[5].position.y;
      this.scene.add(this.topWhiteLine);

      this.bottomWhiteLine = this.line.createLine({
        startPoint: new THREE.Vector3(-120, 0, 0),
        endPoint: new THREE.Vector3(120, 0, 0),
        lineWidth: 1000,
        color: '#ffffff',
        lineWidthScale: 0.002,
        dashLine: true
      });
      this.bottomWhiteLine.position.y = this.whitePoint[0].position.y;
      this.scene.add(this.bottomWhiteLine);
    }

    // 添加黄色线
    initYellowLine() {
      this.yellowLine1 = this.line.createLine({
        startPoint: new THREE.Vector3(this.whitePoint[0].position.x, this.whitePoint[0].position.y, 0),
        endPoint: new THREE.Vector3(this.whitePoint[0].position.x, 0, 0),
        lineWidth: 1000,
        color: '#FFD621',
        lineWidthScale: 0.002,
        dashLine: true
      });
      this.scene.add(this.yellowLine1);

      this.yellowLine2 = this.line.createLine({
        startPoint: new THREE.Vector3(this.whitePoint[6].position.x, this.whitePoint[6].position.y, 0),
        endPoint: new THREE.Vector3(this.whitePoint[6].position.x, 0, 0),
        lineWidth: 1000,
        color: '#FFD621',
        lineWidthScale: 0.002,
        dashLine: true
      });
      this.scene.add(this.yellowLine2);
    }

    // 添加红色线
    initRedLine() {
      for (let i = 0; i < 5; i++) {
        this.redLine[i] = this.line.createLine({
          startPoint: new THREE.Vector3(this.whitePoint[i + 1].position.x, this.whitePoint[i + 1].position.y, 0),
          endPoint: new THREE.Vector3(this.whitePoint[i + 1].position.x, 0, 0),
          lineWidth: 1000,
          color: '#FF5A5A',
          lineWidthScale: 0.002,
          dashLine: true
        });
        this.scene.add(this.redLine[i]);
      }
    }

    // 添加文字
    initText () {
      const x1 = this.createText.createText('x1', 0.2, this.whitePoint[1].position.x, 0);
      this.scene.add(x1);
      const x2 = this.createText.createText('x2', 0.2, this.whitePoint[2].position.x, 10);
      this.scene.add(x2);
      const x3 = this.createText.createText('x3', 0.2, this.whitePoint[3].position.x, 0);
      this.scene.add(x3);
      const x4 = this.createText.createText('x4', 0.2, this.whitePoint[4].position.x, 10);
      this.scene.add(x4);
      const x5 = this.createText.createText('x5', 0.2, this.whitePoint[5].position.x, 0);
      this.scene.add(x5);
      const a = this.createText.createText('a', 0.2, 0, 10);
      this.yellowPoint[0].add(a);
      const b = this.createText.createText('b', 0.2, 0, 10);
      this.yellowPoint[1].add(b);
    }

    initButton() {

    }

    // 添加说明文字
    initExplainText() {
      // 计算视图的宽度
      const vFOV = 50 * Math.PI / 180;        // convert vertical fov to radians
      const height = 2 * Math.tan( vFOV / 2 ) * 300; // visible height
      const aspect = this.width / this.height;
      const width = height * aspect;

      let frameImage1X = width / 2 - 292 / 4 - 10;
      if (window.env.browserInfo.isIphone) {
        frameImage1X -= 10;
      } else if (this.width < 740) {
        frameImage1X -= 40;
      }


      this.frameImage1 = ThreeUtil.createImg(320 / 2, 90 / 2, frame1, frameImage1X, -68);
      this.scene.add(this.frameImage1);

      const frameImage1LeftX = this.frameImage1.position.x - 320 / 4;
      const frameImage1RightX = this.frameImage1.position.x + 320 / 4;


      this.staticText1 = this.createText.createText('在区间[a,b]上有: ', 0.15, frameImage1LeftX + 15, -60);
      this.scene.add(this.staticText1);
      this.explainText1 = this.createText.createText('极大值点: x1,x3,x5;  极小值点: x2,x4;', 0.15, frameImage1LeftX + 15, -70);
      this.scene.add(this.explainText1);

      const frameImage2X = frameImage1RightX - 254 / 4;
      const frameImage2LeftX = frameImage1RightX - 254 / 2;

      this.frameImage2 = ThreeUtil.createImg(254 / 2, 90 / 2, frame2, frameImage2X, -110);
      this.scene.add(this.frameImage2);
      this.staticText2 = this.createText.createText('在区间[a,b]上有: ', 0.15, frameImage2LeftX + 18, -95);
      this.scene.add(this.staticText2);
      this.explainText2 = new THREE.Group();
      const maxValue = this.createText.createText('最大值点: x5,x4,x4,x4,x4,a;', 0.15, 0, 0);
      const minValue = this.createText.createText('最小值点: a,x4;', 0.15, 0, -10);
      this.explainText2.add(maxValue, minValue);
      this.explainText2.position.x = frameImage2LeftX + 18;
      this.explainText2.position.y = -105;
      this.scene.add(this.explainText2);

      this.staticText1.visible = this.isShowExplainText1;
      this.explainText1.visible = this.isShowExplainText1;
      this.staticText2.visible = this.isShowExplainText2;
      this.explainText2.visible = this.isShowExplainText2;
      this.topWhiteLine.visible = this.isShowExplainText2;
      this.bottomWhiteLine.visible = this.isShowExplainText2;
      this.frameImage1.visible = this.isShowExplainText1;
      this.frameImage2.visible = this.isShowExplainText2;
    }

    // 初始化白色点拖动事件
    initWhitePointDragEvent() {
      for (let i = 0; i < this.whitePoint.length; i++) {
        const dargControls1 = new dragcontrols([this.whitePoint[i]], this.camera, this.renderer.domElement);
        dargControls1.addEventListener( 'drag',  () => {

          this.limitWhitePoint(this.whitePoint[i], this.limitWhitePointX[i]);
          this.updateBlueLine();
          this.updateRedLine();
          this.updateYellowLine();
          this.updateWhiteLine();

          if (!window.env.browserInfo.isIpad) {
            setTimeout(() => {
              this.maximumValue = this.helper.getMaximumValue(this.whitePoint);
              this.minimumValue = this.helper.getMinimumValue(this.whitePoint);
              this.maxValue = this.helper.getMaxValue(this.whitePoint);
              this.minValue = this.helper.getMinValue(this.whitePoint);
              this.updateExplainText();
            });
          }
        });

        dargControls1.addEventListener( 'dragend',  () => {
          this.maximumValue = this.helper.getMaximumValue(this.whitePoint);
          this.minimumValue = this.helper.getMinimumValue(this.whitePoint);
          this.maxValue = this.helper.getMaxValue(this.whitePoint);
          this.minValue = this.helper.getMinValue(this.whitePoint);
          this.updateExplainText();
        });
      }

      // this.dragevent();
    }

    // 初始化黄色点拖动事件
    initYellowPointDragEvent() {
      const dargControls1 = new dragcontrols([this.yellowPoint[0]], this.camera, this.renderer.domElement);
      dargControls1.addEventListener( 'drag',  () => {
        this.limitYellowPoint(this.yellowPoint[0], -100, this.whitePoint[1].position.x);
        this.whitePoint[0].position.x = this.yellowPoint[0].position.x;
        this.updateLimitWhitePointX();
        this.updateYellowLine();
        this.updateBlueLine();
      });

      const dargControls2 = new dragcontrols([this.yellowPoint[1]], this.camera, this.renderer.domElement);
      dargControls2.addEventListener( 'drag',  () => {
        this.limitYellowPoint(this.yellowPoint[1], this.whitePoint[5].position.x, 100);
        this.whitePoint[6].position.x = this.yellowPoint[1].position.x;
        this.updateLimitWhitePointX();
        this.updateYellowLine();
        this.updateBlueLine();
      });
    }

    // 限制白色点的拖动轨迹
    limitWhitePoint(point: any, x: number) {
      point.position.x = x;
      if (point.position.y > 100) {
        point.position.y = 100;
      }
      if (point.position.y < -100) {
        point.position.y = -100;
      }
    }

    // 更新白色点的x轴拖动轨迹
    updateLimitWhitePointX() {
      this.limitWhitePointX = [];
      this.limitWhitePointX[0] = this.yellowPoint[0].position.x;
      this.limitWhitePointX[1] = this.whitePoint[1].position.x;
      this.limitWhitePointX[2] = this.whitePoint[2].position.x;
      this.limitWhitePointX[3] = this.whitePoint[3].position.x;
      this.limitWhitePointX[4] = this.whitePoint[4].position.x;
      this.limitWhitePointX[5] = this.whitePoint[5].position.x;
      this.limitWhitePointX[6] = this.yellowPoint[1].position.x;
    }

    // 限制黄色点的拖动轨迹
    limitYellowPoint(point: any, startX: number, endX: number) {
      point.position.y = 0;
      if (point.position.x > endX) {
        point.position.x = endX;
      }

      if (point.position.x < startX) {
        point.position.x = startX;
      }
    }

    // 更新蓝色线
    updateBlueLine() {
      this.helper.removeLine(this.blueLine, this.scene);
      const Curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( this.whitePoint[0].position.x, this.whitePoint[0].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[1].position.x, this.whitePoint[1].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[2].position.x, this.whitePoint[2].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[3].position.x, this.whitePoint[3].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[4].position.x, this.whitePoint[4].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[5].position.x, this.whitePoint[5].position.y, -1 ),
        new THREE.Vector3( this.whitePoint[6].position.x, this.whitePoint[6].position.y, -1 ),
      ] );
      const points = Curve.getPoints( 100 );
      this.blueLine = this.curveLine.createCurveLine({
        pointList: points,
        color: '#0199ff',
        style: 2,
        lineWidth: 1
      });
      this.scene.add(this.blueLine);
    }

    // 更新红色线
    updateRedLine() {
      for (let i = 0; i < this.redLine.length; i++) {
        this.helper.removeLine(this.redLine[i], this.scene);
        this.redLine[i] = this.line.createLine({
          startPoint: new THREE.Vector3(this.whitePoint[i + 1].position.x, this.whitePoint[i + 1].position.y, 0),
          endPoint: new THREE.Vector3(this.whitePoint[i + 1].position.x, 0, 0),
          lineWidth: 1000,
          color: '#FF5A5A',
          lineWidthScale: 0.002,
          dashLine: true
        });
        this.scene.add(this.redLine[i]);
      }
    }

    // 更新黄色线
    updateYellowLine() {
      this.helper.removeLine(this.yellowLine1, this.scene);
      this.helper.removeLine(this.yellowLine2, this.scene);
      this.yellowLine1 = this.line.createLine({
        startPoint: new THREE.Vector3(this.whitePoint[0].position.x, this.whitePoint[0].position.y, 0),
        endPoint: new THREE.Vector3(this.yellowPoint[0].position.x, this.yellowPoint[0].position.y, 0),
        lineWidth: 1000,
        color: '#FFD621',
        lineWidthScale: 0.002,
        dashLine: true
      });
      this.yellowLine2 = this.line.createLine({
        startPoint: new THREE.Vector3(this.whitePoint[6].position.x, this.whitePoint[6].position.y, 0),
        endPoint: new THREE.Vector3(this.yellowPoint[1].position.x, this.yellowPoint[1].position.y, 0),
        lineWidth: 1000,
        color: '#FFD621',
        lineWidthScale: 0.002,
        dashLine: true
      });
      this.scene.add(this.yellowLine1);
      this.scene.add(this.yellowLine2);
    }

    // 更新白色线的位置
    updateWhiteLine() {
      const pointY = [];
      for (let i = 0; i < 7; i++) {
        pointY[i] = this.whitePoint[i].position.y;
      }
      this.topWhiteLine.position.y = _lodash.orderBy(pointY)[6];
      this.bottomWhiteLine.position.y = _lodash.orderBy(pointY)[0];
    }

    // 更新极大值和极小值 最大值 最小值
    updateExplainText() {
      const frameImage1LeftX = this.frameImage1.position.x - 320 / 4;
      const frameImage1RightX = this.frameImage1.position.x + 320 / 4;
      const frameImage2LeftX = frameImage1RightX - 254 / 2;

      this.scene.remove(this.explainText1);
      this.explainText1 = this.createText.createText(
        this.helper.updateMaxMiniumValue(this.maximumValue, this.minimumValue), 0.15, frameImage1LeftX + 15, -70);
      this.scene.add(this.explainText1);

      this.scene.remove(this.explainText2);
      this.explainText2 = new THREE.Group();
      this.explainText2.add(this.createText.createText(
        this.helper.updateMaxValue(this.maxValue), 0.15, 0, 0));
      this.explainText2.add(this.createText.createText(
        this.helper.updateMinValue(this.minValue), 0.15, 0, -10));
      this.explainText2.position.set(frameImage2LeftX + 18, -105, 0);
      this.scene.add(this.explainText2);

      this.staticText1.visible = this.isShowExplainText1;
      this.explainText1.visible = this.isShowExplainText1;
      this.staticText2.visible = this.isShowExplainText2;
      this.explainText2.visible = this.isShowExplainText2;
      this.topWhiteLine.visible = this.isShowExplainText2;
      this.bottomWhiteLine.visible = this.isShowExplainText2;
      this.frameImage1.visible = this.isShowExplainText1;
      this.frameImage2.visible = this.isShowExplainText2;
    }

    showExplainText1(isShow: boolean) {
      this.isShowExplainText1 = isShow;
      this.staticText1.visible = isShow;
      this.explainText1.visible = isShow;
      this.frameImage1.visible = isShow;
    }

    showExplainText2(isShow: boolean) {
      this.isShowExplainText2 = isShow;
      this.staticText2.visible = isShow;
      this.explainText2.visible = isShow;
      this.topWhiteLine.visible = isShow;
      this.bottomWhiteLine.visible = isShow;
      this.frameImage2.visible = isShow;
    }

    //重置方法
    reset() {
      this.resetPointXY(this.whitePoint[0], -125, -91);
      this.resetPointXY(this.whitePoint[1], -62.5, 66);
      this.resetPointXY(this.whitePoint[2], -15.9, -37.7);
      this.resetPointXY(this.whitePoint[3], 6, 18.8);
      this.resetPointXY(this.whitePoint[4], 42.5, -91);
      this.resetPointXY(this.whitePoint[5], 93.5, 141);
      this.resetPointXY(this.whitePoint[6], 164.5, -38);
      this.resetPointXY(this.yellowPoint[0], -125, 0);
      this.resetPointXY(this.yellowPoint[1], 164.5, 0);

      this.updateBlueLine();
      this.updateRedLine();
      this.updateYellowLine();
      this.updateWhiteLine();

      this.maximumValue = this.helper.getMaximumValue(this.whitePoint);
      this.minimumValue = this.helper.getMinimumValue(this.whitePoint);
      this.maxValue = this.helper.getMaxValue(this.whitePoint);
      this.minValue = this.helper.getMinValue(this.whitePoint);
      this.updateExplainText();

      this.updateLimitWhitePointX();

      this.staticText1.visible = this.isShowExplainText1;
      this.explainText1.visible = this.isShowExplainText1;
      this.staticText2.visible = this.isShowExplainText2;
      this.explainText2.visible = this.isShowExplainText2;
      this.topWhiteLine.visible = this.isShowExplainText2;
      this.bottomWhiteLine.visible = this.isShowExplainText2;
      this.frameImage1.visible = this.isShowExplainText2;
      this.frameImage2.visible = this.isShowExplainText2;
    }

    resetPointXY(point: any, x: number, y: number) {
      point.position.set(x / 2, y / 2, 0);
    }
}




