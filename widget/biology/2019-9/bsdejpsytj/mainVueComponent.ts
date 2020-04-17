import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as mirrorLeft1 from './sub_static/UI/1.png';
import * as mirrorLeft2 from './sub_static/UI/2.png';

import * as img3_1 from './sub_static/UI/3_1.png';
import * as img4_1 from './sub_static/UI/4_1.png';
import * as imgP1 from './sub_static/UI/p_1.png';
import * as imgP2 from './sub_static/UI/p_2.png';
import * as imgE1 from './sub_static/UI/e_1.png';
import * as imgE2 from './sub_static/UI/e_2.png';

import * as imgC1 from './sub_static/UI/c_1.png';
import * as imgC11 from './sub_static/UI/c_11.png';
import * as imgC2 from './sub_static/UI/c_2.png';
import * as imgC22 from './sub_static/UI/c_22.png';
import $ from 'jquery-ts';
import * as imgE22 from './sub_static/UI/e_22.png';


@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  tiShiTitle = window.env.browserInfo.lang.tiShiTitle;
  boxTitle = window.env.browserInfo.lang.boxTitle;
  textArr = window.env.browserInfo.lang.textArr;
  //data
  zoom1 = 0; //控制屏幕的大小
  allImagArr: any = []; //存放图片的数组
  name: any; //定义变量的名字
  have = true; //控制按钮的样式
  ishave = false; //控制边框显示隐藏
  tishi = true; //控制提示字的显隐
  // showKuang = false; //控制方形框的显隐
  imgArr1 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框1的图片数组
  imgArr2 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框2的图片数组
  picture3 = img3_1;
  picture4 = img4_1;
  // 控制3、4图片能否可以拖动
  showMonban = true;
  numArr: any = 0;
  leftImgId = 0;
  rightImgId = 0;
  num1 = 0; //定义左边框烧杯被拖进去的次数
  num2 = 0; //定义右边框烧杯被拖进去的次数
  showBtn1 = false;
  showBtn2 = false;
  showText1 = false;
  showText2 = false;
  msg1: any = null;
  msg2: any = null;
  msg3: any = null;
  msg4: any = null;
  leftArr: any = [];
  rightArr: any = [];
  showXian1 = false;
  showXian2 = false;
  ischecked1 = false;
  ischecked2 = false;
  ischecked3 = false;
  ischecked4 = false;
  time1:any;
  time2:any;
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    this.allImagArr.push(mirrorLeft1, mirrorLeft2);
    ViewController.getInstance(new MyViewHandler(this), viewOption);
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
  }

  // 点击查看现象按钮触发的函数
  clickBtn(offset: any) {
    if (offset === 1) {
      this.showBtn1 = false;
      this.showText1 = true;
      if ((this.leftArr[0] === '1' || this.leftArr[0] === '5') && (this.leftArr[1] === '3' || this.leftArr[1] === '7')) {
        this.msg1 = this.textArr[2];
        this.msg2 = this.textArr[3];
        (document.getElementById('leftImg') as any).src = imgE1;
        this.ischecked3 = true;
        this.showXian1 = false;
      } else {
        this.msg1 = this.textArr[0];
        this.msg2 = this.textArr[1];
        if (this.leftArr[0] === '0' || this.leftArr[0] === '4') {
          (document.getElementById('leftImg') as any).src = imgC1;
          (document.getElementById('leftImg2') as any).src = imgC11;
          this.ischecked1 = true;
        } else {
          (document.getElementById('leftImg') as any).src = imgC2;
          (document.getElementById('leftImg2') as any).src = imgC22;
          this.ischecked1 = true;
          (document.getElementsByClassName('xian1')[0] as any).style.left = '3px';
        }
        this.time1 = setTimeout(()=>{
          this.showXian1 = true;
        },2000);
      }
    } else if (offset === 2) {
      this.showBtn2 = false;
      this.showText2 = true;
      if ((this.rightArr[0] === '1' || this.rightArr[0] === '5') && (this.rightArr[1] === '3' || this.rightArr[1] === '7')) {
        this.msg3 = this.textArr[2];
        this.msg4 = this.textArr[3];
        (document.getElementById('rightImg') as any).src = imgE1;
        this.showXian2 = false;
        this.ischecked4 = true;
      } else {
        this.msg3 = this.textArr[0];
        this.msg4 = this.textArr[1];
        if (this.rightArr[0] === '0' || this.rightArr[0] === '4') {
          (document.getElementById('rightImg') as any).src = imgC1;
          (document.getElementById('rightImg2') as any).src = imgC11;
          this.ischecked2 = true;
        } else {
          (document.getElementById('rightImg') as any).src = imgC2;
          (document.getElementById('rightImg2') as any).src = imgC22;
          this.ischecked2 = true;
          (document.getElementsByClassName('xian2')[0] as any).style.left = '3px';
        }
        this.time2 = setTimeout(()=>{
          this.showXian2 = true;
        },2000);
      }
    }
  }


  //重置
  reset() {
    this.allImagArr = [];
    this.ishave = false;
    this.have = true;
    this.tishi = true;
    this.picture3 = img3_1;
    this.picture4 = img4_1;
    this.showMonban = true;
    this.numArr = 0;
    this.leftImgId = 0;
    this.rightImgId = 0;
    this.num1 = 0;
    this.num2 = 0;
    (document.getElementsByClassName('textText3')[0] as any).style.color = '#868686';
    (document.getElementsByClassName('textText4')[0] as any).style.color = '#868686';
    this.showBtn1 = false;
    this.showBtn2 = false;
    this.showText1 = false;
    this.showText2 = false;
    this.msg1 = null;
    this.msg2 = null;
    this.msg3 = null;
    this.msg4 = null;
    this.leftArr = [];
    this.rightArr = [];
    this.showXian1 = false;
    this.showXian2 = false;
    (document.getElementsByClassName('btn1')[0] as any).style.left = '50%';
    (document.getElementsByClassName('text1')[0] as any).style.left = '50%';
    (document.getElementsByClassName('btn2')[0] as any).style.left = '50%';
    (document.getElementsByClassName('text2')[0] as any).style.left = '50%';
    (document.getElementsByClassName('xian1')[0] as any).style.left = '23px';
    (document.getElementsByClassName('xian2')[0] as any).style.left = '23px';
    this.ischecked1 = false;
    this.ischecked2 = false;
    this.ischecked3 = false;
    this.ischecked4 = false;
    (document.getElementById('leftImg3') as any).src = '';
    (document.getElementById('rightImg3') as any).src = '';
    const W = window.innerWidth;
    //清除定时器
    window.clearTimeout(this.time1);
    window.clearTimeout(this.time2);
    if (W > 200) {
      for (let i = 0; i < 8; i++) {
        $(`#image${i}`).css({
          visibility: 'visible'
        });
        $(`#textText${i}`).show();
      }
    } else {
      $(`.chioceImgBox`).show();
    }
    $('.textText').css({ opacity: '1' });
    this.imgArr1 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr2 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.cleanSelectedItem();
    for (let i = 0; i < 8; i++) {
      $(`#textText${i}`).show();
    }
  }

  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 576) {
      this.zoom1 = H1 / 576;
    } else {
      this.zoom1 = W1 / 1024;
    }
    if (H1 < 400) {
      document.getElementById('title').style.zoom = '0.6';
    }
  }
}
