import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonText;
  isShow = false;
  isActive = false;

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
  }

  resetEvent() {
    this.isShow = false;
    this.isActive = false;
  }

  buttonEvent() {
    this.isActive = true;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).chairModel.showAnswer();
  }

}
