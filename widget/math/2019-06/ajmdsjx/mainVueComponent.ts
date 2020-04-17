import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  buttonInta = window.env.browserInfo.lang.buttonBox;
  zoom1 = 0;
  ow: any;
  isHave: any = 3;
  isDefinition = false;
  isAnalyze = false;
  showAnla = false;
  analyzeImg1 = false;
  analyzeImg2 = false;
  buttonBox: any = [];
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
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    this.buttonBox = this.buttonInta;
    const W = window.innerWidth;
    if (W === 1280) {
      $('.analyzeImg1').css('transform', 'scale(0.8)');
      $('.analyzeImg2').css('transform', 'scale(0.8)');
      $('.textFirst').css('transform', 'scale(0.8)');
      $('.textFirst').css('right', '6%');
    }
    ViewController.getInstance().domReady();
    this.ow = (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel;
  }
  //点击事件
  //定义
  definItion() {
    this.isDefinition = !this.isDefinition;
    this.ow.clickRedTangle();
  }
  //分析
  anAlyze() {
    this.isAnalyze = !this.isAnalyze;
    if (this.isAnalyze) {
      if (this.isHave === 0) {
        this.analyzeImg1 = true;
        this.analyzeImg2 = false;
        this.ow.natureAna1();
      } else if (this.isHave === 1) {
        this.analyzeImg2 = true;
        this.analyzeImg1 = false;
      }
    } else {
        this.analyzeImg2 = false;
        this.analyzeImg1 = false;
        this.ow.natureAna1();
    }
    
  }
  //性质
  clickButton(index: number) {
    this.isHave = index;
    this.showAnla = true;
    this.isAnalyze = false;
    this.analyzeImg2 = false;
    this.analyzeImg1 = false;
    if (index === 0) {
      this.ow.nature1();
      this.ow.natureAna1();
    }
    if (index === 1) {
      this.ow.nature2();
    }
    if (index === 2) {
      this.showAnla = false;
      this.ow.nature3();
    }
  }
  //methods
    // ;

//适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 > 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / 800;
    }
}
}
