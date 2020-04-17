import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
@Component
export class MainVueComponent extends Vue {
  //data
  icon=-1;
    zoom1 = 1;
  // number = 370;
  title = window.env.browserInfo.lang.title;
  btn1 = window.env.browserInfo.lang.btn1;
  btn2 = window.env.browserInfo.lang.btn2;
  btn3 = window.env.browserInfo.lang.btn3;
  btn4 = window.env.browserInfo.lang.btn4;
  btn5 = window.env.browserInfo.lang.btn5;
  btn6 = window.env.browserInfo.lang.btn6;
  btn7 = window.env.browserInfo.lang.btn7;

  btntext1 = window.env.browserInfo.lang.btntext1;
  btntext2 = window.env.browserInfo.lang.btntext2;
  btntext3 = window.env.browserInfo.lang.btntext3;
  btntext4 = window.env.browserInfo.lang.btntext4;
  btntext5 = window.env.browserInfo.lang.btntext5;
  btntext6 = window.env.browserInfo.lang.btntext6;
  btntext7 = window.env.browserInfo.lang.btntext7;
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
      ViewController.getInstance().domReady();
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
  }
  //点击
  getChange(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
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
    (ViewController.getInstance().viewHandler as MyViewHandler).reset();
  }



}

