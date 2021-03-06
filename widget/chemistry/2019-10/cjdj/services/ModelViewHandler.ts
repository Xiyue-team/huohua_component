import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Model} from './Model';
import { Detector } from '../../../../../src/util/Detector';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    public Model: Model;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.Model = new Model(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize(): void {
        Detector.forceMobildLandscape();
        this.Model.resize();
    }

    reset(): void {
        (this.viewModel as any).reset();
    }

}
