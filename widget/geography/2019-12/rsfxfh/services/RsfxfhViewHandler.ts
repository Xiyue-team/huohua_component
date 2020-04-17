
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Rsfxfh2dModel} from './Rsfxfh2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class RsfxfhViewHandler extends CommonViewHandler implements ViewHandler {


    rsfxfh: Rsfxfh2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.rsfxfh = new Rsfxfh2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    /** 
     * 重置 大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
        this.rsfxfh.resize();
    }
    
    /**
     * 重置状态
     */
    reset():  void {
        this.rsfxfh.reset();
    }
    
    /**
     * 练一练按钮事件
     */
    practiceEvent(): void {
        this.rsfxfh.practice();
    } 
}
