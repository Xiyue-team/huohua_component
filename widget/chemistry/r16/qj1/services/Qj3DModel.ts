import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as H2OFBX from '../sub_static/model/H2O.fbx';
import * as NH3FBX from '../sub_static/model/NH3.fbx';
import * as GunZiFBX from '../sub_static/model/GUNZI.fbx';

import * as D1Img from '../sub_static/model/D1.png';
import * as D2Img from '../sub_static/model/D2.png';
import { ModelRotateHelper } from '../../../../../src/three/component/ModelRotateHelper';
import { TweenMax } from 'gsap';

export class Qj3DModel extends ThreeBase {

    browserInfo: BrowserInfo;
    orbit: any;

    group1 = new THREE.Group();
    group2 = new THREE.Group();
    obj = new THREE.Object3D();

    modelRotate: any;
    modelRotate1: any;

    rotateAnimation: any;
    rotateAnimation2: any;
    rotateAnimation3: any;

    static preload() {
        const modelArray = [H2OFBX, NH3FBX, GunZiFBX, D1Img, D2Img];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
    }

    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }

     init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.initGltfLoader();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }

    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(0, 0, 200);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
        //是否开启左键旋转
        // this.orbit.enableRotate = true;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    // 加载模型
    async initGltfLoader()  {

          const NH3_FBX: any = await this.fbxLoader(NH3FBX as any);
          NH3_FBX.scale.set(1.5, 1.5, 1.5);
          const geometry = new THREE.BoxBufferGeometry( 60, 100, 100 );
          const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
          const cube = new THREE.Mesh( geometry, material );
          this.group1.add(cube);
          this.group1.add(NH3_FBX);
          this.group1.position.set(-40, 0, 0);
          this.modelRotate = new ModelRotateHelper(this.group1);
          this.modelRotate.initEvent();

          const H2O_FBX: any = await this.fbxLoader(H2OFBX as any);
          H2O_FBX.scale.set(1.5, 1.5, 1.5);
          const geometry1 = new THREE.BoxBufferGeometry( 60, 100, 100 );
          const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
          const cube1 = new THREE.Mesh( geometry1, material1 );
          this.group2.add(cube1);
          this.group2.add(H2O_FBX);
          this.group2.position.set(40, 0, 0);
          this.modelRotate1 = new ModelRotateHelper(this.group2);
          this.modelRotate1.initEvent();

          const NH31_FBX: any = await this.fbxLoader(NH3FBX as any);
          NH31_FBX.scale.set(1.5, 1.5, 1.5);
          NH31_FBX.position.x = -21;
          this.obj.add(NH31_FBX);

          const H2O1_FBX: any = await this.fbxLoader(H2OFBX as any);
          H2O1_FBX.scale.set(1.5, 1.5, 1.5);
          H2O1_FBX.position.x = 24;
          this.obj.add(H2O1_FBX);

          const GunZi_FBX: any = await this.fbxLoader(GunZiFBX as any);
          GunZi_FBX.scale.set(1.5, 1.5, 1.5);
          this.obj.add(GunZi_FBX);

          this.group1.visible = true;
          this.group2.visible = true;
          this.obj.visible = false;

          this.scene.add(this.group1);
          this.scene.add(this.group2);
          this.scene.add(this.obj);

          this.rotateModel();
          this.initMaterial();
    }

      initMaterial() {
            (this.obj.children[2].children[0] as any).material.transparent = true;
            (this.obj.children[2].children[0] as any).material.opacity = 0;
      }


        //模型旋转
        rotateModel() {
            const tween = {
              angle: 0
            };

            this.rotateAnimation = TweenMax.to(tween, 1, {
              angle: -Math.PI / 2,
              onUpdate: () => {
                  this.obj.children[0].rotation.z = tween.angle;
              },
              paused: true
            });


          const tween1 = {
            angle: 0
          };

          this.rotateAnimation2 = TweenMax.to(tween1, 1, {
            angle: -(37.775 * Math.PI) / 180,
            onUpdate: () => {
              this.obj.children[1].rotation.z = tween1.angle;
            },
            onComplete: () => {
              this.rotateAnimation3.play();
            },
            paused: true
          });


          const tween2 = {
            opacity: 0
          };

          this.rotateAnimation3 = TweenMax.to(tween2, 1, {
            opacity: 1,
            onUpdate: () => {
              (this.obj.children[2].children[0] as any).material.opacity = tween2.opacity;
            },
            paused: true
          });
        }


        //开启模型旋转
        startRotate() {
            this.rotateAnimation.play();
            this.rotateAnimation2.play();

        }

        //停止动画并复位
        stopRotate() {
          this.rotateAnimation.progress(0);
          this.rotateAnimation.pause();

          this.rotateAnimation2.progress(0);
          this.rotateAnimation2.pause();

          this.rotateAnimation3.progress(0);
          this.rotateAnimation3.pause();
        }


        resize(width: number, height: number) {
            (this.camera as PerspectiveCamera).aspect = width / height;
            (this.camera as PerspectiveCamera).updateProjectionMatrix();
            this.renderer.setSize( width,  height );
        }

        resetCamera() {
            this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
            this.orbit.object.position.set(-20, 20, 0);

            for (let i = 0; i < 11; i++) {
                this.orbit.reset();
            }
        }

}
