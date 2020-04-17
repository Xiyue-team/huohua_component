/**
 *fbx模型加载类
 */
import * as THREE from 'three';
import { WebGLRenderer, Mesh, PerspectiveCamera} from 'three';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
require('three.interaction');
require('three-gltf-loader');
const Interaction = require('three.interaction');

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ViewController} from '../../../../../src/core/ViewController';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { ModelRotateHelper } from '../../../../../src/three/component/ModelRotateHelper';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';

import * as l1 from '../sub_static/model/rutang.fbx';
import * as l2 from '../sub_static/model/putangtang.fbx';
import * as l3 from '../sub_static/model/donghua.fbx';
import * as l4 from '../sub_static/model/rutangend.fbx';
import * as l5 from '../sub_static/model/shui.fbx';
import * as bg from '../sub_static/model/RUTANG.png';




export class Rtdxc3dModel extends ThreeBase {

    planeMesh: Mesh;
    private orbit: any;
    modelanimation: any;

    group1 = new THREE.Group();
    group2 = new THREE.Group();
    group4 = new THREE.Group();
    group5 = new THREE.Group();

    //FIXME 变量名要有意义，且要加上注释
    modelRotate: any;
    modelRotate2: any;
    modelRotate4: any;
    modelRotate5: any;

    ball: any;
    //FIXME 变量名要有意义，且要加上注释
    ball2: any;
    ball3: any;
    ball4: any;
    ball5: any;

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

    loadImg() {
      const model = [bg, l1, l2, l3, l4, l5];
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

    //FIXME 删除不用标识符
    async init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.loadImg();
        this.initmodel();
        this.render();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);

        ViewController.getInstance().hideLoading(500);
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
         left = this.width / -1.1;
         right = this.width / 1.1;
         top = this.height / 1.1;
         bottom = this.height / -1.1;

      } else if (BrowserUtil.getBrowserInfo().isIpad) {
         left = this.width / -2.2;
         right = this.width / 2.2;
         top = this.height / 2.2;
         bottom = this.height / -2.2;
      } else {
         left = this.width / -3;
         right = this.width / 3;
         top = this.height / 3;
         bottom = this.height / -3;
      }
      const near = -500;
      const far = 1000;
      this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      this.camera.lookAt(new THREE.Vector3(0,  0,  0));
      this.camera.position.set(100,  0,  500);
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
        this.orbit.enableDamping = true;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
        //是否开启左键旋转
        this.orbit.enableRotate = false;
        //启用或禁用缩放
        this.orbit.enableZoom = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
      this.lights = [];
      this.scene.add( new THREE.AmbientLight( 0x666666, 2 ) );
      this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
      this.lights[0].position.set( 100, 100, 100 );
      this.lights[0].position.multiplyScalar( 1.3 );

      this.lights[1] = new THREE.DirectionalLight( 0xdfebff, 1 );
      this.lights[1].position.set( -200, -200, -500 );
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

      this.ball = await this.fbxLoader(l1 as any);
      const geometry = new THREE.SphereGeometry(100, 40, 40);
      const material = new THREE.MeshBasicMaterial( {color: 0x000000, visible: true, transparent: true, opacity: 0,  depthWrite: false} );
      const cube = new THREE.Mesh( geometry, material );
      this.group1.add(this.ball);
      this.group1.add(cube);
      this.modelRotate = new ModelRotateHelper(this.group1, null, null, this.group2);
      this.modelRotate.initEvent();
      this.group1.visible = true;
      this.group1.position.set(-113, -17.5, 0);
      this.scene.add(this.group1);


      this.ball2 = await this.fbxLoader(l2 as any);
      const geometry2 = new THREE.SphereGeometry(100, 40, 40);
      const material2 = new THREE.MeshBasicMaterial( {color: 0x000000, visible: true, transparent: true, opacity: 0, depthWrite: false} );
      const cube2 = new THREE.Mesh( geometry2, material2 );
      this.group2.add(this.ball2);
      this.group2.add(cube2);
      this.modelRotate2 = new ModelRotateHelper(this.group2, null, null, this.group1);
      this.modelRotate2.initEvent();
      this.group2.visible = true;
      this.group2.position.set(117, -6.8, 0);
      this.scene.add(this.group2);



      this.ball3 = await this.fbxLoader(l3 as any);
      this.scene.add(this.ball3);
      this.modelanimation = new Model3dAnimation(this.ball3);
      this.ball3.visible = false;



      this.ball4 = await this.fbxLoader(l4 as any);
      const geometry4 = new THREE.SphereGeometry(110, 40, 40);
      const material4 = new THREE.MeshBasicMaterial( {color: 0x000000, visible: true, transparent: true, opacity: 0, depthWrite: false} );
      const cube4 = new THREE.Mesh( geometry4, material4 );
      this.group4.add(this.ball4);
      this.group4.add(cube4);
      this.modelRotate4 = new ModelRotateHelper(this.group4, null, null, this.group5);
      this.modelRotate4.initEvent();
      this.group4.visible = false;
      this.group4.position.set(-64, -12.5, 0);
      this.scene.add(this.group4);


      this.ball5 = await this.fbxLoader(l5 as any);
      const geometry5 = new THREE.SphereGeometry(40, 40, 40);
      const material5 = new THREE.MeshBasicMaterial( {color: 0x000000, visible: true, transparent: true, opacity: 0, depthWrite: false} );
      const cube5 = new THREE.Mesh( geometry5, material5 );
      this.group5.add(this.ball5);
      this.group5.add(cube5);
      this.modelRotate5 = new ModelRotateHelper(this.group5, null, null, this.ball4);
      this.modelRotate5.initEvent();
      this.group5.visible = false;
      this.group5.position.set(90, -0.5, 0);
      this.scene.add(this.group5);

    }

    //播放动画
    playAnimate() {
      this.group1.visible = false;
      this.group2.visible = false;
      this.ball3.visible = true;

      this.group4.visible = false;
      this.group5.visible = false;
      this.modelanimation.playAnimation(0);
      this.modelanimation.setAnimationDoubleSpeed(0.32);
    }

    //暂停动画
    pausedAnimate() {
        this.modelanimation.pausedAnimation();
    }

    //计算角度方法
    toRadians(angle: number) {
    return angle * (Math.PI / 180);
    }

    reset() {

      this.modelanimation.resetModel();
      this.pausedAnimate();
      setTimeout(() => {
        this.group1.visible = true;
        this.group2.visible = true;
        this.ball3.visible = false;
        this.group4.visible = false;
        this.group5.visible = false;
        this.group1.rotation.set(0, 0, 0);
        this.group2.rotation.set(0, 0, 0);
        this.group4.rotation.set(0, 0, 0);
        this.group5.rotation.set(0, 0, 0);
      }, 10);
      this.resetCamer();
    }

    resetCamer() {
      this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
      this.orbit.object.position.set(100, 0, 500);
      for (let i = 0; i < 21; i++) {
        this.orbit.reset();
      }
    }
}
