import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
import * as glassBallImg from './sub_static/glassBall.png';
import * as steelBallImg from './sub_static/steelBall.png';
import * as bowlImg from './sub_static/bowl.png';
import * as playImg from './sub_static/play.png';
import * as stopImg from './sub_static/stop.png';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  materialImage = [glassBallImg, bowlImg, steelBallImg];
  play = [playImg, stopImg];
  isPlay = false;
  isShowTips = true;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {

  }

  playAnimation() {
    this.isShowTips = false;
    this.isPlay = !this.isPlay;
    if (this.isPlay) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.play();
      return;
    }
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.stop();
  }

  leftGlassBall() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('left', 0);
  }

  leftBowl() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('left', 1);
  }

  leftSteeBall() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('left', 2);
  }

  rightGlassBall() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('right', 0);
  }

  rightBowl() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('right', 1);
  }

  rightSteeBall() {
    this.isShowTips = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('right', 2);
  }

  reset() {
    this.isPlay = false;
    this.isShowTips = true;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.stop();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('right', 0);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setMaterialBall('left', 0);
  }
}
