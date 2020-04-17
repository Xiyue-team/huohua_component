import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {

  constructor(vm: Vue) {
    super(vm);
  }
  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
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
    }

  }
  //重置
  reset(): void {
    (this.viewModel as any).icon = -1;
  }
}
