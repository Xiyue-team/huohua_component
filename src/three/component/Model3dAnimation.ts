/*
* 3d模型动画类
* 在 3dModel类 加载模型中 创建Model3dAnimation对象传入模型参数
* 提供方法
* 1.播放
* 2.暂停
* 3.从中间播放
* 4.重复播放
* 5.播放全部
* 6.从指定范围播放
* 7.内部render方法
* 8.绑定slider
**/
import * as THREE from 'three';
import {AnimationAction, AnimationMixer, Clock} from 'three';

export class Model3dAnimation {

    fbx: any;

    animation: any;
    mixer: AnimationMixer;
    action: AnimationAction;
    clock: Clock = new THREE.Clock();

    process: any;

    /**
     * @param fbx 模型
     */
    constructor(fbx: any, process?: any) {
        this.fbx = fbx;
        this.mixer = new AnimationMixer(fbx);
        this.animation = this.fbx.animations;
        this.action = this.mixer.clipAction(this.animation[0]);
        this.process = process ? process : null;
    }

    /*
    * 播放
    * */

    playAnimation() {
        this.action.play();
        this.action.paused = false;
        if (this.action.time === this.action.getClip().duration) {
            this.action.reset();
            (window as any).viewHandler.viewModel.$data.sliderNum = 0;
        }
    }


    playModelAnimation() {
        this.action.play();
        this.action.paused = false;
    }

    pauseModelAnimation() {
        this.action.paused = true;
    }


    resetModelAnimation() {

        this.action.time = 0;
        this.action.paused = true;
    }

    /*
  * 设置动画播放倍速
  * */
    setAnimationDoubleSpeed(timescale: number) {
        this.action.timeScale = timescale;
    }






    /*
    * 暂停
    * */

    pausedAnimation() {
        this.action.paused = true;
    }

    /*
    * 从中间播放
    * */
    fromCenterPlayAnimation() {
        this.action.time = this.action.getClip().duration / 2;
        this.action.paused = false;
    }

    /*
    * 重复播放
    * */

    repeatPlayAnimatoin() {
        this.action.setLoop(THREE.LoopRepeat, Infinity);
        this.action.paused = false;
    }

    /*
    * 设置循环播放一次
    * */
    setLoopOne() {
        this.action.loop = false;
        this.action.setLoop(THREE.LoopOnce, 1);
        this.action.clampWhenFinished = true;
    }

    /*
    * 从指定范围播放
    * */

    fromRangePlayAnimation(startTime: number, endTime: number) {
        if (this.action.time <= startTime || this.action.time > endTime) {
            this.action.play();
            this.action.time = startTime;
        }
    }


    /*
    * 播放全部动画
    * */

    playAllAnimation() {
        this.action.time = 0;
        this.action.paused = false;
    }

    /*
    * 内部render方法
    * */

    renderModel() {
        const delta = this.clock.getDelta();

        if (this.mixer) {
            this.mixer.update(delta);
        }
        if ( this.action.paused === false && this.process) {
            this.process(this.action.time / this.action.getClip().duration);
        }

    }

    //播放指定帧数动画
    fromCallBack(startTime?: number, endTime?: number) {
        if (endTime === 0) {
            this.action.paused = false;
            this.action.time = 0;
            return;
        }

        this.fromRangePlayAnimation(startTime, endTime);

    }

    /*
    * 动画绑定滑条
    * */
    callBack(controls: number) {
        this.action.time = controls;
        this.action.play();
    }


    /*
    * 重置动画
    * */
    resetModel() {
        this.action.time = 0;
        this.action.paused = false;
        this.setLoopOne();
    }


    /*
    * 切换多组动画
    * */
    controlAnimation(sliderNum?: number): any {

        if (sliderNum === 0) {
            this.action.paused = true;
            this.action.time = 0;
            return;
        }

        this.action = this.mixer.clipAction(this.animation[sliderNum - 1]);
        return this.action;
    }
}
