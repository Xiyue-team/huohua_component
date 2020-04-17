import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';

import * as image01 from '../sub_static/model/NH3.png';
import * as H1Fbx from '../sub_static/model/H1.fbx';
import * as H2Fbx from '../sub_static/model/H2.fbx';
import * as H3Fbx from '../sub_static/model/H3.fbx';
import * as NFbx from '../sub_static/model/N.fbx';
import * as NH3JFbx from '../sub_static/model/NH3J.fbx';
import * as NH3DFbx from '../sub_static/model/NH3D.fbx';

import * as H4Fbx from '../sub_static/model/H4.fbx';
import * as H5Fbx from '../sub_static/model/H5.fbx';
import * as OFbx from '../sub_static/model/O.fbx';
import * as H2OJFbx from '../sub_static/model/H2OJ.fbx';
import * as H2ODFbx from '../sub_static/model/H2OD.fbx';

import { ModelRotateHelper } from '../../../../../src/three/component/ModelRotateHelper';

import { TweenMax } from 'gsap';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class FbxModelLoad extends ThreeBase  {

  // NH3模型
  obj1 = new THREE.Group();

  // H2O模型
  obj2 = new THREE.Group();

  obj3 = new THREE.Group();

  // 模型动画
  modelH1Animation: any;
  modelH2Animation: any;
  modelH3Animation: any;
  modelH4Animation: any;
  modelH5Animation: any;

  // 添加氢的动画
  addHAnimation1: any;
  addHAnimation2: any;
  addHAnimation3: any;
  addHAnimation4: any;
  addHAnimation5: any;

  modelRotate1: any;
  modelRotate2: any;

  // 对比动画
  contrastAnimation: any;

  static preload() {
    const modelArray = [image01, H1Fbx, H2Fbx, H3Fbx, NFbx, H4Fbx, H5Fbx, OFbx, NH3JFbx, H2OJFbx, H2ODFbx, NH3DFbx];
    console.log(modelArray.length);
  }

  constructor() {
    super();
  }

  // 加载NH3模型
  async initNH3FbxLoader() {
    const modelH1: any = await this.fbxLoader(H1Fbx as any);
    modelH1.children[0].visible = false;
    this.obj1.add(modelH1);

    this.modelH1Animation = new Model3dAnimation(modelH1);
    this.modelH1Animation.setLoopOne();
    this.modelH1Animation.setAnimationDoubleSpeed(5);

    const modelH2: any = await this.fbxLoader(H2Fbx as any);
    modelH2.children[0].visible = false;
    this.obj1.add(modelH2);

    this.modelH2Animation = new Model3dAnimation(modelH2);
    this.modelH2Animation.setLoopOne();
    this.modelH2Animation.setAnimationDoubleSpeed(5);

    const modelH3: any = await this.fbxLoader(H3Fbx as any);
    modelH3.children[0].visible = false;
    this.obj1.add(modelH3);

    this.modelH3Animation = new Model3dAnimation(modelH3);
    this.modelH3Animation.setLoopOne();
    this.modelH3Animation.setAnimationDoubleSpeed(5);

    const modelN: any = await this.fbxLoader(NFbx as any);
    this.obj1.add(modelN);

    const modelNH3J: any = await this.fbxLoader(NH3JFbx as any);
    modelNH3J.visible = false;
    this.obj1.add(modelNH3J);

    const nH3JText = await ThreeUtil.createNewRomanText('107.3°', 0, -20, 0, '#000000', 0.1);
    modelNH3J.add(nH3JText);

    const modelNH3D: any = await this.fbxLoader(NH3DFbx as any);
    modelNH3D.visible = false;
    this.obj1.add(modelNH3D);

    const geometry1 = new THREE.SphereGeometry( 40, 32, 32 );
    const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0.0, wireframe: true, depthWrite: false} );
    const cube1 = new THREE.Mesh( geometry1, material1 );
    this.obj1.add(cube1);

    this.obj1.position.x = -50;
    this.modelRotate1 = new ModelRotateHelper(this.obj1);
    this.modelRotate1.initEvent();
  }

  // 加载H2O模型
  async initH2OFbxLoader() {

    const modelH4: any = await this.fbxLoader(H4Fbx as any);
    modelH4.visible = false;
    this.obj2.add(modelH4);

    this.modelH4Animation = new Model3dAnimation(modelH4);
    this.modelH4Animation.setLoopOne();
    this.modelH4Animation.setAnimationDoubleSpeed(5);

    const modelH5: any = await this.fbxLoader(H5Fbx as any);
    modelH5.visible = false;
    this.obj2.add(modelH5);

    this.modelH5Animation = new Model3dAnimation(modelH5);
    this.modelH5Animation.setLoopOne();
    this.modelH5Animation.setAnimationDoubleSpeed(5);

    const modelO: any = await this.fbxLoader(OFbx as any);
    this.obj2.add(modelO);

    const modelH2OJ: any = await this.fbxLoader(H2OJFbx as any);
    modelH2OJ.visible = false;
    this.obj2.add(modelH2OJ);

    const h2OJText = await ThreeUtil.createNewRomanText('104.5°', 0, -20, 0, '#000000', 0.1);
    modelH2OJ.add(h2OJText);

    const modelH2OD: any = await this.fbxLoader(H2ODFbx as any);
    modelH2OD.visible = false;
    this.obj2.add(modelH2OD);

    const geometry1 = new THREE.SphereGeometry( 40, 32, 32 );
    const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0.0, wireframe: true, depthWrite: false} );
    const cube1 = new THREE.Mesh( geometry1, material1 );
    cube1.visible = false;
    this.obj2.add(cube1);

    this.obj2.position.x = 50;

    this.modelRotate2 = new ModelRotateHelper(this.obj2);
    this.modelRotate2.initEvent();
    this.modelRotate2.enableRotate = false;
  }

  // 初始化模型动画
  initAddHAnimation() {
    this.addHAnimation1 = this.createAnimation(this.obj1.children[0].children[0], this.modelH1Animation, this.obj1, this.modelRotate1);
    this.addHAnimation2 = this.createAnimation(this.obj1.children[1].children[0], this.modelH2Animation, this.obj1, this.modelRotate1);
    this.addHAnimation3 = this.createAnimation(this.obj1.children[2].children[0], this.modelH3Animation, this.obj1, this.modelRotate1);
    this.addHAnimation4 = this.createAnimation(this.obj2.children[0], this.modelH4Animation, this.obj2, this.modelRotate2);
    this.addHAnimation5 = this.createAnimation(this.obj2.children[1], this.modelH5Animation, this.obj2, this.modelRotate2);
  }


  // 创建模型动画
  createAnimation (model: any, modelAnimation: Model3dAnimation, group: THREE.Group, modelRotate: ModelRotateHelper) {
    const tween = {
      opacity1: 0,
    };

    const animation = TweenMax.to(tween, 1, {
      opacity1: 1,
      onStart: () => {
        // 禁止旋转
        modelRotate.enableRotate = false;
        // 显示氢键1
        model.visible = true;
        // 可以设置透明度
        (model.children[0] as any).material.transparent = true;
        // 隐藏拖动区域 防止闪面
        group.children[group.children.length - 1].visible = false;

        // 执行模型动画
        modelAnimation.playModelAnimation();
      },
      onUpdate: () => {
        (model.children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        // 允许旋转
        modelRotate.enableRotate = true;
        // 禁止设置透明度
        (model.children[0] as any).material.transparent = false;

        // 显示可拖动区域
        group.children[group.children.length - 1].visible = true;
      },
      paused: true
    });

    return animation;
  }

  initContrastNH3AndH2O(orbit: any) {
    const tween = {
      h2Ox: 50,
      nH3x: -50,
      y: 0,
      z: 0,
    };

    this.contrastAnimation = TweenMax.to(tween, 1, {
      h2Ox: 0,
      nH3x: 0,
      y: 0,
      z: -40,
      onStart: () => {
        this.modelRotate1.enableRotate = false;
        this.modelRotate2.enableRotate = false;
        this.obj1.rotation.set(0, 0, 0);
        this.obj2.rotation.set(0, 0, 0);
      },
      onUpdate: () => {
        this.obj1.position.set(tween.nH3x, 0, 0);
        this.obj2.position.set(tween.h2Ox, tween.y, tween.z);
      },
      onComplete: () => {
        orbit.enableRotate = true;
      },
      paused: true
    });
  }


  reset() {
    // 重置动画
    this.addHAnimation1.progress(0);
    this.addHAnimation1.pause();

    this.addHAnimation2.progress(0);
    this.addHAnimation2.pause();

    this.addHAnimation3.progress(0);
    this.addHAnimation3.pause();

    this.addHAnimation4.progress(0);
    this.addHAnimation4.pause();

    this.addHAnimation5.progress(0);
    this.addHAnimation5.pause();

    // 重置模型动画
    this.modelH1Animation.resetModelAnimation();
    this.modelH2Animation.resetModelAnimation();
    this.modelH3Animation.resetModelAnimation();
    this.modelH4Animation.resetModelAnimation();
    this.modelH5Animation.resetModelAnimation();


    // 隐藏氢键
    this.obj1.children[0].children[0].visible = false;
    this.obj1.children[1].children[0].visible = false;
    this.obj1.children[2].children[0].visible = false;
    this.obj2.children[0].visible = false;
    this.obj2.children[1].visible = false;

    // 设置不可旋转
    this.modelRotate1.enableRotate = false;
    this.modelRotate2.enableRotate = false;
  }

}

