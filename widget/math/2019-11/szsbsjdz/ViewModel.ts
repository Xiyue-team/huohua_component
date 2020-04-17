import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {JdzViewHandler} from './services/JdzViewHandler';

const anniu = require('./anniu.json');

@Component
export class ViewModel extends Vue {
  //lang = window.env.browserInfo.lang;
  //按钮自定义事件
  isActive1 = false;
  clickNumber1 = true;

  // 判断是否是手机
  isPhone = false;

  title: string;
  buttonTitle1: string;

  //定义一个标志用于改变按钮状态
  define = true;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new JdzViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
    }
    this.title = anniu[(window as any)['env'].browserInfo.language].title;
    this.buttonTitle1 = anniu[(window as any)['env'].browserInfo.language].buttonTitle1;

    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resize() {

  }

  resetEvent() {
    this.isActive1 = false;
    this.clickNumber1 = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
    (ViewController.getInstance().viewHandler as any).dmCanvas.changeText(false);
  }

  //原点显示控制
  buttonClickEvent1() {
    if (this.define) {
      this.isActive1 = true;
      (ViewController.getInstance().viewHandler as any).dmCanvas.changeText(this.isActive1);
      this.clickNumber1 = false;
      this.define = false;
      console.log('1' + this.isActive1);
    } else {
      this.isActive1 = false;
      (ViewController.getInstance().viewHandler as any).dmCanvas.changeText(this.isActive1);
      this.clickNumber1 = true;
      this.define = true;
      console.log('2' + this.isActive1);
    }
  }
}
