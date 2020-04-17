import {fabric} from 'fabric';
import * as chair from '../sub_static/chair.png';   //椅子
import * as bracket from '../sub_static/bracket.png'; //支架
import * as chairFoot from '../sub_static/chairFoot.png';  //椅子脚
import * as handrail from '../sub_static/handrail.png';   //扶手
import * as cushion from '../sub_static/cushion.png';  //坐垫
import * as backrest from '../sub_static/backrest.png'; //靠背

import { ChairConfig } from './ChairConfig';
import { Linear, TweenMax } from 'gsap';

export default class ChairModel {
  config: ChairConfig;
  myCanvas: fabric.Canvas;

  private scale = 1;

  private text1: any;
  private text2: any;
  private text3: any;

  private chairImage: any = [];
  private lineGroup: any = [];
  private pointGroup: any = [];
  private rectGroup: any = [];
  private moveGroup: any = [];
  private returnAnimation: any;

  private trueRect: fabric.Group;
  private moveText: fabric.Text;

  private count = 0;

  constructor() {
      this.initCanvas();
      this.config = new ChairConfig();
      this.init();
      this.resize();
  }

  initCanvas() {
    this.myCanvas = new fabric.Canvas('canvas');
    this.myCanvas.hoverCursor = 'default';
    this.myCanvas.selection = false;
    this.text1 = window.env.browserInfo.lang.dragText;
    this.text2 = window.env.browserInfo.lang.chairText;
    this.text3 = window.env.browserInfo.lang.trueText;
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
    this.chairImage[0] = await  this.loadImage(chair as any, this.config.chairImageConfig);
    this.chairImage[1] = await  this.loadImage(backrest as any, this.config.chairImageConfig);
    this.chairImage[2] = await  this.loadImage(cushion as any, this.config.chairImageConfig);
    this.chairImage[3] = await  this.loadImage(bracket as any, this.config.chairImageConfig);
    this.chairImage[4] = await  this.loadImage(handrail as any, this.config.chairImageConfig);
    this.chairImage[5] = await  this.loadImage(chairFoot as any, this.config.chairImageConfig);
    this.chairImage[0].opacity = 1;
    this.myCanvas.add(this.chairImage[0], this.chairImage[1], this.chairImage[2],
      this.chairImage[3], this.chairImage[4], this.chairImage[5]);
    this.myCanvas.renderAll();
    this.initLine();
    this.initMoveRect();
    this.initEvent();
    this.initTips();
  }

  initLine() {
    this.lineGroup[0]  = new fabric.Line([505, 200, 670, 200], this.config.lineConfig);
    this.pointGroup[0] = new fabric.Circle(this.config.pointConfig[0]);
    this.rectGroup[0]  = new fabric.Rect(this.config.rectConfig[0]);

    this.lineGroup[1]  = new fabric.Line([505, 329, 620, 329], this.config.lineConfig);
    this.pointGroup[1] = new fabric.Circle(this.config.pointConfig[1]);
    this.rectGroup[1]  = new fabric.Rect(this.config.rectConfig[1]);

    this.lineGroup[2]  = new fabric.Line([505, 432, 580, 432], this.config.lineConfig);
    this.pointGroup[2] = new fabric.Circle(this.config.pointConfig[2]);
    this.rectGroup[2]  = new fabric.Rect(this.config.rectConfig[2]);

    this.lineGroup[3]  = new fabric.Line([700, 298, 825, 298], this.config.lineConfig);
    this.pointGroup[3] = new fabric.Circle(this.config.pointConfig[3]);
    this.rectGroup[3]  = new fabric.Rect(this.config.rectConfig[3]);

    this.lineGroup[4]  = new fabric.Line([715, 440, 825, 440], this.config.lineConfig);
    this.pointGroup[4] = new fabric.Circle(this.config.pointConfig[4]);
    this.rectGroup[4]  = new fabric.Rect(this.config.rectConfig[4]);

    this.myCanvas.add(this.lineGroup[0], this.pointGroup[0], this.rectGroup[0]);
    this.myCanvas.add(this.lineGroup[1], this.pointGroup[1], this.rectGroup[1]);
    this.myCanvas.add(this.lineGroup[2], this.pointGroup[2], this.rectGroup[2]);
    this.myCanvas.add(this.lineGroup[3], this.pointGroup[3], this.rectGroup[3]);
    this.myCanvas.add(this.lineGroup[4], this.pointGroup[4], this.rectGroup[4]);
  }

