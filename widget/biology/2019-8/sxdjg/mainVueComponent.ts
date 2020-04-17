import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as imgSt from './sub_static/UI/st.png';
import * as img1 from './sub_static/UI/1.png';
import * as img2 from './sub_static/UI/2.png';
import * as img3 from './sub_static/UI/3.png';
import * as img4 from './sub_static/UI/4.png';
import * as img5 from './sub_static/UI/5.png';
import * as img6 from './sub_static/UI/6.png';
import * as img7 from './sub_static/UI/7.png';
import * as posterimg from './sub_static/UI/poster.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  textTitle = window.env.browserInfo.lang.textTitle;
  text_are = window.env.browserInfo.lang.text_are;
  text_list = window.env.browserInfo.lang.text_list;
  //data
  zoom1 = 1;
  have = true;
  ischecked1 = false;
  ischecked2 = false;
  ischecked3 = false;
  ischecked4 = false;
  ischecked5 = false;
  ischecked6 = false;
  ischecked7 = false;
  picture = posterimg;
  isshow1 = false;
  isshow2 = false;
  isshow3 = false;
  isshow4 = false;
  isshow5 = false;
  isshow6 = false;
  isshow7 = false;
  showPlay = false;
  private imgs: any = [];
  msg1 = false; //定义变量用来控制按钮点击的次数
  msg2 = false; //定义变量用来控制按钮点击的次数
  msg3 = false; //定义变量用来控制按钮点击的次数
  msg4 = false; //定义变量用来控制按钮点击的次数
  msg5 = false; //定义变量用来控制按钮点击的次数
  msg6 = false; //定义变量用来控制按钮点击的次数
  msg7 = false; //定义变量用来控制按钮点击的次数
  startImg = imgSt;
  showList = true;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new DzdyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }


  mounted() {
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style = 'none';
    ViewController.getInstance().domReady();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  //点击热点按钮触发事件
  getEvent(offset: any) {
    this.allStyle();
    if (offset === 1) {
      this.ischecked1 = true;
      this.startImg = img1;
      this.isshow1 = true;
      if (!this.msg1) {
        this.showPlay = true;
        this.showList = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1();
        this.msg1 = true;
      }

      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.msg7 = false;
    } else if (offset === 2) {
      this.isshow1 = false;
      this.ischecked2 = true;
      this.isshow2 = true;
      this.startImg = img2;
      if (!this.msg2) {
        this.showPlay = false;
        this.msg2 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.msg7 = false;
    } else if (offset === 3) {
      this.isshow1 = false;
      this.ischecked3 = true;
      this.isshow3 = true;
      this.startImg = img3;
      if (!this.msg3) {
        this.showPlay = false;
        this.msg3 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.msg7 = false;
    } else if (offset === 4) {
      this.isshow1 = false;
      this.ischecked4 = true;
      this.isshow4 = true;
      this.startImg = img4;
      if (!this.msg4) {
        this.showPlay = false;
        this.msg4 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.msg7 = false;
    } else if (offset === 5) {
      this.isshow1 = false;
      this.ischecked5 = true;
      this.isshow5 = true;
      this.startImg = img5;
      if (!this.msg5) {
        this.showPlay = false;
        this.msg5 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg6 = false;
      this.msg7 = false;
    } else if (offset === 6) {
      this.isshow1 = false;
      this.ischecked6 = true;
      this.isshow6 = true;
      this.startImg = img6;
      if (!this.msg6) {
        this.showPlay = false;
        this.msg6 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg7 = false;
    } else if (offset === 7) {
      this.isshow1 = false;
      this.ischecked7 = true;
      this.isshow7 = true;
      this.startImg = img7;
      if (!this.msg7) {
        this.showPlay = false;
        this.msg7 = true;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.pause();
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
    }
  }

  //点击播放按钮触发的事件
  getChange() {
       this.showList = false;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1();
  }


  // 统一样式
  allStyle() {
    this.ischecked1 = false;
    this.ischecked2 = false;
    this.ischecked3 = false;
    this.ischecked4 = false;
    this.ischecked5 = false;
    this.ischecked6 = false;
    this.ischecked7 = false;
    this.isshow2 = false;
    this.isshow3 = false;
    this.isshow4 = false;
    this.isshow5 = false;
    this.isshow6 = false;
    this.isshow7 = false;
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
    if( H1 === 375 ){
      // (document.getElementsByClassName('onePoint')[0] as any).style.zoom =  '2';
    }
  }
}

