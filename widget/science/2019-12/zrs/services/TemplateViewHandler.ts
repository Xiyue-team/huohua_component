import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
const Swiper = require('swiper/dist/js/swiper.js');
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

  mySwiper: any;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.initSwiper();
    }

    initSwiper() {
      //初始化轮播组件
      this.mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 10,
        observer: true,
        loop: true,
        speed: 500,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChangeTransitionEnd: () => {
             if (this.mySwiper) {
               (this.viewModel as any).setTextAnima();
             }
           },

        },
      });
    }


    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {

    }
}
