/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Pmgl13dModel} from './Pmgl13dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class Pmgl1ViewHandler extends CommonViewHandler implements ViewHandler {


    pmgl: Pmgl13dModel;
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
        this.pmgl = new Pmgl13dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.pmgl.resize(width, height);
    }

    reset():  void {
        this.pmgl.resetCamera();
        this.viewModel.$data.buttonControl = false;
        this.pmgl.reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
