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
    mainContent: any;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {

        super.domReady();
        this.stepVideo = VideoHelper.init();
        this.controlBar = new ControlBar(this.stepVideo);
        this.naviBar    = new NavigatorBar(this.stepVideo);
        this.mainContent = document.getElementsByClassName('main-content')[0];
        ViewController.getInstance().hideLoading(1000);
        this.resize();
    }

    //改变窗口
    resize() {
        (this.viewModel as any).resize();
        const scaleX = window.innerWidth / (1200);
        const scaleY = window.innerHeight / (807);
        if ((807) * scaleX <= window.innerHeight) {
            this.mainContent.style.transform = 'scale(' + (scaleX - 0.15) + ')';

        } else if ((1200) * scaleY <= window.innerWidth) {
            this.mainContent.style.transform = 'scale(' + (scaleY - 0.15) + ')';

        }
    }

    //重置页面
    reset() {

        (this.viewModel as any).resetEvent();
        super.reset();
    }

}
