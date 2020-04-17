import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';

export class GqgxMtwoViewHandler extends CommonViewHandler implements ViewHandler {


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
        this.viewModel.$data.isShowAnimation4 = false;
        this.viewModel.$data.isShowAnimation1 = true;
        this.viewModel.$data.isShowAnimation2 = false;
        this.viewModel.$data.isShowAnimation3 = false;
        this.viewModel.$data.slidernumber = 0;
        this.viewModel.$data.isClickButton = false;
        this.viewModel.$data.isShowSlider = true;
        this.viewModel.$data.title = '供求关系对价格曲线的影响';
    }

}
