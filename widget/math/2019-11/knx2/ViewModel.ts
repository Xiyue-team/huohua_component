import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';
import {MyCanvas} from './services/MyCanvas';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  mycanvas: MyCanvas;

  buttonStyle1one = false;
  buttonStyle2one = false;
  buttonStyle3one = false;
  buttonStyle4one = false;

  //按钮自定义事件
  isActive1 = false;
  clickNumber1 = true;
  isActive2 = false;
  clickNumber2 = true;
  isActive3 = false;
  clickNumber3 = true;
  isActive4 = false;
  clickNumber4 = true;

  // 判断是否是手机
  isPhone = false;

  title: string;
  buttonTitle1: string;
  buttonTitle2: string;
  buttonTitle3: string;
  buttonTitle4: string;

  //抓一个球或者抓两个球的时候
  oneOrTwo: boolean;


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
  }

  resize() {
    if (window.innerWidth <= 1100 && window.innerWidth > 900) {

    } else if (window.innerWidth <= 900) {

    } else {
    }
  }

  resetEvent() {
    this.resetButton(0);
    this.isActive1 = false;
    this.clickNumber1 = true;
    this.isActive2 = false;
    this.clickNumber2 = true;
    this.isActive3 = false;
    this.clickNumber3 = true;
    this.isActive4 = false;
    this.clickNumber4 = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  //抓一次时候执行的方法并设置抓一个球100次的方法的值
  buttonClickEvent1() {
    this.isActive1 = true;
    this.isActive2 = false;
    this.buttonStyle1one = true;
    this.buttonStyle2one = true;
    if (this.oneOrTwo) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneBallOneTime(this.isActive1);
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneBallHundredTime(this.isActive2);
    } else {
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabTwoBallOneTime(this.isActive1);
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoBallHundredTime(this.isActive2);
    }
    setTimeout( ()  => {
      this.isActive1 = false;
      this.buttonStyle1one = false;
      this.buttonStyle2one = false;
    } , 500);
  }
  //抓100次时候执行的方法并设置抓一个球一次的方法的值
  buttonClickEvent2() {
    this.isActive1 = false;
    this.isActive2 = true;

    this.buttonStyle1one = true;
    this.buttonStyle2one = true;
    this.buttonStyle3one = true;
    this.buttonStyle4one = true;

    if (this.oneOrTwo) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneBallHundredTime(this.isActive2);
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneBallOneTime(this.isActive1);
    } else {
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoBallHundredTime(this.isActive2);
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabTwoBallOneTime(this.isActive1);
    }
    // setTimeout( ()  => {
    //   this.isActive2 = false;
    // } , 10000);
  }

  //抓取一个球
  buttonClickEvent3() {
    this.isActive3 = true;
    this.isActive4 = false;
    this.oneOrTwo = true;
    document.getElementById('btn1').removeAttribute('disabled');
    document.getElementById('btn2').removeAttribute('disabled');
    document.getElementById('buttonStyle1-div').removeAttribute('hidden');
    document.getElementById('buttonStyle2-div').removeAttribute('hidden');
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneOne(this.isActive3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoTwo(this.isActive4);
  }
  //抓取两个球
  buttonClickEvent4() {
    this.isActive3 = false;
    this.isActive4 = true;
    this.oneOrTwo = false;
    document.getElementById('btn1').removeAttribute('disabled');
    document.getElementById('btn2').removeAttribute('disabled');
    document.getElementById('buttonStyle1-div').removeAttribute('hidden');
    document.getElementById('buttonStyle2-div').removeAttribute('hidden');
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoTwo(this.isActive4);
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneOne(this.isActive3);
  }

  resetButton(value: number) {
    if (value !== 1) {
      this.clickNumber1 = true;
      this.isActive1 = false;
    }
  }
}
