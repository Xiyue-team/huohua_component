import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';

//石墨1
import * as shimo1 from '../sub_static/Model/shimo1/index.bin';
import * as shimo2 from '../sub_static/Model/shimo1/index.gltf';

//石墨2
import * as shimo3 from '../sub_static/Model/shimo2/index.bin';
import * as shimo4 from '../sub_static/Model/shimo2/index.gltf';

//石墨爆炸
import * as shimobz1 from '../sub_static/Model/shimobz/index.bin';
import * as shimobz2 from '../sub_static/Model/shimobz/index.gltf';

//金刚石
import * as jgs1 from '../sub_static/Model/jgs/index.bin';
import * as jgs2 from '../sub_static/Model/jgs/index.gltf';

//范德华
import * as fdh1 from '../sub_static/Model/fdhsm/sm4_1.bin';
import * as fdh2 from '../sub_static/Model/fdhsm/sm4_1.gltf';
import * as fdh3 from '../sub_static/Model/fdhsm/xmx/sm1_1.bin';
import * as fdh4 from '../sub_static/Model/fdhsm/xmx/sm1_1.gltf';
import * as fdh5 from '../sub_static/Model/fdhsm/xmx/sm2_1.bin';
import * as fdh6 from '../sub_static/Model/fdhsm/xmx/sm2_1.gltf';
import * as fdh7 from '../sub_static/Model/fdhsm/xmx/sm3/sm3_1.bin';
import * as fdh8 from '../sub_static/Model/fdhsm/xmx/sm3/sm3_1.gltf';

import * as one from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC0358_baseColor.png';
import * as one1 from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC0358_emissive.jpg';
import * as one2 from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC03510_baseColor.png';
import * as one3 from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC03510_emissive.jpg';
import * as one4 from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC03513_baseColor.png';
import * as one5 from '../sub_static/Model/fdhsm/xmx/MaterialFBXASC032FBXASC03513_emissive.jpg';

import * as two from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC0358_baseColor.png';
import * as two1 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC0358_emissive.jpg';
import * as two2 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03510_baseColor.png';
import * as two3 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03510_emissive.jpg';
import * as two4 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03512_baseColor.png';
import * as two5 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03512_emissive.jpg';
import * as two6 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03513_baseColor.png';
import * as two7 from '../sub_static/Model/fdhsm/xmx/sm3/MaterialFBXASC032FBXASC03513_emissive.jpg';

import * as titu from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC0358_baseColor.png';
import * as titu1 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC0358_emissive.jpg';
import * as titu2 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03510_baseColor.png';
import * as titu3 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03510_emissive.jpg';
import * as titu4 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03511_baseColor.png';
import * as titu5 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03511_emissive.jpg';
import * as titu6 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03512_baseColor.png';
import * as titu7 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03512_emissive.jpg';
import * as titu8 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03513_baseColor.png';
import * as titu9 from '../sub_static/Model/fdhsm/MaterialFBXASC032FBXASC03513_emissive.jpg';

import {TweenMax} from 'gsap';
import { Scene, Material } from 'three';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import { Object3D } from 'three';
import * as console from 'console';

export class ModelLoad extends ThreeBase {

    //场景1
    obj1 = new THREE.Object3D();

    //场景2
    obj2 = new THREE.Object3D();

    //场景1
    obj3 = new THREE.Object3D();

    // 场景1动画
    animationScene1: any;

    modelAnimation: any;
    static preload() {
        const modelArray = [
            shimo1, shimo2, shimo3, shimo4, shimobz1, shimobz2,
            jgs1, jgs2, fdh1, fdh2, titu, titu1, titu2, titu3, titu4, titu5, titu6,
            fdh3, fdh4, titu7, titu8, titu9, fdh5, fdh6, one,  one1, one2, one3,
            one4, one5, fdh7, fdh8, two, two1, two2, two3, two4, two5, two6, two7,
        ];
        // console.log(modelArray.length);
    }

    constructor() {
        super();
    }

    //加载场景1模型
    async initScene1() {
        const model1: any = await this.gltfLoader(shimo2 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        const model2: any = await this.gltfLoader(shimo4 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        const model3: any = await this.gltfLoader(shimobz2 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });
        this.modelAnimation = new ModelAnimationGroup(model3);
        this.modelAnimation.setLoopOne(0);
        this.modelAnimation.setAnimationDoubleSpeed(0, 0.5);

        this.obj1.scale.set(100, 100, 100);
    }

    //场景一动画
    scene1Animation() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };
        //外围小球变透明动画
        this.animationScene1 = TweenMax.to(tween, 2, {
            opacity1: 1,
            opacity2: 0,
            onStart: () => {
                this.obj1.visible = true;
            },
            onUpdate: () => {
                (this.obj1.children[2].children[0].children[0].children[0] as any).material.transparent = false;
                (this.obj1.children[2].children[0].children[0].children[0] as any).material.opacity = 1;
                for (let k = 1; k < 4; k++) {
                    for (let i = 0; i < 4; i++) {
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material[i].transparent = true;
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material.opacity = tween.opacity2;
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material[i].opacity = tween.opacity2;
                    }
                }
                for (let k = 4; k < 7; k++) {             
                    for (let i = 0; i < 3; i++) {
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material[i].transparent = true;
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material.opacity = tween.opacity2;
                        (this.obj1.children[2].children[0].children[0].children[k] as any).material[i].opacity = tween.opacity2;
                    }
                }
            },
            onComplete: () => {
            
            },
            paused: true
        });
        
    }
    //开始动画
    startAnimation() {
        this.scene1Animation();
        this.modelAnimation.playAnimation(0);
        this.animationScene1.play();
    }

    //加载场景2模型
    async initScene2() {
        const model1: any = await this.gltfLoader(jgs2 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });
        this.obj2.scale.set(100, 100, 100);
    }

    //加载场景3模型
    async initScene3() {
        const model1: any = await this.gltfLoader(fdh4 as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        const model2: any = await this.gltfLoader(fdh6 as any);
        model2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        const model3: any = await this.gltfLoader(fdh8 as any);
        model3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        const model4: any = await this.gltfLoader(fdh2 as any);
        model4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });
        this.obj3.scale.set(0.6, 0.6, 0.6);
    }

    // 重置场景1动画
    resetScene1Animation() {
        this.animationScene1.progress(0);
        this.animationScene1.pause();
    }
}
