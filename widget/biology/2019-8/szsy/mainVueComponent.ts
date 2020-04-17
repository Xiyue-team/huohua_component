import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as bg from './sub_static/UI/1.png';

@Component
export class MainVueComponent extends Vue {
  //data
  active = 0;
  showPlay = false;
  img1 = bg;
  title = window.env.browserInfo.lang.title;
  btn1 = window.env.browserInfo.lang.btn1;
  btn2 = window.env.browserInfo.lang.btn2;
  btn3 = window.env.browserInfo.lang.btn3;
  bg: any = require('./sub_static/UI/bg.png');
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }
  // mounted 
  mounted() {
    document.body.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    });
    window.onload = function () {
      document.body.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.body.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };

    ViewController.getInstance().domReady();
  }
  //点击切换
  getChange(offset: any) {
    if (this.active === offset) {
      return;
    } else {
      (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
    }
  }
  // 播放暂停按钮
  getplay() {
    (ViewController.getInstance().viewHandler as MyViewHandler).getplay1();
  }
  // 重置
  reset() {
    (ViewController.getInstance().viewHandler as MyViewHandler).reset();
  }
}

