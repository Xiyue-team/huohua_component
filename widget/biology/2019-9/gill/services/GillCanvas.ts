import {fabric} from 'fabric';
import * as fish from '../sub_static/fish.png';
import * as gill from '../sub_static/gill.png';
import * as gillDetail from '../sub_static/gillDetail.png';
import * as gillLine from '../sub_static/gillLine.png';
import * as gillDetailLine from '../sub_static/gillDetailLine.png';
import { GillConfig } from './GillConfig';
import { Linear, TweenMax } from 'gsap';

export default class GillCanvas {
  config: GillConfig;
  myCanvas: fabric.Canvas;
  zoom = 1;
  gillImage: any = [];
  gillLine: any = [];
  hitPoint: any = [];
  gillText: any = [];
  gillDetailText: any = [];
  lastText: any = [];
  zoomInAnimation: any;
  gill_Title1: any = [];
  gill_Title2: any = [];
  gill_Detail: any;

  constructor() {
    this.gill_Title1 = window.env.browserInfo.lang.gill_Title1;
    this.gill_Title2 = window.env.browserInfo.lang.gill_Title2;
    this.gill_Detail = window.env.browserInfo.lang.gill_Detail;
    (document.getElementById('canvas') as any).width = window.innerWidth;
    (document.getElementById('canvas') as any).height = window.innerHeight;

    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;

    this.config = new GillConfig();

    this.initImageResource();
  }

  async initImageResource() {
    this.gillImage[0] = await this.loadImage(fish as any, this.config.backgroundConfig);
    this.gillImage[1] = await this.loadImage(gill as any, this.config.gillImageConfig);
    this.gillImage[2] = await this.loadImage(gillDetail as any, this.config.gillDetailImageConfig);

    this.gillLine[0] = await this.loadImage(gillLine as any, this.config.gillImageConfig);
    this.gillLine[1] = await this.loadImage(gillDetailLine as any, this.config.gillDetailImageConfig);

    this.myCanvas.add(this.gillImage[0]);
    this.myCanvas.add(this.gillLine[0]);
    this.myCanvas.add(this.gillImage[1]);
    this.myCanvas.add(this.gillLine[1]);
    this.myCanvas.add(this.gillImage[2]);
    this.initHitPoint();
    this.initgillText();
    this.initEvent();
  }

  initHitPoint() {
    this.hitPoint[0] = new fabric.Circle(this.config.circleConfig[0]);
    this.hitPoint[1] = new fabric.Circle(this.config.circleConfig[1]);
    this.myCanvas.add(this.hitPoint[0]);
    this.myCanvas.add(this.hitPoint[1]);
  }

  initgillText() {
    this.gillText[0] = new fabric.Text(this.gill_Title1[0], this.config.gillText[0]);
    this.gillText[1] = new fabric.Text(this.gill_Title1[1], this.config.gillText[1]);
    this.gillText[2] = new fabric.Text(this.gill_Title1[2], this.config.gillText[2]);

    this.gillText[3] = new fabric.Text(this.gill_Title2[0], this.config.gillText[3]);
    this.gillText[4] = new fabric.Text(this.gill_Title2[1], this.config.gillText[4]);
    this.gillText[5] = new fabric.Text(this.gill_Title2[2], this.config.gillText[5]);

    this.lastText = new fabric.Text(this.gill_Detail, this.config.gillText[6]);

    this.myCanvas.add(this.lastText);

    for (let index = 0; index < this.gillText.length; index++) {
      this.myCanvas.add(this.gillText[index]);
    }
  }

  //初始化点击事件
  initEvent() {
    this.hitPoint[0].on('mousedown', () => {
      this.hitPoint[0].visible = this.gillLine[0].visible = this.gillImage[0].visible = false;
      this.setTextDisable(false, false);

      const tween = {
        scaleX: this.config.gillImageConfig.scaleX,
        scaleY: this.config.gillImageConfig.scaleY,
        left: this.config.gillImageConfig.left,
        top: this.config.gillImageConfig.top,
      };
      const target = {
        scaleX: this.config.gillImageConfig.scaleX * 0.25,
        scaleY: this.config.gillImageConfig.scaleY * 0.25,
        left: (window.innerWidth * 0.04),
        top: (window.innerHeight * 0.65),
      };
      this.initAniamtion(tween, target, 1);
    });
    this.hitPoint[1].on('mousedown', () => {
      this.hitPoint[1].visible = this.gillLine[1].visible = this.gillImage[1].visible = false;
      this.setTextDisable(false, false);

      const tween = {
        scaleX: this.config.gillDetailImageConfig.scaleX,
        scaleY: this.config.gillDetailImageConfig.scaleY,
        left: this.config.gillDetailImageConfig.left,
        top: this.config.gillDetailImageConfig.top,
      };
      const target = {
        scaleX: this.config.gillDetailImageConfig.scaleX * 0.25,
        scaleY: this.config.gillDetailImageConfig.scaleY * 0.25,
        left: (window.innerWidth * 0.04),
        top: (window.innerHeight * 0.65),
      };
      this.initAniamtion(tween, target, 2);
    });
  }


