import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';

export class DemoViewHandler extends KonvaViewHandler implements ViewHandler {
    public timer: any;
    public timer1: any;
    public timer2: any;
    public timer3: any;

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

    playImg(Arr: any) {
        let i = 0;
        const that = this;

        function Run() {
            (window as any).viewHandler.viewModel.$data.src1 = Arr[i];
            i++;
            that.timer = setTimeout(Run, 120);
            if (i >= 55) {
                clearTimeout(that.timer1);
                (window as any).viewHandler.viewModel.$data.src1 = require(`../sub_static/imgList1/img54.png`);
            }
        }

        Run();
    }


    playImg1(Arr: any) {
        let i = 0;
        const that = this;

        function Run() {
            (window as any).viewHandler.viewModel.$data.src1 = Arr[i];
            i++;
            that.timer1 = setTimeout(Run, 100);
            if (i >= 55) {
                clearTimeout(that.timer1);
                (window as any).viewHandler.viewModel.$data.src1 = require(`../sub_static/imgList2/img54.png`);
            }
        }

        Run();
    }

    playImg2(Arr: any) {
        let i = 0;
        const that = this;
        clearTimeout(that.timer2);

        function Run() {
            (window as any).viewHandler.viewModel.$data.src1 = Arr[i];
            i++;
            that.timer2 = setTimeout(Run, 150);
            if (i >= 33) {
                i = 0;
                (window as any).viewHandler.viewModel.$data.src1 = require(`../sub_static/imgList3/addDianchi/img33.png`);
            }
        }

        Run();
    }

    playImg3(Arr: any) {
        let i = 0;
        const that = this;
        clearTimeout(that.timer3);

        function Run() {
            (window as any).viewHandler.viewModel.$data.src2 = Arr[i];
            i++;
            that.timer3 = setTimeout(Run, 150);
            if (i >= 33) {
                i = 0;
                (window as any).viewHandler.viewModel.$data.src2 = require(`../sub_static/imgList3/fenzi/img33.png`);
            }
        }

        Run();
    }

    complete() {

    }

    nextStep1(Arr: any) {
        this.playImg(Arr);
    }

    //加导线

    nextStep2(Arr: any) {
        clearTimeout(this.timer);
        (window as any).viewHandler.viewModel.$data.step2 = false;
        (window as any).viewHandler.viewModel.$data.step3 = true;
        (window as any).viewHandler.viewModel.$data.viewShow = false;
        (window as any).viewHandler.viewModel.$data.viewShow1 = true;

        (window as any).viewHandler.viewModel.$data.W = 320 * (window as any).viewHandler.viewModel.$data.zoom1;
        (window as any).viewHandler.viewModel.$data.H = 427.5 * (window as any).viewHandler.viewModel.$data.zoom1;
        (window as any).viewHandler.viewModel.$data.Hp = 452 * (window as any).viewHandler.viewModel.$data.zoom1;
        this.playImg1(Arr);
    }

    //加电池
    nextStep3(Arr1: any, Arr2: any) {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        (window as any).viewHandler.viewModel.$data.step3 = false;
        this.playImg2(Arr1);
        (window as any).viewHandler.viewModel.$data.step4 = true;
        this.playImg3(Arr2);
        (window as any).viewHandler.viewModel.$data.viewShow1 = false;
        (window as any).viewHandler.viewModel.$data.viewShow2 = true;
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        clearTimeout(this.timer);
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        (window as any).viewHandler.viewModel.$data.step2 = true;
        (window as any).viewHandler.viewModel.$data.step3 = false;
        (window as any).viewHandler.viewModel.$data.step4 = false;
        (window as any).viewHandler.viewModel.$data.viewShow = true;
        (window as any).viewHandler.viewModel.$data.viewShow1 = false;
        (window as any).viewHandler.viewModel.$data.viewShow2 = false;
        (window as any).viewHandler.viewModel.$data.isCheck = false;

        (window as any).viewHandler.viewModel.$data.W = 320 * (window as any).viewHandler.viewModel.$data.zoom1;
        (window as any).viewHandler.viewModel.$data.H = 340 * (window as any).viewHandler.viewModel.$data.zoom1;


        this.playImg((window as any).viewHandler.viewModel.$data.store1);
    }

}
