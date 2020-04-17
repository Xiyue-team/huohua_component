import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Detector } from '../../../../../src/util/Detector';
import { ViewController } from '../../../../../src/core/ViewController';
import { DtzfxdpdCanvas } from './dtzfxdpdCanvas';
import { ViewModel } from '../viewModel';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    compass: DtzfxdpdCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.compass = new DtzfxdpdCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
      (this.viewModel as ViewModel).reset();
    }
}
