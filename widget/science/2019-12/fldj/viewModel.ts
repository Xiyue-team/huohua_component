import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import video from 'video.js';
import * as wind_one_image from './sub_static/poster/wind_one.png';
import * as wind_two_image from './sub_static/poster/wind_two.png';
import * as wind_three_image from './sub_static/poster/wind_three.png';
import * as wind_four_image from './sub_static/poster/wind_four.png';
import * as wind_five_image from './sub_static/poster/wind_five.png';
import * as wind_six_image from './sub_static/poster/wind_six.png';
import * as wind_seven_image from './sub_static/poster/wind_seven.png';
import * as wind_eight_image from './sub_static/poster/wind_eight.png';
import * as wind_nine_image from './sub_static/poster/wind_nine.png';
import * as wind_ten_image from './sub_static/poster/wind_ten.png';

import * as wind_poster_one_image from './sub_static/wind_poster/wind_poster_one.png';
import * as wind_poster_two_image from './sub_static/wind_poster/wind_poster_two.png';
import * as wind_poster_three_image from './sub_static/wind_poster/wind_poster_three.png';
import * as wind_poster_four_image from './sub_static/wind_poster/wind_poster_four.png';
import * as wind_poster_five_image from './sub_static/wind_poster/wind_poster_five.png';
import * as wind_poster_six_image from './sub_static/wind_poster/wind_poster_six.png';
import * as wind_poster_seven_image from './sub_static/wind_poster/wind_poster_seven.png';
import * as wind_poster_eight_image from './sub_static/wind_poster/wind_poster_eight.png';
import * as wind_poster_nine_image from './sub_static/wind_poster/wind_poster_nine.png';
import * as wind_poster_ten_image from './sub_static/wind_poster/wind_poster_ten.png';

