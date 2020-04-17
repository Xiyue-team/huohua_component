import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { RandomDot } from './RandomDot';
import { SliderControlLine } from './SliderControlLine';

import * as CL from '../sub_static/UI/CL.png';
import * as CLe from '../sub_static/UI/CL2.png';
import * as e from '../sub_static/UI/e.png';
import * as liquidy from '../sub_static/UI/liquid1.jpg';
import * as liquide from '../sub_static/UI/liquid2.jpg';
import * as molteny from '../sub_static/UI/molten1.jpg';
import * as moltene from '../sub_static/UI/molten2.jpg';
import * as Na from '../sub_static/UI/Na.png';
import * as Nae from '../sub_static/UI/Na2.png';
import * as solidy from '../sub_static/UI/solid1.jpg';
import * as solide from '../sub_static/UI/solid2.jpg';
import * as water from '../sub_static/UI/water.png';
import * as white from '../sub_static/UI/white.png';
import * as kaig from '../sub_static/UI/kaiguan.png';
import * as bai from '../sub_static/UI/bai.png';
import * as huang from '../sub_static/UI/huang.png';
import * as mask from '../sub_static/UI/mask.png';
import * as arrow from '../sub_static/UI/arrow.png';

export class Ihndddx extends ThreeBase {
  sliderControlLine: SliderControlLine;
  browserInfo: BrowserInfo;
  private CL = ThreeUtil.createImg(36, 36, CL, -240, -50, 7);
  private CLe = ThreeUtil.createImg(40, 39, CLe, -260, -45, 7);
  private e = ThreeUtil.createImg(11, 11, e, -128, -50, 7);
  private liquidy = ThreeUtil.createImg(390, 350, liquidy, 160, 0, 5);
  private liquide = ThreeUtil.createImg(390, 350, liquide, 160, 0, 5);
  private molteny = ThreeUtil.createImg(390, 350, molteny, 160, 0, 5);
  private moltene = ThreeUtil.createImg(390, 350, moltene, 160, 0, 5);
  private Na = ThreeUtil.createImg(24, 24, Na, -240, -50, 7);
  private Nae = ThreeUtil.createImg(35, 36, Nae, -260, 10, 7);
  private solidy = ThreeUtil.createImg(390, 350, solidy, 160, 0, 5);
  private solide = ThreeUtil.createImg(390, 350, solide, 160, 0, 5);
  private water = ThreeUtil.createImg(301, 300, water, -250, -20, 5);
  private white = ThreeUtil.createImg(301, 300, white, -250, -20, 5);
  private kaig = ThreeUtil.createImg(135, 80, kaig, 220, -137, 10);
  private bai = ThreeUtil.createImg(7, 7, bai, -12, -130, 7);
  private huang = ThreeUtil.createImg(6, 6, huang, 61, -130, 7);
  private mask = ThreeUtil.createImg(30, 330, mask, -128, -334, 8);
  private masky = ThreeUtil.createImg(30, 330, mask, -372, 295, 8);
  private arrow = ThreeUtil.createImg(48, 48, arrow, 220, -60, 8);

  private moleculeArr: any = [];
  private moleculeArr1: any = [];
  private moleculeArr2: any = [];
  private moleculeArr3: any = [];
  private moleculeArr4: any = [];
  timer: any;

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
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.render();
    this.initObject();
    this.initEvt();
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
    this.camera.position.set(-10, 0, 650);
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

  //给开关绑定点击事件
  initEvt() {
    this.sliderControlLine = new SliderControlLine([this.kaig]);
    this.sliderControlLine.setCanvas(this);
    this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
  }

  //初始界面
  initObject() {
    this.kaig.name = 'kaig';
    this.scene.add(this.solidy, this.white, this.kaig, this.arrow);
    this.arrow.visible = true;
    this.addMolecule();
    this.arr();
    (this.solidy.material as any).opacity = 0.99;
  }

  //箭头
  arr() {
    (this.arrow.material as any).opacity = 1;
    const op = 0.02;
    let tou = (this.arrow.material as any).opacity;
    const thiz = this;
    function animate() {
      tou -= op;
      (thiz.arrow.material as any).opacity = tou;
      if ((thiz.arrow.material as any).opacity < 0.1) {
        tou = 1;
      }
      thiz.timer = requestAnimationFrame(animate);
    }
    animate();
  }

