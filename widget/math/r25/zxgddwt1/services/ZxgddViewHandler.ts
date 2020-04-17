import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { Zxgdd3DModel } from './Zxgdd3DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class ZxgddViewHandler extends CommonViewHandler implements ViewHandler {

    tylxllt: Zxgdd3DModel;

    constructor(vm: Vue) {
        super(vm);

    }

    beforeRenderElement(): void {

    }

    domReady(): void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.tylxllt = new Zxgdd3DModel(document.getElementById('3dContainer'), null, width, height);
        ViewController.getInstance().hideLoading(1000);
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.tylxllt.resize(width, height);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }
}
