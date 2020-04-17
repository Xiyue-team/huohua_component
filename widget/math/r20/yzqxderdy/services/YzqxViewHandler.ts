import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Yzqx3DScene } from './Yzqx3DScene';

export class YzqxViewHandler extends CommonViewHandler implements ViewHandler {

    yzqx: Yzqx3DScene;
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
        this.yzqx = new Yzqx3DScene(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
        this.yzqx.reset();
        this.viewModel.$data.drawColor = false;
        this.viewModel.$data.showColor = false;
        this.viewModel.$data.num = 1;
        this.viewModel.$data.showExhibition = 2;
        this.viewModel.$data.selectButton = false;
        this.viewModel.$data.disableButtonDraw = false;
        this.viewModel.$data.disableButtonShow = false;
        this.viewModel.$data.disableButtonSelect = false;
        this.viewModel.$data.animationCtrl = true;
        (document.getElementsByClassName('formulaOne')[0] as HTMLElement).style.opacity = '1';
        (document.getElementsByClassName('formulaTwo')[0] as HTMLElement).style.opacity = '0.5';
        (document.getElementsByClassName('formulaThree')[0] as HTMLElement).style.opacity = '0.5';
    }
}
