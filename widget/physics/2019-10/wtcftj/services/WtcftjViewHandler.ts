
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Wtcftj2dModel} from './Wtcftj2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class WtcftjViewHandler extends CommonViewHandler implements ViewHandler {


    Wtcftj: Wtcftj2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.Wtcftj = new Wtcftj2dModel('2dContainer', 'canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
        this.viewModel.$data.index = 0;
        this.viewModel.$data.switchDisabled = true;
        this.viewModel.$data.showForces = false;
        this.Wtcftj.reset();
    }

    show(index: number) {
        this.Wtcftj.show(index);
    }

    changeShowForces(showForces: Boolean) {
        this.Wtcftj.changeShowForces(showForces);
    }
}
