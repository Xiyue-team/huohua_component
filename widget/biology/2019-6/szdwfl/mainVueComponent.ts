import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as mirrorLeft1 from './sub_static/1.png';
import * as mirrorLeft2 from './sub_static/2.png';
import * as mirrorLeft3 from './sub_static/3.png';
import * as mirrorLeft4 from './sub_static/4.png';
import * as mirrorLeft5 from './sub_static/5.png';
import * as mirrorLeft6 from './sub_static/6.png';
import * as mirrorLeft7 from './sub_static/7.png';
import * as mirrorLeft8 from './sub_static/8.png';
import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  tiShiTitle = window.env.browserInfo.lang.tiShiTitle;
  boxTitle = window.env.browserInfo.lang.boxTitle;
  //data
  zoom1 = 0;
  leftImagArr: any = [];
  rightImagArr: any = [];
  name: any;
  have = true;
  ishave = true;
  tishi = true;
  imgArr1 = [{ src: "", text: "" }, { src: "", text: "" }];
  imgArr2 = [{ src: "", text: "" }, { src: "", text: "" }];
  imgArr3 = [{ src: "", text: "" }, { src: "", text: "" }];
  imgArr4 = [{ src: "", text: "" }, { src: "", text: "" }];
  obj = {};
  selectedItem: any = "";
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    this.leftImagArr.push(mirrorLeft1, mirrorLeft2, mirrorLeft3, mirrorLeft4);
    this.rightImagArr.push(mirrorLeft5, mirrorLeft6, mirrorLeft7, mirrorLeft8);
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    //禁止双指缩放图片
    document.documentElement.addEventListener('touchmove', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, false);

    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    //隐藏重置按钮
    const Height = document.documentElement.clientHeight;
    if (Height < 400) {
      (document.getElementById('reset') as any).style.transform = 'scale(0.7) translate(50%,-50%)';
    }
  }

  cleanSelectedItem() {
    this.selectedItem = null;
  }

  reset() {
    this.tishi = true;
    for (let i = 0; i < 4; i++) {
      $(`#image_left${i}`).css({
        visibility: 'visible'
      });
    }
    for (let i = 0; i < 4; i++) {
      $(`#image_right${i}`).css({
        visibility: 'visible'
      });
    }
    $('.textText').css({ opacity: '1' });
    this.imgArr1 = [{ src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" },
      { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }];
    this.imgArr2 = [{ src: "", text: "" }, { src: "", text: "" },
      { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }];
    this.imgArr3 = [{ src: "", text: "" }, { src: "", text: "" },
      { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }];
    this.imgArr4 = [{ src: "", text: "" }, { src: "", text: "" },
      { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }];
    this.cleanSelectedItem();
  }

  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 750) {
      this.zoom1 = H1 / 750;
    } else {
      this.zoom1 = W1 / 1024;
    }
  }
}
