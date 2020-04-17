import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as img0 from './sub_static/UI/st.png';
import * as img1 from './sub_static/UI/1.png';
import * as img2 from './sub_static/UI/2.png';
import * as img3 from './sub_static/UI/3.png';
import * as img4 from './sub_static/UI/4.png';
import * as img5 from './sub_static/UI/5.png';
import * as img6 from './sub_static/UI/6.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  textTitle = window.env.browserInfo.lang.textTitle;
  textArea = window.env.browserInfo.lang.textArea;
  //data
  zoom1 = 1;
  have = true;
  index = 0;
  stImg = img0;

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

//点击按钮自身的变化,及切换图片
  getEvent(offset: any) {
    if (offset === 1) {
      this.index = 1;
      this.stImg = img1;
    } else if (offset === 2) {
      this.index = 2;
      this.stImg = img2;
    } else if (offset === 3) {
      this.index = 3;
      this.stImg = img3;
    } else if (offset === 4) {
      this.index = 4;
      this.stImg = img4;
    } else if (offset === 5) {
      this.index = 5;
      this.stImg = img5;
    } else if (offset === 6) {
      this.index = 6;
      this.stImg = img6;
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
    this.have = true;
    this.index = 0;
    this.stImg = img0;
  }



}

