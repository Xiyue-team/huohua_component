import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import video from 'video.js';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {

  lang = window.env.browserInfo.lang;
  epiglottisColor = false;
  voiceColor = false;
  activeVideo_one = false;
  activeVideo_two = false;
  show_label_one = true;
  show_label_two = true;
  showPlayButton = true;
  showCancelImg = false;
  show_throat_bg = false;
  throat_voice_text_show = true;
  myVideo: any = [];

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
    this.myVideo[0] = video('my-video1', {
      loop: true,
      controls: false,
    });

    this.myVideo[1] = video('my-video2', {
      loop: true,
      controls: false,
    });
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  /*会厌软骨运动*/
  epiglottisEvent() {
    this.voiceColor = false;
    if (this.epiglottisColor) {
      return ;
    }
    this.epiglottisColor = true;
    this.stopVideo(this.myVideo[1]);
    this.showCancelImg = false;
    this.show_throat_bg = false;
    this.activeVideo_two = false;
    this.show_label_one = false;
    this.activeVideo_one = true;
    this.myVideo[0].poster(require('./sub_static/video/bg_poster.png'));
    this.myVideo[0].load();
    this.myVideo[0].play();
  }

  /*声带振动*/
  voiceEvent() {
    this.epiglottisColor = false;
    if (this.voiceColor) {
      return ;
    }
    this.voiceColor = true;
    this.stopVideo(this.myVideo[0]);
    this.activeVideo_one = false;
    this.showPlayButton = true;
    this.show_throat_bg = true;
    this.showCancelImg = true;
    this.activeVideo_two = false;
    this.show_label_one = false;
    this.show_label_two = true;
  }

  /*取消事件*/
  cancelEvent() {
    this.voiceColor = false;
    this.stopVideo(this.myVideo[1]);
    this.showCancelImg = false;
    this.show_throat_bg = false;
    this.activeVideo_two = false;
    this.show_label_one = true;
  }

  /*播放视频*/
  playVideoEvent() {
    this.show_label_two = false;
    this.activeVideo_two = true;
    this.showPlayButton = false;
    this.myVideo[1].poster(require('./sub_static/video/throat_poster.png'));
    this.myVideo[1].load();
    this.myVideo[1].play();
    this.throat_voice_text_show = true;
  }

  /*停止视频*/
  stopVideo(mVideo: any) {
    mVideo.pause();
    mVideo.currentTime(0);
  }

  reset() {
    this.epiglottisColor = false;
    this.voiceColor = false;
    this.stopVideo(this.myVideo[0]);
    this.stopVideo(this.myVideo[1]);
    this.activeVideo_one = false;
    this.activeVideo_two = false;
    this.show_label_one = true;
    this.show_label_two = true;
    this.showPlayButton = true;
    this.showCancelImg = false;
    this.show_throat_bg = false;
    this.throat_voice_text_show = true;
  }
}
