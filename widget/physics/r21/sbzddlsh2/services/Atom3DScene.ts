/**
 *初始化3d场景类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/12/12 10:10
 */
import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { Atom3DModel } from './Atom3DModel';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
import { Line } from '../../../../../src/three/component/Line';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
OBJLoader(THREE);

const OrbitControls = require('three-orbitcontrols');

import * as atom1 from '../sub_static/model/hei01.fbx';
import * as atom2 from '../sub_static/model/hei02.fbx';
import * as atom3 from '../sub_static/model/hei03.fbx';
import * as atom4 from '../sub_static/model/hei04.fbx';
import * as fbxImage from '../sub_static/model/shuaibian.jpg';
import * as xPointPath from '../sub_static/point.png';
import * as xPath from '../sub_static/x.png';
import { Linear, TweenMax } from 'gsap';
import { CircleLine } from '../../../../../src/three/component/CircleLine';

export class Atom3DScene extends ThreeBase {
    private controls: any;

    coneCurve3DModel: Atom3DModel;

    //磁场的起始点
  //磁场的起始点
  magneticBeginX = -27;
  magneticBeginY = 15;

  //磁感线圆点
  private magneticPoint: any = [];

    //磁感线X
    private magneticX: any = [];
    group: THREE.Group;

    //磁感线本身
    private magneticLine: any = [];


  // 文字
  text: any;

  sphere: any;
  atom_red: any;
  atom_purple: any;
  atom_green: any;
  atom_blue: any;

  cameraZ: number;

  shakeAnimation: any;
  alphaRedAnimation: any;
  alphaPurpleAnimation: any;
  betaBuleAnimation: any;
  betaGreenAnimation: any;

  isAlpha: boolean;

  //运动轨迹线
  redCircleLine: any;
  purpleCircleLine: any;
  greenCircleLine: any;
  blueCircleLine: any;

  //箭头
  redArrow: any;
  purpleArrow: any;
  greenArrow: any;
  blueArrow: any;

  //圆心
  redPoint: any;
  purplePoint: any;
  greenPoint: any;
  bluePoint: any;

  //文字
  redText: any;
  purpleText: any;
  greenText: any;
  blueText: any;

    private render = () => {
        this.enableAdsorption();
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
        this.group = new THREE.Group();
        this.text = new THREE.Group();
        this.isAlpha = true;

        this.init();
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();
       this.initBall();
       this.initMagentic();

       this.render();
    }

  preload() {
    console.log(atom1);
    console.log(atom2);
    console.log(atom3);
    console.log(atom4);
    console.log(fbxImage);
  }

    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.add(this.group);
      this.scene.background = new THREE.Color( 0x000000 );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
      const scale = window.innerWidth / 50;
      const left    = this.width / - scale;
      const right   = this.width / scale;
      const top     = this.height / scale;
      const bottom  = this.height / - scale;
      const near = -500;
      const far = 1000;

      this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera.position.set(0, 0, 55);
      this.cameraZ = this.camera.position.z;
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
    const orbit = new OrbitControls(this.camera, this.renderer.domElement);
    orbit.enableZoom = true;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    orbit.enableDamping = true;
    //是否可以缩放
    orbit.enableZoom = true;
    //是否自动旋转
    orbit.autoRotate = false;
    //设置相机距离原点的最远距离
    orbit.minDistance = 1;
    //设置相机距离原点的最远距离
    orbit.maxDistance = 4000;
    //是否开启右键拖拽
    orbit.enablePan = false;
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

