import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zxyty3dModel} from './Zxyty3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ZxytyViewHandler extends CommonViewHandler implements ViewHandler {


    zxypwx: Zxyty3dModel;
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
        this.zxypwx = new Zxyty3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zxypwx.resize(width, height);
    }

    reset():  void {
        this.zxypwx.reset();
        this.viewModel.$data.isShow = false;
        this.viewModel.$data.color = false;
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
