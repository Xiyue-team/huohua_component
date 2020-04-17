import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import PhysicsCanvas from './PhysicsCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


    duanluService: PhysicsCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();

        this.duanluService = new PhysicsCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        console.log('reset')
        this.duanluService.reset();
    }
}
