import { TweenMax } from 'gsap';
import {fabric} from 'fabric';
const resistance = require('../sub_static/resistance.png');
const resistance1 = require('../sub_static/resistance1.png');

export class Dzxds2dModel {

    private canvas: fabric.StaticCanvas; // 场景
    private thousand: fabric.Image; // X1000图片
    private hundred: fabric.Image; // X100图片
    private ten: fabric.Image; // X10图片
    private one: fabric.Image; // X1图片

    private time = 1; // 随机示数动画时间
    private scaleValue = new ScaleValue(); // 场景缩放比例
    private left: number; // 距离左侧边距
    private top: number; // 距离左侧边距
    
    /**
     * 构造函数
     * @param {string} container   载体 html容器id
     */
    constructor(container: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container);
        this.initLayer();
    }
    /**
     * 初始化场景
     * @param container   载体 html容器id
     */
    private initStage(container: string) {
        this.canvas = new fabric.StaticCanvas(container);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);
        this.left  = (this.canvas.getWidth() - 701 * this.scaleValue.scale) * 0.5 / this.scaleValue.scale;
        this.top  = (this.canvas.getHeight() - 881 * this.scaleValue.scale) * 0.5  / this.scaleValue.scale;
    }

    /**
     * 初始化场景图层
     */
    private initLayer() {
        // 创建仪表背景图片
        fabric.Image.fromURL(resistance, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 背景加载完成再画指针，否则图片后来加载遮挡指针显示
            this.drawDial();
        }, {
            left: this.left,
            top: this.top,
            width: 701,
            height: 881
        });
    }

    /**
     * 添加刻度盘
     */
    drawDial() {
        const config = {
            width: 300,
            height: 300,
            scaleX: 0.7,
            scaleY: 0.7,
            originX: '150',
            originY: '150'
        };
        // X1000
        fabric.Image.fromURL(resistance1, (img: fabric.Image) => {
            this.thousand = img;
            this.thousand.left = this.left + 205;
            this.thousand.top = this.top + 160;
            this.canvas.add(this.thousand);
        }, config);
        // X100
        fabric.Image.fromURL(resistance1, (img: fabric.Image) => {
            this.hundred = img;
            this.hundred.left = this.left + 493;
            this.hundred.top = this.top + 160;
            this.canvas.add(this.hundred);
        }, config);
        // X10
        fabric.Image.fromURL(resistance1, (img: fabric.Image) => {
            this.ten = img; 
            this.ten.left = this.left + 205;
            this.ten.top = this.top + 495;
            this.canvas.add(this.ten);
        }, config);
        // X1
        fabric.Image.fromURL(resistance1, (img: fabric.Image) => {
            this.one = img;
            this.one.left = this.left + 493;
            this.one.top = this.top + 495;
            this.canvas.add(this.one);
        }, config);
    }

    /**
     * 创建随机示数
     */
    createRandom() {
        const num = Math.random() * 10000;
        this.changeDial(num);
    }

    /**
     * 重置场景
     */
    reset() {
        this.changeDial(0);
    }

    /**
     * 改变电阻想示数
     * @param num 需要显示的数据
     */
    changeDial(num: number) {
        this.animation(parseInt((String)((num % 10000) / 1000)), this.thousand);
        this.animation(parseInt((String)((num % 1000) / 100)), this.hundred);
        this.animation(parseInt((String)((num % 100) / 10)), this.ten);
        this.animation(parseInt((String)(num % 10)), this.one);
    }
    /**
     * 表盘旋转动画
     * @param nNum 示数
     * @param dial 要旋转的刻度盘
     */
    animation(nNum: number, dial: fabric.Image) {
        TweenMax.to(dial, this.time, {
            angle: 36 * nNum,
            onUpdate: this.canvas.renderAll.bind(this.canvas)
        });
    }

}


/**
 * 计算缩放比率
 */
export class ScaleValue {
    scale = window.innerWidth / 2100;
}
