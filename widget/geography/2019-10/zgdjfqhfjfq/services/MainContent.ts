import { fabric } from 'fabric';
import { Helper } from './Helper';
import { Config } from './Config';
import * as map from './../sub_static/map.png';
import * as blueArrow from './../sub_static/blueArrow.png';
import * as redArrow from './../sub_static/redArrow.png';
import * as jifengqu from './../sub_static/jifengqu.png';
import * as feijifengqu from './../sub_static/feijifengqu.png';
import * as fenjiexian from './../sub_static/fenjiexian.png';

export class MainContent {
  myCanvas: any;
  config = new Config();
  scale = window['env'].browserInfo.isSmallDevice ? 1 : 1.3;

  texts = window.env.browserInfo.lang;

  monsoonZone: fabric.Image;
  nonMonsoonZone: fabric.Image;
  boundaryLine: fabric.Image;
  tipsLable: fabric.Text[] = [];
  winterWindAnimation: any[] = [];
  summerWindAnimation: any[] = [];
  blueArrow: fabric.Image[] = [];
  redArrow: fabric.Image[] = [];

  constructor() {
    this.init();
  }

  async init() {
    this.preLoad();
    this.createCavas();
    await this.initImage();
    this.createLable();
    await this.createArrow();
    this.createMoveAnimation();
  }

  preLoad() {
    const imageArray = [map, blueArrow, redArrow, jifengqu, feijifengqu, fenjiexian];
    console.log(imageArray);
  }

  //创建canvas场景
  createCavas() {
    (document.getElementById('storyCanvas') as any).width = 718 * this.scale;
    (document.getElementById('storyCanvas') as any).height = 592 * this.scale;
    this.myCanvas = new fabric.Canvas('storyCanvas', {
      selection: false,
    });
  }

  //创建初始的背景地图
  async initImage() {
    const backgroundMap = await Helper.loadImage(map as any, this.config.mapConfig);
    this.monsoonZone = await Helper.loadImage(jifengqu as any, this.config.mapConfig);
    this.nonMonsoonZone = await Helper.loadImage(feijifengqu as any, this.config.mapConfig);
    this.boundaryLine = await Helper.loadImage(fenjiexian as any, this.config.mapConfig);
    this.myCanvas.add(backgroundMap, this.monsoonZone, this.nonMonsoonZone, this.boundaryLine);
    this.monsoonZone.visible = false;
    this.nonMonsoonZone.visible = false;
    this.boundaryLine.visible = false;
  }

  //控制图片显示隐藏
  imageControl(value: number, isShow: boolean) {
    switch (value) {
      case 1:
        this.tipsLable[1].visible = false;
        this.nonMonsoonZone.visible = false;
        this.monsoonZone.visible = isShow;
        this.tipsLable[0].visible = isShow;
        break;
      case 2:
        this.monsoonZone.visible = false;
        this.tipsLable[0].visible = false;
        this.nonMonsoonZone.visible = isShow;
        this.tipsLable[1].visible = isShow;
        break;
      case 3:
        this.boundaryLine.visible = isShow;
        break;
    }
    this.myCanvas.renderAll();
  }

  //创建文字
  createLable() {
    this.tipsLable.push( new fabric.Text(this.texts.lable[0], this.config.lable1Config));
    this.tipsLable.push( new fabric.Text(this.texts.lable[1], this.config.lable2Config));
    for (let i = 0 ; i < this.tipsLable.length; i++) {
      this.myCanvas.add(this.tipsLable[i]);
      this.tipsLable[i].visible = false;
    }
  }

