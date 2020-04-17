import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { RandomModel } from './RandomModel';
import * as beaker from '../sub_static/beaker.png'; //容器
import * as atomH from '../sub_static/H.png';         //H离子
import * as atomNo3 from '../sub_static/NO3.png';     //NO3离子
import * as atomCl from '../sub_static/Cl.png';       //Cl离子
import * as atomSo4 from '../sub_static/SO4.png';     //SO4离子
import * as formula1 from '../sub_static/formula1.png';     //公式1
import * as formula2 from '../sub_static/formula2.png';     //公式2
import * as formula3 from '../sub_static/formula3.png';     //公式3
import * as magnifier from '../sub_static/magnifier.png';     //放大镜
import * as hotSpot from '../sub_static/hotSpot.png';     //热点
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');

export class Model extends ThreeBase {

  private beaker              = ThreeUtil.createImg(213, 241, beaker, -300, 0, 1);
  private atomH               = ThreeUtil.createImg(18, 18, atomH, 0, 0, 0);
  private atomNo3             = ThreeUtil.createImg(18, 18, atomNo3, 0, 0, 0);
  private atomCl              = ThreeUtil.createImg(18, 18, atomCl, 0, 0, 0);
  private atomSo4             = ThreeUtil.createImg(18, 18, atomSo4, 0, 0, 0);
  private magnifierImage1     = ThreeUtil.createImg(213, 214, magnifier, -298, -14, 3);
  private magnifierImage2: any;
  private magnifierImage3: any;

  // 创建分子组及分子变量
  private moleculeArr1: any = [];
  private activeA: any;
  private activeB: any;
  // 创建分子运动的定时器
  private timer1: any;

  private hotSpotA = ThreeUtil.createImg(87, 86, hotSpot, -300, -40, 2);
  private hotSpotB: any;
  private hotSpotC: any;

  private acidtText: any;
  private circleGroup = new THREE.Group;


  private render = () => {
    if (this.hotSpotA.visible || this.hotSpotB.visible || this.hotSpotC.visible) {
      (window as any).viewHandler.viewModel.$data.isShow = false;
    } else {
      (window as any).viewHandler.viewModel.$data.isShow = true;
    }
    requestAnimationFrame(this.render);
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
    this.acidtText = window.env.browserInfo.lang.solutionText;
    this.init();
  }

  init(): void {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    this.initImage();
    this.initText();
    this.initHotSpotEvent();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.resize();
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( '#383838' );
  }
  /**
    * 初始化镜头
  */
  initCamera(): void {
    const near = 0.1;
    const far = 1000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 600);
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

