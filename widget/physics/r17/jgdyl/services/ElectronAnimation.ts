/**
 * 电子动画
 *@since 2.0
 *@author zhiguo
 *@Date 18-11-1 上午11:29
 */
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
import {Group} from 'three';

export class ElectronAnimation {

    modelAnimation1: Model3dAnimation;
    modelAnimation2: Model3dAnimation;
    modelAnimation3: Model3dAnimation;

    constructor(group1: Group, group2: Group, group3: Group) {

        console.log(group1);
        console.log(group2);
        console.log(group3);
        this.initModelAnimation(group1, this.modelAnimation1);

        this.initModelAnimation(group2, this.modelAnimation2);

         this.initModelAnimation(group3, this.modelAnimation3);

    }

    initModelAnimation(group: Group, modelAnimation: Model3dAnimation) {
        const model = group.getObjectByName('ball');
        //console.log(model);
        modelAnimation = new Model3dAnimation(model);
        modelAnimation.setLoopOne();
        modelAnimation.setAnimationDoubleSpeed(0.2);
    }

    play() {

        this.modelAnimation1.playModelAnimation();
        this.modelAnimation2.playModelAnimation();
        this.modelAnimation3.playModelAnimation();
    }
}
