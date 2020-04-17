/**
 * 创建一个layer包含三个控制事件，用于坐标轴上显示原点、正方向、单位长度
 */
import * as Konva from 'konva';

export class ControllerLayer {
    //画布
    layer: Konva.Layer;
    //圆心
    originCircle: Konva.Circle;
    //正方向红色箭头
    arrow: Konva.Arrow;
    //单位长度
    unitLine: Konva.Line;
    //提示信息文字背景
    msgBg: Konva.Rect;
    //提示信息文字
    msg: Konva.Text;

    scale = window.innerWidth / window.innerHeight > 16 / 9
        ? window.innerHeight / 675
        : window.innerWidth / 1200;

    lang = window.env.browserInfo.lang;

    constructor(layer: Konva.Layer) {
        this.layer = layer;
        this.init();
    }

    init() {
        this.initCanvas();
    }

    //初始化
    initCanvas() {
        this.drawPointRed();
        this.drawArrowRed();
        this.drawUnitLine();
        this.drawMsg();
        this.layer.draw();
    }

    //画红色圆心
    drawPointRed() {
        this.originCircle = new Konva.Circle({
            x: 600 * window.innerWidth / 1200,
            y: 315 * window.innerHeight / 675,
            radius: 4  ,
            fill: '#D0021B',
            visible: false
        });
        this.layer.add(this.originCircle);
    }

    //画正方向
    drawArrowRed() {
        this.arrow = new Konva.Arrow({
            points: [1085 * window.innerWidth / 1200, 315 * window.innerHeight / 675,
                1120 * window.innerWidth / 1200, 315 * window.innerHeight / 675],
            pointerLength: 15 * this.scale,
            pointerWidth: 15 * this.scale,
            fill: '#D0021B',
            stroke: '#D0021B',
            strokeWidth: 3 ,
            visible: false
        });
        this.layer.add(this.arrow);
    }

    //画单位长度
    drawUnitLine() {
        this.unitLine = new Konva.Line({
            points: [600 * window.innerWidth / 1200, 315 * window.innerHeight / 675,
               648 * window.innerWidth / 1200, 315 * window.innerHeight / 675],
            stroke: '#D0021B',
            strokeWidth: 3 ,
            visible: false
        });
        this.layer.add(this.unitLine);
    }
    //表示提示信息
    drawMsg() {
        //判断是pc端还是移动端
        if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.msgBg = new Konva.Rect({
                x:  window.innerWidth / 2 - 142.5 ,
                y: 374 * window.innerHeight / 675,
                width: 285 ,
                height: 36 ,
                fill:  '#EBEBEB' ,
                strokeWidth: 1 ,
                cornerRadius: 18 ,
                visible: true
            });
            this.layer.add(this.msgBg);

            this.msg = new Konva.Text({
                x: window.innerWidth / 2 - 111.5 ,
                y: 374 * window.innerHeight / 675 + 12,
                width: 230,
                height: 22  ,
                text: this.lang.touchMsg,
                fontSize: 16 ,
                fontFamily: 'PingFangSC-Regular',
                fill: '#545454',
                visible: true
            });
            this.layer.add(this.msg);
        } else {
            this.msgBg = new Konva.Rect({
                x:  window.innerWidth / 2 - 155.5 ,
                y: 374 * window.innerHeight / 675,
                width: 311 ,
                height: 36 ,
                fill:  '#EBEBEB' ,
                strokeWidth: 1 ,
                cornerRadius: 18 ,
                visible: true
            });
            this.layer.add(this.msgBg);

            this.msg = new Konva.Text({
                x: window.innerWidth / 2 - 128.5 ,
                y: 374 * window.innerHeight / 675 + 12,
                width: 256,
                height: 22  ,
                text: this.lang.wheelMsg,
                fontSize: 16 ,
                fontFamily: 'PingFangSC-Regular',
                fill: '#545454',
                visible: true
            });
            this.layer.add(this.msg);
        }
    }

    //显示红色原点
    showRedOrign(isShow: boolean) {
        this.originCircle.setAttr('visible' , isShow);
        this.layer.draw();
    }
    //显示红色正方向
    showArrowRed(isShow: boolean) {
        this.arrow.setAttr('visible', isShow) ;
        this.layer.draw();
    }
    //隐藏红色单位长度
    showUnitLength(isShow: boolean) {
        this.unitLine.setAttr('visible' , isShow);
        this.layer.draw();
    }


}
