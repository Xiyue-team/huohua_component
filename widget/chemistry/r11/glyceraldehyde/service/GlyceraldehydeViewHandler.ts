/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13:23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dl1th3dModel} from './Dl1th3dModel';

import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class GlyceraldehydeViewHandler extends CommonViewHandler implements ViewHandler {

    mode2th: Dl1th3dModel;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {

    }

    domReady(): void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;

        const width1 = document.getElementById('3dContainer1th').clientWidth;
        const height1 = document.getElementById('3dContainer1th').clientHeight;
        this.mode2th = new Dl1th3dModel(document.getElementById('3dContainer1th'), fov, width1, height1, near, far);

        ViewController.getInstance().hideLoading();
    }

    resize(): void {
        Detector.forceMobildLandscape();

        const width1 = document.getElementById('3dContainer1th').clientWidth;
        const height1 = document.getElementById('3dContainer1th').clientHeight;
        this.mode2th.resize(width1, height1);
    }


    runTest(): void {

    }

}