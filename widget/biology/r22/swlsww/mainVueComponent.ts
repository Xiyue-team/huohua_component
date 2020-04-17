import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZhswyyhswViewHandler} from './services/ZhswyyhswViewHandler';
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
import * as error from './sub_static/error.png';
import * as real from './sub_static/real.png';
import * as jiantou from './sub_static/jiantou.png';
import * as line_ani from './sub_static/anim.gif';
import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {

  //data
  have = true;
  ishave1: any = true;
  ishave2: any = false;
  ishave3: any = false;
  pC = false;
  tishi = false;
  allradey = false;
  caseShow1 = false;
  caseShow2 = false;
  zoom1 = 0;
  allImagArr: any = [];
  ow: any;
  realOrerror = false;
  tishiImg: any = null;
  imgArr: any = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, 
  {src: '', text: ''}, {src: '', text: ''}];
  imgArr1: any = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}, 
  {src: '', text: ''}, {src: '', text: ''}];
  imgArr2: any = [{src: '', text: ''}, {src: '', text: ''}, {src: '', text: ''}];
  obj = {};
  textArr = [
       '草', '蛇', '蚂蚱', '兔', '猫头鹰', '蜘蛛', '青蛙', '狐狸', '麻雀', '老鼠'
   ];
   minBox_one: any = [];
   minBox_two: any = [];
   minBox_Arr: any = [];
   minBox_text_Arr: any = [];
   srcArr: any = [];
   deleteArr: any = [];

   // 多个变量进行判断
   verdict_1: boolean;
   verdict_2: boolean;
   verdict_2_4: boolean; //4个
   verdict_2_5: boolean; //5个
   verdict_3: boolean; //3个
   verdict_3_4: boolean; //4个
   verdict_3_5: boolean; //5个
   verdict_3_6: boolean; //6个
   verdict_4: boolean;
   verdict_4_5: boolean; //5个
   verdict_4_6: boolean; //6个
   verdict_5: boolean;
   verdict_5_6: boolean; //6个
   verdict_6: boolean;
   mainPage = true;
   gif_ani = false;
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
    this.foodCycle();
    this.resize();
    window.addEventListener('resize', () => {
        this.resize();
    });
    const ua = navigator.userAgent;
    if (ua.indexOf('OPM1') !== -1 && ua.indexOf('huohua') !== -1 ) {
      $('.imgBox').css('width', '80%');
    }
    if (ua.indexOf('M2') !== -1 && ua.indexOf('huohua') !== -1 ) {
      $('.case_one').css('left', '4%');
      $('.case_two').css('left', '4%');
      $('.case_three').css('left', '4%');
      $('.batterylow_arrows').css('left', '4%');
      $('.tasks_arrows').css('left', 'calc(4% + 648px)');
    }
    for (let i = 0; i < 7; i++) {
        $(`#topMinDiv${i}`).css('opacity', '0');
        $(`#topMinDiv1${i}`).css('opacity', '0');
        $(`#topMinDiv2${i}`).css('opacity', '0');
        
        if (~[0, 2, 4, 6].indexOf(i)) {
          $(`#topMinDiv${i}`).css('background-color', '#1E1E1E');
          $(`#topMinDiv1${i}`).css('background-color', '#1E1E1E');
          $(`#topMinDiv2${i}`).css('background-color', '#1E1E1E');
          this.minBox_one.push($(`#topMinDiv${i}`));
          this.minBox_two.push($(`#topMinDiv1${i}`));
      } else {
        $(`#topMinDiv1${i}`).css('transform', 'rotate(' + 180 + 'deg)');
      }
    }
    this.minBox_two.reverse();
    this.minBox_Arr.push(...this.minBox_one, ...this.minBox_two, $('#topMinDiv20'), $('#topMinDiv22'));
    for (let i = 0; i < 10; i++) {
      const _delete = this.minBox_Arr[i].find('div');
      this.deleteArr.push(_delete);
    }
    for (let i = 1; i < 6; i += 2) {
      this.imgArr[i].src = jiantou;
      this.imgArr1[i].src = jiantou;
    }
    this.imgArr2[1].src = jiantou;
    this.ow = (ViewController.getInstance().viewHandler as ZhswyyhswViewHandler);
    ViewController.getInstance().domReady();
}

