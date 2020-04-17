import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';
import { TweenMax } from 'gsap';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';
import { SpriteText2D } from 'three-text2d';

import * as image01 from '../sub_static/model/hui.png';
import * as image02 from '../sub_static/model/1-6.png';
import * as image03 from '../sub_static/model/1-12.png';
import * as image04 from '../sub_static/model/BaseColor.png';
import * as image05 from '../sub_static/model/C.jpg';

import * as mianxin1_1 from '../sub_static/model/liufang1_1.fbx';
import * as mianxin1_2 from '../sub_static/model/liufang1_2.fbx';
import * as mianxin1_3 from '../sub_static/model/liufang1_3.fbx';

import * as mianxin2_1 from '../sub_static/model/liufang2_1.fbx';
import * as mianxin3_1 from '../sub_static/model/liufang3_1.fbx';
import * as mianxin4_1 from '../sub_static/model/liufang4_1.fbx';
import * as mianxin4_2 from '../sub_static/model/liufang4_2.fbx';
import * as mianxin4_3 from '../sub_static/model/liufang4_3.fbx';

import * as mianxin5_1 from '../sub_static/model/liufang5_2.fbx';
import * as mianxin5_2 from '../sub_static/model/liufang5_1.fbx';

import * as mianxin6_1 from '../sub_static/model/liufang6_2.fbx';
import * as mianxin6_2 from '../sub_static/model/liufang6_1.fbx';

import * as mianxin7_1 from '../sub_static/model/liufang7_2.fbx';
import * as mianxin7_2 from '../sub_static/model/liufang7_1.fbx';

