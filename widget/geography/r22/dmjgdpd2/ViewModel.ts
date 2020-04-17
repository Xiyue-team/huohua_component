import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {DmViewHandler} from './services/DmViewHandler';
const videojs = require('video.js/dist/video.js');


@Component
export class ViewModel extends Vue {


  showBox = true;
  showVideoShowPage = false;

  currentIndex = 1;
  currentIndex2 = 0;

  videoJs: any;

  showVideo = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.showReset = false;
    viewOption.showMobileResetIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new DmViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  // 关闭视频区
  closeVideoDivCenter () {
    this.showBox = true;
    this.showVideoShowPage = false;
    this.showVideo = false;
    (ViewController.getInstance().viewHandler as any).dmCanvas.dmDrag.clearTimeOutEvent();
  }

}
