import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as background from './sub_static/UI/bj.png';
import * as mirrorLeft1 from './sub_static/UI/1.png';
import * as mirrorLeft2 from './sub_static/UI/2.png';
import * as mirrorLeft3 from './sub_static/UI/3.png';
import * as mirrorLeft4 from './sub_static/UI/4.png';
import * as mirrorLeft5 from './sub_static/UI/5.png';
import * as mirrorLeft6 from './sub_static/UI/6.png';
import * as mirrorLeft7 from './sub_static/UI/7.png';
import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  tiShi = window.env.browserInfo.lang.tiShi;
  imgText = window.env.browserInfo.lang.imgText;
  buttonText = window.env.browserInfo.lang.buttonText;
  imgNameArrZh = window.env.browserInfo.lang.imgNameArrZh;
  //data
  bg = background;
  zoom1 = 0;
  allImagArr: any = [];
  isShow = false;
  tishi = true;
  ishave = 1;
  showButton = true;
  imgArr1 = [{ src: "", text: "", name: "" }];
  imgArr2 = [{ src: "", text: "", name: "" }];
  imgArr3 = [{ src: "", text: "", name: "" }];
  imgArr4 = [{ src: "", text: "", name: "" }];
  imgArr5 = [{ src: "", text: "", name: "" }];
  imgArr6 = [{ src: "", text: "", name: "" }];
  imgArr7 = [{ src: "", text: "", name: "" }];
  obj = {};
  ow: any = "";
  xuankuangArr: any = [];
  newArr: any = [];
  tishi_right = false;
  tishi_error = false;
  img_delete = true;
  imgNameArr: any = ["", "", "", "", "", "", ""];

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;

    this.allImagArr.push(mirrorLeft1, mirrorLeft2, mirrorLeft3, mirrorLeft4, mirrorLeft5, mirrorLeft6, mirrorLeft7);
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    for (let i = 0; i < 7; i++) {
      this.imgNameArr[i] = this.imgNameArrZh[i];
    }
    window.addEventListener('resize', () => {
      this.resize();
    });

    this.ow = (ViewController.getInstance().viewHandler as MyViewHandler);
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
    this.ishave = 1;
    this.newArr.length = 0;
    this.img_delete = true;
    this.isShow = false;
    this.showButton = true;
    for (let i = 0; i < 7; i++) {
      $(`#image${i}`).css({
        visibility: 'visible'
      });
    }
    this.imgArr1 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr2 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr3 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr4 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr5 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr6 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.imgArr7 = [{ src: "", text: "", name: "" }, { src: "", text: "", name: "" }];
    this.cleanSelectedItem();
  }

  //删除图片
  del(num: any) {
    if (this.ishave !== 3) {
      if (num === 1) {
        (this.imgArr1 as any)[0].src = "";
        if ((this.imgArr1 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr1 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr1 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr1 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
          $(`.chioceImgBox`).show();
        }
        if ((this.imgArr1 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
          $(`.chioceImgBox`).show();
        }
        if ((this.imgArr1 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
          $(`.chioceImgBox`).show();
        }
        if ((this.imgArr1 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
          $(`.chioceImgBox`).show();
        }
      }
      if (num === 2) {
        (this.imgArr2 as any)[0].src = "";
        if ((this.imgArr2 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr2 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      if (num === 3) {
        (this.imgArr3 as any)[0].src = "";
        if ((this.imgArr3 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr3 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      if (num === 4) {
        (this.imgArr4 as any)[0].src = "";
        if ((this.imgArr4 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr4 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      if (num === 5) {
        (this.imgArr5 as any)[0].src = "";
        if ((this.imgArr5 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr5 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      if (num === 6) {
        (this.imgArr6 as any)[0].src = "";
        if ((this.imgArr6 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr6 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      if (num === 7) {
        (this.imgArr7 as any)[0].src = "";
        if ((this.imgArr7 as any)[0].text === '0') {
          $('#image0').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '1') {
          $('#image1').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '2') {
          $('#image2').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '3') {
          $('#image3').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '4') {
          $('#image4').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '5') {
          $('#image5').css('visibility', 'visible');
        }
        if ((this.imgArr7 as any)[0].text === '6') {
          $('#image6').css('visibility', 'visible');
        }
      }
      this.ow.clickDelete();
    }
  }

  //点击完成触发的函数
  complete() {
    this.ow.complete1();
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
