import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {tjdgxdzy} from './tjdgxdzy';
import {Detector} from '../../../../../src/util/Detector';

export class tjdgxdzyViewHandler extends CommonViewHandler implements ViewHandler {


    public mountaion: tjdgxdzy;

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
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion = new tjdgxdzy(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }


    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion.resize(width, height);
    }

    reset(): void {  //重置页面
        setTimeout(() => {
            this.mountaion.reset();
        }, 10);
    }
    btnEvent() {
        // console.log((window as any).ViewHandler.viewModel.$data.left);
    }
}
