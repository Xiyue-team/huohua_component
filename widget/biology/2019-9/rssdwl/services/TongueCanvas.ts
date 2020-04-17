import {fabric} from 'fabric';
import * as nerve from '../sub_static/nerve.png';
import * as papilla from '../sub_static/papilla.png';
import * as tongue from '../sub_static/tongue.png';
import * as videoCoverImg from '../sub_static/videoCoverImg.png';
import { TongueConfig } from './TongueConfig';
import { Linear, TweenMax } from 'gsap';

export default class TongueCanvas {
  config: TongueConfig;
  myCanvas: fabric.Canvas;
  zoom = 1;
  scale = 1;
  tongueImage: any = [];
  line: any = [];
  circlrPoint: any = [];
  clickPoint: any = [];
  zoomInAnimation: any;
  zoomOutAnimation: any;

  constructor() {

    this.initCanvas();
    this.config = new TongueConfig();
    this.initImageResource();
    this.resize();
  }

  initCanvas() {
    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scale = width / height > 16 / 9 ? height / 576 : width / 1024;

    this.myCanvas.setWidth(1024 * this.scale);
    this.myCanvas.setHeight(576 * this.scale);
    this.myCanvas.setZoom(this.scale);
    this.myCanvas.renderAll();

    const container = document.getElementById('3dContainer').children[0];
    (container as any).style.top = '50%';
    (container as any).style.left = '50%';
    (container as any).style.transform = 'translate(-50%, -50%)';
    (document.querySelector('.videoBox') as any).style.transform = 'scale(' + this.scale + ')';

  }
  //初始化图片
   initImageResource() {
      this.initLine();
      this.loadImage(tongue as any, this.config.imageConfig[0]).then( (tongueObject) => {
        this.tongueImage[0] = tongueObject;
        this.myCanvas.add(this.tongueImage[0]);
        this.myCanvas.add(this.line[0]);
        this.myCanvas.add(this.circlrPoint[0]);
        this.myCanvas.add(this.clickPoint[0]);
      });
      this.loadImage(papilla as any, this.config.imageConfig[1]).then( (tongueObject) => {
        this.tongueImage[1] = tongueObject;
        this.myCanvas.add(this.tongueImage[1]);
        this.myCanvas.add(this.line[1]);
        this.myCanvas.add(this.circlrPoint[1]);
        this.myCanvas.add(this.clickPoint[1]);
      });
      this.loadImage(nerve as any, this.config.imageConfig[2]).then( (tongueObject) => {
        this.tongueImage[2] = tongueObject;
        this.myCanvas.add(this.tongueImage[2]);
        this.myCanvas.add(this.line[2]);
        this.myCanvas.add(this.circlrPoint[2]);
        this.myCanvas.add(this.clickPoint[2]);
      });
      this.loadImage(videoCoverImg as any, this.config.imageConfig[3]).then( (tongueObject) => {
        this.tongueImage[3] = tongueObject;
        this.myCanvas.add(this.tongueImage[3]);
      });
      this.initEvent();
  }

  //初始化线条和点击点
  initLine() {
    this.line[0] = new fabric.Line([350, 275, 443, 275], this.config.lineConfig);
    this.circlrPoint[0] = new fabric.Circle(this.config.circleConfig[0]);
    this.clickPoint[0] = new fabric.Circle(this.config.clickCircleConfig[0]);
    this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible =  true;

    this.line[1] = new fabric.Line([320, 345, 455, 345], this.config.lineConfig);
    this.circlrPoint[1] = new fabric.Circle(this.config.circleConfig[1]);
    this.clickPoint[1] = new fabric.Circle(this.config.clickCircleConfig[1]);
    this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible = false;

    this.line[2] = new fabric.Line([255, 170, 405, 170], this.config.lineConfig);
    this.circlrPoint[2] = new fabric.Circle(this.config.circleConfig[2]);
    this.clickPoint[2] = new fabric.Circle(this.config.clickCircleConfig[2]);
    this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible = false;
  }

  //初始化点击事件
  initEvent() {
    this.clickPoint[0].on('mousedown', () => {
      this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible = false;
      this.tongueImage[1].opacity = 1;
      this.setPapillAnimation(0);
    });

    this.clickPoint[1].on('mousedown', () => {
      this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible =  false;
      this.tongueImage[2].opacity = 1;
      this.setPapillAnimation(1);
    });
    this.clickPoint[2].on('mousedown', () => {
      this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible =  false;
      this.tongueImage[3].opacity = 1;
      this.setPapillAnimation(2);
    });
  }

  //设置图片渐变动画
  setPapillAnimation(index: any) {
    const tween = {
      opacity: this.tongueImage[index].opacity,
    };
    this.zoomInAnimation = TweenMax.to(tween,  1, {
      opacity: 0,
      onUpdate: () => {
        this.tongueImage[index].opacity = tween.opacity;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        this.tongueImage[index].scale(this.config.zoomInConfig.scaleX);
        this.tongueImage[index].top = this.config.zoomInConfig.top;
        this.tongueImage[index].left = this.config.zoomInConfig.left;
        this.tongueImage[index].opacity = 1;
        if (index - 1 >= 0) {
          this.tongueImage[(index - 1)].opacity = 0;
        }
        this.setZoomAnimation((index + 1));
        this.myCanvas.renderAll();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    this.zoomInAnimation.play();
  }
  //设置图片放大动画
  setZoomAnimation(index: any) {
    const tween = {
      scale: this.tongueImage[index].scaleX,
      top: this.tongueImage[index].top,
      left: this.tongueImage[index].left
    };
    this.zoomOutAnimation = TweenMax.to(tween,  1, {
      scale: this.config.tongueImageConfig.scaleX,
      top: this.config.tongueImageConfig.top,
      left: this.config.tongueImageConfig.left,
      onUpdate: () => {
        this.tongueImage[index].scale(tween.scale);
        this.tongueImage[index].top = tween.top;
        this.tongueImage[index].left = tween.left;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        if (index > 2) {
          this.tongueImage[index].opacity = 0;
          (window as any).viewHandler.viewModel.$data.showPlayButton = true;
          (window as any).viewHandler.viewModel.$data.videoActive = true;
        } else {
          this.line[index].visible = this.circlrPoint[index].visible = this.clickPoint[index].visible = true;
        }
        this.myCanvas.renderAll();
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

  resetImageConfig() {
    for (let index = 0; index < this.tongueImage.length; index++) {
      this.tongueImage[index].scale(this.config.imageConfig[index].scaleX);
      this.tongueImage[index].left = this.config.imageConfig[index].left;
      this.tongueImage[index].top = this.config.imageConfig[index].top;
      this.tongueImage[index].opacity = this.config.imageConfig[index].opacity;
    }
    this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible = true;
    this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible =  false;
    this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible =  false;
    this.myCanvas.renderAll();
  }

  reset() {
      if (this.zoomInAnimation) {
        this.zoomInAnimation.progress(0);
        this.zoomInAnimation.pause();
        this.zoomInAnimation = null;
      }
      if (this.zoomOutAnimation) {
        this.zoomOutAnimation.progress(0);
        this.zoomOutAnimation.pause();
        this.zoomOutAnimation = null;
      }
      this.resetImageConfig();
  }
}
