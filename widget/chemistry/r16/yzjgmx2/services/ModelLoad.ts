import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';
import * as yzjg1 from '../sub_static/Model/yzjg2_1.bin';
import * as yzjg2 from '../sub_static/Model/yzjg2_1.gltf';

import * as yzjg3 from '../sub_static/Model/yzjg2_2.bin';
import * as yzjg4 from '../sub_static/Model/yzjg2_2.gltf';

import * as yzjg5 from '../sub_static/Model/yzjg2_3.bin';
import * as yzjg6 from '../sub_static/Model/yzjg2_3.gltf';

import * as yzjg7 from '../sub_static/Model/yzjg2_4.bin';
import * as yzjg8 from '../sub_static/Model/yzjg2_4.gltf';

import {TweenMax} from 'gsap';
import { Scene, Material, DoubleSide } from 'three';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import { Object3D } from 'three';
import { clearTimeout } from 'timers';

export class ModelLoad extends ThreeBase {
  
  //场景1
  obj1 = new THREE.Object3D();
  
  //场景2
  obj2 = new THREE.Object3D();

  //场景3
  obj3 = new THREE.Object3D();

  //场景4
  obj4 = new THREE.Object3D();

  obj5 = new THREE.Object3D();
  private groupHArry: any = [];
  public groupHModel: any = new THREE.Group();
  public groupMesh: any = new THREE.Group();

  private ST: any = 0;
  private SA: any = 0;
  private clickNum: any = 0;
  private num: any = 0;
  private tabF: any = true;

  public animation1: any;
  public animation2: any;
  
  static preload() {
    const modelArray = [
      yzjg1, yzjg2, yzjg3, yzjg4, yzjg5, yzjg6, yzjg7, yzjg8
    ];
    console.log(modelArray.length);
  }

  constructor() {
    super();
  }

  //加载场景1模型
  async initScene1() {
    const model1: any = await this.gltfLoader(yzjg2 as any);
    model1.scene.traverse((child: any) => {
        if (child instanceof Scene) {
            this.obj1.add(child);
        }
    });
  }

  //加载场景2模型
  async initScene2() {
    const model2: any = await this.gltfLoader(yzjg4 as any);
    model2.scene.traverse((child: any) => {
        if (child instanceof Scene) {
            this.obj2.add(child);
        }
    });
  }
  
  //加载场景3模型
  async initScene3() {
    const model3: any = await this.gltfLoader(yzjg6 as any);
    model3.scene.traverse((child: any) => {
        if (child instanceof Scene) {
            this.obj3.add(child);
        }
    });
    console.log('model3', model3);
    this.animation1 = new ModelAnimationGroup(model3);
    this.animation1.setLoopOne(0);
    this.animation1.setAnimationDoubleSpeed(0, 0.5);
  }

  //加载场景4模型
  async initScene4() {
    const model4: any = await this.gltfLoader(yzjg8 as any);
    model4.scene.traverse((child: any) => {
        if (child instanceof Scene) {
            this.obj4.add(child);
            (this.obj4 as any).children[0].children[0].children[1].material.opacity = 0.1;

        }
    });

    this.animation2 = new ModelAnimationGroup(model4);
    this.animation2.setLoopOne(0);
    this.animation2.setAnimationDoubleSpeed(0, 0.5);
  }

  //加载场景5模型
  async initScene5() {
      const model5: any = await this.gltfLoader(yzjg2 as any);
      model5.scene.traverse((child: any) => {
          if (child instanceof Scene) {
              this.obj5.add(child);
          }
      });
  }

}
