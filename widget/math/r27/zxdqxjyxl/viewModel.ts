import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { ZxqxjViewHandler } from './services/ZxqxjViewHandler';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  isMobile = window.env.browserInfo.isSmallDevice;
  isIpad = window.env.browserInfo.isIpad;

  titlAngleTitle = window.env.browserInfo.lang.tilt_AngleTitle;
  slopeTitle = window.env.browserInfo.lang.slopeTitle;
  relationShipTitle = window.env.browserInfo.lang.relationShipTitle;

  titlAngleColor = true;
  slopeColor = false;
  relationShipColor = false;
  showFormula = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new ZxqxjViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  /*倾斜角*/
  titlAngleEvent() {
    this.titlAngleColor = true;
    this.slopeColor = false;
    (ViewController.getInstance().viewHandler as ZxqxjViewHandler).zxqxj3dModel.thetaText.visible = true;
    (ViewController.getInstance().viewHandler as ZxqxjViewHandler).zxqxj3dModel.kText.visible = false;

  }

  /*斜率*/
  slopeEvent() {
    this.titlAngleColor = false;
    this.slopeColor = true;
    (ViewController.getInstance().viewHandler as ZxqxjViewHandler).zxqxj3dModel.thetaText.visible = false;
    (ViewController.getInstance().viewHandler as ZxqxjViewHandler).zxqxj3dModel.kText.visible = true;

  }

  /*倾斜角和斜率的关系*/
  relationShipEvent() {
    if (this.relationShipColor) {
      this.relationShipColor = false;
      this.showFormula = false;
    } else {
      this.relationShipColor = true;
      this.showFormula = true;
    }
  }
}
