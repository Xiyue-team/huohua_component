import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as db from './../sub_static/d1.fbx';
import * as tietu1 from './../sub_static/210291.jpg';
import { Line } from '../../../../../src/three/component/Line';
import { ThreejsConfig } from './ThreejsConfig';

const OrbitControls = require('three-orbitcontrols');
export class Threejs3dModel extends ThreeBase {

    private orbit: any;
    private rotatePoint1: THREE.Mesh;
    private rotatePoint2: THREE.Mesh;
    private group: THREE.Group;
    private bdTraceRotatePoint: THREE.Mesh[] = [];
    private cdTraceRotatePoint: THREE.Mesh[] = [];
    private render = () => {
        requestAnimationFrame( this.render );
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
        this.initLight();
        this.initControl();
        this.createRotatePoint();
        this.createTriangle();
        this.createRightAngle();
        this.createText();
        this.initFBXLoader();
        this.createTrace();
        this.render();
    }

    preload() {
      const image = [db, tietu1];
      console.log(image);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xE5E5E5 );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
      const n = 20;
      const left    = this.width / - n;
      const right   = this.width / n;
      const top     = this.height / n;
      const bottom  = this.height / - n;
      const near    = -600;
      const far     = 1000;
      this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
      this.camera.lookAt(new THREE.Vector3(0,  0,  0));
      this.camera.position.set(-6.54812977595157,  15.179517532171358,  47.18796715188956);
    }
    //重置摄像机位置
    resetCamera() {
      for (let i = 0; i < 20; i++) {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-6.54812977595157,  15.179517532171358,  47.18796715188956);
        this.orbit.reset();
      }
    }

    //重置虚线
    resetDashLine() {
      for (let i = 0; i < this.bdTraceRotatePoint.length; i++) {
        this.bdTraceRotatePoint[i].visible = false;
        this.cdTraceRotatePoint[i].visible = false;
      }
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
      this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
      this.orbit.enableZoom = true;
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;

      //设置相机距离原点的最远距离
      this.orbit.minDistance = 50;
      this.orbit.maxDistance = 70;

      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //是否自动旋转
      this.orbit.minAzimuthAngle = -Math.PI * 2;
      this.orbit.maxAzimuthAngle = Math.PI * 2;
      this.orbit.maxPolarAngle = Math.PI / 2; // radians
      //是否开启右键拖拽
      this.orbit.enablePan = false;
    }
    //初始化灯光
    initLight() {
      const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
      dirLight2.position.set( -100, -100, -100 );
      this.scene.add( dirLight2 );
    }

    createRotatePoint() {
      this.group = new THREE.Group();
      this.rotatePoint1 = ThreeUtil.createPoint(0.001, '#0199ff', 0, 0.5, 1);
      this.group.add(this.rotatePoint1);
      this.rotatePoint2 = ThreeUtil.createPoint(0.001, '#0199ff', 0, 0.5, 1);
      this.group.add(this.rotatePoint2);
      this.rotatePoint2.rotation.y = -45 / 180 * Math.PI;
      this.group.position.y = -10;
      this.scene.add(this.group);
    }

    createText() {
      const scale = 0.15;
      const color = '#000000';
      const a = ThreeUtil.createNewRomanText('A', 0, 50, 0, color, scale);
      const b = ThreeUtil.createNewRomanText('B', -42, 6, 0, color, scale);
      const c = ThreeUtil.createNewRomanText('C', 42, 6, 0, color, scale);
      const d = ThreeUtil.createNewRomanText('D', 5, 7, 5, color, scale);
      this.rotatePoint1.add(a, b);
      this.rotatePoint2.add(c);
      this.group.add(d);
    }

    createRightAngle() {
      const leftAngleLable = ThreeUtil.createBox(3, 3, '#FFB719', 1);
      const rightAngleLable = leftAngleLable.clone();
      leftAngleLable.position.set(-2.1, 2, 0);
      rightAngleLable.position.set(2.1, 2, 0);
      this.rotatePoint1.add(leftAngleLable);
      this.rotatePoint2.add(rightAngleLable);
    }

    rotateMesh1(value: number) {
      this.rotatePoint1.rotation.y = (value) / 180 * Math.PI;
    }
    rotateMesh2(value: number) {
      this.rotatePoint2.rotation.y = (value - 180) / 180 * Math.PI;
    }

    createTriangle() {
      const lineHelper = new Line();
      const leftTriangle = ThreeUtil.createTriangle(0, 0, 0, 40,  -40, 0, '#BDEEF8');
      const rightTriangle = ThreeUtil.createTriangle( 0, 0, 0, 40, 40, 0, '#BDEEF8');
      const config = new ThreejsConfig();
      const centerLine = ThreeUtil.createCylinder(0.5, 0.5, 40, '#B618FF', 0, 20, 0);
      const leftLine1 = ThreeUtil.createCylinder(0.5, 0.5, Math.sqrt((Math.pow(40, 2) + Math.pow(40, 2))) + 1, '#57A0AF', -20 , 20, 0);
      const leftLine2 = ThreeUtil.createCylinder(0.5, 0.5, 40, '#ff6801', -20, 0, 0);
      const rightLine1 = leftLine1.clone();
      const rightLine2 = ThreeUtil.createCylinder(0.5, 0.5, 40, '#f1fc2b', -20, 0, 0);
      rightLine1.position.set(20, 20, 0);
      rightLine2.position.set(20, 0, 0);
      leftLine1.rotation.z = -Math.PI / 4;
      leftLine2.rotation.z = Math.PI / 2;
      rightLine1.rotation.z = Math.PI / 4;
      rightLine2.rotation.z = Math.PI / 2;
      const leftDashLine1 = lineHelper.createLine(config.leftDashLineConfig1);
      const leftDashLine2 = lineHelper.createLine(config.leftDashLineConfig2);
      const rightDashLine1 = lineHelper.createLine(config.rightDashLineConfig1);
      const rightDashLine2 = lineHelper.createLine(config.rightDashLineConfig2);
      this.rotatePoint1.add(leftTriangle, centerLine, leftLine1, leftLine2, leftDashLine1, leftDashLine2);
      this.rotatePoint2.add(rightTriangle, rightLine1, rightLine2, rightDashLine1, rightDashLine2);
    }

    createTrace () {
      const lineHelper = new Line();
      const config = new ThreejsConfig();
      for (let i = 0; i < 12; i ++) {
        this.bdTraceRotatePoint.push(ThreeUtil.createPoint(0.1, '#ffffff', 0, 0, 0.0001));
        this.bdTraceRotatePoint[i].add(lineHelper.createLine(config.traceDashLineConfig1));
        this.bdTraceRotatePoint[i].rotation.y = (i * 30) / 180 * Math.PI;

        this.cdTraceRotatePoint.push(ThreeUtil.createPoint(0.01, '#ffffff', 0, 0, 0.001));
        this.cdTraceRotatePoint[i].add(lineHelper.createLine(config.traceDashLineConfig2));
        this.cdTraceRotatePoint[i].rotation.y = (15 + (i * 30)) / 180 * Math.PI;
        this.group.add(this.bdTraceRotatePoint[i], this.cdTraceRotatePoint[i]);
        this.cdTraceRotatePoint[i].visible = false;
        this.bdTraceRotatePoint[i].visible = false;
      }
    }

    showbdTrace(value: number) {
      const positiveSpacing = Math.floor(value / 30);
      const nagetiveSpacing = 12 - Math.floor(Math.abs(value) / 30);
      if (value >= 0) {
        if (positiveSpacing === 0) {
          return;
        }
        if (positiveSpacing === 12) {
          this.bdTraceRotatePoint[0].visible = true;
          return;
        }
          this.bdTraceRotatePoint[positiveSpacing].visible = true;
      } else {
        if (nagetiveSpacing === 12) {
          return;
        }
         this.bdTraceRotatePoint[nagetiveSpacing].visible = true;
      }
    }

    showcdTrace(value: number, lastValue: number) {
      const positiveSpacing = Math.floor((value - 15) / 30);
      const nagetiveSpacing = 12 + Math.floor((value - 15) / 30);
      if (lastValue < 135 && value > 135) {
        this.cdTraceRotatePoint[4].visible = true;
      }

      if (value >= 135) {
        if (positiveSpacing === 4) {
          return;
        }
        this.cdTraceRotatePoint[positiveSpacing].visible = true;
      } else if (value >= 0 && value < 135) {
        if (positiveSpacing + 1 === 4) {
          return;
        }
        this.cdTraceRotatePoint[positiveSpacing + 1].visible = true;
      } else if (value < 0) {
        if (nagetiveSpacing === 11) {
          return;
        }
        this.cdTraceRotatePoint[nagetiveSpacing + 1].visible = true;
      }
    }

    async initFBXLoader()  {
      const diban: any = await this.fbxLoader(db as any);
      this.group.add(diban);
      diban.rotation.x = Math.PI / 2;
      (window as any).viewHandler.modelHideLoading();
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

}




