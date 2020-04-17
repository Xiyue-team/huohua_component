import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import * as shugeng1 from '../sub_static/shugeng1.fbx';
import * as anniu1 from '../sub_static/anniu1.fbx';
import * as anniu2 from '../sub_static/anniu2.fbx';
import * as anniu3 from '../sub_static/anniu3.fbx';
import * as anniu4 from '../sub_static/anniu6.fbx';

import * as image1 from '../sub_static/1.jpg';
import * as image2 from '../sub_static/2.jpg';
import * as image3 from '../sub_static/3.jpg';
import * as image4 from '../sub_static/4.jpg';
import * as image5 from '../sub_static/5.jpg';
import * as image6 from '../sub_static/6.jpg';
import * as image7 from '../sub_static/7.jpg';
import * as image8 from '../sub_static/10.jpg';
import * as mzb from '../sub_static/mzb.png';
import * as rpb from '../sub_static/rpb.png';
import * as dk from '../sub_static/dk.png';
import * as xk from '../sub_static/xk.png';
import {ModelRotateHelper} from '../../../../../src/three/component/ModelRotateHelper';
import {AnimationHelper} from './AnimationHelper';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
export class Zghjghyhxsl3dModel extends ThreeBase {


    private orbit: any;
    private group: THREE.Group = new THREE.Group();
    private button1: any;
    private button2: any;
    private button3: any;
    private button4: any;
    animation: any;
    animation1: any;
    animation2: any;
    animation3: any;
    animation4: any;
    animation5: any;
    private image1: THREE.Mesh;
    private image2: THREE.Mesh;
    private group1: THREE.Group = new THREE.Group();
    private modelRotate: any;
    private text1: any;
    private text2: any;
    private bigStork: THREE.Mesh;
    private smallStork: THREE.Mesh;
    private smallStork1: THREE.Mesh;

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

    static loadImage() {
        const imageArray = [shugeng1, anniu1, anniu2, anniu1, anniu2, image1,
            image2, image3, image4, image5, image6, image7, image8, mzb, rpb, dk, xk];
        console.log(imageArray);
    }

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render( this.scene,  this.camera );
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initImage();
        this.initText();
        this.loadModel();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2F2F31);
    }

    initLight() {
        this.lights = [];
        this.lights.push(new THREE.AmbientLight( 0xffffff, 1));
        this.scene.add(this.lights[0]);
        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.7 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );
        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 200, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -200, -100);
        this.scene.add( c );
        this.scene.add( u );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  270);
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
        this.orbit.enableRotate = false;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    async loadModel() {
        const scaleNumber = 0.7;
        const s1_FBX: any = await this.fbxLoader(shugeng1 as any);
        this.button1 = await  this.fbxLoader(anniu1 as any);
        this.button2 = await  this.fbxLoader(anniu2 as any);
        this.button3 = await  this.fbxLoader(anniu3 as any);
        this.button4 = await  this.fbxLoader(anniu4 as any);
        this.button1.visible = false;
        this.button2.visible = false;
        this.group.add(s1_FBX, this.button1, this.button2, this.button3, this.button4);
        //
        this.group.rotateX(Math.PI / 7);
        this.group.rotateY(-Math.PI / 6);
        this.group.scale.set(scaleNumber, scaleNumber, scaleNumber);
        this.scene.add(this.group);
        this.modelRotate = new ModelRotateHelper(this.group);
        this.modelRotate.rangeleAngleX = [-Math.PI - Math.PI / 7, Math.PI - Math.PI / 7];
        this.modelRotate.initEvent();
        this.initClickEvent();
    }


    // 初始化图片
    initImage() {
        this.image1 = ThreeUtil.createImg(113.7, 115.2, mzb, 0, 0, 0);
        this.image2 = ThreeUtil.createImg(113.7, 115.2, rpb, 0, 0, 0);
        this.bigStork = ThreeUtil.createImg(232 * 2, 115 * 2, dk, 0, 0, -150);
        this.smallStork = ThreeUtil.createImg(113 * 1.8, 115 * 2, xk, 50, 0, -150);
        this.smallStork1 = this.smallStork.clone();
        this.smallStork1.position.set(-130, 0 , -150);
        this.image1.visible = false;
        this.image2.visible = false;
        (this.smallStork.material as any).opacity = 0;
        // (this.bigStork.material as any).opacity = 1;
        this.group1.add(this.image1, this.image2, this.smallStork);
        this.scene.add(this.bigStork, this.smallStork1);
        this.group1.position.set(80, 0, 0);
        this.scene.add(this.group1);
    }

    //初始化事件
    initClickEvent() {
        this.initModelMoveAnimation();
        const function1 = () => {
            //控制模型显示隐藏
            this.button1.visible = true;
            this.button3.visible = false;
            this.button2.visible = false;
            this.button4.visible = true;

            this.animation.play();
            this.animation1.play();
            this.animation2.play();
            //控制左侧图片显示隐藏
            this.image1.visible = true;
            this.image2.visible = false;
        };

        const function2 = () => {
            //控制模型显示隐藏
            this.button2.visible = true;
            this.button4.visible = false;
            this.button1.visible = false;
            this.button3.visible = true;
            this.animation.play();
            this.animation1.play();
            this.animation2.play();
            //控制左侧图片显示隐藏
            this.image2.visible = true;
            this.image1.visible = false;
        };

        this.button3.on('click', () => {
            function1();
        });

        this.button3.on('touchstart', () => {
            function1();
        });

        this.button4.on('click', () => {
            function2();
        });

        this.button4.on('touchstart', () => {
            function2();
        });
    }

    //创建文字
    initText() {
        this.text1 = ThreeUtil.createNormalText('木质部', 30, -50, 0, '#FFFFFF' , 0.15);
        this.text2 = ThreeUtil.createNormalText('韧皮部', 30, -50, 0, '#FFFFFF' , 0.15);
        this.image1.add(this.text1);
        this.image2.add(this.text2);
    }

    //初始化模型移动的动画
    initModelMoveAnimation() {
        //移动模型的动画
        this.animation = AnimationHelper.createAnimation1(0, -80, this.group, 0.5);
        this.animation1 = AnimationHelper.createAnimation2(1, 0, this.bigStork, 0.5);
        this.animation2 = AnimationHelper.createAnimation2(0, 1, this.smallStork, 1);
    }

    //重置动画的方法
    resetAnimation(animation: any) {
        animation.progress(0);
        animation.pause();
    }

    reset() {
        this.image1.visible = false;
        this.image2.visible = false;
        this.resetAnimation(this.animation);
        this.resetAnimation(this.animation1);
        this.resetAnimation(this.animation2);
        this.button2.visible = false;
        this.button4.visible = true;
        this.button1.visible = false;
        this.button3.visible = true;
        this.modelRotate.resetModelPosition();
        this.group.rotateX(Math.PI / 7);
        this.group.rotateY(-Math.PI / 6);
    }

}




