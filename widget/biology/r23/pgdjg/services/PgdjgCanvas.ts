import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import * as apple from '../sub_static/apple.png';
import { PgdjgConfig } from './PgdjgConfig';
import { ImageConfig } from 'konva';
import { CanvasHelper } from './CanvasHelper';
export class PgdjgCanvas extends SimpleKonvaTemplate {
    private apple: Konva.Image;

    private config = new PgdjgConfig();
    private canvasHelper = new CanvasHelper();
    //提示文字
    private prompt: Konva.Text[] = [];
    //控制提示文字只出现一次
    private promptControl = true;

    //圆点
    private pulpPoint: Konva.Circle;
    private seedPoint: Konva.Circle;
    private peelPoint: Konva.Circle;

    //直线
    private pulpLine: Konva.Line;
    private seedLine: Konva.Line;
    private peelLine: Konva.Line;

    //矩形文本框
    private pulpRect: Konva.Group;
    private seedRect: Konva.Group;
    private peelRect: Konva.Group;

    //层
    private pointLayer: Konva.Layer;
    private lineLayer: Konva.Layer;
    private textLayer: Konva.Layer;
    private promptLayer: Konva.Layer;

    //点缩放动画数组
    private pulpPointAnimation: any[] = [];
    private seedPointAnimation: any[] = [];
    private peelPointAnimation: any[] = [];

    //线缩放动画数组
    private pulpLineAnimation: any[] = [];
    private seedLineAnimation: any[] = [];
    private peelLineAnimation: any[] = [];

    private rectAniamtion: any[] = [];

    constructor() {
        super('3dContainer');
        this.initImage();
        this.createPromptText();
        this.createPoint();
        this.createLine();
        this.createTextLabel();
        this.initPointScaleAnimation();
        this.initLineScaleAnimation();
        this.bindEventToLabel();
        this.stage.add(this.pointLayer, this.lineLayer, this.textLayer, this.promptLayer);

    }


    async initImage() {
      this.apple = await this.loadImage((apple as any), this.config.appleImage as ImageConfig);
      this.staticLayer.add(this.apple);
      this.staticLayer.draw();
    }

    //创建圆点
    createPoint() {
      this.pointLayer = new Konva.Layer();
      this.pulpPoint = this.canvasHelper.pointHelper(this.config.pulpCircleConfig);
      this.seedPoint = this.canvasHelper.pointHelper(this.config.seedCircleConfig);
      this.peelPoint = this.canvasHelper.pointHelper(this.config.peelCircleConfig);
      this.pointLayer.add(this.pulpPoint, this.seedPoint, this.peelPoint);
    }

    //创建直线
    createLine() {
      this.lineLayer = new Konva.Layer();
      this.pulpLine = this.canvasHelper.lineHelper(this.config.pulpLineConfig);
      this.seedLine = this.canvasHelper.lineHelper(this.config.seedLineConfig);
      this.peelLine = this.canvasHelper.lineHelper(this.config.peelLineConfig);
      this.lineLayer.add( this.pulpLine, this.seedLine, this.peelLine);
    }

    //创建可拖动的文字标签
    createTextLabel() {
      this.textLayer = new Konva.Layer();
      this.pulpRect = this.canvasHelper.rectHelper(this.config.pulpTextConfig, this.config.pulpGroupConfig);
      this.seedRect = this.canvasHelper.rectHelper(this.config.seedTextConfig, this.config.seedGroupConfig);
      this.peelRect = this.canvasHelper.rectHelper(this.config.peelTextConfig, this.config.peelGroupConfig);
      this.textLayer.add( this.pulpRect, this.seedRect, this.peelRect);
    }

