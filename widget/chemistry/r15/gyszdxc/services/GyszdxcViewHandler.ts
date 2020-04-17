import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class GyszdxcViewHandler extends CommonViewHandler implements ViewHandler {

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


  reset(): void {
      (this.viewModel.$refs.functionUse1 as any).reset();
  }

}
