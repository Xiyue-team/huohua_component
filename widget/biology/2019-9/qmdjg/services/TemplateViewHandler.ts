import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import PenicilliumCanvas from './PenicilliumCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


  Penicillium: PenicilliumCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.Penicillium = new PenicilliumCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.Penicillium.reset();
        (this.viewModel as any).resetEvent();
    }
}
