import * as Konva from 'konva';
import {XAxis} from './XAxis';

export class InequationLayer {
    lang = window.env.browserInfo.lang;

    layer: Konva.Layer;
    //引入坐标轴
    x: XAxis;
    //左侧移动边界
    //左侧文本区域
    LabelLeft: Konva.Label;

    //点与框的分组
    groupleft: Konva.Group;
    //点表示的数值
    numbertextleft: Konva.Text;
    //定义可滑动短线
    movelineXLeft: Konva.Line;
    //定义随从线
    movelineYLeft: Konva.Line;
    //定义底部随从圆
    leftmovecircle: Konva.Circle;
    //定义底部公式
    bottomFormulaLeft: Konva.Text;
    bottomFormulaX: Konva.Text;
    symbolLeft: Konva.Text;
    //滑杆值
    sliderNumber = -4;

    //定义一个色块
    innerRect: Konva.Rect;

    //改变时的符号
    indexSymbolLeft = '';
    symbolLeftIndex = 0;

    scale = window.innerWidth / window.innerHeight > 16 / 9
        ? window.innerHeight / 675
        : window.innerWidth / 1200;

    constructor(layer: Konva.Layer) {
        this.layer = layer;
        this.init();
    }

    private init() {
        this.initAllGroup();
    }

    //组创建包含的方法
    initAllGroup() {
        //左边组
        this.initleftGroup();
        //定义数轴值区域
        this.drawFrame();
        //写数值
        this.writeText();
        //画垂直X轴的短线
        this.drawXLine();
        //画改变长度线
        this.drawChangeLine();
        //划取值区域
        this.drawRact();
        //画数轴上跟随圆形
        this.drawFollowCircle();
        //写出底部文字
        this.writeBottomFormula();
        //底部不等式符号改变
        this.writeSymbol();

        this.layer.add(this.groupleft);
        this.layer.add(this.innerRect);
        this.layer.draw();
    }

    //画矩形区域
    drawRact() {
        this.innerRect = new Konva.Rect({
            x: this.movelineXLeft.points()[0],
            y: this.movelineYLeft.points()[1] + 2 * this.scale,
            width: 908 * innerWidth / 1200 - this.movelineYLeft.points()[0],
            height: 315 * window.innerHeight / 675 - this.movelineYLeft.points()[1] - 2 * this.scale,
            fill: '#F8E71C'
        });
        this.layer.add(this.innerRect);
    }

