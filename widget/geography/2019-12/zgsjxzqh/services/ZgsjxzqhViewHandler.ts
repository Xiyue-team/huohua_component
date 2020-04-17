import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zgsjxzqh2dModel} from './Zgsjxzqh2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class ZgsjxzqhViewHandler extends CommonViewHandler implements ViewHandler {

    zgsjxzqh: Zgsjxzqh2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.zgsjxzqh = new Zgsjxzqh2dModel('canvas', 'can');
        ViewController.getInstance().hideLoading();
    }

    /** 
     * 重置 大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
        this.zgsjxzqh.resize();
    }

        /**
     * 重置状态
     */
    reset():  void {
        this.zgsjxzqh.resize();
    }

    /**
     * 关闭省份简介界面
     */
    closeProvinceDetail() {
        this.zgsjxzqh.closeProvinceDetail();
    }

    test() {
        console.log(222);
    }
}
