import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
// const video = require('video.js/dist/video.js');
import  video from 'video.js';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
    play1: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.play1 = video('my-video1', {
            loop: true,
            controls: false
        });
    }
   //点击按钮自身的变化
    getVideo1(){
        this.play1.play();
    }
    //重置
    reset(): void {
      (this.viewModel as any).reset();
    }
}
