import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
const Swiper = require('./sub_static/swiper');
import 'swiper/dist/css/swiper.min.css';
@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;
  //data
  zoom1 = 1;//窗口的大小
  showTitle = true;//控制标题的显隐
  msg = ' ';//中间变量
  isChecked1 = false; //按钮添加类名
  isChecked2 = false;//按钮添加类名
  isShow_bg = true;//控制背景图显隐
  isShow_sw = false;//控制轮播显隐
  length = 0;
  private imgs: any = [];
  one = "";//定义变量保存图片
  two = "";//定义变量保存图片
  three = "";//定义变量保存图片
  four = "";//定义变量保存图片
  mySwiper = "";
  one_title = "";//定义变量保存标题
  two_title = "";//定义变量保存标题
  three_title = "";//定义变量保存标题
  four_title = "";//定义变量保存标题
  isShow1_tk = false;//控制弹框显隐
  isShow2_tk = false;//控制弹框显隐
  isShow3_tk = false;//控制弹框显隐
  isShow4_tk = false;//控制弹框显隐
  show_bz = false;//控制被子植物显隐
  show_lz = false;//控制裸子植物显隐
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
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS|Symbian|Windows Phone)/i))) {
            document.getElementById('swiper-button-prev').remove();
            document.getElementById('swiper-button-next').remove();
      } else {
            document.getElementById('swiper-container').classList.add('swiper-no-swiping');
      }
      //去除左侧框架自带的长条
      const test = document.getElementsByClassName('control-panel_div_floatRight')[0];
      (test as any).style.display = 'none';
      //禁止缩放图片
      document.body.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      });
      document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
      });
      window.onload = function () {
        document.body.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        })
        let lastTouchEnd = 0;
        document.body.addEventListener('touchend', function (event) {
          const now  = (new Date()).getTime();
          if ( now - lastTouchEnd <= 300 ) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },  false);
      };
      this.preload();
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
      ViewController.getInstance().domReady();
      this.isShow_bg = true;
      //轮播图
      this.mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 横向切换选项
        loop: false, // 循环模式选项
        initialSlide: 2,
        keyboardControl : true,
        mousewheelControl : true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
  }
  // 预加载
    preload() {
      this.imgs = [
        require('./sub_static/UI/0.jpg'),
        require('./sub_static/UI/1.jpg'),
        require('./sub_static/UI/2.jpg'),
        require('./sub_static/UI/3.jpg'),
        require('./sub_static/UI/4.jpg'),
        require('./sub_static/UI/5.jpg'),
        require('./sub_static/UI/6.jpg'),
        require('./sub_static/UI/7.jpg'),
        require('./sub_static/UI/8.jpg'),
        require('./sub_static/UI/1-1.png'),
        require('./sub_static/UI/2-1.png'),
        require('./sub_static/UI/3-1.png'),
        require('./sub_static/UI/4-1.png'),
        require('./sub_static/UI/5-1.png'),
        require('./sub_static/UI/6-1.png'),
        require('./sub_static/UI/7-1.png'),
        require('./sub_static/UI/8-1.png'),
        require('./sub_static/UI/10.png'),
        require('./sub_static/UI/11.png'),
      ];
      for (const img of this.imgs) {
        const image = new Image();
        image.src = img;
      }
    }
  //点击按钮自身的变化
    getEvent(offset: any) {
       this.showTitle = false;
      this.isShow_bg = false;
      this.isShow_sw = true;
      this.resetSwiper();
      if (offset === 1) {
        (this.mySwiper as any).activeIndex = 0;
          this.show_bz = true;
          this.show_lz = false;
          this.isChecked1 = true;
          this.isChecked2 = false;
          this.one = this.imgs[1];
          this.two = this.imgs[2];
          this.three = this.imgs[3];
          this.four = this.imgs[4];
          this.one_title = '银杏';
          this.two_title = '云杉';
          this.three_title = '雪松';
          this.four_title = '苏铁';
      } else if (offset === 2) {
        this.show_lz = true;
        this.show_bz = false;
         this.isChecked2 = true;
         this.isChecked1 = false;
        this.one = this.imgs[5];
        this.two = this.imgs[6];
        this.three = this.imgs[7];
        this.four = this.imgs[8];
        this.one_title = '水稻';
        this.two_title = '槟榔';
        this.three_title = '刺槐';
        this.four_title = '牡丹';
      }
    }
  //显示或者隐藏左右的箭头
     getChange() {
       if ((navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS|Symbian|Windows Phone)/i))) {
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
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|WebOS|Symbian|Windows Phone)/i))) {
      } else {
        const left = document.getElementsByClassName('btn_left')[0];
        const right = document.getElementsByClassName('btn_right')[0];
        (left as any).style.display = 'none';
        (right as any).style.display = 'none';
      }
    }
  //适配窗口用的函数
  resize() {
    const He = window.innerHeight;
    const W = window.innerWidth;
    if ( W > 1366) {
      document.getElementById('swiper-container').style.zoom = '1.6';
      document.getElementById('title').style.transform = 'scale(1.6) translate(15%,25%)';
      (document.getElementsByClassName('imgageBox1_bz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox4_bz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox1_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox2_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('img_title')[0]as any).style.transform = ' translateY(80%)';
      (document.getElementsByClassName('img_title')[1]as any).style.transform = ' translateY(80%)';
      (document.getElementsByClassName('img_title')[2]as any).style.transform = ' translateY(80%)';
      (document.getElementsByClassName('img_title')[3]as any).style.transform = ' translateY(80%)';
    }
    if (He < 577) {
      (document.getElementsByClassName('imgageBox1_bz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox4_bz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox1_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox2_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
    }
    if (He < 535) {
      document.getElementById('swiper-container').style.zoom = '0.7';
      document.getElementById('btn').style.transform = 'scale(0.7)';
    }
    if (He < 453) {
      document.getElementById('swiper-container').style.zoom = '0.6';
      document.getElementById('btn').style.transform = 'scale(0.6)';
    }
    if (He < 415) {
      document.getElementById('swiper-container').style.zoom = '0.6';
      document.getElementById('title').style.zoom = '0.45';
      document.getElementById('btn').style.transform = 'scale(0.6)';
    }
    if (He < 361) {
      document.getElementById('swiper-container').style.zoom = '0.5';
      document.getElementById('title').style.zoom = '0.45';
      document.getElementById('btn').style.transform = 'scale(0.5)';
    }
    if ( He === 768 ) {
      (document.getElementsByClassName('imgageBox1_bz')[0] as any).style.transform = ' translate(-1.5%,-5%)';
      (document.getElementsByClassName('imgageBox4_bz')[0] as any).style.transform = ' translate(-1%,-7%)';
      (document.getElementsByClassName('imgageBox1_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox2_lz')[0] as any).style.transform = ' translate(-1%,-3%)';
      (document.getElementsByClassName('imgageBox4_lz')[0] as any).style.transform = ' translate(-1%,-9%)';
      (document.getElementsByClassName('img_title')[0]as any).style.transform = ' translateY(-60%)';
      (document.getElementsByClassName('img_title')[1]as any).style.transform = ' translateY(-60%)';
      (document.getElementsByClassName('img_title')[2]as any).style.transform = ' translateY(-60%)';
      (document.getElementsByClassName('img_title')[3]as any).style.transform = ' translateY(-60%)';
    }
  }
  //重置swiper的初始位置
     resetSwiper( ) {
       (this.mySwiper as any) .slideTo(0);
       this.isShow1_tk = false;
       this.isShow2_tk = false;
       this.isShow3_tk = false;
       this.isShow4_tk = false;
     }
    // 重置
    reset() {
      this.isChecked2 = false;
      this.isChecked1 = false;
      this.isShow_bg = true;
      this.isShow_sw = false;
      this.showTitle = true;
      this.isShow1_tk = false;
      this.isShow2_tk = false;
      this.isShow3_tk = false;
      this.isShow4_tk = false;
      this.one = "";
      this.two = "";
      this.three = "";
      this.four = "";
      this.show_bz = false;
      this.show_lz = false;
      this.resetSwiper( );
    }
}

