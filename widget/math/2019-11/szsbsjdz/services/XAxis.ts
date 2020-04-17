import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import {Vector2d} from 'konva';

export class XAxis extends SimpleKonvaTemplate {
    lang = window.env.browserInfo.lang;

    // 垂直x轴的短线
    xLine: Konva.Line;
    // 坐标轴数字左
    numTextLeft: Konva.Text;
    // 坐标轴数字右
    numTextRight: Konva.Text;
    // 坐标轴线
    arrow: Konva.Arrow;
    // 显示数值的框
    valueRect: Konva.Rect;
    // 点与框的分组
    group: Konva.Group;
    // 点表示的数值
    numbertext: Konva.Text;
    // 定义按钮控制显示文字
    btnText1: Konva.Text;
    btnText2: Konva.Text;
    btnText3: Konva.Text;
    // 定义可滑动短线
    movelineX1: Konva.Line;
    // '='线上
    lineyup: Konva.Line;
    // '='线下
    lineydown: Konva.Line;
    // 固定竖线
    lineX2: Konva.Line;
    // 绝对值线1
    linex3: Konva.Line;
    //  绝对值线2
    linex4: Konva.Line;
    // 定义随从线
    movelineY1: Konva.Arrow;
    // 定义底部随从圆
    movecircle: Konva.Circle;
    // 可拖动圆心
    moveCircleCenter: Konva.Circle;
    // 固定原点的圆
    fixedcircle: Konva.Circle;
    // 绝对值框左
    leftRect: Konva.Rect;
    // 绝对值框右
    rightRect: Konva.Rect;
    // 跟随框
    fallowLabel: Konva.Label;
    // 左框数值
    numbertext1: Konva.Text;
    // 右框数值
    numbertext2: Konva.Text;
    // 跟随框数值
    numbertext3: Konva.Text;
    // 字母a
    btnTextEnglishOne: Konva.Text;
    btnTextEnglishTwo: Konva.Text;

    scale = 1;

    constructor() {
        super('container');
        this.init();
    }

    init() {
        this.drawArrow();
        this.drawLineAndNum();

        this.drawChangeLine();
        this.drawFixedCircle();

        this.initGroup();
        this.drawFollowCircle();
        this.initFallowLabel();
        this.drawValueRect();
        this.drawXLine();
        this.writeText();
        this.drawText();
        this.drawLine2();
        this.touchHands();

        this.stage.draw();
        this.resize();
    }

    // 把动态界面以及静态界面加到stage中
    addstage() {
        this.stage.add(this.animationLayer);
        this.stage.add(this.staticLayer);
    }

    // 画坐标轴
    drawArrow() {
        this.arrow = new Konva.Arrow({
            x: 100,
            y: 338,
            points: [0, 0, 1020, 0],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#179DF5',
            stroke: '#179DF5',
            strokeWidth: 3 * this.scale
        });
        this.staticLayer.add(this.arrow);
        this.staticLayer.draw();
    }

