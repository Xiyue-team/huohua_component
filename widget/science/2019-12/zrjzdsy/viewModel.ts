import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import video from 'video.js';
import * as playImage from './sub_static/play.png';
import * as stopImage from './sub_static/stop.png';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  myPlayer: any;
  play = playImage;
  stop = stopImage;
  isPlay1 = false;
  isPlay2 = false;
  isPlay3 = false;
  isPlay4 = false;
  isPlay5 = false;
  cicada: any;
  bird: any;
  duck: any;
  fish: any;
  frog: any;
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
    this.myPlayer = video('my-video', {
      loop: true,
      controls: false,
    });
    ViewController.getInstance().domReady();
    this.cicada = document.getElementById('cicada');
    this.bird = document.getElementById('bird');
    this.duck = document.getElementById('duck');
    this.fish = document.getElementById('fish');
    this.frog = document.getElementById('frog');
  }

  playEvent1() {
    this.isPlay1 = !this.isPlay1;
    this.isPlay2 = false;
    this.isPlay3 = false;
    this.isPlay4 = false;
    this.isPlay5 = false;
    this.pauseAll();
    if (this.isPlay1) {
      this.cicada.play();
    } else {
      this.cicada.pause();
    }

  }
  playEvent2() {
    this.isPlay2 = !this.isPlay2;
    this.isPlay1 = false;
    this.isPlay3 = false;
    this.isPlay4 = false;
    this.isPlay5 = false;
    this.pauseAll();
    if (this.isPlay2) {
      this.bird.play();
    } else {
      this.bird.pause();
    }

  }
  playEvent3() {
    this.isPlay3 = !this.isPlay3;
    this.isPlay2 = false;
    this.isPlay1 = false;
    this.isPlay4 = false;
    this.isPlay5 = false;
    this.pauseAll();
    if (this.isPlay3) {
      this.fish.play();
    } else {
      this.fish.pause();
    }
  }
  playEvent4() {
    this.isPlay4 = !this.isPlay4;
    this.isPlay2 = false;
    this.isPlay3 = false;
    this.isPlay1 = false;
    this.isPlay5 = false;
    this.pauseAll();
    if (this.isPlay4) {
      this.duck.play();
    } else {
      this.duck.pause();
    }
  }
  playEvent5() {
    this.isPlay5 = !this.isPlay5;
    this.isPlay2 = false;
    this.isPlay3 = false;
    this.isPlay4 = false;
    this.isPlay1 = false;
    this.pauseAll();
    if (this.isPlay5) {
      this.frog.play();
    } else {
      this.frog.pause();
    }
  }

  pauseAll() {
    this.cicada.pause();
    this.bird.pause();
    this.duck.pause();
    this.fish.pause();
    this.frog.pause();
  }

}
