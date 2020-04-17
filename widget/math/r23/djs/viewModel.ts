import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';


const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  isStart = false;
  beginTime = 0;
  time = 0;
  audio1Src: string;
  audio1: any;



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
    //this.audio1 = new Audio(didiMp3 as any);
    //this.audio1.play();
    this.audio1 = document.createElement('audio');

  }

  resetEvent() {

  }


  begin() {
    this.initAnimationEvent();
    this.isStart = true;
    //document.getElementById('audio1').play();
    // this.audio1.play();
  }


  initMemTimer() {
    this.beginTime = new Date().getTime();

    const timer = () => {
      this.time = new Date().getTime() - this.beginTime;
      const second = (this.time / 1000).toFixed(2);

      if (parseFloat(second) >= 120) {
        document.getElementById('m').classList.remove('ones');
        document.getElementById('m').children[0].children[0].innerText = '0';
      }

      if (parseFloat(second) >= 170) {
        document.getElementById('ts').classList.remove('seconds');
      }

      if (parseFloat(second) >= 169 && parseFloat(second) < 180) {
        (ViewController.getInstance().viewHandler as any).vloume.initAudio();
      }

      if (parseFloat(second) >= 179) {
        (ViewController.getInstance().viewHandler as any).vloume.destoryVolume();
        document.getElementById('s').classList.remove('ones');
      }

      requestAnimationFrame(timer);
    };

    requestAnimationFrame(timer);
  }

  initAnimationEvent() {
          // set the var here
          const monkey = document.querySelector('#m');

      // listen for animation start
          monkey.addEventListener('animationstart', (e) => {
            console.log('log at beginning of monkey animation');
            this.initMemTimer();
          }, false);

      // listen for animation iteration
          monkey.addEventListener('animationiteration', function(e) {
            console.log('log at beginning of each subsequent iteration');
          }, false);

      // listen for animation end
          monkey.addEventListener( 'animationend', function(e) {
            console.log('log at end of monkey animation');
          }, false);
  }

}
