import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';


import * as oneScene1 from '../sub_static/model1/oneScene1.fbx';
import * as oneScene2 from '../sub_static/model1/oneScene2.fbx';
import * as oneScene3 from '../sub_static/model1/oneScene3.fbx';
import * as oneScene4 from '../sub_static/model1/oneScene4.fbx';

import * as twoScene1 from '../sub_static/model2/twoScene1.fbx';
import * as twoScene2 from '../sub_static/model2/twoScene2.fbx';
import * as twoScene3 from '../sub_static/model2/twoScene3.fbx';
import * as twoScene4 from '../sub_static/model2/twoScene4.fbx';

import * as lfdjdh from '../sub_static/model3/lfdjdh.fbx';
import * as lfjbmx from '../sub_static/model3/lfjbmx.fbx';
import * as lfskdh from '../sub_static/model3/lfskdh.fbx';

import * as mxdjdh from '../sub_static/model3/mxdjdh.fbx';
import * as mxjbmx from '../sub_static/model3/mxjbmx.fbx';
import * as mxskdh from '../sub_static/model3/mxskdh.fbx';

import * as jddjdh from '../sub_static/model4/jddjdh.fbx';
import * as jdjbmx from '../sub_static/model4/jdjbmx.fbx';
import * as jdskdh from '../sub_static/model4/jdskdh.fbx';

import * as txdjdh from '../sub_static/model4/txdjdh.fbx';
import * as txjbmx from '../sub_static/model4/txjbmx.fbx';
import * as txskdh from '../sub_static/model4/txskdh.fbx';

import {TweenMax} from 'gsap';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';


export class ModelLoad extends ThreeBase {

    // 场景1
    obj1 = new THREE.Object3D();

    // 场景2
    obj2 = new THREE.Object3D();

    // 场景3 六方堆积模型
    obj3 = new THREE.Object3D();

    // 场景3 面心堆积模型
    obj4 = new THREE.Object3D();

    // 场景4 简单堆积模型
    obj5 = new THREE.Object3D();

    // 场景4 体心堆积模型
    obj6 = new THREE.Object3D();

    // 场景1动画
    animationScene1: any;

    // 场景2动画
    animationScene2: any;

    // 场景3动画1
    animationScene3: any = [];

    // 场景3动画2
    animationScene4: any = [];

    // 场景4动画1
    animationScene5: any = [];

    // 场景4动画2
    animationScene6: any = [];

    // 六方模型堆积动画
    modelAnimation1: any;
    // 六方模型散开动画
    modelAnimation2: any;

    // 面心模型堆积动画
    modelAnimation3: any;
    // 面心模型散开动画
    modelAnimation4: any;

    // 简单模型堆积动画
    modelAnimation5: any;
    // 简单模型散开动画
    modelAnimation6: any;

    // 体心模型堆积动画
    modelAnimation7: any;
    // 体心模型散开动画
    modelAnimation8: any;


    static preload() {
        const modelArray = [
            oneScene1, oneScene2, oneScene3, oneScene4,
            twoScene1, twoScene2, twoScene3, twoScene4,
            lfdjdh, lfjbmx, lfskdh, mxdjdh, mxjbmx, mxskdh,
            jddjdh, jdjbmx, jdskdh, txdjdh, txjbmx, txskdh
        ];
        console.log(modelArray.length);
    }

    constructor() {
        super();
    }

    // 加载场景1模型
    async initScene1() {
        const model1: any = await this.fbxLoader(oneScene1 as any);
        this.obj1.add(model1);

        const model2: any = await this.fbxLoader(oneScene2 as any);
        this.obj1.add(model2);

        const model3: any = await this.fbxLoader(oneScene3 as any);
        this.obj1.add(model3);

        const model4: any = await this.fbxLoader(oneScene4 as any);
        this.obj1.add(model4);

        this.scene1Animation();
    }

    // 加载场景2模型
    async initScene2() {
        const model1: any = await this.fbxLoader(twoScene1 as any);
        this.obj2.add(model1);

        const model2: any = await this.fbxLoader(twoScene2 as any);
        this.obj2.add(model2);

        const model3: any = await this.fbxLoader(twoScene3 as any);
        this.obj2.add(model3);

        const model4: any = await this.fbxLoader(twoScene4 as any);
        this.obj2.add(model4);

        this.scene2Animation();
    }


