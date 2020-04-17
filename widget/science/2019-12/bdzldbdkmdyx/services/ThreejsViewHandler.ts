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
        this.resize();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.three3dModel.resize();


        const buttonDom = document.getElementsByClassName('buttonContorl')[0];
        const scaleX = window.innerWidth / 1920;
        (buttonDom as any).style.transform = 'scale(' + scaleX + ')';
    }

    reset():  void {
      (this.viewModel as any).reset();
    }

    runTest():  void {

    }
}
