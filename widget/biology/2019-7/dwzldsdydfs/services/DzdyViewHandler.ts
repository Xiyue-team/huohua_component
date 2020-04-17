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

  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.play1 = video('my-video1', {
      loop: false,
      controls: true
    });
  }
  //点击切换视频
  getEvent1(offset: any) {
    (this.viewModel as any).ishave = offset;
    (this.viewModel as any).active1 = true;
    if (offset === 0) {
      if ((this.viewModel as any).msg1) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          (document.getElementById('sourceId') as any).src = require('../sub_static/Video/11_1.mp4');
          this.play1.src(require('../sub_static/Video/11_1.mp4'));
        } else {
          (this as any).viewModel.$refs.icon.src = require('../sub_static/Video/11_1.mp4');
        }
          this.play1.load();
          this.play1.play();
        (this.viewModel as any).msg1 = false;
        (this.viewModel as any).msg2 = true;
        (this.viewModel as any).msg3 = true;
        (this.viewModel as any).msg4 = true;
      }
    }
    if (offset === 1) {
      if ((this.viewModel as any).msg2) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src(require('../sub_static/Video/12_1.mp4'));
        } else {
          (this as any).viewModel.$refs.icon.src = require('../sub_static/Video/12_1.mp4');
        }
        (this.viewModel as any).msg2 = false;
        (this.viewModel as any).msg1 = true;
        (this.viewModel as any).msg3 = true;
        (this.viewModel as any).msg4 = true;
        this.play1.load();
        this.play1.play();
      }
    }
    if (offset === 2) {
      if ((this.viewModel as any).msg3) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src(require('../sub_static/Video/13_1.mp4'));
        } else {
          (this as any).viewModel.$refs.icon.src = require('../sub_static/Video/13_1.mp4');
        }
        this.play1.load();
        this.play1.play();
        (this.viewModel as any).msg3 = false;
        (this.viewModel as any).msg1 = true;
        (this.viewModel as any).msg2 = true;
        (this.viewModel as any).msg4 = true;
      }
    }
    if (offset === 3) {
      if ((this.viewModel as any).msg4) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src(require('../sub_static/Video/14_1.mp4'));
        } else {
          (this as any).viewModel.$refs.icon.src = require('../sub_static/Video/14_1.mp4');
        }
        this.play1.load();
        this.play1.play();
        (this.viewModel as any).msg4 = false;
        (this.viewModel as any).msg1 = true;
        (this.viewModel as any).msg3 = true;
        (this.viewModel as any).msg2 = true;
      }
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
  //统一样式
  allStyle() {
    (this.viewModel as any).msg1 = true;
    (this.viewModel as any).msg2 = true;
    (this.viewModel as any).msg3 = true;
    (this.viewModel as any).msg4 = true;
  }
  // 重置
  reset() {
    (this.viewModel as any).ishave = 4;
    (this.viewModel as any).showBj = true;
    this.allStyle();
    (this.viewModel as any).active1 = false;
  }
}
