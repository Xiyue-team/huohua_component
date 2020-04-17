import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Mcfyhhndgb} from './Mcfyhhndgb';

export class McfyViewHandler extends CommonViewHandler implements ViewHandler {
    public Photosynthesis: Mcfyhhndgb;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.Photosynthesis = new Mcfyhhndgb();
    }

    reset(): void {
        (this.viewModel as any).reset();
    }
}
