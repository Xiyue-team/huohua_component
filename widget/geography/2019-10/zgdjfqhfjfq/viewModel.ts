import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  isPC = window['env'].browserInfo.isPc;
  title = this.lang.title;
  buttonTitle = [this.lang.selectOption[0], this.lang.selectOption[1], this.lang.selectOption[2], this.lang.selectOption[3]];
  buttonActived = [
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
  ];

  text = this.lang.winterWind;

  switchSize = {
    width: 120,
    height: 42
  };
  switchValue = false;
  switchColor = {checked: '#0199FF', unchecked: '#EBEBEB'};
  switchLable = {checked: this.lang.boundaryLine, unchecked: this.lang.boundaryLine};
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
  }


  //季风区
  buttonEvent1() {
    this.buttonActived[0].active = !this.buttonActived[0].active;
    this.buttonActived[1].active = false;
    this.buttonActived[2].active = false;
    this.buttonActived[3].active = false;
    this.buttonActived[4].active = false;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.imageControl(1, this.buttonActived[0].active);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideWinterWind();
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideSummerWind();
}

  //冬季风(季风区)
  buttonEvent2() {
    this.buttonActived[1].active = !this.buttonActived[1].active;
    this.buttonActived[2].active = false;
    this.text = this.lang.winterWind;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideSummerWind();
    if (this.buttonActived[1].active === true) {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.winterWindPlay();
    } else {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideWinterWind();
    }
  }

  //夏季风
  buttonEvent3() {
    this.buttonActived[2].active = !this.buttonActived[2].active;
    this.buttonActived[1].active = false;
    this.text = this.lang.summerWind;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideWinterWind();
    if (this.buttonActived[2].active === true) {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.summerWindPlay();
    } else {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideSummerWind();
    }
  }

  //非季风区
  buttonEvent4() {
    this.buttonActived[3].active = !this.buttonActived[3].active;
    this.buttonActived[0].active = false;
    this.buttonActived[1].active = false;
    this.buttonActived[2].active = false;
    this.buttonActived[4].active = false;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.imageControl(2, this.buttonActived[3].active);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideWinterWind();
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideSummerWind();

  }

  //冬季风(非季风区)
  buttonEvent5() {
    this.buttonActived[4].active = !this.buttonActived[4].active;
    this.text = this.lang.winterWind;
    if (this.buttonActived[4].active === true) {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.winterWindPlay();
    } else {
      (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.hideWinterWind();
    }
  }


  @Watch('switchValue')
  boundaryLine(value: boolean) {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).myCanvas.imageControl(3, value);
  }

  resetEvent() {
    this.buttonActived[0].active = false;
    this.buttonActived[1].active = false;
    this.buttonActived[2].active = false;
    this.buttonActived[3].active = false;
    this.buttonActived[4].active = false;
    this.switchValue = false;
  }

}
