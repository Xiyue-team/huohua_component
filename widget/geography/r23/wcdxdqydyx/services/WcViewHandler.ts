import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {Group} from 'konva';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {WcCanvas} from './WcCanvas';

export class WcViewHandler extends KonvaViewHandler implements ViewHandler {

    group: Group;

    dmCanvas: WcCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new WcCanvas();
        ViewController.getInstance().hideLoading(1000);
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
