import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {ControlBar} from './ControlBar';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {StepVideo} from '../entity/StepVideo';
import {NavigatorBar} from './NavigatorBar';
import {VideoHelper} from './VideoHelper';


export class ViewHandler extends CommonViewHandler implements ViewHandler {
    stepVideo: StepVideo;
    controlBar: ControlBar;
    naviBar: NavigatorBar;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {

        super.domReady();
        this.stepVideo = VideoHelper.init();

        this.controlBar = new ControlBar(this.stepVideo);
        this.naviBar    = new NavigatorBar(this.stepVideo);
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        (this.viewModel as any).resize();
        super.resize();
    }

    //重置页面
    reset() {

        (this.viewModel as any).resetEvent();
        super.reset();
    }

}
