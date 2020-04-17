import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class DxdhcdyxViewHandler extends CommonViewHandler implements ViewHandler {

   private videoDom = document.getElementsByClassName('video_style');

  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();
    this.init();
    ViewController.getInstance().hideLoading();
  }


  init() {

  }

  animationPlay() {
      switch (true) {
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              this.animationReset();
              (this.videoDom[0] as HTMLVideoElement).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              this.animationReset();
              (this.videoDom[1] as HTMLVideoElement).play();
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              this.animationReset();
              (this.videoDom[2] as HTMLVideoElement).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              this.animationReset();
              (this.videoDom[3] as HTMLVideoElement).play();
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              this.animationReset();
              (this.videoDom[4] as HTMLVideoElement).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              this.animationReset();
              (this.videoDom[5] as HTMLVideoElement).play();
              break;
      }
  }

  mobileAnimationPlay() {
      switch (true) {
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              (this.viewModel.$refs.pymAnimation as any).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              (this.viewModel.$refs.pykAnimation as any).play();
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              (this.viewModel.$refs.pykAnimation as any).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              (this.viewModel.$refs.pykAnimation as any).play();
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              (this.viewModel.$refs.pykAnimation as any).play();
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              (this.viewModel.$refs.pykAnimation as any).play();
              break;
      }
  }

  animationReset() {
      switch (true) {
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              (this.videoDom[0] as HTMLVideoElement).pause();
              (this.videoDom[0] as HTMLVideoElement).currentTime = 0;
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
              (this.videoDom[1] as HTMLVideoElement).pause();
              (this.videoDom[1] as HTMLVideoElement).currentTime = 0;
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              (this.videoDom[2] as HTMLVideoElement).pause();
              (this.videoDom[2] as HTMLVideoElement).currentTime = 0;
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
              (this.videoDom[3] as HTMLVideoElement).pause();
              (this.videoDom[4] as HTMLVideoElement).currentTime = 0;
              break;
          case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              (this.videoDom[4] as HTMLVideoElement).pause();
              (this.videoDom[4] as HTMLVideoElement).currentTime = 0;
              break;
          case this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
              (this.videoDom[5] as HTMLVideoElement).pause();
              (this.videoDom[5] as HTMLVideoElement).currentTime = 0;
              break;
      }
  }


  resize(): void {
    super.resize();
  }

  reset(): void {
      this.viewModel.$data.imgCtrl = false;
      this.viewModel.$data.active1 = true;
      this.viewModel.$data.active2 = false;
      this.viewModel.$data.active3 = false;
      this.animationPlay();
  }

}
