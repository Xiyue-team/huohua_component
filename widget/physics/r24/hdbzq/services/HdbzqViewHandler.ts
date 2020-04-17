
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Hdbzq2dModel} from './Hdbzq2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class HdbzqViewHandler extends CommonViewHandler implements ViewHandler {


    hdbzq: Hdbzq2dModel; // 界面模型
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.hdbzq = new Hdbzq2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    /**
     * 界面大小变化
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }

    /**
     * 接线方式按钮事件
     * @param type 
     */
    buttonEvent(type?: number) {
        this.hdbzq.switchConductor(type);
    }
    /**
     * 重置界面
     */
    reset():  void { 
        this.viewModel.$data.type = 1;
        this.hdbzq.reset();
    }
}
