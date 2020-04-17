import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const Swiper = require('./sub_static/swiper');
import 'swiper/dist/css/swiper.min.css';
@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  titleArr = window.env.browserInfo.lang.titleArr;
  areaArr = window.env.browserInfo.lang.areaArr;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  //data
  zoom1 = 1;
  have = true;
  isChecked1 = false;
  isChecked2 = false;
  index = 0; //控制哪个圈的热点应该显示或者隐藏
  showList1 = false; //控制哪个圈里面的图片已经下面的文字应该显示或者隐藏
  showList2 = false;
  showList3 = false;
  showList4 = false;
  showList5 = false;
  showList6 = false;
  showList7 = false;
  showList8 = false;
  showList9 = false;
  showList10 = false;
  showList11 = false;
  showList12 = false;
  showList13 = false;
  showRightList1 = false;
  showRightList2 = false;
  showRightList3 = false;
  showRightList4 = false;
  showRightList5 = false;
  item = 0; //控制右边植物进化历程的显示隐藏
  img_title: any = null;
  msg_textarea: any = null;
  showText = false;
  showSwiper = false;
  mySwiper = '';
  one = ''; //定义变量保存图片
  two = ''; //定义变量保存图片
  three = ''; //定义变量保存图片
  private imgs: any = [];
  showyuan12 = false;
  showyuan13 = false;

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
    //判断是pc端打开网页时禁止swiper的自动滑动功能
    if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
      document.getElementById('swiper-button-prev').remove();
      document.getElementById('swiper-button-next').remove();
    } else {
      // document.getElementById('swiper-container').classList.add('swiper-no-swiping');
    }
    //去除左侧框架自带的长条
    const test = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (test as any).style.display = 'none';
    //禁止触屏放大图片
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
    this.getChange1();
    this.preload();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    //轮播图
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 横向切换选项
      loop: false, // 循环模式选项
      spaceBetween: 10,
      initialSlide: 1,
      keyboardControl: true,
      mousewheelControl: true,
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
      on: {
        slideChangeTransitionStart: () => {

        }
      }
    });
    // this.resetSwiper();

  }

  // 预加载
  preload() {
    this.imgs = [
      require('./sub_static/UI/swiper_img/s1_1.png'),
      require('./sub_static/UI/swiper_img/s1_2.png'),
      require('./sub_static/UI/swiper_img/s1_3.png'),
      require('./sub_static/UI/swiper_img/s2_1.png'),
      require('./sub_static/UI/swiper_img/s2_2.png'),
      require('./sub_static/UI/swiper_img/s2_3.png'),
      require('./sub_static/UI/swiper_img/s3_1.png'),
      require('./sub_static/UI/swiper_img/s3_2.png'),
      require('./sub_static/UI/swiper_img/s3_3.png'),
      require('./sub_static/UI/swiper_img/s4_1.png'),
      require('./sub_static/UI/swiper_img/s4_2.png'),
      require('./sub_static/UI/swiper_img/s4_3.png'),
      require('./sub_static/UI/swiper_img/s5_1.png'),
      require('./sub_static/UI/swiper_img/s5_2.png'),
      require('./sub_static/UI/swiper_img/s5_3.png'),
      require('./sub_static/UI/swiper_img/s6_1.png'),
      require('./sub_static/UI/swiper_img/s6_2.png'),
      require('./sub_static/UI/swiper_img/s6_3.png'),
      require('./sub_static/UI/swiper_img/s7_1.png'),
      require('./sub_static/UI/swiper_img/s7_2.png'),
      require('./sub_static/UI/swiper_img/s7_3.png'),
      require('./sub_static/UI/swiper_img/s8_1.png'),
      require('./sub_static/UI/swiper_img/s8_2.png'),
      require('./sub_static/UI/swiper_img/s8_3.png'),
      require('./sub_static/UI/swiper_img/s9_1.png'),
      require('./sub_static/UI/swiper_img/s9_2.png'),
      require('./sub_static/UI/swiper_img/s9_3.png'),
      require('./sub_static/UI/swiper_img/s10_1.png'),
      require('./sub_static/UI/swiper_img/s10_2.png'),
      require('./sub_static/UI/swiper_img/s10_3.png'),
      require('./sub_static/UI/swiper_img/s11_1.png'),
      require('./sub_static/UI/swiper_img/s11_2.png'),
      require('./sub_static/UI/swiper_img/s11_3.png'),
      require('./sub_static/UI/swiper_img/s12_1.png'),
      require('./sub_static/UI/swiper_img/s12_2.png'),
      require('./sub_static/UI/swiper_img/s12_3.png'),
      require('./sub_static/UI/swiper_img/s13_1.png'),
      require('./sub_static/UI/swiper_img/s13_2.png'),
      require('./sub_static/UI/swiper_img/s13_3.png'),

      require('./sub_static/UI/swiper_img/z1_1.png'),
      require('./sub_static/UI/swiper_img/z1_2.png'),
      require('./sub_static/UI/swiper_img/z1_3.png'),
      require('./sub_static/UI/swiper_img/z2_1.png'),
      require('./sub_static/UI/swiper_img/z2_2.png'),
      require('./sub_static/UI/swiper_img/z2_3.png'),
      require('./sub_static/UI/swiper_img/z3_1.png'),
      require('./sub_static/UI/swiper_img/z3_2.png'),
      require('./sub_static/UI/swiper_img/z3_3.png'),
      require('./sub_static/UI/swiper_img/z4_1.png'),
      require('./sub_static/UI/swiper_img/z4_2.png'),
      require('./sub_static/UI/swiper_img/z4_3.png'),
      require('./sub_static/UI/swiper_img/z5_1.png'),
      require('./sub_static/UI/swiper_img/z5_2.png'),
      require('./sub_static/UI/swiper_img/z5_3.png')
    ];
    for (const img of this.imgs) {
      const image = new Image();
      image.src = img;
    }
  }

  //点击按钮自身的变化,及切换图片
  clickButton(offset: any) {
    if (offset === 1) {
      if (!this.isChecked1) {
        this.isChecked1 = true;
        this.index = 1;
        document.getElementsByClassName('yuan1')[0].classList.add('active');
      }
    } else if (offset === 2) {
      if (!this.isChecked2) {
        this.isChecked2 = true;
        this.item = 1;
        document.getElementsByClassName('quan1')[0].classList.add('active');
      }
    }
  }

  // 点击左边动物热点触发的函数
  clickDot(offset: any) {
    this.showText = true;
    this.showSwiper = true;
    if (offset === 1) {
      this.showList1 = true;
      this.img_title = this.titleArr[0];
      this.msg_textarea = this.areaArr[0];
      this.one = this.imgs[0];
      this.two = this.imgs[1];
      this.three = this.imgs[2];
      this.index = 2;
      this.resetSwiper();
      document.getElementsByClassName('yuan2')[0].classList.add('active');
    } else if (offset === 2) {
      this.showList2 = true;
      this.img_title = this.titleArr[1];
      this.msg_textarea = this.areaArr[1];
      this.one = this.imgs[3];
      this.two = this.imgs[4];
      this.three = this.imgs[5];
      this.index = 3;
      this.resetSwiper();
      document.getElementsByClassName('yuan3')[0].classList.add('active');
    } else if (offset === 3) {
      this.showList3 = true;
      this.img_title = this.titleArr[2];
      this.msg_textarea = this.areaArr[2];
      this.one = this.imgs[6];
      this.two = this.imgs[7];
      this.three = this.imgs[8];
      this.index = 4;
      this.resetSwiper();
      document.getElementsByClassName('yuan4')[0].classList.add('active');
    } else if (offset === 4) {
      this.showList4 = true;
      this.img_title = this.titleArr[3];
      this.msg_textarea = this.areaArr[3];
      this.one = this.imgs[9];
      this.two = this.imgs[10];
      this.three = this.imgs[11];
      this.index = 5;
      this.resetSwiper();
      document.getElementsByClassName('yuan5')[0].classList.add('active');
    } else if (offset === 5) {
      this.showList5 = true;
      this.img_title = this.titleArr[4];
      this.msg_textarea = this.areaArr[4];
      this.one = this.imgs[15];
      this.two = this.imgs[16];
      this.three = this.imgs[17];
      this.index = 6;
      this.resetSwiper();
      document.getElementsByClassName('yuan6')[0].classList.add('active');
    } else if (offset === 6) {
      this.showList6 = true;
      this.img_title = this.titleArr[5];
      this.msg_textarea = this.areaArr[5];
      this.one = this.imgs[12];
      this.two = this.imgs[13];
      this.three = this.imgs[14];
      this.index = 7;
      this.resetSwiper();
      document.getElementsByClassName('yuan7')[0].classList.add('active');
    } else if (offset === 7) {
      this.showList7 = true;
      this.img_title = this.titleArr[6];
      this.msg_textarea = this.areaArr[6];
      this.one = this.imgs[18];
      this.two = this.imgs[19];
      this.three = this.imgs[20];
      this.index = 8;
      this.resetSwiper();
      document.getElementsByClassName('yuan8')[0].classList.add('active');
    } else if (offset === 8) {
      this.showList8 = true;
      this.img_title = this.titleArr[7];
      this.msg_textarea = this.areaArr[7];
      this.one = this.imgs[21];
      this.two = this.imgs[22];
      this.three = this.imgs[23];
      this.index = 9;
      this.resetSwiper();
      document.getElementsByClassName('yuan9')[0].classList.add('active');
    } else if (offset === 9) {
      this.showList9 = true;
      this.img_title = this.titleArr[8];
      this.msg_textarea = this.areaArr[8];
      this.one = this.imgs[24];
      this.two = this.imgs[25];
      this.three = this.imgs[26];
      this.index = 10;
      this.resetSwiper();
      document.getElementsByClassName('yuan10')[0].classList.add('active');
    } else if (offset === 10) {
      this.showList10 = true;
      this.img_title = this.titleArr[9];
      this.msg_textarea = this.areaArr[9];
      this.one = this.imgs[27];
      this.two = this.imgs[28];
      this.three = this.imgs[29];
      this.index = 11;
      this.resetSwiper();
      document.getElementsByClassName('yuan11')[0].classList.add('active');
    } else if (offset === 11) {
      this.showList11 = true;
      this.img_title = this.titleArr[10];
      this.msg_textarea = this.areaArr[10];
      this.one = this.imgs[30];
      this.two = this.imgs[31];
      this.three = this.imgs[32];
      this.index = 12;
      this.resetSwiper();
      document.getElementsByClassName('yuan12')[0].classList.add('active');
    } else if (offset === 12) {
      this.showList12 = true;
      if( this.showyuan12){
        this.showyuan12 = false;
        this.showyuan13 = false;
      } else {
        this.showyuan13 = true;
        this.showyuan12 = false;
      }
      this.img_title = this.titleArr[11];
      this.msg_textarea = this.areaArr[11];
      this.one = this.imgs[33];
      this.two = this.imgs[34];
      this.three = this.imgs[35];
      this.index = 13;
      this.resetSwiper();
      document.getElementsByClassName('yuan13')[0].classList.add('active');
    } else if (offset === 13) {
      this.showList13 = true;
      if(this.showyuan13 ){
        this.showyuan13 = false;
        this.showyuan12 = false;
      } else{
        this.showyuan13 = false;
        this.showyuan12 = true;
      }

      this.img_title = this.titleArr[12];
      this.msg_textarea = this.areaArr[12];
      this.one = this.imgs[36];
      this.two = this.imgs[37];
      this.three = this.imgs[38];
      this.index = 13;
      this.resetSwiper();
    } else if (offset === 111) {
      this.showRightList1 = true;
      this.img_title = this.titleArr[13];
      this.msg_textarea = this.areaArr[13];
      this.one = this.imgs[39];
      this.two = this.imgs[40];
      this.three = this.imgs[41];
      this.item = 2;
      this.resetSwiper();
    } else if (offset === 222) {
      this.showRightList2 = true;
      this.img_title = this.titleArr[14];
      this.msg_textarea = this.areaArr[14];
      this.one = this.imgs[42];
      this.two = this.imgs[43];
      this.three = this.imgs[44];
      this.item = 3;
      this.resetSwiper();
    } else if (offset === 333) {
      this.showRightList3 = true;
      this.img_title = this.titleArr[15];
      this.msg_textarea = this.areaArr[15];
      this.one = this.imgs[45];
      this.two = this.imgs[46];
      this.three = this.imgs[47];
      this.item = 4;
      this.resetSwiper();
    } else if (offset === 444) {
      this.showRightList4 = true;
      this.img_title = this.titleArr[16];
      this.msg_textarea = this.areaArr[16];
      this.one = this.imgs[48];
      this.two = this.imgs[49];
      this.three = this.imgs[50];
      this.item = 5;
      this.resetSwiper();
    } else if (offset === 555) {
      this.showRightList5 = true;
      this.img_title = this.titleArr[17];
      this.msg_textarea = this.areaArr[17];
      this.one = this.imgs[51];
      this.two = this.imgs[52];
      this.three = this.imgs[53];
      this.item = 0;
      this.resetSwiper();
    }

  }

  //显示或者隐藏左右的箭头
  getChange() {
    if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {

    } else {
      const left = document.getElementsByClassName('btn_left')[0];
      const right = document.getElementsByClassName('btn_right')[0];
      (left as any).style.display = 'block';
      (right as any).style.display = 'block';
    }
  }

  //电脑端是左右按钮，移动端是滑动
  getChange1() {
    if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
    } else {
      const left = document.getElementsByClassName('btn_left')[0];
      const right = document.getElementsByClassName('btn_right')[0];
      (left as any).style.display = 'none';
      (right as any).style.display = 'none';
    }
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
    if( H1 > 800 && H1 < 1080   ){
      document.getElementById('buttonBox').style.zoom  = "1.5" ;
      document.getElementById('textBox').style.zoom  = "1.5";
      document.getElementById('main').style.zoom  = "1.5" ;
    }
    if( H1 < 600 ){
      document.getElementById('buttonBox').style.transform  = "scale(0.8)  " ;
      document.getElementById('textBox').style.transform  = "scale(0.8)  " ;
      document.getElementById('main').style.transform  = "scale(0.8) " ;
    }
    if( H1 < 376){
      document.getElementById('buttonBox').style.transform  = "scale(0.7)  translateX(20%) translateY(50%) " ;
      document.getElementById('textBox').style.transform  = "scale(0.7) translateX(20%) translateY(-40%)" ;
      document.getElementById('main').style.transform  = "scale(0.7) translateX(20%) translateY(-25%)" ;
    }
    if( H1 === 1080){
      document.getElementById('buttonBox').style.zoom  = "1.9" ;
      document.getElementById('textBox').style.zoom  = "1.9";
      document.getElementById('textBox').style.transform  = "translate(0,-20px)";
      document.getElementById('main').style.zoom  = "1.9" ;
    }
    if( W1 === 1231){
      document.getElementById('textBox').style.transform  = "translate(0,-30px)";
      document.getElementById('main').style.transform  = "translate(0,-10px)";
    }
    if( W1 === 2048){
      document.getElementById('buttonBox').style.zoom  = "1.9" ;
      document.getElementById('textBox').style.zoom  = "1.9";
      document.getElementById('main').style.zoom  = "1.9" ;
    }
    if( H1 === 1041){
      document.getElementById('textBox').style.transform  = "translate(0,-30px)";
      document.getElementById('main').style.transform  = "translate(0,-10px)";
    }
    if( H1 === 1073){
      document.getElementById('textBox').style.transform  = "translate(0,-40px)";
      document.getElementById('main').style.transform  = "translate(0,-10px)";
    }
  }

  //重置swiper的初始位置
  resetSwiper() {
    (this.mySwiper as any).slideTo(0);
  }


  // 重置
  reset() {
    this.have = true;
    this.isChecked1 = false;
    this.isChecked2 = false;
    this.index = 0; //控制哪个圈的热点应该显示或者隐藏
    this.showList1 = false; //控制哪个圈里面的图片已经下面的文字应该显示或者隐藏
    this.showList2 = false;
    this.showList3 = false;
    this.showList4 = false;
    this.showList5 = false;
    this.showList6 = false;
    this.showList7 = false;
    this.showList8 = false;
    this.showList9 = false;
    this.showList10 = false;
    this.showList11 = false;
    this.showList12 = false;
    this.showList13 = false;
    this.showRightList1 = false;
    this.showRightList2 = false;
    this.showRightList3 = false;
    this.showRightList4 = false;
    this.showRightList5 = false;
    this.item = 0;
    this.img_title = null;
    this.msg_textarea = null;
    this.showText = false;

    this.resetSwiper();
    this.one = ''; //定义变量保存图片
    this.two = ''; //定义变量保存图片
    this.three = ''; //定义变量保存图片
    this.showSwiper = false;
    this.showyuan12 = false;
    this.showyuan13 = false;
  }


}

