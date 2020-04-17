import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  zeroVector = '零向量';
  unitVector = '单位向量';
  equalVector = '相等向量';
  oppositeVector = '相反向量';
  parallelVector = '平行(共线)向量';
  positive = '同向';
  reverse = '反向';
  zeroActived = false;
  unitActived = false;
  equalActived = false;
  oppositeActived = false;
  parallelActived = false;
  positiveActived = true;
  reverseActived = false;
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
    ViewController.getInstance().viewHandler.beforeRenderElement();
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
  }


  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {

  }

  zeroEvent() {
    this.zeroActived = !this.zeroActived;
    this.unitActived = false;
    this.equalActived = false;
    this.oppositeActived = false;
    this.parallelActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideVector();
    if (this.zeroActived === false) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(0);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetInitialVector();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(1);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetZeroVector();
    }
  }

  unitEvent() {
    this.unitActived = !this.unitActived;
    this.zeroActived = false;
    this.equalActived = false;
    this.oppositeActived = false;
    this.parallelActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideVector();
    if (this.unitActived === false) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(0);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetInitialVector();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(2);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetUnitVector();
    }
  }

  equalEvent() {
    this.equalActived = !this.equalActived;
    this.zeroActived = false;
    this.unitActived = false;
    this.oppositeActived = false;
    this.parallelActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideVector();
    if (this.equalActived === false) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(0);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetInitialVector();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(3);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetEqualVector();
    }
  }

  oppositeEvent() {
    this.oppositeActived = !this.oppositeActived;
    this.zeroActived = false;
    this.unitActived = false;
    this.equalActived = false;
    this.parallelActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideVector();
    if (this.oppositeActived === false) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(0);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetInitialVector();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(4);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetOppositeVector();
    }
  }

  parallelEvent() {
    this.parallelActived = !this.parallelActived;
    this.zeroActived = false;
    this.unitActived = false;
    this.equalActived = false;
    this.oppositeActived = false;
    this.positiveActived = true;
    this.reverseActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.hideVector();
    if (this.parallelActived === false) {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(0);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetInitialVector();
    } else {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(5);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(6);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetParallelVector();
    }
  }

  positiveEvent() {
    this.positiveActived = true;
    this.reverseActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(6);
  }

  reverseEvent() {
    this.reverseActived = true;
    this.positiveActived = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.showVector(7);
  }
}
