import * as Konva from 'konva';

export class XTool {
    lang = window.env.browserInfo.lang;
    layer: Konva.Layer;
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
    //右侧移动边界
    //右侧文本区域
    LabelRight: Konva.Label;
    //点与框的分组
    groupRight: Konva.Group;
    //点表示的数值
    numbertextRight: Konva.Text;
    //定义可滑动短线
    movelineXRight: Konva.Line;
    //定义随从线
    movelineYRight: Konva.Line;
    //定义底部随从圆
    rightmovecircle: Konva.Circle;
    //定义底部公式
    bottomFormulaLeft: Konva.Text;
    bottomFormulaRight: Konva.Text;
    bottomFormulaX: Konva.Text;
    symbolLeft: Konva.Text;
    symbolRight: Konva.Text;
    //滑杆值
    sliderNumberLeft = 0;
    sliderNumberRight = 0;
    //定义一个重合区域色块
    innerRect: Konva.Rect;
    //改变时的符号
    indexSymbolLeft = '';
    indexSymbolRight = '';
    symbolLeftIndex = 0;
    symbolRightIndex = 0;
    //定义滑杆a,b上的值
    aSliderNum = 0;
    bSliderNum = 0;

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
        //右边组
        this.initrightGroup();
        //定义数轴值区域
        this.drawFrame();
        //写数值
        this.writeText();
        //画垂直X轴的短线
        this.drawXLine();
        //画数轴上跟随圆形
        this.drawFollowCircle();
        //画改变长度线
        this.drawChangeLine();
        //写出底部文字
        this.writeBottomFormula();
        //画重合色块
        this.drawRact();
        //底部不等式符号改变
        this.writeSymbol();

