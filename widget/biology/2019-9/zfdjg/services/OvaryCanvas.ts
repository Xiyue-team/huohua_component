import {fabric} from 'fabric';
import * as ovaryTotal from '../sub_static/ovaryTotal.png';
import * as ovary from '../sub_static/ovary.png';
import * as ovaryWall from '../sub_static/ovaryWall.png';
import * as ovule from '../sub_static/ovule.png';
import * as plantsWere from '../sub_static/plantsWere.png';
import * as stigma from '../sub_static/stigma.png';
import * as stylet from '../sub_static/stylet.png';

import { OvaryConfig } from './OvaryConfig';
import { Linear, TweenMax } from 'gsap';

export default class OvaryCanvas {
    config: OvaryConfig;
    myCanvas: fabric.Canvas;
    zoom = 1;
    isAnimation: boolean;
    ovaryTotalImage: fabric.Image;
    ovaryImage: any = [];
    textTitle: any = [];
    text: any = [];
    textLine: any = [];
    zoomOutAnimation: any;
    constructor() {
      this.isAnimation = false;
      this.textTitle = window.env.browserInfo.lang.text_Detail;

      const radito = window.innerWidth / window.innerHeight;
      const uiRadito = 16 / 9;
      let width;
      let height;
      if (radito > uiRadito) {
          height = window.innerHeight;
          width = 16 * height / 9;
          this.zoom = height / 576;
      } else {
          width = window.innerWidth;
          height = 9 * width / 16;
          this.zoom = width / 1024;
      }

      (document.getElementById('canvas') as any).width = width;
      (document.getElementById('canvas') as any).height = height;

      this.myCanvas = new fabric.Canvas('canvas');
      this.myCanvas.hoverCursor = 'default';
      this.myCanvas.selection = false;

      this.config = new OvaryConfig();

      this.initImageResource();
      this.initCanvasScale();
    }

    initCanvasScale() {
      this.myCanvas.setZoom(this.zoom);
    }

    async initImageResource() {
      this.ovaryTotalImage = await this.loadImage(ovaryTotal as any, this.config.initImageConfig);
      this.ovaryTotalImage.opacity = 1;
      this.myCanvas.add(this.ovaryTotalImage);
      //柱头
      this.ovaryImage[0] = await this.loadImage(stigma as any, this.config.initImageConfig);
      //花柱
      this.ovaryImage[1] = await this.loadImage(stylet as any, this.config.initImageConfig);
      //子房
      this.ovaryImage[2] = await this.loadImage(ovary as any, this.config.initImageConfig);
      //子房壁
      this.ovaryImage[3] = await this.loadImage(ovaryWall as any, this.config.initImageConfig);
      //株被
      this.ovaryImage[4] = await this.loadImage(plantsWere as any, this.config.initImageConfig);
      //胚珠
      this.ovaryImage[5] = await this.loadImage(ovule as any, this.config.initImageConfig);
      //指示文字
      this.text[0] = new fabric.Text(this.textTitle[0], this.config.textConfig[0]);
      this.text[1] = new fabric.Text(this.textTitle[1], this.config.textConfig[1]);
      this.text[2] = new fabric.Text(this.textTitle[2], this.config.textConfig[2]);
      //文字指向线条
      this.textLine[0] = new fabric.Line([280, 295, 495, 295], this.config.textLineConfig[0]);
      this.textLine[1] = new fabric.Line([280, 360, 490, 360], this.config.textLineConfig[0]);
      this.textLine[2] = new fabric.Line([280, 410, 440, 410], this.config.textLineConfig[0]);

      for (let i = 0; i < this.ovaryImage.length; i++) {
        this.myCanvas.add(this.ovaryImage[i]);
      }
      for (let i = 0; i < this.textLine.length; i++) {
        this.myCanvas.add(this.textLine[i]);
        this.myCanvas.add(this.text[i]);
      }
      this.setTextEnable(false);
    }

    setTextEnable(enable: boolean) {
      for (let index = 0; index < this.textLine.length; index++) {
        this.textLine[index].visible = enable;
        this.text[index].visible = enable;
        this.textLine[index].bringToFront();
        this.text[index].bringToFront();
      }
    }
    setImageAnimation(index: any) {
      const tween = {
        scale: this.ovaryImage[0].scaleX,
        top: this.ovaryImage[0].top,
      };
      const target = {
        scale: this.config.initImageConfig.scaleX,
        top: this.config.initImageConfig.top,
      };
      if (index === 5) {
        target.scale = this.config.zoomOutConfig.scaleX;
        target.top = this.config.zoomOutConfig.top;
      }

      this.setTextEnable(false);
      this.initAnimation(tween, target, index);
    }

    initAnimation(tween: any, target: any, index: number) {
      //防止动画过程中反复执行动画
      if (this.isAnimation) {
        return;
      }
      let time = 1;
      if (tween.scale === target.scale) {
        time = 0.1;
      }
      this.zoomOutAnimation = TweenMax.to(tween,  time, {
        scale: target.scale,
        top: target.top,
        onUpdate: () => {
          this.isAnimation = true;
          for (let i = 0; i < this.ovaryImage.length; i++) {
            this.ovaryImage[i].scale(tween.scale);
            this.ovaryImage[i].top = tween.top;
            this.ovaryTotalImage.scale(tween.scale);
            this.ovaryTotalImage.top = tween.top;
          }
          this.myCanvas.renderAll();
        },
        onComplete: () => {
          this.ovaryTotalImage.opacity = 0;
          for (let i = 0; i < this.ovaryImage.length; i++) {
            this.ovaryImage[i].opacity = 0;
          }
          this.ovaryImage[index].opacity = 1;
          this.ovaryImage[index].bringToFront();

          if (index === 5) {
            this.setTextEnable(true);
          }
          this.myCanvas.renderAll();
          this.isAnimation = false;
        },
        paused: true,
        ease:  Linear.easeOut, //线性动画
        repeat: 0 //执行次数 -1 等于infinite
      });
      this.zoomOutAnimation.play();
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
      this.zoomOutAnimation.progress(0);
      this.zoomOutAnimation.pause();
      this.zoomOutAnimation = null;
      for (let i = 0; i < this.ovaryImage.length; i++) {
        this.ovaryImage[i].scale(this.config.initImageConfig.scaleX);
        this.ovaryImage[i].top = this.config.initImageConfig.top;
        this.ovaryImage[i].opacity = 0;
        this.ovaryTotalImage.scale(this.config.initImageConfig.scaleX);
        this.ovaryTotalImage.top = this.config.initImageConfig.top;
      }
      this.setTextEnable(false);
      this.ovaryTotalImage.opacity = 1;
      this.myCanvas.renderAll();
      this.isAnimation = false;
    }
}