    //初始化点缩放的动画
    initPointScaleAnimation() {
      this.pulpPointAnimation[1] = this.canvasHelper.createScaleAnimation(     //0.4-0
        this.pulpPoint, this.pointLayer, this.config.animationScaleOption2, () => {
          this.pulpPointAnimation[2].pause(); this.pulpPointAnimation[2].progress(0); });
      this.pulpPointAnimation[0] = this.canvasHelper.createScaleAnimation(     //1-0.4
        this.pulpPoint, this.pointLayer, this.config.animationScaleOption1,
        () => { this.pulpPointAnimation[1].play(); });
      this.pulpPointAnimation[2] = this.canvasHelper.createScaleAnimation(     //0-0.4
        this.pulpPoint, this.pointLayer, this.config.animationScaleOption3, () => {
          this.pulpPointAnimation[1].pause(); this.pulpPointAnimation[1].progress(0); });
      this.pulpPointAnimation[3] = this.canvasHelper.createScaleAnimation(     //0.4-1
        this.pulpPoint, this.pointLayer, this.config.animationScaleOption4);

      this.seedPointAnimation[0] =  this.canvasHelper.createScaleAnimation(
       this.seedPoint, this.pointLayer, this.config.animationScaleOption1, () => {this.seedPointAnimation[1].play(); });
      this.seedPointAnimation[1] =  this.canvasHelper.createScaleAnimation(
       this.seedPoint, this.pointLayer, this.config.animationScaleOption2, () => {
          this.seedPointAnimation[2].pause(); this.seedPointAnimation[2].progress(0); });
      this.seedPointAnimation[2] =  this.canvasHelper.createScaleAnimation(
       this.seedPoint, this.pointLayer, this.config.animationScaleOption3, () => {
          this.seedPointAnimation[1].pause(); this.seedPointAnimation[1].progress(0); });
      this.seedPointAnimation[3] =  this.canvasHelper.createScaleAnimation(
       this.seedPoint, this.pointLayer, this.config.animationScaleOption4);

      this.peelPointAnimation[0] =  this.canvasHelper.createScaleAnimation(
       this.peelPoint, this.pointLayer, this.config.animationScaleOption1, () => {this.peelPointAnimation[1].play(); });
      this.peelPointAnimation[1] =  this.canvasHelper.createScaleAnimation(
       this.peelPoint, this.pointLayer, this.config.animationScaleOption2, () => {
         this.peelPointAnimation[2].pause(); this.peelPointAnimation[2].progress(0); });
      this.peelPointAnimation[2] =  this.canvasHelper.createScaleAnimation(
       this.peelPoint, this.pointLayer, this.config.animationScaleOption3, () => {
          this.peelPointAnimation[1].pause(); this.peelPointAnimation[1].progress(0); });
      this.peelPointAnimation[3] =  this.canvasHelper.createScaleAnimation(
       this.peelPoint, this.pointLayer, this.config.animationScaleOption4);
    }

    //初始化线动画
    initLineScaleAnimation() {
      this.pulpLineAnimation[0] = this.canvasHelper.createLineAnimation(this.pulpLine,
        this.lineLayer, this.config.pulpLineAnimationOption1, 0.5, () => { this.pulpLineAnimation[1].progress(0);
        this.pulpLineAnimation[1].pause(); });
      this.pulpLineAnimation[1] = this.canvasHelper.createLineAnimation(this.pulpLine,
        this.lineLayer, this.config.pulpLineAnimationOption2, 0.5, () => { this.pulpLineAnimation[0].progress(0);
        this.pulpLineAnimation[0].pause(); });

      this.seedLineAnimation[0] = this.canvasHelper.createLineAnimation(this.seedLine,
        this.lineLayer, this.config.seedLineAnimationOption1, 0.5, () => { this.seedLineAnimation[1].progress(0);
        this.seedLineAnimation[1].pause(); });
      this.seedLineAnimation[1] = this.canvasHelper.createLineAnimation(this.seedLine,
        this.lineLayer, this.config.seedLineAnimationOption2, 0.5, () => { this.seedLineAnimation[0].progress(0);
        this.seedLineAnimation[0].pause(); });

      this.peelLineAnimation[0] = this.canvasHelper.createLineAnimation(this.peelLine,
        this.lineLayer, this.config.peelLineAnimationOption1, 0.5, () => { this.peelLineAnimation[1].progress(0);
        this.peelLineAnimation[1].pause(); });
      this.peelLineAnimation[1] = this.canvasHelper.createLineAnimation(this.peelLine,
        this.lineLayer, this.config.peelLineAnimationOption2, 0.5, () => { this.peelLineAnimation[0].progress(0);
        this.peelLineAnimation[0].pause(); });
    }

