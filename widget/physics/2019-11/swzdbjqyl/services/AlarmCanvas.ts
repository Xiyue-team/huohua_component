import {fabric} from 'fabric';
import * as greenBulbImg from '../sub_static/greenBulb.png';
import * as redBulbImg from '../sub_static/redBulb.png';
import * as cupImg from '../sub_static/cup.png';
import { AlarmConfig } from './AlarmConfig';
import { Linear, TweenMax } from 'gsap';

export default class AlarmCanvas {
  config: AlarmConfig;
  myCanvas: fabric.Canvas;
  scale = 1;
  alarmImage: any = [];
  heightAnimation: any;
  powerTitle: any;
  waterRect: any;
  isReset = false;
  targetWaterHeight = 133;

  constructor() {
    this.powerTitle = window.env.browserInfo.lang.powerText;
    this.init();

  }

  initCanvas() {
    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

    this.myCanvas.setWidth(1200 * this.scale);
    this.myCanvas.setHeight(675 * this.scale);
    this.myCanvas.setZoom(this.scale);
    this.myCanvas.renderAll();

    const container = document.getElementById('3dContainer').children[0];
    (container as any).style.top = '50%';
    (container as any).style.left = '50%';
    (container as any).style.transform = 'translate(-50%, -50%)';
  }

  async init() {
    this.initCanvas();
    this.config = new AlarmConfig();
    await this.initImageResource();
    this.resize();
  }

  //初始化图片
  async initImageResource() {
    this.alarmImage[0] = await this.loadImage(greenBulbImg as any, this.config.imageConfig[0]);
    this.alarmImage[1] = await this.loadImage(cupImg as any, this.config.imageConfig[0]);
    this.alarmImage[2] = await this.loadImage(redBulbImg as any, this.config.imageConfig[1]);
    this.alarmImage[2].visible = false;
    this.myCanvas.add(this.alarmImage[0]);
    this.myCanvas.add(this.alarmImage[2]);
    this.initRect();
    this.myCanvas.add(this.alarmImage[1]);
    this.initText();
  }

  //初始化电源文字
  initText() {
    const leftText = new fabric.Text(this.powerTitle, this.config.textConfig[0]);
    const rightText = new fabric.Text(this.powerTitle, this.config.textConfig[1]);

    this.myCanvas.add(leftText);
    this.myCanvas.add(rightText);
  }

  //初始化水位问题
  initRect() {
    this.waterRect = new fabric.Rect(this.config.rectConfig);
    this.myCanvas.add(this.waterRect);
  }

  //设置水位变化
  setWaterHeightAnimation(targetHeight: any) {
    const tween = {
      height: this.waterRect.height
    };
    
    this.heightAnimation = TweenMax.to(tween,  2.5, {
      height: targetHeight,
      onUpdate: () => {
        //防止动画未被暂停
        if (this.isReset) {
          return;
        }
        this.waterRect.set('height', tween.height);
        this.waterRect.setCoords();
        if (tween.height >= this.targetWaterHeight) {
          this.alarmImage[0].visible = false;
          this.alarmImage[2].visible = true;
        } else {
          this.alarmImage[0].visible = true;
          this.alarmImage[2].visible = false;
        }
        (window as any).viewHandler.viewModel.$data.waterHeight = tween.height;
        this.myCanvas.renderAll();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    this.heightAnimation.play();
  }

  loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
    return new Promise<fabric.Image>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const imgObj = new fabric.Image(img, imageConfig);
        resolve(imgObj);
      };
      img.src = src;
    });
  }

  reset() {
    this.isReset = true;
    if (this.heightAnimation) {
      this.heightAnimation.kill();
      this.heightAnimation.progress(0);
      this.heightAnimation.pause();
      this.heightAnimation = null;
    }
    this.waterRect.set('height', 20);
    this.waterRect.setCoords();

    this.alarmImage[0].visible = true;
    this.alarmImage[2].visible = false;
    this.myCanvas.renderAll();
  }
}