    // 加载六方模型
    async initLiufang() {
        const model1: any = await this.fbxLoader(lfjbmx as any);
        this.obj3.add(model1);

        const model2: any = await this.fbxLoader(lfskdh as any);
        this.obj3.add(model2);

        const model3: any = await this.fbxLoader(lfdjdh as any);
        this.obj3.add(model3);


        this.modelAnimation1 = new Model3dAnimation(model3);
        this.modelAnimation1.setLoopOne();
        this.modelAnimation1.setAnimationDoubleSpeed(1);

        this.modelAnimation2 = new Model3dAnimation(model2);
        this.modelAnimation2.setLoopOne();
        this.modelAnimation2.setAnimationDoubleSpeed(1);

        model1.visible = false;
        model2.visible = false;

        this.scene3Animation1();
    }

    // 加载面心模型
    async initMianxin() {
        const model1: any = await this.fbxLoader(mxjbmx as any);
        this.obj4.add(model1);

        const model2: any = await this.fbxLoader(mxskdh as any);
        this.obj4.add(model2);

        const model3: any = await this.fbxLoader(mxdjdh as any);
        this.obj4.add(model3);


        this.modelAnimation3 = new Model3dAnimation(model3);
        this.modelAnimation3.setLoopOne();
        this.modelAnimation3.setAnimationDoubleSpeed(1);

        this.modelAnimation4 = new Model3dAnimation(model2);
        this.modelAnimation4.setLoopOne();
        this.modelAnimation4.setAnimationDoubleSpeed(1);

        model1.visible = false;
        model2.visible = false;

        this.scene3Animation2();
    }

    // 加载简单模型
    async initJiandan() {
        const model1: any = await this.fbxLoader(jdjbmx as any);
        this.obj5.add(model1);

        const model2: any = await this.fbxLoader(jdskdh as any);
        this.obj5.add(model2);

        const model3: any = await this.fbxLoader(jddjdh as any);
        this.obj5.add(model3);


        this.modelAnimation5 = new Model3dAnimation(model3);
        this.modelAnimation5.setLoopOne();
        this.modelAnimation5.setAnimationDoubleSpeed(1);

        this.modelAnimation6 = new Model3dAnimation(model2);
        this.modelAnimation6.setLoopOne();
        this.modelAnimation6.setAnimationDoubleSpeed(1);

        model1.visible = false;
        model2.visible = false;

        this.scene4Animation1();
    }

    // 加载体心模型
    async initTixin() {
        const model1: any = await this.fbxLoader(txjbmx as any);
        this.obj6.add(model1);

        const model2: any = await this.fbxLoader(txskdh as any);
        this.obj6.add(model2);

        const model3: any = await this.fbxLoader(txdjdh as any);
        this.obj6.add(model3);


        this.modelAnimation7 = new Model3dAnimation(model3);
        this.modelAnimation7.setLoopOne();
        this.modelAnimation7.setAnimationDoubleSpeed(1);

        this.modelAnimation8 = new Model3dAnimation(model2);
        this.modelAnimation8.setLoopOne();
        this.modelAnimation8.setAnimationDoubleSpeed(1);

        model1.visible = false;
        model2.visible = false;

        this.scene4Animation2();
    }




