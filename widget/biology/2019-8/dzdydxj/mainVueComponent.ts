import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as  img1 from   './sub_static/UI/1.png';
import * as  img2 from   './sub_static/UI/2.png';
import * as  img3 from   './sub_static/UI/3.png';
import * as  img4 from   './sub_static/UI/4.png';
import * as  img5 from   './sub_static/UI/5.png';
import * as  img6 from   './sub_static/UI/6.png';


@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  imgTitleArr = window.env.browserInfo.lang.imgTitleArr;
  //data
  bg: any = require('./sub_static/UI/bj.png');
  zoom1 = 1;
  showMonban = false;
  showImg = false;
  imgSrc:any = null;
  imgTitle:any = null;
  imgText:any = null;
  // isShow1 = false;
  // isShow2 = false;
  // isShow3 = false;
  // isShow4 = false;
  // isActived1 = false;
  // isActived2 = false;
  // isActived3 = false;
  //   msg2 = 0;
  //   msg3 = 0;
  // isActived4 = false;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault();
    });
    document.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

//点击按钮自身的变化,及切换图片
  clickButton(offset: any) {
    this.showMonban = true;
    this.showImg = true;
    if (offset === 1) {
        this.imgSrc = img1;
        this.imgTitle = this.imgTitleArr[0].title1;
        this.imgText = this.imgTitleArr[0].area1;
    } else if (offset === 2) {
        this.imgSrc = img2;
        this.imgTitle = this.imgTitleArr[1].title1;
        this.imgText = this.imgTitleArr[1].area1;
    } else if (offset === 3) {
       this.imgSrc = img3;
      this.imgTitle = this.imgTitleArr[2].title1;
      this.imgText = this.imgTitleArr[2].area1;
    } else if (offset === 4) {
       this.imgSrc = img4;
      this.imgTitle = this.imgTitleArr[3].title1;
      this.imgText = this.imgTitleArr[3].area1;
    } else if (offset === 5) {
       this.imgSrc = img5;
      this.imgTitle = this.imgTitleArr[4].title1;
      this.imgText = this.imgTitleArr[4].area1;
    } else if (offset === 6) {
       this.imgSrc = img6;
      this.imgTitle = this.imgTitleArr[5].title1;
      this.imgText = this.imgTitleArr[5].area1;
    }
  }


  //点击图片右上角的删除按钮
  Delete(){
    this.showImg = false;
    this.showMonban = false;
  }

  //适配窗口用的函数
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 576) {
      this.zoom1 = H1 / 576;
    } else {
      this.zoom1 = W1 / 1024;
    }
    // if( W1 === 1920){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'translate(2px,-18px)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'translate(2px,-18px)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'translate(0px,12px)';
    // }
    // if( W1 === 1024 && H1 === 698){
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'translate(-25px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'translate(-25px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'translate(-60px,0)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'translate(90px,0)';
    // }
    // if( W1 === 1024 && H1 === 768){
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'translate(-25px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'translate(-25px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'translate(-60px,0)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'translate(90px,0)';
    // }
    // if( W1 === 1226){
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'translate(-20px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'translate(-20px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'translate(-50px,0)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'translate(80px,0)';
    // }
    // if( W1 === 818){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.8) translate(-10px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.8) translate(-10px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.8) translate(-20px,0)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.8) translate(30px,0)';
    // }
    // if( W1 === 854){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.8) translate(-10px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.8) translate(-10px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.8) translate(-20px,0)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.8) translate(30px,0)';
    // }
    // if( W1 === 1280){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.8) translate(0px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.8) translate(0px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.8) translate(10px,10px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.8) translate(0px,0)';
    // }
    // if( W1 === 1280 && H1 === 800){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.8)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.8) translate(-20px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.8) translate(-10px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.8) translate(-10px,10px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.8) translate(30px,0)';
    // }
    // if( W1 === 640 ){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.6) translate(-20px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.6) translate(-10px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.6) translate(0px,0px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.6) translate(0px,0)';
    // }
    // if( W1 === 806 ){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.6) translate(-30px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.6) translate(-20px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.6) translate(-40px,0px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.6) translate(50px,0)';
    // }
    // if( W1 === 730 ){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.6) translate(-10px,-20px)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.6) translate(-10px,-10px)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.6) translate(-0px,20px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.6) translate(-10px,20px)';
    // }
    // if( W1 === 667 ){
    //   (document.getElementsByClassName('one')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('three')[0] as any).style.transform = 'scale(0.6)';
    //   (document.getElementsByClassName('two')[0] as any).style.transform = 'scale(0.6) translate(-10px,0)';
    //   (document.getElementsByClassName('four')[0] as any).style.transform = 'scale(0.6) translate(-0px,0)';
    //   (document.getElementsByClassName('five')[0] as any).style.transform = 'scale(0.6) translate(-0px,0px)';
    //   (document.getElementsByClassName('six')[0] as any).style.transform = 'scale(0.6) translate(0px,0)';
    // }

  }

  // 重置
  reset() {
    this.showMonban = false;
  }


}

