import { ViewModel } from './../../../r3/csd/ViewModel';
import { TweenMax, Linear, TimelineMax } from 'gsap';
import {fabric} from 'fabric';

const dashboardSrc = require('../sub_static/dashboard.png');
const northSrc = require('../sub_static/north.png');
const southSrc = require('../sub_static/south.png');
const pointerSrc = require('../sub_static/pointer.png');
const semicircleSrc = require('../sub_static/semicircle.png');
const poleSrc = require('../sub_static/pole.png');

export class Csd2dModel {
    private canvas: fabric.StaticCanvas;        // 场景
    private scaleValue = new ScaleValue();      // 场景缩放比例
    private top: number;                        // 顶部距离
    private left: number;                       // 左侧距离
    private dashboard: fabric.Image;              // 仪表盘
    private pointer: fabric.Image;              // 指针
    private pole: fabric.Image;                 // 导体杆
    private nort: fabric.Image;                 // N极
    private south: fabric.Image;                // S极
    private wireway1: fabric.Path;              // 导线1
    private wireway2: fabric.Path;              // 导线2
    private speed = 100;                        // 移动速度
    private poleMoveRange: {
        xMin: number,
        yMin: number,
        xMax: number,
        yMax: number
    };
    private arrows: fabric.Triangle[] = []; // 记录导线上的箭头，方便清除
    /**
     * 构造函数
     * @param {string} canvas       载体 canvas容器id
     */
    constructor(canvas: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(canvas);
    }
    
    /**
     * 初始化场景
     * @param canvas        载体 canvas容器id
     */
    private initStage(canvas: string) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.canvas = new fabric.StaticCanvas(canvas);
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.setZoom(this.scaleValue.scale);

        this.left  = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.top  = this.canvas.getHeight() / this.scaleValue.scale / 2  - 268.5 ;
        // 初始化杆子移动范围
        this.poleMoveRange = {
            xMin: this.left - 470 / 2 - 70,
            yMin: this.top + 263,
            xMax: this.left - 470 / 2 + 125,
            yMax: this.top + 263 + 90
        };

