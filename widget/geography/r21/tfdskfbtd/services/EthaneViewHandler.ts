import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {TfCanvas} from './TfCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {

    tfCanvas: TfCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.tfCanvas = new TfCanvas();
        ViewController.getInstance().hideLoading();
    }

    reset():  void {
      this.viewModel.$data.table = false;
      this.viewModel.$data.tableTitle = '打开图表';
      this.viewModel.$data.flag13 = false;
      this.viewModel.$data.flag14 = false;
      this.viewModel.$data.flag15 = false;
      this.viewModel.$data.flag16 = false;
      this.viewModel.$data.flag17 = false;
      this.viewModel.$data.flag18 = false;
      this.tfCanvas.reset();
    }

}
