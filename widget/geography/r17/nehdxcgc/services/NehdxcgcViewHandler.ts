import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class NehdxcgcViewHandler extends CommonViewHandler implements ViewHandler {

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
          this.viewModel.$data.imgCtrl = false;
          this.viewModel.$data.ctrl = true;
          this.viewModel.$data.disabled = false;
          (window as any)['animation1'].setSpeed(1);
          (window as any)['animation1'].goToAndPlay(0, true);

  }

}
