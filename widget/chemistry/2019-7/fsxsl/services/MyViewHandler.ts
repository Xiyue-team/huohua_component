import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import $ from 'jquery-ts';
const hint = require('../sub_static/UI/a1.png');
const err = require('../sub_static/UI/a2.png');
export class MyViewHandler extends CommonViewHandler implements ViewHandler {

  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
  }
  // 图片点击
  getChange1(offset: any) {
    switch (offset) {
      case 1:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(0);
        break;
      case 2:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 3:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 4:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 5:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 6:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
      
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 7:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 8:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 9:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 10:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 11:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
        break;
      case 12:
        if ((this.viewModel as any).icon === 0) {
          (this.viewModel as any).icon = 1;
        }
        (this.viewModel as any).mySwiper.slideTo(offset - 1);
  
        break;
    }

  }

  // 判断
  getclick1(offset: any) {
 
    switch (offset) {
      case 1:
        (this.viewModel as any).icon2 = 1;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
      case 2:
        (this.viewModel as any).icon2 = 2;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
      case 3:
        (this.viewModel as any).icon2 = 3;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
      case 4:
        (this.viewModel as any).icon3 = 4;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
      case 5:
        (this.viewModel as any).icon3 = 5;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
      case 6:
        (this.viewModel as any).icon3 = 6;
        (this.viewModel as any).icon4 = 0;
        $('#text').removeClass('block');
        $('#text').addClass('none');
        break;
    }
  }
  // 判断
  confirm1() {
    const num = (this.viewModel as any).icon2;
    const num2 = (this.viewModel as any).icon3;
    (this.viewModel as any).icon4 = 1;
    const one = document.getElementById('swiper-slide');
    const two = document.getElementById('index2');
    const three = document.getElementById('index3');
    const four = document.getElementById('index4');
    const five = document.getElementById('index5');
    const six = document.getElementById('index6');
    const seven = document.getElementById('index7');
    const eight = document.getElementById('index8');
    const nine = document.getElementById('index9');
    const ten = document.getElementById('index10');
    const eleven = document.getElementById('index11');
    const twelve = document.getElementById('index12');

    if (one.classList.contains('swiper-slide-active')) {
      if (num === 1) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 5) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (two.classList.contains('swiper-slide-active')) {
      if (num === 1) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 4) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (three.classList.contains('swiper-slide-active')) {
      if (num === 2) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 4) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (four.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 4) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (five.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 4) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (six.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 5) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (seven.classList.contains('swiper-slide-active')) {
      if (num === 2) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 6) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (eight.classList.contains('swiper-slide-active')) {
      if (num === 1) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 6) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (nine.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 6) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (ten.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 6) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (eleven.classList.contains('swiper-slide-active')) {
      if (num === 2) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 5) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    } else if (twelve.classList.contains('swiper-slide-active')) {
      if (num === 3) {
        $(`#hin${num}`).attr('src', hint);
      } else {
        $(`#hin${num}`).attr('src', err);
      }
      if (num2 === 5) {
        $(`#hin${num2}`).attr('src', hint);
      } else {
        $(`#hin${num2}`).attr('src', err);
      }
    }
  }
  //重置
  reset(): void {
    (this.viewModel as any).reset();
  }
}
