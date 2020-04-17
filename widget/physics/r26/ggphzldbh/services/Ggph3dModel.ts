import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
const Interaction = require('three.interaction');
import * as point2 from '../sub_static/point.png';
import * as rotateImage from '../sub_static/rotLine.png';
import * as gForceImage from '../sub_static/gForceArrow.png';
import * as tipseImage from '../sub_static/tipsArrow.png';
import * as gForceRectImage from '../sub_static/gForceRect.png';
import * as squareImage from '../sub_static/square.png';
import { Line } from '../../../../../src/three/component/Line';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { ArcHelper } from './ArcHelper';
const TrackballControls = require('three-trackballcontrols');
export class Ggph3dModel extends ThreeBase {

    private controls: any;
    private line: Line;
    public sliderControlerLine: any;
    private point: any;
    private rotateLine: any;
    private arcHelper: ArcHelper;
    private arcLine: any;
    private angleText: any;
    private redColor = '#FF5A5A';
    private blueColor = '#18A2FF';
    private blackColor = '#000000';
    private darkRedColor = '#A3491B';
    private resistanceArmDashLine: any;
    private resistanceArmText: any;
    private powerArmDashLine: any;
    private powerArmText: any;
    private gForceText: any;
    private gForceRect: any;
    private gForceArrowPlane: any;
    private tipsArrow: any;
    private tipsText: any;
    private topVerticalDashLine: any;
    private bottomVerticalDashLine: any;
    private force: any;
    private forceText: any;
    private verticalSymbol: any;
    public verticalMoveSymbol: any;

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
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.line = new Line();
        this.arcHelper = new ArcHelper();
        this.initGrayWall();
        this.initRotateLine();
        this.initgForceRectAndText();
        this.arcLine = this.createArcLine(0);
        this.initResistanceArmDashLine();
        this.initForceArrow();
        this.setMove();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( '#F3F3F3');
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  280);
    }

    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
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

    //创建墙壁
    initGrayWall() {
      const grayWall = ThreeUtil.createPlane(8, 150, '#6E6E6E', 1);
      grayWall.position.x = -80;
      this.scene.add(grayWall);

      const oPoint = ThreeUtil.createNewRomanText('O', -72, 10, 0, '#000000', 0.15);
      this.scene.add(oPoint);
    }

    //绘制旋转杠杆
    initRotateLine() {
      const l1 = ThreeUtil.createPlane(1, 300, this.blackColor, 0.001);
      this.rotateLine = ThreeUtil.createImg(360 * 0.35, 16 * 0.35, rotateImage, 63, 0, 0);
      this.point = ThreeUtil.createPoint(1, this.darkRedColor, -76, 0, 0);
      const rotPoint = ThreeUtil.createPoint(3, this.darkRedColor, -76, 0, 1);
      //动力臂虚线
      this.powerArmDashLine = this.createLine(0, 0, 126, 0, this.redColor, 2);
      this.powerArmText = ThreeUtil.createNormalText(window.env.browserInfo.lang.powerArmText, 90, 15, 0, this.redColor, 0.15);
      this.point.add(this.rotateLine, this.powerArmDashLine, this.powerArmText);

      //重力箭头
      const gForeArrow = ThreeUtil.createImg(14 * 0.5, 88 * 0.5, gForceImage, 0, -24.8);
      this.gForceArrowPlane = ThreeUtil.createPlane(20, 20, this.darkRedColor, 0);
      this.gForceArrowPlane.position.x = 63;
      this.gForceArrowPlane.position.z = -0.5;
      this.gForceArrowPlane.add(gForeArrow);
      this.point.add(this.gForceArrowPlane);

      const blackCircleOne = this.createCircleLine();
      rotPoint.add(blackCircleOne);
      this.scene.add(rotPoint);
      const dragPoint = ThreeUtil.createPoint(3, '#4A90E2', 68.5, 0, 1);
      const blackCircleTwo = blackCircleOne.clone();
      dragPoint.add(blackCircleTwo);
      const slider = ThreeUtil.createImg(400, 400, point2, 56, 0);
      //提示箭头
      this.tipsArrow = ThreeUtil.createImg(14 * 0.4, 48 * 0.4, tipseImage, 68.7, 0, 0);
      this.tipsText = ThreeUtil.createNormalText(window.env.browserInfo.lang.tipsText, 68.5, 20, 0, '#525252', 0.15);
      slider.add(this.tipsArrow);
      slider.add(this.tipsText);
      slider.position.z = 0.5;
      dragPoint.position.z = 0.8;
      l1.position.z = 0;
      (slider.material as any).transparent = true;
      (slider.material as any).opacity = 0;
      slider.add(dragPoint);
      l1.add(slider);
      this.point.add(l1);
      this.sliderControlerLine = new SliderControlLine(l1, slider, this.point, dragPoint, undefined, false);
      this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
      this.scene.add(this.point);
      //加载垂直符号
      this.verticalSymbol = ThreeUtil.createImg(30 * 0.4, 30 * 0.4, squareImage, 125, 0, 0);
      this.verticalSymbol.visible = false;
      this.verticalMoveSymbol = ThreeUtil.createImg(30 * 0.4, 30 * 0.4, squareImage, -13, 0, 1.2);
      this.verticalMoveSymbol.visible = false;
      this.point.add(this.verticalSymbol);
      this.scene.add(this.verticalMoveSymbol);
      dragPoint.addEventListener('mouseover', () => {
        document.body.style.cursor = 'pointer';
      });

      dragPoint.addEventListener('mouseout', () => {
        document.body.style.cursor = 'auto';
      });

      this.powerArmDashLine.visible = false;
      this.powerArmText.visible = false;

      this.angleText = ThreeUtil.createNormalText('90°', -65, -10, 0, this.blackColor);
      this.scene.add(this.angleText);
    }

    //添加G方块以及G文字
    initgForceRectAndText() {
        this.gForceRect = ThreeUtil.createImg(40 * 0.4, 40 * 0.4, gForceRectImage, 0, -44, 1);
        this.gForceArrowPlane.add(this.gForceRect);
        this.gForceText = ThreeUtil.createNewRomanText('G', 0, -50, 0, this.blackColor, 0.15);
        this.gForceArrowPlane.add(this.gForceText);
        this.gForceText.visible = false;
    }

    //创建阻力臂虚线
    initResistanceArmDashLine() {
      this.resistanceArmDashLine = this.createLine(-76, 0, -13, 0, this.blueColor, 4);
      this.resistanceArmText = ThreeUtil.createNormalText(window.env.browserInfo.lang.resistanceArmText, -40, 15, 0, this.blueColor, 0.15);
      this.scene.add(this.resistanceArmDashLine);
      this.scene.add(this.resistanceArmText);
      this.resistanceArmDashLine.visible = false;
      this.resistanceArmText.visible = false;
    }

    //创建初始动力F
    initForceArrow() {
        this.force = ThreeUtil.createLine(1, 22 * Math.sin(Math.PI / 2), this.redColor, 1);
        this.force.position.set(125, 11, 0);
        const forceArrow = ThreeUtil.createTriangle(-3, 10, 0, 15, 3, 10, this.redColor);
        this.forceText = ThreeUtil.createNewRomanText('F', 115, 15, 0, this.blackColor, 0.15);
        this.force.add(forceArrow);
        this.point.add(this.forceText);
        this.point.add(this.force);
        this.force.visible = false;
        this.forceText.visible = false;
    }

    setMove() {
      this.sliderControlerLine.sliderPointMouseDownCallback = () => {
          this.tipsText.visible = false;
      };

      this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
        const distance = (11 * Math.cos(this.sliderControlerLine.angle + Math.PI / 2)) / 2;
        if (this.sliderControlerLine.angle * 180 / Math.PI >= 60) {
          this.sliderControlerLine.angle = Math.PI / 3;
          this.point.rotation.z = Math.PI / 3;
        }

        if (this.sliderControlerLine.angle * 180 / Math.PI <= -60) {
          this.sliderControlerLine.angle = -Math.PI / 3;
          this.point.rotation.z = -Math.PI / 3;
        }

        this.deleteObj(this.arcLine, this.scene);
        this.arcLine = this.createArcLine(this.sliderControlerLine.angle);
        this.angleText.text = (this.sliderControlerLine.angle * 180 / Math.PI + 90).toFixed(0) + '°';

        this.gForceArrowPlane.rotation.z = -this.sliderControlerLine.angle;
        //重绘阻力臂
        this.deleteObj(this.resistanceArmDashLine, this.scene);
        this.resistanceArmDashLine = this.createLine(-76, 0, -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, this.blueColor, 4);
        this.scene.add(this.resistanceArmDashLine);
        this.resistanceArmDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;

        this.verticalMoveSymbol.position.x = -76 + 63 * Math.cos(this.sliderControlerLine.angle);
        if ((window as any).viewHandler.viewModel.$data.resistanceArm) {
          if (Number.parseInt((this.sliderControlerLine.angle * 180 / Math.PI + 90).toFixed(0)) > 100) {
            this.verticalMoveSymbol.visible = true;
            this.verticalMoveSymbol.rotation.z = 0;
          } else {
            this.verticalMoveSymbol.visible = true;
            this.verticalMoveSymbol.rotation.z = Math.PI / 2;
          }
        }

        if (this.sliderControlerLine.angle >= 48 * Math.PI / 180) {
          if (this.bottomVerticalDashLine) {
            this.deleteObj(this.bottomVerticalDashLine, this.scene);
          }
          this.bottomVerticalDashLine = this.createLine(-76 + 63 * Math.cos(this.sliderControlerLine.angle),
            63 * Math.sin(this.sliderControlerLine.angle) - 46,
            -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, this.blackColor, 8);
          this.scene.add(this.bottomVerticalDashLine);
          this.bottomVerticalDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;
        } else {
          this.deleteObj(this.bottomVerticalDashLine, this.scene);
        }

        if (this.sliderControlerLine.angle < 0) {
          if (this.topVerticalDashLine) {
            this.deleteObj(this.topVerticalDashLine, this.scene);
          }
          this.topVerticalDashLine = this.createLine(-76 + 63 * Math.cos(this.sliderControlerLine.angle),
            63 * Math.sin(this.sliderControlerLine.angle) + 2,
            -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, '#000', 6);
          this.scene.add(this.topVerticalDashLine);
          this.topVerticalDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;
        } else {
          this.deleteObj(this.topVerticalDashLine, this.scene);
        }

        //作用力F
        this.deleteObj(this.force, this.point);
        this.force = ThreeUtil.createLine(1, 22 * Math.sin(this.sliderControlerLine.angle + Math.PI / 2), this.redColor, 1);
        let forceArrow: any;
        if (this.sliderControlerLine.angle >= 0) {
          this.force.position.set(125, 11 + distance, 0);
          forceArrow = ThreeUtil.createTriangle(-3, 10 + distance, 0, 15 + distance, 3, 10 + distance, this.redColor);
        } else {
          this.force.position.set(125, -(distance - 11), 0);
          forceArrow = ThreeUtil.createTriangle(-3, 10 - distance, 0, 15 - distance, 3, 10 - distance, this.redColor);
        }
        this.force.add(forceArrow);
        this.point.add(this.force);

        this.force.visible = (window as any).viewHandler.viewModel.$data.powerArm ? true : false;
        this.forceText.visible = (window as any).viewHandler.viewModel.$data.powerArm ? true : false;
      };

      this.sliderControlerLine.sliderPointTouchStartCallback = () => {
        this.tipsText.visible = false;
      };

      this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
        const distance = (11 * Math.cos(this.sliderControlerLine.angle + Math.PI / 2)) / 2;
        if (this.sliderControlerLine.angle * 180 / Math.PI >= 60) {
          this.sliderControlerLine.angle = Math.PI / 3;
          this.point.rotation.z = Math.PI / 3;
        }

        if (this.sliderControlerLine.angle * 180 / Math.PI <= -60) {
          this.sliderControlerLine.angle = -Math.PI / 3;
          this.point.rotation.z = -Math.PI / 3;
        }

        this.deleteObj(this.arcLine, this.scene);
        this.arcLine = this.createArcLine(this.sliderControlerLine.angle);
        this.angleText.text = (this.sliderControlerLine.angle * 180 / Math.PI + 90).toFixed(0) + '°';

        this.gForceArrowPlane.rotation.z = -this.sliderControlerLine.angle;
        //重绘阻力臂
        this.deleteObj(this.resistanceArmDashLine, this.scene);
        this.resistanceArmDashLine = this.createLine(-76, 0, -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, this.blueColor, 4);
        this.scene.add(this.resistanceArmDashLine);
        this.resistanceArmDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;

        this.verticalMoveSymbol.position.x = -76 + 63 * Math.cos(this.sliderControlerLine.angle);
        if ((window as any).viewHandler.viewModel.$data.resistanceArm) {
          if (Number.parseInt((this.sliderControlerLine.angle * 180 / Math.PI + 90).toFixed(0)) > 100) {
            this.verticalMoveSymbol.visible = true;
            this.verticalMoveSymbol.rotation.z = 0;
          } else {
            this.verticalMoveSymbol.visible = true;
            this.verticalMoveSymbol.rotation.z = Math.PI / 2;
          }
        }

        if (this.sliderControlerLine.angle >= 48 * Math.PI / 180) {
          if (this.bottomVerticalDashLine) {
            this.deleteObj(this.bottomVerticalDashLine, this.scene);
          }
          this.bottomVerticalDashLine = this.createLine(-76 + 63 * Math.cos(this.sliderControlerLine.angle),
            63 * Math.sin(this.sliderControlerLine.angle) - 46,
            -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, this.blackColor, 8);
          this.scene.add(this.bottomVerticalDashLine);
          this.bottomVerticalDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;
        } else {
          this.deleteObj(this.bottomVerticalDashLine, this.scene);
        }

        if (this.sliderControlerLine.angle < 0) {
          if (this.topVerticalDashLine) {
            this.deleteObj(this.topVerticalDashLine, this.scene);
          }
          this.topVerticalDashLine = this.createLine(-76 + 63 * Math.cos(this.sliderControlerLine.angle),
            63 * Math.sin(this.sliderControlerLine.angle) + 2,
            -76 + 63 * Math.cos(this.sliderControlerLine.angle), 0, '#000', 6);
          this.scene.add(this.topVerticalDashLine);
          this.topVerticalDashLine.visible = (window as any).viewHandler.viewModel.$data.resistanceArm ? true : false;
        } else {
          this.deleteObj(this.topVerticalDashLine, this.scene);
        }

        //作用力F
        this.deleteObj(this.force, this.point);
        this.force = ThreeUtil.createLine(1, 22 * Math.sin(this.sliderControlerLine.angle + Math.PI / 2), this.redColor, 1);
        let forceArrow: any;
        if (this.sliderControlerLine.angle >= 0) {
          this.force.position.set(125, 11 + distance, 0);
          forceArrow = ThreeUtil.createTriangle(-3, 10 + distance, 0, 15 + distance, 3, 10 + distance, this.redColor);
        } else {
          this.force.position.set(125, -(distance - 11), 0);
          forceArrow = ThreeUtil.createTriangle(-3, 10 - distance, 0, 15 - distance, 3, 10 - distance, this.redColor);
        }
        this.force.add(forceArrow);
        this.point.add(this.force);

        this.force.visible = (window as any).viewHandler.viewModel.$data.powerArm ? true : false;
        this.forceText.visible = (window as any).viewHandler.viewModel.$data.powerArm ? true : false;
      };
    }

    //绘制圆
    createCircleLine() {
      const curve = new THREE.EllipseCurve(
        0,  0,
        3, 3,
        0,   2 * Math.PI,
        true,
        0
      );
      const geometry = new THREE.Geometry().setFromPoints(curve.getPoints(500));
      const circle = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, this.blackColor);
      return circle;
    }

    //创建直线
    createLine(x1: number, y1: number, x2: number, y2: number, color: string, dashSize: number) {
      const line = this.line.createLine({
        startPoint: new THREE.Vector3(x1, y1, 1),
        endPoint: new THREE.Vector3( x2, y2, 1),
        lineWidth: 1000,
        lineWidthScale: 1 / 500,
        dashLine: true,
        dashSize: dashSize,
        gapSize: 3,
        color: color,
        depthTest: true,
      });
      return line;
    }

    //绘制角度弧线
    createArcLine(endAngle: number) {
        const arc = this.arcHelper.addEllipseLine(10, this.redColor, 3, 1, -Math.PI / 2, endAngle);
        arc.position.set(-76, 0, 0);
        this.scene.add(arc);
        return arc;
    }

    //删除线段
    deleteObj(obj: any, scene: any) {
      if (obj) {
        obj.geometry.dispose();
        obj.material.dispose();
        scene.remove(obj);
      }
    }

    //显示或隐藏动力臂
    showOrHidePowerArmLines(flag: boolean) {
        this.powerArmDashLine.visible = flag;
        this.powerArmText.visible = flag;
        this.force.visible = flag;
        this.forceText.visible = flag;
        this.verticalSymbol.visible = flag;
        this.tipsArrow.visible = !flag;
        this.tipsText.visible = false;
    }

    //显示或隐藏阻力臂
    showOrHideResistanceArmLines(flag: boolean) {
      this.verticalMoveSymbol.visible = flag;
      this.resistanceArmDashLine.visible = flag;
      this.resistanceArmText.visible = flag;
      this.gForceText.visible = flag;
      this.gForceRect.visible = !flag;

      if (this.sliderControlerLine.angle >= 48 * Math.PI / 180) {
          this.bottomVerticalDashLine.visible = flag;
      }
      if (this.sliderControlerLine.angle < 0) {
        this.topVerticalDashLine.visible = flag;
      }
      this.tipsText.visible = false;
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        this.sliderControlerLine.angle = 0;
        this.point.rotation.z = 0;
        this.gForceText.visible = false;
        this.gForceArrowPlane.rotation.z = 0;
        this.gForceRect.visible = true;
        this.resistanceArmText.visible = false;
        this.deleteObj(this.resistanceArmDashLine, this.scene);
        this.resistanceArmDashLine = this.createLine(-76, 0, -13, 0, this.blueColor, 4);
        this.scene.add(this.resistanceArmDashLine);
        this.resistanceArmDashLine.visible = false;
        this.angleText.text = '90°';
        setTimeout(() => {
          this.tipsText.visible = true;
          this.tipsArrow.visible = true;
        }, 50);

        if (this.topVerticalDashLine) {
          this.topVerticalDashLine.visible = false;
        }
        if (this.bottomVerticalDashLine) {
          this.bottomVerticalDashLine.visible = false;
        }
        if (this.arcLine) {
            this.deleteObj(this.arcLine, this.scene);
            this.arcLine = this.createArcLine(0);
        }
        this.verticalMoveSymbol.visible = false;
        this.verticalMoveSymbol.position.x = -13;
        this.verticalMoveSymbol.rotation.z = 0;
    }
}




