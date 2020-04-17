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

import * as liufang1 from '../sub_static/model/liufang1.fbx';
import * as liufang2 from '../sub_static/model/liufang2.fbx';
import * as liufang3 from '../sub_static/model/liufang3.fbx';
import * as liufang4 from '../sub_static/model/liufang4.fbx';
import * as liufang5 from '../sub_static/model/liufang5.fbx';

import {TweenMax} from 'gsap';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';

export class LiuFang3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    // 场景1
    obj1 = new THREE.Object3D();
    // 场景2
    obj2 = new THREE.Object3D();
    // 场景3
    obj3 = new THREE.Object3D();

    // 模型散开动画1
    modelAnimation1: any;
    // 模型散开动画2
    modelAnimation2: any;

    // 模型散开动画1 隐藏动画
    hideAnimation1: any;
    // 模型散开动画2 隐藏动画
    hideAnimation2: any;

    static preload() {
        const modelArray = [liufang1, liufang2, liufang3, liufang4, liufang5];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );

        if (this.modelAnimation1) {
            this.modelAnimation1.renderModel();
        }

        if (this.modelAnimation2) {
            this.modelAnimation2.renderModel();
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

         this.initModel();

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
        this.camera.position.set(100, 100, 300);
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

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    // 加载球棍模型
    async initModel()  {
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);

        const model1: any = await this.fbxLoader(liufang1 as any);
        this.obj1.add(model1);

        const model3: any = await this.fbxLoader(liufang3 as any);
        this.obj2.add(model3);

        const model2: any = await this.fbxLoader(liufang2 as any);
        this.obj2.add(model2);

        const model5: any = await this.fbxLoader(liufang5 as any);
        this.obj3.add(model5);

        const model4: any = await this.fbxLoader(liufang4 as any);
        this.obj3.add(model4);

        this.modelAnimation1 = new Model3dAnimation(model2);
        this.modelAnimation1.setLoopOne();
        this.modelAnimation1.setAnimationDoubleSpeed(0.5);

        this.modelAnimation2 = new Model3dAnimation(model4);
        this.modelAnimation2.setLoopOne();
        this.modelAnimation2.setAnimationDoubleSpeed(0.5);

        this.obj2.visible = false;
        this.obj3.visible = false;

        (model1.children[0] as any).material = (model2.children[0] as any).material.clone();
        (model3.children[0] as any).material = (model2.children[0] as any).material.clone();
        (model5.children[0] as any).material = (model2.children[0] as any).material.clone();
        this.animationModel();
    }

    hideScene() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
    }

    // 模型散开动画1
    animationModel() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };
        (this.obj2.children[1].children[0] as any).material.transparent = true;
        this.hideAnimation1 = TweenMax.to(tween, 1, {
            opacity1: 0,
            onStart: () => {
                this.modelAnimation1.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj2.children[1].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });

        (this.obj3.children[1].children[0] as any).material.transparent = true;
        this.hideAnimation2 = TweenMax.to(tween, 1, {
            opacity2: 0,
            onStart: () => {
                this.modelAnimation2.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj3.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    resetAnimation1() {
        this.hideAnimation1.progress(0);
        this.hideAnimation1.pause();

        this.modelAnimation1.resetModelAnimation();
    }

    resetAnimation2() {
        this.hideAnimation2.progress(0);
        this.hideAnimation2.pause();

        this.modelAnimation2.resetModelAnimation();
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(100, 100, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
