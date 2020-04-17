import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import {Watch} from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  buttonTitle = ['k > 0', 'k = 0', 'k < 0', 'b > 0', 'b = 0', 'b < 0'];
  title = '公开课 y=kx+b(k≠0)';
  moveButton = '平移';
  moveActived = false;
  k1Actived = false;
  k2Actived = false;
  k3Actived = false;
  b1Actived = false;
  b2Actived = false;
  b3Actived = false;
  isShow = true;
  switchOption = {
    datas: ['由图像判断系数', '由系数判断图像'],
  };
  switchModel = '由图像判断系数';
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
    this.moveButton = '平移';
    this.moveActived = false;
    this.k1Actived = false;
    this.k2Actived = false;
    this.k3Actived = false;
    this.b1Actived = false;
    this.b2Actived = false;
    this.b3Actived = false;
    this.switchModel = '由图像判断系数';
  }

  k1button() { this.k1Actived = !this.k1Actived; this.k2Actived = false; this.k3Actived = false; }
  k2button() { this.k1Actived = false; this.k2Actived = !this.k2Actived; this.k3Actived = false; }
  k3button() { this.k1Actived = false; this.k2Actived = false; this.k3Actived = !this.k3Actived; }
  b1button() { this.b1Actived = !this.b1Actived; this.b2Actived = false; this.b3Actived = false; }
  b2button() { this.b1Actived = false; this.b2Actived = !this.b2Actived; this.b3Actived = false; }
  b3button() { this.b1Actived = false; this.b2Actived = false; this.b3Actived = !this.b3Actived; }

  //平移按钮
  moveButtonEvent() {
    this.moveActived = !this.moveActived;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.moveButton(this.moveActived);
  }

  @Watch('switchModel')
  onSwitch1ModelChange(value: any) {
    if (value === '由图像判断系数') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.selectButton(value);
  }

}
