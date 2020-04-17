import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component
export class MainVueComponent extends Vue {
    //国际化
    title = window.env.browserInfo.lang.title;
    buttonText = window.env.browserInfo.lang.buttonText;
    //data
    isShow = true;
    isShow1 = false;
    isShow2 = false;
    isShow3 = false;
    isShow4 = false;
    isActived1 = false;
    isActived2 = false;
    isActived3 = false;
      msg2 = 0;
      msg3 = 0;
    isActived4 = false;
    zoom1 = 0;
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
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      });
      document.addEventListener('touchmove', function (event) {
        event.preventDefault();
      });
      window.onload = function () {
        document.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        })
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
          const now  = (new Date()).getTime();
          if ( now - lastTouchEnd <= 300 ) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },  false);
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
      (ViewController.getInstance().viewHandler as MyViewHandler).getEvent1(1);
    } else if (offset === 2) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getEvent1(2);
    } else if (offset === 3) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getEvent1(3);
    } else if (offset === 4) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getEvent1(4);
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
        (ViewController.getInstance().viewHandler as MyViewHandler).reset();
    }



}

