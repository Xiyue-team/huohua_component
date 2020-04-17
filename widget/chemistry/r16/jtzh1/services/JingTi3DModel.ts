/**
 *gltf模型加载类
 *@since 2.0
 *@author shujie
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D} from 'three-text2d';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as jtBin1 from '../sub_static/model1/na_cl.bin';
import * as jtGltf1 from '../sub_static/model1/na_cl.gltf';

import * as jtBin2 from '../sub_static/model1/na_cl_zhakai.bin';
import * as jtGltf2 from '../sub_static/model1/na_cl_zhakai.gltf';

import * as jtBin3 from '../sub_static/model1/na_cl_no_animation.bin';
import * as jtGltf3 from '../sub_static/model1/na_cl_no_animation.gltf';

import * as jtBin4 from '../sub_static/model2/jgs.bin';
import * as jtGltf4 from '../sub_static/model2/jgs.gltf';

import * as jtBin5 from '../sub_static/model3/po_zhakai.bin';
import * as jtGltf5 from '../sub_static/model3/po_zhakai.gltf';

import * as jtBin6 from '../sub_static/model4/co2_jt_yuan.bin';
import * as jtGltf6 from '../sub_static/model4/co2_jt_yuan.gltf';

import * as jtBin7 from '../sub_static/model4/co2_jt.bin';
import * as jtGltf7 from '../sub_static/model4/co2_jt.gltf';

import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';

export class JingTi3DModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private orbit: any;
    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();
    // 晶胞切割动画
    private cuttingAnimation: any;
    // 配位数动画
    private coordinationAnimation: any = [];

    private animation1: any;
    private animation2: any;

    static preload() {
        const modelArray = [jtBin1, jtGltf1, jtBin2, jtGltf2, jtBin3, jtGltf3,
            jtBin4, jtGltf4, jtBin5, jtGltf5, jtBin6, jtGltf6, jtBin7, jtGltf7];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame(this.render);
        if (this.animation1) {
            this.animation1.renderModel();
        }
        if (this.animation2) {
            this.animation2.renderModel();
        }
        this.renderer.render(this.scene, this.camera);
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
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
        this.cuttingEvent();
        this.coordinationEvent();
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
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 250);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1);

        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最近距离
        this.orbit.minDistance = 250;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 500;

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
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1);
        this.scene.add(ambientLight);
        //
        const dirLight = new THREE.DirectionalLight('#ffffff', 0.2);
        dirLight.position.set(100, 100, 100);
        this.scene.add(dirLight);
        //
        const dirLight2 = new THREE.DirectionalLight('#ffffff', 0.2);
        dirLight2.position.set(-100, 0, -100);
        this.scene.add(dirLight2);
    }

    // 加载模型
    async initGltfLoader() {
        // A选项初始模型
        const model1: any = await this.gltfLoader(jtGltf1 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        //A选项炸开模型
        const model2: any = await this.gltfLoader(jtGltf2 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
        // A选项切割后模型
        const model3: any = await this.gltfLoader(jtGltf3 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
        // B选项模型
        const model4: any = await this.gltfLoader(jtGltf4 as any);
        model4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });
        // C选项模型
        const model5: any = await this.gltfLoader(jtGltf5 as any);
        model5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });
        // D选项模型1
        const model6: any = await this.gltfLoader(jtGltf6 as any);
        model6.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });
        // D选项模型2
        const model7: any = await this.gltfLoader(jtGltf7 as any);
        model7.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });
        this.obj4.rotation.y = Math.PI / 2;
        (this.obj4.children[1].children[0].children[1] as any).material.side = THREE.DoubleSide;
        // 修改A选项第三个模型颜色
        // console.log(this.obj1.children[1], 2222);
        // console.log(this.obj1.children[2], 33333);
        for (let i = 0; i < 54; i++) {
            (this.obj1.children[2].children[0].children[0].children[i] as any).material.color.set(0x59584f);
        }
        for (let i = 0; i < 14; i++) {
            // 255128 (this.obj1.children[2].children[0].children[1].children[i] as any).material.color.set(0x4fb04f);
            (this.obj1.children[2].children[0].children[1].children[i] as any).material.color.set(0x164e16);
        }
        for (let i = 0; i < 13; i++) {
            (this.obj1.children[2].children[0].children[2].children[i] as any).material.color.set(0x514b15);
        }
        // 修改A选项第二个模型颜色
        for (let i = 0; i < 14; i++) {
            (this.obj1.children[1].children[0].children[i] as any).material =
                new THREE.MeshBasicMaterial({color: 0x25be2f});
        }
        for (let i = 0; i < 12; i++) {
            (this.obj1.children[1].children[1].children[i] as any).material =
                new THREE.MeshBasicMaterial({color: 0xc8c116});
        }
        (this.obj2.children[0].children[0].children[0] as any).material =
            new THREE.MeshBasicMaterial({color: 0xFFFF00});
        this.hideScene();
        this.animation1 = new ModelAnimationGroup(model2);
        this.animation1.setLoopOne(0);
        this.animation1.setAnimationDoubleSpeed(0, 0.5);
        this.animation2 = new ModelAnimationGroup(model5);
        this.animation2.setLoopOne(0);
        this.animation2.setAnimationDoubleSpeed(0, 0.5);

        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);

        this.init3DModel();
    }

    init3DModel() {
        this.cuttingEvent();
        // this.coordinationEvent();
    }

    // 晶胞切割透明度变化动画
    cuttingEvent() {
        const tween = {
            opacity: 1
        };
        this.cuttingAnimation = TweenMax.to(tween, 2, {
            opacity: 0,
            onStart: () => {
                this.obj1.children[2].visible = true;
            },
            onUpdate: () => {

                for (let i = 0; i < 14; i++) {
                    (this.obj1.children[1].children[0].children[i] as any).material.transparent = true;
                    (this.obj1.children[1].children[0].children[i] as any).material.opacity = tween.opacity;
                }
                for (let i = 0; i < 12; i++) {
                    (this.obj1.children[1].children[1].children[i] as any).material.transparent = true;
                    (this.obj1.children[1].children[1].children[i] as any).material.opacity = tween.opacity;
                }
            },
            onComplete: () => {
                this.obj1.children[1].children[0].visible = false;
                this.obj1.children[1].children[1].visible = false;
            },
            paused: true
        });
    }

    coordinationEvent() {
        const tween = {
            opacity: 1
        };

        this.coordinationAnimation = TweenMax.to(tween, 2, {
            opacity: 0,
            onStart: () => {
                this.obj3.children[0].visible = true;
            },
            onUpdate: () => {
                for (let i = 0; i < 20; i++) {
                    (this.obj3.children[0].children[0].children[i] as any).material.transparent = true;
                    (this.obj3.children[0].children[0].children[i] as any).material.opacity = tween.opacity;
                }
            },
            onComplete: () => {
                this.obj3.children[0].children[0].visible = false;
            },
            paused: true
        });
    }

    // 晶胞切割动画
    startCuttingAnimation() {
        this.animation1.playAnimation(0);
        this.cuttingAnimation.play();
    }

    // 配位数动画
    coordAnimation() {
        this.coordinationAnimation.play();
        this.animation2.playAnimation(0);
    }

    // 重置模型动画
    resetCuttingAnimation() {
        this.cuttingAnimation.progress(0);
        this.cuttingAnimation.pause();
        this.coordinationAnimation.progress(0);
        this.coordinationAnimation.pause();
        this.animation1.resetAnimation();
        this.animation2.resetAnimation();
        this.obj1.children[1].children[0].visible = true;
        this.obj1.children[1].children[1].visible = true;
        this.obj3.children[0].children[0].visible = true;
        this.resetCamera();
    }

    hideScene() {
        this.obj1.children[1].visible = false;
        this.obj1.children[2].visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
    }

    // 重置动画
    // resetcoordinationAnimation() {
    //     for (let i = 0; i < 11; i++) {
    //         this.orbit.reset();
    //     }
    // }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(100, 100, 200);
        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
