import { CoordinateSystem } from '../../../../components/CoordinateSystem';
import { Param } from '../../../../components/Param';
import { Params } from '../../../../components/Params';
import { Point } from '../../../../components/Point';
import { MobileAdapter } from '../../../../../src/core/adapter/MobileAdapter';


export class Game {

  activeControl = false;
  // 放大比例
  zoom = 10;
  // 轴长度
  axisLong = 0;
  // 刻度长度
  axisAtom = 0;
  // 文字大小
  fontSize = 0;
  absLine = false;
  // 对应关系
  relation = false;
  fg = false;
  context: CanvasRenderingContext2D;
  // 函数方程
  formula: any;
  // 函数参数
  params = new Params();


  constructor(canvas: HTMLCanvasElement, formula: any) {
    this.context = canvas.getContext('2d');
    //确定轴长度 = 画布高度和宽度较小值的1/2
    this.axisLong = Math.round(Math.min(this.context.canvas.width, this.context.canvas.height) / 1.1);
    //确定刻度长度 = 轴长度/10 取整
    this.axisAtom = Math.floor((this.axisLong - 30) / 20);
    //确定文字大小 = 刻度大小的4/5且不大于14
    this.fontSize = Math.min(Math.floor(this.axisAtom * 0.8), 16);
    //初始化方程
    this.formula = formula;
    //初始化参数
    this.params.addParam('a', new Param(-5, 5, 2));
    this.params.addParam('b', new Param(-5, 5, 4));
    this.params.addParam('c', new Param(-5, 5, 1));
    this.params.addParam('m', new Param(0, 5, 2));
    //绑定事件
    this.bindEvents();
  }

  bindEvents(): void {
    this.context.canvas.addEventListener('mousedown', this.mouseDown);
    this.context.canvas.addEventListener('mouseup', this.mouseUp);
    this.context.canvas.addEventListener('mouseleave', this.mouseLeave);

    this.context.canvas.addEventListener('touchstart', this.mouseDown);
    this.context.canvas.addEventListener('touchend', this.mouseUp);
  }

  mouseDown = () => {
    this.activeControl = true;
  }


  touchMove = (event: Event) => {
    const devicePixelRatio = window.devicePixelRatio || 1;

    if (!this.activeControl) { return; }
    let x = (event.type === 'touchmove' ? (event as TouchEvent).changedTouches[0].clientX: (event as MouseEvent).clientX)
    - this.context.canvas.getBoundingClientRect().left - this.context.canvas.width / (2 * devicePixelRatio);
    x = Math.floor(x / this.axisAtom * 100) / 100 * 1.5;
    x = Math.floor(x * this.zoom / 10 * 100) / 100 * 1.5;
    if (x === this.formula.g.point.x) { return; }
    const y = this.formula.g.rule(x, this.params) / 100;
    this.formula.g.point.x = x;
    this.drawCanvas();
  }

  mouseUp = () => {
    this.activeControl = false;
  }

  mouseLeave = () => {
    this.activeControl = false;
  }

  reset() {
    const mobileAdapter = new MobileAdapter();
    mobileAdapter.hidePanel();
    var pad = document.getElementById("controlPanel").parentNode;
    pad.scrollTop = 0;
    this.activeControl = false;
    this.relation = false;
    this.fg = false;
    this.absLine = false;
    this.formula.g.setPoint(new Point(0));
    this.drawCanvas();
  }

  zoomChanged(oldZoom: number, newZoom: number): void {
    this.zoom = newZoom;
    this.drawCanvas();
  }

  drawCanvas(): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawCoordinateSystem();
    this.drawAbs();
    this.drawFormulas();
    this.drawPoints();
  }

  drawCoordinateSystem(): void {
    (new CoordinateSystem(this.context, this.axisLong, this.axisAtom, this.fontSize, this.zoom)).draw();
  }

  drawFormulas(): void {
    //重新计算点坐标
    this.formula.g.point.y = this.formula.g.rule(this.formula.g.point.x, this.params);
    this.formula.fg.point.x = this.formula.g.point.x;
    this.formula.f.point.x = this.formula.g.point.y as number;

    this.formula.g.draw(this.context, this.axisAtom, this.zoom, this.params);
    this.formula.f.draw(this.context, this.axisAtom, this.zoom, this.params);
    if (this.fg) { this.formula.fg.draw(this.context, this.axisAtom, this.zoom, this.params); }
  }

  drawPoints(): void {
    if (!this.relation) { return; }
    this.formula.g.drawPoint(this.context, this.axisAtom, this.zoom, this.fontSize, this.params);
    this.formula.f.drawPoint(this.context, this.axisAtom, this.zoom, this.fontSize, this.params);
    if (this.fg) { this.formula.fg.drawPoint(this.context, this.axisAtom, this.zoom, this.fontSize, this.params); }
  }
  
  drawAbs(): void {
    const devicePixelRatio = window.devicePixelRatio || 1;
    if (!this.absLine) { return; }
    const abs = this.params.getParam('b') / this.params.getParam('a') / ( 2 * devicePixelRatio);
    console.log('abs',abs)
    if (abs < -10 / devicePixelRatio || abs > 10 / devicePixelRatio) { return; }
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(
      this.context.canvas.width / ( 2 * devicePixelRatio) - abs / this.zoom * 10 * this.axisAtom,
      this.context.canvas.height / ( 2 * devicePixelRatio) - 15 * this.axisAtom
    );
    this.context.lineTo(
      this.context.canvas.width / ( 2 * devicePixelRatio) - abs / this.zoom * 10 * this.axisAtom,
      this.context.canvas.height / ( 2 * devicePixelRatio) + 15 * this.axisAtom
    );
    this.context.strokeStyle = '#ff5a5a';
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.restore();
  }
}
