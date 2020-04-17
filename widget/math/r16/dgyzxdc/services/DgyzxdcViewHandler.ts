import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dgyzxdc3DModel} from './Dgyzxdc3DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class DgyzxdcViewHandler extends CommonViewHandler implements ViewHandler {


    gltf: Dgyzxdc3DModel;


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
        this.gltf = new Dgyzxdc3DModel(document.getElementById('3dModel'), null, width, height);

        ViewController.getInstance().hideLoading(1000);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        this.gltf.resize(width, height);
    }

    reset(): void {
    }
}
