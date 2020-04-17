import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import video from 'video.js';
import { setTimeout } from 'timers';

export class MyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  play2: any;
  time1: any;
  num: any;

  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.play1 = video('icon1', {
      loop: true,
      autoplay: true
    });
    this.play1.load();
    this.play2 = video('icon2', {
      loop: true,
      autoplay: true
    });
    this.play2.load();
  }
  getChange1(offset: any) {
    if (offset === 2) {
      document.getElementById('video2').style.zIndex = '1';
      document.getElementById('video1').style.zIndex = '5';
      (this.viewModel as any).active1 = 2;
      this.initialVideo(this.play1);
      clearTimeout(this.time1);
      this.play1.play();
    } else if (offset === 4) {
      (this.viewModel as any).active1 = 4;
      document.getElementById('video1').style.zIndex = '1';
      document.getElementById('video2').style.zIndex = '5';
      this.initialVideo(this.play2);
      clearTimeout(this.time1);
      this.play2.play();
    }
  }
  initialVideo(myVideo: any) {
    myVideo.pause();
    myVideo.currentTime(0);
  }
  //重置
  reset(): void {
    document.getElementById('video1').style.zIndex = '1';
    document.getElementById('video2').style.zIndex = '1';
    clearTimeout(this.time1);
    (this.viewModel as any).active1 = 1;
    (this.viewModel as any).active2 = 1;
    (this.viewModel as any).isChecked = false;
    this.play1 = video('icon1', {
      loop: true,
    });
    this.play1.load();
  }
}
