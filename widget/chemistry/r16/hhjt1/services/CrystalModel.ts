/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
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
import * as otherBin from '../sub_static/model/other.bin';
import * as otherGltf from '../sub_static/model/other.gltf';
import * as  cicleBin1 from '../sub_static/model/yuanhuan_no_animation.bin';
import * as  circleGltf1 from '../sub_static/model/yuanhuan_no_animation.gltf';
import * as  circleBin2 from '../sub_static/model/yuanhuan_animation.bin';
import * as  circleGltf2 from '../sub_static/model/yuanhuan_animation.gltf';
import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';

export class CrystalModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private orbit: any;
    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    // 晶胞切割动画
    private cuttingAnimation: any;
    //自顶向下的镜头动画
    private cameraAnimation: any;

    private animation: any;

    static preload() {
        const modelArray = [otherBin, otherGltf, cicleBin1, circleGltf1, circleBin2, circleGltf2, ];
    }

    private render = () => {
        requestAnimationFrame(this.render);
        if (this.animation) {
            this.animation.renderModel();
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
        // this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.initGltfLoader();
        this.render();
        this.cuttingEvent();
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
        this.camera.position.set(100, 100, 200);
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
        this.lights.push(new THREE.AmbientLight(0xeeeeee, 0.6));
        this.scene.add(this.lights[0]);
        const directionalLight4 = new THREE.HemisphereLight('#eeeeee', '#eeeeee', 0.3);
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add(directionalLight4);
        const dirLight = new THREE.DirectionalLight('#eeeeee', 0.2);
        dirLight.position.set(100, 0, 100);
        this.scene.add(dirLight);
        const dirLight2 = new THREE.DirectionalLight('#eeeeee', 0.05);
        dirLight2.position.set(-100, 0, -100);
        this.scene.add(dirLight2);
    }

    // 加载模型
    async initGltfLoader() {
        // 模型1
        const model1: any = await this.gltfLoader(otherGltf as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }

        });
        //模型2
        const model2: any = await this.gltfLoader(circleGltf1 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        // 模型3
        const model3: any = await this.gltfLoader(circleGltf2 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });

        this.animation = new ModelAnimationGroup(model3);
        this.animation.setLoopOne(0);
        this.animation.setAnimationDoubleSpeed(0, 0.5);
        this.obj1.scale.set(0.8, 0.8, 0.8);
        this.obj2.visible = false;
        this.obj2.position.set(-28.5, 44, 0);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
    }

    // 晶体切割动画
    cuttingEvent() {
        const tween = {
            opacity: 1,
            x: 100,
            y: 100,
            z: 200,
            scaleRat: 1
        };
        this.cuttingAnimation = TweenMax.to(tween, 2, {
            opacity: 0,
            onStart: () => {
                this.obj1.visible = false;
                this.obj2.visible = true;
            },
            onUpdate: () => {
                for (let i = 0; i < 3; i++) {
                    if (i === 2) {
                        (this.obj2.children[0].children[0].children[i].children[1] as any).material.transparent = true;

                        (this.obj2.children[0].children[0].children[i].children[2] as any).material.transparent = true;

                        (this.obj2.children[0].children[0].children[i].children[1] as any).material.opacity = tween.opacity;

                        (this.obj2.children[0].children[0].children[i].children[2] as any).material.opacity = tween.opacity;
                    } else {
                        (this.obj2.children[0].children[0].children[i].children[0] as any).material.transparent = true;

                        (this.obj2.children[0].children[0].children[i].children[2] as any).material.transparent = true;

                        (this.obj2.children[0].children[0].children[i].children[0] as any).material.opacity = tween.opacity;

                        (this.obj2.children[0].children[0].children[i].children[2] as any).material.opacity = tween.opacity;
                    }
                }
            },
            onComplete: () => {
                this.obj2.children[0].children[0].children[0].visible = false;
                this.obj2.children[0].children[0].children[1].visible = false;
                this.obj2.children[0].children[0].children[2].visible = false;
                this.obj2.children[0].children[0].children[3].visible = false;
                this.obj2.position.set(-28.5, 44, 0);
            },
            paused: true
        });

        this.cameraAnimation = TweenMax.to(tween, 2, {
            x: 1,
            y: 245,
            z: 1,
            scaleRat: 1.5,
            onStart: () => {
                this.camera.position.set(100, 100, 200);
            },
            onUpdate: () => {
                this.camera.position.set(tween.x, tween.y, tween.z);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                this.scene.scale.set(tween.scaleRat, tween.scaleRat, tween.scaleRat);
            },
            onComplete: () => {
                this.obj1.children[1].scale.set(0.8, 0.8, 0.8);
                this.obj1.children[1].position.set(0, 37, 0);
            },
            paused: true
        });
    }

    //解题步骤1
    step1(val: number) {
        if (val === 1) {
            this.camera.position.set(100, 100, 200);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.cameraAnimation.progress(0);
            this.cameraAnimation.pause();
            this.obj1.visible = true;
            this.obj2.visible = false;
            if (this.obj1.children.length >= 2) {
                this.obj1.children[1].scale.set(1, 1, 1);
                this.obj1.children[1].position.set(0, 0, 0);
                this.obj1.children[1].visible = true;
                this.obj1.children[0].visible = true;
                this.obj1.children[0].children[0].visible = true;
            }
        }
        if (val === 2) {
            // this.obj1.children[1].scale.set(0.8, 0.8, 0.8);
            // this.obj1.children[1].position.set(0, 37, 0);
            this.obj1.visible = true;
            this.obj2.visible = false;
            this.obj1.children[1].visible = true;
            this.obj1.children[0].visible = true;
            this.obj1.children[0].children[0].visible = false;
            this.camera.position.set(100, 100, 200);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.animation.resetAnimation();
            setTimeout(() => {
                this.cameraAnimation.play();
            }, 200);
            this.cuttingAnimation.progress(0);
            this.cuttingAnimation.pause();
        }
        if (val === 3) {
            this.obj2.visible = true;
            this.cameraAnimation.progress(0);
            this.cameraAnimation.pause();
            this.camera.position.set(1, 245, 1);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            (this.obj2.children[0].children[0].children[2].children[2] as any).material =
                new THREE.MeshBasicMaterial({
                    color: (this.obj2.children[0].children[0].children[2].children[2] as any).material.color,
                    transparent: true
                });
            (this.obj2.children[0].children[0].children[4].children[1] as any).material =
                new THREE.MeshBasicMaterial({
                    color: (this.obj2.children[0].children[0].children[2].children[2] as any).material.color,
                    transparent: true
                });

            (this.obj2.children[0].children[0].children[2].children[1] as any).material =
                (this.obj2.children[0].children[0].children[0].children[1] as any).material;
            this.animation.resetAnimation();
            (this.obj2.children[0].children[0].children[0] as any).visible = true;
            (this.obj2.children[0].children[0].children[1] as any).visible = true;
            (this.obj2.children[0].children[0].children[2] as any).visible = true;
            (this.obj2.children[0].children[0].children[3] as any).visible = true;
            this.obj1.children[1].scale.set(1, 1, 1);
            this.obj1.children[1].position.set(0, 0, 0);
            this.obj1.children[0].visible = false;
            this.obj1.children[1].visible = false;
            this.animation.playAnimation(0);
            this.cuttingAnimation.play();
        }

    }
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
