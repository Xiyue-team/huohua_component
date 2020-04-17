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

        if (offset === 1 ) {

        }
       if (offset === 2) {

        }
        if (offset === 3) {

        }
        if (offset === 4) {

        }
    }
     //更改
    getChange() {

    }


    //重置
    reset(): void {
      (this.viewModel as any).reset();
    }
}
