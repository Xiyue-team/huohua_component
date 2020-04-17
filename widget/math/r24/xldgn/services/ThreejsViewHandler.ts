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
      this.viewModel.$data.angleActived = false;
      this.viewModel.$data.conceptActived = false;
      this.viewModel.$data.startActived = false;
      this.viewModel.$data.lengthActived = false;
      this.viewModel.$data.directionActived = false;
      this.three3dModel.resetAnimation();
      this.three3dModel.isShowControl(false, false);
      this.three3dModel.resetDragVector();
      this.three3dModel.resetLengthButtonEvent();
      this.three3dModel.resetDirectionEvent();
      this.three3dModel.vectorBPlay();
      this.three3dModel.resetVectorBAnimation();
      this.three3dModel.resetVectorB();
      this.three3dModel.isShowTips(true);
    }

}
