import {fabric} from 'fabric';
import * as intestine1 from '../sub_static/intestine1.png';
import * as intestine2 from '../sub_static/intestine2.png';
import * as intestine3 from '../sub_static/intestine3.png';
import * as intestine4 from '../sub_static/intestine4.png';
import * as intestineSmall from '../sub_static/intestine_small.png';
import * as videoCoverImg from '../sub_static/videoCoverImg.png';
import { IntestineConfig } from './IntestineConfig';
import { Linear, TweenMax } from 'gsap';

export default class IntestineCanvas {
  config: IntestineConfig;
  myCanvas: fabric.Canvas;
  zoom = 1;
  scale = 1;
  intestineImage: any = [];
  intestineSmallImage: fabric.Image;
  line: any = [];
  circlrPoint: any = [];
  clickPoint: any = [];
  zoomInAnimation: any;
  zoomOutAnimation: any;
  title: any = [];
  langTitle: any = [];

  constructor() {
      this.initCanvas();
      this.config = new IntestineConfig();
      this.initElement();
      this.resize();
  }

  initCanvas() {
    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;
    this.langTitle = window.env.browserInfo.lang.imageTitle;
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
  }

  initElement() {
    this.initLine();
    this.loadImage(intestine1 as any, this.config.imageConfig[0]).then((intestineObject) => {
      this.intestineImage[0] = intestineObject;
      this.myCanvas.add(this.intestineImage[0]);
      this.myCanvas.add(this.line[0]);
      this.myCanvas.add(this.circlrPoint[0]);
      this.myCanvas.add(this.clickPoint[0]);
      this.myCanvas.add(this.title[0]);
    });
    this.loadImage(intestine2 as any, this.config.imageConfig[1]).then((intestineObject) => {
      this.intestineImage[1] = intestineObject;
      this.myCanvas.add(this.intestineImage[1]);
      this.myCanvas.add(this.line[1]);
      this.myCanvas.add(this.circlrPoint[1]);
      this.myCanvas.add(this.clickPoint[1]);
      this.myCanvas.add(this.title[1]);
    });
    this.loadImage(intestine3 as any, this.config.imageConfig[2]).then((intestineObject) => {
      this.intestineImage[2] = intestineObject;
      this.myCanvas.add(this.intestineImage[2]);
      this.myCanvas.add(this.line[2]);
      this.myCanvas.add(this.circlrPoint[2]);
      this.myCanvas.add(this.clickPoint[2]);
      this.myCanvas.add(this.title[2]);
    });
    this.loadImage(intestine4 as any, this.config.imageConfig[3]).then((intestineObject) => {
      this.intestineImage[3] = intestineObject;
      this.myCanvas.add(this.intestineImage[3]);
      this.myCanvas.add(this.line[3]);
      this.myCanvas.add(this.circlrPoint[3]);
      this.myCanvas.add(this.clickPoint[3]);
      this.myCanvas.add(this.title[3]);
    });
    this.loadImage(videoCoverImg as any, this.config.imageConfig[4]).then((intestineObject) => {
      this.intestineImage[4] = intestineObject;
      this.myCanvas.add(this.intestineImage[4]);
      this.myCanvas.add(this.title[4]);
    });
    this.loadImage(intestineSmall as any, this.config.smallImageConfig).then((intestineObject) => {
      this.intestineSmallImage = intestineObject;
      this.myCanvas.add(this.intestineSmallImage);
    });
    this.initEvent();


  }
  //初始化线条和点击点
  initLine() {
    this.line[0] = new fabric.Line([370, 338, 485, 338], this.config.lineConfig);
    this.circlrPoint[0] = new fabric.Circle(this.config.circleConfig[0]);
    this.clickPoint[0]  = new fabric.Circle(this.config.clickCircleConfig[0]);
    this.title[0]       = new fabric.Text(this.langTitle[0], this.config.titleConfig);
    this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible = this.title[0].visible = true;


    this.line[1] = new fabric.Line([315, 330, 449, 330], this.config.lineConfig);
    this.circlrPoint[1] = new fabric.Circle(this.config.circleConfig[1]);
    this.clickPoint[1] = new fabric.Circle(this.config.clickCircleConfig[1]);
    this.title[1]       = new fabric.Text(this.langTitle[1], this.config.titleConfig);
    this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible = this.title[1].visible = false;


    this.line[2] = new fabric.Line([246, 328, 396, 328], this.config.lineConfig);
    this.circlrPoint[2] = new fabric.Circle(this.config.circleConfig[2]);
    this.clickPoint[2] = new fabric.Circle(this.config.clickCircleConfig[2]);
    this.title[2]       = new fabric.Text(this.langTitle[2], this.config.titleConfig);
    this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible = this.title[2].visible = false;


    this.line[3] = new fabric.Line([246, 168, 384, 168], this.config.lineConfig);
    this.circlrPoint[3] = new fabric.Circle(this.config.circleConfig[3]);
    this.clickPoint[3] = new fabric.Circle(this.config.clickCircleConfig[3]);
    this.title[3]       = new fabric.Text(this.langTitle[3], this.config.titleConfig);
    this.line[3].visible = this.circlrPoint[3].visible = this.clickPoint[3].visible = this.title[3].visible = false;

    this.title[4]       = new fabric.Text(this.langTitle[4], this.config.titleConfig);
    this.title[4].visible = false;
  }

