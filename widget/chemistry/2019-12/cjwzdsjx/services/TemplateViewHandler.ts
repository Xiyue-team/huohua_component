import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import MatterCanvas from './MatterCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    intestine: MatterCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.intestine = new MatterCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.intestine.resize();
    }

    reset():  void {
        this.intestine.reset();
        (this.viewModel as any).resetEvent();
    }
}
