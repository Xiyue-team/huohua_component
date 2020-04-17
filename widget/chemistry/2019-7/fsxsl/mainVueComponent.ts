import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
const Swiper = require('./sub_static/swiper');
@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 1;
  icon: any = 0;
  icon2: any = 0;
  icon3: any = 0;
  icon4: any = 0;
  mySwiper: any;
  title = window.env.browserInfo.lang.title;
  prompt1 = window.env.browserInfo.lang.Prompt1;
  prompt2 = window.env.browserInfo.lang.Prompt2;
  disperser = window.env.browserInfo.lang.Disperser;
  dispersoid = window.env.browserInfo.lang.Dispersoid;
  solid = window.env.browserInfo.lang.Solid;
  liquid = window.env.browserInfo.lang.Liquid;
  gas = window.env.browserInfo.lang.Gas;
  text1 = window.env.browserInfo.lang.text1;
  text2 = window.env.browserInfo.lang.text2;
  text3 = window.env.browserInfo.lang.text3;
  text4 = window.env.browserInfo.lang.text4;
  text5 = window.env.browserInfo.lang.text5;
  text6 = window.env.browserInfo.lang.text6;
  text7 = window.env.browserInfo.lang.text7;
  text8 = window.env.browserInfo.lang.text8;
  text9 = window.env.browserInfo.lang.text9;
  text10 = window.env.browserInfo.lang.text10;
  text11 = window.env.browserInfo.lang.text11;
  text12 = window.env.browserInfo.lang.text12;
  bg: any = require('./sub_static/UI/bg.png');
  // text:any=["""]
  src1: any = [
    { src: require('./sub_static/UI/home1.png') },
    { src: require('./sub_static/UI/home2.png') },
    { src: require('./sub_static/UI/home3.png') },
    { src: require('./sub_static/UI/home4.png') },
    { src: require('./sub_static/UI/home5.png') },
    { src: require('./sub_static/UI/home6.png') },
    { src: require('./sub_static/UI/home7.png') },
    { src: require('./sub_static/UI/home8.png') },
    { src: require('./sub_static/UI/home9.png') },
    { src: require('./sub_static/UI/home10.png') },
    { src: require('./sub_static/UI/home11.png') },
    { src: require('./sub_static/UI/home12.png') },
  ];
  one: any = require('./sub_static/UI/1.png');
  src2: any = [
    {
      src: require('./sub_static/UI/2.png'),
      text: this.text2
    },
    { src: require('./sub_static/UI/3.png'),
    text: this.text3 },
    { src: require('./sub_static/UI/4.png'),
    text: this.text4 },
    { src: require('./sub_static/UI/5.png'),
    text: this.text5 },
    { src: require('./sub_static/UI/6.png'),
    text: this.text6 },
    { src: require('./sub_static/UI/7.png'),
    text: this.text7 },
    { src: require('./sub_static/UI/8.png'),
    text: this.text8 },
    { src: require('./sub_static/UI/9.png'),
    text: this.text9 },
    { src: require('./sub_static/UI/10.png'),
    text: this.text10 },
    { src: require('./sub_static/UI/11.png'),
    text: this.text11 },
    { src: require('./sub_static/UI/12.png'),
    text: this.text12},
  ];
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
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    //判断是pc端打开网页时禁止swiper的自动滑动功能
    if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
        // document.getElementById('swiper-button-prev').remove();
        // document.getElementById('swiper-button-next').remove();
        document.getElementById('swiper-container').classList.add('swiper-no-swiping');

    } else {
      // document.getElementById('swiper-button-prev').remove();
      // document.getElementById('swiper-button-next').remove();
      document.getElementById('swiper-container').classList.add('swiper-no-swiping');
    
    }
    //去除左侧框架自带的长条
    const test = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (test as any).style.display = 'none';
    //禁止缩放图片
    document.body.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
    // document.body.addEventListener('touchmove', function (event) {
    //   event.preventDefault();
    // });
    window.addEventListener("touchmove",function(event) {
        // if(event.scale !== 1) {
          event.preventDefault();
        // }
      }, {
        passive: false
      }
    );
    window.onload = function () {
      document.body.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.body.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    // this.getChange1();
    ViewController.getInstance().domReady();
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 横向切换选项
      loop: false, // 循环模式选项
      initialSlide: 0,
      spaceBetween: 20,
      keyboardControl: true,
      mousewheelControl: true,
      // allowTouchMove：true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
    this.resetSwiper();

  }

  // 点击切换
  getChange(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getChange1(offset);
  }
  getclick(offset: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).getclick1(offset);
  }



  swiper_button() {
    this.icon2 = 0;
    this.icon3 = 0;
    this.icon4 = 0;
  }
  confirm() {
    (ViewController.getInstance().viewHandler as MyViewHandler).confirm1();
  }
  down() {
    $('#btn').css('background', '#00aaff');
    $('#btn').css('color', '#FFFFFF');
  }
  up() {
    $('#btn').css('background', '#ebebeb');
    $('#btn').css('color', '#525252');
  }
  // 显示或者隐藏左右的箭头
  // getChange1() {
  //   if ((navigator.userAgent.match(
  //     /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
  //   } else {
  //     const left = document.getElementsByClassName('btn_left')[0];
  //     const right = document.getElementsByClassName('btn_right')[0];
  //     (left as any).style.display = 'block';
  //     (right as any).style.display = 'block';
  //   }
  // }

  // // 电脑端是左右按钮，移动端是滑动
  // getChange2() {
  //   if ((navigator.userAgent.match(
  //     /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
  //   } else {
  //     const left = document.getElementsByClassName('btn_left')[0];
  //     const right = document.getElementsByClassName('btn_right')[0];
  //     (left as any).style.display = 'none';
  //     (right as any).style.display = 'none';
  //   }
  // }
//   $('#btn2').click(function(){
// mySwiper.update()
// alert('更新成功');
// })
  //适配函数
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1200 / 675) {
      this.zoom1 = H1 / 675;
    } else {
      this.zoom1 = W1 / 1200;
    }
    // if (W1 > 1280) {
    //   this.zoom1 = 1;
    // } else if (W1 > 1200) {
    //   this.zoom1 = H1 / (W1 * 1);
    //   // (document.getElementById('swiper-button-prev') as any).style.left = '1%';

    // } else if (W1 > 1026) {
    //   this.zoom1 = H1 / (W1 * 1.3);
    //   // (document.getElementById('swiper-button-next') as any).style.right = '1%';
    // } else if (W1 > 817) {
    //   this.zoom1 = H1 / (W1 * 1.5);
    //   // (document.getElementById('swiper-button-prev') as any).style.left = '1%';
    // } else if (W1 > 729) {
    //   this.zoom1 = H1 / (W1 * 1.6);
    //   // (document.getElementById('swiper-button-next') as any).style.right = '0.5%';
    // } else if (W1 < 668) {
    //   this.zoom1 = H1 / (W1 * 1.7);
    //   // (document.getElementById('swiper-button-next') as any).style.right = '0.5%';
    // }
  }
  // 重置
  resetSwiper() {
    (this.mySwiper as any).slideTo(0);
  }
  // 重置
  reset() {
    this.icon = 0;
    this.icon2 = 0;
    this.icon3 = 0;
    this.icon4 = 0;
    this.resetSwiper();
  }
}

