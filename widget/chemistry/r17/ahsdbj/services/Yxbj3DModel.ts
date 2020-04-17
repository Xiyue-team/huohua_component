/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import { FbxModelLoad } from './FbxModelLoad';

export class Yxbj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    private fbxModelLoad: FbxModelLoad;

    static preload() {
        const modelArray = [];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );

        if (this.fbxModelLoad.modelH1Animation) {
            this.fbxModelLoad.modelH1Animation.renderModel();
        }

        if (this.fbxModelLoad.modelH2Animation) {
            this.fbxModelLoad.modelH2Animation.renderModel();
        }

        if (this.fbxModelLoad.modelH3Animation) {
            this.fbxModelLoad.modelH3Animation.renderModel();
        }

        if (this.fbxModelLoad.modelH4Animation) {
            this.fbxModelLoad.modelH4Animation.renderModel();
        }
        if (this.fbxModelLoad.modelH5Animation) {
            this.fbxModelLoad.modelH5Animation.renderModel();
        }

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
        this.init3DModel();

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

        let rotate = 12;

        if (this.browserInfo.isSmallDevice) {
            rotate = 8;
        }

        const left    = this.width / - rotate;
        const right   = this.width / rotate;
        const top     = this.height / rotate;
        const bottom  = this.height / - rotate;
        const near    = -500;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 100);
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
      this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
      this.orbit.enableZoom = false;
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;

      //设置相机距离原点的最远距离
      this.orbit.minDistance = 200;
      this.orbit.maxDistance = 400;

      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //是否自动旋转
      this.orbit.minAzimuthAngle = -Math.PI * 2;
      this.orbit.maxAzimuthAngle = Math.PI * 2;

      this.orbit.maxPolarAngle = Math.PI;

      //是否开启右键拖拽
      this.orbit.enablePan = false;

      this.orbit.enableRotate = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const light = new THREE.HemisphereLight( '#ffeeee', '#111122', 1 );
        light.position.set(0, 50, 0);
        this.scene.add( light );

        const light2 = new THREE.HemisphereLight( '#ffeeee', '#111122', 0.5 );
        light2.position.set(0, -50, 0);
        this.scene.add( light2 );


        const light3 = new THREE.AmbientLight( '#404040', 1 );
        this.scene.add( light3 );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 200, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
        //
        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.multiplyScalar( 30 );
        dirLight2.position.set( 100, -200, 1 );
        this.scene.add( dirLight2 );
    }

    init3DModel() {
      this.fbxModelLoad = new FbxModelLoad();
      this.initFbxModel();
    }

    async initFbxModel() {

        await this.fbxModelLoad.initNH3FbxLoader();
        await this.scene.add(this.fbxModelLoad.obj1);

        await this.fbxModelLoad.initH2OFbxLoader();
        await this.scene.add(this.fbxModelLoad.obj2);

        await this.fbxModelLoad.initAddHAnimation();

        await this.fbxModelLoad.initContrastNH3AndH2O(this.orbit);
    }

    // 加氢动画
    addHAnimation(value: number) {
      switch (value) {
        case 1:
            this.fbxModelLoad.addHAnimation1.play();
          break;
        case 2:
            this.fbxModelLoad.addHAnimation2.play();
          break;
        case 3:
            this.fbxModelLoad.addHAnimation3.play();
          break;
        case 4:
            this.fbxModelLoad.addHAnimation4.play();
          break;
        case 5:
            this.fbxModelLoad.addHAnimation5.play();
          break;
      }
    }

    // 显示键角
    showBondAngle(show: boolean) {
        if (show) {
            this.fbxModelLoad.obj1.children[4].visible = true;
            this.fbxModelLoad.obj2.children[3].visible = true;
        } else {
            this.fbxModelLoad.obj1.children[4].visible = false;
            this.fbxModelLoad.obj2.children[3].visible = false;
        }
    }

    // 显示孤对电子
    showElectronics(show: boolean) {
        if (show) {
            this.fbxModelLoad.obj1.children[5].visible = true;
            this.fbxModelLoad.obj2.children[4].visible = true;
        } else {
            this.fbxModelLoad.obj1.children[5].visible = false;
            this.fbxModelLoad.obj2.children[4].visible = false;
        }
    }

    contrastAnimation(startOrReset: boolean) {
        if (startOrReset) {
            this.fbxModelLoad.contrastAnimation.play();
        } else {
            this.fbxModelLoad.contrastAnimation.progress(0);
            this.fbxModelLoad.contrastAnimation.pause();
            this.orbit.enableRotate = false;
            this.fbxModelLoad.modelRotate1.enableRotate = true;
            this.fbxModelLoad.modelRotate2.enableRotate = true;
            this.resetCamera();
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        this.orbit.enableRotate = false;

        this.fbxModelLoad.reset();

        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 0, 100);

        for (let i = 0; i < 21; i++) {
            this.orbit.reset();
        }
    }
}
