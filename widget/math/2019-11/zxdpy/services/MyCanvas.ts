import {MyConfig} from './MyConfig';
import Konva, {Context, Shape} from 'konva';

export class MyCanvas {
    config: MyConfig;

    stage: Konva.Stage;
    bgLayer: Konva.Layer;
    layer: Konva.Layer;

    //拖动的直线
    originLine: Konva.Line;
    //正在拖动的直线
    currentLine: Konva.Line;
    //拖动直线的虚线痕迹
    dashLineStart: Konva.Line;
    dashLineEnd: Konva.Line;

    //按照宽度计算配置网格数
    gridColumnNum = 26;
    gridRowNum = 0;
    gridCellSize = 0;

    defaultLineStartXIndex = 10;
    defaultLineStartYIndex = 5;
    defaultLineWidthNum = 4;
    defaultLineHeightNum = 2;


    linePoints = [0, 0, 0, 0];

    dragLineStartX = 0;
    dragLineStartY = 0;
    //页面缩放位置记录
    dragRestXIndex = 0;
    dragRestYIndex = 0;
    //定义两个参数用于保存最后线移动的总位置
    allMoveXIndex = 0;
    allMoveYIndex = 0;

    constructor() {
        this.config = new MyConfig();
        this.init();
    }

    private init() {
        this.initCanvas();
        this.initLinePoint(this.defaultLineStartXIndex, this.defaultLineStartYIndex);
        this.initLine();
        this.initDashLine();
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

    private initLinePoint(startXIndex = this.defaultLineStartXIndex, startYIndex = this.defaultLineStartYIndex) {

        // 配置拖动线条的位置
        const originLineStartX = startXIndex * this.gridCellSize;
        const originLineStartY = startYIndex * this.gridCellSize;
        const originLineEndX = originLineStartX + this.defaultLineWidthNum * this.gridCellSize;
        const originLineEndY = originLineStartY + this.defaultLineHeightNum * this.gridCellSize;

        this.linePoints = [originLineStartX, originLineStartY, originLineEndX, originLineEndY];
    }

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

    //初始化拖动的线条
    private initLine() {
        const originPoints = [].concat(this.linePoints);
        this.config.originLine.points = originPoints;
        this.originLine = new Konva.Line(this.config.originLine);
        this.layer.add(this.originLine);

        const currentPoints = [].concat(this.linePoints);
        this.config.currentLine.points = currentPoints;
        this.config.currentLine.dragBoundFunc = (pos) => {
            return this.limitDragBound(pos);
        };

        //添加hitFun外部隐形框方便线条拖动
        this.config.currentLine.hitFunc = (con: Context, shape: Shape) => {
            con.beginPath();
            con.moveTo(this.defaultLineStartXIndex * this.gridCellSize + 10, this.defaultLineStartYIndex * this.gridCellSize - 10);
            con.lineTo(this.defaultLineStartXIndex * this.gridCellSize - 10, this.defaultLineStartYIndex * this.gridCellSize + 10);
            con.lineTo((this.defaultLineStartXIndex + this.defaultLineWidthNum) * this.gridCellSize - 10,
                (this.defaultLineStartYIndex + this.defaultLineHeightNum) * this.gridCellSize + 10);
            con.lineTo((this.defaultLineStartXIndex + this.defaultLineWidthNum) * this.gridCellSize + 10,
                (this.defaultLineStartYIndex + this.defaultLineHeightNum) * this.gridCellSize - 10);
            con.closePath();
            con.fillStrokeShape(shape);
        };
        this.currentLine = new Konva.Line(this.config.currentLine);
        this.layer.add(this.currentLine);
    }

    //初始化拖动线条的痕迹
    private initDashLine() {
        const pointStart = [this.linePoints[0], this.linePoints[1]];
        this.config.dashLineStart.points = pointStart;
        this.dashLineStart = new Konva.Line(this.config.dashLineStart);
        this.layer.add(this.dashLineStart);

        const pointEnd = [this.linePoints[2], this.linePoints[3]];
        this.config.dashLineEnd.points = pointEnd;
        this.dashLineEnd = new Konva.Line(this.config.dashLineEnd);
        this.layer.add(this.dashLineEnd);
    }

    // 初始化按钮拖动事件
    private initDragEvent() {
        this.currentLine.off('dragstart touchstart dragend touchend');
        this.currentLine.on('dragstart', () => {
            this.setOriginLineToDragLine();
            this.layer.draw();
            this.stage.container().style.cursor = 'pointer';
        });

        this.currentLine.on('dragend', () => {
            this.stage.container().style.cursor = 'default';
            //记录位置
            this.writeIndex(this.allMoveXIndex, this.allMoveYIndex);
        });
        this.currentLine.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });

