import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import video from 'video.js';
import * as videoImage1 from './sub_static/videoImage1.jpg';
import * as videoImage2 from './sub_static/videoImage2.jpg';
import * as videoImage3 from './sub_static/videoImage3.jpg';
import * as videoImage4 from './sub_static/videoImage5.jpg';
import * as videoImage5 from './sub_static/videoImage4.jpg';

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  vedioTitle: any;
  vedioTip: any;
  video_poster1: any = videoImage1;
  video_poster2: any = videoImage2;
  video_poster3: any = videoImage3;
  video_poster4: any = videoImage4;
  video_poster5: any = videoImage5;
  button1Active = false;
  button2Active = false;
  button3Active = false;
  button4Active = false;
  button5Active = false;

  videoActive1 = false;
  videoActive2 = false;
  videoActive3 = false;
  videoActive4 = false;
  videoActive5 = false;

  myPlayer1: any;
  myPlayer2: any;
  myPlayer3: any;
  myPlayer4: any;
  myPlayer5: any;

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
    this.myPlayer1 = video('my-video1', {
      loop: false,
      controls: false,
    });
    this.myPlayer2 = video('my-video2', {
      loop: false,
      controls: false,
    });
    this.myPlayer3 = video('my-video3', {
      loop: false,
      controls: false,
    });
    this.myPlayer4 = video('my-video4', {
      loop: false,
      controls: false,
    });
    this.myPlayer5 = video('my-video5', {
      loop: false,
      controls: false,
    });
    ViewController.getInstance().domReady();
    this.vedioTitle = document.getElementsByClassName('wscllc_vedio_title')[0];
    this.vedioTip = document.getElementsByClassName('wscllc_vedioTips')[0];
  }

  resetEvent() {

  }

  button1Event() {
    if (this.button1Active !== true) {
      this.button1Active = true;
    }
    this.hideVideo();
    this.videoActive1 = true;
    this.myPlayer1.play();
  }
  button2Event() {
    if (this.button2Active !== true) {
      this.button2Active = true;
    }
    this.hideVideo();
    this.videoActive2 = true;
    this.myPlayer2.play();
  }
  button3Event() {
    if (this.button3Active !== true) {
      this.button3Active = true;
    }
    this.hideVideo();
    this.videoActive3 = true;
    this.myPlayer3.play();
  }
  button4Event() {
    if (this.button4Active !== true) {
      this.button4Active = true;
    }
    this.hideVideo();
    this.videoActive4 = true;
    this.myPlayer4.play();
  }
  button5Event() {
    if (this.button5Active !== true) {
      this.button5Active = true;
    }
    this.hideVideo();
    this.videoActive5 = true;
    this.myPlayer5.play();
  }

  hideVideo () {
    this.videoActive1 = false;
    this.videoActive2 = false;
    this.videoActive3 = false;
    this.videoActive4 = false;
    this.videoActive5 = false;
  }

  resetVideo() {
    this.myPlayer1.pause();
    this.myPlayer1.currentTime(0);
    this.myPlayer2.pause();
    this.myPlayer2.currentTime(0);
    this.myPlayer3.pause();
    this.myPlayer3.currentTime(0);
    this.myPlayer4.pause();
    this.myPlayer4.currentTime(0);
    this.myPlayer5.pause();
    this.myPlayer5.currentTime(0);
  }
}

