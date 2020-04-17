import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { MagneticCanvas } from './MagneticCanvas';
import { Detector } from '../../../../../src/util/Detector';
export class ZjzbViewHandler extends CommonViewHandler implements ViewHandler {

    magnetic: MagneticCanvas;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
      super.domReady();
      this.magnetic = new MagneticCanvas();
      ViewController.getInstance().hideLoading();
    }

    resize(): void {
      Detector.forceMobildLandscape();
    }

    reset():  void {
      this.magnetic.reset();
      this.viewModel.$data.tips_show = true;
      this.viewModel.$data.move_tips_show = false;
      this.viewModel.$data.show_label_one = true;
      (this.viewModel.$refs.diaphragmMovement as any).reset();
    }
}
