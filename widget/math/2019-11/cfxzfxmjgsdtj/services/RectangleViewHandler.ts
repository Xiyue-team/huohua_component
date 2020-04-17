import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {MyCanvas} from './MyCanvas';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
export class RectangleViewHandler extends CommonViewHandler implements ViewHandler {
    dmCanvas: MyCanvas;
    formula: any;
    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.formula = document.getElementsByClassName('formula')[0];
        this.dmCanvas = new MyCanvas();
        this.resize();
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
    }


}
