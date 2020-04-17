


import {AnimationAction, AnimationClip, AnimationMixer, Clock} from 'three';
import * as THREE from 'three';

export class ModelAnimationGroup {


    //模型
    model: any;


    //动画组
    animation: Array<AnimationClip>;

    //动画混合器
    mixer: AnimationMixer;

    //动画播放器
    actionArry: Array<AnimationAction> = [];

    clock: Clock = new THREE.Clock();

    constructor(model: any) {

        this.model = model.scenes[0];
        this.mixer = new AnimationMixer(this.model);
        this.animation = model.animations;
        this.traversingAnimation();

    }


    /*
    * 播放动画
    * */

    playAnimation(val: number) {
        this.actionArry[val].paused = false;
        this.actionArry[val].play();
    }

    /*
    * 暂停动画
    * */

    pauseAnimation(val: number) {
        this.actionArry[val].paused = true;
    }

    /*
    * 重置动画
    * */
    resetAnimation() {
        for (let i = 0; i < this.actionArry.length; i++) {
            this.actionArry[i].reset();
            this.actionArry[i].paused = true;
        }
    }


    /*
  * 设置循环播放次数
  * */
    setLoopOne(val: number) {
        this.actionArry[val].loop = false;
        this.actionArry[val].setLoop(THREE.LoopOnce, 1);
        this.actionArry[val].clampWhenFinished = true;
    }


    /*
 * 重复播放
 * */
    repeatPlayAnimatoin(val: number) {
        this.actionArry[val].setLoop(THREE.LoopRepeat, Infinity);
        this.actionArry[val].paused = false;
    }


    /*
    * 设置动画播放倍速
    * */

    setAnimationDoubleSpeed(val: number, timescale: number) {
        this.actionArry[val].timeScale = timescale;
    }


    /*
    * 遍历动画组
    * */

    traversingAnimation() {

        for (let i = 0; i < this.animation.length; i++) {
            this.actionArry[i] = this.mixer.clipAction(this.animation[i]);
        }

    }


    /*
    * 切换动画组并播放动画
    * */
    switchAniamtion(val: number) {

        for (let j = 0; j < this.actionArry.length; j++) {
            if (j === val) {
                this.actionArry[j].play();
                this.actionArry[j].paused = false;
            } else {
                this.actionArry[j].stop();
                this.actionArry[j].paused = true;
            }
        }

    }


    /*
    * 获取模型动画组个数
    * 返回值 ： 模型动画组个数
    * */

    getAnimationGroupLength(): number {
        return this.animation.length;
    }


    /*
    * 返回模型动画组动画
    * 返回值： 模型动画组
    * */

    getAnimationGroupArry(): Array<AnimationAction> {
        return this.actionArry;
    }

    /*
    * 内部render
    * */
    renderModel() {
        const delta = this.clock.getDelta();

        if (this.mixer) {
            this.mixer.update(delta);
        }

    }
}
