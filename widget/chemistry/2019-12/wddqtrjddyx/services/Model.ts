import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { RandomModel } from './RandomModel';
import * as molecule from '../sub_static/molecule.png'; //分子
import * as beaker from '../sub_static/beaker.png'; //容器
import * as thermometer from '../sub_static/thermometer.png';   //温度计
import * as slider from '../sub_static/slider.png';   //滑块

const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;

export class Model extends ThreeBase {

  private beaker        = ThreeUtil.createImg(503, 402, beaker, 0, 0, 1);
  private temperature   = ThreeUtil.createImg(50, 200, thermometer, 350, 0, 0);
  private sliderImage   = ThreeUtil.createImg(66, 34, slider, 400, -20, 0);

  // 创建分子组及分子变量
  private moleculeArr1: any = [];
  private activeA: any;
  private activeB: any;
  // 创建分子运动的定时器
  private timer1: any;

  private plane: any;
  private rightText: any;
  private leftText: any;
  private sliderText: any;

  private airAtomLine: any;
  private waterAtomLine: any;

  private temperatureState: any;

  private render = () => {
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
    this.rightText = window.env.browserInfo.lang.buttonText;
    this.leftText = window.env.browserInfo.lang.beakerText;
    this.init();
  }

  init(): void {
    this.temperatureState = 'low';
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    this.initImage();
    this.initAirTopModel(250, -100, 1);
    this.initCenterModel(-100, -170, 0.5);
    this.initWaterrModel(0.5);
    this.runAnimation(this.moleculeArr1);
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
    const far = 1000;
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
    (this.sliderImage as any).cursor = 'pointer';
    this.scene.add(this.beaker);
    this.scene.add(this.temperature, this.sliderImage);
  }

