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

  isShow3dContainer = true;
  isShow3dContainerMask = false;

  isShowLeftText = true;

  isShowPlateauText = false;
  isShowPlainText = false;
  isShowHillyAreaText = false;

  isButtonGrayPreviousPage = true;
  isButtonGrayNextPage = false;

  isButtonGrayThreeControl = false;

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
    if (!this.isShow3dContainer) {
      this.isShow3dContainerMask = true;
      setTimeout(() => {
        this.isShow3dContainerMask = false;
      }, 50);
    }

    this.isShow3dContainer = true;

    this.isShowLeftText = true;

    this.isShowPlateauText = false;
    this.isShowPlainText = false;
    this.isShowHillyAreaText = false;

    this.isButtonGrayPreviousPage = true;
    this.isButtonGrayNextPage = false;

    this.isButtonGrayThreeControl = false;
  }

  clickReverse() {
    (ViewController.getInstance().viewHandler as any).rightCradCanvas.reverseAnim();
  }

  // 上一页
  previousPage() {
    (ViewController.getInstance().viewHandler as any).rightCradCanvas.previousPage();
  }

  // 下一页
  nextPage() {
    (ViewController.getInstance().viewHandler as any).rightCradCanvas.nextPage();
  }

  // 高原
  @Watch('isShowPlateauText')
  showPlateauText() {
    (ViewController.getInstance().viewHandler as any).three3dModel.showPlateauText(this.isShowPlateauText);
  }

  // 平原
  @Watch('isShowPlainText')
  showPlainText() {
    (ViewController.getInstance().viewHandler as any).three3dModel.showPlainText(this.isShowPlainText);
  }

  // 山地
  @Watch('isShowHillyAreaText')
  showHillyAreaText() {
    (ViewController.getInstance().viewHandler as any).three3dModel.showHillyAreaText(this.isShowHillyAreaText);
  }
}
