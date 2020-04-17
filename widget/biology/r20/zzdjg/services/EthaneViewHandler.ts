import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {ZzdjgCanvas} from './ZzdjgCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {

    zzjgCanvas: ZzdjgCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.zzjgCanvas = new ZzdjgCanvas();
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.viewModel.$data.seedCoatColor = false;
        this.viewModel.$data.endospermColor = false;
        this.viewModel.$data.cotyledonColor = false;
        this.viewModel.$data.germColor = false;
        this.viewModel.$data.hypocotylColor = false;
        this.viewModel.$data.radellaColor = false;
        this.zzjgCanvas.reset();
    }

}
