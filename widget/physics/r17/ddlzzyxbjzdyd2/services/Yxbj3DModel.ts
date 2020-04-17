/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { SpriteText2D} from 'three-text2d';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {TweenMax, Linear} from 'gsap';

import * as circleInner from '../sub_static/circleInner.png';
import * as electronics from '../sub_static/electronics.png';
import * as redArrowImage from '../sub_static/redArrow.png';
import * as greyArrowImage from '../sub_static/greyArrow.png';
import * as magneticField from '../sub_static/magneticField.png';
import * as magneticField2 from '../sub_static/magneticField2.png';

import * as button1 from '../sub_static/button1.png';
import * as button2 from '../sub_static/button2.png';
import * as PlayButton from '../sub_static/PlayButton.png';

import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class Yxbj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    circleAnimation1: any = [];
    circleAnimation2: any = [];

    // 动画1 模型
    circleMesh1: any = [];

    // 动画2 模型
    circleMesh2: any = [];

    // 正电子
    private positron: any;

    // 红色箭头
    private redArrow: any;

    // 灰色箭头
    private greyArrow: any;

  // 箭头偏转动画
    //动画1
    private redArrowAnimation1: any;
    // 动画2
    private redArrowAnimation: any = [];

    // 背景图
    private backgroundImage1: any;
    private backgroundImage2: any;

    // 按钮
    private buttonImage1: any;
    private buttonImage2: any;

    // 可点击区域
    private buttonCircle1: any;
    private buttonCircle2: any;

    private playButtonImage: any;

    // 按钮点击后动画是否执行了
    private button1Animation = false;
    private button2Animation = false;

    static preload() {
        const modelArray = [circleInner, electronics, redArrowImage, magneticField, magneticField2, button1, button2, greyArrowImage];
        console.log(modelArray.length);
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
        this.init3DModel();

        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
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
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 260);
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
        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        this.orbit.maxDistance = 400;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;

        //禁止旋转
        this.orbit.enableRotate = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const light = new THREE.HemisphereLight( '#ffeeee', '#111122', 1 );
        light.position.set(0, 50, 0);
        this.scene.add( light );

        const light2 = new THREE.HemisphereLight( '#ffeeee', '#111122', 0.5 );
        light2.position.set(0, -50, 0);
        this.scene.add( light2 );


        const light3 = new THREE.AmbientLight( '#404040', 1 );
        this.scene.add( light3 );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 200, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
        //
        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.multiplyScalar( 30 );
        dirLight2.position.set( 100, -200, 1 );
        this.scene.add( dirLight2 );
    }

    init3DModel() {
      this.initBackgroundImage();
      this.initButton();
      this.initPositronAndArrow();
      this.initTrajectoryCircle();
      this.initTrajectoryCircle2();
      this.animation();
      this.animation2();
    }

    // 初始化背景图
    initBackgroundImage() {
      // 背景图
      this.backgroundImage1 = ThreeUtil.createImg(160 * 4 / 3, 160, magneticField2, 0, 0);
      this.backgroundImage1.position.z = -2;
      this.scene.add(this.backgroundImage1);

      this.backgroundImage2 = ThreeUtil.createImg(160 * 4 / 3, 160, magneticField, 0, 0);
      this.backgroundImage2.position.z = -2;
      this.backgroundImage2.visible = false;
      this.scene.add(this.backgroundImage2);

      // 圆形磁场
      const geometry0 = new THREE.CircleBufferGeometry( 28, 50 );
      const material0 = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(circleInner as any),
      });
      const circle = new THREE.Mesh( geometry0, material0 );
      circle.position.z = -1;
      this.scene.add(circle);
    }

    // 初始化按钮
    initButton() {
      const width = 5.2;
      this.buttonImage1 = ThreeUtil.createImg(228 / 3, 60 / 3, button1, 62 + width, -53);
      this.buttonImage2 = ThreeUtil.createImg(228 / 3, 60 / 3, button2, 62 + width, -53);
      (this.buttonImage1.material as any).transparent = true;
      (this.buttonImage2.material as any).transparent = true;
      this.buttonImage2.visible = false;
      this.scene.add(this.buttonImage1);
      this.scene.add(this.buttonImage2);

      const button1Geometry = new THREE.CircleBufferGeometry( 7, 50 );
      const button1Material = new THREE.MeshBasicMaterial({color: '#000', transparent: true, opacity: 0.01});
      this.buttonCircle1 = new THREE.Mesh( button1Geometry, button1Material);
      this.buttonCircle1.position.set(69.5 + width, -52.5, 2);
      this.scene.add(this.buttonCircle1);

      this.buttonCircle2 = new THREE.Mesh( button1Geometry, button1Material);
      this.buttonCircle2.position.set(89.5 + width, -52.5, 2);
      this.scene.add(this.buttonCircle2);

      // 添加播放按钮
      this.playButtonImage = ThreeUtil.createImg(54 / 2.6, 54 / 2.6, PlayButton, 0, 0);
      this.scene.add(this.playButtonImage);

      // 绑定事件
      this.buttonCircle1.on('mousedown', () => {
        // 显示按钮1
        this.buttonImage1.visible = true;
        this.buttonImage2.visible = false;

        // 显示背景图1
        this.backgroundImage1.visible = true;
        this.backgroundImage2.visible = false;

        if (this.playButtonImage.visible === false && !this.button1Animation) {
          // 动画执行了
          this.button1Animation = true;

          // 重置动画2
          this.resetAnimation2();
          this.button2Animation = false;

          // 执行动画1
          this.circleAnimation1[0].play();

          // 隐藏点击区域
          this.buttonCircle1.visible = false;
          this.buttonCircle2.visible = false;
          this.playButtonImage.visible = false;

          // 设置透明度  显示出不可点击
          (this.buttonImage1.material as any).opacity = 0.5;
        }
      });

      this.buttonCircle2.on('mousedown', () => {
        // 显示按钮2
        this.buttonImage1.visible = false;
        this.buttonImage2.visible = true;

        // 显示背景图2
        this.backgroundImage1.visible = false;
        this.backgroundImage2.visible = true;

        if (this.playButtonImage.visible === false && !this.button2Animation) {
          // 动画执行了
          this.button2Animation = true;

          // 重置动画1
          this.resetAnimation1();
          this.button1Animation = false;


          // 执行动画2
          this.circleAnimation2[0].play();

          // 设置动画开始执行不可点击
          this.buttonCircle1.visible = false;
          this.buttonCircle2.visible = false;
          this.playButtonImage.visible = false;

          (this.buttonImage2.material as any).opacity = 0.5;
        }
      });

      this.playButtonImage.on('mousedown', () => {
        // 开始动画 并设置按钮不可点击
        if (this.buttonImage1.visible === true) {
          this.circleAnimation1[0].play();
          (this.buttonImage1.material as any).opacity = 0.5;

          // 动画执行了
          this.button1Animation = true;

        } else {
          this.circleAnimation2[0].play();
          (this.buttonImage2.material as any).opacity = 0.5;

          // 动画执行了
          this.button2Animation = true;
        }

        this.buttonCircle1.visible = false;
        this.buttonCircle2.visible = false;
        this.playButtonImage.visible = false;
      });

      this.buttonCircle1.on('touchstart', () => {
        // 显示按钮1
        this.buttonImage1.visible = true;
        this.buttonImage2.visible = false;

        // 显示背景图1
        this.backgroundImage1.visible = true;
        this.backgroundImage2.visible = false;

        if (this.playButtonImage.visible === false && !this.button1Animation) {
          // 动画执行了
          this.button1Animation = true;

          // 重置动画2
          this.resetAnimation2();
          this.button2Animation = false;

          // 执行动画1
          this.circleAnimation1[0].play();

          // 隐藏点击区域
          this.buttonCircle1.visible = false;
          this.buttonCircle2.visible = false;
          this.playButtonImage.visible = false;

          // 设置透明度  显示出不可点击
          (this.buttonImage1.material as any).opacity = 0.5;
        }
      });

      this.buttonCircle2.on('touchstart', () => {
        // 显示按钮2
        this.buttonImage1.visible = false;
        this.buttonImage2.visible = true;

        // 显示背景图2
        this.backgroundImage1.visible = false;
        this.backgroundImage2.visible = true;

        if (this.playButtonImage.visible === false && !this.button2Animation) {
          // 动画执行了
          this.button2Animation = true;

          // 重置动画1
          this.resetAnimation1();
          this.button1Animation = false;


          // 执行动画2
          this.circleAnimation2[0].play();

          // 设置动画开始执行不可点击
          this.buttonCircle1.visible = false;
          this.buttonCircle2.visible = false;
          this.playButtonImage.visible = false;

          (this.buttonImage2.material as any).opacity = 0.5;
        }
      });

      this.playButtonImage.on('touchstart', () => {
        // 开始动画 并设置按钮不可点击
        if (this.buttonImage1.visible === true) {
          this.circleAnimation1[0].play();
          (this.buttonImage1.material as any).opacity = 0.5;

          // 动画执行了
          this.button1Animation = true;

        } else {
          this.circleAnimation2[0].play();
          (this.buttonImage2.material as any).opacity = 0.5;

          // 动画执行了
          this.button2Animation = true;
        }

        this.buttonCircle1.visible = false;
        this.buttonCircle2.visible = false;
        this.playButtonImage.visible = false;
      });
    }

    // 初始化电子和箭头
    initPositronAndArrow() {
      // 电子
      const positroGeometry = new THREE.CircleBufferGeometry( 7, 50 );
      const positronMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(electronics as any),
        transparent: true,
        opacity: 1
      });
      this.positron = new THREE.Mesh( positroGeometry, positronMaterial);
      this.positron.position.set(0, -27, 0);
      this.scene.add(this.positron);

      // 红色箭头
      const arrow1 = ThreeUtil.createImg(9, 18, redArrowImage, 0, 5);
      arrow1.position.z = -1;
      arrow1.position.y = 8;
      // 红色箭头旋转中心
      const geometry2 = new THREE.PlaneGeometry( 5, 5, 32 );
      const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0.01} );
      this.redArrow = new THREE.Mesh( geometry2, material2 );
      this.redArrow.add(arrow1);
      this.redArrow.visible = false;
      this.positron.add( this.redArrow );

      // 灰色箭头
      this.greyArrow = ThreeUtil.createImg(9, 18, greyArrowImage, 0, 5);
      this.greyArrow.position.y = -18.5;
      this.scene.add(this.greyArrow);
    }

    // 初始化动画1轨迹
    initTrajectoryCircle() {
      // 5
      const geometry = new THREE.RingBufferGeometry( 19, 20, 50, 8, Math.PI / 18 * 7.3, 0 );
      const material = new THREE.MeshBasicMaterial( { color: '#FF4747', side: THREE.DoubleSide} );

      this.circleMesh1[5] = new THREE.Mesh( geometry, material.clone() );
      this.circleMesh1[5].position.set(19, -32.9, 0);


      // 起点
      const geometry2 = new THREE.RingBufferGeometry( 14.38, 15.38, 50, 8, -Math.PI / 18, 0 );
      this.circleMesh1[0] = new THREE.Mesh( geometry2, material.clone() );
      this.circleMesh1[0].position.set(-14.5, -25.1, 0);

      // 1
      const material6 = new THREE.MeshBasicMaterial( { color: '#FF4747', side: THREE.DoubleSide, } );
      const geometry6 = new THREE.RingBufferGeometry( 19, 20, 50, 8, -Math.PI / 18 * 4.7, 0);
      this.circleMesh1[1] = new THREE.Mesh( geometry6, material6 );
      this.circleMesh1[1].position.set(-38, 0, 0);

      // 2
      const geometry3 = new THREE.RingBufferGeometry( 14.38, 15.38, 50, 8, -Math.PI / 18 * 13.5, 0 );
      this.circleMesh1[2] = new THREE.Mesh( geometry3, material );
      this.circleMesh1[2].position.set(-14.5, 25.1, 0);


      // 3
      const geometry4 = new THREE.RingBufferGeometry( 19, 20, 50, 8, Math.PI / 18 * 19.4, 0 );
      this.circleMesh1[3] = new THREE.Mesh( geometry4, material );
      this.circleMesh1[3].position.set(19, 33, 0);

      // 4
      const geometry5 = new THREE.RingBufferGeometry( 14.39, 15.39, 50, 8, Math.PI / 18 * 10.35, 0 );
      this.circleMesh1[4] = new THREE.Mesh( geometry5, material );
      this.circleMesh1[4].position.set(29, 0, 0);

      this.scene.add( this.circleMesh1[5] );
      this.scene.add( this.circleMesh1[0] );
      this.scene.add( this.circleMesh1[1] );
      this.scene.add( this.circleMesh1[2] );
      this.scene.add( this.circleMesh1[3] );
      this.scene.add( this.circleMesh1[4] );

    }

    // 初始化动画2轨迹
    initTrajectoryCircle2() {
    const material = new THREE.MeshBasicMaterial( { color: '#FF4747', side: THREE.DoubleSide} );

    const geometry7 = new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, -Math.PI / 18 * 0.5,  0);
    this.circleMesh2[0] = new THREE.Mesh( geometry7, material.clone());
    this.circleMesh2[0].position.set(-15.4, -26.5, 0);
    this.scene.add(this.circleMesh2[0]);

    const geometry4 = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 14, 0 );
    this.circleMesh2[1] = new THREE.Mesh( geometry4, material.clone());
    this.circleMesh2[1].position.set(0, -35, 0);
    this.scene.add(this.circleMesh2[1]);

    const geometry8 = new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, Math.PI / 18 * 5.2, 0 );
    this.circleMesh2[2] = new THREE.Mesh( geometry8, material.clone());
    this.circleMesh2[2].position.set(15.4, -26.5, 0);
    this.scene.add(this.circleMesh2[2]);

    const geometry3 = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 16, 0 );
    this.circleMesh2[3] = new THREE.Mesh( geometry3, material.clone());
    this.circleMesh2[3].position.set(30.5, -18, 0);
    this.scene.add(this.circleMesh2[3]);

    const geometry12 = new THREE.RingBufferGeometry( 14.1, 15.1, 50, 8, Math.PI / 18 * 11, 0 );
    this.circleMesh2[4] = new THREE.Mesh( geometry12, material.clone());
    this.circleMesh2[4].position.set(30.1, 0, 0);
    this.scene.add(this.circleMesh2[4]);

    const geometry6 = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 10, 0 );
    this.circleMesh2[5] = new THREE.Mesh( geometry6, material.clone());
    this.circleMesh2[5].position.set(30.5, 18, 0);
    this.scene.add(this.circleMesh2[5]);

    const geometry11 = new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, Math.PI / 18 * 17,  0);
    this.circleMesh2[6] = new THREE.Mesh( geometry11, material.clone());
    this.circleMesh2[6].position.set(15.4, 26.5, 0);
    this.scene.add(this.circleMesh2[6]);

    const geometry2 = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 4, 0 );
    this.circleMesh2[7] = new THREE.Mesh( geometry2, material.clone());
    this.circleMesh2[7].position.set(0, 35, 0);
    this.scene.add(this.circleMesh2[7]);

    const geometry10 = new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, -Math.PI / 18 * 12.8,  0);
    this.circleMesh2[8] = new THREE.Mesh( geometry10, material.clone());
    this.circleMesh2[8].position.set(-15.4, 26.5, 0);
    this.scene.add(this.circleMesh2[8]);

    const geometry5 = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 2, 0 );
    this.circleMesh2[9] = new THREE.Mesh( geometry5, material.clone());
    this.circleMesh2[9].position.set(-30.5, 18, 0);
    this.scene.add(this.circleMesh2[9]);

    const geometry9 = new THREE.RingBufferGeometry( 14.1, 15.1, 50, 8, -Math.PI / 18 * 7.1, 0 );
    this.circleMesh2[10] = new THREE.Mesh( geometry9, material.clone());
    this.circleMesh2[10].position.set(-30.1, 0, 0);
    this.scene.add(this.circleMesh2[10]);

    const geometry = new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 7.9, 0 );
    this.circleMesh2[11] = new THREE.Mesh( geometry, material.clone());
    this.circleMesh2[11].position.set(-30.5, -18, 0);
    this.scene.add(this.circleMesh2[11]);

  }

    // 动画1
    animation() {
      const tween = {
        angle1: 0,
        angle2: 0,
        angle3: 0,
        angle4: 0,
        angle5: 0,
        angle6: 0,
      };

      let lastAngle = -Math.PI / 18;
      let newAngle = -Math.PI / 18;
      this.redArrowAnimation1 = this.arrowAnimation(-Math.PI / 18 * 1.5, 2);
      this.circleAnimation1[0] = TweenMax.to(tween, 2, {
        angle1: Math.PI / 18 * 14.5,
        onStart: () => {
          lastAngle = -Math.PI / 18;
          newAngle = -Math.PI / 18;
          this.redArrowAnimation1.play();

          // 显示红色箭头
          this.redArrow.visible = true;
          this.greyArrow.visible = false;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[0],
            new THREE.RingBufferGeometry( 14.38, 15.38, 50, 8, -Math.PI / 18, tween.angle1 ));

          this.updatePointXY(tween.angle1, -Math.PI / 18, 14.88, -14.5, -25.1);

          newAngle = tween.angle1 - Math.PI / 18;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation1[1].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.circleAnimation1[1] = TweenMax.to(tween, 4, {
        angle2: -Math.PI / 18 * 26.5,
        onStart: () => {
           lastAngle = -Math.PI / 18 * 4.7;
           newAngle = -Math.PI / 18 * 4.7;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[1],
            new THREE.RingBufferGeometry( 19, 20, 50, 8, -Math.PI / 18 * 4.7, tween.angle2));

          this.updatePointXY(tween.angle2, -Math.PI / 18 * 4.7, 19.5, -38, 0);

          newAngle = tween.angle2 - Math.PI / 18 * 4.7;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation1[2].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.circleAnimation1[2] = TweenMax.to(tween, 2, {
        angle3: Math.PI / 18 * 15,
        onStart: () => {
          lastAngle = -Math.PI / 18 * 13.5;
          newAngle = -Math.PI / 18 * 13.5;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[2],
            new THREE.RingBufferGeometry( 14.38, 15.38, 50, 8, -Math.PI / 18 * 13.5, tween.angle3 ));

          this.updatePointXY(tween.angle3, -Math.PI / 18 * 13.5, 14.88, -14.5, 25.1);

          newAngle = tween.angle3 - Math.PI / 18 * 13.5;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation1[3].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.circleAnimation1[3] = TweenMax.to(tween, 4, {
        angle4: -Math.PI / 18 * 26.5,
        onStart: () => {
          lastAngle = Math.PI / 18 * 19.4;
          newAngle = Math.PI / 18 * 19.4;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[3],
            new THREE.RingBufferGeometry( 19, 20, 50, 8, Math.PI / 18 * 19.4, tween.angle4));

          this.updatePointXY(tween.angle4, Math.PI / 18 * 19.4, 19.5, 19, 33);

          newAngle = tween.angle4 + Math.PI / 18 * 19.4;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation1[4].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.circleAnimation1[4] = TweenMax.to(tween, 2, {
        angle5: Math.PI / 18 * 15,
        onStart: () => {
          lastAngle = Math.PI / 18 * 10.35;
          newAngle = Math.PI / 18 * 10.35;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[4],
            new THREE.RingBufferGeometry( 14.39, 15.39, 50, 8, Math.PI / 18 * 10.35, tween.angle5 ));
          this.updatePointXY(tween.angle5, Math.PI / 18 * 10.35, 14.89, 29, 0);

          newAngle = tween.angle5 + Math.PI / 18 * 10.35;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation1[5].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      const redArrowAnimation = this.arrowAnimation(Math.PI / 18 * 0.5, 2);
      this.circleAnimation1[5] = TweenMax.to(tween, 4, {
        angle6: -Math.PI / 18 * 27,
        onStart: () => {
          lastAngle = Math.PI / 18 * 7.3;
          newAngle = Math.PI / 18 * 7.3;
          redArrowAnimation.play();
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh1[5],
            new THREE.RingBufferGeometry( 19, 20, 50, 8, Math.PI / 18 * 7.3, tween.angle6 ));

          this.updatePointXY(tween.angle6, Math.PI / 18 * 7.3, 19.5, 19, -32.9);

          newAngle = tween.angle6 + Math.PI / 18 * 7.3;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.buttonCircle1.visible = true;
          this.buttonCircle2.visible = true;
          (this.buttonImage1.material as any).opacity = 1;
          (this.buttonImage2.material as any).opacity = 1;

          // 隐藏红色箭头
          this.redArrow.visible = false;
          this.greyArrow.visible = true;

          // 重置箭头偏转动画
          redArrowAnimation.progress(0);
          redArrowAnimation.pause();
        },
        ease:  Linear.easeNone,
        paused: true
      });
    }

    // 动画2
    animation2() {
      const tween = {
        angle1: 0,
        angle2: 0,
        angle3: 0,
        angle4: 0,
        angle5: 0,
        angle6: 0,
        angle7: 0,
        angle8: 0,
        angle9: 0,
        angle10: 0,
        angle11: 0,
        angle12: 0,
      };

      let lastAngle = -Math.PI / 18 * 0.5;
      let newAngle = -Math.PI / 18 * 0.5;

      this.redArrowAnimation[0] = this.arrowAnimation(Math.PI / 18, 1.2);
      this.circleAnimation2[0] = TweenMax.to(tween, 1.2, {
        angle1: Math.PI / 18 * 13.3,
        onStart: () => {
          lastAngle = -Math.PI / 18 * 0.5;
          newAngle = -Math.PI / 18 * 0.5;
          this.redArrowAnimation[0].play();

          // 显示红色箭头
          this.redArrow.visible = true;
          this.greyArrow.visible = false;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[0],
            new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, -Math.PI / 18 * 0.5,  tween.angle1)
          );

          this.updatePointXY(tween.angle1, -Math.PI / 18 * 0.5, 15.3, -15.4, -26.5);

          newAngle = tween.angle1 - Math.PI / 18 * 0.5;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[1].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[1] = this.arrowAnimation(Math.PI / 18 * 1.1, 4);
      this.circleAnimation2[1] = TweenMax.to(tween, 4, {
        angle2: Math.PI / 18 * 26,
        onStart: () => {
          this.redArrowAnimation[1].play();
          lastAngle = Math.PI / 18 * 14;
          newAngle = Math.PI / 18 * 14;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[1],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 14, tween.angle2)
          );

          this.updatePointXY(tween.angle2, Math.PI / 18 * 14, 32.2, 0, -35);

          newAngle = tween.angle2 + Math.PI / 18 * 14;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[2].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[2] = this.arrowAnimation(Math.PI / 18, 1.2);
      this.circleAnimation2[2] = TweenMax.to(tween, 1.2, {
        angle3: Math.PI / 18 * 14,
        onStart: () => {
          this.redArrowAnimation[2].play();
          lastAngle = Math.PI / 18 * 5.2;
          newAngle = Math.PI / 18 * 5.2;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[2],
            new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, Math.PI / 18 * 5.2, tween.angle3 )
          );

          this.updatePointXY(tween.angle3, Math.PI / 18 * 5.2, 15.3, 15.4, -26.5);

          newAngle = tween.angle3 + Math.PI / 18 * 5.2;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[3].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[3] = this.arrowAnimation(Math.PI / 18, 4);
      this.circleAnimation2[3] = TweenMax.to(tween, 4, {
        angle4: Math.PI / 18 * 26,
        onStart: () => {
          this.redArrowAnimation[3].play();
          lastAngle = -Math.PI / 18 * 16;
          newAngle = -Math.PI / 18 * 16;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[3],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 16, tween.angle4 )
          );

          this.updatePointXY(tween.angle4, -Math.PI / 18 * 16, 32.2, 30.5, -18);

          newAngle = tween.angle4 - Math.PI / 18 * 16;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[4].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[4] = this.arrowAnimation(Math.PI / 18, 1.2);
      this.circleAnimation2[4] = TweenMax.to(tween, 1.2, {
        angle5: Math.PI / 18 * 14,
        onStart: () => {
          this.redArrowAnimation[4].play();
          lastAngle = Math.PI / 18 * 11;
          newAngle = Math.PI / 18 * 11;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[4],
            new THREE.RingBufferGeometry( 14.1, 15.1, 50, 8, Math.PI / 18 * 11, tween.angle5 )
          );

          this.updatePointXY(tween.angle5, Math.PI / 18 * 11, 14.6, 30.1, 0);

          newAngle = tween.angle5 + Math.PI / 18 * 11;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[5].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[5] = this.arrowAnimation(Math.PI / 18, 4);
      this.circleAnimation2[5] = TweenMax.to(tween, 4, {
        angle6: Math.PI / 18 * 26,
        onStart: () => {
          this.redArrowAnimation[5].play();
          lastAngle = -Math.PI / 18 * 10;
          newAngle = -Math.PI / 18 * 10;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[5],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 10, tween.angle6 )
          );

          this.updatePointXY(tween.angle6, -Math.PI / 18 * 10, 32.2, 30.5, 18);

          newAngle = tween.angle6 - Math.PI / 18 * 10;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[6].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[6] = this.arrowAnimation(Math.PI / 18 , 1.2);
      this.circleAnimation2[6] = TweenMax.to(tween, 1.2, {
        angle7: Math.PI / 18 * 14,
        onStart: () => {
          this.redArrowAnimation[6].play();
          lastAngle = Math.PI / 18 * 17;
          newAngle = Math.PI / 18 * 17;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[6],
            new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, Math.PI / 18 * 17,  tween.angle7)
          );

          this.updatePointXY(tween.angle7, Math.PI / 18 * 17, 15.3, 15.4, 26.5);

          newAngle = tween.angle7 + Math.PI / 18 * 17;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[7].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[7] = this.arrowAnimation(Math.PI / 18, 4);
      this.circleAnimation2[7] = TweenMax.to(tween, 4, {
        angle8: Math.PI / 18 * 26,
        onStart: () => {
          this.redArrowAnimation[7].play();
          lastAngle = -Math.PI / 18 * 4;
          newAngle = -Math.PI / 18 * 4;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[7],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, -Math.PI / 18 * 4, tween.angle8 )
          );

          this.updatePointXY(tween.angle8, -Math.PI / 18 * 4, 32.2, 0, 35);

          newAngle = tween.angle8 - Math.PI / 18 * 4;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[8].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[8] = this.arrowAnimation(Math.PI / 18, 1.2);
      this.circleAnimation2[8] = TweenMax.to(tween, 1.2, {
        angle9: Math.PI / 18 * 14,
        onStart: () => {
          this.redArrowAnimation[8].play();
          lastAngle = -Math.PI / 18 * 12.8;
          newAngle = -Math.PI / 18 * 12.8;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[8],
            new THREE.RingBufferGeometry( 14.8, 15.8, 50, 8, -Math.PI / 18 * 12.8, tween.angle9 )
          );

          this.updatePointXY(tween.angle9, -Math.PI / 18 * 12.8, 15.3, -15.4, 26.5);

          newAngle = tween.angle9 - Math.PI / 18 * 12.8;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[9].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[9] = this.arrowAnimation(Math.PI / 18, 4);
      this.circleAnimation2[9] = TweenMax.to(tween, 4, {
        angle10: Math.PI / 18 * 26,
        onStart: () => {
          this.redArrowAnimation[9].play();
          lastAngle = Math.PI / 18 * 2;
          newAngle = Math.PI / 18 * 2;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[9],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 2, tween.angle10 )
          );

          this.updatePointXY(tween.angle10, Math.PI / 18 * 2, 32.2, -30.5, 18);

          newAngle = tween.angle10 + Math.PI / 18 * 2;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[10].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[10] = this.arrowAnimation(Math.PI / 18, 1.2);
      this.circleAnimation2[10] = TweenMax.to(tween, 1.2, {
        angle11: Math.PI / 18 * 14,
        onStart: () => {
          this.redArrowAnimation[10].play();
          lastAngle = -Math.PI / 18 * 7.1;
          newAngle = -Math.PI / 18 * 7.1;
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[10],
            new THREE.RingBufferGeometry( 14.1, 15.1, 50, 8, -Math.PI / 18 * 7.1, tween.angle11 )
          );

          this.updatePointXY(tween.angle11, -Math.PI / 18 * 7.1, 14.6, -30.1, 0);

          newAngle = tween.angle11 - Math.PI / 18 * 7.1;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.circleAnimation2[11].play();
        },
        ease:  Linear.easeNone,
        paused: true
      });

      this.redArrowAnimation[11] = this.arrowAnimation(Math.PI / 18, 4);
      this.circleAnimation2[11] = TweenMax.to(tween, 4, {
        angle12: Math.PI / 18 * 26.4,
        onStart: () => {
          lastAngle = Math.PI / 18 * 7.9;
          newAngle = Math.PI / 18 * 7.9;
          this.redArrowAnimation[11].play();
        },
        onUpdate: () => {
          this.updateCircle(this.circleMesh2[11],
            new THREE.RingBufferGeometry( 31.7, 32.7, 50, 8, Math.PI / 18 * 7.9, tween.angle12 )
          );

          this.updatePointXY(tween.angle12, Math.PI / 18 * 7.9, 32.2, -30.5, -18);

          newAngle = tween.angle12 + Math.PI / 18 * 7.9;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        onComplete: () => {
          this.redArrow.rotation.set(0, 0, 0);
          this.buttonCircle1.visible = true;
          this.buttonCircle2.visible = true;
          (this.buttonImage1.material as any).opacity = 1;
          (this.buttonImage2.material as any).opacity = 1;

          // 隐藏红色箭头
          this.redArrow.visible = false;
          this.greyArrow.visible = true;
        },
        ease:  Linear.easeNone,
        paused: true
      });

    }

    // 箭头偏转动画
    arrowAnimation(endAngle: any, duration: number) {
      const tween = {
        angle: 0
      };

      let lastAngle = 0;
      let newAngle = 0;

      const animation = TweenMax.to(tween, duration, {
        angle: endAngle,
        onUpdate: () => {
          newAngle = tween.angle;
          this.redArrow.rotateZ(newAngle - lastAngle);
          lastAngle = newAngle;
        },
        ease:  Linear.easeNone,
        paused: true
      });

      return animation;
    }

    // 更新模型
    updateCircle(mesh: any, geometry: any) {
      mesh.geometry.dispose();
      mesh.geometry = geometry;
    }

    // 更新电子位置
    updatePointXY(angle: number, thrtaStart: number, radius: number,  x: number, y: number) {
    this.positron.position.x = Math.cos(angle + thrtaStart) * radius + x;
    this.positron.position.y = Math.sin(angle + thrtaStart) * radius + y;
  }

    // 重置动画1
    resetAnimation1() {
      for (let i = 0; i < this.circleAnimation1.length; i++) {
        this.circleAnimation1[i].progress(0);
        this.circleAnimation1[i].pause();
      }

       this.redArrowAnimation1.progress(0);
       this.redArrowAnimation1.pause();

      this.redArrow.rotation.set(0, 0, 0);
      this.positron.position.set(0, -27, 0);
    }

    // 重置动画2
    resetAnimation2() {
      for (let i = 0; i < this.circleAnimation2.length; i++) {
        this.circleAnimation2[i].progress(0);
        this.circleAnimation2[i].pause();
      }

      for (let k = 0; k < this.redArrowAnimation.length; k++) {
        this.redArrowAnimation[k].progress(0);
        this.redArrowAnimation[k].pause();
      }

      this.redArrow.rotation.set(0, 0, 0);
      this.positron.position.set(0, -27, 0);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

      // 显示灰色箭头
      this.redArrow.visible = false;
      this.greyArrow.visible = true;

      this.resetAnimation1();
      this.resetAnimation2();

      this.button1Animation = false;
      this.button2Animation = false;

      this.playButtonImage.visible = true;

      this.buttonCircle1.visible = true;
      this.buttonCircle2.visible = true;

      this.buttonImage1.visible = true;
      this.buttonImage2.visible = false;

      this.backgroundImage1.visible = true;
      this.backgroundImage2.visible = false;

      (this.buttonImage1.material as any).opacity = 1;
      (this.buttonImage2.material as any).opacity = 1;
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 0, 200);

        for (let i = 0; i < 21; i++) {
            this.orbit.reset();
        }
    }
}
