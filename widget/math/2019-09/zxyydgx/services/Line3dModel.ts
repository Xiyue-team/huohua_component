import * as THREE from 'three';
import { WebGLRenderer, Vector2, Vector3, Color } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

import { AxisUtil } from './AxisUtil';
import common from './CommonForThree';
import { SliderControlLine } from './SliderControlLine';
import * as point from '../sub_static/point.png';
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private sliderControlLine: SliderControlLine;
  private orbit: any;
  private op: any;
  private aX: any;
  private numR: any;
  private numA: any;
  private numB: any;
  private numC: any;  
  private pointXpos: any;
  private pointYpos: any;
  private disD: any;
  private textD: any = common.createText('d', [0, 0, 0], {color: '#F9D42C'});
  private cricleMin: any = common.createStrokeCircle(30, {color: '#5688A6'});
  private pointM: any = common.createImg([30, 30, 0], 25.6, 25.6, point);
  private lineAssist: any = common.drawUnitLine({color: '#C3A6FF', isDash: false});
  private lineSolpL: any = common.drawUnitLine({color: '#95F23B', isDash: true});
  private lineSolpR: any = common.drawUnitLine({color: '#95F23B', isDash: true});
  private rightAngle = common.drawRightAngle(3, { color: '#F9D42C' }); //直角
  private lineD: any = common.drawUnitLine({color: '#F9D42C', isDash: true});
  private dragPoint: any = common.createImg([0, 0, 0], 25.6, 25.6, point);
  private verticesPoint: any = [];
  private textM: any = common.createText('M', [30, 45, 0], {color: '#5688A6'});
  private spX: any;
  private spY: any;
  private textL: any = common.createText('l', [-70, 70, 0], {color: '#C3A6FF'});
  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * @param {domElement} domElement
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
    number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.tbctrl();
    this.initElement(); 
    this.createAxis();
    this.initEvt();
    this.initModel();
    this.initPlane();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    if (W > 1000 && W < 1300) {
      this.camera.position.z = 270; 
    }
    if (W / H === 818 / 510 || W / H === 854 / 534 || W / H === 1920 / 1200 || W === 806 && H === 510 || W === 806 && H === 534) {
      this.camera.position.z = 370;
    }
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#282828');
    this.scene.position.x = -50;
  }
  rizse() {
    this.scene.background = new THREE.Color('#282828');
  }
  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 270);
  }
  // 初始化拖动点
  initEvt() {
    this.sliderControlLine = new SliderControlLine([this.pointM, this.dragPoint], this)
    .initEvent(this.camera, this.renderer); }
  //创建一个坐标系
  createAxis() {
    this.aX = AxisUtil.createAxis({ isTicks: true, axisColor: '#808080' } as any);
    this.aX.position.set(0, 0, 0);
    this.scene.add(this.aX);
  }

  // 初始化场景元素
  initElement() {
    this.pointM.name = 'M';
    this.dragPoint.name = 'drag';
    this.scene.add(this.lineAssist, this.lineSolpL, this.lineSolpR, this.lineD, this.rightAngle, this.textD, this.textM);  
    this.op = (window as any).viewHandler.viewModel.$data;
  }

  initModel() {
    this.cricleMin.position.set(30, 30, 0);
    this.scene.add(this.cricleMin, this.pointM, this.dragPoint);
    this.dragCreatCricle();
    this.dragCreatLine();
    
  }
  dragCreatCricle() {
    this.numR = (this.op.value * 10);
    this.cricleMin.scale.set(this.numR / 30, this.numR / 30, 1);
    let x: any = null;
    let y: any = null;
    for (let i = 0; i < 361; i += 6) {
      x = this.numR * Math.cos(i / 180 * Math.PI);
      y = this.numR * Math.sin(i / 180 * Math.PI);
      this.verticesPoint.push({ x, y, z: 0 });
    }
    this.dragCreatLine();
  }
  dragCreatLine() {
    this.lineAssist.scale.set(2000, 2000, 0);
    this.numA = this.op.value1;
    this.numB = this.op.value2;
    this.numC = this.op.value3;
    this.pointXpos = -(this.numC / this.numA) * 10;
    this.pointYpos = -(this.numC / this.numB) * 10;
    this.lineAssist = common.scaleLine([this.pointXpos, 0, 0], [0, this.pointYpos, 0], this.lineAssist);
    if (this.numA === 0) {
      this.lineAssist = common.scaleLine([50, this.pointYpos, 0], [0, this.pointYpos, 0], this.lineAssist);
    }
    if (this.numB === 0) {
      this.lineAssist = common.scaleLine([this.pointXpos, 50, 0], [this.pointXpos, -50, 0], this.lineAssist);
    }
    if (this.numC === 0) {
      this.lineAssist.rotation.z = Math.atan(-(this.numA / this.numB));
    }
    this.lineAssist.scale.set(2000, 2000, 0);
    this.drawLine(this.cricleMin.position.x, this.cricleMin.position.y);
  }
  //画线 直角
  drawLine(x: number, y: number) {
    this.disD = Math.round(Math.abs(this.numA * x + this.numB * y + this.numC * 10) / 
    Math.sqrt(Math.pow(this.numA, 2) + Math.pow(this.numB, 2)));
    this.spX = ((Math.pow(this.numB, 2) * this.pointM.position.x) - 
    (this.numA * this.numB * this.pointM.position.y) - (this.numA * this.numC * 10)) / (Math.pow(this.numA, 2) + Math.pow(this.numB, 2));
    this.spY = ((-this.numA * this.numB * this.pointM.position.x) +
     (Math.pow(this.numA, 2) * this.pointM.position.y) - (this.numB * this.numC * 10)) / (Math.pow(this.numA, 2) + Math.pow(this.numB, 2)); 
    this.lineD = common.scaleLine([this.pointM.position.x, this.pointM.position.y, 0], [this.spX, this.spY, 0], this.lineD);
    const k: any = (this.pointM.position.y - this.spY) / (this.pointM.position.x - this.spX);
    this.rightAngle.position.set(this.spX, this.spY, 0);
    
    this.textD.position.set((this.pointM.position.x + this.spX) / 2, (this.pointM.position.y + this.spY) / 2, 0);
    this.op.text = this.disD > this.numR ? this.op.selectTxet[2] : this.disD < this.numR ? this.op.selectTxet[0] : this.op.selectTxet[1];
    this.op.disVlaue = this.disD / 10;
    if (this.numA === 0 && this.numB === 0) {
      this.op.disVlaue = '无';
    }
    if (this.numA === 0 || this.numB === 0 || this.numC === 0) {
        this.scene.add(this.lineSolpL, this.lineSolpR);
    } else {
      this.scene.add(this.lineD, this.textD, this.lineAssist, this.rightAngle);
      if (this.op.text === '相交') {
        if (this.numA !== 0 && this.numB !== 0 && this.numC !== 0) {
        this.scene.add(this.lineSolpL, this.lineSolpR);
      }
      }
    }
    if (this.disD === 0) {
      this.dragPoint.position.set(this.numR * Math.cos(60 / 180 * Math.PI) + 
      this.pointM.position.x, this.numR * Math.sin(60 / 180 * Math.PI) + this.pointM.position.y, 0);
      this.dragPoint.material.visible = true;
    } else {
      if (this.numA !== 0 && this.numB !== 0 && this.numC !== 0) {
        this.scene.add(this.rightAngle);
      }
      this.dragPoint.material.visible = false;
    }
      if (this.numA === 0) {
        if (this.pointM.position.y > this.spY) {
        this.rightAngle.rotation.z = Math.PI / 2;
        } else {
        this.rightAngle.rotation.z = -Math.PI / 2;
        }
      } else {
        if (this.pointM.position.x >= this.spX) {
          this.rightAngle.rotation.z = Math.atan(k);
        } else {
          this.rightAngle.rotation.z = (Math.atan(k) + Math.PI / 2);
        }
      }
    this.calculatePoint(x, y);
    
  }
  downHandle(name: any) {

  }
  moveHandle(pos: any, name: any) {
    const {x, y} = pos;
    const xM = x > 50 ? 50 : x < -50 ? -50 : x;
    const yM = y > 50 ? 50 : y < -50 ? -50 : y;
    if (name === 'M') {
      this.pointM.position.set(xM, yM, 0);
      this.cricleMin.position.set(xM, yM, 0);
      this.textM.position.set(xM, yM + 15, 0);
      this.drawLine(xM, yM);
    } 
    if (name === 'drag') {
      const k = (y - this.pointM.position.y) / (x - this.pointM.position.x);
      const rad = Math.atan(k);
      let angle = rad * 180 / Math.PI;
      if (x < this.pointM.position.x) {
        angle = 180 + angle;
      }
      const radiusPosX = this.numR * Math.cos(angle / 180 * Math.PI) + this.pointM.position.x;
      const radiusPosY = this.numR * Math.sin(angle / 180 * Math.PI) + this.pointM.position.y;
      this.dragPoint.position.set(radiusPosX, radiusPosY, 0);
      this.calculatePoint(xM, yM);
    }
  }
  //计算交点
  calculatePoint(x1: number, y1: number) {
    const k = -(this.numA / this.numB);
    if (this.op.text === '相交') {
    let _x: any = null;
    let _y: any = null;
    let _x1: any = null;
    let _y1: any = null;
    const Lhalf = Math.sqrt(Math.pow(this.numR, 2) - Math.pow(this.disD, 2));
    const spaceX = Lhalf * Math.cos(Math.atan(k));
    const spaceY = Lhalf * Math.sin(Math.atan(k));
    _x = this.spX + spaceX; //右交点
    _y = this.spY + spaceY;
    _x1 = this.spX - spaceX; //左交点
    _y1 = this.spY - spaceY;
    this.lineSolpL = common.scaleLine([x1, y1, 0], [_x, _y, 0], this.lineSolpL);
    this.lineSolpR = common.scaleLine([x1, y1, 0], [_x1, _y1, 0], this.lineSolpR);
    if (this.disD === 0) {
      this.lineSolpL = common.scaleLine([this.dragPoint.position.x, this.dragPoint.position.y, 0], [_x, _y, 0], this.lineSolpL);
      this.lineSolpR = common.scaleLine([this.dragPoint.position.x, this.dragPoint.position.y, 0], [_x1, _y1, 0], this.lineSolpR);
      this.rightAngle.position.set(this.dragPoint.position.x, this.dragPoint.position.y, 0);  
      const k1 = (_y1 - this.dragPoint.position.y) / (_x1 - this.dragPoint.position.x);
      const k2 = (_y - this.dragPoint.position.y) / (_x - this.dragPoint.position.x);
      if (this.numA >= 0) {
        if (this.numB >= 0) {
          if (k1 > 0 && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI;
          } else if (k1 < 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x > _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI;
          } else if (k1 < 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x < _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI / 2;
          } else if (k1 > 0 && this.dragPoint.position.x < _x1) {
            this.rightAngle.rotation.z = Math.atan(k1) + 3 * Math.PI / 2;
          }
        } else {
          if (k1 > 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x > _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI / 2;
          } else if (k1 < 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x > _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI;
          } else if (k1 < 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x < _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI / 2;
          } else if (k1 < 0 && this.dragPoint.position.x < _x1 && this.dragPoint.position.x < _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + 2 * Math.PI;
          } else if (k1 > 0 && this.dragPoint.position.x < _x1) {
            this.rightAngle.rotation.z = Math.atan(k1) + 3 * Math.PI / 2;
          } else if (k1 > 0 && this.dragPoint.position.x > _x1 && this.dragPoint.position.x < _x) {
            this.rightAngle.rotation.z = Math.atan(k1) + Math.PI;
          }
        }
      } else if (this.numA < 0) {
        if (this.numB >= 0) {
          if (k2 < 0 && this.dragPoint.position.x < _x) {
            this.rightAngle.rotation.z = Math.atan(k2) + 3 * Math.PI / 2;
          } else if (k2 > 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x < _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 3 * Math.PI / 2;
          } else if (k2 > 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 2 * Math.PI;
          } else if (k2 < 0 && this.dragPoint.position.x > _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + Math.PI;
          }
        } else {
          console.log(k2, this.dragPoint.position.x, _x);
          if (k2 < 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 3 * Math.PI / 2;
          } else if (k2 < 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x < _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 2 * Math.PI;
          } else if (k2 > 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x < _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 3 * Math.PI / 2;
          } else if (k2 > 0 && this.dragPoint.position.x < _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + 2 * Math.PI;
          } else if (k2 < 0 && this.dragPoint.position.x > _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + Math.PI;
          } else if (k2 > 0 && this.dragPoint.position.x > _x && this.dragPoint.position.x > _x1) {
            this.rightAngle.rotation.z = Math.atan(k2) + Math.PI / 2;
          } 
        }
      }
    }
    } else {
      this.scene.remove(this.lineSolpL, this.lineSolpR);
    }
  }
  //世界坐标转化为three.js坐标
  getMousePos(MousePointX: number, MousePointY: number,  domWidth: number, domHeight: number): Vector2 {
    const vector = new Vector3();
    vector.set((MousePointX / domWidth) * 2 - 1,
      (-MousePointY / domHeight) * 2 + 1, 0);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
    return new Vector2(pos.x, pos.y);
  }
  // 初始化遮罩
  initPlane() {
    const geometry = new THREE.RingBufferGeometry(this.width, 160, 4, 1, 3.925);
    const material = new THREE.MeshBasicMaterial({ color: '#282828', side: THREE.DoubleSide, transparent: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(6, 5, 5);
    this.orbit.addEventListener( 'change', () => {
      mesh.position.set(6, 5, Math.abs(this.camera.position.z - 265));
    });
    this.scene.add(mesh);
  }
  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
    (this.renderer as WebGLRenderer).sortObjects = false;
  }
  /**
   * 初始化控制器
   * 使用该控制器需要在render中调用update方法
   */
  tbctrl() {
    this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
    this.orbit.saveState ();
    this.orbit.enableRotate = false;
    this.orbit.enableZoom = false;
    this.orbit.enableDamping = true;
    this.orbit.minDistance = 250;
    this.orbit.maxDistance = 500;
    this.orbit.enablePan = false;
  }

  /**
   * 初始化光源
   */
  initLight(): void {
    const ambientLight = new THREE.AmbientLight('#FFF');
    this.scene.add(ambientLight);
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    (window as any).viewHandler.viewModel.reset();
    this.op.isHave = false;
    (window as any).viewHandler.viewModel.ineones();
    this.pointM.position.set(30, 30, 0);
    this.cricleMin.position.set(30, 30, 0);
    this.textM.position.set(30, 45, 0);
    this.scene.remove(this.lineSolpL, this.lineSolpR);
    this.drawLine(30, 30);
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (W > 1000) {
      this.camera.position.z = 270; 
    }
    if (W / H === 818 / 510 || W / H === 854 / 534 || W / H === 1920 / 1200 || W === 806 && H === 510) {
      this.camera.position.z = 370;
    }
    this.op.value = 2;
    this.op.value1 = 1; 
    this.op.value2 = 1;
    this.op.value3 = -1;
    this.op.isChange1 = false;
    this.op.isChange2 = false;
  }
}
