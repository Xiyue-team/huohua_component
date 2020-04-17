import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';

export class QxdcViewHandler extends CommonViewHandler implements QxdcViewHandler {
    videoContent: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
    }

    domReady(): void {
        super.domReady();
        this.videoContent = document.getElementById('videoBox');
        ViewController.getInstance().hideLoading();
        this.resize();
    }

    resize(): void {
        const scaleX = window.innerWidth / 1016;
        const scaleY = window.innerHeight / 968;
        if (this.videoContent) {
            if (968 * scaleX <= window.innerHeight) {
                this.videoContent.style.transform = 'scale(' + scaleX + ')';
            } else if (1016 * scaleY <= window.innerWidth) {
                this.videoContent.style.transform = 'scale(' + scaleY + ')';
            }
        }
    }

    reset(): void {
        (this.viewModel as any).resetEvent();
    }
}
