import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Config } from './Config';
import { AnimationHelper } from './AnimationHelper';
import * as glassBallImg from './../sub_static/glassBall.png';
import * as steelBallImg from './../sub_static/steelBall.png';
import * as bowlImg from './../sub_static/bowl.png';

const TrackballControls = require('three-trackballcontrols');
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private group = new THREE.Group();
    private centerOfRotation1: THREE.Mesh;
    private centerOfRotation2: THREE.Mesh;
    private leftGlassBall: THREE.Mesh;
    private rightGlassBall: THREE.Mesh;
    private leftSteelBall: THREE.Mesh;
    private rightSteelBall: THREE.Mesh;
    private leftBowl: THREE.Mesh;
    private rightBowl: THREE.Mesh;
    private leftAnimation: any;
    private rightAnimation: any;
    private render = () => {
        requestAnimationFrame( this.render );
        this.controls.update();
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createPlane();
        this.createRotatePoint();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x699C9B);
    }

    preLoad() {

    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  403);
    }


    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
      this.controls = new TrackballControls( this.camera, this.renderer.domElement );
      this.controls.rotateSpeed = 3;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;
      this.controls.noZoom = true;
      this.controls.noPan = true;
      this.controls.noRotate = true;
      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
    }


    resize()  {
      const dom = document.getElementById('3dContainer');
      const width = dom.clientWidth;
      const height = dom.clientHeight;
      (this.camera as PerspectiveCamera).aspect = width / height;
      (this.camera as PerspectiveCamera).updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      this.renderer.setSize(width, height);
    }

    //创建支撑的板
    createPlane() {
        const plane = ThreeUtil.createPlane(Config.planConfig.width, Config.planConfig.height,
          Config.planConfig.color, Config.planConfig.opacity, false);
        this.group.add(plane);
        this.group.position.set(0, 80, 0);
        this.scene.add(this.group);
    }

    //创建旋转点的圆球和绳子
    createRotatePoint() {
        this.centerOfRotation1 = ThreeUtil.createPoint(Config.centerRotationConfig.radius, Config.centerRotationConfig.color1,
          Config.centerRotationConfig.x, Config.centerRotationConfig.y, Config.centerRotationConfig.opacity);
        const point = ThreeUtil.createPoint(Config.centerRotationConfig.radius - 1, Config.centerRotationConfig.color2, 0, 0, 1);
        this.centerOfRotation1.add(point);
        this.centerOfRotation2 = this.centerOfRotation1.clone();
        const rope1 = ThreeUtil.createPlane(Config.rope1Config.width, Config.rope1Config.height, Config.rope1Config.color, 1, false);
        const rope2 = ThreeUtil.createPlane(Config.rope2Config.width, Config.rope2Config.height, Config.rope2Config.color, 1, false);
        this.leftGlassBall = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, glassBallImg, -150, 0, 0);
        this.rightGlassBall = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, glassBallImg, -150, 0, 0);
        this.leftSteelBall = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, steelBallImg, -150, 0, 0);
        this.rightSteelBall = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, steelBallImg, -150, 0, 0);
        this.leftBowl = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, bowlImg, -150, 0, 0);
        this.rightBowl = ThreeUtil.createImg(Config.ballConfig.width, Config.ballConfig.height, bowlImg, -150, 0, 0);
        this.hideBall();
        this.leftGlassBall.visible = true;
        this.rightGlassBall.visible = true;
        rope1.position.set(Config.rope1Config.x, Config.rope1Config.y, 0);
        rope2.position.set(Config.rope2Config.x, Config.rope2Config.y, 0);
        this.centerOfRotation1.add(rope1, this.leftGlassBall, this.leftSteelBall, this.leftBowl);
        this.centerOfRotation2.add(rope2, this.rightGlassBall, this.rightSteelBall, this.rightBowl);
        this.centerOfRotation1.rotation.z = Math.PI / 3;
        this.centerOfRotation2.rotation.z = Math.PI * 2 / 3;
        this.group.add(this.centerOfRotation1, this.centerOfRotation2);
        this.createAnimation();
    }

    //创建绳子上的材质球

    //创建球体摆动的动画

    createAnimation() {
        this.leftAnimation = AnimationHelper.createAnimation(this.centerOfRotation1, Math.PI / 3, Math.PI * 2 / 3, 0);
        this.rightAnimation = AnimationHelper.createAnimation(this.centerOfRotation2, Math.PI * 2 / 3, Math.PI / 3, 0);
    }

    play() {
        this.leftAnimation.play();
        this.rightAnimation.play();
    }

    stop() {
        this.leftAnimation.pause();
        this.leftAnimation.progress(0);
        this.rightAnimation.pause();
        this.rightAnimation.progress(0);
    }

    hideBall() {
        this.hideLeftBall();
        this.hideRightBall();
    }

    hideLeftBall() {
      this.leftGlassBall.visible = false;
      this.leftSteelBall.visible = false;
      this.leftBowl.visible = false;
    }

    hideRightBall() {
      this.rightGlassBall.visible = false;
      this.rightSteelBall.visible = false;
      this.rightBowl.visible = false;
    }
    //切换不同的材质球
    setMaterialBall(position: string, material: number) {
        //0为玻璃球 1为钢球 2为木球
        if (position === 'left') {
            this.hideLeftBall();
            switch (material) {
              case 0:
                  this.leftGlassBall.visible = true;
                  break;
              case 1:
                  this.leftBowl.visible = true;
                  break;
              case 2:
                  this.leftSteelBall.visible = true;
                  break;
            }
        }

        if (position === 'right') {
            this.hideRightBall();
            switch (material) {
              case 0:
                this.rightGlassBall.visible = true;
                break;
              case 1:
                this.rightBowl.visible = true;
                break;
              case 2:
                this.rightSteelBall.visible = true;
                break;
            }
        }

    }

}




