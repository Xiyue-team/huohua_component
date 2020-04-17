import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import  * as  mmm from '../sub_static/UI/14.gif';
export class DzdyViewHandler extends CommonViewHandler implements ViewHandler {
    //data
    play1: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }
    //点击button触发事件
    getEvent1(offset: any) {
      if (offset === 0) {
        (this.viewModel as any).isChecked1 = !(this.viewModel as any).isChecked1;
        (this.viewModel as any).showText = true;
      } else if (offset === 1) {
        (this.viewModel as any).isChecked2 = !(this.viewModel as any).isChecked2;
        if ((this.viewModel as any).isChecked2) {
        (this.viewModel as any).showGif = true;
          ( document.getElementById('playGifId') as any).src = mmm;
        } else {
          (this.viewModel as any).showGif = false;
          ( document.getElementById('playGifId') as any).src = "";
        }
      }
    }
    // 重置
    reset() {
      (this.viewModel as any).showText = false;
      (this.viewModel as any).isChecked1 = false;
      (this.viewModel as any).isChecked2 = false;
      (this.viewModel as any).showGif = false;
      ( document.getElementById('playGifId') as any).src = "";
    }
 }
