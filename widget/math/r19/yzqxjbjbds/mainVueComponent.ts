import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  isBule1 = false;
  isBule2 = false;
  isBule3 = false;
  isBule4 = false;
  zhanshi = true;
  zoom1 = 0;
  ow: any;
  isMake = 0;
  isGray = false;
  isShow = false;
  imgShuoMing: any = '';
  make: any = false;
  cover: any = false;
  addListen = false;
  addListen1 = false;

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

  //methods
  change(num: number) {
    this.ow = (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel;
    if (num === 1) {
      this.cover = false;
      this.addListen = false;
      this.addListen1 = false;
      this.clickShiJian(1);
    } else if (num === 2) {
      this.addListen = false;
      this.addListen1 = false;
      this.cover = false;
      this.clickShiJian(2);
    } else if (num === 3) {
      this.addListen = false;
      this.addListen1 = false;
      this.make = true;
      this.cover = true;
      this.clickShiJian(3);
    }
    if (this.make) {
      if (num === 4) {
        this.chackAnniu(3);
        if (this.isMake === 0) {
          this.addListen = true;
          this.addListen1 = false;
          this.ow.clickAnniu(4);
          this.isMake = this.isMake + 1;
        } else if (this.isMake === 1) {
          this.addListen = false;
          this.addListen1 = true;
          this.ow.clickAnniu(5);
          this.isGray = true;
          this.isMake = this.isMake + 1;
        }
      }
    }
  }

  //触发事件
  clickShiJian(num: number) {
    this.chackAnniu(num);
    this.ow.clickAnniu(num);
    this.isMake = 0;
    this.isGray = false;
  }

  //判断按钮
  chackAnniu(num: number) {
    this.isBule1 = num === 1 ? true : false;
    this.isBule2 = num === 2 ? true : false;
    this.isBule3 = num === 3 ? true : false;
    this.isBule4 = num === 3 ? true : false;
  }

//适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 < 1024 / 750) {
      this.zoom1 = W1 / 1024;
    }
    if (W1 / H1 > 1.334) {
      if ((navigator.userAgent.match(
        // tslint:disable-next-line:max-line-length
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.zoom1 = H1 / 590;
      }
    } else {
      this.zoom1 = 1;
    }
  }
}
