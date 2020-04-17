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
import * as ax from '../sub_static/ax.png';
import * as ex from '../sub_static/ex.png';
import * as log from '../sub_static/logax.png'
import * as inx from '../sub_static/inx.png';
import * as biaodashi from '../sub_static/gs.png';
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private sliderControlLine: SliderControlLine;
  private orbit: any;
  private op: any;
  private paraBola: any; //指数
  private logParaBola: any; //对数
  private aNum: any = 2;
  private aX: any;
  private curvePointArrayOnXAxis: any = []; //指数函数
  private curvePointArrayOnXAxis1: any = []; //对数函数
  private waterBoxPos: any;
  private gS: any = common.createImg([70, 100, 1], 24, 8.1, biaodashi);
  private pointDragA: any = common.createImg([0, 10, 2], 25.6, 25.6, point); //拖拽点A
  private pointDragB: any = common.createImg([10, 0, 2], 25.6, 25.6, point); //拖拽点B  
  private sublineImaginary = common.drawDashOrLine([{x: -120, y: 0, z: 0}, {x: 120, y: 0, z: 0}],
     {color: '#ED7916', width: 1.2, isDash: false});  
  private rightAngle = common.drawRightAngle(3, { color: '#FF5A5A' }); //直角
  private lineAb = common.drawUnitLine({color: '#FF5A5A', isDash: true}); //虚线AB
  //文本提示
  private textPie = common.createText('(', [-11, 20, 2], {color: '#FFFFFF'});
  private textShu = common.createText('0', [-5, 20, 2], {color: '#50E3C2'});
  private textDou = common.createText(',', [0, 20, 2], {color: '#FFFFFF'});
  private textTshu = common.createText('1', [5, 20, 2], {color: '#FA6400'});  
  private textRpie = common.createText(')', [10, 20, 2], {color: '#FFFFFF'});
  //文本提示  
  private textbPie = common.createText('(', [-11, 20, 2], {color: '#FFFFFF'});
  private textbShu = common.createText('0', [-6, 20, 2], {color: '#50E3C2'});
  private textbDou = common.createText(',', [0, 20, 2], {color: '#FFFFFF'});
  private textbTshu = common.createText('1', [6, 20, 2], {color: '#FA6400'});  
  private textbRpie = common.createText(')', [11, 20, 2], {color: '#FFFFFF'}); 
  private textAgroup = new THREE.Group(); 
  private textBgroup = new THREE.Group(); 
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
    this.createparaBolaX();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (W > 1000 && W < 1300) {
      this.camera.position.z = 270; 
    }
    if (W / H === 818 / 510 || W / H === 854 / 534 || W / H === 1920 / 1200) {
      this.camera.position.z = 370;
    }
    this.render();
    this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
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
    this.sliderControlLine = new SliderControlLine([this.pointDragA, this.pointDragB], this)
    .initEvent(this.camera, this.renderer); }
  //创建一个坐标系
  createAxis() {
    this.aX = AxisUtil.createAxis({ isTicks: true, axisColor: '#808080' } as any);
    this.aX.position.set(0, 0, 0);
    this.scene.add(this.aX);  
  }

  // 初始化场景元素
  initElement() {
    this.pointDragA.name = 'A';
    this.pointDragB.name = 'B';
    this.op = (window as any).viewHandler.viewModel.$data;
  }

  //绘制抛物线 焦点再x轴
  createparaBolaX() {
    this.curvePointArrayOnXAxis = [];
    this.curvePointArrayOnXAxis1 = [];
    this.scene.remove(this.paraBola, this.logParaBola);
    if (this.aNum > 1) {
      if (this.aNum === 1.1) {
        for (let i = -10; i < 10; i += 0.01) {
          const y = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
        for (let i = Math.pow(this.aNum, -10); i < 2.6; i += 0.01) {
          const y = Math.log(i) / Math.log(this.aNum);
          this.curvePointArrayOnXAxis1.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
      } else if (this.aNum === 1.2) {
        for (let i = -10; i < 10; i += 0.01) {
          const y = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
        for (let i = Math.pow(this.aNum, -10); i < 6.1; i += 0.01) {
          const y = Math.log(i) / Math.log(this.aNum);
          this.curvePointArrayOnXAxis1.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
      } else {
        for (let i = -10; i < (Math.log(10) / Math.log(this.aNum)); i += 0.01) {
          const y = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
        for (let i = Math.pow(this.aNum, -10); i < 10; i += 0.01) {
          const y = Math.log(i) / Math.log(this.aNum);
          this.curvePointArrayOnXAxis1.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
      }
    } 
    if (this.aNum < 1) {
      if (this.aNum === 0.9 || this.aNum === 0.8) {
        for (let i = -10; i < 10; i += 0.01) {
          const y = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
        for (let i = -10; i < 10; i += 0.01) {
          const x = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis1.push(new THREE.Vector3(x * 10, i * 10, 0));
        }
      } else {
        for (let i = Math.log(10) / Math.log(this.aNum); i < 10; i += 0.01) {
          const y = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(i * 10, y * 10, 0));
        }
        for (let i = Math.log(10) / Math.log(this.aNum); i < 10; i += 0.01) {
          const x = Math.pow(this.aNum, i);
          this.curvePointArrayOnXAxis1.push(new THREE.Vector3(x * 10, i * 10, 0));
        }
      }
    }
    this.paraBola = common.drawDashOrLine(this.curvePointArrayOnXAxis, {color: '#6ECFFF'});
    this.logParaBola = common.drawDashOrLine(this.curvePointArrayOnXAxis1, {color: '#9BF23B'});
    if (this.aNum === 1 || this.aNum === 0) {
      this.scene.remove(this.paraBola, this.logParaBola, this.pointDragA, this.pointDragB,
         this.lineAb, this.rightAngle, this.textAgroup, this.textBgroup);
    } else {
      this.scene.add(this.paraBola, this.logParaBola);
      if (this.op.isChange2) {
        this.scene.add(this.pointDragA, this.pointDragB, this.lineAb, this.textAgroup, this.textBgroup);
        if (this.op.isChange1) {
          this.scene.add(this.rightAngle);
        }
      }
    }
  }
  downHandle(name: any) {

  }
  moveHandle(pos: any, name: any) {
    const {x, y} = pos;
    const xp = x / 10;
    const yp = y / 10;
    if (name === 'A') {
      if (this.aNum > 1) {
        if (xp > 0 && yp >= 1) {
          const py: any = yp < 0 ? 0 : yp;
          const px = Math.log(yp) / Math.log(this.aNum);
          this.pointDragA.position.set(px * 10, py * 10, 2);
          this.pointDragB.position.set(py * 10, px * 10, 2);
          this.textShu.text = `${px.toFixed(1)}`;
          this.textTshu.text = `${py.toFixed(1)}`;
          this.textbShu.text = `${py.toFixed(1)}`;
          this.textbTshu.text = `${px.toFixed(1)}`;
          if (py > 10) {
            this.pointDragA.position.set(Math.log(10) / Math.log(this.aNum) * 10, 100, 2);
            this.pointDragB.position.set(100, Math.log(10) / Math.log(this.aNum) * 10, 2);
            this.textShu.text = `${(Math.log(10) / Math.log(this.aNum)).toFixed(1)}`;
            this.textTshu.text = '10';
            this.textbShu.text = '10';
            this.textbTshu.text = `${(Math.log(10) / Math.log(this.aNum)).toFixed(1)}`;
          }
          this.textTshu.position.y = 20;
          this.textRpie.position.y = 20;
          this.textbTshu.position.y = 20;
          this.textbRpie.position.y = 20;
          if (yp > 5) {
            this.textTshu.position.y = 20.5;
            this.textRpie.position.y = 21.5;
          }
        } else if (xp <= 0 || yp < 1) {
          const px: any = xp >= 0 ? 0 : xp < -10 ? -10 : xp;
          const py = Math.pow(this.aNum, px);
          this.pointDragA.position.set(px * 10, py * 10, 2);
          this.pointDragB.position.set(py * 10, px * 10, 2);
          this.textShu.text = `${px.toFixed(1)}`;
          this.textTshu.text = `${py.toFixed(1)}`;
          this.textbShu.text = `${py.toFixed(1)}`;
          this.textbTshu.text = `${px.toFixed(1)}`;
          if (px === -10) {
            this.textShu.text = '-10';
            this.textbTshu.text = '-10';
          }
          this.textTshu.position.y = 19.8;
          this.textRpie.position.y = 20.5;
          this.textbTshu.position.y = 19.8;
          this.textbRpie.position.y = 19.8;
          if (xp < -5) {
            this.textbTshu.position.y = 19;
            this.textbRpie.position.y = 19;
          }
        }
        if (this.aNum === 1.1) {
          if (this.pointDragA.position.x > 100) {
            this.pointDragA.position.set(100, 26, 2);
            this.pointDragB.position.set(26, 100, 2);
            this.textShu.text = '10';
            this.textTshu.text = '2.6';
            this.textbShu.text = '2.6';
            this.textbTshu.text = '10';
          }
        }
        if (this.aNum === 1.2) {
          if (this.pointDragA.position.x > 100) {
            this.pointDragA.position.set(100, 61, 2);
            this.pointDragB.position.set(61, 100, 2);
            this.textShu.text = '10';
            this.textTshu.text = '6.1';
            this.textbShu.text = '6.1';
            this.textbTshu.text = '10';
          }
        }
      }
      if (this.aNum < 1) {
        if (xp < 0 && yp >= 1) {
          const py: any = yp < 0 ? 0 : yp;
          const px = Math.log(yp) / Math.log(this.aNum);
          this.pointDragA.position.set(px * 10, py * 10, 2);
          this.pointDragB.position.set(py * 10, px * 10, 2);   
          this.textShu.text = `${px.toFixed(1)}`;
          this.textTshu.text = `${py.toFixed(1)}`;
          this.textbShu.text = `${py.toFixed(1)}`;
          this.textbTshu.text = `${px.toFixed(1)}`;       
          if (py > 10) {
            this.pointDragA.position.set(Math.log(10) / Math.log(this.aNum) * 10, 100, 2);
            this.pointDragB.position.set(100, Math.log(10) / Math.log(this.aNum) * 10, 2);  
            this.textShu.text = `${(Math.log(10) / Math.log(this.aNum)).toFixed(1)}`;
            this.textTshu.text = '10';
            this.textbShu.text = '10';
            this.textbTshu.text = `${(Math.log(10) / Math.log(this.aNum)).toFixed(1)}`;    
            }
          if (px < -10) {
            this.pointDragA.position.set(-100, Math.pow(this.aNum, -10) * 10, 2);
            this.pointDragB.position.set(Math.pow(this.aNum, -10) * 10, -100, 2);  
            this.textShu.text = '-10';
            this.textTshu.text = `${Math.pow(this.aNum, -10).toFixed(1)}`;
            this.textbShu.text = `${Math.pow(this.aNum, -10).toFixed(1)}`;
            this.textbTshu.text = '-10';      
            }
            if (this.aNum < 0.8) {
              this.textTshu.position.y = 20.5;
              this.textRpie.position.y = 21;
              this.textbTshu.position.y = 19.8;
              this.textbRpie.position.y = 20;
            } else {
              this.textTshu.position.y = 20;
              this.textRpie.position.y = 20.5;
              this.textbTshu.position.y = 19;
              this.textbRpie.position.y = 19;
            }
        } else if (xp > 0 || yp < 1) {
          const px: any = xp > 10 ? 10 : xp < 0 ? 0 : xp;
          const py = Math.pow(this.aNum, px);
          this.pointDragA.position.set(px * 10, py * 10, 2);
          this.pointDragB.position.set(py * 10, px * 10, 2);
          this.textShu.text = `${px.toFixed(1)}`;
          this.textTshu.text = `${py.toFixed(1)}`;
          this.textbShu.text = `${py.toFixed(1)}`;
          this.textbTshu.text = `${px.toFixed(1)}`; 
          if (xp > 10) {
            this.textShu.text = '10';
            this.textbTshu.text = '10';
          }
          this.textTshu.position.y = 19.8;
          this.textRpie.position.y = 20.5;
          this.textbTshu.position.y = 20.5;
          this.textbRpie.position.y = 20.5;
        }   
      }
    }
    if (name === 'B') {
      if (this.aNum > 1) {
        const ypos: any = yp > Math.log(10) / Math.log(this.aNum) ? Math.log(10) / Math.log(this.aNum) : yp < -10 ? -10 : yp;
        const px = Math.pow(this.aNum, ypos);
        this.pointDragA.position.set(ypos * 10, px * 10, 2);
        this.pointDragB.position.set(px * 10, ypos * 10, 2);
        this.textShu.text = `${ypos.toFixed(1)}`;
        this.textTshu.text = `${px.toFixed(1)}`;
        this.textbShu.text = `${px.toFixed(1)}`;
        this.textbTshu.text = `${ypos.toFixed(1)}`;
        if (ypos ===  Math.log(10) / Math.log(this.aNum)) {
          this.textTshu.text = '10';
          this.textbShu.text = '10';
        }
        if (ypos === -10) {
          this.textShu.text = '-10';
          this.textbTshu.text = '-10';
        }
        if (ypos <= 0) {
          this.textTshu.position.y = 20;
          this.textRpie.position.y = 20;
          this.textbTshu.position.y = 19.5;
          this.textbRpie.position.y = 19.5;
        } else {
          this.textTshu.position.y = 20.8;
          this.textRpie.position.y = 21.5;
          this.textbTshu.position.y = 20;
          this.textbRpie.position.y = 20;
          if (px < 8) {
            this.textTshu.position.y = 20.5;
            this.textRpie.position.y = 20.8;
          }
        }
        if (this.aNum === 1.1) {
          if (this.pointDragB.position.y > 100) {
            this.pointDragA.position.set(100, 26, 2);
            this.pointDragB.position.set(26, 100, 2);
            this.textShu.text = '10';
            this.textTshu.text = '2.6';
            this.textbShu.text = '2.6';
            this.textbTshu.text = '10';
          }
        }
        if (this.aNum === 1.2) {
          if (this.pointDragB.position.y > 100) {
            this.pointDragA.position.set(100, 61, 2);
            this.pointDragB.position.set(61, 100, 2);
            this.textShu.text = '10';
            this.textTshu.text = '6.1';
            this.textbShu.text = '6.1';
            this.textbTshu.text = '10';
          }
        }
      }
      if (this.aNum < 1) {
        const ypos = yp > 10 ? 10 : yp < Math.log(10) / Math.log(this.aNum) ? Math.log(10) / Math.log(this.aNum) : yp;
        const px = Math.pow(this.aNum, ypos);
        this.pointDragA.position.set(ypos * 10, px * 10, 2);
        this.pointDragB.position.set(px * 10, ypos * 10, 2);
        this.textShu.text = `${ypos.toFixed(1)}`;
        this.textTshu.text = `${px.toFixed(1)}`;
        this.textbShu.text = `${px.toFixed(1)}`;
        this.textbTshu.text = `${ypos.toFixed(1)}`;
        if (yp > 10) {
          this.textShu.text = '10';
          this.textTshu.text = `${Math.pow(this.aNum, 10).toFixed(1)}`;
          this.textbShu.text = `${Math.pow(this.aNum, 10).toFixed(1)}`;
          this.textbTshu.text = '10';
        }
        if (yp < -10) {
          this.pointDragA.position.set(-100, Math.pow(this.aNum, -10) * 10, 2);
          this.pointDragB.position.set(Math.pow(this.aNum, -10) * 10, -100, 2);
          this.textShu.text = '-10';
          this.textTshu.text = `${Math.pow(this.aNum, -10).toFixed(1)}`;
          this.textbShu.text = `${Math.pow(this.aNum, -10).toFixed(1)}`;
          this.textbTshu.text = '-10';
        }
        if (yp > 0) {
          this.textbTshu.position.y = 20.5;
          this.textbRpie.position.y = 20.5;
        } else {
          this.textbTshu.position.y = 19.5;
          this.textbRpie.position.y = 19.5;
        }
      }
    }
    this.lineAb = common.scaleLine([this.pointDragA.position.x, this.pointDragA.position.y, 1],
    [this.pointDragB.position.x, this.pointDragB.position.y, 1], this.lineAb);
    this.rightAngle.position.set((this.pointDragA.position.x + this.pointDragB.position.x) / 2,
    (this.pointDragA.position.y + this.pointDragB.position.y) / 2, 2);
    this.textAgroup.position.set(this.pointDragA.position.x - 10, this.pointDragA.position.y - 5, 2);
    this.textBgroup.position.set(this.pointDragB.position.x + 10, this.pointDragB.position.y - 25, 2);
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
  //辅助线
  subline() {
    const kRad = Math.atan(1);
    this.sublineImaginary.position.set(0, 0, 1);
    this.sublineImaginary.rotation.z = kRad;
    if (this.op.isChange1) {
      this.scene.add(this.sublineImaginary, this.gS);
      if (this.op.isChange2 && this.aNum !== 1 && this.aNum !== 0) {
      this.scene.add(this.rightAngle);
      }
    } else {
      this.scene.remove(this.sublineImaginary, this.rightAngle, this.gS);
    }
  }
  //对称点
  symmetryPoint () {
    this.resetDrag();
    const k = (this.pointDragA.position.y - this.pointDragB.position.y) / (this.pointDragA.position.x - this.pointDragB.position.x);
    const radLine = Math.atan(k); 
    this.textAgroup.add(this.textPie, this.textShu, this.textDou, this.textTshu, this.textRpie);
    this.textBgroup.add(this.textbPie, this.textbShu, this.textbDou, this.textbTshu, this.textbRpie);
    this.textShu.text = '0';
    this.textTshu.text = '1';
    this.textbShu.text = '1';
    this.textbTshu.text = '0';
    this.textAgroup.position.set(-10, 5, 2);
    this.textBgroup.position.set(20, -25, 2);
    this.rightAngle.rotation.z = -radLine;
    this.rightAngle.position.set((this.pointDragA.position.x + this.pointDragB.position.x) / 2,
     (this.pointDragA.position.y + this.pointDragB.position.y) / 2, 2);
    if (this.op.isChange2) {
    if (this.aNum !== 1 && this.aNum !== 0) {
      this.scene.add(this.pointDragA, this.pointDragB, this.lineAb, this.textAgroup, this.textBgroup);
    }
    if (this.op.isChange1 && this.aNum !== 1 && this.aNum !== 0) {
      this.scene.add(this.rightAngle);
    }
    } else {
    this.scene.remove(this.pointDragA, this.pointDragB, this.lineAb, this.rightAngle, this.textAgroup, this.textBgroup);      
    }
    }
  //重置拖拽点
  resetDrag() {
    this.pointDragA.position.set(0, 10, 2);
    this.pointDragB.position.set(10, 0, 2);
    this.textAgroup.position.set(-10, 5, 2);
    this.textBgroup.position.set(20, -25, 2);
    this.textPie.text = '(';
    this.textShu.text = '0';
    this.textDou.text = ',';
    this.textTshu.text = '1';
    this.textRpie.text = ')';

    this.textbPie.text = '(';
    this.textbShu.text = '1';
    this.textbDou.text = ',';
    this.textbTshu.text = '0';
    this.textbRpie.text = ')';
    this.lineAb = common.scaleLine([0, 10, 1], [10, 0, 1], this.lineAb);
    this.rightAngle.position.set((this.pointDragA.position.x + this.pointDragB.position.x) / 2,
      (this.pointDragA.position.y + this.pointDragB.position.y) / 2, 2);
  }
  //初始化遮罩
  initModel() {
    const geometry = new THREE.RingBufferGeometry(this.width, 160, 4, 1, 3.925);
    const material = new THREE.MeshBasicMaterial({ color: '#282828', side: THREE.DoubleSide, transparent: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(6, 5, 5);
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
    this.orbit.enableZoom = true;
    this.orbit.enableDamping = true;
    this.orbit.enableZoom = true;
    this.orbit.minDistance = 1;
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
    // this.op.resetImg();
    this.camera.position.set(0, 0, 270);
    this.scene.remove(this.pointDragA, this.pointDragB, this.sublineImaginary, this.lineAb, this.rightAngle, this.gS);
    this.scene.remove(this.textAgroup, this.textBgroup);
    this.op.value = 2;
    this.op.isChange1 = false;
    this.op.isChange2 = false;
  }
}
