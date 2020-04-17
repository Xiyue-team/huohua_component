import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import video from 'video.js';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    videoPlayer1: any;
    videoPlayer2: any;
    tipText: any;
    text = window.env.browserInfo.lang.text;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.videoPlayer1 = video('my-video1', {
            loop: false,
            controls: false
        });
        this.videoPlayer2 = video('my-video2', {
            loop: false,
            controls: false,
        });
    }
    resize(): void {
        super.resize();
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonEvent((this.viewModel as any).active1, this.videoPlayer1);
            (this.viewModel as any).active1 = true;
            (this.viewModel as any).tipImg = require('../sub_static/video/adequate.jpg');
        } else {
            this.buttonEvent((this.viewModel as any).active2, this.videoPlayer2);
            (this.viewModel as any).active2 = true;
            (this.viewModel as any).tipImg = require('../sub_static/video/shortage.jpg');
        }
    }

    // 控制视频显示隐藏
    videoChange() {
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        this.videoPlayer1.pause();
        this.videoPlayer1.currentTime(0);
        this.videoPlayer2.pause();
        this.videoPlayer2.currentTime(0);
    }
    playEvent() {
        if ((this.viewModel as any).active1) {
            this.videoPlayer1.play();
            this.detectVideoEnd(this.videoPlayer1);
        } else if ((this.viewModel as any).active2) {
            this.videoPlayer2.play();
            this.detectVideoEnd(this.videoPlayer2);
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

    /*检测视频播放完毕*/
    detectVideoEnd(videoElement: any) {
        videoElement.on('ended', () => {
          (this.viewModel as any).active = true;
        });
    }

    reset(): void {
        this.videoChange();
        (this.viewModel as any).active1 = true;
        (this.viewModel as any).active = true;
        (this.viewModel as any).tipImg = require('../sub_static/video/adequate.jpg');
    }

}
