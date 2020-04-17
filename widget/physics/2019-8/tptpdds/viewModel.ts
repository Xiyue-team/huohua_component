import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  sliderText = window.env.browserInfo.lang.slider[0];
  buttonText = window.env.browserInfo.lang.buttonText;

  // 初始值
  sliderNum = 0;
  // 定义滑条的样式
  sliderOption = {
    lazy: false,
    width: 180,
    height: 5,
    min: 0,
    max: 50,
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: 20
  };

  // 显示四个砝码按钮是否被选中
  isShowButton1 = true;
  isShowButton2 = true;
  isShowButton3 = true;
  isShowButton4 = true;

  isBlueButton = false;

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

    if (window.innerWidth <= 860 && window.innerWidth > 740) {
      this.sliderOption.width = 135;
    } else if (window.innerWidth <= 740) {
      this.sliderOption.width = 90;
    }
  }

  mounted() {
    ViewController.getInstance().domReady();
    document.getElementById('replaceStoneButton').addEventListener('touchstart', function() {}, false);
  }

  resetEvent() {
    this.replaceStoneButton();
  }

  replaceStoneButton () {
    this.sliderNum = 0;
    this.isShowButton1 = true;
    this.isShowButton2 = true;
    this.isShowButton3 = true;
    this.isShowButton4 = true;
    (ViewController.getInstance().viewHandler as any).three3dModel.replaceStone();
  }

  @Watch('isShowButton1')
  getSsShowButton1() {
    (ViewController.getInstance().viewHandler as any).three3dModel.addWeight5g(!this.isShowButton1);
  }

  @Watch('isShowButton2')
  getSsShowButton2() {
    (ViewController.getInstance().viewHandler as any).three3dModel.addWeight10g(!this.isShowButton2);
  }

  @Watch('isShowButton3')
  getSsShowButton3() {
    (ViewController.getInstance().viewHandler as any).three3dModel.addWeight20g(!this.isShowButton3);
  }

  @Watch('isShowButton4')
  getSsShowButton5() {
    (ViewController.getInstance().viewHandler as any).three3dModel.addWeight50g(!this.isShowButton4);
  }

  @Watch('sliderNum')
  getSliderNum3() {
    (ViewController.getInstance().viewHandler as any).three3dModel.dragRider(this.sliderNum);
  }
}
