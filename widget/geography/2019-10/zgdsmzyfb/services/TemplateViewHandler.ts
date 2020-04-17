import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Threejs3dModel } from './Threejs3dModel';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {
    three3dModel: Threejs3dModel;
    mainContainer: any;
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
        this.three3dModel = new Threejs3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        this.resize();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
      this.three3dModel.resize();
    }

    reset():  void {
      (this.viewModel as any).resetEvent();
      this.three3dModel.reset();
    }
}
