import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
import errorTipsImage from '../sub_static/img/errorTipsImage.png';

import { Anim } from './Anim';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;
    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    // 参照物矩形
    leftRect: fabric.Rect;
    rightRect: fabric.Rect;

    // 右侧灰色背景
    grayRect: fabric.Rect;

    whiteFrame: Array<fabric.Rect>;
    // 正确的填充答案
    dropTrueImage: Array<fabric.Image>;

    // 文字
    bigText: Array<fabric.Text>;
    smallText: Array<fabric.Text>;

    rightImage: Array<fabric.Image>;

    // 检测是否碰撞且当前碰撞的白框内无填充
    dropFrame: Array<boolean> = [];

    // 获取填充是否正确
    dropBoolean: Array<boolean> = [];

    // 判断是否填充
    dashFrameDrop: Array<boolean> = [];

    // 统计填充的数量 没填充一个加1
    dropQuantity = 0;

    // 存储填充后排序用于resize
    dropIndex: Array<number> = [];

    // 重新选择按钮
    reselectButton: fabric.Group;

    // 查看答案按钮
    answerButton: fabric.Group;

    // 错误提示
    errorTips: Array<fabric.Group>;

    anim: Anim;

    clickAnim: Array<any>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addRect();
      await this.addWhiteFrame();
      await this.addDropTrueImage();
      await this.addText();
      await this.addButton();
      await this.addRightImage();
      await this.addSmallText();
      await this.addErrorTips();
      await this.dragEvent();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = window.innerWidth;
      (document.getElementById('cardImageCanvas1') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '#5FB4B1',
      });
      this.myCanvas.selection = false;

      this.anim = new Anim(this.myCanvas, this.config);
    }

    async addRect() {
      this.leftRect = await new fabric.Rect(this.config.leftRect);
      this.myCanvas.add(this.leftRect);

      this.rightRect = await new fabric.Rect(this.config.rightRect);
      this.myCanvas.add(this.rightRect);

      this.grayRect = new fabric.Rect(this.config.grayRect);
      this.myCanvas.add(this.grayRect);
    }

    // 添加左侧的白色框
    addWhiteFrame() {
      this.whiteFrame = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.whiteFrame[i] = new fabric.Rect(
          Object.assign({
            width: 232,
            height: 200,
            fill: 'rgba(255,255,255,0.48)',
            strokeWidth: 2,
            stroke: '#ffffff',
            selectable: false,
            rx: 6.4,
            ry: 6.4,
            originX: 'center',
            originY: 'center',
          }, this.config.whiteFrame[i])
        );

        this.dropBoolean[i] = false;
        this.dashFrameDrop[i] = false;
        this.dropIndex[i] = i;
        this.myCanvas.add(this.whiteFrame[i]);
      }
    }

    // 添加正确的填充答案
    async addDropTrueImage() {
      this.dropTrueImage = [];
      const src = [image1, image2, image3, image4, image5, image6];

      const rect = new fabric.Rect({
        width: 0,
        height: 200,
        fill: '#000000'
      });

      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.dropTrueImage[i] = await FabricUtil.loadImage(src[i], {
          width: 232 * 2,
          height: 200 * 2,
          selectable: false,
          scaleX: 0.5,
          scaleY: 0.5,
          originX: 'center',
          originY: 'center',
          left: this.config.whiteFrame[i].left,
          top: this.config.whiteFrame[i].top,
          visible: false
        });
        this.dropTrueImage[i].set('clipTo', (ctx: any) => {
          rect._render(ctx);
        });
        this.myCanvas.add(this.dropTrueImage[i]);
      }
    }

    // 添加右侧的按钮
    addButton() {
      this.reselectButton = this.createButton(window.env.browserInfo.lang.buttonText[0], this.config.reselectButton);
      this.myCanvas.add(this.reselectButton);

      this.answerButton = this.createButton(window.env.browserInfo.lang.buttonText[1], this.config.answerButton);
      this.myCanvas.add(this.answerButton);

      this.reselectButton.on('mousedown', (e: any) => {
        this.reselectButton.set('visible', false);
        this.answerButton.set('visible', false);
        (this.answerButton as any)._objects[0].set('fill', 'rgba(255,255,255,0.20)');
        (this.answerButton as any)._objects[1].set('fill', '#ffffff');
        this.reset();
      });

      this.answerButton.on('mousedown', (e: any) => {
        if ((this.answerButton as any)._objects[0].get('fill') === '#ffffff') {
          return;
        } else {
          (this.answerButton as any)._objects[0].set('fill', '#ffffff');
          (this.answerButton as any)._objects[1].set('fill', '#61B5B2');
        }

        this.clickAnim = [];
        for (let i = 0; i < this.dropBoolean.length; i++) {
          if (!this.dropBoolean[i]) {
            this.clickAnim[i] = this.clickAnimFalse(this.errorTips[i], this.rightImage[i], this.dropTrueImage[i]);
          }
        }
      });
    }

    createButton (text: string, config: any) {
      const circle = new fabric.Circle(this.config.circle);
      const buttonText = new fabric.Text(text, {
        left: circle.left + 90 - text.length * 0.5 * 20,
        top: circle.top + 90 - 20 * 0.5,
        fontSize: 40,
        scaleX: 0.5,
        scaleY: 0.5,
        fill: '#ffffff',
        selectable: false
      });

      const button = new fabric.Group([circle, buttonText], config);

      return button;
    }

    // 添加文字
    addText() {
      const lang = window.env.browserInfo.lang;
      // 添加大文字 在白框的中间
      this.bigText = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.bigText[i] = new fabric.Text(lang.tipText[i], {
          left: this.whiteFrame[i].left + this.whiteFrame[i].width * 0.5 - lang.tipText[i].length * 60 * 0.5,
          top: this.whiteFrame[i].top + this.whiteFrame[i].height * 0.5 - 20,
          fontSize: 60,
          fill: '#ffffff',
          selectable: false
        });
        this.myCanvas.add(this.bigText[i]);
      }
    }

    addSmallText() {
      const lang = window.env.browserInfo.lang;
      // 添加小文字在白框的顶部
      this.smallText = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.smallText[i] = new fabric.Text(lang.tipText[i], {
          left: this.whiteFrame[i].left,
          top: this.whiteFrame[i].top - this.whiteFrame[i].height * 0.5  + 8,
          fontSize: 28,
          fill: '#ffffff',
          originX: 'center',
          visible: false,
          selectable: false
        });
        this.myCanvas.add(this.smallText[i]);
      }
    }

    // 添加右侧的图片
    async addRightImage() {
      const src = [image1, image2, image3, image4, image5, image6];
      this.rightImage = [];

      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.rightImage[i] = await FabricUtil.loadImage(src[i], {
          width: 232 * 2,
          height: 200 * 2,
          hasControls: false,
          hasBorders: false,
          scaleX: 0.5 * this.config.imgScale,
          scaleY: 0.5 * this.config.imgScale,
          originX: 'center',
          originY: 'center',
          left: this.config.rightImage[i].left,
          top: this.config.rightImage[i].top,
        });
        this.myCanvas.add(this.rightImage[i]);
      }
    }

    // 添加错误提示
    async addErrorTips() {
      this.errorTips = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.errorTips[i] = await this.createErrorTips(this.config.whiteFrame[i]);
        this.myCanvas.add(this.errorTips[i]);
      }
    }

    // 绑定拖动事件
    dragEvent() {
      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.imageDragEvent( this.rightImage[i], this.config.rightImage[i], this.whiteFrame, i);
      }
    }

    async createErrorTips( config: any ) {
      const rect = new fabric.Rect({
        width: 232,
        height: 200,
        fill: 'rgba(240,42,66,0.30)',
        strokeWidth: 2,
        stroke: '#F02A42',
        selectable: false,
        rx: 6.4,
        ry: 6.4,
        left: 0,
        top: 0
      });

      const image = await FabricUtil.loadImage(errorTipsImage, {
        width: 48 * 2,
        height: 48 * 2,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 116 - 24,
        top: 100 - 24
      });

      const errorTips = new fabric.Group([rect, image], Object.assign(config, {
        selectable: false,
        visible: false,
      }));

      return errorTips;
    }

    imageDragEvent(element: fabric.Image, config: any, whiteFrame: Array<fabric.Rect>, index: number) {
      element.on('moving', (e: any) => {
        this.limitElement(element);
      });

      element.on({'modified': (e: any) => {
          for (let i = 0; i < whiteFrame.length; i++) {
            this.dropFrame[i] = e.target.intersectsWithObject(whiteFrame[i]) && !this.dashFrameDrop[i];
            if (this.dropFrame[i]) {
              element.set('selectable', false);
              this.collisionEvent(element, whiteFrame[i]);
              this.dashFrameDrop[i] = true;
              this.dropQuantity += 1;
              this.bigText[i].set('visible', false);
              this.smallText[i].set('visible', true);
              if (i === index) {
                this.dropBoolean[index] = true;
              }

              if (this.dropQuantity === 6) {
                this.whiteFrameFilled();
              }


              this.dropIndex[index] = i;
            }
          }

          if (
            !this.dropFrame[0] && !this.dropFrame[1] && !this.dropFrame[2] &&
            !this.dropFrame[3] && !this.dropFrame[4] && !this.dropFrame[5]
          ) {
            this.collisionFalseEvent(element, config);
          }

          this.myCanvas.discardActiveObject();
      }});
    }

    // 碰撞之后的反应
    collisionEvent(element: fabric.Image, rect: fabric.Rect) {
      this.anim.collisionEvent(element, rect);
    }

    // 碰撞错误的反应
    collisionFalseEvent(element: fabric.Image, config: any) {
      this.anim.collisionFalseEvent(element, config, this.rightRect);
    }

    // 填充满6个后触发的事件
    whiteFrameFilled() {
      for (let i = 0; i < this.dropBoolean.length; i++) {
        this.errorTips[i].set('visible', !this.dropBoolean[i]);
      }
      this.reselectButton.set('visible', true);
      this.answerButton.set('visible', true);

      // 如果全正确直接选中查看答案按钮
      let dropBoolean = true;
      for (let i = 0; i < this.dropBoolean.length; i++) {
        dropBoolean = dropBoolean && this.dropBoolean[i];
      }

      if (dropBoolean) {
        (this.answerButton as any)._objects[0].set('fill', '#ffffff');
        (this.answerButton as any)._objects[1].set('fill', '#61B5B2');
      }

      this.myCanvas.renderAll();
    }

    // 限制在画布内拖动
    limitElement(element: fabric.Image) {
      if (element.top < 200 * this.config.imgScale * 0.5) {
        element.set('top', 200 * this.config.imgScale * 0.5).setCoords();
      }

      if (element.left < 232 * 0.5 * this.config.imgScale) {
        element.set('left', 232 * 0.5 * this.config.imgScale).setCoords();
      }

      const left = window.innerWidth / this.scale - element.width * element.scaleX * 0.5;

      if (element.left > left) {
        element.set('left', left).setCoords();
      }

      const top = window.innerHeight / this.scale - element.height * element.scaleY * 0.5;

      if (element.top > top) {
        element.set('top', top).setCoords();
      }
    }

    // 查看答案触发的动画
    clickAnimFalse(errorTips: fabric.Group, falseImage: fabric.Image, trueImage: fabric.Image) {
      const anim = this.anim.clickAnimFalse(errorTips, falseImage, trueImage);
      return anim;
    }

    // 重置
    reset() {
      if (this.clickAnim) {
        for (let i = 0; i < this.clickAnim.length; i++) {
          if (this.clickAnim[i]) {
            this.clickAnim[i][0].progress(0);
            this.clickAnim[i][0].pause();

            this.clickAnim[i][1].progress(0);
            this.clickAnim[i][1].pause();
          }
        }
      }

      this.dropQuantity = 0;
      for (let i = 0; i < this.rightImage.length; i++) {
        this.rightImage[i].set('selectable', true).setCoords();
        this.rightImage[i].set('scaleX',  0.5 * this.config.imgScale).setCoords();
        this.rightImage[i].set('scaleY',  0.5 * this.config.imgScale).setCoords();
        this.rightImage[i].set('visible', true).setCoords();

        const rightImageRect = new fabric.Rect({
          width: this.rightImage[i].width,
          height: this.rightImage[i].height,
          fill: '#000000'
        });
        this.rightImage[i].set('clipTo', (ctx: any) => {
          rightImageRect._render(ctx);
        });

        this.bigText[i].set('visible', true);
        this.smallText[i].set('visible', false);

        this.dashFrameDrop[i] = false;
        this.dropBoolean[i] = false;
        this.resizeImage();
      }

      const dropTrueImageRect = new fabric.Rect({
        width: 0,
        height: 200,
        fill: ''
      });

      const errorTipsRect = new fabric.Rect({
        width: this.errorTips[0].get('width'),
        height: this.errorTips[0].get('height'),
        fill: ''
      });

      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.dropTrueImage[i].set('clipTo', (ctx: any) => {
          dropTrueImageRect._render(ctx);
        });

        this.errorTips[i].set('clipTo', (ctx: any) => {
          errorTipsRect._render(ctx);
        });

        this.errorTips[i].set('visible', false).setCoords();
        this.dropTrueImage[i].set('visible', false).setCoords();
      }

      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resize() {
      // 重置canvas的大小
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

      this.myCanvas.setWidth(width);
      this.myCanvas.setHeight(height);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      // 重新设置图片的位置
      this.rightRect.set('left', width / this.scale - this.rightRect.get('width')).setCoords();
      this.rightRect.set('top', height * 0.5 / this.scale - this.rightRect.get('height') * 0.5).setCoords();

      this.leftRect.set('left', (width / this.scale - this.rightRect.get('width')) / 2 - this.leftRect.get('width') * 0.5).setCoords();
      this.leftRect.set('top', height * 0.5 / this.scale - this.leftRect.get('height') * 0.5).setCoords();

      this.grayRect.set('height', height / this.scale);
      this.grayRect.set('left', this.rightRect.get('left'));
      this.grayRect.set('top', 0);

      this.reselectButton.set('left', this.rightRect.get('left') + this.config.reselectButton.left).setCoords();
      this.reselectButton.set('top', this.rightRect.get('top') + this.config.reselectButton.top).setCoords();

      this.answerButton.set('left', this.rightRect.get('left') + this.config.answerButton.left).setCoords();
      this.answerButton.set('top', this.rightRect.get('top') + this.config.answerButton.top).setCoords();

      for (let i = 0; i < this.whiteFrame.length; i++) {
        this.whiteFrame[i].set('left', this.leftRect.get('left') + this.config.whiteFrame[i].left + 232 * 0.5 ).setCoords();
        this.whiteFrame[i].set('top', this.leftRect.get('top') + this.config.whiteFrame[i].top + 200 * 0.5).setCoords();

        this.dropTrueImage[i].set('left', this.leftRect.get('left') + this.config.whiteFrame[i].left + 232 * 0.5 ).setCoords();
        this.dropTrueImage[i].set('top', this.leftRect.get('top') + this.config.whiteFrame[i].top + 200 * 0.5).setCoords();

        this.errorTips[i].set('left', this.leftRect.get('left') + this.config.whiteFrame[i].left).setCoords();
        this.errorTips[i].set('top', this.leftRect.get('top') + this.config.whiteFrame[i].top).setCoords();

        this.bigText[i].set('left', this.whiteFrame[i].left + this.whiteFrame[i].width * 0.5
          - window.env.browserInfo.lang.tipText[i].length * 60 * 0.5 - 232 * 0.5
        ).setCoords();
        this.bigText[i].set('top', this.whiteFrame[i].top + this.whiteFrame[i].height * 0.5 - 30 - 200 * 0.5).setCoords();

        this.smallText[i].set('left', this.whiteFrame[i].left).setCoords();
        this.smallText[i].set('top', this.whiteFrame[i].top - this.whiteFrame[i].height * 0.5  + 8).setCoords();
      }

      this.resizeImage();

      this.myCanvas.setZoom(this.scale);

      this.myCanvas.renderAll();
    }

    resizeImage() {
      for (let i = 0; i < this.rightImage.length; i++) {
        let left = this.rightRect.get('left') + this.config.rightImage[i].left + 232 * 0.5 * this.config.imgScale;
        let top = this.rightRect.get('top') + this.config.rightImage[i].top + 200 * 0.5 * this.config.imgScale;

        if (this.rightImage[i].get('scaleX') === 0.5 * 154 / 232) {
          left = this.rightRect.get('left') + this.config.rightImage[i].left + 232 * 0.5 * this.config.imgScale;
          top = this.rightRect.get('top') + this.config.rightImage[i].top + 200 * 0.5 * this.config.imgScale;
        } else if (this.rightImage[i].get('scaleX') === 0.5) {
          left = this.leftRect.get('left') + this.config.whiteFrame[this.dropIndex[i]].left + 232 * 0.5;
          top = this.leftRect.get('top') + this.config.whiteFrame[this.dropIndex[i]].top + 200 * 0.5;
        }

        this.rightImage[i].set('left', left).setCoords();
        this.rightImage[i].set('top', top).setCoords();
      }
    }

}

