import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Detector } from '../../../../../src/util/Detector';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    mainContent: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.mainContent = document.getElementsByClassName('bg_style_class')[0];
        this.resize();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const scaleX = window.innerWidth / (1006.5);
        const scaleY = window.innerHeight / (786);
        if ((786) * scaleX <= window.innerHeight) {
           this.mainContent.style.transform = 'scale(' + (scaleX - 0.2) + ')';
        } else if ((1006.5) * scaleY <= window.innerWidth) {
           this.mainContent.style.transform = 'scale(' + (scaleY - 0.2) + ')';
        }
    }

    reset():  void {
      (this.viewModel as any).reset();
    }
}
