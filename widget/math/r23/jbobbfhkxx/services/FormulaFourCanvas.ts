/**
 * 诱导公式4类
 */

import {FormulaOneConfig} from './FormulaOneConfig';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import { Helper } from './Helper';

export default class FormulaFourCanvas {
    config: FormulaOneConfig;
    helper: Helper;

    myCanvas: fabric.Canvas;
    group: any = [];
    //拖动点
    smallCircleDragPoint: any;

    // 紫色实线和虚线
    violetSolidLine: fabric.Line;
    violetDottedLine: fabric.Line;
    violetSolidLine2: fabric.Line;

    // 蓝色红色绿色线
    blueLine: fabric.Line;
    yellowLine: fabric.Line;
    greenLine: fabric.Line;

    // 180度的线
    redLine: any;

    screwBlueLine: any;
    screwGreenLine: any;

    // 文字
    pText: fabric.Text;
    aText: fabric.Text;
    a2Text: fabric.Text;
    paiText: fabric.Text;

    scale: number;

    constructor(canvas?: fabric.Canvas) {
      this.myCanvas = canvas;
      this.config = new FormulaOneConfig();
      this.helper = new Helper();
      this.scale = this.config.scale;
      this.init();
    }

    async init() {
      await this.initLine();
      await this.initScrewLine();
      await this.initText();
      await this.initDragPoint();
      await this.initStaticResources();
      await this.initDragEvent();
      this.showLine('1');
      this.hide();
    }

    // 加载静态资源 画布  坐标轴 轨迹圆
    initStaticResources() {
      for (let i = 0; i < this.group.length; i++) {
        this.myCanvas.add(this.group[i]);
      }
    }

    // 添加拖动点
    async initDragPoint() {
      this.smallCircleDragPoint = await this.helper.createDragButton(this.config.smallCircleDragPoint);
      this.group.push(this.smallCircleDragPoint);
    }

    // 添加线
    initLine() {
      // 黄色实线
      this.violetSolidLine = new fabric.Line([
        this.config.smallCircleDragPoint.left, this.config.smallCircleDragPoint.top,
        this.config.width * 0.343, this.config.height * 0.5,
      ], this.config.violetSolidLine);
      this.group.push(this.violetSolidLine);

      this.violetSolidLine2 = new fabric.Line([
        this.config.smallCircleDragPoint.left, this.config.smallCircleDragPoint.top,
        this.config.width * 0.343, this.config.height * 0.5,
      ], this.config.violetSolidLine);
      this.group.push(this.violetSolidLine2);

      // 黄色虚线
      this.violetDottedLine = new fabric.Line([
        this.config.width * 0.343 - (this.config.smallCircleDragPoint.left - this.config.width * 0.343),
        (this.config.height * 0.5 - this.config.smallCircleDragPoint.top) + this.config.height * 0.5,
        this.config.width * 0.343, this.config.height * 0.5,
      ], this.config.violetDottedLine);
      this.group.push(this.violetDottedLine);

      // 蓝色线
      this.blueLine = new fabric.Line([
        this.config.smallCircleDragPoint.left, this.config.smallCircleDragPoint.top,
        this.config.smallCircleDragPoint.left, this.config.height * 0.5,
      ], this.config.blueLine);
      this.group.push(this.blueLine);

      // 红色线
      this.yellowLine = new fabric.Line([
        this.config.smallCircleDragPoint.left, this.config.height * 0.5,
        this.config.width * 0.343, this.config.height * 0.5,
      ], this.config.yellowLine);
      this.group.push(this.yellowLine);

      // 绿色线
      this.greenLine = new fabric.Line([
        this.config.smallCircleDragPoint.left, this.config.smallCircleDragPoint.top,
        this.config.smallCircleDragPoint.left, this.config.height * 0.5,
      ], this.config.greenLine);
      this.group.push(this.greenLine);

      // 180度的线
      this.redLine = new fabric.Circle(this.config.redLine);
      this.group.push(this.redLine);
    }

    // 添加螺旋线
    initScrewLine() {
      this.screwBlueLine = FabricUtil.createScrewLine(45, 45 - 360, 20 + 45 * 0.1, this.config.width * 0.343,
        this.config.height * 0.5, this.config.screwBlueLine);
      this.group.push(this.screwBlueLine);

      this.screwGreenLine = FabricUtil.createScrewLine(90, 45, 20, this.config.width * 0.343,
        this.config.height * 0.5, this.config.screwGreenLine);
      this.group.push(this.screwGreenLine);
    }

    // 添加文字
    initText() {
      this.pText = new fabric.Text('P', this.config.pText as any);
      this.group.push(this.pText);
      this.aText = new fabric.Text('α', this.config.pText as any);
      this.group.push(this.aText);
      this.a2Text = new fabric.Text('-α', this.config.pText as any);
      this.group.push(this.a2Text);
      this.paiText = new fabric.Text('π', this.config.pText as any);
      this.group.push(this.paiText);
    }

