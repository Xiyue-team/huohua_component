import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
const video = require('video.js/dist/video.js');
export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
    //data
    play1: any;
    play2: any;
    play3: any;
    play4: any;
    play5: any;
    play6: any;
    play7: any;
    play8: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.play1 = video('my-video1', {
          loop: false,
          controls: true,
        });
        this.play2 = video('my-video2', {
          loop: false,
          controls: true,
        });
        this.play3 = video('my-video3', {
          loop: false,
          controls: true,
        });
      this.play4 = video('my-video4', {
        loop: false,
        controls: true,
      });
       this.play5 = video('my-video5', {
        loop: false,
         controls: true,
       });
       this.play6 = video('my-video6', {
        loop: false,
         controls: true,
       });
      this.play7 = video('my-video7', {
        loop: false,
        controls: true,
      });
      this.play8 = video('my-video8', {
        loop: false,
        controls: true,
      });
    }
   //点击切换视频
    getEvent1(offset: any) {
      (this.viewModel as any).showVideo = true;
        if (offset === 1 ) {
          this.buttonEvent((this.viewModel as any).active1, this.play1);
          (this.viewModel as any).active1 = true;
        }
       if (offset === 2) {
         this.buttonEvent((this.viewModel as any).active2, this.play2);
         (this.viewModel as any).active2 = true;
        }
        if (offset === 3) {
          this.buttonEvent((this.viewModel as any).active3, this.play3);
          (this.viewModel as any).active3 = true;
        }
        if (offset === 4) {
          this.buttonEvent((this.viewModel as any).active4, this.play4);
          (this.viewModel as any).active4 = true;
        }
       if (offset === 5) {
        this.buttonEvent((this.viewModel as any).active5, this.play5);
        (this.viewModel as any).active5 = true;
       }
        if (offset === 6) {
          this.buttonEvent((this.viewModel as any).active6, this.play6);
          (this.viewModel as any).active6 = true;
        }
        if (offset === 7) {
          this.buttonEvent((this.viewModel as any).active7, this.play7);
          (this.viewModel as any).active7 = true;
        }
        if (offset === 8) {
          this.buttonEvent((this.viewModel as any).active8, this.play8);
          (this.viewModel as any).active8 = true;
        }
    }
  // 点击不同按钮触发的事件函数
  buttonEvent(act: any, play: any) {
    if (act === true) {
      return;
    }
    play.load();
    play.play();

  }
  //点击按钮关闭视频
  getChange1(offset: any) {
    (this.viewModel as any).showVideo = false;
    if (offset === 1 ) {
      this.play1.pause();
      (this.viewModel as any).active1 = false;
    }
    if (offset === 2) {
      this.play2.pause();
      (this.viewModel as any).active2 = false;
    }
    if (offset === 3) {
      this.play3.pause();
      (this.viewModel as any).active3 = false;
    }
    if (offset === 4) {
      this.play4.pause();
      (this.viewModel as any).active4 = false;
    }
    if (offset === 5) {
      this.play5.pause();
      (this.viewModel as any).active5 = false;
    }
    if (offset === 6) {
      this.play6.pause();
      (this.viewModel as any).active6 = false;
    }
    if (offset === 7) {
      this.play7.pause();
      (this.viewModel as any).active7 = false;
    }
    if (offset === 8) {
      this.play8.pause();
      (this.viewModel as any).active8 = false;
    }
  }

}
