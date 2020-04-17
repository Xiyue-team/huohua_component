import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {LsCanvas} from './LsCanvas';

export class LsViewHandler extends KonvaViewHandler implements ViewHandler {

    dmCanvas: LsCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new LsCanvas();
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        this.dmCanvas.reset();
    }

}
