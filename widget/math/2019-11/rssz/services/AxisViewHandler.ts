import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {AxisHelper} from './AxisHelper';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewModel} from '../ViewModel';
import {ControllerLayer} from './ControllerLayer';

export class AxisViewHandler extends CommonViewHandler implements ViewHandler {
    dmCanvas: AxisHelper;
    viewModel: ViewModel;
    controllerLayer: ControllerLayer;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.dmCanvas = new AxisHelper();
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        this.dmCanvas.resize();
        super.resize();
        this.resizeEvent();
    }

    //重置页面
    reset() {
        super.reset();
        (this.viewModel as any).resetEvent();
        this.resetBtn();
    }

    //窗口大小改变事件保持
    resizeEvent() {
        if (!this.viewModel.SignOrign) {
            this.viewModel.SignOrign = true;
            this.viewModel.buttonClickEvent1();
        }
        if (!this.viewModel.SignDrag) {
            this.viewModel.SignDrag = true;
            this.viewModel.buttonClickEvent2();
        }
        if (!this.viewModel.SignUnit) {
            this.viewModel.SignUnit = true;
            this.viewModel.buttonClickEvent3();
        }
    }

    //重置事件调用方法
    resetBtn() {
        this.viewModel.SignOrign = true;
        this.viewModel.SignDrag = true;
        this.viewModel.SignUnit = true;
    }
}
