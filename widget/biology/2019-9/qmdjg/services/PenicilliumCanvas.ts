import {fabric} from 'fabric';
import * as orange from '../sub_static/orange.png';
import * as penicillium from '../sub_static/penicillium.png';
import * as spore from '../sub_static/spore.png';
import * as hyphae from '../sub_static/hyphae.png';
import * as bacteria from '../sub_static/bacteria.png';

import { PenicilliumConfig } from './PenicilliumConfig';
import { Linear, TweenMax } from 'gsap';

export default class PenicilliumCanvas {
  config: PenicilliumConfig;
  myCanvas: fabric.Canvas;
  zoom = 1;
  isAniamtion: boolean;
  textTitle: any = [];
  textDetail: any = [];
  textLine: any = [];
  zoomOutAnimation: any;

  pointTitle: any = [];
  pointDetail: any = [];
  pointLine: any = [];
  penicilliumImage: any = [];
  orangeImage: fabric.Image;
  circlePoint: any = [];
  clickPoint: any = [];

  constructor() {
    this.isAniamtion = false;
    this.pointTitle = window.env.browserInfo.lang.point_text;
    this.pointDetail = window.env.browserInfo.lang.point_Detail;

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

    this.config = new PenicilliumConfig();

    this.initImageResource();
    this.initCanvasScale();
    //为了让canvas始终居中
    if (window.innerHeight > height) {
      (document.getElementById('3dContainer') as any).style.marginTop =
        (window.innerHeight - height) / 2 + 'px';
    }
  }

  initCanvasScale() {
    this.myCanvas.setZoom(this.zoom);
  }

  async initImageResource() {
    this.orangeImage = await  this.loadImage(orange as any, this.config.orangeImageConfig);
    this.myCanvas.add(this.orangeImage);

    this.penicilliumImage[0] = await this.loadImage(penicillium as any, this.config.penicilliumImageConfig);
    this.penicilliumImage[1] = await this.loadImage(spore as any, this.config.penicilliumImageConfig);
    this.penicilliumImage[2] = await this.loadImage(hyphae as any, this.config.penicilliumImageConfig);
    this.penicilliumImage[3] = await this.loadImage(bacteria as any, this.config.penicilliumImageConfig);

    this.initcirclePoint();

    for (let index = 0; index < this.penicilliumImage.length; index++) {
      this.penicilliumImage[index].visible = false;
      this.myCanvas.add(this.penicilliumImage[index]);
    }
    this.initLine();
    this.initText();
    this.initEvent();
  }
  //初始化点击事件
  initEvent() {
    this.clickPoint[0].on('mousedown', () => {
      this.initAniamtion();
    });
    this.clickPoint[1].on('mousedown', () => {
      this.setTextEnable(0);
    });
    this.clickPoint[2].on('mousedown', () => {
      this.setTextEnable(1);
    });
    this.clickPoint[3].on('mousedown', () => {
      this.setTextEnable(2);
    });
  }
  //初始化线条
  initLine() {
    this.pointLine[0] = new fabric.Line([272, 351, 300, 240], this.config.lineConfig);
    this.pointLine[1] = new fabric.Line([300, 240, 355, 240], this.config.lineConfig);
    this.pointLine[2] = new fabric.Line([544, 158, 762, 158], this.config.lineConfig);
    this.pointLine[3] = new fabric.Line([514, 282, 789, 282], this.config.lineConfig);
    this.pointLine[4] = new fabric.Line([590, 407, 742, 407], this.config.lineConfig);

    for (let i = 0; i < this.pointLine.length; i++) {
      this.myCanvas.add(this.pointLine[i]);
    }
  }
  //初始化识别圆圈
  initcirclePoint() {
    this.circlePoint[0] = new fabric.Circle(this.config.circlePointConfig[0]);
    this.circlePoint[1] = new fabric.Circle(this.config.circlePointConfig[1]);
    this.circlePoint[2] = new fabric.Circle(this.config.circlePointConfig[2]);
    this.circlePoint[3] = new fabric.Circle(this.config.circlePointConfig[3]);

    //是为了加大手指识别区域
    for (let index = 0; index < this.circlePoint.length; index++) {
      this.clickPoint.push(new fabric.Circle(this.config.clickPointConfig[index]));
      this.myCanvas.add(this.circlePoint[index]);
      this.myCanvas.add(this.clickPoint[index]);
    }
  }
  //初始化文字
  initText() {
    this.textTitle[0] = new fabric.Text(this.pointTitle[0], this.config.titleConfig[0]);
    this.textDetail[0] = new fabric.Text(this.pointDetail[0], this.config.detailConfig[0]);

    this.textTitle[1] = new fabric.Text(this.pointTitle[1], this.config.titleConfig[1]);
    this.textDetail[1] = new fabric.Text(this.pointDetail[1], this.config.detailConfig[1]);

    this.textTitle[2] = new fabric.Text(this.pointTitle[2], this.config.titleConfig[2]);
    this.textDetail[2] = new fabric.Text(this.pointDetail[2], this.config.detailConfig[2]);

    for (let index = 0; index < this.textTitle.length; index++) {
      this.myCanvas.add(this.textTitle[index]);
      this.myCanvas.add(this.textDetail[index]);
    }
  }
  //设置文字的显示、隐藏
  setTextEnable(textIndex: number) {
    for (let index = 0; index < this.textTitle.length; index++) {
      if (index === textIndex) {
        this.penicilliumImage[(textIndex + 1)].visible = true;
        this.textTitle[textIndex].visible = this.textDetail[textIndex].visible = true;
        this.circlePoint[(textIndex + 1)].set('fill', '#FFC100');
        this.circlePoint[(textIndex + 1)].setCoords();
      } else {
        this.penicilliumImage[(index + 1)].visible = false;
        this.textTitle[index].visible = this.textDetail[index].visible = false;
        this.circlePoint[(index + 1)].set('fill', '#FFC10000');
        this.circlePoint[(index + 1)].setCoords();
      }
    }
  }
  //设置线条的显示、隐藏
  setLineEnable(enable: boolean) {
    for (let index = 0; index < this.pointLine.length; index++) {
      this.pointLine[index].visible = enable;
      if (index < this.circlePoint.length) {
        this.circlePoint[index].visible = enable;
        this.clickPoint[index].visible = enable;
      }
    }
  }

