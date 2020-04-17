import {AxisSceneConfig1} from './AxisSceneConfig1';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import textDescriptionImage from '../sub_static/textDescription1.png';

import { ImageEvent } from './ImageEvent';

export default class AxisScene1 {
    config: AxisSceneConfig1;
    imageEvent: ImageEvent;
    time = new Date().valueOf();

    myCanvas: any = [];
    zoom = 1;
    diff = 0;
    prev = 0;

    // 红色线 蓝色线
    redLine: fabric.Rect;
    blueLine: fabric.Rect;

    // 红蓝线对应文字
    redLineText: fabric.Text;
    blueLineText: fabric.Text;

    // 红线对应拖动按钮
    redButton: fabric.Group;

    // 蓝色线对应拖动按钮
    blueButton: fabric.Group;

    // 红蓝拖动按钮拖动的角度数
    redButtonAngle = -34;
    blueButtonAngle = 49;

    // 圆上蓝色线和红色线
    blueCircleLine: fabric.Group;
    redCircleLine: fabric.Group;

    // 圆上蓝色线和红色线对应的文字
    blueCircleLineText: fabric.Text;
    redCircleLineText: fabric.Text;

    // 添加劣弧
    minorArc: fabric.Circle;

    // 判定规则按钮
    decisionRule: any;

    // 判定规则文字
    textDescription: fabric.Image;

    constructor() {
      this.config = new AxisSceneConfig1();
      this.imageEvent = new ImageEvent();

      this.init();
    }

    async init() {
      await this.initBackground();
      await this.initText();
      await this.initRedBlueLine();
      await this.initRedBlueText();

      await this.initCircle();
      await this.initCircleAxisLine();
      await this.initCircleRedBlueLine();
      await this.initCircleRedBlueLineText();

      await this.initButton();
      await this.initClickButton();

      await this.initButtonDragEvent();
    }

    // 添加灰色背景
    initBackground() {
      const line1 = new fabric.Rect(this.config.line1);
      this.myCanvas.push(line1);

      const line2 = new fabric.Rect(this.config.line2);
      this.myCanvas.push(line2);

      const lineLeft = new fabric.Rect(this.config.lineLeft);
      this.myCanvas.push(lineLeft);

      const lineRight = new fabric.Rect(this.config.lineRight);
      this.myCanvas.push(lineRight);
    }

    // 添加静止文字
    initText() {
      const textLeft = new fabric.Text('180°', this.config.textLeft);
      this.myCanvas.push(textLeft);

      const textCenter = new fabric.Text('0°', this.config.textCenter);
      this.myCanvas.push(textCenter);

      const textRight = new fabric.Text('180°', this.config.textRight);
      this.myCanvas.push(textRight);
    }

    // 添加红蓝线
    initRedBlueLine() {
      this.redLine = new fabric.Rect(this.config.redLine);
      this.myCanvas.push(this.redLine);

      this.blueLine = new fabric.Rect(this.config.blueLine);
      this.myCanvas.push(this.blueLine);
    }

    // 添加红蓝线上的文字
    initRedBlueText() {
      this.redLineText = new fabric.Text('30°W', this.config.redLineText);
      this.myCanvas.push(this.redLineText);

      this.blueLineText = new fabric.Text('40°E', this.config.blueLineText);
      this.myCanvas.push(this.blueLineText);
    }

    // 添加拖动按钮
    initButton() {
      const whiteCircle = new fabric.Circle(this.config.whiteCircle as any);
      const blueCircle = new fabric.Circle(this.config.blueCircle as any);

      this.redButton = new fabric.Group([whiteCircle, blueCircle], this.config.redButton);
      this.myCanvas.push(this.redButton);

      this.blueButton = new fabric.Group([fabric.util.object.clone(whiteCircle),
        fabric.util.object.clone(blueCircle)], this.config.blueButton);
      this.myCanvas.push(this.blueButton);

      this.redButtonDragEvent();
      this.blueButtonDragEvevt();
    }

