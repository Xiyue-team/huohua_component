import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  icon = -1;
  zoom1 = 1;
  bg: any = require('./sub_static/UI/bg.png');
  btnbg1: any = require('./sub_static/UI/btnbg1.png');
  btnbg2: any = require('./sub_static/UI/btnbg2.png');
  btnbg3: any = require('./sub_static/UI/btnbg3.png');
  btnbg4: any = require('./sub_static/UI/btnbg4.png');
  title: any = window.env.browserInfo.lang.title;
  antQueen: any = window.env.browserInfo.lang.antQueen;
  antKing: any = window.env.browserInfo.lang.antKing;
  soldierAnt: any = window.env.browserInfo.lang.soldierAnt;
  workenAnt: any = window.env.browserInfo.lang.workenAnt;
  antQueentext: any = window.env.browserInfo.lang.antQueentext;
  antKingtext: any = window.env.browserInfo.lang.antKingtext;
  soldierAnttext: any = window.env.browserInfo.lang.soldierAnttext;
  workenAnttext: any = window.env.browserInfo.lang.workenAnttext;

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
  //点击切换图片
  getChange(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
  }
  // shipei
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
    (ViewController.getInstance().viewHandler as MyViewHandler).reset();
  }



}

