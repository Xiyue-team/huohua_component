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

  // 定义滑条的样式
  sliderNum = 1;
  sliderOption = {
    lazy: false,
    width: 180,
    height: 5,
    min: 0,
    max: 30,
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

    if (window.innerWidth <= 860 && window.innerWidth > 740) {
      this.sliderOption.width = 120;
    } else if (window.innerWidth <= 740) {
      this.sliderOption.width = 90;
    }
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.sliderNum = 0;
  }

  @Watch('sliderNum')
  getSliderNum() {
    (ViewController.getInstance().viewHandler as any).three3dModel.pressTableTop(this.sliderNum / 100);
  }
}
