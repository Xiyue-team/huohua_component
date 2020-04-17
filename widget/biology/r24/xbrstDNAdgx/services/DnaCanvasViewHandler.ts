import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {DnaCanvas} from './DnaCanvas';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';

export class DnaCanvasViewHandler extends CommonViewHandler implements ViewHandler {

    myCanvas: DnaCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.myCanvas = new DnaCanvas();
        ViewController.getInstance().hideLoading();
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        (this.viewModel as any).resetEvent();
    }

}
