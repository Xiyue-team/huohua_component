import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as bg from './sub_static/UI/bg.png';


// const Vconsole = require('vconsole');
// const vConsole = new Vconsole();
// export default vConsole;
@Component
export class MainVueComponent extends Vue {
  //data
  active1 = 1;
  img1 = bg;
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
    if (offset === 2) {
      if (this.active1 === 2) {
        return;
      } else {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(2);
      }

    } else if (offset === 4) {
      if (this.active1 === 4) {
        return;
      } else {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(4);
      }
    } else if (offset === 6) {
      if (this.active1 === 6) {
        return;
      } else {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(6);
      }
    }
  }
    // 重置
    reset() {
      cache:false;
      if (this.active1 === 1) {
        return;
      } else {
        (ViewController.getInstance().viewHandler as MyViewHandler).reset();
      }
      
    }



  }

