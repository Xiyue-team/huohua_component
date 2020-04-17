import * as THREE from 'three';
import {Group, Mesh, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
/**
 * 乙醇与溴化氢的取代反应3Dmodel
 */
// import * as ycPath from './sub_static/C2H6O.gltf';
// import * as ycBin from './sub_static/C2H6O.bin';
// import * as xhqPath from './sub_static/HBr.gltf';
// import * as xhqBin from './sub_static/HBr.bin';

import * as ycdjoPath from './sub_static/ycdjo.gltf';
import * as ycdjoBin from './sub_static/2d.bin';

import * as xhqdjoPath from './sub_static/DJ1HBr.gltf';
import * as xhqdjoBin from './sub_static/DJ1HBr.bin';

import * as ycdjtPath from './sub_static/DJ2C2H6O.gltf';
import * as ycdjtBin from './sub_static/DJ2C2H6O.bin';

import * as xhqdjtPath from './sub_static/DJ2HBr.gltf';
import * as xhqdjtBin from './sub_static/DJ2HBr.bin';

// import * as ycfyPath from './sub_static/fayingwu1.gltf';
// import * as ycfyBin from './sub_static/fayingwu1.bin';
// import * as xhqfyPath from './sub_static/fayingwu2.gltf';
// import * as xhqfyBin from './sub_static/fayingwu2.bin';
import * as imageone from './sub_static/Material9113_baseColor.png';
import * as imagetwo from './sub_static/Material9661_baseColor.png';
import * as imagethree from './sub_static/Material9794_baseColor.png';
import * as imagefour from './sub_static/Material10073_baseColor.png';
import {TweenMax, Power0, TimelineLite} from 'gsap';
import {ModelAnimate} from './ModelAnimate';

export class EthanolHydrogen3dModel extends ThreeBase  {
    public modelArry: Array<any> = []; //存放模型的数组
    modelAnimate: ModelAnimate = null;
    private ycdjoModel: any; //乙醇 断键一
    private ycdjtModel: any; // 乙醇 断键二
    private xhqdjoModel: any; //溴化氢 断键一
    private xhqdjtModel: any; //溴化氢 断键二
    private tween = {
        ycdjoModel: -80,
        xhqdjoModel: 80,
    }; //平移
    private between = {
        angle: 0
    }; //旋转y轴
    private angleRotate = {
        angle: Math.PI / 4,
    }; //旋转x轴

    //旋转Z轴
    angleRotateZ = {
      angle: Math.PI * 11 / 18,
        angleZ: 0,
    };

    translationAnimate: any;   //模型平移
     rotateYAnimate: any;   // 模型Y轴旋转
    resetRotateYAnimate: any;  //模型Z轴旋转
    rotateZAnimate: any;

     timeLine: TimelineLite ; //动画连
     djEnable: Boolean = false; //断键动画开关
     cjEnable: Boolean = false; //成键动画开关


    step: number;

    //动画状态
    zhuantai: Boolean = false;

    /**
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
        this.init();
        this.modelAnimate = new ModelAnimate();
    }

    async init() {
        this.preload();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.render();

        this.animateTransform();

        this.animateRotateY();

        this.resetAnimateRotateY();

    }

    preload() {

        console.log(ycdjoPath);
        console.log(ycdjoBin);
        console.log(xhqdjoPath);
        console.log(xhqdjoBin);

        console.log(ycdjtPath);
        console.log(ycdjtBin);
        console.log(xhqdjtPath);
        console.log(xhqdjtBin);


        console.log(imageone);
        console.log(imagetwo);
        console.log(imagethree);
        console.log(imagefour);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        //OrthographicCamera
        //PerspectiveCamera
        this.camera =  new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 450);

    }

    /**
     * 加载模型
     * @returns {Promise<void>}
     */
    async initGltfLoader() {
        //乙醇断建模型
        const ycdjoModel: any = await this.gltfLoader(ycdjoPath as any);
        console.log(ycdjoModel.scene.children[0].children[0].geometry);
        console.log(ycdjoModel.scene.children[0].children[0]);
        ycdjoModel.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.ycdjoModel = child;
                // child.material.side = THREE.DoubleSide;
                (child as any).position.set(-80, 0  , 390 ) ;
                this.modelArry.push(child);
                this.scene.add(child);
                console.log(child.children[0].children[0]);
            }
        });



        const ycdjtModel: any = await this.gltfLoader(ycdjtPath as any);

        ycdjtModel.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.ycdjtModel = child;
                (child as any).position.set(-80, 0  , 390 ) ;
                this.modelArry.push(child);
                this.scene.add( child);
            }
        });

        //溴化氢断建模型
        const xhqdjoModel: any = await this.gltfLoader(xhqdjoPath as any);
        xhqdjoModel.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.xhqdjoModel = child;
                (child as any).position.set(80 , -13  , 390 ) ;
                this.modelArry.push(child);
                this.scene.add(child);
            }
        });

            const xhqdjtModel: any = await this.gltfLoader(xhqdjtPath as any);
            xhqdjtModel.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.xhqdjtModel = child;
                    (child as any).position.set(80 , -13  , 390 ) ;
                    this.modelArry.push(child);
                    this.scene.add(child);
                }
        });

    }

    animateTransform() {   //平移动画  x轴平移
        this.translationAnimate = TweenMax.to(this.tween, 1.3, {
            ycdjoModel: -30,
            xhqdjoModel: 30,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.step = 1;
                console.log('反应物平移动画===' + this.timeLine.paused());
                this.updateTransform();
            },
            paused: true
        });



    }

    updateTransform() {
        this.ycdjoModel.position.x = this.tween.ycdjoModel;
        this.ycdjtModel.position.x = this.tween.ycdjoModel;
        this.xhqdjoModel.position.x = this.tween.xhqdjoModel;
        this.xhqdjtModel.position.x = this.tween.xhqdjoModel;
    }

    animateRotateY() {  //旋转动画  y轴旋转
        this.rotateYAnimate = TweenMax.to(this.between, 1.3 , {
            angle:   Math.PI / 4,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.step = 2;
                console.log('反应物旋转动画' + this.timeLine.paused());
                this.updateRotateY();
            },
            paused: true
        });


    }

    updateRotateY() {
        this.ycdjoModel.rotation.y = this.between.angle;
        this.ycdjtModel.rotation.y = this.between.angle;
        this.xhqdjoModel.rotation.y = this.between.angle;
        this.xhqdjtModel.rotation.y = this.between.angle;
    }

    resetAnimateRotateY() { //旋转动画，重置y轴旋转
        this.resetRotateYAnimate = TweenMax.to(this.angleRotate, 1.3, {
            angle: 0,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.step = 5;
                console.log('生成物动画' + this.timeLine.paused());
                this.resetRotateY();
            },
            onComplete: () => {
                this.zhuantai = true;
            },
            paused: true
        });
    }

    resetRotateY() {
        this.ycdjoModel.rotation.y = this.angleRotate.angle;
        this.xhqdjoModel.rotation.y = this.angleRotate.angle;

        this.ycdjtModel.rotation.y = this.angleRotate.angle;
        this.xhqdjtModel.rotation.y = this.angleRotate.angle;
    }


    // animateRotateZ() {
    //     this.rotateZAnimate = TweenMax.to(this.angleRotateZ, 1.3, {
    //         angle:  0,
    //         angleZ: -Math.PI * 11 / 18,
    //         onUpdate: () => {
    //             this.updateRotateZ();
    //         },
    //         paused: true
    //     });
    // }
    //
    // updateRotateZ() {
    //     // this.ycdjoModel.rotation.z = this.angleRotate.angle;
    //     // this.xhqdjoModel.rotation.z = this.angleRotate.angle;
    //
    //     this.ycdjtModel.rotation.z = this.angleRotateZ.angle;
    //     this.xhqdjtModel.rotation.z = this.angleRotateZ.angleZ;
    // }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            //背景透明
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 0.0);
        this.renderer.setSize(this.width, this.height);
        const element = this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        const orbit = new OrbitControls( this.camera, this.renderer.domElement );
        orbit.enableZoom = false;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        //   orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        orbit.enableZoom = true;
        //是否自动旋转
        orbit.autoRotate = false;
        //设置相机距离原点的最远距离
        orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 4000;

        /*
                orbit.minAzimuthAngle = -Math.PI/2;
                orbit.maxAzimuthAngle = Math.PI/2;
        */

        //orbit.maxPolarAngle = Math.PI/100; // radians
        //是否开启右键拖拽
        orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );
        this.lights[0].castShadow = true;
        this.lights[0].shadow.mapSize.width = 1024;
        this.lights[0].shadow.mapSize.height = 1024;

        const d = 300;

        (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;
        (this.lights[0] as any).shadow.camera.far = 1000;

        this.scene.add( this.lights[0] );

    }

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
        this.pauseDj();
        this.pauseCj();
    }

    resize(width: number , height: number ) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }
    pauseDj () {
        if ( this.djEnable === true && this.timeLine.progress() >= 0.6) {
            this.timeLine.pause();
            this.djEnable = false;
        }
    }

    pauseCj () {
        if ( this.cjEnable === true && this.timeLine.progress() >= 0.9) {
            this.timeLine.pause();
            this.cjEnable = false;
        }
    }
}

