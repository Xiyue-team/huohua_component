import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class FzqcViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading();
    }

    init() {

    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        //调用两段动画的reset方法
        (window as any).viewHandler.viewModel.$refs.functionuse1.reset();
        (window as any).viewHandler.viewModel.$refs.functionuse2.reset();
        //设置动画的层级
        (window as any).viewHandler.viewModel.$data.animationCtrl = true;
        //显示牙刷图片
        (window as any).viewHandler.viewModel.$data.imgCtrl = true;
        this.resetCssAnimation();
        //重新播放第一段动画
        setTimeout( () => {
            (window as any).viewHandler.viewModel.$refs.functionuse1.play();
        }, 1000);
    }

    //重置CSS动画的方法
    resetCssAnimation() {
        const imgDom = document.getElementById('gs1');
        imgDom.style.animation = 'none';
        const reset = imgDom.offsetHeight; /* trigger reflow */
        imgDom.style.animation = null;
    }

}
