
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dlxcyl2dModel} from './Dlxcyl2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DlxcylViewHandler extends CommonViewHandler implements ViewHandler {


    dlxcyl: Dlxcyl2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.dlxcyl = new Dlxcyl2dModel('canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        console.log(111);
        // this.hdbzq.resize();
    }

    buttonEvent(type?: number) {
        // this.dlxcyl.switchConductor(type);
    }

    reset():  void {
        // this.viewModel.$data.isPlay = false;
        this.dlxcyl.reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

    freeElectronEvent(): void {
        this.dlxcyl.freeElectronEvent();
    }

    electrifyEvent(): void {
        this.dlxcyl.electrifyEvent();
    }
}
