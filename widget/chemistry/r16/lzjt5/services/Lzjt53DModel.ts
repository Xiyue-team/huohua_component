/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { SpriteText2D} from 'three-text2d';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import {ModelLoad} from './ModelLoad';
import * as console from 'console';

export class Lzjt53DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    public orbit: any;

    model = new ModelLoad();

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
        if (this.height < 500) {
            this.camera = new THREE.OrthographicCamera(-this.width / 0.6, this.width / 0.6, this.height / 0.6, -this.height / 0.6, 1, 5000);
        } else {
            this.camera = new THREE.OrthographicCamera(-this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 5000);
        }
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(238.6, 54.46, 9.75);
        this.scene.add(this.camera);
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
        this.orbit.saveState ();
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;

        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( '#ffffff', 0.3);
        this.camera.add(ambientLight);
        const dirLight = new THREE.DirectionalLight('#ffffff', 0.9);
        dirLight.position.set(150, 0, 259.8);
        this.camera.add(dirLight);
    }

    // 加载模型
    async initGltfLoader()  {
        this.model.initScene1().then(() => {
        this.model.obj1.scale.set(200, 200, 200);
        this.model.obj1.visible = true;
        });
        this.model.initScene2();

        this.scene.add(this.model.obj1);
        this.scene.add(this.model.obj2);

  
        this.model.obj2.visible = false;
    }

   startAnimation() {
       this.model.animationScene2.play();
   }

   startAnimation1() {
    this.model.animationScene1.play();
}

    // 重置动画
    resetModel() {
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 200);
    }

    resetAnimation() {
        this.model.resetScene1Animation();
        this.model.resetScene2Animation();
    }
    // 隐藏模型
    hideScene() {
        this.model.obj1.visible = false;
        this.model.obj2.visible = false;
    }
}
