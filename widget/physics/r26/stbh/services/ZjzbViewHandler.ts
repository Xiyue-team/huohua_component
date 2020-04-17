import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Zjzb3DModel} from './Zjzb3DModel';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class ZjzbViewHandler extends CommonViewHandler implements ViewHandler {

    zjzb3dModel: Zjzb3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        const width  = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zjzb3dModel = new Zjzb3DModel(document.getElementById('3dContainer'), null, width, height);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.zjzb3dModel.resize(width, height);
    }

    reset():  void {
      this.zjzb3dModel.reset();
      this.viewModel.$data.showPlayButton = false;
      this.viewModel.$data.active1 = false;
      (this.viewModel as any).stopVideo();
      (document.getElementsByClassName('videoPoster')[0] as HTMLElement).style.opacity = '1';
    }
}
