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
  //data
  zoom1 = 1; //窗口的大小
  msg = false; //定义变量控制图片按钮的更换
  isChecked1 = true; //按钮添加类名
  isChecked2 = false;//按钮添加类名
  length = 0;
  private imgs: any = [];
  one = ""; //定义变量保存图片
  two = ""; //定义变量保存图片
  three = ""; //定义变量保存图片
  four = ""; //定义变量保存图片
  five = ""; //定义变量保存图片
  six = ""; //定义变量保存图片
  mySwiper = "";

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
    this.four = this.imgs[4];
    this.five = this.imgs[5];
    this.six = this.imgs[6];
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    //轮播图
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 横向切换选项
      loop: false, // 循环模式选项
      spaceBetween: 30,
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
          this.changeImage();
        }
      }
    });
    this.resetSwiper();
  }

  // 预加载
  preload() {
    this.imgs = [
      require('./sub_static/UI/0.png'),
      require('./sub_static/UI/1.png'),
      require('./sub_static/UI/2.png'),
      require('./sub_static/UI/3.png'),
      require('./sub_static/UI/4.png'),
      require('./sub_static/UI/5.png'),
      require('./sub_static/UI/6.png'),
      require('./sub_static/UI/7.png'),
      require('./sub_static/UI/8.png'),
      require('./sub_static/UI/9.png'),
      require('./sub_static/UI/10.png'),
      require('./sub_static/UI/11.png'),
      require('./sub_static/UI/12.png'),
      require('./sub_static/UI/1-1.png'),
      require('./sub_static/UI/2-1.png'),
      require('./sub_static/UI/3-1.png'),
      require('./sub_static/UI/4-1.png'),
      require('./sub_static/UI/5-1.png'),
      require('./sub_static/UI/6-1.png'),
      require('./sub_static/UI/7-1.png'),
      require('./sub_static/UI/8-1.png'),
      require('./sub_static/UI/9-1.png'),
      require('./sub_static/UI/10-1.png'),
      require('./sub_static/UI/11-1.png'),
      require('./sub_static/UI/12-1.png'),
      require('./sub_static/UI/p1.png'),
      require('./sub_static/UI/p2.png')
    ];
    for (const img of this.imgs) {
      const image = new Image();
      image.src = img;
    }
  }

  //点击按钮自身的变化
  getEvent(offset: any) {
    this.changeImage();
    this.resetSwiper();
    if (offset === 1) {
      this.isChecked1 = true;
      this.isChecked2 = false;
      this.one = this.imgs[1];
      this.two = this.imgs[2];
      this.three = this.imgs[3];
      this.four = this.imgs[4];
      this.five = this.imgs[5];
      this.six = this.imgs[6];
    } else if (offset === 2) {
      this.isChecked2 = true;
      this.isChecked1 = false;
      this.one = this.imgs[7];
      this.two = this.imgs[8];
      this.three = this.imgs[9];
      this.four = this.imgs[10];
      this.five = this.imgs[11];
      this.six = this.imgs[12];
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

  //点击图片按钮触发的函数
  getImages() {
    this.msg = !this.msg;
    const num = (this.mySwiper as any).activeIndex;
    if (this.msg) {
      if (this.isChecked1) {
        switch (num) {
          case 0:
            this.one = this.imgs[13];
            break;
          case 1:
            this.two = this.imgs[14];
            break;
          case 2:
            this.three = this.imgs[15];
            break;
          case 3:
            this.four = this.imgs[16];
            break;
          case 4:
            this.five = this.imgs[17];
            break;
          case 5:
            this.six = this.imgs[18];
            break;
        }
      }
      if (this.isChecked2) {
        switch (num) {
          case 0:
            this.one = this.imgs[19];
            break;
          case 1:
            this.two = this.imgs[20];
            break;
          case 2:
            this.three = this.imgs[21];
            break;
          case 3:
            this.four = this.imgs[22];
            break;
          case 4:
            this.five = this.imgs[23];
            break;
          case 5:
            this.six = this.imgs[24];
            break;
        }
      }
    } else {
      if (this.isChecked1) {
        switch (num) {
          case 0:
            this.one = this.imgs[1];
            break;
          case 1:
            this.two = this.imgs[2];
            break;
          case 2:
            this.three = this.imgs[3];
            break;
          case 3:
            this.four = this.imgs[4];
            break;
          case 4:
            this.five = this.imgs[5];
            break;
          case 5:
            this.six = this.imgs[6];
            break;
        }
      }
      if (this.isChecked2) {
        switch (num) {
          case 0:
            this.one = this.imgs[7];
            break;
          case 1:
            this.two = this.imgs[8];
            break;
          case 2:
            this.three = this.imgs[9];
            break;
          case 3:
            this.four = this.imgs[10];
            break;
          case 4:
            this.five = this.imgs[11];
            break;
          case 5:
            this.six = this.imgs[12];
            break;
        }
      }
    }
  }

  //处理按钮图片
  changeImage() {
    this.msg = false;
    const num = (this.mySwiper as any).activeIndex;
    if (this.msg) {
      if (this.isChecked1) {
        switch (num) {
          case 0:
            this.one = this.imgs[13];
            break;
          case 1:
            this.two = this.imgs[14];
            break;
          case 2:
            this.three = this.imgs[15];
            break;
          case 3:
            this.four = this.imgs[16];
            break;
          case 4:
            this.five = this.imgs[17];
            break;
          case 5:
            this.six = this.imgs[18];
            break;
        }
      }
      if (this.isChecked2) {
        switch (num) {
          case 0:
            this.one = this.imgs[19];
            break;
          case 1:
            this.two = this.imgs[20];
            break;
          case 2:
            this.three = this.imgs[21];
            break;
          case 3:
            this.four = this.imgs[22];
            break;
          case 4:
            this.five = this.imgs[23];
            break;
          case 5:
            this.six = this.imgs[24];
            break;
        }
      }
    } else {
      if (this.isChecked1) {
        switch (num) {
          case 0:
            this.one = this.imgs[1];
            break;
          case 1:
            this.two = this.imgs[2];
            break;
          case 2:
            this.three = this.imgs[3];
            break;
          case 3:
            this.four = this.imgs[4];
            break;
          case 4:
            this.five = this.imgs[5];
            break;
          case 5:
            this.six = this.imgs[6];
            break;
        }
      }
      if (this.isChecked2) {
        switch (num) {
          case 0:
            this.one = this.imgs[7];
            break;
          case 1:
            this.two = this.imgs[8];
            break;
          case 2:
            this.three = this.imgs[9];
            break;
          case 3:
            this.four = this.imgs[10];
            break;
          case 4:
            this.five = this.imgs[11];
            break;
          case 5:
            this.six = this.imgs[12];
            break;
        }
      }
    }
  }

  //适配窗口用的函数
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1200 / 675) {
      this.zoom1 = H1 / 675;
    } else {
      this.zoom1 = W1 / 1200;
    }

    if (H1 < 769) {
      (document.getElementById('btn') as any).style.transform = 'scale(0.9) translateY(-5%)';
      (document.getElementById('title') as any).style.transform = 'scale(0.9) ';
    }
    if (H1 < 400) {
      (document.getElementById('btn') as any).style.transform = 'scale(0.6) translateY(-50%)';
      (document.getElementById('title') as any).style.transform = 'scale(0.6) translateX(-30%)';
      (document.getElementById('swiper-container') as any).style.zoom = '0.8'
    }
    if ( H1 == 534) {
      (document.getElementById('btn') as any).style.transform = 'scale(0.8) translateY(-30%)';
      (document.getElementById('swiper-container') as any).style.zoom = '0.9'
    }
  }

  //重置swiper的初始位置
  resetSwiper() {
    (this.mySwiper as any).slideTo(0);
  }

  // 重置
  reset() {
    this.isChecked2 = false;
    this.isChecked1 = true;
    this.one = this.imgs[1];
    this.two = this.imgs[2];
    this.three = this.imgs[3];
    this.four = this.imgs[4];
    this.five = this.imgs[5];
    this.six = this.imgs[6];
    this.msg = false;
    this.resetSwiper();
  }
}

