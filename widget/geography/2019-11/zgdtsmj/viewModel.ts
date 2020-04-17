import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
const Swiper = require('swiper/dist/js/swiper.js');
import * as guangdongImage1 from './sub_static/guangdong/guangdong1.png';
import * as guangdongImage2 from './sub_static/guangdong/guangdong2.png';
import * as guangdongImage3 from './sub_static/guangdong/guangdong3.png';
import * as anhuiImage1 from './sub_static/anhui/anhui1.png';
import * as anhuiImage2 from './sub_static/anhui/anhui2.png';
import * as anhuiImage3 from './sub_static/anhui/anhui3.png';
import * as fujianImage1 from './sub_static/fujian/fujian1.png';
import * as fujianImage2 from './sub_static/fujian/fujian2.png';
import * as fujianImage3 from './sub_static/fujian/fujian3.png';
import * as hunanImage1 from './sub_static/hunan/hunan1.png';
import * as hunanImage2 from './sub_static/hunan/hunan2.png';
import * as hunanImage3 from './sub_static/hunan/hunan3.png';
import * as beijingImage1 from './sub_static/beijing/beijing1.png';
import * as beijingImage2 from './sub_static/beijing/beijing2.png';
import * as beijingImage3 from './sub_static/beijing/beijing3.png';
import * as shanxiImage1 from './sub_static/shanxi/shanxi1.png';
import * as shanxiImage2 from './sub_static/shanxi/shanxi2.png';
import * as shanxiImage3 from './sub_static/shanxi/shanxi3.png';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  buttonValue = 0;
  mySwiper: any;
  imageArray: any = [];
  text: any = [];
  textContainer = document.getElementsByClassName('flower_title_one');
  isIOS = window['env'].browserInfo.isIphone || window['env'].browserInfo.isIpad || window['env'].browserInfo.os === 'Mac OS X';
  isedit = window['env'].browserInfo.isHuohuaApp || window['env'].browserInfo.isHuohuaPlayer;
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
    if (this.isIOS && this.isedit) {
      (document.getElementsByClassName('swiper')[0] as any).style.marginRight = '5px';
    }
    //初始化轮播组件
    this.mySwiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }

  beijing() {
    this.mySwiper.slideTo(0);
    this.imageArray = [beijingImage1, beijingImage2, beijingImage3];
    this.text = [this.lang.beijingText[0], this.lang.beijingText[1], this.lang.beijingText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '80px';
    this.buttonValue = 1;
  }

  shanxi() {
    this.mySwiper.slideTo(0);
    this.imageArray = [shanxiImage1, shanxiImage2, shanxiImage3];
    this.text = [this.lang.shanxiText[0], this.lang.shanxiText[1], this.lang.shanxiText[2]];
    this.resetHeight();
    this.buttonValue = 2;
  }

  anhui() {
    this.mySwiper.slideTo(0);
    this.imageArray = [anhuiImage1, anhuiImage2, anhuiImage3];
    this.text = [this.lang.anhuiText[0], this.lang.anhuiText[1], this.lang.anhuiText[2]];
    this.resetHeight();
    this.buttonValue = 3;
  }

  hunan() {
    this.mySwiper.slideTo(0);
    this.imageArray = [hunanImage1, hunanImage2, hunanImage3];
    this.text = [this.lang.hunanText[0], this.lang.hunanText[1], this.lang.hunanText[2]];
    this.resetHeight();
    this.buttonValue = 4;
    if (this.isIOS) {
      (this.textContainer[2] as HTMLElement).style.height = '132px';
    }

  }

  fujian() {
    this.mySwiper.slideTo(0);
    this.imageArray = [fujianImage1, fujianImage2, fujianImage3];
    this.text = [this.lang.fujianText[0], this.lang.fujianText[1], this.lang.fujianText[2]];
    this.resetHeight();
    (this.textContainer[2] as HTMLElement).style.height = '132px';
    if (this.isIOS) {
      (this.textContainer[1] as HTMLElement).style.height = '132px';
    }
    this.buttonValue = 5;
  }

  guangdong() {
    this.mySwiper.slideTo(0);
    this.imageArray = [guangdongImage1, guangdongImage2, guangdongImage3];
    this.text = [this.lang.guangdongText[0], this.lang.guangdongText[1], this.lang.guangdongText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '80px';
    (this.textContainer[2] as HTMLElement).style.height = '80px';
    this.buttonValue = 6;
  }

  resetHeight() {
    for (let i = 0; i < this.textContainer.length; i++) {
      (this.textContainer[i] as HTMLElement).style.height = '104px';
    }
  }

  wardOff() {
    this.buttonValue = 0;
  }

}
