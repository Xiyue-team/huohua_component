import {CircleSceneConfig2} from './CircleSceneConfig2';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import { ImageEvent } from './ImageEvent';
import textDescriptionImage from '../sub_static/textDescription2.png';

export default class CircleScene2 {
    config: CircleSceneConfig2;
    imageEvent: ImageEvent;

    myCanvas: any = [];

    // 红蓝拖动按钮拖动的角度数
    redButtonAngle = -34;
    blueButtonAngle = 49;

    // 圆上蓝色线和红色线
    blueCircleLine: fabric.Group;
    redCircleLine: fabric.Group;

    // 圆上蓝色线和红色线对应的文字
    blueCircleLineText: fabric.Text;
    redCircleLineText: fabric.Text;

    // 红线对应拖动按钮
    redButton: fabric.Group;

    // 蓝色线对应拖动按钮
    blueButton: fabric.Group;

    // 坐标轴 红色线 蓝色线
    redLine: fabric.Rect;
    blueLine: fabric.Rect;

    // 坐标轴红蓝线对应文字
    redLineText: fabric.Text;
    blueLineText: fabric.Text;

    // 劣弧
    minorArc: fabric.Circle;

    // 判定规则
    decisionRule: any;

    // 判定规则显示文字
    textDescription: fabric.Image;
    
    constructor() {
      this.config = new CircleSceneConfig2();
      this.imageEvent = new ImageEvent();

      this.init();
    }

    async init() {
      this.initBackground();
      this.initCircleAxisLine();
      this.initCircleRedBlueLine();
      this.initCircleRedBlueLineText();

      this.initAxis();
      this.initAxisText();
      this.initAxisRedBlueLine();
      this.initRedBlueText();
      this.initClickButton();

      this.initButton();

      this.initButtonDragEvent();
    }

    // 添加灰色背景
    initBackground() {
      const circleLine = new fabric.Circle(this.config.circleLine);
      this.myCanvas.push(circleLine);

      const topCircleText = new fabric.Text('0°', this.config.topCircleText);
      this.myCanvas.push(topCircleText);

      const bottomCircleText = new fabric.Text('180°', this.config.bottomCircleText);
      this.myCanvas.push(bottomCircleText);

      const leftCircleText = new fabric.Text('90°W', this.config.leftCircleText);
      this.myCanvas.push(leftCircleText);

      const rightCircleText = new fabric.Text('90°E', this.config.rightCircleText);
      this.myCanvas.push(rightCircleText);

      const arrowLine = new fabric.Circle(this.config.arrowLine);
      this.myCanvas.push(arrowLine);

      const arrow = new fabric.Triangle(this.config.arrow);
      arrow.rotate(240);
      this.myCanvas.push(arrow);

      // 添加劣弧
      this.minorArc = new fabric.Circle(this.config.minorArc);
      this.myCanvas.push(this.minorArc);
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
      this.redCircleLine.selectable = false;
      this.redCircleLine.rotate(-34);
      this.myCanvas.push(this.redCircleLine);

      // 蓝色线
      const topBlueCircleLine = new fabric.Rect(this.config.topBlueCircleLine);
      this.blueCircleLine = new fabric.Group([topBlueCircleLine, fabric.util.object.clone(bottomCircleLine)]);
      this.blueCircleLine.selectable = false;
      this.blueCircleLine.rotate(49);
      this.myCanvas.push(this.blueCircleLine);
    }

    // 添加圆上的红绿线对应的文字
    initCircleRedBlueLineText() {
      // 文字
      this.redCircleLineText = new fabric.Text('34°W', this.config.redCircleLineText);
      this.myCanvas.push(this.redCircleLineText);

      this.blueCircleLineText = new fabric.Text('49°E', this.config.blueCircleLineText);
      this.myCanvas.push(this.blueCircleLineText);
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

      const angleRed = this.getButtonAngle(this.redButton);
      this.redButtonDragEvent(angleRed);

      const angleBlue = this.getButtonAngle(this.blueButton);
      this.blueButtonDragEvevt(angleBlue);
    }

