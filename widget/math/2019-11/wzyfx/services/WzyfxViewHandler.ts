import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {WzyfxCanvas} from './WzyfxCanvas';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

export class WzyfxViewHandler extends CommonViewHandler implements ViewHandler {
    dmCanvas: WzyfxCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new WzyfxCanvas();
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
        super.reset();
        (this.viewModel as any).resetEvent();
    }

}
