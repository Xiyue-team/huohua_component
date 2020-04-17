import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    private images: any;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.images = document.getElementsByClassName('containerStyle')[0];
        this.resize();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      const scaleX = (window.innerWidth / 1920) * 1.7;
      const scaleY = (window.innerHeight / 937) * 1.45;
      if (window['env'].browserInfo.isSmallDevice) {
        this.images.style.transform = 'scale(' + scaleY + ')';
      } else {
        this.images.style.transform = 'scale(' + scaleX + ')';
      }

    }

    reset():  void {
      (this.viewModel as any).resetEvent();
    }
}
