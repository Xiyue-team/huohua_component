import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { MdyzjViewHandler } from './services/MdyzjViewHandler';

@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 0;
  isBtnctrl = true;
  isActive = false;
  isActive1 = false;
  isActive2 = false;
  isA = true;
  isA1 = true;

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new MdyzjViewHandler(this), viewOption);
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

  //点击正常反应
  btnEvent_1() {
    this.isA = true;
    this.isA1 = true;
    this.isActive = true;
    this.isActive1 = false;
    this.isActive2 = false;
    (ViewController.getInstance().viewHandler as MdyzjViewHandler).closer();
  }

  //点击竞争性抑制剂
  btnEvent_2() {
    this.isA = false;
    this.isA1 = true;
    this.isActive = false;
    this.isActive2 = false;
    this.isActive1 = true;
    (ViewController.getInstance().viewHandler as MdyzjViewHandler).appeared();
  }

  //点击非竞争性抑制剂
  btnEvent_3() {
    this.isA = true;
    this.isA1 = false;
    this.isActive = false;
    this.isActive1 = false;
    this.isActive2 = true;
    (ViewController.getInstance().viewHandler as MdyzjViewHandler).apr();
  }

  //适配
  resize() {
    const H1 = window.innerHeight;
    if (H1 <= 770) {
      document.getElementById('textImg').style.zoom = '0.9';
      document.getElementById('textImg1').style.zoom = '0.9';
    }
    if (H1 <= 480) {
      document.getElementById('textImg').style.zoom = '0.6';
      document.getElementById('textImg1').style.zoom = '0.6';
    }
  }

  //重置
  reset(): void {
    this.isActive = false;
    this.isActive1 = false;
    this.isActive2 = false;
    (ViewController.getInstance().viewHandler as MdyzjViewHandler).reset();
  }
}
