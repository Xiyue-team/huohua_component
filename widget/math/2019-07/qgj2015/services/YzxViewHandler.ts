import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import {Vue} from 'vue/types/vue';

export class YzxViewHandler extends CommonViewHandler implements ViewHandler {
    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    
    domReady() {
        super.domReady();
        const container = document.getElementById('3dContainer');
        ViewController.getInstance().hideLoading(1000);
    }

}

