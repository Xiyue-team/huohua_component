import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';

const OBJLoader = require('three-obj-loader');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';

import common from './CommonForThree';
import * as diwu from '../sub_static/diwu.png';
import * as start from '../sub_static/start.png';
import * as combine from '../sub_static/combine.png';
import * as combining from '../sub_static/combining.png';
import * as combined from '../sub_static/combined.png';
import * as suoyao from '../sub_static/suoyao.png';

let thiz: any = null;
OBJLoader(THREE);

export class MydwjhdlzjsModel extends ThreeBase {
  browserInfo: BrowserInfo;
  private diwu = common.createImg([18, 70, 10], 65, 35, diwu);
  private start = common.createImg([10, -50, 0], 180, 180, start);
  private combine = common.createImg([10, -50, 0], 180, 180, combine);
  private combining = common.createImg([10, -50, 0], 180, 180, combining);
  private combined = common.createImg([10, -50, 0], 180, 180, combined);
  private suoyao = common.createImg([10, -50, 0], 180, 180, suoyao);

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
    this.browserInfo = (window as any)['env'].browserInfo;
    this.init();
  }

  private render = () => { requestAnimationFrame(this.render); this.renderer.render(this.scene, this.camera); };

  init() {
    thiz = this;
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.render();
    this.initElement();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.position.x = -30;
  }

  //  * 初始化镜头
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(-20, 0, 290);
  }

  // 初始化场景元素
  initElement() {
    this.scene.add(this.diwu, this.suoyao);
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

  //锁钥学说
  animation() {
    //清除上次动画值
    this.closer();
    thiz.delay4 = setTimeout(this.first, 1500);
  }

  first() {
    let num1 = 0;
    let numb1 = thiz.diwu.position.y;
    //函数改变底物的y轴坐标值、重复调用直到达到指定位置后取消动画
    function anim() {
      num1 += 0.03;
      numb1 -= num1;
      thiz.post = numb1;
      thiz.diwu.position.set(18, thiz.post, 10);
      if (thiz.post <= -4) {
        cancelAnimationFrame(thiz.timer1);
        (window as any).viewHandler.viewModel.$data.make = true;
        return;
      }
      thiz.timer1 = requestAnimationFrame(anim);
    }
    anim();
  }

  //诱导契合学说
  animation1() {
    //清除上次动画值
    this.delanimtion();
    //删除锁钥学说图片 添加本动画图片 以及初始个图片对应透明度
    thiz.scene.remove(thiz.suoyao);
    thiz.scene.add(thiz.start, thiz.combine, thiz.combining, thiz.combined);
    (thiz.start.material as any).opacity = 1;
    (thiz.combine.material as any).opacity = 0;
    (thiz.combining.material as any).opacity = 0;
    (thiz.combined.material as any).opacity = 0;
    thiz.delay5 = setTimeout(this.second, 1500);
  }

  second() {
    let num = 0;
    let numb = thiz.diwu.position.y;
    //酶运动到指定位置的动画
    function ani() {
      num += 0.03;
      numb -= num;
      thiz.pos = numb;
      thiz.diwu.position.set(18, thiz.pos, 10);
      //达到指定位置后结束下落动画并执行切图动画
      if (thiz.pos <= 8) {
        cancelAnimationFrame(thiz.timer2);
        thiz.anima1();
        return;
      }
      thiz.timer2 = requestAnimationFrame(ani);
    }
    ani();
  }

  //start.png 到 combine.png的动画
  anima1() {
    function ani1() {
      const op = 0.004;
      let opp1 = thiz.start.material.opacity;
      let opp2 = thiz.combine.material.opacity;
      let opp3 = thiz.diwu.material.opacity;
      opp1 -= op;
      opp2 += op;
      opp3 -= op;
      thiz.start.material.opacity = opp1;
      thiz.combine.material.opacity = opp2;
      thiz.diwu.material.opacity = opp3;
      //该动画执行结束后结束动画并切换到下个动画
      if (thiz.start.material.opacity <= 0 && thiz.combine.material.opacity >= 1 && thiz.diwu.material.opacity <= 0) {
        cancelAnimationFrame(thiz.timer3);
        thiz.anima2();
        return;
      }
      thiz.timer3 = requestAnimationFrame(ani1);
    }
    ani1();
  }

  //combine.png 到 combining.png的动画
  anima2() {
    (thiz.start.material as any).opacity = 0;
    (thiz.combine.material as any).opacity = 1;
    (thiz.combining.material as any).opacity = 0;
    (thiz.combined.material as any).opacity = 0;
    (thiz.diwu.material as any).opacity = 0;

    function ani2() {
      const op = 0.004;
      let opp1 = thiz.combine.material.opacity;
      let opp2 = thiz.combining.material.opacity;
      opp1 -= op;
      opp2 += op;
      thiz.combine.material.opacity = opp1;
      thiz.combining.material.opacity = opp2;
      //该动画执行结束后结束动画并切换到下个动画
      if (thiz.combine.material.opacity <= 0 && thiz.combining.material.opacity >= 1) {
        cancelAnimationFrame(thiz.timer4);
        thiz.anima3();
        return;
      }
      thiz.timer4 = requestAnimationFrame(ani2);
    }
    ani2();
  }

  //combining.png 到 combined.png的动画
  anima3() {
    (thiz.start.material as any).opacity = 0;
    (thiz.combine.material as any).opacity = 0;
    (thiz.combining.material as any).opacity = 1;
    (thiz.combined.material as any).opacity = 0;
    (thiz.diwu.material as any).opacity = 0;

    function ani3() {
      const op = 0.004;
      let opp1 = thiz.combining.material.opacity;
      let opp2 = thiz.combined.material.opacity;
      opp1 -= op;
      opp2 += op;
      thiz.combining.material.opacity = opp1;
      thiz.combined.material.opacity = opp2;
      if (thiz.combining.material.opacity <= 0 && thiz.combined.material.opacity >= 1) {
        cancelAnimationFrame(thiz.timer5);
        (window as any).viewHandler.viewModel.$data.pointerEvents1 = 'auto';
        return;
      }
      thiz.timer5 = requestAnimationFrame(ani3);
    }
    ani3();
  }

  //重置按钮
  closer() {
    this.delanimtion();
    //删除图片和添加初始场景图片
    this.scene.remove(this.combining, this.combine, this.combined, this.start);
    this.scene.add(this.suoyao);
    (window as any).viewHandler.viewModel.$data.pointerEvents1 = 'auto';
    (window as any).viewHandler.viewModel.$data.make = true;
  }

  //清除定时器和动画
  delanimtion() {
    this.diwu.position.set(18, 70, 10);
    (thiz.diwu.material as any).opacity = 1;
    clearTimeout(thiz.delay4);
    clearTimeout(thiz.delay5);
    cancelAnimationFrame(thiz.timer1);
    cancelAnimationFrame(thiz.timer2);
    cancelAnimationFrame(thiz.timer3);
    cancelAnimationFrame(thiz.timer4);
    cancelAnimationFrame(thiz.timer5);
  }
}
