import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
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
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        const scaleX = window.innerWidth / 1024;
        const scaleY = window.innerHeight / 576;

        if (576 * scaleX <= window.innerHeight) {
            this.mainContent.style.transform = 'scale(' + scaleX + ')';
        } else if (1024 * scaleY <= window.innerWidth) {
            this.mainContent.style.transform = 'scale(' + scaleY + ')';
        }
    }

    reset():  void {
        this.viewModel.$data.sliderNumber = 0;
        this.viewModel.$data.isShowCandleImage = false;
        this.viewModel.$data.disableSlider = false;
        this.viewModel.$data.isPlay = false;
        this.viewModel.$data.playButton = false;
        (this.viewModel as any).resetVideo();
    }

}
