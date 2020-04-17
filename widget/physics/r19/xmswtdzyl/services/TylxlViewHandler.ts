/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Tylxl3dModel} from './Tylxl3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class TylxlViewHandler extends CommonViewHandler implements ViewHandler {

    tylxl: Tylxl3dModel;
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
        this.tylxl = new Tylxl3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.tylxl.resize(width, height);
    }

    reset():  void {

        this.tylxl.reset();
        this.viewModel.$data.showColor1 = false;
        this.viewModel.$data.showColor2 = false;
        this.viewModel.$data.flag = true;
        this.viewModel.$data.showCtrl = false;
        this.viewModel.$data.showAntiForce = false;
    }

    runTest():  void {

    }

}
