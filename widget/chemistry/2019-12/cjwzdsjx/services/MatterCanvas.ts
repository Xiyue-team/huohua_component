import {fabric} from 'fabric';

import * as blood from '../sub_static/blood.png';
import * as water from '../sub_static/water.png';
import * as battery from '../sub_static/battery.png';
import * as orange from '../sub_static/orange.png';
import * as soap from '../sub_static/soap.png';
import * as table from '../sub_static/table.png';
import * as frame from '../sub_static/frame.png';

import { MatterConfig } from './MatterConfig';
import { Linear, TweenMax } from 'gsap';

export default class MatterCanvas {
  config: MatterConfig;
  myCanvas: fabric.Canvas;

  private scale = 1;

  private text1: any;
  private text2: any;
  private text3: any;

  private imageGroup: any = [];
  private imageRect: any  = [];
  private tableImage: fabric.Image;
  private frameImage: fabric.Image;

  private returnAnimation: any;

  constructor() {
      this.initCanvas();
      this.config = new MatterConfig();
      this.init();
      this.resize();
  }

  initCanvas() {
    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;
    this.text1 = window.env.browserInfo.lang.matterText1;
    this.text2 = window.env.browserInfo.lang.matterText2;
    this.text3 = window.env.browserInfo.lang.phText;
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

    this.myCanvas.setWidth(1200 * this.scale);
    this.myCanvas.setHeight(675 * this.scale);
    this.myCanvas.setZoom(this.scale);

    //为了在分辨率低的屏幕下显示清晰
    if (window.devicePixelRatio === 1) {
      (document.getElementById('canvas') as any).width = 1200 * this.scale * 2 ;
      (document.getElementById('canvas') as any).height = 675 * this.scale * 2 ;
      this.myCanvas.getElement().getContext('2d').scale(2, 2);
    }

    this.myCanvas.renderAll();

    const container = document.getElementById('3dContainer').children[0];
    (container as any).style.top = '50%';
    (container as any).style.left = '50%';
    (container as any).style.transform = 'translate(-50%, -50%)';
  }

  init() {
    this.initImage();
  }

  //初始化图片
  async initImage() {
    this.frameImage = await this.loadImage(frame as any, this.config.frameImageConfig);
    this.tableImage = await this.loadImage(table as any, this.config.tableImageConfig);

    this.imageGroup[0] = await this.initGroup(battery, this.text1[0], this.config.matterImageConfig[0]);
    this.imageGroup[1] = await this.initGroup(blood, this.text1[1], this.config.matterImageConfig[1]);
    this.imageGroup[2] = await this.initGroup(water, this.text1[2], this.config.matterImageConfig[2]);
    this.imageGroup[3] = await this.initGroup(orange, this.text1[3], this.config.matterImageConfig[3]);
    this.imageGroup[4] = await this.initGroup(soap, this.text1[4], this.config.matterImageConfig[4]);

    this.myCanvas.add(this.frameImage);
    this.myCanvas.add(this.tableImage);
    this.myCanvas.add(this.imageGroup[0], this.imageGroup[1], this.imageGroup[2], this.imageGroup[3], this.imageGroup[4]);
    this.initEvent();
    this.initFrameText();
    this.initImageRect();
  }

  //初始化可拖动组的信息
  async initGroup(src: any, text: any, groupConfig: any) {
    const matterImage = await this.loadImage(src as any, this.config.imageConfig);
    const matterText = new fabric.Text(text, this.config.titleConfig);

    return new fabric.Group([matterImage, matterText], groupConfig);
  }

  //初始化画廊图上的文字
  initFrameText() {
    const phText1 = this.loadText(this.text3[0], 600, 180, '#fff', 24);
    const phText2 = this.loadText(this.text3[1], 300, 150, '#fff', 24);
    const phText3 = this.loadText(this.text3[2], 900, 150, '#fff', 24);
    const phText4 = this.loadText('pH', 600, 450, '#fff', 20);

    const matterText1 = this.loadText(this.text2[0], 160, 320, '#474C4F', 16);
    const matterText2 = this.loadText(this.text2[1], 240, 320, '#474C4F', 16);
    const matterText3 = this.loadText(this.text2[2], 400, 320, '#474C4F', 16);
    const matterText4 = this.loadText(this.text2[3], 480, 320, '#474C4F', 16);
    const matterText5 = this.loadText(this.text2[4], 560, 320, '#474C4F', 16);
    const matterText6 = this.loadText(this.text2[5], 720, 320, '#474C4F', 16);
    const matterText7 = this.loadText(this.text2[6], 880, 320, '#474C4F', 16);
    const matterText8 = this.loadText(this.text2[7], 960, 320, '#474C4F', 16);
    const matterText9 = this.loadText(this.text2[8], 1120, 320, '#474C4F', 16);

    this.myCanvas.add(phText1, phText2, phText3, phText4);
    this.myCanvas.add(matterText1, matterText2, matterText3, matterText4,
      matterText4, matterText5, matterText6, matterText7, matterText8, matterText9);
  }

  //初始化图片正确框
  initImageRect() {
    this.imageRect[0] = new fabric.Rect(this.config.rectConfig);

    this.imageRect[1] = new fabric.Rect(this.config.rectConfig);
    this.imageRect[1].left = 282.5;

    this.imageRect[2] = new fabric.Rect(this.config.rectConfig);
    this.imageRect[2].left = 602.5;

    this.imageRect[3] = new fabric.Rect(this.config.rectConfig);
    this.imageRect[3].left = 762.5;

    this.imageRect[4] = new fabric.Rect(this.config.rectConfig);
    this.imageRect[4].left = 1002.5;
    this.myCanvas.add(this.imageRect[0], this.imageRect[1], this.imageRect[2], this.imageRect[3], this.imageRect[4]);
  }

