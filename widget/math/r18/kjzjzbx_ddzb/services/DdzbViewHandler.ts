/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Ddzb3dModel} from './Ddzb3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class DdzbViewHandler extends CommonViewHandler implements ViewHandler {


    ddzb: Ddzb3dModel;
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
        this.ddzb = new Ddzb3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.ddzb.resize(width, height);
    }

    reset():  void {
        this.ddzb.resetCamera();
        this.viewModel.$data.buttonControl = false;
        this.viewModel.$data.disableControl = true;
        this.ddzb.reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
