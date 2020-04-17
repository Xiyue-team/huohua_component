import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  conclusionTitle = '结论';
  descriptionTitle = '说明';
  conclusionColor = false;
  descriptionColor = false;
  descriptionFlag = true;
  conclusionShowFlag = false;
  descriptionShowFlag = false;
  isMobile = false;
  conclusionClass: any;
  descriptionClass: any;
  conclusionButton: any;

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
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    this.conclusionClass = document.getElementsByClassName('conclusionClass')[0];
    this.descriptionClass = document.getElementsByClassName('descriptionClass')[0];
    this.conclusionButton = document.getElementsByClassName('conclusionButton')[0];

    if (this.isMobile) {
      (document.getElementsByClassName('title_text')[0] as HTMLElement).style.right = '10px';
      (document.getElementsByClassName('title_text')[0] as HTMLElement).style.fontSize = '18px';
    }
    if ((window as any)['env'].browserInfo.isIpad) {
      (this.conclusionClass as HTMLElement).style.transform = 'scale(0.8)';
      (this.descriptionClass as HTMLElement).style.transform = 'scale(0.8)';
      (this.conclusionClass as HTMLElement).style.right = '80px';
      (this.descriptionClass as HTMLElement).style.right = '80px';
      (this.conclusionClass as HTMLElement).style.bottom = '65px';
      (this.descriptionClass as HTMLElement).style.bottom = '-10px';
    }
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  //结论按钮
  concluseEvent() {
      if (this.conclusionColor) {
        this.conclusionColor = false;
        this.descriptionFlag = true;
        this.conclusionShowFlag = false;
        this.descriptionShowFlag = false;
        this.descriptionColor = false;
        if (this.isMobile) {
          (this.conclusionButton as HTMLElement).style.bottom = '85px';
          (this.conclusionClass as HTMLElement).style.bottom = '40px';
        } else if ((window as any)['env'].browserInfo.isIpad) {
          (this.conclusionButton as HTMLElement).style.bottom = '85px';
          (this.conclusionClass as HTMLElement).style.bottom = '65px';
        } else {
          (this.conclusionButton as HTMLElement).style.bottom = '85px';
          (this.conclusionClass as HTMLElement).style.bottom = '85px';
        }
      } else {
        this.conclusionColor = true;
        this.descriptionFlag = false;
        this.conclusionShowFlag = true;
      }
  }

  //说明按钮
  descripteEvent() {
    if (this.descriptionColor) {
      this.descriptionColor = false;
      this.conclusionShowFlag = true;
      this.descriptionShowFlag = false;
      if (this.isMobile) {
        (this.conclusionButton as HTMLElement).style.bottom = '85px';
        (this.conclusionClass as HTMLElement).style.bottom = '40px';
      } else if ((window as any)['env'].browserInfo.isIpad) {
        (this.conclusionButton as HTMLElement).style.bottom = '85px';
        (this.conclusionClass as HTMLElement).style.bottom = '65px';
        (this.descriptionClass as HTMLElement).style.bottom = '-10px';
      } else {
        (this.conclusionButton as HTMLElement).style.bottom = '85px';
        (this.conclusionClass as HTMLElement).style.bottom = '85px';
      }
    } else {
      this.descriptionColor = true;
      this.conclusionShowFlag = true;
      this.descriptionShowFlag = true;
      if (this.isMobile) {
        (this.conclusionButton as HTMLElement).style.bottom = '210px';
        (this.conclusionClass as HTMLElement).style.bottom = '160px';
      } else if ((window as any)['env'].browserInfo.isIpad) {
        (this.conclusionButton as HTMLElement).style.bottom = '350px';
        (this.conclusionClass as HTMLElement).style.bottom = '330px';
      } else {
        (this.conclusionButton as HTMLElement).style.bottom = '390px';
        (this.conclusionClass as HTMLElement).style.bottom = '390px';
      }
    }
  }
}
