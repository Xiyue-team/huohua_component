import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';

const video = require('video.js/dist/video.js');

export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  play2: any;
  video1: any;
  video2: any;
  video3: any;
  video4: any;
  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.play1 = video('my-video1', {
      loop: false,
      controls: false
    });
    this.play2 = video('my-video2', {
      loop: false,
      controls: false
    });

  }

  //点击图片按钮触发视频
  clickImage1(offset: any) {
    const thiz = this;
    if (offset === 1) {
      setTimeout(()=>{
        this.play1.play();
      },100);
      this.play1.currentTime(0);
      (thiz.viewModel as any).actived1 = true;
      (thiz.viewModel as any).actived2 = false;
      (thiz.viewModel as any).actived3 = false;
      (thiz.viewModel as any).actived4 = false;
      clearTimeout(this.video2);
      clearTimeout(this.video3);
      clearTimeout(this.video4);
      this.video1 = setTimeout(() => {
        (thiz.viewModel as any).have2 = true;
      }, 3000);
    } else if (offset === 2) {
      setTimeout(()=>{
        this.play1.play();
      },100);
      this.play1.currentTime(0);
      setTimeout(()=>{
        this.play2.play();
      },100);
      this.play2.currentTime(0);
      (thiz.viewModel as any).actived1 = false;
      (thiz.viewModel as any).actived2 = true;
      (thiz.viewModel as any).actived3 = false;
      (thiz.viewModel as any).actived4 = false;
      clearTimeout(this.video1);
      clearTimeout(this.video3);
      clearTimeout(this.video4);
      this.video2 = setTimeout(() => {
        (thiz.viewModel as any).have2 = true;
      }, 3000);

    } else if (offset === 3) {
      setTimeout(()=>{
        this.play2.play();
      },100);
      this.play2.currentTime(0);
      (thiz.viewModel as any).actived1 = false;
      (thiz.viewModel as any).actived2 = false;
      (thiz.viewModel as any).actived3 = true;
      (thiz.viewModel as any).actived4 = false;
      clearTimeout(this.video1);
      clearTimeout(this.video2);
      clearTimeout(this.video4);
      this.video3 = setTimeout(() => {
        (thiz.viewModel as any).have2 = true;
      }, 3000);
    } else if (offset === 4) {
      clearTimeout(this.video1);
      clearTimeout(this.video2);
      clearTimeout(this.video3);
      this.video4 = setTimeout(() => {
        (thiz.viewModel as any).have2 = true;
      }, 3000);
      (thiz.viewModel as any).actived1 = false;
      (thiz.viewModel as any).actived2 = false;
      (thiz.viewModel as any).actived3 = false;
      (thiz.viewModel as any).actived4 = true;
    }
  }


  // 重置
  reset() {
    (this.viewModel as any).allStyle();
    (this.viewModel as any).Reset();
    clearTimeout(this.video1);
    clearTimeout(this.video2);
    clearTimeout(this.video3);
  }
}
