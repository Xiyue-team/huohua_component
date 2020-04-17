import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');

const createjs = require('createjs-npm');
const preloadjs = require('preload-js');
const soundjs = require('createjs-soundjs');

@Component
export class ViewModel extends Vue {


  showTip = true;

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




   /* createjs.Sound.on('fileload', handleLoadComplete);
    createjs.Sound.alternateExtensions = ['mp3'];*/


  /*  const sounds = [
      {src: audio1Src, id: 'audio1'},
      {src: audio2Src, id: 'audio2'},
      {src: audio3Src, id: 'audio3'}
    ];
    createjs.Sound.registerSounds(sounds, '');

    function handleLoadComplete(event: any) {
      console.log('sound');
      createjs.Sound.play('audio1');
    }*/

  }


  resetEvent() {

  }



}
