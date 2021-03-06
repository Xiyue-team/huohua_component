import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;
  //data
  fsw1 = false;
  fsw2 = false;
  fsw3 = false;
  fsw4 = false;
  isActived = false;
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
          const now  = (new Date()).getTime();
          if ( now - lastTouchEnd <= 300 ) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },  false);
      };

      ViewController.getInstance().domReady();
    }
  //点击切换图片
  getChange(offset: any) {
    if (offset === 1) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(1);
    } else if (offset === 2) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(2);
    } else if (offset === 3) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(3);
    } else if (offset === 4) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(4);
    }
  }
  //关闭放大图片
   getClose(offset: any) {
     if (offset === 1) {
       (ViewController.getInstance().viewHandler as MyViewHandler).getClose1(1);
     } else if (offset === 2) {
       (ViewController.getInstance().viewHandler as MyViewHandler).getClose1(2);
     } else if (offset === 3) {
       (ViewController.getInstance().viewHandler as MyViewHandler).getClose1(3);
     } else if (offset === 4) {
       (ViewController.getInstance().viewHandler as MyViewHandler).getClose1(4);
     }
   }

    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as MyViewHandler).reset();
    }



}

