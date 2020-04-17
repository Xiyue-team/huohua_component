import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const Swiper = require('./sub_static/swiper');
import 'swiper/dist/css/swiper.min.css';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;
  imgTitle = window.env.browserInfo.lang.imgTitle;
  //data
  zoom1 = 1; //窗口的大小
  msg = false; //定义变量控制图片按钮的更换
  have = true; //按钮添加类名
  ishave = 4;
  textArr: any = [];
  showSwiper = false;
  showStart = true;
  length = 0;
  private imgs: any = [];
  one = ""; //定义变量保存图片
  two = ""; //定义变量保存图片
  three = ""; //定义变量保存图片
  mySwiper = "";
  one_title = "";
  two_title = "";
  three_title = "";
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    this.textArr = this.buttonTitle;

  }

  // mounted
  mounted() {
    //判断是pc端打开网页时禁止swiper的自动滑动功能
    if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS)/i))) {
      document.getElementById('swiper-button-prev').remove();
      document.getElementById('swiper-button-next').remove();
    } else {
      document.getElementById('swiper-container').classList.add('swiper-no-swiping');
    }
    //去除左侧框架自带的长条
    const test = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (test as any).style.display = 'none';
    //禁止缩放图片
    document.body.addEventListener('gesturestart', function(event) {
      event.preventDefault();
    });
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    window.onload = function() {
      document.body.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.body.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    this.getChange1();
    this.preload();
    this.one = this.imgs[1];
    this.two = this.imgs[2];
    this.three = this.imgs[3];
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    //轮播图
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 横向切换选项
      loop: false, // 循环模式选项
      spaceBetween: 20,
      initialSlide: 2,
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
    this.resetSwiper();
  }

  // 预加载
  preload() {
    this.imgs = [
      require('./sub_static/UI/1_1.png'),
      require('./sub_static/UI/1_2.png'),
      require('./sub_static/UI/1_3.png'),
      require('./sub_static/UI/2_1.png'),
      require('./sub_static/UI/2_2.png'),
      require('./sub_static/UI/2_3.png'),
      require('./sub_static/UI/3_1.png'),
      require('./sub_static/UI/3_2.png'),
      require('./sub_static/UI/3_3.png'),
      require('./sub_static/UI/4_1.png'),
      require('./sub_static/UI/4_2.png'),
      require('./sub_static/UI/4_3.png')
    ];
    for (const img of this.imgs) {
      const image = new Image();
      image.src = img;
    }
  }

  //点击按钮自身的变化
  getEvent(offset: any) {
    this.ishave = offset;
    this.showSwiper = true;
    this.showStart = false;
    this.resetSwiper();
    if (offset === 0) {
      this.one = this.imgs[0];
      this.two = this.imgs[1];
      this.three = this.imgs[2];
      this.one_title = this.imgTitle.btn1[0];
      this.two_title = this.imgTitle.btn1[1];
      this.three_title = this.imgTitle.btn1[2];
    } else if (offset === 1) {
      this.one = this.imgs[3];
      this.two = this.imgs[4];
      this.three = this.imgs[5];
      this.one_title = this.imgTitle.btn2[0];
      this.two_title = this.imgTitle.btn2[1];
      this.three_title = this.imgTitle.btn2[2];
    } else if (offset === 2) {
      this.one = this.imgs[6];
      this.two = this.imgs[7];
      this.three = this.imgs[8];
      this.one_title = this.imgTitle.btn3[0];
      this.two_title = this.imgTitle.btn3[1];
      this.three_title = this.imgTitle.btn3[2];
    } else if (offset === 3) {
      this.one = this.imgs[9];
      this.two = this.imgs[10];
      this.three = this.imgs[11];
      this.one_title = this.imgTitle.btn4[0];
      this.two_title = this.imgTitle.btn4[1];
      this.three_title = this.imgTitle.btn4[2];
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
         console.log(11111)
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
    if (H1 < 900) {
      (document.getElementById('buttonBox') as any).style.zoom = '0.8';
    }
    if (H1 < 600) {
      (document.getElementById('buttonBox') as any).style.zoom = '0.6';
    }
    if (H1 < 400) {
      (document.getElementById('title') as any).style.zoom = '0.8';
      (document.getElementById('buttonBox') as any).style.transform = 'scale(1) translate( 15%,-50%) ';
    }
    if (H1 < 350) {
      (document.getElementById('title') as any).style.zoom = '0.7';
    }
  }

  //重置swiper的初始位置
  resetSwiper() {
    (this.mySwiper as any).slideTo(0);
  }

  // 重置
  reset() {
    this.ishave = 4;
    this.showSwiper = false;
    this.showStart = true;
    this.resetSwiper();
  }
}

