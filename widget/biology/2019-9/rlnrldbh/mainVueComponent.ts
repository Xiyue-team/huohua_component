import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
// import * as img1_1 from './sub_static/UI/1_1.png';



@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonText = window.env.browserInfo.lang.buttonText;
  //data
  zoom1 = 1;
  have1 = true;
  have2 = true;
  have3 = true;
  have4 = true;
  isChecked1 = false;
  isChecked2 = false;




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

//点击图片按钮自身的变化,及切换图片
  getEvent(offset: any) {
    if (offset === 1) {

        this.have1 = false;
    } else if (offset === 2) {

      this.have2 = false;
    } else if (offset === 3) {

      this.have3 = false;
    } else if (offset === 4) {

      this.have4 = false;
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
    this.have1 = true;
    this.have2 = true;
    this.have3 = true;
    this.have4 = true;
    this.isChecked1 = false;
    this.isChecked2 = false;

  }


}

