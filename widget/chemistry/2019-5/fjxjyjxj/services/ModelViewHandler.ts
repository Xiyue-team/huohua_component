import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
const video = require('../video.js');
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    play1: any;
    play2: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.play1 = video('my-video1', {
            loop: false,
            controls: true,
        });
        this.play2 = video('my-video2', {
            loop: false,
            controls: true,
        });
    }
    resize(): void {
        super.resize();
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonEvent((this.viewModel as any).active1, this.play1);
            (this.viewModel as any).active1 = true;
            (this.viewModel as any).tipImg = require('../sub_static/UI/fjxj.png');
        } else if (index === 2) {
            this.buttonEvent((this.viewModel as any).active2, this.play2);
            (this.viewModel as any).active2 = true;
            (this.viewModel as any).tipImg = require('../sub_static/UI/jxj.png');
        }
    }

    // 控制视频显示隐藏
    videoChange() {
        (this.viewModel as any).coverShow = false;
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        this.play1.pause();
        this.play1.currentTime(0);
        this.play2.pause();
        this.play2.currentTime(0);
    }
    playEvent() {
        if ((this.viewModel as any).active1) {
            this.play1.play();
        } else if ((this.viewModel as any).active2) {
            this.play2.play();
        }
    }
    // 点击不同按钮触发的事件函数
    buttonEvent(act: any, play: any, ) {
        if (act === true) {
            return;
        }
        (this.viewModel as any).active = true;
        this.videoChange();
        play.load();
    }

    reset(): void {
        this.videoChange();
        (this.viewModel as any).coverShow = true;
        (this.viewModel as any).active = false;
        (this.viewModel as any).tipImg = require('../sub_static/UI/fjxj.png');
    }

}
