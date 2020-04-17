/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {FourPrism3DModel} from './FourPrism3DModel';

export class FourPrismViewHandler extends CommonViewHandler implements ViewHandler {

    FourPrism: FourPrism3DModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.initElement();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const container = document.getElementById('3dContainer');
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.FourPrism = new FourPrism3DModel(container, fov, width, height, near, far);

        ViewController.getInstance().hideLoading(1000);
    }

    /**
     * 初始化对象
     */
    initElement() {
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
        (this.viewModel as any).resetEvent();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
