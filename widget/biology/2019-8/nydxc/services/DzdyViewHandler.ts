import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';


const video = require('video.js/dist/video.js');

export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  play2: any;
  play3: any;
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
    this.play2 = video('my-video2', {
      loop: true,
      controls: false
    });
    this.play3 = video('my-video3', {
      loop: true,
      controls: false
    });
  }

  clickButton(offset: any) {
    if (offset === 2) {
      this.play1.play();
      this.initialVideo();
    }
    if (offset === 3) {
      this.play1.pause();
      this.play2.play();
      (this.viewModel as any).showVideo2 = true;
      setTimeout(()=>{
        (this.viewModel as any).showVideo3 = false;
      },100);
      this.initialVideo();
    }
    if (offset === 4) {
      this.play1.pause();
      this.play3.play();
      (this.viewModel as any).showVideo3 = true;
      setTimeout(()=>{
        (this.viewModel as any).showVideo2 = false;
      },100);
      this.initialVideo();
    }
  }

  // 让视频回到初始状态
  initialVideo() {
    this.play1.currentTime(0);
    this.play2.currentTime(0);
    this.play3.currentTime(0);
  }

  reset(): void {
    (this.viewModel as any).reset();
  }
}