    //给文字标签绑定事件
    bindEventToLabel() {

      this.canvasHelper.bindingEvent(this.pulpRect, 'dragstart', () => {
        this.pulpLineAnimation[0].play();
        this.pulpPointAnimation[0].play();
        this.prompt[0].visible(false);
        this.promptLayer.draw();
      });

      this.canvasHelper.bindingEvent(this.pulpRect, 'dragmove', () => {     //果肉
        if (this.canvasHelper.isCollision({
          x: this.pulpRect.x(),
          y: this.pulpRect.y(),
          w: this.config.rectConfig.width,
          h: this.config.rectConfig.height},
          this.config.pulpBigCircle, this.config.pulpSmallCircle, this.config.disableDragRect)) {

          if (this.pulpPointAnimation[0].isActive() === false) {
            this.pulpPointAnimation[2].play();
          }

        } else {
          if (this.pulpPointAnimation[2].isActive() === false &&
            this.pulpPointAnimation[0].isActive() === false && this.pulpPointAnimation[1].isActive() === false) {

            this.pulpPointAnimation[1].play();

          }
        }
      });

      this.canvasHelper.bindingEvent(this.pulpRect, 'dragend', () => {
        this.isShowPromptText();
        if (this.canvasHelper.isCollision({
            x: this.pulpRect.x(),
            y: this.pulpRect.y(),
            w: this.config.rectConfig.width,
            h: this.config.rectConfig.height},
          this.config.pulpBigCircle, this.config.pulpSmallCircle, this.config.disableDragRect)) {
          this.canvasHelper.animationReset(this.pulpPointAnimation[0]);
          this.canvasHelper.animationReset(this.pulpPointAnimation[1]);
          this.canvasHelper.animationReset(this.pulpPointAnimation[3]);
          this.pulpPointAnimation[3].play();
          this.canvasHelper.animationReset(this.pulpLineAnimation[0]);
          this.canvasHelper.animationReset(this.pulpLineAnimation[1]);
          this.pulpLineAnimation[1].play();
          this.rectAniamtion[0] = this.canvasHelper.createTextLabelAnimation(this.pulpRect, this.textLayer,
            {x: this.pulpRect.x(), y: this.pulpRect.y(), x1: this.config.pulpGroupConfig.x, y1: this.config.pulpGroupConfig.y, time: 0.5});

        } else {

          this.rectAniamtion[0] = this.canvasHelper.createTextLabelAnimation(this.pulpRect, this.textLayer,
            {x: this.pulpRect.x(), y: this.pulpRect.y(), x1: this.pulpRect.x(), y1: this.stage.getHeight() - 38, time: 0.5});

        }

      });

      this.canvasHelper.bindingEvent(this.seedRect, 'dragstart', () => {
        this.seedLineAnimation[0].play();
        this.seedPointAnimation[0].play();
        this.prompt[0].visible(false);
        this.promptLayer.draw();
      });

      this.canvasHelper.bindingEvent(this.seedRect, 'dragmove', () => {   //种子
        if (this.canvasHelper.impactChecking({
          x: this.seedRect.x(),
          y: this.seedRect.y(),
          w: this.config.rectConfig.width,
          h: this.config.rectConfig.height
        }, this.config.seedCircle, 1)) {

          if (this.seedPointAnimation[0].isActive() === false) {
            this.seedPointAnimation[2].play();
          }

        } else {
          this.seedPointAnimation[1].play();
        }
      });

      this.canvasHelper.bindingEvent(this.seedRect, 'dragend', () => {
        this.isShowPromptText();
        if (this.canvasHelper.impactChecking({
          x: this.seedRect.x(),
          y: this.seedRect.y(),
          w: this.config.rectConfig.width,
          h: this.config.rectConfig.height
        }, this.config.seedCircle, 1)) {
          this.canvasHelper.animationReset(this.seedPointAnimation[0]);
          this.canvasHelper.animationReset(this.seedPointAnimation[1]);
          this.canvasHelper.animationReset(this.seedPointAnimation[3]);
          this.seedPointAnimation[3].play();
          this.canvasHelper.animationReset(this.seedLineAnimation[0]);
          this.canvasHelper.animationReset(this.seedLineAnimation[1]);
          this.seedLineAnimation[1].play();
          this.rectAniamtion[1] = this.canvasHelper.createTextLabelAnimation(this.seedRect, this.textLayer,
            {x: this.seedRect.x(), y: this.seedRect.y(), x1: this.config.seedGroupConfig.x, y1: this.config.seedGroupConfig.y, time: 0.5});

        } else {
          this.rectAniamtion[1] = this.canvasHelper.createTextLabelAnimation(this.seedRect, this.textLayer,
            {x: this.seedRect.x(), y: this.seedRect.y(), x1: this.seedRect.x(), y1: this.stage.getHeight() - 38, time: 0.5});

        }
      });

      this.canvasHelper.bindingEvent(this.peelRect, 'dragstart', () => {
        this.peelLineAnimation[0].play();
        this.peelPointAnimation[0].play();
        this.prompt[0].visible(false);
        this.promptLayer.draw();
      });

      this.canvasHelper.bindingEvent(this.peelRect, 'dragmove', () => {   //果皮
        if (this.canvasHelper.isCollision({
          x: this.peelRect.x(),
          y: this.peelRect.y(),
          w: this.config.rectConfig.width,
          h: this.config.rectConfig.height}, this.config.peelBigCircle, this.config.peelSmallCircle, this.config.disableDragRect)) {

            if (this.peelPointAnimation[0].isActive() === false) {
              this.peelPointAnimation[2].play();
            }

        } else {
            if (this.peelPointAnimation[2].isActive() === false &&
              this.peelPointAnimation[0].isActive() === false && this.peelPointAnimation[1].isActive() === false) {

              this.peelPointAnimation[1].play();

            }
        }
      });

      this.canvasHelper.bindingEvent(this.peelRect, 'dragend', () => {
          this.isShowPromptText();
          if (this.canvasHelper.isCollision({
            x: this.peelRect.x(),
            y: this.peelRect.y(),
            w: this.config.rectConfig.width,
            h: this.config.rectConfig.height}, this.config.peelBigCircle, this.config.peelSmallCircle , this.config.disableDragRect)) {
            this.canvasHelper.animationReset(this.peelPointAnimation[0]);
            this.canvasHelper.animationReset(this.peelPointAnimation[1]);
            this.canvasHelper.animationReset(this.peelPointAnimation[3]);
            this.peelPointAnimation[3].play();
            this.canvasHelper.animationReset(this.peelLineAnimation[0]);
            this.canvasHelper.animationReset(this.peelLineAnimation[1]);
            this.peelLineAnimation[1].play();
            this.rectAniamtion[2] = this.canvasHelper.createTextLabelAnimation(this.peelRect, this.textLayer,
              {x: this.peelRect.x(), y: this.peelRect.y(), x1: this.config.peelGroupConfig.x,
                y1: this.config.peelGroupConfig.y, time: 0.5});

          } else {
            this.rectAniamtion[2] = this.canvasHelper.createTextLabelAnimation(this.peelRect, this.textLayer,
              {x: this.peelRect.x(), y: this.peelRect.y(), x1: this.peelRect.x(), y1: this.stage.getHeight() - 38, time: 0.5});
          }
      });
    }