  //初始化可拖动组的信息
  initGroup(text: any, groupConfig: any) {
    const rect     = new fabric.Rect(this.config.groupRectConfig);
    const rectText = new fabric.Text(text, this.config.titleConfig);

    return new fabric.Group([rect, rectText], groupConfig);
  }

  initMoveRect() {
    this.moveGroup[0]  = this.initGroup(this.text2[0], this.config.groupConfig[0]);
    this.moveGroup[1]  = this.initGroup(this.text2[1], this.config.groupConfig[1]);
    this.moveGroup[2]  = this.initGroup(this.text2[2], this.config.groupConfig[2]);
    this.moveGroup[3]  = this.initGroup(this.text2[3], this.config.groupConfig[3]);
    this.moveGroup[4]  = this.initGroup(this.text2[4], this.config.groupConfig[4]);

    this.myCanvas.add(this.moveGroup[0]);
    this.myCanvas.add(this.moveGroup[1]);
    this.myCanvas.add(this.moveGroup[2]);
    this.myCanvas.add(this.moveGroup[3]);
    this.myCanvas.add(this.moveGroup[4]);
  }

  initTips() {
    this.moveText = new fabric.Text(this.text1, {
      originY: 'center',
      originX: 'center',
      left: 191,
      top: 140,
      fontSize: 20,
      fill: '#343434',
      selectable: false
    });
    const rect = new fabric.Rect(this.config.trueRectConfig);
    const text = new fabric.Text(this.text3, this.config.trueTextConfig);
    this.trueRect = new fabric.Group([rect, text], {
      left: 820,
      top: 120,
      visible: false,
      selectable: false
    });
    this.myCanvas.add(this.moveText, this.trueRect);
  }

  //初始化点击事件
  initEvent() {
    this.dragEvent(this.moveGroup[0], 0);
    this.dragEvent(this.moveGroup[1], 1);
    this.dragEvent(this.moveGroup[2], 2);
    this.dragEvent(this.moveGroup[3], 3);
    this.dragEvent(this.moveGroup[4], 4);
  }

  //拖动方法
  dragEvent(obj: any, index: number) {
    obj.on({
      'moving': () => {
        this.moveText.visible = false;
        obj.bringToFront();
        for ( let i = 0; i < this.rectGroup.length; i++) {
          this.setMoveBound(this.moveGroup[i]);
          const isCollision = this.isCollisionWithRect(obj, this.rectGroup[i]);
          this.chairImage[(i + 1)].set('opacity', isCollision ? 1 : 0);
          this.rectGroup[i].set('stroke', isCollision ? '#0091FF' : '#B7B7B7');
          this.lineGroup[i].set('fill', isCollision ? '#0091FF' : '#B7B7B7');
          this.lineGroup[i].set('stroke', isCollision ? '#0091FF' : '#B7B7B7');
          this.pointGroup[i].set('stroke', isCollision ? '#0091FF' : '#B7B7B7');
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
          case this.isCollisionWithRect(obj, this.rectGroup[0]):
            this.setAnimation(tween, 0, index);
            break;
          case this.isCollisionWithRect(obj, this.rectGroup[1]):
            this.setAnimation(tween,  1, index);
            break;
          case this.isCollisionWithRect(obj, this.rectGroup[2]):
            this.setAnimation(tween, 2, index);
            break;
          case this.isCollisionWithRect(obj, this.rectGroup[3]):
            this.setAnimation(tween, 3, index);
            break;
          case this.isCollisionWithRect(obj, this.rectGroup[4]):
            this.setAnimation(tween, 4, index);
            break;
          default:
            this.setAnimation(tween, index, -1);
            break;
        }
      }
    });
  }

