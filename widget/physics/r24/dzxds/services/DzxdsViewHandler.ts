
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dzxds2dModel} from './Dzxds2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DzxdsViewHandler extends CommonViewHandler implements ViewHandler {


    dzxds: Dzxds2dModel; // 界面模型
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.dzxds = new Dzxds2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    /**
     * 响应界面大小变化
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }
    /**
     * 生成随机数
     */
    randomNumber() {
        this.dzxds.createRandom();
    }

    /**
     * 重置界面
     */
    reset():  void {
        this.dzxds.reset();
    }
}
