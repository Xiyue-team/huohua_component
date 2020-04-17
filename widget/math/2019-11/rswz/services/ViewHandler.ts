import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {RswzCanvas} from './RswzCanvas';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

export class ViewHandler extends CommonViewHandler implements ViewHandler {
    dmCanvas: RswzCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new RswzCanvas();
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        this.dmCanvas.resize();
        (this.viewModel as any).resize();
        super.resize();
    }

    //重置页面
    reset() {
        (this.viewModel as any).resetEvent();
        super.reset();
    }

}
