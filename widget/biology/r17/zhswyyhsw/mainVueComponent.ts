import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZhswyyhswViewHandler} from './services/ZhswyyhswViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
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
import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {

  //data
  pC = true;
  tishi = true;
  fromNode: any = null;
  opacityText = 1;
  hidenName = 1;
  CName = 1;
  zoom1 = 0;
  textName = 1;
  allImagArr: any = [];
  imgArr = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}];
  imgArr1 = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}];
  obj = {};
  textArr = [
       '霉菌', '蘑菇', '念珠藻', '双歧杆菌', '幽门螺杆菌', '变形虫', '酵母菌', '大肠杆菌', '草履虫', '金黄色葡萄杆菌'
   ];

   //created
   created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    
    this.allImagArr.push(mirrorLeft1, mirrorLeft2, mirrorLeft3, mirrorLeft4, 
      mirrorLeft5, mirrorLeft6, mirrorLeft7, mirrorLeft8, mirrorLeft9, mirrorLeft10);
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
}

    reset() {
       this.tishi = true;
  const W = window.innerWidth;
  if (W > 1000) {
      for (let i = 0; i < 10; i++) {
          $(`#image${i}`).css({
              visibility: 'visible'
          });
      }
  } else {
          $(`.chioceImgBox`).show();
  }
$('.textText').css({opacity: '1'});
this.imgArr = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}];
this.imgArr1 = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}];
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
