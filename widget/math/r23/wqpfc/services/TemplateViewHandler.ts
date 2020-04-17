import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import YzddxCanvas from './YzddxCanvas';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    dmCanvas: YzddxCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new YzddxCanvas();
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