    // 添`加圆形区
    initCircle() {
      const circleLine = new fabric.Circle(this.config.circleLine);
      this.myCanvas.push(circleLine);

      this.minorArc = new fabric.Circle(this.config.minorArc);
      this.myCanvas.push(this.minorArc);

      const topCircleText = new fabric.Text('0°', this.config.topCircleText);
      this.myCanvas.push(topCircleText);

      const bottomCircleText = new fabric.Text('180°', this.config.bottomCircleText);
      this.myCanvas.push(bottomCircleText);

      const leftCircleText = new fabric.Text('90°', this.config.leftCircleText);
      this.myCanvas.push(leftCircleText);

      const rightCircleText = new fabric.Text('90°', this.config.rightCircleText);
      this.myCanvas.push(rightCircleText);

      const arrowLine = new fabric.Circle(this.config.arrowLine);
      this.myCanvas.push(arrowLine);

      const arrow = new fabric.Triangle(this.config.arrow);
      arrow.rotate(240);
      this.myCanvas.push(arrow);
    }

    // 添加圆内坐标轴
    initCircleAxisLine() {
      const xAxis = new fabric.Line([
        this.config.circleLine.left - this.config.circleLine.radius * this.config.scale,
        this.config.circleLine.top,
        this.config.circleLine.left + this.config.circleLine.radius * this.config.scale,
        this.config.circleLine.top],
        this.config.xAxis);
      this.myCanvas.push(xAxis);

      const yAxis = new fabric.Line([
        this.config.circleLine.left,
        this.config.circleLine.top - this.config.circleLine.radius * this.config.scale,
        this.config.circleLine.left,
        this.config.circleLine.top + this.config.circleLine.radius * this.config.scale],
        this.config.yAxis);
      this.myCanvas.push(yAxis);
    }

    // 添加圆上的红绿线
    initCircleRedBlueLine() {
      const topRedCircleLine = new fabric.Rect(this.config.topRedCircleLine);
      const bottomCircleLine = new fabric.Rect(this.config.bottomCircleLine);

      // 红色线
      this.redCircleLine = new fabric.Group([topRedCircleLine, fabric.util.object.clone(bottomCircleLine)]);
      this.redCircleLine.rotate(-30);
      this.myCanvas.push(this.redCircleLine);

      // 蓝色线
      const topBlueCircleLine = new fabric.Rect(this.config.topBlueCircleLine);
      this.blueCircleLine = new fabric.Group([topBlueCircleLine, fabric.util.object.clone(bottomCircleLine)]);
      this.blueCircleLine.rotate(40);
      this.myCanvas.push(this.blueCircleLine);
    }

    // 添加圆上的红绿线对应的文字
    initCircleRedBlueLineText() {
      // 文字
      this.redCircleLineText = new fabric.Text('30°W', this.config.redCircleLineText);
      this.myCanvas.push(this.redCircleLineText);

      this.blueCircleLineText = new fabric.Text('40°E', this.config.blueCircleLineText);
      this.myCanvas.push(this.blueCircleLineText);
    }

    // 添加判定规则按钮
    async initClickButton() {
      this.decisionRule = await FabricUtil.createButton(this.config.decisionRule);
      this.decisionRule.selectable = false;
      this.myCanvas.push(this.decisionRule);

      this.textDescription = await FabricUtil.loadImage(textDescriptionImage as any, this.config.textDescription);
      this.myCanvas.push(this.textDescription);

      this.imageEvent.buttonClickEvent(this.decisionRule, this.textDescription);
    }

    // 初始化按钮拖动事件
    initButtonDragEvent() {
      this.redButton.on({'moving': (e: any) => {
          this.limitButtonScope(this.redButton);
          this.redButtonDragEvent();
      }});

      this.blueButton.on({'moving': (e: any) => {
          this.limitButtonScope(this.blueButton);
          this.blueButtonDragEvevt();
      }});
    }

    // 红色按钮拖动事件
    redButtonDragEvent() {
      this.redLine.set('left', this.redButton.get('left'));

      // 获取拖动的角度值
      this.redButtonAngle = this.getButtonAngle(this.redButton);

      // 修改文字
      this.getRedBlueLineText(this.redLineText, this.redCircleLineText, this.redButtonAngle, this.redButton);

      // 旋转圆上的线
      this.redCircleLine.rotate(this.redButtonAngle);

      // 更新劣弧
      this.updateMinorArc();
    }

