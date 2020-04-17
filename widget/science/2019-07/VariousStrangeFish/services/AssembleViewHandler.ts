import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';

export class AssembleViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {

    }

    domReady(): void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    reset(): void {
        super.reset();
        (this.viewModel as any).resetEvent();
    }

}
