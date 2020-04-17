import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import { VolumeControl } from './VolumeControl';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    vloume: VolumeControl;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.vloume = new VolumeControl();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
    }
}
