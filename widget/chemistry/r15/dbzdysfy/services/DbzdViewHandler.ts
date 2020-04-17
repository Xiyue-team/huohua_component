import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class DbzdViewHandler extends CommonViewHandler implements ViewHandler {

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
    (this.viewModel.$refs.functionuse1 as any).reset();
    // setTimeout(() => {(window as any).viewHandler.viewModel.$data.imgCtrl = true; }, 100);
    (this.viewModel.$refs.functionuse2 as any).reset();
    this.viewModel.$data.isShow1 = false;
    this.viewModel.$data.isShow2 = false;
    this.viewModel.$data.gaoliang1 = false;
    this.viewModel.$data.gaoliang2 = false;
    setTimeout(() => { this.viewModel.$data.imgCtrl = true; }, 100);
  }

}


