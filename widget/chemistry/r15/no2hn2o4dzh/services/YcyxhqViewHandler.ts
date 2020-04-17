import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class YcyxhqViewHandler extends CommonViewHandler implements ViewHandler {

  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();
    this.init();
    ViewController.getInstance().hideLoading(1000);
  }


  init() {

  }


  resize(): void {
    super.resize();
  }


  reset(): void {
    (this.viewModel as any).resetEvent();
    // (window as any).viewHandler.viewModel.$refs.functionUse1.reset();
    // setTimeout(() => {(window as any).viewHandler.viewModel.$data.imgCtrl = true; }, 100);
  }

}
