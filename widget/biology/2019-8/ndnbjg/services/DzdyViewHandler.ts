import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import * as img3 from '../sub_static/UI/3.png';

const video = require('video.js/dist/video.js');

export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
  //data
  play1: any;
  play2: any;

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
  }

  clickButton(offset: any) {
    if (offset === 3) {
      this.initialVideo(this.play2);
      this.play1.play();
    }
    if (offset === 4) {
      this.initialVideo(this.play1);
      this.play2.play();
    }
  }
  // 让视频回到初始状态
  initialVideo(myVideo:any){
    myVideo.pause();
    myVideo.currentTime(0);
  }

  reset(): void {
    (this.viewModel as any).reset();
  }
}
