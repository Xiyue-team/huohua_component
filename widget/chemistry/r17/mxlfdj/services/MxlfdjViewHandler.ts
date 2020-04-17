/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Mxlfdj3DModel} from './Mxlfdj3DModel';
export class MxlfdjViewHandler extends CommonViewHandler implements ViewHandler {

    mxlfdj3DModel: Mxlfdj3DModel;

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
        this.mxlfdj3DModel = new Mxlfdj3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);

    }

    /**
     * 重置窗口大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }

    /**
     * 重置
     */
    reset():  void {
        for (let i = 0; i < 2; i++) {
            (this.viewModel as any).resetEvent();
        }
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