  /** 创建磁感线 **/
  initMagentic() {
    /* 1.磁感线圆柱 */
    const line1 = new THREE.CylinderGeometry(0.2, 0.2, 20, 40, 40);
    //圆柱材质
    const material = new THREE.MeshPhongMaterial({
      color: '#dcdbdc',
      //材质自发光颜色色
      side: THREE.DoubleSide,
      flatShading: true
    });
    //圆柱
    // const cube = new THREE.Mesh(line1, material);
    const cube = this.createArrow(1, 19, 0x00E3E3, 0.1, 0.05, 1); //'#dcdbdc'
    cube.position.z = -0.5;
    cube.rotateX(-Math.PI / 2);

    const circle = ThreeUtil.createImg(2, 2, xPath, 0, 0);
    (circle as any).material.side = THREE.FrontSide;
    circle.position.z = 10;

    /* 3.磁感线圆点  */
    const point = ThreeUtil.createImg(1, 1,  xPointPath, 0, 0);
    (point as any).material.side = THREE.BackSide;
    // point.rotateX(Math.PI / 2);
    point.position.z = -10.001;

    const row = 6, col = 10;
    for (let i = 0; i < row; i++) {
      const y = this.magneticBeginY - i * 6;
      for (let j = 0; j < col; j++) {
        const x = this.magneticBeginX + j * 6;
        //创建磁感线
        const magentCube = cube.clone();
        const magentCircle = circle.clone();
        const magentPoint = point.clone();

        magentCircle.position.x = x;
        magentCircle.position.y = y;
        magentCircle.visible = true;

        magentCube.position.x = x;
        magentCube.position.y = y;
        // magentCube.visible = false;

        magentPoint.position.x = x;
        magentPoint.position.y = y;
        magentPoint.visible = true;

        this.magneticX.push(magentCircle);
        this.magneticLine.push(magentCube);
        this.magneticPoint.push(magentPoint);

        this.scene.add(magentCube);
        this.scene.add(magentCircle);
        this.scene.add(magentPoint);
      }
    }
  }

  //創建箭頭
  createArrow(coneLength: number, cylinderLength: number, color?: any, coneRadius?: number, cylinderRadius?: number, opacity?: number) {
    coneRadius = !coneRadius ?  2 : coneRadius;
    cylinderRadius = !cylinderRadius ?  1 : cylinderRadius;
    color = !color ?  0x000000 : color;
    const arrow = new THREE.Object3D();

    const geometry = new THREE.ConeBufferGeometry( coneRadius, coneLength, 32 );
    const material = new THREE.MeshBasicMaterial( {color: color, transparent: true, opacity: opacity} );
    const cone = new THREE.Mesh( geometry, material );

    arrow.add( cone );

    const geometryCylinder = new THREE.CylinderGeometry( cylinderRadius, cylinderRadius, cylinderLength, 32 );
    const materialCylinder = new THREE.MeshBasicMaterial( {color: color, transparent: true, opacity: opacity} );
    const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );
    arrow.add( cylinder );

    cone.position.set(0, cylinderLength / 2 + coneLength / 2, 0);

