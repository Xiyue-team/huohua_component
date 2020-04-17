import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;
  leftOpenActive = false;
  rightOpenActive = false;
  conceptActive = false;
  isMobile: boolean;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    this.isMobile = window['env'].browserInfo.isSmallDevice;
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.leftOpenActive = false;
    this.rightOpenActive = false;
    this.conceptActive = false;
  }

  leftOpen() {
    this.leftOpenActive = !this.leftOpenActive;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setText(this.leftOpenActive , this.rightOpenActive);
  }
  rightOpen() {
    this.rightOpenActive = !this.rightOpenActive;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setText(this.leftOpenActive , this.rightOpenActive);
  }
  concept() {this.conceptActive = !this.conceptActive; }

}
