import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Threejs3dModel} from './Threejs3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ThreejsViewHandler extends CommonViewHandler implements ViewHandler {

    three3dModel: Threejs3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        const dom = document.getElementById('3dContainer');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.three3dModel = new Threejs3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
    }

    resize():  void {
        const dom = document.getElementById('3dContainer');
        Detector.forceMobildLandscape();
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.three3dModel.resize(width, height);
    }

    reset():  void {
        this.viewModel.$data.slidernumber1 = 20;
        this.three3dModel.resetCamera();
        this.viewModel.$data.actived = false;
    }

    runTest():  void {

    }

    modelHideLoading() {
        ViewController.getInstance().hideLoading();
    }
}
