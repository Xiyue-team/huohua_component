import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {Group} from 'konva';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {YeZiCanvas} from './YeZiCanvas';

export class YeZiViewHandler extends KonvaViewHandler implements ViewHandler {

    group: Group;

    dmCanvas: YeZiCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new YeZiCanvas();
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
