import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import ChairModel from './ChairModel';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    chairModel: ChairModel;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.chairModel = new ChairModel();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.chairModel.resize();
    }

    reset():  void {
        this.chairModel.reset();
        (this.viewModel as any).resetEvent();
    }
}
