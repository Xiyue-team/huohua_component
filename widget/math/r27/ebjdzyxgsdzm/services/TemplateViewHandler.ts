import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Template3DModel} from './Template3DModel';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    temp: Template3DModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
    }

    domReady(): void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.temp = new Template3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.temp.resize(width, height);

    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    reset(): void {
        // this.temp.reset();
    }
}