        this.currentLine.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    //把移动后的原点组位置记录
    private writeIndex(x: number, y: number) {
        this.dragRestXIndex = this.defaultLineStartXIndex + x;
        this.dragRestYIndex = this.defaultLineStartYIndex + y;
    }

    //边界限制的方法
    private limitBound(pos: any) {
        if (pos.x > (22 - this.defaultLineStartXIndex) * this.gridCellSize) {
            if (pos.y < -this.defaultLineStartYIndex * this.gridCellSize) {
                pos.y = -this.defaultLineStartYIndex * this.gridCellSize;
                pos.x = (22 - this.defaultLineStartXIndex) * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
                (this.defaultLineStartYIndex + 2) * this.gridCellSize) {
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
                    - (this.defaultLineStartYIndex + 2) * this.gridCellSize;
                pos.x = (22 - this.defaultLineStartXIndex) * this.gridCellSize;
            } else {
                pos.x = (22 - this.defaultLineStartXIndex) * this.gridCellSize;
            }
        } else if (pos.x < -this.defaultLineStartXIndex * this.gridCellSize) {
            if (pos.y < -5 * this.gridCellSize) {
                pos.y = -5 * this.gridCellSize;
                pos.x = -this.defaultLineStartXIndex * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
                (this.defaultLineStartYIndex + 2) * this.gridCellSize) {
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
                    (this.defaultLineStartYIndex + 2) * this.gridCellSize;
                pos.x = -this.defaultLineStartXIndex * this.gridCellSize;
            } else {
                pos.x = -this.defaultLineStartXIndex * this.gridCellSize;
            }
        } else if (pos.y < -this.defaultLineStartYIndex * this.gridCellSize) {
            pos.y = -this.defaultLineStartYIndex * this.gridCellSize;
        } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
            (this.defaultLineStartYIndex + 2) * this.gridCellSize) {
            pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
                (this.defaultLineStartYIndex + 2) * this.gridCellSize;
        }
    }

    // 限制按钮拖动范围
    private limitDragBound(pos: any) {
        let lineDragPosX = 0;
        let lineDragPosY = 0;
        //边界限制
        this.limitBound(pos);
        const posX = pos.x - this.dragLineStartX;
        const posY = pos.y - this.dragLineStartY;
        const distanceX = Math.round(posX / this.gridCellSize) * this.gridCellSize;
        const distanceY = Math.round(posY / this.gridCellSize) * this.gridCellSize;

        if (distanceX === lineDragPosX && distanceY === lineDragPosY) {
            return {x: distanceX + this.dragLineStartX, y: distanceY + this.dragLineStartY};
        }

        // 设置虚线
        this.setDashLinePoint(distanceX, distanceY);

        //记录下移动的总位置
        this.allMoveXIndex = Math.round(pos.x / this.gridCellSize);
        this.allMoveYIndex = Math.round(pos.y / this.gridCellSize);

        //设置拖动线条位置
        lineDragPosX = distanceX + this.dragLineStartX;
        lineDragPosY = distanceY + this.dragLineStartY;

        return {x: lineDragPosX, y: lineDragPosY};
    }

    //再次拖动线调用更新位置方法
    private setOriginLineToDragLine() {
        this.originLine.visible(true);

        this.clearDashLine();

        this.dragLineStartX = Math.round(this.currentLine.x() / this.gridCellSize) * this.gridCellSize;
        this.dragLineStartY = Math.round(this.currentLine.y() / this.gridCellSize) * this.gridCellSize;

        //起止线条移动
        this.originLine.x(Math.round(this.currentLine.x() / this.gridCellSize) * this.gridCellSize);
        this.originLine.y(Math.round(this.currentLine.y() / this.gridCellSize) * this.gridCellSize);
    }

    private clearDashLine() {
        //清除虚线
        this.dashLineStart.points([this.currentLine.points()[0], this.currentLine.points()[1]]);
        this.dashLineStart.x(Math.round(this.currentLine.x() / this.gridCellSize) * this.gridCellSize);
        this.dashLineStart.y(Math.round(this.currentLine.y() / this.gridCellSize) * this.gridCellSize);

        this.dashLineEnd.points([this.currentLine.points()[2], this.currentLine.points()[3]]);
        this.dashLineEnd.x(Math.round(this.currentLine.x() / this.gridCellSize) * this.gridCellSize);
        this.dashLineEnd.y(Math.round(this.currentLine.y() / this.gridCellSize) * this.gridCellSize);
    }

    //更行虚线位置方法
    private setDashLinePoint(distanceX: any, distanceY: any) {
        const tempStartPoints = [this.dashLineStart.points()[0] + distanceX,
            this.dashLineStart.points()[1] + distanceY];
        this.addPointsToDashLinePoints(this.dashLineStart, tempStartPoints);

        const tempEndPoints = [this.dashLineEnd.points()[0] + distanceX,
            this.dashLineEnd.points()[1] + distanceY];
        this.addPointsToDashLinePoints(this.dashLineEnd, tempEndPoints);
    }
     //限制直线只能水平和竖直移动
    private addPointsToDashLinePoints(dashLine: any, points: any) {
        const dashLineStartPointLength = dashLine.points().length;
        const dashLineStartLength1 = dashLine.points()[dashLineStartPointLength - 1];
        const dashLineStartLength2 = dashLine.points()[dashLineStartPointLength - 2];
        if (dashLineStartPointLength > 1) {
            //点没有移动
            if (points[0] === dashLineStartLength2
                && points[1] === dashLineStartLength1) {
                return;
                //点沿着直线移动
            } else if (points[0] === dashLineStartLength2
                || points[1] === dashLineStartLength1) {
                const startPoints = dashLine.points().concat(points);
                dashLine.points(startPoints);
                //存在点沿着斜线移动触发的事件
            } else if (points[0] !== dashLineStartLength2
                && points[1] !== dashLineStartLength1) {
                const innerpoint = [dashLineStartLength2, points[1]];
                dashLine.points(dashLine.points().concat(innerpoint).concat(points));
            }
        } else {
            const startPoints = dashLine.points().concat(points);
            dashLine.points(startPoints);
        }
    }

    //封装重置方法
    private resetLayer() {
        this.linePoints = [0, 0, 0, 0];
        this.dragLineStartX = 0;
        this.dragLineStartY = 0;
        //页面缩放位置记录
        this.dragRestXIndex = 0;
        this.dragRestYIndex = 0;
        this.defaultLineStartXIndex = 10;
        this.defaultLineStartYIndex = 5;

        this.initLinePoint(this.defaultLineStartXIndex, this.defaultLineStartYIndex);
        this.initLine();
        this.initDashLine();
        this.initDragEvent();
    }

    //页面缩放事件封装
    private resizeLayer() {
        this.layer.removeChildren();
        if (this.dragRestXIndex === 0 && this.dragRestYIndex === 0) {
            this.defaultLineStartXIndex = 10;
            this.defaultLineStartYIndex = 5;
        } else {
            this.defaultLineStartXIndex = this.dragRestXIndex;
            this.defaultLineStartYIndex = this.dragRestYIndex;
        }

        this.initLinePoint(this.defaultLineStartXIndex, this.defaultLineStartYIndex);
        this.initLine();
        this.initDashLine();
        this.initDragEvent();
        this.layer.add(this.originLine);
        this.layer.draw();
    }

    public resize() {
        this.stage.width(window.innerWidth);
        this.stage.height(window.innerHeight);
        this.drawGrid();
        this.resizeLayer();
        this.stage.draw();

    }

    public reset() {
        this.layer.removeChildren();
        this.layer.remove();
        this.resetLayer();
        this.stage.add(this.layer);
        this.stage.draw();
    }

}

