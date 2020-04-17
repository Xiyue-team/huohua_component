import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TshsgzjqdViewHandler} from './services/TshsgzjqdViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil' ;

@Component
export class MainVueComponent extends Vue {
    // data
      displayer = true;
      title1  =   '求导';
      title1s =  '查看图像';
      isMobile =   false;
//高亮
      gaoliang1 =  false;
      gaoliang1s = false;
      gaoliang2 =  false;
      gaoliang2s = false;
      gaoliang3 =  false;
      gaoliang3s = false;
      gaoliang4 =  false;
      gaoliang4s = false;
      gaoliang5 =  false;
      gaoliang5s = false;
      gaoliang6 =  false;
      gaoliang6s = false;

//求导按钮
      displayqiu1 = false;
      displayqiu2 = false;
      displayqiu3 = false;
      displayqiu4 = false;
      displayqiu5 = false;
      displayqiu6 = false;
//查看按钮
      displayview1 = false;
      displayview2 = false;
      displayview3 = false;
      displayview4 = false;
      displayview5 = false;
      displayview6 = false;
//导数
      displaydao1 = false;
      displaydao2 = false;
      displaydao3 = false;
      displaydao4 = false;
      displaydao5 = false;
      displaydao6 = false;

      displaydao1s = false;
      displaydao2s = false;
      displaydao3s = false;
      displaydao4s = false;
      displaydao5s = false;
      displaydao6s = false;
//判断过程是否完成
      decide1 = true;
      decide2 = true;
      decide3 = true;
      decide4 = true;
      decide5 = true;
      decide6 = true;

//原函数显示
      display1 = true;
      display2 = true;
      display3 = true;
      display4 = true;
      display5 = true;
      display6 = true;

//坐标轴显示
      displayc1 = false;
      displayc2 = false;
      displayc3 = false;
      displayc4 = false;
      displayc5 = false;
      displayc6 = false;

  created() {

    ViewController.getInstance(new TshsgzjqdViewHandler(this));
    ViewController.getInstance().viewHandler.beforeRenderElement();

  }
  mounted() {
    if (BrowserUtil.getBrowserInfo().isSmallDevice) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    ViewController.getInstance().domReady();

  }

  // methods
  //创建点击原函数触发事件方法
  push1() {
        this.display1 = false;
        this.displayqiu1 = true;
        this.displaydao1 = false;
        this.decide1 = true;

        this.gaoliang1 = false;
        this.displaydao1 = false;
        this.displayview1 = false;

        this.back2();
        this.back3();
        this.back4();
        this.back5();
        this.back6();
    }

    push2() {

      this.display2 = false;
      this.displayqiu2 = true;
      this.displaydao2 = false;

      this.decide2 = true;

      this.gaoliang2 = false;
      this.displaydao2 = false;
      this.displayview2 = false;

      this.back1();
      this.back3();
      this.back4();
      this.back5();
      this.back6();
    }

    push3() {

      this.display3 = false;
      this.displayqiu3 = true;
      this.displaydao3 = false;

      this.decide3 = true;

      this.gaoliang3 = false;
      this.displaydao3 = false;
      this.displayview3 = false;

      this.back1();
      this.back2();
      this.back4();
      this.back5();
      this.back6();
    }

    push4() {

      this.display4 = false;
      this.displayqiu4 = true;
      this.displaydao4 = false;

      this.decide4 = true;

      this.gaoliang4 = false;
      this.displaydao4 = false;
      this.displayview4 = false;

      this.back1();
      this.back2();
      this.back3();
      this.back5();
      this.back6();
    }

    push5() {
      this.display5 = false;
      this.displayqiu5 = true;
      this.displaydao5 = false;

      this.decide5 = true;

      this.gaoliang5 = false;
      this.displaydao5 = false;
      this.displayview5 = false;

      this.back1();
      this.back2();
      this.back3();
      this.back4();
      this.back6();
    }

    push6() {
      this.display6 = false;
      this.displayqiu6 = true;
      this.displaydao6 = false;

      this.decide6 = true;

      this.gaoliang6 = false;
      this.displaydao6 = false;
      this.displayview6 = false;

      this.back1();
      this.back2();
      this.back3();
      this.back4();
      this.back5();

    }
    //创建点击求导按钮触发事件方法
    pushqiu1() {

      this.gaoliang1 = true;
      this.displaydao1 = false;
      this.displaydao1s = true;
      this.displayview1 = true;

    }

