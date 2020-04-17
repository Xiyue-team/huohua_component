import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
const video = require('video.js/dist/video.js');
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  config = window.env.browserInfo.lang;
  sliderWidth = ((569 / 1024) * window.innerWidth) + 'px';
  sliderNumber = 0;
  isShowCandleImage = false;
  disableSlider = false;
  isPlay = false;
  playButton = false;
  fontSize = '18px';
  dotSize = '14px';
  dotPosition = 'translateY(-3.5px)';
  boxShadow = 'inset 0 2px 2px 0 rgba(0,0,0,0.50)';
  activeBoxShadow = 'inset 0 2px 2px 0 rgba(57,57,57,0.50)';
  color = '#242424';
  activeColor = '#EBEBEB';
  textColor = '#FFFFFF';
  lightDom: any;
  myVideo: any;
  marks = {
    '0': {
        label: this.config.sliderTitle[0],
        style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-16px, -60px)'
      }},
    '40': {
      label: this.config.sliderTitle[1],
      style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-16px, -60px)'
      }
    },
    '80': {
      label: this.config.sliderTitle[2],
      style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-16px, -60px)'
      }
    },
    '120': {
      label: this.config.sliderTitle[3],
      style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-24px, -60px)'
      }
    },
    '160': {
      label: this.config.sliderTitle[4],
      style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-24px, -60px)'
      }
    },
    '200': {
      label: this.config.sliderTitle[5],
      style: {
        width: this.dotSize,
        height: this.dotSize,
        display: 'block',
        backgroundColor: this.color,
        boxShadow: this.boxShadow,
        borderRadius: '7px',
        transform: this.dotPosition
      },
      activeStyle: {
        width: this.dotSize,
        height: this.dotSize,
        boxShadow: this.activeBoxShadow,
        borderRadius: '8px',
        backgroundColor: this.activeColor
      },
      labelStyle: {
        fontSize: this.fontSize,
        color: this.textColor,
        transform: 'translate(-24px, -60px)'
      }
    },
  };
  sliderOption = {
    width: this.sliderWidth,
    height: '6px',
    min: 0,
    max: 200,
    dotSize: 25,
    piecewise: false,
    tooltip: 'always',
    piecewiseLabel: false,
    process: true,
    railStyle: {
      'backgroundColor': this.color,
      'boxShadow': 'inset 0 2px 2px 0 rgba(0,0,0,0.50)',
      'borderRadius': '8px',
    },
    processStyle: {
      'backgroundColor': this.activeColor,
      'boxShadow': this.activeBoxShadow,
      'borderRadius': '8px',
    },
  };

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
    this.myVideo = video('my-video1', {
      loop: false,
      controls: false,
    });
    ViewController.getInstance().domReady();
    this.lightDom = document.getElementById('light');
  }

  resetEvent() {

  }

  @Watch('sliderNumber')
  lightControl(value: number) {
    switch (true) {
      case value === 0:
        this.lightDom.style.zIndex = '1';
        this.lightDom.style.width = 0;
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value < 42:
        this.lightDom.style.zIndex = '1';
        this.lightDom.style.width = (432 / 40) * (value) + 'px';
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value < 80:
        this.lightDom.style.zIndex = '2';
        this.lightDom.style.width = 432 + ((63 / 40) * (value - 41)) + 'px';
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value < 120:
        this.lightDom.style.zIndex = '2';
        this.lightDom.style.width = 493 + ((20 / 40) * (value - 81)) + 'px';
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value < 160:
        this.lightDom.style.zIndex = '2';
        this.lightDom.style.width = 515 + ((90 / 40) * (value - 121)) + 'px';
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value < 200:
        this.lightDom.style.zIndex = '2';
        this.lightDom.style.width = 605 + ((180 / 40) * (value - 161)) + 'px';
        this.isShowCandleImage = false;
        this.playButton = false;
        return;
      case value === 200:
        this.lightDom.style.width = '785px';
        this.lightDom.style.zIndex = '2';
        this.isShowCandleImage = true;
        this.playButton = true;
        return;
    }
  }

  play() {
    this.myVideo.play();
    this.isPlay = true;
    this.playButton = false;
    this.disableSlider = true;
  }

  resetVideo() {
    this.myVideo.pause();
    this.myVideo.currentTime(0);
  }

}
