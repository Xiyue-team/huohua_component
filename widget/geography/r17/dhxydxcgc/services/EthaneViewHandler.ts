import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class EthaneViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }


      playAnimation1() {
        (document.getElementsByClassName('animationVideo')[0] as HTMLVideoElement).play();
        (document.getElementsByClassName('animationVideo')[0] as HTMLVideoElement).onended = () => {
              this.viewModel.$data.ctrl1 = false;
              this.viewModel.$data.ctrl5 = true;
              this.playAnimation5();
              this.resetAnimation1();
        };
      }

      playAnimation2() {
        (document.getElementsByClassName('animationVideo')[1] as HTMLVideoElement).play();
        (document.getElementsByClassName('animationVideo')[1] as HTMLVideoElement).onended = () => {
          this.viewModel.$data.ctrl2 = false;
          this.viewModel.$data.ctrl4 = true;
          this.playAnimation4();
          this.resetAnimation2();
        };
      }

      playAnimation3() {
        (document.getElementsByClassName('animationVideo')[2] as HTMLVideoElement).play();
        (document.getElementsByClassName('animationVideo')[2] as HTMLVideoElement).onended = () => {
            this.viewModel.$data.ctrl3 = false;
            this.viewModel.$data.ctrl6 = true;
            this.playAnimation6();
            this.resetAnimation3();
          };
      }

      playAnimation4() {
        (document.getElementsByClassName('animationVideo')[3] as HTMLVideoElement).play();
      }

      playAnimation5() {
        (document.getElementsByClassName('animationVideo')[4] as HTMLVideoElement).play();
      }

      playAnimation6() {
        (document.getElementsByClassName('animationVideo')[5] as HTMLVideoElement).play();
      }


      resetAnimation1() {
        (document.getElementsByClassName('animationVideo')[0] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[0] as HTMLVideoElement).currentTime = 0;
      }

      resetAnimation2() {
        (document.getElementsByClassName('animationVideo')[1] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[1] as HTMLVideoElement).currentTime = 0;
      }

      resetAnimation3() {
        (document.getElementsByClassName('animationVideo')[2] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[2] as HTMLVideoElement).currentTime = 0;
      }

      resetAnimation4() {
        (document.getElementsByClassName('animationVideo')[3] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[3] as HTMLVideoElement).currentTime = 0;
      }

      resetAnimation5() {
        (document.getElementsByClassName('animationVideo')[4] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[4] as HTMLVideoElement).currentTime = 0;
      }

      resetAnimation6() {
        (document.getElementsByClassName('animationVideo')[5] as HTMLVideoElement).pause();
        (document.getElementsByClassName('animationVideo')[5] as HTMLVideoElement).currentTime = 0;
      }

    reset(): void {
        this.viewModel.$data.frame1 = false;
        this.viewModel.$data.frame2 = true;
        this.viewModel.$data.frame3 = true;
        this.viewModel.$data.frame4 = true;
        this.viewModel.$data.ctrl1 = true;
        this.viewModel.$data.ctrl2 = false;
        this.viewModel.$data.ctrl3 = false;
        this.viewModel.$data.ctrl4 = false;
        this.viewModel.$data.ctrl5 = false;
        this.viewModel.$data.ctrl6 = false;
        this.resetAnimation1();
        this.playAnimation1();
        this.resetAnimation2();
        this.resetAnimation3();
        this.resetAnimation4();
        this.resetAnimation5();
        this.resetAnimation6();
    }

}