  // 创建NaCl固体场景分子函数
  creatMolecule(molecule: any, radius: number, width: number, x: number, img: any, name: string, nuv: number) {
    if (nuv === 1) {
      for (let i = 1; i < 6; i += 2) {  //1,3,5列离子
        molecule = new RandomDot(x, -36 * (i - 1), 7, width, width, img, name);
        this.moleculeArr.push(molecule);
        molecule.addSince(this.scene);
      }
    } else if (nuv === 2) {
      for (let i = 2; i < 5; i += 2) {  //2,4列离子
        molecule = new RandomDot(x, -36 * (i - 1), 7, width, width, img, name);
        this.moleculeArr.push(molecule);
        molecule.addSince(this.scene);
      }
    }
  }
  //固体场景添加5行6列离子
  addMolecule() {
    this.creatMolecule(this.CL, 18, 36, -339, CL, 'CL', 1);
    this.creatMolecule(this.Na, 12, 24, -339,  Na, 'Na', 2);
    this.creatMolecule(this.CL, 18, 36, -303, CL, 'CL', 2);
    this.creatMolecule(this.Na, 12, 24, -303,  Na, 'Na', 1);

    this.creatMolecule(this.CL, 18, 36, -267, CL, 'CL', 1);
    this.creatMolecule(this.Na, 12, 24, -267,  Na, 'Na', 2);
    this.creatMolecule(this.CL, 18, 36, -231, CL, 'CL', 2);
    this.creatMolecule(this.Na, 12, 24, -231,  Na, 'Na', 1);

    this.creatMolecule(this.CL, 18, 36, -195, CL, 'CL', 1);
    this.creatMolecule(this.Na, 12, 24, -195,  Na, 'Na', 2);
    this.creatMolecule(this.CL, 18, 36, -159, CL, 'CL', 2);
    this.creatMolecule(this.Na, 12, 24, -159,  Na, 'Na', 1);
    for (let i = 0; i < 30; i++) {
      this.moleculeArr[i].selfMoveAnimate1(this.moleculeArr[i].box.position.x, this.moleculeArr[i].box.position.y,
        this.moleculeArr[i].box.position.x + 1, this.moleculeArr[i].box.position.x - 1,
        this.moleculeArr[i].box.position.y + 1, this.moleculeArr[i].box.position.y - 1, 2);
    }
  }

  //固体切换回 或者 切换走 离子刷新
  newaddMolecule() {
    for (let i = 0; i < this.moleculeArr.length; i++) {
      this.moleculeArr[i].removeSince(this.scene);
    }
    this.moleculeArr = [];
    this.addMolecule();
  }

  deladdMolecule() {
    for (let i = 0; i < this.moleculeArr.length; i++) {
      this.moleculeArr[i].removeSince(this.scene);
    }
    this.moleculeArr = [];
  }

  //创建NaCl液体环境里的离子
  creatliquid(molecule1: any, radius: number, width: number, img: any, name: string) {
        molecule1 = new RandomDot((Math.random() * 188) - 343, (Math.random() * 165) - 150, 7, width, width, img, name);
        this.moleculeArr1.push(molecule1);
        molecule1.addSince(this.scene);
  }

  addliquid() {
    this.creatliquid(this.Nae, 21, 42, Nae, 'Na2');
    this.creatliquid(this.CLe, 23, 46, CLe, 'CL2');
    this.creatliquid(this.Nae, 21, 42, Nae, 'Na2');
    this.creatliquid(this.CLe, 23, 46, CLe, 'CL2');
    this.creatliquid(this.Nae, 21, 42, Nae, 'Na2');
    this.creatliquid(this.CLe, 23, 46, CLe, 'CL2');
    this.creatliquid(this.Nae, 21, 42, Nae, 'Na2');
    this.creatliquid(this.CLe, 23, 46, CLe, 'CL2');
  }

