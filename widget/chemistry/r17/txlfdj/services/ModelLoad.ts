import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';


import * as image01 from '../sub_static/model/basecolor.png';
import * as image02 from '../sub_static/model/1234.png';
import * as image03 from '../sub_static/model/1-8.png';
import * as image04 from '../sub_static/model/tixin1_2.png';

import * as tixin0 from '../sub_static/model/tixin1_3.fbx';
import * as tixin1_1 from '../sub_static/model/tixin0_1.fbx';
import * as tixin1_2 from '../sub_static/model/tixin0_2.fbx';
import * as tixin2 from '../sub_static/model/tixin0_3.fbx';
import * as tixin3 from '../sub_static/model/tixin3.fbx';
import * as tixin4 from '../sub_static/model/tixin4.fbx';
import * as tixin5_1 from '../sub_static/model/tixin5_1.fbx';
import * as tixin5_2 from '../sub_static/model/tixin5_2.fbx';
import * as tixin6 from '../sub_static/model/tixin6.fbx';
import * as tixin7 from '../sub_static/model/tixin7.fbx';
import * as tixin8 from '../sub_static/model/tixin8.fbx';

import * as xianFbx from '../sub_static/model/xian.fbx';


import { TweenMax } from 'gsap';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';
import { SpriteText2D } from 'three-text2d';

export class ModelLoad extends ThreeBase {


  // 场景1
  obj1 = new THREE.Object3D();

  // 场景2
  obj2 = new THREE.Object3D();

  // 场景3
  obj3 = new THREE.Object3D();

  // 场景4
  obj4 = new THREE.Object3D();

  // 场景5
  obj5 = new THREE.Object3D();

  // 场景动画
  animationScene2: any;
  animationScene3: any;
  animationScene4: any;
  animationScene4_2: any;
  animationScene5: any;

  // 判断动画是否执行结束
  animationScene2End = true;
  animationScene3End = true;
  animationScene4End = true;
  animationScene5End = true;

  // 模型动画
  model3Animation1: any;
  model4Animation1: any;
  model6Animation1: any;
  model8Animation1: any;

  // 辅助线动画
  auxiliaryLineAnimation: any;

  static preload() {
    const modelArray = [image01, image02, image03, image04, tixin1_1, tixin1_2,
      tixin2, tixin3, tixin4, tixin5_1, tixin5_2, tixin6, tixin7, tixin8, tixin0,
      xianFbx];
    console.log(modelArray.length);
  }

