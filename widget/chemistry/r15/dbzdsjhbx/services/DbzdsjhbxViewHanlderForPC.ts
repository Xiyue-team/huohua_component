import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Detector} from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

export class DbzdsjhbxViewHanlderForPC extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        super.domReady();

        ViewController.getInstance().hideLoading();

    }

    resize(): void {
        Detector.forceMobildLandscape();
    }

    playAnimation1() {
        (document.getElementById('animationVideo1') as HTMLVideoElement).play();
    }

    playAnimation2() {
        (document.getElementById('animationVideo2') as HTMLVideoElement).play();
    }

    playAnimation3() {
        (document.getElementById('animationVideo3') as HTMLVideoElement).play();
    }

    playAnimation4() {
        (document.getElementById('animationVideo4') as HTMLVideoElement).play();
    }


    resetAnimation1() {
        (document.getElementById('animationVideo1') as HTMLVideoElement).pause();
        (document.getElementById('animationVideo1') as HTMLVideoElement).currentTime = 0;
    }

    resetAnimation2() {
        (document.getElementById('animationVideo2') as HTMLVideoElement).pause();
        (document.getElementById('animationVideo2') as HTMLVideoElement).currentTime = 0;
    }

    resetAnimation3() {
        (document.getElementById('animationVideo3') as HTMLVideoElement).pause();
        (document.getElementById('animationVideo3') as HTMLVideoElement).currentTime = 0;
    }

    resetAnimation4() {
        (document.getElementById('animationVideo4') as HTMLVideoElement).pause();
        (document.getElementById('animationVideo4') as HTMLVideoElement).currentTime = 0;
    }


    reset(): void {

        this.viewModel.$data.show_Radio1 = false;
        this.viewModel.$data.show_Radio2 = false;
        this.viewModel.$data.vertical1 = '0';
        this.viewModel.$data.vertical2 = '0';
        this.viewModel.$data.ctrl1 = true;
        this.viewModel.$data.ctrl2 = false;
        this.viewModel.$data.ctrl3 = false;
        this.viewModel.$data.ctrl4 = false;
        this.viewModel.$data.ctrl5 = false;
        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
    }

}
