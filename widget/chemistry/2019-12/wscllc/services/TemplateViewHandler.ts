import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { ViewModel } from '../viewModel';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    mainContent: any;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.mainContent =  document.getElementsByClassName('wscllc_mainContainer')[0];
        this.resize();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 937;

      if (937 * scaleX <= window.innerHeight) {
        this.mainContent.style.transform = 'scale(' + (scaleX * 1.2).toFixed(1) + ')';
      } else if (1920 * scaleY <= window.innerWidth) {
        this.mainContent.style.transform = 'scale(' + (scaleY * 1.2).toFixed(1) + ')';
      }
    }

    reset():  void {
      (this.viewModel as ViewModel).button1Active = false;
      (this.viewModel as ViewModel).button2Active = false;
      (this.viewModel as ViewModel).button3Active = false;
      (this.viewModel as ViewModel).button4Active = false;
      (this.viewModel as ViewModel).button5Active = false;

      (this.viewModel as ViewModel).videoActive1 = false;
      (this.viewModel as ViewModel).videoActive2 = false;
      (this.viewModel as ViewModel).videoActive3 = false;
      (this.viewModel as ViewModel).videoActive4 = false;
      (this.viewModel as ViewModel).videoActive5 = false;

      (this.viewModel as ViewModel).resetVideo();
    }
}
