import { TweenMax, Power0, Power1, Power2, Power3, Power4 } from 'gsap';
import {fabric} from 'fabric';

const landslide = require('../sub_static/landslide.png');
const ball = require('../sub_static/ball.png');
const box = require('../sub_static/box.png');

export class Dnyxys2dModel {
    private canvas: fabric.StaticCanvas;        // 场景
    private scaleValue = new ScaleValue();      // 场景缩放比例
    private middleX: number;                    // 场景水平中心点的数值
    private middleY: number;                    // 场景竖直中心点的数值
    private box: fabric.Image;                  // 箱子
    private ball: fabric.Image;                 // 小球
    private boxEndLoc: any = {                  // 箱子结束的位置
        5: [-80, -55, -30, -5, 20, 45, 70, 95, 120, 145],
        10: [-55, -5, 45, 95, 145, 195, 245, 295, 345, 395]
    };
    private ballEndLoc: any = {                 // 小球结束的位置
        5: [-115, -90, -65, -40, -15, 10, 35, 60, 85, 110],
        10: [-90, -40, 10, 60, 110, 160, 210, 260, 310, 360]
    };
    private ballStartLoc: any[] = [             // 小球开始的位置
        [-285, 10], [-300, -5], [-315, -20], [-330, -35], [-345, -50], [-360, -68], [-375, -85], [-390, -100], [-405, -115], [-420, -130]
    ];
    private kg: any = 10;                       // 小球的质量
    private height: any = 3;                    // 小球的高度
    private tipsGroup: fabric.Group[] = [];          // 提示组
    
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
    private initLayer() {
        // 添加斜坡
        fabric.Image.fromURL(landslide, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 添加箱子
            fabric.Image.fromURL(box, (boxImg: fabric.Image) => {
                this.box = boxImg;
                this.canvas.add(boxImg);
                // 添加小球
                fabric.Image.fromURL(ball, (ballImg: fabric.Image) => {
                    this.ball = ballImg;
                    this.canvas.add(ballImg);
                }, {
                    left: this.middleX - 315,
                    top: this.middleY - 20,
                    width: 48,
                    height: 48,
                    selectable: false
                });
            }, {
                left: this.middleX - 150, 
                top: this.middleY + 20,
                width: 80,
                height: 70,
                selectable: false
            });
            // 添加高度提示组，默认显示第3个
            const tipsLength: number[] = [            // 提示竖线的长度
                10, 20, 27, 33, 42, 48, 57, 65, 73, 81
            ];
            const tipsLoc: any[] = [                  // 提示的位置
                [78, -293], [60, -308], [45, -325], [32, -338], [13, -352], [2, -368], [-16, -383], [-32, -398], [-48, -413], [-64, -428]
            ];
            for (let i = 0; i < tipsLength.length; i++) {
                const topLine = new fabric.Rect({
                    left: 30,
                    top: 0,
                    width: 3,
                    height: tipsLength[i],
                    fill: '#525252',
                    strokeWidth: 0,
                    selectable: false
                });
                const tipsText = new fabric.Text(`h = ${i + 1}m`, {
                    top: tipsLength[i] + 5,
                    left: 0,
                    fontSize: 20,
                    fontFamily: 'SourceHanSansSC-Medium',
                    fill: '#525252',
                    selectable: false
                });
                const bottomLine = new fabric.Rect({
                    left: 30,
                    top: tipsLength[i] + tipsText.height + 10,
                    width: 3,
                    height: tipsLength[i],
                    fill: '#525252',
                    strokeWidth: 0,
                    selectable: false
                });
                const tipsGroup = new fabric.Group([ topLine, tipsText, bottomLine ], {
                    left: this.middleX + tipsLoc[i][1],
                    top: this.middleY + tipsLoc[i][0],
                    selectable: false,
                    opacity: 0
                });
                if (i === 2) {
                    tipsGroup.set('opacity', 1);
                }
                this.tipsGroup.push(tipsGroup);
                this.canvas.add(tipsGroup);
            }
        }, {
            left: this.middleX - 480,
            top: this.middleY - 130,
            width: 960,
            height: 260,
            selectable: false
        });
    }

    /**
     * 改变重量
     * @param kg    重量 
     * @param sDis  是否已经演示
     */
    kilogramChange(kg: Number, sDis: boolean) {
        this.kg = Number(kg);
        if (sDis) {
            // 演示过后
            const height = this.height;
            const ballStartLoc = this.ballStartLoc;
            const positon: number[] = ballStartLoc[Number(height) - 1];
            // 设置小球位置
            this.ball.set('left', this.middleX + positon[0]);
            this.ball.set('top', this.middleY + positon[1]);
            // 设置箱子位置
            this.box.set('left', this.middleX - 150);
        }
        this.canvas.renderAll();
    }

    /**
     * 改变高度
     * @param height    高度
     * @param sDis      是否已经演示
     */
    heightChange(height: any, sDis: boolean) {
        this.height = Number(height);
        const ballStartLoc = this.ballStartLoc;
        const positon: number[] = ballStartLoc[Number(height) - 1];
        // 设置小球位置
        this.ball.set('left', this.middleX + positon[0]);
        this.ball.set('top', this.middleY + positon[1]);
        // 显示对应的提示
        this.tipsGroup.forEach(tipsGroup => {
            tipsGroup.set('opacity', 0);
        });
        this.tipsGroup[Number(height) - 1].set('opacity', 1);
        if (sDis) {
            // 演示过后
            // 设置箱子位置
            this.box.set('left', this.middleX - 150);
        }
        this.canvas.renderAll();
    }

    /**
     * 开始演示
     */
    start() {
        const height: number = this.height;             // 获取高度
        const kg: number = this.kg;                     // 获取重量
        const ballDownTime = height * (kg === 5 ? 0.08 : 0.07) + 0.5; // 小球下滑时间
        const toBoxTime = 0.3 - height * (kg === 5 ? 0.01 : 0.02); // 获取小球碰到箱子前运动结束时间
        const endTime = height * (kg === 5 ? 0.8 : 0.7) + 0.5; // 获取小球碰到箱子后运动结束时间
        const ballEndLoc: number = this.ballEndLoc[kg][height - 1]; // 小球结束位置
        const boxEndLoc: number = this.boxEndLoc[kg][height - 1];   // 箱子结束位置
        TweenMax.to(this.ball, ballDownTime, {  // 小球下滑到水平面的动画
            left: this.middleX - 245,
            top: this.middleY + 42,
            ease: Power2.easeIn,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                TweenMax.to(this.ball, toBoxTime, { // 小球碰到箱子前的动画
                    left: this.middleX - 185,
                    ease: Power0.easeIn,
                    onUpdate: this.canvas.renderAll.bind(this.canvas),
                    onComplete: () => {
                        TweenMax.to(this.ball, endTime, {   // 小球碰到箱子后小球的动画
                            left: this.middleX + ballEndLoc,
                            ease: Power2.easeOut,
                            onUpdate: this.canvas.renderAll.bind(this.canvas)
                        });
                        TweenMax.to(this.box, endTime, {    // 小球碰到箱子后箱子的动画
                            left: this.middleX + boxEndLoc,
                            ease: Power2.easeOut,
                            onUpdate: this.canvas.renderAll.bind(this.canvas)
                        });
                    }
                });
            }
        });
    }

    /**
     * 重置状态
     * @param sDis 是否已经演示
     */
    resetStatus(sDis: boolean): void {
        if (sDis) {
            // 已经演示过后
            const height = this.height;
            const ballStartLoc = this.ballStartLoc;
            const positon: number[] = ballStartLoc[Number(height) - 1];
            console.log(positon);
            // 设置小球位置
            this.ball.set('left', this.middleX + positon[0]);
            this.ball.set('top', this.middleY + positon[1]);
            // 设置箱子位置
            this.box.set('left', this.middleX - 150);
        }
        this.canvas.renderAll();
    }

    /**
     * 重置
     */
    reset() {
        // 重置高度和质量
        this.height = 3;
        this.kg = 10;
        const scale: number = this.scaleValue.scale;    // 缩放比例
        // 结束动画
        TweenMax.killAll();
        // 重置小球和箱子的位置
        const ballStartLoc = this.ballStartLoc;
        const positon: number[] = ballStartLoc[2];
        // 设置小球位置
        this.ball.set('left', this.middleX + positon[0]);
        this.ball.set('top', this.middleY + positon[1]);
        // 设置箱子位置
        this.box.set('left', this.middleX - 150);
        this.canvas.renderAll();
    }

}

export class ScaleValue {
    public scale: number;
    constructor() {
        if (window.innerWidth > 1024) {
            this.scale = window.innerWidth / 1366 * 0.9;
        } else {
            this.scale = window.innerHeight / window.innerWidth * 0.8;
        }
    }
}