    return arrow;
  }

  showScene() {
    this.group.visible = true;
    // 禁止旋转
    this.controls.enableRotate = true;
    this.controls.enableZoom = false;
    (window as any).viewHandler.auroraScenes.macroModel.controls.noRotate = true;
    this.resetCamera();
  }

  hideScene() {
    this.group.visible = false;
    this.controls.enableZoom = false;
  }

  resetCamera() {
    this.camera.position.set(0, 0, 55);
    this.cameraZ = this.camera.position.z;
    this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    (this.camera as any).zoom = 1;
    (this.camera as any).updateProjectionMatrix();
  }

  reset() {
    this.resetAlphaMagnetic();
    this.resetCamera();
  }

  // 初始化磁场电子
  initBall() {
    //初始黑色电子
    const SphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMat = new THREE.MeshLambertMaterial({//创建材料
      color: '#6e6e6e',
      wireframe: false
    });
    this.sphere = new THREE.Mesh(SphereGeometry, sphereMat);
    this.sphere.position.set(-6, 0, 0);
    this.scene.add(this.sphere);

    //红色电子
    const atomRedGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const redMat = new THREE.MeshLambertMaterial({//创建材料
      color: '#f15454',
      wireframe: false
    });
    this.atom_red = new THREE.Mesh(atomRedGeometry, redMat);
    this.atom_red.position.set(-6, 0.5, 0);
    this.scene.add(this.atom_red);

    //紫色电子
    const atompurpleGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const purpleMat = new THREE.MeshLambertMaterial({//创建材料
      color: '#B66ad3',
      wireframe: false
    });
    this.atom_purple = new THREE.Mesh(atompurpleGeometry, purpleMat);
    this.atom_purple.position.set(-6, -0.6, 0);
    this.scene.add(this.atom_purple);

    //紫色电子
    const atomGreenGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const greenMat = new THREE.MeshLambertMaterial({//创建材料
      color: '#6fd85f',
      wireframe: false
    });
    this.atom_green = new THREE.Mesh(atomGreenGeometry, greenMat);
    this.atom_green.position.set(18, 0.5, 0);
    this.scene.add(this.atom_green);

    //紫色电子
    const atomBuleGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const blueMat = new THREE.MeshLambertMaterial({//创建材料
      color: '#5681d3',
      wireframe: false
    });
    this.atom_blue = new THREE.Mesh(atomBuleGeometry, blueMat);
    this.atom_blue.position.set(18, -0.6, 0);
    this.scene.add(this.atom_blue);

    this.atom_red.visible = false;
    this.atom_purple.visible = false;
    this.atom_green.visible = false;
    this.atom_blue.visible = false;
  }

  ballAnimation() {
    const tween = {
      x: this.sphere.position.x + 0.1,
    };

    // 抖动运动
    this.shakeAnimation = TweenMax.to(tween, 0.1, {
      x: this.sphere.position.x - 0.1,
      onStart: () => {
      },
      onUpdate: () => {
        this.sphere.position.set(tween.x, 0, 0);
      },
      onComplete: () => {
        this.sphere.visible = false;

        if (this.isAlpha) {
          this.atom_red.visible = true;
          this.atom_purple.visible = true;
          this.alphaCricleAnimation();
        } else {
          this.atom_green.visible = true;
          this.atom_blue.visible = true;
          this.betaCicleAnimation();
        }
      },
      ease:  Linear.easeNone,
      paused: true,
    });
    this.shakeAnimation.yoyo(true).repeat(25).timeScale(1).play();
  }

  alphaCricleAnimation() {
    const tween = {
      angle: 0,
    };
    const purpleTween = {
      angle: 0,
    };

    // 圆周运动
    this.alphaRedAnimation = TweenMax.to(tween, 2, {
      angle: Math.PI * 2,

      onStart: () => {
        this.redCircleLine = new CircleLine().createCircleLine({
          aX: -12,
          aY: 0,
          xRadius: 6,
          yRadius: 6,
          aStartAngle: 0,
          aEndAngle: Math.PI * 2,
          aClockwise: false,
          aRotation: 0,
          color: '#f15454',
          lineWidth: 0.005,
          style: 2
        });
        this.scene.add(this.redCircleLine);
      },
      onUpdate: () => {
        this.atom_red.position.x = 6 * Math.cos(tween.angle) - 12;
        this.atom_red.position.y = 6 * Math.sin(tween.angle);
      },
      onComplete: () => {
        this.shakeAnimation.progress(0);
        this.shakeAnimation.pause();
        this.shakeAnimation = null;
      },
      ease:  Linear.easeNone,
      paused: true,
      repeat: -1
    });

    this.alphaPurpleAnimation = TweenMax.to(purpleTween, 2, {
      angle: Math.PI * 2,

      onStart: () => {
        this.alphaInitText();
        this.purpleCircleLine = new CircleLine().createCircleLine({
          aX: 6,
          aY: 0,
          xRadius: -12,
          yRadius: -12,
          aStartAngle: 0,
          aEndAngle: Math.PI * 2,
          aClockwise: false,
          aRotation: 0,
          color: '#b66ad3',
          lineWidth: 0.005,
          style: 2
        });
        this.scene.add(this.purpleCircleLine);
      },
      onUpdate: () => {
        this.atom_purple.position.x = -12 * Math.cos(tween.angle) + 6;
        this.atom_purple.position.y = -12 * Math.sin(tween.angle);
      },
      onComplete: () => {
      },
      ease:  Linear.easeNone,
      paused: true,
      repeat: -1
    });

    this.alphaRedAnimation.play();
    this.alphaPurpleAnimation.play();

  }

  betaCicleAnimation() {
    const tween = {
      angle: 0,
    };
    const  blueTween = {
      angle: 0,
    };
    this.betaGreenAnimation = TweenMax.to(tween, 2, {
      angle: Math.PI * 2,

      onStart: () => {
        this.betaInitText();
        this.greenCircleLine = new CircleLine().createCircleLine({
          aX: 12.5,
          aY: 0,
          xRadius: 5.5,
          yRadius: 5.5,
          aStartAngle: 0,
          aEndAngle: Math.PI * 2,
          aClockwise: false,
          aRotation: 0,
          color: '#6fd85f',
          lineWidth: 0.005,
          style: 2
        });
        this.scene.add(this.greenCircleLine);
      },
      onUpdate: () => {
        this.atom_green.position.x = 5.5 * Math.cos(tween.angle) + 12.5;
        this.atom_green.position.y = 5.5 * Math.sin(tween.angle);
      },
      onComplete: () => {
        this.shakeAnimation.progress(0);
        this.shakeAnimation.pause();
        this.shakeAnimation = null;
      },
      ease:  Linear.easeNone,
      paused: true,
      repeat: -1
    });

    this.betaBuleAnimation = TweenMax.to(blueTween, 2, {
      angle: -Math.PI * 2,

      onStart: () => {
        this.blueCircleLine = new CircleLine().createCircleLine({
          aX: 6,
          aY: 0,
          xRadius: 12,
          yRadius: 12,
          aStartAngle: 0,
          aEndAngle: -Math.PI * 2,
          aClockwise: true,
          aRotation: 0,
          color: '#4B8EEE',
          lineWidth: 0.005,
          style: 2
        });
        this.scene.add(this.blueCircleLine);
      },
      onUpdate: () => {
        this.atom_blue.position.x = 12 * Math.cos(blueTween.angle) + 6;
        this.atom_blue.position.y = 12 * Math.sin(blueTween.angle);
      },
      onComplete: () => {
      },
      ease:  Linear.easeNone,
      paused: true,
      repeat: -1
    });

    this.betaGreenAnimation.play();
    this.betaBuleAnimation.play();
  }

  //是否产生吸附效果
  enableAdsorption() {
    const cameraPositionZ = this.camera.position.z;

    if (cameraPositionZ > 0 && 54.9 <= cameraPositionZ && cameraPositionZ <= 55.1) {
      this.camera.position.set(0, 0, 55);
      this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    }

    if (cameraPositionZ < 0 && -55.1 <= cameraPositionZ && cameraPositionZ <= -54.5) {
      this.camera.position.set(0, 0, -55);
      this.camera.rotation.set(-3.14, 0, -3.14);
    }




    if (this.camera.position.z === this.cameraZ) {
      this.showMagneticX();
      this.hideMagnetic();
    } else if (this.camera.position.z === -this.cameraZ) {
      this.showMageneticPoint();
      this.hideMagneticX();
    } else {
      this.hideMageneticPoint();
      this.hideMagneticX();
      this.showMagnetic();
    }
  }

  //圆圈的半径和文字
  crateRadius(color: any, position: any, length: any) {
    //
    const atomGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const atomMat = new THREE.MeshLambertMaterial({//创建材料
      color: color,
      wireframe: false
    });
    const radiusPoint = new THREE.Mesh(atomGeometry, atomMat);
    radiusPoint.position.set(position.x, position.y, position.z);

    const radiuArrow = this.createArrow(1, length, color, 0.4, 0.2);
    radiuArrow.position.set(0, length / 2, 0);
    radiusPoint.rotation.set(0, 0, Math.PI / 4);
    radiusPoint.add(radiuArrow);

    return radiusPoint;

    // this.redText = ThreeUtil.createNewRomanText(text, textPosition.x, textPosition.y, textPosition.y, '#000000', 0.05);
    // this.scene.add(this.redText);
  }

  alphaInitText() {

    this.redPoint = this.crateRadius('#f15454', new THREE.Vector3(-12, 0, 0), 4.5);
    this.redText = ThreeUtil.createNewRomanText('r₁', -12, 4, 0, '#ffffff', 0.05);
    this.scene.add(this.redText);
    this.scene.add(this.redPoint);

    this.purplePoint = this.crateRadius('#b66ad3', new THREE.Vector3(6, 0, 0), 10.5);
    this.purpleText = ThreeUtil.createNewRomanText('r₂', 6, 6, 0, '#ffffff', 0.05);
    this.scene.add(this.purpleText);
    this.scene.add(this.purplePoint);
  }

  betaInitText() {
    this.greenPoint = this.crateRadius('#6fd85f', new THREE.Vector3(12.5, 0, 0), 4.3);
    this.greenText = ThreeUtil.createNewRomanText('r₁', 12.5, 4, 0, '#ffffff', 0.05);
    this.scene.add(this.greenText);
    this.scene.add(this.greenPoint);

    this.bluePoint = this.crateRadius('#4B8EEE', new THREE.Vector3(6, 0, 0), 10.5);
    this.blueText = ThreeUtil.createNewRomanText('r₂', 3.5, 6.5, 0, '#ffffff', 0.05);
    this.scene.add(this.blueText);
    this.scene.add(this.bluePoint);
  }

  //重置alpha场景
  resetAlphaMagnetic() {
    this.resetElement();
    this.sphere.position.set(-6, 0, 0);
  }

  //重置beta场景
  resetBetaMagnetic() {
    this.resetElement();
    this.sphere.position.set(18, 0, 0);
  }

  resetElement() {
    this.sphere.visible = true;
    this.atom_red.visible = false;
    this.atom_purple.visible = false;
    this.atom_green.visible = false;
    this.atom_blue.visible = false;

    if (this.shakeAnimation) {
      this.shakeAnimation.progress(0);
      this.shakeAnimation.pause();
      this.shakeAnimation = null;
    }

    if (this.alphaRedAnimation) {
      this.alphaRedAnimation.progress(0);
      this.alphaRedAnimation.pause();
      this.alphaRedAnimation = null;
    }

    if (this.alphaPurpleAnimation) {
      this.alphaPurpleAnimation.progress(0);
      this.alphaPurpleAnimation.pause();
      this.alphaPurpleAnimation = null;
    }

    if (this.betaGreenAnimation) {
      this.betaGreenAnimation.progress(0);
      this.betaGreenAnimation.pause();
      this.betaGreenAnimation = null;
    }

    if (this.betaBuleAnimation) {
      this.betaBuleAnimation.progress(0);
      this.betaBuleAnimation.pause();
      this.betaBuleAnimation = null;
    }

    this.scene.remove(this.redArrow);
    this.scene.remove(this.redPoint);
    this.scene.remove(this.redText);
    this.scene.remove(this.redCircleLine);

    this.scene.remove(this.purpleArrow);
    this.scene.remove(this.purplePoint);
    this.scene.remove(this.purpleText);
    this.scene.remove(this.purpleCircleLine);

    this.scene.remove(this.greenArrow);
    this.scene.remove(this.greenPoint);
    this.scene.remove(this.greenText);
    this.scene.remove(this.greenCircleLine);

    this.scene.remove(this.blueArrow);
    this.scene.remove(this.bluePoint);
    this.scene.remove(this.blueText);
    this.scene.remove(this.blueCircleLine);
  }

  //抖动动画
  getShakeComplete(): boolean {
    return this.shakeAnimation && this.shakeAnimation.progress() > 0 && this.shakeAnimation.progress() < 1;
  }

  getAlphaComplete(): boolean {
    return this.alphaRedAnimation && this.alphaRedAnimation.progress() > 0 && this.alphaRedAnimation.progress() < 1;
  }

  getBetaComplete(): boolean {
    return this.betaGreenAnimation && this.betaGreenAnimation.progress() > 0 && this.betaGreenAnimation.progress() < 1;
  }

  animationPause() {
    if (this.getShakeComplete()) {
        this.shakeAnimation.pause();
    }

    if (this.isAlpha) {
      if (this.getAlphaComplete()) {
        this.alphaRedAnimation.pause();
        this.alphaPurpleAnimation.pause();
      }
    } else {
      if (this.getBetaComplete()) {
        this.betaGreenAnimation.pause();
        this.betaBuleAnimation.pause();
      }
    }
  }

  animationResume() {
    if (this.isAlpha) {
      if (this.getAlphaComplete()) {
        this.alphaRedAnimation.resume();
        this.alphaPurpleAnimation.resume();
      }
    } else {
      if (this.getBetaComplete()) {
        this.betaGreenAnimation.resume();
        this.betaBuleAnimation.resume();
      }
    }
  }

  //显示磁感线底部x
  private showMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = true;
    }
  }
  //隐藏磁感线底部X
  private hideMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = false;
    }
  }

  //显示磁感线
  private showMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = true;
    }
  }
  //隐藏磁感线
  private hideMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = false;
    }
  }

  //显示磁感线顶部圆点
  private showMageneticPoint(): void {
    for (let i = 0; i < this.magneticPoint.length; i++) {
      (this.magneticPoint[i] as THREE.Object3D).visible = true;
    }
  }
  //显示磁感线顶部圆点
  private hideMageneticPoint(): void {
    for (let i = 0; i < this.magneticPoint.length; i++) {
      (this.magneticPoint[i] as THREE.Object3D).visible = false;
    }
  }

}