    initDragEvent() {
      let angle = FabricUtil.getButtonAngle(this.smallCircleDragPoint, this.config.circleLine.left, this.config.circleLine.top);
      this.smallCircleDragPoint.on({'moving': (e: any) => {
          angle = FabricUtil.getButtonAngle(this.smallCircleDragPoint, this.config.circleLine.left, this.config.circleLine.top);
          FabricUtil.limitButtonScope(angle, this.smallCircleDragPoint, this.config.circleLine.radius,
            this.config.circleLine.left, this.config.circleLine.top);
          this.updateLine(angle);
          this.updateScrewBlueLine(angle);
          this.updateText(angle);
      }});
      this.updateLine(angle);
      this.updateScrewBlueLine(angle);
      this.updateText(angle);
    }

    updateLine(angle: number) {
      this.helper.updateVioletLine(this.violetSolidLine, angle, this.config.circleLine.radius * 5);
      this.helper.updateGreenLine(this.greenLine, 90 + (90 - angle), this.config.circleLine.radius * 1.4);
      this.helper.updateBlueLine(this.blueLine, 90 + (90 - angle) - 180, this.config.circleLine.radius);
      this.helper.updateYellowLine(this.yellowLine, 90 + (90 - angle) - 180, this.config.circleLine.radius);
      this.helper.updateVioletLine(this.violetDottedLine, 90 + (90 - angle) - 180, this.config.circleLine.radius * 5);
      this.helper.updateVioletLine(this.violetSolidLine2, 90 + (90 - angle), this.config.circleLine.radius * 5);

      this.redLine.set('angle', 90 + (90 - angle) + 90);
    }

    updateScrewBlueLine(angle: number) {
      if (angle >= 90) {
        angle = -180 - (180 - angle);
      }
      const radius = 10 * this.scale;

      FabricUtil.updateScrewLine(this.screwGreenLine, 90, angle, radius, this.config.width * 0.343,
        this.config.height * 0.5);

      FabricUtil.updateScrewLine2(this.screwBlueLine, 90, 90 + (90 - angle), radius, this.config.width * 0.343,
        this.config.height * 0.5);
    }

    updateText(angle: number) {
      if (angle >= 90) {
        angle = -180 - (180 - angle);
      }

      this.helper.updateText(this.pText, angle + 10, this.config.circleLine.radius * 1.1);
      this.helper.updateText(this.aText, 90 - (90 - angle) / 2, 18 * this.scale + (90 - angle) * 0.04 * this.scale);
      this.helper.updateText(this.a2Text, 90 + (90 - angle) / 2, 18 * this.scale + (90 - angle) * 0.04 * this.scale);
      this.helper.updateText(this.paiText, (90 - angle), 90 * this.config.scale);
    }

    showLine(value: string) {
      if (value === '1') {
        this.showBlueLine();
      } else if (value === '2') {
        this.showYellowLine();
      } else if (value === '3') {
        this.showGreenLine();
      }

      this.myCanvas.renderAll();
    }

    // 显示蓝色线
    showBlueLine() {
      this.blueLine.set('stroke', '#18A2FF');
      this.blueLine.set('visible', true);
      this.yellowLine.set('visible', false);
      this.greenLine.set('visible', false);
    }

    // 显示黄色线
    showYellowLine() {
      this.blueLine.set('stroke', '#AC84FF');
      this.blueLine.set('visible', true);
      this.yellowLine.set('visible', true);
      this.greenLine.set('visible', false);
    }

    // 显示绿色线
    showGreenLine() {
      this.blueLine.set('visible', false);
      this.yellowLine.set('visible', false);
      this.greenLine.set('visible', true);
    }

    hide() {
      for (let i = 0; i < this.group.length; i++) {
        this.group[i].set('visible', false);
      }
      this.myCanvas.renderAll();
    }

    show() {
      for (let i = 0; i < this.group.length; i++) {
        this.group[i].set('visible', true);
      }
      this.myCanvas.renderAll();
    }


    // 重置
    reset() {
      this.resetElement(this.smallCircleDragPoint, this.config.smallCircleDragPoint);
      const angle = FabricUtil.getButtonAngle(this.smallCircleDragPoint, this.config.circleLine.left, this.config.circleLine.top);
      this.updateLine(angle);
      this.updateScrewBlueLine(angle);
      this.updateText(angle);
      this.myCanvas.renderAll();
    }

    resetElement(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
    }

    resetRect(element: any, config: any) {
      element.set('left', config.left).setCoords();
      element.set('top', config.top).setCoords();
      element.set('width', config.width);
      element.set('height', config.height);
    }
}

