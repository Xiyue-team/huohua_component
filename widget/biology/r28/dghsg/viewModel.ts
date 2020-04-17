import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';
import * as video_poster_one from './sub_static/video/catheter_poster.png';
import * as video_poster_two from './sub_static/video/sieve_tube_poster.png';
import video from 'video.js';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {

  lang = window.env.browserInfo.lang;
  show_originalImg = true;
  catheterColor = false;
  sieve_tubeColor = false;
  activeVideo_one = false;
  activeVideo_two = false;
  mark_show = false;
  show_label_one = false;
  myVideo: any = [];
  poster_one = video_poster_one;
  poster_two = video_poster_two;

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
    this.myVideo[0] = video('my-video1', {
      loop: true,
      controls: false
    });
    this.myVideo[1] = video('my-video2', {
      loop: true,
      controls: false
    });
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    console.log('1111', this.myVideo[0]);
  }

  /*导管*/
  catheterEvent() {
    if (this.catheterColor) {
      return ;
    }
    this.show_originalImg = false;
    this.myVideo[0].poster(require('./sub_static/video/catheter_poster.png'));
    this.activeVideo_one = true;
    this.activeVideo_two = false;
    this.stopVideo(this.myVideo[1]);
    this.myVideo[0].load();
    this.myVideo[0].play();
    this.sieve_tubeColor = false;
    this.catheterColor = true;
    this.show_label_one = this.mark_show;

  }

  /*筛管*/
  sieve_tube_Event() {
    if (this.sieve_tubeColor) {
      return ;
    }
    this.show_originalImg = false;
    this.myVideo[1].poster(require('./sub_static/video/sieve_tube_poster.png'));
    this.activeVideo_one = false;
    this.activeVideo_two = true;
    this.stopVideo(this.myVideo[0]);
    this.myVideo[1].load();
    this.myVideo[1].play();
    this.catheterColor = false;
    this.sieve_tubeColor = true;
    this.show_label_one = this.mark_show;
  }

  /*停止视频*/
  stopVideo(mVideo: any) {
    mVideo.pause();
    mVideo.currentTime(0);
  }

  reset() {
    this.show_originalImg = true;
    this.catheterColor = false;
    this.sieve_tubeColor = false;
    this.stopVideo(this.myVideo[0]);
    this.stopVideo(this.myVideo[1]);
    this.show_label_one = false;
    this.activeVideo_one = false;
    this.activeVideo_two = false;
    this.mark_show = false;
  }

  @Watch('mark_show')
  isShowMark(value: boolean) {
    this.show_label_one = value;
  }
}
