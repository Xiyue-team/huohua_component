import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as console from 'console';

@Component
export class MainVueComponent extends Vue {
  //data
  active1 = false;
  active2 = false;
  active3 = false;
  active4 = false;
  showEquation = true;
  triangleText = '锐角三角形';
  disabledClick = false;
  zoom1 = 0;
  zoom2 = 0;

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = true;
    viewOption.controlPanelAnimationDelay = 1000;

    ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
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
  
  //methods
  btnEvent(v: any) {
    if (v === 1) {
      this.active1 = !this.active1;
    } else if (v === 2) {
      this.active2 = !this.active2;
      if (this.active2) {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.drawOuterPoint();
      } else {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.reset();
        this.active3 = false;
        this.active4 = false;
      }
    } else if (v === 3 && this.active2 && !this.active3) {
      
      this.active3 = true;
      this.active4 = false;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectOuterAni();
    } else if (v === 4 && this.active2 && !this.active4) {
      this.active4 = true;
      this.active3 = false;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectOuterAni();
    }

  }
  //适配
  resize() {
    // const W = window.innerWidth;
    // if (W < 1200) {
    //   this.zoom1 = 0.5;
    // }
  }
  
}
