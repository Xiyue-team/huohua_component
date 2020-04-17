import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { MainContent } from './MainContent';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    fabTest: MainContent;
    mainContent: any;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.fabTest = new MainContent();
        this.mainContent = document.getElementById('mainContainer');
        this.resize();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      const scale = window['env'].browserInfo.isSmallDevice ? 1 : 2;
      const scaleX = window.innerWidth / (1024 * scale);
      const scaleY = window.innerHeight / (576 * scale);

      if ((576 * scale) * scaleX <= window.innerHeight) {
        this.mainContent.style.transform = 'scale(' + scaleX + ')';
      } else if ((1024 * scale) * scaleY <= window.innerWidth) {
        this.mainContent.style.transform = 'scale(' + scaleY + ')';
      }
    }

    reset():  void {
      this.fabTest.reset();
    }
}
