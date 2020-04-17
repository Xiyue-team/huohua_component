import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import MyCanvas from './MyCanvas';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

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
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        this.myCanvas.reset();
    }

}
