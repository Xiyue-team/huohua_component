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


import * as liziModel1 from '../sub_static/model/lzi4.fbx';
import * as liziModel2 from '../sub_static/model/lizi4-2.fbx';
import * as liziModel3 from '../sub_static/model/lizi4-3.fbx';
// import * as mark from '../sub_static/mark.png';


import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';

export class CrystalModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private orbit: any;
    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();
    // 晶胞切割动画
    private cuttingAnimation: any;
    //自顶向下的镜头动画
    private cameraAnimation: any;

    private animation: any;

    static preload() {
        const modelArray = [liziModel1, liziModel2, liziModel3];
    }

    private render = () => {
        requestAnimationFrame(this.render);

        if (this.animation) {
            this.animation.renderModel();
        }
        this.renderer.render(this.scene, this.camera);
    };

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
        // this.cuttingEvent();
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
        this.camera = new THREE.OrthographicCamera(-this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(230, 57.4, -60.7);
        this.scene.add(this.camera);
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
        (this.renderer as WebGLRenderer).gammaInput = true;
        (this.renderer as WebGLRenderer).gammaOutput = true;
        (this.renderer as WebGLRenderer).shadowMap.enabled = true;
        (this.renderer as WebGLRenderer).toneMappingExposure = 0.7;
        (this.renderer as WebGLRenderer).shadowMap.type = THREE.PCFSoftShadowMap;

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
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
        this.camera.add(ambientLight);
        const dirLight = new THREE.DirectionalLight('#ffffff', 0.5);
        dirLight.position.set(150, 0, 259.8);
        this.camera.add(dirLight);


    }

    // 加载模型
    async initGltfLoader() {

        // 模型1
        const model1: any = await this.fbxLoader(liziModel2 as any);

        this.obj1.add(model1);
        if (window.innerWidth < 500 || window.innerHeight < 500) {
            this.obj1.scale.set(4, 4, 4);
        }
        else {
            this.obj1.scale.set(8, 8, 8);
        }


        //模型2
        const model2: any = await this.fbxLoader(liziModel1 as any);
        this.obj2.add(model2);
        if (window.innerWidth < 500 || window.innerHeight < 500) {
            this.obj2.scale.set(4, 4, 4);
        }
        else {
            this.obj2.scale.set(8, 8, 8);
        }

        // // 模型3
        const model3: any = await this.fbxLoader(liziModel3 as any);
        this.obj3.add(model3);
        if (window.innerWidth < 500 || window.innerHeight < 500) {
            this.obj3.scale.set(4, 4, 4);
        }
        else {
            this.obj3.scale.set(8, 8, 8);
        }


        //贴图
        const loader = new THREE.TextureLoader();
        const that = this;
        // loader.load(require(`../sub_static/mark.png`), function (texture) {
        //     const material = new THREE.MeshBasicMaterial({
        //         color: 0xffffff,
        //         map: texture
        //     });
        //     const cube = new THREE.PlaneGeometry(150, 150);
        //     const mesh = new THREE.Mesh(cube, material);
        //     that.obj4.add(mesh);
        // });


        this.obj2.visible = false;
        this.obj3.visible = false;

        // if (this.obj4.children) {
        //     this.obj4.position.set(200, 0, 0);
        // }
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);

       
    }


    //解题步骤1
    step1(val: number) {

        if (val === 1 && this.obj2.visible) {
            this.camera.position.set(230, 57.4, -60.7);
            this.camera.lookAt(0, 0, 0);
        }
        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        (window as any).viewHandler.viewModel.$data.isStep4 = false;
    }

    step2(val: number) {

        if (!this.obj2.visible) {
            this.camera.position.set(116, 56.4, -207.8);
            this.camera.lookAt(0, 0, 0);
        }

        this.obj1.visible = false;
        this.obj2.visible = true;
        this.obj3.visible = false;

        (window as any).viewHandler.viewModel.$data.isStep4 = false;
    }

    step3(val: number) {

        if (!this.obj3.visible) {
            this.camera.position.set(43, 52.5, 235);
            this.camera.lookAt(0, 0, 0);
        }

        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = true;

        (window as any).viewHandler.viewModel.$data.isStep4 = false;
    }

    step4(val: number) {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;


        (window as any).viewHandler.viewModel.$data.isStep4 = true;
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
