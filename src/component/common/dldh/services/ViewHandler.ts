import {ControlBar} from './ControlBar';
import {StepVideo} from '../entity/StepVideo';
import {NavigatorBar} from './NavigatorBar';
import {VideoHelper} from './VideoHelper';

export class ViewHandler {
    stepVideo: StepVideo;
    controlBar: ControlBar;
    naviBar: NavigatorBar;
    mainContent: any;

    //构造函数
    constructor() {

    }

    domReady(config: JSON) {
        this.stepVideo = VideoHelper.init(config);
        this.controlBar = new ControlBar(this.stepVideo);
        this.naviBar    = new NavigatorBar(this.stepVideo);
        this.mainContent = document.getElementsByClassName('main-content')[0];
        this.resize();
    }

    //改变窗口
    resize() {
        const scaleX = window.innerWidth / (1200);
        const scaleY = window.innerHeight / (807);
        if ((807) * scaleX <= window.innerHeight) {
            this.mainContent.style.transform = 'scale(' + (scaleX - 0.02) + ')';
        } else if ((1200) * scaleY <= window.innerWidth) {
            this.mainContent.style.transform = 'scale(' + (scaleY - 0.02) + ')';
        }
    }

    //重置页面
    reset() {

    }
}
