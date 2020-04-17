import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { ZjzbViewHandler } from './services/ZjzbViewHandler';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  isMobile = window.env.browserInfo.isSmallDevice;
  converseTitle = window.env.browserInfo.lang.converseTitle;
  relationShipTitle = window.env.browserInfo.lang.relationShipTitle;
  relationShipColor = false;
  showFormula = false;
  count = 0;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new ZjzbViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  /*转化*/
  converseEvent() {
    this.count += 1;
    if (this.count % 2 === 0) {
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.polarCoord.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.oText.visible =
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible ? false : true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.greenDashLine.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.orangeDashLine.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.textPOne.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.textPTwo.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.solidLine.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.ρText.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.arcLine.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.aText.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.xText.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.yText.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.rightAngleImg.visible = false;
    } else {
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible = this.relationShipColor ? true : false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.polarCoord.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.oText.visible =
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible ? false : true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.
        greenDashLine.visible = this.relationShipColor ? true : false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.
        orangeDashLine.visible = this.relationShipColor ? true : false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.textPOne.visible = false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.textPTwo.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.solidLine.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.ρText.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.arcLine.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.aText.visible = true;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.xText.visible = this.relationShipColor ? true : false;
      (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.yText.visible = this.relationShipColor ? true : false;
    }
  }

  /*关系*/
  relationShipEvent() {
      if (this.relationShipColor) {
        this.relationShipColor = false;
        this.showFormula = false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible = this.count % 2 === 0 ? true : false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.polarCoord.visible = this.count % 2 === 0 ? false : true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.oText.visible =
          (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible ? false : true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.
          greenDashLine.visible = this.count % 2 === 0 ? true : false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.
          orangeDashLine.visible = this.count % 2 === 0 ? true : false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.xText.visible = false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.yText.visible = false;
      } else {
        this.relationShipColor = true;
        this.showFormula = true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible = true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.polarCoord.visible = false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.oText.visible =
          (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.axis.visible ? false : true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.greenDashLine.visible = true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.orangeDashLine.visible = true;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.xText.visible = this.count % 2 !== 0 ? true : false;
        (ViewController.getInstance().viewHandler as ZjzbViewHandler).zjzb3dModel.yText.visible = this.count % 2 !== 0 ? true : false;
      }
  }
}
