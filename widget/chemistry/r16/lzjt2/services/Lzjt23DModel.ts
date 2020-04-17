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

import * as model1 from '../sub_static/1.fbx';
import * as model2 from '../sub_static/2.fbx';
import * as model3 from '../sub_static/3.fbx';
import * as model4 from '../sub_static/4.fbx';
import * as model5 from '../sub_static/5.fbx';

import * as tl from '../sub_static/tl.png';
import * as lizi from '../sub_static/lizi.png';
import {TweenMax} from 'gsap';


export class Lzjt23DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();
    private animation: any;


    static preload() {
        const modelArray = [tl, lizi, model1, model2, model3, model4, model5];
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
        const ismobile = (window as any).viewHandler.viewModel.$data.ismobile;
        const left = ismobile ? this.width / -5 : this.width / -12;
        const right = ismobile ? this.width / 5 : this.width / 12;
        const top = ismobile ? this.height / 5 : this.height / 12;
        const bottom = ismobile ? this.height / -5 : this.height / -12;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(40, 40, 200);
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

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.0);
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
        const jb1: any = await this.fbxLoader(model1 as any);
        (jb1 as any).children[0].children[1].material.transparent = true;
        this.obj1.add(jb1);
        const jb2: any = await this.fbxLoader(model2 as any);
        this.obj1.add(jb2);
        const jb3: any = await this.fbxLoader(model3 as any);
        this.obj2.add(jb3);
        const jb4: any = await this.fbxLoader(model4 as any);
        this.obj3.add(jb4);
        const jb5: any = await this.fbxLoader(model5 as any);
        this.obj4.add(jb5);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.animation = this.opacityAnimation(1, 0, 3, jb1.children[0].children[1]);
    }

    //创建透明动画
    opacityAnimation(start: number, end: number, duration: number, model: any) {
        const tween = {
            opacity: start,
        };
        // 外围小球变透明动画
        const animation = TweenMax.to(tween, duration, {
            opacity: end,
            onUpdate: () => {
                (model as any).material.opacity = tween.opacity;
            },
            paused: true
        });
        return animation;
    }

    //动画启动的方法
    playAnimation() {
        this.animation.play();
    }

    //动画重置方法
    resetOpacityAnimation() {
        this.animation.progress(0);
        this.animation.pause();
    }

    //隐藏或显示模型的方法
    hideOrShowModel(obj: THREE.Object3D, isShow: boolean) {
        obj.visible = isShow;
    }

    hide1Model() {
       /* if (this.ctrl1) {
            return;
        }*/
        this.resetOpacityAnimation();
        setTimeout(() => {
            this.playAnimation();
        }, 1000);
        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
    }

    hide2Model() {

        this.obj1.visible = false;
        this.obj2.visible = true;
        this.obj3.visible = false;
        this.obj4.visible = false;
    }

    hide3Model() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = true;
        this.obj4.visible = false;
    }

    hide4Model() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = true;
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
