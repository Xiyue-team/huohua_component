import * as THREE from 'three';
import { Scene, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import $ from 'jquery-ts'; 

const Interaction = require('three.interaction');
import { SliderControlLine } from './SliderControlLine';
import { Leaf } from './leaf';
import commit from './CommonForThree';
import * as bg from '../sub_static/UI/rongqi.png';
import * as guangxian from '../sub_static/UI/guangxian.png';
import * as wuguang from '../sub_static/UI/wuguang.png';
import * as zhichi from '../sub_static/UI/biaochi.png';
import * as backG from '../sub_static/UI/background.png';
import * as jiantou from '../sub_static/UI/jiantou.png';
import * as eyhg from '../sub_static/UI/yezi.bin';
import * as eyhg1 from '../sub_static/UI/yezi.gltf';
import * as ye from '../sub_static/UI/yezi_m_baseColor.jpg';

export class RongqiCanvas extends ThreeBase {
  sliderControlLine: SliderControlLine;
  browserInfo: BrowserInfo;
  private rongqi: any = commit.createImg([-258, -18, -3], 210, 225, bg);
  private zhichi = commit.createImg([2, -140, 2], 323, 25.2, zhichi);
  private deng = commit.createImg([-84.6, -6.5, 2], 90, 241.2, wuguang);
  private guangxian: any = commit.createImg([-268, -23, 1], 328, 342.5, guangxian);
  private backG: any;
  private jiantou = commit.createImg([30, 0, 0], 70, 19, jiantou);
  private text = commit.createText('溶液温度为30°C，', [-303, -132, -3], {color: ""});
  private text1 = commit.createText1('CO2', [-255, -138.8, -3], {color: '#FFF'});
  private text2 = commit.createText('浓度为1%mol/L', [-208, -132, -3], {color: ""});

  private leaf: any = [];
  private leafGroup: any = [];

  private timer: any;

  private timeAndrotate: any;
  private move: any = true;

  private pos: any = [];
  private ow: any;
  public Arr: any = [];
  private oldDate: any = -96.6;
  public isMake: any = false;
 
  private obj1 = new THREE.Object3D();
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
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.init();
    console.log(eyhg);
  }

  init(): void {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initLight();
    this.initEve();
    this.initEvtDrag();
    this.initModel();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
    this.ow = (window as any).viewHandler.viewModel;
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

  initLight(): void {
    const ambientLight = new THREE.AmbientLight('#ffffff');
    this.scene.add(ambientLight);
  }

  initEve() {
    this.rongqi.material.depthTest = true;
    (this.rongqi.material as any).opacity = 0.5;
    (this.zhichi.material as any).opacity = 0.5;
    this.deng.name = 'deng';
    this.initScene1(ye);
    this.scene.add(this.rongqi, this.zhichi, this.deng, this.jiantou, this.text, this.text1, this.text2);
  }

  hafePos() {
    //获取到窗口的一半高度和一半宽度
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    const vector = this.rongqi.position.clone().project(this.camera);
    const vector_x = vector.x * 0.9;
    const vector_y = vector.y * 0.9;
    $('button').css({
      left: vector_x * halfWidth * 0.55 + halfWidth,
      top: vector_y * halfHeight *  9 + halfHeight 
    });
    $('.threeCanvas').css({
      left: vector_x * halfWidth * 1.15 + halfWidth,
      top: -vector_y * halfHeight * 9 + halfHeight 
    });
    if (2 * halfHeight < 600) {
      $('.echarts').css({
        left: -vector_x * halfWidth * 0.7 + halfWidth,
        top: vector_y * halfHeight * 10 + halfHeight 
      });
    } else if (2 * halfHeight > 600 && 2 * halfHeight < 900) {
      $('.echarts').css({
        left: -vector_x * halfWidth * 0.7 + halfWidth,
        top: vector_y * halfHeight * 8 + halfHeight 
      });
    } else {
      $('.echarts').css({
        left: -vector_x * halfWidth * 0.7 + halfWidth,
        top: vector_y * halfHeight * 5 + halfHeight 
      });
    }
  }
// 初始化拖动点
  initEvtDrag() {
    const sliderControlLine = new SliderControlLine([this.deng]);
    sliderControlLine.setRongqiCanvas(this);
    this.sliderControlLine = sliderControlLine.initEvent(this.camera, this.renderer);
  }

// 获取拖动点坐标
// tslint:disable-next-line:member-ordering
  downHandle(obj: any) {
    this.scene.remove(this.jiantou);
    this.oldDate = obj.position.x;
  }

  moveHandle(pos: any, obj: any): void {
    const { x, y } = pos;
    obj.position.x = x < 109 ? x < -84.6 ? -84.6 : x : 109;
    obj.position.y = -6.5;
    if (!this.ow.open) {
      if (this.oldDate === -84.6) {
        if (this.Arr.length !== 9) {
          obj.position.x = -84.6;
          obj.position.y = -6.5;
          this.move = false;
          this.guangxian.position.x = obj.position.x - 183.4;
          return;
        }
      } else if (this.oldDate === 12.67) {
        if (this.Arr.length !== 6) {
          obj.position.x = 12.67;
          obj.position.y = -6.5;
          this.move = false;
          this.guangxian.position.x = obj.position.x - 183.4;
          return;
        }
      } else if (this.oldDate === 109) {
        if (this.Arr.length !== 3) {
          obj.position.x = 109;
          obj.position.y = -6.5;
          this.move = false;
          this.guangxian.position.x = obj.position.x - 183.4;
          return;
        }
      }
    }
    this.guangxian.position.x = obj.position.x - 183.4;
    this.move = true;
  }

  dragEnd(pos: any, obj: any) { 
    const { x, y } = pos;
    if (!this.move) {
      return;
    }
    obj.position.x = x;
    if (obj.position.x < -48.635) {
      obj.position.set(-84.6, -6.5, 2);
      this.isLight(-268, -23, 1);
    }
    if (obj.position.x > -48.635 && this.deng.position.x < 48.165) {
      obj.position.set(12.67, -6.5, 2);
      this.isLight(-170.33, -23, 1);
    }
    if (obj.position.x > 48.165) {
      obj.position.set(109, -6.5, 2);
      this.isLight(-74, -23, 1);
    }
    this.oldDate = obj.position.x;
    this.move = true;
    this.Arr = [];
    this.Ani();
  }

//判断是否有光线
  isLight(x: number, y: number, z: number) {
    if (this.guangxian) {
      this.guangxian.position.set(x, y, z);
    }
  }

//加入灯光
  addLight() {
    this.scene.add(this.guangxian);
  }

  Ani() {
    if (!this.ow.$data.open) {
      if (this.deng.position.x === -84.6) {
        this.ow.change(1);
      }
      if (this.deng.position.x === 12.67) {
        this.ow.change(2);
      }
      if (this.deng.position.x === 109) {
        this.ow.change(3);
      }
    }
  }

//加载叶片
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
      this.leaf[i] = new Leaf([-338 + 19 * i, -122, 4], obj1, i, this.scene, this.Arr);
      this.pos.push(this.leaf[i].startPos);
      this.timeAndrotate = this.leaf[i].initPos();
      this.leaf[i].obj.rotateX(this.timeAndrotate[0][i]);
      this.leafGroup.push(this.leaf[i]);
    }
  }

