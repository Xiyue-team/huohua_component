import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import TongueCanvas from './TongueCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    tongue: TongueCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.tongue = new TongueCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.tongue.resize();
    }

    reset():  void {
        this.tongue.reset();
        (this.viewModel as any).resetEvent();
    }
}