//食物链
foodCycle() {
  (document.getElementById('gif_src') as any).src = '';
  this.pC = true;
  this.mainPage = true;
  this.gif_ani = false;
  this.clickBack(1);
  if (!this.imgArr[0].src) {
    this.tishi = true;
  }
  if (this.imgArr[2].src) { 
    this.allradey = true;
  }
  for (let i = 0; i < 7; i++) {
    if (~[1, 3, 5].indexOf(i)) {
      $(`#delete${i}`).css('visibility', 'hidden');
    }
  }
  const W = window.innerWidth;
  const H = window.innerHeight;
  if (W < 1000) {
    $('.foodCycle').css('bottom', '590px');
  } else {
    $('.foodCycle').css('bottom', '630px');
  }
  if (H < 350) {
    $('.foodCycle').css('bottom', '584px');
  }
}
//完成
complete() {
  (document.getElementById('gif_src') as any).src = line_ani;
  this.clickBack(2);
  this.completeText();
}
//食物网
foodWeb() {
  (document.getElementById('gif_src') as any).src = line_ani;
  this.clickBack(3);
  this.pC = false;
  this.allradey = false;
  this.mainPage = false;
  this.gif_ani = true;
  $('.foodCycle').css('bottom', '100px');
}
//点击按钮 反馈
clickBack(num: number) {
  this.ishave1 = num === 1 || num === 2 ? true : false;
  this.ishave2 = num === 2 ? true : false;
  this.ishave3 = num === 3 ? true : false;
}

   //点击完成按钮
   completeText() {
     if (this.allradey) {
      this.realOrerror = true;
     }
     this.srcArr = [];
     this.minBox_text_Arr = [];
    for (let i = 0; i < 10; i++) {
      const src = this.minBox_Arr[i].find('img').attr('src');
      const text = this.minBox_Arr[i].find('img').text();
      this.srcArr.push(src);
      this.minBox_text_Arr.push(text);
    }
    this.verdict_1 = this.minBox_text_Arr[0] === '草' ? true : false;
    this.verdict_2 = this.minBox_text_Arr[1] === '老鼠' ||  this.minBox_text_Arr[1] === '兔' ? true : false;
    this.verdict_2_4 = this.minBox_text_Arr[1] === '老鼠' || this.minBox_text_Arr[1] === '蚂蚱' ? true : false; //4个
    this.verdict_2_5 = this.minBox_text_Arr[1] === '蚂蚱' ? true : false;
    this.verdict_3 = this.minBox_text_Arr[2] === '猫头鹰' ||  this.minBox_text_Arr[2] === '狐狸' ? true : false; //3个
    this.verdict_3_4 = this.minBox_text_Arr[2] === '蛇' ||  this.minBox_text_Arr[2] === '麻雀' ? true : false; //4个
    this.verdict_3_5 = this.minBox_text_Arr[2] === '蜘蛛' || this.minBox_text_Arr[2] === '青蛙' ? true : false; //5个
    this.verdict_3_6 = this.minBox_text_Arr[2] === '蜘蛛' ? true : false; //6个
    this.verdict_4 = this.minBox_text_Arr[3] === '猫头鹰' ? true : false; //4个
    this.verdict_4_5 = this.minBox_text_Arr[3] === '麻雀' || this.minBox_text_Arr[3] === '蛇' ? true : false; //5个
    this.verdict_4_6 = this.minBox_text_Arr[3] === '青蛙' ? true : false; //6个
    this.verdict_5 = this.minBox_text_Arr[4] === '猫头鹰' ? true : false; //5个 
    this.verdict_5_6 = this.minBox_text_Arr[4] === '蛇' ? true : false; //6个 
    this.verdict_6 = this.minBox_text_Arr[5] === '猫头鹰' ? true : false; //6个 
    if (this.srcArr[1] && !this.srcArr[2]) { //二有三无
        this.openImg(error);
    } else if (this.srcArr[2] && !this.srcArr[3]) { //三有四无
      if (this.verdict_1 && this.verdict_2 && this.verdict_3) {
        this.openImg(real);
      } else {
        this.openImg(error);
      }
    } else if (this.srcArr[3] && !this.srcArr[4]) { //四有五无
      if (this.verdict_1 && this.verdict_2_4 && this.verdict_3_4 && this.verdict_4) {
        this.openImg(real);
      } else {
        this.openImg(error);
      }
    } else if (this.srcArr[4] && !this.srcArr[5]) { //五有六无
      if (this.verdict_1 && this.verdict_2_5 && this.verdict_3_5 && this.verdict_4_5 && this.verdict_5) {
        this.openImg(real);
      } else {
        this.openImg(error); 
      }
    } else if (this.srcArr[5] && !this.srcArr[6]) { //六有七无
      if (this.verdict_1 && this.verdict_2_5 && this.verdict_3_6 && this.verdict_4_6 && this.verdict_5_6 && this.verdict_6) {
        this.openImg(real);
      } else {
        this.openImg(error);
      }
    } else {
      this.openImg(error);
    }
}
  //删除
  delete_1(num: number) {
    this.imgArr[num].src = '';
    $(`#topMinDiv${num}`).css('opacity', '0');
    $(`#delete${num}`).css('visibility', 'hidden');
    $(`#topMinDiv${num - 1}`).css('opacity', '0');
    $(`#delete${num - 2}`).css('visibility', 'visible');
    this.ow.clickDelete();
    if ($('#topMinDiv2').css('opacity') === '0') {
      this.allradey = false;
    } else {
      this.allradey = true;
    }
  }

  delete_2(num: number) {
    this.imgArr1[num].src = '';
    $(`#topMinDiv1${num}`).css('opacity', '0');
    $(`#delete1${num}`).css('visibility', 'hidden');
    $(`#topMinDiv1${num + 1}`).css('opacity', '0');
    $(`#delete1${num + 2}`).css('visibility', 'visible');
    if (num === 6) {
      this.caseShow1 = false;
      $('#delete6').css('visibility', 'visible');
    }
    this.ow.clickDelete();
  }

  delete_3(num: number) {
    this.imgArr2[num].src = '';
    $(`#topMinDiv2${num}`).css('opacity', '0');
    $(`#delete2${num}`).css('visibility', 'hidden');
    $(`#topMinDiv2${num - 1}`).css('opacity', '0');
    $(`#delete2${num - 2}`).css('visibility', 'visible');
    if (num === 0) {
      this.caseShow2 = false;
      $('#delete10').css('visibility', 'visible');
    }
    this.ow.clickDelete();
  }