  setTextDisable(enable: boolean, disable: boolean) {
    this.gillText[0].visible = enable;
    this.gillText[1].visible = enable;
    this.gillText[2].visible = enable;

    this.gillText[3].visible = disable;
    this.gillText[4].visible = disable;
    this.gillText[5].visible = disable;
  }

  setFishAniamtion() {
    const tween = {
      scaleX: this.config.backgroundConfig.scaleX,
      scaleY: this.config.backgroundConfig.scaleY,
      left: this.config.backgroundConfig.left,
      top: this.config.backgroundConfig.top,
    };
    const target = {
      scaleX: this.config.backgroundConfig.scaleX * 0.25,
      scaleY: this.config.backgroundConfig.scaleY * 0.25,
      left: 0,
      top: (window.innerHeight * 0.62),
    };
    this.initAniamtion(tween, target, 0);
  }

  initAniamtion(tween: any, target: any, index: number) {
      this.zoomInAnimation = TweenMax.to(tween,  1, {
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        top: target.top,
        left: target.left,
        onUpdate: () => {
          this.gillImage[index].scaleX = tween.scaleX;
          this.gillImage[index].scaleY = tween.scaleY;
          this.gillImage[index].left = tween.left;
          this.gillImage[index].top = tween.top;
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          this.setTextDisable((index === 0),  (index === 1));
          if (index < 2) {
            this.gillLine[index].visible = true;
            this.gillLine[index].bringToFront();
            this.hitPoint[index].visible = true;
            this.hitPoint[index].bringToFront();
            this.gillImage[(index + 1)].visible = true;
          } else {
            this.lastText.visible = true;
            (window as any).viewHandler.viewModel.changeVideo();
          }
          if (index > 0) {
            this.hitPoint[(index - 1)].visible = false;
          }
          this.myCanvas.renderAll();
        },
        paused: true,
        ease:  Linear.easeOut, //线性动画
        repeat: 0 //执行次数 -1 等于infinite
      });
      this.zoomInAnimation.play();
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

  resetImageConfig() {
    this.gillImage[0].left = this.config.backgroundConfig.left;
    this.gillImage[0].top = this.config.backgroundConfig.top;
    this.gillImage[0].scaleX = this.config.backgroundConfig.scaleX;
    this.gillImage[0].scaleY = this.config.backgroundConfig.scaleY;
    this.gillImage[0].visible = true;

    this.gillImage[1].left =  this.config.gillImageConfig.left;
    this.gillImage[1].top = this.config.gillImageConfig.top;
    this.gillImage[1].scaleX = this.config.gillImageConfig.scaleX;
    this.gillImage[1].scaleY = this.config.gillImageConfig.scaleY;
    this.gillImage[1].visible = this.gillLine[0].visible = this.config.gillImageConfig.visible;

    this.gillImage[2].left =  this.config.gillDetailImageConfig.left;
    this.gillImage[2].top = this.config.gillDetailImageConfig.top;
    this.gillImage[2].scaleX = this.config.gillDetailImageConfig.scaleX;
    this.gillImage[2].scaleY = this.config.gillDetailImageConfig.scaleY;
    this.gillImage[2].visible = this.gillLine[1].visible = this.config.gillDetailImageConfig.visible;
  }

  reset() {
    this.resetImageConfig();
    this.setTextDisable(false, false);
    this.hitPoint[0].visible = this.hitPoint[1].visible = false;
    this.lastText.visible = false;
    if (this.zoomInAnimation) {
      this.zoomInAnimation.progress(0);
      this.zoomInAnimation.pause();
      this.zoomInAnimation = null;
    }
  }
}
