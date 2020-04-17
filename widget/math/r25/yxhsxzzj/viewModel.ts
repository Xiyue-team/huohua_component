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
  text = window.env.browserInfo.lang.text;
  domainActived = false;
  symmetryAxisActived = false;
  monotonicActived = false;
  symmetricCenterActived = false;
  parityActived = false;
  periodicActived = false;
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
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  //定义域按钮触发的方法
  domain() {
    this.domainActived = !this.domainActived;
    this.symmetryAxisActived = false;
    this.monotonicActived = false;
    this.symmetricCenterActived = false;
    this.parityActived = false;
    this.periodicActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.domainEvent(this.domainActived);
  }

  //对称轴按钮触发的方法
  symmetryAxis() {
    this.domainActived = false;
    this.symmetryAxisActived = !this.symmetryAxisActived;
    this.monotonicActived = false;
    this.symmetricCenterActived = false;
    this.parityActived = false;
    this.periodicActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.symmetryAxisEvent(this.symmetryAxisActived);
  }

  //单调性按钮触发的方法
  monotonic() {
    this.domainActived = false;
    this.symmetryAxisActived = false;
    this.monotonicActived = !this.monotonicActived;
    this.symmetricCenterActived = false;
    this.parityActived = false;
    this.periodicActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.monotonicEvent(this.monotonicActived);
  }

  //对称中心的按钮触发的方法
  symmetricCenter() {
    this.domainActived = false;
    this.symmetryAxisActived = false;
    this.monotonicActived = false;
    this.symmetricCenterActived = !this.symmetricCenterActived;
    this.parityActived = false;
    this.periodicActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.symmetricCenterEvent(this.symmetricCenterActived);
  }

  //奇偶性的按钮触发的方法
  parity() {
    this.domainActived = false;
    this.symmetryAxisActived = false;
    this.monotonicActived = false;
    this.symmetricCenterActived = false;
    this.parityActived = !this.parityActived;
    this.periodicActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.parityEvent(this.parityActived);
  }

  //周期性按钮触发的方法
  periodic() {
    this.domainActived = false;
    this.symmetryAxisActived = false;
    this.monotonicActived = false;
    this.symmetricCenterActived = false;
    this.parityActived = false;
    this.periodicActived = !this.periodicActived;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideAll();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.periodicEvent(this.periodicActived);
  }

}
