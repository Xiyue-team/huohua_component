import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Sqx3DModel} from './Sqx3DModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';


export class SqxViewHandler extends CommonViewHandler implements ViewHandler {

  gltf: Sqx3DModel;

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement():  void {
    //throw new Error('Method not implemented.');
  }

  domReady():  void {
    super.domReady();
    const fov = 30;
    const near = 1;
    const far = 3000;
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    // ViewController.getInstance().hideLoading(1000);

    this.gltf = new Sqx3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);
    ViewController.getInstance().hideLoading();
  }

  play() {
      this.gltf.play();
  }

  /**
   * 重置窗口大小
   */
  resize():  void {
    Detector.forceMobildLandscape();
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.gltf.resize(width, height);
  }

  /**
   * 重置
   */
  reset():  void {
    this.gltf.reset();
  }
}
