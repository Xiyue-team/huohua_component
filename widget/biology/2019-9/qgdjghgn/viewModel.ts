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
  lang = window.env.browserInfo.lang;
  showPlayButton = false;
  videoActive_start = false;
  myVideo: any;
  videoPoster = videoCoverImg;

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
    if (navigator.userAgent.search('MI 5X') !== -1 && window.env.browserInfo.isHuohuaApp) {
      (document.getElementsByClassName('video_annotationText')[0] as HTMLElement).style.left = '60px';
    }
    ViewController.getInstance().domReady();
    this.myVideo = video('tongueVideo', {
      loop: true,
      controls: false,
    });
  }

  playVideo() {
    this.myVideo.load();
    this.myVideo.play();
  }

  resetEvent() {
    this.videoActive_start = false;
    this.myVideo.pause();
    this.myVideo.currentTime(0);
  }
}
