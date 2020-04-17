
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Ydgs563dModel} from './Ydgs563dModel';

export class Ydgs56ViewHandler extends CommonViewHandler implements ViewHandler {


    ydgs: Ydgs563dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.ydgs = new Ydgs563dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    PlayA(yuan: boolean) {

      this.ydgs.lineTwo.visible = yuan;
    }

    PlayB(jian: boolean) {

        this.ydgs.lineThree.visible = jian;
    }

    PlayC(jia: boolean) {

       this.ydgs.lineFour.visible = jia;
    }

    PlayD(duichen: boolean) {

       this.ydgs.normalline.visible = duichen;
    }

    reset():  void {
        this.ydgs.reset();
        if ((window as any).env.browserInfo.isSmallDevice) {
          document.getElementById('hanshuDiv').style.bottom = '0px';
        } else {
          document.getElementById('hanshuDiv').style.bottom = '0px';
        }
        (window as any).viewHandler.viewModel.$data.jias = false;
        (window as any).viewHandler.viewModel.$data.jians = false;
        (window as any).viewHandler.viewModel.$data.duichen = false;
        (window as any).viewHandler.viewModel.$data.showDiv = false;



    }
}
