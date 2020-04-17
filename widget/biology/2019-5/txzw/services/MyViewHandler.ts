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
    //控制图片显示
    getChange1(offset: any) {
       if ( !(this.viewModel as any).fsw1 && !(this.viewModel as any).fsw2 && !(this.viewModel as any).fsw3 &&
         !(this.viewModel as any).fsw4) {
         if (offset === 1) {
           (this.viewModel as any).isActived = true;
           (this.viewModel as any).fsw1 = true;
         }
         if (offset === 2) {
           (this.viewModel as any).isActived = true;
           (this.viewModel as any).fsw2 = true;
         }
         if (offset === 3) {
           (this.viewModel as any).isActived = true;
           (this.viewModel as any).fsw3 = true;
         }
         if (offset === 4) {
           (this.viewModel as any).isActived = true;
           (this.viewModel as any).fsw4 = true;
         }
       }
    }
   //关闭放大图片
    getClose1(offset: any) {
        if (offset === 1 ) {
            (this.viewModel as any).fsw1 = false;
          (this.viewModel as any).isActived = false;
        }
        if (offset === 2) {
            (this.viewModel as any).fsw2 = false;
          (this.viewModel as any).isActived = false;
        }
        if (offset === 3) {
            (this.viewModel as any).fsw3 = false;
          (this.viewModel as any).isActived = false;
        }
        if (offset === 4) {
            (this.viewModel as any).fsw4 = false;
          (this.viewModel as any).isActived = false;
        }
}

    //重置
    reset(): void {
      (this.viewModel as any).fsw1 = false;
      (this.viewModel as any).fsw2 = false;
      (this.viewModel as any).fsw3 = false;
      (this.viewModel as any).fsw4 = false;
    }
}
