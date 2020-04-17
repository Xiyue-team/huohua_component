/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as model1 from '../sub_static/1.fbx';
import * as model2 from '../sub_static/2.fbx';
import * as model3 from '../sub_static/3.fbx';
import * as model4 from '../sub_static/4.fbx';
import * as model5 from '../sub_static/5.fbx';
import * as model6 from '../sub_static/6.fbx';
import * as model7 from '../sub_static/7.fbx';
import * as DH from '../sub_static/ddt.png';
import * as XH from '../sub_static/xt.png';
import * as YH from '../sub_static/yt.png';
import * as S from '../sub_static/S1.png';
import {ModelRotateHelper} from '../../../../../src/three/component/ModelRotateHelper';
import {TweenMax} from 'gsap';



export class Xsxrylhsx13DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private group3 = new THREE.Group();
    private group4 = new THREE.Group();
    private group5 = new THREE.Group();
    private group6 = new THREE.Group();
    private group7 = new THREE.Group();
    modelRotate1: any;
    modelRotate2: any;
    modelRotate3: any;
    modelRotate4: any;
    modelRotate5: any;
    modelRotate6: any;
    private animation: any;
    private ambientLight: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    model1: any;
    model2: any;

    static preload() {
        const modelArray = [S, model1, model2, model3, model4, model5, model6, model7, DH, XH, YH ];
        console.log(modelArray);
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
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.loadModel();
        this.loadImageAnimation();
        this.render();
    }


    /**
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
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
        this.orbit.enableRotate = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        this.ambientLight = new THREE.AmbientLight( 0xffffff, 1.2);
        this.scene.add(this.ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    //加载模型
    async loadModel() {
        const m1: any = await this.fbxLoader(model1 as any);
        const geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
        const cube = new THREE.Mesh( geometry, material );
        this.group1.add(cube);
        this.group1.add(m1);
        this.group1.position.set(-55, 0, 0);
        this.modelRotate1 = new ModelRotateHelper(this.group1);
        this.modelRotate1.initEvent();
        this.obj1.add(this.group1);

        const m2: any = await this.fbxLoader(model2 as any);
        const geometry2 = new THREE.BoxBufferGeometry( 50, 50, 50 );
        const material2 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        const cube2 = new THREE.Mesh( geometry2, material2 );
        this.group2.add(cube2);
        this.group2.add(m2);
        this.group2.position.set(0, 0, 0);
        this.modelRotate2 = new ModelRotateHelper(this.group2);
        this.modelRotate2.initEvent();
        this.obj1.add(this.group2);

        const m3: any = await this.fbxLoader(model3 as any);
        const geometry3 = new THREE.BoxBufferGeometry( 50, 50, 50 );
        const material3 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        const cube3 = new THREE.Mesh( geometry3, material3 );
        this.group3.add(cube3);
        this.group3.add(m3);
        this.group3.position.set(55, 0, 0);
        this.modelRotate3 = new ModelRotateHelper(this.group3);
        this.modelRotate3.initEvent();
        this.obj1.add(this.group3);

        this.scene.add(this.obj1);

        const m4: any = await this.fbxLoader(model4 as any);
        const geometry4 = new THREE.BoxBufferGeometry( 100, 100, 100 );
        const material4 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        const cube4 = new THREE.Mesh( geometry4, material4 );
        this.group4.add(cube4);
        this.group4.add(m4);
        m4.scale.set(1.5, 1.5, 1.5);
        this.group4.position.set(-50, 0, 0);
        this.modelRotate4 = new ModelRotateHelper(this.group4);
        this.modelRotate4.initEvent();
        this.obj2.add(this.group4);

        const m5: any = await this.fbxLoader(model5 as any);
        const geometry5 = new THREE.BoxBufferGeometry( 100, 100, 100 );
        const material5 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        const cube5 = new THREE.Mesh( geometry5, material5 );
        this.group5.add(cube5);
        this.group5.add(m5);
        m5.scale.set(1.5, 1.5, 1.5);
        this.group5.position.set(50, 0, 0);
        this.modelRotate5 = new ModelRotateHelper(this.group5);
        this.modelRotate5.initEvent();
        this.obj2.add(this.group5);

        this.scene.add(this.obj2);
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.model1 = await this.fbxLoader(model6 as any);
        this.model2 = await this.fbxLoader(model7 as any);
        const geometry6 = new THREE.BoxBufferGeometry( 100, 100, 100 );
        const material6 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        const cube6 = new THREE.Mesh( geometry6, material6 );
        this.group6.add(cube6);
        this.group6.add(this.model1);
        this.group6.add(this.model2);
        this.model2.visible = false;
        this.modelRotate6 = new ModelRotateHelper(this.group6);
        this.modelRotate6.initEvent();
        this.obj3.add(this.group6);
        this.scene.add(this.obj3);

    }

    //加载图片的方法
    loadImageAnimation() {
        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load(DH as any);
        const geometry = new THREE.PlaneBufferGeometry(71.7, 79.2);
        const material = new THREE.MeshPhongMaterial({map: floorTexture, transparent: true, opacity: 1});
        const ddt = new THREE.Mesh(geometry, material);

        const floorTexture1 = loader.load(XH as any);
        const geometry1 = new THREE.PlaneBufferGeometry(9.8, 13);
        const material1 = new THREE.MeshPhongMaterial({map: floorTexture1, transparent: true, opacity: 1});
        const xt = new THREE.Mesh(geometry1, material1);

        const floorTexture2 = loader.load(YH as any);
        const geometry2 = new THREE.PlaneBufferGeometry(13, 9.5);
        const material2 = new THREE.MeshPhongMaterial({map: floorTexture2, transparent: true, opacity: 1});
        const yt = new THREE.Mesh(geometry2, material2);

        this.obj4.add(xt);
        xt.position.set(-7.1, -46, 0);
        this.obj4.add(yt);
        yt.position.set(42.4, 3.25, 0);
        this.obj4.add(ddt);
        this.obj4.visible = false;
        this.scene.add(this.obj4);

        const tween = {
            angle: 0,
            distance1: -46,
            distance2: 42.4,
        };

        this.animation = TweenMax.to(tween, 3, {
            angle: Math.PI * 2,
            distance1: -50,
            distance2: 46.4,
            onUpdate: () => {
                xt.rotation.z = tween.angle;
                xt.position.y = tween.distance1;
                yt.rotation.z = tween.angle;
                yt.position.x = tween.distance2;
            },
            paused: true
        });

    }

    //动画启动的方法
    animationPlay() {
        this.animation.play();
    }
    //动画暂停的方法
    animationReset() {
        this.animation.progress(0);
        this.animation.pause();
    }

    //给组件调用的切换方法
    hideobj1() {
        this.hideOrShowModel(this.obj1, true);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, false);
    }

    hideobj2() {
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, true);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, false);
    }

    hideobj3() {
        this.ambientLight.intensity = 1.1;
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, true);
        this.hideOrShowModel(this.obj4, false);
    }

    hideobj4() {
        this.ambientLight.intensity = 0.8;
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, true);
    }


    //隐藏或显示模型的方法
    hideOrShowModel(obj: THREE.Object3D, isShow: boolean) {
        obj.visible = isShow;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 50, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
