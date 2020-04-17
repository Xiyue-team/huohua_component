import {MyConfig} from './MyConfig';
import Konva from 'konva';

export class MyCanvas {
    config: MyConfig;

    stage: Konva.Stage;
    bgLayer: Konva.Layer;
    layer: Konva.Layer;

    //初始的圆组
    innerPoint: Konva.Circle;
    outerPoint: Konva.Circle;
    beginGroup: Konva.Group;

    //拖动后显示的初始位置
    startPoint: Konva.Circle;

    //拖动点的虚线痕迹
    dashLineStart: Konva.Line;

    //按照宽度计算配置网格数
    gridColumnNum = 26;
    gridRowNum = 0;
    gridCellSize = 0;
    //默认起始点位置
    defaultPointXNum = 14;
    defaultPointYNum = 7;

    //中间参数
    dragMovePointX = 0;
    dragMovePointY = 0;
    dragPointStartX = 0;
    dragPointStartY = 0;
    //页面缩放位置记录
    dragRestXIndex = 0;
    dragRestYIndex = 0;

    constructor() {
        this.config = new MyConfig();
        this.init();
    }

    private init() {
        this.initCanvas();
        this.initPointGroup();
        this.initGroup();
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

    //设置单位网格单元宽高
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

    //定义拖动圆形的组
    private initPointGroup() {
        this.startPoint = new Konva.Circle({
            x: this.defaultPointXNum * this.gridCellSize,
            y: this.defaultPointYNum * this.gridCellSize,
            radius: 7 * window.innerWidth / 1200,
            fill: '#C0E4DC',
            opacity: 1,
            visible: false
        });
        this.layer.add(this.startPoint);
    }

    //初始化圆形的组
    private initGroup() {

        this.innerPoint = new Konva.Circle({
            x: this.defaultPointXNum * this.gridCellSize,
            y: this.defaultPointYNum * this.gridCellSize,
            radius: 5 * window.innerWidth / 1200,
            fill: '#F8EFAB',
            visible: true
        });
        this.outerPoint = new Konva.Circle({
            x: this.defaultPointXNum * this.gridCellSize,
            y: this.defaultPointYNum * this.gridCellSize,
            radius: 15 * window.innerWidth / 1200 ,
            fill: '#FFFFFF',
            opacity: 0.36,
            stroke: '#10000000',
            strokeWidth: 1,
            shadowColor: '#000000',
            shadowOpacity: 0.1,
            shadowOffsetY: 1,
            shadowBlur: 4,
            visible: true
        });

        this.beginGroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                this.startPoint.setAttr('visible', true);
                return this.limitDragBound(pos);
            }
        });
        this.beginGroup.add(this.outerPoint, this.innerPoint);
        this.layer.add(this.beginGroup);
    }

    //边界限制方法
    private limitBound(pos: any) {
        if (pos.x > (26 - this.defaultPointXNum) * this.gridCellSize) {
            if (pos.y < -this.defaultPointYNum * this.gridCellSize) {
                pos.x = (26 - this.defaultPointXNum) * this.gridCellSize;
                pos.y = -this.defaultPointYNum * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
                - (this.defaultPointYNum + 1) * this.gridCellSize) {
                pos.x = (26 - this.defaultPointXNum) * this.gridCellSize;
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize -
                    (this.defaultPointYNum + 1) * this.gridCellSize;
            } else {
                pos.x = (26 - this.defaultPointXNum) * this.gridCellSize;
            }
        } else if (pos.x < -this.defaultPointXNum * this.gridCellSize) {
            if (pos.y < -this.defaultPointYNum * this.gridCellSize) {
                pos.x = -this.defaultPointXNum * this.gridCellSize;
                pos.y = -this.defaultPointYNum * this.gridCellSize;
            } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
                - (this.defaultPointYNum + 1) * this.gridCellSize) {
                pos.x = -this.defaultPointXNum * this.gridCellSize;
                pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
                    - (this.defaultPointYNum + 1) * this.gridCellSize;
            } else {
                pos.x = -this.defaultPointXNum * this.gridCellSize;
            }
        } else if (pos.y < -this.defaultPointYNum * this.gridCellSize) {
            pos.y = -this.defaultPointYNum * this.gridCellSize;
        } else if (pos.y > Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
            - (this.defaultPointYNum + 1) * this.gridCellSize) {
            pos.y = Math.round(window.innerHeight / this.gridCellSize) * this.gridCellSize
                - (this.defaultPointYNum + 1) * this.gridCellSize;
        }
    }

    //封装节点按照格子轨迹行走的方法
    private limitDragBound(pos: any) {
        let pointDragPosX = 0;
        let pointDragPosY = 0;
        //边界限制
        this.limitBound(pos);
        const posX = pos.x - this.dragPointStartX;
        const posY = pos.y - this.dragPointStartY;
        const distanceX = Math.round(posX / this.gridCellSize) * this.gridCellSize;
        const distanceY = Math.round(posY / this.gridCellSize) * this.gridCellSize;
        if (distanceX === pointDragPosX && distanceY === pointDragPosY) {
            return {x: distanceX + this.dragPointStartX, y: distanceY + this.dragPointStartY};
        }
        //设置拖动线条位置
        pointDragPosX = distanceX + this.dragPointStartX;
        pointDragPosY = distanceY + this.dragPointStartY;

        // 设置虚线
        this.setDashLinePoint(distanceX, distanceY);

        return {x: pointDragPosX, y: pointDragPosY};
    }

    //初始化拖动线条的痕迹
    private initDashLine() {
        const pointStart = [Math.round(this.innerPoint.x() / this.gridCellSize) * this.gridCellSize,
            Math.round(this.innerPoint.y() / this.gridCellSize) * this.gridCellSize];
        this.config.dashLineStart.points = pointStart;
        this.dashLineStart = new Konva.Line(this.config.dashLineStart);
        this.layer.add(this.dashLineStart);
        this.layer.draw();
    }

    // 初始化按钮拖动事件
    private initDragEvent() {
        this.beginGroup.off('dragstart touchstart dragend touchend ');
        this.beginGroup.on('dragstart touchstart', () => {
            this.setStartToEndFlag(0, 0);
            this.stage.container().style.cursor = 'pointer';
        });
        this.beginGroup.on('dragend touchend', () => {
            this.dragMovePointX = Math.round(this.beginGroup.getAttr('x') / this.gridCellSize) * this.gridCellSize;
            this.dragMovePointY = Math.round(this.beginGroup.getAttr('y') / this.gridCellSize) * this.gridCellSize;
            this.stage.container().style.cursor = 'default';
            this.writeIndex(this.dragMovePointX, this.dragMovePointY);
        });
        this.beginGroup.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });

        this.beginGroup.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    //把移动后的原点组位置记录
    private writeIndex(x: number, y: number) {
        this.dragRestXIndex = this.defaultPointXNum + Math.round(x / this.gridCellSize);
        this.dragRestYIndex = this.defaultPointYNum + Math.round(y / this.gridCellSize);
    }

    //移动后的节点变化
    private setStartToEndFlag(x: number, y: number) {
        x = Math.round((this.innerPoint.x() + this.beginGroup.x()) / this.gridCellSize) * this.gridCellSize;
        y = Math.round((this.innerPoint.y() + this.beginGroup.y()) / this.gridCellSize) * this.gridCellSize;
        //开始的圆形标志
        this.startPoint.x(x);
        this.startPoint.y(y);
        this.startPoint.draw();
        //虚线改变
        this.dashLineStart.points([x, y]);
        this.dashLineStart.draw();
        this.layer.draw();

    }

    //设置虚线位置
    private setDashLinePoint(distanceX: any, distanceY: any) {
        const tempStartPoints = [Math.round(this.innerPoint.x() / this.gridCellSize) * this.gridCellSize + distanceX,
            Math.round(this.innerPoint.y() / this.gridCellSize) * this.gridCellSize + distanceY];
        this.addPointsToDashLinePoints(this.dashLineStart, tempStartPoints);
    }

    //给虚线添加移动点位置
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

    //需要重置的多个方法封装
    private resetLayer() {
        this.dragMovePointX = 0;
        this.dragMovePointY = 0;
        this.dragPointStartX = 0;
        this.dragPointStartY = 0;
        this.dragRestXIndex = 0;
        this.dragRestYIndex = 0;
        this.defaultPointXNum = 14;
        this.defaultPointYNum = 7;

        this.initPointGroup();
        this.initGroup();
        this.initDashLine();
        this.initDragEvent();
    }

    //页面缩放事件封装
    private resizeLayer() {
        this.layer.removeChildren();
        if (this.dragRestXIndex !== 0 || this.dragRestYIndex !== 0) {
            this.defaultPointXNum = this.dragRestXIndex;
            this.defaultPointYNum = this.dragRestYIndex;
            this.startPoint.setAttr('x', this.dragRestXIndex * this.gridCellSize);
            this.startPoint.setAttr('y', this.dragRestYIndex * this.gridCellSize);
            this.innerPoint.setAttr('x', this.dragRestXIndex * this.gridCellSize);
            this.innerPoint.setAttr('y', this.dragRestYIndex * this.gridCellSize);
        } else {
            this.defaultPointXNum = 14;
            this.defaultPointYNum = 7;
        }
        this.initPointGroup();
        this.initGroup();
        this.beginGroup.add(this.outerPoint, this.innerPoint);
        this.layer.add(this.beginGroup);
        this.initDashLine();
        this.initDragEvent();
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
        this.layer.remove();
        this.layer.removeChildren();
        this.resetLayer();
        this.stage.add(this.layer);
        this.stage.draw();
    }

}

