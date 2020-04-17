import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Zxqxj3DModel} from './Zxqxj3DModel';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class ZxqxjViewHandler extends CommonViewHandler implements ViewHandler {

    zxqxj3dModel: Zxqxj3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zxqxj3dModel = new Zxqxj3DModel(document.getElementById('3dContainer'), null, width, height);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zxqxj3dModel.resize(width, height);
    }

    reset():  void {
      this.zxqxj3dModel.reset();
      this.viewModel.$data.titlAngleColor = true;
      this.viewModel.$data.slopeColor = false;
      this.viewModel.$data.relationShipColor = false;
      this.viewModel.$data.showFormula = false;
    }
}
