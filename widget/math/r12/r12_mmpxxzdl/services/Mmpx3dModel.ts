import * as THREE from 'three';
import {ColorKeywords, Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D} from 'three-text2d';
import { MmpxUtils} from './MmpxUtils';
import {TimelineLite, Power0, TweenMax} from 'gsap';
import tan = ColorKeywords.tan;
import { BrowserUtil } from "../../../../../src/util/BrowserUtil";


const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Mmpx3dModel extends ThreeBase {

    planeMesh: Mesh;
    private orbit: any;
    private text1: any;
    private text2: any;
    private textb: any;
    private util:  any;
    private plane: any;
    private transform = {
        height: 0,
        transformY: 141,
        transformZ: -141
    };
    private animation: any;
    private line1: any;
    private line2: any;

    private isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene,  this.camera );
    }

    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }
    init() {
        this.util = new MmpxUtils();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createWord();
        this.initSc();
        this.createAnimation();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {

        const scale = this.isMobile ? 1 : 2;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(67,  16,  -11);
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(67,  16,  -11);
        this.orbit.reset();
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }


    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 50;
        this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


    /*
    *初始化场景
    * 通过随机点连成面的方法
    * 设置面的透明度的动画效果的方法
    * 改变随机点位置的方法
    * */

    //初始化场景方法
    initSc() {
       const plane1 = this.util.createPlane(200, 400, 0x3EB4F1, 0.5);
       const plane2 = this.util.createPlane(200, 400, 0x6FCCC9, 0.5);
       this.scene.add(plane1);
       this.scene.add(plane2);
       plane2.position.y = 50;
       plane1.position.y = -50;
       plane2.rotateX(Math.PI / 180 * 90);
       plane1.rotateX(Math.PI / 180 * 90);
       this.plane = this.util.createPlane(200, 0, 0xf0df00, 0.5);
       this.scene.add(this.plane);
       this.plane.rotateX(Math.PI / 180 * -45);
       this.plane.position.y = 150;
       this.plane.visible = false;
       this.line1 = this.util.createLine(200, 0x000000, 1);
       this.line2 = this.util.createLine(200, 0x000000, 1);
       this.scene.add(this.line1);
       this.line1.rotateZ(Math.PI / 180 * 90);
       this.line1.position.set(0, 50, -50);
       this.scene.add(this.line2);
       this.line2.rotateZ(Math.PI / 180 * 90);
       this.line2.position.set(0, -50, 50);
       this.line1.visible = false;
       this.line2.visible = false;
       this.line1.add(this.text1);
       this.line2.add(this.text2);
        this.plane.add(this.textb);
        this.textb.visible = false;
    }


    //使面展开的方法
    updatePlean() {
        this.plane.geometry.dispose();
        this.plane.geometry = new THREE.PlaneGeometry( 200, this.transform.height, 32);
        this.plane.position.y = this.transform.transformY;
        this.plane.position.z = this.transform.transformZ;

    }


    //创建动画的方法
    createAnimation() {
        this.animation = TweenMax.to(this.transform, 3, {
            height: 400,
            transformY: 0,
            transformZ: 0,
            onUpdate: () => {
                this.updatePlean();
            },
            paused: true
        });
    }


    //启动动画
    playAnimation() {
        this.line1.visible = false;
        this.line2.visible = false;
        this.textb.visible = false;
        this.plane.visible = true;
        setTimeout(() => {
            this.line1.visible = true;
        }, 600);
        setTimeout(() => {
            this.line2.visible = true;
        }, 1300);
        setTimeout(() => {
            this.textb.visible = true;
        }, 2400);
        this.animation.play();
    }


    //重置动画
    resetAnimation() {
        this.line1.visible = false;
        this.line2.visible = false;
        this.textb.visible = false;
        this.plane.visible = false;
        this.animation.progress(0);
        this.animation.pause();
    }


    //拖动滑条使平面旋转
    rotatePlane(angle: number) {
        this.plane.rotateX(Math.PI / 180 * angle);
    }


    setLinePosition(angle: number) {
        const degree = Math.PI / 180;
        const tanAngle = 45 + angle;
        const positionDistance1 = 50 / (Math.tan(degree * tanAngle));
        const positionDistance2 = -50 / (Math.tan(degree * tanAngle));
        this.line2.position.z = positionDistance1 ;
        this.line1.position.z = positionDistance2 ;
    }


    createWord() {
        const texta = this.util.createText('α', 90, -20, 190, '#000000');
         texta.material.depthTest = false;
        this.scene.add(texta);

        this.textb = this.util.createText('β', 100, 200, -10, '#000000');
        this.textb.material.depthTest = false;

        const textc = this.util.createText('γ', 90, 80, 190, '#000000');
        textc.material.depthTest = false;
        this.scene.add(textc);

        this.text1 = this.util.createText('l₁', 0, -100, 0, '#000000');
        this.text1.material.depthTest = false;

        this.text2 = this.util.createText('l₂', 0, -100, 0, '#000000');
        this.text2.material.depthTest = false;

    }

}




