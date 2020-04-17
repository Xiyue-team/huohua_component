import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {

  title1: '';
  title2: '';
  rightAngleTitle: '';
  paramTitle: '';
  descTopTitle: '';
  descBottomTitle: '';
  isMobile: any;

  created() {
    this.title1 = window.env.browserInfo.lang.title1;
    this.title2 = window.env.browserInfo.lang.title2;
    this.rightAngleTitle = window.env.browserInfo.lang.rightAngleTitle;
    this.paramTitle = window.env.browserInfo.lang.paramTitle;
    this.descTopTitle = window.env.browserInfo.lang.descTopTitle;
    this.descBottomTitle = window.env.browserInfo.lang.descBottomTitle;
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
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
    if (window.env.browserInfo.isIpad) {
      (document.getElementsByClassName('descText')[0] as any).style.top = '35%';
      (document.getElementsByClassName('textImage')[0] as any).style.top = '55%';
    }
    ViewController.getInstance().domReady();
  }
}
