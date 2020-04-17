import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import * as Konva from 'konva';
import {LsConfig} from './LsConfig';
import { Group } from 'konva';
import { Util } from './Util';
const _lodash = require('lodash');

export class LsCanvas extends SimpleKonvaTemplate {
    config: LsConfig;
    util: Util;
    // 白色拖动点
    whitePoint: any = [];

    // 蓝色线
    blueLine: Konva.Line;

    // 白色虚线
    topWhiteLine: Konva.Line;
    bottomWhiteLine: Konva.Line;

    // 黄色拖动点
    yellowPoint: any = [];

    // 黄色线
    yellowLine1: Konva.Line;
    yellowLine2: Konva.Line;

    // 红色虚线
    redLine: any = [];

    // 文字 ab
    aText: Konva.Text;
    bText: Konva.Text;

    // 极值 最值 按钮
    button1: Konva.Group;
    button2: Konva.Group;

    // 极值对应文字
    explainText1: Konva.Group;
    explainText2: Konva.Group;

    // 统计极大值
    maximumValue: any = [];
    // 统计极小值
    minimumValue: any = [];

    // 统计最大 最小值
    maxValue: any;
    minValue: any;

    constructor() {
      super('box');
      this.config = new LsConfig();
      this.util = new Util();
      this.init();
    }

    async init() {

      this.initAxis();
      this.initText();
      this.initBlueLine();
      this.initWhiteLine();
      this.initYellowLine();
      this.initRedLine();
      this.initYellowPoint();
      this.initWhitePoint();
      this.initButton();
      this.initExplainText();

      this.initPointDragEvent();
      this.initYellowPointDragEvent();
      this.initClickEvent();

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 添加坐标轴
    initAxis() {
      const xAxis = new Konva.Arrow({
        x: this.config.width * 0.466,
        y: this.config.height * 0.535,
        points: [-230 * this.config.scale, 0, 230 * this.config.scale, 0],
        pointerLength: 15 * this.config.scale,
        pointerWidth: 15 * this.config.scale,
        fill: '#ffffff',
        stroke: '#ffffff',
        strokeWidth: 2 * this.config.scale,
        opacity: 0.32
      });

      const yAxis = xAxis.clone().rotate(-90);

      this.staticLayer.add(xAxis, yAxis);

      const xText = new Konva.Text(this.config.xText);
      this.staticLayer.add(xText);

      const yText = new Konva.Text(this.config.yText);
      this.staticLayer.add(yText);

      const oText = new Konva.Text(this.config.oText);
      this.staticLayer.add(oText);
    }

    initText() {
      const x1 = this.util.createText('x1', 18 * this.config.scale, this.config.x1Text);
      this.staticLayer.add(x1);

      const x2 = this.util.createText('x2', 18 * this.config.scale, this.config.x2Text);
      this.staticLayer.add(x2);

      const x3 = this.util.createText('x3', 18 * this.config.scale, this.config.x3Text);
      this.staticLayer.add(x3);

      const x4 = this.util.createText('x4', 18 * this.config.scale, this.config.x4Text);
      this.staticLayer.add(x4);

      const x5 = this.util.createText('x5', 18 * this.config.scale, this.config.x5Text);
      this.staticLayer.add(x5);

      this.aText = new Konva.Text(this.config.aText);
      this.animationLayer.add(this.aText);

      this.bText = new Konva.Text(this.config.bText);
      this.animationLayer.add(this.bText);
    }

    // 添加蓝色线
    initBlueLine() {
      this.blueLine = new Konva.Line(this.config.blueLine as any);
      this.animationLayer.add(this.blueLine);
    }

    // 添加白色线
    initWhiteLine() {
      this.topWhiteLine = new Konva.Line(this.config.topWhiteLine as any);
      this.animationLayer.add(this.topWhiteLine);

      this.bottomWhiteLine = new Konva.Line(this.config.bottomWhiteLine as any);
      this.animationLayer.add(this.bottomWhiteLine);
    }

    // 添加黄色线
    initYellowLine() {
      this.yellowLine1 = new Konva.Line(this.config.yellowLine1 as any);
      this.animationLayer.add(this.yellowLine1);

      this.yellowLine2 = new Konva.Line(this.config.yellowLine2 as any);
      this.animationLayer.add(this.yellowLine2);
    }

    // 红色虚线
    initRedLine() {

      for (let i = 0; i < 5; i++) {
        this.redLine[i] = new Konva.Line({
          points: [
            this.config.whitePoint[i + 1].x, this.config.whitePoint[i + 1].y,
            this.config.whitePoint[i + 1].x, this.config.height * 0.535,
          ],
          stroke: '#FF5A5A',
          strokeWidth: 3 * this.config.scale,
          lineCap: 'round',
          lineJoin: 'round',
          tension: 0.5,
          dash: [10, 10]
        });

        this.animationLayer.add(this.redLine[i]);
      }


    }

    // 添加白色点
    initWhitePoint() {
      for (let i = 0; i < 7; i++) {
        this.whitePoint[i] = this.createDragButton(this.config.whitePoint[i]);
        this.animationLayer.add(this.whitePoint[i]);
      }
    }

    // 添加黄色点
    initYellowPoint() {
      this.yellowPoint[0] = this.createDragButton(this.config.yellowPoint0);
      this.animationLayer.add(this.yellowPoint[0]);

      this.yellowPoint[1] = this.createDragButton(this.config.yellowPoint1);
      this.animationLayer.add(this.yellowPoint[1]);
    }

    // 创建点
    createDragButton(config: Object) {
      const whiteCircle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: 14 * this.config.scale,
        fill: 'rgba(255,255,255,0.36)',
        opacity: 0.72,
        shadow: {color: 'rgba(0,0,0,0.3)', offsetX: 0.1, offsetY: 0.1},
        strokeWidth: 1,
        stroke: 'rgba(0,0,0,0.06)',
      } as any);