    // 蓝色按钮拖动事件
    blueButtonDragEvevt() {
      this.blueLine.set('left', this.blueButton.get('left'));

      // 获取拖动的角度值
      this.blueButtonAngle = this.getButtonAngle(this.blueButton);

      // 修改文字
      this.getRedBlueLineText(this.blueLineText, this.blueCircleLineText, this.blueButtonAngle, this.blueButton);

      // 旋转圆上的线
      this.blueCircleLine.rotate(this.blueButtonAngle);

      // 更新劣弧
      this.updateMinorArc();
    }

    // 更新劣弧
    updateMinorArc() {

      if (this.redButtonAngle <= this.blueButtonAngle) {
        if (this.redButtonAngle - this.blueButtonAngle < -180) {
          this.minorArc.set('endAngle', (this.redButtonAngle - 90) * Math.PI / 180);
          this.minorArc.set('startAngle', (this.blueButtonAngle - 90) * Math.PI / 180);
        } else {
          this.minorArc.set('startAngle', (this.redButtonAngle - 90) * Math.PI / 180);
          this.minorArc.set('endAngle', (this.blueButtonAngle - 90) * Math.PI / 180);
        }
      } else {
        if (this.redButtonAngle - this.blueButtonAngle < 180) {
          this.minorArc.set('endAngle', (this.redButtonAngle - 90) * Math.PI / 180);
          this.minorArc.set('startAngle', (this.blueButtonAngle - 90) * Math.PI / 180);
        } else {
          this.minorArc.set('startAngle', (this.redButtonAngle - 90) * Math.PI / 180);
          this.minorArc.set('endAngle', (this.blueButtonAngle - 90) * Math.PI / 180);
        }
      }

      // 当夹角为180度时隐藏劣弧
      if (Math.round(this.redButtonAngle) - Math.round(this.blueButtonAngle) === -180
        || Math.round(this.redButtonAngle) - Math.round(this.blueButtonAngle) === 180) {
        this.minorArc.set('visible', false);
      } else {
        this.minorArc.set('visible', true);
      }

    }

    // 限制按钮的拖动范围
    limitButtonScope(button: any) {
      // 限制上下拖动
      button.set('top', this.config.blueButton.top);

      // 限制左右拖动
      if (button.get('left') < this.config.lineLeft.left) {
        button.set('left', this.config.lineLeft.left);
      } else if (button.get('left') > this.config.lineRight.left - 0.1) {
        button.set('left', this.config.lineRight.left - 0.1);
      }
    }

    // 获取按钮拖动的角度
    getButtonAngle(button: any) {
      const angle = (button.get('left') - this.config.lineLeft.left)
                    / (this.config.lineRight.left - this.config.lineLeft.left) * 360 - 180;

      return angle;
    }

    // 修改红蓝线对应的文字
    getRedBlueLineText(text: any, circleText: any, angle: number, button: any) {
      if (angle < 0) {
        text.text = Math.round(-angle) + '°W';
        circleText.text = Math.round(-angle) + '°W';
      } else {
        text.text = Math.round(angle) + '°E';
        circleText.text = Math.round(angle) + '°E';
      }

      if (Math.round(angle) === 0 || Math.round(angle) === 180 || Math.round(angle) === -180) {
        text.set('visible', false);
        circleText.set('visible', false);
      } else {
        text.set('visible', true);
        circleText.set('visible', true);
      }

      text.set('left', button.get('left'));

      // 改变圆上文字的位置
      circleText.set('left', this.config.circleLine.left + 83 * this.config.scale * Math.sin(angle * Math.PI / 180));
      circleText.set('top', this.config.circleLine.top - 83 * this.config.scale * Math.cos(angle * Math.PI / 180));
    }



    // 重置
    reset() {

      this.resetElement(this.redButton, this.config.redButton);
      this.resetElement(this.blueButton, this.config.blueButton);

      this.redButtonDragEvent();
      this.blueButtonDragEvevt();
    }

    resetElement(element: any, config: any) {
      element.set('left', config.left).setCoords();
    }
}

