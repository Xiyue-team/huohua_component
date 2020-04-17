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

const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private helper = new Helper();
    private sliderControlLine: any;
    private dashline: any;
    private afterimage: any;
    private line: any;
    private rotatePoint: THREE.Mesh;
    private dragCenter: THREE.Mesh;
    private lineHelper = new Line();
    private axisGroup = new THREE.Group();
    moveControl = false;
    private text: any;
    private intercept: number;
    private slope: number;
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
        this.createSliderControlLine();
        this.createtooltip();
        this.render();
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
        isTicks: true,
        axisColor: '#ffffff',
        axisOpacity: 0.32,
        fontColor: '#6f6f6f',
        AxisXNumArray: ['1', '2', '3', '4', '5'],
        XtickDistance: 20,
        YtickDistance: 20
      } as any));
      this.axisGroup.add(axis);
      this.axisGroup.position.y = - 10;
      this.scene.add(this.axisGroup);
    }

    //创建可拖动旋转的控制线
    createSliderControlLine() {
      const k = document.getElementById('k');
      const startAngle = 45;
      const color = '#6ecfff';
      const r = 50;
      this.text  = ThreeUtil.createNormalText('非一次函数',  0, 0, 0, color, 0.15);
      this.text.visible = false;
      this.dragCenter = this.helper.createDragPoint();
      this.rotatePoint = this.helper.createDragPoint();
      const rotatePointRange = ThreeUtil.createPoint(r, '#ffffff', 50, 50, 0.001);
      rotatePointRange.position.z = 0.1;
      this.rotatePoint.position.z = 1;
      // this.dragCenter.position.z = 2;
      this.line = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(100, 0, 0),
        endPoint: new THREE.Vector3(-100, 0, 0),
        lineWidth: MathConst.lineWidth * 0.75,
        lineWidthScale: 0.001,
        color: color
      });
      this.dashline = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(100, 0, 0),
        endPoint: new THREE.Vector3(-100, 0, 0),
        lineWidth: MathConst.lineWidth * 0.75,
        lineWidthScale: 0.001,
        dashLine: true,
        dashSize: 2.5,
        gapSize: 2,
        color: color
      });
      this.afterimage = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(100, 0, 0),
        endPoint: new THREE.Vector3(-100, 0, 0),
        lineWidth: MathConst.lineWidth * 0.75,
        lineWidthScale: 0.001,
        dashLine: true,
        dashSize: 2.5,
        gapSize: 2,
        color: color
      });
      this.line.rotation.z = startAngle / 180 * Math.PI;
      this.dashline.rotation.z = startAngle / 180 * Math.PI;
      this.afterimage.rotation.z = startAngle / 180 * Math.PI;
      rotatePointRange.add(this.rotatePoint);
      // this.rotatePoint.visible = false;
      // this.line.add();
      this.dragCenter.add(this.line, this.dashline, rotatePointRange);
      // this.line.visible = false;
      this.dashline.visible = false;
      this.afterimage.visible = false;
      //用此方法前先导入事件包
      this.sliderControlLine = new SliderControlLine(this.line, rotatePointRange, this.dragCenter, this.rotatePoint);
      this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
      this.axisGroup.add(this.dragCenter, this.afterimage, this.text);
      this.dragCenter.position.y = 20;

      const rotateEvent = () => {
          this.calcSlopeAndIntercept();
          if (this.slope > 0) {
            k.innerText = 'k > 0';
          } else {
            k.innerText = 'k < 0';
          }
          this.afterimage.rotation.z = this.sliderControlLine.angle + startAngle / 180 * Math.PI;
          if ((Math.round(this.sliderControlLine.angle * 180 / Math.PI) - startAngle) % 90 === 0) {
            this.line.visible = false;
            this.dashline.visible = true;
          } else {
            this.line.visible = true;
            this.dashline.visible = false;
          }
          if ((Math.round(this.sliderControlLine.angle * 180 / Math.PI) - startAngle) % 180 === 90 ||
            (Math.round(this.sliderControlLine.angle * 180 / Math.PI) - startAngle) % 180 === -90 ) {
            this.text.visible = true;
            this.text.position.set(this.dragCenter.position.x + 80, this.dragCenter.position.y + 20, 0);
            k.innerText = 'k = 0';
          } else {
            this.text.visible = false;
          }
          if ((Math.round(this.sliderControlLine.angle * 180 / Math.PI) - startAngle) % 180 === 0) {
              k.innerText = 'k';
          }
      };

      //初始化旋转点事件
      this.sliderControlLine.sliderPointMouseMoveCallback = () => {
        rotateEvent();
      };
      this.sliderControlLine.sliderPointTouchMoveCallback = () => {
        rotateEvent();
      };

      //初始化拖动点事件
      this.sliderControlLine.controlPointDragStartCallback = () => {
          if (this.moveControl) {
              this.afterimage.visible = true;
              this.afterimage.position.set(this.dragCenter.position.x, this.dragCenter.position.y, this.dragCenter.position.z);
          }
      };

      this.sliderControlLine.controlPointDragCallback = () => {
        this.limitDragRange();
        // if (this.moveControl) {
        this.dragCenter.position.x = 0;
        this.calcSlopeAndIntercept();
        // }
      };

    }

    //计算直线的K和B
    calcSlopeAndIntercept() {
      const k = document.getElementById('k');
      const b = document.getElementById('b');
      const angle = MathHelper.getTiltAngle(Math.PI / 4, this.sliderControlLine.angle);
      this.slope = MathHelper.getSlope(angle);
      this.intercept = MathHelper.getIntercept(this.slope, this.dragCenter.position.x, this.dragCenter.position.y);
      if (Math.round(this.intercept) > 0) {
        b.innerText = 'b > 0';
      } else if (Math.round(this.intercept) === 0) {
        b.innerText = 'b = 0';
      } else {
        b.innerText = 'b < 0';
      }
    }

    //限制拖动范围的方法
    limitDragRange() {
        if (this.dragCenter.position.x > 100) {
            this.dragCenter.position.x = 100;
        }
        if (this.dragCenter.position.x < -100) {
            this.dragCenter.position.x = -100;
        }
        if (this.dragCenter.position.y > 100) {
            this.dragCenter.position.y = 100;
        }
        if (this.dragCenter.position.y < -100) {
            this.dragCenter.position.y = -100;
        }
    }

    //平移按钮功能
    moveButton(boolean: boolean) {
        this.moveControl = boolean;
        if (boolean) {
          this.dragCenter.position.x = 0;
          this.rotatePoint.visible = false;
        } else {
          this.rotatePoint.visible = true;
          this.afterimage.visible = false;
        }
    }

    //选择按钮切换场景的方法
    selectButton(str: string) {
      if (str === '由图像判断系数') {
          this.axisGroup.visible = true;
      } else {
          this.axisGroup.visible = false;
      }
    }

    //创建提示文字
    createtooltip() {
      const tip = ThreeUtil.createNormalText('可上下拖动和旋转直线', 0, -120, 0, '#6f6f6f', 0.15);
      this.axisGroup.add(tip);
    }

    //重置方法
    reset() {
      this.dragCenter.position.set(0, 20, 0);
      this.dragCenter.rotation.z = 0;
      this.sliderControlLine.angle = 0;
      this.line.visible = true;
      this.dashline.visible = false;
      this.afterimage.visible = false;
      this.rotatePoint.visible = true;
      this.axisGroup.visible = true;
      this.afterimage.rotation.z = Math.PI / 4;
      const k = document.getElementById('k');
      const b = document.getElementById('b');
      k.innerText = 'k > 0';
      b.innerText = 'b > 0';
      this.moveControl = false;
      this.text.visible = false;
    }

}




