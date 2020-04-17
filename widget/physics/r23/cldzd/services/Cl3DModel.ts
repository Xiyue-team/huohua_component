import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import * as rotateImage from '../sub_static/rotImage.png';
import * as point2 from '../sub_static/point2.png';
import * as backgroundImg from '../sub_static/bg.png';
import * as liantiaoFBX from '../sub_static/liantiao.fbx';
import * as liantiaoImg from '../sub_static/chilun.png';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';

export class Cl3DModel extends ThreeBase {

    private orbit: any;
    //模型动画对象
    animation: any;
    public sliderControlerLine: any;
    private controls: any;
    public rotateLine: any;
    private point: any;

    static preload() {
        const modelArray = [liantiaoFBX, liantiaoImg];
        console.log(modelArray.length);
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

    private render = () => {
        requestAnimationFrame(this.render);
          if (this.animation) {
            this.animation.renderModel();
          }
        this.renderer.render(this.scene,  this.camera);
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);

        this.initBackgroundImage();
        this.initFBXLoader();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x1E2D3B);
    }

    initLight() {
          const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
          this.scene.add(ambientLight);

          const dirLight = new THREE.DirectionalLight( '#ffffff', 0.2);
          dirLight.position.set( 100, 100, 100 );
          this.scene.add( dirLight );

          const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
          dirLight2.position.set( -100, -100, -100 );
          this.scene.add( dirLight2 );
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
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      this.orbit.enableZoom = false;
      //是否自动旋转
      this.orbit.autoRotate = true;
      //设置相机距离原点的最远距离
      this.orbit.minDistance = 1;
      //设置相机距离原点的最远距离
      this.orbit.maxDistance = 4000;
      //是否开启右键拖拽
      this.orbit.enablePan = false;
      //是否开启左键旋转
      this.orbit.enableRotate = false;
    }

    //加载背景图片
    initBackgroundImage() {
        const backgroundImage = ThreeUtil.createImg(1200 * 0.47, 675 * 0.46, backgroundImg);
        backgroundImage.position.z = -22;
        this.scene.add(backgroundImage);
    }

    // 加载模型
    async initFBXLoader()  {
        const lianT_FBX: any = await this.fbxLoader(liantiaoFBX as any);
        lianT_FBX.position.set(-30, 0, -20);
        lianT_FBX.scale.set(0.5, 0.5, 0.5);
        this.scene.add(lianT_FBX);
        this.animation = new Model3dAnimation(lianT_FBX);
        this.bindEventForImage();
        this.setMove();
        this.createYellowPoint();
        (window as any).viewHandler.modelHideLoading();
    }

    //绑定事件
    bindEventForImage() {
        const l1 = ThreeUtil.createPlane(1, 300, '#000000', 0.001);
        this.rotateLine = ThreeUtil.createImg(44 * 0.5, 354 * 0.5, rotateImage, 0, 0, 0);
        const bgRotLine = ThreeUtil.createImg(44 * 0.5, 354 * 0.5, rotateImage, 1, 0, -5);
        bgRotLine.rotation.z = Math.PI;
        (bgRotLine.material as any).transparent = true;
        (bgRotLine.material as any).opacity = 0.2;
        this.point = ThreeUtil.createPoint(1, '#000000', 77, 13.5, 0);
        const slider = ThreeUtil.createImg(400, 400, point2, 0, -76);
        const slider1 = ThreeUtil.createImg(35, 35, point2, 0, 0);
        slider1.position.z = 1;
        (slider1.material as any).opacity = 0.0001;
        l1.position.z = 0;
        this.point.add(this.rotateLine);
        this.point.add(bgRotLine);
        this.rotateLine.position.z = -0.5;
        (slider.material as any).transparent = true;
        (slider.material as any).opacity = 0;
        slider.add(slider1);
        l1.add(slider);
        this.point.add(l1);

        this.sliderControlerLine = new SliderControlLine(l1, slider, this.point, slider1, undefined, true);
        this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
        this.scene.add(this.point);
    }

    //转动回调
    setMove() {
        this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
            this.animation.playAnimation(0);
            this.animation.setAnimationDoubleSpeed(0.001);
            this.animation.action.time = 320 * Math.abs(Math.round(this.sliderControlerLine.angle * 180 / Math.PI)) / 36000;

        };

        this.sliderControlerLine.sliderPointMouseUpCallback = () => {

            this.animation.pauseModelAnimation();

        };

        this.sliderControlerLine.sliderPointMouseOutCallback = () => {

            this.animation.pauseModelAnimation();

        };

        this.sliderControlerLine.sliderPointTouchMoveCallback = () => {

            this.animation.playAnimation(0);
            this.animation.setAnimationDoubleSpeed(0.001);
            this.animation.action.time = 320 * Math.abs(Math.floor(this.sliderControlerLine.angle * 180 / Math.PI)) / 36000;

        };

        this.sliderControlerLine.sliderPointTouchEndCallback = () => {

            this.animation.pauseModelAnimation();

        };
    }

    //创建齿轮上的黄色固定点
    createYellowPoint() {
        const leftYelPoint = ThreeUtil.createPoint(2, '#EAFF07', -117, 39, 1);
        const rightYelPoint = ThreeUtil.createPoint(2, '#EAFF07', 77, 70.5, 1);
        this.scene.add(leftYelPoint);
        this.scene.add(rightYelPoint);
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

          this.sliderControlerLine.angle = 0;
          this.sliderControlerLine.totalAngle = 0;
          this.point.rotation.z = 0;
          this.animation.resetModelAnimation();

    }

}




