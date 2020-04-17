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
   //点击按钮自身的变化
    getEvent1(offset: any) {
        this.getChange();
        if (offset === 1 ) {
             (this.viewModel as any).isShow1 = true;
             (this.viewModel as any).isActived1 = true;
        }
       if (offset === 2) {
           (this.viewModel as any).isShow2 = true;
          (this.viewModel as any).isActived2 = true;
           (this.viewModel as any).msg2 = 1;
        }
        if (offset === 3) {
            (this.viewModel as any).isShow3 = true;
          (this.viewModel as any).isActived3 = true;
            (this.viewModel as any).msg3 = 1;
        }
        if (offset === 4) {
            (this.viewModel as any).isShow4 = true;
            (this.viewModel as any).isActived4 = true;
        }
    }
     //更改
    getChange() {
        (this.viewModel as any).isShow = false;
        (this.viewModel as any).isShow1 = false;
        (this.viewModel as any).isShow2 = false;
        (this.viewModel as any).isShow3 = false;
        (this.viewModel as any).isShow4 = false;
        (this.viewModel as any).isActived1 = false;
       (this.viewModel as any).isActived2 = false;
       (this.viewModel as any).isActived3 = false;
        (this.viewModel as any).isActived4 = false;
      (this.viewModel as any).msg2 = 0;
      (this.viewModel as any).msg3 = 0;
    }


    //重置
    reset(): void {
      this.getChange();
      (this.viewModel as any).isShow = true;

    }
}