import * as wind_level_one from './sub_static/wind_video/wind_level_one.mp4';
import * as wind_level_two from './sub_static/wind_video/wind_level_two.mp4';
import * as wind_level_three from './sub_static/wind_video/wind_level_three.mp4';
import * as wind_level_four from './sub_static/wind_video/wind_level_four.mp4';
import * as wind_level_five from './sub_static/wind_video/wind_level_five.mp4';
import * as wind_level_six from './sub_static/wind_video/wind_level_six.mp4';
import * as wind_level_seven from './sub_static/wind_video/wind_level_seven.mp4';
import * as wind_level_eight from './sub_static/wind_video/wind_level_eight.mp4';
import * as wind_level_nine from './sub_static/wind_video/wind_level_nine.mp4';
import * as wind_level_ten from './sub_static/wind_video/wind_level_ten.mp4';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  show_video = false;
  show_bgImage = true;
  top_video_poster_count = 5;
  bottom_video_poster_count = 5;
  top_video_poster: any = [];
  bottom_video_poster: any = [];
  detectQQBrowser = window.env.browserInfo.isQQ;
  myPlayer: any;
  videoAnnotationText = '';
  wind_imageDom: any;

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

    this.top_video_poster[0] = wind_one_image;
    this.top_video_poster[1] = wind_two_image;
    this.top_video_poster[2] = wind_three_image;
    this.top_video_poster[3] = wind_four_image;
    this.top_video_poster[4] = wind_five_image;
    this.bottom_video_poster[0] = wind_six_image;
    this.bottom_video_poster[1] = wind_seven_image;
    this.bottom_video_poster[2] = wind_eight_image;
    this.bottom_video_poster[3] = wind_nine_image;
    this.bottom_video_poster[4] = wind_ten_image;
  }

  mounted() {
    ViewController.getInstance().domReady();
    if (this.detectQQBrowser) {
      this.wind_imageDom = document.getElementById('wind_image');
    }
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    const first_top_image = document.getElementsByClassName('top_wind_level')[0];
    (first_top_image as HTMLElement).style.marginLeft = '0px';

    const bottom_top_image = document.getElementsByClassName('bottom_wind_level')[0];
    (bottom_top_image as HTMLElement).style.marginLeft = '0px';

    //初始化视频
    if (!this.detectQQBrowser) {
      this.myPlayer = video('windVideo', {
        loop: true,
        controls: false,
      });
    }
  }

  play_topWind_video(num: number) {
    this.show_video = true;
    this.show_bgImage = false;
    if (this.detectQQBrowser) {
      switch (num) {
        case 1:
          this.wind_imageDom.src = wind_poster_one_image;
          this.videoAnnotationText = this.lang.video_annotation[0];
          break;
        case 2:
          this.wind_imageDom.src = wind_poster_two_image;
          this.videoAnnotationText = this.lang.video_annotation[1];
          break;
        case 3:
          this.wind_imageDom.src = wind_poster_three_image;
          this.videoAnnotationText = this.lang.video_annotation[2];
          break;
        case 4:
          this.wind_imageDom.src = wind_poster_four_image;
          this.videoAnnotationText = this.lang.video_annotation[3];
          break;
        case 5:
          this.wind_imageDom.src = wind_poster_five_image;
          this.videoAnnotationText = this.lang.video_annotation[4];
          break;
        default:
          break;
      }
      return ;
    }
    this.myPlayer.pause();
    switch (num) {
      case 1:
        this.myPlayer.src(wind_level_one);
        this.myPlayer.poster(wind_poster_one_image);
        this.videoAnnotationText = this.lang.video_annotation[0];
        break;
      case 2:
        this.myPlayer.src(wind_level_two);
        this.myPlayer.poster(wind_poster_two_image);
        this.videoAnnotationText = this.lang.video_annotation[1];
        break;
      case 3:
        this.myPlayer.src(wind_level_three);
        this.myPlayer.poster(wind_poster_three_image);
        this.videoAnnotationText = this.lang.video_annotation[2];

        break;
      case 4:
        this.myPlayer.src(wind_level_four);
        this.myPlayer.poster(wind_poster_four_image);
        this.videoAnnotationText = this.lang.video_annotation[3];
        break;
      case 5:
        this.myPlayer.src(wind_level_five);
        this.myPlayer.poster(wind_poster_five_image);
        this.videoAnnotationText = this.lang.video_annotation[4];
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.myPlayer.load();
      this.myPlayer.play();
    }, 200);
  }

  play_bottomWind_video(num: number) {
    this.show_video = true;
    this.show_bgImage = false;
    if (this.detectQQBrowser) {
      switch (num) {
        case 1:
          this.wind_imageDom.src = wind_poster_six_image;
          this.videoAnnotationText = this.lang.video_annotation[5];
          break;
        case 2:
          this.wind_imageDom.src = wind_poster_seven_image;
          this.videoAnnotationText = this.lang.video_annotation[6];
          break;
        case 3:
          this.wind_imageDom.src = wind_poster_eight_image;
          this.videoAnnotationText = this.lang.video_annotation[7];
          break;
        case 4:
          this.wind_imageDom.src = wind_poster_nine_image;
          this.videoAnnotationText = this.lang.video_annotation[8];
          break;
        case 5:
          this.wind_imageDom.src = wind_poster_ten_image;
          this.videoAnnotationText = this.lang.video_annotation[9];
          break;
        default:
          break;
      }
      return ;
    }
    this.myPlayer.pause();
    switch (num) {
      case 1:
        this.myPlayer.src(wind_level_six);
        this.myPlayer.poster(wind_poster_six_image);
        this.videoAnnotationText = this.lang.video_annotation[5];
        break;
      case 2:
        this.myPlayer.src(wind_level_seven);
        this.myPlayer.poster(wind_poster_seven_image);
        this.videoAnnotationText = this.lang.video_annotation[6];
        break;
      case 3:
        this.myPlayer.src(wind_level_eight);
        this.myPlayer.poster(wind_poster_eight_image);
        this.videoAnnotationText = this.lang.video_annotation[7];
        break;
      case 4:
        this.myPlayer.src(wind_level_nine);
        this.myPlayer.poster(wind_poster_nine_image);
        this.videoAnnotationText = this.lang.video_annotation[8];
        break;
      case 5:
        this.myPlayer.src(wind_level_ten);
        this.myPlayer.poster(wind_poster_ten_image);
        this.videoAnnotationText = this.lang.video_annotation[9];
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.myPlayer.load();
      this.myPlayer.play();
    }, 200);
  }

  exit_playVideo() {
    this.show_video = false;
    this.show_bgImage = true;
  }
}
