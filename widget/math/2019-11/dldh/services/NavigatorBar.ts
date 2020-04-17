import {StepVideo} from '../entity/StepVideo';

/**
 *
 *@since 3.0
 *@author kyy
 *@date 2019/12/19 16:07
 */
export class NavigatorBar {

    stepVideo: StepVideo;

    constructor(stepVideo: StepVideo) {
        this.stepVideo = stepVideo;
    }

    //导航按钮的显示控制
    play() {
        (window as any).viewHandler.viewModel.$data.showNavigatorBar = false;
        (window as any).viewHandler.viewModel.$data.showControlBar   = true;
    }


}