    //创建提示文字
    createPromptText() {
      this.promptLayer = new Konva.Layer(this.config.promptLayerConfig);
      this.prompt[0] = this.canvasHelper.createText(this.config.prompt1Config);
      this.prompt[1] = this.canvasHelper.createText(this.config.prompt2Config);
      this.prompt[1].visible(false);
      this.promptLayer.add(this.prompt[0], this.prompt[1]);
    }

    //控制提示文字显示隐藏
    isShowPromptText() {
      if (this.promptControl === false) {
        return;
      }
      this.promptControl = false;
      this.prompt[1].visible(true);
      this.promptLayer.draw();
      setTimeout(() => {
        this.prompt[1].visible(false);
        this.promptLayer.draw();
      }, 2000);
    }

    reset () {
      for (let i = 1; i < this.pulpPointAnimation.length; i++) {
        this.canvasHelper.animationReset(this.pulpPointAnimation[i]);
        this.canvasHelper.animationReset(this.peelPointAnimation[i]);
        this.canvasHelper.animationReset(this.seedPointAnimation[i]);
      }

      for (let i = 0; i < this.pulpLineAnimation.length; i++) {
        this.canvasHelper.animationReset(this.pulpLineAnimation[i]);
        this.canvasHelper.animationReset(this.peelLineAnimation[i]);
        this.canvasHelper.animationReset(this.seedLineAnimation[i]);
      }

      for (let i = 0; i < this.rectAniamtion.length; i++) {
        if (this.rectAniamtion[i]) {
          this.rectAniamtion[i].pause();
        }
      }

      this.canvasHelper.lineReset(this.pulpLine, this.lineLayer, {points: this.config.pulpLineConfig.points});
      this.canvasHelper.lineReset(this.seedLine, this.lineLayer, {points: this.config.seedLineConfig.points});
      this.canvasHelper.lineReset(this.peelLine, this.lineLayer, {points: this.config.peelLineConfig.points});
      this.canvasHelper.circleReset(this.pulpPoint, this.pointLayer, {x: 1, y: 1});
      this.canvasHelper.circleReset(this.seedPoint, this.pointLayer, {x: 1, y: 1});
      this.canvasHelper.circleReset(this.peelPoint, this.pointLayer, {x: 1, y: 1});
      this.canvasHelper.textReset(this.pulpRect, this.textLayer, {x: this.config.pulpGroupConfig.x, y: this.config.pulpGroupConfig.y});
      this.canvasHelper.textReset(this.seedRect, this.textLayer, {x: this.config.seedGroupConfig.x, y: this.config.seedGroupConfig.y});
      this.canvasHelper.textReset(this.peelRect, this.textLayer, {x: this.config.peelGroupConfig.x, y: this.config.peelGroupConfig.y});
      this.promptControl = true;
      this.prompt[0].visible(true);
      this.prompt[1].visible(false);
      this.promptLayer.draw();
    }

}
