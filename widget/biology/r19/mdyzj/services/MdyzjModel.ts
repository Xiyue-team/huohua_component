import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OBJLoader = require('three-obj-loader');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';

import common from './CommonForThree';
import * as enzyme from '../sub_static/assets/enzyme.png';
import * as substrate from '../sub_static/assets/substrate.png';
import * as stop from '../sub_static/assets/stop.png';
import * as cannot from '../sub_static/assets/cannot.png';
import * as touch_start from '../sub_static/assets/touch_start.png';
import * as touching from '../sub_static/assets/touching.png';
import * as suppressant from '../sub_static/assets/suppressant.jpg';

let thiz: any = null;
OBJLoader(THREE);

export class MdyzjModel extends ThreeBase {

  /**
   * @param {domElement} domElement
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离d
   */

  browserInfo: BrowserInfo;

  constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
    number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = (window as any)['env'].browserInfo;
    this.init();
  }

  //three场景 引入图片
  private enzyme = common.createImg([20, -50, -10], 185, 185, enzyme);
  private substrate = common.createImg([30, 85, -10], 32, 60, substrate);
  private stop = common.createImg([2, 90, -10], 30, 60, stop);
  private cannot = common.createImg([23, 45, -10], 10, 35, cannot);
  private touch_start = common.createImg([20, -50, -22], 180, 180, touch_start);
  private touching = common.createImg([20, -50, -22], 180, 180, touching);
  private suppressant = common.createImg([-200, -110, -30], 48, 26, suppressant);
  private lineGroup = new THREE.Group();

  //线的材质
  private line_0 = common.drawUnitLine({
    color: '#979797',
    isDash: false
  });
  private line_1 = common.drawUnitLine({
    color: '#979797',
    isDash: false
  });
  private line_2 = common.drawUnitLine({
    color: '#979797',
    isDash: false
  });

  //初始界面的点、线、字
  private line = common.scaleLine([25, 85, 0], [-15, 85, 0], this.line_0);
  private line1 = common.scaleLine([30, -10, 0], [-90, -10, 0], this.line_1);
  private line2 = common.scaleLine([-20, -36, 0], [-90, -36, 0], this.line_2);
  private point = common.drawCircle(2, { color: '#ccc', position: [25, 85, 0] });
  private point1 = common.drawCircle(1.5, { color: '#fff', position: [25, 85, 0] });
  private point2 = common.drawCircle(2, { color: '#ccc', position: [30, -10, 0] });
  private point3 = common.drawCircle(1.5, { color: '#fff', position: [30, -10, 0] });
  private point4 = common.drawCircle(2, { color: '#ccc', position: [-20, -36, 0] });
  private point5 = common.drawCircle(1.5, { color: '#fff', position: [-20, -36, 0] });
  private text = common.createText('反应底物', [-40, 90, 0], { color: '#666', isItalic: false });
  private text1 = common.createText('活性位点', [-115, -5, 0], { color: '#666', isItalic: false });
  private text2 = common.createText('酶', [-103, -32, 0], { color: '#666', isItalic: false });

  private render = () => { requestAnimationFrame(this.render); this.renderer.render(this.scene, this.camera); };

  init() {
    thiz = this;
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.initElement();
    this.render();
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.position.x = -30;
  }

  //初始化镜头
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 270);
  }

  //初始化渲染器
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

  //初始化光源
  initLight(): void {
    const light = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light);
  }

  // 初始化场景元素
  initElement() {
    this.lineGroup.add(this.line, this.line1, this.line2);
    this.scene.add(this.enzyme, this.substrate, this.lineGroup, this.point, this.point1,
      this.point2, this.point3, this.point4, this.point5, this.text, this.text1, this.text2);
  }

