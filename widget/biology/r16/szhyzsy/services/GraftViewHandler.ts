import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';

export class GraftViewHandler extends KonvaViewHandler implements ViewHandler {
    public timer: any;
    public timer1: any;


    //构造函数
    constructor(vm: Vue) {
        super(vm);

    }

    domReady() {
        this.initElement();
        super.domReady();
    }

    //初始化元素
    initElement() {
        ViewController.getInstance().hideLoading(1000);

        // this.playImg((window as any).viewHandler.viewModel.$data.store1);
    }

    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image.src);
            image.onerror = reject;
            image.src = path;
        });
    }


    complete() {

    }

    doGraft() {
        (window as any).viewHandler.viewModel.$data.isNormal = false;

        (window as any).viewHandler.viewModel.$data.isBegin = true;
        (window as any).viewHandler.viewModel.$data.isChange = true;
        (window as any).viewHandler.viewModel.$data.isCover1 = true;
        (window as any).viewHandler.viewModel.$data.hasTxt = true;
        (window as any).viewHandler.viewModel.$data.hasTxt1 = false;

        (window as any).viewHandler.viewModel.$data.greenSrc = (window as any).viewHandler.viewModel.$data.blueHat;
        (window as any).viewHandler.viewModel.$data.blueSrc = (window as any).viewHandler.viewModel.$data.greenHat;
        (window as any).viewHandler.viewModel.$data.fg1 = true;
        this.timer = setTimeout(() => {
            (window as any).viewHandler.viewModel.$data.fg2 = true;
            (window as any).viewHandler.viewModel.$data.isCover1 = false;
            this.timer = setTimeout(() => {
                (window as any).viewHandler.viewModel.$data.hasTxt = false;
            }, 2000);
        }, 2200);
    }


    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        (window as any).viewHandler.viewModel.$data.hat = true;
        (window as any).viewHandler.viewModel.$data.fg1 = false;
        (window as any).viewHandler.viewModel.$data.fg2 = false;
        (window as any).viewHandler.viewModel.$data.isChange = false;
        (window as any).viewHandler.viewModel.$data.isNormal = true;
        (window as any).viewHandler.viewModel.$data.isCover1 = false;
        (window as any).viewHandler.viewModel.$data.hasTxt = false;
        (window as any).viewHandler.viewModel.$data.hasTxt1 = true;
        (window as any).viewHandler.viewModel.$data.greenSrc = (window as any).viewHandler.viewModel.$data.greenHat;
        (window as any).viewHandler.viewModel.$data.blueSrc = (window as any).viewHandler.viewModel.$data.blueHat;
        clearTimeout(this.timer);
        clearTimeout(this.timer1);


    }

}
