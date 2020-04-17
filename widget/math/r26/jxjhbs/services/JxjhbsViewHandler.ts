import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Jxjhbs3DModel } from './Jxjhbs3DModel';
import { Detector } from '../../../../../src/util/Detector';
import { ViewController } from '../../../../../src/core/ViewController';

export class JxjhbsViewHandler extends CommonViewHandler implements ViewHandler {

  jxjhbs: Jxjhbs3DModel;

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement(): void {

  }

  domReady(): void {
    super.domReady();
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.jxjhbs = new Jxjhbs3DModel(document.getElementById('3dContainer'), null, width, height);

    ViewController.getInstance().hideLoading(1000);
  }

  moveDiv() {
    const width1 = document.getElementById('pinmu').clientWidth;
    const width2 = document.getElementById('box').clientWidth;
    const model = document.getElementById('3dContainer');
    model.style.left = (width2 - width1) / 2 + 'px';
  }

  resize(): void {
    Detector.forceMobildLandscape();
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.jxjhbs.resize(width, height);
  }
}
