/**
 * 坐标轴搭建，layer以window窗口大小缩放响应，坐标轴长度为[-10,10]
 *
 * author : 贾龙阳
 */
import * as Konva from 'konva';

export class XAxis {

    layer: Konva.Layer;
    //垂直x轴的短线
    xLine: Konva.Line;
    //坐标轴数字
    numText: Konva.Text;
    //坐标符号
    signText: Konva.Text;
    //坐标轴线
    arrow: Konva.Arrow;
    //画圆形
    leftmovecircle: Konva.Circle;
    rightmovecircle: Konva.Circle;
    //符号下标
    symbolLeftIndex = 0;
    symbolRightIndex = 0;


    scale = window.innerWidth / window.innerHeight > 16 / 9
        ? window.innerHeight / 675
        : window.innerWidth / 1200;

    constructor(layer: Konva.Layer) {
        this.layer = layer;
        this.init();
    }

    init() {
        this.initCanvas();
    }

    //初始化canvas
    initCanvas() {
        this.drawArrow();
        this.drawLineAndNum();
        this.drawFollowCircle();
        this.layer.draw();
    }

    //画带箭头的线
    drawArrow() {
        this.arrow = new Konva.Arrow({
            points: [304 * innerWidth / 1200, 315 * innerHeight / 675,
                (304 + 604) * innerWidth / 1200, 315 * innerHeight / 675],
            pointerLength: 15 * this.scale,
            pointerWidth: 15 * this.scale,
            fill: '#179DF5',
            stroke: '#179DF5',
            strokeWidth: 3 * this.scale
        });
        this.layer.add(this.arrow);
    }

    //画坐标轴上垂短线和数字
    drawLineAndNum() {
        for (let i = 0; i <= 20; i++) {
            this.xLine = new Konva.Line({
                points: [(i * 26.1 + 338) * innerWidth / 1200, 307 * innerHeight / 675,
                    (i * 26.1 + 338) * innerWidth / 1200, 316 * innerHeight / 675],
                stroke: '#179DF5',
                tension: 5,
                bezier: false,
                strokeWidth: 3 * this.scale
            });
            this.layer.add(this.xLine);
            if (i === 0) {
                this.signText = new Konva.Text({
                    x: (i * 26.1 + 325) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: '-',
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.numText = new Konva.Text({
                    x: (i * 26.1 + 333.2) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: (-(i - 10)).toString(),
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.layer.add(this.numText);
                this.layer.add(this.signText);
            } else if (i <= 9 && i > 0) {
                this.signText = new Konva.Text({
                    x: (i * 26.1 + 330) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: '-',
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.numText = new Konva.Text({
                    x: (i * 26.1 + 338.2) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: (-(i - 10)).toString(),
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.layer.add(this.numText);
                this.layer.add(this.signText);
            } else if (i > 9 && i < 20) {
                this.numText = new Konva.Text({
                    x: ((i - 10) * 26.1 + 595) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: (i - 10).toString(),
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.layer.add(this.numText);
            } else {
                this.numText = new Konva.Text({
                    x: ((i - 10) * 26.1 + 591) * innerWidth / 1200,
                    y: 322 * innerHeight / 675,
                    text: (i - 10).toString(),
                    fontSize: 16 * this.scale,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: '#FFFFFF',
                });
                this.layer.add(this.numText);
            }
        }
    }

    //画圆形组
    //画随从圆形
    drawFollowCircle() {
        this.leftmovecircle = new Konva.Circle({
            x: (6 * 26.1 + 338) * innerWidth / 1200,
            y: 315 * window.innerHeight / 675,
            radius: 5 * this.scale,
            fill: '#FFFFFF',
            stroke: '#D0021B',
            strokeWidth: 3 * this.scale
        });
        this.rightmovecircle = new Konva.Circle({
            x: (14 * 26.1 + 338) * innerWidth / 1200,
            y: 315 * window.innerHeight / 675,
            radius: 5 * this.scale,
            fill: '#FFFFFF',
            stroke: '#D0021B',
            strokeWidth: 3 * this.scale,
            visible: false
        });
        this.layer.add(this.leftmovecircle);
        this.layer.add(this.rightmovecircle);
    }

    //slider控制左侧控制线圆组变化
    moveLengthLeft(x: number, y: number) {
        this.modelOneLeft(x);
        this.layer.draw();
    }

    //slider控制左侧控制线圆组变化
    modelOneLeft(x: number) {
        //左侧圆形和垂线位置变化
        this.leftmovecircle.setAttr('x', x * 26.1 * innerWidth / 1200 + (6 * 26.1 + 338) * innerWidth / 1200);
    }

    //slider控制右侧控制线圆组变化
    moveLengthRight(x: number, y: number) {
        this.modelRightOne(x);
        this.layer.draw();
    }

    //右侧圆位置变化
    modelRightOne(x: number) {
        //右侧圆形和垂线位置变化
        this.rightmovecircle.setAttr('x', x * 26.1 * innerWidth / 1200 + (14 * 26.1 + 338) * innerWidth / 1200);
    }

    //a不等式符号改变事件
    changeSymbolLeft(symbolLeftIndex: number) {
        this.symbolLeftIndex = symbolLeftIndex;
        if (this.symbolLeftIndex === 0) {
            this.leftmovecircle.setAttr('fill', '#FFFFFF');
        } else if (this.symbolLeftIndex === 1) {
            this.leftmovecircle.setAttr('fill', '#FFFFFF');
        } else if (this.symbolLeftIndex === 2) {
            this.leftmovecircle.setAttr('fill', '#D0021B');
        } else if (this.symbolLeftIndex === 3) {
            this.leftmovecircle.setAttr('fill', '#D0021B');
        }
        this.layer.draw();
    }

    //b不等式符号改变事件
    changeSymbolRight(symbolRightIndex: number) {
        this.symbolRightIndex = symbolRightIndex;
        //圆心设为实心事件
        if (this.symbolRightIndex === 0) {
            this.rightmovecircle.setAttr('fill', '#FFFFFF');
        } else if (this.symbolRightIndex === 1) {
            this.rightmovecircle.setAttr('fill', '#FFFFFF');
        } else if (this.symbolRightIndex === 2) {
            this.rightmovecircle.setAttr('fill', '#D0021B');
        } else if (this.symbolRightIndex === 3) {
            this.rightmovecircle.setAttr('fill', '#D0021B');
        }
        this.layer.draw();
    }

    resize() {
        this.layer.draw();
    }
}
