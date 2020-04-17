import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { CsnsjphdyxysViewHandler } from './services/CsnsjphdyxysViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
  //创建控制5个按钮是否激活的变量
  active1 = false;
  active2 = false;
  active6 = false;
  active4 = false;
  active5 = false;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new CsnsjphdyxysViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    ViewController.getInstance().domReady();
  }

  // 点击事件
  getEvent(val: any) {
    if (val === 1) {
      this.allf();
      this.active1 = !this.active1;
      (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.addshui();
    } else if (val === 2) {
      this.allf();
      this.active2 = !this.active2;
      (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.addnaoh();
    } else if (val === 3) {
      this.allf();
      this.active6 = !this.active6;
      (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.addnaac();
    } else if (val === 4) {
      this.allf();
      this.active4 = !this.active4;
      (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.addnaco();
    } else if (val === 5) {
      this.allf();
      this.active5 = !this.active5;
      (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.addhot();
    }
  }
  //重置按钮初始状态
  allf() {
    this.active1 = false;
    this.active2 = false;
    this.active6 = false;
    this.active4 = false;
    this.active5 = false;
  }

  // 重置
  reset() {
    this.allf();
    (ViewController.getInstance().viewHandler as CsnsjphdyxysViewHandler).Model.reset();
  }
}

