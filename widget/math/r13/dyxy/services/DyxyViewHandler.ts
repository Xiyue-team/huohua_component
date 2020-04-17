/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
// import {Djdl3dModel} from './Djdl3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Dyxy3dModel} from './Dyxy3dModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';

export class DyxyViewHandler extends CommonViewHandler implements ViewHandler {


    dyxy: Dyxy3dModel;
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
        this.dyxy = new Dyxy3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.dyxy.resize(width, height);
    }

    reset():  void {
        this.viewModel.$data.slidernumber1 = 0;
        this.viewModel.$data.slidernumber2 = 0;
        this.viewModel.$data.slidernumber3 = 0;
        setTimeout(() => {
            this.dyxy.resetCamera();
            this.dyxy.reset();
        }, 10);


    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
