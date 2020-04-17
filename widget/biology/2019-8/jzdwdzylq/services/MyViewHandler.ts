/**
 *
 */
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import { HammerDragEvent } from './HammerDragEvent';
import $ from 'jquery-ts';

export class MyViewHandler extends CommonViewHandler implements ViewHandler {
  private obj: any;

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement(): void {
  }

  domReady(): void {
    super.domReady();
    this.initElement();
    ViewController.getInstance().hideLoading();
  }

  /**
   * 初始化对象
   */
  async initElement() {
    const dragEvtArray = [];
    for (let i = 0; i < 12; i++) {
      const a = new HammerDragEvent(this.viewModel, 'image' + i, (x: any, y: any) => {
        this.changeLocal(x, y, 'image' + i);
      });
      dragEvtArray.push(a);
    }
    ViewController.getInstance().hideLoading(1000);
  }

  changeLocal(x: any, y: any, letter: any) {

    const two = document.getElementById('two');
    const two_l = two.getBoundingClientRect().left;
    const two_r = two.getBoundingClientRect().right;
    const two_t = two.getBoundingClientRect().top;
    const two_b = two.getBoundingClientRect().bottom;

    const three = document.getElementById('three');
    const three_l = three.getBoundingClientRect().left;
    const three_r = three.getBoundingClientRect().right;
    const three_t = three.getBoundingClientRect().top;
    const three_b = three.getBoundingClientRect().bottom;

    const four = document.getElementById('four');
    const four_l = four.getBoundingClientRect().left;
    const four_r = four.getBoundingClientRect().right;
    const four_t = four.getBoundingClientRect().top;
    const four_b = four.getBoundingClientRect().bottom;

    const five = document.getElementById('five');
    const five_l = five.getBoundingClientRect().left;
    const five_r = five.getBoundingClientRect().right;
    const five_t = five.getBoundingClientRect().top;
    const five_b = five.getBoundingClientRect().bottom;

    const six = document.getElementById('six');
    const six_l = six.getBoundingClientRect().left;
    const six_r = six.getBoundingClientRect().right;
    const six_t = six.getBoundingClientRect().top;
    const six_b = six.getBoundingClientRect().bottom;

    const userAgent = navigator.userAgent;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isIE = userAgent.indexOf('.NET') > -1;
    const op = (window as any).viewHandler.viewModel.$data.zoom1;

    if (isEdge || isIE) {
      this.obj = $('.img').height() * op;
    } else {
      this.obj = $('.img').height();
    }

    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4) {
      two.style.background = '#E6E6E6';
    } else {
      two.style.background = '#F5F5F5';
    }
    if (x > three_l - this.obj * 0.6 && x < three_r - this.obj * 0.4 && y > three_t - this.obj * 0.6 && y < three_b - this.obj * 0.4) {
      three.style.background = '#E6E6E6';
    } else {
      three.style.background = '#F5F5F5';
    }
    if (x > four_l - this.obj * 0.6 && x < four_r - this.obj * 0.4 && y > four_t - this.obj * 0.6 && y < four_b - this.obj * 0.4) {
      four.style.background = '#E6E6E6';
    } else {
      four.style.background = '#F5F5F5';
    }
    if (x > five_l - this.obj * 0.6 && x < five_r - this.obj * 0.4 && y > five_t - this.obj * 0.6 && y < five_b - this.obj * 0.4) {
      five.style.background = '#E6E6E6';
    } else {
      five.style.background = '#F5F5F5';
    }
    if (x > six_l - this.obj * 0.6 && x < six_r - this.obj * 0.4 && y > six_t - this.obj * 0.6 && y < six_b - this.obj * 0.4) {
      six.style.background = '#E6E6E6';
    } else {
      six.style.background = '#F5F5F5';
    }
  }

  /**
   * 重置窗口大小
   */
  resize(): void {
    super.resize();
  }

  /**
   * 重置
   */
  reset(): void {
    (this.viewModel as any).reset();
  }
}
