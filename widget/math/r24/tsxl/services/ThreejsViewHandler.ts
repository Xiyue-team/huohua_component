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
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        const dom = document.getElementById('3dContainer');
        Detector.forceMobildLandscape();
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.three3dModel.resize(width, height);
    }

    reset():  void {
      this.viewModel.$data.oppositeActived = false;
      this.viewModel.$data.zeroActived = false;
      this.viewModel.$data.unitActived = false;
      this.viewModel.$data.equalActived = false;
      this.viewModel.$data.parallelActived = false;
      this.three3dModel.hideVector();
      this.three3dModel.showVector(0);
      this.three3dModel.vectorReset();
    }

    runTest():  void {

    }

}
