import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { IhndddxViewHandler } from './services/IhndddxViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const Swiper = require('./sub_static/swiper')
import 'swiper/dist/css/swiper.min.css';
import { Watch } from 'vue-property-decorator';
import * as bgi from './sub_static/UI/bgi.png';
@Component

export class MainVueComponent extends Vue {
  // 国际化
  title = window.env.browserInfo.lang.title;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  // data
  bgi = bgi;
  first = "";
  second = "";
  third = "";
  fourth = "";
  fifth = "";
  sh = false;
  active1 = false;
  active2 = false;
  active3 = false;
  active4 = false;
  active5 = false;
  active6 = false;
  active7 = false;
  active8 = false;
  private imgs: any = {};
  mySwiper: any;
  showStartImg = true;
  preload() {
    this.imgs = [
      require('./sub_static/UI/lingyang.png'),
      require('./sub_static/UI/gezi.png'),
      require('./sub_static/UI/daishu.png'),
      require('./sub_static/UI/ying.png'),
      require('./sub_static/UI/dalingyang.png'),
      require('./sub_static/UI/mayi.png'),
      require('./sub_static/UI/xiang.png'),
      require('./sub_static/UI/mifeng.png'),
      require('./sub_static/UI/xiaoxiong.png'),
      require('./sub_static/UI/songshu.png'),
      require('./sub_static/UI/xiong.png'),
      require('./sub_static/UI/baozi.png'),
      require('./sub_static/UI/tanglang.png'),
      require('./sub_static/UI/zhizhu.png'),
      require('./sub_static/UI/liebao.png'),
      require('./sub_static/UI/butongniao.png'),
      require('./sub_static/UI/daxiang.png'),
      require('./sub_static/UI/haiyang.png'),
      require('./sub_static/UI/lang.png'),
      require('./sub_static/UI/shu.png'),
      require('./sub_static/UI/haikui.png'),
      require('./sub_static/UI/yachong.png'),
      require('./sub_static/UI/xiniuniao.png'),
      require('./sub_static/UI/eyu.png'),
      require('./sub_static/UI/qingjiexia.png'),
      require('./sub_static/UI/shuangpan.png'),
      require('./sub_static/UI/jiangshi.png'),
      require('./sub_static/UI/jishenghua.png'),
      require('./sub_static/UI/tusizi.png'),
      require('./sub_static/UI/huangfeng.png')
    ];
    for (const img of this.imgs) {
      const image = new Image();
      image.src = img;
    }
  }

  @Watch('imgs')
  count(va: any) {
    if (va === 30) {
      console.log(va);
    }
  }

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new IhndddxViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
    ViewController.getInstance().domReady();
    this.preload();
    const he = window.innerHeight;
    if (he < 801) {
      document.getElementById('anniu').style.zoom = '0.8';
      document.getElementById('swiper-container').style.zoom = '0.6';
    }
    if (he < 511) {
      document.getElementById('anniu').style.zoom = '0.5';
      document.getElementById('swiper-container').style.zoom = '0.4';
    }
    if (he < 453) {
      document.getElementById('anniu').style.zoom = '0.5';
      document.getElementById('swiper-container').style.zoom = '0.4';
    }
    if (he < 361) {
      document.getElementById('anniu').style.zoom = '0.5';
      document.getElementById('swiper-container').style.zoom = '0.3';
    }
    if (he === 800) {
      document.getElementById('swiper-container').style.zoom = '0.8';
      document.getElementById('swiper-container').style.transform = 'translateX(-50px)'
    }
    if (he === 510) {
      document.getElementById('anniu').style.zoom = '0.6';
      document.getElementById('swiper-container').style.zoom = '0.5';
      document.getElementById('swiper-container').style.transform = 'translateX(-50px)';
    }
    if (he === 677) {
      document.getElementById('anniu').style.zoom = '0.8';
      document.getElementById('swiper-container').style.zoom = '0.7';
      document.getElementById('swiper-container').style.transform = 'translateX(-50px)';
    }
    if (he === 534) {
      document.getElementById('anniu').style.zoom = '0.6';
      document.getElementById('swiper-container').style.zoom = '0.5';
      document.getElementById('swiper-container').style.transform = 'translateX(-50px)';
    }
    if (he === 727) {
      document.getElementById('anniu').style.zoom = '0.8';
      document.getElementById('swiper-container').style.zoom = '0.75';
      document.getElementById('swiper-container').style.transform = 'translateX(-50px)';
    }
  





    //轮播图
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 横向切换选项
      loop: false, // 循环模式选项
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  open(op: any) {
    this.sh = true;
    this.showStartImg = false;
    if (op === 1) {

      this.mySwiper.slideTo(0, 50);
      if (this.active1 === true) {
        //this.active2 = false;
        return
      } else {
        this.active1 = true
        this.active2 = false
      }
      this.znhz();
    } else if (op === 2) {
      this.mySwiper.slideTo(0, 50);
      if (this.active2 === true) {
        //this.active1 = false;
        return
      } else {
        this.active1 = false
        this.active2 = true
      }
      this.bs();
    }
  }

  //点击小按钮事件
  changeEvent(val: any) {
    this.sh = true;
    if (val === 1) {
      this.znhz();
      this.mySwiper.slideTo(0, 50);
    } else if (val === 2) {
      this.zndz();
      this.mySwiper.slideTo(0, 50);
    } else if (val === 3) {
      this.bs();
      this.mySwiper.slideTo(0, 50);
    } else if (val === 4) {
      this.jz();
      this.mySwiper.slideTo(0, 50);
    } else if (val === 5) {
      this.gs();
      this.mySwiper.slideTo(0, 50);
    } else if (val === 6) {
      this.js();
      this.mySwiper.slideTo(0, 50);
    }
  }

  zndz() {
    this.allstyle();
    this.active4 = true;
    this.first = this.imgs[0];
    this.second = this.imgs[1];
    this.third = this.imgs[2];
    this.fourth = this.imgs[3];
    this.fifth = this.imgs[4];
  }

  znhz() {
    this.allstyle();
    this.active3 = true;
    this.first = this.imgs[5];
    this.second = this.imgs[6];
    this.third = this.imgs[7];
    this.fourth = this.imgs[8];
    this.fifth = this.imgs[9];
  }

  bs() {
    this.allstyle();
    this.active5 = true;
    this.first = this.imgs[10];
    this.second = this.imgs[11];
    this.third = this.imgs[12];
    this.fourth = this.imgs[13];
    this.fifth = this.imgs[14];
  }

  jz() {
    this.allstyle();
    this.active6 = true;
    this.first = this.imgs[15];
    this.second = this.imgs[16];
    this.third = this.imgs[17];
    this.fourth = this.imgs[18];
    this.fifth = this.imgs[19];
  }

  gs() {
    this.allstyle();
    this.active7 = true;
    this.first = this.imgs[20];
    this.second = this.imgs[21];
    this.third = this.imgs[22];
    this.fourth = this.imgs[23];
    this.fifth = this.imgs[24];
  }

  js() {
    this.allstyle();
    this.active8 = true;
    this.first = this.imgs[25];
    this.second = this.imgs[26];
    this.third = this.imgs[27];
    this.fourth = this.imgs[28];
    this.fifth = this.imgs[29];
  }

  allstyle() {
    this.active3 = false;
    this.active4 = false;
    this.active5 = false;
    this.active6 = false;
    this.active7 = false;
    this.active8 = false;
  }

  // 重置
  reset() {
    this.sh = false;
    this.active1 = false;
    this.active2 = false;
    this.allstyle();
    this.showStartImg = true;
  }
}

