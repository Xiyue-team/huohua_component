import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {McldzlViewHandler} from './services/McldzlViewHandler';
const video = require('video.js/dist/video.js');

@Component
export class ViewModel extends Vue {

  lang = window.env.browserInfo.lang;

  // 显示那个视频
  currentIndex = 0;

  // 显示封面
  currentCoverIndex = 0;

  // 显示视频页面
  showVideo = false;

  // 显示视频中间重复播放控件
  showPlayControlImage = false;

  // 三个视频
  leftVideo: any;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.showReset = false;
    viewOption.showMobileResetIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new McldzlViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    this.leftVideo = this.myVideo('leftVideo');
    this.detectVideoEnd(this.leftVideo);
    this.detectVideoStart(this.leftVideo);

    ViewController.getInstance().domReady();
  }

  myVideo(id: string) {
    return video(id, {
      loop: false,
      controls: false,
    });

  }

  resetEvent() {
    this.showVideo = false;
    this.resetVideo();
    this.currentCoverIndex = 0;
    this.showPlayControlImage = false;
  }

  // 改变video路径
  changeVideoSrc(requireVideo: any) {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      this.leftVideo.src(requireVideo);
    } else {
      (this as any).$refs.icon.src = requireVideo;
    }
  }

  // 初始界面三个拖被点击事件
  leftImageClickEvent() {
    this.resetVideo();
    this.currentCoverIndex = 1;
    this.showVideo = true;
    this.currentIndex = 1;
    setTimeout(() => {
      this.changeVideoSrc(require('./sub_static/video/video1.mp4'));
      this.leftVideo.play();
    }, 100);
  }

  centerImageClickEvent() {
    this.resetVideo();
    this.currentCoverIndex = 2;
    this.showVideo = true;
    this.currentIndex = 2;
    setTimeout(() => {
      this.changeVideoSrc(require('./sub_static/video/video2.mp4'));
      this.leftVideo.play();
    }, 100);
  }

  rightImageClickEvent() {
    this.resetVideo();
    this.currentCoverIndex = 3;
    this.showVideo = true;
    this.currentIndex = 3;
    setTimeout(() => {
      this.changeVideoSrc(require('./sub_static/video/video3.mp4'));
      this.leftVideo.play();
    }, 100);
  }

  // 视频下方三个控件点击事件
  leftControlClickEvent() {
    this.leftImageClickEvent();
    this.showPlayControlImage = false;
  }

  centerControlClickEvent() {
    this.centerImageClickEvent();
    this.showPlayControlImage = false;
  }

  rightControlClickEvent() {
    this.rightImageClickEvent();
    this.showPlayControlImage = false;
  }

  // 重复播放按钮点击
  clickVideoPlayControlImage() {
    this.leftVideo.play();
    this.showPlayControlImage = false;
  }

  // 重置所有视频
  resetVideo() {
    this.stopAllVideos(this.leftVideo);
  }

  //停止所有视频
  stopAllVideos(myVideo: any) {
    myVideo.pause();
    myVideo.currentTime(0);
  }

  //检测视频播放完毕
  detectVideoEnd(mVideo: any) {
    mVideo.on('ended', () => {
      this.showPlayControlImage = true;
    });
  }

  // 检测视频是否开始播放
  detectVideoStart(mVideo: any) {
    mVideo.on('timeupdate', () => {
      if (mVideo.currentTime() > 0.1) {
        this.currentCoverIndex = 0;
      }
    });
  }
}
