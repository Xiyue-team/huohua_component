import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
export class IhndddxViewHandler extends CommonViewHandler implements ViewHandler {
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }
    resize(): void {
        super.resize();
    }
    reset(): void {
        (this.viewModel as any).reset();
    }

}
