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

  possibleone = false;
  possibletwo = false;
  possiblethree = false;
  possiblefour = false;
  possiblefive = false;

  //按钮自定义事件
  isActive1 = false;
  clickNumber1 = true;
  isActive2 = false;
  clickNumber2 = true;
  isActive3 = false;
  clickNumber3 = true;
  isActive4 = false;
  clickNumber4 = true;
  isActive5 = false;
  clickNumber5 = true;

  // 判断是否是手机
  isPhone = false;

  title: string;
  buttonTitle1: string;
  buttonTitle2: string;
  buttonTitle3: string;
  buttonTitle4: string;
  buttonTitle5: string;

  //抓一个球或者抓两个球的时候
  oneOrTwo = 0;


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
    this.isActive5 = false;
    this.clickNumber5 = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  //抓一次时候执行的方法并设置抓一个球100次的方法的值
  buttonClickEvent1() {
    this.isActive1 = true;
    this.isActive2 = false;
    this.possibleone = true;
    this.possibletwo = true;
    if (this.oneOrTwo === 11) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneBallsOneTime(this.isActive1);
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneBallsHundredTime(this.isActive2);
    } else if (this.oneOrTwo === 22) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabTwoBallsOneTime(this.isActive1);
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoBallsHundredTime(this.isActive2);
    } else if (this.oneOrTwo === 33) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabThreeBallsOneTime(this.isActive1);
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabThreeBallsHundredTime(this.isActive2);
    }
    setTimeout( ()  => {
      this.isActive1 = false;
      this.possibleone = false;
      this.possibletwo = false;
    } , 500);
  }
  //抓100次时候执行的方法并设置抓一个球一次的方法的值
  buttonClickEvent2() {
    this.isActive1 = false;
    this.isActive2 = true;
    this.possibleone = true;
    this.possibletwo = true;
    this.possiblethree = true;
    this.possiblefour = true;
    this.possiblefive = true;

    if (this.oneOrTwo === 11) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabOneBallsHundredTime(this.isActive2);
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneBallsOneTime(this.isActive1);
    } else if (this.oneOrTwo === 22) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoBallsHundredTime(this.isActive2);
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabTwoBallsOneTime(this.isActive1);
    } else if (this.oneOrTwo === 33) {
      (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabThreeBallsHundredTime(this.isActive2);
      (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabThreeBallsOneTime(this.isActive1);
    }
    // setTimeout( ()  => {
    //   this.isActive2 = false;
    // } , 10000);
  }

  //抓取一个球
  buttonClickEvent3() {
    this.isActive3 = true;
    this.isActive4 = false;
    this.isActive5 = false;
    this.oneOrTwo = 11;
    document.getElementById('btn1').removeAttribute('disabled');
    document.getElementById('btn2').removeAttribute('disabled');
    document.getElementById('tab').removeAttribute('height');
    document.getElementById('tab').setAttribute('height' , '1000');
    document.getElementById('buttonStyle1_div').removeAttribute('hidden');
    document.getElementById('buttonStyle2_div').removeAttribute('hidden');
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneOne(this.isActive3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoTwo3(this.isActive4);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabThreeThree(this.isActive5);
  }
  //抓取两个球
  buttonClickEvent4() {
    this.isActive3 = false;
    this.isActive4 = true;
    this.isActive5 = false;
    this.oneOrTwo = 22;
    document.getElementById('btn1').removeAttribute('disabled');
    document.getElementById('btn2').removeAttribute('disabled');
    document.getElementById('buttonStyle1_div').removeAttribute('hidden');
    document.getElementById('buttonStyle2_div').removeAttribute('hidden');
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoTwo3(this.isActive4);
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneOne(this.isActive3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabThreeThree(this.isActive5);
  }
  //抓取三个球
  buttonClickEvent5() {
    this.isActive3 = false;
    this.isActive4 = false;
    this.isActive5 = true;
    this.oneOrTwo = 33;
    document.getElementById('btn1').removeAttribute('disabled');
    document.getElementById('btn2').removeAttribute('disabled');
    document.getElementById('buttonStyle1_div').removeAttribute('hidden');
    document.getElementById('buttonStyle2_div').removeAttribute('hidden');
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabThreeThree(this.isActive5);
    (ViewController.getInstance().viewHandler as any).dmCanvas.shwoGrabOneOne(this.isActive3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showGrabTwoTwo3(this.isActive4);
  }


  resetButton(value: number) {
    if (value !== 1) {
      this.clickNumber1 = true;
      this.isActive1 = false;
    }
  }
}
