import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class EthaneViewHandlerForMobile extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {

      this.viewModel.$data.animationButtonCtrl = [1];
      this.viewModel.$data.frame1 = false;
      this.viewModel.$data.frame2 = true;
      this.viewModel.$data.frame3 = true;
      this.viewModel.$data.frame4 = true;
      this.viewModel.$data.ctrl1 = true;
      this.viewModel.$data.ctrl2 = false;
      this.viewModel.$data.ctrl3 = false;
      this.viewModel.$data.ctrl4 = false;
      this.viewModel.$data.ctrl5 = false;
      this.viewModel.$data.ctrl6 = false;
      (this.viewModel.$refs.slowSpeed as any).reset();
      (this.viewModel.$refs.slowSpeed as any).play();
      (this.viewModel.$refs.fastSpeed as any).reset();
      (this.viewModel.$refs.largeTemp as any).reset();
      (this.viewModel.$refs.spitCircle as any).reset();
      (this.viewModel.$refs.midCircle as any).reset();
      (this.viewModel.$refs.heavyCircle as any).reset();
    }

}
