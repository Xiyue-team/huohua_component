/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { Detector } from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Line3dModel } from './Line3dModel';
export class TydbzfcViewHandler extends CommonViewHandler implements ViewHandler {
    threeModel: Line3dModel;
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
        this.threeModel = new Line3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }
    
    /**
     * 初始化对象
     */
    async initElement() {
        
    }

    /**
     * 重置窗口大小
     */
    resize():  void {
        super.resize();
        Detector.forceMobildLandscape();
    }

    /**
     * 重置
     */
    reset():  void {
        this.viewModel.$data.active2 = false;
        this.threeModel.resetModelPosition(); 
    }

    runTest():  void {
        //this.gltf.action.reset();
    }
    hideControlElement() {
        this.viewModel.$data.showEquation = false;
    }

    showControlElement() {
        this.viewModel.$data.showEquation = true;
    }

}
