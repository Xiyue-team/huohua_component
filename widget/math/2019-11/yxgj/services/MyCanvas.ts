import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {Vector2d} from 'konva';
import * as desk from '../sub_static/desk.png';
import * as coin from '../sub_static/coin.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    deskImage: Konva.Image;

    // 静止的硬币
    originCoinImage: Konva.Image;
    // 静止的硬币中心点
    originCoinCenterPoint: Konva.Circle;
    // 静止硬币中心点与底部的垂线
    originCoinVerticalLine: Konva.Line;

    // 拖动的硬币
    dragMoveCoinImage: Konva.Image;
    // 拖动的硬币中心点
    dragMoveCoinCenterPoint: Konva.Circle;
    // 拖动硬币中心点与底部的垂线
    dragMoveCoinVerticalLine: Konva.Line;
    dragMoveGroup: Konva.Group;

    dashLine: Konva.Line;
    points: number[];
    lastDistance = 0;

    scale = 1;

    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();
    }

    async init() {
        await this.initBgCanvas();

        await this.initDragMoveImage();

        this.initDashLine();

        await this.initDragEvent();

        this.resize();
    }

    async initBgCanvas() {
        await this.initBackground();
        await this.initOriginImage();
    }

    // 初始化背景
    async initBackground() {
        // 背景桌子图片
        this.deskImage = await this.loadImage((desk as any), this.config.deskImage as any);
        this.staticLayer.add(this.deskImage);
    }

    // 初始化静态硬币图片
    async initOriginImage() {
        // 静态硬币图片
        this.originCoinImage = await this.loadImage((coin as any), this.config.originCoinImage as any);
        this.staticLayer.add(this.originCoinImage);

        // 圆心
        this.originCoinCenterPoint = new Konva.Circle(this.config.originCoinCenterPoint);
        this.staticLayer.add(this.originCoinCenterPoint);

        // 垂线
        this.originCoinVerticalLine = new Konva.Line(this.config.originCoinVertical);
        this.staticLayer.add(this.originCoinVerticalLine);
    }

    async initDragMoveImage() {
        // 拖动硬币图片
        this.dragMoveCoinImage = await this.loadImage((coin as any), this.config.dragMoveCoinImage as any);

        this.animationLayer.add(this.dragMoveCoinImage);

        // 圆心
        this.dragMoveCoinCenterPoint = new Konva.Circle(this.config.dragMoveCoinCenterPoint);
        this.animationLayer.add(this.dragMoveCoinCenterPoint);

        // 垂线
        this.dragMoveCoinVerticalLine = new Konva.Line(this.config.dragMoveCoinVertical);
        this.animationLayer.add(this.dragMoveCoinVerticalLine);

        this.dragMoveGroup = new Konva.Group();
        this.dragMoveGroup.add(this.dragMoveCoinImage, this.dragMoveCoinCenterPoint, this.dragMoveCoinVerticalLine);
        this.dragMoveGroup.draggable(true);
        this.dragMoveGroup.dragBoundFunc((pos: Vector2d) => {
            return this.limitDragBound(pos);
        });
        this.animationLayer.add(this.dragMoveGroup);
    }

    // 画两圆心的连接线
    initDashLine() {
        this.points = [this.originCoinCenterPoint.x(), this.originCoinCenterPoint.y(),
            this.dragMoveCoinCenterPoint.x(), this.dragMoveCoinCenterPoint.y()];
        this.dashLine = new Konva.Line(this.config.dashLine as any);
        this.dashLine.points(this.points);
        this.animationLayer.add(this.dashLine);
        this.dashLine.visible(false);
    }

    // 绑定事件
    initDragEvent() {
        // 拖动圆B
        this.dragMoveGroup.on('dragmove touchmove', (e: any) => {
            this.dragCoinEvent();
        });

        this.dragMoveGroup.on('mouseenter', () => {
            this.stage.container().style.cursor = 'pointer';
        });

        this.dragMoveGroup.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    // 拖动圆，滚动事件
    dragCoinEvent() {
        this.rotateDragCoinImage();

        // 画两个硬币中心点的连接虚线
        this.setDashLine();
    }

    // 限制硬币拖动范围
    // 使用konva的boundFunc来做限制
    private limitDragBound(pos: Vector2d) {
        let tempX = pos.x;
        const minX = this.deskImage.x() * this.scale;
        const maxX = (this.deskImage.width() + this.deskImage.x() - this.dragMoveCoinImage.width()) * this.scale;
        if (tempX < minX) {
            tempX = minX;
        } else if (tempX > maxX) {
            tempX = maxX;
        }

        return {x: tempX, y: this.dragMoveGroup.y() * this.scale} as Vector2d;
    }

    // 拖动旋转硬币
    private rotateDragCoinImage() {
        const distance = this.dragMoveGroup.x() - this.originCoinImage.x();
        const distanceMargin = distance - this.lastDistance;

        const rotateRadius = this.dragMoveCoinImage.width() / 2;
        this.dragMoveCoinImage.rotate(distanceMargin / rotateRadius / 2 / Math.PI * 360);
        this.lastDistance = distance;
    }

    private setDashLine() {
        // 设置线坐标
        this.dashLine.visible(this.dragMoveGroup.x() > 1);
        this.dashLine.points()[2] = this.dragMoveGroup.x() + this.dragMoveCoinImage.width() / 2;
    }

    // 重置
    async reset() {
        this.animationLayer.removeChildren();

        this.config = new MyConfig();
        await this.initDragMoveImage();
        this.initDashLine();
        await this.initDragEvent();

        this.animationLayer.draw();
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(960 * this.scale);
        this.stage.height(358 * this.scale);

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        const left = (width - this.stage.width()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.bottom = '0';
        (container as any).style.left = left;

        const bottom = document.getElementById('bottom');
        (bottom as any).style.position = 'absolute';
        (bottom as any).style.bottom = '0';
        (bottom as any).style.height = this.stage.height() * 120 / 358 + 'px';

        this.stage.draw();
    }
}

