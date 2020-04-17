import * as THREE from 'three';
import { WebGLRenderer, Vector2, Vector3 } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { SliderControlLine } from './SliderControlLine';

import { AxisUtil } from './AxisUtil';
import common from './CommonForThree';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as point from '../sub_static/point.png';
import * as tishi from '../sub_static/gs.png';
OBJLoader(THREE);
import $ from 'jquery-ts';
export class Line3dModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private controls: any;
  private sliderControlLine: SliderControlLine;
  private op: any;
  private paraBola: any; //抛物线
  private pointDragA: any = common.createImg([-60, Math.sqrt(1040), 2], 25.6, 25.6, point); //拖拽点A
  private pointDragB: any = common.createImg([-80, -Math.sqrt(520), 2], 25.6, 25.6, point); //拖拽点B
  private pointDragC: any = common.createImg([-80, -Math.sqrt(520), 2], 25.6, 25.6, point); //拖拽点C
  private lineAtoBmesh = common.drawUnitLine({color: '#6ECFFF', isDash: false});
  private pointAtext = common.createText('A', [-57, Math.sqrt(1040) - 5, 2]);
  private pointBtext = common.createText('B', [-77, -Math.sqrt(520) - 5, 2]);
  private pointCtext = common.createText('C', [-70.33, -9.45, 2]);  
  private pointFtext = common.createText('F', [-93.5, -2, 2]);
  private pointPtext = common.createText('P', [-128.28, 15, 2]);
  private tiShi = common.createImg([30, -50, 7], 46.5, 9, tishi);
  private pointMtext: any;
  //红色三角形
  private redApline = common.drawUnitLine({color: '#FF5A5A', isDash: false});
  private redAbline = common.drawUnitLine({color: '#FF5A5A', isDash: false});
  private redBpline = common.drawUnitLine({color: '#FF5A5A', isDash: false});
  //切线
  private tangentLineA = common.drawDashOrLine([{x: -10000, y: 0, z: 1}, {x: 10000, y: 0, z: 1}], {color: '#6ECFFF'});
  private tangentLineB = common.drawDashOrLine([{x: -10000, y: 0, z: 1}, {x: 10000, y: 0, z: 1}], {color: '#6ECFFF'});
  //PM线段
  private pMline = common.drawUnitLine({color: '#FF5A5A', isDash: true});
  //F点
  private pointF = common.drawCircle(2, {color: '#fff', position: [-93.5, 0, 2]});
  //P点
  private pointP = common.drawCircle(2, {color: '#fff', position: [-128.28, 4.72, 2]});
  private planeGarg = common.creatPlane([38, 0, 2], 50, 100);
  private curvePointArrayOnXAxis1: any = []; //抛物线数组
  private radTangentLineA: any; //切线弧度
  private radTangentLineB: any; //切线弧度
  private pointM: any;
  private kA: any; //A斜率
  private kB: any; //B斜率
  private lineAtoBslope: any;
  private isMa = false;
  private trace_point_group = new THREE.Group();
  private trace_point_array: Array < any > = [];
  private trace_point = common.drawCircle(1, {color: '#FF0000'});
  private rightAngle = common.drawRightAngle(3, { color: '#fff' }); //直角

  private isMakeO = true;
  private isMake = false;
  private isMakeT = false;
  private lineAcMesh = common.drawUnitLine({color: '#6ECFFF', isDash: false});
  private lineAfMesh = common.drawUnitLine({color: '#6ECFFF', isDash: false});
  private render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
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
    this.createAxis();
    this.initEvt();
    this.initModel();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (W > 1000 && W < 1300) {
      this.camera.position.z = 370; 
    }
    if (W / H === 818 / 510 || W / H === 854 / 534 || W / H === 1920 / 1200 || W / H === 806 / 510) {
      this.camera.position.z = 370;
    }
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
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

  //初始化摄像机位置
  resetCamera() {
    this.controls.reset();
  }

  //创建一个坐标系
  createAxis() {
    const Ax = AxisUtil.createAxis({ isTicks: true, axisColor: '#808080', AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''] } as any);
    Ax.position.set(-100, 0, 0);
    this.scene.add(Ax);  
    this.initElement(); 
  }

  // 初始化场景元素
  initElement() {
    (this.tiShi as any).material.opacity = 1;
    this.op = (window as any).viewHandler.viewModel.$data;
    this.pointDragA.name = 'dragA';
    this.pointDragB.name = 'dragB';
    this.pointDragC.name = 'dragC';
    this.createparaBolaX();
    this.redAbline = common.scaleLine([-60, Math.sqrt(1040), 2], [-80, -Math.sqrt(520), 2], this.redAbline);
    this.lineAtoBmesh = common.scaleLine([-60, Math.sqrt(1040), 1], [-80, -Math.sqrt(520), 1], this.lineAtoBmesh);
    this.lineAtoBmesh.scale.set(2000, 2000, 1);
    this.tangentLine(-60, Math.sqrt(1040), -80, -Math.sqrt(520));
    this.planeGarg = common.creatPlane([0, 0, 2], this.width / 2, this.height);
    this.scene.add(this.pointDragA, this.pointDragB, this.pointF, this.pointP, this.lineAtoBmesh, this.tiShi);
    this.scene.add(this.tangentLineA, this.tangentLineB, this.pointFtext, this.pointPtext, this.pointAtext, this.pointBtext);
  }

  // 初始化拖动点
  initEvt() {
    this.sliderControlLine = new SliderControlLine([this.pointDragA, this.pointDragB, this.pointDragC], this)
    .initEvent(this.camera, this.renderer); }

  //绘制抛物线 焦点再x轴
  createparaBolaX() {
    for (let i = -Math.sqrt(2600); i <= Math.sqrt(2600); i += 0.01) {
      const x = (i * i) / 26  - 100;
      this.curvePointArrayOnXAxis1.push(new THREE.Vector3(x, i, 0));
    }
    this.paraBola = ThreeUtil.createTube(this.curvePointArrayOnXAxis1, 0.5, 500, '#FFD621');
    this.scene.add(this.paraBola);
  }
  // 切线优化
  tangentLine(posx: any, posy: any, posBx: any, posBy: any) {
    this.tangentLineA.position.set(posx, posy, 0);
    this.tangentLineB.position.set(posBx, posBy, 0);
    this.kA = (posy - this.pointP.position.y) / (posx - this.pointP.position.x);
    this.kB = (posBy - this.pointP.position.y) / (posBx - this.pointP.position.x);
    this.radTangentLineA = Math.atan(this.kA);
    this.radTangentLineB = Math.atan(this.kB);
    if (this.pointDragA.position.y === Math.sqrt(2600)) {
      this.radTangentLineA = 0.25;
    } 
    if (this.pointDragB.position.y === Math.sqrt(2600)) {
      this.radTangentLineB = 0.25;
    } 
    if (this.pointDragA.position.y === -Math.sqrt(2600)) {
      this.radTangentLineA = -0.25;
    } 
    if (this.pointDragB.position.y === -Math.sqrt(2600)) {
      this.radTangentLineB = -0.25;
    } 
    this.tangentLineA.rotation.z = this.radTangentLineA;
    this.tangentLineB.rotation.z = this.radTangentLineB;
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
  //点击定义开关 出现红色三角形
  clickRedTangle() {
    if (this.op.isDefinition) {
      this.scene.add(this.redApline, this.redAbline, this.redBpline);
      this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
      this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
    } else {
      this.scene.remove(this.redApline, this.redAbline, this.redBpline);
    } 
  }
  downHandle(name: any) {
    if (name === 'dragC') {
      this.lineAtoBslope = (this.pointDragB.position.y - this.pointDragA.position.y) / 
      (this.pointDragB.position.x - this.pointDragA.position.x);
    }
  }
  //移动动点位置
  // tslint:disable-next-line:member-ordering
  moveHandle(pos: any, obj: any) {
    const {x, y} = pos;
    if (obj.name === 'dragA' || obj.name === 'dragB') {
      const py = y > Math.sqrt(2600) ? Math.sqrt(2600) : y < -Math.sqrt(2600) ? -Math.sqrt(2600) : y;
      const px = (py * py) / 26 - 100;       
      obj.position.set(px, py, 2);
      if (this.isMakeO) {
          this.lineAtoBmesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1], 
            [this.pointDragB.position.x, this.pointDragB.position.y, 1], this.lineAtoBmesh); 
            this.lineAtoBmesh.scale.set(2000, 2000, 1);
            const midXpos = (this.pointDragA.position.x + this.pointDragB.position.x) / 2;
            const midYpos = (this.pointDragA.position.y + this.pointDragB.position.y) / 2;
            if (this.pointM) {
              this.pointM.position.set(midXpos, midYpos, 2);
              this.pointMtext.position.set(midXpos + 5, midYpos + 5, 2);
              this.pMline = common.scaleLine([this.pointP.position.x, this.pointP.position.y, 1], [midXpos, midYpos, 1], this.pMline);  
            }
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
          this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
      } 
      if (this.isMake) {
          this.scene.remove(this.lineAtoBmesh);
          this.lineAcMesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
          [this.pointDragC.position.x, this.pointDragC.position.y, 1], this.lineAcMesh);
          this.lineAcMesh.scale.set(2000, 2000, 1);
          this.scene.add(this.lineAcMesh);
          const midXpos = (this.pointDragA.position.x + this.pointDragB.position.x) / 2;
          const midYpos = (this.pointDragA.position.y + this.pointDragB.position.y) / 2;
          if (this.pointM) {
            this.pointM.position.set(midXpos, midYpos, 2);
            this.pointMtext.position.set(midXpos + 5, midYpos + 5, 2);
            this.pMline = common.scaleLine([this.pointP.position.x, this.pointP.position.y, 1], [midXpos, midYpos, 1], this.pMline);  
          }
          if (obj.name === 'dragA') {
            this.lineAtoBslope = (this.pointDragC.position.y - this.pointDragA.position.y) / 
            (this.pointDragC.position.x - this.pointDragA.position.x);
            if (this.pointDragA.position.x > -1.5 && this.isMa && this.pointDragA.position.y > 0) {
              this.lineAtoBslope = 67.576;
            }
            if (this.pointDragA.position.x > -1.5 && this.isMa && this.pointDragA.position.y < 0) {
              this.lineAtoBslope = 67.576;
            }
            if (this.lineAtoBslope === -Infinity || this.lineAtoBslope === Infinity) {
              this.lineAtoBslope = 67.576;
            }
            const b = 2 * (this.lineAtoBslope * this.pointDragC.position.y - Math.pow(this.lineAtoBslope, 2) 
            * (this.pointDragC.position.x + 100) - 13);
            const c = Math.pow(this.pointDragC.position.y, 2) -
             2 * this.lineAtoBslope * (this.pointDragC.position.x + 100) * this.pointDragC.position.y +
              Math.pow((this.lineAtoBslope * (this.pointDragC.position.x + 100)), 2);
            const ocSlope = this.pointDragC.position.y / (this.pointDragC.position.x + 100);
            //xMax
            const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
            //xMin
            const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
            const y1 = Math.sqrt(26 * x1); //斜率大于0时右边交点
            const y1_ = -Math.sqrt(26 * x2); //斜率大于0时左边交点
            const y2 = -Math.sqrt(26 * x1); //斜率小于0时右边交点
            const y2_ = Math.sqrt(26 * x2); //斜率小于0时左边交点
            if (this.lineAtoBslope > 0 && py > 0) {
              this.pointDragA.position.set(x1 - 100, y1, 2);
              this.pointDragB.position.set(x2 - 100, y1_, 2);
              if (this.lineAtoBslope < ocSlope) {
                this.pointDragB.position.set(x1 - 100, y1, 2);
                this.pointDragA.position.set(x2 - 100, -y1_, 2);
              }
            } 
            if (this.lineAtoBslope < 0 && py > 0) {
              this.pointDragA.position.set(x2 - 100, y2_, 2);
              this.pointDragB.position.set(x1 - 100, y2, 2);
            }
            if (this.lineAtoBslope > 0 && py < 0) {
              this.pointDragA.position.set(x2 - 100, y1_, 2);
              this.pointDragB.position.set(x1 - 100, y1, 2);
            } 
            if (this.lineAtoBslope < 0 && py < 0) {
              this.pointDragA.position.set(x1 - 100, y2, 2);
              this.pointDragB.position.set(x2 - 100, y2_, 2);
              if (this.lineAtoBslope > ocSlope) {
                this.pointDragB.position.set(x1 - 100, y2, 2);
                this.pointDragA.position.set(x2 - 100, -y2_, 2);
              }
            }
          }
          if (obj.name === 'dragB') { 
            this.lineAtoBslope = (this.pointDragB.position.y - this.pointDragC.position.y) / 
            (this.pointDragB.position.x - this.pointDragC.position.x);
            if (this.pointDragB.position.x > -1.5 && this.isMa && this.pointDragB.position.y > 0) {
              this.lineAtoBslope = 67.576;
            }
            //-0.5467
            if (this.pointDragB.position.x > -1.5 && this.isMa && this.pointDragB.position.y < 0) {
              this.lineAtoBslope = 67.576;
            }
            if (this.lineAtoBslope === -Infinity || this.lineAtoBslope === Infinity) {
              this.lineAtoBslope = 67.576;
            }
            const b = 2 * (this.lineAtoBslope * this.pointDragC.position.y - Math.pow(this.lineAtoBslope, 2) 
            * (this.pointDragC.position.x + 100) - 13);
            const c = Math.pow(this.pointDragC.position.y, 2) -
             2 * this.lineAtoBslope * (this.pointDragC.position.x + 100) * this.pointDragC.position.y +
              Math.pow((this.lineAtoBslope * (this.pointDragC.position.x + 100)), 2);
            const ocSlope = this.pointDragC.position.y / (this.pointDragC.position.x + 100);
            const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
            const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
            const y1 = Math.sqrt(26 * x1); //斜率大于0时右边交点
            const y1_ = -Math.sqrt(26 * x2); //斜率大于0时左边交点
            const y2 = -Math.sqrt(26 * x1); //斜率小于0时右边交点
            const y2_ = Math.sqrt(26 * x2); //斜率小于0时左边交点
            if (this.lineAtoBslope > 0 && py < 0) {
              this.pointDragA.position.set(x1 - 100, y1, 2);
              this.pointDragB.position.set(x2 - 100, y1_, 2);
            } 
            if (this.lineAtoBslope < 0 && py < 0) {
              this.pointDragA.position.set(x2 - 100, y2_, 2);
              this.pointDragB.position.set(x1 - 100, y2, 2);
              if (this.lineAtoBslope > ocSlope) {
                this.pointDragB.position.set(x2 - 100, -y2_, 2);
                this.pointDragA.position.set(x1 - 100, y2, 2);
              }
            }
            if (this.lineAtoBslope > 0 && py > 0) {
              this.pointDragA.position.set(x2 - 100, y1_, 2);
              this.pointDragB.position.set(x1 - 100, y1, 2);
              if (this.lineAtoBslope < ocSlope) {
              this.pointDragA.position.set(x1 - 100, -y2, 2);               
              this.pointDragB.position.set(x2 - 100, -y1_, 2);                
              }
            } 
            if (this.lineAtoBslope < 0 && py > 0) {
              this.pointDragA.position.set(x1 - 100, y2, 2);
              this.pointDragB.position.set(x2 - 100, y2_, 2);
            }
          }
          if (this.pointDragC.position.y === Math.sqrt(2600) - 0.5) {
                this.isMa = true;
          }
          if (this.pointDragC.position.y === -Math.sqrt(2600) + 0.5) {
            this.isMa = true;
      }
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position); 
          this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);           
          this.lineAcMesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
            [this.pointDragB.position.x, this.pointDragB.position.y, 1], this.lineAcMesh);
          this.lineAcMesh.scale.set(20000, 20000, 1);
      }
      if (this.isMakeT) {
        if (obj.name === 'dragA') {
          this.lineAtoBslope = (this.pointF.position.y - this.pointDragA.position.y) / 
          (this.pointF.position.x - this.pointDragA.position.x);
          const b = 2 * (this.lineAtoBslope * this.pointF.position.y - Math.pow(this.lineAtoBslope, 2) 
          * (this.pointF.position.x + 100) - 13);
          const c = Math.pow(this.pointF.position.y, 2) -
          2 * this.lineAtoBslope * (this.pointF.position.x + 100) * this.pointF.position.y +
           Math.pow((this.lineAtoBslope * (this.pointF.position.x + 100)), 2);
           const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
           const y1 = Math.sqrt(26 * x1);
           const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
           const y2 = Math.sqrt(26 * x2);
           if (this.lineAtoBslope > 0 && py > 0) {
            this.pointDragA.position.set(x1 - 100, y1, 2);
            this.pointDragB.position.set(x2 - 100, -y2, 2);
          } else if (this.lineAtoBslope < 0 && py > 0) {
            this.pointDragB.position.set(x1 - 100, -y1, 2);
          }
          if (this.lineAtoBslope > 0 && py < 0) {
            this.pointDragB.position.set(x1 - 100, y1, 2);
            this.pointDragA.position.set(x2 - 100, -y2, 2);
          } else if (this.lineAtoBslope < 0 && py < 0) {
            this.pointDragA.position.set(x1 - 100, -y1, 2);
            this.pointDragB.position.set(x2 - 100, y2, 2);
          }
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
          this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);          
          this.lineAfMesh = common.scaleLine([px, py, 1], [this.pointF.position.x, this.pointF.position.y, 1], this.lineAfMesh);
          this.lineAfMesh.scale.set(2000, 2000, 1);
          this.rightAngle.position.set(this.pointP.position.x, this.pointP.position.y, 1);
          if (this.kB < 0) {
            this.rightAngle.rotation.z = this.radTangentLineB;
            } else if (this.kB > 0) {
              this.rightAngle.rotation.z = this.radTangentLineB + (3 * Math.PI) / 2;
            }
        }
        if (obj.name === 'dragB') {
          this.lineAtoBslope = (this.pointF.position.y - this.pointDragB.position.y) / 
          (this.pointF.position.x - this.pointDragB.position.x);
          const b = 2 * (this.lineAtoBslope * this.pointF.position.y - Math.pow(this.lineAtoBslope, 2) 
          * (this.pointF.position.x + 100) - 13);
          const c = Math.pow(this.pointF.position.y, 2) -
          2 * this.lineAtoBslope * (this.pointF.position.x + 100) * this.pointF.position.y +
           Math.pow((this.lineAtoBslope * (this.pointF.position.x + 100)), 2);
           const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
           const y1 = Math.sqrt(26 * x1);
           const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
           const y2 = Math.sqrt(26 * x2);
           if (this.lineAtoBslope > 0 && py < 0) {
            this.pointDragA.position.set(x1 - 100, y1, 2);
            this.pointDragB.position.set(x2 - 100, -y2, 2);
          } else if (this.lineAtoBslope < 0 && py < 0) {
            this.pointDragA.position.set(x2 - 100, y2, 2);
          }
          if (this.lineAtoBslope > 0 && py > 0) {
            this.pointDragB.position.set(x1 - 100, y1, 2);
            this.pointDragA.position.set(x2 - 100, -y2, 2);
          } else if (this.lineAtoBslope < 0 && py > 0) {
            this.pointDragA.position.set(x1 - 100, -y1, 2);
            this.pointDragB.position.set(x2 - 100, y2, 2);
          }
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
          this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
          this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
          this.lineAfMesh = common.scaleLine([px, py, 1], [this.pointF.position.x, this.pointF.position.y, 1], this.lineAfMesh);
          this.lineAfMesh.scale.set(20000, 20000, 1);
          this.rightAngle.position.set(this.pointP.position.x, this.pointP.position.y, 1);
          if (this.kB < 0) {
          this.rightAngle.rotation.z = this.radTangentLineB;
          } else if (this.kB > 0) {
            this.rightAngle.rotation.z = this.radTangentLineB + (3 * Math.PI) / 2;
          }
        }
      }
    }  
    if (obj.name === 'dragC') {
      const px = x > 0 ? 0 : x < -95 ? -95 : x;
      const cPos = Math.sqrt(26 * (x + 100));
      let py = y > cPos ? cPos - 0.5 : y < -cPos ? -cPos + 0.5 : y;
      if (py > Math.sqrt(2600)) {
        py = Math.sqrt(2600) - 0.5;
      }
      if (py < -Math.sqrt(2600)) {
        py = -Math.sqrt(2600) + 0.5;
      }
      if (px === -95) {
        py = 0;
      }
      this.pointDragC.position.set(px, py, 2);
      const b = 2 * (this.lineAtoBslope * this.pointDragC.position.y - Math.pow(this.lineAtoBslope, 2) 
      * (this.pointDragC.position.x + 100) - 13);
      const c = Math.pow(this.pointDragC.position.y, 2) -
       2 * this.lineAtoBslope * (this.pointDragC.position.x + 100) * this.pointDragC.position.y +
        Math.pow((this.lineAtoBslope * (this.pointDragC.position.x + 100)), 2);
      const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
      const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
      const y1 = Math.sqrt(26 * x1);
      const y2 = Math.sqrt(26 * x2);
      if (this.isMake) {
        this.scene.remove(this.lineAtoBmesh);
        const yZero = -this.lineAtoBslope * (this.pointDragC.position.x + 100) + this.pointDragC.position.y;
        if (this.lineAtoBslope > 0 && this.pointDragA.position.y > this.pointDragB.position.y && yZero > 0) {
          this.pointDragA.position.set(x1 - 100, y1, 2);          
          this.pointDragB.position.set(x2 - 100, y2, 2);
        } else if (this.lineAtoBslope > 0) {
          this.pointDragA.position.set(x1 - 100, y1, 2);
          this.pointDragB.position.set(x2 - 100, -y2, 2);
        } else if (this.lineAtoBslope < 0) {
          this.pointDragA.position.set(x2 - 100, y2, 2);
          this.pointDragB.position.set(x1 - 100, -y1, 2);
        } 
        if (this.lineAtoBslope < 0 && this.pointDragA.position.y > this.pointDragB.position.y && yZero < 0) {
          this.pointDragA.position.set(x1 - 100, -y1, 2);          
          this.pointDragB.position.set(x2 - 100, -y2, 2);
        }
        this.lineAcMesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
        [this.pointDragC.position.x, this.pointDragC.position.y, 1], this.lineAcMesh);
        this.lineAcMesh.scale.set(20000, 20000, 1);
      }
      if (px === -100) {
        py = 0;
        this.pointDragA.position.set(-100, 0, 2);
        this.pointDragB.position.set(-100, 0, 2);
      }
      this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
      this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);      
    }
    this.pointAtext.position.set(this.pointDragA.position.x + 3, this.pointDragA.position.y - 5, 2);
    this.pointBtext.position.set(this.pointDragB.position.x + 3, this.pointDragB.position.y - 5, 2);
    this.pointCtext.position.set(this.pointDragC.position.x + 3, this.pointDragC.position.y - 5, 2);
  }
  //P点轨迹
  pLocus(obj: any) {
    if (obj.name === 'dragA' || obj.name === 'dragB') {
      if (this.isMake) {
        this.recordTracePoint();
      }
    }
  }
  // 记录椭圆上的点
  recordTracePoint () {
    // if (this.hasDraw) { return; }
    const x = this.pointP.position.x;
    const y = this.pointP.position.y;
    const copyPoint = this.trace_point.clone();
    copyPoint.position.set(x, y, 0);
    this.trace_point_group.add(copyPoint);
    this.trace_point_array.push(copyPoint);
}

