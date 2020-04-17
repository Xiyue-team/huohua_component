import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { RandomModel } from './RandomModel';
import * as molecule from '../sub_static/molecule.png'; //分子
import * as beaker from '../sub_static/beaker.png'; //容器
import * as piston from '../sub_static/piston.png';   //瓶塞
import * as rect from '../sub_static/rect.png';   //右侧矩形
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';

const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;

export class Model extends ThreeBase {
  private controls: any;

  private beaker        = ThreeUtil.createImg(503, 402, beaker, 0, 0, 1);
  private piston        = ThreeUtil.createImg(479, 60, piston, 0, 198, 0);
  private rect          = ThreeUtil.createImg(98, 211, rect, 350, 0, 0);

  // 创建分子组及分子变量
  private moleculeArr1: any = [];
  private moleculeArr2: any = [];
  private moleculeArr3: any = [];
  private activeA: any;
  private activeB: any;
  // 创建分子运动的定时器
  private timer1: any;
  private timer4: any;

  private pointA: any;
  private pointB: any;
  private pointC: any;

  private rightText: any;
  private leftText: any;

  private airAtomLine: any;
  private waterAtomLine: any;

  private pressureState: any;

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
    this.rightText = window.env.browserInfo.lang.buttonText;
    this.leftText = window.env.browserInfo.lang.beakerText;
    this.init();
  }

  init(): void {
    this.pressureState = 'low';
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    this.initImage();
    this.initAirTopModel(150, 0);
    this.initCenterModel(150, -120);
    this.initWaterrModel();
    this.initControlPlane();
    this.initLeftText();
    this.initButtonEvent();
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
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 650);
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
    this.controls.enablePan = false;
    this.controls.screenSpacePanning = false; // 若为 true 则可以平移
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;
    //设置相机距离原点的最远距离
    this.controls.minDistance = 150;
    this.controls.maxDistance = 700;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //是否自动旋转
    this.controls.minAzimuthAngle = -Math.PI * 2;
    this.controls.maxAzimuthAngle = Math.PI * 2;
    this.controls.maxPolarAngle = Math.PI;
  }

  //初始化页面图片
  initImage () {
    this.scene.add(this.beaker, this.piston);
  }

  //创建空气最上方分子
  initAirTopModel(maxHeight: number, minHeight: number) {
    for (let i = 0; i < 5; i++) {
      this.createMolecule(this.activeA, 'activeA', 1, maxHeight, minHeight, 1.5, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeB', 1, maxHeight, minHeight, 1.5, this.moleculeArr1);
      this.createMolecule(this.activeA, 'activeB', 1, maxHeight, minHeight, 1.5, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeB', 1, maxHeight, minHeight, 1.5, this.moleculeArr1);
    }
    this.runAnimation(this.moleculeArr1);
  }
  //创建容器空气和水之间的分子
  initCenterModel(maxHeight: number, minHeight: number) {
    for (let i = 0; i < 10; i++) {
      this.createMolecule(this.activeA, 'activeA', 2, maxHeight, minHeight, 1, this.moleculeArr2);
    }
    this.runAnimation(this.moleculeArr2);
  }
  //创建水里的分子
  initWaterrModel() {
    for (let i = 0; i < 2; i++) {
      this.createMolecule(this.activeA, 'activeA', 3, -120, -170, 0.5, this.moleculeArr3);
      this.createMolecule(this.activeB, 'activeA', 3, -120, -160, 0.5, this.moleculeArr3);
      this.createMolecule(this.activeA, 'activeA', 3, -120, -160, 0.5, this.moleculeArr3);
      this.createMolecule(this.activeB, 'activeA', 3, -120, -160, 0.5, this.moleculeArr3);
      this.createMolecule(this.activeA, 'activeA', 3, -120, -160, 0.5, this.moleculeArr3);
    }
    this.runAnimation1(this.moleculeArr3);
  }

  //容器最左侧文字
  initLeftText() {
    this.airAtomLine = ThreeUtil.createLine(100, 1, '#d5d5d5', 1);
    this.airAtomLine.position.set(-270, 0, 2);
    const airAtomText = ThreeUtil.createNormalText(this.leftText[0], -90, 8, 0, '#ffffff', 0.3);

    this.waterAtomLine = ThreeUtil.createLine(100, 1, '#d5d5d5', 1);
    this.waterAtomLine.position.set(-270, -120, 2);
    const waterAtomText = ThreeUtil.createNormalText(this.leftText[1], -70, 8, 0, '#ffffff', 0.3);

    this.airAtomLine.add(airAtomText);
    this.waterAtomLine.add(waterAtomText);

    this.scene.add(this.airAtomLine);
    this.scene.add(this.waterAtomLine);
  }
  //初始化右侧控制区域
  initControlPlane() {
    const buttonTopText = ThreeUtil.createNormalText(this.rightText[0], 0, 90, 0, '#fff', 0.4);
    this.pointA = ThreeUtil.createPoint(12, '#C7C8C8', -12, 40, 1);
    const highLightA = ThreeUtil.createPoint(4, '#fff', 0, 0, 1);
    const textA = ThreeUtil.createNormalCenterLeftText(this.rightText[1], 20, 8, 0, '#fff', 0.3);

    this.pointB = ThreeUtil.createPoint(12, '#C7C8C8', -12, -15, 1);
    const highLightB = ThreeUtil.createPoint(4, '#fff', 0, 0, 1);
    const textB = ThreeUtil.createNormalCenterLeftText(this.rightText[2], 20, 8, 0, '#fff', 0.3);

    this.pointC = ThreeUtil.createPoint(12, '#0091FF', -12, -70, 1);
    const highLightC = ThreeUtil.createPoint(4, '#fff', 0, 0, 1);
    const textC = ThreeUtil.createNormalCenterLeftText(this.rightText[3], 20, 8, 0, '#fff', 0.3);

    this.pointA.add(highLightA);
    this.pointA.add(textA);
    this.pointB.add(highLightB);
    this.pointB.add(textB);
    this.pointC.add(highLightC);
    this.pointC.add(textC);

    this.rect.add(buttonTopText);
    this.rect.add(this.pointA, this.pointB, this.pointC);
    this.scene.add(this.rect);
  }
  //设置压强按钮事件
  initButtonEvent() {
    const dargPointA = new dragcontrols([this.pointA], this.camera, this.renderer.domElement);
    const dargPointB = new dragcontrols([this.pointB], this.camera, this.renderer.domElement);
    const dargPointC = new dragcontrols([this.pointC], this.camera, this.renderer.domElement);

    const defaultColor = '#C7C8C8';
    const highLightColor = '#0091FF';
    //高压
    dargPointA.addEventListener('dragstart', () => {
      this.airAtomLine.visible = this.waterAtomLine.visible = false;
      //防止相同状态重复点击
      if (this.pressureState === 'high') {
        return;
      }
      this.pressureState = 'high';
      this.piston.position.y = 20;
      this.pointA.material.color.set( highLightColor );
      this.pointB.material.color.set( defaultColor );
      this.pointC.material.color.set( defaultColor );
      this.highPressureEvent();

    });
    dargPointA.addEventListener('drag', () => {
      this.pointA.position.set(-12, 40, 0);
    });
    //中压
    dargPointB.addEventListener('dragstart', () => {
      this.airAtomLine.visible = this.waterAtomLine.visible = false;
      //防止相同状态重复点击
      if (this.pressureState === 'middle') {
        return;
      }
      this.pressureState = 'middle';
      this.piston.position.y = 90;
      this.pointA.material.color.set( defaultColor );
      this.pointB.material.color.set( highLightColor );
      this.pointC.material.color.set( defaultColor );
      this.mediumPressureEvent();
    });
    dargPointB.addEventListener('drag', () => {
      this.pointB.position.set(-12, -15, 0);
    });
    //低压
    dargPointC.addEventListener('dragstart', () => {
      this.airAtomLine.visible = this.waterAtomLine.visible = false;
      //防止相同状态重复点击
      if (this.pressureState === 'low') {
        return;
      }
      this.pressureState = 'low';
      this.piston.position.y = 198;
      this.pointA.material.color.set( defaultColor );
      this.pointB.material.color.set( defaultColor );
      this.pointC.material.color.set( highLightColor );
      this.lowPressureEvent();
    });
    dargPointC.addEventListener('drag', () => {
      this.pointC.position.set(-12, -70, 0);
    });
  }

  // 清除定时器
  clearTimer() {
    cancelAnimationFrame(this.timer1);
  }

  // 清空数组中分子并重新添加分子
  clearMolecule () {
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      this.moleculeArr1[i].stopMoveAnimate();
      this.moleculeArr1[i].removeSince(this.scene);
    }
    for (let i = 0; i < this.moleculeArr2.length; i++) {
      this.moleculeArr2[i].stopMoveAnimate();
      this.moleculeArr2[i].removeSince(this.scene);
    }
    this.moleculeArr1 = [];
    this.moleculeArr2 = [];
  }

  //创建分子函数
  createMolecule(atom: any, name: string, num: number, animaMaxHeight: number, animaMinHeight: number, rate: number, arr: any) {
    let randomX1, randomY1;
    switch (num) {
      case 1:
        randomX1 = Math.random() * 200 - 200 * Math.random();
        if (this.pressureState === 'low') {
          randomY1 = 100 * Math.random() + 10 * Math.random();
        } else if (this.pressureState === 'middle') {
          randomY1 = 10 * Math.random() - 50 * Math.random();
        } else {
          randomY1 = 10 * Math.random() - 50 * Math.random() - 40;
          rate = 1;
        }
        break;
      case 2:
        randomX1 = Math.random() * 250 - 250 * Math.random();
        if (this.pressureState === 'low') {
          randomY1 = -40 * Math.random();
        } else if (this.pressureState === 'middle') {
          randomY1 = 10 * Math.random() - 60 * Math.random() - 100 * Math.random();
        } else {
          randomY1 = 10 * Math.random() - 50 * Math.random() - 120;
        }
        break;
      case 3:
        randomX1 = Math.random() * 220 - 220 * Math.random();
        randomY1 = -70 * Math.random() - 100;
        break;
    }
    atom = new RandomModel(randomX1, randomY1, 0, 18, 18, molecule, name);
    atom.selfMoveAnimate(randomX1, randomY1, 210, -210, animaMaxHeight, animaMinHeight, rate);
    arr.push(atom);
    atom.addSince(this.scene);
  }

  //低压情况下
  lowPressureEvent() {
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(150, 0);
    this.initCenterModel(150, -120);
  }
  //中压
  mediumPressureEvent() {
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(40, -100);
    this.initCenterModel(0, -170);
  }
  //高压
  highPressureEvent() {
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(-25, -150);
    this.initCenterModel(-25, -170);
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
  runAnimation(arr: any ) {
    const self = this;
    function ani() {
      self.rebound(arr);
      self.timer1 = requestAnimationFrame(ani);
    }
    ani();
  }
  // 反应中分子的运动函数
  runAnimation1(arr: any) {
    const self = this;
    function ani() {
      self.rebound(arr);
      self.timer4 = requestAnimationFrame(ani);
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

    const threeCanvas = dom.children[0];
    (threeCanvas as any).style.position = 'absolute';

    if (threeCanvas.clientWidth < width) {
      (threeCanvas as any).style.left = (width - scaleWidth) / 2 + 'px';
    }
    if (threeCanvas.clientHeight < height) {
      (threeCanvas as any).style.top = (height - scaleHeight) / 2 + 'px';
    }
  }

  reset () {
    this.airAtomLine.visible = this.waterAtomLine.visible = true;
    if (this.pressureState === 'low') {
      return;
    }
    this.pressureState = 'low';
    this.piston.position.y = 198;
    this.pointA.material.color.set( '#C7C8C8' );
    this.pointB.material.color.set( '#C7C8C8' );
    this.pointC.material.color.set( '#0091FF' );
    this.lowPressureEvent();
  }
}




