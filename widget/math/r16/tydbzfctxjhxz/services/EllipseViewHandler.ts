import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class EllipseViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    init() {
    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        this.viewModel.$data.index = 0;
        this.viewModel.$data.isShow = 'yes';
        this.viewModel.$data.ellipsePicture = require('../sub_static/UI1/0.png');
        this.viewModel.$data.timer3 = setTimeout(() => {
            this.viewModel.$data.isShowCover = true;
            clearTimeout(this.viewModel.$data.timer3);
        }, 600);
        this.viewModel.$data.timer1 = setTimeout(() => {
            this.viewModel.$data.isShow = 'no';
            this.viewModel.$data.isShowCover = false;
            this.viewModel.$data.ellipsePicture = require('../sub_static/UI2/0.png');
            clearTimeout(this.viewModel.$data.timer1);
        }, 1300);
    }
}
