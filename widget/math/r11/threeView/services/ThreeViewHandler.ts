/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13:23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ThreeView3dModel} from './ThreeView3dModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ThreeViewHandler extends CommonViewHandler implements ViewHandler {


    pyramid: ThreeView3dModel;

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
        this.pyramid = new ThreeView3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        // const d3Helper = new D3Helper(this.pyramid);
        // d3Helper.axisHelper(700);
        // d3Helper.gridHelper();
        //d3Helper.lightHelper();
        //d3Helper.camerHelper();

        ViewController.getInstance().hideLoading(1000);
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.pyramid.resize(width, height);
    }

    reset(): void {
        //throw new Error('Method not implemented.');
    }

    runTest(): void {
        //this.gltf.action.reset();
    }
}
