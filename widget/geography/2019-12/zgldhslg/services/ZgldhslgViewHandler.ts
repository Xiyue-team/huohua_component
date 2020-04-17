import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zgldhslg2dModel} from './Zgldhslg2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class ZgldhslgViewHandler extends CommonViewHandler implements ViewHandler {


    zgldhslg: Zgldhslg2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.zgldhslg = new Zgldhslg2dModel('canvas', 'can');
        ViewController.getInstance().hideLoading();
    }

    /** 
     * 重置 大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
        this.zgldhslg.resize();
    }
        /**
     * 重置状态
     */
    reset():  void {
        this.zgldhslg.resize();
    }
    test() {
        console.log(222);
    }
}
