import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';

/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/1 16:46
 */
export  class GyszdxcViewHandlerForPc extends CommonViewHandler implements ViewHandler{
    //快进期间的帧数
    private ticks = 25;
    //快进或快退中每帧间隔的毫秒数
    private frms = 16000 / 193; //视频总时长除关键帧数（毫秒）
    //快进的时间(以秒为单位)
    private endtime: number

    constructor(vm: Vue) {
        super(vm);
        //this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    domReady() {
        ViewController.getInstance().hideLoading();
        this.initVideo();
    }

    resize() {
        super.resize();
    }

    initVideo() {
        (document.getElementById('animationVideo') as HTMLVideoElement).addEventListener("timeupdate", () =>{
            if((window as any).viewHandler.viewModel.$data.sliderNum === 193 && (window as any).viewHandler.viewModel.$data.isPlay === false){
                (window as any).viewHandler.viewModel.$data.sliderNum = 1;
            }
            const currentTime = (document.getElementById('animationVideo') as HTMLVideoElement).currentTime;
            const rate = currentTime/16;
            const progress = Number.parseInt( (rate*193).toFixed(0)) ;
            (window as any).viewHandler.viewModel.$data.sliderNum = progress > 193 ? 193 : (progress === 0 ? 1 : progress);
            //console.log((document.getElementById('animationVideo') as HTMLVideoElement).ended);
            if((document.getElementById('animationVideo') as HTMLVideoElement).ended){
                (window as any).viewHandler.viewModel.$data.isPlay = false;

            }
        });
    }

    playAndPause(isPlay:boolean) {
        if( isPlay ){
            (document.getElementById('animationVideo') as HTMLVideoElement).play();
        } else {
            (document.getElementById('animationVideo') as HTMLVideoElement).pause();
        }

    }

    setAnimationImgPosition(number: number, lastNumber: number) {
     /*   this.endtime = 16 / number;
        const tdelta = ((this.endtime - (document.getElementById('animationVideo') as HTMLVideoElement).currentTime)) / this.ticks
        for ( var i = 0; i < this.ticks; ++i )
        {
            ((j) => {
                setTimeout(() => {
                    (document.getElementById('animationVideo') as HTMLVideoElement).currentTime
                        = (document.getElementById('animationVideo') as HTMLVideoElement).currentTime + tdelta * j;
                }, j * this.frms);
            })(i);
        }*/
        if((document.getElementById('animationVideo') as HTMLVideoElement).paused){
            const currentTime = number/193 * 16;

            (document.getElementById('animationVideo') as HTMLVideoElement).currentTime = currentTime;
        }
        // (window as any).viewHandler.viewModel.$data.isPlay = false;

        //(document.getElementById('animationVideo') as HTMLVideoElement).currentTime = number/193;
        //(document.getElementById('animationVideo')
    }

    //重置页面
    reset() {
        super.reset();
        (window as any).viewHandler.viewModel.$data.isPlay = false;
        (window as any).viewHandler.viewModel.$data.sliderNum = 1;
    /*    (window as any).viewHandler.viewModel.$data.sliderNum = 1;
        (window as any).viewHandler.viewModel.$data.isPlay = false;
        this.ctrl = false;
        if ( this.timerId ) {
            clearInterval(this.timerId);
            this.timerId = null;
        } else {
            return;
        }*/
    }

}