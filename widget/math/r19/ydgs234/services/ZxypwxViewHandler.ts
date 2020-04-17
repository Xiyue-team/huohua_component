import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Zxypwx3dModel} from './Zxypwx3dModel';
import {ViewController} from '../../../../../src/core/ViewController';

export class ZxypwxViewHandler extends CommonViewHandler implements ViewHandler {


    zxypwx: Zxypwx3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        const dom = document.getElementById('3dContainer');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.zxypwx = new Zxypwx3dModel(dom, fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }


    reset():  void {
        this.zxypwx.reset();
        this.viewModel.$data.isClickButton1 = false;
        this.viewModel.$data.isClickButton2 = false;
        this.viewModel.$data.isClickButton3 = false;
        this.viewModel.$data.isClickButton4 = false;
        this.viewModel.$data.isClickButton5 = false;
        this.viewModel.$data.isClickButton6 = false;
        this.viewModel.$data.isClickButton7 = false;
    }

}