        this.layer.add(this.groupleft);
        this.layer.add(this.groupRight);
        this.layer.add(this.innerRect);
        this.layer.draw();
    }

    //画矩形颜色区域
    drawRact() {
        this.innerRect = new Konva.Rect({
            x: this.movelineXLeft.points()[0],
            y: this.movelineYRight.points()[1] + 2 * this.scale,
            width: this.movelineXRight.points()[0] - this.movelineXLeft.points()[0],
            height: this.movelineXRight.points()[3] - this.movelineXRight.points()[1] - 4 * this.scale,
            fill: '#F8E71C',
        });
        this.layer.add(this.innerRect);
    }

    //画短线垂直坐标轴
    drawXLine() {
        this.movelineXLeft = new Konva.Line({
            points: [(6 * 26.1 + 338) * innerWidth / 1200, 238 * innerHeight / 675 - 1.5,
                (6 * 26.1 + 338) * innerWidth / 1200, 316 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.movelineXRight = new Konva.Line({
            points: [(14 * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675 - 1.5,
                (14 * 26.1 + 338) * innerWidth / 1200, 316 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.groupleft.add(this.movelineXLeft);
        this.groupRight.add(this.movelineXRight);
    }

    //画平行x轴的长度变化的线
    drawChangeLine() {
        this.movelineYLeft = new Konva.Line({
            points: [(6 * 26.1 + 338) * innerWidth / 1200, 238 * innerHeight / 675,
                (304 + 604) * innerWidth / 1200, 238 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.movelineYRight = new Konva.Line({
            points: [(14 * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
                304 * innerWidth / 1200, 263 * innerHeight / 675],
            stroke: '#179DF5',
            strokeWidth: 3,
            lineJoin: 'round'
        });
        this.layer.add(this.movelineYLeft);
        this.layer.add(this.movelineYRight);
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
        this.rightmovecircle = new Konva.Circle({
            x: (14 * 26.1 + 338) * innerWidth / 1200,
            y: 315 * window.innerHeight / 675,
            radius: 5 * this.scale,
            fill: '#FFFFFF',
            stroke: '#D0021B',
            strokeWidth: 3 * this.scale
        });
        this.groupleft.add(this.leftmovecircle);
        this.groupRight.add(this.rightmovecircle);
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
        this.LabelRight = new Konva.Label({
            x: 673.5 * window.innerWidth / 1200,
            y: 342 * innerHeight / 675,
        });
        this.LabelRight.add(
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
        this.groupRight.add(this.LabelRight);
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
        this.numbertextRight = new Konva.Text({
            x: 691 * window.innerWidth / 1200,
            y: 350 * window.innerHeight / 675,
            text: '4.0',
            fontSize: 20 * this.scale,
            fontFamily: 'Calibri',
            fill: '#FFFFFF',
        });
        this.groupleft.add(this.numbertextleft);
        this.groupRight.add(this.numbertextRight);
    }

    //定义底部公式区域
    writeBottomFormula() {
        //判断是pc端还是移动端
        this.bottomFormulaLeft = new Konva.Text({
            x: 525 * window.innerWidth / 1200,
            y: 493 * window.innerHeight / 675,
            text: '-4.0',
            fontSize: 22 * window.innerWidth / 1200,
            fontFamily: 'FZFSK--GBK1-0',
            fill: '#FFFFFF',
        });
        this.bottomFormulaRight = new Konva.Text({
            x: 641.5 * window.innerWidth / 1200,
            y: 493 * window.innerHeight / 675,
            text: '4.0',
            fontSize: 22 * window.innerWidth / 1200,
            fontFamily: 'FZFSK--GBK1-0',
            fill: '#FFFFFF',
        });
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
        this.layer.add(this.bottomFormulaLeft);
        this.layer.add(this.bottomFormulaRight);
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
        this.symbolRight = new Konva.Text({
            x: 619 * window.innerWidth / 1200,
            y: 493 * window.innerHeight / 675,
            text: '<',
            fontSize: 22 * window.innerWidth / 1200,
            fontFamily: 'FZFSK--GBK1-0',
            fill: '#FFFFFF',
        });
        this.layer.add(this.symbolLeft);
        this.layer.add(this.symbolRight);
    }

    //左侧文本区域
    initleftGroup() {
        this.groupleft = new Konva.Group();
    }

    //slider控制左侧控制线圆组变化
    moveLengthLeft(x: number, y: number) {
        if ((this.symbolLeftIndex === 0 || this.symbolLeftIndex === 2)
            && (this.symbolRightIndex === 0 || this.symbolRightIndex === 2)) {
            this.modelOneLeft(x);
        } else if ((this.symbolLeftIndex === 0 || this.symbolLeftIndex === 2)
            && (this.symbolRightIndex === 1 || this.symbolRightIndex === 3)) {
            this.modelTwoLeft(x);
        } else if ((this.symbolLeftIndex === 1 || this.symbolLeftIndex === 3)
            && (this.symbolRightIndex === 0 || this.symbolRightIndex === 2)) {
            this.modelThreeLeft(x);
        } else if ((this.symbolLeftIndex === 1 || this.symbolLeftIndex === 3)
            && (this.symbolRightIndex === 1 || this.symbolRightIndex === 3)) {
            this.modelFourLeft(x);
        }
        this.layer.draw();
    }

    //使a滑杆控制数轴上数字和底部数字居中显示方法
    letLeftNumCenter(x: number) {
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

    //使b滑杆控制数轴上数字和底部数字居中显示方法
    letRightNumCenter(x: number) {
        switch ((x + 4.0).toFixed(1).length) {
            case 3:
                this.numbertextRight.offsetX(0);
                break;
            case  4:
                this.numbertextRight.offsetX(5 * innerWidth / 1200);
                break;
            case  5:
                this.numbertextRight.offsetX(8 * innerWidth / 1200);
                break;
        }
    }

    //定义a控制组线条高度变化
    groupALineToHigh() {
        //左侧线组改变
        this.movelineXLeft.points()[1] = 238 * innerHeight / 675 - 1.5;
        this.movelineYLeft.points()[1] = 238 * innerHeight / 675;
        this.movelineYLeft.points()[3] = 238 * innerHeight / 675;
    }

    groupALineToLower() {
        this.movelineYLeft.points()[1] = 263 * innerHeight / 675;
        this.movelineYLeft.points()[3] = 263 * innerHeight / 675;
        this.movelineXLeft.points()[1] = 263 * innerHeight / 675 - 1.5;
    }

    //定义b控制组线条高度变化
    groupBLineToHigh() {
        this.movelineXRight.points()[1] = 238 * innerHeight / 675 - 1.5;
        this.movelineYRight.points()[1] = 238 * innerHeight / 675;
        this.movelineYRight.points()[3] = 238 * innerHeight / 675;
    }

    groupBLineToLower() {
        //改变右侧线段高度
        this.movelineYRight.points()[1] = 263 * innerHeight / 675;
        this.movelineYRight.points()[3] = 263 * innerHeight / 675;
        this.movelineXRight.points()[1] = 263 * innerHeight / 675 - 1.5;
    }

    //a数值改变，控制左侧线为主动，右侧线为从动
    //a符号为>，b符号为<,方法抽取
    modelOneLeft(x: number) {
        this.aSliderNum = parseFloat(x.toFixed(1));
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 238 * innerHeight / 675,
            908 * innerWidth / 1200, 238 * innerHeight / 675]);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的左边刻度文字
        this.letLeftNumCenter(x);
        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) < 0) {
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineXLeft.points()[0] + x * 26.1 * innerWidth / 1200);
            this.innerRect.setAttr('width', this.movelineYRight.points()[0]
                - this.movelineXLeft.points()[0] - x * 26.1 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            this.movelineXLeft.points()[1] = 238 * innerHeight / 675 - 1.5;
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            //左边组超过右边组，重合色块宽度设为0
            this.innerRect.setAttr('x', this.movelineXLeft.points()[0] + x * 26.1 * innerWidth / 1200);
            this.innerRect.setAttr('width', 0);
            this.layer.add(this.innerRect);
            //线条高度变化
            this.groupALineToLower();
            this.groupBLineToLower();
            //底部文字改变为无解
            this.textNoSolutionEvent();
        }
        this.specialLimitedOne();
    }

    //a为大于，b为小于时，a,b两个滑杆特殊值判断方法
    specialLimitedOne() {
        if (((this.symbolLeftIndex !== 2) || (this.symbolRightIndex !== 2))) {
            return;
        }
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) === parseFloat((this.bSliderNum + 4).toFixed(1))) {
            //底部文字改变为无解
            this.textNoSolutionEvent();
            this.bottomFormulaX.setAttr('text', 'x');
            this.bottomFormulaRight.setAttr('visible', true);
            this.symbolRight.setAttr('visible', true);
            this.symbolRight.setAttr('text', '=');
        } else {
            this.symbolRight.setAttr('text', '≤');
        }
    }

    //a符号为>,b符号为>，方法抽取
    modelTwoLeft(x: number) {
        this.aSliderNum = parseFloat(x.toFixed(1));
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            908 * innerWidth / 1200, 263 * innerHeight / 675]);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的左边刻度文字
        this.letLeftNumCenter(x);
        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (this.movelineYRight.points()[0] - this.movelineXLeft.points()[0] - x * 26.1 * innerWidth / 1200 >= 0) {
            this.movelineXLeft.points()[1] = 263 * innerHeight / 675 - 1.5;
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYRight.points()[0]);
            this.innerRect.setAttr('width', 908 * innerWidth / 1200 - this.movelineYRight.points()[0]);
            this.layer.add(this.innerRect);
            //线条高度变化
            this.groupBLineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            //线条高度变化
            this.groupBLineToLower();
            this.groupALineToHigh();
            //改变取值黄色矩形位置
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', ((6 + x) * 26.1 + 338) * innerWidth / 1200);
            this.innerRect.setAttr('width', 908 * innerWidth / 1200 - ((6 + x) * 26.1 + 338) * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedThree();
    }

    //a 符号>， b 符号> ，特殊值判断方法
    specialLimitedThree() {
        //数字判断，显示
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) < 0) {
            this.symbolLeft.setAttr('visible', false);
            this.bottomFormulaLeft.setAttr('visible', false);
        } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) > 0) {
            this.symbolRight.setAttr('visible', false);
            this.bottomFormulaRight.setAttr('visible', false);
        } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) === 0) {
            if (this.symbolLeftIndex === 0 && (this.symbolRightIndex === 3 || 1)) {
                this.symbolRight.setAttr('visible', false);
                this.bottomFormulaRight.setAttr('visible', false);
            } else if (this.symbolLeftIndex === 2 && this.symbolRightIndex === 1) {
                this.symbolLeft.setAttr('visible', false);
                this.bottomFormulaLeft.setAttr('visible', false);
            } else if (this.symbolLeftIndex === 2 && this.symbolRightIndex === 3) {
                this.symbolLeft.setAttr('visible', false);
                this.bottomFormulaLeft.setAttr('visible', false);
                this.symbolRight.setAttr('text', '≥');
            }
        }
    }

    //a符号为<,b符号为<,方法抽取
    modelThreeLeft(x: number) {
        this.aSliderNum = parseFloat(x.toFixed(1));
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 238 * innerHeight / 675,
            304 * innerWidth / 1200, 238 * innerHeight / 675]);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的左边刻度文字
        this.letLeftNumCenter(x);
        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (this.movelineYRight.points()[0] - this.movelineXLeft.points()[0] - x * 26.1 * innerWidth / 1200 >= 0) {
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', 304 * innerWidth / 1200);
            this.innerRect.setAttr('width', this.movelineYLeft.points()[0] - 304 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //改变右侧组线段高度
            this.groupBLineToLower();
            //左侧线组改变
            this.groupALineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            //改变右侧组线段高度
            this.groupBLineToHigh();
            //左侧线组改变
            this.groupALineToLower();
            //改变取值黄色矩形位置
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', 304 * innerWidth / 1200);
            this.innerRect.setAttr('width', this.movelineYRight.points()[0] - 304 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedFour();
    }

    //a符号< , b 符号 < ，特殊值判断
    specialLimitedFour() {
        //数字判断，显示
        //a  为 < , b 为 <=
        if (this.symbolLeftIndex === 1 && (this.symbolRightIndex === 2)) {
            if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) <= 0) {
                this.coverRightNumber();
            } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) > 0) {
                this.coverNumberLeft();
                this.symbolRight.setAttr('text', '≤');
            }
            //a  为 < , b 为 <
        } else if (this.symbolLeftIndex === 1 && this.symbolRightIndex === 0) {
            if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) <= 0) {
                this.coverRightNumber();
            } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) > 0) {
                this.coverNumberLeft();
            }
            //a  为 <= , b 为 <
        } else if (this.symbolLeftIndex === 3 && this.symbolRightIndex === 0) {
            if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) < 0) {
                this.coverRightNumber();
            } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) >= 0) {
                this.coverNumberLeft();
            }
            //a  为 <= , b 为 <=
        } else if (this.symbolLeftIndex === 3 && this.symbolRightIndex === 2) {
            if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) < 0) {
                this.coverRightNumber();
            } else if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) >= 0) {
                this.coverNumberLeft();
                this.symbolRight.setAttr('text', '≤');
            }
        }
    }

    //底部公式右侧数字符号隐藏方法
    coverRightNumber() {
        this.symbolRight.setAttr('visible', false);
        this.bottomFormulaRight.setAttr('visible', false);
    }

    //底部公式左侧数字符号隐藏方法
    coverNumberLeft() {
        this.symbolLeft.setAttr('visible', false);
        this.bottomFormulaLeft.setAttr('visible', false);
    }

    //a符号为<,b符号为>，方法抽取
    modelFourLeft(x: number) {
        this.aSliderNum = parseFloat(x.toFixed(1));
        //左边平行x轴的线长度变化
        this.movelineYLeft.setAttr('points', [((6 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            304 * innerWidth / 1200, 263 * innerHeight / 675]);
        //左侧圆形和垂线位置变化
        this.groupleft.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的左边刻度文字
        this.letLeftNumCenter(x);
        this.numbertextleft.text((x - 4.0).toFixed(1).toString());
        this.bottomFormulaLeft.text((x - 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) <= 0) {
            //左边组没有超过右边组，重合色块宽度设为0
            this.innerRect.setAttr('x', this.movelineXLeft.points()[0] + x * 26.1 * innerWidth / 1200);
            this.innerRect.setAttr('width', 0);
            this.layer.add(this.innerRect);
            //改变movelineXLeft线高度复原
            this.groupBLineToLower();
            //改变左侧组线段高度
            this.groupALineToLower();
            //底部文字改变为无解
            this.textNoSolutionEvent();
        } else {
            //左边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYRight.points()[0]);
            this.innerRect.setAttr('width', this.movelineYLeft.points()[0] - this.movelineYRight.points()[0]);
            this.layer.add(this.innerRect);
            //改变左侧组线段高度
            this.groupBLineToHigh();
            this.movelineXLeft.points()[1] = 263 * innerHeight / 675 - 1.5;
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedTwo();
    }

    //a为小于，b为>时，a,b两个滑杆特殊值判断方法
    specialLimitedTwo() {
        if (((this.symbolLeftIndex !== 3) || (this.symbolRightIndex !== 3))) {
            return;
        }
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) === parseFloat((this.bSliderNum + 4).toFixed(1))) {
            //底部文字改变为无解
            this.textNoSolutionEvent();
            this.bottomFormulaX.setAttr('text', 'x');
            this.bottomFormulaRight.setAttr('visible', true);
            this.symbolRight.setAttr('visible', true);
            this.symbolRight.setAttr('text', '=');
        } else {
            this.symbolRight.setAttr('text', '≥');
        }
    }

    //底部文字改变为无解
    textNoSolutionEvent() {
        this.bottomFormulaLeft.setAttr('visible', false);
        this.bottomFormulaRight.setAttr('visible', false);
        this.symbolLeft.setAttr('visible', false);
        this.symbolRight.setAttr('visible', false);
        this.bottomFormulaX.setAttr('text', this.lang.solution);
        this.bottomFormulaX.setAttr('fontStyle', 'normal');
    }

    //底部公式显示
    textHaveSolutionEvent() {
        this.bottomFormulaLeft.setAttr('visible', true);
        this.bottomFormulaRight.setAttr('visible', true);
        this.symbolLeft.setAttr('visible', true);
        this.symbolRight.setAttr('visible', true);
        this.bottomFormulaX.setAttr('text', 'x');
        this.bottomFormulaX.setAttr('fontStyle', 'italic');
    }

    //右侧文本区域
    initrightGroup() {
        this.groupRight = new Konva.Group();
    }

    //slider控制右侧控制线圆组变化
    moveLengthRight(x: number, y: number) {

        if ((this.symbolLeftIndex === 0 || this.symbolLeftIndex === 2)
            && (this.symbolRightIndex === 0 || this.symbolRightIndex === 2)) {
            this.modelRightOne(x);
        } else if ((this.symbolLeftIndex === 0 || this.symbolLeftIndex === 2)
            && (this.symbolRightIndex === 1 || this.symbolRightIndex === 3)) {
            this.modelRightTwo(x);
        } else if ((this.symbolLeftIndex === 1 || this.symbolLeftIndex === 3)
            && (this.symbolRightIndex === 0 || this.symbolRightIndex === 2)) {
            this.modelRightThree(x);
        } else if ((this.symbolLeftIndex === 1 || this.symbolLeftIndex === 3)
            && (this.symbolRightIndex === 1 || this.symbolRightIndex === 3)) {
            this.modelRightFour(x);
        }
        this.layer.draw();
    }

    //b数值改变，控制右侧线为主动，左侧线为从动
    //a符号为>，b符号为<,方法抽取
    modelRightOne(x: number) {
        this.bSliderNum = parseFloat(x.toFixed(1));
        //右边平行x轴的线长度变化
        this.movelineYRight.setAttr('points', [((14 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            304 * innerWidth / 1200, 263 * innerHeight / 675]);
        this.movelineXRight.points()[1] = 263 * innerHeight / 675 - 1.5;
        //右侧圆形和垂线位置变化
        this.groupRight.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的右边边刻度文字
        this.letRightNumCenter(x);
        this.numbertextRight.text((x + 4.0).toFixed(1).toString());
        this.bottomFormulaRight.text((x + 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) < 0) {
            //右边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYLeft.points()[0]);
            this.innerRect.setAttr('width', this.movelineXRight.points()[0]
                - this.movelineYLeft.points()[0] + x * 26.1 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //改变movelineXLeft线高度复原
            this.groupALineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            this.innerRect.setAttr('x', this.movelineYLeft.points()[0]);
            this.innerRect.setAttr('width', 0);
            this.layer.add(this.innerRect);
            //改变左侧组线段高度
            this.groupALineToLower();
            //改变右侧组线段高度
            this.groupBLineToLower();
            //底部文字改变为无解
            this.textNoSolutionEvent();
        }
        this.specialLimitedOne();
    }

    //a符号为>,b符号为>，方法抽取
    modelRightTwo(x: number) {
        this.bSliderNum = parseFloat(x.toFixed(1));
        //右侧圆形和垂线位置变化
        this.groupRight.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的右边边刻度文字
        this.letRightNumCenter(x);
        this.numbertextRight.text((x + 4.0).toFixed(1).toString());
        this.bottomFormulaRight.text((x + 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (this.movelineXRight.points()[0] - this.movelineYLeft.points()[0] + x * 26.1 * innerWidth / 1200 >= 0) {
            //右边平行x轴的线长度变化
            this.movelineYRight.setAttr('points', [((14 + x) * 26.1 + 338) * innerWidth / 1200, 238 * innerHeight / 675,
                908 * innerWidth / 1200, 238 * innerHeight / 675]);
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupALineToLower();
            //右侧平行x轴的线和垂直x轴的线高度变化
            this.movelineXRight.points()[1] = 238 * innerHeight / 675 - 1.5;
            //右边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYRight.points()[0]);
            this.innerRect.setAttr('width', 908 * innerWidth / 1200 - ((14 + x) * 26.1 + 338) * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            //右边平行x轴的线长度变化
            this.movelineYRight.setAttr('points', [((14 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
                (304 + 604) * innerWidth / 1200, 263 * innerHeight / 675]);
            //右侧平行x轴的线和垂直x轴的线高度变化
            this.movelineXRight.points()[1] = 263 * innerHeight / 675;
            //右边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYLeft.points()[0]);
            this.innerRect.setAttr('width', 908 * innerWidth / 1200 - this.movelineYLeft.points()[0]);
            this.layer.add(this.innerRect);
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupALineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedThree();
    }

    //a符号为<,b符号为<,方法抽取
    modelRightThree(x: number) {
        this.bSliderNum = parseFloat(x.toFixed(1));
        //右边平行x轴的线长度变化
        this.movelineYRight.setAttr('points', [((14 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            304 * innerWidth / 1200, 263 * innerHeight / 675]);
        this.movelineXRight.points()[1] = 263 * innerHeight / 675 - 1.5;
        this.movelineYLeft.points()[2] = 304 * innerWidth / 1200;
        //右侧圆形和垂线位置变化
        this.groupRight.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的右边边刻度文字
        this.letRightNumCenter(x);
        this.numbertextRight.text((x + 4.0).toFixed(1).toString());
        this.bottomFormulaRight.text((x + 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (this.movelineXRight.points()[0] - this.movelineYLeft.points()[0] + x * 26.1 * innerWidth / 1200 >= 0) {
            //右边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', 304 * innerWidth / 1200);
            this.innerRect.setAttr('width', this.movelineYLeft.points()[0] - 304 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //改变movelineXLeft线高度复原
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupALineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        } else {
            this.innerRect.setAttr('x', 304 * innerWidth / 1200);
            this.innerRect.setAttr('width', this.movelineYRight.points()[0] - 304 * innerWidth / 1200);
            this.layer.add(this.innerRect);
            //改变左侧组线段高度
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupALineToLower();
            //改变右侧线组高度
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupBLineToHigh();
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedFour();
    }

    //a符号为<,b符号为>，方法抽取
    modelRightFour(x: number) {
        this.bSliderNum = parseFloat(x.toFixed(1));
        //改变左右两侧平行x轴直线的起始位置
        this.movelineYRight.setAttr('points', [((14 + x) * 26.1 + 338) * innerWidth / 1200, 263 * innerHeight / 675,
            908 * innerWidth / 1200, 263 * innerHeight / 675]);
        //右侧圆形和垂线位置变化
        this.groupRight.setAttr('x', x * 26.1 * innerWidth / 1200);
        //写入实时变化的右边边刻度文字
        this.letRightNumCenter(x);
        this.numbertextRight.text((x + 4.0).toFixed(1).toString());
        this.bottomFormulaRight.text((x + 4.0).toFixed(1).toString());
        //根据重合色块宽度正负以及与0的关系确定色块显示状态
        if (parseFloat((this.aSliderNum - 4).toFixed(1)) - parseFloat((this.bSliderNum + 4).toFixed(1)) <= 0) {
            this.innerRect.setAttr('x', this.movelineYLeft.points()[0]);
            this.innerRect.setAttr('width', 0);
            this.layer.add(this.innerRect);
            this.movelineYLeft.points()[2] = 304 * innerWidth / 1200;
            //改变左侧组线段高度
            //左侧平行x轴的线和垂直x轴的线高度变化
            this.groupALineToLower();
            //改变右侧垂线高度
            this.groupBLineToLower();
            //底部文字改变为无解
            this.textNoSolutionEvent();
        } else {
            //右边垂线点组拖动改变黄色区域
            this.innerRect.setAttr('x', this.movelineYRight.points()[0]);
            this.innerRect.setAttr('width', this.movelineYLeft.points()[0]
                - this.movelineYRight.points()[0]);
            this.layer.add(this.innerRect);
            //改变movelineXLeft线高度复原
            this.groupBLineToHigh();
            this.movelineXLeft.points()[1] = 263 * innerHeight / 675 - 1.5;
            //底部文字显示
            this.textHaveSolutionEvent();
        }
        this.specialLimitedTwo();

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

    //b不等式符号改变事件
    changeSymbolRight(symbolRight: string, symbolRightIndex: number) {
        this.indexSymbolRight = symbolRight;
        this.symbolRightIndex = symbolRightIndex;
        this.symbolRight.text(this.indexSymbolRight);
        //圆心设为实心事件
        switch (this.symbolRightIndex) {
            case 0:
                this.rightmovecircle.setAttr('fill', '#FFFFFF');
                break;
            case  1:
                this.rightmovecircle.setAttr('fill', '#FFFFFF');
                break;
            case  2:
                this.rightmovecircle.setAttr('fill', '#D0021B');
                break;
            case  3:
                this.rightmovecircle.setAttr('fill', '#D0021B');
                break;
        }
        this.layer.draw();
    }

    resize() {
        this.layer.draw();
    }

}
