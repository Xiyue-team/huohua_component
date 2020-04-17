import { TweenMax, Power0, Power2, Power4 } from 'gsap';
import {fabric} from 'fabric';

const slope1 = require('../sub_static/slope1.png');
const slope1_void = require('../sub_static/slope1_void.png');
const slope2 = require('../sub_static/slope2.png');
const slope2_void = require('../sub_static/slope2_void.png');
const slope3 = require('../sub_static/slope3.png');
const slope3_void = require('../sub_static/slope3_void.png');
const slope4 = require('../sub_static/slope4.png');
const slope4_void = require('../sub_static/slope4_void.png');
const slope5 = require('../sub_static/slope5.png');
const slope5_void = require('../sub_static/slope5_void.png');

export class Jlllxsy2dModel {
    private canvas: fabric.StaticCanvas;        // 场景
    private scaleValue = new ScaleValue();      // 场景缩放比例
    private middleX: number;                    // 场景水平中心点的数值
    private middleY: number;                    // 场景竖直中心点的数值
    private slopes: fabric.Image[] = [];        // 实斜坡
    private ball: fabric.Circle;                // 小球
    private ballClick: Boolean = true;          // 小球是否可以点击
    private slopeClick: Boolean = true;         // 斜坡是否可以点击
    private index: Number = 0;                  // 当前显示的实斜坡下标（从0开始）
    private recordBalls: fabric.Circle[] = [];  // 结束位置的记录小球
    private tipsGroup: fabric.Group;            // 提示
    private direction: number;                  // 小球运动方向， 1：从左到右，2：从右到左

