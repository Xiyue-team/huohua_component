import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Ggph3dModel} from './Ggph3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class GgphViewHandler extends CommonViewHandler implements ViewHandler {

    ggph3dModel: Ggph3dModel;
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
        this.ggph3dModel = new Ggph3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        const dom = document.getElementById('3dContainer');
        Detector.forceMobildLandscape();
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.ggph3dModel.resize(width, height);
    }

    reset():  void {
        this.ggph3dModel.reset();
        this.viewModel.$data.powerArm = false;
        this.viewModel.$data.resistanceArm = false;
    }

}
