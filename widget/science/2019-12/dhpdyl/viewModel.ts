import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ZjzbViewHandler} from './services/ZjzbViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  imgArray: any = [];
  diaphragm_movement = {
    showSlider: false,
    animationName: 'diaphragm_movement_animation',
    sliderIsDisable: true,
    width: window.innerWidth,
    height: window.innerHeight
  };
  isEnd = false;
  animationIndex = 0;
  once_clickColor = false;
  continuous_playColor = false;
  isEndFlag = false;
  disableBtn = false;

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

    if (window.env.browserInfo.browser === 'Safari' && window.env.browserInfo.os === 'Mac OS X' && window.env.browserInfo.isPc) {

      (this.diaphragm_movement as any).zipUrl = require('./sub_static/animation.zip');
      (this.diaphragm_movement as any).imageNum = 25;

    } else {

      (this.diaphragm_movement as any).image = this.imgArray;
      (this.diaphragm_movement as any).timeLineLength = 25;
    }
  }

  mounted() {
    for (let i = 0; i < 25; i++) {
      const img = require(`./sub_static/image/${i + 1}.png`);
      this.imgArray.push(img);
    }
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  //单击播放一张
  click_once_event() {
    if ((this.$refs.diaphragmMovement as any).animationIndex < 24) {
      (this.$refs.diaphragmMovement as any).animationIndex += 1;
    }
  }

  //连续播放
  continuous_play_event() {
    this.disableBtn = true;
    if (!this.isEnd) {
      this.continuous_playColor = true;
      (this.$refs.diaphragmMovement as any).play();
    }
  }

  @Watch('animationIndex')
  checkAnimationIndex(value: number) {
    if (value > 23) {
      this.isEndFlag = true;
      this.disableBtn = true;
    }
  }
}
