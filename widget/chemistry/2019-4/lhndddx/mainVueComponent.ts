import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { IhndddxViewHandler } from './services/IhndddxViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component

export class MainVueComponent extends Vue {

  active1 = true;
  active2 = false;
  active3 = false;
  first: boolean;
  second: boolean;
  third: boolean;
  zoom = 1;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new IhndddxViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    ViewController.getInstance().domReady();
    const he = window.innerHeight;
    if (he < 770) {
      document.getElementById('anniu').style.zoom = '0.7';
    } else if (he < 480) {
      document.getElementById('anniu').style.zoom = '0.4';
    }
  }

  //点击按钮事件
  changeEvent(val: any) {
    if (val === 0) {  //点击氯化钠固体按钮
      this.active1 = true;
      this.active2 = false;
      this.active3 = false;
      (ViewController.getInstance().viewHandler as IhndddxViewHandler).Model.solid();
    } else if (val === 1) {  //点击氯化钠溶液按钮
      this.active1 = false;
      this.active2 = true;
      this.active3 = false;
      (ViewController.getInstance().viewHandler as IhndddxViewHandler).Model.liquid();
    } else if (val === 2) {  //点击熔融态氯化钠按钮
      this.active1 = false;
      this.active2 = false;
      this.active3 = true;
      (ViewController.getInstance().viewHandler as IhndddxViewHandler).Model.molten();
    }
  }

  // 重置
  reset() {
    (ViewController.getInstance().viewHandler as IhndddxViewHandler).Model.reset();
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;
  }
}

