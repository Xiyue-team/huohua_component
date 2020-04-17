import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { ZjzbViewHandler } from './services/ZjzbViewHandler';
const viewOptionConfig = require('./meta.json');
const Swiper = require('swiper/dist/js/swiper.js');
const video = require('video.js/dist/video.js');
import * as poplarImg from './sub_static/wind_flower/poplar_flower.png';
import * as willowImg from './sub_static/wind_flower/willow_flower.png';
import * as popcornImg from './sub_static/wind_flower/popcorn_flower.png';
import * as apricotImg from './sub_static/insect_flower/apricot_flower.png';
import * as peachImg from './sub_static/insect_flower/peach_flower.png';
import * as rapeImg from './sub_static/insect_flower/rape_flower.png';
import * as strelitziaImg from './sub_static/bird_flower/strelitzia_flower.png';
import * as kapokImg from './sub_static/bird_flower/kapok_flower.png';
import * as admiraltyImg from './sub_static/bird_flower/upside_down_admiralty_flower.png';

import * as videoOnePoster from './sub_static/wind_flower/wind_flower_video_poster.png';
import * as videoTwoPoster from './sub_static/insect_flower/insect_flower_video_poster.png';
import * as videoThreePoster from './sub_static/bird_flower/bird_flower_video_poster.png';


@Component
export class ViewModel extends Vue {
  mySwiper: any;
  show_bg = true;
  showButton = false;
  wind_flowerColor = false;
  insect_flowerColor = false;
  bird_flowerColor = false;
  img_icon_show = false;
  video_icon_show = false;
  show_arrow = false;
  imageOne = poplarImg;
  imageTwo = willowImg;
  imageThree = popcornImg;
  active1 = false;
  active2 = false;
  active3 = false;
  myVideo: any = [];
  show_gallery = false;
  showPlayButton = false;
  clickNum = 0;
  lang = window.env.browserInfo.lang;
  isMobile = window.env.browserInfo.isSmallDevice;
  flowerOne_title = this.lang.willow_flower_title;
  flowerTwo_title = this.lang.poplar_flower_title;
  flowerThree_title = this.lang.popcorn_flower_title;
  flower_text_title = this.lang.wind_flower_text_title;
  posterOne = videoOnePoster;
  posterTwo = videoTwoPoster;
  posterThree = videoThreePoster;


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
    this.myVideo[0] = video('my-video1', {
      loop: false,
      controls: false,
    });
    this.myVideo[1] = video('my-video2', {
      loop: false,
      controls: false,
    });
    this.myVideo[2] = video('my-video3', {
      loop: false,
      controls: false,
    });

    if (window.env.browserInfo.isSmallDevice) {
      (document.getElementsByClassName('title_text')[0] as HTMLElement).style.fontSize = '18px';
    }

    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

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

    // 鼠标移至图片上时左右箭头出现
    const imageContainer = document.getElementsByClassName('image_changes')[0];
    imageContainer.addEventListener('mouseover', () => {
      this.show_arrow = true;
    });