    pushqiu2() {

      this.gaoliang2 = true;
      this.displaydao2 = false;
      this.displaydao2s = true;
      this.displayview2 = true;
    }
    pushqiu3() {

      this.gaoliang3 = true;
      this.displaydao3 = false;
      this.displaydao3s = true;
      this.displayview3 = true;

    }

    pushqiu4() {

      this.gaoliang4 = true;
      this.displaydao4 = false;
      this.displaydao4s = true;
      this.displayview4 = true;
    }

    pushqiu5() {

      this.gaoliang5 = true;
      this.displaydao5 = false;
      this.displaydao5s = true;
      this.displayview5 = true;
    }

    pushqiu6() {

      this.gaoliang6 = true;
      this.displaydao6 = false;
      this.displaydao6s = true;
      this.displayview6 = true;
    }

    //创建点击查看图像按钮触发事件方法
    pushview1() {

       this.gaoliang1s = true;
       this.displayc1 = true;
       setTimeout(() => {
        this.displayer = false;
        this.decide1 = false;

      }, 500);

    }

    pushview2() {

      this.gaoliang2s = true;
      this.displayc2 = true;
      setTimeout(() => {
          this.displayer = false;
          this.decide2 = false;

        }, 500);

    }


    pushview3() {

      this.gaoliang3s = true;
      this.displayc3 = true;
      setTimeout(() => {
        this.displayer = false;
        this.decide3 = false;

      }, 500);

    }

    pushview4() {

      this.gaoliang4s = true;
      this.displayc4 = true;
      setTimeout(() => {
        this.displayer = false;
        this.decide4 = false;

      }, 500);

    }

    pushview5() {

      this.gaoliang5s = true;
      this.displayc5 = true;
      setTimeout(() => {
        this.displayer = false;
        this.decide5 = false;

      }, 500);

    }


    pushview6() {

      this.gaoliang6s = true;
      this.displayc6 = true;
      setTimeout(() => {
        this.displayer = false;
        this.decide6 = false;

      }, 500);

    }

    //创建点击其它原函数触发方法
    back1() {
      this.displayer = true;
      this.gaoliang1 = false;
      this.gaoliang1s = false;
      this.displayqiu1 = false;
      this.displayview1 = false;

      this.display1 = true;

      this.displaydao1 = true;
      this.displaydao1s = false;
      this.displayc1 = false;

      if (this.decide1 === true ) {
        this.displaydao1 = false;
      }
    }

    back2() {
      this.displayer = true;
      this.gaoliang2 = false;
      this.gaoliang2s = false;
      this.displayqiu2 = false;
      this.displayview2 = false;

      this.display2 = true;

      this.displaydao2 = true;
      this.displaydao2s = false;
      this.displayc2 = false;

      if (this.decide2 === true ) {
        this.displaydao2 = false;
      }
    }

    back3() {
      this.displayer = true;
      this.gaoliang3 = false;
      this.gaoliang3s = false;
      this.displayqiu3 = false;
      this.displayview3 = false;

      this.display3 = true;

      this.displaydao3 = true;
      this.displaydao3s = false;
      this.displayc3 = false;

      if (this.decide3 === true ) {
        this.displaydao3 = false;
      }
    }

    back4() {
      this.displayer = true;
      this.gaoliang4 = false;
      this.gaoliang4s = false;
      this.displayqiu4 = false;
      this.displayview4 = false;

      this.display4 = true;

      this.displaydao4 = true;
      this.displaydao4s = false;
      this.displayc4 = false;

      if (this.decide4 === true ) {
        this.displaydao4 = false;
      }
    }

    back5() {
      this.displayer = true;
      this.gaoliang5 = false;
      this.gaoliang5s = false;
      this.displayqiu5 = false;
      this.displayview5 = false;

      this.display5 = true;

      this.displaydao5 = true;
      this.displaydao5s = false;
      this.displayc5 = false;

      if (this.decide5 === true ) {
        this.displaydao5 = false;
      }

    }
    back6() {
      this.displayer = true;
      this.gaoliang6 = false;
      this.gaoliang6s = false;
      this.displayqiu6 = false;
      this.displayview6 = false;

      this.display6 = true;

      this.displaydao6 = true;
      this.displaydao6s = false;
      this.displayc6 = false;

      if (this.decide6 === true ) {
        this.displaydao6 = false;
      }

    }

    // 监听事件




}

