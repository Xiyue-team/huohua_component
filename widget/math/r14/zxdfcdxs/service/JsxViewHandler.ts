import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Lzxpxdpd3dModel} from './Lzxpxdpd3dModel';
import {Detector} from '../../../../../src/util/Detector';

export class JsxViewHandler extends CommonViewHandler implements ViewHandler {


    public mountaion: Lzxpxdpd3dModel;

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
        const width = document.getElementById('box').clientWidth;
        const height = document.getElementById('box').clientHeight;
        this.mountaion = new Lzxpxdpd3dModel(document.getElementById('box'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }


    resize(): void {  //resize

        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion.resize(width, height);
    }

    reset(): void {  //重置页面

        this.mountaion.reset();

    }


}
