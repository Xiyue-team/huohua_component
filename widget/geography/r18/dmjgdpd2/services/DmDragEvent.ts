import {DmCanvas} from './DmCanvas';

import * as Konva from 'konva';
import {DmConfig} from './DmConfig';
import { Linear, TweenMax } from 'gsap';
const videojs = require('video.js/dist/video.js');

export class DmDragEvent {

    private dmCanvas: DmCanvas;
    private dmConfig: DmConfig;

    el: any;

    showTipsBoolean = true;

    timeOut: any;

    videoJs: any = [];

    constructor(dmCanvas: DmCanvas) {
        this.dmCanvas = dmCanvas;
        this.dmConfig = new DmConfig();

        this.videoJs[0] = videojs(document.querySelector('#myvideo1'));
        this.videoJs[1] = videojs(document.querySelector('#myvideo2'));
        this.videoJs[2] = videojs(document.querySelector('#myvideo3'));
        this.videoJs[3] = videojs(document.querySelector('#myvideo4'));
        this.videoJs[4] = videojs(document.querySelector('#myvideo5'));
        this.videoJs[5] = videojs(document.querySelector('#myvideo6'));
    }

    // 绑定拖动事件
    imageClick(image: Konva.Image, image2: Konva.Image, videoUrl: any, currentIndex: any) {
        this.imageMouseoverAndMouseout(image);
        this.imageMouseoverAndMouseout(image2);

        this.imageClickEvent(image, videoUrl, currentIndex);
        this.imageClickEvent(image2, videoUrl, currentIndex);
    }

    imageMouseoverAndMouseout(image: Konva.Image) {
      image.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });

      image.on('mouseout', () => {
        document.body.style.cursor = 'default';
      });
    }

    imageClickEvent(image: Konva.Image, videoUrl: string, currentIndex: any) {
      image.on('click tap', () => {
        (window as any).viewHandler.viewModel.$data.showBox = false;
        (window as any).viewHandler.viewModel.$data.showVideoShowPage = true;
        (window as any).viewHandler.viewModel.$data.videoUrl = videoUrl;

        (window as any).viewHandler.viewModel.$data.currentIndex = currentIndex;
        (window as any).viewHandler.viewModel.$data.currentIndex2 = currentIndex;

        this.timeOut = setTimeout(() => {
          (window as any).viewHandler.viewModel.$data.currentIndex2 = 0;
          (window as any).viewHandler.viewModel.$data.showVideo = true;
          this.videoJs[currentIndex - 1].play();
        }, 1000);
      });
    }

    clearTimeOutEvent() {
      clearTimeout(this.timeOut);
      // console.log('结束');
      for (let i = 0; i < this.videoJs.length; i++) {
        this.videoJs[i].pause();
        this.videoJs[i].currentTime(0);
        // console.log(this.videoJs[i].currentTime());
      }
    }

}

