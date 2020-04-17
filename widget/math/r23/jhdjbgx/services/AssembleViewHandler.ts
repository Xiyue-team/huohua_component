import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { AssembleScene } from './AssembleScene';

export class AssembleViewHandler extends CommonViewHandler implements ViewHandler {

    assemble: AssembleScene;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {

    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const container = document.getElementById('3dContainer');
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.assemble = new AssembleScene(container, fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        super.reset();
        this.assemble.reset();
        (this.viewModel as any).resetEvent();
    }

}
