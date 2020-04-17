import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DzdyViewHandler} from './services/DzdyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as img from './sub_static/UI/wt.png';
@Component
export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonArr = window.env.browserInfo.lang.buttonArr;
    textArr = window.env.browserInfo.lang.textArr;
    //data
    zoom1 = 1;
    have = true;
    ishave = 5;
    active1 = false;
    showBj = true;
    private imgs : any = [];
    picture = img;
    msg1 = true; //定义变量用来控制按钮点击的次数
    msg2 = true; //定义变量用来控制按钮点击的次数
    msg3 = true; //定义变量用来控制按钮点击的次数
    msg4 = true; //定义变量用来控制按钮点击的次数
    msg5 = true; //定义变量用来控制按钮点击的次数
    // created
    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      ViewController.getInstance(new DzdyViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    mounted() {
      (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style = 'none';
      ViewController.getInstance().domReady(); 
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
    }
    //点击按钮切换视频
    getEvent(offset: any) {
        this.showBj = false;
      if (offset === 0) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(0);
      } else if (offset === 1) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(1);
      } else if (offset === 2) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(2);
      } else if (offset === 3) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(3);
      } else if (offset === 4) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(4);
      }
    }
    //适配窗口用的函数
    resize() {
      const W1 = window.innerWidth;
      const H1 = window.innerHeight;
      if (W1 / H1 > 1024 / 576) {
        this.zoom1 = H1 / 576;
      }  else {
        this.zoom1 = W1 / 1024;
      }
      if( H1 === 534){
        document.getElementById('buttonBox').style.transform = 'scale(0.7)  translate(25%, 21%)';
     }
     if( H1 === 510){
      document.getElementById('buttonBox').style.transform = 'scale(0.7)  translate(25%, 21%)';
   }
      if( H1 < 376){
         document.getElementById('title').style.zoom = '0.7';
         document.getElementById('buttonBox').style.transform = 'scale(0.7)  translate(25%, 21%)';
      }
      if( W1 > 2500){
        document.getElementById('buttonBox').style.transform = 'scale(1.8) ';
     }
    }
}

