import {Vue} from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
export class DshsdtxViewHandler extends CommonViewHandler implements DshsdtxViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady(): void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
    }

    reset():  void {
        (this.viewModel as any).resetEvent();
    }
}
