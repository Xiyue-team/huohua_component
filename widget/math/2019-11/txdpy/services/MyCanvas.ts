import {MyConfig} from './MyConfig';
import Konva from 'konva';

export class MyCanvas {
    config: MyConfig;

    stage: Konva.Stage;
    bgLayer: Konva.Layer;
    layer: Konva.Layer;

    //按照宽度计算配置网格数
    gridColumnNum = 26;
    gridRowNum = 0;
    gridCellSize = 0;

    //拖动的三角形
    triangle: Konva.Line;

    //影子三角形
    signtriangle: Konva.Line;

    //初始位置
    pointAx = 11;
    pointAy = 5;
    pointBx = 10;
    pointBy = 8;
    pointCx = 13;
    pointCy = 7;

    //定义三条虚线
    dashLineStartA: Konva.Line;
    dashLineStartB: Konva.Line;
    dashLineStartC: Konva.Line;

    //中间变量
    dragPointStartX = 0;
    dragPointStartY = 0;
    dragMovePointX = 0;
    dragMovePointY = 0;


    //纪录上次虚线结束位置
    dragMovePointXIndex = 0;
    dragMovePointYIndex = 0;
    //定义两个参数用于保存最后线移动的总位置
    allMoveXIndex = 0;
    allMoveYIndex = 0;
    //页面缩放位置记录
    dragAXIndex = 0;
    dragAYIndex = 0;
    dragBXIndex = 0;
    dragBYIndex = 0;
    dragCXIndex = 0;
    dragCYIndex = 0;

    constructor() {
        this.config = new MyConfig();
        this.init();
    }

    private init() {
        this.initCanvas();
        this.initTriangle();
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

    //以屏幕宽为基本分为26份，以单位宽为长得单元格高
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

    //画三角形
    private initTriangle() {
        this.signtriangle = new Konva.Line({
            x: 0,
            y: 0,
            points: [this.pointAx * this.gridCellSize, this.pointAy * this.gridCellSize,
                this.pointBx * this.gridCellSize, this.pointBy * this.gridCellSize,
                this.pointCx * this.gridCellSize, this.pointCy * this.gridCellSize],
            fill: '#D4F4D4',
            closed: true
        });
        this.layer.add(this.signtriangle);

        this.triangle = new Konva.Line({
            x: 0,
            y: 0,
            points: [this.pointAx * this.gridCellSize, this.pointAy * this.gridCellSize,
                this.pointBx * this.gridCellSize, this.pointBy * this.gridCellSize,
                this.pointCx * this.gridCellSize, this.pointCy * this.gridCellSize],
            fill: '#F7EEAA',
            closed: true,
            draggable: true,
            dragBoundFunc: (pos) => {
                return this.limitDragBound(pos);
            }
        });
        this.layer.add(this.triangle);
    }

    // 初始化按钮拖动事件
    private initDragEvent() {
        this.triangle.off('dragstart touchstart dragend touchend ');
        this.triangle.on('dragstart touchstart', () => {
            this.setStartToEndFlag();
            this.layer.draw();
            this.stage.container().style.cursor = 'pointer';
        });
        this.triangle.on('dragend touchend', () => {
            this.dragMovePointX = Math.round(this.triangle.getAttr('x') / this.gridCellSize) * this.gridCellSize;
            this.dragMovePointY = Math.round(this.triangle.getAttr('y') / this.gridCellSize) * this.gridCellSize;
            this.stage.container().style.cursor = 'default';
            //记录位置
            this.writeIndex(this.allMoveXIndex, this.allMoveYIndex);
        });
        this.triangle.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });

        this.triangle.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    //把移动后的原点组位置记录
    private writeIndex(x: number, y: number) {
        this.dragAXIndex = this.pointAx + x;
        this.dragAYIndex = this.pointAy + y;
        this.dragBXIndex = this.pointBx + x;
        this.dragBYIndex = this.pointBy + y;
        this.dragCXIndex = this.pointCx + x;
        this.dragCYIndex = this.pointCy + y;
    }

