import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as poster1 from './sub_static/UI/1.png';
import * as poster2 from './sub_static/UI/2.png';
import * as poster3 from './sub_static/UI/3.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  textTitle = window.env.browserInfo.lang.textTitle;
  //data
  zoom1 = 1;
  have = true;
  ischecked1 = false;
  ischecked2 = false;
  ischecked3 = false;
  ischecked4 = false;
  ischecked5 = false;
  ischecked6 = false;
  isshow1 = false;
  isshow2 = false;
  isshow3 = false;
  isshow4 = false;
  isshow5 = false;
  isshow6 = false;
  showPlay = false;
  private imgs: any = [];
  picture1 = poster1;
  picture2 = poster2;
  picture3 = poster3;
  msg1 = false; //定义变量用来控制按钮点击的次数
  msg2 = false; //定义变量用来控制按钮点击的次数
  msg3 = false; //定义变量用来控制按钮点击的次数
  msg4 = false; //定义变量用来控制按钮点击的次数
  msg5 = false; //定义变量用来控制按钮点击的次数
  msg6 = false; //定义变量用来控制按钮点击的次数
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
      if (!this.msg1) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(1);
        this.msg1 = true;
      }
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.isshow1 = true;
      this.isshow2 = false;
      this.isshow3 = false;
      this.isshow4 = false;
      this.isshow5 = false;
      this.isshow6 = false;
    } else if (offset === 2) {
      this.ischecked2 = true;
      if (!this.msg2) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(2);
        this.msg2 = true;
      }
      this.msg1 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.isshow2 = true;
      this.isshow1 = false;
      this.isshow3 = false;
      this.isshow4 = false;
      this.isshow5 = false;
      this.isshow6 = false;
    } else if (offset === 3) {
      this.ischecked3 = true;
      if (!this.msg3) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(3);
        this.msg3 = true;
      }

      this.msg1 = false;
      this.msg2 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.isshow3 = true;
      this.isshow2 = false;
      this.isshow1 = false;
      this.isshow4 = false;
      this.isshow5 = false;
      this.isshow6 = false;
    } else if (offset === 4) {
      this.ischecked4 = true;
      if (!this.msg4) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(4);
        this.msg4 = true;
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg5 = false;
      this.msg6 = false;
      this.isshow4 = true;
      this.isshow2 = false;
      this.isshow3 = false;
      this.isshow1 = false;
      this.isshow5 = false;
      this.isshow6 = false;
    } else if (offset === 5) {
      this.ischecked5 = true;
      if (!this.msg5) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(5);
        this.msg5 = true;
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg6 = false;
      this.isshow5 = true;
      this.isshow2 = false;
      this.isshow3 = false;
      this.isshow4 = false;
      this.isshow1 = false;
      this.isshow6 = false;
    } else if (offset === 6) {
      this.ischecked6 = true;
      if (!this.msg6) {
        this.showPlay = false;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(6);
        this.msg6 = true;
      }
      this.msg1 = false;
      this.msg2 = false;
      this.msg3 = false;
      this.msg4 = false;
      this.msg5 = false;
      this.isshow6 = true;
      this.isshow2 = false;
      this.isshow3 = false;
      this.isshow4 = false;
      this.isshow5 = false;
      this.isshow1 = false;
    }
  }

  //点击播放按钮触发的事件
  getChange(offset: any) {
    if (offset === 1) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(1);
    } else if (offset === 2) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(2);
    } else if (offset === 3) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(3);
    } else if (offset === 4) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(4);
    } else if (offset === 5) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(5);
    } else if (offset === 6) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(6);
    }
  }


  // 统一样式
  allStyle() {
    this.ischecked1 = false;
    this.ischecked2 = false;
    this.ischecked3 = false;
    this.ischecked4 = false;
    this.ischecked5 = false;
    this.ischecked6 = false;
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
}

