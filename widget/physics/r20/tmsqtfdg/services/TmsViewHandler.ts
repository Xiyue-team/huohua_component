
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Tms3dModel} from './Tms3dModel';
import {ViewController} from '../../../../../src/core/ViewController';

export class TmsViewHandler extends CommonViewHandler implements ViewHandler {

    tmsqtfdg: Tms3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const dom = document.getElementById('3dContainer');
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.tmsqtfdg = new Tms3dModel(dom, fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.tmsqtfdg.reset();
        this.viewModel.$data.sliderNumber = 0;
        this.viewModel.$data.accelerateColor = false;
    }

}
