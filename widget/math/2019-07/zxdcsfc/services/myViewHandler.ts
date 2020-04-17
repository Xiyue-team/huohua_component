import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Line3dModel} from './Line3dModel';
import * as THREE from 'three/three-tdsloader';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
    public threeModel: Line3dModel;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.threeModel = new Line3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }
    init() {
    }
    resize(): void {
        super.resize();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.threeModel.resize(width, height);
    }
    reset(): void {
        (this.viewModel as any).reset();
    }

}
