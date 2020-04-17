import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ZhswyyhswViewHandler } from './services/ZhswyyhswViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as mirrorLeft1 from './sub_static/1.png';
import * as mirrorLeft2 from './sub_static/2.png';
import * as mirrorLeft3 from './sub_static/3.png';
import * as mirrorLeft4 from './sub_static/4.png';
import * as mirrorLeft5 from './sub_static/5.png';
import * as mirrorLeft6 from './sub_static/6.png';
import * as mirrorLeft7 from './sub_static/7.png';
import * as mirrorLeft8 from './sub_static/8.png';
import * as mirrorLeft9 from './sub_static/9.png';
import * as mirrorLeft10 from './sub_static/10.png';
import * as mirrorLeft1_1 from './sub_static/1_1.png';
import * as mirrorLeft2_2 from './sub_static/2_2.png';
import * as mirrorLeft3_3 from './sub_static/3_3.png';
import * as mirrorLeft4_4 from './sub_static/4_4.png';
import * as mirrorLeft5_5 from './sub_static/5_5.png';
import * as mirrorLeft6_6 from './sub_static/6_6.png';
import * as mirrorLeft7_7 from './sub_static/7_7.png';
import * as mirrorLeft8_8 from './sub_static/8_8.png';
import * as mirrorLeft9_9 from './sub_static/9_9.png';
import * as mirrorLeft10_10 from './sub_static/10_10.png';
import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  tiShiTitle = window.env.browserInfo.lang.tiShiTitle;
  contentTitle = window.env.browserInfo.lang.contentTitle;
  //data
  pC = true; //控制图片的显示隐藏
  tishi = true; //控制提示文字的显示隐藏
  zoom1 = 0; //控制整个屏幕的显示大小
  allImagArr: any = []; //存放图片的数组
  allImagArrMax: any = []; //存放点击后图片变大图片的数组
  imgArr = [{ src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" },
    { src: "", text: "" }, { src: "", text: "" }]; //上面的选框存放图片的数组
  imgArr1 = [{ src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" },
    { src: "", text: "" }, { src: "", text: "" }]; //下面的选框存放图片的数组
  selectedItem: any = "";
  textArr = [
    '蝴蝶', '蝉', '螳螂', '蚊子', '苍蝇', '蟋蟀', '蝼蛄', '蝗虫', '蜜蜂', '蚕'
  ];
  tipMax_img_src: any = "";

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    this.allImagArr.push(mirrorLeft1, mirrorLeft2, mirrorLeft3, mirrorLeft4,
      mirrorLeft5, mirrorLeft6, mirrorLeft7, mirrorLeft8, mirrorLeft9, mirrorLeft10);
    this.allImagArrMax.push(mirrorLeft1_1, mirrorLeft2_2, mirrorLeft3_3, mirrorLeft4_4,
      mirrorLeft5_5, mirrorLeft6_6, mirrorLeft7_7, mirrorLeft8_8, mirrorLeft9_9, mirrorLeft10_10);
    ViewController.getInstance(new ZhswyyhswViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
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
    this.tipMax_img_src = "";
  }

  reset() {
    this.tishi = true;
    const W = window.innerWidth;
    if (W > 1000) {
      for (let i = 0; i < 12; i++) {
        $(`#image${i}`).css({
          visibility: 'visible'
        });
        $(`#textText${i}`).show();
      }
    } else {
      $(`.chioceImgBox`).show();
      for (let i = 0; i < 12; i++) {
        $(`#textText${i}`).show();
      }
    }
    $('.textText').css({ opacity: '1' });
    this.imgArr = [{ src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" },
      { src: "", text: "" }, { src: "", text: "" }, { src: "", text: "" }];
    this.imgArr1 = [{ src: "", text: "" }, { src: "", text: "" },
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
