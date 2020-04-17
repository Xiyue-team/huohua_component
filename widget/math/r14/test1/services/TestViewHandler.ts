import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class TestViewHandler extends CommonViewHandler implements ViewHandler {



    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }


    resize(): void {  //resize

    }

    reset(): void {  //重置页面


    }


}