    //边界限制的方法
    private limitBound(pos: any) {
        if (pos.x > (26 - this.pointCx) * this.gridCellSize) {
            if (pos.y < -this.pointAy * this.gridCellSize) {
                pos.y = -this.pointAy * this.gridCellSize;
                pos.x = (26 - this.pointCx) * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize) {
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize;
                pos.x = (26 - this.pointCx) * this.gridCellSize;
            } else {
                pos.x = (26 - this.pointCx) * this.gridCellSize;
            }
        } else if (pos.x < -this.pointBx * this.gridCellSize) {
            if (pos.y < -this.pointAy * this.gridCellSize) {
                pos.y = -this.pointAy * this.gridCellSize;
                pos.x = -this.pointBx * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize) {
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize;
                pos.x = -this.pointBx * this.gridCellSize;
            } else {
                pos.x = -this.pointBx * this.gridCellSize;
            }
        } else if (pos.y < -this.pointAy * this.gridCellSize) {
            pos.y = -this.pointAy * this.gridCellSize;
        } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize) {
            pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize - this.pointBy * this.gridCellSize;
        }
    }

    //封装节点按照格子轨迹行走的方法
    private limitDragBound(pos: any) {
        //边界限制
        this.limitBound(pos);

        let pointDragPosX = 0;
        let pointDragPosY = 0;
        const posX = pos.x - this.dragPointStartX;
        const posY = pos.y - this.dragPointStartY;
        const distanceX = Math.round(posX / this.gridCellSize) * this.gridCellSize;
        const distanceY = Math.round(posY / this.gridCellSize) * this.gridCellSize;
        if (distanceX === pointDragPosX && distanceY === pointDragPosY) {
            return {x: distanceX + this.dragPointStartX, y: distanceY + this.dragPointStartY};
        }
        //设置拖动三角形位置
        pointDragPosX = distanceX + this.dragPointStartX;
        pointDragPosY = distanceY + this.dragPointStartY;
        // 设置虚线
        this.setDashLinePoint(distanceX, distanceY);
        //记录下移动的总位置
        this.allMoveXIndex = Math.round(pos.x / this.gridCellSize);
        this.allMoveYIndex = Math.round(pos.y / this.gridCellSize);

        return {x: pointDragPosX, y: pointDragPosY};
    }

    //初始化虚线的痕迹
    private initDashLine() {
        const pointStartA = [this.pointAx * this.gridCellSize, this.pointAy * this.gridCellSize];
        this.config.dashLineStartA.points = pointStartA;
        this.dashLineStartA = new Konva.Line(this.config.dashLineStartA);

        const pointStartB = [this.pointBx * this.gridCellSize, this.pointBy * this.gridCellSize];
        this.config.dashLineStartB.points = pointStartB;
        this.dashLineStartB = new Konva.Line(this.config.dashLineStartB);

        const pointStartC = [this.pointCx * this.gridCellSize, this.pointCy * this.gridCellSize];
        this.config.dashLineStartC.points = pointStartC;
        this.dashLineStartC = new Konva.Line(this.config.dashLineStartC);

        this.layer.add(this.dashLineStartA);
        this.layer.add(this.dashLineStartB);
        this.layer.add(this.dashLineStartC);
    }

    //设置虚线位置
    private setDashLinePoint(distanceX: any, distanceY: any) {
        const tempStartPointsA = [this.triangle.points()[0] + distanceX,
            this.triangle.points()[1] + distanceY];
        this.addPointsToDashLinePoints(this.dashLineStartA, tempStartPointsA);

        const tempStartPointsB = [this.triangle.points()[2] + distanceX,
            this.triangle.points()[3] + distanceY];
        this.addPointsToDashLinePoints(this.dashLineStartB, tempStartPointsB);

        const tempStartPointsC = [this.triangle.points()[4] + distanceX,
            this.triangle.points()[5] + distanceY];
        this.addPointsToDashLinePoints(this.dashLineStartC, tempStartPointsC);
    }

    //给虚线添加移动点位置
    private addPointsToDashLinePoints(dashLine: Konva.Line, points: any) {
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

    //拖动结束后再次拖动触发
    private setStartToEndFlag() {
        //影子三角形标志
        this.signtriangle.setAttr('x', Math.round(this.triangle.x() / this.gridCellSize) * this.gridCellSize);
        this.signtriangle.setAttr('y', Math.round(this.triangle.y() / this.gridCellSize) * this.gridCellSize);
        //虚线改变
        this.dashLineStartA.setAttr('points', [this.dragMovePointX + this.pointAx * this.gridCellSize,
            this.dragMovePointY + this.pointAy * this.gridCellSize]);
        this.dashLineStartB.setAttr('points', [this.dragMovePointX + this.pointBx * this.gridCellSize,
            this.dragMovePointY + this.pointBy * this.gridCellSize]);
        this.dashLineStartC.setAttr('points', [this.dragMovePointX + this.pointCx * this.gridCellSize,
            this.dragMovePointY + this.pointCy * this.gridCellSize]);
    }

    //重置方法封装
    private resetLayer() {
        this.layer.removeChildren();
        //参数置零
        //初始位置
        this.pointAx = 11;
        this.pointAy = 5;
        this.pointBx = 10;
        this.pointBy = 8;
        this.pointCx = 13;
        this.pointCy = 7;

        this.dragAXIndex = 0;
        this.dragAYIndex = 0;
        this.dragBXIndex = 0;
        this.dragBYIndex = 0;
        this.dragCXIndex = 0;
        this.dragCYIndex = 0;

        this.dragPointStartX = 0;
        this.dragPointStartY = 0;
        this.dragMovePointX = 0;
        this.dragMovePointY = 0;
        this.dragMovePointXIndex = 0;
        this.dragMovePointYIndex = 0;


        this.initTriangle();
        this.initDashLine();
        this.initDragEvent();
        this.setStartToEndFlag();
    }

    //页面缩放事件封装
    private resizeLayer() {
        this.layer.removeChildren();
        //虚线记录移动位置清零
        this.dragMovePointX = 0;
        this.dragMovePointY = 0;
        if (this.dragAXIndex === 0 && this.dragAYIndex === 0) {
            this.pointAx = 11;
            this.pointAy = 5;
            this.pointBx = 10;
            this.pointBy = 8;
            this.pointCx = 13;
            this.pointCy = 7;
        } else {
            this.pointAx = this.dragAXIndex;
            this.pointAy = this.dragAYIndex;
            this.pointBx = this.dragBXIndex;
            this.pointBy = this.dragBYIndex;
            this.pointCx = this.dragCXIndex;
            this.pointCy = this.dragCYIndex;
        }

        this.initTriangle();
        this.setDashLinePoint(0, 0);
        this.initDashLine();
        this.initDragEvent();
        this.setStartToEndFlag();
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
        this.resetLayer();
        this.layer.draw();
    }

}

