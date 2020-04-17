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

import * as tixinfbx1 from '../sub_static/model/tixin1.fbx';
import * as tixinfbx2 from '../sub_static/model/tixin2.fbx';
import * as tixinfbx3 from '../sub_static/model/tixin3.fbx';

import * as tixinfbx4 from '../sub_static/model/tixin4.fbx';
import * as tixinfbx5 from '../sub_static/model/tixin5.fbx';
import * as tixinfbx6 from '../sub_static/model/tixin6.fbx';

import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';

export class TiXin3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    // 球棍模型动画
    private modelAnimation1: any;
    // 比例模型动画
    private modelAnimation2: any;

    // 球棍模型切割动画
    private cutAnimation1: any;
    // 比例模型切割动画
    private cutAnimation2: any;

    // 存储球棍模型
    obj1 = new THREE.Object3D();
    // 存储比例模型
    obj2 = new THREE.Object3D();

    static preload() {
        const modelArray = [tixinfbx1, tixinfbx2, tixinfbx3, tixinfbx4, tixinfbx5, tixinfbx6];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );

        if (this.modelAnimation1) {
            this.modelAnimation1.renderModel();
        }

        if (this.modelAnimation2) {
            this.modelAnimation2.renderModel();
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

         this.initStickModel();
         this.initProportionalModel();

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

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    // 加载球棍模型
    async initStickModel()  {
        this.scene.add(this.obj1);

        const tixin1: any = await this.fbxLoader(tixinfbx1 as any);
        this.obj1.add(tixin1);

        const tixin3: any = await this.fbxLoader(tixinfbx3 as any);
        this.obj1.add(tixin3);

        const tixin2: any = await this.fbxLoader(tixinfbx2 as any);
        this.obj1.add(tixin2);

        (tixin2.children[4] as any).material.transparent = true;
        this.modelAnimation1 = new Model3dAnimation(tixin2);
        this.modelAnimation1.setLoopOne();
        this.modelAnimation1.setAnimationDoubleSpeed(1.5);

        tixin2.visible = false;
        tixin3.visible = false;

        this.stickModelAnimation();
    }

    // 加载比例模型
    async initProportionalModel() {
        this.scene.add(this.obj2);
        this.obj2.visible = false;

        const tixin6: any = await this.fbxLoader(tixinfbx6 as any);
        this.obj2.add(tixin6);

        const tixin4: any = await this.fbxLoader(tixinfbx4 as any);
        this.obj2.add(tixin4);

        const tixin5: any = await this.fbxLoader(tixinfbx5 as any);
        this.obj2.add(tixin5);

        tixin4.visible = false;
        tixin5.visible = false;
        (tixin5.children[0] as any).material.transparent = true;

        this.modelAnimation2 = new Model3dAnimation(tixin5);
        this.modelAnimation2.setLoopOne();
        this.modelAnimation2.setAnimationDoubleSpeed(1.5);

        (tixin6 as any).scale.set(1.5, 1.5, 1.5);
        (tixin5 as any).scale.set(1.5, 1.5, 1.5);
        (tixin4 as any).scale.set(1.5, 1.5, 1.5);

        this.proportionalModelAnimation();
    }

    // 球棍模型动画
    stickModelAnimation() {
        const tween = {
            opacity: 1,
        };

        this.cutAnimation1 = TweenMax.to(tween, 1, {
            opacity: 0,
            onStart: () => {

                this.obj1.children[0].visible = false;
                this.obj1.children[1].visible = true;
                this.obj1.children[2].visible = true;
                this.modelAnimation1.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj1.children[2].children[4] as any).material.opacity = tween.opacity;
            },
            paused: true
        });
    }

    // 比例模型动画
    proportionalModelAnimation() {
        const tween = {
            opacity: 1,
        };

        this.cutAnimation2 = TweenMax.to(tween, 1, {
            opacity: 0,
            onStart: () => {

                this.obj2.children[0].visible = false;
                this.obj2.children[1].visible = true;
                this.obj2.children[2].visible = true;
                this.modelAnimation2.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj2.children[2].children[0] as any).material.opacity = tween.opacity;
            },
            paused: true
        });

    }

    // 开始球棍模型动画
    startStickModelAnimation() {
        this.cutAnimation1.play();
    }

    // 开始比例模型动画
    startProportionalModelAnimation() {
        this.cutAnimation2.play();

        console.log(this.obj2);
    }

    // 重置动画
    resetAnimation() {
        // 重置球棍模型动画
        this.cutAnimation1.progress(0);
        this.cutAnimation1.pause();

        this.obj1.children[0].visible = true;
        this.obj1.children[1].visible = false;
        this.obj1.children[2].visible = false;

        this.modelAnimation1.resetModelAnimation();

        // 重置比例模型动画
        this.cutAnimation2.progress(0);
        this.cutAnimation2.pause();

        this.obj2.children[0].visible = true;
        this.obj2.children[1].visible = false;
        this.obj2.children[2].visible = false;

        this.modelAnimation2.resetModelAnimation();
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