  setMoveBound(model: any) {
    if (model.top < 0) {
      model.top = 0;
    }
    if (model.left < 0) {
      model.left = 0;
    }
    if (model.top > 635) {
      model.top = 635;
    }
    if (model.left > 1125) {
      model.left = 1125;
    }
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
  setAnimation(tween: any, index: number, trueIndex: number) {
    let target = {
      top: this.rectGroup[index].top,
      left: this.rectGroup[index].left,
    };

    if (trueIndex === -1) {
      target = {
        top: this.config.groupConfig[index].top,
        left: this.config.groupConfig[index].left,
      };
    } else {
      if (this.rectGroup[index].visible) {
        this.count += 1;
      }

    }

    this.returnAnimation = TweenMax.to(tween,  0.1, {
      top: target.top,
      left: target.left,
      onstart: () => {
        if (trueIndex !== -1) {
          tween.object.selectable = false;
          tween.object.hoverCursor = 'default';
        }
        this.myCanvas.discardActiveObject();
        this.myCanvas.renderAll();
      },
      onUpdate: () => {
        tween.object.left = tween.left;
        tween.object.top = tween.top;
        tween.object.setCoords();
        this.myCanvas.renderAll();
      },
      onComplete: () => {
        if (trueIndex !== -1) {
          this.completeEvent(tween.object, index);
        }
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    this.returnAnimation.play();
  }

  completeEvent(obj: any, index: number) {
    this.rectGroup[index].visible = false;
    this.setImageEnable(0);
    obj._objects[0].set('fill', '#0091FF');
    obj._objects[0].set('stroke', '#0091FF');
    obj._objects[1].set('fill', '#fff');
    if (this.count === 5) {
      if (this.checkAnswer()) {
        this.trueRect.visible = true;
        (window as any).viewHandler.viewModel.$data.isShow = false;
      } else {
        this.trueRect.visible = false;
        (window as any).viewHandler.viewModel.$data.isShow = true;
      }
    }
    this.myCanvas.discardActiveObject();
    this.myCanvas.renderAll();
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
  checkRect(obj: any, target: any) {
    if (obj.top !== target.top) {
      obj._objects[0].set('fill', '#F1826B');
      obj._objects[0].set('stroke', '#F1826B');
      obj._objects[1].set('fill', '#fff');
      obj._objects[0].setCoords();
      obj._objects[1].setCoords();
    }
  }
  //检查答案是否正确
  checkAnswer() {
    if ((this.moveGroup[0].top === this.rectGroup[0].top) && (this.moveGroup[1].top === this.rectGroup[4].top) &&
      (this.moveGroup[2].top === this.rectGroup[3].top) && (this.moveGroup[3].top === this.rectGroup[2].top) &&
      (this.moveGroup[4].top === this.rectGroup[1].top)) {
      return true;
    }
    return false;
  }
  //显示答案答错的部分
  showAnswer() {
    this.checkRect(this.moveGroup[0], this.rectGroup[0]);
    this.checkRect(this.moveGroup[1], this.rectGroup[4]);
    this.checkRect(this.moveGroup[2], this.rectGroup[3]);
    this.checkRect(this.moveGroup[3], this.rectGroup[2]);
    this.checkRect(this.moveGroup[4], this.rectGroup[1]);
    this.myCanvas.discardActiveObject();
    this.myCanvas.renderAll();
  }

  setImageEnable(index: number) {
    for (let i = 0; i < this.chairImage.length; i++) {
      this.chairImage[i].opacity = 0;
    }
    this.chairImage[index].opacity = 1;
  }


  resetGroup() {
    for (let index = 0; index < this.moveGroup.length; index++) {
      this.moveGroup[index].set('left', this.config.groupConfig[index].left);
      this.moveGroup[index].set('top',  this.config.groupConfig[index].top);
      this.moveGroup[index].selectable =  true;
      this.moveGroup[index].hoverCursor = 'pointer';
      this.moveGroup[index].setCoords();
      this.rectGroup[index].visible = true;
      this.moveGroup[index]._objects[0].set('fill', '#fff');
      this.moveGroup[index]._objects[0].set('stroke', '#B7B7B7');
      this.moveGroup[index]._objects[1].set('fill', '#000');
      this.rectGroup[index].set('stroke',  '#B7B7B7');
      this.lineGroup[index].set('fill',    '#B7B7B7');
      this.lineGroup[index].set('stroke',  '#B7B7B7');
      this.pointGroup[index].set('stroke', '#B7B7B7');
      this.chairImage[(index + 1)].opacity = 0;
    }
    this.chairImage[0].opacity = 1;
    this.moveText.visible = true;
    this.trueRect.visible = false;
    this.myCanvas.discardActiveObject();
    this.myCanvas.renderAll();
  }

  reset() {
    if (this.returnAnimation) {
      this.returnAnimation.progress(0);
      this.returnAnimation.pause();
      this.returnAnimation = null;
    }
    this.resetGroup();
    this.count = 0;
  }
}
