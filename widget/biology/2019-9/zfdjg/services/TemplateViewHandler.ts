import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import OvaryCanvas from './OvaryCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


    ovaryCanvas: OvaryCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.ovaryCanvas = new OvaryCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.ovaryCanvas.reset();
        (this.viewModel as any).resetEvent();
    }
}
