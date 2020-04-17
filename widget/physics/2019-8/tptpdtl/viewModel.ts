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
  sliderText1 = window.env.browserInfo.lang.slider[0];
  sliderText2 = window.env.browserInfo.lang.slider[1];
  sliderText3 = window.env.browserInfo.lang.slider[2];
  leftText = window.env.browserInfo.lang.slider[3];
  rightText = window.env.browserInfo.lang.slider[4];

  // 定义滑条的样式
  sliderNum1 = 0;
  sliderOption1 = {
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

  sliderNum2 = 0;
  sliderOption2 = {
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

  sliderNum3 = 0;
  sliderOption3 = {
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

    if (window.innerWidth < 860) {
      this.sliderOption1.width = 90;
      this.sliderOption2.width = 90;
      this.sliderOption3.width = 90;
    }

    const random1 = Math.floor(Math.random() * 50);
    const random2 = Math.floor(Math.random() * 50);
    const random3 = Math.floor(Math.random() * 50);
    this.sliderNum1 = random1;
    this.sliderNum2 = random2;
    this.sliderNum3 = random3;
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    const random1 = Math.floor(Math.random() * 50);
    const random2 = Math.floor(Math.random() * 50);
    const random3 = Math.floor(Math.random() * 50);
    this.sliderNum1 = random1;
    this.sliderNum2 = random2;
    this.sliderNum3 = random3;
  }

  @Watch('sliderNum1')
  getSliderNum1() {
    (ViewController.getInstance().viewHandler as any).three3dModel.dragLeftNut(this.sliderNum1);
  }

  @Watch('sliderNum2')
  getSliderNum2() {
    (ViewController.getInstance().viewHandler as any).three3dModel.dragRightNut(this.sliderNum2);
  }

  @Watch('sliderNum3')
  getSliderNum3() {
    (ViewController.getInstance().viewHandler as any).three3dModel.dragRider(this.sliderNum3);
  }
}
