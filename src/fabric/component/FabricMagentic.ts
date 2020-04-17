/**
 *
 * 磁场类
 *
 * 用于画磁场
 * 主要调用scaleMagentic方法
 * 传入数字  数字大于0 显示叉号
 * 小于0显示 点  等于0全部隐藏
 *
 */

import { fabric } from 'fabric';

export class FabricMagentic {
  myCanvas: fabric.Canvas;

  magenticX1: Array<Array<fabric.Group>>;
  magenticX2: Array<Array<fabric.Group>>;
  magenticX3: Array<Array<fabric.Group>>;
  magenticX4: Array<Array<fabric.Group>>;

  magenticP1: Array<Array<fabric.Circle>>;
  magenticP2: Array<Array<fabric.Circle>>;
  magenticP3: Array<Array<fabric.Circle>>;
  magenticP4: Array<Array<fabric.Circle>>;

  // 叉号 和  点的组 用于整体显示隐藏
  xGroup: fabric.Group;
  pGroup: fabric.Group;

  magenticOption: MagenticOption;

  constructor(myCanvas: fabric.Canvas, magenticOption?: MagenticOption) {
    this.myCanvas = myCanvas;
    this.magenticOption = !magenticOption ? new MagenticOption() : magenticOption;
    this.init();
  }

  private init() {
    this.addX();
  }

  private addX () {
    const zeroX = 1200 * 0.5;
    const zeroY = 675 * 0.5;
    const length = 45;

    this.magenticX1 = [];
    this.magenticX2 = [];
    this.magenticX3 = [];
    this.magenticX4 = [];

    this.magenticP1 = [];
    this.magenticP2 = [];
    this.magenticP3 = [];
    this.magenticP4 = [];

    const xPoint = [];
    const cPoint = [];

    // 左上
    for (let i = 0; i < 15; i++) {
      this.magenticX1[i] = [];
      this.magenticP1[i] = [];
      for (let j = 0; j < 9; j++) {
        this.magenticX1[i][j] = this.createX(zeroX - length * i, zeroY - length * j);
        xPoint.push(this.magenticX1[i][j]);

        this.magenticP1[i][j] = this.createPoint(zeroX - length * i, zeroY - length * j);
        cPoint.push(this.magenticP1[i][j]);
      }
    }

    // 右上
    for (let i = 1; i < 15; i++) {
      this.magenticX2[i] = [];
      this.magenticP2[i] = [];
      for (let j = 0; j < 9; j++) {
        this.magenticX2[i][j] = this.createX(zeroX + length * i, zeroY - length * j);
        xPoint.push(this.magenticX2[i][j]);

        this.magenticP2[i][j] = this.createPoint(zeroX + length * i, zeroY - length * j);
        cPoint.push(this.magenticP2[i][j]);
      }
    }

    // 左下
    for (let i = 0; i < 15; i++) {
      this.magenticX3[i] = [];
      this.magenticP3[i] = [];
      for (let j = 1; j < 9; j++) {
        this.magenticX3[i][j] = this.createX(zeroX - length * i, zeroY + length * j);
        xPoint.push(this.magenticX3[i][j]);

        this.magenticP3[i][j] = this.createPoint(zeroX - length * i, zeroY + length * j);
        cPoint.push(this.magenticP3[i][j]);
      }
    }

    // 右下
    for (let i = 1; i < 15; i++) {
      this.magenticX4[i] = [];
      this.magenticP4[i] = [];
      for (let j = 1; j < 9; j++) {
        this.magenticX4[i][j] = this.createX(zeroX + length * i, zeroY + length * j);
        xPoint.push(this.magenticX4[i][j]);

        this.magenticP4[i][j] = this.createPoint(zeroX + length * i, zeroY + length * j);
        cPoint.push(this.magenticP4[i][j]);
      }
    }

    this.xGroup = new fabric.Group(xPoint, {
      left: 0,
      top: 0,
      width: 1200,
      height: 675,
      selectable: false,
      hoverCursor: 'default',
    });

    this.pGroup = new fabric.Group(cPoint, {
      left: 0,
      top: 0,
      width: 1200,
      height: 675,
      selectable: false,
      hoverCursor: 'default',
    });
    this.xGroup.set('visible', false).setCoords();
    this.pGroup.set('visible', false).setCoords();

    this.myCanvas.add(this.xGroup);
    this.myCanvas.add(this.pGroup);
  }

