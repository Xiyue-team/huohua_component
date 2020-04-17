import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { McfyViewHandler } from './services/McfyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const videojs = require( './video.js');

import blue from './sub_static/assets/blue.png';
import red from './sub_static/assets/red.png';
import zbz from './sub_static/assets/axis.png';
import bgplay from './sub_static/assets/play.png';
import bgplay2 from './sub_static/assets/2play.png';
import bgwmhhn from './sub_static/assets/wmenergy.png';
import bgymhhn from './sub_static/assets/ymenergy.png';
import ymsfdnl from './sub_static/assets/1ymsfdnl.jpg';
import wmsfdnl from './sub_static/assets/1wmsfdnl.jpg';

import ympng from './sub_static/assets/youmei.png';
import wmpng from './sub_static/assets/wumei.png';
import wm from './sub_static/video/wumei.mp4';
import ym from './sub_static/video/youmei.mp4';


@Component

export class MainVueComponent extends Vue {
  //视频引入
  firstvideo = wm;
  secondvideo = ym;
  ympng = ympng;
  wmpng = wmpng;
  //按钮等图片引入
  bgplay = bgplay;
  bgplay2 = bgplay2;
  bgwmhhn = bgwmhhn;
  bgymhhn = bgymhhn;
  sfnlym = ymsfdnl;
  sfnlwm = wmsfdnl;
  //右侧曲线引入
  line = blue;
  liner = red;
  //坐标轴
  zbz = zbz;
  //虚线、标识的v-show
  ymhhn = false;
  wmhhn = false;
  dash = false;
  ymsfdnl = false;
  wmsfdnl = false;
  topborderym = '';
  topborderwm = '';
  bottomborder = '';
  //动画视频播放
  play1: any;
  play2: any;
  //三个点击按钮的显示状态
  button = true;
  button1 = true;
  button2 = true;
  //蓝线实时绘制
  cover1 = false;
  //红线实时绘制
  cover3 = false;
  //曲线是否显示
  reds = false;
  blues = false;
  //z-index
  cengci1 = '';
  cengci2 = '';
  cengci3 = '';
  cengci4 = '';
  //遮罩
  zhe1 = false;
  zhe3 = false;
  //能量条
  widths = '0';
  width2 = '0';
  //适配
  zoom = 1;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new McfyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    ViewController.getInstance().domReady();
    //播放视频
    this.play1 = videojs('my-video1', {
      muted: true,
      controls: false,
      height: 330,
      width: 600,
      loop: false,
    });
    this.play2 = videojs('my-video2', {
      muted: true,
      controls: false,
      height: 330,
      width: 600,
      loop: false,
    });

    //适配缩放
    if (window.innerWidth >= 1370) {
      document.getElementById('charts').style.zoom = '1.2';
    }
    if (window.innerHeight <= 770) {
      document.getElementById('video').style.zoom = '0.7';
      document.getElementById('plays').style.zoom = '0.7';
      document.getElementById('play1').style.zoom = '0.8';
      document.getElementById('play2').style.zoom = '0.8';
    }
    if (window.innerHeight <= 540 && window.innerHeight >= 485) {
      document.getElementById('video').style.zoom = '0.6';
      document.getElementById('charts').style.zoom = '0.7';
    }
    if (window.innerHeight <= 480) {
      document.getElementById('charts').style.zoom = '0.7';
      document.getElementById('plays').style.zoom = '0.5';
      document.getElementById('play1').style.zoom = '0.6';
      document.getElementById('play2').style.zoom = '0.6';
    }
    if (window.innerHeight <= 360) {
      document.getElementById('charts').style.zoom = '0.5';
    }
  }

  //点击一起播放按钮 两个动画都播放
  plays() {
    //视频回到初始状态
    this.play1.currentTime(0);
    this.play2.currentTime(0);
    this.play1.pause();
    this.play2.pause();
    //按钮消失
    this.button = false;
    this.button1 = false;
    this.button2 = false;
    //播放动画
    this.play1.play();
    this.play2.play();
    //调用能量条动画方法和画线方法
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.drawline();
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.progress1();
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.progress2();
    const thiz = this;
    //对应动画结束时按钮出现
    this.play1.on('ended', function() {
      thiz.button = true;
      thiz.button1 = true;
    });
    this.play2.on('ended', function() {
      thiz.button2 = true;
    });
  }

  //点击播放无酶动画
  wumei() {
    const thiz = this;
    //执行动画
    this.play1.play();
    this.button1 = false;
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.progress1();
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.drawblueline();
    //动画结束
    this.play1.on('ended', function() {
      thiz.button1 = true;
    });
  }

  //点击播放有酶动画
  youmei() {
    const thiz = this;
    //执行动画
    this.play2.play();
    this.button2 = false;
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.progress2();
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.drawredline();
    //动画结束
    this.play2.on('ended', function() {
      thiz.button2 = true;
    });
  }
  // 重置
  reset() {
    //点击重置让视频回到未播放状态
    this.play1.currentTime(0);
    this.play2.currentTime(0);
    this.play1.pause();
    this.play2.pause();
    //按钮出现
    this.button = true;
    this.button1 = true;
    this.button2 = true;
    (ViewController.getInstance().viewHandler as McfyViewHandler).Photosynthesis.reset();
  }
}
