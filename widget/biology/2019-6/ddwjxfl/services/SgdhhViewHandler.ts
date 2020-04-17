import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { Detector } from '../../../../../src/util/Detector';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import { SgdhhModel } from './SgdhhModel';
import { HammerDragEvent } from './HammerDragEvent';
export class SgdhhViewHandler extends CommonViewHandler implements ViewHandler {
  hammerDragEvent: HammerDragEvent;
  sgdhhModel: SgdhhModel;
  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement(): void {
  }
  mounted() {
    document.body.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    });
    window.onload = function () {
      document.body.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.body.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };

    ViewController.getInstance().domReady();
  }
  
  domReady(): void {
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
    const dragEvtArray = [];
    for (let i = 1; i < 12; i++) {
      this.hammerDragEvent = new HammerDragEvent(this.viewModel, 'index' + i);
      dragEvtArray.push(this.hammerDragEvent);
    }
    ViewController.getInstance().hideLoading(1000);
  }
  //重置
  resize(): void {
    super.resize();
    Detector.forceMobildLandscape();
  }
  //重置
  reset(): void {
    this.sgdhhModel.reset();
  }
}
