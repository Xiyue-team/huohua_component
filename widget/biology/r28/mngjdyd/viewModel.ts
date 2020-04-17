import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ZjzbViewHandler} from './services/ZjzbViewHandler';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  imgArray: any = [];
  diaphragm_movement = {
    showSlider: false,
    animationName: 'diaphragm_movement_animation',
    sliderIsDisable: true,
    width: 409.6,
    height: 805.6
  };
  isEnd = false;
  show_label_one = true;
  moveTips_title = '';
  move_tips_show = false;
  tips_show = true;

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
      (this.diaphragm_movement as any).imageNum = 26;

    } else {

      (this.diaphragm_movement as any).image = this.imgArray;
      (this.diaphragm_movement as any).timeLineLength = 26;
    }
  }

  mounted() {
    for (let i = 0; i < 26; i++) {
      const img = require(`./sub_static/images/${i + 1}.png`);
      this.imgArray.push(img);
    }
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }
}