    // 场景1动画
    scene1Animation() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
            opacity3: 1,
        };

        (this.obj1.children[0].children[0] as any).material.transparent = true;
        (this.obj1.children[1].children[0] as any).material.transparent = true;
        (this.obj1.children[3].children[0] as any).material.transparent = true;

        // 外围小球变透明动画
        this.animationScene1 = TweenMax.to(tween, 2, {
            opacity1: 0.3,
            opacity2: 1,
            opacity3: 0,
            onUpdate: () => {

                (this.obj1.children[0].children[0] as any).material.opacity = tween.opacity2;
                (this.obj1.children[1].children[0] as any).material.opacity = tween.opacity3;
                (this.obj1.children[3].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });
    }

    // 场景2动画
    scene2Animation() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
            opacity3: 1,
        };

        (this.obj2.children[0].children[0] as any).material.transparent = true;
        (this.obj2.children[1].children[0] as any).material.transparent = true;
        (this.obj2.children[3].children[0] as any).material.transparent = true;

        this.animationScene2 = TweenMax.to(tween, 2, {
            opacity1: 0.3,
            opacity2: 1,
            opacity3: 0,
            onUpdate: () => {

                (this.obj2.children[0].children[0] as any).material.opacity = tween.opacity2;
                (this.obj2.children[1].children[0] as any).material.opacity = tween.opacity3;
                (this.obj2.children[3].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });
    }

    // 场景3动画1
    scene3Animation1() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };

        (this.obj3.children[2].children[1] as any).material.transparent = true;
        (this.obj3.children[2].children[2] as any).material.transparent = true;
        (this.obj3.children[2].children[3] as any).material.transparent = true;

        (this.obj3.children[2].children[1] as any).visible = false;
        (this.obj3.children[2].children[2] as any).visible = false;
        (this.obj3.children[2].children[3] as any).visible = false;

        //堆积出现
        this.animationScene3[0] = TweenMax.to(tween, 1.5, {
            opacity1: 1,
            onStart: () => {
                console.log('22222');
                (this.obj3.children[2].children[1] as any).visible = true;
                (this.obj3.children[2].children[2] as any).visible = true;
                (this.obj3.children[2].children[3] as any).visible = true;
                this.modelAnimation1.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj3.children[2].children[1] as any).material.opacity = tween.opacity1;
                (this.obj3.children[2].children[2] as any).material.opacity = tween.opacity1;
                (this.obj3.children[2].children[3] as any).material.opacity = tween.opacity1;
            },
            onComplete: () => {
                this.obj3.children[0].visible = true;
                this.obj3.children[1].visible = true;
                this.obj3.children[2].visible = false;
                this.modelAnimation2.playModelAnimation();
                this.animationScene3[1].play();
            },
            paused: true
        });

        (this.obj3.children[1].children[0] as any).material.transparent = true;
        // 散开消失
        this.animationScene3[1] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                (this.obj3.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 场景3动画2
    scene3Animation2() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };

        (this.obj4.children[2].children[1] as any).material.transparent = true;
        (this.obj4.children[2].children[2] as any).material.transparent = true;
        (this.obj4.children[2].children[3] as any).material.transparent = true;

        (this.obj4.children[2].children[1] as any).visible = false;
        (this.obj4.children[2].children[2] as any).visible = false;
        (this.obj4.children[2].children[3] as any).visible = false;

        // 堆积出现
        this.animationScene4[0] = TweenMax.to(tween, 1.5, {
            opacity1: 1,
            onStart: () => {
                console.log('22222');
                (this.obj4.children[2].children[1] as any).visible = true;
                (this.obj4.children[2].children[2] as any).visible = true;
                (this.obj4.children[2].children[3] as any).visible = true;
                this.modelAnimation3.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj4.children[2].children[1] as any).material.opacity = tween.opacity1;
                (this.obj4.children[2].children[2] as any).material.opacity = tween.opacity1;
                (this.obj4.children[2].children[3] as any).material.opacity = tween.opacity1;
            },
            onComplete: () => {
                this.obj4.children[0].visible = true;
                this.obj4.children[1].visible = true;
                this.obj4.children[2].visible = false;
                this.modelAnimation4.playModelAnimation();
                this.animationScene4[1].play();
            },
            paused: true
        });

        // 散开消失
        (this.obj4.children[1].children[0] as any).material.transparent = true;
        this.animationScene4[1] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                (this.obj4.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 场景4动画1
    scene4Animation1() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };

        (this.obj5.children[2].children[1] as any).material.transparent = true;

        (this.obj5.children[2].children[1] as any).visible = false;

        //堆积出现
        this.animationScene5[0] = TweenMax.to(tween, 1, {
            opacity1: 1,
            onStart: () => {
                console.log('22222');
                (this.obj5.children[2].children[1] as any).visible = true;
                this.modelAnimation5.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj5.children[2].children[1] as any).material.opacity = tween.opacity1;
            },
            onComplete: () => {
                this.obj5.children[0].visible = true;
                this.obj5.children[1].visible = true;
                this.obj5.children[2].visible = false;
                this.modelAnimation6.playModelAnimation();
                this.animationScene5[1].play();
            },
            paused: true
        });

        (this.obj5.children[1].children[0] as any).material.transparent = true;
        // 散开消失
        this.animationScene5[1] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                (this.obj5.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 场景4动画2
    scene4Animation2() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };

        (this.obj6.children[2].children[1] as any).material.transparent = true;

        (this.obj6.children[2].children[1] as any).visible = false;
        (this.obj6.children[2].children[2] as any).visible = false;

        //堆积出现
        this.animationScene6[0] = TweenMax.to(tween, 1, {
            opacity1: 1,
            onStart: () => {
                console.log('22222');
                (this.obj6.children[2].children[1] as any).visible = true;
                (this.obj6.children[2].children[2] as any).visible = true;
                this.modelAnimation7.playModelAnimation();
            },
            onUpdate: () => {
                (this.obj6.children[2].children[1] as any).material.opacity = tween.opacity1;
            },
            onComplete: () => {
                this.obj6.children[0].visible = true;
                this.obj6.children[1].visible = true;
                this.obj6.children[2].visible = false;
                this.modelAnimation8.playModelAnimation();
                this.animationScene6[1].play();
            },
            paused: true
        });

        (this.obj6.children[1].children[0] as any).material.transparent = true;
        // 散开消失
        this.animationScene6[1] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                (this.obj6.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 重置场景1动画
    resetScene1Animation() {
        this.animationScene1.progress(0);
        this.animationScene1.pause();
    }

    // 重置场景2动画
    resetScene2Animation() {
        this.animationScene2.progress(0);
        this.animationScene2.pause();
    }


    // 重置场景3动画1
    resetScene3Animation1() {
        // 显示堆积模型
        this.obj3.children[0].visible = false;
        this.obj3.children[1].visible = false;
        this.obj3.children[2].visible = true;

        // 显示堆积模型第一层
        (this.obj3.children[2].children[1] as any).visible = false;
        (this.obj3.children[2].children[2] as any).visible = false;
        (this.obj3.children[2].children[3] as any).visible = false;

        // 重置动画
        this.animationScene3[0].progress(0);
        this.animationScene3[0].pause();

        this.animationScene3[1].progress(0);
        this.animationScene3[1].pause();

        // 重置模型动画
        this.modelAnimation1.resetModelAnimation();
        this.modelAnimation2.resetModelAnimation();
    }

    // 重置场景3动画2
    resetScene3Animation2() {
        // 显示堆积模型
        this.obj4.children[0].visible = false;
        this.obj4.children[1].visible = false;
        this.obj4.children[2].visible = true;

        // 显示堆积模型第一层
        (this.obj4.children[2].children[1] as any).visible = false;
        (this.obj4.children[2].children[2] as any).visible = false;
        (this.obj4.children[2].children[3] as any).visible = false;

        // 重置动画
        this.animationScene4[0].progress(0);
        this.animationScene4[0].pause();

        this.animationScene4[1].progress(0);
        this.animationScene4[1].pause();

        // 重置模型动画
        this.modelAnimation3.resetModelAnimation();
        this.modelAnimation4.resetModelAnimation();
    }

    // 重置场景4动画1
    resetScene4Animation1() {
        // 显示堆积模型
        this.obj5.children[0].visible = false;
        this.obj5.children[1].visible = false;
        this.obj5.children[2].visible = true;

        // 显示堆积模型第一层
        (this.obj5.children[2].children[1] as any).visible = false;

        // 重置动画
        this.animationScene5[0].progress(0);
        this.animationScene5[0].pause();

        this.animationScene5[1].progress(0);
        this.animationScene5[1].pause();

        // 重置模型动画
        this.modelAnimation5.resetModelAnimation();
        this.modelAnimation6.resetModelAnimation();
    }

    // 重置场景4动画2
    resetScene4Animation2() {
        // 显示堆积模型
        this.obj6.children[0].visible = false;
        this.obj6.children[1].visible = false;
        this.obj6.children[2].visible = true;

        // 显示堆积模型第一层
        (this.obj6.children[2].children[1] as any).visible = false;
        (this.obj6.children[2].children[2] as any).visible = false;

        // 重置动画
        this.animationScene6[0].progress(0);
        this.animationScene6[0].pause();

        this.animationScene6[1].progress(0);
        this.animationScene6[1].pause();

        // 重置模型动画
        this.modelAnimation7.resetModelAnimation();
        this.modelAnimation8.resetModelAnimation();
    }
}

