import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {GgphViewHandler} from './services/GgphViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  title = window.env.browserInfo.lang.title;
  powerArm = false;
  resistanceArm = false;
  powerArmTitle = window.env.browserInfo.lang.powerArmTitle;
  resistanceArmTitle = window.env.browserInfo.lang.resistanceArmTitle;
  formulaTitle = window.env.browserInfo.lang.formulaTitle;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new GgphViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    if (window.env.browserInfo.isSmallDevice) {
      (document.getElementsByClassName('title_text')[0] as any).style.fontSize = '18px';
      (document.getElementsByClassName('title_text')[0] as any).style.left = '24px';
      (document.getElementsByClassName('title_text')[0] as any).style.top = '24px';
      (document.getElementsByClassName('formulaText')[0] as any).style.fontSize = '16px';
      (document.getElementsByClassName('formulaText')[0] as any).style.left = '24px';
      (document.getElementsByClassName('formulaText')[0] as any).style.top = '60px';
    }
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  @Watch('powerArm')
  turnOnOrOffPowerArm(value: boolean) {
    (ViewController.getInstance().viewHandler as GgphViewHandler).ggph3dModel.showOrHidePowerArmLines(value);
  }

  @Watch('resistanceArm')
  turnOnOrOffResistanceArm(value: boolean) {
    (ViewController.getInstance().viewHandler as GgphViewHandler).ggph3dModel.showOrHideResistanceArmLines(value);
    if (Number.parseInt(((ViewController.getInstance().viewHandler as GgphViewHandler).ggph3dModel.
      sliderControlerLine.angle * 180 / Math.PI + 90).toFixed(0)) <= 100) {
      (ViewController.getInstance().viewHandler as GgphViewHandler).ggph3dModel.verticalMoveSymbol.rotation.z = Math.PI / 2;
    }
  }
}