  //初始化点击事件
  initEvent() {
    this.dragHelper(this.imageGroup[0], 0, 2, 1, 1, 1, 1);
    this.dragHelper(this.imageGroup[1], 1, 1, 1, 2, 1, 1);
    this.dragHelper(this.imageGroup[2], 2, 1, 1, 1, 1, 2);
    this.dragHelper(this.imageGroup[3], 3, 1, 2, 1, 1, 1);
    this.dragHelper(this.imageGroup[4], 4, 1, 1, 1, 2, 1);
  }

  //拖动方法
  dragHelper(obj: any, index: number, state1: number, state2: number, state3: number, state4: number, state5: number ) {
    obj.on({
      'moving': () => {
        obj.bringToFront();
        for ( let i = 0; i < this.imageRect.length; i++) {
          const isCollision = this.isCollisionWithRect(obj, this.imageRect[i]);
          this.imageRect[i].set('fill', isCollision ? 'rgba(0,0,0,0.2)' : '#fff');
        }
        this.myCanvas.renderAll();
      },
      'mouseup': () => {
        const tween = {
          object: obj,
          left: obj.left,
          top: obj.top
        };
        switch (true) {
          case this.isCollisionWithRect(obj, this.imageRect[0]):
            this.setAnimation(tween, state1, 0, index);
            break;
          case this.isCollisionWithRect(obj, this.imageRect[1]):
            this.setAnimation(tween, state2, 1, index);
            break;
          case this.isCollisionWithRect(obj, this.imageRect[2]):
            this.setAnimation(tween, state3, 2, index);
            break;
          case this.isCollisionWithRect(obj, this.imageRect[3]):
            this.setAnimation(tween, state4, 3, index);
            break;
          case this.isCollisionWithRect(obj, this.imageRect[4]):
            this.setAnimation(tween, state5, 4, index);
            break;
          default:
            this.setAnimation(tween, 0, 4, index);
            break;
        }
      }
    });
  }

  //(碰撞检测)
  isCollisionWithRect(object: any, target: any) {
    if (object.left < target.left + target.width && object.left + object.width > target.left &&
      object.top < target.top + target.height && object.height + object.top > target.top) {
      return true;
    }
    return false;
  }

  //设置动画
  setAnimation(tween: any, state: number, index: number, preIndex: number) {
    let target = {
      top: this.config.matterImageConfig[0].top,
      left: this.config.matterImageConfig[preIndex].left,
    };
    //碰撞正确
    if (state === 2) {
      target = {
        top: this.imageRect[index].top + 3,
        left: this.imageRect[index].left + 3.5,
      };
    }

    this.returnAnimation = TweenMax.to(tween,  0.5, {
      top: target.top,
      left: target.left,
      onstart: () => {
        switch (state) {
          case 0: //没和任何方块碰撞
            for (let i = 0; i < this.imageRect.length; i++) {
              this.imageRect[i].set('fill', '#fff');
            }
            break;
          case 1:  //和方块碰撞了，但不是正确答案
            this.imageRect[index].set('fill', '#FB9595');
            break;
          case 2: //碰撞正确
            tween.object.selectable = false;
            tween.object.hoverCursor = 'default';
            break;
        }
        this.myCanvas.discardActiveObject();
        this.myCanvas.renderAll();
      },
      onUpdate: () => {
        tween.object.left = tween.left;
        tween.object.top = tween.top;
        tween.object.setCoords();
        switch (state) {
          case 1:  //和方块碰撞了，但不是正确答案
            this.imageRect[index].set('fill', '#FB9595');
            break;
          case 2: //和正确的方块碰撞
            this.imageRect[index].visible = false;
            tween.object.getObjects()[1].set('fill', '#474C4F');
            break;
        }
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        for (let i = 0; i < this.imageRect.length; i++) {
          this.imageRect[i].set('fill', '#fff');
        }
        this.myCanvas.renderAll();
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    this.returnAnimation.play();
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

  //加载文字
  loadText(text: any, x: number, y: number, color: any, fontSize: number) {
    const textConfig = {
      originY: 'center',
      originX: 'center',
      left: x,
      top: y,
      fontSize: fontSize,
      fill: color,
      selectable: false
    };
    return new fabric.Text(text, textConfig);
  }

  reset() {
    if (this.returnAnimation) {
      this.returnAnimation.progress(0);
      this.returnAnimation.pause();
      this.returnAnimation = null;
    }
    for (let i = 0; i < this.imageRect.length; i++) {
      this.imageRect[i].set('fill', '#fff');
      this.imageRect[i].visible = true;
    }

    for (let index = 0; index < this.imageGroup.length; index++) {
      this.imageGroup[index].set('left', this.config.matterImageConfig[index].left);
      this.imageGroup[index].set('top', this.config.matterImageConfig[index].top);
      this.imageGroup[index].hoverCursor = 'pointer';
      this.imageGroup[index].selectable = true;
      this.imageGroup[index].getObjects()[1].set('fill', '#fff');
      this.imageGroup[index].setCoords();
    }
    this.myCanvas.renderAll();

  }
}
