/**
 * 坐标轴搭建，layer以window窗口大小缩放响应，坐标轴长度为[-3,3]
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
    //坐标轴比例系数
    scaleFactor = 1 ;

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
        this.layer.draw();
    }

    //画带箭头的线
    drawArrow() {
        this.arrow = new Konva.Arrow({
            points: [100 * innerWidth / 1200, 315 * innerHeight / 675,
                (100 + 1020) * innerWidth / 1200, 315 * innerHeight / 675],
            pointerLength: 15 * this.scale,
            pointerWidth: 15 * this.scale,
            fill: '#179DF5',
            stroke: '#179DF5',
            strokeWidth: 3
        });
        this.layer.add(this.arrow);
    }

    //画坐标轴上垂短线和数字
    drawLineAndNum() {
        for (let i = 0; i <= 20; i++) {
            this.xLine = new Konva.Line({
                points: [(i * 48 + 120) * innerWidth / 1200, 316 * innerHeight / 675 - 9,
                    (i * 48 + 120) * innerWidth / 1200, 316 * innerHeight / 675],
                stroke: '#179DF5',
                tension: 5,
                bezier: false,
                strokeWidth: 3
            });
            this.layer.add(this.xLine);
        }
            for (let i = 1; i < 10; i++) {
                this.numText = new Konva.Text({
                    x: (108 + 48 * i) * innerWidth / 1200,
                    y: 327 * innerHeight / 675,
                    text: ((-10 + i) * this.scaleFactor).toString(),
                    fontSize: 22 * this.scale ,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: 'white'
                });
                this.layer.add(this.numText);
            }
            this.numText = new Konva.Text({
                x: 100 * innerWidth / 1200,
                y: 327 * innerHeight / 675,
                text: (-10 * this.scaleFactor).toString(),
                fontSize: 22 * this.scale ,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
        this.layer.add(this.numText);
            this.numText = new Konva.Text({
                x: 1068 * innerWidth / 1200,
                y: 327 * innerHeight / 675,
                text: (10 * this.scaleFactor).toString(),
                fontSize: 22 * this.scale ,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
        this.layer.add(this.numText);
            for (let i = 10; i < 20; i++) {
                this.numText = new Konva.Text({
                    x: (114 + 48 * i) * innerWidth / 1200,
                    y: 327 * innerHeight / 675,
                    text: ((-10 + i) * this.scaleFactor).toString(),
                    fontSize: 22 * this.scale ,
                    fontFamily: 'TimesNewRomanPSMT',
                    fill: 'white'
                });
                this.layer.add(this.numText);
            }
    }
    resize() {
        this.drawArrow();
        this.drawLineAndNum();
        this.layer.draw();
    }
}
