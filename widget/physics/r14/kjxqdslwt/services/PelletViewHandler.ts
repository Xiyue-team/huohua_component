import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Pellet3DModel} from './Pellet3DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class PelletViewHandler extends CommonViewHandler implements ViewHandler {


    gltf: Pellet3DModel;


    constructor(vm: Vue) {
        super(vm);

    }


    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        const width  = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        console.log('domReady 宽高 ' + width);
        this.gltf = new Pellet3DModel(document.getElementById('3dModel'), null, width, height);
        ViewController.getInstance().hideLoading(1000);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) * 3 / 4 + 'px' ;
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        console.log('width', width, 'height', height, '执行了');

        this.gltf.resize(width, height);
    }

    reset(): void {
        this.gltf.resetCamera();
    }
}