// 去除痕迹
clearTrace () {
    if (this.trace_point_array.length) {
        this.trace_point_group.remove(...this.trace_point_array);
        this.trace_point_array = [];
    }
}
  //性质1
  nature1() {
    if (this.isMakeO) { return; }
    this.isMakeO = true;
    this.isMake = false;
    this.isMakeT = false;
    this.isMa = false;
    this.clearTrace();
    this.pointDragA.position.set(-60, Math.sqrt(1040), 2);
    this.pointDragB.position.set(-80, -Math.sqrt(520), 2);
    this.pointAtext.position.set(-57, Math.sqrt(1040) - 5, 2);
    this.pointBtext.position.set(-77, -Math.sqrt(520) - 5, 2);
    this.pointCtext.position.set(-70.33, -9.45, 2);
    this.lineAtoBmesh = common.scaleLine([-60, Math.sqrt(1040), 1], [-80, -Math.sqrt(520), 1], this.lineAtoBmesh);
    this.lineAtoBmesh.scale.set(2000, 2000, 1);
    this.scene.add(this.lineAtoBmesh);
    this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position); 
    this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
    this.redApline = common.scaleLine([-60, Math.sqrt(1040), 1.1], [this.pointP.position.x, this.pointP.position.y, 1.1], this.redApline);
    this.redBpline = common.scaleLine([-80, -Math.sqrt(520), 1.1], [this.pointP.position.x, this.pointP.position.y, 1.1], this.redBpline);
    this.scene.remove(this.pointDragC, this.lineAfMesh, this.lineAcMesh, this.rightAngle);
  }
  //性质1分析
  natureAna1() {
    if (this.op.analyzeImg1) {
      const midXpos = (this.pointDragA.position.x + this.pointDragB.position.x) / 2;
      const midYpos = (this.pointDragA.position.y + this.pointDragB.position.y) / 2;
      this.pointM = common.drawCircle(2, {color: '#fff', position: [midXpos, midYpos, 2]});
      this.pointMtext = common.createText('M', [midXpos + 5, midYpos + 5, 2]);
      this.pMline = common.scaleLine([this.pointP.position.x, this.pointP.position.y, 1], [midXpos, midYpos, 1], this.pMline);  
      this.scene.add(this.pointM, this.pointMtext, this.pMline);
    } else {
      this.scene.remove(this.pointM, this.pointMtext, this.pMline);
      if (this.op.isHave !== 1) {
        this.scene.remove(this.pointCtext);
      }
    }
  }
  //性质2
  nature2() {
    if (this.isMake) { return; }
    this.isMakeO = false;
    this.isMake = true;
    this.isMakeT = false;
    this.scene.remove(this.lineAfMesh, this.lineAtoBmesh);
    this.scene.add(this.lineAcMesh);
    this.pointDragA.position.set(-60, Math.sqrt(1040), 2);
    this.pointDragB.position.set(-80, -Math.sqrt(520), 2);
    this.pointAtext.position.set(-57, Math.sqrt(1040) - 5, 2);
    this.pointBtext.position.set(-77, -Math.sqrt(520) - 5, 2);
    this.pointCtext.position.set(-70.33, -9.45, 2);
    const Xpos = (this.pointDragA.position.x + this.pointDragB.position.x * 2) / 3;
    const Ypos = (this.pointDragA.position.y + this.pointDragB.position.y * 2) / 3;
    this.pointDragC.position.set(Xpos, Ypos, 2);
    this.lineAcMesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
    [this.pointDragC.position.x, this.pointDragC.position.y, 1], this.lineAcMesh);
    this.lineAcMesh.scale.set(200, 200, 1);
    this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position); 
    this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
    this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);     
    this.scene.add(this.pointDragC, this.trace_point_group, this.pointCtext);
    this.scene.remove(this.pointM, this.pointMtext, this.pMline, this.lineAfMesh, this.pointM, this.rightAngle);
  }
  //性质3
  nature3() {
    if (this.isMakeT) { return; }
    this.isMakeO = false;
    this.isMake = false;
    this.isMakeT = true;
    this.isMa = false;
    this.clearTrace();
    this.scene.remove(this.lineAcMesh, this.lineAtoBmesh, this.pointDragC, this.pointCtext);
    this.scene.remove(this.pointM, this.pointMtext, this.pMline);
    this.pointDragA.position.set(-60, Math.sqrt(1040), 2);
    this.lineAtoBslope = (this.pointF.position.y - this.pointDragA.position.y) / 
    (this.pointF.position.x - this.pointDragA.position.x);
    const b = 2 * (this.lineAtoBslope * this.pointF.position.y - Math.pow(this.lineAtoBslope, 2) 
    * (this.pointF.position.x + 100) - 13);
    const c = Math.pow(this.pointF.position.y, 2) -
     2 * this.lineAtoBslope * (this.pointF.position.x + 100) * this.pointF.position.y +
      Math.pow((this.lineAtoBslope * (this.pointF.position.x + 100)), 2);
    const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
    const y1 = Math.sqrt(26 * x1);
    const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * Math.pow(this.lineAtoBslope, 2) * c)) / (2 * Math.pow(this.lineAtoBslope, 2));
    const y2 = Math.sqrt(26 * x2);
    this.pointDragA.position.set(x1 - 100, y1, 2);
    this.pointDragB.position.set(x2 - 100, -y2, 2);
    this.pointAtext.position.set(x1 - 97, y1 - 5, 2);
    this.pointBtext.position.set(x2 - 97, -y2 - 5, 2);
    this.lineAfMesh = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
    [this.pointDragB.position.x, this.pointDragB.position.y, 1], this.lineAfMesh);
    this.lineAfMesh.scale.set(2000, 2000, 1);  
    this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position); 
    this.redApline = common.scaleLine([x1 - 100, y1, 1.1], [this.pointP.position.x, this.pointP.position.y, 1.1], this.redApline);
    this.redBpline = common.scaleLine([x2 - 100, -y2, 1.1], [this.pointP.position.x, this.pointP.position.y, 1.1], this.redBpline);
    this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
    this.rightAngle.position.set(this.pointP.position.x, this.pointP.position.y, 1);
    this.rightAngle.rotation.z = this.radTangentLineB;
    this.scene.add(this.lineAfMesh, this.rightAngle);
  }
  //P点坐标
  pPostion(posA: any, posB: any, posP: any) {
    const {x: x0, y: y0} = posA;
    const {x: x1, y: y1} = posB;
    const {x: x2, y: y2} = posP;
    const x = ((x1 * y0) - (x0 * y1)) / (y1 - y0);
    const y = (13 * (x + x0)) / y0;
    this.redApline = common.scaleLine([x0, y0, 1.1], [x2, y2, 1.1], this.redApline);
    this.redAbline = common.scaleLine([x0, y0, 1.1], [x1, y1, 1.1], this.redAbline);
    this.redBpline = common.scaleLine([x1, y1, 1.1], [x2, y2, 1.1], this.redBpline);
    this.pointP.position.set(x - 200, y, 2);
    this.pointPtext.position.set(x - 200, y + 10.28, 2);
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
  //初始化遮罩
  initModel() {
    const geometry = new THREE.RingBufferGeometry(this.width, 160, 4, 1, 3.925);
    const material = new THREE.MeshBasicMaterial({ color: '#282828', side: THREE.DoubleSide, transparent: false});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-95, 5, 5);
    this.scene.add(mesh);
  }
  /**
   * 初始化控制器
   * 使用该控制器需要在render中调用update方法
   */
  tbctrl() {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = true;
    this.controls.noPan = true;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
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
    this.isMakeO = true;
    this.isMake = false;
    this.isMakeT = false;
    this.op.isHave = 3;
    this.isMa = false;
    this.op.isDefinition = false;
    this.op.isAnalyze = false;
    this.op.showAnla = false;
    this.op.analyzeImg1 = false;
    this.op.analyzeImg2 = false;
    this.clearTrace();
    this.scene.remove(this.lineAcMesh, this.lineAfMesh, this.redAbline, this.redApline, this.redBpline);
    this.scene.remove(this.pointM, this.pointMtext, this.pMline, this.pointDragC, this.pointCtext, this.rightAngle);
    this.pointDragA.position.set(-60, Math.sqrt(1040), 2);
    this.pointDragB.position.set(-80, -Math.sqrt(520), 2);
    this.pointAtext.position.set(-57, Math.sqrt(1040) - 5, 2);
    this.pointBtext.position.set(-77, -Math.sqrt(520) - 5, 2);
    this.pointCtext.position.set(-70.33, -9.45, 2);
    this.lineAtoBmesh = common.scaleLine([-60, Math.sqrt(1040), 1], [-80, -Math.sqrt(520), 1], this.lineAtoBmesh);
    this.lineAtoBmesh.scale.set(2000, 2000, 1);    
    this.scene.add(this.lineAtoBmesh);
    this.pPostion(this.pointDragA.position, this.pointDragB.position, this.pointP.position);
    this.tangentLine(this.pointDragA.position.x, this.pointDragA.position.y, this.pointDragB.position.x, this.pointDragB.position.y);
  }
}
