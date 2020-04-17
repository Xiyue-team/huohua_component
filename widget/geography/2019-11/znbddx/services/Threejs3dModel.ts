import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { TweenMax, Linear } from 'gsap';
import { LeftImageStorage } from '../storage/LeftImageStorage';

import backgroundImage from '../sub_static/img/left/backgroundImage.png';

const mapJson = require('../sub_static/config/map.json');

export class Threejs3dModel extends ThreeBase {
  private controls: any;

  textImageSrc: any = [];
  textArray: any = [];

  map: THREE.Mesh;

  mapWidth = mapJson.mapConfig.width;
  mapHeight = mapJson.mapConfig.height;
  timer: any;
  timerRender: any;
  cameraAnim: any;

  render = () => {

    if (!(window as any).viewHandler.viewModel.$data.isShow3dContainer) {
      return;
    }

    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    const x1 = 180 + 275 * -(this.camera.position.z - 500) / 350;
    const x2 = -270 + -275 * -(this.camera.position.z - 500) / 350;

    const y1 = 20 + 235 * -(this.camera.position.z - 500) / 350;
    const y2 = -70 + -236 * -(this.camera.position.z - 500) / 350;

    if (this.camera.position.x > x1) {
      this.camera.position.x = x1;

    }

    if (this.camera.position.x < x2) {
      this.camera.position.x = x2;
    }

    if (this.camera.position.y > y1) {
      this.camera.position.y = y1;
    }

    if (this.camera.position.y < y2) {
      this.camera.position.y = y2;
    }

    this.controls.target =  new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0);
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
    console.log('init Simple3DModel constructor');
    this.addTextImageSrc();
    this.init();
  }

  addTextImageSrc() {
    this.textImageSrc = (new LeftImageStorage()).textImageSrc;
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();

    this.addStaticImage();
    this.addTextImage();
    this.resize();
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#A7E0F6');
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(68, (this.width / 2) / (this.height / 2), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 500);
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
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new (THREE as any).CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new MapControls(this.camera as any, this.renderer.domElement);

    this.controls.screenSpacePanning = true; // 若为 true 则可以平移

    this.controls.enableRotate = false;

    this.controls.enableZoom = true;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;

    //设置相机距离原点的最远距离
    this.controls.minDistance = 150;
    this.controls.maxDistance = 600;

    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //是否自动旋转
    this.controls.minAzimuthAngle = -Math.PI * 2;
    this.controls.maxAzimuthAngle = Math.PI * 2;

    this.controls.maxPolarAngle = Math.PI;
  }

  resize() {
    const dom = document.getElementById('3dContainer');
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(width, height);
  }

  // 添加静态图片
  addStaticImage() {
    let x = 0;
    let y = 0;
    if (!!mapJson.mapConfig.x) {
      x = mapJson.mapConfig.x;
    }

    if (!!mapJson.mapConfig.y) {
      y = mapJson.mapConfig.y;
    }
    this.map = ThreeUtil.createImg(this.mapWidth / 3 / 1.25, this.mapHeight / 3 / 1.25, backgroundImage, x, y);
    this.scene.add(this.map);
  }


  // 添加文字
  addTextImage() {
    for (let i = 0; i < mapJson.textConfig.length; i++) {
      this.textArray[i] = this.createTextImage(this.textImageSrc[i], mapJson.textConfig[i]);
      this.map.add(this.textArray[i]);
    }
  }

  createTextImage(image: any, config: any) {
    const mesh = ThreeUtil.createImg(
      config.width / 3 / 1.25,
      config.height / 3 / 1.25, image,
      (config.left / 3 - this.mapWidth / 3 / 2 + config.width / 6) / 1.25,
      (-config.top / 3 + this.mapHeight / 3 / 2 - config.height / 6) / 1.25,
      1
    );
    mesh.name = config.name;
    mesh.visible = false;
    return mesh;
  }

  cameraChangeAnim(i: number) {
    const tween = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    this.cameraAnim = TweenMax.to(tween, 1, {
      x: this.textArray[i].position.x + this.map.position.x,
      y: this.textArray[i].position.y + this.map.position.y,
      z: 250,
      onUpdate: () => {
        this.controls.target =  new THREE.Vector3(tween.x, tween.y, 0);

        this.camera.position.x = tween.x;
        this.camera.position.y = tween.y;
        this.camera.position.z = tween.z;
      },

      onComplete: () => {
      },
      paused: true,
      ease: Linear.easeNone
    });

    return this.cameraAnim;
  }

  reverseCamera() {
    const tween = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    this.cameraAnim = TweenMax.to(tween, 1, {
      x: 0,
      y: 0,
      z: 500,
      onStart: () => {

      },
      onUpdate: () => {
        this.controls.target =  new THREE.Vector3(tween.x, tween.y, 0);

        this.camera.position.x = tween.x;
        this.camera.position.y = tween.y;
        this.camera.position.z = tween.z;
      },

      onComplete: () => {
      },
      paused: true,
      ease: Linear.easeNone
    });

    return this.cameraAnim;
  }

  // 高原
  showPlateauText(isShow: boolean) {}

  // 平原
  showPlainText(isShow: boolean) {}

  // 山地
  showHillyAreaText(isShow: boolean) {
    for (let i = 0; i < this.textArray.length; i++) {
      this.textArray[i].visible = isShow;
    }
  }

  resetResize() {
    this.timer = setInterval(() => {
      this.resize();

      if ((window as any).viewHandler.viewModel.$data.isShow3dContainer) {
        clearInterval(this.timer);
      }

    }, 10);
  }

  // 重启渲染
  resumeRender() {
    this.resetResize();

    this.timerRender = setInterval(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.controls.target =  new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0);

      if ((window as any).viewHandler.viewModel.$data.isShow3dContainer) {
        clearInterval(this.timerRender);
        this.render();
      }
    }, 30);
  }

  reset() {
    if (!!this.cameraAnim) {
      this.cameraAnim.progress(0);
      this.cameraAnim.pause();
    }

    this.camera.position.set(0, 0, 500);
    this.controls.target =  new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0);

    for (let i = 0; i < this.textArray.length; i++) {
      this.textArray[i].visible = false;
    }

    if (!(window as any).viewHandler.viewModel.$data.isShow3dContainer) {
      this.resumeRender();
    }
  }
}