  //初始化动画
  initAniamtion() {
    const tween = {
      scale: this.orangeImage.scaleX,
      top: this.orangeImage.top,
      left: this.orangeImage.left,
      pointTop: this.circlePoint[0].top,
      pointLeft: this.circlePoint[0].left,
    };
    this.zoomOutAnimation = TweenMax.to(tween,  1, {
      scale: 0.2,
      top: 396,
      left: 246,
      pointLeft: 272,
      pointTop: 357,
      onUpdate: () => {
        this.orangeImage.scale(tween.scale);
        this.orangeImage.left = tween.left;
        this.orangeImage.top = tween.top;
        this.circlePoint[0].left =  this.clickPoint[0].left = tween.pointLeft;
        this.circlePoint[0].top =  this.clickPoint[0].top = tween.pointTop;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        this.setLineEnable(true);
        this.penicilliumImage[0].visible = true;
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

  reset() {
    if (this.zoomOutAnimation) {
      this.zoomOutAnimation.progress(0);
      this.zoomOutAnimation.pause();
    }
    this.zoomOutAnimation = null;
    this.setLineEnable(false);
    this.setTextEnable(-1);
    for (let index = 0; index < this.penicilliumImage.length; index++) {
      this.penicilliumImage[index].visible = false;
    }
    this.circlePoint[0].visible = true;
    this.clickPoint[0].visible = true;
    this.orangeImage.scale(this.config.orangeImageConfig.scaleX);
    this.orangeImage.left = this.config.orangeImageConfig.left;
    this.orangeImage.top = this.config.orangeImageConfig.top;
    this.circlePoint[0].left = this.clickPoint[0].left = this.config.circlePointConfig[0].left;
    this.circlePoint[0].top = this.clickPoint[0].top = this.config.circlePointConfig[0].top;
    this.myCanvas.renderAll();
  }
}
