import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as bg from './sub_static/UI/1.png';

@Component
export class MainVueComponent extends Vue {
  //data
  active1 = 1;
  active2 = 1;
  img1 = bg;
  zoom1 = 1;
  title = window.env.browserInfo.lang.title;
  buttonAll = window.env.browserInfo.lang.buttonAll;
  bg: any = require('./sub_static/UI/bg.png');
  line2: any = require('./sub_static/UI/line2.png');
  line3: any = require('./sub_static/UI/line3.png');
  video2: any = require('./sub_static/UI/video2.png');
  video3: any = require('./sub_static/UI/video3.png');
  isChecked = false;
  have = true;
  showVideo1: any = false;
  showVideo2: any = false;
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
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  //点击切换
  getChange(offset: any) {
    if (offset === 2) {
      if (this.active1 === 2) {
        return;
      } else {
        this.isChecked = false;
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(2);
      }
    } else if (offset === 4) {
      if (this.active1 === 4) {
        return;
      } else {
        this.isChecked = false;
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(4);
      }
    } else if (offset === 6) {
      this.isChecked = !this.isChecked;
    }
  }
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 576) {
      this.zoom1 = H1 / 576;
    } else {
      this.zoom1 = W1 / 1024;
    }
  }
  // 重置
  reset() {
    if (this.active1 === 1) {
      return;
    } else {
      (ViewController.getInstance().viewHandler as MyViewHandler).reset();
    }
  }
}

