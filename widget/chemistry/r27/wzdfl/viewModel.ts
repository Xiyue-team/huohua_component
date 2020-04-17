import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import * as ry from './sub_static/ry.png';
import * as jt from './sub_static/jt.png';
import * as zy from './sub_static/zy.png';
import * as jsdz from './sub_static/jsdz.png';
import * as fjsdz from './sub_static/jgs.png';
import * as xyqt from './sub_static/xyqt.png';
import * as yjhhw from './sub_static/yjhhw.png';
import * as s from './sub_static/cs.png';
import * as j from './sub_static/j.png';
import * as y from './sub_static/lhn.png';
import * as jsyhw from './sub_static/yhg.png';
import * as fjsyhw from './sub_static/zls.png';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang;
  timer: any;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  moveAnimate() {
    const dom = document.getElementsByClassName('clickTip')[0];
    (dom as any).style.display = 'none';
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).movePlay();
  }

  showTips() {
    const dom = document.getElementById('bottomTip');
    const tipText = document.getElementById('tips');
    tipText.style.display = 'flex';
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {tipText.style.display = 'none'; }, 5000);
    dom.innerHTML = this.title.wuzhitishi;
  }

  /*显示动画 修改对应按钮的提示文字*/
  showAnimate(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).showPlay(value);
    const dom = document.getElementById('bottomTip');
    const tipText = document.getElementById('tips');
    tipText.style.display = 'flex';
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {tipText.style.display = 'none'; }, 5000);

    switch (value) {
      case 1:
        dom.innerHTML = this.title.chunjingwutishi;
        return;
      case 2:
        dom.innerHTML = this.title.hunhewutishi;
        return;
      case 3:
        dom.innerHTML = this.title.danzhitishi;
        return;
      case 4:
        dom.innerHTML = this.title.huahewutishi;
        return;
      case 5:
        dom.innerHTML = this.title.wujihuahewutishi;
        return;
      case 6:
        dom.innerHTML = this.title.yanghuawutishi;
        return;
    }


  }

  /*关闭按钮方法*/
  closeBanner() {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).closeBanner();
  }

  /*显示大图并柑橘选中的按钮替换相应的图片及文字*/
  openBanner(value: number) {
    const banner = document.getElementById('banner');
    const bannerText = document.getElementsByClassName('imageText')[0];
    const dom = document.getElementById('tips');
    const color = '#000000';
    (dom as any).style.display = 'none';
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).openBanner();
    (bannerText as any).style.color = '#ffffff';
    switch (value) {
      case 1:
        banner.setAttribute('src', (ry as any));
        bannerText.innerHTML = this.title.liusuantong;
        return;
      case 2:
        banner.setAttribute('src', (jt as any));
        bannerText.innerHTML = this.title.jiaoti;
        return;
      case 3:
        banner.setAttribute('src', (zy as any));
        bannerText.innerHTML = this.title.zhuoye;
        return;
      case 4:
        banner.setAttribute('src', (jsdz as any));
        bannerText.innerHTML = this.title.tong;
        return;
      case 5:
        banner.setAttribute('src', (fjsdz as any));
        bannerText.innerHTML = this.title.jingangshi;
        (bannerText as any).style.color = color;
        return;
      case 6:
        banner.setAttribute('src', (xyqt as any));
        bannerText.innerHTML = this.title.xiyouqiti;
        return;
      case 7:
        banner.setAttribute('src', (yjhhw as any));
        bannerText.innerHTML = this.title.jiawan;
        return;
      case 8:
        banner.setAttribute('src', (s as any));
        bannerText.innerHTML = this.title.cu;
        return;
      case 9:
        banner.setAttribute('src', (j as any));
        bannerText.innerHTML = this.title.jian;
        return;
      case 10:
        banner.setAttribute('src', (y as any));
        bannerText.innerHTML = this.title.yan;
        return;
      case 11:
        banner.setAttribute('src', (jsyhw as any));
        bannerText.innerHTML = this.title.yanghuagaifenmo;
        (bannerText as any).style.color = color;
        return;
      case 12:
        banner.setAttribute('src', (fjsyhw as any));
        bannerText.innerHTML = this.title.zhengliushui;
        (bannerText as any).style.color = color;
        return;
    }
  }
}
