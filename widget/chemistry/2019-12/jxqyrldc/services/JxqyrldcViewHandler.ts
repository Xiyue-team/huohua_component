import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';

export class JxqyrldcViewHandler extends CommonViewHandler implements JxqyrldcViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
    }

    domReady(): void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.resize();
    }

    resize(): void {
    }

    reset(): void {
        (this.viewModel as any).resetEvent();
    }
}
