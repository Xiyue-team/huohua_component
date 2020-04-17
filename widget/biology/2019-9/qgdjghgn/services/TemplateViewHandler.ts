import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import TreachaCanvas from './TreachaCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    treacha: TreachaCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.treacha = new TreachaCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.treacha.resize();
    }

    reset():  void {
        this.treacha.reset();
        (this.viewModel as any).resetEvent();
    }
}
