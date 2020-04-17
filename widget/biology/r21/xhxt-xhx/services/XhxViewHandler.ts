import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
const video = require('../video.js');
import * as image from '../sub_static/UI/person0.png';
import * as image1 from '../sub_static/UI/person1.png';
import * as image2 from '../sub_static/UI/person2.png';
import * as image3 from '../sub_static/UI/person3.png';
import * as image4 from '../sub_static/UI/person4.png';
import * as image5 from '../sub_static/UI/person5.png';
export class XhxViewHandler extends CommonViewHandler implements ViewHandler {
    play1: any;
    play2: any;
    play3: any;
    play4: any;
    play5: any;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        document.getElementById('my-video1').style.borderRadius = '10px';
        document.getElementById('my-video2').style.borderRadius = '10px';
        document.getElementById('my-video3').style.borderRadius = '10px';
        document.getElementById('my-video4').style.borderRadius = '10px';
        document.getElementById('my-video5').style.borderRadius = '10px';
        (this.viewModel as any).personImg = image as any;
        this.play1 = video('my-video1', {
            loop: true,
            controls: false,
        });
        this.play2 = video('my-video2', {
            loop: true,
        });
        this.play3 = video('my-video3', {
            loop: true,
        });
        this.play4 = video('my-video4', {
            loop: true,
        });
        this.play5 = video('my-video5', {
            loop: true,
        });
    }

    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonEvent((this.viewModel as any).active1, this.play1, image1);
            (this.viewModel as any).active1 = true;
            (this.viewModel as any).active = true;
        } else if (index === 2) {
            this.buttonEvent((this.viewModel as any).active2, this.play2, image2);
            (this.viewModel as any).active2 = true;
        } else if (index === 3) {
            this.buttonEvent((this.viewModel as any).active3, this.play3, image3);
            (this.viewModel as any).active3 = true;
        } else if (index === 4) {
            this.buttonEvent((this.viewModel as any).active4, this.play4, image4);
            (this.viewModel as any).active4 = true;
        } else if (index === 5) {
            this.buttonEvent((this.viewModel as any).active5, this.play5, image5);
            (this.viewModel as any).active5 = true;
        }
    }

    // 控制视频显示隐藏
    videoChange() {
        (this.viewModel as any).show = false;
        (this.viewModel as any).active = false;
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).active4 = false;
        (this.viewModel as any).active5 = false;
        this.play1.pause();
        this.play1.currentTime(0);
        this.play2.pause();
        this.play2.currentTime(0);
        this.play3.pause();
        this.play3.currentTime(0);
        this.play4.pause();
        this.play4.currentTime(0);
        this.play5.pause();
        this.play5.currentTime(0);
    }

    // 点击不同按钮触发的事件函数
    buttonEvent(act: any, play: any, img: any) {
        if (act === true) {
            return;
        }
        this.videoChange();
        (this.viewModel as any).personImg = img as any;
        play.load();
        play.play();
    }

    reset(): void {
        this.videoChange();
        (this.viewModel as any).show = true;
        (this.viewModel as any).personImg = image as any;
    }
}