      const blueCircle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: 5 * this.config.scale,
        fill: !(config as any).fill ? '#ffffff' : (config as any).fill,
      });

      const button = new Group(config);
      button.add(whiteCircle);
      button.add(blueCircle);

      return button;
    }

    initButton() {
      this.button1 = this.createButton(this.config.buttonText1, this.config.buttonRect1, this.config.button1);
      this.animationLayer.add(this.button1);

      this.button2 = this.createButton(this.config.buttonText2, this.config.buttonRect2, this.config.button2);
      this.animationLayer.add(this.button2);
    }

    // 说明文字
    initExplainText() {
      this.explainText1 = new Konva.Group(this.config.explainText1);
      const rect1 = new Konva.Rect(this.config.explainText1Rect);
      const text1 = this.util.createText('在区间[a,b]上有:', 16 * this.config.scale, this.config.explainTextContent1);
      const text2 = this.util.createText('极大值点:x1,x3,x5', 16 * this.config.scale, this.config.explainTextContent2);
      const text3 = this.util.createText(' 极小值点:x2,x4,x5', 16 * this.config.scale, this.config.explainTextContent2);
      text3.getChildren()[text3.getChildren().length - 1].setAttr('visible', false);
      text3.getChildren()[text3.getChildren().length - 2].setAttr('visible', false);
      text3.getChildren()[text3.getChildren().length - 3].setAttr('visible', false);
      for (let i = 0; i < text2.getChildren().length; i++) {
        text3.setAttr('x', text3.x() + text2.getChildren()[i].width());
      }
      this.explainText1.add( rect1, text1, text2, text3);
      this.animationLayer.add(this.explainText1);

      this.explainText2 = new Konva.Group(this.config.explainText2);
      const rect2 = new Konva.Rect(this.config.explainText2Rect);
      const text4 = this.util.createText('在区间[a,b]上有:', 16 * this.config.scale, this.config.explainTextContent1);
      const text5 = this.util.createText('最大值点:x5', 16 * this.config.scale, this.config.explainTextContent2);
      const text6 = this.util.createText(' 最小值点:a5', 16 * this.config.scale, this.config.explainTextContent2);
      text6.getChildren()[text6.getChildren().length - 1].setAttr('visible', false);
      for (let i = 0; i < text5.getChildren().length; i++) {
        text6.setAttr('x', text6.x() + text5.getChildren()[i].width());
      }
      this.explainText2.add( rect2, text4, text5, text6);
      this.animationLayer.add(this.explainText2);
    }

    // 绑定拖动事件
    initPointDragEvent() {
      for (let i = 1; i < 6; i++) {
        this.whitePointDragEvent(this.whitePoint[i], this.config.whitePoint[i]);
      }

      this.whitePointDragEvent2(this.whitePoint[0], this.config.whitePoint[0], this.yellowPoint[0]);
      this.whitePointDragEvent2(this.whitePoint[6], this.config.whitePoint[6], this.yellowPoint[1]);
    }

    // 白色点拖动事件
    whitePointDragEvent(point: any, pointConfig: any) {

      point.on('dragmove', () => {
        // 限制点的拖动范围
        point.setAttr('x', pointConfig.x);

        if (point.y() < (this.config.height * 0.535 - 230 * this.config.scale)) {
          point.setAttr('y', (this.config.height * 0.535 - 230 * this.config.scale));
        } else if (point.y() > (this.config.height * 0.535 + 230 * this.config.scale)) {
          point.setAttr('y', (this.config.height * 0.535 + 230 * this.config.scale));
        }

        this.updateBlueLine();
        this.updateYellowLine();
        this.updateRedLine();
        this.updateWhiteLine();

        this.getMaximumValue();

        this.getMaxValueAndMinValue();
      });
    }

    // 白色点拖动事件
    whitePointDragEvent2(point: any, pointConfig: any, yellowPoint: any) {

    point.on('dragmove', () => {
      // 限制点的拖动范围
      point.setAttr('x', yellowPoint.x());

      if (point.y() < (this.config.height * 0.535 - 230 * this.config.scale)) {
        point.setAttr('y', (this.config.height * 0.535 - 230 * this.config.scale));
      } else if (point.y() > (this.config.height * 0.535 + 230 * this.config.scale)) {
        point.setAttr('y', (this.config.height * 0.535 + 230 * this.config.scale));
      }


      this.updateBlueLine();
      this.updateYellowLine();
      this.updateRedLine();

      this.updateWhiteLine();

      this.getMaxValueAndMinValue();
    });

  }

    // 黄色点拖动事件
    initYellowPointDragEvent() {

      this.yellowPoint[0].on('dragmove', () => {
        // 限制黄点拖动范围
        this.yellowPoint[0].setAttr('y', this.config.yellowPoint0.y);

        if (this.yellowPoint[0].x() < (this.config.topWhiteLine.x - 460 * 0.5 * this.config.scale)) {
          this.yellowPoint[0].setAttr('x', (this.config.topWhiteLine.x - 460 * 0.5 * this.config.scale));
        } else if (this.yellowPoint[0].x() > this.config.whitePoint[1].x) {
          this.yellowPoint[0].setAttr('x', this.config.whitePoint[1].x);
        }

        // 白点跟着黄点动
        this.whitePoint[0].setAttr('x', this.yellowPoint[0].x());

        // 文字a跟着黄点动
        this.aText.setAttr('x', this.yellowPoint[0].x() - 18 * 0.3 * this.config.scale);

        this.updateBlueLine();
        this.updateYellowLine();
      });

      this.yellowPoint[1].on('dragmove', () => {
        // 限制黄点拖动范围

        if (this.yellowPoint[1].x() > (this.config.topWhiteLine.x + 460 * 0.5 * this.config.scale)) {
          this.yellowPoint[1].setAttr('x', (this.config.topWhiteLine.x + 460 * 0.5 * this.config.scale));
        } else if (this.yellowPoint[1].x() < this.config.whitePoint[5].x) {
          this.yellowPoint[1].setAttr('x', this.config.whitePoint[5].x);
        }

        this.yellowPoint[1].setAttr('y', this.config.yellowPoint1.y);

        // 白点跟着黄点动
        this.whitePoint[6].setAttr('x', this.yellowPoint[1].x());

        // 文字b跟着黄点动
        this.bText.setAttr('x', this.yellowPoint[1].x() - 18 * 0.3 * this.config.scale);

        this.updateBlueLine();
        this.updateYellowLine();
      });

    }

    // 初始化按钮点击事件
    initClickEvent() {

    this.button1.on('touchstart click', () => {
      this.clickButtonChangeColor((this.button1.getChildren()[0] as any).fill() === '#ffffff', this.button1);
      this.explainText1.setAttr('visible', (this.button1.getChildren()[0] as any).fill() !== '#ffffff');

      this.animationLayer.draw();
    });

    this.button2.on('touchstart click', () => {
      this.clickButtonChangeColor((this.button2.getChildren()[0] as any).fill() === '#ffffff', this.button2);
      this.explainText2.setAttr('visible', (this.button2.getChildren()[0] as any).fill() !== '#ffffff');
      this.showWhiteLine((this.button2.getChildren()[0] as any).fill() !== '#ffffff');

      this.animationLayer.draw();
    });

  }

    // 更新蓝色实现
    updateBlueLine() {
      const points = [
        this.whitePoint[0].x(), this.whitePoint[0].y(),
        this.whitePoint[1].x(), this.whitePoint[1].y(),
        this.whitePoint[2].x(), this.whitePoint[2].y(),
        this.whitePoint[3].x(), this.whitePoint[3].y(),
        this.whitePoint[4].x(), this.whitePoint[4].y(),
        this.whitePoint[5].x(), this.whitePoint[5].y(),
        this.whitePoint[6].x(), this.whitePoint[6].y(),
      ];
      this.blueLine.setAttr('points', points);
    }

    // 更新黄色虚线
    updateYellowLine() {
      this.yellowLine1.setAttr('points', [
        this.yellowPoint[0].x(), this.yellowPoint[0].y(),
        this.whitePoint[0].x(), this.whitePoint[0].y()
      ]);

      this.yellowLine2.setAttr('points', [
        this.yellowPoint[1].x(), this.yellowPoint[1].y(),
        this.whitePoint[6].x(), this.whitePoint[6].y()
      ]);
    }

    // 更新红色虚线
    updateRedLine() {

      for (let i = 0; i < 5; i++) {
        const points = [
          this.whitePoint[i + 1].x(), this.whitePoint[i + 1].y(),
          this.whitePoint[i + 1].x(), this.config.height * 0.535,
        ];

        this.redLine[i].setAttr('points', points);
      }

    }

    // 更新白色虚线位置
    updateWhiteLine() {
      const pointY = [];
      for (let i = 0; i < 7; i++) {
        pointY[i] = this.whitePoint[i].y();
      }

      this.topWhiteLine.setAttr('y', _lodash.orderBy(pointY)[0]);
      this.bottomWhiteLine.setAttr('y', _lodash.orderBy(pointY)[6]);
    }

    // 显示隐藏白色虚线
    showWhiteLine(isShow: boolean) {
      this.topWhiteLine.setAttr('visible', isShow);
      this.bottomWhiteLine.setAttr('visible', isShow);
      this.animationLayer.draw();
    }

    // 创建按钮
    createButton(textConfig: any, rectConfig: any, buttonConfig: any) {

      const rect = new Konva.Rect(rectConfig);

      const text = new Konva.Text(textConfig);

      const button = new Konva.Group(buttonConfig);
      button.add(rect, text);

      return button;
    }

    // 点击按钮更换按钮的颜色
    clickButtonChangeColor( isChange: boolean, button: any ) {
      if (isChange) {
        button.getChildren()[0].setAttr('fill', '#0091FF');
        button.getChildren()[1].setAttr('fill', '#ffffff');
      } else {
        button.getChildren()[0].setAttr('fill', '#ffffff');
        button.getChildren()[1].setAttr('fill', '#000000');
      }
    }

    // 获取极大值
    getMaximumValue() {
      this.maximumValue = [];
      this.minimumValue = [];

      for (let i = 1; i < this.whitePoint.length - 1; i++) {
        if (this.whitePoint[i].y() > this.whitePoint[i - 1].y() && this.whitePoint[i].y() > this.whitePoint[i + 1].y()) {
          this.minimumValue.push(this.whitePoint[i].name());
        }

        if (this.whitePoint[i].y() < this.whitePoint[i - 1].y() && this.whitePoint[i].y() < this.whitePoint[i + 1].y()) {
          this.maximumValue.push(this.whitePoint[i].name());
        }
      }

      // 改变极大值文字
      for (let i = 0; i < this.maximumValue.length; i++) {
        (this.explainText1.getChildren()[2] as any).getChildren()[i * 3 + 6].setAttr('text', this.maximumValue[i]);
        if (i === this.maximumValue.length - 1) {
          for (let j = i * 3 + 6 + 1; j < (this.explainText1.getChildren()[2] as any).getChildren().length; j++) {
              (this.explainText1.getChildren()[2] as any).getChildren()[j].setAttr('visible', false);
          }
        } else {
          for (let j = 0; j < (this.explainText1.getChildren()[2] as any).getChildren().length; j++) {
            (this.explainText1.getChildren()[2] as any).getChildren()[j].setAttr('visible', true);
          }
        }
      }

      // 改变极小值文字
      for (let i = 0; i < this.minimumValue.length; i++) {
        (this.explainText1.getChildren()[3] as any).getChildren()[i * 3 + 7].setAttr('text', this.minimumValue[i]);
        if (i === this.minimumValue.length - 1) {
          for (let j = i * 3 + 7 + 1; j < (this.explainText1.getChildren()[3] as any).getChildren().length; j++) {
            (this.explainText1.getChildren()[3] as any).getChildren()[j].setAttr('visible', false);
          }
        } else {
          for (let j = 0; j < (this.explainText1.getChildren()[3] as any).getChildren().length; j++) {
            (this.explainText1.getChildren()[3] as any).getChildren()[j].setAttr('visible', true);
          }
        }
      }

    }

    // 获取最大最小值
    getMaxValueAndMinValue() {
      this.maxValue = this.whitePoint[5];
      this.minValue = this.whitePoint[0];

      for (let i = 0; i < this.whitePoint.length; i++) {

        if (this.whitePoint[i].y() < this.maxValue.y()) {
          this.maxValue = this.whitePoint[i];
        }

        if (this.whitePoint[i].y() > this.minValue.y()) {
          this.minValue = this.whitePoint[i];
        }
      }

      if (this.maxValue.name() === 'b' || this.maxValue.name() === 'a') {
        (this.explainText2.getChildren()[2] as any).getChildren()[5].setAttr('text', this.maxValue.name());
        (this.explainText2.getChildren()[2] as any).getChildren()[6].setAttr('visible', false);
      } else {
        (this.explainText2.getChildren()[2] as any).getChildren()[5].setAttr('text', 'x');
        (this.explainText2.getChildren()[2] as any).getChildren()[6].setAttr('text', this.maxValue.name());
        (this.explainText2.getChildren()[2] as any).getChildren()[6].setAttr('visible', true);
      }

      if (this.minValue.name() === 'b' || this.minValue.name() === 'a') {
        (this.explainText2.getChildren()[3] as any).getChildren()[6].setAttr('text', this.minValue.name());
        (this.explainText2.getChildren()[3] as any).getChildren()[7].setAttr('visible', false);
      } else {
        (this.explainText2.getChildren()[3] as any).getChildren()[6].setAttr('text', 'x');
        (this.explainText2.getChildren()[3] as any).getChildren()[7].setAttr('text', this.minValue.name());
        (this.explainText2.getChildren()[3] as any).getChildren()[7].setAttr('visible', true);
      }
    }

    // 重置
    async reset() {
      this.resetImage(this.yellowPoint[0], this.config.yellowPoint0);
      this.resetImage(this.yellowPoint[1], this.config.yellowPoint1);

      for (let i = 0; i < 7; i++) {
        this.resetImage(this.whitePoint[i], this.config.whitePoint[i]);
      }

      this.updateBlueLine();
      this.updateYellowLine();
      this.updateRedLine();

      this.updateWhiteLine();

      this.topWhiteLine.setAttr('visible', false);
      this.bottomWhiteLine.setAttr('visible', false);

      // 文字a跟着黄点动
      this.aText.setAttr('x', this.yellowPoint[0].x() - 18 * 0.3 * this.config.scale);

      // 文字b跟着黄点动
      this.bText.setAttr('x', this.yellowPoint[1].x() - 18 * 0.3 * this.config.scale);

      this.getMaxValueAndMinValue();
      this.getMaximumValue();

      // 还原按钮
      this.clickButtonChangeColor(false, this.button1);
      this.clickButtonChangeColor(false, this.button2);

      // 隐藏文字
      this.explainText1.setAttr('visible', false);
      this.explainText2.setAttr('visible', false);

      this.staticLayer.draw();
      this.animationLayer.draw();
    }

    // 重置圆的位置
    resetImage(image: any, config: any) {
      image.x(config.x);
      image.y(config.y);
    }
}

