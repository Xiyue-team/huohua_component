import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { RandomDot } from './RandomDot';
const eCharts = require('echarts');
import * as ac from '../sub_static/UI/Ac.png';
import * as co32 from '../sub_static/UI/CO32.png';
import * as h2o from '../sub_static/UI/H2O.png';
import * as hac from '../sub_static/UI/HAc.png';
import * as hco3 from '../sub_static/UI/HCO3.png';
import * as na from '../sub_static/UI/Na.png';
import * as oh from '../sub_static/UI/OH.png';

import * as tag from '../sub_static/UI/tag.png';
import * as cup from '../sub_static/UI/cup.png';
import * as heat from '../sub_static/UI/heat.png';
import * as cup1 from '../sub_static/UI/cup1.png';
import * as equation5 from '../sub_static/UI/equation5.png';
import * as backGround from '../sub_static/UI/backGround.png';
export class Csnsjphdyxys extends ThreeBase {
  //创建分子组
  private moleculeArr: any = [];
  //创建个分子变量
  private Ac: any;
  private CO32: any;
  private H2O: any;
  private HAc: any;
  private HCO3: any;
  private Na: any;
  private OH: any;
  //创建控制发生反应后何时取消后面反应的变量
  Acnumber = 2;
  Acnumber1 = 3;
  Acnumber2 = 2;
  //创建定时器变量
  private timer: any;
  private timer1: any;
  private timer2: any;
  //创建柱状图
  myChart: any;
  //创建柱状图的三个分子数量
  number1 = 2;
  number2 = 2;
  number3 = 2;
  //创建页面烧杯提示语公式等
  private tag = ThreeUtil.createImg(72, 124.8, tag, -200, 120, 1);
  private cup = ThreeUtil.createImg(300, 302, cup, -200, 0, 0);
  private heat = ThreeUtil.createImg(297, 261, heat, -190, 160, 1);
  private cup1 = ThreeUtil.createImg(300, 302, cup1, -200, 0, 0);
  private equation5 = ThreeUtil.createImg(332.8, 18.4, equation5, -194, -200, 0);
  //创建黑色遮挡块
  private backGround1 = ThreeUtil.createImg(50, 250, backGround, -362.5, -25, 3);
  private backGround2 = ThreeUtil.createImg(50, 250, backGround, -24.5, -25, 3);
  private backGround3 = ThreeUtil.createImg(400, 30, backGround, -200, -164.5, 3);
  private render = () => { this.renderer.render(this.scene, this.camera); setTimeout(this.render, 30); };

  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.init();
  }

  init(): void {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.render();
    this.initObject();
    console.warn = function() {
    };
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  //初始化镜头
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 600);
  }

  //初始化渲染器
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#333333');
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
    this.histogram1();
    if (document.documentElement.clientHeight < 535) {
      this.myChart.setOption({
        xAxis: {
          nameTextStyle: {
            fontSize: 12
          },
          axisLabel: {
            fontSize: 12
          },
        },
        yAxis: {
          nameTextStyle: {
            fontSize: 12
          },
          axisLabel: {
            fontSize: 12
          },
        },
      });
    }
  }

  initObject() {
    this.addMolecule();
    this.runAnimation(0);
    this.scene.add(this.tag, this.cup, this.backGround1, this.backGround2, this.backGround3, this.equation5);
  }
   // 创建分子函数
  creatMolecule(molecule: any, width: number, img: any, name: string, num: number, ) {
    const randomX1 = Math.random() * 222 - 324;
    const randomY1 = Math.random() * 159 - 117;
    const randomX2 = Math.random() * 200 - 324;
    const randomX3 = Math.random() * 100 - 202;
    if (num === 1) {
      molecule = new RandomDot(randomX1, randomY1, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX1, randomY1, -82, -304, 42, -117);
    } else if (num === 2) {
      // 设置Ac离子在固定范围内出现
      molecule = new RandomDot(randomX2, 40, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX2, 30, -82, -304, 42, -117);
    } else if (num === 3) {
      // 设置原来的水分子在固定范围内出现
      molecule = new RandomDot(randomX3, 5, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX3, -5, -82, -304, 42, -117);
    } else if (num === 4) {
      //设置添加的水分子出现的固定位置
      molecule = new RandomDot(randomX2, 85, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX2, 85, -82, -304, 75, -117);
    } else if (num === 5) {
      //设置添加Na2CO3后CO3离子出现的固定位置
      molecule = new RandomDot(randomX3, 53, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX3, 53, -82, -304, 42, -117);
    } else {
      molecule = new RandomDot(randomX1, 53, 1, width, width, img, name);
      molecule.selfMoveAnimate1(randomX1, 53, -82, -304, 42, -117);
    }
    this.moleculeArr.push(molecule, );
    molecule.addSince(this.scene);
  }

  // 添加初始状态下烧杯中离子
  addMolecule() {
    for (let i = 0; i < 4; i++) {
      this.creatMolecule(this.Na, 24, na, 'Na', 1, );
      this.creatMolecule(this.H2O, 26, h2o, 'H2O', 3, );
    }
    for (let i = 0; i < 2; i++) {
      this.creatMolecule(this.HAc, 28, hac, 'HAc', 3, );
      this.creatMolecule(this.Ac, 27, ac, 'Ac', 2, );
      this.creatMolecule(this.OH, 25, oh, 'OH', 1, );
    }
  }

  // 获取两个分子或离子之间的距离函数
  getDistance(p1: any, p2: any) {
    const dx = p1.box.position.x - p2.box.position.x;
    const dy = p1.box.position.y - p2.box.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 碰撞反弹函数
  reboundEvent(index: number, i: number) {
    this.moleculeArr[index].speedX -= this.moleculeArr[i].box.position.x - this.moleculeArr[index].box.position.x;
    this.moleculeArr[index].speedY -= this.moleculeArr[i].box.position.y - this.moleculeArr[index].box.position.y;
    this.moleculeArr[i].speedX -= this.moleculeArr[i].box.position.x - this.moleculeArr[i].box.position.x;
    this.moleculeArr[i].speedY -= this.moleculeArr[i].box.position.y - this.moleculeArr[i].box.position.y;
  }

  //碰撞
  runIntoAni(index: number, val: number) {
    for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
      const d = this.getDistance(this.moleculeArr[i], this.moleculeArr[index]);
      if (d <= 28) {
        if (val === 0) {
          this.reboundEvent(index, i);
        } else if (val === 1) {
          this.water(index, i);
        } else if (val === 2) {
          this.naoh(index, i);
        } else if (val === 3) {
          this.naac(index, i);
        } else if (val === 4) {
          this.naco(index, i);
        } else if (val === 5) {
          this.hot(index, i);
        }
      }
    }
  }

  runAnimation(val: number) {
    const thiz = this;
    function ani1() {
      for (let i = 0, L = thiz.moleculeArr.length; i < L; i++) {
        thiz.runIntoAni(i, val);
        const sphere = thiz.moleculeArr[i];
        const k = 0.00005;
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
        const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
        const r = 0.5 / speed;
        sphere.speedX *= r;
        sphere.speedY *= r;
        sphere.box.position.x += sphere.speedX;
        sphere.box.position.y += sphere.speedY;
      }
      thiz.timer1 = requestAnimationFrame(ani1);
    }
    ani1();
  }
  //清除烧杯中分子及定时器
  anewMolecule() {
    this.updata();
    cancelAnimationFrame(this.timer1);
    this.Acnumber = 2;
    this.Acnumber1 = 3;
    this.Acnumber2 = 2;
    clearInterval(this.timer);
    clearTimeout(this.timer2);
    this.changeEchartData(2, 2, 2, 30);
  }
  //清除分子并添加初始状态下的分子
  updata() {
    for (let i = 0; i < this.moleculeArr.length; i++) {
      this.moleculeArr[i].removeSince(this.scene);
    }
    this.moleculeArr = [];
    this.addMolecule();
  }
  // 改变柱状图的数值函数
  changeEchartData (num1: number, num2: number, num3: number, time: number) {
    this.number1 = num1;
    this.number2 = num2;
    this.number3 = num3;
    this.myChart.setOption({
      animationDurationUpdate: time,
      series: [{
        data: [this.number1, this.number2, this.number3],
      }]
    });
  }

  //加水事件
  addshui() {
    this.anewMolecule();
    this.scene.add(this.cup1);
    this.scene.remove(this.cup, this.tag, this.heat);
    for (let i = 0; i < 2; i++) {
      this.creatMolecule(this.H2O, 26, h2o, 'H2O', 4, );
    }
    this.runAnimation(1);
    for (let i = 0; i < 11; i++) {
      this.moleculeArr[i].stopMoveAnimate3();
      this.moleculeArr[i].selfMoveAnimate1(this.moleculeArr[i].box.position.x,
          this.moleculeArr[i].box.position.y, -81, -305, 75, -118);
    }
    this.stopac();
  }
  //加水后的反应
  water(index: number, i: number) {
    if (this.moleculeArr[i].box.name === 'Ac' && this.moleculeArr[index].box.name === 'H2O') {
      this.HAc = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 28, 28, hac, 'HAc');
      this.HAc.addSince(this.scene);
      this.HAc.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.OH = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 25, 25, oh, 'OH');
      this.OH.addSince(this.scene);
      this.OH.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.HAc);
      this.moleculeArr.splice(index, 1, this.OH);
      this.Acnumber --;
      this.number1 -= 1;
      this.number2 += 1;
      this.number3 += 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else {
      this.reboundEvent(index, i);
    }
  }

  stopac() {
    this.timer = setInterval(() => {
      if (this.Acnumber === 1) {
        clearInterval(this.timer);
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
          if (this.moleculeArr[i].box.name === 'Ac') {
            this.moleculeArr[i].box.name = 'Ac1';
          }
        }
      }
    }, 30);
  }
  //加NaOH事件
  addnaoh() {
    this.anewMolecule();
    this.scene.add(this.cup);
    this.scene.remove(this.tag, this.cup1, this.heat);
    for (let i = 0; i < 2; i++) {
      this.creatMolecule(this.OH, 26, oh, 'OH', 6);
    }
    this.number1 = 2;
    this.number2 = 2;
    this.number3 = 4;
    this.myChart.setOption({
      animationDurationUpdate: 0,
      series: [{
        data: [this.number1, this.number2, this.number3],
      }]
    });
    this.runAnimation(2);
    this.stopoh();
  }
  //加入氢氧化钠后的反应
  naoh(index: number, i: number) {
    if (this.moleculeArr[i].box.name === 'HAc' && this.moleculeArr[index].box.name === 'OH') {
      this.Ac = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 27, 27, ac, 'Ac');
      this.Ac.addSince(this.scene);
      this.Ac.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.H2O = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 26, 26, h2o, 'H2O');
      this.H2O.addSince(this.scene);
      this.H2O.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.Ac);
      this.moleculeArr.splice(index, 1, this.H2O);
      this.Acnumber --;
      this.number1 += 1;
      this.number2 -= 1;
      this.number3 -= 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else {
      this.reboundEvent(index, i);
    }
  }

  stopoh() {
    this.timer = setInterval(() => {
      if (this.Acnumber === 1) {
        clearInterval(this.timer);
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
          if (this.moleculeArr[i].box.name === 'HAc') {
            this.moleculeArr[i].box.name = 'HAc1';
          }
        }
      }
    }, 30);
  }

  //加naac
  addnaac() {
    this.anewMolecule();
    this.scene.add(this.cup);
    this.scene.remove(this.tag, this.cup1, this.heat);
    for (let i = 0; i < 3; i++) {
      this.creatMolecule(this.Ac, 27, ac, 'Ac', 6);
    }
    this.number1 = 5;
    this.number2 = 2;
    this.number3 = 2;
    this.myChart.setOption({
      animationDurationUpdate: 0,
      series: [{
        data: [this.number1, this.number2, this.number3],
      }]
    });
    this.runAnimation(3);
    this.stopnaac();
  }
  //加入醋酸钠后的反应
  naac(index: number, i: number) {
    if (this.moleculeArr[i].box.name === 'Ac' && this.moleculeArr[index].box.name === 'H2O') {
      this.HAc = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 28, 28, hac, 'HAc');
      this.HAc.addSince(this.scene);
      this.HAc.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.OH = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 25, 25, oh, 'OH');
      this.OH.addSince(this.scene);
      this.OH.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.HAc);
      this.moleculeArr.splice(index, 1, this.OH);
      this.Acnumber --;
      this.number1 -= 1;
      this.number2 += 1;
      this.number3 += 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else {
      this.reboundEvent(index, i);
    }
  }

  stopnaac() {
    this.timer = setInterval(() => {
      if (this.Acnumber === 1) {
        clearInterval(this.timer);
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
          if (this.moleculeArr[i].box.name === 'Ac') {
            this.moleculeArr[i].box.name = 'Ac1';
          }
        }
      }
    }, 30);
  }

  //加naco
  addnaco() {
    this.anewMolecule();
    this.scene.add(this.cup);
    this.scene.remove(this.tag, this.cup1, this.heat);
    for (let i = 0; i < 2; i++) {
      this.creatMolecule(this.CO32, 26, co32, 'CO32', 5);
    }
    this.runAnimation(4);
    this.stopnaco();
  }
  //加入碳酸钠后的反应
  naco(index: number, i: number) {
    if (this.moleculeArr[i].box.name === 'CO32' && this.moleculeArr[index].box.name === 'H2O') {
      this.HCO3 = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 26, 26, hco3, 'HCO3');
      this.HCO3.addSince(this.scene);
      this.HCO3.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.OH = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 25, 25, oh, 'OH');
      this.OH.addSince(this.scene);
      this.OH.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.HCO3);
      this.moleculeArr.splice(index, 1, this.OH);
      this.Acnumber1 --;
      this.number1 += 0;
      this.number2 += 0;
      this.number3 += 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else if (this.moleculeArr[i].box.name === 'HAc1' && this.moleculeArr[index].box.name === 'OH') {
      this.Ac = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 27, 27, ac, 'Ac');
      this.Ac.addSince(this.scene);
      this.Ac.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.H2O = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 26, 26, h2o, 'H2O1');
      this.H2O.addSince(this.scene);
      this.H2O.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.Ac, this.H2O);
      this.Acnumber2 --;
      this.number1 += 1;
      this.number2 -= 1;
      this.number3 -= 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else {
      this.reboundEvent(index, i);
    }
  }

  stopnaco() {
    this.timer = setInterval(() => {
      if (this.Acnumber1 === 1) {
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
          if (this.moleculeArr[i].box.name === 'HAc') {
            this.moleculeArr[i].box.name = 'HAc1';
          }
        }
      }
      if (this.Acnumber2 === 1) {
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
          if (this.moleculeArr[i].box.name === 'HAc1') {
            this.moleculeArr[i].box.name = 'HAc2';
          }
        }
        clearInterval(this.timer);
      }
    }, 30);
  }

  //加热事件
  addhot() {
    this.anewMolecule();
    this.scene.add(this.heat, this.cup, this.equation5);
    this.scene.remove(this.tag, this.cup1);
    this.runAnimation(5);
    this.stopac();
  }
  //加热反应
  hot(index: number, i: number) {
    if (this.moleculeArr[i].box.name === 'Ac' && this.moleculeArr[index].box.name === 'H2O') {
      this.HAc = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 28, 28, hac, 'HAc');
      this.HAc.addSince(this.scene);
      this.HAc.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.OH = new RandomDot(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        2, 25, 25, oh, 'OH');
      this.OH.addSince(this.scene);
      this.OH.selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        -82, -304, 42, -117);
      this.moleculeArr[i].removeSince(this.scene);
      this.moleculeArr[index].removeSince(this.scene);
      this.moleculeArr.splice(i, 1, this.HAc);
      this.moleculeArr.splice(index, 1, this.OH);
      this.Acnumber --;
      this.number1 -= 1;
      this.number2 += 1;
      this.number3 += 1;
      this.myChart.setOption({
        animationDurationUpdate: 3000,
        series: [{
          data: [this.number1, this.number2, this.number3],
        }]
      });
    } else {
      this.reboundEvent(index, i);
    }
  }
  //设置柱状图的样式
  histogram1() {
    this.myChart = eCharts.init(document.getElementById('eChart_box'));
    const option = {
      // 初始动画的时长
      animationDuration: 30,
      xAxis: {
        type: 'category',
        data: ['', '', ''],
        name: '粒子种类',
        nameGap: 10,
        nameTextStyle: {
          fontSize: 18
        },
        splitNumber: 3,
        splitLine: {
          show: false
        },
        axisTick: {
          inside: true,
          length: 0
        },
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: 9,
          symbolSize: [ 8, 10],
          lineStyle: {
            color: '#EDEDED',
            width: 2
          },
          textStyle: {
            color: '#EDEDED',
            fontWeight: 'normal',
            fontSize: 18
          },
        },
        axisLabel: {
          show: true,
          fontSize: 18
        },
      },
      // 设置柱状图向左或者向右偏移多少位置
      grid: {
        right: '25%',
      },
      yAxis: {
        type: 'value',
        max: 5,
        min: 0,
        splitNumber: 5,
        name: '粒子个数',
        nameTextStyle: {
          fontSize: 18
        },
        // 隐藏y轴横向网格线
        splitLine: {
          show: false
        },
        axisTick: {
          inside: true,
          length: 5
        },
        // 隐藏y轴上数字
        axisLabel: {
          show: true,
          fontSize: 18
        },
        // axisLine坐标轴箭头及线条样式
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: 9,
          symbolSize: [ 8, 10],
          lineStyle: {
            color: '#EDEDED',
            width: 3
          },
        },
      },
      series: [{
        data: [this.number1, this.number2, this.number3],
        type: 'bar',
        barWidth : 26,
        itemStyle: {
          normal: {
            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function (params: any) {
              const colorList = ['#FEAE23', '#FE4623', '#37E9DA'];
              return colorList[params.dataIndex];
            }
          },
          emphasis: {
            itemStyle: {
              color: '#ffffff',
            }
          }
        },
      }],
    };
    this.myChart.setOption(option);
  }

  resize(width: number, height: number): void {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  //重置事件
  reset(): void {
    this.anewMolecule();
    this.runAnimation(0);
    this.scene.add(this.cup, this.tag);
    this.scene.remove(this.cup1, this.heat);
  }
}




