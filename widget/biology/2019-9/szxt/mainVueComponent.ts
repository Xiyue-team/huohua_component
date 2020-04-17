import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as img0 from './sub_static/UI/st.png';
import * as img00 from './sub_static/UI/st_1.png';
import * as img_m1 from './sub_static/UI/m1.png';
import * as img_m2 from './sub_static/UI/m2.png';
import * as img_m3 from './sub_static/UI/m3.png';
import * as img_m4 from './sub_static/UI/m4.png';
import * as img_m5 from './sub_static/UI/m5.png';
import * as img_m6 from './sub_static/UI/m6.png';
import * as img_m7 from './sub_static/UI/m7.png';
import * as img_m8 from './sub_static/UI/m8.png';
import * as img_f1 from './sub_static/UI/f1.png';
import * as img_f2 from './sub_static/UI/f2.png';
import * as img_f3 from './sub_static/UI/f3.png';
import * as img_f4 from './sub_static/UI/f4.png';
import * as img_f5 from './sub_static/UI/f5.png';
import * as img_f6 from './sub_static/UI/f6.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonText = window.env.browserInfo.lang.buttonText;
  titleArr = window.env.browserInfo.lang.titleArr;
  areaArr = window.env.browserInfo.lang.areaArr;
  //data
  zoom1 = 1;
  have = true;
  index = 1;
  index2 = 0;
  index3 = 0;
  img_male = img0;

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
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault();
    });
    document.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

//点击button按钮自身的变化,及切换图片
  getEvent(offset: any) {
    if (offset === 1) {
      this.index = 1;
      this.index2 = 0;
      this.img_male = img0;
    } else if (offset === 2) {
      this.index = 2;
      this.index3 = 0;
      this.img_male = img00;
    }
  }

  // 点击热点触发的事件
  getHot(offset: any) {
    if (offset === 1) {
      this.index2 = 1;
      this.img_male = img_m1;
    } else if (offset === 2) {
      this.index2 = 2;
      this.img_male = img_m2;
    } else if (offset === 3) {
      this.index2 = 3;
      this.img_male = img_m3;
    } else if (offset === 4) {
      this.index2 = 4;
      this.img_male = img_m4;
    } else if (offset === 5) {
      this.index2 = 5;
      this.img_male = img_m5;
    } else if (offset === 6) {
      this.index2 = 6;
      this.img_male = img_m6;
    } else if (offset === 7) {
      this.index2 = 7;
      this.img_male = img_m7;
    } else if (offset === 8) {
      this.index2 = 8;
      this.img_male = img_m8;
    } else if (offset === 11) {
      this.index3 = 1;
      this.img_male = img_f1;
    } else if (offset === 22) {
      this.index3 = 2;
      this.img_male = img_f2;
    } else if (offset === 33) {
      this.index3 = 3;
      this.img_male = img_f3;
    } else if (offset === 44) {
      this.index3 = 4;
      this.img_male = img_f4;
    } else if (offset === 55) {
      this.index3 = 5;
      this.img_male = img_f5;
    } else if (offset === 66) {
      this.index3 = 6;
      this.img_male = img_f6;
    }
  }

  //适配窗口用的函数
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
    this.img_male = img0;
    this.index = 1;
    this.index2 = 0;
    this.index3 = 0;
  }
}

