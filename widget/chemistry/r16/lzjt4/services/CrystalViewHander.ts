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
        const W = document.getElementsByClassName('model_content')[0].clientHeight;
        const H = document.getElementsByClassName('model_content')[0].clientWidth;

        if (W > H) {
            (window as any).viewHandler.viewModel.$data.Ch = H;
            (window as any).viewHandler.viewModel.$data.Cw = (window as any).viewHandler.viewModel.$data.Ch * 1896 / 1728;
        }
        else {
            (window as any).viewHandler.viewModel.$data.Cw = W;
            (window as any).viewHandler.viewModel.$data.Ch = (window as any).viewHandler.viewModel.$data.Cw * 1728 / 1896;
        }


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
        this.gltf.step1(1);
    }

    handleEve2() {
        this.gltf.step2(2);
    }

    handleEve3() {
        this.gltf.step3(3);
    }

    handleEve4() {
        this.gltf.step4(4);
    }

    reset(): void {
        // this.gltf.resetCamera();
    }
}
