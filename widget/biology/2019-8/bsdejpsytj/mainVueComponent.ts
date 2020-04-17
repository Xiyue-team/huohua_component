import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as mirrorLeft1 from './sub_static/1.png';
import * as mirrorLeft2 from './sub_static/2.png';
import * as mirrorLeft3 from './sub_static/3.png';
import * as mirrorLeft4 from './sub_static/4.png';

import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {
  title = window.env.browserInfo.lang.title;
  tiShiTitle = window.env.browserInfo.lang.tiShiTitle;
  boxTitle = window.env.browserInfo.lang.boxTitle;
  //data
  zoom1 = 0; //控制屏幕的大小
  allImagArr: any = []; //存放图片的数组
  name: any; //定义变量的名字
  have = true; //控制按钮的样式
  ishave = true; //控制显示隐藏
  tishi = true; //控制提示字的显隐
  imgArr1 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框1的图片数组
  imgArr2 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框2的图片数组
  imgArr3 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框3的图片数组
  imgArr4 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框4的图片数组
  imgArr5 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框5的图片数组
  imgArr6 = [{ src: '', text: '' }, { src: '', text: '' }]; //定义选框6的图片数组
  textArr = [
    '蜘蛛', '缢蛏', '涡虫', '水母', '扇贝', '沙蚕', '蚯蚓', '蛔虫', '蝗虫', '血吸虫', '水螅', '线虫'
  ];

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    this.allImagArr.push(mirrorLeft1, mirrorLeft2, mirrorLeft3, mirrorLeft4);
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    //隐藏重置按钮
    const Height = document.documentElement.clientHeight;
    if (Height < 400) {
      (document.getElementById('reset') as any).style.transform = 'scale(0.7) translate(50%,-50%)';
    }
  }

  cleanSelectedItem() {
  }

  reset() {
    this.tishi = true;
    const W = window.innerWidth;
    if (W > 1000) {
      for (let i = 0; i < 12; i++) {
        $(`#image${i}`).css({
          visibility: 'visible'
        });
        $(`#textText${i}`).show();
      }
    } else {
      $(`.chioceImgBox`).show();
    }
    $('.textText').css({ opacity: '1' });
    this.imgArr1 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr2 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr3 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr4 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr5 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.imgArr6 = [{ src: '', text: '' }, { src: '', text: '' }];
    this.cleanSelectedItem();
    for (let i = 0; i < 12; i++) {
      $(`#textText${i}`).show();
    }
  }

  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1200 / 675) {
      this.zoom1 = H1 / 675;
    } else {
      this.zoom1 = W1 / 1200;
    }
    if (H1 < 400) {
      document.getElementById('title').style.zoom = '0.6';
    }
  }
}
