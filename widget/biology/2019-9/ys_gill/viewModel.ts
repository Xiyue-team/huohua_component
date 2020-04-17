import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import video from 'video.js';
const viewOptionConfig = require('./meta.json');
import * as video_start_posterImg from './sub_static/video_start_poster.png';
import * as videoCoverImg from './sub_static/videoCoverImg.png';
@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  showPlayButton = false;
  videoActive_end = false;
  myVideo: any = [];
  videoOnePoster = video_start_posterImg;
  videoTwoPoster = videoCoverImg;

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
    if (window.env.browserInfo.os === 'iOS') {
      (document.getElementsByClassName('background_style')[0] as HTMLElement).style.backgroundColor = '#474547';
    } else if (window.env.browserInfo.os === 'Mac OS X') {
      (document.getElementsByClassName('background_style')[0] as HTMLElement).style.backgroundColor = '#514f4f';
    } else {
      (document.getElementsByClassName('background_style')[0] as HTMLElement).style.backgroundColor = '#484547';
    }
    this.myVideo[0] = video('tongueVideo', {
      loop: true,
      controls: false,
    });

    this.myVideo[1] = video('ys_endVideo', {
      loop: true,
      controls: false,
    });
  }

  playVideo() {
    this.myVideo[1].load();
    this.myVideo[1].play();
  }

  resetEvent() {
    (document.getElementsByClassName('videoBox')[0] as HTMLElement).style.opacity = '1';
    (document.getElementsByClassName('gill_mask_class')[0] as HTMLElement).style.opacity = '1';
    this.myVideo[0].load();
    this.myVideo[0].play();
    this.videoActive_end = false;
    this.myVideo[1].currentTime(0);
  }
}
