import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {CrystalModel} from './CrystalModel';

export class CrystalViewHandler extends CommonViewHandler implements ViewHandler {


    gltf: CrystalModel;

    constructor(vm: Vue) {
        super(vm);

    }


    // beforeRenderElement(): void {
    //     //throw new Error('Method not implemented.');
    // }


    domReady(): void {
        super.domReady();
        const width = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        console.log('domReady 宽高 ' + width);
        this.gltf = new CrystalModel(document.getElementById('3dModel'), null, width, height);
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
        model.style.left = (width2 - width1) / 2 + 'px';
    }

    step1(val: number) {
        this.gltf.step1(val);
    }


    handleEve1() {

        (window as any).viewHandler.viewModel.$data.isStep1 = true;
        (window as any).viewHandler.viewModel.$data.isStep3 = false;
        this.gltf.step1(1);
    }


    reset(): void {
        // this.gltf.resetCamera();
    }
}
