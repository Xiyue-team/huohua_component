/**
 *
 *@since 2.0
 *@author kyy
 *@Date 2019/12/20 11:11
 */
import {StepVideo} from '../entity/StepVideo';

export class VideoHelper {

    // 加载配置文件 形成 VideoStep 对象
    public static init(): StepVideo {
        const config = require('../sub_static/config.json');
        const stepVideo: StepVideo = new StepVideo();
        stepVideo.name = config.name;
        stepVideo.file = config.file;
        stepVideo.totalTime = config.totalTime;
        stepVideo.steps = [];

        for (const step of config.steps) {
         
            stepVideo.steps.push(step);
        }
        return stepVideo;
    }
}
