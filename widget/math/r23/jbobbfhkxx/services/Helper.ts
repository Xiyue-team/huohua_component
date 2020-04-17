import { fabric } from 'fabric';
import { FormulaOneConfig } from './FormulaOneConfig';
import { FabricUtil } from './Util';
import buttonImage from '../sub_static/buttonImage.png';

export class Helper {
  config: FormulaOneConfig;

  constructor() {
    this.config = new FormulaOneConfig();
  }

  createCanvas(id: string) {
    (document.getElementById(id) as any).width = window.innerWidth;
    (document.getElementById(id) as any).height = window.innerHeight;
    const myCanvas = new fabric.Canvas(id);
    myCanvas.selection = false;

    return myCanvas;
  }

  async createDragButton(config: fabric.IImageOptions, canvas?: fabric.Canvas) {
    const dragButton = await FabricUtil.loadImage(buttonImage as any, config);
    return dragButton;
  }

  // 创建坐标轴
  createAxis(canvas: fabric.Canvas) {
    const line = new fabric.Rect(this.config.line);
    const arrow = new fabric.Triangle(this.config.arrow);
    arrow.rotate(90);

    const xAxis = new fabric.Group([fabric.util.object.clone(line), fabric.util.object.clone(arrow)], {selectable: false});
    const yAxis = new fabric.Group([fabric.util.object.clone(line), fabric.util.object.clone(arrow)], {selectable: false});
    yAxis.set('left', yAxis.get('left') - 5 * this.config.scale);
    yAxis.rotate(-90);

    const axis = new fabric.Group([xAxis, yAxis], {selectable: false});
    canvas.add(axis);

    const xText = new fabric.Text('x', this.config.xText as any);
    canvas.add(xText);

    const yText = new fabric.Text('y', this.config.yText as any);
    canvas.add(yText);

    const oText = new fabric.Text('O', this.config.oText as any);
    canvas.add(oText);

    const numberText1 = new fabric.Text('1', this.config.numberText1 as any);
    canvas.add(numberText1);

    const numberText2 = new fabric.Text('-1', this.config.numberText2 as any);
    canvas.add(numberText2);

    const numberText3 = new fabric.Text('1', this.config.numberText3 as any);
    canvas.add(numberText3);

    const numberText4 = new fabric.Text('-1', this.config.numberText4 as any);
    canvas.add(numberText4);
  }

  // 创建轨迹圆
  createCircle(canvas: fabric.Canvas) {
    const smallCircleLine = new fabric.Circle(this.config.circleLine);
    canvas.add(smallCircleLine);
  }

  // 紫线跟着点动
  updateVioletLine(line: fabric.Line, angle: number, radius: number) {
    line.set('x1', radius * Math.sin(angle * Math.PI / 180) + this.config.circleLine.left).setCoords();
    line.set('y1', this.config.circleLine.top - radius * Math.cos(angle * Math.PI / 180)).setCoords();
  }

  // 绿色线跟着点动
  updateGreenLine(line: fabric.Line, angle: number, radius: number) {
    line.set('x1', this.config.circleLine.left + this.config.circleLine.radius).setCoords();
    line.set('y1', this.config.circleLine.top - this.config.circleLine.radius * Math.tan((90 - angle) * Math.PI / 180)).setCoords();
    line.set('x2', this.config.circleLine.left + this.config.circleLine.radius).setCoords();
  }

  // 蓝色线跟着点动
  updateBlueLine(line: fabric.Line, angle: number, radius: number) {
    line.set('x1', radius * Math.sin(angle * Math.PI / 180) + this.config.circleLine.left).setCoords();
    line.set('y1', this.config.circleLine.top - radius * Math.cos(angle * Math.PI / 180)).setCoords();
    line.set('x2', radius * Math.sin(angle * Math.PI / 180) + this.config.circleLine.left).setCoords();
  }

  // 黄色线跟着点动
  updateYellowLine(line: fabric.Line, angle: number, radius: number) {
    line.set('x1', radius * Math.sin(angle * Math.PI / 180) + this.config.circleLine.left).setCoords();
  }


  // 更新文字的位置
  updateText(text: any, angle: any, radius: any) {
    text.set('left', radius * Math.sin(angle * Math.PI / 180) + this.config.circleLine.left);
    text.set('top', this.config.circleLine.top - radius * Math.cos(angle * Math.PI / 180));
  }






  // 更新螺旋线
  updateScrewLine(canvas: any, screwLine: any, startAngle: number, endAngle: number, radius: number, config: any) {
    canvas.remove(screwLine);

    const pointArray = [];
    for (let i = startAngle; i > endAngle; i--) {
      pointArray.push({
        x: radius * Math.sin((i) * Math.PI / 180) + this.config.circleLine.left,
        y: this.config.circleLine.top - radius * Math.cos((i) * Math.PI / 180)
      });
      radius += 0.1;
    }
    screwLine = new fabric.Polyline(pointArray, config);
    canvas.add(screwLine);
  }













}
