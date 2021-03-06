import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import $ from 'jquery-ts';
import { HammerDragEvent } from './HammerDragEvent';
import { ViewController } from '../../../../../src/core/ViewController';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
  // 屏幕缩放比例变量
  scaleY: number;
  // cache指当前滑块所处的值
  cache: number;
  // 拖动类
  dragEvtSlider: HammerDragEvent;
  //宽度
  width: number;
  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    this.scaleY = document.body.clientHeight / 953;
    this.width = (this.viewModel as any).width;
    ViewController.getInstance().hideLoading();
    this.initElement();
  }
  initElement() {
  }
  getChange1(offset: any) {
    
    if (offset === 1) {
      (this.viewModel as any).icon = 1;
    } else if (offset === 2) {
      (this.viewModel as any).icon = 2;
    } else if (offset === 3) {
      (this.viewModel as any).icon = 3;
    } else if (offset === 4) {
      (this.viewModel as any).icon = 4;
    } else if (offset === 5) {
      (this.viewModel as any).icon = 5;
    } else if (offset === 6) {
      (this.viewModel as any).icon = 6;
    }else if (offset === 7) {
      (this.viewModel as any).icon = 7;
    } else if (offset === 8) {
      (this.viewModel as any).icon = 8;
    } else if (offset === 9) {
      (this.viewModel as any).icon = 9;
    } else if (offset === 10) {
      (this.viewModel as any).icon = 10;
    }
  }
 
  //重置
  reset(): void {
    (this.viewModel as any).icon =-1;
    // (this.viewModel as any).icon1 = false;
    // (this.viewModel as any).icon2 = false;
    // (this.viewModel as any).icon3 = false;
    // (this.viewModel as any).icon4 = false;
    // (this.viewModel as any).icon5 = false;
    this.dragEvtSlider.restPosition();
  }
}
