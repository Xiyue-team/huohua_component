import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
import image7 from '../sub_static/img/image7.png';
import image8 from '../sub_static/img/image8.png';

import errorTipsImage from '../sub_static/img/errorTipsImage.png';

import { Anim } from './Anim';
import { ImageEvent } from './ImageEvent';

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

    leftImage: Array<Array<fabric.Image>>;
    rightImage: Array<Array<fabric.Image>>;

    // 解释说明文字
    explainText: Array<Array<fabric.Text>>;

    // 白框
    whiteFrame: Array<Array<fabric.Rect>>;
    whiteFrameName: Array<Array<string>>;

    // 文字
    bigText: Array<fabric.Text>;
    smallText: Array<fabric.Text>;

    // 检测是否碰撞且当前碰撞的白框内无填充
    dropFrame: Array<Array<boolean>> = [];

    // 存储填充进白框内元素的名字
    dropFrameName: Array<Array<string>>;

    // 判断是否填充
    dashFrameDrop: Array<Array<boolean>> = [];

    // 统计填充的数量 没填充一个加1
    dropQuantity = 0;

    anim: Anim;

    // 最后正确的填充排序 并 用于查看正确答案
    dropFrameNameTrue: Array<Array<string>>;

    // 错误提示
    errorTips: Array<Array<fabric.Group>>;

    // 存储填充后图片排序用于点击查看动画
    dropIndex: Array<Array<DropIndex>> = [];

    // 两个按钮
    reselectButton: fabric.Group;
    answerButton: fabric.Group;

    clickAnim: Array<Array<any>>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addRect();
      await this.addWhiteFrame();
      await this.addText();
      await this.addLeftImage();
      await this.addButton();
      await this.addRightImage();
      await this.addErrorTips();
      await this.addExplainText();
      await this.dragEvent();
      await this.buttonClickEvent();
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

    addRect() {
      this.leftRect = new fabric.Rect(this.config.leftRect);
      this.myCanvas.add(this.leftRect);

      this.rightRect = new fabric.Rect(this.config.rightRect);
      this.myCanvas.add(this.rightRect);

      this.grayRect = new fabric.Rect(this.config.grayRect);
      this.myCanvas.add(this.grayRect);
    }

    // 添加左侧的白色框
    addWhiteFrame() {
      this.whiteFrame = [];
      this.whiteFrameName = [];
      this.dropFrameName = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.whiteFrame[i] = [];
        this.whiteFrameName[i] = [];
        this.dropFrameName[i] = [];
        for (let j = 0; j < this.config.whiteFrame[i].length; j++) {
          this.whiteFrame[i][j] = new fabric.Rect(
            Object.assign({
              width: 183,
              height: 143,
              fill: 'rgba(255,255,255,0.48)',
              strokeWidth: 2,
              stroke: '#ffffff',
              selectable: false,
              visible: false,
              rx: 6.4,
              ry: 6.4,
              originX: 'center',
              originY: 'center',
            }, this.config.whiteFrame[i][j])
          );
          this.myCanvas.add(this.whiteFrame[i][j]);
          this.whiteFrameName[i][j] = this.config.rightImage[i][j].name;
          this.dropFrameName[i][j] = this.config.rightImage[i][j].name;
        }
      }
    }

    // 添加文字
    addText() {
      const lang = window.env.browserInfo.lang;
      // 添加大文字 在白框的中间
      this.bigText = [];
      this.smallText = [];
      for (let i = 0; i < this.config.bigText.length; i++) {
        this.bigText[i] = new fabric.Text(lang.tipText[i], {
          fontSize: 60,
          fill: '#ffffff',
          originX: 'center',
          originY: 'center',
          selectable: false,
        });
        this.myCanvas.add(this.bigText[i]);

        this.smallText[i] = new fabric.Text(lang.tipText[i], {
          fontSize: 30,
          fill: '#ffffff',
          originX: 'center',
          originY: 'center',
          visible: false,
          selectable: false
        });
        this.myCanvas.add(this.smallText[i]);
      }
    }

    // 添加右侧的按钮
    addButton() {
      this.reselectButton = this.createButton(window.env.browserInfo.lang.buttonText[0], this.config.reselectButton);
      this.myCanvas.add(this.reselectButton);

      this.answerButton = this.createButton(window.env.browserInfo.lang.buttonText[1], this.config.answerButton);
      this.myCanvas.add(this.answerButton);
    }

    createButton (text: string, config: any) {
      const circle = new fabric.Circle(this.config.circle);
      const buttonText = new fabric.Text(text, {
        left: circle.left + 90,
        top: circle.top + 90 - 20 * 0.5,
        fontSize: 40,
        scaleX: 0.5,
        scaleY: 0.5,
        fill: '#ffffff',
        originX: 'center',
        selectable: false
      });

      const button = new fabric.Group([circle, buttonText], config);

      return button;
    }

    // 添加右侧的图片
    async addRightImage() {
      const src = [
        [image1, image2],
        [image3, image4],
        [image5, image6],
        [image7, image8]
      ];
      this.rightImage = [];
      this.dropIndex = [];
      this.dropFrameNameTrue = [];
      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.rightImage[i] = [];
        this.dashFrameDrop[i] = [];
        this.dropIndex[i] = [];
        this.dropFrameNameTrue[i] = [];
        for (let j = 0; j < this.config.rightImage[i].length; j++) {
          this.rightImage[i][j] = await FabricUtil.loadImage(src[i][j], {
            width: 183 * 2,
            height: 143 * 2,
            hasControls: false,
            hasBorders: false,
            scaleX: 0.5 * this.config.imgScale,
            scaleY: 0.5 * this.config.imgScale,
            originX: 'center',
            originY: 'center',
            name: this.config.rightImage[i][j].name,
          });
          this.myCanvas.add(this.rightImage[i][j]);
          this.dashFrameDrop[i][j] = false;
          this.dropFrameNameTrue[i][j] = this.config.rightImage[i][j].name;
          const dropIndex = new DropIndex();
          dropIndex.groupIndex = i;
          dropIndex.singleIndex = j;
          this.dropIndex[i][j] = dropIndex;
        }
      }
    }

    // 添加左侧的图片
    async addLeftImage() {
      const src = [
        [image1, image2],
        [image3, image4],
        [image5, image6],
        [image7, image8]
      ];
      const rect = new fabric.Rect({
        width: 0,
        height: 143,
        fill: '#000000'
      });
      this.leftImage = [];
      for (let i = 0; i < this.config.rightImage.length; i++) {
        this.leftImage[i] = [];
        for (let j = 0; j < this.config.rightImage[i].length; j++) {
          this.leftImage[i][j] = await FabricUtil.loadImage(src[i][j], {
            width: 183 * 2,
            height: 143 * 2,
            hasControls: false,
            hasBorders: false,
            scaleX: 0.5,
            scaleY: 0.5,
            originX: 'center',
            originY: 'center',
            selectable: false,
            visible: false,
            name: this.config.rightImage[i][j].name,
          });
          this.leftImage[i][j].set('clipTo', (ctx: any) => {
            rect._render(ctx);
          });
          this.myCanvas.add(this.leftImage[i][j]);
        }
      }
    }

    addExplainText() {
      const lang = window.env.browserInfo.lang;
      this.explainText = [];
      for (let i = 0; i < this.leftImage.length; i++) {
        this.explainText[i] = [];
        for (let j = 0; j < this.leftImage[i].length; j++) {
          this.explainText[i][j] = new fabric.Text(lang.explainText[i][j],
          {
            selectable: false,
            fill: '#ffffff',
            fontSize: 16,
            visible: false,
            originX: 'center'
          });
          this.myCanvas.add(this.explainText[i][j]);
        }
      }
    }

    // 添加错误提示
    async addErrorTips() {
      this.errorTips = [];
      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        this.errorTips[i] = [];
        for (let j = 0; j < this.config.whiteFrame[i].length; j++) {
          this.errorTips[i][j] = await this.createErrorTips(this.config.whiteFrame[i][j]);
          this.myCanvas.add(this.errorTips[i][j]);
        }
      }
    }

    async createErrorTips( config: any ) {
      const rect = new fabric.Rect({
        width: 183,
        height: 143,
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
        left: 183 * 0.5 - 24,
        top: 143 * 0.5 - 24
      });

      const errorTips = new fabric.Group([rect, image], Object.assign(config, {
        selectable: false,
        originX: 'center',
        originY: 'center',
        visible: false,
      }));

      return errorTips;
    }

    dragEvent() {
      const imageEvent = new ImageEvent(this);

      for (let i = 0; i < this.config.rightImage.length; i++) {
        for (let j = 0; j < this.config.rightImage[i].length; j++) {
          imageEvent.imageDragEvent( this.rightImage[i][j], this.config.rightImage[i][j], this.whiteFrame, i, j);
        }
      }
    }

    buttonClickEvent() {
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
        for (let i = 0; i < this.dropFrameName.length; i++) {
          // 填充错误显示提示
          this.clickAnim[i] = [];
          for (let j = 0; j < this.dropFrameName[i].length; j++) {
            if (this.dropFrameName[i][j] !== this.dropFrameNameTrue[i][j]) {
              let dropSingleIndex = 0;
              const groupIndex = this.dropIndex[i][j].groupIndex;
              const singleIndex = this.dropIndex[i][j].singleIndex;

              if (this.leftImage[i][0].name === this.dropFrameNameTrue[i][j]) {
                dropSingleIndex = 0;
              } else {
                dropSingleIndex = 1;
              }
              this.clickAnim[i][j] = this.clickAnimFalse(
                this.errorTips[i][j],
                this.rightImage[groupIndex][singleIndex],
                this.leftImage[i][dropSingleIndex],
                this.explainText
              );
            }
          }
        }
      });
    }

    // 查看答案触发的动画
    clickAnimFalse(errorTips: fabric.Group, falseImage: fabric.Image, trueImage: fabric.Image, explainText: Array<Array<fabric.Text>>) {
      const clickAnim = this.anim.clickAnimFalse(errorTips, falseImage, trueImage, explainText);
      return clickAnim;
    }

    // 重置
    reset() {

      if (this.clickAnim) {
        for (let i = 0; i < this.clickAnim.length; i++) {
          for (let j = 0; j < this.clickAnim[i].length; j++) {
            if (this.clickAnim[i][j]) {
              this.clickAnim[i][j][0].progress(0);
              this.clickAnim[i][j][0].pause();

              this.clickAnim[i][j][1].progress(0);
              this.clickAnim[i][j][1].pause();
            }
          }
        }
      }

      this.dropQuantity = 0;
      const leftImageRect = new fabric.Rect({
        width: 0,
        height: 143,
        fill: '#000000'
      });

      const rightImageRect = new fabric.Rect({
        width: 183 * 2,
        height: 143 * 2,
        fill: ''
      });

      const errorTipsRect = new fabric.Rect({
        width: this.errorTips[0][0].get('width'),
        height: this.errorTips[0][0].get('height'),
        fill: ''
      });

      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        for (let j = 0; j < this.config.whiteFrame[i].length; j++) {
          this.rightImage[i][j].set('scaleX', 0.5 * this.config.imgScale);
          this.rightImage[i][j].set('scaleY', 0.5 * this.config.imgScale);
          this.rightImage[i][j].set('selectable', true);
          this.rightImage[i][j].set('visible', true);

          this.leftImage[i][j].set('visible', false);
          this.explainText[i][j].set('visible', false);
          this.errorTips[i][j].set('visible', false);
          this.dashFrameDrop[i][j] = false;

          this.leftImage[i][j].set('clipTo', (ctx: any) => {
            leftImageRect._render(ctx);
          });

          this.errorTips[i][j].set('clipTo', (ctx: any) => {
            errorTipsRect._render(ctx);
          });

          this.rightImage[i][j].set('clipTo', (ctx: any) => {
            rightImageRect._render(ctx);
          });

        }
      }

      this.resize();

      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    }

    // 重置元素的位置
    resetImage(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

      this.myCanvas.setWidth(width);
      this.myCanvas.setHeight(height);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

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

      for (let i = 0; i < this.config.whiteFrame.length; i++) {
        for (let j = 0; j < this.config.whiteFrame[i].length; j++) {
          this.whiteFrame[i][j].set('left', this.leftRect.get('left')
            + this.config.whiteFrame[i][j].left + this.whiteFrame[i][j].get('width') * 0.5).setCoords();
          this.whiteFrame[i][j].set('top', this.leftRect.get('top')
            + this.config.whiteFrame[i][j].top + this.whiteFrame[i][j].get('height') * 0.5).setCoords();

          this.errorTips[i][j].set('left', this.whiteFrame[i][j].get('left')).setCoords();
          this.errorTips[i][j].set('top', this.whiteFrame[i][j].get('top')).setCoords();
        }

      }

      for (let i = 0; i < this.config.bigText.length; i++) {
        this.bigText[i].set('left', this.leftRect.get('left') + this.config.bigText[i].left).setCoords();
        this.bigText[i].set('top', this.leftRect.get('top') + this.config.bigText[i].top).setCoords();

        this.smallText[i].set('left', this.leftRect.get('left') + this.config.smallText[i].left).setCoords();
        this.smallText[i].set('top', this.leftRect.get('top') + this.config.smallText[i].top).setCoords();

        if (this.leftImage[i][0].name === this.dropFrameNameTrue[i][0]) {
          this.leftImage[i][0].set('left', this.errorTips[i][0].get('left'));
          this.leftImage[i][1].set('left', this.errorTips[i][1].get('left'));
          this.leftImage[i][0].set('top', this.errorTips[i][0].get('top'));
          this.leftImage[i][1].set('top', this.errorTips[i][1].get('top'));
        } else {
          this.leftImage[i][1].set('left', this.errorTips[i][0].get('left'));
          this.leftImage[i][0].set('left', this.errorTips[i][1].get('left'));
          this.leftImage[i][1].set('top', this.errorTips[i][0].get('top'));
          this.leftImage[i][0].set('top', this.errorTips[i][1].get('top'));

        }

        for (let j = 0; j < this.config.whiteFrame[i].length; j++) {
          this.explainText[i][j].set('left', this.leftImage[i][j].get('left')).setCoords();
          this.explainText[i][j].set('top', this.leftImage[i][j].get('top') + 48).setCoords();
        }
      }

      this.resizeImage();
      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }

    resizeImage() {
      for (let i = 0; i < this.config.rightImage.length; i++) {
        for (let j = 0; j < this.config.rightImage[i].length; j++) {
          let left = this.rightRect.get('left') + this.config.rightImage[i][j].left + 183 * 0.5 * this.config.imgScale;
          let top = this.rightRect.get('top') + this.config.rightImage[i][j].top + 143 * 0.5 * this.config.imgScale;

          if (this.rightImage[i][j].get('scaleX') === 0.5) {
            const groupIndex = this.dropIndex[i][j].dropGroupIndex;
            const singleIndex = this.dropIndex[i][j].dropSingleIndex;
            left = this.leftRect.get('left') + this.config.whiteFrame[groupIndex][singleIndex].left + 183 * 0.5;
            top = this.leftRect.get('top') + this.config.whiteFrame[groupIndex][singleIndex].top + 143 * 0.5;
          }

          this.rightImage[i][j].set('left', left).setCoords();
          this.rightImage[i][j].set('top', top).setCoords();
        }
      }
    }
}

export class DropIndex {
  // 填充后图片的排序
  groupIndex: number;
  singleIndex: number;

  // 填充后图片填充位置的排序
  dropGroupIndex: number;
  dropSingleIndex: number;
}
