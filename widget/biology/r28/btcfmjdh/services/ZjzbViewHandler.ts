import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
export class ZjzbViewHandler extends CommonViewHandler implements ViewHandler {

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement():  void {
  }

  domReady():  void {
    super.domReady();
    ViewController.getInstance().hideLoading();
  }

  reset():  void {
    this.viewModel.$data.show_bg = true;
    this.viewModel.$data.wind_flowerColor = false;
    this.viewModel.$data.insect_flowerColor = false;
    this.viewModel.$data.bird_flowerColor = false;
    this.viewModel.$data.showButton = false;
    this.viewModel.$data.img_icon_show = false;
    this.viewModel.$data.video_icon_show = false;
    this.viewModel.$data.show_arrow = false;
    this.viewModel.$data.active1 = false;
    this.viewModel.$data.active2 = false;
    this.viewModel.$data.active3 = false;
    this.viewModel.$data.show_gallery = false;
    this.viewModel.$data.showPlayButton = false;
    this.viewModel.$data.clickNum = 0;
    (this.viewModel as any).stopVideo();
  }
}
