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

import * as image01 from '../sub_static/model/0.png';
import * as image02 from '../sub_static/model/90.png';
import * as image03 from '../sub_static/model/180.png';
import * as image04 from '../sub_static/model/270.png';

import * as erbaiqi from '../sub_static/model/erbaiqi.fbx';
import * as jiushi from '../sub_static/model/jiushi.fbx';
import * as ling from '../sub_static/model/ling.fbx';
import * as lingA from '../sub_static/model/lingA.fbx';
import * as lingAS from '../sub_static/model/lingAS.fbx';
import * as yibaiba from '../sub_static/model/yibaiba.fbx';


export class MianXin3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();
    obj5 = new THREE.Object3D();
    obj6 = new THREE.Object3D();



    static preload() {
        const modelArray = [image01, image02, image03, image04, erbaiqi, jiushi, ling, lingA, lingAS, yibaiba];
        console.log(modelArray.length);
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

        this.initFbx();

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

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.6);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    async initFbx() {
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);
        this.scene.add(this.obj5);
        this.scene.add(this.obj6);

        // 零度
        const model1: any = await this.fbxLoader(ling as any);
        this.obj1.add(model1);
        // 零度带编号
        const model2: any = await this.fbxLoader(lingAS as any);
        this.obj2.add(model2);
        // 零度带编号和对角线
        const model3: any = await this.fbxLoader(lingA as any);
        this.obj3.add(model3);

        // 九十度
        const model4: any = await this.fbxLoader(jiushi as any);
        this.obj4.add(model4);

        // 180度
        const model5: any = await this.fbxLoader(yibaiba as any);
        this.obj5.add(model5);

        // 270度
        const model6: any = await this.fbxLoader(erbaiqi as any);
        this.obj6.add(model6);

        // this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
    }


    hideObj() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
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
