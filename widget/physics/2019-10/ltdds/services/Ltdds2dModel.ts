import { TweenMax, Power4 } from 'gsap';
import {fabric} from 'fabric';

const graduatedCylinder = require('../sub_static/graduatedCylinder.png');
const graduatedCylinder2 = require('../sub_static/graduatedCylinder2.png');
const base = require('../sub_static/base.png');
const top = require('../sub_static/top.png');
const top2 = require('../sub_static/top2.png');

export class Ltdds2dModel {
    private canvas: fabric.StaticCanvas;        // 场景
    private scaleValue = new ScaleValue();      // 场景缩放比例
    private middleX: number;                    // 场景水平中心点的数值
    private middleY: number;                    // 场景竖直中心点的数值
    private liquid: fabric.Rect;                // 量筒中的液体
    private liquidTop: fabric.Image;            // 量筒中顶部有弧度的液体
    private graduatedCylinder: fabric.Image;    // 读数区域中的量筒
    
    /**
     * 构造函数
     * @param {string} canvas       载体 canvas容器id
     */
    constructor(canvas: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(canvas);
        this.initLayer();
    }
    
    /**
     * 初始化场景
     * @param canvas        载体 canvas容器id
     */
    private initStage(canvas: string) {
        const width = window.innerWidth;
        const height = window.innerHeight;
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
     * 初始化实验场景
     */
    private async initLayer() {
        this.addLiquid();
        this.addReadArea();
    }

    /**
     * 添加量筒中的液体
     */
    private addLiquid() {
        // 添加量筒顶部有弧度的液体
        fabric.Image.fromURL(top, (oImg: fabric.Image) => {
            this.liquidTop = oImg;
            this.canvas.add(oImg);
            // 添加量筒中的液体
            const liquid = new fabric.Rect({
                left: this.middleX - 170,
                top: this.middleY + 51,
                width: 79,
                height: 196,
                fill: '#9EE4EA',
                selectable: false,
                strokeWidth: 0,
                hoverCursor: 'default'
            });
            this.liquid = liquid;
            this.canvas.add(liquid);
            this.addGraduatedCylinder();
        }, {
            left: this.middleX - 170,
            top: this.middleY + 47,
            width: 79,
            height: 5,
            selectable: false,
            opacity: 1,
            hoverCursor: 'default'
        });
    }

    /**
     * 添加量筒
     */
    private addGraduatedCylinder() {
        // 添加量筒
        fabric.Image.fromURL(graduatedCylinder, (oImg: fabric.Image) => {
            oImg.scale(0.5);
            this.canvas.add(oImg);
            // 添加量筒底部有弧度的液体
            fabric.Image.fromURL(base, (bImg: fabric.Image) => {
                this.canvas.add(bImg);
            }, {
                left: this.middleX - 200,
                top: this.middleY + 247,
                width: 140,
                height: 51,
                selectable: false,
                hoverCursor: 'default'
            });
        }, {
            left: this.middleX - 200,
            top: this.middleY - 298,
            width: 280,
            height: 1190,
            selectable: false,
            hoverCursor: 'default'
        });
    }

    /**
     * 添加读数区域
     */
    private addReadArea() {
        // 添加读数区域
        const readBackground = new fabric.Rect({
            top: this.middleY - 160,
            left: this.middleX + 60,
            width: 280,
            height: 160,
            fill: '#FFFFFF',
            rx: 10,
            ry: 10,
            strokeWidth: 0,
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(readBackground);
        // 添加读数基准线顶部有弧度的液体
        fabric.Image.fromURL(top2, (topImg: fabric.Image) => {
            this.canvas.add(topImg);
            // 添加读数基准线
            const readLine  = new fabric.Rect({
                top: this.middleY - 78,
                left: this.middleX + 120,
                width: 160,
                height: 80,
                fill: '#9EE4EA',
                strokeWidth: 0,
                selectable: false,
                hoverCursor: 'default'
            });
            this.canvas.add(readLine);
            // 添加读数区的量筒
            fabric.Image.fromURL(graduatedCylinder2, (oImg: fabric.Image) => {
                oImg.scale(2 / 3);
                this.graduatedCylinder = oImg;
                this.canvas.add(oImg);
                // 添加遮罩层
                const topCover = new fabric.Rect({
                    top: this.middleY - 2160,
                    left: this.middleX + 60,
                    width: 280,
                    height: 2000,
                    fill: '#F7F7F7',
                    strokeWidth: 0,
                    selectable: false,
                    hoverCursor: 'default'
                });
                this.canvas.add(topCover);
                const bottomCover = new fabric.Rect({
                    top: this.middleY,
                    left: this.middleX + 60,
                    width: 280,
                    height: 2000,
                    fill: '#F7F7F7',
                    strokeWidth: 0,
                    selectable: false,
                    hoverCursor: 'default'
                });
                this.canvas.add(bottomCover);
                // 添加按钮
                const btn = new fabric.Rect({
                    fill: '#ffffff',
                    width: 120,
                    height: 50,
                    rx: 25,
                    ry: 25,
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    hoverCursor: 'default'
                });
                const text = new fabric.Text(window.env.browserInfo.lang.button, {
                    fontSize: 16,
                    fontFamily: 'SourceHanSansSC-Medium',
                    fill: '#525252',
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    hoverCursor: 'default'
                });   
                const group = new fabric.Group([ btn, text ], {
                    top: this.middleY + 40,
                    left: this.middleX + 140,
                    shadow: '0 0 10 #ccc',
                    selectable: false,
                    hoverCursor: 'pointer'
                });
                group.on('mouseup', () => {
                    text.set('fill', '#525252');
                    btn.set('fill', '#ffffff');
                    this.changeReadings();
                });
                group.on('mousedown', () => {
                    text.set('fill', '#ffffff');
                    btn.set('fill', '#5caefd');
                });
                this.canvas.add(group);
            }, {
                top: this.middleY - 780,
                left: this.middleX + 60, 
                width: 420,
                height: 1785,
                selectable: false,
                hoverCursor: 'default'
            });
            
        }, {
            top: this.middleY - 88,
            left: this.middleX + 120,
            width: 160,
            height: 10,
            selectable: false,
            hoverCursor: 'default'
        });
    }

    /**
     * 改变读数
     */
    changeReadings() {
        const num = Math.floor(Math.random() * (100 - 8) + 8);  // 随机生成8到100的整数
        const liquidHeight = (num - 8) * 4 + 28;  // 量筒中液体的高度
        const liquidTop = this.middleY + (247 - liquidHeight); // 量筒液体预期的top值
        const startHeight = this.liquid.height; // 量筒液体起始的高度
        const startTop = this.liquid.top;   // 量筒液体起始的top值
        const readLiquidTop = this.middleY - (380 + (100 - num) * 8);    // 读数区量筒预期的top值
        TweenMax.to(this.liquid, 2, {   // 量筒中液体的动画
            top: liquidTop,
            ease: Power4.easeOut,
            onUpdate: () => {
                const nowTop = this.liquid.top;
                this.canvas.renderAll.bind(this.canvas);
                // 修改液体的高度
                this.liquid.set('height', startHeight + (nowTop - startTop) / (liquidTop - startTop) * (liquidHeight - startHeight));
            },
            onComplete: () => {
                this.liquid.set('height', liquidHeight);
            }
        });
        TweenMax.to(this.liquidTop, 2, { // 量筒中顶部有弧度液体的动画
            top: this.middleY + (243 - liquidHeight),
            ease: Power4.easeOut,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
        });
        TweenMax.to(this.graduatedCylinder, 2, {    // 读数区量筒的动画
            top: readLiquidTop,
            ease: Power4.easeOut,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
        });
    }

    /**
     * 重置
     */
    reset() {
        // 结束所有动画
        TweenMax.killAll();
        // 重置量筒中液体位置
        this.liquid.set('top', this.middleY + 51);
        this.liquid.set('height', 196);
        this.liquidTop.set('top', this.middleY + 47);
        // 重置读数区
        this.graduatedCylinder.set('top', this.middleY - 780);
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
