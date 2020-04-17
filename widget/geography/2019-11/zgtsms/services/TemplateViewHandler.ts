import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    mainContent: any;
    swiperContainer: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.mainContent = document.getElementsByClassName('mainContainer')[0];
        this.swiperContainer = document.getElementsByClassName('swiperContainer')[0];
        this.resize();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      const scaleX = window.innerWidth / 1200;
      const scaleY = window.innerHeight / 675;

      if (675 * scaleX <= window.innerHeight) {
        this.mainContent.style.transform = 'scale(' + scaleX + ')';
        this.swiperContainer.style.transform = 'scale(' + scaleX + ')';
      } else if (1200 * scaleY <= window.innerWidth) {
        this.mainContent.style.transform = 'scale(' + scaleY + ')';
        this.swiperContainer.style.transform = 'scale(' + scaleY + ')';
      }
    }

    reset():  void {
      (this.viewModel as any).buttonValue = 0;
    }
}
