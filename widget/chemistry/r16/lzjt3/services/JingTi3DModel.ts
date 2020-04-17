/**
 *gltf模型加载类
 *@since 2.0
 *@author shujie
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as jtBin1 from '../sub_static/model1/index.bin';
import * as jtGltf1 from '../sub_static/model1/index.gltf';

import * as jtBin2 from '../sub_static/model2/index.bin';
import * as jtGltf2 from '../sub_static/model2/index.gltf';

import * as jtBin3 from '../sub_static/model3/index.bin';
import * as jtGltf3 from '../sub_static/model3/index.gltf';

import * as jtBin4 from '../sub_static/model4/index.bin';
import * as jtGltf4 from '../sub_static/model4/index.gltf';

import {Scene} from 'three';
import {TweenMax} from 'gsap';

export class JingTi3DModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private orbit: any;
    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();
    private obj5 = new THREE.Object3D();

    static preload() {
        const modelArray = [jtBin1, jtGltf1, jtBin2, jtGltf2, jtBin3, jtGltf3, jtBin4, jtGltf4, ];
        console.log( modelArray.length);
    }

    private render = () => {requestAnimationFrame(this.render); this.renderer.render(this.scene, this.camera); };
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
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
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
        // this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        if ( this.height < 500) {
            this.camera = new THREE.OrthographicCamera( this.width / - 3, this.width / 3, this.height / 3, this.height / - 3, 1, 5000 );
        } else {
            this.camera = new THREE.OrthographicCamera( this.width / - 7, this.width / 7, this.height / 7, this.height / - 7, 1, 5000 );
        }
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 350);
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
        this.domElement.appendChild(this.renderer.domElement);
        // 增加光效与gamma渲染
        (this.renderer as WebGLRenderer).gammaInput = true;
        (this.renderer as WebGLRenderer).gammaOutput = true;
        (this.renderer as WebGLRenderer).shadowMap.enabled = true;
        (this.renderer as WebGLRenderer).shadowMap.type = THREE.PCFSoftShadowMap;
        // 整体曝光
        (this.renderer as WebGLRenderer).toneMappingExposure = 0.8;
    }
    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最近距离
        this.orbit.minDistance = 350;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 500;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        // this.orbit.minAzimuthAngle = -Math.PI * 2;
        // this.orbit.maxAzimuthAngle = Math.PI * 2;
        // this.orbit.maxPolarAngle = Math.PI;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }
    /**
     * 初始化光源
     */
    initLight(): void {
        const ambientLight = new THREE.AmbientLight( '#ffffff', 0.3);
        this.camera.add(ambientLight);
        const dirLight = new THREE.DirectionalLight('#ffffff', 0.8);
        dirLight.position.set(150, 0, 259.8);
        this.camera.add(dirLight);
    }

    // 加载模型
    async initGltfLoader() {
        // 解析一模型
        const model1: any = await this.gltfLoader(jtGltf1 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
        this.obj1.scale.set(100, 100, 100);

        const model2: any = await this.gltfLoader(jtGltf2 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });
        this.obj2.scale.set(100, 100, 100);
        this.obj2.rotation.y = Math.PI;
        const model3: any = await this.gltfLoader(jtGltf3 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });
        this.obj3.scale.set(100, 100, 100);
        this.obj3.rotation.y = Math.PI;
        // 解析二模型
        const model4: any = await this.gltfLoader(jtGltf1 as any);
        model4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });
        this.obj4.scale.set(100, 100, 100);

        const model5: any = await this.gltfLoader(jtGltf4 as any);
        model5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj5.add(child);
            }
        });
        (this.obj5.children[0].children[0].children[0].children[0].children[11] as any).material.side = THREE.DoubleSide;
        (this.obj5.children[0].children[0].children[0].children[0].children[12] as any).material.side = THREE.DoubleSide;
        this.obj5.rotation.y = Math.PI;
        this.obj5.scale.set(100, 100, 100);
        this.scene.add(this.obj1, this.obj2, this.obj3, this.obj4, this.obj5);
        this.hideScene();
    }
    // 重置模型
    resetModelPos() {
        this.resetCamera();
    }

    hideScene() {
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
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
