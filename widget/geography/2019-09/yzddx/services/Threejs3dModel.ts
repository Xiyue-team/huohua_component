import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

const TrackballControls = require('three-trackballcontrols');
const OrbitControls = require('three-orbitcontrols');
const dragcontrols = require('three-dragcontrols').default;

import backgroundImage from '../sub_static/img/left/backgroundImage.png';
import textImage1 from '../sub_static/img/left/textImage1.png';
import textImage2 from '../sub_static/img/left/textImage2.png';
import textImage3 from '../sub_static/img/left/textImage3.png';
import textImage4 from '../sub_static/img/left/textImage4.png';
import textImage5 from '../sub_static/img/left/textImage5.png';
import textImage6 from '../sub_static/img/left/textImage6.png';
import textImage7 from '../sub_static/img/left/textImage7.png';
import textImage8 from '../sub_static/img/left/textImage8.png';
import textImage9 from '../sub_static/img/left/textImage9.png';
import textImage10 from '../sub_static/img/left/textImage10.png';
import textImage11 from '../sub_static/img/left/textImage11.png';
import textImage12 from '../sub_static/img/left/textImage12.png';
import textImage13 from '../sub_static/img/left/textImage13.png';
import textImage14 from '../sub_static/img/left/textImage14.png';
import textImage15 from '../sub_static/img/left/textImage15.png';
import textImage16 from '../sub_static/img/left/textImage16.png';
import textImage17 from '../sub_static/img/left/textImage17.png';
import textImage18 from '../sub_static/img/left/textImage18.png';
import textImage19 from '../sub_static/img/left/textImage19.png';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { TweenMax } from 'gsap';


const textConfig = require('../sub_static/textConfig.json');

export class Threejs3dModel extends ThreeBase {
  private controls: any;

  textImageSrc: any = [];
  textArray: any = [];

  map: THREE.Mesh;
  circle: any;

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
    console.log('init Simple3DModel constructor');
    this.addTextImageSrc();
    this.init();
  }

  addTextImageSrc() {
    this.textImageSrc = [
      textImage1, textImage2, textImage3, textImage4, textImage5,
      textImage6, textImage7, textImage8, textImage9, textImage10,
      textImage11, textImage12, textImage13, textImage14, textImage15,
      textImage16, textImage17, textImage18, textImage19
    ];
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();

    this.addStaticImage();
    this.addTextImage();

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
    this.map = ThreeUtil.createImg(3000 / 3, 2242 / 3, backgroundImage, 72, -35);
    this.scene.add(this.map);
  }


  // 添加文字
  addTextImage() {
    for (let i = 0; i < textConfig.length; i++) {
      console.log(textConfig[i].name);
      this.textArray[i] = this.createTextImage(this.textImageSrc[i], textConfig[i]);
      this.map.add(this.textArray[i]);
    }
  }

  createTextImage(image: any, config: any) {
    const mesh = ThreeUtil.createImg(
      config.width / 3,
      config.height / 3, image,
      config.left / 3 - 500 + config.width / 6,
      -config.top / 3 + 373 - config.height / 6,
      1
    );
    mesh.name = config.name;
    return mesh;
  }

  cameraChangeAnim(i: number) {
    const tween = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    const anim = TweenMax.to(tween, 1, {
      x: this.textArray[i].position.x + 60,
      y: this.textArray[i].position.y - 50,
      z: 150,
      onStart: () => {
        console.log('开始动画');
      },
      onUpdate: () => {
        this.controls.target =  new THREE.Vector3(tween.x, tween.y, 0);

        this.camera.position.x = tween.x;
        this.camera.position.y = tween.y;
        this.camera.position.z = tween.z;
      },

      onComplete: () => {
      },
      paused: true
    });

    return anim;
  }

  reverseCamera() {
    const tween = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    const anim = TweenMax.to(tween, 1, {
      x: 0,
      y: 0,
      z: 500,
      onStart: () => {
        console.log('开始动画');
      },
      onUpdate: () => {
        this.controls.target =  new THREE.Vector3(tween.x, tween.y, 0);

        this.camera.position.x = tween.x;
        this.camera.position.y = tween.y;
        this.camera.position.z = tween.z;
      },

      onComplete: () => {
      },
      paused: true
    });

    return anim;
  }

  reset() {

    // let i = 0;
    // setInterval(() => {
    //   console.log('名字', this.textArray[i].name);
    //
    //   this.controls.target =  new THREE.Vector3(this.textArray[i].position.x + 60, this.textArray[i].position.y - 50, 0);
    //   this.camera.position.z = 150;
    //   this.camera.position.x = this.textArray[i].position.x + 60;
    //   this.camera.position.y = this.textArray[i].position.y - 50;
    //
    //   if (i < this.textArray.length) {
    //     i += 1;
    //   }
    // }, 2000);

    // this.reverseCamera().play();


  }
}




