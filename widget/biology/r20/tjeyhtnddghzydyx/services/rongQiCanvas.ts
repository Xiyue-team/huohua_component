import * as THREE from 'three';
import { Scene, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const Interaction = require('three.interaction');
import { Leaf } from './leaf';
import commit from './CommonForThree';
import * as bg from '../sub_static/UI/rongqi.png';
import * as wuguang from '../sub_static/UI/wuguang.png';
import * as backG from '../sub_static/UI/background.png';
import * as guangxian from '../sub_static/UI/guangxian.png';
import * as eyhg from '../sub_static/UI/yezi.bin';
import * as eyhg1 from '../sub_static/UI/yezi.gltf';
import * as ye from '../sub_static/UI/yezi_m_baseColor.jpg';
import $ from 'jquery-ts';

export class RongqiCanvas extends ThreeBase {

  private rongqi = commit.createImg([-240, -25, -3], 210, 225, bg);
  private deng = commit.createImg([-74.6, -13.5, 2], 90, 241.2, wuguang);
  private guangxian = commit.createImg([-258, -30, 1], 328, 342.5, guangxian);
  private text = commit.createText('溶液温度为30°C', [-240, -140, -3], {color: ''});
  private backG: any;

  private leaf: any = [];
  private leafGroup: any = [];

  private timer: any;

  private timeAndrotate: any;

  private pos: any = [];
  public Arr: any = [];
  private obj1 = new THREE.Object3D();

  browserInfo: BrowserInfo;
  private render = () => {
    requestAnimationFrame(this.render);
    this.hafePos();
    this.renderer.render(this.scene, this.camera);
  }

  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.init();
    console.log(eyhg);
  }

  init(): void {
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
    this.initModel();
    this.initEve();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    const W = window.innerWidth;
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    if (W > 900 && W < 1200) {
      this.camera.position.set(0, 0, 600);
    } else {
      this.camera.position.set(0, 0, 500);
    }
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  initEve() {
    this.initScene1(ye);
    this.scene.add(this.rongqi, this.deng, this.text);
  }
  hafePos() {
    //获取到窗口的一半高度和一半宽度
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    const vector = this.deng.position.clone().project(this.camera);
    const vector_x = vector.x * 0.9;
    const vector_y = vector.y * 0.9;
    $('#button1').css({
      left: vector_x * halfWidth * 4.9 + halfWidth,
      top: vector_y * halfHeight * 12 + halfHeight 
    });
    $('#button2').css({
      left: vector_x * halfWidth * 3.9 + halfWidth,
      top: vector_y * halfHeight * 12 + halfHeight 
    });
    $('#button3').css({
      left: vector_x * halfWidth * 2.9 + halfWidth,
      top: vector_y * halfHeight * 12 + halfHeight 
    });
    $('.threeCanvas').css({
      left: vector_x * halfWidth * 3.8 + halfWidth,
      top: -vector_y * halfHeight * 13 + halfHeight 
    });
  }
  addLight() {
    this.scene.add(this.guangxian);
  }

//加载场景1模型
  async initScene1(src: any) {
    const model1: any = await this.gltfLoader(eyhg1 as any);
    model1.scene.traverse((child: any) => {
      if (child instanceof Scene) {
        this.obj1.add(child);
      }
    });
    (this.obj1.children[0].children[0] as any).material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(src)
    });
    this.getLeaf(this.obj1);
  }

//产生叶片
  getLeaf(obj: any) {
    for (let i = 0; i < 10; i++) {
      clearTimeout(this.timer);
      const obj1 = obj.clone();
      this.leaf[i] = new Leaf([-320 + 19 * i, -128, 5], obj1, i, this.scene, this.Arr);
      this.pos.push(this.leaf[i].startPos);
      this.timeAndrotate = this.leaf[i].initPos();
      this.leaf[i].obj.rotateX(this.timeAndrotate[0][i]);
      this.leafGroup.push(this.leaf[i]);
    }
  }


//点击按钮 触发动画
  anniu(isNum: number, num?: number, numb?: number) {
    if (isNum === 0) {
      //删除叶片
      for (let i = 0; i < 10; i++) {
        this.leaf[i].removeLeaf(this.scene);
      }

      //重置叶片位置
      this.getLeaf(this.obj1);

      //叶片上浮动画
      this.contrialLeaf(numb);
    }
  }

  resetQipao() {
    for (let i = 0; i < 10; i++) {
      this.leaf[i].removeQ();
    }
  }

//重置叶片 气泡
  resetLeafPos(num: number) {
    for (let i = 0; i < 10; i++) {
      this.leaf[i].removeLeaf(this.scene);
    }
    this.getLeaf(this.obj1);
    if (num === 0) {
      this.anniu(1, 20);
    } else if (num === 1) {
      this.anniu(1, 25);
    } else if (num === 2) {
      this.anniu(1, 30);
    }
  }

//控制叶片上浮个数
  contrialLeaf(numb: number) {
    for (let i = 0; i < 10; i++) {
      if (numb === 1) {
        if (~[0, 1, 2, 4, 5].indexOf(i)) {
          this.leaf[i].leafAnimation(i);
        }
      } else if (numb === 2) {
        if (~[0, 1, 2, 3, 4, 6, 8].indexOf(i)) {
          this.leaf[i].leafAnimation(i);
        }
      } else if (numb === 3) {
        this.leaf[i].leafAnimation(i);
      }
    }
  }
  initModel() {
    const H = window.innerHeight;
    if (!(H < 900  && H > 600)) {
      const Wx = ((0) / window.innerWidth) * 2 - 1;
      const Hy = -((0) / window.innerHeight) * 2 + 1;
      const standardVector  = new THREE.Vector3( 2550 * Wx, 3000 * Hy, 0);
      const worldVector = standardVector.unproject(this.camera);
      const loader =  new THREE.TextureLoader();
      const textture = loader.load(`${backG}`);
      const G = new THREE.PlaneGeometry(Math.abs(worldVector.x) * 2, Math.abs(worldVector.y) * 2);
      const M = new THREE.MeshBasicMaterial({
        map: textture
      });
      const Plane = new THREE.Mesh(G, M);
      Plane.position.y = 34.5;
      Plane.position.z = -4;
      this.scene.add(Plane);
    }
  }
  removeL() {
    this.scene.remove(this.guangxian);
  }

  resize(width: number, height: number): void {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
