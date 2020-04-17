import {fabric} from 'fabric';
import * as lung_step_oneImg from '../sub_static/lung_step_one.png';
import * as lung_step_twoImg from '../sub_static/lung_step_two.png';
import * as lung_step_threeImg from '../sub_static/lung_step_three.png';
import * as line_step_oneImg from '../sub_static/line_step_one.png';
import * as line_step_twoImg from '../sub_static/line_step_two.png';
import * as line_step_threeImg from '../sub_static/line_step_three.png';
import * as videoCoverImg from '../sub_static/videoCoverImg.png';
import { TreachaConfig } from './TreachaConfig';
import { Linear, TweenMax } from 'gsap';
import { FabricUtil } from '../../../../../src/util/FabricUtil';

export default class TreachaCanvas {
  config: TreachaConfig;
  myCanvas: fabric.Canvas;
  zoom = 1;
  scale = 1;
  tongueImage: any = [];
  line: any = [];
  clickPoint: any = [];
  step_two_annotation_text: any = [];
  step_three_annotation_text: any = [];
  zoomInAnimation: any;
  zoomOutAnimation: any;

  constructor() {
    this.initCanvas();
    this.config = new TreachaConfig();
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
    (document.querySelector('.videoBox22') as any).style.transform = 'scale(' + this.scale + ')';
    (document.querySelector('.gill_mask_class') as any).style.transform = 'scale(' + this.scale + ')';
    (document.querySelector('.video_annotation') as any).style.transform = 'scale(' + this.scale + ')';
  }
  //初始化图片
   initImageResource() {
      this.loadImage(lung_step_oneImg as any, this.config.imageConfig[0]).then( (tongueObject) => {
        this.tongueImage[0] = tongueObject;
        this.myCanvas.add(this.tongueImage[0]);
      });
      this.loadImage(lung_step_twoImg as any, this.config.imageConfig[1]).then( (tongueObject) => {
        this.tongueImage[1] = tongueObject;
        this.myCanvas.add(this.tongueImage[1]);
      });
      this.loadImage(lung_step_threeImg as any, this.config.imageConfig[2]).then( (tongueObject) => {
        this.tongueImage[2] = tongueObject;
        this.myCanvas.add(this.tongueImage[2]);
      });
      this.loadImage(videoCoverImg as any, this.config.imageConfig[3]).then( (tongueObject) => {
        this.tongueImage[3] = tongueObject;
        this.myCanvas.add(this.tongueImage[3]);
      });
      this.initLine();
  }

  //初始化线条和点击点
  async initLine() {
    this.clickPoint[0] = new fabric.Circle(this.config.clickCircleConfig[0]);
    this.line[0] = await FabricUtil.loadImage(line_step_oneImg as any, this.config.lineStepImgConfig[0]);
    this.myCanvas.add(this.line[0]);
    this.line[0].set('visible', true);
    this.clickPoint[0].visible =  true;

    this.line[1] = await FabricUtil.loadImage(line_step_twoImg as any, this.config.lineImgConfig);
    this.clickPoint[1] = new fabric.Circle(this.config.clickCircleConfig[1]);
    this.myCanvas.add(this.line[1]);
    this.line[1].set('visible', false);
    this.clickPoint[1].visible = false;

    this.line[2] = await FabricUtil.loadImage(line_step_threeImg as any, this.config.lineImgConfig);
    this.clickPoint[2] = new fabric.Circle(this.config.clickCircleConfig[2]);
    this.myCanvas.add(this.line[2]);
    this.line[2].set('visible', false);
    this.clickPoint[2].visible = false;
    this.initAnnotationTexts();
    this.myCanvas.add(this.clickPoint[0]);
    this.myCanvas.add(this.clickPoint[1]);
    this.myCanvas.add(this.clickPoint[2]);
    this.initEvent();
  }

  //初始化文字标注
  initAnnotationTexts() {
    this.step_two_annotation_text[0] = new fabric.Text(window.env.browserInfo.lang.gill_filamentTitle,
      (this.config.annotation_TextConfig[0] as any));
    this.step_two_annotation_text[1] = new fabric.Text(window.env.browserInfo.lang.gill_archTitle,
      (this.config.annotation_TextConfig[1] as any));
    this.step_two_annotation_text[2] = new fabric.Text(window.env.browserInfo.lang.gill_rakeTitle,
      (this.config.annotation_TextConfig[2] as any));

    this.step_three_annotation_text[0] = new fabric.Text(window.env.browserInfo.lang.gill_archTitle,
      (this.config.annotation_TextConfig[3] as any));
    this.step_three_annotation_text[1] = new fabric.Text(window.env.browserInfo.lang.blood_vesselTitle,
      (this.config.annotation_TextConfig[4] as any));
    this.step_three_annotation_text[2] = new fabric.Text(window.env.browserInfo.lang.gill_filamentTitle,
      (this.config.annotation_TextConfig[5] as any));

    this.myCanvas.add(this.step_two_annotation_text[0]);
    this.myCanvas.add(this.step_two_annotation_text[1]);
    this.myCanvas.add(this.step_two_annotation_text[2]);
    this.myCanvas.add(this.step_three_annotation_text[0]);
    this.myCanvas.add(this.step_three_annotation_text[1]);
    this.myCanvas.add(this.step_three_annotation_text[2]);
  }