  // 画斜体字
  static createText(texts: any , x: number, y: number, z: number, color: any): SpriteText2D {
    const textStyle = {font: 'italic 96px "Times New Roman"' , fillStyle: color, antialias: false};
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(0.05, 0.05, 0.05);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  constructor() {
    super();
  }

  // 加载模型
  async initGltfLoader()  {

    const model1_1: any = await this.fbxLoader(tixin1_1 as any);
    this.obj1.add(model1_1);

    const model1_2: any = await this.fbxLoader(tixin1_2 as any);
    model1_2.visible = false;
    this.obj1.add(model1_2);

    const model2: any = await this.fbxLoader(tixin2 as any);
    this.obj1.add(model2);

    const model3: any = await this.fbxLoader(tixin3 as any);
    this.obj2.add(model3);

    this.model3Animation1 = new Model3dAnimation(model3);
    this.model3Animation1.setLoopOne();
    this.model3Animation1.setAnimationDoubleSpeed(1);

    const model3_2: any = await this.fbxLoader(tixin0 as any);
    model3_2.visible = false;
    this.obj2.add(model3_2);

    const model4: any = await this.fbxLoader(tixin4 as any);
    this.obj3.add(model4);

    this.model4Animation1 = new Model3dAnimation(model4);
    this.model4Animation1.setLoopOne();
    this.model4Animation1.setAnimationDoubleSpeed(1);

    const model5_1: any = await this.fbxLoader(tixin5_1 as any);
    this.obj4.add(model5_1);

    const model5_2: any = await this.fbxLoader(tixin5_2 as any);
    model5_2.visible = false;
    this.obj4.add(model5_2);

    const model6: any = await this.fbxLoader(tixin6 as any);
    this.obj4.add(model6);
    this.model6Animation1 = new Model3dAnimation(model6);
    this.model6Animation1.setLoopOne();
    this.model6Animation1.setAnimationDoubleSpeed(1);

    const xian: any = await this.fbxLoader(xianFbx as any);
    xian.visible = false;
    this.obj5.add(xian);

    const model7: any = await this.fbxLoader(tixin7 as any);
    this.obj5.add(model7);

    const model8: any = await this.fbxLoader(tixin8 as any);
    this.obj5.add(model8);
    this.model8Animation1 = new Model3dAnimation(model8);
    this.model8Animation1.setLoopOne();
    this.model8Animation1.setAnimationDoubleSpeed(1);

    const rText = ModelLoad.createText('r', 13, 5, 23.5, '#000000');

    const aText = ModelLoad.createText('a', 26, 23 , -23, '#000000');
    const bText = ModelLoad.createText('b', -5, 20 , 0, '#000000');
    const cText = ModelLoad.createText('c', -5, 5 , 0, '#000000');
    aText.visible = false;
    bText.visible = false;
    cText.visible = false;
    rText.visible = false;

    this.obj5.add(rText);
    this.obj5.add(aText);
    this.obj5.add(bText);
    this.obj5.add(cText);

    this.scene2Animation();
    this.scene3Animation();
    this.scene4Animation();
    this.scene5Animation();

    (this.obj5.children[1].children[0] as any).material.transparent = true;
  }

  // 场景1配位数点击动画
  scene1CoordinationNumber1() {
    this.obj1.children[0].visible = false;
    this.obj1.children[1].visible = true;
    this.obj1.children[2].visible = false;
  }

  // 场景1配位数点击还原动画
  scene1CoordinationNumber2() {
    this.obj1.children[0].visible = true;
    this.obj1.children[1].visible = false;
    this.obj1.children[2].visible = true;
  }

  // 场景2动画
  scene2Animation() {
    const tween = {
      opacity1: 0,
    };

    (this.obj2.children[0].children[0] as any).material.transparent = true;

    this.animationScene2 = TweenMax.to(tween, 1, {
      opacity1: 1,
      onStart: () => {
        // 显示场景2
        this.scene1CoordinationNumber2();
        this.obj2.visible = true;
        this.obj2.children[1].visible = false;
        this.model3Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj2.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene2End = false;

        this.obj1.visible = false;
        this.obj2.children[1].visible = true;
      },
      paused: true
    });
  }

  // 场景3动画
  scene3Animation() {
    const tween = {
      opacity1: 0,
    };

    (this.obj3.children[0].children[0] as any).material.transparent = true;

    this.animationScene3 = TweenMax.to(tween, 1, {
      opacity1: 1,
      onStart: () => {
        // 显示场景3
        this.obj1.visible = false;
        this.obj2.visible = true;
        this.obj3.visible = true;
        this.obj4.visible = false;
        this.obj2.children[1].visible = true;
        this.model4Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj3.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene3End = false;
      },
      paused: true
    });
  }

  // 场景4动画
  scene4Animation() {
    const tween = {
      opacity1: 1,
    };

    (this.obj4.children[2].children[0] as any).material.transparent = true;

    this.animationScene4 = TweenMax.to(tween, 1, {
      opacity1: 0,
      onStart: () => {
        // 显示场景4
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = true;
        this.obj5.visible = false;
        this.model6Animation1.playModelAnimation();

        // 重置移动动画
        this.animationScene4_2.progress(0);
        this.animationScene4_2.pause();
      },
      onUpdate: () => {
        (this.obj4.children[2].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene4_2.play();
        this.animationScene4End = false;

      },
      paused: true
    });


    const tween2 = {
      x: 0,
      y: 0,
      z: 0,
    };

    // 移动模型到中心
    this.animationScene4_2 = TweenMax.to(tween2, 1, {
      x: 22,
      y: 0,
      z: -45,
      onUpdate: () => {
        (this.obj4.children[0].children[0] as any).position.x = tween2.x;
        (this.obj4.children[0].children[0] as any).position.z = tween2.z;

        (this.obj4.children[1].children[0] as any).position.x = tween2.x;
        (this.obj4.children[1].children[0] as any).position.z = tween2.z;

        (this.obj5.children[0].children[0] as any).position.x = tween2.x;
        (this.obj5.children[0].children[0] as any).position.z = tween2.z;

        (this.obj5.children[1].children[0] as any).position.x = tween2.x;
        (this.obj5.children[1].children[0] as any).position.z = tween2.z;

        (this.obj5.children[2] as any).position.x = tween2.x;
        (this.obj5.children[2] as any).position.z = tween2.z;
      },
      paused: true
    });

  }

  // 场景5动画
  scene5Animation() {
    const tween = {
      opacity1: 1,
    };

    (this.obj5.children[2].children[0] as any).material.transparent = true;

    this.animationScene5 = TweenMax.to(tween, 1, {
      opacity1: 0,
      onStart: () => {
        // 显示场景5
        this.scene4CoordinationNumber2();
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = true;
        this.model8Animation1.playModelAnimation();

        // 重置辅助线
        this.auxiliaryLine2();
      },
      onUpdate: () => {
        (this.obj5.children[2].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene5End = false;
      },
      paused: true
    });

    // 辅助线动画
    const tween2 = {
      opacity1: 1,
    };

    this.auxiliaryLineAnimation = TweenMax.to(tween2, 1, {
      opacity1: 0.5,
      onStart: () => {

      },
      onUpdate: () => {
        (this.obj5.children[1].children[0] as any).material.opacity = tween2.opacity1;
      },
      onComplete: () => {
        (this.obj5.children[0]).visible = true;
        (this.obj5.children[3]).visible = true;
        (this.obj5.children[4]).visible = true;
        (this.obj5.children[5]).visible = true;
        (this.obj5.children[6]).visible = true;
      },
      paused: true
    });
  }

  // 场景4配位数点击动画
  scene4CoordinationNumber1() {
    this.obj4.children[0].visible = false;
    this.obj4.children[1].visible = true;
    this.obj4.children[2].visible = false;
  }

  // 场景4配位数点击还原动画
  scene4CoordinationNumber2() {
    this.obj4.children[0].visible = true;
    this.obj4.children[1].visible = false;
    this.obj4.children[2].visible = true;
  }

  // 重置场景2动画
  resetAnimation2() {
    this.animationScene2.progress(0);
    this.animationScene2.pause();

    // 重置模型动画
    this.model3Animation1.resetModelAnimation();
  }

  // 重置场景3动画
  resetAnimation3() {
    this.animationScene3.progress(0);
    this.animationScene3.pause();

    this.model4Animation1.resetModelAnimation();
  }

  // 重置场景4动画
  resetAnimation4() {
    this.animationScene4.progress(0);
    this.animationScene4.pause();

    this.model6Animation1.resetModelAnimation();
  }

  // 重置场景5动画
  resetAnimation5() {
    this.animationScene5.progress(0);
    this.animationScene5.pause();

    this.model8Animation1.resetModelAnimation();
  }

  // 辅助线按钮点击
  auxiliaryLine() {
    this.auxiliaryLineAnimation.play();
  }

  // 辅助线按钮再次点击
  auxiliaryLine2() {
    (this.obj5.children[0]).visible = false;
    (this.obj5.children[3]).visible = false;
    (this.obj5.children[4]).visible = false;
    (this.obj5.children[5]).visible = false;
    (this.obj5.children[6]).visible = false;

    this.auxiliaryLineAnimation.progress(0);
    this.auxiliaryLineAnimation.pause();
  }


  // 重置
  reset() {
    this.obj1.visible = true;
    this.obj2.visible = false;
    this.obj3.visible = false;
    this.obj4.visible = false;
    this.obj5.visible = false;

    this.scene1CoordinationNumber2();
    this.scene4CoordinationNumber2();
    this.resetAnimation2();
    this.resetAnimation3();
    this.resetAnimation4();
    this.resetAnimation5();
    this.auxiliaryLine2();


    this.animationScene2End = true;
    this.animationScene3End = true;
    this.animationScene4End = true;
    this.animationScene5End = true;
  }
}

