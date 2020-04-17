import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
const video = require('video.js/dist/video.js');
@Component
export class ViewModel extends Vue {
  //国际化
  title = (window as any).env.browserInfo.lang.title;
  videoActive = true;
  imageActive = false;
  isOriginal = true;
  myVideo: any;

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
      loop: true,
      controls: false,
    });

    (document.querySelector('.hitCircle') as any).style.height = window.innerWidth * 0.015 + 'px';
    (document.querySelector('.hitCircle') as any).style.top = window.innerHeight * 0.506 - (window.innerWidth * 0.015 / 2) + 'px';
  }

  startEvent() {
    this.imageActive = true;
    this.videoActive = false;
    (this as any).$refs.icon.src = require('./sub_static/video/microGill.mp4');
    (window as any).viewHandler.gill.setFishAniamtion();
  }

  //切换视频
  changeVideo() {
    this.videoActive = true;
    this.isOriginal = false;
    this.myVideo.play();
  }

  resetEvent() {
    (this as any).$refs.icon.src = require('./sub_static/video/gill.mp4');
    this.myVideo.pause();
    this.myVideo.currentTime(0);
    this.myVideo.play();
    this.videoActive = true;
    this.imageActive = false;
    this.isOriginal = true;
  }

}
