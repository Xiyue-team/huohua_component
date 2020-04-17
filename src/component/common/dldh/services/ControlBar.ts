import {StepVideo} from '../entity/StepVideo';
import videojs, {VideoJsPlayer} from 'video.js';

/**
 *
 *@since 3.0
 *@author kyy
 *@date 2019/12/19 16:07
 */
export class ControlBar {
    index: number;
    stepVideo: StepVideo;
    player: VideoJsPlayer;

    timeindex: number;

    controlindex: number;

    constructor(stepVideo: StepVideo) {
        this.stepVideo = stepVideo;
        this.initVideo();

        this.index = -1;
    }

    //初始化视频
    initVideo() {
        this.player = videojs('microVideo', {
            controls: false,
        }, () => {
            this.player.on('ended', () => {

            });
            //监听当前步骤视频的播放，并将视频播放的时间传给修改进度条的方法
            this.player.on('timeupdate', () => {
                const currentTime = this.player.currentTime();
                this.updateProgress(currentTime , this.timeindex);
            });

            const equipmentType = navigator.userAgent;
            // console.log('11111111111111111111' + equipmentType.toString());

            if (!equipmentType.includes('Chrome')) {
                this.player.on('canplay' , () => {
                    this.player.currentTime(this.stepVideo.steps[this.controlindex].start);
                    console.log('canplaycanplaycanplaycanplay:' + this.controlindex);
                    this.player.play();
                    // this.player.pause();
                });
            }

        });

    }

    //视频播放的方法。根据传入的参数判断是从头开始播放还是暂停当前的播放
    play(index: number, status: string) {
        this.player.pause();
        if (this.index !== index) {
            // this.player.currentTime(0);

            setTimeout(() => {
                this.player.currentTime(this.stepVideo.steps[index].start);
                console.log('*********', this.player.currentTime());
            }, 0);

            this.index = index;
            this.timeindex = index;
        }

        //判断当视频结束播放之后暂停播放，但是并不会设置视频播放从当前步骤的开始时间播放，点击才会从头开始播放
        if (this.player.currentTime() >= this.stepVideo.steps[index].end) {
            this.player.currentTime(this.stepVideo.steps[index].start);
            this.player.play();
        }

        if (status === 'play') {
            this.player.play();
            this.stepVideo.steps[index].isPlaying = true;
        } else if (status === 'pause') {
            this.player.pause();
            this.stepVideo.steps[index].isPlaying = false;
        }
        this.clearOtherProgress();
    }

    //视频暂停
    stop(index: number) {
        this.index = index;
        this.player.pause();
        this.timeindex = index;
    }

    //根据实时传入的视频播放时间参数修改进度条
    updateProgress(currentTime: number , index: number ) {
        //将当前视频步骤和时间传递
        this.needStop(currentTime , index);
        // 当前步骤的总时间
        const total = this.stepVideo.steps[this.index].time;
        //前一步骤的总时间
        const previousStepTime = index === 0 ? 0 : this.stepVideo.steps[this.index - 1].end;
        //(当前时间点 - 前一步骤的总时间) / 当前步骤的总时间 = 当前步骤的播放进度
        const percent = ((currentTime - previousStepTime) / total) * 100;
        (document.getElementById('progress' + this.index) as HTMLProgressElement).value = percent;
    }

    //视频播放时间是不是达到了当前步骤总时间，达到之后视频暂停.但不设置视频从头开始播放
    needStop(currentTime: number , index: number) {
        if (currentTime >= this.stepVideo.steps[this.index].end) {
            this.player.pause();
            //修改停止样式
            this.stepVideo.steps[index].isPlaying = false;
        }
    }

    //选择不同步骤的视频，清零其他部分的进度条的进度
    clearOtherProgress() {
        for (const index in this.stepVideo.steps) {
            if (this.index.toString() !== index) {
                (document.getElementById('progress' + index) as HTMLProgressElement).value = 0;
            }
        }
    }
}