  //创建空气最上方分子
  initAirTopModel(maxHeight: number, minHeight: number, rate: number) {
    for (let i = 0; i < 15; i++) {
      this.createMolecule(this.activeA, 'activeA', 1, maxHeight, minHeight, rate, this.moleculeArr1);
    }
  }
  //创建容器空气和水之间的分子
  initCenterModel(maxHeight: number, minHeight: number, rate: number) {
    for (let i = 0; i < 15; i++) {
      this.createMolecule(this.activeA, 'activeA', 2, maxHeight, minHeight, rate, this.moleculeArr1);
    }
  }
  //创建水里的分子
  initWaterrModel(rate: number) {
    for (let i = 0; i < 2; i++) {
      this.createMolecule(this.activeA, 'activeA', 3, -100, -170, rate, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeA', 3, -100, -160, rate, this.moleculeArr1);
      this.createMolecule(this.activeA, 'activeA', 3, -100, -160, rate, this.moleculeArr1);
      this.createMolecule(this.activeB, 'activeA', 3, -100, -160, rate, this.moleculeArr1);
      this.createMolecule(this.activeA, 'activeA', 3, -100, -160, rate, this.moleculeArr1);
    }
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
    const pointA = ThreeUtil.createPoint(4, '#C7C8C8', 349, 80, 1);
    const highLightA = ThreeUtil.createPoint(3.5, '#fff', 0, 0, 1);
    pointA.add(highLightA);
    pointA.position.z = 2;

    const pointB = pointA.clone();
    pointB.position.set(349, 30, 2);

    const pointC = pointA.clone();
    pointC.position.set(349, -20, 2);

    this.sliderText = ThreeUtil.createNormalText(this.rightText[2], 5, 8, 0, '#000', 0.3);
    this.sliderImage.add(this.sliderText);
    this.createMark(112, 36);
    this.scene.add(pointA, pointB, pointC);
  }
  //创建右侧温度遮挡板
  createMark( height: number, positionY: number) {
    this.plane = ThreeUtil.createPlane(12, height, '#fff', 1);
    this.plane.position.set(349.5, positionY, 0);
    this.scene.add(this.plane);
  }
  //设置温度滑动事件
  initButtonEvent() {
    const dargSlider = new dragcontrols([this.sliderImage], this.camera, this.renderer.domElement);
    dargSlider.addEventListener('dragstart', () => {
      this.airAtomLine.visible = this.waterAtomLine.visible = false;
    });
    dargSlider.addEventListener('drag', () => {
      this.sliderImage.position.x = 400;
      if (this.sliderImage.position.y > 92) {
        this.sliderImage.position.y = 92;
      } else if (this.sliderImage.position.y < -20) {
        this.sliderImage.position.y = -20;
      }
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.scene.remove(this.plane);
      const height = 92 - this.sliderImage.position.y;
      const posY = 36 + (112 - height) / 2;
      this.createMark(height, posY);
      if (this.sliderImage.position.y < 0) {            // 低温状态
        this.sliderText.text = this.rightText[2];
      } else {
        if (this.sliderImage.position.y < 50) {
          this.sliderText.text = this.rightText[1];
        } else {
          this.sliderText.text = this.rightText[0];
        }
      }
    });
    dargSlider.addEventListener('dragend', () => {
      if (this.sliderImage.position.y < 0) {            // 低温状态
        this.sliderImage.position.y = -20;
        this.lowPressureEvent();
      } else {
        if (this.sliderImage.position.y < 50) {
          this.sliderImage.position.y = 30;             // 中温状态
          this.mediumPressureEvent();
        } else {
          this.sliderImage.position.y = 80;             // 高温状态
          this.highPressureEvent();
        }
      }
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.scene.remove(this.plane);
      const height = 92 - this.sliderImage.position.y;
      const posY = 36 + (112 - height) / 2;
      this.createMark(height, posY);
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
    this.moleculeArr1 = [];
  }

  //创建分子函数
  createMolecule(atom: any, name: string, num: number, animaMaxHeight: number, animaMinHeight: number, rate: number, arr: any) {
    let randomX1, randomY1;
    switch (num) {
      case 1:
        randomX1 = Math.random() * 200 - 200 * Math.random();
        if (this.temperatureState === 'low') {
          randomY1 = 50 * Math.random() + 10 * Math.random();
        } else if (this.temperatureState === 'middle') {
          randomY1 = 100 * Math.random() - 50 * Math.random();
        } else {
          randomY1 = 100 * Math.random();
          rate = 1;
        }
        break;
      case 2:
        randomX1 = Math.random() * 220 - 220 * Math.random();
        if (this.temperatureState === 'low') {
          randomY1 = -100 * Math.random() - 70;
        } else if (this.temperatureState === 'middle') {
          randomY1 = 10 * Math.random() - 60 * Math.random() - 100 * Math.random();
        } else {
          randomY1 = 150 * Math.random() - 100 * Math.random();
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
    if (this.temperatureState === 'low') {
      return;
    }
    this.temperatureState = 'low';
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(250, -100, 1);
    this.initCenterModel(-100, -170, 0.8);
    this.initWaterrModel(0.5);
    this.runAnimation(this.moleculeArr1);
  }
  //中压
  mediumPressureEvent() {
    if (this.temperatureState === 'middle') {
      return;
    }
    this.temperatureState = 'middle';
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(250, 0, 1.2);
    this.initCenterModel(-40, -150, 1);
    this.initWaterrModel(0.8);
    this.runAnimation(this.moleculeArr1);
  }
  //高压
  highPressureEvent() {
    if (this.temperatureState === 'high') {
      return;
    }
    this.temperatureState = 'high';
    this.clearTimer();
    this.clearMolecule();
    this.initAirTopModel(250, 0, 1.5);
    this.initCenterModel(250, -100, 1.2);
    this.initWaterrModel(1);
    this.runAnimation(this.moleculeArr1);
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

  reset () {
    this.airAtomLine.visible = this.waterAtomLine.visible = true;
    if (this.temperatureState === 'low') {
      return;
    }
    this.lowPressureEvent();
    this.sliderText.text = this.rightText[2];
    this.plane.geometry.dispose();
    this.plane.material.dispose();
    this.scene.remove(this.plane);
    this.createMark(112, 36);
    this.sliderImage.position.set(400, -20, 0);

  }
}




