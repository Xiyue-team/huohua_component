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
  private drag: HammerDragEvent;

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
    // this.drag = new HammerDragEvent(this.viewModel, 'image1');
    // this.drag.setCanvas(this);
    // console.log(this.drag)
    const dragEvtArray = [];
    for (let i = 0; i < 8; i++) {
      const a = new HammerDragEvent(this.viewModel, 'image' + i, (x: any, y: any) => {
        this.changeLocal(x, y, 'image' + i);
      });
      dragEvtArray.push(a);
    }
    ViewController.getInstance().hideLoading(1000);
  }


  changeLocal(x: any, y: any, letter: any) {
    const one = document.getElementById('one');
    const one_l = one.getBoundingClientRect().left;
    const one_r = one.getBoundingClientRect().right;
    const one_t = one.getBoundingClientRect().top;
    const one_b = one.getBoundingClientRect().bottom;

    const two = document.getElementById('two');
    const two_l = two.getBoundingClientRect().left;
    const two_r = two.getBoundingClientRect().right;
    const two_t = two.getBoundingClientRect().top;
    const two_b = two.getBoundingClientRect().bottom;

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
      // one.style.background = '#E6E6E6';
    } else {
      // one.style.background = '#F5F5F5';
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4) {
      // two.style.background = '#E6E6E6';
    } else {
      // two.style.background = '#F5F5F5';
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
