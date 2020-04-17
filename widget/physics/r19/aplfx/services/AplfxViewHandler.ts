
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Aplfx3dModel} from './Aplfx3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import { MagneticCanvas } from './MagneticCanvas';

export class AplfxViewHandler extends CommonViewHandler implements ViewHandler {

    apllfx: Aplfx3dModel;
    magnetic: MagneticCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.apllfx = new Aplfx3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        this.magnetic = new MagneticCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.apllfx.resize(width, height);
    }

    reset():  void {

        this.apllfx.reset();
        this.magnetic.reset();
    }

}