// 移除初始界面的点、线、字
  close() {
    this.scene.remove(this.lineGroup, this.point, this.point1, this.point2,
      this.point3, this.point4, this.point5, this.text, this.text1, this.text2);
  }

  // 正常反应
  animation() {
    //每一次切换动画时都清除上次动画的定时器
    this.ret1();
    (this.enzyme.material as any).opacity = 1;
    //移除不需要的贴图
    this.scene.remove(this.touch_start, this.touching, this.stop, this.cannot);
    let num = 0;
    let numb = this.substrate.position.y;

    //Y轴坐标数值的变化实现位移效果
    function normalmove() {
      num += 0.03;
      numb -= num;
      thiz.pos = numb;
      thiz.substrate.position.set(31, thiz.pos, 0);
      //当坐标轴达到指定值 即物体唯一到指定位置时结束动画
      if (thiz.pos <= 1) {
        cancelAnimationFrame(thiz.timer);
        return;
      }
      thiz.timer = requestAnimationFrame(normalmove);
    }

    normalmove();
  }

  //竞争性抑制剂
  animation1() {
    //动画开始时清除上一次动画的定时器、动画等
    this.ret1();
    //引入需要的图片、删除无用的图片
    (this.enzyme.material as any).opacity = 1;
    this.scene.remove(this.touch_start, this.touching, this.cannot);
    this.scene.add(this.stop);
    thiz.stop.position.set(30, 90, -10);
    thiz.substrate.position.set(77, 85, -10);

    let num2 = 0;
    let numb2 = thiz.stop.position.y;

    function competitionmove() {  //反应物位移动画
      num2 += 0.03;
      numb2 -= num2;
      thiz.pos2 = numb2;
      thiz.stop.position.set(30, thiz.pos2, 0);
      if (thiz.pos2 <= -3) {  //达到指定位置后结束位移动画
        cancelAnimationFrame(thiz.timer2);
        return;
      }
      thiz.timer2 = requestAnimationFrame(competitionmove);
    }

    competitionmove();
    thiz.delay2 = setTimeout(stp1, 1500);

    //竞争性抑制剂移动到指定为之后，反应底物的位移
    function stp1() {
      let num3 = 0;
      let numb3 = thiz.substrate.position.x;

      function secmove() {
        num3 += 0.03;
        numb3 -= num3;
        thiz.pos3 = numb3;
        thiz.substrate.position.set(thiz.pos3, 85, -10);
        if (thiz.pos3 <= 32) {
          cancelAnimationFrame(thiz.timer3);
          return;
        }
        thiz.timer3 = requestAnimationFrame(secmove);
      }

      secmove();
    }

    thiz.delay3 = setTimeout(anim2, 3500);

    //反应底物到达指定位置后指示箭头慢慢出现动画
    function anim2() {
      thiz.scene.add(thiz.cannot);
      (thiz.cannot.material as any).opacity = 0;
      thiz.cannot.position.set(28, 45, -10);

      function cat() {
        const opac = 0.005;
        let opac2 = thiz.cannot.material.opacity;
        opac2 += opac;
        thiz.cannot.material.opacity = opac2;
        if (thiz.cannot.material.opacity >= 1) {
          cancelAnimationFrame(thiz.timer9);
          return;
        }
        thiz.timer9 = requestAnimationFrame(cat);
      }

      cat();
    }
  }

  //非竞争性抑制
  animations() {
    this.ret1();
    //添加非竞争性抑制剂、
    thiz.substrate.position.set(30, 85, -10);
    thiz.scene.remove(thiz.stop, thiz.cannot);
    this.scene.add(this.suppressant);
    this.suppressant.scale.set(1, 1.08, 1);
    this.suppressant.position.set(-200, -110, -30);
    let numa = 0;
    let numb1 = this.suppressant.position.x;

    //非竞争性抑制剂移动到酶上动画
    function anim() {
      numa += 0.02;
      numb1 += numa;
      thiz.post = numb1;
      thiz.suppressant.position.set(thiz.post, -100, -30);
      if (thiz.post >= -40) {
        cancelAnimationFrame(thiz.timer8);
        //当非竞争性抑制剂移动到酶上后，切换酶的图片来表达反应过程
        thiz.animation2();
        return;
      }
      thiz.timer8 = requestAnimationFrame(anim);
    }

    anim();
  }

  //酶反映动画
  animation2() {
    this.scene.add(this.touch_start, this.touching);
    (thiz.touching.material as any).opacity = 0;
    (thiz.touch_start.material as any).opacity = 0;
    (thiz.enzyme.material as any).opacity = 1;

    //非竞争性抑制剂初步接触时动画
    function ani5() {
      const op = 0.009;
      const op1 = 0.009;
      let opp1 = thiz.enzyme.material.opacity;
      let opp2 = thiz.touch_start.material.opacity;
      opp1 -= op1;
      opp2 += op;
      thiz.enzyme.material.opacity = opp1;
      thiz.touch_start.material.opacity = opp2;
      if (thiz.enzyme.material.opacity <= 0 && thiz.touch_start.material.opacity >= 1) {
        cancelAnimationFrame(thiz.timer5);
        return;
      }
      thiz.timer5 = requestAnimationFrame(ani5);
    }

    ani5();
    thiz.delay4 = setTimeout(this.cut, 2000);
  }

  //非竞争性抑制剂接触后进一步反应的动画效果
  cut() {
    (thiz.enzyme.material as any).opacity = 0;
    (thiz.touch_start.material as any).opacity = 1;
    (thiz.touching.material as any).opacity = 0;
    (thiz.suppressant.material as any).opacity = 1;
    thiz.scene.add(thiz.touching);
    const op2 = 0.005;
    let toui = thiz.touch_start.material.opacity;
    let tou2 = thiz.touching.material.opacity;
    let toul = thiz.suppressant.material.opacity;

    function ani6() {
      toui -= op2;
      tou2 += op2;
      toul -= op2;
      thiz.touch_start.material.opacity = toui;
      thiz.touching.material.opacity = tou2;
      thiz.suppressant.material.opacity = toul;
      if (thiz.touch_start.material.opacity <= 0 && thiz.touching.material.opacity >= 1 && thiz.suppressant.material.opacity <= 0) {
        cancelAnimationFrame(thiz.timer6);
        return;
      }
      thiz.timer6 = requestAnimationFrame(ani6);
    }

    ani6();
    thiz.delay7 = setTimeout(thiz.anim3, 2000);
  }

  //箭头渐渐出现动画
  anim3() {
    thiz.scene.add(thiz.cannot);
    (thiz.cannot.material as any).opacity = 0;
    thiz.cannot.position.set(28, 45, -10);

    function cate() {
      const opac1 = 0.005;
      let opac3 = thiz.cannot.material.opacity;
      opac3 += opac1;
      thiz.cannot.material.opacity = opac3;
      if (thiz.cannot.material.opacity >= 1) {
        cancelAnimationFrame(thiz.timer7);
        return;
      }
      thiz.timer7 = requestAnimationFrame(cate);
    }

    cate();
  }

  //点击重置按钮
  ret() {
    this.ret1();
    this.scene.remove(this.stop, this.cannot, this.touch_start, this.touching, this.suppressant);
    this.scene.add(this.enzyme, this.lineGroup, this.point, this.point1,
      this.point2, this.point3, this.point4, this.point5, this.text, this.text1, this.text2);
    this.substrate.position.set(30, 85, -10);
  }

  //点击切换右下角不同情况需要重置的部分内容
  ret1() {
    this.suppressant.position.set(-200, -110, -30);
    (thiz.enzyme.material as any).opacity = 1;
    (thiz.suppressant.material as any).opacity = 1;
    this.scene.remove(this.suppressant, this.cannot, this.touch_start, this.touching);
    //清除定时器
    window.clearTimeout(thiz.delay2);
    window.clearTimeout(thiz.delay3);
    window.clearTimeout(thiz.delay4);
    window.clearTimeout(thiz.delay7);
    //取消动画
    cancelAnimationFrame(thiz.timer);
    cancelAnimationFrame(thiz.timer2);
    cancelAnimationFrame(thiz.timer3);
    cancelAnimationFrame(thiz.timer5);
    cancelAnimationFrame(thiz.timer6);
    cancelAnimationFrame(thiz.timer7);
    cancelAnimationFrame(thiz.timer8);
    cancelAnimationFrame(thiz.timer9);
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
