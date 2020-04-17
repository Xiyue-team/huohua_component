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
  play4: any;
  play5: any;
  play6: any;

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
    this.play3 = video('my-video3', {
      loop: false,
      controls: false
    });
    this.play4 = video('my-video4', {
      loop: false,
      controls: false
    });
    this.play5 = video('my-video5', {
      loop: false,
      controls: false
    });
    this.play6 = video('my-video6', {
      loop: false,
      controls: false
    });
  }

  //点击热点按钮触发视频
  getEvent1(offset: any) {
    const thiz = this;
    (this.viewModel as any).showPlay = false;
    if (offset === 1) {
      this.play1.play();
      this.play2.pause();
      this.play3.pause();
      this.play4.pause();
      this.play5.pause();
      this.play6.pause();
      this.initialVideo();
      //动画结束
      this.play1.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 2) {
      this.play2.play();
      this.play1.pause();
      this.play3.pause();
      this.play4.pause();
      this.play5.pause();
      this.play6.pause();
      this.initialVideo();
      //动画结束
      this.play2.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 3) {
      this.play3.play();
      this.play2.pause();
      this.play1.pause();
      this.play4.pause();
      this.play5.pause();
      this.play6.pause();
      this.initialVideo();
      //动画结束
      this.play3.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 4) {
      this.play4.play();
      this.play1.pause();
      this.play3.pause();
      this.play2.pause();
      this.play5.pause();
      this.play6.pause();
      this.initialVideo();
      //动画结束
      this.play4.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 5) {
      this.play5.play();
      this.play1.pause();
      this.play3.pause();
      this.play4.pause();
      this.play2.pause();
      this.play6.pause();
      this.initialVideo();
      //动画结束
      this.play5.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 6) {
      this.play6.play();
      this.play1.pause();
      this.play3.pause();
      this.play4.pause();
      this.play5.pause();
      this.play2.pause();
      this.initialVideo();
      //动画结束
      this.play6.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
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

  //点击播放按钮触发函数
  getChange1(offset: any) {
    const thiz = this;
    (this.viewModel as any).showPlay = false;
    if (offset === 1) {
      this.play1.play();
      //动画结束
      this.play1.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 2) {
      this.play2.play();
      //动画结束
      this.play2.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 3) {
      this.play3.play();
      //动画结束
      this.play3.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 4) {
      this.play4.play();
      //动画结束
      this.play4.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 5) {
      this.play5.play();
      //动画结束
      this.play5.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    } else if (offset === 6) {
      this.play6.play();
      //动画结束
      this.play6.on('ended', function() {
        (thiz.viewModel as any).showPlay = true;
      });
    }
  }

  // 让视频回到初始状态
  initialVideo(){
    this.play1.currentTime(0);
    this.play2.currentTime(0);
    this.play3.currentTime(0);
    this.play4.currentTime(0);
    this.play5.currentTime(0);
    this.play6.currentTime(0);
  }

  // 重置
  reset() {
    (this.viewModel as any).allStyle();
    (this.viewModel as any).msg1 = false;
    (this.viewModel as any).msg2 = false;
    (this.viewModel as any).msg3 = false;
    (this.viewModel as any).msg4 = false;
    (this.viewModel as any).msg5 = false;
    (this.viewModel as any).msg6 = false;
    (this.viewModel as any).isshow1 = false;
    (this.viewModel as any).isshow2 = false;
    (this.viewModel as any).isshow3 = false;
    (this.viewModel as any).isshow4 = false;
    (this.viewModel as any).isshow5 = false;
    (this.viewModel as any).isshow6 = false;
  }
}
