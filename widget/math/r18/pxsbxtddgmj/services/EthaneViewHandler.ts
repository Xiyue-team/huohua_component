import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {PxsbxCanvas} from './PxsbxCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {

    pxsbxCanvas: PxsbxCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.pxsbxCanvas = new PxsbxCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.pxsbxCanvas.reset();
        this.viewModel.$data.color = false;
    }

}
