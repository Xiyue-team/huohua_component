import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  definition = '定义';
  axis = '直角坐标系';
  calculationFormula = '计算公式';

  definitionActived = false;
  axisActived = false;
  calculationFormulaActived = false;
  isMobile: boolean;
  isIpad: boolean;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    this.isIpad = (window as any)['env'].browserInfo.isIpad;
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  //定义按钮事件
  definitionEvent() {
    this.definitionActived = !this.definitionActived;
  }

  //直角坐标系按钮事件
  axisEvent() {
    this.axisActived = !this.axisActived;
    (ViewController.getInstance().viewHandler as any).three3dModel.isShowAxis(this.axisActived);
  }

  //计算公式按钮事件
  calculationFormulaEvent() {
    this.calculationFormulaActived = !this.calculationFormulaActived;
  }

  resetEvent() {

  }

}
