import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';

export class SycxydcViewHandler extends CommonViewHandler implements SycxydcViewHandler {
    originalPage: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
    }

    domReady(): void {
        super.domReady();
        this.originalPage = document.getElementById('original_page');
        ViewController.getInstance().hideLoading();
        this.resize();
    }

    resize(): void {
        if (this.originalPage) {
            let scaleX: any = (window.innerWidth / 1076).toFixed(1);
            let scaleY: any = (window.innerHeight / 1010).toFixed(1);
            if (scaleX > 1) {
                scaleX = 1;
            }
            if (scaleY > 1) {
                scaleY = 1;
            }

            if (1010 * scaleX <= window.innerHeight) {
                this.originalPage.style.transform = 'scale(' + scaleX + ')';
            } else if (1076 * scaleY <= window.innerWidth) {
                this.originalPage.style.transform = 'scale(' + scaleY + ')';
            }

            console.log(this.originalPage.style);
        }
    }

    reset(): void {
        (this.viewModel as any).resetEvent();
    }
}