    const threeCanvas = document.getElementById('3dContainer').children[0];
    (threeCanvas as any).style.position = 'absolute';
  }
  //初始化控制器
  initControl(): void {
    const orbit = new OrbitControls(this.camera, this.renderer.domElement);
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    orbit.enableDamping = true;
    //是否可以缩放
    orbit.enableZoom = false;
    //是否自动旋转
    orbit.autoRotate = false;
    //设置相机距离原点的最远距离
    orbit.minDistance = 1;
    //设置相机距离原点的最远距离
    orbit.maxDistance = 4000;
    //是否开启右键拖拽
    orbit.enablePan = false;
    //是否可以旋转
    orbit.enableRotate = false;
  }

  //初始化页面图片
  initImage () {
    //三个烧杯
    const beaker2 = this.beaker.clone();
    beaker2.position.set(0, 0, 1);
    const beaker3 = this.beaker.clone();
    beaker3.position.set(300, 0, 1);

    //烧杯对应的公式
    const formulaImage1   = ThreeUtil.createImg(146, 20, formula1, -300, -145, 1);
    const formulaImage2   = ThreeUtil.createImg(182, 23, formula2, 305, -145, 1);
    const formulaImage3   = ThreeUtil.createImg(207, 23, formula3, 5, -145, 1);
    formulaImage1.scale.set(0.9, 0.9, 0.9);
    formulaImage2.scale.set(0.9, 0.9, 0.9);
    formulaImage3.scale.set(0.9, 0.9, 0.9);

    this.hotSpotB = this.hotSpotA.clone();
    this.hotSpotC = this.hotSpotA.clone();
    this.hotSpotB.position.set(0, -40, 2);
    this.hotSpotC.position.set(300, -40, 2);
    this.magnifierImage2 = this.magnifierImage1.clone();
    this.magnifierImage3 = this.magnifierImage1.clone();
    this.magnifierImage2.position.set(1, -14, 3);
    this.magnifierImage3.position.set(300, -14, 3);
    this.magnifierImage1.visible = this.magnifierImage2.visible = this.magnifierImage3.visible = false;

    this.scene.add(this.beaker, beaker2, beaker3);
    this.scene.add(formulaImage1, formulaImage2, formulaImage3);
    this.scene.add(this.magnifierImage1, this.magnifierImage2, this.magnifierImage3);
    this.scene.add(this.hotSpotA, this.hotSpotB, this.hotSpotC);
    this.initCircle();
  }

  //初始化放大镜背后背景
  initCircle() {
    const geometry = new THREE.CircleBufferGeometry(90, 30);
    const material = new THREE.MeshBasicMaterial({ transparent: true, color: '#6F6F6F', opacity: 1 });

    const circleLeft = new THREE.Mesh(geometry, material);
    circleLeft.position.set(-300, -11, 2);
    const circleCenter = circleLeft.clone();
    circleCenter.position.set(0, -11, 2);
    const circleRight = circleLeft.clone();
    circleRight.position.set(300, -11, 2);

    circleLeft.visible = circleCenter.visible = circleRight.visible = false;
    this.circleGroup.add(circleLeft, circleCenter, circleRight);
    this.scene.add(this.circleGroup);
  }

  //初始化烧杯溶液文字
  initText() {
    const beakerTextLeft = ThreeUtil.createNormalText(this.acidtText[0], -300, 150, 0, '#ffffff', 0.4);
    const beakerTextCenter = ThreeUtil.createNormalText(this.acidtText[1], 0, 150, 0, '#ffffff', 0.4);
    const beakerTextRight = ThreeUtil.createNormalText(this.acidtText[2], 300, 150, 0, '#ffffff', 0.4);
    this.scene.add(beakerTextLeft, beakerTextCenter, beakerTextRight);
  }

  //修改元素透明度
  setModelOpacity(atomArr: any, value: number) {
    for (let i = 0; i < atomArr.length; i++) {
      if (atomArr[i].box.name === 'activeB') {
        (atomArr[i].box.material as any).opacity = value;
      }
    }
  }

  //创建盐酸分子
  initHydrochlorideModel() {
    for (let i = 0; i < 6; i++) {
      this.createMolecule(this.activeA, 'activeA', 1, 0.95, -295, -10, this.atomH, 1, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeB', 1, 1.15, -295, -10, this.atomCl, 1, this.moleculeArr1);
    }
  }

  //创建硫酸分子
  initSulphateModel() {
    for (let i = 0; i < 3; i++) {
      this.createMolecule(this.activeA, 'activeA', 2, 0.95, 5, -10, this.atomH, 1, this.moleculeArr1);
      this.createMolecule(this.activeA, 'activeA', 2, 0.95, 5, -10, this.atomH, 1, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeB', 2, 1.45, 5, -10, this.atomSo4, 1, this.moleculeArr1);
    }
  }

  //创建硝酸分子
  initNitricModel() {
    for (let i = 0; i < 6; i++) {
      this.createMolecule(this.activeA, 'activeA', 3, 0.95, 305, -10, this.atomH, 1, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeB', 3, 1.25, 305, -10, this.atomNo3, 1, this.moleculeArr1);
    }
  }

  //设置放大镜的显示与隐藏
  setmagnifierEnable(index: number, enable: boolean) {
    switch (index) {
      case 0:
        this.magnifierImage1.visible = enable;
        this.hotSpotA.visible = !enable;
        break;
      case 1:
        this.magnifierImage2.visible = enable;
        this.hotSpotB.visible = !enable;
        break;
      case 2:
        this.magnifierImage3.visible = enable;
        this.hotSpotC.visible = !enable;
        break;
    }
    this.circleGroup.children[index].visible = enable;
  }

  // 清除定时器
  clearTimer() {
    cancelAnimationFrame(this.timer1);
    this.timer1 = null;
  }

  // 清空数组中分子并重新添加分子
  clearMolecule () {
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      if (this.moleculeArr1[i].box.name === 'activeB') {
        (this.moleculeArr1[i].box.material as any).opacity = 1;
      }
      this.moleculeArr1[i].stopMoveAnimate();
      this.moleculeArr1[i].removeSince(this.scene);
    }

    this.moleculeArr1 = [];
  }

  //设置热点点击事件
  initHotSpotEvent() {
    (this.hotSpotA as any).cursor = 'pointer';
    (this.hotSpotB as any).cursor = 'pointer';
    (this.hotSpotC as any).cursor = 'pointer';

    //盐酸热点
    (this.hotSpotA as any).on('mousedown', () => {
      this.setmagnifierEnable(0, true);
      this.initHydrochlorideModel();
      this.runAnimation(this.moleculeArr1);
    });
    (this.hotSpotA as any).on('touchstart', () => {
      this.setmagnifierEnable(0, true);
      this.initHydrochlorideModel();
      this.runAnimation(this.moleculeArr1);
    });
    //硫酸热点
    (this.hotSpotB as any).on('mousedown', () => {
      this.setmagnifierEnable(1, true);
      this.initSulphateModel();
      this.runAnimation(this.moleculeArr1);
    });
    (this.hotSpotB as any).on('touchstart', () => {
      this.setmagnifierEnable(1, true);
      this.initSulphateModel();
      this.runAnimation(this.moleculeArr1);
    });
    //硝酸热点
    (this.hotSpotC as any).on('mousedown', () => {
      this.setmagnifierEnable(2, true);
      this.initNitricModel();
      this.runAnimation(this.moleculeArr1);
    });
    (this.hotSpotC as any).on('touchstart', () => {
      this.setmagnifierEnable(2, true);
      this.initNitricModel();
      this.runAnimation(this.moleculeArr1);
    });
  }
  //创建分子函数
  createMolecule(atom: any, name: string, num: number, scale: number,
                 centerX: number, centerY: number, image: any, rate: number, arr: any) {
    let randomX1, randomY1;
    switch (num) {
      case 1:  //盐酸
        randomX1 = Math.random() * 100 - 350;
        break;
      case 2: //硫酸
        randomX1 = Math.random() * 100 - 100 * Math.random();
        break;
      case 3:  //硝酸
        randomX1 = Math.random() * 100 + 250;
        break;
    }
    randomY1 = Math.random() * 80 - 80 * Math.random();
    atom = new RandomModel(randomX1, randomY1, 2, scale, 18, 18, image, name);
    atom.selfAirMoveAnimate(randomX1, randomY1, centerX, centerY, 88, rate);
    arr.push(atom);
    atom.addSince(this.scene);
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
      if (d <= 26.5) {
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
  runAnimation(arr: any ) {

    if (this.timer1) {
      return;
    }
    const self = this;
    function ani() {
      self.rebound(arr);
      self.timer1 = requestAnimationFrame(ani);
    }
    ani();
  }

  resize(): void {
    const dom = document.getElementById('3dContainer');
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    const scale = width / height > 16 / 9 ? height / 576 : width / 1024;
    const scaleWidth = 1024 * scale;
    const scaleHeight = 576 * scale;
    (this.camera as PerspectiveCamera).aspect = scaleWidth / scaleHeight;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(scaleWidth, scaleHeight);

    const container = document.getElementById('3dContainer').children[0];
    (container as any).style.top = '50%';
    (container as any).style.left = '50%';
    (container as any).style.transform = 'translate(-50%, -50%)';
  }

  //对比突出强调
  emphasizeAtom(isShow: boolean) {
    let value;
    isShow ? value = 0.1 : value = 1;
    this.setModelOpacity(this.moleculeArr1, value);
  }

  reset () {
    this.clearTimer();
    this.clearMolecule();
    this.setmagnifierEnable(0, false);
    this.setmagnifierEnable(1, false);
    this.setmagnifierEnable(2, false);

  }
}




