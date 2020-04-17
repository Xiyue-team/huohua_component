
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dnyxys2dModel} from './Dnyxys2dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class DnyxysViewHandler extends CommonViewHandler implements ViewHandler {


    dnyxys: Dnyxys2dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.dnyxys = new Dnyxys2dModel('2dContainer', 'canvas');
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    kilogramChange(kg: Number, sDis: boolean) {
        this.dnyxys.kilogramChange(kg, sDis);
    }

    heightChange(height: Number, sDis: boolean) {
        this.dnyxys.heightChange(height, sDis);
    }

    /**
     * 重置
     */
    reset():  void {
        clearTimeout(this.viewModel.$data.timer);
        this.viewModel.$data.height = 3;
        this.viewModel.$data.kilogram = 10;
        this.viewModel.$data.rDis = false;
        this.viewModel.$data.sDis = false;
        this.viewModel.$data.sel = [];
        this.viewModel.$data.show = false;
        this.viewModel.$data.records = [];
        this.viewModel.$data.temp = [];
        this.viewModel.$data.tempRecords = [];
        this.dnyxys.reset();
    }

    /**
     * 开始演示
     */
    start() {
        this.dnyxys.start();
    }

    /**
     * 重置状态
     * @param sDis
     */
    resetStatus(sDis: boolean): void {
        this.dnyxys.resetStatus(sDis);
    }
}
