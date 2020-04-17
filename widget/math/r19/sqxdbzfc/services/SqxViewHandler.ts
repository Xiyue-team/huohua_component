import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Sqx3dModel} from './Sqx3dModel';
import {ViewController} from '../../../../../src/core/ViewController';

export class SqxViewHandler extends CommonViewHandler implements ViewHandler {

    sqx: Sqx3dModel;
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
        this.sqx = new Sqx3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.sqx.reset();
        this.viewModel.$data.XAxiscolor = true;
        this.viewModel.$data.YAxiscolor = false;
        document.getElementById('leftFormula').style.opacity = '1';
        document.getElementById('rightFormula').style.opacity = '0.3';
    }

}
