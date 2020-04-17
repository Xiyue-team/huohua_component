import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  active1 = false;
  active2 = false;
  active3 = false;
  active4 = false;
  tf = false;
  tt = false;
  showEquation = true;
  triangleText = '锐角三角形';
  disabledClick = false;

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
      this.tt = true;
      this.tf = false;
      this.active2 = !this.active2;
      if (this.active2) {
        this.tf = false;
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.drawOuterPoint();
      } else {
        this.tf = false;
        this.tt = true;
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.reset();
        this.active3 = false;
        this.active4 = false;
      }
    } else if (v === 3 && this.active2 && !this.active3) {
      this.tf = true;
      this.active3 = true;
      this.tt = true;
      this.active4 = false;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectMidPoint();
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.hide();
    } else if (v === 4 && this.active2 && !this.active4) {
      this.tf = false;
      this.active4 = true;
      this.active3 = false;
      this.tt = true;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectOuterAni();
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.visible();
    }

  }
  //适配
  resize() {

  }
  
}
