import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { ZjzbViewHandler } from './services/ZjzbViewHandler';
const viewOptionConfig = require('./meta.json');
const video = require('video.js/dist/video.js');

@Component
export class ViewModel extends Vue {

  title = window.env.browserInfo.lang.title;
  showPlayButton = false;
  active1 = false;
  myVideo: any;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new ZjzbViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    this.myVideo = video('my-video1', {
      loop: false,
      controls: false
    });
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  /*播放视频*/
  playVideo() {
    this.showPlayButton = false;
    this.myVideo.load();
    this.myVideo.play();
    this.detectVideoEnd(this.myVideo);
  }

  /*停止视频*/
  stopVideo() {
    this.myVideo.pause();
    this.myVideo.currentTime(0);
  }

  /*检测视频播放完毕*/
  detectVideoEnd(mVideo: any) {
    mVideo.on('ended', () => {
      this.showPlayButton = true;
    });
  }

  /*切换视频及封面图*/
  changeVideoAndPoster() {
    this.stopVideo();
    this.showPlayButton = true;
    switch ((ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.clickNumber) {
      case 1:
        this.myVideo.src(require('./sub_static/video/melt.mp4'));
        this.myVideo.poster(require('./sub_static/meltPoster.png'));
      break;
      case 2:
        this.myVideo.src(require('./sub_static/video/solidificate.mp4'));
        this.myVideo.poster(require('./sub_static/solidificatePoster.png'));
        break;
      case 3:
        this.myVideo.src(require('./sub_static/video/sublimate.mp4'));
        this.myVideo.poster(require('./sub_static/sublimatePoster.png'));
        break;
      case 4:
        this.myVideo.src(require('./sub_static/video/condensed.mp4'));
        this.myVideo.poster(require('./sub_static/condensedPoster.png'));
        break;
      case 5:
        this.myVideo.src(require('./sub_static/video/evaporate.mp4'));
        this.myVideo.poster(require('./sub_static/evaporatePoster.png'));
        break;
      case 6:
        this.myVideo.src(require('./sub_static/video/liquefact.mp4'));
        this.myVideo.poster(require('./sub_static/liquefactPoster.png'));
        break;
    }
  }
}
