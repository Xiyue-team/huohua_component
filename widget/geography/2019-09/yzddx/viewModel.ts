import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  isShow3dContainer = true;

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

  clickReverse() {
    (ViewController.getInstance().viewHandler as any).rightCradCanvas.reverseAnim();
  }
}
