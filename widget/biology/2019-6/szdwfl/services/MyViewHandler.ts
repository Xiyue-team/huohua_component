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
  private obj1: any;

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
    for (let i = 0; i < 4; i++) {
      const a = new HammerDragEvent(this.viewModel, 'image_left' + i, (x: any, y: any) => {
        this.changeLocal(x, y, 'image_left' + i);
      });
      dragEvtArray.push(a);
    }
    const dragEvtArray2 = [];
    for (let i = 0; i < 4; i++) {
      const b = new HammerDragEvent(this.viewModel, 'image_right' + i, (x: any, y: any) => {
        this.changeLocal(x, y, 'image_right' + i);
      });
      dragEvtArray2.push(b);
    }
    ViewController.getInstance().hideLoading(1000);
  }

  changeLocal(x: any, y: any, letter: any) {
    const one_l = document.getElementById('one').getBoundingClientRect().left;
    const one_r = document.getElementById('one').getBoundingClientRect().right;
    const one_t = document.getElementById('one').getBoundingClientRect().top;
    const one_b = document.getElementById('one').getBoundingClientRect().bottom;
    const one = document.getElementById('one');
    const two_l = document.getElementById('two').getBoundingClientRect().left;
    const two_r = document.getElementById('two').getBoundingClientRect().right;
    const two_t = document.getElementById('two').getBoundingClientRect().top;
    const two_b = document.getElementById('two').getBoundingClientRect().bottom;
    const two = document.getElementById('two');
    const three_l = document.getElementById('three').getBoundingClientRect().left;
    const three_r = document.getElementById('three').getBoundingClientRect().right;
    const three_t = document.getElementById('three').getBoundingClientRect().top;
    const three_b = document.getElementById('three').getBoundingClientRect().bottom;
    const three = document.getElementById('three');
    const four_l = document.getElementById('four').getBoundingClientRect().left;
    const four_r = document.getElementById('four').getBoundingClientRect().right;
    const four_t = document.getElementById('four').getBoundingClientRect().top;
    const four_b = document.getElementById('four').getBoundingClientRect().bottom;
    const four = document.getElementById('four');
    const userAgent = navigator.userAgent;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isIE = userAgent.indexOf('.NET') > -1;
    const op = (window as any).viewHandler.viewModel.$data.zoom1;

    if (isEdge || isIE) {
      this.obj = $('.img').height() * op;
    } else {
      this.obj = $('.img').height();
    }
    if (x > one_l - this.obj * 0.8 && x < one_r - this.obj * 0.4 && y > one_t - this.obj * 0.8 && y < one_b - this.obj * 0.4) {
      one.style.background = ' rgba(255,255,255,0.24)';
    } else {
      one.style.background = 'rgba(255,255,255,0.10)';
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4) {
      two.style.background = ' rgba(255,255,255,0.24)';
    } else {
      two.style.background = 'rgba(255,255,255,0.10)';
    }
    if (x > three_l - this.obj * 0.8 && x < three_r - this.obj * 0.4 && y > three_t - this.obj * 0.6 && y < three_b - this.obj * 0.4) {
      three.style.background = ' rgba(255,255,255,0.24)';
    } else {
      three.style.background = 'rgba(255,255,255,0.10)';
    }
    if (x > four_l - this.obj * 0.6 && x < four_r - this.obj * 0.4 && y > four_t - this.obj * 0.6 && y < four_b - this.obj * 0.4) {
      four.style.background = ' rgba(255,255,255,0.24)';
    } else {
      four.style.background = 'rgba(255,255,255,0.10)';
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
