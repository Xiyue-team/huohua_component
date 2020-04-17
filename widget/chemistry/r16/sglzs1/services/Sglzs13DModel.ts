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

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import * as bg from '../sub_static/bg.png';
import * as xk from '../sub_static/xk.png';
import * as tc from '../sub_static/tc.png';
import * as xk3 from '../sub_static/xk3.png';
import * as tc3 from '../sub_static/tc3.png';
import * as xk5 from '../sub_static/xk5.png';
import * as tc5 from '../sub_static/tc5.png';

export class Sglzs13DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    tcobj1 = new THREE.Object3D();
    tcobj2 = new THREE.Object3D();
    tcobj3 = new THREE.Object3D();
    tcobj4 = new THREE.Object3D();
    tcobj5 = new THREE.Object3D();
    tcobj6 = new THREE.Object3D();

    xkobj1 = new THREE.Object3D();
    xkobj2 = new THREE.Object3D();
    xkobj3 = new THREE.Object3D();
    xkobj4 = new THREE.Object3D();
    xkobj5 = new THREE.Object3D();
    xkobj6 = new THREE.Object3D();


    static preload() {
        const modelArray = [bg, xk, tc, xk3, tc3, xk5, tc5];
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
        this.loadImage();
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

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.0);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    loadImage() {
        const backGroundImg = ThreeUtil.createImg(100.8, 91.5, bg, 0, 0);
        this.scene.add(backGroundImg);
        const xkimg1 = ThreeUtil.createImg(8.4, 8.4, xk, -38.67, 10.61);
        const xkimg2 = ThreeUtil.createImg(24.6, 8.4, xk3, -16.25, 10.61);
        const xkimg3 = ThreeUtil.createImg(40.8, 8.4, xk5, 22.5, 10.61);
        const tcimg1 = ThreeUtil.createImg(8.4, 8.4, tc, -38.67, 10.61);
        const tcimg2 = ThreeUtil.createImg(24.6, 8.4, tc3, -16.25, 10.61);
        const tcimg3 = ThreeUtil.createImg(40.8, 8.4, tc5, 22.5, 10.61);

        const xkimg4 = ThreeUtil.createImg(8.4, 8.4, xk, -38.67, -13.95);
        const xkimg5 = ThreeUtil.createImg(24.6, 8.4, xk3, -16.25, -13.95);
        const tcimg4 = ThreeUtil.createImg(8.4, 8.4, tc, -38.67, -13.95);
        const tcimg5 = ThreeUtil.createImg(24.6, 8.4, tc3, -16.25, -13.95);

        const xkimg6 = ThreeUtil.createImg(8.4, 8.4, xk, -38.67, -34.95);
        const tcimg6 = ThreeUtil.createImg(8.4, 8.4, tc, -38.67, -34.95);

        this.xkobj1.add(xkimg1);
        this.xkobj2.add(xkimg2);
        this.xkobj3.add(xkimg3);

        this.xkobj4.add(xkimg4);
        this.xkobj5.add(xkimg5);

        this.xkobj6.add(xkimg6);

        this.tcobj1.add(tcimg1);
        this.tcobj2.add(tcimg2);
        this.tcobj3.add(tcimg3);

        this.tcobj4.add(tcimg4);
        this.tcobj5.add(tcimg5);

        this.tcobj6.add(tcimg6);

        this.scene.add(this.xkobj1);
        this.scene.add(this.xkobj2);
        this.scene.add(this.xkobj3);
        this.scene.add(this.xkobj4);
        this.scene.add(this.xkobj5);
        this.scene.add(this.xkobj6);

        this.scene.add(this.tcobj1);
        this.scene.add(this.tcobj2);
        this.scene.add(this.tcobj3);
        this.scene.add(this.tcobj4);
        this.scene.add(this.tcobj5);
        this.scene.add(this.tcobj6);

        this.xkobj1.visible = false;
        this.xkobj2.visible = false;
        this.xkobj3.visible = false;
        this.xkobj4.visible = false;
        this.xkobj5.visible = false;
        this.xkobj6.visible = false;

        this.tcobj1.visible = false;
        this.tcobj2.visible = false;
        this.tcobj3.visible = false;
        this.tcobj4.visible = false;
        this.tcobj5.visible = false;
        this.tcobj6.visible = false;
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
