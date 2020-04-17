import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {HammerDragEvent} from './HammerDragEvent';
import * as mgStartGif from '../sub_static/UI/mg/tansuan_Mg_1.gif';
import * as thermometerBg1 from '../sub_static/UI/402.png';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    // 屏幕缩放比例变量
    scaleY: number;
    // cache指当前滑块所处的值
    cache: number;
    // 拖动类
    dragEvtSlider: HammerDragEvent;
    //温度的高度
    height: number;
    //控制到达一定温度后再拖动温度条，gif动画不再从头播放的变量
    mark = true;
    //控制播放最后稳定状态下动画的时间
    timer: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        this.scaleY = document.body.clientHeight / 953;
        this.height = (this.viewModel as any).bottom;
        ViewController.getInstance().hideLoading();
        this.initElement();
    }
    resize(): void {
        super.resize();
    }
    initElement() {
        this.dragEvtSlider = new HammerDragEvent('slider', this.scaleY, (cache: number) => {
            if ((this.viewModel as any).active1 && -cache > 100 && this.mark === true) {
                this.mark = false;
                (this.viewModel as any).number = 402;
                this.gifShow();
                (this.viewModel as any).show1 = true;
                (this.viewModel as any).resolveShow = true;
                this.timer = setTimeout(() => {
                    this.gifShow();
                    (this.viewModel as any).show2 = true;
                }, 2230);
            } else if ((this.viewModel as any).active2 && -cache > 225  && this.mark === true) {
                this.mark = false;
                (this.viewModel as any).number = 900;
                this.gifShow();
                (this.viewModel as any).show3 = true;
                (this.viewModel as any).resolveShow = true;
                this.timer = setTimeout(() => {
                    this.gifShow();
                    (this.viewModel as any).show4 = true;
                }, 2230);
            } else if ((this.viewModel as any).active3 && -cache > 290  && this.mark === true) {
                this.mark = false;
                (this.viewModel as any).number = 1172;
                this.gifShow();
                (this.viewModel as any).show5 = true;
                (this.viewModel as any).resolveShow = true;
                this.timer = setTimeout(() => {
                    this.gifShow();
                    (this.viewModel as any).show6 = true;
                }, 2230);
            } else if ((this.viewModel as any).active4 && -cache > 340 && this.mark === true) {
                this.mark = false;
                (this.viewModel as any).number = 1360;
                this.gifShow();
                (this.viewModel as any).show7 = true;
                (this.viewModel as any).resolveShow = true;
                this.timer = setTimeout(() => {
                    this.gifShow();
                    (this.viewModel as any).show8 = true;
                }, 2230);
            }
        });
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonEvent((this.viewModel as any).active1, );
            (this.viewModel as any).active1 = true;
        } else if (index === 2) {
            this.buttonEvent((this.viewModel as any).active2, );
            (this.viewModel as any).active2 = true;
        } else if (index === 3) {
            this.buttonEvent((this.viewModel as any).active3, );
            (this.viewModel as any).active3 = true;
        } else if (index === 4) {
            this.buttonEvent((this.viewModel as any).active4, );
            (this.viewModel as any).active4 = true;
        }
    }
    // 控制gif显示隐藏
    gifShow () {
        (this.viewModel as any).show = true;
        (this.viewModel as any).show1 = false;
        (this.viewModel as any).show2 = false;
        (this.viewModel as any).show3 = false;
        (this.viewModel as any).show4 = false;
        (this.viewModel as any).show5 = false;
        (this.viewModel as any).show6 = false;
        (this.viewModel as any).show7 = false;
        (this.viewModel as any).show8 = false;
    }
    // 控制gif显示隐藏
    videoChange() {
        this.mark = true;
        clearTimeout(this.timer);
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).active4 = false;
        (this.viewModel as any).resolveShow = false;
        this.dragEvtSlider.restPosition();
        this.gifShow();
    }

    // 点击不同按钮触发的事件函数
    buttonEvent(act: any, ) {
        if (act === true) {
            return;
        }
        this.videoChange();
    }
    reset(): void {
        this.videoChange();
        (this.viewModel as any).number = 402;
        (this.viewModel as any).active1 = true;
        (this.viewModel as any).molecularMotion = mgStartGif;
        (this.viewModel as any).thermometerBg = thermometerBg1;
    }

}
