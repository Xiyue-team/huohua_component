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
import * as CH31 from '../sub_static/CH31.fbx';
import * as CH32 from '../sub_static/CH3.fbx';
import * as CH33 from '../sub_static/CH33.fbx';
import * as CH34 from '../sub_static/CH32.fbx';
import * as CS2 from '../sub_static/CS2.fbx';
import * as PO4 from '../sub_static/PO4.fbx';
import * as K1 from '../sub_static/K1.png';
import * as K2 from '../sub_static/K2.png';
import * as K3 from '../sub_static/K3.png';



export class Fzkjgxql3DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    private model1: any;
    private model2: any;
    private model3: any;
    private model4: any;

    static preload() {
        const modelArray = [CH31, CH32, CH33, CH34, CS2, PO4, K1, K2, K3];
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
        this.loadModel();
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
        this.camera.position.set(-61, 133, 135);
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
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    //加载模型
    async loadModel() {
        this.model2 = await this.fbxLoader(CH31 as any);
        this.model1 = await this.fbxLoader(CH32 as any);
        this.model3 = await this.fbxLoader(CH33 as any);
        this.model4 = await this.fbxLoader(CH34 as any);
        const jb5: any = await this.fbxLoader(CS2 as any);
        const jb6: any = await this.fbxLoader(PO4 as any);

        this.obj1.add(jb6);
        this.obj2.add(jb5);
        this.obj3.add(this.model1);
        this.obj3.add(this.model2);
        this.obj4.add(this.model3);
        this.obj4.add(this.model4);

        this.model1.scale.set(2, 2, 2);
        this.model2.scale.set(2, 2, 2);
        this.model3.scale.set(2, 2, 2);
        this.model4.scale.set(2, 2, 2);
        jb5.scale.set(2, 2, 2);
        jb6.scale.set(2, 2, 2);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);

        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.model3ArrowHide1();
        this.model4ArrowHide1();
    }


    //隐藏或显示模型的方法
    hideOrShowModel(obj: THREE.Object3D, isShow: boolean) {
        obj.visible = isShow;
    }

    //三个箭头的方法
    hide1Model() {
        this.hideOrShowModel(this.obj1, true);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, false);
    }


    hide2Model() {
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, true);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, false);
    }
    hide3Model() {
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, true);
        this.hideOrShowModel(this.obj4, false);
    }

    hide4Model() {
        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, false);
        this.hideOrShowModel(this.obj4, true);
    }

    //给箭头控件调用的方法
    model3ArrowHide1() {
        this.model1.visible = true;
        this.model2.visible = false;
    }

    model3ArrowHide2() {
        this.model1.visible = false;
        this.model2.visible = true;
    }

    model4ArrowHide1() {
        this.model3.visible = true;
        this.model4.visible = false;
    }

    model4ArrowHide2() {
        this.model3.visible = false;
        this.model4.visible = true;
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
