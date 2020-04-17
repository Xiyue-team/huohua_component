import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import {Watch} from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  isActive = false;
  clickNumber = true;
  isActive2 = false;
  clickNumber2 = true;

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
    this.isActive = false;
    this.clickNumber = true;

    this.isActive2 = false;
    this.clickNumber2 = true;

    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showExplainText1(this.isActive);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showExplainText2(this.isActive2);
  }

  maximumValueEvent() {
    console.log(this.isActive);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showExplainText1(this.isActive);
  }

  maxValueEvent() {
    console.log(this.isActive2);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showExplainText2(this.isActive2);
  }
}
