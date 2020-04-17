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

import * as jbBin1 from '../sub_static/model/jingbao1.bin';
import * as jbGltf1 from '../sub_static/model/jingbao1.gltf';

import * as jbBin2 from '../sub_static/model/jingbao2.bin';
import * as jbGltf2 from '../sub_static/model/jingbao2.gltf';

import * as jbBin3 from '../sub_static/model/jingbao3.bin';
import * as jbGltf3 from '../sub_static/model/jingbao3.gltf';

import * as jbBin4 from '../sub_static/model/jingbao4.bin';
import * as jbGltf4 from '../sub_static/model/jingbao4.gltf';

import * as jbBin5 from '../sub_static/model/xiaoqiu2.bin';
import * as jbGltf5 from '../sub_static/model/xiaoqiu2.gltf';

import * as jbBin7 from '../sub_static/model/xiaoqiu1.bin';
import * as jbGltf7 from '../sub_static/model/xiaoqiu1.gltf';

import * as jbBin6 from '../sub_static/model/jingbao6.bin';
import * as jbGltf6 from '../sub_static/model/jingbao6.gltf';

import * as jbImage1 from '../sub_static/model/image01.png';
import * as jbImage2 from '../sub_static/model/image02.png';
import * as jbImage3 from '../sub_static/model/image03.png';
import * as jbImage4 from '../sub_static/model/image04.png';

import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';

