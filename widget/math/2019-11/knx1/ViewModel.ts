import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  //按钮禁用问题
  btn1isDisable = false;
  btn2isDisable = false;

  //按钮颜色控制
  third_stepColor = false;
  thirds_stepColor = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new ViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as HTMLElement).style.height = '0px';
  }

  resize() {
    this.third_stepColor = false;
    this.thirds_stepColor = false;
  }

  resetEvent() {
    this.resetButton(0);
    this.third_stepColor = false;
    this.thirds_stepColor = false;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  //抓取一次时候执行的方法并设置抓取100此的方法的值
  buttonClickEvent1() {
    this.third_stepColor = true;
    this.thirds_stepColor = false;
    this.btn1isDisable = true;
    this.btn2isDisable = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOne(this.third_stepColor);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneHundred(this.thirds_stepColor);
    setTimeout( ()  => {
      this.third_stepColor = false;
      this.btn1isDisable = false;
      this.btn2isDisable = false;
    } , 500);
  }
  //抓取100次时候执行的方法并设置抓取一次的方法的值
  buttonClickEvent2() {
    this.third_stepColor = false;
    this.thirds_stepColor = true;
    this.btn1isDisable = true;
    this.btn2isDisable = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneHundred(this.thirds_stepColor);
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOne(this.third_stepColor);
  }

  resetButton(value: number) {
    if (value !== 1) {
      this.third_stepColor = false;
    }
  }
}
