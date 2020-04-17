import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {TshsCanvas} from './TshsCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {

    tshsCanvas: TshsCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.tshsCanvas = new TshsCanvas();
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.viewModel.$data.num = -1;
        this.viewModel.$data.showReturn = false;
        this.tshsCanvas.reset();
        (window as any).viewHandler.viewModel.hideAllButton();
        (window as any).viewHandler.viewModel.resetDervationButton();
        (window as any).viewHandler.viewModel.resetCheckImgButton();
    }

}
