import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {Group} from 'konva';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {DdcxCanvas} from './DdcxCanvas';




export class DdcxViewHandler extends KonvaViewHandler implements ViewHandler {

    group: Group;

    bjsCanvas: DdcxCanvas;


    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.bjsCanvas = new DdcxCanvas();

        ViewController.getInstance().hideLoading();
    }





    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        (this.viewModel as any).resetEvent();
    }

}
