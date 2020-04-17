import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {Vector2d} from 'konva';
import * as desk from '../sub_static/desk.png';
import * as text from '../sub_static/text.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    dashLineLayer: Konva.Layer;

    deskImage: Konva.Image;

    // 静止的文本
    originTextImage: Konva.Image;
    // 静止的文本中心点
    originTextCenterPoint: Konva.Circle;
    // 静止文本中心点与底部的垂线
    originTextVerticalLine: Konva.Line;

    // 拖动的文本
    dragMoveTextImage: Konva.Image;
    // 拖动的文本中心点
    dragMoveTextCenterPoint: Konva.Circle;
    // 拖动文本中心点与底部的垂线
    dragMoveTextVerticalLine: Konva.Line;
    dragMoveGroup: Konva.Group;

    dashLine: Konva.Line;
    lastDistance = 0;

    scale = 1;

    constructor() {
        super('container');
        this.initDashLineLayer();

        this.config = new MyConfig();
        this.init();
    }

    initDashLineLayer() {
        this.dashLineLayer = new Konva.Layer();
        this.stage.add(this.dashLineLayer);
    }

    async init() {
        await this.initBgCanvas();

        await this.initDragMoveImage();

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

    // 初始化静态文本图片
    async initOriginImage() {
        // 静态文本图片
        this.originTextImage = await this.loadImage((text as any), this.config.originTextImage as any);
        this.staticLayer.add(this.originTextImage);

        // 圆心
        this.originTextCenterPoint = new Konva.Circle(this.config.originTextCenterPoint);
        this.staticLayer.add(this.originTextCenterPoint);

        // 垂线
        this.originTextVerticalLine = new Konva.Line(this.config.originTextVertical);
        this.staticLayer.add(this.originTextVerticalLine);
    }

    async initDragMoveImage() {
        // 拖动文本图片
        this.dragMoveTextImage = await this.loadImage((text as any), this.config.dragMoveTextImage as any);
        this.animationLayer.add(this.dragMoveTextImage);

        // 圆心
        this.dragMoveTextCenterPoint = new Konva.Circle(this.config.dragMoveTextCenterPoint);
        this.animationLayer.add(this.dragMoveTextCenterPoint);

        // 垂线
        this.dragMoveTextVerticalLine = new Konva.Line(this.config.dragMoveTextVertical);
        this.animationLayer.add(this.dragMoveTextVerticalLine);

        this.dragMoveGroup = new Konva.Group();
        this.dragMoveGroup.add(this.dragMoveTextImage, this.dragMoveTextCenterPoint, this.dragMoveTextVerticalLine);
        this.dragMoveGroup.draggable(true);
        this.dragMoveGroup.dragBoundFunc((pos: Vector2d) => {
            return this.limitDragBound(pos);
        });
        this.animationLayer.add(this.dragMoveGroup);
    }

    // 绑定事件
    initDragEvent() {
        // 拖动圆B
        this.dragMoveGroup.on('dragmove touchmove', (e: any) => {
            this.dragTextEvent();
        });

        this.dragMoveGroup.on('mouseenter', () => {
            this.stage.container().style.cursor = 'pointer';
        });

        this.dragMoveGroup.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    // 拖动圆，滚动事件
    dragTextEvent() {
        this.rotateDragTextImage();

        // 画两个文本中心点的连接虚线
        this.setArcDashLine();
    }

    // 限制文本拖动范围
    // 使用konva的boundFunc来做限制
    private limitDragBound(pos: Vector2d) {
        let tempX = pos.x;
        const minX = this.deskImage.x() * this.scale;
        const maxX = (this.deskImage.width() + this.deskImage.x() - this.dragMoveTextImage.width()) * this.scale;
        if (tempX < minX) {
            tempX = minX;
        } else if (tempX > maxX) {
            tempX = maxX;
        }

        return {x: tempX, y: this.dragMoveGroup.y() * this.scale} as Vector2d;
    }

    // 拖动旋转文本
    private rotateDragTextImage() {
        const distance = this.dragMoveGroup.x() - this.originTextImage.x();
        const rotation = distance / 8 / this.config.radius * 360;
        this.dragMoveTextImage.rotation(rotation);

        const tempRotation = rotation % 90 + 45;
        const rotateRadius = Math.sqrt(2) * this.config.radius;
        const verticalHeight = Math.sin(tempRotation / 360 * 2 * Math.PI) * rotateRadius;

        // 设置文本图片的位置
        const yMargin = this.config.radius - verticalHeight;
        this.dragMoveGroup.y(yMargin);

        // 设置垂线的位置
        const verticalLineStartY = this.dragMoveTextVerticalLine.points()[1];
        this.dragMoveTextVerticalLine.points()[3] = verticalLineStartY + this.config.radius - yMargin;
    }

    private setArcDashLine() {
        this.dashLineLayer.removeChildren();



        let rotation = this.dragMoveTextImage.rotation();
        if (rotation < 1) {
            rotation = 1;
        }
        const tempRotation = rotation % 90;
        const rotateRadius = Math.sqrt(2) * this.config.radius;
        const rotationTimes = Math.floor(rotation / 90);

        for (let index = 0; index < rotationTimes; index++) {
            const fullArc = this.createArcShape(this.config.dragMoveTextImage.width * (index + 1), this.deskImage.y(),
                rotateRadius, 90);
            this.dashLineLayer.add(fullArc);
        }

        // 不完整的弧度
        const arc = this.createArcShape(this.config.dragMoveTextImage.width * (rotationTimes + 1), this.deskImage.y(),
            rotateRadius, tempRotation);
        this.dashLineLayer.add(arc);

        this.dashLineLayer.draw();
    }

    //使用canvas的原生arc方法创建弧线，避免konva弧线画虚线显示不正确
    private createArcShape(x: number, y: number, radius: number, rotation: number) {
        // const arc = new Konva.Shape({
        //     x: x,
        //     y: y,
        //     stroke: '#ea0000',
        //     strokeWidth: 2,
        //     fill: '',
        //     dash: [10, 10],
        //     sceneFunc: (context, shape) => {
        //         context.beginPath();
        //         context.arc(0, 0, radius, -135 / 360 * 2 * Math.PI, (-135 + rotation) / 360 * 2 * Math.PI);
        //         context.strokeShape(shape);
        //     }
        // });

        const arc = new Konva.Arc({
            x: x,
            y: y,
            innerRadius: radius,
            outerRadius: radius,
            strokeWidth: 2,
            stroke: '#ea0000',
            fill: '',
            dash: [10, 15],
            angle: rotation,
            rotation: -135
        });

        return arc;
    }

    // 重置
    async reset() {
        //清除弧度layer
        this.dashLineLayer.removeChildren();
        this.dashLineLayer.draw();

        //清除动态layer
        this.animationLayer.removeChildren();

        this.config = new MyConfig();
        await this.initDragMoveImage();
        await this.initDragEvent();

        this.animationLayer.draw();
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(960 * this.scale);
        this.stage.height(458 * this.scale);

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