export class JingBao3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();

    // 晶胞切割动画
    private cuttingAnimation: any;

    // 无隙并置动画
    private juxtapositionAnimation: any = [];

    private animation: any;
    private animation2: any;

    static preload() {
        const modelArray = [jbBin1, jbGltf1, jbBin2, jbGltf2, jbBin3, jbGltf3,
            jbBin4, jbGltf4, jbBin5, jbGltf5, jbBin6, jbGltf6, jbBin7, jbGltf7, jbImage1, jbImage2, jbImage3, jbImage4];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );

        if (this.animation) {
            this.animation.renderModel();
        }

        if (this.animation2) {
            this.animation2.renderModel();
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
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 200);
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

        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.6));

        this.scene.add(this.lights[0]);
        //
        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.2);
        dirLight.position.set( 100, 0, 100 );
        this.scene.add( dirLight );
        //
        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    // 加载模型
    async initGltfLoader()  {

        // 切割后模型
        const model2: any = await this.gltfLoader(jbGltf1 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
                // child.visible = false;
            }
        });


        // 初始模型
        const model1: any = await this.gltfLoader(jbGltf2 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
        this.animation = new ModelAnimationGroup(model1);
        this.animation.setLoopOne(0);
        this.animation.setAnimationDoubleSpeed(0, 0.5);


        // 无隙并置模型
        const model3: any = await this.gltfLoader(jbGltf3 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });
        this.animation2 = new ModelAnimationGroup(model3);
        this.animation2.setLoopOne(0);
        this.animation2.setAnimationDoubleSpeed(0, 0.3);

        const model5: any = await this.gltfLoader(jbGltf5 as any);
        model5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        const model7: any = await this.gltfLoader(jbGltf7 as any);
        model7.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        const model4: any = await this.gltfLoader(jbGltf4 as any);
        model4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        // 初始静止模型
        const model6: any = await this.gltfLoader(jbGltf6 as any);
        model6.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);

        this.initMaterial();
        this.init3DModel();
    }

    initMaterial() {
        const materialSphFill1 = new THREE.MeshPhongMaterial({color : '#367693', specular: '#0f3b4e', shininess: 30});
        const materialSphFill2 = new THREE.MeshPhongMaterial({color : '#43add3', specular: '#147090', shininess: 30});
        const materialSphFill3 = new THREE.MeshPhongMaterial({color : '#faf2de', specular: '#ceb87d', shininess: 30});

        // // 重新设置模型的材质
        (this.obj1.children[1].children[0] as any).material = materialSphFill2;
        (this.obj1.children[1].children[1] as any).material = materialSphFill1;
        (this.obj1.children[1].children[2] as any).material = materialSphFill1;
        (this.obj1.children[1].children[3] as any).material = materialSphFill1;
        (this.obj1.children[1].children[4] as any).material = materialSphFill1;
        (this.obj1.children[1].children[5] as any).material = materialSphFill1;
        (this.obj1.children[1].children[6] as any).material = materialSphFill1;
        (this.obj1.children[1].children[7] as any).material = materialSphFill1;
        (this.obj1.children[1].children[8] as any).material = materialSphFill1;
        (this.obj1.children[1].children[9] as any).material = materialSphFill2;
        (this.obj1.children[1].children[10] as any).material = materialSphFill2;
        (this.obj1.children[1].children[11] as any).material = materialSphFill2;
        (this.obj1.children[1].children[12] as any).material = materialSphFill2;
        (this.obj1.children[1].children[13] as any).material = materialSphFill2;

        for (let i = 0; i < this.obj1.children[1].children.length; i++) {
            (this.obj1.children[1].children[i] as any).material.transparent = true;
        }


        (this.obj1.children[0].children[0].children[0] as any).material = materialSphFill1.clone();
        (this.obj1.children[0].children[0].children[1] as any).material = materialSphFill2.clone();
        (this.obj1.children[0].children[0].children[2] as any).material = materialSphFill3.clone();

        for (let i = 0; i < 7; i++) {
            (this.obj2.children[0].children[i].children[0] as any).material = materialSphFill3.clone();
            (this.obj2.children[0].children[i].children[1] as any).material = materialSphFill2.clone();
            (this.obj2.children[0].children[i].children[2] as any).material = materialSphFill1.clone();
        }

        (this.obj2.children[0].children[2].children[0] as any).material = materialSphFill1.clone();
        (this.obj2.children[0].children[2].children[1] as any).material = materialSphFill3.clone();
        (this.obj2.children[0].children[2].children[2] as any).material = materialSphFill2.clone();

        (this.obj2.children[0].children[3].children[0] as any).material = materialSphFill1.clone();
        (this.obj2.children[0].children[3].children[1] as any).material = materialSphFill3.clone();
        (this.obj2.children[0].children[3].children[2] as any).material = materialSphFill2.clone();

        (this.obj2.children[0].children[1].children[0] as any).material = materialSphFill1.clone();
        (this.obj2.children[0].children[1].children[1] as any).material = materialSphFill3.clone();
        (this.obj2.children[0].children[1].children[2] as any).material = materialSphFill2.clone();

        (this.obj3.children[2].children[0].children[0] as any).material = materialSphFill1.clone();
        (this.obj3.children[2].children[0].children[1] as any).material = materialSphFill2.clone();
        (this.obj3.children[2].children[0].children[2] as any).material = materialSphFill3.clone();

        // 设置初始透明度为0
        for (let i = 0; i < 7; i++) {
            (this.obj2.children[0].children[i].children[0] as any).material.transparent = true;
            (this.obj2.children[0].children[i].children[1] as any).material.transparent = true;
            (this.obj2.children[0].children[i].children[2] as any).material.transparent = true;

            (this.obj2.children[0].children[i].children[0] as any).material.opacity = 0;
            (this.obj2.children[0].children[i].children[1] as any).material.opacity = 0;
            (this.obj2.children[0].children[i].children[2] as any).material.opacity = 0;
        }

        // 可设置透明
        (this.obj3.children[2].children[0].children[0] as any).material.transparent = true;
        (this.obj3.children[2].children[0].children[1] as any).material.transparent = true;
        (this.obj3.children[2].children[0].children[2] as any).material.transparent = true;
        (this.obj3.children[0].children[0] as any).material.transparent = true;
        (this.obj3.children[1].children[0] as any).material.transparent = true;

        (this.obj3.children[0].children[0] as any).material = materialSphFill1.clone();
        (this.obj3.children[1].children[0] as any).material = materialSphFill2.clone();

        (this.obj4.children[0].children[0].children[0] as any).material = materialSphFill1.clone();
        (this.obj4.children[0].children[0].children[1] as any).material = materialSphFill2.clone();
        (this.obj4.children[0].children[0].children[2] as any).material = materialSphFill3.clone();

    }

    init3DModel() {
        this.cuttingEvent();
        this.juxtapositionEvent();
    }

    // 晶胞切割动画
    cuttingEvent() {
        const tween = {
            opacity: 1
        };

        this.cuttingAnimation = TweenMax.to(tween, 2, {
            opacity: 0,
            onStart: () => {
                this.obj4.visible = false;
                this.obj1.visible = true;
            },
            onUpdate: () => {

                for (let i = 0; i < this.obj1.children[1].children.length; i++) {
                    (this.obj1.children[1].children[i] as any).material.opacity = tween.opacity;
                }

            },
            onComplete: () => {
                (this.obj1.children[1] as any).visible = false;
                (window as any).viewHandler.viewModel.$data.buttonDisable = false;
            },
            paused: true
        });
    }

    // 开始动画
    startCuttingAnimation() {
        this.animation.playAnimation(0);
        this.cuttingAnimation.play();
    }

    // 重置动画
    resetCuttingAnimation() {
        this.obj4.visible = true;
        this.obj1.visible = false;

        // 重置模型动画
        this.animation.resetAnimation();
        this.animation2.resetAnimation();

        (this.obj1.children[1] as any).visible = true;

        this.cuttingAnimation.progress(0);
        this.cuttingAnimation.pause();

        this.juxtapositionAnimation[0].progress(0);
        this.juxtapositionAnimation[0].pause();

        this.obj2.visible = false;
        this.juxtapositionAnimation[1].progress(0);
        this.juxtapositionAnimation[1].pause();

        (this.obj1.children[0] as any).visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.juxtapositionAnimation[2].progress(0);
        this.juxtapositionAnimation[2].pause();

        this.resetCamera();
    }

    // 无隙并置动画
    juxtapositionEvent() {
        const tween = {
            x: 0,
            y: 0,
            z: 0,
            cameraX: 100,
            cameraY: 100,
            cameraZ: 200,
        };

        // 切割小模型向左上移动动画
        this.juxtapositionAnimation[0] = TweenMax.to(tween, 1, {
            x: -25,
            y: 25,
            z: 25,
            cameraX: 150,
            cameraY: 150,
            cameraZ: 300,
            onStart: () => {
                this.resetCamera();
            },
            onUpdate: () => {
                (this.obj1.children[0] as any).position.x = tween.x;
                (this.obj1.children[0] as any).position.y = tween.y;
                (this.obj1.children[0] as any).position.z = tween.z;

                this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
                this.camera.position.set(tween.cameraX, tween.cameraY, tween.cameraZ);
            },
            onComplete: () => {
                this.obj2.visible = true;

                this.animation2.playAnimation(0);
                this.juxtapositionAnimation[1].play();
            },
            paused: true
        });

        const tween2 = {
            opacity: 0
        };
        // 7个小模型显示动画
        this.juxtapositionAnimation[1] = TweenMax.to(tween2, 3, {
            opacity: 1,
            onUpdate: () => {
                // 设置透明度为
                for (let i = 0; i < 7; i++) {
                    (this.obj2.children[0].children[i].children[0] as any).material.opacity = tween2.opacity;
                    (this.obj2.children[0].children[i].children[1] as any).material.opacity = tween2.opacity;
                    (this.obj2.children[0].children[i].children[2] as any).material.opacity = tween2.opacity;
                }

            },
            onComplete: () => {
                (this.obj1.children[0] as any).visible = false;
                this.obj2.visible = false;
                this.obj3.visible = true;

                this.juxtapositionAnimation[2].play();
            },
            paused: true
        });


        const tween3 = {
            opacity1: 1,
            opacity2: 1,
        };
        // 8个模型变透明中心小球变红
        this.juxtapositionAnimation[2] = TweenMax.to(tween3, 3, {
            opacity1: 1,
            opacity2: 0.6,

            onUpdate: () => {
                (this.obj3.children[2].children[0].children[0] as any).material.opacity = tween3.opacity1;
                (this.obj3.children[2].children[0].children[1] as any).material.opacity = tween3.opacity1;
                (this.obj3.children[2].children[0].children[2] as any).material.opacity = tween3.opacity1;

                (this.obj3.children[0].children[0] as any).material.opacity = tween3.opacity2;
                (this.obj3.children[1].children[0] as any).material.opacity = tween3.opacity2;
            },
            onComplete: () => {

            },
            paused: true
        });

    }

    // 开始动画
    startJuxtapositionAnimation() {
        this.juxtapositionAnimation[0].play();
    }

    // 重置动画
    resetJuxtapositionAnimation() {
        this.juxtapositionAnimation[0].progress(0);
        this.juxtapositionAnimation[0].pause();

        // 重置模型动画
        this.animation2.resetAnimation();

        this.obj2.visible = false;
        this.juxtapositionAnimation[1].progress(0);
        this.juxtapositionAnimation[1].pause();

        (this.obj1.children[0] as any).visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.juxtapositionAnimation[2].progress(0);
        this.juxtapositionAnimation[2].pause();

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
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