    imageContainer.addEventListener('mouseout', () => {
      this.show_arrow = false;
    });
  }

  /*风媒花*/
  wind_flowerEvent() {
    if (!this.wind_flowerColor) {
      this.changeImgsAndVideos();
      this.active1 = true;
      this.active2 = false;
      this.active3 = false;
      this.pauseOtherVideo(this.myVideo[1]);
      this.pauseOtherVideo(this.myVideo[2]);
      this.myVideo[0].load();
      this.myVideo[0].play();
      this.detectVideoEnd(this.myVideo[0]);
      this.wind_flowerColor = true;
      this.insect_flowerColor = false;
      this.bird_flowerColor = false;
    }
    if (this.img_icon_show) {
      this.imageOne = poplarImg;
      this.imageTwo = willowImg;
      this.imageThree = popcornImg;
    }
    this.flowerOne_title = this.lang.willow_flower_title;
    this.flowerTwo_title = this.lang.poplar_flower_title;
    this.flowerThree_title = this.lang.popcorn_flower_title;
  }

  /*虫媒花*/
  insect_flowerEvent() {
    if (!this.insect_flowerColor) {
      this.changeImgsAndVideos();
      this.active1 = false;
      this.active2 = true;
      this.active3 = false;
      this.pauseOtherVideo(this.myVideo[0]);
      this.pauseOtherVideo(this.myVideo[2]);
      this.myVideo[1].load();
      this.myVideo[1].play();
      this.detectVideoEnd(this.myVideo[1]);
      this.wind_flowerColor = false;
      this.insect_flowerColor = true;
      this.bird_flowerColor = false;
    }
    if (this.img_icon_show) {
      this.imageOne = apricotImg;
      this.imageTwo = peachImg;
      this.imageThree = rapeImg;
    }
    this.flowerOne_title = this.lang.apricot_flower_title;
    this.flowerTwo_title = this.lang.peach_flower_title;
    this.flowerThree_title = this.lang.rape_flower_title;
  }

  /*鸟媒花*/
  bird_flowerEvent() {
    if (!this.bird_flowerColor) {
      this.changeImgsAndVideos();
      this.active1 = false;
      this.active2 = false;
      this.active3 = true;
      this.pauseOtherVideo(this.myVideo[0]);
      this.pauseOtherVideo(this.myVideo[1]);
      this.myVideo[2].load();
      this.myVideo[2].play();
      this.detectVideoEnd(this.myVideo[2]);
      this.wind_flowerColor = false;
      this.insect_flowerColor = false;
      this.bird_flowerColor = true;
    }
    if (this.img_icon_show) {
      this.imageOne = strelitziaImg;
      this.imageTwo = kapokImg;
      this.imageThree = admiraltyImg;
    }
    this.flowerOne_title = this.lang.strelitzia_flower_title;
    this.flowerTwo_title = this.lang.kapok_flower_title;
    this.flowerThree_title = this.lang.fuchsia_flower_title;
  }

  /*按钮切换*/
  change_iconEvent() {
    this.clickNum += 1;
    this.showPlayButton = false;
    if (this.clickNum % 2 === 0) {
      this.img_icon_show = true;
      this.video_icon_show = false;
      this.show_gallery = false;
      if (this.wind_flowerColor) {
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        this.myVideo[0].load();
        this.myVideo[0].play();
        this.detectVideoEnd(this.myVideo[0]);
      }

      if (this.insect_flowerColor) {
        this.active1 = false;
        this.active2 = true;
        this.active3 = false;
        this.myVideo[1].load();
        this.myVideo[1].play();
        this.detectVideoEnd(this.myVideo[1]);
      }

      if (this.bird_flowerColor) {
        this.active1 = false;
        this.active2 = false;
        this.active3 = true;
        this.myVideo[2].load();
        this.myVideo[2].play();
        this.detectVideoEnd(this.myVideo[2]);
      }
      return ;
    }
    this.img_icon_show = false;
    this.video_icon_show = true;
    this.active1 = false;
    this.active2 = false;
    this.active3 = false;
    this.stopVideo();
    this.show_gallery = true;
  }

  playVideo() {
    this.showPlayButton = false;
    if (this.wind_flowerColor) {
      this.active1 = true;
      this.active2 = false;
      this.active3 = false;
      this.myVideo[0].load();
      this.myVideo[0].play();
      this.detectVideoEnd(this.myVideo[0]);
    }

    if (this.insect_flowerColor) {
      this.active1 = false;
      this.active2 = true;
      this.active3 = false;
      this.myVideo[1].load();
      this.myVideo[1].play();
      this.detectVideoEnd(this.myVideo[1]);
    }

    if (this.bird_flowerColor) {
      this.active1 = false;
      this.active2 = false;
      this.active3 = true;
      this.myVideo[2].load();
      this.myVideo[2].play();
      this.detectVideoEnd(this.myVideo[2]);
    }
  }

  /*检测视频播放完毕*/
  detectVideoEnd(mVideo: any) {
    mVideo.on('ended', () => {
      this.showPlayButton = true;
    });
  }

  /*停止所有视频*/
  pauseOtherVideo(myVideo: any) {
    myVideo.pause();
    myVideo.currentTime(0);
  }

  /*停止所有视频*/
  stopVideo() {
    for (let i = 0; i < 3; i++) {
      this.myVideo[i].pause();
      this.myVideo[i].currentTime(0);
    }
  }

  /*切换对应视频及图片*/
  changeImgsAndVideos() {
    this.showButton = true;
    this.clickNum = 0;
    (this.mySwiper as any).slideTo(0);
    this.img_icon_show = true;
    this.show_bg = false;
    this.video_icon_show = false;
    this.show_gallery = false;
    this.showPlayButton = false;
  }
}
