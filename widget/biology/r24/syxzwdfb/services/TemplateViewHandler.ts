import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import PlantCanvas from './PlantCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


    plantCanvas: PlantCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.plantCanvas = new PlantCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.plantCanvas.reset();
    }
}
