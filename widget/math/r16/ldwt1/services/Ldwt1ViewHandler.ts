import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Ldwt13DModel} from './Ldwt13DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class Ldwt1ViewHandler extends CommonViewHandler implements ViewHandler {

    ldwt1: Ldwt13DModel;

    constructor(vm: Vue) {
        super(vm);

    }


    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.ldwt1 = new Ldwt13DModel(document.getElementById('3dContainer'), null, width, height);

        ViewController.getInstance().hideLoading(1000);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.ldwt1.resize(width, height);
    }

    reset(): void {

    }
}
