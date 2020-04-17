import {MyConfig} from './MyConfig';
import Konva from 'konva';

export class MyCanvas {
    lang = window.env.browserInfo.lang;
    config: MyConfig;

    stage: Konva.Stage;
    bgLayer: Konva.Layer;
    layer: Konva.Layer;
    //初始的矩形
    startRect: Konva.Rect;
    //矩形右下角拖动点
    dragPoint: Konva.Circle;
    //定义两个文本区
    rightNumber: Konva.Text;
    underNumber: Konva.Text;
    //定义底部文字
    formulaText: Konva.Text;
    //按照宽度计算配置网格数
    gridColumnNum = 30;
    gridRowNum = 0;
    gridCellSize = 0;

    rectPosition = {x: 10, y: 5};
    rectSize = {width: 9, height: 6};
    formula: Konva.Text;

    constructor() {
        this.config = new MyConfig();
        this.init();
    }

    private init() {
        this.initCanvas();
        this.initRect();
        this.initDragPoint();
        this.initFormula();
        this.initText();
        this.initDragEvent();
        this.stage.draw();
    }

    // 初始化画布
    private initCanvas() {
        this.stage = new Konva.Stage({
            container: 'container',
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.initBgLayer();
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    }

    // 初始化带网格的canvas，作为背景
    private initBgLayer() {
        this.bgLayer = new Konva.Layer();
        this.stage.add(this.bgLayer);
        this.drawGrid();
    }

    //设置单元格宽高
    private setGridParams() {
        this.gridCellSize = this.bgLayer.width() / this.gridColumnNum;
        this.gridRowNum = this.bgLayer.height() / this.gridCellSize;
    }

    //在bgLayer上画网格线
    private drawGrid() {
        this.bgLayer.removeChildren();
        this.setGridParams();

        for (let rowIndex = 1; rowIndex < this.gridRowNum; rowIndex++) {
            const points = [0, rowIndex * this.gridCellSize, this.bgLayer.width(), rowIndex * this.gridCellSize];
            this.config.gridLine.points = points;
            const line = new Konva.Line(this.config.gridLine);
            this.bgLayer.add(line);
        }
        for (let columnIndex = 1; columnIndex < this.gridColumnNum; columnIndex++) {
            const points = [columnIndex * this.gridCellSize, 0, columnIndex * this.gridCellSize, this.bgLayer.height()];
            this.config.gridLine.points = points;
            const line = new Konva.Line(this.config.gridLine);
            this.bgLayer.add(line);
        }
    }

    //初始化拖动的矩形
    private initRect() {
        this.startRect = new Konva.Rect({
            x: 10 * this.gridCellSize,
            y: 5 * this.gridCellSize,
            width: 9 * this.gridCellSize,
            height: 6 * this.gridCellSize,
            fill: '#FFFFFF',
            opacity: 0.5,
            draggable: true,
            dragBoundFunc: (pos) => {
                return this.dragRect(pos);
            }
        });
        this.layer.add(this.startRect);
    }

    //初始化公式
    private initFormula() {
        this.formula = new Konva.Text({
          x: this.startRect.x() + this.startRect.width() / 2 ,
          y: this.startRect.y() + this.startRect.height() + (1.5 * this.gridCellSize),
          text: this.lang.formula + ' = 9 × 6',
          fontSize: 38,
          fill: '#FFFFFF'
        });
        this.formula.visible(false);
        this.formula.x(this.startRect.x() + (this.startRect.width() / 2) - (this.formula.width() / 2));
        this.layer.add(this.formula);
    }

    //设置公式的位置
    setFormulaPosition() {
        if (this.underNumber.text() === this.rightNumber.text()) {
          this.formula.text( this.lang.formula1 + ' = ' + this.underNumber.text() + ' × ' + this.rightNumber.text());
        } else {
          this.formula.text( this.lang.formula + ' = ' + this.underNumber.text() + ' × ' + this.rightNumber.text());
        }
      this.formula.x(this.startRect.x() + (this.startRect.width() / 2) - (this.formula.width() / 2));
      this.formula.y(this.startRect.y() + this.startRect.height() + (1.5 * this.gridCellSize));
    }

    //显示或隐藏公式
    isShowFormula(value: boolean) {
        this.formula.visible(value);
        this.layer.draw();
    }

    //初始化拖动的点
    private initDragPoint() {
        this.dragPoint = new Konva.Circle({
            x: this.startRect.x() + this.startRect.width(),
            y: this.startRect.y() + this.startRect.height(),
            radius: 10,
            fill: '#FFFFFF',
            draggable: true,
            stroke: 'transparent',
            strokeWidth: 6,
            dragBoundFunc: (pos) => {
                return this.limitDragPointBound(pos);
            },
        });
        this.dragPoint.moveToTop();
        this.layer.add(this.dragPoint);
    }

    private dragRect(pos: any) {
        const position = pos;
        //使矩形的拖动单位为1
        position.x = Math.round(pos.x / this.gridCellSize) * this.gridCellSize;
        position.y =  Math.round(pos.y / this.gridCellSize) * this.gridCellSize;
        if (pos.x + this.startRect.width() > this.layer.width() - (this.gridCellSize * 2)) {
            position.x = this.layer.width() - (this.gridCellSize * 2) - this.startRect.width();
        }
        // //超出左边范围的情况
        if (pos.x < this.gridCellSize * 2) {
            position.x = this.gridCellSize * 2;
        }
        // //超出上边范围的情况
        if (pos.y < this.gridCellSize * 2) {
            position.y = this.gridCellSize * 2;
        }
        //超出下边范围的情况
        if (pos.y + this.startRect.height() > (Math.floor(this.layer.height() / this.gridCellSize) - 2) * this.gridCellSize) {
            position.y = (Math.floor(this.layer.height() / this.gridCellSize) - 2) * this.gridCellSize - this.startRect.height();
        }

        //控制拖动点和数字标注跟随矩形移动
        this.dragPoint.x( position.x + this.startRect.width());
        this.dragPoint.y( position.y + this.startRect.height());
        //在拖动矩形时记录矩形当前的位置
        this.rectPosition = {x: Math.round(position.x / this.gridCellSize), y: Math.round(position.y / this.gridCellSize)};
        //重新设置标注文字的位置
        this.setLablePosition(position, 'rect');
        this.setFormulaPosition();
        this.layer.draw();
        return position;
    }

    //定义两个文本标签显示文本
    private initText() {
        this.rightNumber = new Konva.Text({
            x: 0,
            y: 0,
            text: '6',
            fontSize: 44,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#FFFFFF'
        });
        this.underNumber = new Konva.Text({
            x: 0,
            y: 0,
            text: '9',
            fontSize: 44,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#FFFFFF',
        });
        this.setLablePosition();
        this.layer.add(this.rightNumber);
        this.layer.add(this.underNumber);
    }

    // 初始化按钮拖动事件
    private initDragEvent() {
        this.dragPoint.off('dragstart touchstart dragend touchend');
        this.dragPoint.on('dragstart touchstart  ', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.dragPoint.on('dragend touchend', () => {
            this.stage.container().style.cursor = 'default';
        });
        this.dragPoint.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.dragPoint.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
        this.startRect.on('dragstart touchstart  ', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.startRect.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.startRect.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });

    }


    // 限制拖动点的拖动范围
    private limitDragPointBound(pos: any) {
        const pointx = Math.round(pos.x / this.gridCellSize) * this.gridCellSize;
        const pointy = Math.round(pos.y / this.gridCellSize) * this.gridCellSize;

        const position = {x: pointx, y: pointy};
        //限定小球自身的位置
        if (pos.x < this.startRect.x() + this.gridCellSize) {
            position.x = this.startRect.x() + this.gridCellSize;
        }

        if (pos.y < this.startRect.y() + this.gridCellSize) {
            position.y = this.startRect.y() + this.gridCellSize;
        }

        //限定小球拖动范围边界
        //超出右边范围的情况
        if (pos.x > this.layer.width() - (this.gridCellSize * 2)) {
          position.x = this.layer.width() - (this.gridCellSize * 2);
        }
        //超出下边范围的情况
        if (pos.y > (Math.floor(this.layer.height() / this.gridCellSize) - 2) * this.gridCellSize) {
            position.y = (Math.floor(this.layer.height() / this.gridCellSize) - 2) * this.gridCellSize;
        }

        this.drawNewGroup(position);

        //修改文字位置的方法
        this.setLablePosition(position, 'point');
        this.setFormulaPosition();

        //在移动点时记录矩形当时的宽高
        this.rectSize = {width: Math.round(Math.abs(this.startRect.x() - pos.x) / this.gridCellSize),
          height: Math.round(Math.abs(this.startRect.y() - pos.y) / this.gridCellSize)};

        return position;
    }

    //修改文字当前位置的方法
    setLablePosition(position?: any, graph?: string) {
      this.rightNumber.x(this.startRect.x() + this.startRect.width() + (this.gridCellSize / 2));
      this.rightNumber.y(this.startRect.y() + (this.startRect.height() / 2) - (this.rightNumber.height() / 2));
      this.underNumber.x(this.startRect.x() + (this.startRect.width() / 2) - (this.underNumber.width() / 2));
      this.underNumber.y( this.startRect.y() + this.startRect.height() + (this.gridCellSize / 2));
      //重新设置文字
      switch (graph) {
        case 'rect':
          if (position) {
            this.rightNumber.text((Math.abs(position.y - this.dragPoint.y()) / this.gridCellSize).toFixed());
            this.underNumber.text((Math.abs(position.x - this.dragPoint.x()) / this.gridCellSize).toFixed());
            return;
          }
            break;
        case 'point':
          if (position) {
            this.rightNumber.text((Math.abs(this.startRect.y() - position.y) / this.gridCellSize).toFixed());
            this.underNumber.text((Math.abs(this.startRect.x() - position.x) / this.gridCellSize).toFixed());
            return;
          }
            break;
      }

      this.rightNumber.text((Math.abs(this.startRect.y() - this.dragPoint.y()) / this.gridCellSize).toFixed());
      this.underNumber.text((Math.abs(this.startRect.x() - this.dragPoint.x()) / this.gridCellSize).toFixed());
    }

    //点移动后改变图形方法
    drawNewGroup(pos: any) {
        this.startRect.setAttr('width', Math.abs(this.startRect.x() - pos.x));
        this.startRect.setAttr('height', Math.abs(this.startRect.y() - pos.y));
    }

    public resize() {
        this.stage.width(window.innerWidth);
        this.stage.height(window.innerHeight);
        this.drawGrid();
        this.startRect.x(this.rectPosition.x * this.gridCellSize);
        this.startRect.y(this.rectPosition.y * this.gridCellSize);
        this.startRect.width(this.rectSize.width * this.gridCellSize);
        this.startRect.height(this.rectSize.height * this.gridCellSize);
        this.dragPoint.x(this.startRect.x() + this.startRect.width());
        this.dragPoint.y(this.startRect.y() + this.startRect.height());
        const scaleX = window.innerWidth / 1920;
        const fontsize = scaleX * 44;
        this.formula.fontSize(fontsize);
        this.underNumber.fontSize(fontsize);
        this.rightNumber.fontSize(scaleX * 38);
        this.setLablePosition();
        this.setFormulaPosition();
        this.stage.draw();
    }

    public reset() {
        this.startRect.x(10 * this.gridCellSize);
        this.startRect.y(5 * this.gridCellSize);
        this.startRect.width(9 * this.gridCellSize);
        this.startRect.height(6 * this.gridCellSize);
        this.dragPoint.x(this.startRect.x() + this.startRect.width());
        this.dragPoint.y(this.startRect.y() + this.startRect.height());
        for (let i = 0; i < 2; i++) {
          this.setLablePosition();
        }
        this.setFormulaPosition();
        this.stage.draw();
    }

}

