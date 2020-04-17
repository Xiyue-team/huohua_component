/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import * as liziModel1 from '../sub_static/model/qiu3.fbx';
export class CrystalModel extends ThreeBase {
    // 添加拖拽控制器
    private orbit: any;
    //添加模型变量
    private obj1 = new THREE.Object3D();
    //创建模型子集组
    group1: any = [];
    //控制不同屏幕下模型的缩放大小变量
    scaleNum = 50;
    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera); }

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
        this.camera = new THREE.OrthographicCamera(-this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(0, 400, 0);
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
        (this.renderer as WebGLRenderer).sortObjects = false;
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        // //是否可以缩放
        this.orbit.enableZoom = false;
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
        this.lights.push(new THREE.AmbientLight(0xffffff, 0.5));
        this.scene.add(this.lights[0]);
        const dirLight = new THREE.DirectionalLight('#ffffff', 0.9);
        dirLight.position.set(0, 100, 300);
        this.camera.add(dirLight);
        const dirLight2 = new THREE.DirectionalLight('#ffffff', 1);
        dirLight2.position.set(-400, 100, 100);
        this.scene.add(dirLight2);

    }

    // 加载模型
    async initGltfLoader() {
        // 模型1
        const model1: any = await this.fbxLoader(liziModel1 as any);
        this.obj1.add(model1);
        for (let i = 0; i < 5; i ++) {
            (this.obj1.children[0].children[i] as any).material.transparent = true;
            (this.obj1.children[0].children[i] as any).material.depthTest = false;
            (this.obj1.children[0].children[i] as any).material.depthWrite = false;
        }
        (this.obj1.children[0].children[0] as any).material.opacity = 1;
        (this.obj1.children[0].children[1] as any).material.opacity = 0.55;
        (this.obj1.children[0].children[2] as any).material.opacity = 0.45;
        (this.obj1.children[0].children[3] as any).material.opacity = 0.3;
        (this.obj1.children[0].children[4] as any).material.color = new THREE.Color('#000');
        (this.obj1.children[0].children[4] as any).material.opacity = 0.25;
        if (document.documentElement.clientHeight < 810 && document.documentElement.clientHeight > 600) {
            this.scaleNum = 40;
        } else if (document.documentElement.clientHeight < 600 && document.documentElement.clientHeight > 460) {
            this.scaleNum = 30;
        } else if (document.documentElement.clientHeight < 460 && document.documentElement.clientHeight > 300) {
            this.scaleNum = 20;
        } else {
            this.scaleNum = 50;
        }
        (this.obj1.children[0].children[0] as any).scale.set(0.2266 * this.scaleNum, 0.2266 * this.scaleNum, 0.2266 * this.scaleNum);
        (this.obj1.children[0].children[1] as any).scale.set(2.132 * this.scaleNum, 2.132 * this.scaleNum, 2.132 * this.scaleNum);
        (this.obj1.children[0].children[2] as any).scale.set(3.5283 * this.scaleNum, 3.5283 * this.scaleNum, 3.5283 * this.scaleNum);
        (this.obj1.children[0].children[3] as any).scale.set(4.8515 * this.scaleNum, 4.8515 * this.scaleNum, 4.8515 * this.scaleNum);
        (this.obj1.children[0].children[4] as any).scale.set(6.1475 * this.scaleNum, 6.1475 * this.scaleNum, 6.1475 * this.scaleNum);
        const object = (this.obj1 as any).children[0].children[0].clone();
        const object1 = (this.obj1 as any).children[0].children[1].clone();
        const object2 = (this.obj1 as any).children[0].children[2].clone();
        const object3 = (this.obj1 as any).children[0].children[3].clone();
        const object4 = (this.obj1 as any).children[0].children[4].clone();
        this.group1.push(object, object1, object2, object3, object4);
        object.renderOrder = 4;
        object1.renderOrder = 3;
        object2.renderOrder = 2;
        object3.renderOrder = 1;
        object4.renderOrder = 0;
    }
    // 点击按钮事件
    getEvent1(index: number) {
        this.scene.add(this.group1[4]);
        this.scene.add(this.group1[3]);
        this.scene.add(this.group1[2]);
        this.scene.add(this.group1[1]);
        this.scene.add(this.group1[0]);
        if (index === 1) {
            (window as any).viewHandler.viewModel.$data.value1 = 1;
            for (let i = 2; i < 5; i ++) {
                this.group1[i].visible = false;
            }
        } else if (index === 2) {
            for (let i = 1; i < 5; i ++) {
                this.group1[i].visible = true;
            }
            this.group1[4].visible = false;
            const scaleNum1 = 0.2266 * this.scaleNum;
            this.group1[0].scale.set(scaleNum1, scaleNum1, scaleNum1);
        }
    }
    getNumber() {
        const number1 = (window as any).viewHandler.viewModel.$data.value1;
        for (let i = 0; i < 5; i ++) {
            this.group1[i].visible = false;
        }
        for (let i = 0; i < number1 + 1; i ++) {
            this.group1[i].visible = true;
        }
        const scaleNum1 = 0.2266 * this.scaleNum + (number1 - 1) * 0.1 * 0.2266 * this.scaleNum;
        this.group1[0].scale.set(scaleNum1, scaleNum1, scaleNum1);
    }
    getSize() {
        const number2 = (window as any).viewHandler.viewModel.$data.value2;
        const scaleNum1 = 0.2266 * this.scaleNum + (number2 - 11) * 0.05 * 0.2266 * this.scaleNum;
        const scaleNum2 = 2.132 * this.scaleNum - (number2 - 11) * 0.06 * 2.132 * this.scaleNum;
        const scaleNum3 = 3.5283 * this.scaleNum - (number2 - 11) * 0.06 * 3.5283 * this.scaleNum;
        const scaleNum4 = 4.8515 * this.scaleNum - (number2 - 11) * 0.06 * 4.8515 * this.scaleNum;
        const scaleNum5 = 6.1475 * this.scaleNum - (number2 - 11) * 0.06 * 6.1475 * this.scaleNum;
        this.group1[0].scale.set(scaleNum1, scaleNum1, scaleNum1);
        this.group1[1].scale.set(scaleNum2, scaleNum2, scaleNum2);
        this.group1[2].scale.set(scaleNum3, scaleNum3, scaleNum3);
        this.group1[3].scale.set(scaleNum4, scaleNum4, scaleNum4);
        this.group1[4].scale.set(scaleNum5, scaleNum5, scaleNum5);
        (window as any).viewHandler.viewModel.$data.width = 20 + (number2 - 11) * 13.3 + '%';
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
        (window as any).viewHandler.viewModel.$data.value1 = 1;
        (window as any).viewHandler.viewModel.$data.value2 = 11;
        (window as any).viewHandler.viewModel.$data.show = true;
        (window as any).viewHandler.viewModel.$data.active1 = false;
        (window as any).viewHandler.viewModel.$data.active2 = false;
        for (let i = 0; i < 5; i++) {
            this.scene.remove(this.group1[i]);
        }
    }
}