  private createX(left: number, top: number) {
    const line1 = new fabric.Rect({
      left: 0,
      top:  0,
      width: 30,
      height: 2,
      fill: '#ffffff',
      selectable: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'default',
      angle: 45
    });

    const line2 = new fabric.Rect({
      left: 0,
      top:  0,
      width: 30,
      height: 2,
      fill: '#ffffff',
      selectable: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'default',
      angle: -45
    });


    const pointX = new fabric.Group([line1, line2], {
        left: left,
        top: top,
        width: 38 * 2,
        height: 40 * 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        hoverCursor: 'default',
    });


    return pointX;
  }

  private createPoint(left: number, top: number) {
    const circle = new fabric.Circle({
      radius: 5,
      fill: '#ffffff',
      originX: 'center',
      originY: 'center',
      hoverCursor: 'default',
      left: left,
      top: top
    });

    return circle;
  }

  scaleMagentic(space: number) {
    if (space > 0) {
      if (!this.xGroup.visible) {
        this.xGroup.set('visible', true).setCoords();
        this.pGroup.set('visible', false).setCoords();
      }

      this.scaleX(space);
    }

    if (space < 0) {
      if (!this.pGroup.visible) {
        this.xGroup.set('visible', false).setCoords();
        this.pGroup.set('visible', true).setCoords();
      }

      this.scaleP(-space);
    }

    if (space === 0) {
      this.xGroup.set('visible', false).setCoords();
      this.pGroup.set('visible', false).setCoords();
    }

    this.myCanvas.renderAll();
  }

  private scaleX (space: number) {
    const zeroX = 0;
    const zeroY = 0;
    const length = this.magenticOption.maxSpace - space;

    // 左上
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 9; j++) {
        this.magenticX1[i][j].set('left', zeroX - length * i).setCoords();
        this.magenticX1[i][j].set('top', zeroY - length * j).setCoords();
      }
    }

    // 右上
    for (let i = 1; i < 15; i++) {
      for (let j = 0; j < 9; j++) {
        this.magenticX2[i][j].set('left', zeroX + length * i).setCoords();
        this.magenticX2[i][j].set('top', zeroY - length * j).setCoords();
      }
    }

    // 左下
    for (let i = 0; i < 15; i++) {
      for (let j = 1; j < 9; j++) {
        this.magenticX3[i][j].set('left', zeroX - length * i).setCoords();
        this.magenticX3[i][j].set('top', zeroY + length * j).setCoords();
      }
    }

    // 右下
    for (let i = 1; i < 15; i++) {
      for (let j = 1; j < 9; j++) {
        this.magenticX4[i][j].set('left', zeroX + length * i).setCoords();
        this.magenticX4[i][j].set('top', zeroY + length * j).setCoords();
      }
    }
  }

  private scaleP (space: number) {
    const zeroX = 0;
    const zeroY = 0;
    const length = this.magenticOption.maxSpace - space;

    // 左上
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 9; j++) {
        this.magenticP1[i][j].set('left', zeroX - length * i).setCoords();
        this.magenticP1[i][j].set('top', zeroY - length * j).setCoords();
      }
    }

    // 右上
    for (let i = 1; i < 15; i++) {
      for (let j = 0; j < 9; j++) {
        this.magenticP2[i][j].set('left', zeroX + length * i).setCoords();
        this.magenticP2[i][j].set('top', zeroY - length * j).setCoords();
      }
    }

    // 左下
    for (let i = 0; i < 15; i++) {
      for (let j = 1; j < 9; j++) {
        this.magenticP3[i][j].set('left', zeroX - length * i).setCoords();
        this.magenticP3[i][j].set('top', zeroY + length * j).setCoords();
      }
    }

    // 右下
    for (let i = 1; i < 15; i++) {
      for (let j = 1; j < 9; j++) {
        this.magenticP4[i][j].set('left', zeroX + length * i).setCoords();
        this.magenticP4[i][j].set('top', zeroY + length * j).setCoords();
      }
    }
  }

}

export class MagenticOption {

  // 最大间距
  // maxSpace = 145;
  maxSpace = 500;


}

