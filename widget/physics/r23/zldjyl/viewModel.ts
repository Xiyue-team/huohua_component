import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { BrowserUtil } from "../../../../src/util/BrowserUtil";
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  switchOn = false;
  isPause  = false;
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
    const contolBtn = document.querySelector('.forceControl_button');
    const playButton = document.querySelector('.forcePlay_button');
    playButton.classList.add('event_disabled');
    this.disableFEvent();
    contolBtn.addEventListener('click', () => {
      this.switchOn = !this.switchOn;
      if (this.switchOn) {
        contolBtn.classList.add('active');
        (ViewController.getInstance().viewHandler as any).duanluService.setforceopacity();
        (ViewController.getInstance().viewHandler as any).duanluService.setforceEnable();

      } else {
        contolBtn.classList.remove('active');
        (ViewController.getInstance().viewHandler as any).duanluService.setforceopacity();
      }

      (ViewController.getInstance().viewHandler as any).duanluService.myCanvas.renderAll();
    });

    playButton.addEventListener('click', () => {
      this.isPause = !this.isPause;
      if (this.isPause) {
        playButton.classList.add('active');
        (ViewController.getInstance().viewHandler as any).duanluService.rotaionSprite.stop();
        (ViewController.getInstance().viewHandler as any).duanluService.forceStop();
        (ViewController.getInstance().viewHandler as any).duanluService.isPlayElectron = false;

      } else {
        playButton.classList.remove('active');
        (ViewController.getInstance().viewHandler as any).duanluService.rotaionSprite.play();
        (ViewController.getInstance().viewHandler as any).duanluService.forcePlay();
        (ViewController.getInstance().viewHandler as any).duanluService.isPlayElectron = true;
        //(ViewController.getInstance().viewHandler as any).duanluService.initElectronAnimation();
      }
    });

    if (BrowserUtil.getBrowserInfo().isSmallDevice) {
      const button1 = (document.querySelector('.forcePlay_button') as any);
      const button2 = (document.querySelector('.forceControl_button') as any);
      button1.style.width = '60px';
      button1.style.height = '30px';
      button1.style.fontSize = '12px';
      button2.style.width = '60px';
      button2.style.height = '30px';
      button2.style.fontSize = '12px';
      button1.style.right = button2.style.right = '12px';
      button1.style.bottom = '60px';
    }
  }

  resetEvent() {
    this.isPause = false;
    document.querySelector('.forcePlay_button').classList.add('event_disabled');
    document.querySelector('.forcePlay_button').classList.remove('active');
    document.querySelector('.forceControl_button').classList.remove('active');
    this.disableFEvent();
  }


  disableFEvent() {
    this.switchOn = false;
    document.querySelector('.forceControl_button').classList.add('event_disabled');
    document.querySelector('.forceControl_button').classList.remove('active');

    try {
      (ViewController.getInstance().viewHandler as any).duanluService.setforceopacity();
    } catch (e) {
    }

  }

  enableFEvent() {
    document.querySelector('.forceControl_button').classList.remove('event_disabled');
    //document.querySelector('.forceControl_button').classList.remove('active');
  }

}
