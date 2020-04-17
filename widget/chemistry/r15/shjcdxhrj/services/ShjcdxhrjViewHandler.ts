import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import { Detector } from '../../../../../src/util/Detector';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Shjcdxhrj3DModel } from './Shjcdxhrj3DModel';

export class ShjcdxhrjViewHandler extends CommonViewHandler implements ViewHandler {

  shjcdxhrj3DModel: Shjcdxhrj3DModel;

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement(): void {
    //throw new Error('Method not implemented.');
  }

  domReady(): void {
    super.domReady();
    const fov = 30;
    const near = 1;
    const far = 3000;

    const width1 = document.getElementById('3dContainer').clientWidth;
    const height1 = document.getElementById('3dContainer').clientHeight;
    this.shjcdxhrj3DModel = new Shjcdxhrj3DModel(document.getElementById('3dContainer'), fov, width1, height1, near, far);
    ViewController.getInstance().hideLoading();
  }

  resize(): void {
    Detector.forceMobildLandscape();
  }

  reset(): void {


    this.shjcdxhrj3DModel.reset();
    (this as any).viewModel.$data.disabled1 = false;
    (this as any).viewModel.$data.disabled2 = false;
    (this as any).viewModel.$data.disabled3 = false;
    (this as any).viewModel.$data.disabled4 = false;
    (this as any).viewModel.$data.axiom = true;
    (this as any).viewModel.$data.disabledQG = true;
    (this as any).viewModel.$data.disabledBL = false;
    (this as any).viewModel.$refs.counterFunction1.reset();
    (this as any).viewModel.$refs.counterFunction2.reset();




  }

}
