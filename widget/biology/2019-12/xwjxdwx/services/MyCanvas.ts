import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';

import microscopeImage from '../sub_static/img/microscopeImage.png';
import slideGlassImage1 from '../sub_static/img/1.png';
import slideGlassImage2 from '../sub_static/img/2.png';
import slideGlassImage3 from '../sub_static/img/3.png';
import objectiveTableImage from '../sub_static/img/objectiveTable.png';
import slideGlassImageMask from '../sub_static/img/slide.png';
import objectiveLense from '../sub_static/img/objImg2.png';
import projection2 from '../sub_static/img/projection2.png';
import phaseImage1 from '../sub_static/img/1_1.png';
import phaseImage2 from '../sub_static/img/2_2.png';
import phaseImage3 from '../sub_static/img/3_3.png';


import { FabricUtil } from './Util';
import { Linear, TweenMax } from 'gsap';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;

    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    // 三个载玻片
    slideGlass: Array<fabric.Image>;

    // 三个蒙板
    slideGlassMask: Array<fabric.Image>;

    // 三个物相
    phase: Array<fabric.Image>;

    anim: any;

    // 载物台
    objectiveTable: fabric.Image;

    // 载物台上的蒙板
    objectiveTableMask: fabric.Image;

    // 提示文字
    tipsText: Array<fabric.Text>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addStaticImage();
      await this.addSlideGlass();
      await this.addPhase();
      await this.addObjectiveTableMask();
      await this.addSlideGlassMask();
      await this.addText();
      await this.clickEvent();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas') as any).width = 1024;
      (document.getElementById('cardImageCanvas') as any).height = 576;
      this.myCanvas = new fabric.Canvas('cardImageCanvas', {

      });
      this.myCanvas.selection = false;
    }

    async addStaticImage() {
      const microscope = await FabricUtil.loadImage(microscopeImage, this.config.microscope);
      this.myCanvas.add(microscope);

      this.objectiveTable = await FabricUtil.loadImage(objectiveTableImage, this.config.objectiveTable);
      this.myCanvas.add(this.objectiveTable);
    }

    async addSlideGlass() {
      this.slideGlass = [];
      this.slideGlass[0] = await FabricUtil.loadImage(slideGlassImage1, this.config.slideGlass[0]);
      this.myCanvas.add(this.slideGlass[0]);

      this.slideGlass[1] = await FabricUtil.loadImage(slideGlassImage2, this.config.slideGlass[1]);
      this.myCanvas.add(this.slideGlass[1]);

      this.slideGlass[2] = await FabricUtil.loadImage(slideGlassImage3, this.config.slideGlass[2]);
      this.myCanvas.add(this.slideGlass[2]);
    }

    async addPhase() {
      this.phase = [];
      this.phase[0] = await FabricUtil.loadImage(phaseImage1, this.config.phase);
      this.myCanvas.add(this.phase[0]);

      this.phase[1] = await FabricUtil.loadImage(phaseImage2, this.config.phase);
      this.phase[1].set('visible', false);
      this.myCanvas.add(this.phase[1]);

      this.phase[2] = await FabricUtil.loadImage(phaseImage3, this.config.phase);
      this.phase[2].set('visible', false);
      this.myCanvas.add(this.phase[2]);
    }

    // 添加挡板用于防止图片移出载玻片
    async addObjectiveTableMask() {
      const objectiveLenseMask = await FabricUtil.loadImage(objectiveLense, this.config.objectiveLenseMask);
      this.myCanvas.add(objectiveLenseMask);

      const projection2Image = await FabricUtil.loadImage(projection2, this.config.projection2Image);
      this.myCanvas.add(projection2Image);

      this.objectiveTableMask = await FabricUtil.loadImage(objectiveTableImage, this.config.objectiveTable);
      this.objectiveTableMask.set('visible', false);
      this.myCanvas.add(this.objectiveTableMask);
    }

    // 添加载玻片上的挡板用于拖拽平移
    async addSlideGlassMask() {
      this.slideGlassMask = [];
      this.slideGlassMask[0] = await FabricUtil.loadImage(slideGlassImageMask, this.config.slideGlassMask[0]);
      this.myCanvas.add(this.slideGlassMask[0]);

      this.slideGlassMask[1] = await FabricUtil.loadImage(slideGlassImageMask, this.config.slideGlassMask[1]);
      this.myCanvas.add(this.slideGlassMask[1]);

      this.slideGlassMask[2] = await FabricUtil.loadImage(slideGlassImageMask, this.config.slideGlassMask[2]);
      this.myCanvas.add(this.slideGlassMask[2]);

      this.slideGlassMask[0].on('moving', (e: any) => {
        this.limitElement(this.slideGlassMask[0], 0, 52, 0, 5);
      });

      this.slideGlassMask[1].on('moving', (e: any) => {
        this.limitElement(this.slideGlassMask[1], 1, 45, -3, 0);
      });

      this.slideGlassMask[2].on('moving', (e: any) => {
        this.limitElement(this.slideGlassMask[2], 2, 49, 5, 5);
      });
    }

    // 添加文字
    addText() {
      const lang = window.env.browserInfo.lang;
      const phaseText = new fabric.Text(lang.tipText[0],  Object.assign({
        left: 148 + 18,
        top: 122,
      }, this.config.text));
      this.myCanvas.add(phaseText);

      const objectiveTableText = new fabric.Text(lang.tipText[1],  Object.assign({
        left: 539 + 18 * 1.5,
        top: 56,
      }, this.config.text));
      this.myCanvas.add(objectiveTableText);

      this.tipsText = [];
      this.tipsText[0] = new fabric.Text(lang.tipText[2],  Object.assign({
        left: 536 + 18 * 1.5,
        top: 444,
      }, this.config.text));
      this.myCanvas.add(this.tipsText[0]);

      this.tipsText[1] = new fabric.Text(lang.tipText[3],  Object.assign({
        left: 536 + 18 * 1.5,
        top: 444,
        visible: false
      }, this.config.text));
      this.myCanvas.add(this.tipsText[1]);
    }

    limitElement(element: any, index: number, radius: number, xNumber: number, yNumber: number) {
      this.tipsText[1].set('visible', false);

      const rect = {
        left: element.get('left'),
        top: element.get('top'),
      };

      const x = 479.6 + 82 + xNumber;
      const y = 184.6 + 82 + yNumber;

      const scale =
        radius / Math.sqrt(Math.pow(rect.left - x, 2) + Math.pow(rect.top - y, 2));
      if (scale < 1) {
        const end = {
          y: y + (rect.top - y) * scale,
          x: x + (rect.left - x) * scale
        };

        element.set('left', end.x).setCoords();
        element.set('top', end.y).setCoords();
      }


      this.slideGlass[index].set('left', element.get('left')).setCoords();
      this.slideGlass[index].set('top', element.get('top')).setCoords();

      this.phase[index].set('left', this.config.objectiveLenseMask.left - (element.get('left') - x + xNumber) * 1.1).setCoords();
      this.phase[index].set('top', this.config.objectiveLenseMask.top - (element.get('top') - y + yNumber) * 1.1).setCoords();
    }

    // 绑定点击事件
    clickEvent() {
      this.slideGlass[0].on('mousedown', (e: any) => {
        if (!!this.anim) {
          this.anim.progress(0);
          this.anim.pause();
        }
        this.createAnim(0, this.config.slideGlassMaskEnd[0]);
        this.resetSlideGlass(0);
      });

      this.slideGlass[1].on('mousedown', (e: any) => {
        if (!!this.anim) {
          this.anim.progress(0);
          this.anim.pause();
        }
        this.createAnim(1, this.config.slideGlassMaskEnd[1]);
        this.resetSlideGlass(1);
      });

      this.slideGlass[2].on('mousedown', (e: any) => {
        if (!!this.anim) {
          this.anim.progress(0);
          this.anim.pause();
        }
        this.createAnim(2, this.config.slideGlassMaskEnd[2]);
        this.resetSlideGlass(2);
      });
    }

    // 点击执行的动画
    createAnim(index: number, config: any) {
      const x = 479.6 + 82;
      const y = 184.6 + 82;

      const tween = {
        left: this.slideGlass[index].get('left'),
        top: this.slideGlass[index].get('top'),
        scale: 103 / 606,
      };
      this.anim = TweenMax.to(tween, 1, {
        left: config.left,
        top: config.top,
        scale: config.scale,
        onStart: () => {
          this.tipsText[1].set('visible', false);
          this.slideGlassMask[index].set('visible', true);
        },
        onUpdate: () => {
          this.slideGlass[index].set('left', tween.left).setCoords();
          this.slideGlass[index].set('top', tween.top).setCoords();
          this.slideGlass[index].set('scaleX', tween.scale).setCoords();
          this.slideGlass[index].set('scaleY', tween.scale).setCoords();

          this.slideGlassMask[index].set('left', tween.left).setCoords();
          this.slideGlassMask[index].set('top', tween.top).setCoords();
          this.slideGlassMask[index].set('scaleX', tween.scale).setCoords();
          this.slideGlassMask[index].set('scaleY', tween.scale).setCoords();

          this.myCanvas.renderAll();
        },

        onComplete: () => {
          this.tipsText[1].set('visible', true);
          this.objectiveTable.set('visible', false);
          this.objectiveTableMask.set('visible', true);

          this.phase[index].set('left', this.config.objectiveLenseMask.left - (this.slideGlass[index].get('left') - x) * 1.1).setCoords();
          this.phase[index].set('top', this.config.objectiveLenseMask.top - (this.slideGlass[index].get('top') - y) * 1.1).setCoords();
          this.phase[index].set('visible', true);
          this.slideGlassMask[index].set('selectable', true);
          this.myCanvas.renderAll();
        },
        // paused: true,
        ease: Linear.easeNone
      });
    }

    // 重置盖玻片的位置
    resetSlideGlass(index: number) {
      this.tipsText[0].set('visible', false);
      this.objectiveTable.set('visible', true);
      this.objectiveTableMask.set('visible', false);
      for (let i = 0; i < this.slideGlass.length; i++) {
        if (i !== index) {
          this.slideGlassMask[i].set('visible', false);
          this.phase[i].set('visible', false);
          this.resetImage(this.slideGlass[i], this.config.slideGlass[i]);
        }
      }

    }

    // 重置
    reset() {
      if (!!this.anim) {
        this.anim.progress(0);
        this.anim.pause();
      }

      this.resetSlideGlass(-1);
      this.tipsText[0].set('visible', true);
      this.tipsText[1].set('visible', false);
      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();

      element.set('scaleX', config.scaleX).setCoords();
      element.set('scaleY', config.scaleY).setCoords();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 576 : width / 1024;

      this.myCanvas.setWidth(1024 * this.scale);
      this.myCanvas.setHeight(576 * this.scale);

      const container = document.getElementById('box').children[0];
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';
      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }
}

