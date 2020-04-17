import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Cl3DModel} from './Cl3DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ClViewHandler extends CommonViewHandler implements ViewHandler {

    cldzd: Cl3DModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.cldzd = new Cl3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.cldzd.resize(width, height);
    }

    reset():  void {

        this.cldzd.reset();
    }

    modelHideLoading() {
        ViewController.getInstance().hideLoading();
    }

}