//点击按钮 触发动画
  anniu(isNum: number, num?: number, numb?: number) {
    (this.rongqi.material as any).opacity = 1;
    (this.zhichi.material as any).opacity = 1;
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

  resetLp() {
    for (let i = 0; i < 10; i++) {
      this.leaf[i].removeLeaf(this.scene);
      this.leaf[i].removeQ();
    }
    this.getLeaf(this.obj1);
  }

//重置台灯 光线
  resetDengAl() {
    this.resetLp();
    this.scene.add(this.jiantou);
    this.deng.position.set(-84.6, -6.5, 2);
    this.scene.remove(this.guangxian);

    this.guangxian.position.set(-268, -23, 1);
    this.Arr = [];
  }

  removeJ() {
    this.scene.remove(this.jiantou);
  }

//控制叶片上浮个数
  contrialLeaf(numb: number) {
    for (let i = 0; i < 10; i++) {
      if (numb === 1) {
        if (~[0, 1, 2, 4, 5, 6, 7, 8, 9].indexOf(i)) {
          this.leaf[i].leafAnimation(i);
        }
      } else if (numb === 2) {
        if (~[0, 1, 2, 3, 4, 8].indexOf(i)) {
          this.leaf[i].leafAnimation(i);
        }
      } else if (numb === 3) {
        if (~[0, 5, 9].indexOf(i)) {
          this.leaf[i].leafAnimation(i);
        }
      }
    }
  }
 
  initModel() {
    const H = window.innerHeight;
    if (!(H < 900 && H > 600)) {
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
      Plane.position.y = 42;
      Plane.position.z = -4;
      this.scene.add(Plane);
      
    }
  }
  resize(width: number, height: number): void {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
