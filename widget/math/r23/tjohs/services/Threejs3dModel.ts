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


    private functionLine1: any;
    private functionLine2: any;

    private group: THREE.Group;
    private dashLine1: any;
    private dashLine2: any;
    private dashLine3: any;
    private dashLine4: any;

    private auxiliaryLine1: any;
    private auxiliaryLine2: any;
    private auxiliaryLine3: any;
    private auxiliaryLine4: any;
    private rotateAnimation: any[] = [];

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
      this.group = new THREE.Group();
      const color = '#18A2FF';
      const dashColor = '#FFD621';
      const curveHelper = new CurveLine();
      const linePoint: THREE.Vector2[] = [];
      const linePoint1: THREE.Vector2[] = [];
      const dashLinePoint1: THREE.Vector2[] = [];
      const dashLinePoint2: THREE.Vector2[] = [];
      const dashLinePoint3: THREE.Vector2[] = [];
      const dashLinePoint4: THREE.Vector2[] = [];
      //直线函数取点
      for (let i = -10; i <= 10; i += 0.1) {
        linePoint.push( new THREE.Vector2( i * 10, 20 - Math.abs(i * 10)));
      }

      for (let i = 0; i <= 10; i += 0.1) {
        dashLinePoint1.push(new THREE.Vector2(i * 10, 20 - Math.abs(i * 10) ));
        dashLinePoint2.push(new THREE.Vector2(-i * 10, 20 - Math.abs(-i * 10)));
      }

      //曲线函数取点
      for (let i = -3.16; i <= 3.16; i += 0.01) {
        linePoint1.push( new THREE.Vector2(i * 10 , Math.pow( i, 2) * 10));
      }

      for (let i = 0; i <= 3.16; i += 0.01) {
        dashLinePoint3.push(new THREE.Vector2(i * 10, Math.pow(i, 2) * 10));
        dashLinePoint4.push(new THREE.Vector2(-i * 10, Math.pow(-i, 2) * 10));
      }

      this.functionLine1 = curveHelper.createCurveLine({pointList: linePoint, color: color, lineWidth: 2, style: 2});
      this.functionLine2 = curveHelper.createCurveLine({pointList: linePoint1, color: color, lineWidth: 2, style: 2});

      this.dashLine1 = curveHelper.createCurveLine({pointList: dashLinePoint1, color: dashColor, lineWidth: 2, style: 1,  dashArray: 0.05});
      this.dashLine2 = curveHelper.createCurveLine({pointList: dashLinePoint2, color: dashColor, lineWidth: 2, style: 1,  dashArray: 0.05});
      this.dashLine3 = curveHelper.createCurveLine({pointList: dashLinePoint3, color: dashColor,
        lineWidth: 2, style: 1,  dashArray: 0.1, dashRatio: 0.4});
      this.dashLine4 = curveHelper.createCurveLine({pointList: dashLinePoint4, color: dashColor,
        lineWidth: 2, style: 1,  dashArray: 0.1, dashRatio: 0.4});

      this.scene.add(this.functionLine1, this.functionLine2, this.dashLine1, this.dashLine2, this.dashLine3, this.dashLine4);

      this.functionLine2.visible = false;
      this.dashLine1.visible = false;
      this.dashLine2.visible = false;
      this.dashLine3.visible = false;
      this.dashLine4.visible = false;

      this.rotateAnimation[0] = this.initRotateAnimation( this.dashLine1, Math.PI, () => {

      });
      this.rotateAnimation[1] = this.initRotateAnimation(this.dashLine2, -Math.PI, () => {
        this.dashLine1.visible = true;
        this.rotateAnimation[0].pause();
        this.rotateAnimation[0].progress(0);
        this.rotateAnimation[0].play();
      });

      this.rotateAnimation[2] = this.initRotateAnimation(this.dashLine3, -Math.PI, () => {

      });
      this.rotateAnimation[3] = this.initRotateAnimation(this.dashLine4, Math.PI, () => {
        this.dashLine3.visible = true;
        this.rotateAnimation[2].pause();
        this.rotateAnimation[2].progress(0);
        this.rotateAnimation[2].play();
      });
    }

    //显示或隐藏虚线函数线
    isShowDashFunctionLine(value: boolean) {
      if (value) {
        return;
      }
      if (this.selectValue === 1) {
        this.dashLine1.visible = false;
        this.dashLine2.visible = false;
      } else {
        this.dashLine3.visible = false;
        this.dashLine4.visible = false;
      }
    }

    //创建拖动点并绑定拖动事件
    createPoint() {
      const radius = (window as any)['env'].browserInfo.isSmallDevice ? 10 : 3;
      this.point = ThreeUtil.createPoint(radius, '#ffffff', 10, 100 / 10, 0.0001);
      const point1 = ThreeUtil.createPoint(3, '#ffffff', 0, 0, 0.36);
      const smallPoint = ThreeUtil.createPoint(1.5, '#ffffff', 0, 0, 1);
      point1.add(smallPoint);
      this.point.add(point1);
      const dargControls = new dragcontrols([this.point], this.camera, this.renderer.domElement);
      dargControls.addEventListener( 'dragstart',  ( event: any ) => {this.controls.enabled = false; } );
      dargControls.addEventListener( 'drag', ( event: any) => {
        if (this.selectValue === 1) {
          if (this.point.position.x > 100) {
            this.point.position.x = 100;
          } else if (this.point.position.x < -100) {
            this.point.position.x = -100;
          }
          this.point.position.y = 20 - Math.abs(this.point.position.x);
        } else if (this.selectValue === 2) {
          if (this.point.position.x > 31.6) {
            this.point.position.x = 31.6;
          } else if (this.point.position.x < -31.6) {
            this.point.position.x = -31.6;
          }
          this.point.position.y = Math.pow(this.point.position.x / 10, 2) * 10;
        }
        this.removeAuxiliary();
        this.drawDashLine();

        if (this.point.position.x < 0) {
          this.a1Text.position.set(-this.point.position.x + 10, this.point.position.y , 0);
        } else {
          this.a1Text.position.set(-this.point.position.x - 20, this.point.position.y + 10, 0);
        }

        const x = (parseFloat((this.point.position.x / 10).toFixed(1)) % 1 === 0 ?
          (this.point.position.x / 10).toFixed(0) : (this.point.position.x / 10).toFixed(1));
        const y = (parseFloat((this.point.position.y / 10).toFixed(1)) % 1 === 0 ?
          (this.point.position.y / 10).toFixed(0) : (this.point.position.y / 10).toFixed(1));
        if (x === '0' || x === '-0') {
          this.coordinate.text = '(' + 0 + ',' + y + ')';
          this.aText.text = '(' + 0 + ',' + y + ')';
        } else {
          this.coordinate.text = '(' + -x + ',' + y + ')';
          this.aText.text = '(' + x + ',' + y + ')';
        }


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
        this.auxiliaryLine3 = ThreeUtil.createDashLine(new THREE.Vector3( -this.point.position.x, this.point.position.y, 0),
          new THREE.Vector3(-this.point.position.x, 0, 0), color, 5, 2);
        this.auxiliaryLine4 = ThreeUtil.createDashLine(new THREE.Vector3( -this.point.position.x, this.point.position.y, 0),
          new THREE.Vector3(0, this.point.position.y, 0), color, 5, 2);
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
      const textA = ThreeUtil.createNewRomanText('A', 5, 10, 0, color, 0.10);
      this.aText = ThreeUtil.createNormalText('(1,1)', 120, 0, 0, color, 1);
      textA.add(this.aText);
      this.point.add(textA);

      this.a1Text = ThreeUtil.createNewRomanText('A\'', -30, 20, 0, color, 0.10);
      this.coordinate = ThreeUtil.createNormalText('(-1,1)', 125, 0, 0, color, 1);
      this.a1Text.add(this.coordinate);
      this.scene.add(this.a1Text);
    }

    //初始化旋转函数虚线动画
    initRotateAnimation(obj: THREE.Mesh, angle: number, callback?: any) {
      const tween = {
        angle: 0
      };

      const animation = TweenMax.to(tween, 1, {
        angle: angle,
        opacity: 0,
        onUpdate: () => {
          obj.rotation.y = tween.angle;
        },
        onComplete: () => {
          if (callback) {
            callback();
          }
        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
        delay: 0, //延迟N秒执行
        // repeat: 0 //重新执行次数 -1 等于infinite
      });
      return animation;
    }

    isShowLine(value: boolean) {
      if (this.selectValue === 1) {

        this.functionLine1.visible = true;
        this.functionLine2.visible = false;
        if (value) {
          this.dashLine1.visible = true;
          this.dashLine2.visible = true;
          this.dashLine3.visible = false;
          this.dashLine4.visible = false;
        }

      } else {
        this.functionLine1.visible = false;
        this.functionLine2.visible = true;
        if (value) {
          this.dashLine1.visible = false;
          this.dashLine2.visible = false;
          this.dashLine3.visible = true;
          this.dashLine4.visible = true;
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
        this.dashLine2.visible = true;
        this.dashLine1.visible = false;
        this.rotateAnimation[1].pause();
        this.rotateAnimation[1].progress(0);
        this.rotateAnimation[1].play();
      } else  {
        this.dashLine4.visible = true;
        this.dashLine3.visible = false;
        this.rotateAnimation[3].pause();
        this.rotateAnimation[3].progress(0);
        this.rotateAnimation[3].play();
      }
    }

    resetTextPosition() {
      this.aText.text = '(1,1)';
      this.coordinate.text = '(-1,1)';
      this.a1Text.position.set(-30, 20, 0);
    }

    pauseAnimation() {
      for (let i = 0; i < this.rotateAnimation.length; i++) {
        this.rotateAnimation[i].pause();
        this.rotateAnimation[i].progress(0);
      }
    }

    selectPauseAnimation(value: number) {
      if (value === 1) {
        this.rotateAnimation[0].pause();
        this.rotateAnimation[0].progress(0);
        this.rotateAnimation[1].pause();
        this.rotateAnimation[1].progress(0);
      } else {
        this.rotateAnimation[2].pause();
        this.rotateAnimation[2].progress(0);
        this.rotateAnimation[3].pause();
        this.rotateAnimation[3].progress(0);
      }
    }

    reset() {
        this.selectValue = 1;
        this.functionLine1.visible = true;
        this.functionLine2.visible = false;
        this.dashLine1.visible = false;
        this.dashLine2.visible = false;
        this.dashLine3.visible = false;
        this.dashLine4.visible = false;
        this.point.position.set(10, 10, 0);
        this.removeAuxiliary();
        this.drawDashLine();
        this.resetTextPosition();
        for (let i = 0; i < this.rotateAnimation.length; i++) {
          this.rotateAnimation[i].pause();
          this.rotateAnimation[i].progress(0);
        }
    }



}