  //标注文字显示隐藏
  showOrHideAnnotationTexts(index: number) {
    switch (index) {
      case 1:
        for (let i = 0; i < this.step_two_annotation_text.length; i++) {
          this.step_two_annotation_text[i].set('visible', true);
        }
        for (let i = 0; i < this.step_three_annotation_text.length; i++) {
          this.step_three_annotation_text[i].set('visible', false);
        }
        break;
      case 2:
        for (let i = 0; i < this.step_two_annotation_text.length; i++) {
          this.step_two_annotation_text[i].set('visible', false);
        }
        for (let i = 0; i < this.step_three_annotation_text.length; i++) {
          this.step_three_annotation_text[i].set('visible', true);
        }
        break;
      default:
        break;
    }
  }

  //初始化点击事件
  initEvent() {
    this.clickPoint[0].on('mousedown', () => {
      (document.getElementsByClassName('videoBox')[0] as HTMLElement).style.opacity = '0';
      (document.getElementsByClassName('gill_mask_class')[0] as HTMLElement).style.opacity = '0';

      this.tongueImage[0].visible = true;
      setTimeout(() => {
        this.setZoomAnimation(1);
        this.tongueImage[0].opacity = 1;
      }, 1000);
      this.line[0].set('visible', false);
      this.clickPoint[0].visible = false;
      this.tongueImage[1].opacity = 1;
      this.tongueImage[0].scale(this.config.zoomInConfig.scaleX);
      this.tongueImage[0].top = this.config.zoomInConfig.top;
      this.tongueImage[0].left = this.config.zoomInConfig.left;
    });

    this.clickPoint[1].on('mousedown', () => {
      this.line[1].set('visible', false);
      this.clickPoint[1].visible =  false;
      this.tongueImage[2].opacity = 1;
      for (let i = 0; i < this.step_two_annotation_text.length; i++) {
        this.step_two_annotation_text[i].set('visible', false);
      }
      this.setPapillAnimation(1);
    });

    this.clickPoint[2].on('mousedown', () => {
      this.line[2].set('visible', false);
      this.clickPoint[2].visible =  false;
      this.tongueImage[3].opacity = 1;
      for (let i = 0; i < this.step_three_annotation_text.length; i++) {
        this.step_three_annotation_text[i].set('visible', false);
      }
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

    const tweenScale = index > 2 ? this.config.tongueImage2Config.scaleX : this.config.tongueImageConfig.scaleX;
    const tweenTop = index > 2 ? this.config.tongueImage2Config.top : this.config.tongueImageConfig.top;
    const tweenLeft = index > 2 ? this.config.tongueImage2Config.left : this.config.tongueImageConfig.left;
    this.zoomOutAnimation = TweenMax.to(tween,  1, {
      scale: tweenScale,
      top: tweenTop,
      left: tweenLeft,
      onUpdate: () => {
        this.tongueImage[index].scale(tween.scale);
        this.tongueImage[index].top = tween.top;
        this.tongueImage[index].left = tween.left;
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        if (index > 2) {
          this.tongueImage[index].opacity = 0;
          (window as any).viewHandler.viewModel.$data.videoActive_end = true;
          if (!window.env.browserInfo.isPc) {
            (window as any).viewHandler.viewModel.playVideo();
          }
        } else {
          this.line[index].set('visible', true);
          this.clickPoint[index].visible = true;
        }
        this.showOrHideAnnotationTexts(index);
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
    for (let i = 0; i < this.step_two_annotation_text.length; i++) {
      this.step_two_annotation_text[i].set('visible', false);
    }
    for (let i = 0; i < this.step_three_annotation_text.length; i++) {
      this.step_three_annotation_text[i].set('visible', false);
    }
    this.tongueImage[0].visible = false;
    this.line[0].set('visible', true);
    this.line[1].set('visible', false);
    this.line[2].set('visible', false);
    this.clickPoint[0].visible = true;
    this.clickPoint[1].visible =  false;
    this.clickPoint[2].visible =  false;
    this.myCanvas.renderAll();
  }

  reset() {
      if (this.zoomInAnimation) {
        this.zoomInAnimation.pause();
        this.zoomInAnimation.progress(0);
        this.zoomInAnimation = null;
      }
      if (this.zoomOutAnimation) {
        this.zoomOutAnimation.pause();
        this.zoomOutAnimation.progress(0);
        this.zoomOutAnimation = null;
      }
      this.resetImageConfig();
  }
}
