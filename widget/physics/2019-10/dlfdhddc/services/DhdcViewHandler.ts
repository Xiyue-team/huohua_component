
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dhdc2dModel} from './Dhdc2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DhdcViewHandler extends CommonViewHandler implements ViewHandler {


    dhdc: Dhdc2dModel;
    constructor(vm: Vue) {
        super(vm);
    }
    
    domReady():  void {
        super.domReady();
        this.dhdc = new Dhdc2dModel('2dContainer');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.dhdc.resize();
    }

    reset():  void {
        this.dhdc.reset();
    }
}
