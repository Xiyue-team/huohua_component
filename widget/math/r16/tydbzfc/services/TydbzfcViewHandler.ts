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
        this.viewModel.$data.a = 5;
        this.viewModel.$data.b = 3;
        this.viewModel.$data.showEquation = true;
        this.viewModel.$data.isactivete = true;
        this.viewModel.$data.isactive11 = false;
        this.viewModel.$data.initialState = 1;
        this.viewModel.$data.isactive = true;
        this.viewModel.$data.isactive1 = false;
        this.viewModel.$data.close = false;
        this.viewModel.$data.open = true;
        this.viewModel.$data.open1 = true;
        this.viewModel.$data.close1 = true;
        this.viewModel.$data.initEquation = true;
        this.viewModel.$data.initEquation1 = false;

        this.threeModel.resetModelPosition(); 
        
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
