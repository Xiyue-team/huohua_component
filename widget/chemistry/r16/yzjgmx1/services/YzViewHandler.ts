import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {YzModel} from './YzModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class YzViewHandler extends CommonViewHandler implements ViewHandler {


    gltf: YzModel;

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
        this.gltf = new YzModel(document.getElementById('3dModel'), null, width, height);
        ViewController.getInstance().hideLoading(1000);
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        this.gltf.resize(width, height);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    reset(): void {
        this.gltf.resetCamera();
    }
}
