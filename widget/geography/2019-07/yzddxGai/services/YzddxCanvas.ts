import {YzddxConfig} from './YzddxConfig';
import backgroundImage from '../sub_static/backgroundImage.png';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import hillyArea6 from '../sub_static/hillyArea6.png';
import plainImage6 from '../sub_static/plainImage6.png';
import { Linear, TweenMax } from 'gsap';
import {Event} from './Event';
import { RightCradCanvas } from './RightCradCanvas';

export default class YzddxCanvas {
    config: YzddxConfig;
    myCanvas: fabric.Canvas;
    clickEvent: Event;
    rightCradCanvas: RightCradCanvas;

    // 地图
    map: fabric.Image;

    // 蓝点
    bluePoint: any = [];

    // 地图上的文字
    mapText: any = [];

    // 左侧元素的数组
    elementArray: any = [];

    // 左侧的组
    leftGroup: any;

    anim: any;

    animEnd = false;

    // 判断按钮是否点击下
    showButton1 = false;
    showButton2 = false;
    showButton3 = false;

    constructor() {
      const container = document.getElementById('3dContainer');
      (document.getElementById('storyCanvas') as any).width = container.clientWidth;
      (document.getElementById('storyCanvas') as any).height = container.clientHeight;
      this.myCanvas = new fabric.Canvas('storyCanvas', {
        backgroundColor: '#ffffff',
      });

      this.myCanvas.selection = false;

      this.rightCradCanvas = new RightCradCanvas();
      this.config = new YzddxConfig();
      this.clickEvent = new Event(this.myCanvas, this.rightCradCanvas.myCanvas);

      this.init();
    }

    async init() {
      await this.initBackground();
      await this.initPoint();
      await this.initPlateauText();
      await this.initHillyAreaText();
      await this.initPlainText();
      await this.initLeftGroup();

      await this.pointClickEvent();
    }

    // 背景地图
    async initBackground() {
      this.map = await FabricUtil.loadImage(backgroundImage as any, this.config.map);
      this.elementArray.push(this.map);
    }

    // 添加标注点
    async initPoint() {
      for (let i = 0; i < 19; i++) {
        this.bluePoint[i] = await this.createPoint(this.config.bluePoint[i]);
        this.elementArray.push(this.bluePoint[i]);
      }
    }

