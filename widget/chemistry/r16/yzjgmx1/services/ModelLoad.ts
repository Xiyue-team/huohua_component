import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';

import * as eyhg from '../sub_static/eryanghuagui.fbx';
import * as eyhg1 from '../sub_static/eryanghuagui1.fbx';
import * as lhn1 from '../sub_static/lvhuana1.fbx';
import * as lhn2 from '../sub_static/lvhuana2.fbx';
import * as lhs1 from '../sub_static/lvhuase1.fbx';
import * as lhs2 from '../sub_static/lvhuase2.fbx';
import * as  gb from '../sub_static/ganbing.fbx';


import {TweenMax} from 'gsap';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';
import { Object3D } from 'three';

export class ModelLoad extends ThreeBase {
  
  //场景1
  obj1 = new THREE.Object3D();
  
  //场景2
  obj2 = new THREE.Object3D();

  //场景1
  obj3 = new THREE.Object3D();

  //场景1
  obj4 = new THREE.Object3D();

  modelAnimation: any;
  modelAnimation1: any;
  static preload() {
    const modelArray = [
      eyhg, eyhg1, lhs1, lhs2, gb, lhn1, lhn2,
    ];
    console.log(modelArray.length);
  }

  constructor() {
    super();
  }

  //加载场景1模型
  async initScene1() {
    const model1: any = await this.fbxLoader(eyhg as any);
    this.obj1.add(model1);

    const model2: any = await this.fbxLoader(eyhg1 as any);
    this.obj1.add(model2);

    this.obj1.scale.set(2, 2, 2);
  }

  //加载场景2模型
  async initScene2() {
    const model1: any = await this.fbxLoader(lhn1 as any);
    this.obj2.add(model1);

    this.modelAnimation1 = new Model3dAnimation(model1);
    this.modelAnimation1.setLoopOne();
    this.modelAnimation1.setAnimationDoubleSpeed(1);
  }

  //场景2颜色变化
  changeOpacity() {
    const tween = {
      opacity: 0.5,
    };
    //外围小球变透明动画
    this.modelAnimation = TweenMax.to(tween, 2, {
      onStart: () => {
        this.obj2.visible = true;
      },
      onUpdate: () => {
        for (let i = 0; i < 14; i++) {
        (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.transparent = true;
        (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.opacity = tween.opacity;
        }
      },
      onComplete: () => {
            
      },
      paused: true
    });
  }
  changeOpacity1() {
    const tween = {
      opacity: 1,
    };
    //外围小球变透明动画
    this.modelAnimation = TweenMax.to(tween, 2, {
      onStart: () => {
        this.obj2.visible = true;
      },
      onUpdate: () => {
        for (let i = 0; i < 14; i++) {
        (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.transparent = true;
        (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.opacity = tween.opacity;
        }
      },
      onComplete: () => {
            
      },
      paused: true
    });
  }

  change(num: number) {
    if (num === 1) {
     this.changeOpacity();
     this.modelAnimation1.playModelAnimation(0);
     this.modelAnimation.play();
    } else {
     this.changeOpacity1();
     this.modelAnimation1.playModelAnimation(0);
     this.modelAnimation.play();
    }
  }

  //加载场景3模型
  async initScene3() {
    const model1: any = await this.fbxLoader(lhs1 as any);
    model1.position.set(10, 10, 0);
    this.obj3.add(model1);

    const model2: any = await this.fbxLoader(lhs2 as any);
    this.obj3.add(model2);

    this.obj3.scale.set(1.5, 1.5, 1.5);
  }

  //加载场景4模型
  async initScene4() {
    const model1: any = await this.fbxLoader(gb as any);
    this.obj4.add(model1);

    this.obj4.scale.set(1.5, 1.5, 1.5);
  }
}
