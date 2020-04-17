
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Ltdds2dModel} from './Ltdds2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class LtddsViewHandler extends CommonViewHandler implements ViewHandler {


    Ltdds: Ltdds2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.Ltdds = new Ltdds2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.Ltdds.reset();
    }
}
