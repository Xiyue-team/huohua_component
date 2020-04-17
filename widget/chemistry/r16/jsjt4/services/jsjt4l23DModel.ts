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
import * as jingbao1 from '../sub_static/1.fbx';
import * as jingbao2 from '../sub_static/2.fbx';
import * as jingbao3 from '../sub_static/3.fbx';
import * as jingbao5 from '../sub_static/4.fbx';
import * as H from '../sub_static/H.png';
import * as C from '../sub_static/C.png';

import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import {TweenMax} from 'gsap';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';


export class Jsjt4l23DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    private animation: any;
    private animation1: any;


    static preload() {
        const modelArray = [H, C, jingbao1, jingbao2, jingbao3, jingbao5];
        console.log(modelArray);
    }

    private render = () => {
        requestAnimationFrame( this.render );
        if (this.animation) {
           this.animation.renderModel();
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
        const jb1: any = await this.fbxLoader(jingbao1 as any);
        this.obj1.add(jb1);
        const jb2: any = await this.fbxLoader(jingbao2 as any);
        this.obj2.add(jb2);
        const jb3: any = await this.fbxLoader(jingbao3 as any);
        jb3.children[0].material.transparent = true;
        this.obj2.add(jb3);
        const jb4: any = await this.fbxLoader(jingbao2 as any);
        this.obj3.add(jb4);
        const jb5: any = await this.fbxLoader(jingbao5 as any);
        this.obj3.add(jb5);
        jb1.scale.set(0.8, 0.8, 0.8);
        jb2.scale.set(0.8, 0.8, 0.8);
        jb3.scale.set(0.8, 0.8, 0.8);
        jb4.scale.set(0.8, 0.8, 0.8);
        jb5.scale.set(0.8, 0.8, 0.8);
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        //创建动画
        this.animation = new Model3dAnimation(jb3);
        this.animation.setLoopOne(0);
        this.animation.setAnimationDoubleSpeed(1);
        this.animation1 = this.opacityAnimation(1, 0, 1.6, jb3.children[0]);
    }


    //隐藏或显示模型的方法
    hideOrShowModel(obj: THREE.Object3D, isShow: boolean) {
        obj.visible = isShow;
    }

    //三个箭头的方法
    hide1Model() {
        this.hideOrShowModel(this.obj1, true);
        this.hideOrShowModel(this.obj2, false);
        // this.animation.resetModelAnimation();
    }

    //创建透明动画的方法
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

    //重置动画的方法
    resetOpacityAnimation(animation: any) {
        animation.progress(0);
        animation.pause();
    }

    hide2Model() {
        this.animation.resetModelAnimation();
        this.resetOpacityAnimation(this.animation1);

        this.hideOrShowModel(this.obj1, false);
        this.hideOrShowModel(this.obj2, true);
        this.hideOrShowModel(this.obj3, false);

        this.animation.playModelAnimation();
        this.animation1.play();
    }
    hide3Model() {
        this.hideOrShowModel(this.obj2, false);
        this.hideOrShowModel(this.obj3, true);

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
