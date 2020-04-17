import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class YqjcViewHandler extends CommonViewHandler implements ViewHandler {
  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();
    this.init();
    ViewController.getInstance().hideLoading();
  }

  init() {

  }

  resize(): void {
    super.resize();
  }

  //为了手机端适配在viewHandler中重新实现reset
  reset(): void {
    //调用关键帧组件中的重置方法
      (this.viewModel.$refs.functionUse1 as any).reset();
      setTimeout(() => {this.viewModel.$data.imgCtrl = true; } , 100);
  }
}
