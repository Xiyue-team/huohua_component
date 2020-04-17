import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TydbzfcViewHandler} from './services/TydbzfcViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
       a = 5;
       b = 3;
       showEquation = true;
       isactivete = true;
       isactive11 = false;
       initialState = 1;
       isactive = true;
       isactive1 = false;
       close = false;
       open = true;
       open1 = true;
       close1 = true;
       initEquation = false;
       initEquation1 = false;
       zoom1 = 0;

  //created
  created() {
       const viewOption = new ViewOption();
       viewOption.mobilePanelAlpha = true;
       viewOption.showMobileExpandIco = false;
       viewOption.controlPanelAnimationDelay = 1000;
   
       ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
       ViewController.getInstance().viewHandler.beforeRenderElement(); 
  }

  //mounted
  mounted() {
    setTimeout(() => {
      this.initEquation = true;
  }, 1000);
      this.resize();
      window.addEventListener('resize', () => {
          this.resize();
      });
      ViewController.getInstance().domReady(); 
  }

  //methods
  //切换按钮
  changeBackground(num: number) {
    if (num === 2) {
        this.isactive11 = true;
        this.isactive1 = true;
        this.close = true;
        this.close1 = false;
        this.initEquation = false;
        this.initEquation1 = true;

        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.initEvtY();
    }
    if (num === 1) {
        this.isactive1 = false;
        this.isactive11 = false;
        this.close = false;
        this.close1 = true;
        this.initEquation1 = false;
        this.initEquation = true;

        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.initEvtY();
    }
}

//适配
resize() {
       const W1 = window.innerWidth;
       const H1 = window.innerHeight;
       if (W1 / H1 < 1024 / 750) {
            this.zoom1 = W1 / 1024;
       }
       if (W1 / H1 > 1.334) {
           if ((navigator.userAgent.match(
             // tslint:disable-next-line:max-line-length
             /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          this.zoom1 = H1 / 590;
       } 
     } else {
        this.zoom1 = 1;
     }
   }
}
