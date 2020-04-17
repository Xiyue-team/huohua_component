import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import * as imgSt from '../sub_static/UI/st.png';
import  video from 'video.js';
// const video = require('video.js/dist/video.js');
export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;


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

  }

  //点击热点按钮触发视频
  getEvent1() {
       // (this.viewModel as any).isshow1 = true;
       // this.play1.currentTime(0);
  }


  //点击播放按钮触发函数
  getChange1() {
    const thiz = this;
    (this.viewModel as any).showPlay = false;
       this.play1.play();
       this.play1.currentTime(0);
      //动画结束
      this.play1.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
  }


  // 重置
  reset() {
    (this.viewModel as any).allStyle();
    (this.viewModel as any).isshow1 = false;
    (this.viewModel as any).msg1 = false;
    (this.viewModel as any).msg2 = false;
    (this.viewModel as any).msg3 = false;
    (this.viewModel as any).msg4 = false;
    (this.viewModel as any).msg5 = false;
    (this.viewModel as any).msg6 = false;
    (this.viewModel as any).msg7 = false;
    (this.viewModel as any).startImg = imgSt;
    this.play1.currentTime(0);
    this.play1.pause();
  }
}
