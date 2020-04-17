import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import * as gif from '../sub_static/UI/tree_arrow.gif';
import * as webp from '../sub_static/UI/tree_arrow.webp';
export class MyViewHandler extends CommonViewHandler implements ViewHandler {
    //data
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }
    // 点击播放按钮事件
    getEvent1() {
        (this.viewModel as any).show = false;
        (this.viewModel as any).isShow = true;
        (this.viewModel as any).isTrue = true;
    }
    getChange(index: number) {
        if (index === 1) {
            this.buttonEvent((this.viewModel as any).isShow1);
            (this.viewModel as any).isShow1 = true;
            (this.viewModel as any).isChecked1 = true;
        } else if (index === 2) {
            this.buttonEvent((this.viewModel as any).isShow2);
            (this.viewModel as any).isShow2 = true;
            (this.viewModel as any).isChecked2 = true;
        } else if (index === 3) {
            this.buttonEvent((this.viewModel as any).isShow3);
            (this.viewModel as any).isShow3 = true;
            (this.viewModel as any).isChecked3 = true;
        }
    }
    // 控制动画显示隐藏
    buttonChange() {
        (this.viewModel as any).isShow1 = false;
        (this.viewModel as any).isShow2 = false;
        (this.viewModel as any).isShow3 = false;
        (this.viewModel as any).show = false;
        (this.viewModel as any).isChecked1 = false;
        (this.viewModel as any).isChecked2 = false;
        (this.viewModel as any).isChecked3 = false;
    }
    // 点击不同按钮触发的事件函数
    buttonEvent(act: any) {
        if (act === true) {
                    return;
                }
        this.buttonChange();
    }
    //重置
    reset(): void {
        this.buttonChange();
        (this.viewModel as any).isShow1 = false;
        (this.viewModel as any).isShow2 = false;
        (this.viewModel as any).isShow3 = false;
        (this.viewModel as any).show = true;
        (this.viewModel as any).isShow = false;
        const ua = navigator.userAgent;
        if (ua.indexOf('Chrome') !== -1) {
            (document.getElementById('webpId') as any).src =  webp;
        } else {
            (document.getElementById('gifId') as any).src =  gif;
        }
        (this.viewModel as any).isTrue = false;
    }
}
