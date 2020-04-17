
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Nsbdgc2dModel} from './Nsbdgc2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class NsbdgcViewHandler extends CommonViewHandler implements ViewHandler {


    nsbdgc: Nsbdgc2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.nsbdgc = new Nsbdgc2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    /** 
     * 重置 大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
        this.nsbdgc.resize();
    }
    
    /**
     * 重置状态
     */
    reset():  void {
        this.viewModel.$data.lineType = '';
        this.nsbdgc.reset();
    }

    /**
     * 线按钮事件
     */
    lineButtonEvent(type: string) {
        this.nsbdgc.showLine(type);
    }
    /**
     * 关闭图片轮播图
     */
    closeSwiperEvent() {
        this.nsbdgc.closeSwiper();
    }
    
    test() {
        console.log(222);
    }
}