  //初始化点击事件
  initEvent() {
    this.clickPoint[0].on('mousedown', () => {
      console.log('1111');
      this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible = this.title[0].visible = false;
      this.intestineImage[1].opacity = 1;
      this.setNextAnimation(0);
    });

    this.clickPoint[1].on('mousedown', () => {
      this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible = this.title[1].visible = false;
      this.intestineImage[2].opacity = 1;
      this.setNextAnimation(1);
    });
    this.clickPoint[2].on('mousedown', () => {
      this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible = this.title[2].visible = false;
      this.intestineImage[3].opacity = 1;
      this.setNextAnimation(2);
    });

    this.clickPoint[3].on('mousedown', () => {
      this.line[3].visible = this.circlrPoint[3].visible = this.clickPoint[3].visible = this.title[3].visible = false;
      this.intestineImage[4].opacity = 1;
      this.setNextAnimation(3);
    });
  }

  //设置图片渐变动画
  setNextAnimation(index: any) {
    const tween = {
      opacity: this.intestineImage[index].opacity,
    };
    this.zoomInAnimation = TweenMax.to(tween,  1, {
      opacity: 0,
      onUpdate: () => {
        this.intestineImage[index].opacity = tween.opacity;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        this.intestineImage[index].scale(this.config.zoomInConfig.scaleX);
        this.intestineImage[index].top = this.config.zoomInConfig.top;
        this.intestineImage[index].left = this.config.zoomInConfig.left;

        if (index <= 1) {
          (index === 0) ? this.intestineSmallImage.opacity = 1 :
            (this.intestineSmallImage.opacity = 0, this.intestineImage[index].opacity = 1);
        } else {
          this.intestineImage[(index - 1)].opacity = 0;
          this.intestineImage[index].opacity = 1;
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
      scale: this.intestineImage[index].scaleX,
      top: this.intestineImage[index].top,
      left: this.intestineImage[index].left
    };
    this.zoomOutAnimation = TweenMax.to(tween,  1, {
      scale: this.config.intestineImageConfig.scaleX,
      top: this.config.intestineImageConfig.top,
      left: this.config.intestineImageConfig.left,
      onUpdate: () => {
        this.intestineImage[index].scale(tween.scale);
        this.intestineImage[index].top = tween.top;
        this.intestineImage[index].left = tween.left;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        if (index > 3) {
          this.intestineImage[index].opacity = 0;
          this.title[4].visible = true;
          (window as any).viewHandler.viewModel.$data.showPlayButton = true;
          (window as any).viewHandler.viewModel.$data.videoActive = true;
          (window as any).viewHandler.viewModel.playVideo();
        } else {
          this.line[index].visible = this.circlrPoint[index].visible = this.clickPoint[index].visible = this.title[index].visible = true;
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
    for (let index = 0; index < this.intestineImage.length; index++) {
      this.intestineImage[index].scale(this.config.imageConfig[index].scaleX);
      this.intestineImage[index].left = this.config.imageConfig[index].left;
      this.intestineImage[index].top = this.config.imageConfig[index].top;
      this.intestineImage[index].opacity = this.config.imageConfig[index].opacity;
    }
    this.intestineSmallImage.opacity = 0;
    this.line[0].visible = this.circlrPoint[0].visible = this.clickPoint[0].visible = this.title[0].visible = true;
    this.line[1].visible = this.circlrPoint[1].visible = this.clickPoint[1].visible = this.title[1].visible = false;
    this.line[2].visible = this.circlrPoint[2].visible = this.clickPoint[2].visible = this.title[2].visible = false;
    this.line[3].visible = this.circlrPoint[3].visible = this.clickPoint[3].visible = this.title[3].visible = false;
    this.title[4].visible = false;
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
