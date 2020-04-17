import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonText;
  activeIndex = 0;
  riseButtonDisable = false;
  releaseButtonDisable = true;
  pauseButtonDisable = true;
  alarmModel: any;
  waterHeight = 20;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.alarmModel = (ViewController.getInstance().viewHandler as TemplateViewHandler).alarm;
  }

  //水位高度
  @Watch('waterHeight')
  setHeight(value: any) {
    if (value <= 20) {
      this.activeIndex = 0;
      this.riseButtonDisable = false;
      this.releaseButtonDisable = this.pauseButtonDisable = true;
    } else if ( value >= 185) {
      this.activeIndex = 0;
      this.releaseButtonDisable = false;
      this.riseButtonDisable = this.pauseButtonDisable = true;
    } else {
      this.riseButtonDisable = this.releaseButtonDisable = this.pauseButtonDisable = false;
    }
  }


  //加水
  addEvent() {
    if (this.alarmModel.waterRect.height >= 185 && this.activeIndex !== 1) {
      return;
    }
    this.alarmModel.isReset = false;
    this.activeIndex = 1;
    this.alarmModel.setWaterHeightAnimation(185);
  }
  //放水
  releaseEvent() {
    if (this.alarmModel.waterRect.height <= 20 && this.activeIndex !== 2 ) {
      return;
    }
    this.alarmModel.isReset = false;
    this.activeIndex = 2;
    this.alarmModel.setWaterHeightAnimation(20);

  }
  //暂停
  pauseEvent() {
    if (this.alarmModel.waterRect.height >= 185 || this.alarmModel.waterRect.height <= 20 && this.activeIndex !== 3 ) {
      return;
    }
    this.alarmModel.isReset = false;
    this.activeIndex = 3;
    this.alarmModel.setWaterHeightAnimation(this.waterHeight);
  }

  resetEvent() {
    this.activeIndex = 0;
    this.waterHeight = 20;
  }

}
