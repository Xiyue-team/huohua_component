
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Csd2dModel} from './Csd2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class CsdViewHandler extends CommonViewHandler implements ViewHandler {


    csd: Csd2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.csd = new Csd2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.csd.resize();
    }

    reset():  void {
        this.csd.reset();
    }
    movePole(type: number): void {
        this.csd.movePole(type);
    }
}
