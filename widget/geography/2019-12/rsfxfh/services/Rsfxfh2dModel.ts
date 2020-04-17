import { TweenMax } from 'gsap';
import {fabric} from 'fabric';

const northMarkPng = require('../sub_static/northMark.png');
const pointerPng = require('../sub_static/pointer.png');
const turntablePng = require('../sub_static/turntable.png');
const answerPng = require('../sub_static/Answer.png');

export class Rsfxfh2dModel {
    private canvas: fabric.Canvas;                      // 场景
    private middleX: number;                            // 场景水平中心点的数值
    private middleY: number;                            // 场景竖直中心点的数值
    private windPole: fabric.Rect;                      // 风杆
    private windPoleButton: fabric.Circle;              // 风杆按钮
    private windPoleButtonHot: fabric.Circle;           // 风杆按钮热点区域
    private windFlag: fabric.Path;                      // 风旗
    private windFlagButton: fabric.Circle;              // 风旗按钮
    private windFlagButtonHot: fabric.Circle;           // 风旗按钮热点区域
    private windTail: fabric.Rect;                      // 风尾
    private windTailButton: fabric.Circle;              // 风尾按钮
    private windTailButtonHot: fabric.Circle;           // 风尾按钮热点区域
    private windSymbol: any[];                          // 风向符号数组
    private windSymbolButton: fabric.Circle[];          // 风向符号按钮数组
    private windSymbolTipBackground: fabric.Rect;       // 风向符号说明背景
    private windSymbolTipText: fabric.Text;             // 风向符号说明文字

    private windDirectionTextArr: string[] = [];        // 风向文字数组
    private windPowerArr = [4, 8, 6, 10, 2, 12, 5, 7];  // 风力量文字数组
    private northMark: fabric.Image;                    // 北方标示
    private answerButton: fabric.Image;                 // 答案按钮
    private turntable: fabric.Image;                    // 风力转盘
    private pointer: fabric.Image;                      // 指针
    private pointerCircle: fabric.Circle;               // 指针中心原地
    private windDirection: number;                      // 风向
    private windPower: number;                          // 风力
    private isPracticeView = false;                     // 是否练习试图

    private practiceTipText: fabric.Text;               // 练一练提示

    private answerBackground: fabric.Rect;              // 风向符号说明背景
    private answerTipText: fabric.Text;                 // 风向符号说明文字
    private answerText: fabric.Text;                    // 风向符号说明文字
    
