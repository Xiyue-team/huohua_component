/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
export class ZhswyyhswViewHandler extends CommonViewHandler implements ViewHandler {
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
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
}
