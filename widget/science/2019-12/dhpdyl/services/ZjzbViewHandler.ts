import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Detector } from '../../../../../src/util/Detector';
export class ZjzbViewHandler extends CommonViewHandler implements ViewHandler {

    titleContent: any;
    playBtContent: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
      super.domReady();
      ViewController.getInstance().hideLoading();
      this.titleContent = document.getElementsByClassName('title_text')[0];
      this.playBtContent = document.getElementsByClassName('right_buttons')[0];
      this.resize();
    }

    resize(): void {
      Detector.forceMobildLandscape();
      (window as any).viewHandler.viewModel.diaphragm_movement.width = window.innerWidth;
      (window as any).viewHandler.viewModel.diaphragm_movement.height = window.innerHeight;

      const scaleX = window.innerWidth / (1920);
      const scaleY = window.innerHeight / (937);
      if ((937) * scaleX <= window.innerHeight) {

        this.titleContent.style.transform = 'scale(' + (scaleX + 0.4) + ')';
        this.playBtContent.style.transform = 'scale(' + (scaleX + 0.3) + ')';

      } else if ((1920) * scaleY <= window.innerWidth) {

        this.titleContent.style.transform = 'scale(' + (scaleY + 0.4) + ')';
        this.playBtContent.style.transform = 'scale(' + (scaleY + 0.3) + ')';
      }
    }

    reset():  void {
      (window as any).viewHandler.viewModel.$data.once_clickColor = false;
      (window as any).viewHandler.viewModel.$data.continuous_playColor = false;
      (window as any).viewHandler.viewModel.$data.isEndFlag = false;
      (window as any).viewHandler.viewModel.$data.disableBtn = false;
      if ((window as any).viewHandler.viewModel.$data.isEnd === false ||
        (window as any).viewHandler.viewModel.$data.animationIndex < 24) {
        if ((window as any).viewHandler.viewModel.$data.continuous_playColor) {
          (window as any).viewHandler.viewModel.$refs.diaphragmMovement.pause();
          (window as any).viewHandler.viewModel.$refs.diaphragmMovement.reset();
        } else {
          (window as any).viewHandler.viewModel.$refs.diaphragmMovement.reset();
        }
      } else {
        (window as any).viewHandler.viewModel.$refs.diaphragmMovement.reset();
      }
    }
}
