import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';


export class DqgjViewHandler extends CommonViewHandler implements ViewHandler {
    play: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().hideLoading();


    }

    init() {

    }

    resize(): void {
        super.resize();

    }

    reset(): void {
        (this.viewModel as any).reset();
    }

}
