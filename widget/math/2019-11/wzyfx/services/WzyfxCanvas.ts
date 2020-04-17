import * as Konva from 'konva';
import {MyConfig} from './MyConfig';
import {Stage, Vector2d} from 'konva';
import * as backImage from '../sub_static/backGroundImage1.png';
import * as zhiNanZhen from '../sub_static/zhinanzhen.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';


export class WzyfxCanvas extends SimpleKonvaTemplate {
    lang = window.env.browserInfo.lang;
    [x: string]: any;

    stage: Stage;

    config: MyConfig;
    layer: Konva.Layer;

    // 背景图
    backGroundImage: Konva.Image;
    // 指南针图
    zhiNanZhen: Konva.Image;
    // X轴线上半部分
    xLine: Konva.Line;
    // Y轴线上半部分
    yLine: Konva.Line;
    // X,Y轴下半部分
    xyLine: Konva.Line;
    // 可拉伸线段
    lsLine: Konva.Line;
    // 坐标轴上的圆
    axisCircle: Konva.Circle;
    // 轴外可移动圆
    moveCircle: Konva.Circle;
    // 轴与斜线之间的扇形角度
    wedge: Konva.Wedge;
    // 方向与度数文字
    text: Konva.Text;
    // 标题
    titleText: Konva.Text;
    // 北
    bei: Konva.Text;

    indexMoveCircleX =  149 / 240 ;
    indexMoveCircleY =  83 / 675 ;
    indexAxisCircleX = 1 / 2 ;
    indexAxisCircleY = 1 / 2 ;

