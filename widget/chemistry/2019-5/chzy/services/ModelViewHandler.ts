import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    timer: any;
    timer1: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize(): void {
        super.resize();
    }
    // 无催化及有催化条件下分子反应动画
    play(time: number) {
        clearTimeout(this.timer);
        (this.viewModel as any).frameNum1 = 0;
        const timeFun = () => {
            if ((this.viewModel as any).frameNum1 === 78) {
                clearTimeout(this.timer);
                return;
            }
            (this.viewModel as any).frameNum1 ++;
            this.timer = setTimeout(timeFun, time);
        };
        timeFun();
    }
    play1(time: number) {
        clearTimeout(this.timer1);
        (this.viewModel as any).frameNum2 = 0;
        const timeFun = () => {
            if ((this.viewModel as any).frameNum2 === 39) {
                clearTimeout(this.timer1);
                return;
            }
            (this.viewModel as any).frameNum2 ++;
            this.timer1 = setTimeout(timeFun, time);
        };
        timeFun();
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonChange();
            (this.viewModel as any).active1 = true;
            (this.viewModel as any).redShow = true;
        } else if (index === 2) {
            this.buttonChange();
            (this.viewModel as any).active2 = true;
            (this.viewModel as any).blueShow = true;
        } else if (index === 3) {
            this.buttonChange();
            (this.viewModel as any).active3 = true;
            this.play(110);
            this.play1(110);
        }
    }
    // 控制按钮是否选中状态
    buttonChange() {
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).redShow = false;
        (this.viewModel as any).blueShow = false;
        (this.viewModel as any).frameNum1 = 0;
        (this.viewModel as any).frameNum2 = 0;
        clearTimeout(this.timer);
        clearTimeout(this.timer1);
        (this as any).viewModel.$refs.functionuse1.reset();
        (this as any).viewModel.$refs.functionuse2.reset();
        (this.viewModel as any).reactantTip = false;
        (this.viewModel as any).productTip = false;
    }

    //为了手机端适配在viewHandler中重新实现reset
    reset(): void {
        (this.viewModel as any).reset();
        setTimeout(() => {
            (this as any).viewModel.$data.isShow = true;
        }, 100);

    }

}
