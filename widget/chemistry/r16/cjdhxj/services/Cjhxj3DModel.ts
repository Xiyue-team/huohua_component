
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';

import * as hxj1Fbx from '../sub_static/hxj/C1.fbx';
import * as hxj2Fbx from '../sub_static/hxj/C2.fbx';
import * as hxj3Fbx from '../sub_static/hxj/C3.fbx';
import * as hxj4Fbx from '../sub_static/hxj/C4.fbx';
import * as hxj5Fbx from '../sub_static/hxj/C5.fbx';
import * as hxj6Fbx from '../sub_static/hxj/C6.fbx';
import * as hxj7Fbx from '../sub_static/hxj/C7.fbx';
import * as hxjPng from '../sub_static/hxj/P1.png';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);

export class Cjhxj3DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();
    obj5 = new THREE.Object3D();
    obj6 = new THREE.Object3D();
    obj7 = new THREE.Object3D();


    static preload() {

        const modelArry = [hxj1Fbx , hxj2Fbx, hxj3Fbx, hxj4Fbx, hxj5Fbx, hxj6Fbx, hxj7Fbx, hxjPng];
        console.log(modelArry.length);

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
        this.initFbxLoader();
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

        const left = this.width / -20;
        const right = this.width / 20;
        const top = this.height / 20;
        const bottom = this.height / -20;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(50, 30, 200);

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
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
        this.scene.add(ambientLight);


        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.5);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );

    }

    // 加载模型
    async initFbxLoader() {


        const hxj1: any = await this.fbxLoader(hxj1Fbx as any);
        hxj1.scale.set(0.6, 0.6 , 0.6);
        this.obj1.add(hxj1);
        this.scene.add(this.obj1);


        const hxj2: any = await this.fbxLoader(hxj2Fbx as any);
        hxj2.scale.set(0.6, 0.6 , 0.6);
        this.obj2.add(hxj2);
        this.scene.add(this.obj2);


        const hxj3: any = await this.fbxLoader(hxj3Fbx as any);
        hxj3.scale.set(0.6, 0.6 , 0.6);
        this.obj3.add(hxj3);
        this.scene.add(this.obj3);



        const hxj4: any = await this.fbxLoader(hxj4Fbx as any);
        hxj4.scale.set(0.6, 0.6 , 0.6);
        this.obj4.add(hxj4);
        this.scene.add(this.obj4);


        const hxj5: any = await this.fbxLoader(hxj5Fbx as any);
        hxj5.scale.set(0.6, 0.6 , 0.6);
        this.obj5.add(hxj5);
        this.scene.add(this.obj5);


        const hxj6: any = await this.fbxLoader(hxj6Fbx as any);
        hxj6.scale.set(0.6, 0.6 , 0.6);
        this.obj6.add(hxj6);
        this.scene.add(this.obj6);


        const hxj7: any = await this.fbxLoader(hxj7Fbx as any);
        hxj7.scale.set(0.6, 0.6 , 0.6);
        this.obj7.add(hxj7);


        this.scene.add(this.obj7);

        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;


        if (this.browserInfo.isSmallDevice) {
            hxj1.scale.set(0.3, 0.3 , 0.3);
            hxj2.scale.set(0.3, 0.3 , 0.3);
            hxj3.scale.set(0.3, 0.3 , 0.3);
            hxj4.scale.set(0.3, 0.3 , 0.3);
            hxj5.scale.set(0.3, 0.3 , 0.3);
            hxj6.scale.set(0.3, 0.3 , 0.3);
            hxj7.scale.set(0.3, 0.3 , 0.3);
        }

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



    hideModel() {

        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;
        this.resetCamera();

    }


    hideModel2() {

        this.obj1.visible = false;
        this.obj2.visible = true;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;
        this.resetCamera();
    }

    hideModel3() {

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = true;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;
        this.resetCamera();

    }

    hideModel4() {

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = true;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;
        this.resetCamera();

    }

    hideModel5() {

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = true;
        this.obj6.visible = false;
        this.obj7.visible = false;
        this.resetCamera();
    }

    hideModel6() {

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = true;
        this.obj7.visible = false;
        this.resetCamera();
    }

    hideModel7() {

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = true;
        this.resetCamera();
    }

}
