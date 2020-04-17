import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { CurveLine } from '../../../../../src/three/component/CurveLine';
import { Linear, TweenMax } from 'gsap';

const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;

    private line: any;

    private functionLine1: any;
    private functionLine2: any;
    private functionLine3: any;
    private functionLine4: any;

    private group: THREE.Group;
    private dashLine: any;
    private dashFunctionLine1: any;
    private dashFunctionLine2: any;
    private dashFunctionLine3: any;
    private dashFunctionLine4: any;

    private auxiliaryLine1: any;
    private auxiliaryLine2: any;
    private auxiliaryLine3: any;
    private auxiliaryLine4: any;
    private rotateAnimation: any;

    private aText: any;
    private a1Text: any;
    private coordinate: any;

    private selectValue = 1;
    private point: THREE.Mesh;

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
        this.createFunctionLine();
        this.createPoint();
        this.drawDashLine();
        this.createText();
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
        this.camera.position.set(0,  0,  260);
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

    //创建函数线
    createFunctionLine() {
      const lineWidth = 1.3;
      this.group = new THREE.Group();
      const color = '#18a2ff';
      const dashColor = '#ffd621';
      const curveHelper = new CurveLine();
        //获取函数上的点
      const linePoint: THREE.Vector2[] = [];
      const functionLinePoint: THREE.Vector2[] = [];
      const functionLinePoint1: THREE.Vector2[] = [];
      for (let i = -100; i <= 100; i++) {
          linePoint.push(new THREE.Vector2(i, i));
      }
      for (let i = 3; i <= 100; i++) {
        functionLinePoint.push(new THREE.Vector2(i , 100 / i));
        functionLinePoint1.push(new THREE.Vector2(100 / i , i));
      }

      this.line = curveHelper.createCurveLine({pointList: linePoint, color: color, lineWidth: lineWidth, style: 2});

      this.functionLine1 = curveHelper.createCurveLine({pointList: functionLinePoint, color: color, lineWidth: lineWidth, style: 2});
      this.functionLine3 = curveHelper.createCurveLine({pointList: functionLinePoint1, color: color, lineWidth: lineWidth, style: 2});
      this.functionLine2 = this.functionLine1.clone();
      this.functionLine4 = this.functionLine3.clone();

      this.dashLine = curveHelper.createCurveLine({pointList: linePoint, color: dashColor, lineWidth: lineWidth, style: 1});

      this.dashFunctionLine1 = curveHelper.createCurveLine({pointList: functionLinePoint,
        color: dashColor, lineWidth: lineWidth, style: 1});
      this.dashFunctionLine3 = curveHelper.createCurveLine({pointList: functionLinePoint1,
        color: dashColor, lineWidth: lineWidth, style: 1});
      this.dashFunctionLine2 = this.dashFunctionLine1.clone();
      this.dashFunctionLine4 = this.dashFunctionLine3.clone();

      this.dashFunctionLine2.rotation.z = Math.PI;
      this.functionLine2.rotation.z = Math.PI;
      this.dashFunctionLine4.rotation.z = Math.PI;
      this.functionLine4.rotation.z = Math.PI;

      this.group.add(this.dashLine, this.dashFunctionLine1, this.dashFunctionLine2, this.dashFunctionLine3, this.dashFunctionLine4);
      this.scene.add(this.line, this.functionLine1, this.functionLine2, this.functionLine3, this.functionLine4, this.group);

      this.dashLine.visible = false;
      this.functionLine1.visible = false;
      this.functionLine2.visible = false;
      this.functionLine3.visible = false;
      this.functionLine4.visible = false;
      this.dashFunctionLine1.visible = false;
      this.dashFunctionLine2.visible = false;
      this.dashFunctionLine3.visible = false;
      this.dashFunctionLine4.visible = false;
      //初始化动画
      this.initRotateAnimation(this.group);
    }

    //显示或隐藏虚线函数线
    isShowDashFunctionLine(value: boolean) {
      if (value) {
        return;
      }
      if (this.selectValue === 1) {
        this.dashLine.visible = false;
      } else {
        this.dashFunctionLine1.visible = false;
        this.dashFunctionLine2.visible = false;
        this.dashFunctionLine3.visible = false;
        this.dashFunctionLine4.visible = false;
      }
    }

    //创建拖动点并绑定拖动事件
    createPoint() {
        const radius = (window as any)['env'].browserInfo.isSmallDevice ? 10 : 3;
        this.point = ThreeUtil.createPoint(radius, '#ffffff', 10, 100 / 10, 0.0001);
        const point1 = ThreeUtil.createPoint(4, '#ffffff', 0, 0, 0.36);
        const smallPoint = ThreeUtil.createPoint(1.5, '#ffffff', 0, 0, 1);
        point1.add(smallPoint);
        this.point.add(point1);
        const dargControls = new dragcontrols([this.point], this.camera, this.renderer.domElement);
      dargControls.addEventListener( 'dragstart',  ( event: any ) => {this.controls.enabled = false; } );
      dargControls.addEventListener( 'drag', ( event: any) => {
        if (this.selectValue === 1) {
          if (this.point.position.x > 100) {
              this.point.position.x = 100;
              this.point.position.y = 100;
          } else if (this.point.position.x < -100) {
               this.point.position.x = -100;
               this.point.position.y = -100;
          } else {
              this.point.position.y = this.point.position.x;
          }
        } else {
          if (this.point.position.x === 0) {
            return;
          } else if (this.point.position.x > 100) {
            this.point.position.x = 100;
            this.point.position.y = 100 / this.point.position.x;
          } else if (this.point.position.x < -100) {
            this.point.position.x = -100;
            this.point.position.y = 100 / this.point.position.x;
          } else {
            this.point.position.y = 100 / this.point.position.x;
          }
          if (this.point.position.y > 100) {
            this.point.position.y = 100;
            this.point.position.x = 100 / this.point.position.y;
          } else if (this.point.position.y < -100) {
            this.point.position.y = -100;
            this.point.position.x = 100 / this.point.position.y;
          }
        }
        this.removeAuxiliary();
        this.drawDashLine();
        let x = (parseFloat((this.point.position.x / 10).toFixed(1))) % 1 === 0 ?
            (this.point.position.x / 10).toFixed(0) : (this.point.position.x / 10).toFixed(1);
        let y = (parseFloat((this.point.position.y / 10).toFixed(1))) % 1 === 0 ?
            (this.point.position.y / 10).toFixed(0) : (this.point.position.y / 10).toFixed(1);

        if (this.selectValue === 2 && this.point.position.x < 0) {
          this.a1Text.position.set(-this.point.position.x + 10, -this.point.position.y + 3, 0);
        } else {
          this.a1Text.position.set(-this.point.position.x - 25, -this.point.position.y - 3, 0);
        }
        if (x === '-0') {
          x = '0';
        }
        if (y === '-0') {
          y = '0';
        }
        this.aText.text = '(' + x + ',' + y + ')';
        this.coordinate.text = '(' + -x + ',' + -y + ')';
      });
      dargControls.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; } );
        this.scene.add(this.point);
    }

    //绘制辅助虚线
    drawDashLine() {
      const color = '#ffffff';
        this.auxiliaryLine1 = ThreeUtil.createDashLine(new THREE.Vector3( this.point.position.x, this.point.position.y, 0),
          new THREE.Vector3(this.point.position.x, 0, 0), color, 5, 2);
        this.auxiliaryLine2 = ThreeUtil.createDashLine(new THREE.Vector3( this.point.position.x, this.point.position.y, 0),
          new THREE.Vector3(0, this.point.position.y, 0), color, 5, 2);
        this.auxiliaryLine3 = ThreeUtil.createDashLine(new THREE.Vector3( -this.point.position.x, -this.point.position.y, 0),
          new THREE.Vector3(-this.point.position.x, 0, 0), color, 5, 2);
        this.auxiliaryLine4 = ThreeUtil.createDashLine(new THREE.Vector3( -this.point.position.x, -this.point.position.y, 0),
          new THREE.Vector3(0, -this.point.position.y, 0), color, 5, 2);
        this.scene.add(this.auxiliaryLine1);
        this.scene.add(this.auxiliaryLine2);
        this.scene.add(this.auxiliaryLine3);
        this.scene.add(this.auxiliaryLine4);
    }

    //删除线的方法
    removeLine(obj: THREE.Mesh) {
        this.scene.remove(obj);
        obj.geometry.dispose();
        (obj.material as any).dispose();
    }

    //删除所有辅助线的方法
    removeAuxiliary() {
        this.removeLine(this.auxiliaryLine1);
        this.removeLine(this.auxiliaryLine2);
        this.removeLine(this.auxiliaryLine3);
        this.removeLine(this.auxiliaryLine4);
    }

    //创建坐标轴
    createAxis() {
      this.scene.add(AxisUtil.createAxis({ isTicks: false, axisColor: '#ffffff', fontColor: '#ffffff', axisOpacity: 0.32} as any));
    }

    //创建可拖动字母
    createText() {
      const color = '#ffffff';
      const textA = ThreeUtil.createNewRomanText('A', 10, 10, 0, color, 0.10);
      this.aText = ThreeUtil.createNormalText('(1,1)', 120, 0, 0, color, 1);
      textA.add(this.aText);
      this.point.add(textA);

      this.a1Text = ThreeUtil.createNewRomanText('A\'', -35, -13, 0, color, 0.10);
      this.coordinate = ThreeUtil.createNormalText('(-1,-1)', 125, 0, 0, color, 1);
      this.a1Text.add(this.coordinate);
      this.scene.add(this.a1Text);
    }

    //初始化旋转函数虚线动画
    initRotateAnimation(obj: THREE.Group) {
      const tween = {
          angle: 0
      };

      this.rotateAnimation = TweenMax.to(tween, 2, {
        angle: Math.PI,
        opacity: 0,
        onUpdate: () => {
          obj.rotation.z = tween.angle;
        },
        onComplete: () => {

        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
        delay: 0, //延迟N秒执行
        // repeat: 0 //执行次数 -1 等于infinite
      });
    }

    isShowLine(value: boolean) {
      if (this.selectValue === 1) {
        this.line.visible = true;
        this.functionLine1.visible = false;
        this.functionLine2.visible = false;
        this.functionLine3.visible = false;
        this.functionLine4.visible = false;
        if (value) {
          this.dashLine.visible = true;
          this.dashFunctionLine1.visible = false;
          this.dashFunctionLine2.visible = false;
          this.dashFunctionLine3.visible = false;
          this.dashFunctionLine4.visible = false;
        }

      } else {
        this.line.visible = false;
        this.functionLine1.visible = true;
        this.functionLine2.visible = true;
        this.functionLine3.visible = true;
        this.functionLine4.visible = true;
        if (value) {
          this.dashLine.visible = false;
          this.dashFunctionLine1.visible = true;
          this.dashFunctionLine2.visible = true;
          this.dashFunctionLine3.visible = true;
          this.dashFunctionLine4.visible = true;
        }
      }

      this.point.position.set(10, 100 / 10, 0);
      this.removeAuxiliary();
      this.drawDashLine();
    }

    setSelectValue(value: number) {
      this.selectValue = value;
    }

    //播放动画的方法
    play(value: boolean) {
      if (value === false) {
        return;
      }
        if (this.selectValue === 1) {
            this.dashLine.visible = true;
        } else {
          this.dashFunctionLine1.visible = true;
          this.dashFunctionLine2.visible = true;
          this.dashFunctionLine3.visible = true;
          this.dashFunctionLine4.visible = true;
        }
        this.rotateAnimation.pause();
        this.rotateAnimation.progress(0);
        this.rotateAnimation.play();
    }

    resetTextPosition() {
      this.aText.text = '(1,1)';
      this.coordinate.text = '(-1,-1)';
      this.a1Text.position.set(-35, -13, 0);
    }

    reset() {
        this.dashFunctionLine1.visible = false;
        this.dashFunctionLine2.visible = false;
        this.dashFunctionLine3.visible = false;
        this.dashFunctionLine4.visible = false;
        this.dashLine.visible = false;
        this.line.visible = true;
        this.selectValue = 1;
        this.functionLine1.visible = false;
        this.functionLine2.visible = false;
        this.functionLine3.visible = false;
        this.functionLine4.visible = false;
        this.point.position.set(10, 100 / 10, 0);
        this.removeAuxiliary();
        this.drawDashLine();
        this.resetTextPosition();
    }



}




