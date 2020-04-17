/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zxypwx3dModel} from './Zxypwx3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ZxypwxViewHandler extends CommonViewHandler implements ViewHandler {


    zxypwx: Zxypwx3dModel;
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
        this.zxypwx = new Zxypwx3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
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
        this.viewModel.$data.color = false;
        this.viewModel.$data.isShow = false;
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
