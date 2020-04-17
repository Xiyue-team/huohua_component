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
            (this.viewModel as any).isChecked1 = true;
            (this.viewModel as any).isChecked2 = false;
            (this.viewModel as any).isShow = false;
            (this.viewModel as any).isShow1 = true;
            (this.viewModel as any).isShow2 = false;
        }
       if (offset === 2) {
            (this.viewModel as any).isChecked1 = false;
            (this.viewModel as any).isChecked2 = true;
           (this.viewModel as any).isShow = false;
           (this.viewModel as any).isShow2 = true;
           (this.viewModel as any).isShow1 = false;
        }
    }
    //控制图片显示
    getChange1(offset: any) {
        if (offset === 1 ) {
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
        if (offset === 5) {
            (this.viewModel as any).isActived = true;
            (this.viewModel as any).fsw5 = true;
        }
        if (offset === 6) {
            (this.viewModel as any).isActived = true;
            (this.viewModel as any).fsw6 = true;
        }
        if (offset === 7) {
            (this.viewModel as any).isActived = true;
            (this.viewModel as any).fsw7 = true;
        }
    }
   //关闭放大图片
    getClose1(offset: any) {
        if (offset === 1 ) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw1 = false;
            (this.viewModel as any).actived1 = false;
        }
        if (offset === 2) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw2 = false;
            (this.viewModel as any).actived2 = false;
        }
        if (offset === 3) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw3 = false;
            (this.viewModel as any).actived3 = false;
        }
        if (offset === 4) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw4 = false;
            (this.viewModel as any).actived4 = false;
        }
        if (offset === 5) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw5 = false;
            (this.viewModel as any).actived5 = false;
        }
        if (offset === 6) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw6 = false;
            (this.viewModel as any).actived6 = false;
        }
        if (offset === 7) {
            (this.viewModel as any).isActived = false;
            (this.viewModel as any).fsw7 = false;
            (this.viewModel as any).actived7 = false;
        }
}
    //点击闪现红色背景的按钮
    getBtn1(offset: any) {
        if (offset === 1) {
            (this.viewModel as any).actived1 = true;
        } else if (offset === 2) {
            (this.viewModel as any).actived2 = true;
        } else if (offset === 3) {
            (this.viewModel as any).actived3 = true;
        } else if (offset === 4) {
            (this.viewModel as any).actived4 = true;
        } else if (offset === 5) {
            (this.viewModel as any).actived5 = true;
        } else if (offset === 6) {
            (this.viewModel as any).actived6 = true;
        } else if (offset === 7) {
            (this.viewModel as any).actived7 = true;
        }
    }

    //重置
    reset(): void {
        (this.viewModel as any).isChecked1 = false;
        (this.viewModel as any).isChecked2 = false;
        (this.viewModel as any).isShow = true;
        (this.viewModel as any).isShow1 = false;
        (this.viewModel as any).isShow2 = false;
        (this.viewModel as any).fsw1 = false;
    }
}
