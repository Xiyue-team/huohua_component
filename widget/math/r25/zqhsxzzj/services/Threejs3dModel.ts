import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
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
import * as negativeOne from './../sub_static/negativeOne.png';
import * as negativeTwo from './../sub_static/negativeTwo.png';
import * as negativeThree from './../sub_static/negativeThree.png';

const TrackballControls = require('three-trackballcontrols');

export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private axisGroup = new THREE.Group();
    private helper = new Helper();
    private xAxis: THREE.Mesh;
    private xArrow: THREE.Mesh;
    private curveLineHelper = new CurveLine();
    private lineHelper = new Line();
    private tanPoint: THREE.Vector2[];
    private centerGroup = new THREE.Group();
    private arrowGroup = new THREE.Group();
    private redArrow: any [] = [];
    private moveAnimation: any[] = [];
    private dashFunctionLine: any[] = [];
    private symmetry: any[] = [];
    private domainGroup = new THREE.Group();
    private rotateAnimation: any;
    private periodicDashGroup = new THREE.Group();
    private obstructionPlane: THREE.Mesh[] = [];
    private periodicAniamtion: any;
    private parityGroup = new THREE.Group();
    private lableGroup = new THREE.Group();

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
        this.createTanFunction();
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
        this.createDistianceLable();
        this.render();
    }

  preLoad() {
    const imageArray = [one, two, three, negativeOne, negativeTwo, negativeThree];
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
        this.xAxis   = this.helper.createLine(Config.xAxisLength, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        this.xArrow  = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        const yAxis  = this.helper.createLine(Config.axisWidth, Config.yAxisLength, Config.axisColor, Config.axisOpacity);
        const yArrow = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        yArrow.rotation.z = Math.PI / 2;

        yArrow.position.set(Config.yArrowPosition.x, Config.yArrowPosition.y, Config.yArrowPosition.z);
        this.xArrow.position.set(Config.xArrowPosition.x, Config.xArrowPosition.y, Config.xArrowPosition.z);
        yAxis.add(yArrow);
        this.xAxis.add(this.xArrow);
        this.axisGroup.add(this.xAxis, yAxis);
        this.axisGroup.position.set(-10, 0, 0);
        this.scene.add(this.axisGroup);
    }

    createAxisText() {
      const x = ThreeUtil.createNewRomanText('x' , Config.textPosition_x.x, Config.textPosition_x.y,
        Config.textPosition_x.z, Config.textColor, Config.textScale);
      const y = ThreeUtil.createNewRomanText('y', Config.textPosition_y.x, Config.textPosition_y.y,
        Config.textPosition_y.z, Config.textColor, Config.textScale);
      const o = ThreeUtil.createNewRomanText('O', Config.textPosition_o.x, Config.textPosition_o.y,
        Config.textPosition_o.z, Config.textColor_white, Config.textScale / 2);

      // const texts1  = [];
      // const texts2  = [];
      // const number1 = [];
      // const number2 = [];
      // const positionY = ((window as any)['env'].browserInfo.isElectron ||
      //   (window as any)['env'].browserInfo.isHuohuaPlayer || (window as any)['env'].browserInfo.isHuohuaApp
      //   || (window as any)['env'].browserInfo.isQQ) ? -6 : 0;
      // for (let i = 0; i < 3 ; i ++) {
      //   texts1.push(ThreeUtil.createNewRomanText('π', ((i + 1) * Math.PI + 0.7), -0.6, 0, Config.textColor_white, Config.textScale));
      //   texts2.push(ThreeUtil.createNewRomanText('π', -((i + 1) * Math.PI - 0.9), -0.6, 0, Config.textColor_white, Config.textScale));
      //   this.axisGroup.add(texts1[i], texts2[i]);
      // }
      //
      // for (let i = 0; i < 2; i++) {
      //   number1.push(ThreeUtil.createNormalText(i + 2 + '', -35, positionY, 0, Config.textColor_white, 1)); //(i + 2) * Math.PI
      //   number2.push(ThreeUtil.createNormalText(-(i + 2) + '', -35,
      //     positionY, 0, Config.textColor_white, 1)); //-((i + 2) * Math.PI)
      //   // this.axisGroup.add(number1[i], number2[i]);
      //   texts1[i + 1].add(number1[i]);
      //   texts2[i + 1].add(number2[i]);
      // }
      //
      // number1.push(ThreeUtil.createNormalText('-', -35, -0.6, 0, Config.textColor_white, 1));
      // texts2[0].add(number1[2]);
      const yPosition = -1.5;
      const z = 0;
      const scale = 0.6;
      const texts = [];
      texts.push(ThreeUtil.createImg(1.2 * scale, 1.2 * scale, one, Math.PI, yPosition - 0.2, z));
      texts.push(ThreeUtil.createImg(2.4 * scale, 1.8 * scale, two, Math.PI * 2, yPosition, z));
      texts.push(ThreeUtil.createImg(2.4 * scale, 1.8 * scale, three, Math.PI * 3, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeOne, Math.PI * -1, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeTwo, Math.PI * -2, yPosition, z));
      texts.push(ThreeUtil.createImg(3.2 * scale, 1.8 * scale, negativeThree, Math.PI * -3, yPosition, z));
      for (let i = 0; i < texts.length; i++) {
        this.axisGroup.add(texts[i]);
      }
      this.axisGroup.add(x, y, o);
    }

    //创建tan函数
    createTanFunction() {
        this.tanPoint = [];
        for (let i = -10; i < 10; i += 0.1) {
            this.tanPoint.push(new THREE.Vector2(Math.atan(i), i));
        }
        const tanLine = this.curveLineHelper.createCurveLine({
          pointList: this.tanPoint,
          lineWidth: 0.2,
          style: 2,
          color: '#FFD621',
        });
        const funcLine = [];
        for (let i = 0; i < 6; i++) {
          funcLine.push(tanLine.clone());
          this.axisGroup.add(funcLine[i]);
        }
        for (let i = 0; i < 3; i++) {
          funcLine[i].position.set(-(i + 1) * Math.PI, 0, 0);
          funcLine[i + 3] .position.set((i + 1) * Math.PI, 0, 0);
        }


      this.axisGroup.add(tanLine);
    }

    //创建单调性箭头
    createMonotonicArrow() {
        const redline  = ThreeUtil.createLine(Config.arrowOpation.length, Config.arrowOpation.lineWidth, Config.arrowColor_red);
        const redArrow = this.helper.createArrow(Config.arrowOpation.arrowSize, Config.arrowColor_red);
        redArrow.position.x = Config.arrowOpation.length / 2;
        redline.add(redArrow);
        const k = Math.pow((1 / Math.cos(Math.atan(-10))), 2);
        for (let i = 0; i < 7; i++) {
          this.redArrow.push(redline.clone());
          this.redArrow[i].rotation.z =  Math.atan(k);
          this.redArrow[i].position.set(Math.atan(-10) + ((-3 + i) * Math.PI), -10, 0);
          this.arrowGroup.add(this.redArrow[i]);
        }
        this.arrowGroup.visible = false;
        this.axisGroup.add(this.arrowGroup);

    }


    //创建单调性按钮动画
    createMonotonicAnimation() {
      const startPosition = -10;
      const endPosition = 10;
      this.moveAnimation[0] = this.helper.createArrowMoveAnimation(this.redArrow, startPosition, endPosition);
    }



    //创建奇偶性函数虚线
    createDashFunctionLine() {

      for (let i = 0; i < 7; i++) {
        this.dashFunctionLine.push(this.curveLineHelper.createCurveLine({
          pointList: this.tanPoint,
          lineWidth: 0.2,
          style: 1,
          dashArray: 0.1,
          color: MathConst.lineColor_red,
        }));
        this.dashFunctionLine[i].position.set((-3 + i) * Math.PI, 0, 0);
        this.parityGroup.add(this.dashFunctionLine[i]);
      }
      this.parityGroup.visible = false;
      this.axisGroup.add(this.parityGroup);

    }
    //创建奇偶性动画
    createRotateAnimation() {
        this.rotateAnimation = this.helper.createRotateAniamtion(this.dashFunctionLine);
    }

    //创建函数定义域虚线
    createDashLine() {
        const startPosition = -2.5 * Math.PI;
        const isIpoine = (window as any)['env'].browserInfo.isIphone || (window as any)['env'].browserInfo.isIpad;
        for (let i = 0; i < 6; i++) {
          this.symmetry.push(this.lineHelper.createLine({
            startPoint: new THREE.Vector3(0, 11, 0),
            endPoint: new THREE.Vector3(0, -10, 0),
            lineWidth: 100,
            lineWidthScale: 0.01,
            dashLine: true,
            color: MathConst.lineColor_red,
            dashSize: isIpoine ? 1 : 5,
            gapSize: isIpoine ? 0.7 : 5
          }));
          this.symmetry[i].position.set(startPosition + (i * Math.PI), 0, 0);
          this.domainGroup.add(this.symmetry[i]);
        }
        this.domainGroup.visible = false;
        this.axisGroup.add(this.domainGroup);
    }

    //创建对称中心的圆点
    createCenter() {
        const point  = ThreeUtil.createPoint(Config.pointOption.r, Config.pointOption.color, 0, 0, 1);
        const points = [];
        for (let i = 0; i < 13; i++) {
            points.push(point.clone());
            points[i].position.set((-6 + i) * (Math.PI / 2), 0, 0);
            this.centerGroup.add(points[i]);
        }
        this.centerGroup.visible = false;
        this.axisGroup.add(this.centerGroup);
    }

    //创建周期性移动的虚线
    createPeriodicDashLine() {
      const line = [];
      for (let i = 0; i < 8; i++) {
        line.push(this.curveLineHelper.createCurveLine({
          pointList: this.tanPoint,
          lineWidth: 0.2,
          style: 1,
          dashArray: 0.1,
          color: MathConst.lineColor_red,
        }));
        line[i].position.set((-4 + i) * Math.PI, 0, 0);
        this.periodicDashGroup.add(line[i]);
      }
      this.periodicDashGroup.visible = false;
        this.axisGroup.add(this.periodicDashGroup);
    }
    //创建遮挡物
    createObstruction() {
        this.obstructionPlane[0] = ThreeUtil.createPlane(Math.PI , 20, '#2d2d2d', 1);
        const line = this.helper.createLine(Math.PI / 2, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        line.position.set(Math.PI / 4, 0, 0);
        this.obstructionPlane[0].position.set((-4 * Math.PI), 0, 0);
        this.obstructionPlane[0].add(line);
        this.obstructionPlane[1] = ThreeUtil.createPlane(Math.PI , 20, '#2d2d2d', 1);
        const line1 = this.helper.createLine(Math.PI / 2, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        const arrow = this.helper.createArrow(Config.arrowSize, Config.axisColor, Config.axisOpacity);
        line1.add(arrow);
        this.obstructionPlane[1].add(line1);
        arrow.position.set(Math.PI / 4, 0, 0);
        this.obstructionPlane[1].position.set((4 * Math.PI), 0, 0);
        line1.position.set(-Math.PI / 4, 0, 0);
        this.obstructionPlane[0].visible = false;
        this.obstructionPlane[1].visible = false;
        this.axisGroup.add(this.obstructionPlane[0], this.obstructionPlane[1]);
        const plane = ThreeUtil.createPlane(Math.PI * 10, 1.5, '#2d2d2d', 1);
        const line3 = this.helper.createLine(1.5, Config.axisWidth, Config.axisColor, Config.axisOpacity);
        line3.rotation.z = Math.PI / 2;
        plane.position.y = 10.5;
        plane.add(line3);
        this.axisGroup.add(plane);
    }

    //创建距离标注
    createDistianceLable() {
      const lable = [];
      const text = [];
      const line  = ThreeUtil.createLine(0.3, Config.arrowOpation.lineWidth, MathConst.lineColor_Blue);
      const arrow = this.helper.createArrow(Config.arrowOpation.arrowSize, MathConst.lineColor_Blue);
      arrow.position.x = 0.15;
      line.add(arrow);
      const line1 = line.clone();
      line1.rotation.z = Math.PI;
      line1.position.x = - 0.65;
      line.position.x = 0.65;
      const centerLine = ThreeUtil.createLine(Math.PI / 4, Config.arrowOpation.lineWidth, MathConst.lineColor_Blue);

      centerLine.add(line, line1);
      centerLine.position.set(-0.15, 8, 0);
      for (let i = 0; i < 6; i++) {
        lable.push(centerLine.clone());
        lable[i].position.set(((-2 + i) * Math.PI) - 0.15, 8, 0);
        text.push(ThreeUtil.createNewRomanText('π', 0, 0.8, 0, '#FFFFFF', 0.03));
        lable[i].add(text[i]);
        this.lableGroup.add(lable[i]);
      }
      this.lableGroup.visible = false;
      this.axisGroup.add(this.lableGroup);
    }

    //创建周期性移动的动画
    createPeriodicAniamtion() {
        this.periodicAniamtion = this.helper.createPeriodicMoveAnimation(this.periodicDashGroup, () => {
          this.lableGroup.visible = true;
        });
    }

    //定义域按钮功能
    domainEvent(boolean: boolean) {
      this.domainGroup.visible = boolean;
    }


    //单调性按钮功能
    monotonicEvent(boolean: boolean) {
      this.arrowGroup.visible = boolean;
      this.lableGroup.visible = false;
      this.moveAnimation[0].progress(0);
      this.moveAnimation[0].pause();
      this.moveAnimation[0].play();
    }
    //对称中心按钮功能
    symmetricCenterEvent(boolean: boolean) {
      this.centerGroup.visible = boolean;
    }
    //奇偶性按钮功能
    parityEvent(boolean: boolean) {
      this.parityGroup.visible = boolean;
      this.rotateAnimation.progress(0);
      this.rotateAnimation.pause();
      this.rotateAnimation.play();

    }
    //周期性按钮功能
    periodicEvent(boolean: boolean) {
        for (let i = 0; i < this.obstructionPlane.length; i++) {
          this.obstructionPlane[i].visible = boolean;
        }
        this.periodicDashGroup.visible = boolean;
        this.periodicAniamtion.progress(0);
        this.periodicAniamtion.pause();
        this.periodicAniamtion.play();
    }

    //隐藏所有功能
    hideAll() {
      this.domainGroup.visible = false;
      this.arrowGroup.visible = false;
      this.centerGroup.visible = false;
      for (let i = 0; i < this.obstructionPlane.length; i++) {
        this.obstructionPlane[i].visible = false;
      }
      this.parityGroup.visible = false;
      this.rotateAnimation.progress(0);
      this.rotateAnimation.pause();
      this.periodicDashGroup.visible = false;
      this.lableGroup.visible = false;
      this.periodicAniamtion.progress(0);
      this.periodicAniamtion.pause();
    }

}




