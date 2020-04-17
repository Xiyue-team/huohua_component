import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
import * as O_Atom from '../sub_static/O_Atom.png';
import * as  magnifier from '../sub_static/magnifier.png';
import * as  minMagnifier from '../sub_static/minMagnifier.png';
import * as  solidBottle from '../sub_static/solidBottle.png';
import * as  waterBottle from '../sub_static/waterBottle.png';
import * as  airBottle from '../sub_static/airBottle.png';
import * as  arrowLeft from '../sub_static/arrowLeft.png';
import * as  arrowRight from '../sub_static/arrowRight.png';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
const Interaction = require('three.interaction');

export class Model extends ThreeBase {
   private controls: any;

   private o_Atom        = ThreeUtil.createImg(58, 41, O_Atom, 0, 0, -5);
   private magnifier     = ThreeUtil.createImg(782, 675, magnifier, 0, 0, 1);

   private solidBottle   = ThreeUtil.createImg(154, 230, solidBottle, 0, 150, 1);
   private waterBottle   = ThreeUtil.createImg(154, 230, waterBottle, -250, -130, 1);
   private airBottle     = ThreeUtil.createImg(154, 230, airBottle, 250, -130, 1);

   private arrowLeft1     = ThreeUtil.createImg(73, 11, arrowLeft, -145, 0, 1);
   private arrowRight1    = ThreeUtil.createImg(73, 11, arrowRight, -155, 12, 1);
   private arrowLeft2     = ThreeUtil.createImg(73, 11, arrowLeft, 145, 0, 1);
   private arrowRight2    = ThreeUtil.createImg(73, 11, arrowRight, 155, 12, 1);
   private arrowLeft3     = ThreeUtil.createImg(73, 11, arrowLeft, 0, -210, 1);
   private arrowRight3    = ThreeUtil.createImg(73, 11, arrowRight, 0, -195, 1);

   private solid_minMagnifier    = ThreeUtil.createImg(36, 36, minMagnifier, 0, 100, 2);
   private water_minMagnifier    = ThreeUtil.createImg(36, 36, minMagnifier, -250, -190, 2);
   private air_minMagnifier      = ThreeUtil.createImg(36, 36, minMagnifier, 250, -190, 2);

   //创建文字组和图片组
   private textGroup: any = new THREE.Group;
   private group: any = new THREE.Group;
   // 创建分子组及分子变量
   private moleculeArr1: any = [];
   private moleculeArr2: any = [];
   private activeA: any;
   private activeB: any;
   // 创建分子运动的定时器
   private timer1: any;
   private timer4: any;

   private bottleTextGroup: any;
   private reverseTextGroup: any;

   //创建原子
   private shapeY = {
        'shape0' : new Array<any>(),
        'shape1' : new Array<any>(),
        'shape2' : new Array<any>(),
        'shape3' : new Array<any>(),
        'shape4' : new Array<any>(),
        'shape5' : new Array<any>(),
        'shape6' : new Array<any>(),
        'shape7' : new Array<any>(),
        'shape8' : new Array<any>()
    };

   private render = () => {
     requestAnimationFrame(this.render);
     this.controls.update();
     this.renderer.render(this.scene, this.camera);
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
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.bottleTextGroup = window.env.browserInfo.lang.bottleText;
    this.reverseTextGroup = window.env.browserInfo.lang.reverseText;
    this.init();
  }

  init(): void {
     this.initScene();
     this.initCamera();
     this.initLight();
     this.initWebGLRenderer();
     this.initControl();
     this.initImage();
     this.initText();
     this.initMinMagnifierEvent();
     this.initsolidModel();
     this.initWaterModel();
     this.waterModelEnable(false);
     this.initAirModel();
     this.airModelEnable(false);
     const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
     this.resize();
     this.render();
  }

