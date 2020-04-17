import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class DxdhcdyxMobileViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading();
    }


    init() {

    }

    mobileAnimationPlay() {
        switch (true) {
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
                (this.viewModel.$refs.pymAnimation as any).play();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
                (this.viewModel.$refs.pykAnimation as any).play();
                break;
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
                (this.viewModel.$refs.nbmAnimation as any).play();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
                (this.viewModel.$refs.nbkAnimation as any).play();
                break;
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
                (this.viewModel.$refs.dxmAnimation as any).play();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
                (this.viewModel.$refs.dxkAnimation as any).play();
                break;
        }
    }

    mobileAnimationReset() {
        switch (true) {
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
                (this.viewModel.$refs.pymAnimation as any).reset();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active1:
                (this.viewModel.$refs.pykAnimation as any).reset();
                break;
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
                (this.viewModel.$refs.nbmAnimation as any).reset();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active2:
                (this.viewModel.$refs.nbkAnimation as any).reset();
                break;
            case !this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
                (this.viewModel.$refs.dxmAnimation as any).reset();
                break;
            case this.viewModel.$data.imgCtrl && this.viewModel.$data.active3:
                (this.viewModel.$refs.dxkAnimation as any).reset();
                break;
        }
    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        this.viewModel.$data.imgCtrl = false;
        this.viewModel.$data.active1 = true;
        this.viewModel.$data.active2 = false;
        this.viewModel.$data.active3 = false;
        this.mobileAnimationPlay();
    }

}
