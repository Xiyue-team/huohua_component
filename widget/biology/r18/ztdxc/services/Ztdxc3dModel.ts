
import * as THREE from 'three';
import { WebGLRenderer, Mesh, PerspectiveCamera } from 'three';
require('three.interaction');
require('three-gltf-loader');
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ViewController} from '../../../../../src/core/ViewController';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
import { ModelRotateHelper } from '../../../../../src/three/component/ModelRotateHelper';

import * as l1 from '../sub_static/model/putaotang.fbx';
import * as l2 from '../sub_static/model/guotang.fbx';
import * as l3 from '../sub_static/model/animation.fbx';
import * as l4 from '../sub_static/model/zhetang.fbx';
import * as l5 from '../sub_static/model/shui.fbx';
import * as l6 from '../sub_static/model/RUTANG.png';


export class Ztdxc3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;
    private modelRotate: any;
    private modelRotate2: any;
    private isMobile = false;
    private geometry: any = new THREE.SphereGeometry( 95, 100, 100 );
    private material: any = new THREE.MeshBasicMaterial( {color: '#000000', transparent: true, opacity: 0});
    group = new THREE.Group();
    group2 = new THREE.Group();
    group3 = new THREE.Group();
    group4 = new THREE.Group();
    modelanimation: any;
    model1: any;
    model2: any;
    model3: any;
    model4: any;
    model5: any;

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
        this.init();

    }

    static loadingModle() {
      const model = [l1, l2, l3, l4, l5, l6];
      console.log(model);
    }


    private render = () => {
        requestAnimationFrame( this.render );
        if (this.modelanimation) {
          this.modelanimation.renderModel();
          this.modelanimation.setLoopOne();
        }
        this.renderer.render( this.scene, this.camera );
      }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.initmodel();
        this.render();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);

    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xffffff );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
      let left: any;
      let right: any;
      let top: any;
      let bottom: any;
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
        this.isMobile = true;
        left = this.width / -1.1;
        right = this.width / 1.1;
        top = this.height / 1.1;
        bottom = this.height / -1.1;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.set(100, 0, 500);
      } else if (BrowserUtil.getBrowserInfo().isIpad) {
        left = this.width / -2.2;
        right = this.width / 2.2;
        top = this.height / 2.2;
        bottom = this.height / -2.2;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.set(100, 0, 500);
      } else {
        left = this.width / -3.5;
        right = this.width / 3.5;
        top = this.height / 3.5;
        bottom = this.height / -3.5;
        const near = -600;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.set(10, -10, 500);
      }

      if (screen.width === 854) {
        left = this.width / -2.5;
        right = this.width / 2.5;
        top = this.height / 2.5;
        bottom = this.height / -2.5;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.set(100, 0, 500);
      }

      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
        } else {
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
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = false;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 100;
        this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.minPolarAngle = Math.PI * 1 / 180; // radians
        this.orbit.maxPolarAngle = Math.PI * 179 / 180; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
        this.orbit.enableRotate = false;

    }


    /**
     * 初始化光源
     */
    initLight(): void {
      this.lights = [];
      this.scene.add( new THREE.AmbientLight( 0x666666, 0.9 ) );
      this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 0.95 );
      this.lights[0].position.set( 100, 0, 150 );
      this.lights[0].position.multiplyScalar( 1.3 );

      this.lights[1] = new THREE.DirectionalLight( 0xdfebff, 0.95 );
      this.lights[1].position.set( -100, 0, -150 );
      this.lights[1].position.multiplyScalar( 1.3 );

      this.scene.add( this.lights[0]  , this.lights[1] );
    }

    resize(width: number, height: number) {
       (this.camera as PerspectiveCamera).aspect = width / height;
       (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //加载模型
    async initmodel() {
      //模型1的加载及转动事件
      this.model1 = await this.fbxLoader(l1 as any);
      const cube = new THREE.Mesh( this.geometry, this.material );
      this.group.add(this.model1);
      this.group.add(cube);
      this.scene.add(this.group);
      this.group.position.set(-107.5, 0, 0);
      this.group.visible = true;
      this.modelRotate = new ModelRotateHelper(this.group, null, null, this.group2);
      this.modelRotate.initEvent();

      //模型2的加载及转动事件
      this.model2 = await this.fbxLoader(l2 as any);
      const cube2 = new THREE.Mesh( this.geometry, this.material );
      this.group2.add(this.model2);
      this.group2.add(cube2);
      this.scene.add(this.group2);
      this.group2.position.set(111, 0, 0);
      this.group2.visible = true;
      this.modelRotate = new ModelRotateHelper(this.group2, null, null, this.group);
      this.modelRotate.initEvent();

      //动画模型3的加载
      this.model3 = await this.fbxLoader(l3 as any);
      this.scene.add(this.model3);
      this.modelanimation = new Model3dAnimation(this.model3);
      this.model3.visible = false;

      //模型4的加载及转动事件
      this.model4 = await this.fbxLoader(l4 as any);
      const cube3 = new THREE.Mesh( this.geometry, this.material );
      this.group3.add(this.model4);
      this.group3.add(cube3);
      this.scene.add(this.group3);
      this.group3.position.set(-78.5, 0, 0);
      this.group3.visible = false;
      this.modelRotate2 = new ModelRotateHelper(this.group3, null, null, this.group4);
      this.modelRotate2.initEvent();

      //模型5的加载及转动事件
      this.model5 = await this.fbxLoader(l5 as any);
      const cube4 = new THREE.Mesh( this.geometry, this.material );
      this.group4.add(this.model5);
      this.group4.add(cube4);
      this.scene.add(this.group4);
      this.group4.position.set(111, 0, 0);
      this.group4.visible = false;
      this.modelRotate2 = new ModelRotateHelper(this.group4, null, null, this.group3);
      this.modelRotate2.initEvent();

      ViewController.getInstance().hideLoading(300);
    }

    //播放动画
    playAnimate() {
      this.group.visible = false;
      this.group2.visible = false;
      this.model3.visible = true;
      this.group3.visible = false;
      this.group4.visible = false;
      this.group.rotation.set(0, 0, 0);
      this.group2.rotation.set(0, 0, 0);
      this.group3.rotation.set(0, 0, 0);
      this.group4.rotation.set(0, 0, 0);
      this.modelanimation.playAnimation(0);
      this.modelanimation.setAnimationDoubleSpeed(0.42);
    }

    //暂停动画
    pausedAnimate() {
        this.modelanimation.pausedAnimation();
    }

    //重置模型和动画
    reset() {
      this.modelanimation.resetModel();
      this.pausedAnimate();
      setTimeout(() => {
        this.group.visible = true;
        this.group2.visible = true;
        this.model3.visible = false;
        this.group3.visible = false;
        this.group4.visible = false;
        this.group.rotation.set(0, 0, 0);
        this.group2.rotation.set(0, 0, 0);
        this.group3.rotation.set(0, 0, 0);
        this.group4.rotation.set(0, 0, 0);
      }, 20);
      this.resetCamer();
    }

    //重置摄像机
    resetCamer() {
      this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
      this.orbit.object.position.set(50, 300, 500);
      for (let i = 0; i < 21; i++) {
        this.orbit.reset();
      }
    }

}