    //画短线垂直坐标轴
    drawXLine() {
        this.movelineXLeft = new Konva.Line({
            points: [(6 * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675 - 1.5,
                (6 * 26.1 + 338) * innerWidth / 1200, 316 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'bevel'
        });
        this.groupleft.add(this.movelineXLeft);
    }

    //画平行x轴的长度变化的线
    drawChangeLine() {
        this.movelineYLeft = new Konva.Line({
            points: [(6 * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
                908 * innerWidth / 1200, 263 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'bevel'
        });

        this.layer.add(this.movelineYLeft);
    }

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
        this.groupleft.add(this.leftmovecircle);
    }

    //画文本框区域
    drawFrame() {
        this.LabelLeft = new Konva.Label({
            x: 464 * window.innerWidth / 1200,
            y: 342 * innerHeight / 675,
        });

        this.LabelLeft.add(
            new Konva.Tag({
                fill: '#414141',
                pointerDirection: 'up',
                pointerWidth: 8 * window.innerWidth / 1200,
                pointerHeight: 8 * window.innerHeight / 675,
                lineJoin: 'round',
                cornerRadius: 5,
                width: 60 * window.innerWidth / 1200,
                height: 36 * window.innerHeight / 675,
                stroke: '#909090',
                strokeWidth: 1,
                opacity: 0.5,
                draggable: false,

            })
        );
        this.groupleft.add(this.LabelLeft);
    }

    //定义显示文本区
    writeText() {
        this.numbertextleft = new Konva.Text({
            x: 477 * window.innerWidth / 1200,
            y: 350 * window.innerHeight / 675,
            text: '-4.0',
            fontSize: 20 * this.scale,
            fontFamily: 'Calibri',
            fill: '#FFFFFF',
        });
        this.groupleft.add(this.numbertextleft);
    }

    //定义底部公式区域
    writeBottomFormula() {
        this.bottomFormulaX = new Konva.Text({
            x: 600 * window.innerWidth / 1200,
            y: 490 * window.innerHeight / 675,
            text: 'x',
            fontSize: 26 * window.innerWidth / 1200,
            fontFamily: 'Times New Roman',
            fontStyle: 'italic',
            fill: '#FFFFFF',
        });

        if (/Android|webOS|BlackBerry/i.test(navigator.userAgent)) {
            this.bottomFormulaX.setAttr('x', 597 * window.innerWidth / 1200);
        }

        this.bottomFormulaLeft = new Konva.Text({
            x: 525 * window.innerWidth / 1200,
            y: 493 * window.innerHeight / 675,
            text: '-4.0',
            fontSize: 22 * window.innerWidth / 1200,
            fontFamily: 'FZFSK--GBK1-0',
            fill: '#FFFFFF',
        });


        this.layer.add(this.bottomFormulaLeft);
        this.layer.add(this.bottomFormulaX);
    }

    //底部符号显示
    writeSymbol() {
        this.symbolLeft = new Konva.Text({
            x: 575 * window.innerWidth / 1200,
            y: 493 * window.innerHeight / 675,
            text: '<',
            fontSize: 22 * window.innerWidth / 1200,
            fontFamily: 'FZFSK--GBK1-0',
            fill: '#FFFFFF',
        });
        this.layer.add(this.symbolLeft);
    }

    //左侧文本区域
    initleftGroup() {
        this.groupleft = new Konva.Group();
    }

    //slider控制左侧控制线圆组变化
    moveLengthLeft(x: number, y: number) {
        if (this.symbolLeftIndex === 0 || this.symbolLeftIndex === 2) {
            this.modelOneLeft(x);
        } else if (this.symbolLeftIndex === 1 || this.symbolLeftIndex === 3) {
            this.modelTwoLeft(x);
        }
        this.layer.draw();
    }

    //使数轴上数字居中显示方法
    letNumCenter(x: number) {
        switch ((x - 4.0).toFixed(1).length) {
            case 3:
                this.numbertextleft.offsetX(-5 * innerWidth / 1200);
                this.bottomFormulaLeft.offsetX(-12 * innerWidth / 1200);
                break;
            case  4:
                this.numbertextleft.offsetX(0);
                this.bottomFormulaLeft.offsetX(0);
                break;
            case  5:
                this.numbertextleft.offsetX(3 * innerWidth / 1200);
                this.bottomFormulaLeft.offsetX(12 * innerWidth / 1200);
                break;

        }
    }

    //不等式符号改变
    //a符号为> ,>=
    modelOneLeft(x: number) {
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            908 * innerWidth / 1200, 263 * innerHeight / 675]);
        //取值范围矩形变化
        this.innerRect.setAttr('x', this.movelineYLeft.points()[0]);
        this.innerRect.setAttr('width', 908 * innerWidth / 1200 - this.movelineYLeft.points()[0]);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);

        //写入实时变化的左边刻度文字
        this.letNumCenter(x);
        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        this.textHaveSolutionEvent();
    }

    //a符号为< , <=
    modelTwoLeft(x: number) {
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            304 * innerWidth / 1200, 263 * innerHeight / 675]);
        //取值范围矩形变化
        this.innerRect.setAttr('x', 304 * innerWidth / 1200);
        this.innerRect.setAttr('width', this.movelineYLeft.points()[0] - 304 * innerWidth / 1200);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);

        //写入实时变化的左边刻度文字
        this.letNumCenter(x);

        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        this.textHaveSolutionEvent();
    }

    //底部公式显示
    textHaveSolutionEvent() {
        this.bottomFormulaLeft.setAttr('visible', true);
        this.symbolLeft.setAttr('visible', true);
        this.bottomFormulaX.setAttr('text', 'x');
    }

    //a不等式符号改变事件
    changeSymbolLeft(symbolLeft: string, symbolLeftIndex: number) {
        this.indexSymbolLeft = symbolLeft;
        this.symbolLeftIndex = symbolLeftIndex;
        this.symbolLeft.text(this.indexSymbolLeft);
        switch (this.symbolLeftIndex) {
            case 0:
                this.leftmovecircle.setAttr('fill', '#FFFFFF');
                break;
            case  1:
                this.leftmovecircle.setAttr('fill', '#FFFFFF');
                break;
            case  2:
                this.leftmovecircle.setAttr('fill', '#D0021B');
                break;
            case  3:
                this.leftmovecircle.setAttr('fill', '#D0021B');
                break;
        }
        this.layer.draw();
    }

    resize() {
        this.layer.draw();
    }

}
