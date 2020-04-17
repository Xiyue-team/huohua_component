
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Ysfjd2dModel} from './Ysfjd2dModel';
import {ViewController} from '../../../../../src/core/ViewController';
import {Detector} from '../../../../../src/util/Detector';
export class YsfjdViewHandler extends CommonViewHandler implements ViewHandler {


    Ysfjd: Ysfjd2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.Ysfjd = new Ysfjd2dModel('2dContainer', 'canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.viewModel.$data.resetFlag = true;  // 开始重置
        this.viewModel.$data.disabled = false;
        this.viewModel.$data.consistence = 1;
        this.viewModel.$data.show = false;
        this.Ysfjd.reset();
        setTimeout(() => {
            this.viewModel.$data.resetFlag = false; // 结束重置
        }, 1000);
    }

    move(consistence: Number, lastConsistence: Number): Number {
        return this.Ysfjd.move(consistence, lastConsistence);
    }
    
    toggleShowforce(show: boolean): void {
        this.Ysfjd.toggleShowforce(show);
    }
}
