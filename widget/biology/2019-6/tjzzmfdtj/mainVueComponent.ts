import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SgdhhViewHandler} from './services/SgdhhViewHandler';
import * as shi from './sub_static/shiTem.png';
import * as hot from './sub_static/hotTem.png';
import * as low from './sub_static/lowTem.png';
@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  zoom1 = 0; //屏幕宽高比
  backGround: any = null; //背景图片
  backGroundLow: any = null; //背景图片
  backGroundHot: any = null; //背景图片
  isHaveLow = false;
  isHaveHot = false;
  textReminder = '充足空气';
  changeBackGroundBlue = false; //按钮点击反馈
  waterGray = false; //滑条置灰
  temGray = false; //滑条置灰
  result = true;
  textConter: any = "";
  //created
    created() {
       const viewOption = new ViewOption();
       viewOption.mobilePanelAlpha = true;
       viewOption.showMobileExpandIco = false;
       viewOption.controlPanelAnimationDelay = 1000;
       this.backGround = shi;
       this.backGroundLow = low;
       this.backGroundHot = hot;
       ViewController.getInstance(new SgdhhViewHandler(this), viewOption);
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
  //点击按钮
  showResult() {
      this.changeBackGroundBlue = true;
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.showResult();
      setTimeout(() => {
      this.changeBackGroundBlue = false;
    }, 100);
  }
  //重置
  reset() {
    (ViewController.getInstance().viewHandler as SgdhhViewHandler).reset();
  }
    //适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 > 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / W1;
    }
  }
}
