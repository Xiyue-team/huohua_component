import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import video from 'video.js';
const viewOptionConfig = require('./meta.json');
import * as videoCoverImg from './sub_static/videoCoverImg.png';
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  showPlayButton = false;
  videoActive = false;
  myVideo: any;
  video_coverImg = videoCoverImg;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.myVideo = video('tongueVideo', {
      loop: false,
      controls: false,
    });
  }

  playVideo() {
    this.showPlayButton = false;
    this.myVideo.play();
    this.detectVideoEnd(this.myVideo);
  }

  /*检测视频播放完毕*/
  detectVideoEnd(videoElement: any) {
    videoElement.on('ended', () => {
      this.showPlayButton = true;
    });
  }

  resetEvent() {
    this.showPlayButton = false;
    this.videoActive = false;
    this.myVideo.pause();
    this.myVideo.currentTime(0);
  }

}
