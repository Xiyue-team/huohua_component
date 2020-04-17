import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  concept = '向量的概念';
  angle = '向量夹角';
  start = '起点';
  length = '长度';
  direction = '方向';
  conceptActived = false;
  angleActived = false;
  startActived = false;
  lengthActived = false;
  directionActived = false;
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

  //向量的概念按钮按钮触发方法
  conceptEvent() {
    this.conceptActived = !this.conceptActived;
    this.angleActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowTips(false);
    if (this.conceptActived === false) {
      this.startActived = false;
      this.lengthActived = false;
      this.directionActived = false;
    }
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetAnimation();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, false);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetDragVector();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetLengthButtonEvent();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetDirectionEvent();

    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorBAnimation();
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorB();

  }

  //向量夹角按钮触发方法
  angleEvent() {
    this.angleActived = !this.angleActived;
    this.conceptActived = false;
    this.startActived = false;
    this.lengthActived = false;
    this.directionActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowTips(false);
    if (this.angleActived === true) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetAnimation();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, false);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetDragVector();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetLengthButtonEvent();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetDirectionEvent();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorBAnimation();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorB();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.vectorBPlay();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetDragVector();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorBAnimation();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetVectorB();
    }
  }

  //起点按钮触发方法
  startPointEvent() {
    this.startActived = !this.startActived;
    this.lengthActived = false;
    this.directionActived = false;
    if (this.startActived === true) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.playAnimation();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetAnimation();
    }
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, false);
  }

  //长度按钮触发方法
  lengthEvent() {
    this.startActived = false;
    this.lengthActived = !this.lengthActived;
    this.directionActived = false;
    if (this.lengthActived === true) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetAnimation();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(true, false);
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, false);
    }
  }

  //方向按钮触发方法
  directionEvent() {
    this.startActived = false;
    this.lengthActived = false;
    this.directionActived = !this.directionActived;
    if (this.directionActived === true) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetAnimation();
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, true);
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowControl(false, false);
    }
  }
}
