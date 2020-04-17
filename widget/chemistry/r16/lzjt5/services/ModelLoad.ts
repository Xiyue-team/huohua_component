import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';
import { Scene, Material } from 'three';
import * as eyhg from '../sub_static/Model/index.bin';
import * as eyhg1 from '../sub_static/Model/index.gltf';

import * as eyhg2 from '../sub_static/Model/sub/index.bin';
import * as eyhg3 from '../sub_static/Model/sub/index.gltf';

import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
import {TweenMax} from 'gsap';
import * as console from 'console';


export class ModelLoad extends ThreeBase {
  
  //场景1
  obj1 = new THREE.Object3D();
  
  //场景2
  obj2 = new THREE.Object3D();
  animationScene1: any;
  animationScene2: any;

  modelAnimation: any;
  modelAnimation1: any;
  static preload() {
    const modelArray = [
      eyhg, eyhg1, eyhg2, eyhg3
    ];
    // console.log(modelArray.length);
  }

  constructor() {
    super();
  }

  //加载场景1模型
  async initScene1() {
    const model1: any = await this.gltfLoader(eyhg1 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
    this.obj1.rotateY(4);    
    this.opacity();    
  }

  //场景1透明度
  opacity() {
    const tween = {
      opacity: 1,
    };
    //小球变化
    this.animationScene1 = TweenMax.to(tween, 2, {
      opacity: 0.2,
      onUpdate: () => {
        for (let i = 0; i < 60; i++) {
          (this.obj1.children[0].children[0].children[0].children[1].children[i] as any).material.transparent = true;
          (this.obj1.children[0].children[0].children[0].children[1].children[i] as any).material.opacity = tween.opacity;
        }
      },
      paused: true
    });
  }

  //场景2透明度
  opacity1() {
    const tween = {
      opacity: 1,
      opacity1: 0,
      opacity2: 1,
    };
    //小球变化
    this.animationScene2 = TweenMax.to(tween, 2, {
      opacity: 0.2,
      opacity1: 1,
      opacity2: 1,
      onUpdate: () => {
        for (let i = 0; i < 12; i++) {
          (this.obj2.children[0].children[0].children[0].children[1].children[i] as any).material.transparent = true;
          (this.obj2.children[0].children[0].children[0].children[1].children[i] as any).material.opacity = tween.opacity1;
        }
        for (let i = 0; i < 68; i++) {
          (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.transparent = true;
          (this.obj2.children[0].children[0].children[0].children[2].children[i] as any).material.opacity = tween.opacity;
        }
        for (let i = 0; i < 12; i++) {
          (this.obj2.children[0].children[0].children[0].children[0].children[i] as any).material.transparent = true;
          (this.obj2.children[0].children[0].children[0].children[0].children[i] as any).material.opacity = tween.opacity2;
        }
      },
      paused: true
    });
  }


  //加载场景2模型
  async initScene2() {
    const model2: any = await this.gltfLoader(eyhg3 as any);
    model2.scene.traverse((child: any) => {
        if (child instanceof Scene) {
            this.obj2.add(child);
        }
    });
    this.obj2.scale.set(200, 200, 200);
    this.opacity1();
  }

  resetScene1Animation() {
    this.animationScene1.progress(0);
    this.animationScene1.pause();
}

resetScene2Animation() {
  this.animationScene2.progress(0);
  this.animationScene2.pause();
}
}
