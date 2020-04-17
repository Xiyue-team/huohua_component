import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Detector} from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

export class DbzdsjhbxViewHanlder extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        super.domReady();

        ViewController.getInstance().hideLoading();

    }

    resize(): void {
        Detector.forceMobildLandscape();
    }

    reset(): void {

        this.viewModel.$data.show_Radio1 = false;
        this.viewModel.$data.show_Radio2 = false;
        this.viewModel.$data.vertical1 = '0';
        this.viewModel.$data.vertical2 = '0';
        this.viewModel.$data.ctrl1 = true;
        this.viewModel.$data.ctrl2 = false;
        this.viewModel.$data.ctrl3 = false;
        this.viewModel.$data.ctrl4 = false;
        this.viewModel.$data.ctrl5 = false;
        (this.viewModel.$refs.hydrolysis1 as any).reset();
        (this.viewModel.$refs.hydrolysis2 as any).reset();
        (this.viewModel.$refs.transsexual1 as any).reset();
        (this.viewModel.$refs.transsexual2 as any).reset();
    }

}
