/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Jpfxdxz3DScene} from './Jpfxdxz3DScene';
export class JpfxdxzViewHandler extends CommonViewHandler implements ViewHandler {

    pwxddy3DScene: Jpfxdxz3DScene;

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
        const container = document.getElementById('3dContainer');
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.pwxddy3DScene = new Jpfxdxz3DScene(container, fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
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
}
