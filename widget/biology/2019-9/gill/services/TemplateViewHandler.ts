import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import GillCanvas from './GillCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


    gill: GillCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.gill = new GillCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.gill.reset();
        (this.viewModel as any).resetEvent();
    }
}
