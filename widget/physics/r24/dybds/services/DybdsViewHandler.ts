
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dybds2dModel} from './Dybds2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DybdsViewHandler extends CommonViewHandler implements ViewHandler {

    dybds: Dybds2dModel; // 界面模型
    /**
     * 构造函数
     * @param vm 
     */
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.dybds = new Dybds2dModel('canvas');
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
        this.dybds.randomNumber();
    }

    /**
     * 切换量程事件
     */
    changeRangeEvent() {
        this.dybds.changeRange();
    }
 
    /**
     * 重置状态
     */
    reset():  void {
        this.dybds.reset();
    }
}
