import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { AssembleScene } from './AssembleScene';

export class AssembleViewHandler extends CommonViewHandler implements ViewHandler {

    assemble: AssembleScene;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {

    }

    domReady(): void {
        super.domReady();
        this.assemble = new AssembleScene(this.viewModel);
    }

    reset(): void {
        super.reset();
        (this.viewModel as any).resetEvent();
        this.assemble.reset();
    }
    
    resize(): void {
        super.resize();
        this.assemble.resize();
    }
}
