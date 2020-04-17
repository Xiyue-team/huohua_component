/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13:23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {LineFace3dModel} from './LineFace3dModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';
import {Detector} from '../../../../../src/util/Detector';

export class LineFaceViewHandler extends CommonViewHandler implements ViewHandler {


    lineFace3dModel: LineFace3dModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.lineFace3dModel = new LineFace3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        // const d3Helper = new D3Helper(this.lineFace3dModel);
        // d3Helper.axisHelper(300);
        // d3Helper.gridHelper();
        //d3Helper.lightHelper();
        //d3Helper.camerHelper();
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.lineFace3dModel.resize(width, height);
    }

    reset(): void {
        //throw new Error('Method not implemented.');
        this.viewModel.$data.enableAnim = false;
        this.lineFace3dModel.reset();
    }

    runTest(): void {
        //this.gltf.action.reset();
    }
}
