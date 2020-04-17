import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { MainContent } from './MainContent';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    myCanvas: MainContent;
    mainContent: any;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.mainContent = document.getElementsByClassName('mainContainer')[0];
        this.resize();
        this.myCanvas = new MainContent();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      const scale = window['env'].browserInfo.isSmallDevice ? 1 : 1.3;
      const scaleX = window.innerWidth /  1200 * scale;
      const scaleY = window.innerHeight / 675 * scale;
      if (window.innerWidth === 1280) {
        this.mainContent.style.transform = 'scale(0.75)';
        return;
      }

      if (window.innerWidth === 1024) {
        this.mainContent.style.transform = 'scale(0.75)';
        return;
      }
      if ((675 * scale) * scaleX <= window.innerHeight) {
        this.mainContent.style.transform = 'scale(' + (scaleX - 0.03) + ')';
      } else if ((1200 * scale) * scaleY <= window.innerWidth) {
        this.mainContent.style.transform = 'scale(' + (scaleY - 0.03) + ')';
      }
    }

    reset():  void {
      (this.viewModel as any).resetEvent();
      this.myCanvas.reset();
    }
}
