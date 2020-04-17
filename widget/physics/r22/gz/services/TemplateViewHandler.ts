import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Gz3DModel} from './Gz3DModel';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    gz3dModel: Gz3DModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.gz3dModel = new Gz3DModel(document.getElementById('3dContainer'), null, width, height);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.gz3dModel.resize(width, height);
    }

    reset():  void {
        this.gz3dModel.reset();
        this.viewModel.$data.flagOne = false;
        this.viewModel.$data.flagTwo = false;
        this.viewModel.$data.flagThree = false;
    }
}
