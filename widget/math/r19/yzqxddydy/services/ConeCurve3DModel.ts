import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
const dragcontrols = require('three-dragcontrols').default;
import { Line } from '../../../../../src/three/component/Line';
import { Linear, TweenMax } from 'gsap';
import { ConeCurveHelper } from './ConeCurveHelper';
import * as mPointImage from '../sub_static/mPointImage.png';
import { FirstEquatin3DModel } from './FirstEquatin3DModel';
import { FirstEquatin3DModel2 } from './FirstEquatin3DModel2';
import { SecondEquatin3DModel } from './SecondEquatin3DModel';
import { SecondEquatin3DModel2 } from './SecondEquatin3DModel2';
import { ThirdEquatin3DModel } from './ThirdEquatin3DModel';

export class ConeCurve3DModel {

  scene: any;
  camera: any;
  renderer: any;

  // 三个方程式图片
  equationImage: any = [];

  firstEquatin3DModel: FirstEquatin3DModel;
  firstEquatin3DModel2: FirstEquatin3DModel2;
  secondEquatin3DModel: SecondEquatin3DModel;
  secondEquatin3DModel2: SecondEquatin3DModel2;
  thirdEquatin3DModel: ThirdEquatin3DModel;

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;
    this.initAxis();

    this.firstEquatin3DModel = new FirstEquatin3DModel(scene, camrea, renderer);
    this.scene.add(this.firstEquatin3DModel.firstEquatin);

    this.firstEquatin3DModel2 = new FirstEquatin3DModel2(scene, camrea, renderer);
    this.scene.add(this.firstEquatin3DModel2.firstEquatin);

    this.secondEquatin3DModel = new SecondEquatin3DModel(scene, camrea, renderer);
    this.scene.add(this.secondEquatin3DModel.secondEquatin);

    this.secondEquatin3DModel2 = new SecondEquatin3DModel2(scene, camrea, renderer);
    this.scene.add(this.secondEquatin3DModel2.secondEquatin);

    this.thirdEquatin3DModel = new ThirdEquatin3DModel(scene, camrea, renderer);
    this.scene.add(this.thirdEquatin3DModel.thirdEquatin);

    // this.firstEquatin3DModel.firstEquatin.visible = false;
    this.firstEquatin3DModel2.firstEquatin.visible = false;
    this.secondEquatin3DModel.secondEquatin.visible = false;
    this.secondEquatin3DModel2.secondEquatin.visible = false;
    this.thirdEquatin3DModel.thirdEquatin.visible = false;
  }

  // 初始化坐标轴
  initAxis() {
    const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
    this.scene.add(axis);
  }


  // 开始动画
  startAnimation() {

    if (this.firstEquatin3DModel.firstEquatin.visible === true) {
      this.firstEquatin3DModel.ellioseAnimation.play();

    } else if (this.firstEquatin3DModel2.firstEquatin.visible === true) {
      this.firstEquatin3DModel2.ellioseAnimation.play();

    } else if (this.secondEquatin3DModel.secondEquatin.visible === true) {
      this.secondEquatin3DModel.hyperbolaAnimation[0].play();

    } else if (this.secondEquatin3DModel2.secondEquatin.visible === true) {
      this.secondEquatin3DModel2.hyperbolaAnimation[0].play();

    } else if (this.thirdEquatin3DModel.thirdEquatin.visible === true) {
      this.thirdEquatin3DModel.ellioseAnimation.play();
    }
  }

  showEquatin() {

    if (this.firstEquatin3DModel.firstEquatin.visible === true) {
      // 公式1展示
      this.firstEquatin3DModel2.firstEquatin.visible = true;
      this.firstEquatin3DModel.firstEquatin.visible = false;
    } else if (this.secondEquatin3DModel.secondEquatin.visible === true) {
      // 公式2展示
      this.secondEquatin3DModel2.secondEquatin.visible = true;
      this.secondEquatin3DModel.secondEquatin.visible = false;
    } else if (this.firstEquatin3DModel2.firstEquatin.visible === true) {
      // 公式1还原
      this.firstEquatin3DModel.firstEquatin.visible = true;
      this.firstEquatin3DModel2.firstEquatin.visible = false;
    } else if (this.secondEquatin3DModel2.secondEquatin.visible === true) {
      // 公式2还原
      this.secondEquatin3DModel.secondEquatin.visible = true;
      this.secondEquatin3DModel2.secondEquatin.visible = false;
    }
  }

  // 公式1被点击事件
  firstEquationEvent () {
    // 显示场景1
    this.firstEquatin3DModel.firstEquatin.visible = true;
    this.firstEquatin3DModel2.firstEquatin.visible = false;
    this.secondEquatin3DModel.secondEquatin.visible = false;
    this.secondEquatin3DModel2.secondEquatin.visible = false;
    this.thirdEquatin3DModel.thirdEquatin.visible = false;
  }

  // 公式2被点击事件
  secondEquationEvent () {
    // 显示场景2
    this.firstEquatin3DModel.firstEquatin.visible = false;
    this.firstEquatin3DModel2.firstEquatin.visible = false;
    this.secondEquatin3DModel.secondEquatin.visible = true;
    this.secondEquatin3DModel2.secondEquatin.visible = false;
    this.thirdEquatin3DModel.thirdEquatin.visible = false;
  }

  // 公式3被点击事件
  thirdEquationEvent () {
    // 显示场景3
    this.firstEquatin3DModel.firstEquatin.visible = false;
    this.firstEquatin3DModel2.firstEquatin.visible = false;
    this.secondEquatin3DModel.secondEquatin.visible = false;
    this.secondEquatin3DModel2.secondEquatin.visible = false;
    this.thirdEquatin3DModel.thirdEquatin.visible = true;
  }



  resetEquatin() {
    // 重置场景
    this.firstEquatin3DModel.reset();
    this.firstEquatin3DModel2.reset();
    this.secondEquatin3DModel.reset();
    this.secondEquatin3DModel2.reset();
    this.thirdEquatin3DModel.reset();
  }

  reset() {
    // 显示场景1
    this.firstEquatin3DModel.firstEquatin.visible = true;
    this.firstEquatin3DModel2.firstEquatin.visible = false;
    this.secondEquatin3DModel.secondEquatin.visible = false;
    this.secondEquatin3DModel2.secondEquatin.visible = false;
    this.thirdEquatin3DModel.thirdEquatin.visible = false;

    // 重置场景中内容
    this.resetEquatin();
  }
}

