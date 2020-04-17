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
      this.viewModel.$data.startBtn = true;
      this.viewModel.$data.openTable = false;
      this.viewModel.$data.showBtn = false;
      this.viewModel.$data.table = false;
      this.viewModel.$data.tableTitle = '打开图表';
      this.viewModel.$data.textValue = 0;
      this.viewModel.$data.titleText = [2013, 2014, 2015, 2016, 2017, 2018];
      this.viewModel.$data.flag = false;
      this.tfCanvas.reset();
    }

}
