import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
// const video = require('video.js/dist/video.js');
import  video from 'video.js';

export class MyViewHandler extends CommonViewHandler implements ViewHandler {
    play1: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.play1 = video('my-video1', {
            loop: false,
            controls: false
        });
    }
   //点击按钮自身的变化
    getVideo1( offset:any){
       const thiz = this;
      if( offset === 1){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src( require("../sub_static/Video/1.mp4"))
        }else{
          (this as any).viewModel.$refs.icon.src = require("../sub_static/Video/1.mp4");
        }
        this.play1.play();
        setTimeout(()=>{
          (thiz.viewModel as any).showVideo = !(thiz.viewModel as any).showVideo;
        },100);
        //动画结束
        this.play1.on('ended', function() {
          (thiz.viewModel as any).showPlayButton = true;
        });
      } else if( offset === 2){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src( require("../sub_static/Video/2.mp4"))
        }else{
          (this as any).viewModel.$refs.icon.src = require("../sub_static/Video/2.mp4");
        }
        this.play1.play();
        setTimeout(()=>{
          (thiz.viewModel as any).showVideo = !(thiz.viewModel as any).showVideo;
        },100);
        this.play1.on('ended', function() {
          (thiz.viewModel as any).showPlayButton = true;
        });
      } else if( offset === 3){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.play1.src( require("../sub_static/Video/3.mp4"))
        }else{
          (this as any).viewModel.$refs.icon.src = require("../sub_static/Video/3.mp4");
        }
        this.play1.play();
        setTimeout(()=>{
          (thiz.viewModel as any).showVideo = !(thiz.viewModel as any).showVideo;
        },100);
        this.play1.on('ended', function() {
          (thiz.viewModel as any).showPlayButton = true;
        });
      } else if( offset === 4){
        this.play1.play();
        this.play1.on('ended', function() {
          (thiz.viewModel as any).showPlayButton = true;
        });
      }

    }
    //重置
    reset(): void {
      (this.viewModel as any).reset();
    }
}
