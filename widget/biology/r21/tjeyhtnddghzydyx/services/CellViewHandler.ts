import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from './node_modules/vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
import { RongqiCanvas } from './rongQiCanvas';

export class CellViewHandler extends CommonViewHandler implements ViewHandler {

  public rongqiCanvas: RongqiCanvas;

  constructor(vm: Vue) {
    super(vm);
  }

  domReady() {
    super.domReady();

    const fov = 30;
    const near = 1;
    const far = 3000;
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.rongqiCanvas = new RongqiCanvas(document.getElementById('3dContainer'), fov, width, height, near, far);

    this.initElement();
    ViewController.getInstance().hideLoading();
  }

  initElement() {

  }

  //动画
  ani(num: number) {
    if (num === 1) {
      //叶片 气泡上浮动画控制
      this.rongqiCanvas.anniu(0, 25, 1);
    } else if (num === 2) {
      this.rongqiCanvas.anniu(0, 30, 2);
    } else if (num === 3) {
      this.rongqiCanvas.anniu(0, 20, 3);
    }
  }

  resize(): void {
    super.resize();
    const width = document.getElementById('3dContainer').clientWidth;
    const height = document.getElementById('3dContainer').clientHeight;
    this.rongqiCanvas.resize(width, height);
  }

  //重置叶片
  resetLeafPos(num: number) {
    this.rongqiCanvas.resetLeafPos(num);
  }

  reset(): void {
    (this.viewModel as any).reset();
  }

}
