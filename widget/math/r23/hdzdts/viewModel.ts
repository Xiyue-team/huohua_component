import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  addTitle = '＋';
  cutTitle = '-';
  meaningfulTitle = '1弧度的意义';
  formulaTitle  = '弧度的表达式';
  oneRadianTitle = '1 rad';
  twoRadianTitle = '2 rad';
  threeRadianTitle = '3 rad';
  fourRadianTitle = '4 rad';

  addFlag = false;
  cutFlag = true;
  meaningColor = false;
  formulaColor = false;
  oneRadianColor = false;
  twoRadianColor = false;
  threeRadianColor = false;
  fourRadianColor = false;
  num = 0;
  meaningFulFlag = false;
  showFormula = false;
  isMobile = false;
  clickFlag = false;

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
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  addCircleEvent() {
      this.meaningColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
      switch (this.num) {
        case 0:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.otherLines[0].visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.circleLine[1].visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stationaryLine[1].visible = true;
          break;
        case 1:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.otherLines[1].visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.circleLine[2].visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stationaryLine[2].visible = true;
          break;
      }
      if (this.num >= 2) {
        return ;
      }
      this.num++;
      this.cutFlag = false;
      if (this.num === 2) {
          this.addFlag = true;
      }
  }

  cutCircleEvent() {
      this.meaningColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
      switch (this.num) {
        case 2:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.otherLines[1].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.circleLine[2].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stationaryLine[2].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animatePoint[2].visible = false;
          break;
        case 1:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.otherLines[0].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.circleLine[1].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stationaryLine[1].visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animatePoint[1].visible = false;
          break;
      }
      if (this.num <= 0) {
        return ;
      }
      this.num--;
      this.addFlag = false;
      if (this.num === 0) {
        this.cutFlag = true;
      }
  }

  meaningfulEvent() {
    this.meaningFulFlag = true;
    this.changeRadianArcLine((1 - Math.PI / 6));
    this.hideFourButtons();
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, false);
    if (this.meaningColor) {
      this.meaningColor = false;
    } else {
      this.meaningColor = true;
      switch (this.num) {
        case 0:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animatePoint[0].visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animation[0].play();
          break;
        case 1:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animation[1].play();
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animatePoint[1].visible = true;
          break;
        case 2:
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animation[2].play();
          (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.animatePoint[2].visible = true;
          break;
      }
    }
  }

  formulaEvent() {
    if (this.formulaColor) {
      this.formulaColor = false;
      this.showFormula = false;
    } else {
      this.formulaColor = true;
      this.showFormula = true;
    }
  }

  //1弧度
  oneRadianEvent() {
    this.twoRadianColor = false;
    this.threeRadianColor = false;
    this.fourRadianColor = false;
    this.meaningColor = false;
    this.clickFlag = true;
    this.changeRadianArcLine((1 - Math.PI / 6));
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
    if (this.oneRadianColor) {
      this.oneRadianColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, false);
    } else {
      this.oneRadianColor = true;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(true, false, false, false);
    }
  }

  //2弧度
  twoRadianEvent() {
    this.oneRadianColor = false;
    this.threeRadianColor = false;
    this.fourRadianColor = false;
    this.clickFlag = true;
    this.meaningColor = false;
    this.changeRadianArcLine((2 - Math.PI / 6));
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
    if (this.twoRadianColor) {
      this.twoRadianColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, false);
    } else {
      this.twoRadianColor = true;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, true, false, false);
    }
  }

  //3弧度
  threeRadianEvent() {
    this.oneRadianColor = false;
    this.twoRadianColor = false;
    this.fourRadianColor = false;
    this.meaningColor = false;
    this.clickFlag = true;
    this.changeRadianArcLine((3 - Math.PI / 6));
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
    if (this.threeRadianColor) {
      this.threeRadianColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, false);
    } else {
      this.threeRadianColor = true;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, true, false);
    }
  }

  //4弧度
  fourRadianEvent() {
    this.oneRadianColor = false;
    this.twoRadianColor = false;
    this.threeRadianColor = false;
    this.meaningColor = false;
    this.clickFlag = true;
    this.changeRadianArcLine((4 - Math.PI / 6));
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.stopAllAnimation();
    if (this.fourRadianColor) {
      this.fourRadianColor = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, false);
    } else {
      this.fourRadianColor = true;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.changeArcLine(false, false, false, true);
    }
  }

  //切换弧度值时显示对应弧线
  changeRadianArcLine(num: number) {
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.rotatePoint.rotation.z = (num);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.images[0].rotation.z = -(num);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.images[1].rotation.z = -(num);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.images[2].rotation.z = -(num);
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.sliderControlerLine.angle = num;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).hdz3dModel.sliderControlerLine.totalAngle = num;
  }

  //隐藏4个按钮
  hideFourButtons() {
    this.oneRadianColor = false;
    this.twoRadianColor = false;
    this.threeRadianColor = false;
    this.fourRadianColor = false;
  }

  //重置按钮问题
  resetButtons() {
    this.addFlag = false;
    this.cutFlag = true;
    this.meaningColor = false;
    this.formulaColor = false;
    this.oneRadianColor = false;
    this.twoRadianColor = false;
    this.threeRadianColor = false;
    this.fourRadianColor = false;
    this.num = 0;
    this.meaningFulFlag = false;
    this.showFormula = false;
    this.clickFlag = false;
  }

}
