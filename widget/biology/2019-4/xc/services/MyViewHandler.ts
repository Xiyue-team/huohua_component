import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    //控制图片左右切换
    getMoveChange(offset: any) {
        (this.viewModel as any).num = (this.viewModel as any).num + offset;
        if ((this.viewModel as any).num  < 0) {
            (this.viewModel as any).isShow1 = true;
        }
        if ((this.viewModel as any).num  === 0) {
            (this.viewModel as any).isShow1 = false;
        }
        if ((this.viewModel as any).num  === -260) {
            (this.viewModel as any).isShow2 = false;
        }
        if ((this.viewModel as any).num  > -260) {
            (this.viewModel as any).isShow2 = true;
        }
    }

    //重置
    reset(): void {
        (this.viewModel as any).num  = 0;
        (this.viewModel as any).isShow1 = false;
        (this.viewModel as any).isShow2 = true;
        (this.viewModel as any).msg_l = false;
        (this.viewModel as any).msg_r = false;
    }
}