  //创建箭头
  async createArrow() {
    //创建蓝色箭头
    for (let i = 0; i < 6; i++) {
      this.blueArrow.push(await Helper.loadImage(blueArrow as any, this.config.arrowConfig));
      this.blueArrow[i].visible = false;
      this.myCanvas.add(this.blueArrow[i]);
    }

    //旋转箭头初始方向
    for (let i = 0; i < 4; i++) {
      this.blueArrow[i].rotate(150);
    }

    for (let i = 4; i < 6; i++) {
      this.blueArrow[i].rotate(170);
    }

    //创建红色箭头
    for (let i = 0; i < 9; i++) {
      this.redArrow.push(await Helper.loadImage(redArrow as any, this.config.arrowConfig));
      this.redArrow[i].visible = false;
      this.myCanvas.add(this.redArrow[i]);
    }
    //设置红色箭头初始方向
    for (let i = 0; i < 2; i++) {
      this.redArrow[i].rotate(60);
    }
    this.redArrow[2].rotate(-10);
    for (let i = 3; i < 6; i++) {
      this.redArrow[i].rotate(-5);
    }
    for (let i = 3; i < 6; i++) {
      this.redArrow[i].rotate(-5);
    }
    this.redArrow[6].rotate(-15);
    for (let i = 7; i < 9; i++) {
      this.redArrow[i].rotate(-30);
    }
  }

  createMoveAnimation() {
    //创建冬季风动画
    //冬季风的起始坐标
    const winterTop = [-5.1, 82, 129, 197, 234, 266];
    const winterLeft = [432, 381, 277, 215, 428, 344];
    //冬季风的停止坐标
    const winterEndTop = [108, 192, 240, 307, 350, 365];
    const winterEndLeft = [501, 421, 317, 255, 447, 362];
    for (let i = 0; i < this.blueArrow.length; i++) {
      this.winterWindAnimation.push(Helper.moveAnimation(this.blueArrow[i], winterEndLeft[i] * this.scale,
        winterEndTop[i] * this.scale, winterLeft[i] * this.scale, winterTop[i] * this.scale, this.myCanvas));
    }

    //创建夏季风动画
    //夏季风的起始坐标
    const summerLeft = [128, 219, 351, 435, 367, 446, 560, 537, 620];
    const summerTop = [435, 381, 335, 367, 436, 493, 148, 298, 229];
    //夏季风的结束坐标
    const summerEndLeft = [230, 321, 345, 419, 367, 432, 533, 482, 574];
    const summerEndTop = [375, 321, 235, 195, 360, 326, 42, 208, 148];
    // const summerEndLeft = [230, 321, 327, 411, 342, 420, 533, 482, 574];
    // const summerEndTop = [375, 321, 129, 140, 230, 261, 42, 208, 148];

    for (let i = 0; i < this.redArrow.length; i++) {
      this.summerWindAnimation.push(Helper.moveAnimation(this.redArrow[i], summerEndLeft[i] * this.scale,
        summerEndTop[i] * this.scale, summerLeft[i] * this.scale, summerTop[i] * this.scale, this.myCanvas));
    }
  }

  winterWindPlay() {
    for (let i = 0; i < this.winterWindAnimation.length; i++) {
      this.blueArrow[i].visible = true;
      this.winterWindAnimation[i].progress(0);
      this.winterWindAnimation[i].pause();
      this.winterWindAnimation[i].play();
    }
  }

  hideWinterWind() {
    for (let i = 0 ; i < this.blueArrow.length; i++) {
      this.blueArrow[i].visible = false;
      this.winterWindAnimation[i].progress(0);
      this.winterWindAnimation[i].pause();
    }
  }

  summerWindPlay() {
    for (let i = 0; i < this.summerWindAnimation.length; i++) {
      this.redArrow[i].visible = true;
      this.summerWindAnimation[i].progress(0);
      this.summerWindAnimation[i].pause();
      this.summerWindAnimation[i].play();
    }
  }
  
  hideSummerWind() {
    for (let i = 0; i < this.redArrow.length; i++) {
      this.redArrow[i].visible = false;
      this.summerWindAnimation[i].progress(0);
      this.summerWindAnimation[i].pause();
    }
  }

  reset() {
    for (let i = 0; i < this.blueArrow.length; i++) {
      this.blueArrow[i].visible = false;
    }

    for (let i = 0; i < this.redArrow.length; i++) {
      this.redArrow[i].visible = false;
    }
    for (let i = 0; i < this.tipsLable.length; i++) {
      this.tipsLable[i].visible = false;
    }
    this.monsoonZone.visible = false;
    this.nonMonsoonZone.visible = false;
    this.boundaryLine.visible = false;
    this.myCanvas.renderAll();
  }

}
