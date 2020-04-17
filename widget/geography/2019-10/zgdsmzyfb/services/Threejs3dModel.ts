import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dx from './../sub_static/dx.png';
import * as dx1 from './../sub_static/dx1.png';
import * as nb from './../sub_static/nb.png';
import * as nb1 from './../sub_static/nb1.png';
import * as hxsm from './../sub_static/hxsm.png';
import * as xb from './../sub_static/xb.png';
import * as xb1 from './../sub_static/xb1.png';
import * as db from './../sub_static/db.png';
import * as db1 from './../sub_static/db1.png';
import * as map from './../sub_static/map.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
export class Threejs3dModel extends ThreeBase {
  private controls: any;
  private db: THREE.Mesh;
  private db1: THREE.Mesh;
  private dx: THREE.Mesh;
  private dx1: THREE.Mesh;
  private hxsm: THREE.Mesh;
  private nb: THREE.Mesh;
  private nb1: THREE.Mesh;
  private xb: THREE.Mesh;
  private xb1: THREE.Mesh;
  private render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    const x1 = 180 + 275 * -(this.camera.position.z - 500) / 350;
    const x2 = -70 + -275 * -(this.camera.position.z - 500) / 350;

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
    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    this.addStaticImage();
    this.resize();
    this.render();
  }

  //预加载图片
  preload() {
    const imageArray = [map, dx, dx1, nb, nb1, hxsm, xb, xb1, db, db1];
    console.log(imageArray);
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#FFFFFF');
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
    const mapImage = ThreeUtil.createImg(671, 524, map, 0, 0, 0);
    this.dx = ThreeUtil.createImg(671, 524, dx, 0, 0, 0);
    this.dx1 = ThreeUtil.createImg(671, 524, dx1, 0, 0, 0);
    this.nb = ThreeUtil.createImg(671, 524, nb, 0, 0, 0);
    this.nb1 = ThreeUtil.createImg(671, 524, nb1, 0, 0, 0);
    this.hxsm = ThreeUtil.createImg(671, 524, hxsm, 0, 0, 0);
    this.xb = ThreeUtil.createImg(671, 524, xb, 0, 0, 0);
    this.xb1 = ThreeUtil.createImg(671, 524, xb1, 0, 0, 0);
    this.db = ThreeUtil.createImg(671, 524, db, 0, 0, 0);
    this.db1 = ThreeUtil.createImg(671, 524, db1, 0, 0, 0);
    this.scene.add(mapImage, this.dx, this.dx1, this.nb, this.nb1, this.hxsm, this.xb, this.xb1, this.db, this.db1);
    this.dx.visible = false;
    this.dx1.visible = false;
    this.nb.visible = false;
    this.nb1.visible = false;
    this.hxsm.visible = false;
    this.xb.visible = false;
    this.xb1.visible = false;
    this.db.visible = false;
    this.db1.visible = false;
  }

  imageIsShow(value: string, isShow: boolean) {
    switch (value) {
      case 'dx':
        this.dx.visible = isShow;
        break;
      case 'dx1':
        this.dx1.visible = isShow;
        break;
      case 'nb':
        this.nb.visible = isShow;
        break;
      case 'nb1':
        this.nb1.visible = isShow;
        break;
      case 'hxsm':
        this.hxsm.visible = isShow;
        break;
      case 'xb':
        this.xb.visible = isShow;
        break;
      case 'xb1':
        this.xb1.visible = isShow;
        break;
      case 'db':
        this.db.visible = isShow;
        break;
      case 'db1':
        this.db1.visible = isShow;
        break;
    }
  }

  reset() {
    this.camera.position.set(0, 0, 500);
    this.dx.visible = false;
    this.dx1.visible = false;
    this.nb.visible = false;
    this.nb1.visible = false;
    this.hxsm.visible = false;
    this.xb.visible = false;
    this.xb1.visible = false;
    this.db.visible = false;
    this.db1.visible = false;
    this.controls.target =  new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0);
  }
}




