import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import { MydwjhdlzjsModel } from './MydwjhdlzjsModel';

export class MydwjhdlzjsViewHandler extends CommonViewHandler implements ViewHandler {
  threeModel: MydwjhdlzjsModel;

  constructor(vm: Vue) {
    super(vm);
  }

  run1() {
    this.threeModel.animation();
  }

  run2() {
    this.threeModel.animation1();
  }

  domReady(): void {
    super.domReady();
    const fov = 30;
    const near = 1;
    const far = 3000;
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.threeModel = new MydwjhdlzjsModel(document.getElementById('3dContainer'), fov, width, height, near, far);
    ViewController.getInstance().hideLoading();
  }

  //重置
  reset(): void {
    this.threeModel.closer();
    (this.viewModel as any).isActive = false;
    (this.viewModel as any).isActive1 = false;
  }
}
