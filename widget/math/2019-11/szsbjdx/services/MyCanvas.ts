import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import {Vector2d} from 'konva';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;
    //坐标轴
    arrow: Konva.Arrow;
    arrowLine: Konva.Line;
    arrowValueRight: Konva.Text;
    arrowValueLeft: Konva.Text;
    centerCircle: Konva.Circle;

    //原点下的竖线，最后加载
    line: Konva.Line;

    //可拖动的两个组
    leftMoveGroup: Konva.Group;
    rightMoveGroup: Konva.Group;

    //两组嵌套圆
    leftGroupBackCircle: Konva.Circle;
    leftGroupFontCircle: Konva.Circle;
    rightGroupBackCircle: Konva.Circle;
    rightGroupFontCircle: Konva.Circle;

    //画第一组中显示文本内容线组成的框
    leftMoveFrame: Konva.Line;
    //画第二组中显示文本内容线组成的框
    rightMoveFrame: Konva.Line;

    //第一组中的跟着跟着点移动的线
    lineLeftGroup: Konva.Line;
    //第二组中的跟着跟着点移动的线
    lineRightGroup: Konva.Line;

    //移动标签内的数字文本
    greenText: Konva.Text;
    yellowText: Konva.Text;

    //绿色变长线
    greenLine: Konva.Line;
    //黄色变长线
    yellowLine: Konva.Line;

    //数字比大小第一个数
    leftNumberValueSize: Konva.Text;
    //数字比大小符号
    comparisonSymbol: Konva.Text;
    //数字比大小第二个数
    rightNumberValueSize: Konva.Text;

    //绝对值比大小第一个数
    leftNumberAbsoluteValue: Konva.Text;
    //绝对值比大小符号
    comparisonSymbolRight: Konva.Text;
    //绝对值比大小第二个数
    rightNumberAbsoluteValueSize: Konva.Text;

    //绝对值线
    absoluteLeftGroupLeftLine: Konva.Line;
    absoluteLeftGroupRightLine: Konva.Line;
    absoluteRightGroupLeftLine: Konva.Line;
    absoluteRightGroupRightLine: Konva.Line;

    //画数值比较区域的左边框
    numberCompareLeftLine: Konva.Line;
    //画数值比较区域的中间比较符边框
    numberCompareCenterLine: Konva.Line;
    //画数值比较区域的右边框
    numberCompareRightLine: Konva.Line;

    scale = 1;

    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();
    }

    async init() {
        this.initBgCanvas();
        this.resize();
    }

    initBgCanvas() {
        this.initBackground();
        this.initAnimationLayer();

        //让文字相对于框居中
        this.yellowText.x(375 + (70 - this.yellowText.width()) / 2);
        this.leftNumberValueSize.x(428 + (74 - this.yellowText.width()) / 2);
        this.leftNumberAbsoluteValue.x(428 + (74 - this.yellowText.width()) / 2);

        //让文字相对于框居中
        this.greenText.x(523.8 + (70 - this.greenText.width()) / 2);
        this.rightNumberValueSize.x(558 + (74 - this.greenText.width()) / 2);
        this.rightNumberAbsoluteValueSize.x(558 + (74 - this.greenText.width()) / 2);

        this.line = new Konva.Line(this.config.line as any);
        this.animationLayer.add(this.line);

        //修改比较符号的位置相对于框居中
        this.comparisonSymbol.x(515 + (30 - this.comparisonSymbol.width()) / 2);
        this.comparisonSymbolRight.x(515 + (30 - this.comparisonSymbol.width()) / 2);

        this.animationLayer.draw();
    }

    initBackground() {
        this.arrow = new Konva.Arrow(this.config.arrow as any);
        this.staticLayer.add(this.arrow);
        for (let i = 0; i < 21; i++) {
            this.arrowLine = new Konva.Line({
                points: [ 50 + 48 * i, 33 ,
                    50 + 48 * i ,  42],
                stroke: '#179DF5',
                strokeWidth: 3,
            });
            this.staticLayer.add(this.arrowLine);
        }
        for (let i = 0; i < 10; i++) {
            this.arrowValueLeft = new Konva.Text({
                x: 35 + 48 * i,
                y: 55,
                text: (-10 + i).toString(),
                fontSize: 20,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.animationLayer.add(this.arrowValueLeft);
        }

        for (let i = 0; i < 11; i++) {
            this.arrowValueRight = new Konva.Text({
                x: 524 + 48 * i,
                y: 55,
                text: (i).toString(),
                fontSize: 20,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.animationLayer.add(this.arrowValueRight);
        }
        this.centerCircle = new Konva.Circle(this.config.centerCircle as any);
        this.staticLayer.add(this.centerCircle);
    }

    initAnimationLayer() {
        this.leftMoveGroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                const newpos = this.leftGroupDragBoundFunc(pos);

                //修改黄色变长线的长度
                this.yellowLine.points([newpos.x / this.scale + 410, 83 , 530 , 83 ]);
                this.yellowText.text(((newpos.x / this.scale) / 48 - 2.5).toFixed(1));
                this.leftNumberValueSize.text(((newpos.x / this.scale) / 48 - 2.5).toFixed(1));
                this.leftNumberAbsoluteValue.text(((newpos.x / this.scale) / 48 - 2.5).toFixed(1));
                //修改当值是-0.0的时候 改为0.0
                if (((newpos.x / this.scale) / 48 - 2.5).toFixed(1) === '-0.0') {
                    this.yellowText.text('0.0');
                    this.leftNumberValueSize.text('0.0');
                    this.leftNumberAbsoluteValue.text('0.0');
                }
                this.changeSymbol();

                //让文字相对于框居中
                this.yellowText.x(375 + (70 - this.yellowText.width()) / 2);
                this.leftNumberValueSize.x(428 + (74 - this.yellowText.width()) / 2);
                this.leftNumberAbsoluteValue.x(428 + (74 - this.yellowText.width()) / 2);
                return newpos;
            }
        });
        this.yellowLine = new Konva.Line(this.config.yellowLine as any);
        this.animationLayer.add(this.yellowLine);

        this.leftGroupBackCircle = new Konva.Circle(this.config.leftGroupBackCircle as any);
        this.leftGroupFontCircle = new Konva.Circle(this.config.leftGroupFontCircle as any);

        this.changeCursor(this.leftGroupBackCircle);
        this.changeCursor(this.leftGroupFontCircle);

        this.leftMoveFrame = new Konva.Line(this.config.leftMoveFrame as any);
        this.yellowText = new Konva.Text(this.config.yellowText as any);
        this.lineLeftGroup = new Konva.Line(this.config.lineLeftGroup as any);
        this.leftMoveGroup.add(this.leftGroupBackCircle , this.leftGroupFontCircle , this.leftMoveFrame , this.yellowText ,
        this.lineLeftGroup);

        this.rightMoveGroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                const newpos = this.rightGroupDragBoundFunc(pos);
                //修改绿色变长线的长度
                this.greenLine.points([newpos.x / this.scale  + 558.8, 102 , 530 , 102, ]);
                this.greenText.text(((newpos.x / this.scale) / 48  + 0.6).toFixed(1));
                this.rightNumberValueSize.text(((newpos.x / this.scale) / 48  + 0.6).toFixed(1));
                this.rightNumberAbsoluteValueSize.text(((newpos.x / this.scale) / 48  + 0.6).toFixed(1));
                //修改当值是-0.0的时候 改为0.0
                if (((newpos.x / this.scale) / 48 + 0.6).toFixed(1) === '-0.0') {
                    this.greenText.text('0.0');
                    this.rightNumberValueSize.text('0.0');
                    this.rightNumberAbsoluteValueSize.text('0.0');
                }
                this.changeSymbol();

                //让文字相对于框居中
                this.greenText.x(523.8 + (70 - this.greenText.width()) / 2);
                this.rightNumberValueSize.x(558 + (74 - this.greenText.width()) / 2);
                this.rightNumberAbsoluteValueSize.x(558 + (74 - this.greenText.width()) / 2);
                return newpos;
            }
        });
        this.greenLine = new Konva.Line(this.config.greenLine as any);
        this.animationLayer.add(this.greenLine);

        this.rightGroupBackCircle = new Konva.Circle(this.config.rightGroupBackCircle as any);
        this.rightGroupFontCircle = new Konva.Circle(this.config.rightGroupFontCircle as any);

        this.changeCursor(this.rightGroupBackCircle);
        this.changeCursor(this.rightGroupFontCircle);

        this.rightMoveFrame = new Konva.Line(this.config.rightMoveFrame as any);
        this.greenText = new Konva.Text(this.config.greenText as any);
        this.lineRightGroup = new Konva.Line(this.config.lineRightGroup as any);
        this.rightMoveGroup.add(this.rightGroupBackCircle , this.rightGroupFontCircle , this.rightMoveFrame , this.greenText ,
        this.lineRightGroup);

        this.animationLayer.add(this.rightMoveGroup);
        this.animationLayer.add(this.leftMoveGroup);

        //比较区域的框
        this.numberCompareLeftLine = new Konva.Line(this.config.numberCompareLeftLine as any);
        this.numberCompareCenterLine = new Konva.Line(this.config.numberCompareCenterLine as any);
        this.numberCompareRightLine = new Konva.Line(this.config.numberCompareRightLine as any);
        this.animationLayer.add(this.numberCompareLeftLine , this.numberCompareCenterLine , this.numberCompareRightLine);

        //比较区域的数字和符号
        this.leftNumberValueSize = new Konva.Text(this.config.leftNumberValueSize as any);
        this.comparisonSymbol = new Konva.Text(this.config.comparisonSymbol as any);
        this.rightNumberValueSize = new Konva.Text(this.config.rightNumberValueSize as any);
        this.animationLayer.add(this.leftNumberValueSize , this.comparisonSymbol , this.rightNumberValueSize);

        //比较区域的绝对值和符号
        this.rightNumberAbsoluteValueSize = new Konva.Text(this.config.rightNumberAbsoluteValueSize as any);
        this.comparisonSymbolRight = new Konva.Text(this.config.comparisonSymbolRight as any);
        this.leftNumberAbsoluteValue = new Konva.Text(this.config.leftNumberAbsoluteValue as any);
        this.absoluteLeftGroupLeftLine = new Konva.Line(this.config.absoluteLeftGroupLeftLine as any);
        this.absoluteLeftGroupRightLine = new Konva.Line(this.config.absoluteLeftGroupRightLine as any);
        this.absoluteRightGroupLeftLine = new Konva.Line(this.config.absoluteRightGroupLeftLine as any);
        this.absoluteRightGroupRightLine = new Konva.Line(this.config.absoluteRightGroupRightLine as any);
        this.animationLayer.add(this.rightNumberAbsoluteValueSize , this.comparisonSymbolRight , this.leftNumberAbsoluteValue ,
        this.absoluteLeftGroupLeftLine , this.absoluteLeftGroupRightLine , this.absoluteRightGroupLeftLine ,
        this.absoluteRightGroupRightLine);
    }

    //变小手
    changeCursor(obj: any) {
        obj.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        obj.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    //变大小符号
    changeSymbol() {
        const  number1 = parseFloat(this.leftNumberValueSize.text());
        const  number2 = parseFloat(this.rightNumberValueSize.text());
        if ( number1  < number2 ) {
            this.comparisonSymbol.text('<');
        } else if ( number1  === number2  ) {
            this.comparisonSymbol.text('=');
        } else if ( number1 > number2) {
            this.comparisonSymbol.text('>');
        }

        if ( Math.abs(number1) < Math.abs(number2)) {
            this.comparisonSymbolRight.text('<');
        } else if ( Math.abs(number1) === Math.abs(number2)) {
            this.comparisonSymbolRight.text('=');
        } else {
            this.comparisonSymbolRight.text('>');
        }
    }

    //左边组的限制移动
    leftGroupDragBoundFunc(pos: Vector2d) {

        if ( pos.x >= -360 * this.scale  && pos.x  <= 600 * this.scale) {
            return {
                x: pos.x ,
                y: 0,
            };
        } else if (pos.x < -360 * this.scale)  {
            return {
                x: -360 * this.scale,
                y: 0,
            };
        } else {
            return {
                x: 600 * this.scale,
                y: 0,
            };
        }
    }

    //右边组的限制移动
    rightGroupDragBoundFunc(pos: Vector2d) {
        if ( pos.x >= -509 * this.scale  && pos.x  <= 451 * this.scale) {
            return {
                x: pos.x ,
                y: 0,
            };
        } else if (pos.x < -509 * this.scale) {
            return {
                x: -509 * this.scale,
                y: 0,
            };
        } else {
            return {
                x:  451 * this.scale,
                y: 0,
            };
        }
    }

    //展示数值比较相关内容
    showNumbers(value: boolean) {
        if (value) {
            //竖线的显示
            this.line.visible(false);
            this.lineLeftGroup.visible(false);
            this.lineRightGroup.visible(false);
            this.yellowLine.visible(false);
            this.greenLine.visible(false);

            this.containerFrame(true);

            this.textValue(true);

            this.absoluteLineVisible(false);

            this.animationLayer.draw();
        }
    }

    //展示绝对值比较相关内容
    showAbsoluteNumbers(value: boolean) {
        if (value) {
            //竖线的显示
            this.line.visible(true);
            this.lineLeftGroup.visible(true);
            this.lineRightGroup.visible(true);
            this.yellowLine.visible(true);
            this.greenLine.visible(true);

            this.containerFrame(true);

            this.textValue(false);

            this.absoluteLineVisible(true);

            this.animationLayer.draw();
        }
    }

    //数值显示
    textValue(value: boolean) {

        this.leftNumberValueSize.visible(value);
        this.comparisonSymbol.visible(value);
        this.rightNumberValueSize.visible(value);

        this.rightNumberAbsoluteValueSize.visible(!value);
        this.comparisonSymbolRight.visible(!value);
        this.leftNumberAbsoluteValue.visible(!value);
    }

    //容器框
    containerFrame(value: boolean) {
        this.numberCompareLeftLine.visible(value);
        this.numberCompareCenterLine.visible(value);
        this.numberCompareRightLine.visible(value);
    }

    //绝对值线
    absoluteLineVisible (value: boolean) {
        this.absoluteLeftGroupLeftLine.visible(value);
        this.absoluteLeftGroupRightLine.visible(value);
        this.absoluteRightGroupLeftLine.visible(value);
        this.absoluteRightGroupRightLine.visible(value);
    }

    // 重置
    reset() {
        this.containerFrame(false);
        this.absoluteLineVisible(false);

        this.staticLayer.removeChildren();
        this.animationLayer.removeChildren();
        this.init();
    }

    //改变窗口
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(1052 * this.scale);
        this.stage.height(200 * this.scale);

        //设置id为container的标签内容居中
        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        this.stage.draw();
    }
}

