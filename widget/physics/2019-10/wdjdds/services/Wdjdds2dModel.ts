import { TweenMax, Power4 } from 'gsap';
import {fabric} from 'fabric';

const thermometer = require('../sub_static/thermometer.png');
const bottom = require('../sub_static/bottom.png');
const thermometer2 = require('../sub_static/thermometer2.png');

export class Wdjdds2dModel {
    private canvas: fabric.StaticCanvas;        // 场景
    private scaleValue = new ScaleValue();      // 场景缩放比例
    private middleX: number;                    // 场景水平中心点的数值
    private middleY: number;                    // 场景竖直中心点的数值
    private temperature: fabric.Rect;           // 温度
    private temperatureRead: fabric.Image;      // 读数区域的温度计
    private minTemperatureTop: number;          // 最小温度的距离顶部距离
    private temperatureNumber = 10;             // 温度及初始温度
    
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
        // 添加温度计
        fabric.Image.fromURL(thermometer, (oImg: fabric.Image) => {
            oImg.scale(0.5);
            this.canvas.add(oImg);
            // 初始化温度
            this.minTemperatureTop = oImg.top + 94 + 400;
            this.temperature = new fabric.Rect({
                left: oImg.left + 112,
                width: 24,
                fill: '#f27a7a',
                selectable: false,
                strokeWidth: 0,
                hoverCursor: 'default'
            });
            this.temperature.set({
                top: oImg.top + (94 + (this.temperatureNumber - (-30)) * 5),
                height: (this.temperatureNumber - (-30)) * 5 + 3,
            });
            this.canvas.add(this.temperature);
            // 添加温度计底部遮挡部分
            fabric.Image.fromURL(bottom, (bottomImg: fabric.Image) => {
                bottomImg.scale(0.5);
                this.canvas.add(bottomImg);
            }, {
                left: this.middleX - 284,
                top: this.middleY + 190,
                width: 504,
                height: 232,
                selectable: false,
                hoverCursor: 'default'
            });
        }, {
            left: this.middleX - 284,
            top: this.middleY - 306,
            width: 504,
            height: 1224,
            selectable: false,
            hoverCursor: 'default'
        });
        this.initReadArea();
    }

    /**
     * 添加读数区域
     */
    private initReadArea() {
        // 添加读数区域
        const readBackground = new fabric.Rect({
            top: this.middleY - 81,
            left: this.middleX + 32,
            width: 288,
            height: 162,
            fill: '#FFFFFF',
            rx: 10,
            ry: 10,
            strokeWidth: 0,
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(readBackground);
        // 添加读数区的温度计
        fabric.Image.fromURL(thermometer2, (oImg: fabric.Image) => {
            oImg.scale(2 / 3);
            this.temperatureRead = oImg;
            this.canvas.add(oImg);
            // 添加遮罩层
            const topCover = new fabric.Rect({
                top: 0,
                left: this.middleX + 32,
                width: 288,
                height: this.middleY - 81,
                fill: '#F7F7F7',
                strokeWidth: 0,
                selectable: false,
                hoverCursor: 'default'
            });
            this.canvas.add(topCover);
            const bottomCover = new fabric.Rect({
                top: this.middleY + 81,
                left: this.middleX + 32,
                width: 288,
                height: this.middleY - 81,
                fill: '#F7F7F7',
                strokeWidth: 0,
                selectable: false,
                hoverCursor: 'default'
            });
            this.canvas.add(bottomCover);
            // 添加读数基准线
            const readLine  = new fabric.Rect({
                top: this.middleY,
                left: this.middleX + (32 + 120),
                width: 48,
                height: 81,
                fill: '#f27a7a',
                strokeWidth: 0,
                selectable: false,
                hoverCursor: 'default'
            });
            this.canvas.add(readLine);

            this.initReadButton();
        }, {
            top: this.middleY - 925 + (this.temperatureNumber + 30) * 10,
            left: this.middleX + (32 + 24), 
            width: 360,
            height: 1659,
            selectable: false,
            hoverCursor: 'default'
        });
    }

    private initReadButton () {
        // 添加按钮
        const btn = new fabric.Rect({
            fill: '#ffffff',
            width: 104,
            height: 42,
            rx: 21,
            ry: 21,
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
            selectable: false
        });   
        const group = new fabric.Group([ btn, text ], {
            top: this.middleY + (81 + 48),
            left: this.middleX + 32 + 92,
            selectable: false,
            shadow: '0 0 10 #ccc',
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
    }

    /**
     * 改变读数
     */
    changeReadings() {
        TweenMax.killAll();
        // 生成随机温度
        const num = Math.floor(Math.random() * 80 - 30);  // 随机生成-30到50的整数
        // 温度的实际高度 = (num + 30) * 5
        const height = (num + 30) * 5;
        // 温度的top高度 = 最低温度的top高度 - 温度的实际高度
        const top = this.minTemperatureTop - height;
        const startHeight = this.temperature.height; // 温度起始的高度
        const startTop = this.temperature.top;   // 温度起始的top值
        TweenMax.to(this.temperature, 3, {  // 温度计中温度的动画
            top,
            ease: Power4.easeOut,
            onUpdate: () => {
                const nowTop = this.temperature.top;
                const ratio = (nowTop - startTop) / (top - startTop);
                // 修改温度的高度
                this.canvas.renderAll.bind(this.canvas);
                this.temperature.set('height', startHeight + ratio * (height + 5 - startHeight) + 5);
            },
            onComplete: () => {
                this.temperature.set('height', height + 3);
            }
        });
        const readTemperatureTop = this.middleY - 925 + (num + 30) * 10;    // 读数区温度计预期的top值
        
        TweenMax.to(this.temperatureRead, 3, { // 读数区温度计的动画
            top: readTemperatureTop,
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
        // 重置量温度
        this.temperature.set({
            top: this.middleY - 306 + (94 + (this.temperatureNumber - (-30)) * 5),
            height: 203
        });
        // 重置读数区
        this.temperatureRead.set('top', this.middleY - 925 + (this.temperatureNumber + 30) * 10);
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
