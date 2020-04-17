import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  flagOne = false;
  flagTwo = false;
  flagThree = false;
  rotCentTitle = '旋转中心';
  rotDirTitle = '旋转方向';
  rotAngTitle = '旋转角度';


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

  //旋转中心
  rotCenterEvent() {
      if (this.flagOne) {
          this.flagOne = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.rotatePoint1.visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.rotCenterText.visible = false;
      } else {
          this.flagOne = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.rotatePoint1.visible = true;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.rotCenterText.visible = true;
      }
  }

  //旋转方向
  rotDirectionEvent() {
      if (this.flagTwo) {
        this.flagTwo = false;
        if (this.flagThree === false) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.shadowLine.visible = false;
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseText.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseText.visible = false;
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.yellowArc) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.yellowArc.visible = false;
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseArrow.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseArrow.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
      } else {
        this.flagTwo = true;
        if (this.flagThree) {
          switch ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.direction) {
            case 'clockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseArrow.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
              break;
            case 'aClockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseArrow.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = true;
              break;
            case '':
              break;
          }
        } else {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
          switch ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.direction) {
            case 'clockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseArrow.visible = true;
              break;
            case 'aClockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseArrow.visible = true;
              break;
            case '':
              break;
          }
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.shadowLine.visible = true;
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.yellowArc) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.yellowArc.visible = true;
        }
      }
  }

  //旋转角度
  rotAngleEvent() {
      if (this.flagThree) {
        this.flagThree = false;
        if (this.flagTwo === false) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.shadowLine.visible = false;
        } else {
          switch ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.direction) {
            case 'clockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseText.visible = false;
              break;
            case 'aClockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseText.visible = false;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseText.visible = true;
              break;
            case '':
              break;
          }
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.whiteArc) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.whiteArc.visible = false;
        }
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.angleText) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.angleText.visible = false;
        }
      } else {
        this.flagThree = true;
        if (this.flagTwo) {
          switch ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.direction) {
            case 'clockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
              break;
            case 'aClockwise':
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = true;
              (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
              break;
            case '':
              break;
          }
        } else {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallClockwiseText.visible = false;
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.smallAclockwiseText.visible = false;
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.shadowLine.visible = true;
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.whiteArc) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.whiteArc.visible = true;
        }
        if ((ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.angleText) {
          (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.angleText.visible = true;
        }
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.clockwiseText.visible = false;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).gz3dModel.aClockwiseText.visible = false;
      }
  }
}
