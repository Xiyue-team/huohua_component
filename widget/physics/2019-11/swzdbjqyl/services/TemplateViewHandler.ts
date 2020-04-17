import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import AlarmCanvas from './AlarmCanvas';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    alarm: AlarmCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        this.alarm = new AlarmCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.alarm.resize();
    }

    reset():  void {
        this.alarm.reset();
        (this.viewModel as any).resetEvent();
    }
}
