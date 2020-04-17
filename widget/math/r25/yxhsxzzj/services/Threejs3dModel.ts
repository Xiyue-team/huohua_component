import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { Helper } from './Helper';
import { Config } from './Config';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { CurveLine } from '../../../../../src/three/component/CurveLine';
import { MathConst } from '../../../../../src/config/MathConst';
import { Line } from '../../../../../src/three/component/Line';
import * as one from './../sub_static/one.png';
import * as two from './../sub_static/two.png';
import * as three from './../sub_static/three.png';
import * as four from './../sub_static/four.png';
import * as negativeOne from './../sub_static/negativeOne.png';
import * as negativeTwo from './../sub_static/negativeTwo.png';
import * as negativeThree from './../sub_static/negativeThree.png';
import * as negativeFour from './../sub_static/negativeFour.png';

const TrackballControls = require('three-trackballcontrols');
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private axisGroup = new THREE.Group();
    private helper = new Helper();
    private xAxis: THREE.Mesh;
    private xArrow: THREE.Mesh;
    private highLightAxis: THREE.Mesh;
    private highLightArrow: THREE.Mesh;
    private curveLineHelper = new CurveLine();
    private lineHelper = new Line();
    private cosPoint: THREE.Vector2[];
    private centerGroup = new THREE.Group();
    private arrowGroup = new THREE.Group();
    private redArrow: any [] = [];
    private greenArrow: any[] = [];
    private moveAnimation: any[] = [];
    private dashFunctionLine: any[] = [];
    private symmetry: any[] = [];
    private symmetryGroup = new THREE.Group();
    private foldAnimation: any[] = [];
    private periodicDashLine: any;
    private obstructionPlane: THREE.Mesh[] = [];
    private periodicAniamtion: any;

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
        this.preLoad();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        this.createSinFunction();
        this.createCenter();
        this.createDashLine();
        this.createDashFunctionLine();
        this.createMonotonicArrow();
        this.createMonotonicAnimation();
        this.createRotateAnimation();
        this.createPeriodicDashLine();
        this.createObstruction();
        this.createAxisText();
        this.createPeriodicAniamtion();
        this.render();
    }

    preLoad() {
      const imageArray = [one, two, three, four, negativeOne, negativeTwo, negativeThree, negativeFour];
      console.log(imageArray);
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
        this.camera.position.set(0,  0,  40);
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
        this.highLightAxis  = this.helper.createLine(Config.xAxisLength, Config.axisWidth, Config.axisHighlightColor);
        this.highLightArrow = this.helper.createArrow(Config.arrowSize, Config.axisHighlightColor);
        this.xAxis   = this.helper.createLine(Config.xAxisLength, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        this.xArrow  = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        const yAxis  = this.helper.createLine(Config.axisWidth, Config.yAxisLength, Config.axisColor, Config.axisOpacity);
        const yArrow = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        yArrow.rotation.z = Math.PI / 2;

        yArrow.position.set(Config.yArrowPosition.x, Config.yArrowPosition.y, Config.yArrowPosition.z);
        this.xArrow.position.set(Config.xArrowPosition.x, Config.xArrowPosition.y, Config.xArrowPosition.z);
        this.highLightArrow.position.set(Config.xArrowPosition.x, Config.xArrowPosition.y, Config.xArrowPosition.z);
        yAxis.add(yArrow);
        const ticks1 = this.helper.createLine(Config.ticksLength, Config.ticksWidth, Config.axisColor, Config.axisOpacity);
        const ticks2 = ticks1.clone();

        ticks1.position.set(Config.ticksPosition_top.x, Config.ticksPosition_top.y, Config.ticksPosition_top.z);
        ticks2.position.set(Config.ticksPosition_bottom.x, Config.ticksPosition_bottom.y, Config.ticksPosition_bottom.z);

        this.highLightAxis.add(this.highLightArrow);
        this.xAxis.add(this.xArrow);
        this.axisGroup.add(this.xAxis, this.highLightAxis, yAxis, ticks1, ticks2);
        this.axisGroup.position.set(-10, 0, 0);
        this.scene.add(this.axisGroup);
        this.highLightAxis.visible = false;
    }

    createAxisText() {
      const x = ThreeUtil.createNewRomanText('x' , Config.textPosition_x.x, Config.textPosition_x.y,
        Config.textPosition_x.z, Config.textColor, Config.textScale);
      const y = ThreeUtil.createNewRomanText('y', Config.textPosition_y.x, Config.textPosition_y.y,
        Config.textPosition_y.z, Config.textColor, Config.textScale);
      const o = ThreeUtil.createNewRomanText('O', Config.textPosition_o.x, Config.textPosition_o.y,
        Config.textPosition_o.z, Config.textColor_white, Config.textScale / 2);

      const number = [];
      number.push(ThreeUtil.createNormalText('1', -0.5 , 1.5, 0, '#FFFFFF', Config.textScale));
      number.push(ThreeUtil.createNormalText('-1', -0.5 , -0.5, 0, '#FFFFFF', Config.textScale));
      for (let i = 0; i < number.length; i++) {
        this.axisGroup.add(number[i]);
      }

      const yPosition = -2;
      const z = 0;
      const scale = 0.6;
      const texts = [];
      texts.push(ThreeUtil.createImg(1.2 * scale, 1.2 * scale, one, Math.PI, yPosition - 0.2, z));
      texts.push(ThreeUtil.createImg(2.4 * scale, 1.8 * scale, two, Math.PI * 2, yPosition, z));
      texts.push(ThreeUtil.createImg(2.4 * scale, 1.8 * scale, three, Math.PI * 3, yPosition, z));
      texts.push(ThreeUtil.createImg(2.4 * scale, 1.8 * scale, four, Math.PI * 4, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeOne, Math.PI * -1, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeTwo, Math.PI * -2, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeThree, Math.PI * -3, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeFour, Math.PI * -4, yPosition, z));
      for (let i = 0; i < texts.length; i++) {
        this.axisGroup.add(texts[i]);
      }
      this.axisGroup.add(x, y, o); //, number1[3]
    }

    //创建cos函数
    createSinFunction() {

        this.cosPoint = [];
        for (let i = -Math.PI * 4; i <= 4 * Math.PI; i += Math.PI * 0.1) {
            this.cosPoint.push(new THREE.Vector2(i, Math.cos(i)));
        }
        const cos = this.curveLineHelper.createCurveLine({
        pointList: this.cosPoint,
        lineWidth: 0.2,
        style: 2,
        color: '#FFD621',
      });
        this.axisGroup.add(cos);
    }

    //创建单调性箭头
    createMonotonicArrow() {
        const redline  = ThreeUtil.createLine(Config.arrowOpation.length, Config.arrowOpation.lineWidth, Config.arrowColor_red);
        const redArrow = this.helper.createArrow(Config.arrowOpation.arrowSize, Config.arrowColor_red);
        redArrow.position.x = Config.arrowOpation.length / 2;
        const greenline  = ThreeUtil.createLine(Config.arrowOpation.length, Config.arrowOpation.lineWidth, Config.arrowColor_green);
        const greenArrow = this.helper.createArrow(Config.arrowOpation.arrowSize, Config.arrowColor_green);
        greenArrow.position.x = Config.arrowOpation.length / 2;
        redline.add(redArrow);
        greenline.add(greenArrow);
        for (let i = 0; i < 4; i++) {
          this.redArrow.push(redline.clone());
          this.greenArrow.push(greenline.clone());
          this.redArrow[i].rotation.z =  Math.atan(Math.sin((-2.5 * Math.PI) + (i * 2 * Math.PI)));
          this.greenArrow[i].rotation.z = Math.atan(Math.sin((-3.5 * Math.PI) + (i * 2 * Math.PI)));
          this.redArrow[i].position.set((-3 * Math.PI) + (i * 2 * Math.PI), Math.cos((-3 * Math.PI) + (i * 2 * Math.PI)), 0);
          this.greenArrow[i].position.set((-4 * Math.PI) + (i * 2 * Math.PI), Math.cos((-4 * Math.PI) + (i * 2 * Math.PI)), 0);
          this.arrowGroup.add(this.redArrow[i], this.greenArrow[i]);
        }
        this.arrowGroup.visible = false;
        this.axisGroup.add(this.arrowGroup);

    }


    //创建单调性按钮动画
    createMonotonicAnimation() {
      const startPosition = -4 * Math.PI;
      const endPosition = -3.3 * Math.PI;
      const startPosition2 = -3 * Math.PI;
      const endPosition2 = -2.3 * Math.PI;
      this.moveAnimation[0] = this.helper.createArrowMoveAnimation(this.greenArrow, startPosition, endPosition);
      this.moveAnimation[1] = this.helper.createArrowMoveAnimation(this.redArrow, startPosition2,
        endPosition2, () => {this.moveAnimation[0].play(); });
    }



    //创建奇偶性函数虚线
    createDashFunctionLine() {
      const cosPoint1 = [];
      const cosPoint2 = [];
      for (let i = 0; i < this.cosPoint.length / 2; i++) {
        cosPoint1.push(this.cosPoint[i]);
        cosPoint2.push(this.cosPoint[40 + i]);
      }


      this.dashFunctionLine[0] = ThreeUtil.createPoint(1, MathConst.lineColor_red, 0, 0, 0.0001);
      const line = this.curveLineHelper.createCurveLine({
        pointList: cosPoint1,
        lineWidth: 0.2,
        style: 1,
        dashArray: 0.1,
        color: MathConst.lineColor_red,
      });

      this.dashFunctionLine[1] = ThreeUtil.createPoint(1, MathConst.lineColor_red, 0, 0, 0.0001);
      const line1 = this.curveLineHelper.createCurveLine({
        pointList: cosPoint2,
        lineWidth: 0.2,
        style: 1,
        dashArray: 0.1,
        color: MathConst.lineColor_red,
      });

      this.dashFunctionLine[0].add(line);
      this.dashFunctionLine[1].add(line1);
      for (let i = 0; i < this.dashFunctionLine.length; i++) {
        this.axisGroup.add(this.dashFunctionLine[i]);
        this.dashFunctionLine[i].visible = false;
      }

    }

    //创建奇偶性动画
    createRotateAnimation() {
        this.foldAnimation[0] = this.helper.createFoldAniamtion(this.dashFunctionLine[0], 0, Math.PI, () => {
          this.dashFunctionLine[1].visible = true;
          this.foldAnimation[1].play();
        });
        this.foldAnimation[1] = this.helper.createFoldAniamtion(this.dashFunctionLine[1], 0, -Math.PI);

    }

    //创建函数对称轴虚线
    createDashLine() {
        const startPosition = -4 * Math.PI;
        const isIpoine = (window as any)['env'].browserInfo.isIphone || (window as any)['env'].browserInfo.isIpad;
        for (let i = 0; i < 9; i++) {
          this.symmetry.push(this.lineHelper.createLine({
            startPoint: new THREE.Vector3(0, 10, 0),
            endPoint: new THREE.Vector3(0, -10, 0),
            lineWidth: 100,
            lineWidthScale: 0.01,
            dashLine: true,
            color: MathConst.lineColor_red,
            dashSize: isIpoine ? 1 : 5,
            gapSize: isIpoine ? 1 : 5
          }));
          this.symmetry[i].position.set(startPosition + (i * Math.PI), 0, 0);
          this.symmetryGroup.add(this.symmetry[i]);
        }
        this.symmetryGroup.visible = false;
        this.axisGroup.add(this.symmetryGroup);
    }

    //创建对称中心的圆点
    createCenter() {
        const point  = ThreeUtil.createPoint(Config.pointOption.r, Config.pointOption.color, 0, 0, 1);
        const points = [];
        for (let i = 0; i < 8; i++) {
            points.push(point.clone());
        }
        for (let i = 0; i < 4; i++) {
            points[i].position.x = (0.5 + i) * Math.PI;
            points[i + 4].position.x =  -(0.5 + i) * Math.PI;
            this.centerGroup.add(points[i], points[i + 4]);
        }
        this.centerGroup.visible = false;
        this.axisGroup.add(this.centerGroup);
    }

    //创建周期性移动的虚线
    createPeriodicDashLine() {
        const dashLinePoint: THREE.Vector2[] = [];
        for (let i = -6 * Math.PI; i < 4 * Math.PI; i += Math.PI * 0.1) {
            dashLinePoint.push(new THREE.Vector2(i, Math.cos(i)));
        }
        this.periodicDashLine = this.curveLineHelper.createCurveLine({
          pointList: dashLinePoint,
          lineWidth: 0.2,
          style: 1,
          dashArray: 0.05,
          color: MathConst.lineColor_red,
        });
        this.periodicDashLine.visible = false;
        this.axisGroup.add(this.periodicDashLine);
    }
    //创建遮挡物
    createObstruction() {
        this.obstructionPlane[0] = ThreeUtil.createPlane(7, 2.2, '#2D2D2D', 1);
        const line = this.helper.createLine(Math.PI, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        line.position.set(Math.PI / 2 + (3.5 - Math.PI), 0, 0);
        this.obstructionPlane[0].position.set((-4 * Math.PI) - 3.5, 0, 0);
        this.obstructionPlane[0].add(line);
        this.obstructionPlane[1] = ThreeUtil.createPlane(7, 2.2, '#2d2d2d', 1);
        const line1 = this.helper.createLine(Math.PI, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        const arrow = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        line1.add(arrow);
        this.obstructionPlane[1].add(line1);
        arrow.position.set(Math.PI / 2, 0, 0);
        this.obstructionPlane[1].position.set((4 * Math.PI) + 3.5, 0, 0);
        line1.position.set((-Math.PI / 2) - (3.5 - Math.PI), 0, 0);
        this.obstructionPlane[0].visible = false;
        this.obstructionPlane[1].visible = false;
        this.axisGroup.add(this.obstructionPlane[0], this.obstructionPlane[1]);

    }

    //创建周期性移动的动画
    createPeriodicAniamtion() {
        this.periodicAniamtion = this.helper.createPeriodicMoveAnimation(this.periodicDashLine);
    }

    //定义域按钮功能
    domainEvent(boolean: boolean) {
        this.xAxis.visible = !boolean;
        this.highLightAxis.visible = boolean;
    }

    //对称轴按钮功能
    symmetryAxisEvent(boolean: boolean) {
      this.symmetryGroup.visible = boolean;
    }

    //单调性按钮功能
    monotonicEvent(boolean: boolean) {
      this.arrowGroup.visible = boolean;
      for (let i = 0; i < this.moveAnimation.length; i++) {
        this.moveAnimation[i].progress(0);
        this.moveAnimation[i].pause();
      }
      this.moveAnimation[1].play();
    }
    //对称中心按钮功能
    symmetricCenterEvent(boolean: boolean) {
      this.centerGroup.visible = boolean;
    }
    //奇偶性按钮功能
    parityEvent(boolean: boolean) {
      this.dashFunctionLine[0].visible = boolean;
      if (boolean === false) {
        this.dashFunctionLine[1].visible = boolean;
      }
      for (let i = 0; i < this.foldAnimation.length; i++) {
        this.foldAnimation[i].progress(0);
        this.foldAnimation[i].pause();
      }
      this.foldAnimation[0].play();

    }
    //周期性按钮功能
    periodicEvent(boolean: boolean) {
        for (let i = 0; i < this.obstructionPlane.length; i++) {
          this.obstructionPlane[i].visible = boolean;
        }
        this.periodicDashLine.visible = boolean;
        this.periodicAniamtion.progress(0);
        this.periodicAniamtion.pause();
        this.periodicAniamtion.play();
    }

    //隐藏所有功能
    hideAll() {
      this.xAxis.visible = true;
      this.highLightAxis.visible = false;
      this.symmetryGroup.visible = false;
      this.arrowGroup.visible = false;
      this.centerGroup.visible = false;
      this.dashFunctionLine[0].visible = false;
      this.dashFunctionLine[1].visible = false;
      for (let i = 0; i < this.obstructionPlane.length; i++) {
        this.obstructionPlane[i].visible = false;
      }
      for (let i = 0; i < this.foldAnimation.length; i++) {
        this.foldAnimation[i].progress(0);
        this.foldAnimation[i].pause();
      }
      this.periodicDashLine.visible = false;
    }

}