  initScene(): void {
     this.scene = new THREE.Scene();
     this.scene.background = new THREE.Color( '#C6CFD9' );
  }
  /**
    * 初始化镜头
  */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 650);
  }
  /**
   * 初始化光源
   */
  initLight(): void {
    // const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
    // this.scene.add(ambientLight);
    //
    // const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
    // dirLight.position.set( 100, 100, 100 );
    // this.scene.add( dirLight );
    //
    // const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
    // dirLight2.position.set( -100, 0, -100 );
    // this.scene.add( dirLight2 );
  }
  /**
  * 初始化渲染器
  */
  initWebGLRenderer(): void {
      if (this.webglAvailable()) {
          this.renderer = new THREE.WebGLRenderer({antialias: true});
      } else {
          this.renderer = new (THREE as any).CanvasRenderer();
      }
      (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.domElement.appendChild(this.renderer.domElement);
  }
  //初始化控制器
  initControl(): void {
    this.controls = new MapControls(this.camera as any, this.renderer.domElement);

    this.controls.screenSpacePanning = false; // 若为 true 则可以平移

    this.controls.enableRotate = false;

    this.controls.enableZoom = true;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;

    //设置相机距离原点的最远距离
    this.controls.minDistance = 150;
    this.controls.maxDistance = 700;

    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //是否自动旋转
    this.controls.minAzimuthAngle = -Math.PI * 2;
    this.controls.maxAzimuthAngle = Math.PI * 2;

    this.controls.maxPolarAngle = Math.PI;
  }
  //初始化文字
  initText() {
    const bottleText1 = ThreeUtil.createNormalText(this.bottleTextGroup[0], 0, 30, 1, '#000', 0.5);
    const bottleText2 = ThreeUtil.createNormalText(this.bottleTextGroup[2], 250, -250, 1, '#000', 0.5);
    const bottleText3 = ThreeUtil.createNormalText(this.bottleTextGroup[1], -250, -250, 1, '#000', 0.5);

    const arrowText1 = ThreeUtil.createText(this.reverseTextGroup[0], '#294653', -165, 30, 1,  0.35);
    const arrowText2 = ThreeUtil.createText(this.reverseTextGroup[1], '#294653', -145, 0, 1, 0.35);
    const arrowText3 = ThreeUtil.createText(this.reverseTextGroup[2], '#294653', 165, 30, 1, 0.35);
    const arrowText4 = ThreeUtil.createText(this.reverseTextGroup[3], '#294653', 145, 0, 1, 0.35);
    const arrowText5 = ThreeUtil.createText(this.reverseTextGroup[4], '#294653', 0, -175, 1, 0.35);
    const arrowText6 = ThreeUtil.createText(this.reverseTextGroup[5], '#294653', 0, -210, 1, 0.35);
    arrowText1.rotation.z = 30 * Math.PI / 180;
    arrowText2.rotation.z = 30 * Math.PI / 180;
    arrowText3.rotation.z = -30 * Math.PI / 180;
    arrowText4.rotation.z = -30 * Math.PI / 180;

    this.textGroup.add(bottleText1, bottleText2, bottleText3,
      arrowText1, arrowText2, arrowText3,
      arrowText4, arrowText5, arrowText6);
    this.scene.add(this.textGroup);
  }
  //初始化页面图片
  initImage () {
    this.magnifier.scale.set(0.9, 0.9, 0.9);
    this.magnifier.visible = false;
    this.scene.add(this.magnifier);
    this.solidBottle.scale.set(0.9, 0.9, 0.9);
    this.waterBottle.scale.set(0.9, 0.9, 0.9);
    this.airBottle.scale.set(0.9, 0.9, 0.9);
    this.arrowLeft1.rotateZ(30 * Math.PI / 180 );
    this.arrowRight1.rotateZ(30 * Math.PI / 180 );
    this.arrowLeft2.rotateZ(-30 * Math.PI / 180 );
    this.arrowRight2.rotateZ(-30 * Math.PI / 180 );

    (this.solid_minMagnifier as any).cursor = 'pointer';
    (this.water_minMagnifier as any).cursor = 'pointer';
    (this.air_minMagnifier as any).cursor = 'pointer';

    this.group.add(this.solidBottle,
      this.waterBottle,
      this.airBottle,
      this.arrowLeft1,
      this.arrowRight1,
      this.arrowLeft2,
      this.arrowRight2,
      this.arrowLeft3,
      this.arrowRight3
      );

    this.scene.add(this.group);
    this.scene.add(this.solid_minMagnifier);
    this.scene.add(this.water_minMagnifier);
    this.scene.add(this.air_minMagnifier);
  }
  //初始化小的放大镜事件
  initMinMagnifierEvent() {
    (this.solid_minMagnifier as any).on('mousedown', () => {
      this.imageEnable(false);
      this.solidModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });
    (this.water_minMagnifier as any).on('mousedown', () => {
      this.imageEnable(false);
      this.waterModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });
    (this.air_minMagnifier as any).on('mousedown', () => {
      this.imageEnable(false);
      this.airModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });
    (this.solid_minMagnifier as any).on('touchstart', () => {
      this.imageEnable(false);
      this.solidModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });
    (this.water_minMagnifier as any).on('touchstart', () => {
      this.imageEnable(false);
      this.waterModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });
    (this.air_minMagnifier as any).on('touchstart', () => {
      this.imageEnable(false);
      this.airModelEnable(true);
      (window as any).viewHandler.viewModel.$data.isShow = true;
    });

  }
  //初始化固态模型
  initsolidModel() {
    this.o_Atom.scale.set(1.2, 1.2, 1.2);
    for (let i = 0; i < 9; i++ ) {
      for ( let k = 0 ; k < 7 ; k++) {
        (this.shapeY as any)['shape' + i][k] = this.o_Atom.clone();
        (this.shapeY as any)['shape' + i][k].visible = false;
        (this.shapeY as any)['shape' + i][k].position.x = -170 + k * 70 - 20;
        (this.shapeY as any)['shape' + i][k].position.z = -5;
        if (k % 2 === 0) {
          (this.shapeY as any)['shape' + i][k].position.y = -230 + i * 55 - 12;
        } else {
          (this.shapeY as any)['shape' + i][k].position.y = -230 + i * 55 + 15;
        }
        const y = (this.shapeY as any)['shape' + i][k].position.y;
        const x = (this.shapeY as any)['shape' + i][k].position.x;

        this.soildAnimation((this.shapeY as any)['shape' + i][k], y, x);
        this.scene.add((this.shapeY as any)['shape' + i][k]);
      }
    }
  }
  //初始化液态模型
  initWaterModel() {
    for (let i = 0; i < 30; i++) {
      this.creatMolecule(this.activeA, 58, 41, O_Atom, 'activeA', 2, this.moleculeArr2);
      this.creatMolecule(this.activeB, 58, 41, O_Atom, 'activeB', 2, this.moleculeArr2);
    }
    this.runAnimation(this.moleculeArr2, -300, -100, 300, -100, 1);
  }
  //初始化气态模型
  initAirModel() {
    for (let i = 0; i < 10; i++) {
      this.creatMolecule(this.activeA, 58, 41, O_Atom, 'activeA', 1, this.moleculeArr1);
      this.creatMolecule(this.activeB, 58, 41, O_Atom, 'activeB', 1, this.moleculeArr1);
    }
    this.runAnimation(this.moleculeArr1, -220, -100, 200, -100, 1);
  }
  //设置初始图片的显示、隐藏
  imageEnable(enable: boolean) {
    this.textGroup.visible = enable;
    this.group.visible = enable;
    this.solid_minMagnifier.visible = this.water_minMagnifier.visible = this.air_minMagnifier.visible = enable;
    this.magnifier.visible = !enable;
  }
  //设置固态状况下的分子显示、隐藏
  solidModelEnable(enable: boolean) {
    for (let i = 0; i < 9; i++ ) {
      for ( let k = 0 ; k < 7 ; k++) {
        (this.shapeY as any)['shape' + i][k].visible = enable;
      }
    }
  }
  //设置液态状况下的分子显示、隐藏
  waterModelEnable(enable: boolean) {
    for (let i = 0; i < this.moleculeArr2.length; i++) {
      this.moleculeArr2[i].box.visible = enable;
    }
  }
  //设置气态状态下的分子显示、隐藏
  airModelEnable(enable: boolean) {
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      this.moleculeArr1[i].box.visible = enable;
    }
  }
  //固态原子动画
  soildAnimation( O: any, y: any , x: any) {
    O.position.y = y + (Math.random() - 1) * 3;
    O.position.x = x + (Math.random() - 1) * 3;
    O.__dirtyPosition = true;
    requestAnimationFrame( () => {
      this.soildAnimation( O, y, x);
    });
  }
  //按钮返回事件
  returnEvent() {
    this.imageEnable(true);
    this.solidModelEnable(false);
    this.waterModelEnable(false);
    this.airModelEnable(false);
  }
  // 创建容器分子函数
  creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, arr: any) {
    const randomX1 = Math.random() * 200 - 100 * Math.random();
    const randomY1 = Math.random() * 150 - 100 * Math.random();
    molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
    if (num === 1) {
      molecule.selfMoveAnimate(randomX1, randomY1, 0, 0, 260);
    } else {
      molecule.selfAirMoveAnimate(randomX1, randomY1, 0, 0, 250);
    }
    arr.push(molecule);
    molecule.addSince(this.scene);
  }
  // 获取两个分子或离子之间的距离函数
  getDistance(p1: any, p2: any) {
    const dx = p1.box.position.x - p2.box.position.x;
    const dy = p1.box.position.y - p2.box.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  // 分子及离子碰撞后对应的反应事件
  runIntoAni(index: number, arr: any) {
    for (let i = 0; i < arr.length; i++) {
      const d = this.getDistance(arr[i], arr[index]);
      if (d <= 25.5) {
        this.reboundEvent(index, i, arr);
      }
    }
  }
  // 碰撞反弹函数
  reboundEvent(index: number, i: number, arr: any) {
    arr[index].speedX -= arr[i].box.position.x - arr[index].box.position.x;
    arr[index].speedY -= arr[i].box.position.y - arr[index].box.position.y;
    arr[i].speedX -= arr[i].box.position.x - arr[i].box.position.x;
    arr[i].speedY -= arr[i].box.position.y - arr[i].box.position.y;
  }
  // 容器中分子碰撞反弹及反应事件
  rebound (arr: any ) {
    for (let i = 0, L = arr.length; i < L; i++) {
      this.runIntoAni(i, arr );
      const sphere = arr[i];
      const k = 0.0001;
      let k1;
      if (Math.random() > 0.5) {
        k1 = 1;
        } else {
        k1 = -1;
      }
      const forceX = -k * k1 * sphere.box.position.x;
      const forceY = -k * k1 * sphere.box.position.y;
      sphere.speedX += forceX;
      sphere.speedY += forceY;
      let r;
      if (sphere.box.name === 'activeA' || sphere.box.name === 'activeB' || sphere.box.name === 'activeAB') {
          const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
          r = 0.7 / speed;
      } else {
          const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
          r = 0.5 / speed;
      }
      sphere.speedX *= r;
      sphere.speedY *= r;
      sphere.box.position.x += sphere.speedX;
      sphere.box.position.y += sphere.speedY;
    }
  }
  // 反应中分子的运动函数
  runAnimation(arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number, num: number, ) {
    const thiz = this;
    function ani() {
      thiz.rebound(arr);
      thiz.timer1 = requestAnimationFrame(ani);
    }
    ani();
  }
  // 反应中分子的运动函数
  runAnimation1(arr: any) {
    const thiz = this;
    function ani() {
      thiz.rebound(arr);
      thiz.timer4 = requestAnimationFrame(ani);
    }
    ani();
  }

  resize(): void {
    const dom = document.getElementById('3dContainer');
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(width, height);
  }

  reset () {
    this.returnEvent();
  }
}