    scale = window.innerWidth / window.innerHeight > 16 / 9
        ? window.innerHeight / 675
        : window.innerWidth / 1200;

    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();

    }

    private async init() {
        await this.initImage();
        this.initWedge();
        this.initXLine();
        this.initYLine();
        this.initXYLine();
        this.initLSLine();
        this.initAxisCircle();
        this.initMoveCircle();
        this.touchHands();
        this.initText();

        this.initResiazeImg();

        this.stage.draw();
    }

     private async initImage() {
         this.layer = new Konva.Layer();
         this.stage.add(this.layer);

        // 加载背景图
        this.backGroundImage = await this.loadImage((backImage as any), this.config.backG as any);
        this.layer.add(this.backGroundImage);

        // 指南针图片
         this.zhiNanZhen = await this.loadImage((zhiNanZhen as any), this.config.zhiNanZhen as any);
         this.layer.add(this.zhiNanZhen);
    }

    // 画坐标轴上的圆
    private initAxisCircle() {
        this.axisCircle = new Konva.Circle({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: 11,
            fill: '#FFFFFF',
            stroke: '#FFFFFF',
            draggable: true,
            dragBoundFunc: (pos) => {
                if (pos.x > window.innerWidth) {
                    pos.x = this.axisCircle.x();
                }
                if (pos.x < 0) {
                    pos.x = this.axisCircle.x();
                }
                if (pos.y > window.innerHeight) {
                    pos.y = this.axisCircle.y();
                }
                if (pos.y < 0) {
                    pos.y = this.axisCircle.y();
                }

                //移动的位置
                this.indexAxisCircleX = this.axisCircle.x() / window.innerWidth;
                this.indexAxisCircleY = this.axisCircle.y() / window.innerHeight;

                // 改变Y轴上部分位置
                this.yLine.points([pos.x, pos.y, window.innerWidth - 5, pos.y ]);

                // 改变X轴右部分位置
                this.xLine.points([pos.x, pos.y, pos.x  , 5 ]);

                // 改变X,Y轴下部分位置
                this.xyLine.points([0,  pos.y, pos.x,
                    pos.y, pos.x, window.innerHeight]);

                // 改变斜线的位置
                this.lsLine.points([pos.x, pos.y, this.moveCircle.x(), this.moveCircle.y()]);

                // 改变扇形角度和文字
                if (pos.x < this.moveCircle.x() && pos.y > this.moveCircle.y() ) {
                    this.text.text(this.lang.bpd + (Math.atan((this.moveCircle.x() - pos.x) /
                        (pos.y - this.moveCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.text.x(this.moveCircle.x() - this.text.width() - 20 );

                    this.wedge.x(pos.x);
                    this.wedge.y(pos.y);
                    this.wedge.rotation(-90);
                    this.wedge.angle(Math.atan((this.moveCircle.x() - pos.x) / (pos.y - this.moveCircle.y())) * (180 / Math.PI));

                } else if (pos.x < this.moveCircle.x() && pos.y < this.moveCircle.y()) {
                    this.text.text(this.lang.npd + (Math.atan((pos.x - this.moveCircle.x()) /
                        (pos.y - this.moveCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.text.x(this.moveCircle.x() - this.text.width() - 20 );

                    this.wedge.x(pos.x);
                    this.wedge.y(pos.y);
                    this.wedge.rotation(90 - Math.atan((pos.x - this.moveCircle.x()) / (pos.y - this.moveCircle.y())) * (180 / Math.PI) );
                    this.wedge.angle(Math.atan((pos.x - this.moveCircle.x()) / (pos.y - this.moveCircle.y())) * (180 / Math.PI) );

                } else if (pos.x > this.moveCircle.x() && pos.y > this.moveCircle.y()) {
                    this.text.text(this.lang.bpx + (Math.atan((pos.x - this.moveCircle.x()) /
                        (pos.y - this.moveCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.text.x(this.moveCircle.x() + 20 );

                    this.wedge.x(pos.x);
                    this.wedge.y(pos.y);
                    this.wedge.rotation(-90 - Math.atan((pos.x - this.moveCircle.x()) / (pos.y - this.moveCircle.y())) * (180 / Math.PI));
                    this.wedge.angle(Math.atan((this.moveCircle.x() - pos.x) / (this.moveCircle.y() - pos.y)) * (180 / Math.PI));

                } else if (pos.x > this.moveCircle.x() && pos.y < this.moveCircle.y()) {
                    this.text.text(this.lang.npx + (Math.atan((pos.x - this.moveCircle.x()) /
                        (this.moveCircle.y() - pos.y)) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.text.x(this.moveCircle.x() + 20 );

                    this.wedge.x(pos.x);
                    this.wedge.y(pos.y);
                    this.wedge.rotation(90);
                    this.wedge.angle(Math.atan((pos.x - this.moveCircle.x()) / (this.moveCircle.y() - pos.y)) * (180 / Math.PI));
                }

                switch (true) {
                    case (this.moveCircle.x() - this.axisCircle.x()) < window.innerHeight *
                    0.15 && this.moveCircle.x() > this.axisCircle.x():
                        this.wedge.radius(this.moveCircle.x() - this.axisCircle.x());
                        break;
                    case (this.axisCircle.x() - this.moveCircle.x()) < window.innerHeight *
                    0.15 && this.axisCircle.x() > this.moveCircle.x():
                        this.wedge.radius(this.axisCircle.x() - this.moveCircle.x());
                        break;
                    case (this.moveCircle.x() - this.axisCircle.x()) > window.innerHeight *
                    0.15 && this.moveCircle.x() > this.axisCircle.x():
                    case (this.axisCircle.x() - this.moveCircle.x()) > window.innerHeight *
                    0.15 && this.axisCircle.x() > this.moveCircle.x():
                        this.wedge.radius(window.innerHeight * 0.15);
                        break;
                }

                return this.axisDrag(pos);
            }
        });

        this.layer.add(this.axisCircle);
    }

    axisDrag(pos: Vector2d) {
        let axisX = pos.x;
        let axisY = pos.y;
        if (pos.x >= window.innerWidth && pos.y <= window.innerHeight) {
            axisX = this.axisCircle.x();
            axisY = this.axisCircle.y();
        }

        if (pos.x >= 0 && pos.y <= 0) {
            axisX = this.axisCircle.x();
            axisY = this.axisCircle.y();
        }

        if (pos.x <= 0 && pos.y <= window.innerHeight) {
            axisX = this.axisCircle.x();
            axisY = this.axisCircle.y();
        }

        if (pos.x <= 0 && pos.y >= window.innerHeight) {
            axisX = this.axisCircle.x();
            axisY = this.axisCircle.y();
        }

        if (pos.x >= 0 && pos.y >= window.innerHeight) {
            axisX = this.axisCircle.x();
            axisY = this.axisCircle.y();
        }
        return {x: axisX, y: axisY};
    }

    // 触摸小手
    private stopevent(element: any) {
        element.on(' touchstart  ', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        element.on(' touchend', () => {
            this.stage.container().style.cursor = 'default';
        });
        element.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        element.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
    }

    private touchHands() {
        this.axisCircle.off(' touchstart  touchend');
        this.moveCircle.off(' touchstart  touchend');
        this.stopevent(this.axisCircle);
        this.stopevent(this.moveCircle);
    }

    // 画轴外可移动圆
    private initMoveCircle() {
        this.moveCircle = new Konva.Circle({
            x: window.innerWidth * 149 / 240,
            y: window.innerHeight * 83 / 675,
            radius: 12,
            fill: '#FFFFFF',
            stroke: '#e2e2e2',
            strokeWidth: 8,
            draggable: true,
            opacity: 0.9,
            dragBoundFunc: (pos) => {

                if (pos.x > window.innerWidth) {
                    pos.x = this.moveCircle.x();
                }
                if (pos.x < 0) {
                    pos.x = this.moveCircle.x();
                }
                if (pos.y > window.innerHeight) {
                    pos.y = this.moveCircle.y();
                }
                if (pos.y < 0) {
                    pos.y = this.moveCircle.y();
                }

                this.indexMoveCircleX = this.moveCircle.x() / window.innerWidth;
                this.indexMoveCircleY = this.moveCircle.y() / window.innerHeight;

                // 改变斜线的位置
                this.lsLine.points([this.axisCircle.x(), this.axisCircle.y(), pos.x, pos.y]);

                // 改变度数与文字跟随
                if (pos.x > this.axisCircle.x() && pos.y < this.axisCircle.y()) {
                    this.text.x(pos.x - this.text.width() - window.innerWidth * 0.03 );
                    this.text.y(- window.innerHeight * 8 / 675  + pos.y );
                    this.text.text(this.lang.bpd + (Math.atan((pos.x - this.axisCircle.x()) /
                        (this.axisCircle.y() - pos.y)) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.wedge.rotation(-90);
                    this.wedge.angle(Math.atan((pos.x - this.axisCircle.x()) / (this.axisCircle.y() - pos.y)) * (180 / Math.PI));

                } else if (pos.x > this.axisCircle.x() && pos.y > this.axisCircle.y()) {
                    this.text.x(pos.x - this.text.width() - window.innerWidth * 0.03);
                    this.text.y(- window.innerHeight * 8 / 675  + pos.y );
                    this.text.text(this.lang.npd + (Math.atan((pos.x - this.axisCircle.x()) /
                        (pos.y - this.axisCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.wedge.rotation(90 - Math.atan((pos.x - this.axisCircle.x()) / (pos.y - this.axisCircle.y())) * (180 / Math.PI) );
                    this.wedge.angle(Math.atan((pos.x - this.axisCircle.x()) / (pos.y - this.axisCircle.y())) * (180 / Math.PI) );

                } else if (pos.x < this.axisCircle.x() && pos.y < this.axisCircle.y()) {
                    this.text.x(window.innerWidth * 0.03 + pos.x);
                    this.text.y(-window.innerHeight * 8 / 675 + pos.y);
                    this.text.text(this.lang.bpx + (Math.atan((pos.x - this.axisCircle.x()) /
                        (pos.y - this.axisCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.wedge.rotation(-90 - Math.atan((pos.x - this.axisCircle.x()) / (pos.y - this.axisCircle.y())) * (180 / Math.PI));
                    this.wedge.angle(Math.atan((this.axisCircle.x() - pos.x) / (this.axisCircle.y() - pos.y)) * (180 / Math.PI));

                } else if (pos.x < this.axisCircle.x() && pos.y > this.axisCircle.y()) {
                    this.text.x(window.innerWidth * 0.03 + pos.x);
                    this.text.y(-window.innerHeight * 8 / 675 + pos.y);
                    this.text.text(this.lang.npx + (Math.atan((this.axisCircle.x() - pos.x) /
                        (pos.y - this.axisCircle.y())) * (180 / Math.PI) ).toFixed(0) + '°');

                    this.wedge.rotation(90);
                    this.wedge.angle(Math.atan((this.axisCircle.x() - pos.x) / (pos.y - this.axisCircle.y())) * (180 / Math.PI));
                }

                switch (true) {
                    case (this.moveCircle.x() - this.axisCircle.x()) < window.innerHeight *
                    0.15 && this.moveCircle.x() > this.axisCircle.x():
                        this.wedge.radius(this.moveCircle.x() - this.axisCircle.x());
                        break;
                    case (this.axisCircle.x() - this.moveCircle.x()) < window.innerHeight *
                    0.15 && this.axisCircle.x() > this.moveCircle.x():
                        this.wedge.radius(this.axisCircle.x() - this.moveCircle.x());
                        break;
                    case (this.moveCircle.x() - this.axisCircle.x()) > window.innerHeight *
                    0.15 && this.moveCircle.x() > this.axisCircle.x():
                    case (this.axisCircle.x() - this.moveCircle.x()) > window.innerHeight *
                    0.15 && this.axisCircle.x() > this.moveCircle.x():
                        this.wedge.radius(window.innerHeight * 0.15);
                        break;                
                }
            
                return this.moveDrag(pos);
            }
        });
        this.layer.add(this.moveCircle);
    }

    moveDrag(pos: Vector2d) {
        let moveX = pos.x;
        let moveY = pos.y;
        if (pos.x >= window.innerWidth && pos.y <= window.innerHeight) {
            moveX = this.moveCircle.x();
            moveY = pos.y;
        }

        if (pos.x >= 0 && pos.y <= 0) {
            moveX = pos.x;
            moveY = this.moveCircle.y();
        }

        if (pos.x <= 0 && pos.y <= window.innerHeight) {
            moveX = this.moveCircle.x();
            moveY = pos.y;
        }
        return {x: moveX, y: moveY};
    }

    // 画X轴右部分线
    private initXLine() {
        this.xLine = new Konva.Arrow({
            points: [window.innerWidth / 2, window.innerHeight / 2, window.innerWidth - 5, window.innerHeight / 2],
            stroke: '#FFFFFF',
            strokeWidth: 6,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowColor: '#201f1f',
            shadowOpacity: 0.2
        });
        this.layer.add(this.xLine);
    }

    // 画Y轴上部分线
    private initYLine() {
        this.yLine = new Konva.Arrow({
            points: [window.innerWidth  / 2, window.innerHeight / 2, window.innerWidth  / 2, 5],
            stroke: '#FFFFFF',
            strokeWidth: 6,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowColor: '#201f1f',
            shadowOpacity: 0.2
        });
        this.layer.add(this.yLine);
    }

    // 画X,Y轴下半部分
    private initXYLine() {
        this.xyLine = new Konva.Line({
           points: [0, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight],
           stroke: '#FFFFFF',
           strokeWidth: 6,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowColor: '#201f1f',
            shadowOpacity: 0.2
        });
        this.layer.add(this.xyLine);
    }

    // 画可拉伸线段
    private initLSLine() {
        this.lsLine = new  Konva.Line({
            points: [window.innerWidth  / 2, window.innerHeight  / 2, window.innerWidth * 149 / 240, window.innerHeight * 83 / 675],
            stroke: '#FFFFFF',
            strokeWidth: 4,
            lineJoin: 'round',
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowColor: '#201f1f',
            shadowOpacity: 0.2
        });
        this.layer.add(this.lsLine);
    }

    // 画扇形角度
    private initWedge() {
        this.wedge = new Konva.Wedge({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: window.innerHeight * 0.15,
            angle: Math.atan((window.innerWidth * 149 / 240 - window.innerWidth  / 2) /
                (window.innerHeight / 2 - window.innerHeight * 83 / 675)) * (180 / Math.PI),
            fill: '#eeeeee',
            opacity: 0.7,
            rotation: -90
        });
        this.layer.add(this.wedge);
    }

    // 写方向与度数文字
    private initText() {
        this.text = new Konva.Text({
            y: window.innerHeight / 9,
            text: this.lang.bpd + '36°',
            fontSize: window.innerHeight / 28 ,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeWidth: 1,
            shadowOpacity: 0.2,
            shadowColor: '#201f1f',
            shadowOffsetX: 3,
            shadowOffsetY: 3
        });
        this.text.x(this.moveCircle.x() - this.text.width() - window.innerWidth * 0.03);

        this.titleText = new Konva.Text({
            x: window.innerWidth * 0.03,
            y: window.innerHeight * 0.03,
            text: this.lang.titleT,
            fontSize: window.innerHeight / 28 ,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeWidth: 1
        });
        this.layer.add(this.text);
        this.layer.add(this.titleText);

    // 北
        this.bei = new Konva.Text({
            x: window.innerWidth * 0.957,
            y: 50,
            text: this.lang.bei,
            fontSize: 25,
            stroke: '#FFFFFF',
            strokeWidth: 2,
            lineJoin: 'round',
            fill: '#FFFFFF'
        });
        this.layer.add(this.bei);
    }

    initResiazeImg() {
        if (window.innerWidth < 1200) {
            this.bei.fontSize(20);
            this.bei.y(46);
            this.zhiNanZhen.width(23);
            this.zhiNanZhen.height(29);
            this.backGroundImage.width(window.innerWidth);
            this.backGroundImage.height(window.innerHeight);
        } else if (window.innerWidth > 1200) {
            this.bei.fontSize(25);
            this.zhiNanZhen.width(29);
            this.zhiNanZhen.height(35);
            this.backGroundImage.width(window.innerWidth);
            this.backGroundImage.height(window.innerHeight);
        }
    }

    // 缩放可拖动圆、X轴、Y轴、文字、指南针
    private resizeCircleAnd() {
        this.stage.width(window.innerWidth);
        this.stage.height(window.innerHeight);

        this.axisCircle.x(this.indexAxisCircleX * window.innerWidth);
        this.axisCircle.y(this.indexAxisCircleY * window.innerHeight);

        this.moveCircle.x(this.indexMoveCircleX * window.innerWidth);
        this.moveCircle.y(this.indexMoveCircleY * window.innerHeight);
        const zoom = window.innerHeight < 675 ? window.innerHeight / 675 : 1;
        this.moveCircle.radius(12 * zoom);

        this.xLine.points([this.indexAxisCircleX * window.innerWidth, this.indexAxisCircleY * window.innerHeight,
            window.innerWidth - 5, this.indexAxisCircleY * window.innerHeight]);

        this.yLine.points([this.indexAxisCircleX * window.innerWidth, this.indexAxisCircleY * window.innerHeight,
            this.indexAxisCircleX * window.innerWidth, 5]);

        this.xyLine.points([0, this.indexAxisCircleY * window.innerHeight, this.indexAxisCircleX * window.innerWidth,
            this.indexAxisCircleY * window.innerHeight, this.indexAxisCircleX * window.innerWidth, window.innerHeight]);

        this.lsLine.points([this.indexAxisCircleX * window.innerWidth,
            this.indexAxisCircleY * window.innerHeight, this.indexMoveCircleX * window.innerWidth,
            this.indexMoveCircleY * window.innerHeight]);

        this.text.fontSize(window.innerHeight / 28);

        if (this.moveCircle.x() > this.axisCircle.x()) {
            console.log(this.text.width());
            this.text.x(this.moveCircle.x() - this.text.width() - window.innerWidth * 0.03);
        } else if (this.axisCircle.x() > this.moveCircle.x()) {
            this.text.x(this.moveCircle.x() + window.innerWidth * 0.03);
        }
        this.text.y(-window.innerHeight * 8 / 675 + this.indexMoveCircleY * window.innerHeight);


        this.titleText.fontSize(window.innerHeight / 28);

        this.bei.x(window.innerWidth * 0.957);
        this.bei.y(50);
        this.bei.fontSize(25);

        this.zhiNanZhen.x(window.innerWidth * 0.956);
        this.zhiNanZhen.y(15);

        if (window.innerWidth < 1200) {
            this.bei.fontSize(20);
            this.bei.y(46);
            this.zhiNanZhen.width(23);
            this.zhiNanZhen.height(29);
        } else if (window.innerWidth > 1200) {
            this.bei.fontSize(25);
            this.zhiNanZhen.width(29);
            this.zhiNanZhen.height(35);
        }
    }

    // 缩放扇形弧度
    private resizeWedge() {
        this.wedge.x(this.indexAxisCircleX * window.innerWidth);
        this.wedge.y(this.indexAxisCircleY * window.innerHeight);
        const radius = window.innerHeight * 0.15;
        this.wedge.radius(radius);
        if (this.axisCircle.x() < this.moveCircle.x() && this.axisCircle.y() > this.moveCircle.y()) {
            this.wedge.rotation(-90);
            this.wedge.angle(Math.atan((this.moveCircle.x() - this.axisCircle.x()) /
                (this.axisCircle.y() - this.moveCircle.y())) * (180 / Math.PI));

        } else if (this.axisCircle.x() < this.moveCircle.x() && this.axisCircle.y() < this.moveCircle.y()) {
            this.wedge.rotation(90 - Math.atan((this.moveCircle.x() - this.axisCircle.x()) /
                (this.moveCircle.y() - this.axisCircle.y())) * (180 / Math.PI));
            this.wedge.angle(Math.atan((this.moveCircle.x() - this.axisCircle.x()) /
                (this.moveCircle.y() - this.axisCircle.y())) * (180 / Math.PI));

        } else if (this.axisCircle.x() > this.moveCircle.x() && this.axisCircle.y() > this.moveCircle.y()) {
            this.wedge.rotation(-90 - Math.atan((this.moveCircle.x() - this.axisCircle.x()) /
                (this.moveCircle.y() - this.axisCircle.y())) * (180 / Math.PI));
            this.wedge.angle(Math.atan((this.axisCircle.x() - this.moveCircle.x()) /
                (this.axisCircle.y() - this.moveCircle.y())) * (180 / Math.PI));

        } else if (this.axisCircle.x() > this.moveCircle.x() && this.axisCircle.y() < this.moveCircle.y()) {

            this.wedge.rotation(90);
            this.wedge.angle(Math.atan((this.axisCircle.x() - this.moveCircle.x()) /
                (this.moveCircle.y() - this.axisCircle.y())) * (180 / Math.PI));
        }

        switch (true) {
            case (this.moveCircle.x() - this.axisCircle.x()) < window.innerHeight *
            0.15 && this.moveCircle.x() > this.axisCircle.x():
                this.wedge.radius(this.moveCircle.x() - this.axisCircle.x());
                break;
            case (this.axisCircle.x() - this.moveCircle.x()) < window.innerHeight *
            0.15 && this.axisCircle.x() > this.moveCircle.x():
                this.wedge.radius(this.axisCircle.x() - this.moveCircle.x());
                break;
            case (this.moveCircle.x() - this.axisCircle.x()) > window.innerHeight *
            0.15 && this.moveCircle.x() > this.axisCircle.x():
            case (this.axisCircle.x() - this.moveCircle.x()) > window.innerHeight *
            0.15 && this.axisCircle.x() > this.moveCircle.x():
                this.wedge.radius(window.innerHeight * 0.15);
                break;
        }
    }

    // 缩放背景图
    private resizeBackGroundImage() {
        if (window.innerWidth / window.innerHeight === 16 / 9) {
            this.backGroundImage.width(window.innerWidth);
            this.backGroundImage.height(window.innerHeight);

        } else if (window.innerWidth / window.innerHeight > 16 / 9) {
            this.backGroundImage.width(window.innerWidth);
            this.backGroundImage.height(window.innerWidth * 9 / 16);
            const offset_y = (window.innerHeight - window.innerWidth * 9 / 16) / 2;
            this.backGroundImage.y(offset_y);

        } else if (window.innerWidth / window.innerHeight < 16 / 9) {
            this.backGroundImage.height(window.innerHeight);
            this.backGroundImage.width(window.innerHeight * 16 / 9);
            const offset_x = (window.innerWidth - window.innerHeight * 16 / 9) / 2;
            this.backGroundImage.x(offset_x);
        }

    }

    resize() {
        this.resizeCircleAnd();
        this.resizeWedge();
        this.resizeBackGroundImage();

        this.stage.draw();
    }
}
