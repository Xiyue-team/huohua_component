import Vue from 'vue';
import video from 'video.js';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { DycxydcViewHandler } from './services/DycxydcViewHandler';

import electronic_unclick from './sub_static/img/electronic_unclick@2x.png';
import electronic_click from './sub_static/img/electronic_click@2x.png';
import sulfuric_acid_click from './sub_static/img/sulfuric_acid_click@2x.png@2x.png';
import sulfuric_acid_unclick from './sub_static/img/sulfuric_acid_unclick@2x.png';
import zinc_click from './sub_static/img/zinc_click@2x.png';
import zinc_unclick from './sub_static/img/zinc_unclick@2x.png';
import * as coverImage from './sub_static/img/macro_click@2x.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
  // 标题
  title: string = window.env.browserInfo.lang.title;
  // 按钮
  button: Array<string> = window.env.browserInfo.lang.button;
  // 提示
  notice: string = window.env.browserInfo.lang.notice;
  // 电极
  electrode: Array<string> = window.env.browserInfo.lang.electrode;
  // 存储视频
  player: any;
  // 当前是否是微观选项
  isMicro = false;
  // 当前是否是微观
  isMacro = false;
  // 是否显示化学反应方程式
  isShowReaction = false;
  // 是否为初始界面
  isOriginal = true;
  // 是否显示灯泡装置
  isLightBulbShow = false;
  // 是否显示溶液
  isSolutionShow = false;
  // 是否显示芯片
  isZincShow = false;
  // 是否配置完成
  isDeviceFinish = false;
  // 装置图片
  zinc_image: string = zinc_unclick;
  electronic_image: string = electronic_unclick;
  sulfuric_acid_image: string = sulfuric_acid_unclick;
  // 视频封面图
  posterImage = coverImage;

  created() {
    const viewOption = new ViewOption();
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new DycxydcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.initVideo();
    this.setBgColor();
  }

  // 初始化视频
  private initVideo() {
    this.player = video('microVideo', {
      loop: true,
      controls: false
    });
  }

  // 播放视频
  playVideo() {
    this.player.play();
  }

  // 点击选择宏观或微观
  async selectType(type: string) {
    if (type === 'micro') {
      if (this.isMicro) {
        return;
      }
      this.isMicro = true;
      this.isMacro = false;
      this.playVideo();
    } else {
      this.isMicro = false;
      this.isMacro = true;
      this.player.currentTime(0);
    }
  }

  // 显示灯泡导线
  showLightBulb() {
    this.moveEquation();
    this.isOriginal = false;
    this.isLightBulbShow = true;
    this.electronic_image = electronic_click;
    this.judgeDeviceFinish();
  }

  // 显示硫酸溶液
  showSolution() {
    this.moveEquation();
    this.isOriginal = false;
    this.isSolutionShow = true;
    this.sulfuric_acid_image = sulfuric_acid_click;
    this.judgeDeviceFinish();
  }

  // 显示锌片
  showZinc() {
    this.moveEquation();
    this.isOriginal = false;
    this.isZincShow = true;
    this.zinc_image = zinc_click;
    this.judgeDeviceFinish();
  }

  // 判断装置视频配置完成
  judgeDeviceFinish() {
    if (this.isLightBulbShow && this.isSolutionShow && this.isZincShow) {
      setTimeout(() => {
        if (!this.isOriginal) {
          this.isDeviceFinish = true;
        }
      }, 1000);
    } else {
      this.isDeviceFinish = false;
    }
  }

  // 方程式移动动画
  moveEquation() {
    document.getElementById('equation').setAttribute('class', 'animation');
  }

  // 恢复方程式为原始状态
  restoreEquation() {
    document.getElementById('equation').setAttribute('class', '');
  }

  // 为mac电脑和windows设置不同的背景色
  private setBgColor() {
    if (window.env.browserInfo.os === 'Mac OS X') {
      document.getElementById('background').style.backgroundColor = '#626262';
    } else if (window.env.browserInfo.isIpad) {
      document.getElementById('background').style.backgroundColor = '#585758';
    } else if (window.env.browserInfo.isPc && window.navigator.maxTouchPoints) {
      document.getElementById('background').style.backgroundColor = '#585758';
    } else if (window.env.browserInfo.isIphone) {
      document.getElementById('background').style.backgroundColor = '#585758';
    } else {
      document.getElementById('background').style.backgroundColor = '#585758';
    }
  }

  // 重置
  resetEvent() {
    this.isShowReaction  = false;
    this.isMicro         = false;
    this.isMacro         = false;
    this.isZincShow      = false;
    this.isSolutionShow  = false;
    this.isLightBulbShow = false;
    this.isOriginal      = true;
    this.isDeviceFinish  = false;
    this.zinc_image = zinc_unclick;
    this.electronic_image = electronic_unclick;
    this.sulfuric_acid_image = sulfuric_acid_unclick;
    this.player.currentTime(0);
    this.restoreEquation();
  }

}