    /**
     * 场景缩放比例
     */
    private scaleValue = new ScaleValue();
    /**
     * 构造函数
     * @param {string} container 载体 html容器id
     */
    constructor(container: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container);
        this.initWindSymbolAndExplainButton();
        this.initWindSymbolTip();
        this.initNorthMark();
        this.initAnswerButton();
        this.initAnswer();
        this.initTurntable();
        this.initPointer();
        this.initPracticeTip();
        this.windDirectionTextArr = window.env.browserInfo.lang.windDirection;
    }

    /**
     * 初始化场景
     */
    private initStage(container: string) {
        this.canvas = new fabric.Canvas(container, {selection: false, preserveObjectStacking: true});
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);
        this.middleX = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
    }

    private initPracticeTip() {
        this.practiceTipText = new fabric.Text(window.env.browserInfo.lang.practiceTipText, {
            top: this.middleY * 2 - 60,
            fontSize: 24,
            selectable: false,
            fill: '#FFFFFF',
            visible: false
        });
        this.practiceTipText.left = this.middleX - this.practiceTipText.width / 2;
        this.canvas.add(this.practiceTipText);
    }

    /**
     * 初始化风向符号和说明按钮
     */
    private initWindSymbolAndExplainButton() {
        const btnConf = {
            fill: '#FFFFFF',
            stroke: '#ECECEC',
            strokeWidth: 3,
            radius: 15,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hasRotatingPoint: false
        };
        const btnHotConf = {
            fill: 'rgba(0,0,0,0)',
            radius: 30,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hasRotatingPoint: false,
            hoverCursor: 'pointer'
        };
        this.windPole = new fabric.Rect({
            width: 36, 
            height: 560, 
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
            selectable: false,
            left: this.middleX - 140,
            top: this.middleY - 280
        });

        this.windPoleButton = new fabric.Circle(Object.assign({}, btnConf, {
            left: this.middleX - 138,
            top: this.middleY
        }));

        this.windPoleButtonHot = new fabric.Circle(Object.assign({}, btnHotConf, {
            left: this.middleX - 153,
            top: this.middleY - 15
        }));

        this.windPoleButtonHot.on('mousedown', () => {
            this.visibleWindSymbolTip(window.env.browserInfo.lang.tip.windPole);
            this.windSymbolExplainButtonClick(this.windPoleButton, this.windPoleButtonHot, this.windPole);
        });

        this.windFlag = new fabric.Path('M 9 3 L 235 94 C 240 98 240 101 235 105 L 9 196 C 4 198 0 195 0 190 L 0 10 C 0 5 4 1 9 3 Z', {
            width: 200, 
            height: 240, 
            fill: '#FFFFFF',
            shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
            selectable: false,
            left: this.middleX - 100,
            top : this.middleY - 280 + 4,
        });
        this.windFlagButton = new fabric.Circle(Object.assign({}, btnConf, {
            left: this.middleX - 24,
            top : this.middleY - 194
        }));
        this.windFlagButtonHot = new fabric.Circle(Object.assign({}, btnHotConf, {
            left: this.middleX - 39,
            top : this.middleY - 209
        }));
        this.windFlagButtonHot.on('mousedown', () => {
            this.visibleWindSymbolTip(window.env.browserInfo.lang.tip.windFlag);
            this.windSymbolExplainButtonClick(this.windFlagButton, this.windFlagButtonHot, this.windFlag);
        });

        this.windTail = new fabric.Rect({
            width: 240, 
            height: 36, 
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
            selectable: false,
            left: this.middleX - 100,
            top: this.middleY - 45
        });

        this.windTailButton = new fabric.Circle(Object.assign({}, btnConf, {
            left: this.middleX + 5,
            top: this.middleY - 43
        }));
        this.windTailButtonHot = new fabric.Circle(Object.assign({}, btnHotConf, {
            left: this.middleX - 10,
            top: this.middleY - 58
        }));
        this.windTailButtonHot.on('mousedown', () => {
            this.visibleWindSymbolTip(window.env.browserInfo.lang.tip.windTail);
            this.windSymbolExplainButtonClick(this.windTailButton, this.windTailButtonHot, this.windTail);
        });
        this.windSymbol = [this.windPole, this.windFlag, this.windTail];
        this.windSymbolButton = [this.windPoleButton, this.windPoleButtonHot,
             this.windFlagButton, this.windFlagButtonHot, this.windTailButton, this.windTailButtonHot];
        this.canvas.add(...this.windSymbol, ...this.windSymbolButton);
    }

    /**
     * 初始化风向符号说明
     */
    private initWindSymbolTip() {
        this.windSymbolTipBackground = new fabric.Rect({
            width: 256, 
            height: 148, 
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
            selectable: false,
            left: this.canvas.getWidth() / this.scaleValue.scale - 316,
            top: this.middleY - 124,
            visible: false
        });
        this.windSymbolTipText = new fabric.Text('', {
            left: this.windSymbolTipBackground.left + 20,
            top: 40,
            fontSize: 24,
            lineHeight: 1.5,
            textAlign: 'left',
            selectable: false,
            fill: '#333333',
            visible: false
        });
        this.canvas.add(this.windSymbolTipBackground, this.windSymbolTipText);
    }

    private visibleWindSymbolTip(text: string) {
        this.windSymbolTipText.set('text', text);
        // 计算文字高度和文字背景高度 ，距离顶部位置
        const textTop = this.middleY - this.windSymbolTipText.height / 2;
        this.windSymbolTipText.set('top', textTop);
        this.windSymbolTipBackground.set('top', textTop - 20);
        this.windSymbolTipBackground.set('height', this.windSymbolTipText.height + 40);
        this.windSymbolTipText.visible = true;
        this.windSymbolTipBackground.visible = true;
    }

    /**
     * 风向符号说明按钮点击
     * @param event 
     * @param windSymbol 
     */
    private windSymbolExplainButtonClick(button?: fabric.Circle, buttonHot?: fabric.Circle, windSymbol?: fabric.Rect | fabric.Path) {
        this.windSymbolButton.forEach(btn => {
            if (btn === button || btn === buttonHot) {
                btn.visible = false;
            } else {
                btn.visible = true;
            }
        });
        this.windSymbol.forEach(ws => {
            if (ws === windSymbol) {
                ws.set('fill', '#18A2FF');
            } else {
                ws.set('fill', '#FFFFFF');
            }
        });
        this.canvas.renderAll();
    }

    /**
     * 初始化指北针
     */
    private initNorthMark() {
        fabric.Image.fromURL(northMarkPng, (image: fabric.Image) => {
            this.northMark = image;
            this.canvas.add(image);
        }, {
            top: 130,
            left: this.canvas.getWidth() / this.scaleValue.scale - 114,
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            visible: false
        });
    }

    /**
     * 初始化答案按钮
     */
    private initAnswerButton() {
        fabric.Image.fromURL(answerPng, (image: fabric.Image) => {
            this.answerButton = image;
            
            this.answerButton.on('mousedown', () => {
                this.showAnswer();
            });
            this.canvas.add(image);
        }, {
            top: this.middleY - 28,
            left: this.canvas.getWidth() / this.scaleValue.scale - 88,
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            hoverCursor: 'pointer',
            visible: false
        });
    }

    private initAnswer() {
        this.answerBackground = new fabric.Rect({
            width: 188, 
            height: 148, 
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
            selectable: false,
            left: this.canvas.getWidth() / this.scaleValue.scale - 248,
            top: this.middleY - 124,
            visible: false
        });
        const textConf = {
            left: this.answerBackground.left + 20,
            top: this.answerBackground.top + 20,
            fontSize: 24,
            lineHeight: 1.5,
            textAlign: 'left',
            selectable: false,
            fill: '#333333',
            visible: false
        };
        this.answerTipText = new fabric.Text(window.env.browserInfo.lang.windPower, textConf);
        this.answerText = new fabric.Text('西北风12级。', Object.assign({}, textConf, {
            top: this.answerBackground.top + 98,
            fill: '#FF0000' 
        }));
        this.canvas.add(this.answerBackground, this.answerTipText, this.answerText);
    }

    /**
     * 显示答案
     */
    private showAnswer() {
        this.answerBackground.visible = true;
        this.answerTipText.visible = true;
        let diff = this.windDirection - this.windPower;
        if (diff < 0) {
            diff = diff + 8;
        }

        this.answerText.text = this.windDirectionTextArr[this.windDirection] 
            + this.windPowerArr[diff] + '级。';
        this.answerText.visible = true;
        this.answerButton.visible = false;
        this.canvas.renderAll();
    }

    /**
     * 隐藏答案
     */
    private hideAnswer() {
        this.answerBackground.visible = false;
        this.answerTipText.visible = false;
        this.answerText.visible = false;
        this.answerButton.visible = true;
        this.canvas.renderAll();
    }

    /**
     * 初始化风力转盘
     */
    private initTurntable() {
        fabric.Image.fromURL(turntablePng, (image: fabric.Image) => {
            this.turntable = image;
            this.canvas.add(image);
        }, {
            top: this.middleY,
            left: this.middleX,
            selectable: false,
            scaleX: 0.48,
            scaleY: 0.48,
            originX: 'center', 
            originY: 'center',
            visible: false
        });
    }

    /**
     * 初始化指针
     */
    private initPointer() {
        fabric.Image.fromURL(pointerPng, (image: fabric.Image) => {
            this.pointer = image;
            this.pointerCircle = new fabric.Circle({
                left: this.middleX - 10,
                top: this.middleY - 10,
                fill: '#FFFFFF',
                radius: 9,
                hasControls: false,
                hasBorders: false,
                hasRotatingPoint: false,
                visible: false
            });
            this.canvas.add(image, this.pointerCircle);
        }, {
            top: this.middleY,
            left: this.middleX,
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            originX: 'center', 
            originY: 'bottom',
            visible: false
        });
    }
    

    /**
     * 隐藏风旗符号
     */
    private hideWindSymbol() {
        this.windSymbolButton.forEach(btn => {
            btn.visible = false;
        });
        this.windSymbol.forEach(ws => {
            ws.visible = false;
        });
        
        this.windSymbolTipText.visible = false;
        this.windSymbolTipBackground.visible = false;
        this.canvas.renderAll();
    }


    /**
     * 显示风旗符号
     */
    private showWindSymbol() {
        this.windSymbolButton.forEach(btn => {
            btn.visible = true;
        });
        this.windSymbol.forEach(ws => {
            ws.visible = true;
        });
        
        this.windSymbolTipText.visible = false;
        this.windSymbolTipBackground.visible = false;
        this.canvas.renderAll();
    }


    /**
     * 显示风旗符号练习相关
     * 
     */
    private showPractice() {
        this.answerButton.visible = true;
        this.northMark.visible = true;
        this.turntable.visible = true;
        this.pointer.visible = true;
        this.pointerCircle.visible = true;
        this.canvas.renderAll();
    }
      
    /**
     * 隐藏风旗符号练习相关
     */
    private hidePractice() {
        this.answerButton.visible = false;
        this.northMark.visible = false;
        this.turntable.visible = false;
        this.pointer.visible = false;
        this.pointerCircle.visible = false;
        this.canvas.renderAll();
    }

    /**
     * 练习
     */
    practice() {
        if (!this.isPracticeView) {
            this.hideWindSymbol();
            this.showPractice();
            this.isPracticeView = true;
            this.practiceTipText.visible = true;
        }
        this.hideAnswer();
        
        this.windDirection = parseInt((Math.random() * 8).toString());
        TweenMax.to(this.pointer, 0.5, {
            angle: 45 * this.windDirection,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });

        this.windPower = parseInt((Math.random() * 8).toString());
        TweenMax.to(this.turntable, 0.5, {
            angle: 45 * this.windPower,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }

    /**
     * 重置场景
     */
    reset() {
        this.windSymbolTipText.visible = false;
        this.windSymbolTipBackground.visible = false;
        this.windSymbolExplainButtonClick();
        this.showWindSymbol();
        this.hidePractice();
        this.isPracticeView = false;
        this.hideAnswer();
        this.answerButton.visible = false;
        this.practiceTipText.visible = false;
        this.canvas.renderAll();
    }
    /**
     * 窗口重置
     */
    resize() {
        //设置 canvas相关参数
        this.scaleValue = new ScaleValue();
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setZoom(this.scaleValue.scale);
        const middleX = this.middleX;
        const middleY = this.middleY;
        this.middleX = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
        // 设置对象新位置
        this.canvas.getObjects().forEach(obj => {
            obj.left = obj.left - middleX + this.middleX;
            obj.top = obj.top - middleY + this.middleY;
            obj.setCoords();
        });
        this.practiceTipText.top = this.canvas.getHeight() / this.scaleValue.scale - 60;
        this.practiceTipText.setCoords();
        this.answerButton.left = this.canvas.getWidth() / this.scaleValue.scale - 88;
        this.answerButton.setCoords();
        this.answerBackground.left = this.canvas.getWidth() / this.scaleValue.scale - 248;
        this.answerBackground.setCoords();
        this.answerTipText.left = this.answerBackground.left + 20;
        this.answerTipText.setCoords();
        this.answerText.left = this.answerBackground.left + 20;
        this.answerText.setCoords();
        this.northMark.left = this.canvas.getWidth() / this.scaleValue.scale - 114;
        this.northMark.setCoords();
        this.windSymbolTipBackground.left = this.canvas.getWidth() / this.scaleValue.scale - 316;
        this.windSymbolTipBackground.setCoords();
        this.windSymbolTipText.left = this.windSymbolTipBackground.left + 20;
        this.windSymbolTipText.setCoords();
        this.canvas.renderAll();
    }
}



/**
 * 计算缩放比例
 */
export class ScaleValue {
    public scale: number;
    constructor() {
        const ratio = window.innerWidth / window.innerHeight;
        this.scale = window.innerWidth / 1200;
        if (ratio > (16 / 9)) {
            this.scale = (window.innerHeight * 16 / 9) / 1200;
        }
    }
}
