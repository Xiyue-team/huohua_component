import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { Detector } from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { SgdhhModel } from './SgdhhModel';
export class SgdhhViewHandler extends CommonViewHandler implements ViewHandler {
  sgdhhModel: SgdhhModel;
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
  this.sgdhhModel = new SgdhhModel(document.getElementById('3dContainer'), fov, width, height, near, far);
  ViewController.getInstance().hideLoading();
  this.initElement();
}

/**
 * 初始化对象
 */
initElement() {
  ViewController.getInstance().hideLoading(1000);
}
//重置
resize():  void {
  super.resize();
  Detector.forceMobildLandscape();
}
//重置
reset():  void {
  this.sgdhhModel.reset();
} 
}