        this.initDashboard();
        this.initMagnetAndPole();
    }

    /**
     * 初始化面板
     */
    private initDashboard() {
        // 创建仪表背景图片
        fabric.Image.fromURL(dashboardSrc, (img: fabric.Image) => {
            this.dashboard = img;
            this.canvas.add(this.dashboard);
            this.initWireway();
            this.initSemicircleAndPoint();
        }, {
            left: this.left - 381 / 2,
            top: this.top,
            width: 762,
            height: 456,
            scaleX: 0.5,
            scaleY: 0.5
        });
    }
    // 初始化导线
    private initWireway() {
        const path1 = `M${this.left - 115} 180 Q${this.left - 250} 200 ${this.left - 100} 435`;
        this.wireway1 = new fabric.Path(path1, {
            fill: '', 
            stroke: '#0ec1cf',
            strokeWidth: 5,
            top: this.top + 188
        });
        this.canvas.add(this.wireway1);
        const path2 = `M${this.left + 108} 180 Q${this.left + 300} 200 ${this.left + 350} 280`;
        this.wireway2 = new fabric.Path(path2, {
            fill: '', 
            stroke: '#0ec1cf',
            strokeWidth: 5,
            objectCaching: false,
            top: this.top + 188
        });
        this.canvas.add(this.wireway2);
    }

    /**
     * 初始化仪表半圆和指针
     */
    private initSemicircleAndPoint() {
        fabric.Image.fromURL(pointerSrc, (img: fabric.Image) => {
            this.pointer = img;
            this.canvas.add(img);
        }, {
            left: this.left,
            top: this.top + 47 + 110,
            width: 6,
            height: 110,
            originX: 'center',
            originY: 'bottom',
        });
        fabric.Image.fromURL(semicircleSrc, (img: fabric.Image) => {
            this.canvas.add(img);
        }, {
            left: this.left - 29 / 2,
            top: this.top + 156,
            width: 29,
            height: 11,
        });
    }

    /**
     * 初始化磁铁和导体杆
     */
    private initMagnetAndPole() {
        fabric.Image.fromURL(southSrc, (south: fabric.Image) => {
            this.south = south;
            this.canvas.add(south);
            fabric.Image.fromURL(poleSrc, (pole: fabric.Image) => {
                this.pole = pole;
                this.canvas.add(pole);
                fabric.Image.fromURL(northSrc, (nort: fabric.Image) => {
                    this.nort = nort;
                    this.canvas.add(nort);
                    this.setZIndex();
                }, {
                    left: this.left - 412 / 2 + 79,
                    top: this.top + 263,
                    width: 412,
                    height: 157,
                });
            }, {
                left: this.left - 470 / 2 + 125,
                top: this.top + 263,
                width: 470,
                height: 212,
            });
        }, {
            left: this.left - 412 / 2 + 79,
            top: this.top + 263 + 102 + 49.5,
            width: 412,
            height: 157,
        });
    }

    movePole(type: number) {
        TweenMax.killAll(); // 结束所有动画
        switch (type) {
            case 1:
                this.moveLeft();
                break;
            case 2:
                this.moveRight();
                break;
            case 3:
                this.moveUpDown();
                break;
        }
    }

    /**
     * 向左
     */
    private moveLeft() {
        const distance = this.pole.left - this.poleMoveRange.xMin;
        const duration = distance / this.speed;
        TweenMax.to(this.pointer, 0.3, {
            angle: -15,
            ease: Linear.easeNone,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
        TweenMax.to(this.pole, duration, {
            left: this.poleMoveRange.xMin,
            ease: Linear.easeNone,
            onStart: () => {
                (window.viewHandler.viewModel as ViewModel).rightButtonDisabled = false;
            },
            onUpdate: () => {
                this.setWirewayPosition(1);
                this.canvas.renderAll();
            },
            onComplete: () => {
                this.pointRest();
                this.clearArrow();
                (window.viewHandler.viewModel as ViewModel).leftButtonDisabled = true;
            }
        });
    }
    /**
     * 向右
     */
    private moveRight() {
        const distance = this.poleMoveRange.xMax - this.pole.left;
        const duration = distance / this.speed;
        TweenMax.to(this.pointer, 0.3, {
            angle: 15,
            ease: Linear.easeNone,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
        TweenMax.to(this.pole, duration, {
            left: this.poleMoveRange.xMax,
            ease: Linear.easeNone,
            onStart: () => {
                (window.viewHandler.viewModel as ViewModel).leftButtonDisabled = false;
            },
            onUpdate: () => {
                // 设置导线位置
                this.setWirewayPosition(2);
                this.canvas.renderAll();
            },
            onComplete: () => {
                this.pointRest();
                this.clearArrow();
                (window.viewHandler.viewModel as ViewModel).rightButtonDisabled = true;
            }
        });
    }
    /**
     * 上下
     */
    private moveUpDown() {
        this.clearArrow();
        const top = this.pole.top;
        this.pointRest();
        const timelineMax = new TimelineMax({onUpdate: () => {
            this.setWirewayPosition(3);
            this.canvas.renderAll.bind(this.canvas);
        }});
        timelineMax.to(this.pole, (top - this.poleMoveRange.yMin) / this.speed, { // 上
            top: this.poleMoveRange.yMin,
            ease: Linear.easeNone
        }).to(this.pole, (this.poleMoveRange.yMax - this.poleMoveRange.yMin) / this.speed, { //下
            top: this.poleMoveRange.yMax,
            ease: Linear.easeNone
        }).to(this.pole, (this.poleMoveRange.yMax - this.poleMoveRange.yMin) / this.speed, {// 上
            top: this.poleMoveRange.yMin,
            ease: Linear.easeNone
        }).to(this.pole, (this.poleMoveRange.yMax - this.poleMoveRange.yMin) / this.speed, { // 下
            top: this.poleMoveRange.yMax,
            ease: Linear.easeNone
        }).to(this.pole, (this.poleMoveRange.yMax - top) / this.speed, { // 回到动画开始位置
            top,
            ease: Linear.easeNone
        });
    }

    /**
     * 设置导线位置
     * @param moveType 移动类型 1: 向左 2: 向右 3: 上下
     */
    private setWirewayPosition(moveType: number) {
        this.clearArrow();
        const left = this.pole.left;
        const top = this.pole.top;
        this.canvas.remove(this.wireway1, this.wireway2);
        // 导线1
        const path1 = `M${this.left - 115} 180 Q${this.left - 250} 200 
        ${this.left - 290 + 190 + 110 - (this.left - left)} ${435 - 263 - (this.top - top)}`;
        this.wireway1 = new fabric.Path(path1, {
            fill: '', 
            stroke: '#0ec1cf',
            strokeWidth: 5,
            top: this.top + 188
        });
        this.canvas.add(this.wireway1);
        if (moveType !== 3) {
            const leftPoss: any[] = [ // 贝塞尔曲线控制点坐标
                {
                    x: this.left - 115,
                    y: 188 + this.top
                },
                {
                    x: this.left - 245,
                    y: 208 + this.top
                },
                {
                    x: this.left - 290 + 190 + 110 - (this.left - left),
                    y: 438 - 263 - (this.top - top) + this.top
                }
            ]; 
            const leftPoint: any[] = this.bezierCalculate(leftPoss, 6); // 左边曲线上的点
            this.createLeftArrows(leftPoint, moveType);
        }
        // 导线2
        const path2 = `M${this.left + 108} 180 Q${this.left + 300} 200 
        ${this.left + 350 + 110 - (this.left - left)} ${280 - 263 - (this.top - top)}`;
        this.wireway2 = new fabric.Path(path2, {
            fill: '', 
            stroke: '#0ec1cf',
            strokeWidth: 5,
            top: this.top + 188
        });
        this.canvas.add(this.wireway2);
        if (moveType !== 3) {   
            const rightPoss: any[] = [ // 贝塞尔曲线控制点坐标
                {
                    x: this.left + 108,
                    y: 188 + this.top
                },
                {
                    x: this.left + 300,
                    y: 208 + this.top
                },
                {
                    x: this.left + 350 + 110 - (this.left - left),
                    y: 288 - 263 - (this.top - top) + this.top
                }
            ]; 
            const rightPoint: any[] = this.bezierCalculate(rightPoss, 6); // 右边曲线上的点
            this.createRightArrows(rightPoint, moveType);
        }
        this.setZIndex();
    }

    /**
     * 指针重置
     */
    private pointRest() {
        TweenMax.to(this.pointer, 0.3, {
            angle: 0,
            ease: Linear.easeNone,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }

   /**
    * 生成左边导线上的箭头
    * @param point 坐标数组
    * @param moveType 移动类型 1: 向左 2: 向右 3: 上下
    */
    private createLeftArrows(point: any[], moveType: number) {
        let angle1;
        let angle2;
        if (moveType === 1) {
            angle1 = 180 - this.getAngle(point[2], point[1]);
            angle2 = 180 - this.getAngle(point[4], point[3]);
        }
        if (moveType === 2) {
            angle1 = 180 - this.getAngle(point[2], point[3]);
            angle2 = 180 - this.getAngle(point[4], point[5]);
        }
        this.createArrow(point[2].y, point[2].x - 1, angle1);
        this.createArrow(point[4].y, point[4].x, angle2);
    }

    /**
    * 生成右边导线上的箭头
    * @param point 坐标数组
    * @param moveType 移动类型 1: 向左 2: 向右 3: 上下
    */
    private createRightArrows(point: any[], moveType: number) {
        let angle1;
        let angle2;
        if (moveType === 1) {
            angle1 = 170 - this.getAngle(point[2], point[3]);
            angle2 = 170 - this.getAngle(point[4], point[5]);
        }
        if (moveType === 2) {
            angle1 = 190 - this.getAngle(point[2], point[1]);
            angle2 = 190 - this.getAngle(point[4], point[3]);
        }
        this.createArrow(point[2].y + 1, point[2].x + 1, angle1);
        this.createArrow(point[4].y + 1, point[4].x + 1, angle2);
    }
    
    /**
     * 创建箭头
     * @param top 顶部距离
     * @param left 左边距离
     * @param angle 角度
     */
    private createArrow(top: number, left: number, angle: number) {
        const arrow = new fabric.Triangle({
            width: 15,
            height: 20, 
            fill: '#ffffff',
            strokeWidth: 0,
            selectable: false,
            originX: 'center',
            originY: 'bottom',
            top,
            left,
            angle
        });
        this.arrows.push(arrow); //保存下来方便清除
        this.canvas.add(arrow);
    }

    /**
     * 清除箭头
     */
    private clearArrow() {
        this.arrows.forEach((t: fabric.Triangle) => {
            this.canvas.remove(t);
        });
        this.arrows = [];
    }

    /**
     * 重置
     */
    reset() {
        TweenMax.killAll(); // 结束所有动画
        (window.viewHandler.viewModel as ViewModel).leftButtonDisabled = false;
        (window.viewHandler.viewModel as ViewModel).rightButtonDisabled = true;
        this.clearArrow();
        this.pointRest();
        this.pole.set('left', this.left - 470 / 2 + 125);
        this.pole.set('top', this.top + 263);
        this.canvas.remove(this.wireway1, this.wireway2);
        this.initWireway();
        this.setZIndex();
    }

    /**
     * 设置图像的层级
     */
    private setZIndex() {
        this.south.bringToFront();
        this.pole.bringToFront();
        this.nort.bringToFront();
    }
    /**
     * 返回贝塞尔曲线上的点
     * @param poss 贝塞尔曲线控制点坐标
     * @param precision 精度，需要计算的该条贝塞尔曲线上的点的数目
     */
    private bezierCalculate(poss: any[], precision: number): any[] {
        //维度，坐标轴数（二维坐标，三维坐标...）
        const dimersion = 2;
        //贝塞尔曲线控制点数（阶数）
        const number = poss.length;
        //控制点数不小于 2 ，至少为二维坐标系
        if (number < 2 || dimersion < 2) {
            return [];
        }
        const result = new Array();

        //计算杨辉三角
        const mi = new Array();
        mi[0] = mi[1] = 1;
        for (let i = 3; i <= number; i++) {
            const t = new Array();
            for (let j = 0; j < i - 1; j++) {
                t[j] = mi[j];
            }
            mi[0] = mi[i - 1] = 1;
            for (let j = 0; j < i - 2; j++) {
                mi[j + 1] = t[j] + t[j + 1];
            }
        }

        //计算坐标点
        for (let i = 0; i < precision; i++) {
            const t = i / precision;
            const p: any = {};
            result.push(p);
            for (let j = 0; j < dimersion; j++) {
                let temp = 0.0;
                for (let k = 0; k < number; k++) {
                    temp += Math.pow(1 - t, number - k - 1) * (j === 0 ? poss[k].x : poss[k].y) * Math.pow(t, k) * mi[k];
                }
                j === 0 ? p.x = temp : p.y = temp;
            }
        }

        return result;
    }

    /**
     * 根据两点获取角度
     * @param a 
     * @param b 
     */
    private getAngle(a: any, b: any) {
        const atan = Math.atan2((b.x - a.x), (b.y - a.y));
        const angle = atan * (180 / Math.PI);
        return Math.round(angle);
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
        const oldLeft = this.left;
        const oldTop = this.top;
        this.left = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.top = this.canvas.getHeight() / this.scaleValue.scale / 2  - 268.5;
        // 设置对象新位置
        this.canvas.getObjects().forEach(obj => {
            obj.left = obj.left - oldLeft + this.left;
            obj.top = obj.top - oldTop + this.top;
        });
        this.poleMoveRange = {
            xMin: this.left - 470 / 2 - 70,
            yMin: this.top + 263,
            xMax: this.left - 470 / 2 + 125,
            yMax: this.top + 263 + 90
        };
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