  newaddliquid() {
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      this.moleculeArr1[i].removeSince(this.scene);
    }
    this.moleculeArr1 = [];
    this.addliquid();
  }

  deladdliquid() {
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      this.moleculeArr1[i].removeSince(this.scene);
    }
    this.moleculeArr1 = [];
  }

  //创建电子
  createlectronic(molecule2: any, radius: number, width: number, img: any, name: string, nuv: number, y: number) {
    if (nuv === 1) {
      molecule2 = new RandomDot(-372, y, 7, width, width, img, name);
      this.moleculeArr2.push(molecule2);
      molecule2.addSince(this.scene);
    } else if (nuv === 2) {
      molecule2 = new RandomDot(-128, y, 7, width, width, img, name);
      this.moleculeArr2.push(molecule2);
      molecule2.addSince(this.scene);
    }
  }

  //液体环境添加电子
  addelectronic() {
    this.createlectronic(this.e, 11, 11, e, 'e', 1, 125);
    this.createlectronic(this.e, 11, 11, e, 'e', 1, 125);
    this.createlectronic(this.e, 11, 11, e, 'e', 1, 125);
    this.createlectronic(this.e, 11, 11, e, 'e', 2, -167);
    this.createlectronic(this.e, 11, 11, e, 'e', 2, -167);
    this.createlectronic(this.e, 11, 11, e, 'e', 2, -167);
  }

  //新创建电子
  newaddelectronic() {
    for (let i = 0; i < this.moleculeArr2.length; i++) {
      this.moleculeArr2[i].removeSince(this.scene);
    }
    this.moleculeArr2 = [];
    this.addelectronic();
  }

  //删除电子
  deladdelectronic() {
    for (let i = 0; i < this.moleculeArr2.length; i++) {
      this.moleculeArr2[i].removeSince(this.scene);
    }
    this.moleculeArr2 = [];
  }

  //创建液体环境气泡
  createbubbles(molecule3: any, radius: number, width: number, img: any, name: string, nuv: number, y: number) {
    if (nuv === 1) {
      molecule3 = new RandomDot(-12 + (Math.random() * 7), y, 7, width, width, img, name);
      this.moleculeArr3.push(molecule3);
      molecule3.addSince(this.scene);
    } else if (nuv === 2) {
      molecule3 = new RandomDot(61 + (Math.random() * 7), y, 7, width, width, img, name);
      this.moleculeArr3.push(molecule3);
      molecule3.addSince(this.scene);
    }
  }

  //添加液体环境气泡
  addbubbles() {
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -150);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -141);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -133);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -125);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -116);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -107);
    this.createbubbles(this.bai, 7, 7, bai, 'bai', 1, -98);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -150);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -141);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -133);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -125);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -116);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -107);
    this.createbubbles(this.huang, 7, 7, huang, 'huang', 2, -98);
  }

  //新创建气泡
  newaddbubbles() {
    for (let i = 0; i < this.moleculeArr3.length; i++) {
      this.moleculeArr3[i].removeSince(this.scene);
    }
    this.moleculeArr3 = [];
    this.addbubbles();
  }

  //切换场景时 删除气泡
  deladdbubbles() {
    for (let i = 0; i < this.moleculeArr3.length; i++) {
      this.moleculeArr3[i].removeSince(this.scene);
    }
    this.moleculeArr3 = [];
  }

  //创建熔融态NaCl环境里的离子
  creatmolten(molecule4: any, radius: number, width: number, img: any, name: string) {
    molecule4 = new RandomDot((Math.random() * 188) - 343, (Math.random() * 165) - 150, 7, width, width, img, name);
    this.moleculeArr4.push(molecule4);
    molecule4.addSince(this.scene);
  }

  addmolten() {
    this.creatmolten(this.Na, 12, 24, Na, 'Na');
    this.creatmolten(this.CL, 18, 36, CL, 'CL');
    this.creatmolten(this.Na, 12, 24, Na, 'Na');
    this.creatmolten(this.CL, 18, 36, CL, 'CL');
    this.creatmolten(this.Na, 12, 24, Na, 'Na');
    this.creatmolten(this.CL, 18, 36, CL, 'CL');
    this.creatmolten(this.Na, 12, 24, Na, 'Na');
    this.creatmolten(this.CL, 18, 36, CL, 'CL');
    this.creatmolten(this.Na, 12, 24, Na, 'Na');
    this.creatmolten(this.CL, 18, 36, CL, 'CL');
  }

  newaddmolten() {
    for (let i = 0; i < this.moleculeArr4.length; i++) {
      this.moleculeArr4[i].removeSince(this.scene);
    }
    this.moleculeArr4 = [];
    this.addmolten();
  }

  deladdmolten() {
    for (let i = 0; i < this.moleculeArr4.length; i++) {
      this.moleculeArr4[i].removeSince(this.scene);
    }
    this.moleculeArr4 = [];
  }

  //氯化钠固体
  solid() {
    this.scene.add(this.solidy, this.white);
    this.scene.remove(this.liquidy, this.liquide, this.molteny, this.moltene, this.water, this.solide, this.mask, this.masky);
    this.arrow.visible = true;
    this.newaddMolecule();
    this.deladdliquid();
    this.deladdelectronic();
    this.deladdbubbles();
    this.deladdmolten();
    clearTimeout(this.timer);
  }

  //氯化钠液体
  liquid() {
    this.scene.add(this.liquidy, this.water, this.mask, this.masky);
    (this.liquidy.material as any).opacity = 0.99;
    this.scene.remove(this.solidy, this.solide, this.molteny, this.moltene, this.white, this.liquide);
    this.arrow.visible = true;
    this.deladdMolecule();
    this.deladdelectronic();
    this.deladdbubbles();
    this.deladdmolten();
    this.newaddliquid();
    clearTimeout(this.timer);
    //液体中 离子自由运动
    for (let i = 0; i < this.moleculeArr1.length; i++) {
      this.moleculeArr1[i].selfMoveAnimate1(this.moleculeArr1[i].box.position.x, this.moleculeArr1[i].box.position.y,
        -158, -340, 12, -147, 5);
    }
  }

  //熔融态氯化钠
  molten() {
    this.scene.add(this.molteny, this.water, this.mask, this.masky);
    (this.molteny.material as any).opacity = 0.99;
    this.scene.remove(this.solidy, this.solide, this.liquidy, this.liquide, this.white, this.moltene);
    this.arrow.visible = true;
    this.deladdMolecule();
    this.deladdelectronic();
    this.deladdbubbles();
    this.deladdliquid();
    this.newaddmolten();
    clearTimeout(this.timer);
    for (let i = 0; i < 9; i++) {
      this.moleculeArr4[i].selfMoveAnimate1(this.moleculeArr4[i].box.position.x, this.moleculeArr4[i].box.position.y,
        -149, -349, 21, -156, 5);
    }
    for (let i = 1; i < 10; i += 2) {
      this.moleculeArr4[i].selfMoveAnimate1(this.moleculeArr4[i].box.position.x, this.moleculeArr4[i].box.position.y,
        -156, -343, 15, -149, 5);
    }
  }

  moveHandle(pos: any, name: string): void {

  }

  //点击界面里开关
  downHandle(name: string) {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.arrow.visible = false;
    if (name === 'kaig') {
      if (tp.active1 === true) {  //固体
        this.scene.add(this.solide);
        this.scene.remove(this.solidy);
        (this.solide.material as any).opacity = 0.99;
        this.newaddMolecule();
      } else if (tp.active2 === true) {  //液体
        this.scene.add(this.liquide);
        (this.liquide.material as any).opacity = 0.99;
        this.scene.remove(this.liquidy);
        this.liquidmove();
        this.newaddelectronic();
        this.Naelectronic();
        this.Clelectronic();
        this.newaddbubbles();
        this.bubblesmove();
      } else if (tp.active3 === true) {  //熔融态
        this.scene.add(this.moltene);
        (this.moltene.material as any).opacity = 0.99;
        this.scene.remove(this.molteny);
        this.moltenmove();
        this.newaddelectronic();
        this.Naelectronic();
        this.Clelectronic();
      }
    }
  }

  liquidmove() {  //液体里面 离子运动
    for (let i = 0; i < 7; i += 2) {  // Na+离子
      this.moleculeArr1[i].moveAnimate2(this.moleculeArr1[i].box.position.x, this.moleculeArr1[i].box.position.y,
        -348, this.moleculeArr1[i].box.position.y, 0.6);
    }
    for (let i = 1; i < 8; i += 2) {  //Cl-离子
      this.moleculeArr1[i].moveAnimate2(this.moleculeArr1[i].box.position.x, this.moleculeArr1[i].box.position.y,
        -152, this.moleculeArr1[i].box.position.y, 0.6);
    }
  }

  moltenmove() {  //熔融态时里面 离子运动
    for (let i = 0; i < 9; i += 2) {  // Na+离子
      this.moleculeArr4[i].moveAnimate2(this.moleculeArr4[i].box.position.x, this.moleculeArr4[i].box.position.y,
        -352, this.moleculeArr4[i].box.position.y, 0.6);
    }
    for (let i = 1; i < 10; i += 2) {  //Cl-离子
      this.moleculeArr4[i].moveAnimate2(this.moleculeArr4[i].box.position.x, this.moleculeArr4[i].box.position.y,
        -153, this.moleculeArr4[i].box.position.y, 0.6);
    }
  }

  Naelectronic() {  //液体条件时，左边电子运动
    this.moleculeArr2[0].moveAnimate1(-372, 125, -372, -167, 1.4, 125);
    this.moleculeArr2[1].moveAnimate1(-372, 225, -372, -167, 1.4, 125);
    this.moleculeArr2[2].moveAnimate1(-372, 325, -372, -167, 1.4, 125);
  }

  Clelectronic() {  //液体条件时，右边电子运动
    this.moleculeArr2[3].moveAnimate1(-128, -170, -128, 125, 1.4, -170);
    this.moleculeArr2[4].moveAnimate1(-128, -270, -128, 125, 1.4, -170);
    this.moleculeArr2[5].moveAnimate1(-128, -370, -128, 125, 1.4, -170);
  }

  //NaCl液体时，右边气泡动画
  bubblesmove() {
    for (let i = 0; i < 14; i++) {
      this.moleculeArr3[i].moveAnimate(this.moleculeArr3[i].box.position.x, this.moleculeArr3[i].box.position.y,
        this.moleculeArr3[i].box.position.x, -80, 0.5);
    }
  }

  resize(width: number, height: number): void {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  //重置事件
  reset(): void {
    this.scene.add(this.solidy, this.white);
    this.scene.remove(this.liquidy, this.liquide, this.molteny, this.moltene, this.water, this.solide);
    this.arrow.visible = true;
    this.newaddMolecule();
    this.deladdliquid();
    this.deladdelectronic();
    this.deladdbubbles();
    this.deladdmolten();
    clearTimeout(this.timer);
  }
}
