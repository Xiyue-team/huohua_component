import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Threejs3dModel} from './Threejs3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import { RightCradCanvas } from './RightCradCanvas';

export class ThreejsViewHandler extends CommonViewHandler implements ViewHandler {

    three3dModel: Threejs3dModel;
    rightCradCanvas: RightCradCanvas;
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
        this.rightCradCanvas = new RightCradCanvas(this.three3dModel);
        ViewController.getInstance().hideLoading(1000);
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.three3dModel.resize();
    }

    reset():  void {
      (this.viewModel as any).resetEvent();
      this.three3dModel.reset();
      this.rightCradCanvas.reset();
    }
}