    /**
     * 构造函数
     * @param {string} container    载体 html容器id
     * @param {string} canvas       载体 canvas容器id
     */
    constructor(container: string, canvas: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container, canvas);
        this.initLayer();
    }
    
    /**
     * 初始化场景
     * @param container     载体 html容器id
     * @param canvas        载体 canvas容器id
     */
    private initStage(container: string, canvas: string) {
        const dom = document.getElementById(container);
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.canvas = new fabric.Canvas(canvas, {
            selection: false
        });
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.setZoom(this.scaleValue.scale);
        this.middleX = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
    }

    /**
     * 初始化 图层
     */
    private async initLayer() { 
        // 添加基础层 
        this.addBase();
        // 添加虚斜坡
        this.addSlopeVoid(1);
        // 添加提示文字
        this.addTips();
    }

    /**
     * 添加基础层
     */
    addBase() {
        // 添加水平虚线
        const dottedLine = new fabric.Line([0, 0, 940, 0], {
            top: this.middleY - 100,
            left: this.middleX - 470,
            fill: '#979797',
            stroke: '#979797',
            strokeWidth: 4,
            strokeDashArray: [15, 10],
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(dottedLine);

        // 添加地平线
        const groundLine = new fabric.Rect({
            top: this.middleY + 120,
            left: this.middleX - 470,
            width: 940,
            height: 10,
            fill: '#C0C9CE',
            stroke: '#2e4d5c',
            strokeWidth: 2,
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(groundLine);
    }

    /**
     * 添加虚斜坡
     * @param index 表示对应的斜坡，从1开始到5结束
     */
    addSlopeVoid(index: number) {
        const options: any[] = [    // 斜坡参数
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 606,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 728,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 824,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 940,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 940,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            }
        ];
        let slope_void; // 对应的斜坡
        if (index === 1) {
            slope_void = slope1_void;
        } else if (index === 2) {
            slope_void = slope2_void;
        } else if (index === 3) {
            slope_void = slope3_void;
        } else if (index === 4) {
            slope_void = slope4_void;
        } else {
            slope_void = slope5_void;
        }
        fabric.Image.fromURL(slope_void, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            const nextIndex = index + 1; // 下一个斜坡
            if (nextIndex < 6) {
                this.addSlopeVoid(nextIndex);
            }
            if (index === 5) {  // 添加完最后一个虚斜坡后添加实斜坡
                this.addSlope(1);
            }
        }, options[index - 1]);
    }

    /**
     * 添加实斜坡 默认显示第一个
     * @param index 表示对应的斜坡，从1开始到5结束
     */
    addSlope(index: number) {
        const options: any[] = [    // 斜坡参数
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 606,
                height: 240,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 728,
                height: 240,
                visible: false,
                selectable: false,
                hoverCursor: 'default',
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 824,
                height: 240,
                visible: false,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 940,
                height: 240,
                visible: false,
                selectable: false,
                hoverCursor: 'default'
            },
            {
                left: this.middleX - 470,
                top: this.middleY - 120,
                width: 940,
                height: 240,
                visible: false,
                selectable: false,
                hoverCursor: 'default'
            }
        ];
        let slope; // 对应的斜坡
        if (index === 1) {
            slope = slope1;
        } else if (index === 2) {
            slope = slope2;
        } else if (index === 3) {
            slope = slope3;
        } else if (index === 4) {
            slope = slope4;
        } else {
            slope = slope5;
        }
        fabric.Image.fromURL(slope, (oImg: fabric.Image) => {
            this.slopes[index - 1] = oImg;
            this.canvas.add(oImg);
            const nextIndex = index + 1; // 下一个斜坡
            if (nextIndex < 6) {
                this.addSlope(nextIndex);
            }
            if (index === 5) { // 添加完最后一个斜坡后
                // 添加记录层
                this.addRecords();
                // 添加斜坡点击层
                this.addClickSlope();
                // 添加小球
                this.addBall();
            }
        }, options[index - 1]);
    }

    /**
     * 添加小球
     */
    addBall() {
        const ball = new fabric.Circle({
            radius: 15,
            fill: '#d96c00',
            stroke: '#2e4d5c',
            strokeWidth: 5,
            top: this.middleY - 116,
            left: this.middleX - 426,
            selectable: false,
            hoverCursor: 'pointer'
        });
        ball.on('mousedown', () => {
            if (!this.ballClick) {  // 当小球不可点击时，结束函数
                return false;
            }
            this.ballClick = false;
            this.slopeClick = false;
            if (this.tipsGroup.visible) {
                this.tipsGroup.visible = false; // 隐藏提示
            }
            this.direction = 1;
            this.ballMove(1);
        });
        this.ball = ball;
        this.canvas.add(ball);
    }

    /**
     * 添加记录层
     */
    addRecords() {
        // 添加起始位置记录小球
        const recordStartBall = new fabric.Circle({
            radius: 15,
            fill: '#FACECC',
            stroke: '#C0C9CE',
            strokeWidth: 5,
            top: this.middleY - 116,
            left: this.middleX - 426,
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(recordStartBall);
        // 添加结束位置记录小球
        const records: any[] = [
            [this.middleY - 116, this.middleX + 60],
            [this.middleY - 116, this.middleX + 159],
            [this.middleY - 116, this.middleX + 260],
            [this.middleY - 116, this.middleX + 360]
        ];
        for (let i = 0; i < records.length; i++) {
            const recordBall = new fabric.Circle({
                radius: 15,
                fill: '#FACECC',
                stroke: '#C0C9CE',
                strokeWidth: 5,
                top: records[i][0],
                left: records[i][1],
                selectable: false,
                visible: false,
                hoverCursor: 'default'
            });
            this.recordBalls.push(recordBall);
            this.canvas.add(recordBall);
        }
    }

    /**
     * 添加斜坡点击层
     */
    addClickSlope() {
        const attribute = [ // 点击的遮罩层的属性
            {
                top: this.middleY + 120,
                left: this.middleX - 148 ,
                width: 365,
                angle: -41
            },
            {
                top: this.middleY + 120,
                left: this.middleX - 165,
                width: 478,
                angle: -30
            },
            {
                top: this.middleY + 120,
                left: this.middleX - 194,
                width: 590,
                angle: -23
            },
            {
                top: this.middleY + 120,
                left: this.middleX - 199,
                width: 700,
                angle: -19
            },
            {
                top: this.middleY + 105,
                left: this.middleX - 199,
                width: 670,
                angle: 0
            }
        ];
        for (let i = 0; i < attribute.length; i++) {     
            const slopeClick = new fabric.Rect({
                top: attribute[i].top,
                left: attribute[i].left,
                width: attribute[i].width,
                height: 15,
                fill: 'red',
                selectable: false,
                angle: attribute[i].angle,
                opacity: 0,
                hoverCursor: 'pointer'
            });
            this.canvas.add(slopeClick);
            slopeClick.on({
                'mousedown': () => {
                    if (this.slopeClick) {
                        if (this.tipsGroup.visible) {
                            this.tipsGroup.visible = false; // 隐藏提示
                        }
                        // 结束动画
                        TweenMax.killAll();
                        // 重置小球位置
                        this.ball.opacity = 1;
                        this.ball.top = this.middleY - 116;
                        this.ball.left = this.middleX - 426;
                        this.ballClick = true;
                        this.showSlope(i);
                    }
                }
            });
        }
    }

    /**
     * 添加提示文字
     */
    addTips() {
        const tips1 = new fabric.Text(window.env.browserInfo.lang.tips1, {
            top: this.middleY - 160,
            left: this.middleX - 470,
            fontSize: 20,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false,
            hoverCursor: 'default'
        });
        const tips2 = new fabric.Text(window.env.browserInfo.lang.tips2, {
            top: this.middleY - 160,
            left: this.middleX + 180,
            fontSize: 20,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false,
            hoverCursor: 'default'
        });
        const tips3 = new fabric.Text(window.env.browserInfo.lang.tips3, {
            top: this.middleY + 180,
            left: this.middleX - 120,
            fontSize: 20,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false,
            hoverCursor: 'default'
        });
        this.tipsGroup = new fabric.Group([ tips1, tips2 ], {
            top: this.middleY - 160,
            left: this.middleX - 470,
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(tips3);
        this.canvas.add(this.tipsGroup);
    }

    /**
     * 显示第index个斜坡
     * @param index 
     */
    showSlope(index: number) {
        this.index = index;
        const recordBall =  this.recordBalls[index];
        if (index !== 4) {
            if (recordBall.opacity === 1) {
                // 如果对应的记录小球存在，则隐藏
                recordBall.visible = false;
            }
        }
        this.slopes.forEach((slope: fabric.Image, i: number) => {
            if (i === index) {
                slope.visible = true;
            } else {
                slope.visible = false;
            }
        });
    }

    /**
     * 小球动画
     * @param step  步骤 从0开始，对应小球在各个斜坡的运动轨迹的位置，0表示小球的初始位置
     */
    ballMove(step: number) {
        const trajectorys: any [] = [   // 小球在各个斜坡的运动轨迹
            [
                [this.middleY - 116, this.middleX - 426],   // 0
                [this.middleY + 60, this.middleX - 220],    // 1
                [this.middleY + 65 , this.middleX - 210],   // 2
                [this.middleY + 70, this.middleX - 180],    // 3
                [this.middleY + 68, this.middleX - 160],    // 4
                [this.middleY + 60, this.middleX - 145],    // 5
                [this.middleY - 116, this.middleX + 60]     // 6
            ],
            [
                [this.middleY - 116, this.middleX - 426],
                [this.middleY + 60, this.middleX - 220],
                [this.middleY + 65 , this.middleX - 210],
                [this.middleY + 70, this.middleX - 180],
                [this.middleY + 65 , this.middleX - 160],
                [this.middleY + 60, this.middleX - 145],
                [this.middleY - 116, this.middleX + 159]
            ],
            [
                [this.middleY - 116, this.middleX - 426],
                [this.middleY + 60, this.middleX - 220],
                [this.middleY + 65 , this.middleX - 210],
                [this.middleY + 70, this.middleX - 180],
                [this.middleY + 65 , this.middleX - 160],
                [this.middleY + 60, this.middleX - 145],
                [this.middleY - 116, this.middleX + 260]
            ],
            [
                [this.middleY - 116, this.middleX - 426],
                [this.middleY + 60, this.middleX - 220],
                [this.middleY + 65 , this.middleX - 210],
                [this.middleY + 70, this.middleX - 180],
                [this.middleY + 65 , this.middleX - 160],
                [this.middleY + 60, this.middleX - 145],
                [this.middleY - 116, this.middleX + 360]
            ],
            [
                [this.middleY - 116, this.middleX - 426],
                [this.middleY + 60, this.middleX - 220],
                [this.middleY + 65 , this.middleX - 210],
                [this.middleY + 70, this.middleX - 180],
                [this.middleY + 70, this.middleX + 460]
            ]
        ];
        const trajectory: any[] = trajectorys[Number(this.index)];   // 小球运动轨迹
        const onUpdate = this.canvas.renderAll.bind(this.canvas);
        if (this.index !== 4) {
            let time: number; // 小球运动时间
            let ease;   // 小球运动方式
            if (step === 1) {
                time = this.direction === 1 ? 1 : 0.03;
                ease = this.direction === 1 ? Power2.easeIn : Power0.easeOut;
            } else if (step === 2) {
                time = 0.03;
                ease = Power0.easeOut;
            } else if (step === 3) {
                time = 0.03;
                ease = this.direction === 1 ? Power0.easeOut : Power0.easeIn;
            } else if (step === 4) {
                time = 0.03;
                ease = Power0.easeIn;
            } else if (step === 5) {
                time = this.direction === 1 ? 0.03 : 1;
                ease = this.direction === 1 ? Power0.easeIn : Power2.easeIn;
            }  else if (step === 6) {
                time = 1;
                ease = Power2.easeOut;
            } else {
                time = 1;
                ease = Power2.easeOut;
            }
            TweenMax.to(this.ball, time, {
                top: trajectory[step][0],
                left: trajectory[step][1],
                ease,
                onUpdate,
                onComplete: () => {
                    const nextStep = step + this.direction;
                    if (nextStep === 6) {
                        this.direction = -1;
                    }
                    if (nextStep === 0) {
                        this.direction = 1;
                    }
                    if (step === 0) {
                        //删除所有动画
                        TweenMax.killAll();
                    }
                    if (step === 6) { // 当小球到达最高点
                        if (!this.slopeClick) {
                            this.slopeClick = true; // 斜坡可点击
                        }
                        const recordBall = this.recordBalls[Number(this.index)];
                        if (!recordBall.visible) {
                            recordBall.visible = true; // 显示对应记录小球
                        }
                    }
                    this.ballMove(nextStep);
                }
            });
        } else {
            let time: number; // 小球运动时间
            let ease;   // 小球运动方式
            if (step === 1) {
                time = 1;
                ease = Power2.easeIn;
            } else if (step === 2 || step === 3) {
                time = 0.03;
                ease = Power0.easeOut;
            } else {
                time = 1;
                ease = Power0.easeIn;
            }
            TweenMax.to(this.ball, time, {
                top: trajectory[step][0],
                left: trajectory[step][1],
                ease,
                onUpdate,
                onComplete: () => {
                    const nextStep = step + this.direction;
                    if (step === 4) {
                        TweenMax.killAll(); //删除所有
                        this.ball.opacity = 0;
                        this.canvas.renderAll();
                        this.slopeClick = true;
                    }
                    if (nextStep < 5) {
                        this.ballMove(nextStep);
                    }
                }
            });
        }
    }
    
    /**
     * 重置
     */
    reset() {
        // 结束动画
        TweenMax.killAll();
        // 重置小球位置
        this.ball.opacity = 1;
        this.ball.top = this.middleY - 116;
        this.ball.left = this.middleX - 426;
        this.ballClick = true;
        this.slopeClick = true;
        this.tipsGroup.visible = true; // 显示提示
        this.recordBalls.forEach(recordBall => {
            recordBall.visible = false;
        }); // 隐藏记录小球
        this.showSlope(0);
        this.canvas.renderAll();
    }
}

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
