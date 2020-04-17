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
    this.dragEvtSlider = new HammerDragEvent('slider1', this.scaleY, (cache: number) => {
      //   if ((this.viewModel as any).active1 && -cache > 100 ) {
      //   // this.mark = false;
      //   (this.viewModel as any).number = 370;
      //   // this.gifShow();
      //   (this.viewModel as any).show1 = true;
      //   (this.viewModel as any).resolveShow = true;
      // }
    });
    // this.timer = setTimeout(() => {
    //     this.gifShow();
    //     (this.viewModel as any).show2 = true;
    // }, 2230);
  }
  getChange1(offset: any) {
    if (offset === 1) {
      (this.viewModel as any).icon1 = true;
    } else if (offset === 2) {
      (this.viewModel as any).icon2 = true;
    } else if (offset === 3) {
      (this.viewModel as any).icon3 = true;
    } else if (offset === 4) {
      (this.viewModel as any).icon4 = true;
    } else if (offset === 5) {
      (this.viewModel as any).icon5 = true;
    }
  }
  //重置
  reset(): void {
    (this.viewModel as any).icon1 = false;
    (this.viewModel as any).icon2 = false;
    (this.viewModel as any).icon3 = false;
    (this.viewModel as any).icon4 = false;
    (this.viewModel as any).icon5 = false;
    this.dragEvtSlider.restPosition();
    const width1 = document.documentElement.clientWidth;
    if (width1 > 854) {
      $('#slider').css('left', 150);
      $('#slider1').css('left', 150);
      this.dragEvtSlider.cache=150;
    } else if (width1 <= 854) {
      $('#slider').css('left', 96);
      $('#slider1').css('left', 96);
      this.dragEvtSlider.cache=96;
    }
    // $('#slider').css('left', 150);
    $('#thermometerBg').css('width', 0);
    $('#thermometerBg2').css('width', 0);
    
    // this.dragEvtSlider.cache=150;
    
    // (this.viewModel as any).number = 402;
    // (this.viewModel as any).active1 = true;
  }
}