    // 添加坐标轴区
    initAxis() {
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
    initAxisText() {
      const textLeft = new fabric.Text('180°', this.config.textLeft);
      this.myCanvas.push(textLeft);

      const textCenter = new fabric.Text('0°', this.config.textCenter);
      this.myCanvas.push(textCenter);

      const textRight = new fabric.Text('180°', this.config.textRight);
      this.myCanvas.push(textRight);
    }

    // 添加红蓝线
    initAxisRedBlueLine() {
      this.redLine = new fabric.Rect(this.config.redLine);
      this.myCanvas.push(this.redLine);

      this.blueLine = new fabric.Rect(this.config.blueLine);
      this.myCanvas.push(this.blueLine);
    }

    // 添加坐标轴红蓝线上的文字
    initRedBlueText() {
      this.redLineText = new fabric.Text('30°W', this.config.redLineText);
      this.myCanvas.push(this.redLineText);

      this.blueLineText = new fabric.Text('40°E', this.config.blueLineText);
      this.myCanvas.push(this.blueLineText);
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
      let angleRed = 0;
      let angleBlue = 0;

      this.redButton.on({'moving': (e: any) => {
          angleRed = this.getButtonAngle(this.redButton);
          this.limitButtonScope(angleRed, this.redButton, this.redCircleLine);
          this.redButtonDragEvent(angleRed);
        }});

      this.blueButton.on({'moving': (e: any) => {
          angleBlue = this.getButtonAngle(this.blueButton);
          this.limitButtonScope(angleBlue, this.blueButton, this.blueCircleLine);
          this.blueButtonDragEvevt(angleBlue);
        }});
    }

    // 红色按钮拖动事件
    redButtonDragEvent(angle: number) {
      // 获取拖动的角度值
      this.redButtonAngle = angle;

      // 修改文字
      this.getRedBlueLineText(this.redLineText, this.redCircleLineText, angle, this.redLine);

      // 更新劣弧
      this.updateMinorArc();
    }

    // 蓝色按钮拖动事件
    blueButtonDragEvevt(angle: number) {
      // 获取拖动的角度值
      this.blueButtonAngle = angle;

      // 修改文字
      this.getRedBlueLineText(this.blueLineText, this.blueCircleLineText, angle, this.blueLine);

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
    limitButtonScope(angle: number, button: any, circleLine: any) {
      button.set('left', this.config.circleLine.radius * this.config.scale * Math.sin(angle * Math.PI / 180)
        + this.config.circleLine.left).setCoords();

      button.set('top', this.config.circleLine.top - this.config.circleLine.radius *
        this.config.scale * Math.cos(angle * Math.PI / 180)).setCoords();

      circleLine.rotate(angle);
    }

    // 按钮旋转角度
    getButtonAngle(button: any) {

      const x = this.config.circleLine.left - button.get('left');
      const y = this.config.circleLine.top - button.get('top');

      const angle = Math.atan(Math.abs(x / y));

      let angle2 = -angle * 180 / Math.PI;

      if (y >= 0) {
        if (x >= 0) {
          angle2 = -angle * 180 / Math.PI;
        } else {
          angle2 = angle * 180 / Math.PI;
        }

      } else {
        if (x >= 0) {
          angle2 = -(180 - angle * 180 / Math.PI);
        } else {
          angle2 = (180 - angle * 180 / Math.PI);
        }
      }

      return Math.round(angle2);
    }

    // 修改红蓝线对应的文字
    getRedBlueLineText(text: any, circleText: any, angle: number, line: any) {
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

      text.set('left', this.config.line1.left + angle / 180 * this.config.line1.width * this.config.scale * 0.5);
      line.set('left', this.config.line1.left + angle / 180 * this.config.line1.width * this.config.scale * 0.5);

      // 改变圆上文字的位置
      circleText.set('left', this.config.circleLine.left + 174 * this.config.scale * Math.sin(angle * Math.PI / 180));
      circleText.set('top', this.config.circleLine.top - 174 * this.config.scale * Math.cos(angle * Math.PI / 180));
    }

    // 重置
    reset() {
      this.limitButtonScope(-34, this.redButton, this.redCircleLine);
      this.limitButtonScope(49, this.blueButton, this.blueCircleLine);

      this.redButtonDragEvent(-34);
      this.blueButtonDragEvevt(49);
    }

}