    // 创建闪烁点
    createPoint(config: any) {
      const opacityPoint = new fabric.Circle({
        top: 0,
        left: 0,
        radius: 16,
        fill: '',
        selectable: false,
        stroke: '',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });

      const bluePoint = new fabric.Circle({
        top: 0,
        left: 0,
        radius: 7,
        fill: '#0086E0',
        selectable: false,
        stroke: '#0086E0',
        originX: 'center',
        originY: 'center',
        strokeWidth: 2
      });

      const whitePoint = new fabric.Circle({
        top: 0,
        left: 0,
        radius: 10,
        fill: '#ffffff',
        selectable: false,
        originX: 'center',
        originY: 'center',
        stroke: '#EBEBEB',
        strokeWidth: 1,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.03)',
          offsetX: 1,
          offsetY: 4,
        }),
      });

      const point = new fabric.Group([opacityPoint, whitePoint, bluePoint], {
        top: config.top - 10 * 0.5,
        left: config.left - 10 * 0.5,
        selectable: false,
      });

      return point;
    }

    // 添加高原文字
    initPlateauText() {
      for (let i = 0; i < 7; i++) {
        this.mapText[i] = this.createText(window.env.browserInfo.lang.plateauText[i], this.config.plateauText[i]);
        this.mapText[i].set('visible', false);
        this.mapText[i].set('selectable', false);
        this.elementArray.push(this.mapText[i]);
      }
    }

    // 添加山地文字
    async initHillyAreaText() {
      for (let i = 7; i < 12; i++) {
        this.mapText[i] = this.createText(window.env.browserInfo.lang.hillyAreaText[i - 7], this.config.hillyAreaText[i - 7]);
        this.mapText[i].set('visible', false);
        this.mapText[i].set('selectable', false);
        this.elementArray.push(this.mapText[i]);
      }

      this.mapText[12] = await FabricUtil.loadImage(hillyArea6 as any,  this.config.hillyAreaText[5]);
      this.mapText[12].set('visible', false);
      this.elementArray.push(this.mapText[12]);
    }

    // 添加平原文字
    async initPlainText() {
      for (let i = 13; i < 18; i++) {
        this.mapText[i] = this.createText(window.env.browserInfo.lang.plainText[i - 13], this.config.plainText[i - 13]);
        this.mapText[i].set('visible', false);
        this.mapText[i].set('selectable', false);
        this.elementArray.push(this.mapText[i]);
      }

      this.mapText[18] = await FabricUtil.loadImage(plainImage6 as any,  this.config.plainText[5]);
      this.mapText[18].set('visible', false);
      this.elementArray.push(this.mapText[18]);
    }

    // 添加左侧内容
    initLeftGroup() {
      this.leftGroup = new fabric.Group(this.elementArray, this.config.leftGroup);
      this.myCanvas.add(this.leftGroup);

      const container = document.getElementById('3dContainer');
      const width = this.leftGroup.get('width') * this.config.leftGroup.scaleX;
      const height = this.leftGroup.get('height') * this.config.leftGroup.scaleY;

      const pageRatio = container.clientWidth / container.clientHeight;
      const mapRatio = width / height;
      let scale = 1;
      if (pageRatio > mapRatio) {
        scale = container.clientHeight / height;
      } else {
        scale = container.clientWidth / width;
      }

      this.leftGroup.on({'moving': (e: any) => {
        if (this.animEnd) {
          this.leftGroup.set('left', container.clientWidth * 0.5 - width * 0.5 * scale);
          this.leftGroup.set('top', container.clientHeight * 0.5 - height * 0.5 * scale);
        } else {
          if (this.leftGroup.get('left') > 0) {
            this.leftGroup.set('left', 0);
          } else if (this.leftGroup.get('left') + width  < container.clientWidth) {
            this.leftGroup.set('left', container.clientWidth - width);
          }

          if (this.leftGroup.get('top') > 0) {
            this.leftGroup.set('top', 0);
          } else if (this.leftGroup.get('top') + height  < container.clientHeight) {
            this.leftGroup.set('top', container.clientHeight - height);
          }
        }

      }});
    }

    createText(text: string, config: {left: number, top: number, angle?: number}) {
      const str = new fabric.Text(text, {
        fontSize: 64,
        fill: '#000000',
        fontWeight: 'bold',
        scaleX: 0.25,
        scaleY: 0.25,
        left: config.left,
        top: config.top,
        angle: !config.angle ? 0 : config.angle
      });

      return str;
    }

    // 添加蓝点点击事件
    pointClickEvent() {
      let index = 0;
      for (let i = 0; i < 19; i++) {
        this.clickEvent.pointClickEvent(this.bluePoint[i], this.mapText[i], this.rightCradCanvas.card as any, index);
        index += 1;
      }

      this.clickEvent.mapClickEvent(this.map, this.rightCradCanvas.card);
    }

    // 显示所有高原文字
    showPlateauText(isShow: boolean) {
      this.showButton1 = isShow;

      this.hideText();

      for (let i = 0; i < 7; i++) {
        this.mapText[i].set('visible', isShow);
        this.bluePoint[i].set('visible', !isShow);
      }

      this.myCanvas.renderAll();

      if (!this.animEnd) {
        this.leftGroup.set('selectable', false);
        this.anim = this.mapScaleAnimation();
        this.anim.play();
      }

      if (!this.clickEvent.showTipImageEnd) {
        (window as any).viewHandler.viewModel.$data.showTipImage = true;
        this.clickEvent.showTipImageEnd = true;
      }
    }

    // 显示所有山地文字
    showHillyAreaText(isShow: boolean) {
      this.showButton2 = isShow;

      this.hideText();

      for (let i = 7; i < 13; i++) {
        this.mapText[i].set('visible', isShow);
        this.bluePoint[i].set('visible', !isShow);
      }
      this.myCanvas.renderAll();

      if (!this.animEnd) {
        this.leftGroup.set('selectable', false);
        this.anim = this.mapScaleAnimation();
        this.anim.play();
      }

      if (!this.clickEvent.showTipImageEnd) {
        (window as any).viewHandler.viewModel.$data.showTipImage = true;
        this.clickEvent.showTipImageEnd = true;
      }
    }

    // 显示所有平原文字
    showPlainText(isShow: boolean) {
      this.showButton3 = isShow;

      this.hideText();

      for (let i = 13; i < 19; i++) {
        this.mapText[i].set('visible', isShow);
        this.bluePoint[i].set('visible', !isShow);
      }
      this.myCanvas.renderAll();

      if (!this.animEnd) {
        this.leftGroup.set('selectable', false);
        this.anim = this.mapScaleAnimation();
        this.anim.play();
      }

      if (!this.clickEvent.showTipImageEnd) {
        (window as any).viewHandler.viewModel.$data.showTipImage = true;
        this.clickEvent.showTipImageEnd = true;
      }
    }

    hideText() {
      for (let i = 0; i < 7; i++) {
        this.mapText[i].set('visible', this.showButton1);
        this.bluePoint[i].set('visible', !this.showButton1);
      }

      for (let i = 7; i < 13; i++) {
        this.mapText[i].set('visible', this.showButton2);
        this.bluePoint[i].set('visible', !this.showButton2);
      }

      for (let i = 13; i < 19; i++) {
        this.mapText[i].set('visible', this.showButton3);
        this.bluePoint[i].set('visible', !this.showButton3);
      }
    }

    mapScaleAnimation() {
      const tween = {
        scale: this.config.scale,
        left: this.leftGroup.get('left'),
        top: this.leftGroup.get('top')
      };
      const container = document.getElementById('3dContainer');
      const width = this.leftGroup.get('width') ;
      const height = this.leftGroup.get('height') ;

      const pageRatio = container.clientWidth / container.clientHeight;
      const mapRatio = width / height;
      let scale = 1;
      if (pageRatio > mapRatio) {
        scale = container.clientHeight / height;
        this.leftGroup.set('scaleX', scale);
        this.leftGroup.set('scaleY', scale);
      } else {
        scale = container.clientWidth / width;
        this.leftGroup.set('scaleX', scale);
        this.leftGroup.set('scaleY', scale);
      }

      const animation = TweenMax.to(tween, 1.5, {
        scale: scale,
        left: container.clientWidth * 0.5 - width * 0.5 * scale,
        top: container.clientHeight * 0.5 - height * 0.5 * scale,

        onStart: () => {
          this.animEnd = true;
        },
        onUpdate: () => {
          this.leftGroup.set('scaleX', tween.scale);
          this.leftGroup.set('scaleY', tween.scale);
          this.leftGroup.set('left', tween.left);
          this.leftGroup.set('top', tween.top);

          this.myCanvas.renderAll();
        },
        onComplete: () => {

        },
        ease:  Linear.easeOut,
        paused: true
      });
      return animation;
    }

    // 重置
    async reset() {
      if (!!this.anim) {
        // 重置动画
        this.anim.progress(0);
        this.anim.pause();
      }

      // 重置蓝点 文字 卡片
      for (let i = 0; i < 19; i++) {
        this.mapText[i].set('visible', false);
        this.bluePoint[i].set('visible', true);
        this.rightCradCanvas.card[i].set('visible', false);
      }

      this.showButton1 = false;
      this.showButton2 = false;
      this.showButton3 = false;

      // 重置地图
      this.leftGroup.set('left', this.config.map.left);
      this.leftGroup.set('top', this.config.map.top);

      this.leftGroup.set('scaleX', this.config.scale);
      this.leftGroup.set('scaleY', this.config.scale);

      this.leftGroup.set('selectable', true);

      this.myCanvas.renderAll();
      this.rightCradCanvas.myCanvas.renderAll();


      // 开启动画可播放
      this.animEnd = false;

      // 开启提示可以显示
      this.clickEvent.showTipImageEnd = false;

      // 关闭提示
      (window as any).viewHandler.viewModel.$data.showTipImage = false;
    }
}

