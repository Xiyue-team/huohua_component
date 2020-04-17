import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import video from 'video.js';
const Swiper = require('swiper/dist/js/swiper.js');
import * as energy_poster_one_image from './sub_static/energy_poster/energy_poster_one.png';
import * as energy_poster_two_image from './sub_static/energy_poster/energy_poster_two.png';
import * as energy_poster_three_image from './sub_static/energy_poster/energy_poster_three.png';
import * as energy_poster_four_image from './sub_static/energy_poster/energy_poster_four.png';
import * as energy_poster_five_image from './sub_static/energy_poster/energy_poster_five.png';
import * as energy_poster_six_image from './sub_static/energy_poster/energy_poster_six.png';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  myVideo: any = [];
  mySwiper: any;
  show_left = false;
  show_right = true;
  video_poster = [
    energy_poster_one_image,
    energy_poster_two_image,
    energy_poster_three_image,
    energy_poster_four_image,
    energy_poster_five_image,
    energy_poster_six_image
  ];

  show_tips_text = [
    {show_text: false},
    {show_text: false},
    {show_text: false},
    {show_text: false},
    {show_text: false},
    {show_text: false}
  ];

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
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    const titleText = document.getElementsByClassName('title_text')[0];
    const tipsContainer: any = [], text_arrow: any = [];

    for (let i = 0; i < 6; i++) {
      tipsContainer.push(document.getElementsByClassName('tipsContainer')[i]);
      text_arrow.push(document.getElementsByClassName('text_arrow')[i]);
    }

      //初始化视频
      this.myVideo[0] = video('windVideo1', {
        loop: true,
        controls: false
      });

      this.myVideo[1] = video('windVideo2', {
        loop: true,
        controls: false
      });

      this.myVideo[2] = video('windVideo3', {
        loop: true,
        controls: false
      });

      this.myVideo[3] = video('windVideo4', {
        loop: true,
        controls: false
      });

      this.myVideo[4] = video('windVideo5', {
        loop: true,
        controls: false
      });

      this.myVideo[5] = video('windVideo6', {
        loop: true,
        controls: false
      });

    //初始化轮播组件
    this.mySwiper = new Swiper('.swiper-container', {
      spaceBetween: 0,
      observer: true,
      observeParents: true,
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: () => {
          this.pauseAllVideos();
          switch (this.mySwiper.activeIndex) {
            case 0:
              this.show_left = false;
              (titleText as HTMLElement).style.color = '#000000';
              break;
            case 1:
              this.show_left = true;
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (tipsContainer[1] as HTMLElement).style.left = '40.8%';
              (tipsContainer[1] as HTMLElement).style.top = '67.6%';
              this.myVideo[0].play();
              break;
            case 2:
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (tipsContainer[2] as HTMLElement).style.left = '18.8%';
              (tipsContainer[2] as HTMLElement).style.top = '65.8%';
              (text_arrow[1] as HTMLElement).style.width = '136px';
              this.myVideo[1].play();
              break;
            case 3:
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (tipsContainer[3] as HTMLElement).style.left = '52.9%';
              (tipsContainer[3] as HTMLElement).style.top = '34.5%';
              (text_arrow[2] as HTMLElement).style.width = '136px';
              this.myVideo[2].play();
              break;
            case 4:
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (tipsContainer[4] as HTMLElement).style.left = '62.5%';
              (tipsContainer[4] as HTMLElement).style.top = '31.4%';
              (text_arrow[3] as HTMLElement).style.width = '136px';
              this.myVideo[3].play();
              break;
            case 5:
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (tipsContainer[5] as HTMLElement).style.left = '51.7%';
              (tipsContainer[5] as HTMLElement).style.top = '63.1%';
              (text_arrow[4] as HTMLElement).style.width = '136px';
              this.myVideo[4].play();
              break;
            case 6:
              this.show_right = true;
              (titleText as HTMLElement).style.color = '#FFFFFF';
              (text_arrow[5] as HTMLElement).style.width = '136px';
              this.myVideo[5].play();
              break;
            case 7:
              this.show_right = false;
              (titleText as HTMLElement).style.color = '#000000';
              break;
            default:
              break;
          }
        },
      },
    });
  }

  video_convert_tip(index: number) {
    this.show_tips_text[index].show_text = !this.show_tips_text[index].show_text;
  }

  pauseAllVideos() {
    for (let i = 0; i < this.myVideo.length; i++) {
      this.myVideo[i].pause();
    }
  }
}
