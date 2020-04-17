import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import * as image_One from './sub_static/image1.jpg';
import * as image_Two from './sub_static/image2.jpg';
import * as image_Three from './sub_static/image3.jpg';
import * as image_four from './sub_static/image4.jpg';
import { Linear, TweenMax } from 'gsap';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  imageTitle = window.env.browserInfo.lang.swiperText;
  imageElement: any;
  textElement: any;
  show_gallery = false;
  isAnimation = false;
  zoomIndex = 0;
  imageList = [image_One, image_Two, image_Three, image_four];


  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.imageElement = document.querySelectorAll('.imageStyle');
    this.textElement = document.querySelector('.fadeInUp');
  }
  //初始化图片开始位置对象
  initImagePosition(index: number) {
    let positionObj: any;
    switch (index) {
      case 1:
        positionObj = { left: 0, width: 49.6, height: 100 };
        break;
      case 2:
        positionObj = { left: 50, width: 24.6, height: 49.8 };
        break;
      case 3:
        positionObj = { left: 0, width: 25, height: 49.8 };
        break;
      case 4:
        positionObj = { left: 0, width: 50, height: 49.6 };
        break;
    }
    return positionObj;
  }
  //图片播放动画
  playEvent(index: number) {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    this.imageElement[(index - 1)].style.zIndex = 99;
    this.zoomIn(index);
    this.removeSwiperText(1);
    this.removeSwiperText(2);
    this.removeSwiperText(3);
    this.removeSwiperText(4);
    this.addSwiperText(index);
  }

  //放大动画
  zoomIn(index: number) {
    const tween = this.initImagePosition(index);
    const zoomInAnimation = TweenMax.to(tween,  0.5, {
      left: 0,
      width: 100,
      height: 100,
      onUpdate: () => {
        switch (index) {
          case 2:
            this.imageElement[(index - 1)].style.left = tween.left + '%';
            break;
        }
        this.imageElement[(index - 1)].style.width = tween.width + '%';
        this.imageElement[(index - 1)].style.height = tween.height + '%';

      },
      onComplete: () => {
        this.isAnimation = false;
        this.show_gallery = true;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).mySwiper.activeIndex = index;
        (ViewController.getInstance().viewHandler as TemplateViewHandler).mySwiper.update();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    zoomInAnimation.play();
  }
  //缩小动画
  zoomOut(index: number) {
    this.imageElement[(index - 1)].style.zIndex = 99;
    const tween = {
      left: 0,
      width: 100,
      height: 100
    };
    const target = this.initImagePosition(index);
    const zoomOutAnimation = TweenMax.to(tween,  0.5, {
      left: target.left,
      width: target.width,
      height: target.height,
      onUpdate: () => {
        switch (index) {
          case 2:
            this.imageElement[(index - 1)].style.left = tween.left + '%';
            break;
        }
        this.imageElement[(index - 1)].style.width = tween.width + '%';
        this.imageElement[(index - 1)].style.height = tween.height + '%';

      },
      onComplete: () => {
        this.isAnimation = false;
        this.imageElement[(index - 1)].style.zIndex = 1;
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    zoomOutAnimation.play();
  }

  //轮播图点击返回事件
  swiperEvent() {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    this.show_gallery = false;
    const swiper = (ViewController.getInstance().viewHandler as TemplateViewHandler).mySwiper;
    this.resetImage();
    let swiperIndex = (swiper.activeIndex % 4);
    if (swiperIndex === 0) {
      swiperIndex = 4;
    }
    this.zoomOut(swiperIndex);
    this.removeSwiperText(swiperIndex);
  }

  resetImage() {
    this.imageElement[0].style.zIndex = 1;
    this.imageElement[1].style.zIndex = 1;
    this.imageElement[2].style.zIndex = 1;
    this.imageElement[3].style.zIndex = 1;
    this.imageElement[0].style.width = '49.6%';
    this.imageElement[0].style.height = '100%';
    this.imageElement[1].style.left = '50%';
    this.imageElement[1].style.width = '24.6%';
    this.imageElement[1].style.height = '49.8%';
    this.imageElement[2].style.width = '25%';
    this.imageElement[2].style.height = '49.8%';
    this.imageElement[3].style.width = '50%';
    this.imageElement[3].style.height = '49.6%';
  }

  setTextAnima() {
    const swiper = (ViewController.getInstance().viewHandler as TemplateViewHandler).mySwiper;
    let swiperIndex = (swiper.activeIndex % 4);
    if (swiperIndex === 0) {
      swiperIndex = 4;
    }
    this.removeSwiperText(1);
    this.removeSwiperText(2);
    this.removeSwiperText(3);
    this.removeSwiperText(4);
    this.addSwiperText(swiperIndex);
  }

  removeSwiperText(index: number) {
    let swiperTextList: any;
    const swiperClassName = '.swiperText' + index;
    swiperTextList = document.querySelectorAll(swiperClassName);
    (swiperTextList as any).forEach( (item: any) => {
      (item as any).style.display = 'none';
      (item as any).classList.remove('fadeInUp');
    });
  }

  addSwiperText(index: number) {
    let swiperTextList: any;
    const swiperClassName = '.swiperText' + index;
    swiperTextList = document.querySelectorAll(swiperClassName);
    (swiperTextList as any).forEach( (item: any) => {
      (item as any).style.display = 'block';
      (item as any).classList.add('fadeInUp');
    });
  }
}
