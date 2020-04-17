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

import {ModelLoad} from './ModelLoad';
import * as console from 'console';

export class Jtzh23DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    public orbit: any;
    public lights: any;
    public lights1: any;
    public lights2: any;
    public lights3: any;

    public lights4: any;
    public lights5: any;
    public lights6: any;
    public lights7: any;

    model = new ModelLoad();

    private render = () => {
        requestAnimationFrame( this.render );
        if (this.model.modelAnimation) {
            this.model.modelAnimation.renderModel();
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
        this.lights4 = new THREE.AmbientLight( 0xffffff, 0.6);
        this.camera.add(this.lights4);
        //
        this.lights1 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
        this.lights1.color.setHSL(.6, 1, .6);
        this.lights1.groundColor.setHSL(.095, 1, .75);
        this.lights1.position.set(0, 0, 0);
        this.camera.add( this.lights1 );

        this.lights2 = new THREE.DirectionalLight( '#ffffff', 0.5);
        this.lights2.position.set( 100, 10, 0 );
        this.camera.add( this.lights2 );
        //
        this.lights3 = new THREE.DirectionalLight( '#ffffff', 0.05);
        this.lights3.position.set( -100, 0, -100 );
        this.camera.add( this.lights3 );
    }
    
    initLight1(num: number): void {
        if (num === 0) {
            this.camera.remove(this.lights4);
            this.camera.remove(this.lights);
            this.lights4 = new THREE.AmbientLight( 0xffffff, 0.6);
            this.camera.add(this.lights4);
        } else {
            this.camera.remove(this.lights);
            this.camera.remove(this.lights4);
            this.lights = new THREE.AmbientLight( '#999999', 0.2);
            this.camera.add(this.lights);
    }
        }

    // 加载模型
    async initGltfLoader()  {
        this.model.initScene1().then(() => {
            this.model.obj1.visible = true;
            this.model.obj1.children[0].visible = true;
            this.model.obj1.children[1].visible = false;
            this.model.obj1.children[2].visible = false;

        });
        this.model.initScene2();
        this.model.initScene3();

        this.scene.add(this.model.obj1);
        this.scene.add(this.model.obj2);
        this.scene.add(this.model.obj3);


        this.model.obj2.visible = false;
        this.model.obj3.visible = false;

        this.initMaterial();
    }

    //重置材料
    initMaterial() {

    }

    //加载动画
    init3DModel() {

    }

    // 开始动画
    startCuttingAnimation() {

    }

    // 隐藏模型
    hideScene() {
        this.model.obj1.visible = false;
        this.model.obj2.visible = false;
        this.model.obj3.visible = false;
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
