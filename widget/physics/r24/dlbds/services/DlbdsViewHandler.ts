
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dlbds2dModel} from './Dlbds2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DlbdsViewHandler extends CommonViewHandler implements ViewHandler {


    dlbds: Dlbds2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.dlbds = new Dlbds2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    /** 
     * 重置 大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }

    /**
     * 切换示数事件
     */
    randomNumberEvent() {
        this.dlbds.randomNumber();
    }

    /**
     * 切换量程事件
     */
    changeRangeEvent() {
        this.dlbds.changeRange();
    }
    /**
     * 重置状态
     */
    reset():  void {
        this.dlbds.reset();
    }
}