    // 画坐标轴上垂短线和数字
    drawLineAndNum() {
        for (let i = 0; i < 21; i++) {
            this.xLine = new Konva.Line({
                points: [120 + 48 * i, 338,
                    120 + 48 * i, 329],
                stroke: '#179DF5',
                strokeWidth: 3,
            });
            this.staticLayer.add(this.xLine);
        }

        for (let i = 0; i < 10; i++) {
            this.numTextLeft = new Konva.Text({
                x: 108 + 48 * i,
                y: 345,
                text: (-10 + i).toString(),
                fontSize: 22,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.staticLayer.add(this.numTextLeft);
        }

        for (let i = 10; i < 21; i++) {
            this.numTextRight = new Konva.Text({
                x: 114 + 48 * i,
                y: 345,
                text: (-10 + i).toString(),
                fontSize: 22,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.staticLayer.add(this.numTextRight);
        }

        this.staticLayer.draw();
    }

    // 画拖动圆形
    drawFollowCircle() {
        this.movecircle = new Konva.Circle({
            x: 600,
            y: 338,
            radius: 6 ,
            fill: '#f2f4f4',
            stroke: '#9d9d9d',
            strokeWidth: 24 ,
            opacity: 0.6
        });
        this.group.add(this.movecircle);

        this.moveCircleCenter = new Konva.Circle({
            x: 600,
            y: 338,
            radius: 6 ,
            fill: '#f2f4f4',
            opacity: 0.6
        });
        this.group.add(this.moveCircleCenter);
    }

    // 画固定原点的圆
    drawFixedCircle() {
        this.fixedcircle = new Konva.Circle({
            x: 600,
            y: 338,
            radius: 3,
            fill: 'white',
            stroke: 'white',
            strokeWidth: 2
        });
        this.animationLayer.add(this.fixedcircle);
    }

    // 画可移动短线垂直坐标轴
    drawXLine() {
        this.movelineX1 = new Konva.Line({
            points: [9999],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.group.add(this.movelineX1);
    }

    // 固定的竖线
    drawLine2() {
        this.lineX2 = new  Konva.Line({
            points: [9999],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.animationLayer.add(this.lineX2);

        // 绝对值线左
        this.linex3 = new  Konva.Line({
            points: [9999],
            stroke: '#cfcfcf',
            strokeWidth: 1,
            lineJoin: 'round'
        });
        this.animationLayer.add(this.linex3);

        // 绝对值线右
        this.linex4 = new  Konva.Line({
            points: [9999],
            stroke: '#cfcfcf',
            strokeWidth: 1,
            lineJoin: 'round'
        });
        this.animationLayer.add(this.linex4);

        // '='线上
        this.lineyup = new Konva.Line({
            points: [9999],
            stroke: '#cfcfcf',
            strokeWidth: 2,
            tension: 0.5
        });
        this.animationLayer.add(this.lineyup);

        // '='线下
        this.lineydown = new Konva.Line({
            points: [9999],
            stroke: '#cfcfcf',
            strokeWidth: 2,
            tension: 0.5
        });
        this.animationLayer.add(this.lineydown);
    }

    // 画长度可变线
    drawChangeLine() {
        this.movelineY1 = new Konva.Arrow({
            points: [9999],
            stroke: '#179DF5',
            strokeWidth: 3,
            pointerAtBeginning: true,
        });
        this.animationLayer.add(this.movelineY1);
    }

    // 画绝对值文本框区域
    drawValueRect() {
        this.valueRect = new Konva.Rect({
            x: 0,
            y: 432,
            width: 50,
            height: 30,
            fill: '#414141',
            cornerRadius: 5,
            stroke: '#545454',
            strokeWidth: 1,
            visible: false
        });
        this.group.add(this.valueRect);

        // 右固定文本框
        this.rightRect = new Konva.Rect({
            width: 58,
            height: 38,
            fill: '#414141',
            cornerRadius: 10,
            stroke: '#545454',
            strokeWidth: 1,
            visible: false
        });
        this.animationLayer.add(this.rightRect);

        // 左固定文本框
        this.leftRect = new Konva.Rect({
            width: 58,
            height: 38,
            fill: '#414141',
            cornerRadius: 10,
            stroke: '#545454',
            strokeWidth: 1,
            visible : false
        });
        this.animationLayer.add(this.leftRect);

    }

    // 拖动圆跟随框
    initFallowLabel() {
        this.fallowLabel = new Konva.Label({
            x: 570,
            y: 285,
        });

        this.fallowLabel.add( new Konva.Tag({
            fill: '#414141',
            pointerDirection: 'down',
            pointerWidth: 10,
            pointerHeight: 10,
            width: 60,
            height: 36,
            cornerRadius: 5,
            stroke: '#545454',
            strokeWidth: 1,
        }));
        this.group.add(this.fallowLabel);
    }

    // 显示绝对值大小的文本框
    writeText() {
        this.numbertext = new Konva.Text({
            x: 580,
            y: 432,
            width: 50,
            height: 31,
            text: '',
            fontSize: 18,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: 'white',
            align: 'center',
            verticalAlign: 'middle'
        });
        this.group.add(this.numbertext);

        // 左框数值
        this.numbertext1 = new Konva.Text({
            x: 520,
            y: 506,
            text: '',
            width: 58,
            height: 38,
            fontSize: 18,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: 'white',
            align: 'center',
            verticalAlign: 'middle'
        });
        this.animationLayer.add(this.numbertext1);

        // 右框数值
        this.numbertext2 = new Konva.Text({
            x: 630,
            y: 506,
            text: '',
            width: 58,
            height: 38,
            fontSize: 18,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: 'white',
            align: 'center',
            verticalAlign: 'middle'
        });
        this.numbertext2.align('center');
        this.animationLayer.add(this.numbertext2);

        // 跟随框数值
        this.numbertext3 = new Konva.Text({
            x: 570,
            y: 285,
            text: '0.0',
            fontSize: 18,
            width: 60,
            height: 36,
            fontFamily: 'Calibri',
            lineJoin: 'round',
            fill: 'white',
            align: 'center',
            verticalAlign: 'middle'
        });
        this.group.add(this.numbertext3);
    }

    // 按钮文字定义
    drawText() {
        this.btnText1 = new Konva.Text({
            x: 780 ,
            y: 600 ,
            text: this.lang.buttonDefineOne[0],
            fontSize: 18 ,
            fontFamily: 'Times New Roman',
            fill: '#f2f4f4',
            visible: false
        });
        this.btnTextEnglishOne = new Konva.Text({
            x: 965 ,
            y: 600 ,
            text: this.lang.buttonDefineOne[3],
            fontSize: 18 ,
            fill: '#f2f4f4',
            fontFamily: 'Times New Roman',
            fontStyle: 'italic',
            visible: false
        });
        this.btnText2 = new Konva.Text({
            x: 978 ,
            y: 600 ,
            text: this.lang.buttonDefineOne[1],
            fontSize: 18 ,
            fontFamily: 'Times New Roman',
            fill: '#f2f4f4',
            visible: false
        });
        this.btnTextEnglishTwo = new Konva.Text({
            x: 1183 ,
            y: 600 ,
            text: this.lang.buttonDefineOne[3],
            fontSize: 18 ,
            fill: '#f2f4f4',
            fontFamily: 'Times New Roman',
            fontStyle: 'italic',
            visible: false
        });
        this.btnText3 = new Konva.Text({
            x: 780 ,
            y: 625 ,
            text: this.lang.buttonDefineOne[2],
            fontSize: 18 ,
            fontFamily: 'Times New Roman',
            fill: '#f2f4f4',
            visible: false
        });
        this.animationLayer.add(this.btnText1);
        this.animationLayer.add(this.btnText2);
        this.animationLayer.add(this.btnText3);
        this.animationLayer.add(this.btnTextEnglishOne);
        this.animationLayer.add(this.btnTextEnglishTwo);
    }

    // 点击按钮文字显示与消失
    changeText (isable: boolean) {
        this.btnText1.setAttr('visible', isable);
        this.btnText2.setAttr('visible', isable);
        this.btnText3.setAttr('visible', isable);
        this.btnTextEnglishOne.setAttr('visible', isable);
        this.btnTextEnglishTwo.setAttr('visible', isable);
        this.animationLayer.draw();
    }

    // 获取坐标上的值并写入文本
    initGroup() {
        this.group = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {

                if (pos.x >= -480 * this.scale && pos.x <= 480 * this.scale ) {
                    // 打印移动坐标
                    if (pos.x < 0) {
                        this.numbertext.text((-(pos.x / (48 * this.scale))).toFixed(1).toString());
                        this.numbertext2.text((-(pos.x / (48 * this.scale))).toFixed(1).toString());
                    } else {
                        this.numbertext.text((((pos.x / (48 * this.scale)))).toFixed(1).toString());
                        this.numbertext2.text((((pos.x / (48 * this.scale)))).toFixed(1).toString());
                    }

                    if (pos.x / (48 * this.scale) > 0) {
                        this.numbertext1.width(53);
                    } else {
                        this.numbertext1.width(58);
                    }
                    // 左框数值
                    this.numbertext1.text(((pos.x / (48 * this.scale))).toFixed(1).toString());

                    // 跟随框数值
                    this.numbertext3.text((((pos.x / (48 * this.scale)))).toFixed(1).toString());

                    // 可伸缩的双箭头
                    this.movelineY1.points([600, 403, pos.x / this.scale + 600, 403]);

                    // 跟随拖动的竖线
                    this.movelineX1.points([600, 380, 600, 425]);

                    // 固定在原点下面的竖线
                    this.lineX2.points([600, 380, 600, 425]);

                    // 绝对值线左
                    this.linex3.points([525, 512, 525, 537]);

                    // 绝对值线右
                    this.linex4.points([573, 512, 573, 537]);

                    // '='显示1
                    this.lineyup.points([595, 520, 615, 520]);

                    // '='显示2
                    this.lineydown.points([595, 530, 615, 530]);

                    // 使文本区域居中
                    this.valueRect.x(580 + -pos.x / (2 * this.scale));
                    this.valueRect.visible(true);

                    // 右绝对值框
                    this.rightRect.x(630);
                    this.rightRect.y(506);
                    this.rightRect.visible(true);

                    // 左绝对值框
                    this.leftRect.x(520);
                    this.leftRect.y(506);
                    this.leftRect.visible(true);

                    // 使文字随拖动保持居中
                    this.numbertext.x( -pos.x / (2 * this.scale) + 580);

                    // 双箭头指向坐标轴两顶点
                } else if (pos.x >= 480 * this.scale) {
                    this.movelineY1.points([600, 403, 1080, 403]);
                } else {
                    this.movelineY1.points([600, 403, 120, 403]);
                }

                if (pos.x / (48 * this.scale) > 9.95) {
                    this.numbertext.text('10');
                    this.numbertext1.text(' 10');
                    this.numbertext2.text('10');
                    this.numbertext3.text('10');
                }

                if (pos.x / (48 * this.scale) < -9.95 ) {
                    this.numbertext.text('10');
                    this.numbertext1.text('-10');
                    this.numbertext2.text(' 10');
                    this.numbertext3.text('-10');
                }

                if (pos.x / (48 * this.scale) > -0.05 && pos.x / (48 * this.scale) < -0.0) {
                    this.numbertext1.text('0.0');
                    this.numbertext3.text('0.0');
                }

                if (pos.x / (48 * this.scale) > 0 && pos.x / (48 * this.scale) < 9.95 ) {
                    this.numbertext1.text(' ' + ((pos.x / (48 * this.scale))).toFixed(1).toString());
                }
                return this.groupDragBoundFunc(pos);
            }
        });
        this.animationLayer.add(this.group);
    }

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

    // 触摸小手
    private touchHands() {
        this.movecircle.off(' touchstart  touchend');
        this.moveCircleCenter.off(' touchstart  touchend');
        this.fallowLabel.off(' touchstart  touchend');
        this.numbertext3.off(' touchstart  touchend');
        this.numbertext.off(' touchstart  touchend');
        this.valueRect.off(' touchstart  touchend');
        this.stopevent(this.movecircle);
        this.stopevent(this.fallowLabel);
        this.stopevent(this.valueRect);
        this.stopevent(this.numbertext3);
        this.stopevent(this.numbertext);
    }

    // 设置可移动范围
    groupDragBoundFunc(pos: Vector2d) {
        if (pos.x > -480 * this.scale && pos.x < 480 * this.scale) {
            return {
                x: pos.x,
                y: 0,
            };
        } else {
            if (pos.x >= 480 * this.scale) {
                return {
                    x: 480 * this.scale,
                    y: 0
                };
            } else {
                return {
                    x: -480 * this.scale,
                    y: 0
                };
            }
        }
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(1200 * this.scale);
        this.stage.height(675 * this.scale);

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.draw();
    }

    reset() {
        this.animationLayer.removeChildren();
        this.init();
    }
}
