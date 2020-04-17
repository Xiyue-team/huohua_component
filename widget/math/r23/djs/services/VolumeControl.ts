
import * as music from '../sub_static/startMusic.mp3';
import * as finishMusic from '../sub_static/finishMusic.mp3';

export class VolumeControl {

  private context: any;

  private buffer: any;
  gainNode: any;

  isPlay: boolean;
  isFinish: boolean;
  isFinishPlay: boolean;



  constructor() {
    this.init();
    this.isPlay = false;
    this.isFinish = false;
    this.isFinishPlay = false;
  }

  init() {
    // this.initIosAudioPlay();
  }

  preload() {
    console.log(music);
  }


  /*
  * ios声音控制适配
  * */
  initIosAudioPlay() {
    this.initAudio();

  }

  initAudio() {
    if (this.isPlay) {
      return;
    }
    let audioBuffer: any = null;
    if (typeof (window as any).webkitAudioContext !== 'undefined' || typeof (window as any).AudioContext !== 'undefined') {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audio_ctx = new AudioContext();

      const request = new XMLHttpRequest();
      request.open('GET', (music as any), true);

      request.responseType = 'arraybuffer';

      request.onload = () => {
        audio_ctx.decodeAudioData(request.response, (buffer: any) => {
          console.log('success');
          audioBuffer = buffer;
          this.context = audio_ctx;
          this.buffer = audioBuffer;
          this.playSound(true);
        }, () => {
          console.log('error');
        });
      };
      request.send();
    }
    this.isPlay = true;
  }

  initFinishAudio() {
    if (this.isFinishPlay) {
      return;
    }
    let audioBuffer: any = null;
    if (typeof (window as any).webkitAudioContext !== 'undefined' || typeof (window as any).AudioContext !== 'undefined') {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audio_ctx = new AudioContext();

      const request = new XMLHttpRequest();
      request.open('GET', (finishMusic as any), true);

      request.responseType = 'arraybuffer';

      request.onload = () => {
        audio_ctx.decodeAudioData(request.response, (buffer: any) => {
          console.log('success');
          audioBuffer = buffer;
          this.context = audio_ctx;
          this.buffer = audioBuffer;
          this.playSound(false);
        }, () => {
          console.log('error');
        });
      };
      request.send();
    }
    this.isPlay = true;
  }


  playSound(isLoop: boolean) {
    if (!this.context.hasOwnProperty('createGain')) {
      console.log(22);
    }
    this.gainNode = this.context.createGain();
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;

    source.connect(this.gainNode);
    source.loop = isLoop;
    this.gainNode.connect(this.context.destination);
    source.start(0);
  }

  resumeVolume() {
    this.context.resume(this.context.currentTime);
  }

  pauseVolume() {
    this.context.suspend(this.context.currentTime);
  }

  destoryVolume() {
    if (this.isFinish) {
        return;
    }
    this.context.close();
    this.initFinishAudio();
    this.isFinish = true;
  }
}
