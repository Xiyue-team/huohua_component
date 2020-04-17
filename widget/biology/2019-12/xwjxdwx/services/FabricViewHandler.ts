import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {MyCanvas} from './MyCanvas';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';

export class FabricViewHandler extends CommonViewHandler implements ViewHandler {
    myCanvas: MyCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.myCanvas = new MyCanvas();
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        this.myCanvas.resize();
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        (this.viewModel as any).resetEvent();
    }

}
