/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { Group, Mesh, WebGLRenderer } from 'three';
import { TweenMax, Power0 } from 'gsap';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { CommonUtil } from '../../../../../src/util/CommonUtil';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import * as xPath from '../sub_static/x.png';
import * as xPointPath from '../sub_static/point.png';

import * as zmxPath from '../sub_static/nucleus/yzh/zmx.gltf';
import * as zmxBin from '../sub_static/nucleus/yzh/zmx.bin';
import * as ym27 from '../sub_static/nucleus/yzh/Material_56_baseColor.png';
import * as ym28 from '../sub_static/nucleus/yzh/Material_57_baseColor.png';

import * as dzPath from '../sub_static/nucleus/beta/dz.gltf';
import * as dzBin from '../sub_static/nucleus/beta/dz.bin';
import * as fzPath from '../sub_static/nucleus/beta/fzzzwz.gltf';
import * as fzBin from '../sub_static/nucleus/beta/fzzzwz.bin';
import * as bm29 from '../sub_static/nucleus/beta/Material58_baseColor.png';
import * as bm30 from '../sub_static/nucleus/beta/Material59_baseColor.png';

import * as alzPath from '../sub_static/nucleus/alpha/alz.gltf';
import * as alzBin from '../sub_static/nucleus/alpha/alz.bin';
import * as alM27 from '../sub_static/nucleus/alpha/Material_56_baseColor.png';
import * as alM28 from '../sub_static/nucleus/alpha/Material_57_baseColor.png';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class Nucleus3DModel extends ThreeBase {

  browserInfo: BrowserInfo;
  //原子核
  nucleusModel: any;
  //α粒子
  alphaModel: any;
  //电子
  private electronModel: any;
  //反电子中微子
  private antineutrinoModel: any;
  //磁感线X
  private magneticX: any = [];
  //磁感线圆点
  private magneticPoint: any = [];
  //磁感线本身
  private magneticLine: any = [];
  //是否是匀强磁场
  uniformMagnetic = false;
  //磁场的起始点
  magneticBeginX = -25;
  magneticBeginY = 15;
  //运动轨迹半径
  radius = 6;
  //粒子显示区域
  magneticRangeX = -31;
  magneticRangeY = 21;

  cameraZ: number;

  //螺旋初始点
  private startPosition: any;
  /*
  * alpha粒子衰变动画
  * */
  //alphal粒子螺旋动画初始值
  private alphaTween = {
    x: 0,
    y: 0,
    angle: Math.PI,
    z: 0
  };
  //非匀强磁场随机射出粒子动画
  alphaRandomTween: any;
  //匀强磁场螺旋动画
  alphaCircleTween: any;
  //匀强磁场切线动画
  alphaLineTween: any;
  /*
  * Beta粒子衰变动画
  * */
  //Beta电子螺旋运动初始值
  private betaTween = {
    x: 0,
    y: 0,
    angle: Math.PI,
    z: 0
  };
  //反电子中微子动画
  antineutrinoTween: any;
  //beta电子随机发射动画
  betaRandomTween: any;
  //beta电子螺旋动画
  betaCircleTween: any;
  //beta电子切线动画
  betaLineTween: any;

  //记录上一个位置的点
  lastPositionX: number;

  //alpha初始状态
  initAlphaStatus = true;
  //beta电子初始状态
  initBetaStatus = true;

  //按钮控制
  button: any;

  //螺旋运动圆心
  centerPoint = {x: 0, y: 0};

  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.button = (window as any).viewHandler.viewModel.$data;
    this.init();
  }

  async init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initMagentic();
    this.initGltfLoader();
    this.initWebGLRenderer();
    this.initControl();
    this.preload();
    this.render();
    this.initMobileLayer();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  /** 初始化镜头 **/
  initCamera(): void {

    const left = this.width / -50;
    const right = this.width / 50;
    const top = this.height / 50;
    const bottom = this.height / -50;
    const near = -500;
    const far = 1000;

    this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 55);
    this.cameraZ = this.camera.position.z;

    this.getRandomEdgePoint();
  }

  initMobileLayer() {
    if (this.browserInfo.isMobile) {
      (window as any).viewHandler.viewModel.$data.isMobile = true;
      if ((window as any).viewHandler.viewModel.$data.isFold) {
        (window as any).viewHandler.viewModel.$data.isAppear = true;
      } else {
        (window as any).viewHandler.viewModel.$data.isAppear = false;
      }

    } else {
      (window as any).viewHandler.viewModel.$data.isMobile = false;
      (window as any).viewHandler.viewModel.$data.isAppear = true;
    }
  }

  preload() {
    console.log(zmxBin);
    console.log(ym27);
    console.log(ym28);
    console.log(dzPath);
    console.log(dzBin);
    console.log(fzPath);
    console.log(fzBin);
    console.log(bm29);
    console.log(bm30);

    console.log(alzPath);
    console.log(alzBin);
    console.log(alM27);
    console.log(alM28);
  }

  /** 创建磁感线 **/
  initMagentic() {
    /* 1.磁感线圆柱 */
    const line1 = new THREE.CylinderGeometry(0.2, 0.2, 20, 40, 40);
    //圆柱材质
    const material = new THREE.MeshPhongMaterial({
      color: 0x2BBCFF,
      //材质自发光颜色色
      side: THREE.DoubleSide,
      flatShading: true
    });
    //圆柱
    const cube = new THREE.Mesh(line1, material);
    cube.rotateX(Math.PI / 2);

    /* 2.磁感线本身 */
    //圆柱顶部×  '../sub_static/x.png'
    const xMap = new THREE.TextureLoader().load(xPath as any);
    const geometry = new THREE.CircleGeometry(0.5, 32);
    //顶部x 材质·
    const material2 = new THREE.MeshPhongMaterial({
      color: 0XFFFFFF,
      //材质自发光颜色色 emissive: 0x072534,
      side: THREE.FrontSide,
      map: xMap,
      flatShading: true
    });
    //圆圈1
    const circle = new THREE.Mesh(geometry, material2);
    circle.position.z = 10;

    /* 3.磁感线圆点  */
    const pMap = new THREE.TextureLoader().load(xPointPath as any);
    const pointGeometry = new THREE.CircleGeometry(0.5, 32);
    const pointMaterial = new THREE.MeshPhongMaterial({
      color: 0XFFFFFF,
      side: THREE.BackSide,
      map: pMap,
      flatShading: true
    });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    point.position.z = -10.001;

    const row = 6, col = 8;
    for (let i = 0; i < row; i++) {
      const y = this.magneticBeginY - i * 6;
      for (let j = 0; j < col; j++) {
        const x = this.magneticBeginX + j * 7;
        //创建磁感线
        const magentCube = cube.clone();
        const magentCircle = circle.clone();
        const magentPoint = point.clone();

        magentCircle.position.x = x;
        magentCircle.position.y = y;
        magentCircle.visible = false;

        magentCube.position.x = x;
        magentCube.position.y = y;
        magentCube.visible = false;

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

  /**加载模型*/
  async initGltfLoader() {
    const gltf: any = await this.gltfLoader(zmxPath as any);
    gltf.scene.traverse((child: any) => {
      if (child instanceof Group) {
        this.nucleusModel = child;
        this.nucleusModel.scale.set(0.3, 0.3, 0.3);
        this.nucleusModel.visible = false;
        this.scene.add(this.nucleusModel);
      }
    });
    //alpha 粒子
    const alpha: any = await this.gltfLoader(alzPath as any);
    alpha.scene.traverse((child: any) => {
      if (child instanceof Group) {
        this.alphaModel = child;
        this.alphaModel.scale.set(0.3, 0.3, 0.3);
        this.alphaModel.visible = false;
        this.scene.add(this.alphaModel);
      }
    });
    //电子
    const electronModel: any = await this.gltfLoader(dzPath as any);
    electronModel.scene.traverse((child: any) => {
      if (child instanceof Mesh) {
        this.electronModel = child;
        this.electronModel.scale.set(0.3, 0.3, 0.3);
        this.electronModel.visible = false;
        this.scene.add(this.electronModel);
      }
    });
    //反电子中微子
    const antineutrinoModel: any = await this.gltfLoader(fzPath as any);
    antineutrinoModel.scene.traverse((child: any) => {
      if (child instanceof Mesh) {
        this.antineutrinoModel = child;
        this.antineutrinoModel.scale.set(0.3, 0.3, 0.3);
        this.antineutrinoModel.visible = false;
        this.scene.add(this.antineutrinoModel);
      }
    });
  }

  /**初始化渲染器*/
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      //背景透明
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 0);
    this.renderer.setSize(this.width, this.height);
    const element = this.domElement.appendChild(this.renderer.domElement);
  }

  /**初始化控制器*/
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

  /**初始化光源*/
  initLight(): void {
    this.lights = [];
    this.scene.add(new THREE.AmbientLight(0x666666));
    this.lights[0] = new THREE.DirectionalLight(0xdfebff, 1);
    this.lights[0].position.set(50, 200, 100);
    this.lights[0].position.multiplyScalar(1.3);
    this.lights[0].castShadow = true;
    this.lights[0].shadow.mapSize.width = 1024;
    this.lights[0].shadow.mapSize.height = 1024;
    const d = 300;
    (this.lights[0] as any).shadow.camera.left = -d;
    (this.lights[0] as any).shadow.camera.right = d;
    (this.lights[0] as any).shadow.camera.top = d;
    (this.lights[0] as any).shadow.camera.bottom = -d;
    (this.lights[0] as any).shadow.camera.far = 1000;
    this.scene.add(this.lights[0]);
  }

  private render = () => {

    if (this.browserInfo.os === 'Android') {
      setTimeout(() => {
        this.render();
      }, 1000 / 33);
    } else if (this.browserInfo.browser.toLowerCase() === 'safari') {
      setTimeout(() => {
        this.render();
      }, 1000 / 33);
    } else {
      requestAnimationFrame(this.render);
    }

    //显示磁感线和吸附效果
    if (this.uniformMagnetic === true) {
      this.showMagnetic();
      this.enableAdsorption();
    } else {
      this.hideMagnetic();
      this.hideMagneticX();
      this.hideMageneticPoint();
    }
    //判断alpha粒子是否超出磁感线
    if (this.alphaModel && this.checkPostionOutMagnetic(this.alphaModel.position.x, this.alphaModel.position.y)) {
      this.alphaModel.visible = false;
      (window as any).viewHandler.viewModel.$data.isPlay = false;
      this.destoryAlphaAnimation();
    }
    //判断反电子中微子和电子是否超出磁感线
    const antineutrinoIsOut = this.antineutrinoModel &&
      this.checkPostionOutMagnetic(this.antineutrinoModel.position.x, this.antineutrinoModel.position.y);
    const electronIsOut = this.electronModel &&
      this.checkPostionOutMagnetic(this.electronModel.position.x, this.electronModel.position.y);
    if (antineutrinoIsOut) {
      (window as any).viewHandler.viewModel.$data.isPlay = false;
      this.antineutrinoModel.visible = false;
    }
    if (electronIsOut) {
      (window as any).viewHandler.viewModel.$data.isPlay = false;
      this.electronModel.visible = false;
      this.destoryBetaAnimation();
    }
    this.renderer.render(this.scene, this.camera);
  }
  //随机获取边缘的点
  private getRandomEdgePoint() {
    //随机点
    const xRandom = CommonUtil.getRandomInt(this.magneticRangeX, 0 - this.magneticRangeX);
    const yRandom = CommonUtil.getRandomInt(this.magneticRangeY, 0 - this.magneticRangeY);
    let x: number;
    let y: number;
    //边缘顶点
    const xVertex = [0 - this.magneticRangeX, this.magneticRangeX];
    const yVertex = [0 - this.magneticRangeY, this.magneticRangeY];
    const i = CommonUtil.getRandomInt(1, 4);
    if (i === 1 || i === 2) {
      x = xVertex[i - 1];
      y = yRandom;
    } else {
      y = yVertex[i - 3];
      x = xRandom;
    }
    return [x, y];
  }
  //随机获取边缘的两个相对中心的对称点
  private getRandomEdgeSymmetricPoint() {
    const p1 = this.getRandomEdgePoint();
    const p2 = [0 - p1[0], 0 - p1[1]];
    return [p1, p2];
  }
  //判断坐标否超出磁感线
  private checkPostionOutMagnetic(x: number, y: number) {
    return x <= this.magneticRangeX || x >= 0 - this.magneticRangeX || y >= this.magneticRangeY || y <= 0 - this.magneticRangeY;
  }
  //是否产生吸附效果
  enableAdsorption() {
    const cameraPositionZ = this.camera.position.z;

    if (cameraPositionZ > 0 && 54.9 <= cameraPositionZ && cameraPositionZ <= 55.1) {
      this.camera.position.set(0, 0, 55);
      this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    }
    if (cameraPositionZ < 0 && -55.1 <= cameraPositionZ && cameraPositionZ <= -54.9) {
      this.camera.position.set(0, 0, -55);
      this.camera.rotation.set(-3.14, 0.015, 3.14);
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

  // 显示α衰变
  showAlphaModel() {
    this.destoryAlphaAnimation();
    this.destoryBetaAnimation();
    this.nucleusModel.visible = true;
    this.alphaModel.visible = true;

    this.electronModel.visible = false;
    this.antineutrinoModel.visible = false;
  }
  //显示β衰变
  showBetaModel() {
    this.destoryAlphaAnimation();
    this.destoryBetaAnimation();
    this.nucleusModel.visible = true;
    this.electronModel.visible = true;
    this.antineutrinoModel.visible = true;

    this.alphaModel.visible = false;
  }

  //alphal粒子的螺旋动画
  alphaCircleAnimation() {
    this.startPosition = this.alphaModel.position.clone();
    this.alphaTween.x = this.alphaModel.position.x;
    this.alphaTween.y = this.alphaModel.position.y;
    const offsetX = this.alphaModel.position.x;
    let offsetY = this.alphaModel.position.y;

    if (offsetX >= this.lastPositionX) {
      this.alphaTween.angle = Math.PI;
      offsetY += 6;
    } else {
      this.alphaTween.angle = 0;
      offsetY -= 6;
    }

    this.alphaCircleTween = TweenMax.to(this.alphaTween, 15, {
      angle: -Math.PI * 2 * 3.7,
      z: 10,
      ease: Power0.easeNone,
      onUpdate: () => {
        const x = 6 * Math.sin(this.alphaTween.angle);
        const y = 6 * Math.cos(this.alphaTween.angle);

        this.alphaModel.position.x = x + offsetX;
        this.alphaModel.position.y = y + offsetY;
        this.alphaModel.position.z = this.alphaTween.z;
      },
      onComplete: () => {
        this.setAlphaLineAnimation(this.startPosition, this.alphaModel);
        this.alphaLineTween.play();
      },
      paused: true
    });
  }

  //开启匀强磁场
  enableUniformMagnetic() {
    this.uniformMagnetic = true;
    //开启匀强磁场时，先判断是否是播放状态；

    if (this.getAlphaCircleComplete()) {
      // console.log('执行Alpha:circle-------------------关闭');
      this.alphaCircleTween = null;
    }
    if (this.getBetaCircleComplete()) {
      // console.log('执行Beta电子:circle-------------------关闭');
      this.betaCircleTween = null;
    }

    if (this.button.isPlay) {
      // console.log('此时是播放状态，直接播放circle动画');
      //alpha衰变
      if (this.button.alpha) {
        if (this.alphaModel.position.z < 10) {
          this.getAlphaRandomComplete() ? this.alphaRandomTween.pause() : this.getAlphaLineComplete();
          this.getAlphaLineComplete() ? this.alphaLineTween.pause() : this.getAlphaLineComplete();
          this.alphaCircleAnimation();
          this.alphaCircleTween.play();
        }
      }
      if (this.button.beta) {
        if (this.electronModel.position.z < 10) {
          this.getBetaRandomComplete() ? this.betaRandomTween.pause() : this.getBetaLineComplete();
          this.getBetaLineComplete() ? this.betaLineTween.pause() : this.getBetaLineComplete();
          this.betaCircleAnimation();
          this.betaCircleTween.play();
        }
      }
    }
  }

  //关闭匀强磁场
  disableUniformMagnetic() {
    //匀强 - 非匀强
    //关闭匀强磁场时，先判断是否是播放状态；
    this.uniformMagnetic = false;
    if (this.getAlphaLineComplete() && this.alphaModel.position.z < 10) {
      // console.log('执行alpha:line--------------------关闭');
      this.alphaLineTween = null;
    }
    if (this.getAlphaRandomComplete()) { this.alphaRandomTween = null; }
    if (this.getBetaLineComplete() && this.electronModel.position.z < 10) {
      // console.log('执行beta:line--------------------关闭');
      this.betaLineTween = null;
    }
    if (this.getBetaRandomComplete()) { this.betaRandomTween = null; }
    if (this.button.isPlay) {
      // console.log('此时是播放状态，直接播放line动画');
      if (this.button.alpha && this.alphaModel.position.z < 10) {
        this.getAlphaCircleComplete() ? this.alphaCircleTween.pause() : this.getAlphaCircleComplete();
        this.setAlphaLineAnimation(this.startPosition, this.alphaModel);
        this.alphaLineTween.play();
      }

      if (this.button.beta && this.electronModel.position.z < 10) {
        this.getBetaCircleComplete() ? this.betaCircleTween.pause() : this.getBetaCircleComplete();
        this.setBetaLineAnimation(this.startPosition, this.electronModel);
        this.betaLineTween.play();
      }
    }

  }

  //显示alpha衰变动画（播放）
  showAlphaAnimation() {
    // console.log('播放按钮');
    this.alphaModel.visible = true; //显示alpha粒子
    //开启匀强磁场动画
    if (this.uniformMagnetic) {
      this.magneticAlphaAnimation();
    } else {
      this.unMagneticAlphaAnimation();
    }
  }

  //alpha匀强磁场动画
  magneticAlphaAnimation() {
    if (this.getAlphaRandomComplete()) {
      // console.log('不应该存在random');
      this.alphaRandomTween = null;
    }
    if (this.getAlphaLineComplete() && this.alphaModel.position.z < 10) {
      // console.log('不应该存在line');
      this.alphaLineTween = null;
    }

    //此时只有处于初始状态或者完整动画流程走完才会执行
    // console.log('匀强circle:' + this.getAlphaCircleComplete());
    // console.log('匀强line:' + this.getAlphaLineComplete());
    // console.log('匀强random:' + this.getAlphaRandomComplete());
    if (this.initAlphaStatus) {
      // console.log('匀强磁场：-----------------初始状态或者重新开始执行');
      this.lastPositionX = 0;
      this.alphaModel.position.set(0, 0, 0);
      this.alphaTween = { x: 0, y: 0, angle: Math.PI, z: 0 };
      this.alphaCircleAnimation();
      this.alphaCircleTween.play();
      this.initAlphaStatus = false;

    } else if (this.alphaModel.position.z < 10 ) {
      // console.log('匀强磁场内--------------------------------只执行circle动画');
      if (this.getAlphaCircleComplete()) {
        this.alphaCircleTween.resume();
      } else {
        this.alphaCircleAnimation();
        this.alphaCircleTween.play();
      }

    } else {
      // console.log('已超出匀强磁场----------------------只执行line动画');
      this.getAlphaLineComplete() ? this.alphaLineTween.resume() : this.getAlphaLineComplete();
    }
  }

  //alpha非匀强磁场动画
  unMagneticAlphaAnimation() {
    //此时只有处于初始状态或者完整动画执行完成时才会执行
    //首先判断是否有circle动画
    if (this.getAlphaCircleComplete()) {
      // console.log('不应该存在cicle');
      this.alphaCircleTween = null;
    }
    // console.log('非匀强circle:' + this.getAlphaCircleComplete());
    // console.log('非匀强line:' + this.getAlphaLineComplete());
    // console.log('非匀强random：' + this.getAlphaRandomComplete());
    if (this.initAlphaStatus) {
      // console.log('非匀强磁场：------------------------------初始状态或者重新开始执行');
      this.alphaModel.position.set(0, 0, 0);
      this.alphaRandomAnimation();
      this.alphaRandomTween.play();
      this.initAlphaStatus = false;

    } else {

      if (this.getAlphaRandomComplete() && !this.alphaCircleTween && !this.alphaLineTween ) {
        // console.log('非匀强------------------------------------初始暂停random动画');
        this.alphaRandomTween.resume();
        return;
      }

      // console.log('非匀强--------------------------------------只执行line动画');
      if (this.getAlphaLineComplete()) {
        this.alphaLineTween.resume();
      } else {

        this.setAlphaLineAnimation(this.startPosition, this.alphaModel);
        this.alphaLineTween.play();
      }
    }
  }

  //暂停alpha衰变动画（暂停）
  pauseAlphaAnimation() {
    //暂停射出动画
    if (this.getAlphaRandomComplete()) {this.alphaRandomTween.pause(); }
    //匀强磁场螺旋动画
    if (this.getAlphaCircleComplete()) {this.alphaCircleTween.pause(); }
    //匀强磁场切线动画
    if (this.getAlphaLineComplete()) {this.alphaLineTween.pause(); }
  }

  //返回alpha螺旋动画状态
  getAlphaCircleComplete(): boolean {
    return this.alphaCircleTween && this.alphaCircleTween.progress() > 0 && this.alphaCircleTween.progress() < 1;
  }
  //返回alpha发射动画状态
  getAlphaRandomComplete(): boolean {
    return this.alphaRandomTween && this.alphaRandomTween.progress() > 0 && this.alphaRandomTween.progress() < 1;
  }
  //返回alpha切线动画状态
  getAlphaLineComplete(): boolean {
    return this.alphaLineTween && this.alphaLineTween.progress() > 0 && this.alphaLineTween.progress() < 1;
  }

  /***************************beta动画区******************************************************************************************/

  //beta电子的螺旋动画
  betaCircleAnimation() {
    this.startPosition = this.electronModel.position.clone();
    this.betaTween.x = this.electronModel.position.x;
    this.betaTween.y = this.electronModel.position.y;
    const offsetX = this.electronModel.position.x;
    let offsetY = this.electronModel.position.y;

    if (offsetX > this.lastPositionX) {
      offsetY -= 6;
      this.betaTween.angle = 0;
    } else {
      this.betaTween.angle = Math.PI;
      offsetY += 6;
    }
    this.betaCircleTween = TweenMax.to(this.betaTween, 15, {
      angle: Math.PI * 2 * 3.7,
      z: 10,
      ease: Power0.easeNone,
      onUpdate: () => {
        const x = 6 * Math.sin(this.betaTween.angle);
        const y = 6 * Math.cos(this.betaTween.angle);

        this.electronModel.position.x = x + offsetX;
        this.electronModel.position.y = y + offsetY;
        this.electronModel.position.z = this.betaTween.z;
      },
      onComplete: () => {
        this.setBetaLineAnimation(this.startPosition, this.electronModel);
        this.betaLineTween.play();
      },
      paused: true
    });
  }
  //beta电子匀强磁场动画
  magneticBetaAnimation() {
    if (this.getBetaRandomComplete()) {
      // console.log('不应该存在random');
      this.betaRandomTween = null;
    }
    if (this.getBetaLineComplete() && this.electronModel.position.z < 10) {
      // console.log('不应该存在line');
      this.betaLineTween = null;
    }

    //此时只有处于初始状态或者完整动画流程走完才会执行
    // console.log('Beta匀强circle:' + this.getBetaCircleComplete());
    // console.log('Beta匀强line:' + this.getBetaLineComplete());
    // console.log('Beta匀强random:' + this.getBetaRandomComplete());

    if (this.initBetaStatus) {
      // console.log('Beta匀强磁场：-----------------初始状态或者重新开始执行');
      this.lastPositionX = 0;
      this.electronModel.position.set(0, 0, 0);
      this.betaTween = { x: 0, y: 0, angle: Math.PI, z: 0 };
      this.betaCircleAnimation();
      this.betaCircleTween.play();

    } else if (this.electronModel.position.z < 10 ) {
      // console.log('Beta匀强磁场内--------------------------------只执行circle动画');
      if (this.getBetaCircleComplete()) {
        this.betaCircleTween.resume();
      } else {
        this.betaCircleAnimation();
        this.betaCircleTween.play();
      }

    } else {
      // console.log('Beta已超出匀强磁场----------------------只执行line动画');
      this.getBetaLineComplete() ? this.betaLineTween.resume() : this.getBetaLineComplete();
    }
  }

  //Beta电子非匀强磁场动画
  unMagneticBetaAnimation() {
    if (this.getBetaCircleComplete()) {
      // console.log('不应该存在cicle');
      this.betaCircleTween = null;
    }
    // console.log('beta非匀强circle:' + this.getBetaCircleComplete());
    // console.log('beta非匀强line:' + this.getBetaLineComplete());
    // console.log('beta非匀强random：' + this.getBetaRandomComplete());

    if (this.initBetaStatus) {
      // console.log('beta非匀强磁场：------------------------------初始状态或者重新开始执行');
      this.electronModel.position.set(0, 0, 0);
      this.betaRandomAnimation();
      this.betaRandomTween.play();
    } else {
      if (this.getBetaRandomComplete() && !this.betaCircleTween && !this.betaLineTween ) {
        // console.log('beta非匀强------------------------------------初始暂停random动画');
        this.betaRandomTween.resume();
        return;
      }

      // console.log('beta非匀强--------------------------------------只执行line动画');
      if (this.getBetaLineComplete()) {
        this.betaLineTween.resume();
      } else {

        this.setBetaLineAnimation(this.startPosition, this.electronModel);
        this.betaLineTween.play();
      }
    }
  }

  //返回beta电子螺旋动画状态
  getBetaCircleComplete(): boolean {
    return this.betaCircleTween && this.betaCircleTween.progress() > 0 && this.betaCircleTween.progress() < 1;
  }
  //返回beta电子发射动画状态
  getBetaRandomComplete(): boolean {
    return this.betaRandomTween && this.betaRandomTween.progress() > 0 && this.betaRandomTween.progress() < 1;
  }
  //返回beta电子切线动画状态
  getBetaLineComplete(): boolean {
    return this.betaLineTween && this.betaLineTween.progress() > 0 && this.betaLineTween.progress() < 1;
  }
  //beta电子发射动画
  betaRandomAnimation() {
    const edgePoint = this.getRandomEdgePoint();
    this.betaRandomTween = TweenMax.to(this.electronModel.position, 3, {
      x: edgePoint[0],
      y: edgePoint[1],
      ease: Power0.easeNone,
      onComplete: () => {
        console.log('beta电子衰变发射动画结束');
        (window as any).viewHandler.viewModel.$data.isPlay = false;
        //重置动画
        this.betaRandomTween.progress(0);
        this.betaRandomTween.pause();
        this.resetElectronModel();
      },
      paused: true
    });
  }

  //显示beta衰变动画（播放）
  showBetaAnimation() {
    const isElectronComplete = this.isElectronComplete();
    this.antineutrinoModel.visible = true;
    this.electronModel.visible = true;
    const targetPoints = this.getRandomEdgeSymmetricPoint();

    if (this.uniformMagnetic) {
      this.magneticBetaAnimation();
    } else {
      this.unMagneticBetaAnimation();
    }

    if ( this.antineutrinoTween && this.antineutrinoTween.progress() > 0 && this.antineutrinoTween.progress() < 1) {
      this.antineutrinoTween.resume();
    } else {
      if (isElectronComplete && this.initBetaStatus) {
        this.setAntineutrinoAnimation(targetPoints[1]);
        this.antineutrinoTween.play();
        this.initBetaStatus = false;
      }
    }
  }

  //设置反电子中微子动画
  setAntineutrinoAnimation(targetPoint: Array<number>) {
    this.antineutrinoTween = TweenMax.to(this.antineutrinoModel.position, 3, {
      x: targetPoint[0],
      y: targetPoint[1],
      ease: Power0.easeNone,
      onComplete: () => {
        this.antineutrinoTween.progress(0);
        this.antineutrinoTween.pause();
        this.antineutrinoTween = null;
        this.resetAntineutrinoModel();
        if (!this.getBetaCircleComplete() && !this.getBetaLineComplete() && !this.getBetaRandomComplete()) {
          this.button.isPlay = false;
        }
      },
      paused: true
    });
  }

  resetAlphaModel() {
    this.alphaModel.position.set(0, 0, 0);
    this.alphaModel.visible = false;
    this.alphaTween = { x: 0, y: 0, angle: Math.PI, z: 0 };
    this.lastPositionX = 0;
    this.initAlphaStatus = true;
  }

  resetAntineutrinoModel() {
    this.antineutrinoModel.position.set(0, 0, 0);
    this.antineutrinoModel.visible = false;
  }

  resetElectronModel() {
    this.electronModel.position.set(0, 0, 0);
    this.electronModel.visible = false;
    this.betaTween = { x: 0, y: 0, angle: Math.PI, z: 0 };
    this.lastPositionX = 0;
    this.initBetaStatus = true;
  }

  destoryAlphaAnimation() {
    if (this.alphaRandomTween) {
      this.alphaRandomTween.progress(0); this.alphaRandomTween.pause(); this.alphaRandomTween = null;
    }

    if (this.alphaCircleTween) {
      this.alphaCircleTween.progress(0); this.alphaCircleTween.pause(); this.alphaCircleTween = null;
    }

    if (this.alphaLineTween) {
      this.alphaLineTween.progress(0); this.alphaLineTween.pause(); this.alphaLineTween = null;
    }

    this.resetAlphaModel();
  }

  destoryBetaAnimation() {
    if (this.betaRandomTween) {
      this.betaRandomTween.progress(0); this.betaRandomTween.pause(); this.betaRandomTween = null;
    }
    if (this.betaCircleTween) {
      this.betaCircleTween.progress(0); this.betaCircleTween.pause(); this.betaCircleTween = null;
    }
    if (this.betaLineTween) {
      this.betaLineTween.progress(0); this.betaLineTween.pause(); this.betaLineTween = null;
    }
    if (this.antineutrinoTween) {
      this.antineutrinoTween.progress(0); this.antineutrinoTween.pause(); this.antineutrinoTween = null;
    }

    this.resetElectronModel();
    this.resetAntineutrinoModel();
  }

  //暂停beta衰变动画(暂停)
  pauseBetaAnimation() {
    //反式中微子动画
    if (this.antineutrinoTween && this.antineutrinoTween.progress() !== 1) { this.antineutrinoTween.pause(); }
    //beta电子随机发射动画
    if (this.betaRandomTween && this.betaRandomTween.progress() !== 1) { this.betaRandomTween.pause(); }
    //beta电子螺旋式动画
    if (this.betaCircleTween && this.betaCircleTween.progress() !== 1) { this.betaCircleTween.pause(); }
    //beta电子切线动画
    if (this.betaLineTween && this.betaLineTween.progress() !== 1) {this.betaLineTween.pause(); }
  }

  isElectronComplete() {
    if (this.uniformMagnetic) {
      if (this.getBetaCircleComplete() || this.getBetaLineComplete()) { return false; }
    } else {
      if (this.getBetaRandomComplete()) { return false; }
    }
    return true;
  }
  isAntiTweenComplete() {
    return !(this.antineutrinoTween && this.antineutrinoTween > 0 && this.antineutrinoTween < 1);
  }

  getAlphaLinePoint(position: any, model: any) {
    //圆的中心点
    const centerPoint = { x: 0, y: 0 };
    //切线交点
    const outPoint = model.position.clone();
    //将近似为0的值取整
    outPoint.x = outPoint.x.toLocaleString();
    //最终运动点
    const finalPoint = { x: 0, y: 0, z: model.position.z };
    //圆的初始点

    if (position.x < this.lastPositionX) {
      centerPoint.x = position.x;
      centerPoint.y = position.y - this.radius;
    } else {
      centerPoint.x = position.x;
      centerPoint.y = position.y + this.radius;
    }
    //斜率
    const slope = -(outPoint.x - centerPoint.x) / (outPoint.y - centerPoint.y);
    if (!slope || slope === Infinity) {
      finalPoint.x = outPoint.x;
      if (outPoint.x < centerPoint.x) {
        finalPoint.y = -this.magneticRangeY;
      } else {
        finalPoint.y = this.magneticRangeY;
      }
      return finalPoint;
    }
    //截距
    const intercept = outPoint.y - (slope * outPoint.x);

    if (outPoint.x > centerPoint.x) {
      finalPoint.x = (this.magneticRangeY - intercept) / slope;
      finalPoint.y = this.magneticRangeY;
    } else {
      finalPoint.x = (-this.magneticRangeY - intercept) / slope;
      finalPoint.y = -this.magneticRangeY;
    }

    if (finalPoint.x < this.magneticRangeX) {
      finalPoint.x = this.magneticRangeX;
      finalPoint.y = finalPoint.x * slope + intercept;
    } else if (finalPoint.x > -this.magneticRangeX) {
      finalPoint.x = -this.magneticRangeX;
      finalPoint.y = finalPoint.x * slope + intercept;
    }

    return finalPoint;
  }

  getBetaLinePoint(position: any, model: any) {
    //圆的中心点
    const centerPoint = { x: 0, y: 0 };
    //切线交点
    const outPoint = model.position.clone();
    //将近似为0的值取整
    outPoint.x = outPoint.x.toLocaleString();
    //最终运动点
    const finalPoint = { x: 0, y: 0, z: model.position.z };
    //圆的初始点
    if (position.x <= this.lastPositionX) {
      centerPoint.x = position.x;
      centerPoint.y = position.y + this.radius;
    } else {
      centerPoint.x = position.x;
      centerPoint.y = position.y - this.radius;
    }
    //斜率
    const slope = -(outPoint.x - centerPoint.x) / (outPoint.y - centerPoint.y);
    if (!slope || slope === Infinity) {
      finalPoint.x = outPoint.x;
      if (outPoint.x < centerPoint.x) {
        finalPoint.y = this.magneticRangeY;
      } else {
        finalPoint.y = -this.magneticRangeY;
      }
      return finalPoint;
    }
    //截距
    const intercept = outPoint.y - (slope * outPoint.x);

    if (outPoint.x > centerPoint.x) {
      finalPoint.x = (-this.magneticRangeY - intercept) / slope;
      finalPoint.y = -this.magneticRangeY;
    } else if (outPoint.x < centerPoint.x) {
      finalPoint.x = (this.magneticRangeY - intercept) / slope;
      finalPoint.y = this.magneticRangeY;
    } else {
      if (finalPoint.y > centerPoint.y) {
        finalPoint.x = -this.magneticRangeX;
      } else {
        finalPoint.x = this.magneticRangeX;
      }
    }

    if (finalPoint.x <= this.magneticRangeX) {
      finalPoint.x = this.magneticRangeX;
      finalPoint.y = finalPoint.x * slope + intercept;
    } else if (finalPoint.x >= -this.magneticRangeX) {
      finalPoint.x = -this.magneticRangeX;
      finalPoint.y = finalPoint.x * slope + intercept;
    }

    return finalPoint;
  }

  //设置alpha切线运动
  setAlphaLineAnimation(startPosition: any, model: any) {
    const linePoint = this.getAlphaLinePoint(startPosition, model);
    this.lastPositionX = model.position.x;
    this.alphaLineTween = TweenMax.to(this.alphaModel.position, 3, {
      x: linePoint.x,
      y: linePoint.y,
      z: linePoint.z + 4,
      ease: Power0.easeNone,
      onComplete: () => {
        console.log('alpha衰变完整动画流程结束');
        this.button.isPlay = false;
        this.destoryAlphaAnimation();
      },
      paused: true
    });
  }
  //设置beta切线运动
  setBetaLineAnimation(startPosition: any, model: any) {
    const linePoint = this.getBetaLinePoint(startPosition, model);
    this.lastPositionX = model.position.x;
    this.betaLineTween = TweenMax.to(this.electronModel.position, 3, {
      x: linePoint.x,
      y: linePoint.y,
      z: linePoint.z + 4,
      ease: Power0.easeNone,
      onComplete: () => {
        console.log('beta电子衰变完整动画流程结束');
        if (this.isAntiTweenComplete()) {this.button.isPlay = false; }
        this.destoryBetaAnimation();
      },
      paused: true
    });
  }

  //alpha发射动画
  alphaRandomAnimation() {
    const edgePoint = this.getRandomEdgePoint();
    this.alphaRandomTween = TweenMax.to(this.alphaModel.position, 3, {
      x: edgePoint[0],
      y: edgePoint[1],
      ease: Power0.easeNone,
      onComplete: () => {
        console.log('alpha衰变发射动画完整结束');
        (window as any).viewHandler.viewModel.$data.isPlay = false;
        //重置动画
        this.alphaRandomTween = null;
        this.resetAlphaModel();
      },
      paused: true
    });
  }

  resetCamera() {
    this.camera.position.set(0, 0, 55);
    this.cameraZ = this.camera.position.z;
    this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    (this.camera as any).zoom = 1;
    (this.camera as any).updateProjectionMatrix();
  }

}
