import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {XAxis} from './XAxis';


export class JdzViewHandler extends CommonViewHandler implements ViewHandler {
    dmCanvas: XAxis;

    // 构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();

        this.dmCanvas = new XAxis();
        ViewController.getInstance().hideLoading(1000);
    }

    // 改变窗口
    resize() {
        this.dmCanvas.resize();
        super.resize();
    }

    // 重置页面
    reset() {
        (this.viewModel as any).resetEvent();
        super.reset();
    }

}
