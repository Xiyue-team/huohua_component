import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
  //data
  
  zoom1 = 1;
  icon1=false;
  icon2=false;
  icon3=false;
  icon4=false;
  icon5=false;
  width1=document.body.clientWidth;
  height1=document.body.clientHeight;
  
  // number = 370;
  title = window.env.browserInfo.lang.title;
  text = window.env.browserInfo.lang.text;
  bg: any = require('./sub_static/UI/bg.png');
  one:any=require("./sub_static/UI/1.png");
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
console.log(this.width1,this.height1)
  }
  // mounted
  mounted() {
      ViewController.getInstance().domReady();
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
  }
  //点击
  getChange(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
  }
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 576) {
      this.zoom1 = H1 / 576;
    } else {
      this.zoom1 = W1 / 1024;
    }
  }
  // 重置
  reset() {
    (ViewController.getInstance().viewHandler as MyViewHandler).reset();
  }



}

