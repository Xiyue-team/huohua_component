import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    /**
     * 响应界面大小变化
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }

    /**
     * 重置界面
     */
    reset():  void {
    }

    
}
