import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import * as general1 from './sub_static/generalMap1.png';
import * as general2 from './sub_static/generalMap2.png';
import * as general3 from './sub_static/generalMap3.png';
import * as general4 from './sub_static/generalMap4.png';
import * as general5 from './sub_static/generalMap5.png';
import * as jingwei1 from './sub_static/jingweiMap1.png';
import * as jingwei2 from './sub_static/jingweiMap2.png';
import * as jingwei3 from './sub_static/jingweiMap3.png';
import * as jingwei4 from './sub_static/jingweiMap4.png';
import * as jingwei5 from './sub_static/jingweiMap5.png';
import * as pointingTarget1 from './sub_static/pointingTarget1.png';
import * as pointingTarget2 from './sub_static/pointingTarget2.png';
import * as pointingTarget3 from './sub_static/pointingTarget3.png';
import * as pointingTarget4 from './sub_static/pointingTarget4.png';
import * as pointingTarget5 from './sub_static/pointingTarget5.png';
import * as compassImage from './sub_static/direction.png';
import { Helper } from './services/Helper';
import { Config } from './services/config';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  general = '一般地图';
  jingwei = '有指向标的地图';
  pointing = '经纬网地图';
  gActived = false;
  jActived = false;
  pActived = false;
  selectNumber = 0;
  helper = new Helper();
  config = new Config();
  isMobile: boolean;
  isElection: boolean;
  isIpad: boolean;
  twoImage = false;
  fourAndFive = false;
  tipsControl = true;
  errorFeedback = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    this.isElection = (window as any)['env'].browserInfo.isElection ||
      (window as any)['env'].browserInfo.isHuohuaApp || (window as any)['env'].browserInfo.isHuohuaPlayer;
    this.isIpad = (window as any)['env'].browserInfo.isIpad;
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.gActivedEvent();
    this.tipsControl = true;
  }

  gActivedEvent() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    const imageDom = document.getElementsByClassName('selectImage');
    const borderDom = document.getElementsByClassName('selectImage1')[0];
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const compass = document.getElementsByClassName('compassImage')[0];
    this.gActived = true;
    this.jActived = false;
    this.pActived = false;
    if (this.gActived === true) {
      this.resetBorderColor();
      this.helper.resetScene(imageDom, this.config.imageValue1, '#0199ff', borderDom);
      mainImage.setAttribute('src', (general1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else {
      this.helper.resetScene(imageDom, this.config.imageValue, 'rgba(0,0,0,0.12)', borderDom);
      mainImage.setAttribute('src', '');
      this.selectNumber = 0;
      if (compass.getAttribute('src') !== compassImage as any) {
        compass.setAttribute('src', compassImage as any);
      }
      (compass as HTMLElement).style.transform = 'rotate(0deg)';
    }
  }

  jActivedEvent() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    const imageDom = document.getElementsByClassName('selectImage');
    const borderDom = document.getElementsByClassName('selectImage1')[0];
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const compass = document.getElementsByClassName('compassImage')[0];
    this.jActived = true;
    this.gActived = false;
    this.pActived = false;
    if (this.jActived === true) {
      this.resetBorderColor();
      this.helper.resetScene(imageDom, this.config.imageValue2, '#0199ff', borderDom);
      mainImage.setAttribute('src', (jingwei1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else {
      this.helper.resetScene(imageDom, this.config.imageValue, 'rgba(0,0,0,0.12)', borderDom);
      mainImage.setAttribute('src', '');
      this.selectNumber = 0;
      if (compass.getAttribute('src') !== compassImage as any) {
        compass.setAttribute('src', compassImage as any);
      }
      (compass as HTMLElement).style.transform = 'rotate(0deg)';
    }
  }

  pActivedEvent() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    const imageDom = document.getElementsByClassName('selectImage');
    const borderDom = document.getElementsByClassName('selectImage1')[0];
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const compass = document.getElementsByClassName('compassImage')[0];
    this.pActived = true;
    this.gActived = false;
    this.jActived = false;
    if (this.pActived === true) {
      this.resetBorderColor();
      this.helper.resetScene(imageDom, this.config.imageValue3, '#0199ff', borderDom);
      mainImage.setAttribute('src', (pointingTarget1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(60 * Math.PI / 180);
    } else {
      this.helper.resetScene(imageDom, this.config.imageValue, 'rgba(0,0,0,0.12)', borderDom);
      mainImage.setAttribute('src', '');
      this.selectNumber = 0;
      if (compass.getAttribute('src') !== compassImage as any) {
        compass.setAttribute('src', compassImage as any);
      }
      (compass as HTMLElement).style.transform = 'rotate(0deg)';
    }
  }

  selectEvent1() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    this.twoImage = false;
    this.fourAndFive = false;
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const borderDom1 = document.getElementsByClassName('selectImage1')[0];
    if (this.gActived === false && this.jActived === false && this.pActived === false) {
      return;
    }
    if (this.gActived === true) {
      mainImage.setAttribute('src', (general1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.jActived === true) {
      mainImage.setAttribute('src', (jingwei1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.pActived === true) {
      mainImage.setAttribute('src', (pointingTarget1 as any));
      this.selectNumber = 1;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(60 * Math.PI / 180);
    }
    this.resetBorderColor();
    (borderDom1 as any).style.borderColor = '#0199ff';
  }

  selectEvent2() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    this.twoImage = false;
    this.fourAndFive = false;
    if (this.gActived === false && this.jActived === false && this.pActived === false) {
      return;
    }
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const borderDom2 = document.getElementsByClassName('selectImage2')[0];
    if (this.gActived === true) {
      this.twoImage = true;
      mainImage.setAttribute('src', (general2 as any));
      this.selectNumber = 2;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.jActived === true) {
      mainImage.setAttribute('src', (jingwei2 as any));
      this.selectNumber = 2;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.pActived === true) {
      mainImage.setAttribute('src', (pointingTarget2 as any));
      this.selectNumber = 2;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(90 * Math.PI / 180);
    }
    this.resetBorderColor();
    (borderDom2 as any).style.borderColor = '#0199ff';
  }

  selectEvent3() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    this.fourAndFive = false;
    this.twoImage = false;
    if (this.gActived === false && this.jActived === false && this.pActived === false) {
      return;
    }
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const borderDom3 = document.getElementsByClassName('selectImage3')[0];
    if (this.gActived === true) {
      mainImage.setAttribute('src', (general3 as any));
      this.selectNumber = 3;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.jActived === true) {
      mainImage.setAttribute('src', (jingwei3 as any));
      this.selectNumber = 3;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.pActived === true) {
      mainImage.setAttribute('src', (pointingTarget3 as any));
      this.selectNumber = 3;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(-60 * Math.PI / 180);
    }
    this.resetBorderColor();
    (borderDom3 as any).style.borderColor = '#0199ff';
  }

  selectEvent4() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    this.fourAndFive = false;
    this.twoImage = false;
    if (this.gActived === false && this.jActived === false && this.pActived === false) {
      return;
    }
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const borderDom4 = document.getElementsByClassName('selectImage4')[0];
    if (this.gActived === true) {
      mainImage.setAttribute('src', (general4 as any));
      this.fourAndFive = true;
      this.selectNumber = 4;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.jActived === true) {
      mainImage.setAttribute('src', (jingwei4 as any));
      this.selectNumber = 4;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(17 * Math.PI / 180);
    } else if (this.pActived === true) {
      mainImage.setAttribute('src', (pointingTarget4 as any));
      this.selectNumber = 4;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    }
    this.resetBorderColor();
    (borderDom4 as any).style.borderColor = '#0199ff';
  }

  selectEvent5() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.errorFeedback = false;
    this.tipsControl = false;
    this.fourAndFive = false;
    this.twoImage = false;
    if (this.gActived === false && this.jActived === false && this.pActived === false) {
      return;
    }
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const borderDom5 = document.getElementsByClassName('selectImage5')[0];
    if (this.gActived === true) {
      mainImage.setAttribute('src', (general5 as any));
      this.fourAndFive = true;
      this.selectNumber = 5;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.jActived === true) {
      mainImage.setAttribute('src', (jingwei5 as any));
      this.selectNumber = 5;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(0);
    } else if (this.pActived === true) {
      mainImage.setAttribute('src', (pointingTarget5 as any));
      this.selectNumber = 5;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.rotaterandomAngle(-40 * Math.PI / 180);
    }
    this.resetBorderColor();
    (borderDom5 as any).style.borderColor = '#0199ff';
  }

  //重置所有边框的颜色
  resetBorderColor() {
    const borderDom1 = document.getElementsByClassName('selectImage1')[0];
    const borderDom2 = document.getElementsByClassName('selectImage2')[0];
    const borderDom3 = document.getElementsByClassName('selectImage3')[0];
    const borderDom4 = document.getElementsByClassName('selectImage4')[0];
    const borderDom5 = document.getElementsByClassName('selectImage5')[0];
    (borderDom1 as any).style.borderColor = 'rgba(0,0,0,0.12)';
    (borderDom2 as any).style.borderColor = 'rgba(0,0,0,0.12)';
    (borderDom3 as any).style.borderColor = 'rgba(0,0,0,0.12)';
    (borderDom4 as any).style.borderColor = 'rgba(0,0,0,0.12)';
    (borderDom5 as any).style.borderColor = 'rgba(0,0,0,0.12)';
  }

  reset() {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).compass.clearTimer();
    this.gActived = false;
    this.jActived = false;
    this.pActived = false;
    const imageDom = document.getElementsByClassName('selectImage');
    const borderDom = document.getElementsByClassName('selectImage1')[0];
    const mainImage = document.getElementsByClassName('mainImage')[0];
    const compass = document.getElementsByClassName('compassImage')[0];
    this.resetBorderColor();
    this.helper.resetScene(imageDom, this.config.imageValue, 'rgba(0,0,0,0.12)', borderDom);
    mainImage.setAttribute('src', '');
    this.selectNumber = 0;
    if (compass.getAttribute('src') !== compassImage as any) {
      compass.setAttribute('src', compassImage as any);
    }
    (compass as HTMLElement).style.transform = 'rotate(0deg)';
    this.gActivedEvent();
    this.tipsControl = true;
  }



}
