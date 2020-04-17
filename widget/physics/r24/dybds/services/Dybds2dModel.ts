import { TweenMax } from 'gsap';
import {fabric} from 'fabric';

const voltmeter = require('../sub_static/voltmeter.png');
const redLinePng = require('../sub_static/red_line.png');
const blueLinePng = require('../sub_static/blue_line.png');

export class Dybds2dModel {
    private pointer: fabric.Line; // 指针
    private redLine: fabric.Image; //红色导线
    private blueLine: fabric.Image; // 蓝色导线
    private canvas: fabric.StaticCanvas; // 场景

    private time = 0.5; // 随机示数动画时间
    private range = 1; // 量程 1:0.6A, 2:3A 
    private left: number; // 距离左侧边距
    private top: number; // 距离左侧边距
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
        this.initLayer();
    }
    
    /**
     * 初始化场景
     * @param container 载体 html容器id
     */
    private initStage(container: string) {
        this.canvas = new fabric.StaticCanvas(container);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);
        this.left  = (this.canvas.getWidth() - 740 * this.scaleValue.scale) * 0.5 / this.scaleValue.scale;
        this.top  = (this.canvas.getHeight() - 690 * this.scaleValue.scale) * 0.5  / this.scaleValue.scale;
    }

    /**
     * 初始化 图层
     */
    private initLayer() {
        // 创建仪表背景图片
        fabric.Image.fromURL(voltmeter, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 背景加载完成再画指针，否则图片后来加载遮挡指针显示
            this.drawPointer();
            this.drawLine();
        }, {
            left: this.left,
            top: this.top,
            width: 740,
            height: 540
        });
    }

    /**
     * 绘制指针
     */
    private drawPointer() {
        this.pointer = new fabric.Line([ -28, 140, 260, 140], {
            left: this.left + 369,
            top: this.top + 333,
            stroke: 'red',
            strokeWidth: 2,
            angle: 180 + 41
        });
        this.canvas.add(this.pointer);
    }

    /**
     * 绘制导线
     */
    private drawLine() {
        fabric.Image.fromURL(redLinePng, (oImg: fabric.Image) => {
            this.redLine = oImg;
            this.canvas.add(this.redLine);
        }, {
            left: this.left + 360,
            top: this.top + 490,
            width: 220,
            height: 200
        });
        fabric.Image.fromURL(blueLinePng, (oImg: fabric.Image) => {
            this.blueLine = oImg;
            this.canvas.add(this.blueLine);
        }, {
            left: this.left + 130,
            top: this.top + 490,
            width: 220,
            height: 200
        });
    }

    /**
     * 生成随机数并控制指针旋转指向读数
     */ 
    createRandom() {
        const num = Math.random() * 98;
        TweenMax.to(this.pointer, this.time, {
            angle: 180 + 41 + parseInt(num.toString()),
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }

    /**
     * 读取随机数
     */
    randomNumber() {
        this.createRandom();
    }

    /**
     * 切换量程
     */
    changeRange() {
        this.range = this.range === 2 ? 1 : 2;
        TweenMax.to(this.redLine, 0.5, {
            left: this.range === 1 ? this.left + 360 : this.left + 590,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
        TweenMax.to(this.pointer, this.time, {
            angle: 180 + 41,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }

    /**
     * 重置场景
     */
    reset() {
        TweenMax.to(this.redLine, this.time, {
            left:  this.left + 360,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
        TweenMax.to(this.pointer, this.time, {
            angle: 180 + 41,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }
}

/**
 * 计算缩放比例
 */
export class ScaleValue {
    scale = window.innerWidth / 1680;
}
