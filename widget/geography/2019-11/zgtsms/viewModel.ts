import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
const Swiper = require('swiper/dist/js/swiper.js');
import * as sichuanImage1 from './sub_static/sichuan/sichuan1.png';
import * as sichuanImage2 from './sub_static/sichuan/sichuan2.png';
import * as sichuanImage3 from './sub_static/sichuan/sichuan3.png';
import * as guangdongImage1 from './sub_static/guangdong/guangdong1.png';
import * as guangdongImage2 from './sub_static/guangdong/guangdong2.png';
import * as guangdongImage3 from './sub_static/guangdong/guangdong3.png';
import * as anhuiImage1 from './sub_static/anhui/anhui1.png';
import * as anhuiImage2 from './sub_static/anhui/anhui2.png';
import * as anhuiImage3 from './sub_static/anhui/anhui3.png';
import * as fujianImage1 from './sub_static/fujian/fujian1.png';
import * as fujianImage2 from './sub_static/fujian/fujian2.png';
import * as fujianImage3 from './sub_static/fujian/fujian3.png';
import * as jiangsuImage1 from './sub_static/jiangsu/jiangsu1.png';
import * as jiangsuImage2 from './sub_static/jiangsu/jiangsu2.png';
import * as jiangsuImage3 from './sub_static/jiangsu/jiangsu3.png';
import * as zhejiangImage1 from './sub_static/zhejiang/zhejiang1.png';
import * as zhejiangImage2 from './sub_static/zhejiang/zhejiang2.png';
import * as zhejiangImage3 from './sub_static/zhejiang/zhejiang3.png';
import * as hunanImage1 from './sub_static/hunan/hunan1.png';
import * as hunanImage2 from './sub_static/hunan/hunan2.png';
import * as hunanImage3 from './sub_static/hunan/hunan3.png';
import * as shandongImage1 from './sub_static/shandong/shandong1.png';
import * as shandongImage2 from './sub_static/shandong/shandong2.png';
import * as shandongImage3 from './sub_static/shandong/shandong3.png';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  buttonValue = 0;
  mySwiper: any;
  imageArray: any = [];
  text: any = [];
  foodName: string[] = this.lang.sichuanTitle;
  foodTitle = this.foodName[0];
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

      on: {
        slideChange: () => {
          this.foodTitle = this.foodName[this.mySwiper.activeIndex];
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }


  sichuan() {
    this.foodName = this.lang.sichuanTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 1;
    this.imageArray = [sichuanImage1, sichuanImage2, sichuanImage3];
    this.text = [this.lang.sichuanText[0], this.lang.sichuanText[1], this.lang.sichuanText[2]];
    this.resetHeight();
  }

  guangdong() {
    this.foodName = this.lang.guangdongTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 2;
    this.imageArray = [guangdongImage1, guangdongImage2, guangdongImage3];
    this.text = [this.lang.guangdongText[0], this.lang.guangdongText[1], this.lang.guangdongText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '132px';
  }

  anhui() {
    this.foodName = this.lang.anhuiTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 3;
    this.imageArray = [anhuiImage1, anhuiImage2, anhuiImage3];
    this.text = [this.lang.anhuiText[0], this.lang.anhuiText[1], this.lang.anhuiText[2]];
    this.resetHeight();
  }

  fujian() {
    this.foodName = this.lang.fujianTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 4;
    this.imageArray = [fujianImage1, fujianImage2, fujianImage3];
    this.text = [this.lang.fujianText[0], this.lang.fujianText[1], this.lang.fujianText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '132px';
  }

  jiangsu() {
    this.foodName = this.lang.jiangsuTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 5;
    this.imageArray = [jiangsuImage1, jiangsuImage2, jiangsuImage3];
    this.text = [this.lang.jiangsuText[0], this.lang.jiangsuText[1], this.lang.jiangsuText[2]];
    this.resetHeight();
    if (this.isIOS) {
      (this.textContainer[2] as HTMLElement).style.height = '132px';
    }
  }

  zhejiang() {
    this.foodName = this.lang.zhejiangTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 6;
    this.imageArray = [zhejiangImage1, zhejiangImage2, zhejiangImage3];
    this.text = [this.lang.zhejiangText[0], this.lang.zhejiangText[1], this.lang.zhejiangText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '132px';
    (this.textContainer[1] as HTMLElement).style.height = '132px';
  }

  hunan() {
    this.foodName = this.lang.hunanTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 7;
    this.imageArray = [hunanImage1, hunanImage2, hunanImage3];
    this.text = [this.lang.hunanText[0], this.lang.hunanText[1], this.lang.hunanText[2]];
    this.resetHeight();
    (this.textContainer[0] as HTMLElement).style.height = '132px';
    (this.textContainer[1] as HTMLElement).style.height = '132px';
  }

  shandong() {
    this.foodName = this.lang.shandongTitle;
    this.foodTitle = this.foodName[0];
    this.mySwiper.slideTo(0);
    this.buttonValue = 8;
    this.imageArray = [shandongImage1, shandongImage2, shandongImage3];
    this.text = [this.lang.shandongText[0], this.lang.shandongText[1], this.lang.shandongText[2]];
    this.resetHeight();
    if (this.isIOS) {
      (this.textContainer[0] as HTMLElement).style.height = '132px';
    }
    (this.textContainer[1] as HTMLElement).style.height = '132px';
    (this.textContainer[2] as HTMLElement).style.height = '132px';
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
