import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Sjx3DScene} from './Sjx3DScene';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class SjxViewHandler extends CommonViewHandler implements ViewHandler {


    sjx3DScene: Sjx3DScene;

    model: any;

    constructor(vm: Vue) {
        super(vm);

    }


    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        this.model = document.getElementById('3dModel');
        const width  = this.model.clientWidth;
        const height = this.model.clientHeight;
        this.sjx3DScene = new Sjx3DScene(this.model, null, width, height);
        ViewController.getInstance().hideLoading(1000);
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = this.model.clientWidth;
        const height = this.model.clientHeight;
        this.sjx3DScene.resize(width, height);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    reset(): void {}
}
