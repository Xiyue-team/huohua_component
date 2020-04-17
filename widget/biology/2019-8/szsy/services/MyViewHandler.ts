import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
const video = require('video.js/dist/video.js');
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  play2: any;
  play3: any;
  time1: any;
  num: any;
  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.play1 = video('icon1', {
      loop: false,
      autoplay: false,
    });
    this.play2 = video('icon2', {
      loop: false,
      autoplay: false,
    });
    this.play3 = video('icon3', {
      loop: false,
      autoplay: false,
    });
    this.reset1();
  }
  getChange1(offset: any) {
    const thiz = this;
    this.reset1();
    if (offset === 1) {
      document.getElementById("videobox1").style.zIndex = "3";
      document.getElementById("videobox2").style.zIndex = "1";
      document.getElementById("videobox3").style.zIndex = "1";
      (this.viewModel as any).active = 1;
      (this.viewModel as any).showPlay = false;
      this.play1.loop = false;
      this.play1.load();
      this.play1.play();
      this.play1.on('ended', function () {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 2) {
      document.getElementById("videobox2").style.zIndex = "3";
      document.getElementById("videobox3").style.zIndex = "1";
      document.getElementById("videobox1").style.zIndex = "1";
      (this.viewModel as any).active = 2;
      (this.viewModel as any).showPlay = false;
      this.play2.load();
      this.play2.play();
      this.play2.on('ended', function () {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 3) {
      document.getElementById("videobox3").style.zIndex = "3";
      document.getElementById("videobox1").style.zIndex = "1";
      document.getElementById("videobox2").style.zIndex = "1";
      (this.viewModel as any).active = 3;
      (this.viewModel as any).showPlay = false;
      this.play3.load();
      this.play3.play();
      this.play3.on('ended', function () {
        (thiz.viewModel as any).showPlay = true;
      });
    }
  }
  getplay1() {
    const thiz = this;
    (this.viewModel as any).showPlay = false;
    this.play1.play();
    this.play1.on('ended', function () {
      (thiz.viewModel as any).showPlay = true;
    });
    this.play2.play();
    this.play2.on('ended', function () {
      (thiz.viewModel as any).showPlay = true;
    });
    this.play3.play();
    this.play3.on('ended', function () {
      (thiz.viewModel as any).showPlay = true;
    });
  }
  // 视频重置
  reset1() {
    this.play1.pause()
    this.play1.currentTime(0);
    this.play2.pause()
    this.play2.currentTime(0);
    this.play3.pause()
    this.play3.currentTime(0);
  }
  //重置
  reset(): void {
    // clearTimeout(this.time1);
    this.reset1();
    (this.viewModel as any).active = 0;
    (this.viewModel as any).showPlay = false;
    this.play1 = video('icon1', {
      autoplay: false,
      loop: true,
    });
    this.play1.load();
    // this.play1.play();
    console.log(111);
  }
}
