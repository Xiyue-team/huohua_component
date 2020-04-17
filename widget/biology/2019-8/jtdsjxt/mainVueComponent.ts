import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  icon =-1;
  bg: any = require('./sub_static/UI/bg.png');
  title: any = window.env.browserInfo.lang.title;
  brain: any = window.env.browserInfo.lang.brain;
  the_spinal_cord: any = window.env.browserInfo.lang.the_spinal_cord;
  nerve: any = window.env.browserInfo.lang.nerve;
  the_brain: any = window.env.browserInfo.lang.the_brain;
  the_cerebellum: any = window.env.browserInfo.lang.the_cerebellum;
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
  //点击切换图片
  getChange(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
  }

  // 重置
  reset() {
    (ViewController.getInstance().viewHandler as MyViewHandler).reset();
  }



}

