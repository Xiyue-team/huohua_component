import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zxysqx3dModel} from './Zxysqx3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ZxysqxViewHandler extends CommonViewHandler implements ViewHandler {


    zxypwx: Zxysqx3dModel;
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
        this.zxypwx = new Zxysqx3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zxypwx.resize(width, height);
    }

    reset():  void {
        this.viewModel.$data.color1 = true;
        this.viewModel.$data.color2 = false;
        this.viewModel.$data.color3 = false;
        this.viewModel.$data.color4 = false;
        this.zxypwx.reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
