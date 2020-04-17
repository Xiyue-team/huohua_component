import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Threejs3dModel} from './Threejs3dModel';
import {ViewController} from '../../../../../src/core/ViewController';

export class ThreejsViewHandler extends CommonViewHandler implements ViewHandler {
    model: Threejs3dModel;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady(): void {
        super.domReady();
        const width  = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;
        this.model = new Threejs3dModel(document.getElementById('3dModel'), null, width, height);
        ViewController.getInstance().hideLoading(1000);
    }

    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;
    }

    reset(): void {
        this.model.resetCamera();
    }
}
