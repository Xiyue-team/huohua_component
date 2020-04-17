import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { Detector } from '../../../../../src/util/Detector';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { SgdhhModel } from './SgdhhModel';

export class SgdhhViewHandler extends CommonViewHandler implements ViewHandler {
  threeModel: SgdhhModel;
constructor(vm: Vue) {
  super(vm);
}

beforeRenderElement():  void {
}

domReady():  void {
  super.domReady();
  this.initElement();
  const fov = 30;
  const near = 1;
  const far = 3000;
  const width = document.getElementById('3dContainer').clientWidth;
  const height = document.getElementById('3dContainer').clientHeight;
  this.threeModel = new SgdhhModel(document.getElementById('3dContainer'), fov, width, height, near, far);
  ViewController.getInstance().hideLoading();
}

/**
* 初始化对象
*/
async initElement() {
  
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
  const width = document.getElementById('3dContainer').clientWidth;
  const height = document.getElementById('3dContainer').clientHeight;
  this.threeModel.resize(width, height);
}

runTest():  void {
  //this.gltf.action.reset();
}

}
