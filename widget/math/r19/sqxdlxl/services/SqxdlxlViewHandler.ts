
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Sqxdlxl3dModel} from './Sqxdlxl3dModel';
import {ViewController} from '../../../../../src/core/ViewController';

export class SqxdlxlViewHandler extends CommonViewHandler implements ViewHandler {

    sqxdlxl: Sqxdlxl3dModel;
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
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.sqxdlxl = new Sqxdlxl3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.sqxdlxl.reset();
        this.viewModel.$data.a = 3.00 ;
        this.viewModel.$data.b = 4.00 ;
        this.viewModel.$data.c = 5.00 ;
    }

}
