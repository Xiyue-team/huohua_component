import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Hdz3DModel} from './Hdz3DModel';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    hdz3dModel: Hdz3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.hdz3dModel = new Hdz3DModel(document.getElementById('3dContainer'), null, width, height);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.hdz3dModel.resize(width, height);
    }

    reset():  void {
        this.hdz3dModel.reset();
        (window as any).viewHandler.viewModel.resetButtons();
    }
}
