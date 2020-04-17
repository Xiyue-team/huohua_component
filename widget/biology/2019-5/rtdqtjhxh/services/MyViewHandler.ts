import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
const video = require('video.js/dist/video.js');
import { setTimeout } from 'timers';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  time1: any;
  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.play1 = video('icon1', {
      autoplay: false,
      loop: false,
      controls :true,
    });
    this.play1.load();
    this.play1.on("ready",()=>{
      this.play1.play();
    })
  
  }
  getChange1(offset: any) {
    if (offset === 2) {
        (this as any).viewModel.$refs.icon.src = require("../sub_static/UI/2.mp4");
      (this.viewModel as any).active1=2;
      this.play1.loop = false;
      this.play1.load();
      this.play1.play();
    } else if (offset === 4) {
      (this as any).viewModel.$refs.icon.src = require("../sub_static/UI/3.mp4");
      (this.viewModel as any).active1=4;
      this.play1.load();
      this.play1.play();
    } else if (offset === 6) {
      (this as any).viewModel.$refs.icon.src = require("../sub_static/UI/4.mp4");
      (this.viewModel as any).active1=6;
      clearTimeout(this.time1);
      this.play1.load();
      this.play1.play();
    }
  }
  //重置
  reset(): void {
    
    clearTimeout(this.time1);
    (this.viewModel as any).active1 = 1;
    (this as any).viewModel.$refs.icon.src = require("../sub_static/UI/1.mp4");
    this.play1 = video('icon1', {
      autoplay: false,
      loop: true,
    });
    this.play1.load();
    this.play1.play();
  }
}