import * as xianFbx from '../sub_static/model/liufang7_3.fbx';
import * as liufang6_3Xian from '../sub_static/model/liufang6_3.fbx';


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
  // 场景6
  obj6 = new THREE.Object3D();
  // 场景7
  obj7 = new THREE.Object3D();


  // 模型动画
  model2_1Animation1: any;
  model3_1Animation1: any;
  model4_1Animation1: any;
  model4_2Animation1: any;
  model5_1Animation1: any;
  model6_1Animation1: any;
  model7_1Animation1: any;

  // 场景动画
  animationScene2: any;
  animationScene3: any;
  animationScene4: any;
  animationScene4_2: any;
  animationScene5: any;
  animationScene6: any;
  animationScene6_2: any;
  // 辅助线动画
  animationScene6_3: any;
  animationScene7: any;

  // 辅助线动画
  animationScene7_2: any;



  // 判断动画是否执行结束
  animationScene2End = true;
  animationScene3End = true;
  animationScene4End = true;
  animationScene5End = true;
  animationScene6End = true;
  animationScene7End = true;


  static preload() {
    const modelArray = [
      mianxin1_1, image01, image02, image03, mianxin2_1, image04, image05,
      mianxin3_1, mianxin4_1, mianxin4_2, mianxin4_3, mianxin5_1,
      mianxin5_2, mianxin6_1, mianxin6_2, liufang6_3Xian, mianxin7_1, mianxin7_2,
      xianFbx
    ];
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
    this.obj2.visible = false;
    this.obj3.visible = false;
    this.obj4.visible = false;
    this.obj5.visible = false;
    this.obj6.visible = false;
    this.obj7.visible = false;
  }

  // 加载场景1模型
  async initSceneModel1() {
    const model1_1: any = await this.fbxLoader(mianxin1_1 as any);
    this.obj1.add(model1_1);

    const model1_2: any = await this.fbxLoader(mianxin1_2 as any);
    model1_2.visible = false;
    this.obj1.add(model1_2);

    const model1_3: any = await this.fbxLoader(mianxin1_3 as any);
    this.obj1.add(model1_3);

    model1_1.position.y = -40;
    model1_2.position.y = -40;
    model1_3.position.y = -40;
  }

  // 加载场景2模型
  async initSceneModel2() {
    const model2_1: any = await this.fbxLoader(mianxin2_1 as any);
    this.obj2.add(model2_1);

    this.model2_1Animation1 = new Model3dAnimation(model2_1);
    this.model2_1Animation1.setLoopOne();
    this.model2_1Animation1.setAnimationDoubleSpeed(1);

    model2_1.position.y = -40;

    this.scene2Animation();
  }

  // 加载场景3模型
  async initSceneModel3() {
    const model3_1: any = await this.fbxLoader(mianxin3_1 as any);
    this.obj3.add(model3_1);

    this.model3_1Animation1 = new Model3dAnimation(model3_1);
    this.model3_1Animation1.setLoopOne();
    this.model3_1Animation1.setAnimationDoubleSpeed(1);

    model3_1.position.y = -40;

    this.scene3Animation();
  }

  // 加载场景4模型
  async initSceneModel4() {
    const model4_1: any = await this.fbxLoader(mianxin4_1 as any);
    this.obj4.add(model4_1);
    this.model4_1Animation1 = new Model3dAnimation(model4_1);
    this.model4_1Animation1.setLoopOne();
    this.model4_1Animation1.setAnimationDoubleSpeed(1);

    const model4_2: any = await this.fbxLoader(mianxin4_2 as any);
    model4_2.visible = false;
    this.obj4.add(model4_2);


    const model4_3: any = await this.fbxLoader(mianxin4_3 as any);
    model4_3.visible = false;
    this.obj4.add(model4_3);

    this.model4_2Animation1 = new Model3dAnimation(model4_3);
    this.model4_2Animation1.setLoopOne();
    this.model4_2Animation1.setAnimationDoubleSpeed(1);

    model4_1.position.y = -40;
    model4_2.position.y = -40;
    model4_3.position.y = -40;

    this.scene4Animation();
  }

  // 加载场景5模型
  async initSceneModel5() {
    const model5_1: any = await this.fbxLoader(mianxin5_1 as any);
    this.obj5.add(model5_1);

    this.model5_1Animation1 = new Model3dAnimation(model5_1);
    this.model5_1Animation1.setLoopOne();
    this.model5_1Animation1.setAnimationDoubleSpeed(1);

    const model5_2: any = await this.fbxLoader(mianxin5_2 as any);
    this.obj5.add(model5_2);

    model5_1.position.y = -40;
    model5_2.position.y = -40;

    this.scene5Animation();
  }

  // 加载场景6模型
  async initSceneModel6() {
    const model6_1: any = await this.fbxLoader(mianxin6_1 as any);
    this.obj6.add(model6_1);

    this.model6_1Animation1 = new Model3dAnimation(model6_1);
    this.model6_1Animation1.setLoopOne();
    this.model6_1Animation1.setAnimationDoubleSpeed(1);

    const model6_2: any = await this.fbxLoader(mianxin6_2 as any);
    this.obj6.add(model6_2);

    const model6_3: any = await this.fbxLoader(liufang6_3Xian as any);
    model6_3.visible = false;
    this.obj6.add(model6_3);

    model6_1.position.y = -40;
    model6_2.position.y = -40;
    model6_3.position.y = -40;

    const h2Text = await ModelLoad.createText('h', 13, 20, 40, '#000000');
    model6_3.add(h2Text);

    this.scene6Animation();
  }

  // 加载场景7模型
  async initSceneModel7() {
    const model7_0: any = await this.fbxLoader(xianFbx as any);
    model7_0.visible = false;
    this.obj7.add(model7_0);

    const model7_1: any = await this.fbxLoader(mianxin7_1 as any);
    this.obj7.add(model7_1);

    this.model7_1Animation1 = new Model3dAnimation(model7_1);
    this.model7_1Animation1.setLoopOne();
    this.model7_1Animation1.setAnimationDoubleSpeed(1);

    const model7_2: any = await this.fbxLoader(mianxin7_2 as any);
    this.obj7.add(model7_2);
    this.scene7Animation();

    model7_0.position.y = -40;
    model7_1.position.y = -40;
    model7_2.position.y = -40;

    this.addText();
  }

  // 添加文字
  addText() {
    const hText = ModelLoad.createText('h', 0, -20, 0, '#000000');
    this.obj7.add(hText);
    hText.visible = false;
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
        this.model2_1Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj2.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene2End = false;
      },
      paused: true
    });
  }

  // 重置场景2动画
  resetAnimation2() {
    this.animationScene2.progress(0);
    this.animationScene2.pause();

    // 重置模型动画
    this.model2_1Animation1.resetModelAnimation();
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
        // 显示场景2
        this.obj3.visible = true;
        this.model3_1Animation1.playModelAnimation();
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

  // 重置场景3动画
  resetAnimation3() {
    this.animationScene3.progress(0);
    this.animationScene3.pause();

    // 重置模型动画
    this.model3_1Animation1.resetModelAnimation();
  }

  // 场景4动画
  scene4Animation() {
    const tween = {
      opacity1: 0,
    };

    (this.obj4.children[0].children[0] as any).material.transparent = true;
    this.animationScene4 = TweenMax.to(tween, 1, {
      opacity1: 1,
      onStart: () => {
        // 显示场景2
        this.obj4.visible = true;
        this.model4_1Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj4.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene4End = false;
      },
      paused: true
    });

    const tween2 = {
      opacity1: 1,
    };

    (this.obj4.children[2].children[0] as any).material.transparent = true;
    this.animationScene4_2 = TweenMax.to(tween2, 1, {
      opacity1: 0,
      onStart: () => {
        this.obj4.children[1].visible = true;
        this.obj4.children[2].visible = true;
        this.model4_2Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj4.children[2].children[0] as any).material.opacity = tween2.opacity1;
      },
      onComplete: () => {

      },
      paused: true
    });

  }

  // 重置场景4动画
  resetAnimation4() {
    this.animationScene4.progress(0);
    this.animationScene4.pause();

    this.scene4coordinationNumber2();

    // 重置模型动画
    this.model4_1Animation1.resetModelAnimation();
  }

  // 场景4配位数按钮点击
  scene4coordinationNumber1() {
    this.obj1.visible = false;
    this.obj2.visible = false;
    this.obj3.visible = false;
    this.obj4.children[0].visible = false;
    this.animationScene4_2.play();

  }

  // 场景4配位数按钮再次被点击
  scene4coordinationNumber2() {
    this.animationScene4_2.progress(0);
    this.animationScene4_2.pause();

    // 重置模型动画
    this.model4_2Animation1.resetModelAnimation();

    this.obj1.visible = true;
    this.obj2.visible = true;
    this.obj3.visible = true;
    this.obj4.children[0].visible = true;

    this.obj4.children[1].visible = false;
    this.obj4.children[2].visible = false;
  }

  // 场景5动画
  scene5Animation() {
    const tween = {
      opacity1: 1,
    };

    (this.obj5.children[0].children[0] as any).material.transparent = true;

    this.animationScene5 = TweenMax.to(tween, 1, {
      opacity1: 0,
      onStart: () => {
        this.scene4coordinationNumber2();
        // 显示场景5
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = true;
        this.model5_1Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj5.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene5End = false;
      },
      paused: true
    });
  }

  resetAnimation5() {
    this.animationScene5.progress(0);
    this.animationScene5.pause();

    // 重置模型动画
    this.model5_1Animation1.resetModelAnimation();
  }

  // 场景6动画
  scene6Animation() {
    const tween = {
      opacity1: 1,
    };

    (this.obj6.children[0].children[0] as any).material.transparent = true;

    this.animationScene6 = TweenMax.to(tween, 1, {
      opacity1: 0,
      onStart: () => {
        // 显示场景2
        this.obj5.visible = false;
        this.obj6.visible = true;
        this.model6_1Animation1.playModelAnimation();
        this.animationScene6_2.play();
      },
      onUpdate: () => {
        (this.obj6.children[0].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene6End = false;
      },
      paused: true
    });

    const tween2 = {
      x2: 0,
      z2: 0,
    };
    // 外围小球变透明动画
    this.animationScene6_2 = TweenMax.to(tween2, 1, {
      x2: -13,
      z2: -40,
      onUpdate: () => {
        (this.obj6.children[1]).position.x = tween2.x2;
        (this.obj6.children[1]).position.z = tween2.z2;
        (this.obj6.children[2]).position.x = tween2.x2;
        (this.obj6.children[2]).position.z = tween2.z2;

        // 移动第七场景模型
        (this.obj7.children[1]).position.x = tween2.x2;
        (this.obj7.children[1]).position.z = tween2.z2;
        (this.obj7.children[2]).position.x = tween2.x2;
        (this.obj7.children[2]).position.z = tween2.z2;
        (this.obj7.children[0]).position.x = tween2.x2;
        (this.obj7.children[0]).position.z = tween2.z2;
      },
      paused: true
    });


    // 辅助线动画
    const tween3 = {
      opacity1: 1,
    };
    (this.obj6.children[1].children[0] as any).material.transparent = true;
    this.animationScene6_3 = TweenMax.to(tween3, 1, {
      opacity1: 0.5,
      onUpdate: () => {
        (this.obj6.children[1].children[0] as any).material.opacity = tween3.opacity1;
      },
      onComplete: () => {
        this.obj6.children[2].visible = true;
      },
      paused: true
    });
  }

  // 重置场景6动画
  resetAnimation6() {
    this.animationScene6.progress(0);
    this.animationScene6.pause();

    this.animationScene6_2.progress(0);
    this.animationScene6_2.pause();

    // 重置模型动画
    this.model6_1Animation1.resetModelAnimation();
  }

  // 场景7动画
  scene7Animation() {
    const tween = {
      opacity1: 1,
    };

    (this.obj7.children[1].children[0] as any).material.transparent = true;

    this.animationScene7 = TweenMax.to(tween, 1, {
      opacity1: 0,
      onStart: () => {
        // 显示场景2
        this.obj6.visible = false;
        this.obj7.visible = true;
        this.model7_1Animation1.playModelAnimation();
      },
      onUpdate: () => {
        (this.obj7.children[1].children[0] as any).material.opacity = tween.opacity1;
      },
      onComplete: () => {
        this.animationScene7End = false;
      },
      paused: true
    });

    // 辅助线动画
    const tween2 = {
      opacity1: 1,
    };
    (this.obj7.children[2].children[0] as any).material.transparent = true;
    this.animationScene7_2 = TweenMax.to(tween2, 1, {
      opacity1: 0.5,
      onUpdate: () => {
        (this.obj7.children[2].children[0] as any).material.opacity = tween2.opacity1;
      },
      onComplete: () => {
        this.obj7.children[0].visible = true;
        this.obj7.children[3].visible = true;
      },
      paused: true
    });
  }

  // 重置场景7动画
  resetAnimation7() {
    this.animationScene7.progress(0);
    this.animationScene7.pause();


    // 重置模型动画
    this.model7_1Animation1.resetModelAnimation();
  }

  // 辅助线按钮被点击
  scene6AuxiliaryLine1() {
    this.animationScene6_3.play();
  }

  // 辅助线重置
  scene6AuxiliaryLine2() {
    this.animationScene6_3.progress(0);
    this.animationScene6_3.pause();
    this.obj6.children[2].visible = false;
  }

  // 辅助线按钮被点击
  scene7AuxiliaryLine1() {
    this.animationScene7_2.play();
  }

  // 辅助线重置
  scene7AuxiliaryLine2() {
    this.animationScene7_2.progress(0);
    this.animationScene7_2.pause();
    this.obj7.children[0].visible = false;
    this.obj7.children[3].visible = false;
  }

  // 重置
  reset() {
    // 重置动画
    this.scene1CoordinationNumber2();
    this.resetAnimation2();
    this.resetAnimation3();
    this.resetAnimation4();
    this.scene4coordinationNumber2();
    this.resetAnimation5();
    this.resetAnimation6();
    this.resetAnimation7();
    this.scene6AuxiliaryLine2();
    this.scene7AuxiliaryLine2();

    this.animationScene2End = true;
    this.animationScene3End = true;
    this.animationScene4End = true;
    this.animationScene5End = true;
    this.animationScene6End = true;
    this.animationScene7End = true;

    // 显示场景1
    this.obj1.visible = true;
    this.obj2.visible = false;
    this.obj3.visible = false;
    this.obj4.visible = false;
    this.obj5.visible = false;
    this.obj6.visible = false;
    this.obj7.visible = false;
  }
}

