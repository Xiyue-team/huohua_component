import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';

export class CrystalViewHandler extends CommonViewHandler implements ViewHandler {
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }
    reset(): void {
        (this.viewModel as any).value1 = 0;
        (this.viewModel as any).value2 = 0;
        (this.viewModel as any).value3 = 0;
    }
    resize() {
        const W1 = window.innerWidth;
        const H1 = window.innerHeight;

        if (W1 > 1300) {
            (this.viewModel as any).zoom1 = 1;
            console.log(1);
        } else if (W1 > 1200) {
            (this.viewModel as any).sliderOption1.width = window.innerWidth * 0.35;
            (this.viewModel as any).sliderOption1.dotSize = [16, 16];
            (this.viewModel as any).sliderOption2.width = window.innerWidth * 0.15;
            (this.viewModel as any).sliderOption2.dotSize = [16, 16];
            (this.viewModel as any).sliderOption3.width = window.innerWidth * 0.15;
            (this.viewModel as any).sliderOption3.dotSize = [16, 16];
        } else {
            (this.viewModel as any).zoom1 = H1 / (W1 * 0.8);
        }
    }
}
