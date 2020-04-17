import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as img from './sub_static/UI/poster.png';
import * as poster11 from './sub_static/UI/11.png';
import * as poster12 from './sub_static/UI/12.png';
import * as poster13 from './sub_static/UI/13.png';
import * as poster14 from './sub_static/UI/14.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;
  //data
  zoom1 = 1;
  have = true;
  textArr: any = [];
  ishave = 4;
  active1 = false;
  showBj = true;
  private imgs: any = [];
  picture = img;
  msg1 = true; //定义变量用来控制按钮点击的次数
  msg2 = true; //定义变量用来控制按钮点击的次数
  msg3 = true; //定义变量用来控制按钮点击的次数
  msg4 = true; //定义变量用来控制按钮点击的次数
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new DzdyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    this.textArr = this.buttonTitle;
  }

  mounted() {
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style = 'none';
    ViewController.getInstance().domReady();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  //点击按钮切换视频
  getEvent(offset: any) {
    this.showBj = false;
    if (offset === 0) {
      // this.picture = poster11;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(0);
    } else if (offset === 1) {
      // this.picture = poster12;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(1);
    } else if (offset === 2) {
      // this.picture = poster13;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(2);
    } else if (offset === 3) {
      // this.picture = poster14;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(3);
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
    if (H1 < 400) {
      document.getElementById('title').style.zoom = '0.6';
      document.getElementById('buttonBox').style.transform = 'scale(0.7) translateY(20%)';
    }
  }
}

