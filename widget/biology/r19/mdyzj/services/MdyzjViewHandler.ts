import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { Detector } from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {MdyzjModel} from './MdyzjModel';

export class MdyzjViewHandler extends CommonViewHandler implements ViewHandler {
  threeModel: MdyzjModel;
  constructor(vm: Vue) {
    super(vm);
  }

  domReady():  void {
    super.domReady();
    const fov = 30;
    const near = 1;
    const far = 3000;
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.threeModel = new MdyzjModel(document.getElementById('3dContainer'), fov, width, height, near, far);
    ViewController.getInstance().hideLoading();
  }
// 正常反应
  closer() {
    this.threeModel.close();
    this.threeModel.animation();
  }
  //竞争性抑制剂
  appeared() {
    this.threeModel.close();
    this.threeModel.animation1();
  }
  //非竞争性抑制剂
  apr() {
    this.threeModel.close();
    this.threeModel.animations();
  }
  /**
   * 重置窗口大小
   */
  resize():  void {
    super.resize();
    Detector.forceMobildLandscape();
  }
  /**
   * 重置
   */
  reset():  void {
    this.threeModel.ret();
    (this.viewModel as any).isActive = false;
    (this.viewModel as any).isActive1 = false;
    (this.viewModel as any).isActive2 = false;
    (this.viewModel as any).isContent = false;
    (this.viewModel as any).isA = true;
    (this.viewModel as any).isA1 = true;
  }
}
