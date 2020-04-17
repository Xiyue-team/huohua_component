import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import { Plstlghzysytj } from './Plstlghzysytj';

export class PlstlViewHandler extends CommonViewHandler implements ViewHandler {
  public Photosynthesis: Plstlghzysytj;

  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();
    ViewController.getInstance().hideLoading();
    this.Photosynthesis = new Plstlghzysytj();
  }

  init() {

  }

  resize(): void {
    super.resize();
  }

  reset(): void {
    (this.viewModel as any).reset();
  }

}