//判断对错 提示图片
  openImg(errorOrright: any) {
    this.tishiImg = errorOrright;
    setTimeout(() => {
      this.tishiImg = null;
      this.realOrerror = false;
      this.ishave2 = false;
    }, 1000);
  }
reset() {
  (document.getElementById('gif_src') as any).src = line_ani;
  this.allradey = false;
  this.caseShow1 = false;
  this.caseShow2 = false;
  this.pC = false;
  this.mainPage = true;
  this.gif_ani = false;
  this.tishi = false;
  this.clickBack(0);
  this.ow.clearArr();
  $('.foodCycle').css('bottom', '100px');
  for (let i = 0; i < 10; i++) {
    $(`#topMinDiv${i}`).css('opacity', '0');
    $(`#topMinDiv1${i}`).css('opacity', '0');
    if (~[0, 2, 4, 6].indexOf(i)) {
          this.imgArr[i].src = '';
          this.imgArr1[i].src = '';
    } 
    this.deleteArr[i].css('visibility', 'hidden');
  }
  $('#topMinDiv20').css('opacity', '0');
  $('#topMinDiv21').css('opacity', '0');
  $('#topMinDiv22').css('opacity', '0');
  this.imgArr2[0].src = '';
  this.imgArr2[2].src = '';
  this.foodCycle();
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
