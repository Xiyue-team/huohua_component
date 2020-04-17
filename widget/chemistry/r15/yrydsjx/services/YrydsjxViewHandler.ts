/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import $ from 'jquery-ts';
export class YrydsjxViewHandler extends CommonViewHandler implements ViewHandler {


    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        
    }

    domReady():  void {
        super.domReady();
        this.initElement();

        ViewController.getInstance().hideLoading();
    }

    /**
     * 初始化对象
     */
    initElement() {
    }


    /**
     * 重置窗口大小
     */
    resize():  void {
        super.resize();
    }

    /**
     * 重置
     */
    reset():  void {
        (this.viewModel as any).reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
