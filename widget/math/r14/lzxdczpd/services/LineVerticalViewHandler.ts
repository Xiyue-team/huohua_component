/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {LineVertical3dModel} from './LineVertical3dModel';
export class LineVerticalViewHandler extends CommonViewHandler implements ViewHandler {

    lineVerticalModel: LineVertical3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.initElement();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;

        this.lineVerticalModel = new LineVertical3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
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
        this.lineVerticalModel.resetModelPosition();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
