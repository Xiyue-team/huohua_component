import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import * as alligator from './sub_static/animal/alligator.png';
import * as crestedibis from './sub_static/animal/crestedIbis.png';
import * as deer from './sub_static/animal/deer.png';
import * as donkey from './sub_static/animal/donkey.png';
import * as monkey from './sub_static/animal/monkey.png';
import * as panda from './sub_static/animal/panda.png';
import * as tibetanAntelope from './sub_static/animal/tibetanAntelope.png';

import * as eucommia from './sub_static/plant/eucommia.png';
import * as ginkgo from './sub_static/plant/ginkgo.png';
import * as goldenCamellia from './sub_static/plant/goldenCamellia.png';
import * as gongtong from './sub_static/plant/gongtong.png';
import * as metasequoia from './sub_static/plant/metasequoia.png';
import * as suoluo from './sub_static/plant/suoluo.png';
import * as wangtianshu from './sub_static/plant/wangtianshu.png';

const viewOptionConfig = require('./meta.json');
const Swiper = require('swiper/dist/js/swiper.js');

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  buttonTitle = window.env.browserInfo.lang;
  isShow = true;
  animalActive = false;
  plantActive = false;
  mySwiper: any;
  show_arrow = false;

  imageArray = [monkey, crestedibis, alligator, tibetanAntelope, panda, deer, donkey];
  text = [this.buttonTitle.monkey, this.buttonTitle.crestedIbis, this.buttonTitle.alligator,
    this.buttonTitle.tibetanAntelope, this.buttonTitle.panda, this.buttonTitle.deer, this.buttonTitle.donkey];


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
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    //初始化轮播组件
    this.mySwiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });

    //鼠标移至图片上时左右箭头出现
    const imageContainer = document.getElementsByClassName('image_changes')[0];
    imageContainer.addEventListener('mouseover', () => {
      this.show_arrow = true;
    });

    imageContainer.addEventListener('mouseout', () => {
      this.show_arrow = false;
    });


  }

  resetEvent() {
    this.animalActive = false;
    this.plantActive = false;
    this.isShow = true;
    this.show_arrow = false;
    (this.mySwiper as any).slideTo(0);
  }

  animalButton() {
    this.plantActive = false;
    this.animalActive = !this.animalActive;
    this.changeImage();
    this.isShowCover();
    (this.mySwiper as any).slideTo(0);
  }

  plantButton () {
    this.animalActive = false;
    this.plantActive = !this.plantActive;
    this.changeImage();
    this.isShowCover();
    (this.mySwiper as any).slideTo(0);
  }

  isShowCover() {
    if (this.animalActive === false && this.plantActive === false) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }


  /*替换轮播图图片*/
  changeImage() {
    if (this.animalActive) {
      this.imageArray = [monkey, crestedibis, alligator, tibetanAntelope, panda, deer, donkey];
      this.text = [this.buttonTitle.monkey, this.buttonTitle.crestedIbis, this.buttonTitle.alligator,
        this.buttonTitle.tibetanAntelope, this.buttonTitle.panda, this.buttonTitle.deer, this.buttonTitle.donkey];
    } else {
      this.imageArray = [gongtong, ginkgo, metasequoia, wangtianshu, goldenCamellia, suoluo, eucommia];
      this.text = [this.buttonTitle.gongtong, this.buttonTitle.ginkgo, this.buttonTitle.metasequoia,
        this.buttonTitle.wangtianshu, this.buttonTitle.goldenCamellia, this.buttonTitle.suoluo, this.buttonTitle.eucommia];
    }
  }
}
